import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://iqesqrlozabinnaknsow.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlxZXNxcmxvemFiaW5uYWtuc293Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAzMTMxNzQsImV4cCI6MjA5NTg4OTE3NH0.IUov7mf87hexFAcfYbZ0CgAsVBBrg16Pk49jPI1JgJU'
);

export default function Encyclopedie() {
  const navigate = useNavigate();
  const [medicines, setMedicines] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedMed, setSelectedMed] = useState(null);
  const [medInfo, setMedInfo] = useState(null);
  const [loadingInfo, setLoadingInfo] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Toutes');

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from('medicines').select('*').order('name');
      if (data) setMedicines(data);
    };
    load();
  }, []);

  const categories = ['Toutes', ...new Set(medicines.map(m => m.category).filter(Boolean))].sort();

  const filtered = medicines.filter((med) => {
    const matchSearch = med.name?.toLowerCase().includes(search.toLowerCase()) ||
      med.dci?.toLowerCase().includes(search.toLowerCase());
    const matchCat = selectedCategory === 'Toutes' || med.category === selectedCategory;
    return matchSearch && matchCat;
  });

  const fetchMedInfo = async (med) => {
    setSelectedMed(med);
    setMedInfo(null);
    setLoadingInfo(true);

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1500,
          messages: [{
            role: 'user',
            content: `Tu es un pharmacien expert. Génère une fiche médicale complète en français pour:
Nom: ${med.name}
DCI: ${med.dci || 'Non précisé'}
Catégorie: ${med.category || 'Non précisé'}

Réponds UNIQUEMENT en JSON valide sans balises markdown:
{
  "classe_therapeutique": "Classe thérapeutique du médicament",
  "mecanisme": "Mécanisme d'action en termes simples (2-3 phrases)",
  "indications": ["indication 1", "indication 2", "indication 3"],
  "dosage": {
    "adulte": "Posologie adulte complète",
    "enfant": "Posologie enfant ou Non recommandé",
    "nourrisson": "Posologie nourrisson ou Non recommandé",
    "personne_agee": "Ajustements pour personne âgée"
  },
  "mode_administration": "Comment prendre ce médicament",
  "effets_secondaires": {
    "frequents": ["effet fréquent 1", "effet fréquent 2"],
    "rares": ["effet rare 1", "effet rare 2"]
  },
  "contre_indications": ["contre-indication 1", "contre-indication 2"],
  "interactions": ["interaction médicamenteuse 1", "interaction 2"],
  "grossesse": "Utilisation pendant la grossesse",
  "allaitement": "Utilisation pendant l'allaitement",
  "conservation": "Conditions de conservation",
  "conseil_patient": "Conseils pratiques pour le patient"
}`
          }]
        })
      });

      const data = await response.json();
      const text = data.content?.map(c => c.text || '').join('');
      const clean = text.replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(clean);
      setMedInfo(parsed);
    } catch (e) {
      setMedInfo({ error: true });
    }
    setLoadingInfo(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/')} className="text-blue-600 hover:text-blue-800 font-semibold">
            ← Retour
          </button>
          <h1 className="text-2xl font-bold text-gray-800">📖 Encyclopédie des Médicaments</h1>
        </div>
        <button onClick={() => navigate('/aide-vente')} className="bg-blue-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-blue-700 transition">
          💊 Aide à la Vente
        </button>
      </div>

      <div className="max-w-7xl mx-auto p-6 flex gap-6">

        {/* LEFT — Search + list */}
        <div className="w-80 shrink-0 flex flex-col gap-3">
          <input
            type="text"
            placeholder="🔍 Rechercher par nom ou DCI..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white shadow"
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full p-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white shadow"
          >
            {categories.map(c => <option key={c}>{c}</option>)}
          </select>

          <p className="text-xs text-gray-500">{filtered.length} médicament(s)</p>

          <div className="flex flex-col gap-2 overflow-y-auto" style={{ maxHeight: '75vh' }}>
            {filtered.map((med) => (
              <button
                key={med.id || med.name}
                onClick={() => fetchMedInfo(med)}
                className={`w-full text-left p-3 rounded-xl border-2 transition ${
                  selectedMed?.id === med.id
                    ? 'bg-purple-50 border-purple-500'
                    : 'bg-white border-transparent hover:border-purple-300 shadow-sm'
                }`}
              >
                <p className="font-bold text-gray-800 text-sm">{med.name}</p>
                {med.dci && <p className="text-xs text-gray-500 mt-1">{med.dci}</p>}
                {med.category && (
                  <span className="inline-block mt-1 px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">
                    {med.category}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT — Full medicine info */}
        <div className="flex-1">
          {!selectedMed && (
            <div className="bg-white rounded-2xl shadow p-10 border border-gray-200 text-center text-gray-400 mt-20">
              <p className="text-5xl mb-4">📖</p>
              <p className="text-lg font-medium">Sélectionnez un médicament pour afficher sa fiche complète</p>
            </div>
          )}

          {selectedMed && (
            <div className="bg-white rounded-2xl shadow p-6 border border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{selectedMed.name}</h2>
                  {selectedMed.dci && <p className="text-gray-500 mt-1">DCI: <span className="font-semibold">{selectedMed.dci}</span></p>}
                  {selectedMed.category && (
                    <span className="inline-block mt-2 px-3 py-1 bg-purple-100 text-purple-700 text-sm font-semibold rounded-full">
                      {selectedMed.category}
                    </span>
                  )}
                </div>
                <div className="text-right text-sm text-gray-500">
                  <p>Étagère: <span className="font-bold text-gray-700">{selectedMed.shelf}</span></p>
                  {selectedMed.expiry && <p>Expiry: {selectedMed.expiry}</p>}
                  {selectedMed.quantity && <p>Qté: {selectedMed.quantity} {selectedMed.quantityType || ''}</p>}
                </div>
              </div>

              {loadingInfo && (
                <div className="flex flex-col gap-3 mt-4">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-5 bg-gray-200 rounded animate-pulse" style={{ width: `${70 + Math.random() * 30}%` }} />
                  ))}
                  <p className="text-sm text-gray-400 text-center mt-2">Génération de la fiche en cours...</p>
                </div>
              )}

              {medInfo && !medInfo.error && !loadingInfo && (
                <div className="grid grid-cols-2 gap-4 mt-4">

                  <div className="bg-blue-50 rounded-xl p-4 col-span-2">
                    <p className="font-bold text-blue-700 mb-1">🏥 Classe thérapeutique & Mécanisme</p>
                    <p className="text-sm font-semibold text-blue-600 mb-2">{medInfo.classe_therapeutique}</p>
                    <p className="text-sm text-gray-700">{medInfo.mecanisme}</p>
                  </div>

                  <div className="bg-green-50 rounded-xl p-4">
                    <p className="font-bold text-green-700 mb-2">✅ Indications</p>
                    <ul className="list-disc list-inside flex flex-col gap-1">
                      {medInfo.indications?.map((ind, i) => (
                        <li key={i} className="text-sm text-gray-700">{ind}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-teal-50 rounded-xl p-4">
                    <p className="font-bold text-teal-700 mb-2">📋 Posologie</p>
                    <p className="text-sm"><span className="font-semibold">Adulte:</span> {medInfo.dosage?.adulte}</p>
                    <p className="text-sm mt-1"><span className="font-semibold">Enfant:</span> {medInfo.dosage?.enfant}</p>
                    <p className="text-sm mt-1"><span className="font-semibold">Nourrisson:</span> {medInfo.dosage?.nourrisson}</p>
                    <p className="text-sm mt-1"><span className="font-semibold">Personne âgée:</span> {medInfo.dosage?.personne_agee}</p>
                  </div>

                  <div className="bg-yellow-50 rounded-xl p-4">
                    <p className="font-bold text-yellow-700 mb-2">💊 Mode d'administration</p>
                    <p className="text-sm text-gray-700">{medInfo.mode_administration}</p>
                  </div>

                  <div className="bg-orange-50 rounded-xl p-4">
                    <p className="font-bold text-orange-700 mb-2">⚠️ Effets secondaires</p>
                    <p className="text-xs font-semibold text-orange-600 mb-1">Fréquents:</p>
                    <ul className="list-disc list-inside flex flex-col gap-1 mb-2">
                      {medInfo.effets_secondaires?.frequents?.map((e, i) => (
                        <li key={i} className="text-sm text-gray-700">{e}</li>
                      ))}
                    </ul>
                    <p className="text-xs font-semibold text-orange-400 mb-1">Rares:</p>
                    <ul className="list-disc list-inside flex flex-col gap-1">
                      {medInfo.effets_secondaires?.rares?.map((e, i) => (
                        <li key={i} className="text-sm text-gray-700">{e}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-red-50 rounded-xl p-4">
                    <p className="font-bold text-red-700 mb-2">🚫 Contre-indications</p>
                    <ul className="list-disc list-inside flex flex-col gap-1">
                      {medInfo.contre_indications?.map((c, i) => (
                        <li key={i} className="text-sm text-gray-700">{c}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-pink-50 rounded-xl p-4">
                    <p className="font-bold text-pink-700 mb-2">🔗 Interactions médicamenteuses</p>
                    <ul className="list-disc list-inside flex flex-col gap-1">
                      {medInfo.interactions?.map((inter, i) => (
                        <li key={i} className="text-sm text-gray-700">{inter}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-purple-50 rounded-xl p-4">
                    <p className="font-bold text-purple-700 mb-2">🤰 Grossesse & Allaitement</p>
                    <p className="text-sm"><span className="font-semibold">Grossesse:</span> {medInfo.grossesse}</p>
                    <p className="text-sm mt-1"><span className="font-semibold">Allaitement:</span> {medInfo.allaitement}</p>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="font-bold text-gray-700 mb-2">🌡️ Conservation</p>
                    <p className="text-sm text-gray-700">{medInfo.conservation}</p>
                  </div>

                  <div className="bg-indigo-50 rounded-xl p-4 col-span-2">
                    <p className="font-bold text-indigo-700 mb-1">💡 Conseils au patient</p>
                    <p className="text-sm text-gray-700">{medInfo.conseil_patient}</p>
                  </div>

                </div>
              )}

              {medInfo?.error && (
                <div className="bg-red-50 rounded-xl p-4 mt-4 text-red-600 text-sm">
                  Erreur lors du chargement. Veuillez réessayer.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}