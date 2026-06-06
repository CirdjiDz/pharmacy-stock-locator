import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import fs from 'fs';

config({ path: '.env.local' });

const supabase = createClient(
  'https://iqesqrlozabinnaknsow.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlxZXNxcmxvemFiaW5uYWtuc293Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAzMTMxNzQsImV4cCI6MjA5NTg4OTE3NH0.IUov7mf87hexFAcfYbZ0CgAsVBBrg16Pk49jPI1JgJU'
);

async function main() {
  if (!fs.existsSync('medicines_preview.json')) {
    console.error('❌ medicines_preview.json not found. Run fetchMedInfo.js first.');
    return;
  }

  const data = JSON.parse(fs.readFileSync('medicines_preview.json', 'utf-8'));
  console.log(`📦 Found ${data.length} medicines to upload`);
  console.log('🚀 Uploading to Supabase...\n');

  let success = 0;
  let failed = 0;

  for (const item of data) {
    const { error } = await supabase
      .from('medicines')
      .update({
        indication: item.enriched.indication || null,
        dosage_adulte: item.enriched.dosage_adulte || null,
        dosage_enfant: item.enriched.dosage_enfant || null,
        dosage_nourrisson: item.enriched.dosage_nourrisson || null,
        effets_secondaires: item.enriched.effets_secondaires || null,
        contre_indications: item.enriched.contre_indications || null,
        conseil: item.enriched.conseil || null,
        forme: item.enriched.forme || null,
        age_min: item.enriched.age_min ?? null,
        age_max: item.enriched.age_max ?? null,
        condition: item.enriched.condition || null,
      })
      .eq('id', item.id);

    if (error) {
      console.log(`❌ Failed: ${item.name} - ${error.message}`);
      failed++;
    } else {
      console.log(`✅ Uploaded: ${item.name}`);
      success++;
    }
  }

  console.log(`\n✅ Done! ${success} uploaded, ${failed} failed`);
}

main();