import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://iqesqrlozabinnaknsow.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlxZXNxcmxvemFiaW5uYWtuc293Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAzMTMxNzQsImV4cCI6MjA5NTg4OTE3NH0.IUov7mf87hexFAcfYbZ0CgAsVBBrg16Pk49jPI1JgJU'
);

const normalizeText = (text) => {
  return (text || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
};

const TRANSLATIONS_ENC = {
  fr: { title: '📖 Encyclopédie des Médicaments', search: '🔍 Rechercher par nom ou DCI...', back: '← Retour', assistant: '💊 Aide à la Vente', allCats: 'Toutes', count: 'médicament(s)', indication: '🏥 Indication', dosage: '📋 Posologie', adulte: 'Adulte', enfant: 'Enfant', nourrisson: 'Nourrisson', sideEffects: '⚠️ Effets secondaires', contra: '🚫 Contre-indications', advice: '💡 Conseil au patient', shelf: 'Étagère', noInfo: '⚠️ Aucune information médicale ajoutée. Modifiez ce médicament pour ajouter les détails.', age: 'ans' },
  en: { title: '📖 Medicine Encyclopedia', search: '🔍 Search by name or DCI...', back: '← Back', assistant: '💊 Sales Assistant', allCats: 'All', count: 'medicine(s)', indication: '🏥 Indication', dosage: '📋 Dosage', adulte: 'Adult', enfant: 'Child', nourrisson: 'Infant', sideEffects: '⚠️ Side effects', contra: '🚫 Contraindications', advice: '💡 Patient advice', shelf: 'Shelf', noInfo: '⚠️ No medical information added. Edit this medicine to add details.', age: 'years' },
  ar: { title: '📖 موسوعة الأدوية', search: '🔍 البحث بالاسم أو DCI...', back: '→ رجوع', assistant: '💊 مساعد البيع', allCats: 'الكل', count: 'دواء', indication: '🏥 الاستخدام', dosage: '📋 الجرعة', adulte: 'بالغ', enfant: 'طفل', nourrisson: 'رضيع', sideEffects: '⚠️ الآثار الجانبية', contra: '🚫 موانع الاستعمال', advice: '💡 نصيحة للمريض', shelf: 'الرف', noInfo: '⚠️ لا توجد معلومات طبية. قم بتعديل هذا الدواء لإضافة التفاصيل.', age: 'سنة' },
};

export default function Encyclopedie() {
  const navigate = useNavigate();
  const [lang, setLang] = useState('fr');
  const t = TRANSLATIONS_ENC[lang];
  const isRtl = lang === 'ar';

  const [medicines, setMedicines] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedMed, setSelectedMed] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('Toutes');

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from('medicines').select('*').order('name');
      if (data) setMedicines(data);
    };
    load();
  }, []);

  useEffect(() => {
    setSelectedCategory(t.allCats);
  }, [lang]);

  const categories = [t.allCats, ...new Set(medicines.map(m => m.category).filter(Boolean))].sort();

  const filtered = medicines
    .filter((med) => {
    const matchSearch = normalizeText(med.name).includes(normalizeText(search)) ||
      normalizeText(med.dci).includes(normalizeText(search)) ||
      normalizeText(med.indication).includes(normalizeText(search));
      const matchCat = selectedCategory === t.allCats || med.category === selectedCategory;
      return matchSearch && matchCat;
    })
    .filter((med, index, self) =>
      index === self.findIndex((m) => m.name?.toLowerCase() === med.name?.toLowerCase())
    );

  const hasInfo = (med) => med.indication || med.dosage_adulte || med.effets_secondaires || med.contre_indications;

  return (
    <div className="min-h-screen bg-gray-100" dir={isRtl ? 'rtl' : 'ltr'}>

      {/* Header */}
      <div className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/')} className="text-blue-600 hover:text-blue-800 font-semibold">
            {t.back}
          </button>
          <h1 className="text-2xl font-bold text-gray-800">{t.title}</h1>
        </div>
        <div className="flex items-center gap-3">
          {/* Language switcher */}
          <div className="flex rounded-xl overflow-hidden border border-gray-300 shadow-sm">
            {['fr', 'en', 'ar'].map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-3 py-2 text-sm font-semibold transition ${
                  lang === l ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {l === 'fr' ? 'FR' : l === 'en' ? 'EN' : 'عربية'}
              </button>
            ))}
          </div>
          <button onClick={() => navigate('/aide-vente')} className="bg-blue-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-blue-700 transition">
            {t.assistant}
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 flex gap-6">

        {/* LEFT — Search + list */}
        <div className="w-80 shrink-0 flex flex-col gap-3">
          <input
            type="text"
            placeholder={t.search}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white shadow"
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full p-3 rounded-xl border border-gray-300 text-sm focus:outline-none bg-white shadow"
          >
            {categories.map(c => <option key={c}>{c}</option>)}
          </select>

          <p className="text-xs text-gray-500">{filtered.length} {t.count}</p>

          <div className="flex flex-col gap-2 overflow-y-auto" style={{ maxHeight: '75vh' }}>
            {filtered.map((med) => (
              <button
                key={med.id || med.name}
                onClick={() => setSelectedMed(selectedMed?.id === med.id ? null : med)}
                className={`w-full p-3 rounded-xl border-2 transition ${
                  isRtl ? 'text-right' : 'text-left'
                } ${
                  selectedMed?.id === med.id
                    ? 'bg-purple-50 border-purple-500'
                    : 'bg-white border-transparent hover:border-purple-300 shadow-sm'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-gray-800 text-sm">{med.name}</p>
                    {med.dci && <p className="text-xs text-gray-500 mt-1">{med.dci}</p>}
                    {med.category && (
                      <span className="inline-block mt-1 px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">
                        {med.category}
                      </span>
                    )}
                  </div>
                  {hasInfo(med) && <span className="text-green-500 text-xs mt-1 shrink-0">✅</span>}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT — Full medicine info */}
        <div className="flex-1">
          {!selectedMed && (
            <div className="bg-white rounded-2xl shadow p-10 border border-gray-200 text-center text-gray-400 mt-20">
              <p className="text-5xl mb-4">📖</p>
              <p className="text-lg font-medium">
                {lang === 'fr' ? 'Sélectionnez un médicament pour afficher sa fiche complète' :
                 lang === 'en' ? 'Select a medicine to display its full information sheet' :
                 'اختر دواءً لعرض بطاقته الكاملة'}
              </p>
            </div>
          )}

          {selectedMed && (
            <div className="bg-white rounded-2xl shadow p-6 border border-gray-200">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{selectedMed.name}</h2>
                  {selectedMed.dci && <p className="text-gray-500 mt-1">DCI: <span className="font-semibold">{selectedMed.dci}</span></p>}
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {selectedMed.category && (
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm font-semibold rounded-full">{selectedMed.category}</span>
                    )}
                    {selectedMed.forme && (
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm font-semibold rounded-full">{selectedMed.forme}</span>
                    )}
                    {selectedMed.age_min !== null && selectedMed.age_max !== null && (
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full">
                        {selectedMed.age_min}-{selectedMed.age_max} {t.age}
                      </span>
                    )}
                  </div>
                </div>
                <div className={`text-sm text-gray-500 ${isRtl ? 'text-left' : 'text-right'}`}>
                  <p>{t.shelf}: <span className="font-bold text-gray-700">{selectedMed.shelf}</span></p>
                  {selectedMed.expiry && <p>Exp: {selectedMed.expiry}</p>}
                  {selectedMed.quantity && <p>Qté: {selectedMed.quantity} {selectedMed.quantityType || ''}</p>}
                </div>
              </div>

              {!hasInfo(selectedMed) && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-center text-yellow-700 text-sm">
                  {t.noInfo}
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                {selectedMed.indication && (
                  <div className="bg-blue-50 rounded-xl p-4 col-span-2">
                    <p className="font-bold text-blue-700 mb-2">{t.indication}</p>
                    <p className="text-sm text-gray-700">
                      <bdi>{selectedMed.indication}</bdi>
                    </p>
                  </div>
                )}
                {(selectedMed.dosage_adulte || selectedMed.dosage_enfant || selectedMed.dosage_nourrisson) && (
                  <div className="bg-green-50 rounded-xl p-4">
                    <p className="font-bold text-green-700 mb-2">{t.dosage}</p>
                    {selectedMed.dosage_adulte && (
                      <p className="text-sm">
                        <span className="font-semibold">{t.adulte}:</span> <bdi>{selectedMed.dosage_adulte}</bdi>
                      </p>
                    )}
                    {selectedMed.dosage_enfant && (
                      <p className="text-sm mt-1">
                        <span className="font-semibold">{t.enfant}:</span> <bdi>{selectedMed.dosage_enfant}</bdi>
                      </p>
                    )}
                    {selectedMed.dosage_nourrisson && (
                      <p className="text-sm mt-1">
                        <span className="font-semibold">{t.nourrisson}:</span> <bdi>{selectedMed.dosage_nourrisson}</bdi>
                      </p>
                    )}
                  </div>
                )}
                {selectedMed.effets_secondaires && (
                  <div className="bg-orange-50 rounded-xl p-4">
                    <p className="font-bold text-orange-700 mb-2">{t.sideEffects}</p>
                    <p className="text-sm text-gray-700">
                      <bdi>{selectedMed.effets_secondaires}</bdi>
                    </p>
                  </div>
                )}
                {selectedMed.contre_indications && (
                  <div className="bg-red-50 rounded-xl p-4">
                    <p className="font-bold text-red-700 mb-2">{t.contra}</p>
                    <p className="text-sm text-gray-700">
                      <bdi>{selectedMed.contre_indications}</bdi>
                    </p>
                  </div>
                )}
                {selectedMed.conseil && (
                  <div className="bg-purple-50 rounded-xl p-4 col-span-2">
                    <p className="font-bold text-purple-700 mb-2">{t.advice}</p>
                    <p className="text-sm text-gray-700">
                      <bdi>{selectedMed.conseil}</bdi>
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}