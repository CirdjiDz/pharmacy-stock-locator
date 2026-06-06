import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import fs from 'fs';

config({ path: '.env.local' });

const supabase = createClient(
  'https://iqesqrlozabinnaknsow.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlxZXNxcmxvemFiaW5uYWtuc293Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAzMTMxNzQsImV4cCI6MjA5NTg4OTE3NH0.IUov7mf87hexFAcfYbZ0CgAsVBBrg16Pk49jPI1JgJU'
);

const delay = (ms) => new Promise(res => setTimeout(res, ms));

async function getMedInfo(med) {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Tu es un pharmacien expert. Donne des informations pour ce médicament:
Nom: ${med.name}
DCI: ${med.dci || 'Non précisé'}
Catégorie: ${med.category || 'Non précisé'}

Réponds UNIQUEMENT en JSON valide sans markdown:
{
  "indication": "Pour quelle maladie/condition (1-2 phrases courtes)",
  "dosage_adulte": "Posologie adulte (ex: 1 comprimé 3 fois/jour)",
  "dosage_enfant": "Posologie enfant ou null",
  "dosage_nourrisson": "Posologie nourrisson ou null",
  "effets_secondaires": "Effets secondaires principaux séparés par virgules",
  "contre_indications": "Contre-indications principales",
  "conseil": "Conseil pratique court",
  "forme": "Une seule valeur parmi: Comprimé, Sirop, Gélule, Crème / Pommade, Injectable, Gouttes, Sachet, Suppositoire",
  "age_min": nombre ou null,
  "age_max": nombre ou null,
  "condition": "Une seule valeur parmi: Grippe / Rhume, Douleur / Fièvre, Infection bactérienne, Allergie, Troubles digestifs, Diabète, Hypertension, Toux, Infection fongique, Inflammation, Troubles neurologiques, Gynécologie, Vitamines / Compléments, Ophtalmologie / ORL, Dermatologie, Urologie, Psychiatrie ou null"
}`
            }]
          }],
          generationConfig: { temperature: 0.2 }
        }),
      }
    );

    const data = await response.json();

    if (data.error) {
      console.log(`  ⚠️ API error for ${med.name}: ${data.error.message}`);
      return null;
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    const clean = text.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(clean);
    return parsed;
  } catch (e) {
    console.log(`  ❌ Failed for ${med.name}: ${e.message}`);
    return null;
  }
}

async function main() {
  console.log('📦 Loading medicines from Supabase...');
  const { data: medicines, error } = await supabase.from('medicines').select('*');
  
  if (error) {
    console.error('Failed to load medicines:', error);
    return;
  }

  console.log(`✅ Loaded ${medicines.length} medicines`);
  console.log('🔄 Starting Gemini enrichment (this will take a while)...\n');

  const results = [];
  const failed = [];

  // Only process medicines that don't already have info
  const toProcess = medicines.filter(m => !m.indication && !m.dosage_adulte);
  console.log(`📋 ${toProcess.length} medicines need info (${medicines.length - toProcess.length} already have data)\n`);

  for (let i = 0; i < toProcess.length; i++) {
    const med = toProcess[i];
    console.log(`[${i + 1}/${toProcess.length}] Processing: ${med.name}`);

    const info = await getMedInfo(med);

    if (info) {
      results.push({
        id: med.id,
        name: med.name,
        original: {
          category: med.category,
          dci: med.dci,
        },
        enriched: info
      });
      console.log(`  ✅ Done`);
    } else {
      failed.push({ id: med.id, name: med.name });
    }

    // Save progress every 10 medicines
    if ((i + 1) % 10 === 0) {
      fs.writeFileSync('medicines_preview.json', JSON.stringify(results, null, 2));
      console.log(`\n💾 Progress saved (${i + 1}/${toProcess.length})\n`);
    }

    // Wait 2 seconds between requests to avoid quota limits
    await delay(2000);
  }

  // Final save
  fs.writeFileSync('medicines_preview.json', JSON.stringify(results, null, 2));

  if (failed.length > 0) {
    fs.writeFileSync('medicines_failed.json', JSON.stringify(failed, null, 2));
    console.log(`\n⚠️ ${failed.length} medicines failed - saved to medicines_failed.json`);
  }

  console.log(`\n✅ Done! ${results.length} medicines saved to medicines_preview.json`);
  console.log('👀 Review the file, then run: node scripts/upload.js');
}

main();