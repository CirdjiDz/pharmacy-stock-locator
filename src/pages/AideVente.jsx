import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://iqesqrlozabinnaknsow.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlxZXNxcmxvemFiaW5uYWtuc293Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAzMTMxNzQsImV4cCI6MjA5NTg4OTE3NH0.IUov7mf87hexFAcfYbZ0CgAsVBBrg16Pk49jPI1JgJU'
);

const CONDITIONS = [
  'Toutes', 'Grippe / Rhume', 'Douleur / Fièvre', 'Infection bactérienne',
  'Allergie', 'Troubles digestifs', 'Diabète', 'Hypertension', 'Toux',
  'Infection fongique', 'Inflammation', 'Troubles neurologiques',
  'Gynécologie', 'Vitamines / Compléments', 'Ophtalmologie / ORL',
  'Dermatologie', 'Urologie', 'Psychiatrie'
];

const AGE_GROUPS = ['Tous', 'Nourrisson (0-2 ans)', 'Enfant (2-12 ans)', 'Adulte (12-65 ans)', 'Personne âgée (65+)'];
const FORMS = ['Toutes', 'Comprimé', 'Sirop', 'Gélule', 'Crème / Pommade', 'Injectable', 'Gouttes', 'Sachet', 'Suppositoire'];

export default function AideVente() {
  const navigate = useNavigate();
  const [medicines, setMedicines] = useState([]);
  const [selectedCondition, setSelectedCondition] = useState('Toutes');
  const [selectedAge, setSelectedAge] = useState('Tous');
  const [selectedForm, setSelectedForm] = useState('Toutes');
  const [search, setSearch] = useState('');
  const [selectedMed, setSelectedMed] = useState(null);
  const [medInfo, setMedInfo] = useState(null);
  const [loadingInfo, setLoadingInfo] = useState(false);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from('medicines').select('*');
      if (data) setMedicines(data);
    };
    load();
  }, []);

  const filtered = medicines.filter((med) => {
    const matchCondition = selectedCondition === 'Toutes' || (med.category && med.category.toLowerCase().includes(selectedCondition.toLowerCase())) || conditionMatchesCategory(selectedCondition, med.category);
    const matchSearch = med.name?.toLowerCase().includes(search.toLowerCase());
    const matchForm = selectedForm === 'Toutes' || (med.name?.toLowerCase().includes(selectedForm.toLowerCase())) || formMatchesName(selectedForm, med.name);
    return matchCondition && matchSearch && matchForm;
  });

  function conditionMatchesCategory(condition, category) {
    if (!category) return false;
    const map = {
      'Grippe / Rhume': ['Respiratoire'],
      'Douleur / Fièvre': ['Douleur et Inflammation'],
      'Infection bactérienne': ['Anti-infectieux'],
      'Allergie': ['Respiratoire'],
      'Troubles digestifs': ['GASTRO'],
      'Diabète': ['Endocrinologie et Diabète'],
      'Hypertension': ['CARDIO'],
      'Toux': ['Respiratoire'],
      'Infection fongique': ['Anti-infectieux', 'Dermatologie'],
      'Inflammation': ['Douleur et Inflammation'],
      'Troubles neurologiques': ['Neurologie & Psychiatrie', 'Neuro / Muscles'],
      'Gynécologie': ['Gynécologie & Obstétrique'],
      'Vitamines / Compléments': ['Vitamines et Compléments', 'Pédiatrie'],
      'Ophtalmologie / ORL': ['Ophtalmologie / ORL'],
      'Dermatologie': ['Dermatologie'],
      'Urologie': ['Urologie'],
      'Psychiatrie': ['Neurologie & Psychiatrie'],
    };
    const cats = map[condition] || [];
    return cats.some(c => category.includes(c));
  }

  function formMatchesName(form, name) {
    if (!name) return false;
    const n = name.toLowerCase();
    const map = {
      'Comprimé': ['comp', 'comprimé', 'tablet'],
      'Sirop': ['sirop', 'sol buv', 'solution buvable'],
      'Gélule': ['gélule', 'gelule', 'capsule'],
      'Crème / Pommade': ['crème', 'creme', 'pommade', 'gel'],
      'Injectable': ['inj', 'injectable', 'amp', 'sol inj'],
      'Gouttes': ['gouttes', 'collyre', 'coll'],
      'Sachet': ['sachet'],
      'Suppositoire': ['suppo', 'suppositoire'],
    };
    const keywords = map[form] || [];
    return keywords.some(k => n.includes(k));
  }

  const fetchMedInfo = async (med) => {
    setSelectedMed(med);
    setMedInfo(null);
    setLoadingInfo(true);

    try {
      const response = await fetch('/api/claude', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [{
            role: 'user',
            content: `Tu es un pharmacien expert. Donne-moi une fiche complète en français pour le médicament suivant:
Nom: ${med.name}
DCI: ${med.dci || 'Non précisé'}
Catégorie: ${med.category || 'Non précisé'}

Réponds UNIQUEMENT en JSON valide sans balises markdown, avec exactement cette structure:
{
  "indication": "Pour quelle maladie/condition ce médicament est utilisé (2-3 phrases)",
  "dosage": {
    "adulte": "Posologie pour adulte",
    "enfant": "Posologie pour enfant",
    "nourrisson": "Posologie pour nourrisson ou Non recommandé"
  },
  "effets_secondaires": ["effet 1", "effet 2", "effet 3"],
  "contre_indications": ["contre-indication 1", "contre-indication 2"],
  "conseil": "Conseil pratique pour le patient (1-2 phrases)"
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
          <button onClick={() => navigate('/')} className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-2">
            ← Retour
          </button>
          <h1 className="text-2xl font-bold text-gray-800">💊 Aide à la Vente</h1>
        </div>
        <button onClick={() => navigate('/encyclopedie')} className="bg-purple-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-purple-700 transition">
          📖 Encyclopédie
        </button>
      </div>

      <div className="max-w-7xl mx-auto p-6 flex gap-6">
        {/* LEFT — Filters */}
        <div className="w-64 shrink-0 flex flex-col gap-4">

          <input
            type="text"
            placeholder="🔍 Rechercher un médicament..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white shadow"
          />

          <div className="bg-white rounded-2xl shadow p-4 border border-gray-200">
            <h3 className="font-bold text-gray-700 mb-3">🏥 Condition</h3>
            <div className="flex flex-col gap-1">
              {CONDITIONS.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedCondition(c)}
                  className={`text-left px-3 py-2 rounded-xl text-sm transition font-medium ${
                    selectedCondition === c ? 'bg-blue-600 text-white' : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow p-4 border border-gray-200">
            <h3 className="font-bold text-gray-700 mb-3">👤 Âge</h3>
            <div className="flex flex-col gap-1">
              {AGE_GROUPS.map((a) => (
                <button
                  key={a}
                  onClick={() => setSelectedAge(a)}
                  className={`text-left px-3 py-2 rounded-xl text-sm transition font-medium ${
                    selectedAge === a ? 'bg-green-600 text-white' : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow p-4 border border-gray-200">
            <h3 className="font-bold text-gray-700 mb-3">💉 Forme</h3>
            <div className="flex flex-col gap-1">
              {FORMS.map((f) => (
                <button
                  key={f}
                  onClick={() => setSelectedForm(f)}
                  className={`text-left px-3 py-2 rounded-xl text-sm transition font-medium ${
                    selectedForm === f ? 'bg-orange-500 text-white' : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* MIDDLE — Medicine list */}
        <div className="flex-1 flex flex-col gap-3">
          <p className="text-sm text-gray-500 font-medium">{filtered.length} médicament(s) trouvé(s)</p>
          {filtered.map((med) => (
            <button
              key={med.id || med.name}
              onClick={() => fetchMedInfo(med)}
              className={`w-full text-left bg-white rounded-2xl shadow p-4 border-2 transition hover:border-blue-400 ${
                selectedMed?.id === med.id ? 'border-blue-500 bg-blue-50' : 'border-transparent'
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold text-gray-800">{med.name}</p>
                  {med.dci && <p className="text-xs text-gray-500 mt-1">DCI: {med.dci}</p>}
                  {med.category && (
                    <span className="inline-block mt-2 px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                      {med.category}
                    </span>
                  )}
                </div>
                <div className="text-right text-xs text-gray-400">
                  <p>Étagère: <span className="font-bold text-gray-600">{med.shelf}</span></p>
                  {med.expiry && <p>Exp: {med.expiry}</p>}
                  {med.quantity && <p>Qté: {med.quantity} {med.quantityType || ''}</p>}
                </div>
              </div>
            </button>
          ))}
          {filtered.length === 0 && (
            <div className="text-center text-gray-400 mt-20 text-lg">Aucun médicament trouvé pour ces filtres</div>
          )}
        </div>

        {/* RIGHT — Medicine info panel */}
        <div className="w-80 shrink-0">
          {!selectedMed && (
            <div className="bg-white rounded-2xl shadow p-6 border border-gray-200 text-center text-gray-400 mt-10">
              <p className="text-4xl mb-3">💊</p>
              <p className="font-medium">Cliquez sur un médicament pour voir ses informations détaillées</p>
            </div>
          )}

          {selectedMed && (
            <div className="bg-white rounded-2xl shadow p-5 border border-gray-200 sticky top-6">
              <h2 className="text-lg font-bold text-gray-800 mb-1">{selectedMed.name}</h2>
              {selectedMed.dci && <p className="text-xs text-gray-500 mb-3">DCI: {selectedMed.dci}</p>}

              {loadingInfo && (
                <div className="flex flex-col gap-3 mt-4">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
                  <p className="text-xs text-gray-400 text-center mt-2">Chargement des informations...</p>
                </div>
              )}

              {medInfo && !medInfo.error && !loadingInfo && (
                <div className="flex flex-col gap-4 text-sm overflow-y-auto" style={{ maxHeight: '75vh' }}>
                  <div className="bg-blue-50 rounded-xl p-3">
                    <p className="font-bold text-blue-700 mb-1">🏥 Indication</p>
                    <p className="text-gray-700">{medInfo.indication}</p>
                  </div>

                  <div className="bg-green-50 rounded-xl p-3">
                    <p className="font-bold text-green-700 mb-2">📋 Posologie</p>
                    <p><span className="font-semibold">Adulte:</span> {medInfo.dosage?.adulte}</p>
                    <p className="mt-1"><span className="font-semibold">Enfant:</span> {medInfo.dosage?.enfant}</p>
                    <p className="mt-1"><span className="font-semibold">Nourrisson:</span> {medInfo.dosage?.nourrisson}</p>
                  </div>

                  <div className="bg-orange-50 rounded-xl p-3">
                    <p className="font-bold text-orange-700 mb-2">⚠️ Effets secondaires</p>
                    <ul className="list-disc list-inside flex flex-col gap-1">
                      {medInfo.effets_secondaires?.map((e, i) => (
                        <li key={i} className="text-gray-700">{e}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-red-50 rounded-xl p-3">
                    <p className="font-bold text-red-700 mb-2">🚫 Contre-indications</p>
                    <ul className="list-disc list-inside flex flex-col gap-1">
                      {medInfo.contre_indications?.map((c, i) => (
                        <li key={i} className="text-gray-700">{c}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-purple-50 rounded-xl p-3">
                    <p className="font-bold text-purple-700 mb-1">💡 Conseil</p>
                    <p className="text-gray-700">{medInfo.conseil}</p>
                  </div>
                </div>
              )}

              {medInfo?.error && (
                <div className="bg-red-50 rounded-xl p-3 mt-3 text-red-600 text-sm">
                  Erreur lors du chargement des informations. Veuillez réessayer.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}