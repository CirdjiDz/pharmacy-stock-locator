import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://iqesqrlozabinnaknsow.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlxZXNxcmxvemFiaW5uYWtuc293Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAzMTMxNzQsImV4cCI6MjA5NTg4OTE3NH0.IUov7mf87hexFAcfYbZ0CgAsVBBrg16Pk49jPI1JgJU'
);

const TRANSLATIONS = {
  fr: {
    title: '💊 Aide à la Vente',
    search: '🔍 Rechercher...',
    ageTitle: '👤 Âge du patient',
    agePlaceholder: 'Âge (ans)',
    conditionTitle: '🏥 Condition',
    formeTitle: '💉 Forme',
    allConditions: 'Toutes',
    allFormes: 'Toutes',
    noResults: 'Aucun médicament trouvé pour ces filtres',
    found: 'médicament(s) trouvé(s)',
    patient: 'Patient',
    years: 'ans',
    dosage: 'Posologie',
    shelf: 'Étagère',
    sideEffects: '⚠️ Effets secondaires',
    contraindications: '🚫 Contre-indications',
    advice: '💡 Conseil',
    noInfo: 'Aucune information médicale ajoutée pour ce médicament',
    back: '← Retour',
    encyclopedia: '📖 Encyclopédie',
    presets: [
      { label: '👶 Nourrisson', min: 0, max: 2 },
      { label: '🧒 Enfant', min: 3, max: 11 },
      { label: '🧑 Adolescent', min: 12, max: 17 },
      { label: '👨 Adulte', min: 18, max: 64 },
      { label: '👴 Sénior', min: 65, max: 120 },
    ],
    conditions: [
      'Toutes', 'Grippe / Rhume', 'Douleur / Fièvre', 'Infection bactérienne',
      'Allergie', 'Troubles digestifs', 'Diabète', 'Hypertension', 'Toux',
      'Infection fongique', 'Inflammation', 'Troubles neurologiques',
      'Gynécologie', 'Vitamines / Compléments', 'Ophtalmologie / ORL',
      'Dermatologie', 'Urologie', 'Psychiatrie'
    ],
    formes: ['Toutes', 'Comprimé', 'Sirop', 'Gélule', 'Crème / Pommade', 'Injectable', 'Gouttes', 'Sachet', 'Suppositoire'],
  },
  en: {
    title: '💊 Sales Assistant',
    search: '🔍 Search...',
    ageTitle: '👤 Patient Age',
    agePlaceholder: 'Age (years)',
    conditionTitle: '🏥 Condition',
    formeTitle: '💉 Form',
    allConditions: 'All',
    allFormes: 'All',
    noResults: 'No medicines found for these filters',
    found: 'medicine(s) found',
    patient: 'Patient',
    years: 'years',
    dosage: 'Dosage',
    shelf: 'Shelf',
    sideEffects: '⚠️ Side effects',
    contraindications: '🚫 Contraindications',
    advice: '💡 Advice',
    noInfo: 'No medical information added for this medicine',
    back: '← Back',
    encyclopedia: '📖 Encyclopedia',
    presets: [
      { label: '👶 Infant', min: 0, max: 2 },
      { label: '🧒 Child', min: 3, max: 11 },
      { label: '🧑 Teenager', min: 12, max: 17 },
      { label: '👨 Adult', min: 18, max: 64 },
      { label: '👴 Senior', min: 65, max: 120 },
    ],
    conditions: [
      'All', 'Flu / Cold', 'Pain / Fever', 'Bacterial Infection',
      'Allergy', 'Digestive Issues', 'Diabetes', 'Hypertension', 'Cough',
      'Fungal Infection', 'Inflammation', 'Neurological Disorders',
      'Gynecology', 'Vitamins / Supplements', 'Ophthalmology / ENT',
      'Dermatology', 'Urology', 'Psychiatry'
    ],
    formes: ['All', 'Tablet', 'Syrup', 'Capsule', 'Cream / Ointment', 'Injectable', 'Drops', 'Sachet', 'Suppository'],
  },
  ar: {
    title: '💊 مساعد البيع',
    search: '🔍 بحث...',
    ageTitle: '👤 عمر المريض',
    agePlaceholder: 'العمر (سنة)',
    conditionTitle: '🏥 الحالة المرضية',
    formeTitle: '💉 الشكل الدوائي',
    allConditions: 'الكل',
    allFormes: 'الكل',
    noResults: 'لا يوجد دواء لهذه المعايير',
    found: 'دواء موجود',
    patient: 'المريض',
    years: 'سنة',
    dosage: 'الجرعة',
    shelf: 'الرف',
    sideEffects: '⚠️ الآثار الجانبية',
    contraindications: '🚫 موانع الاستعمال',
    advice: '💡 نصيحة',
    noInfo: 'لا توجد معلومات طبية لهذا الدواء',
    back: '→ رجوع',
    encyclopedia: '📖 الموسوعة',
    presets: [
      { label: '👶 رضيع', min: 0, max: 2 },
      { label: '🧒 طفل', min: 3, max: 11 },
      { label: '🧑 مراهق', min: 12, max: 17 },
      { label: '👨 بالغ', min: 18, max: 64 },
      { label: '👴 مسن', min: 65, max: 120 },
    ],
    conditions: [
      'الكل', 'أنفلونزا / زكام', 'ألم / حمى', 'عدوى بكتيرية',
      'حساسية', 'اضطرابات هضمية', 'السكري', 'ضغط الدم', 'سعال',
      'عدوى فطرية', 'التهاب', 'اضطرابات عصبية',
      'أمراض نسائية', 'فيتامينات / مكملات', 'طب العيون / أنف وأذن وحنجرة',
      'أمراض جلدية', 'المسالك البولية', 'الطب النفسي'
    ],
    formes: ['الكل', 'أقراص', 'شراب', 'كبسول', 'كريم / مرهم', 'حقن', 'قطرات', 'أكياس', 'تحاميل'],
  }
};

const CONDITION_MAP = {
  'Grippe / Rhume': ['respiratoire', 'rhume', 'grippe', 'orl'],
  'Douleur / Fièvre': ['douleur', 'inflammation', 'fièvre', 'antipyrétique'],
  'Infection bactérienne': ['anti-infectieux', 'antibiotique', 'infection'],
  'Allergie': ['allergie', 'antihistaminique', 'respiratoire'],
  'Troubles digestifs': ['gastro', 'digestif', 'intestinal'],
  'Diabète': ['diabète', 'endocrinologie', 'glycémie'],
  'Hypertension': ['cardio', 'hypertension', 'cardiaque'],
  'Toux': ['toux', 'respiratoire', 'bronchique'],
  'Infection fongique': ['antifongique', 'mycose', 'dermatologie', 'anti-infectieux'],
  'Inflammation': ['inflammation', 'douleur', 'anti-inflammatoire'],
  'Troubles neurologiques': ['neurologie', 'psychiatrie', 'neuro', 'muscles'],
  'Gynécologie': ['gynécologie', 'obstétrique', 'féminin'],
  'Vitamines / Compléments': ['vitamines', 'compléments', 'pédiatrie'],
  'Ophtalmologie / ORL': ['ophtalmologie', 'orl', 'oeil', 'oreille'],
  'Dermatologie': ['dermatologie', 'peau', 'cutané'],
  'Urologie': ['urologie', 'urinaire'],
  'Psychiatrie': ['psychiatrie', 'neurologie', 'anxiété', 'dépression'],
};

function conditionMatchesCategory(frCondition, category, indication, medCondition) {
  if (medCondition && medCondition === frCondition) return true;
  if (!category && !indication) return false;
  const text = `${category || ''} ${indication || ''}`.toLowerCase();
  const keywords = CONDITION_MAP[frCondition] || [];
  return keywords.some(k => text.includes(k));
}

function formMatchesName(frForm, name, forme) {
  if (forme) return forme.toLowerCase().includes(frForm.toLowerCase()) ||
    frForm.toLowerCase().includes(forme.toLowerCase());
  if (!name) return false;
  const n = name.toLowerCase();
  const map = {
    'Comprimé': ['comp', 'comprimé', 'tablet', 'cp'],
    'Sirop': ['sirop', 'sol buv', 'solution buvable'],
    'Gélule': ['gélule', 'gelule', 'capsule'],
    'Crème / Pommade': ['crème', 'creme', 'pommade', 'gel'],
    'Injectable': ['inj', 'injectable', 'amp', 'sol inj'],
    'Gouttes': ['gouttes', 'collyre', 'coll'],
    'Sachet': ['sachet'],
    'Suppositoire': ['suppo', 'suppositoire'],
  };
  const keywords = map[frForm] || [];
  return keywords.some(k => n.includes(k));
}

function getFrCondition(lang, conditionLabel, t) {
  if (lang === 'fr') return conditionLabel;
  const frConditions = TRANSLATIONS.fr.conditions;
  const thisConditions = t.conditions;
  const idx = thisConditions.indexOf(conditionLabel);
  return idx >= 0 ? frConditions[idx] : conditionLabel;
}

function getFrForm(lang, formLabel, t) {
  if (lang === 'fr') return formLabel;
  const frForms = TRANSLATIONS.fr.formes;
  const thisForms = t.formes;
  const idx = thisForms.indexOf(formLabel);
  return idx >= 0 ? frForms[idx] : formLabel;
}

export default function AideVente() {
  const navigate = useNavigate();
  const [lang, setLang] = useState('fr');
  const t = TRANSLATIONS[lang];
  const isRtl = lang === 'ar';

  const [medicines, setMedicines] = useState([]);
  const [selectedCondition, setSelectedCondition] = useState(t.allConditions);
  const [selectedForm, setSelectedForm] = useState(t.allFormes);
  const [search, setSearch] = useState('');
  const [selectedMed, setSelectedMed] = useState(null);
  const [patientAge, setPatientAge] = useState('');
  const [selectedPreset, setSelectedPreset] = useState(null);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from('medicines').select('*');
      if (data) setMedicines(data);
    };
    load();
  }, []);

  useEffect(() => {
    setSelectedCondition(t.allConditions);
    setSelectedForm(t.allFormes);
    setSelectedPreset(null);
  }, [lang]);

  const handlePreset = (preset) => {
    if (selectedPreset?.label === preset.label) {
      setSelectedPreset(null);
      setPatientAge('');
    } else {
      setSelectedPreset(preset);
      setPatientAge(String(preset.min));
    }
  };

  const filtered = medicines.filter((med) => {
    const frCondition = getFrCondition(lang, selectedCondition, t);
    const frForm = getFrForm(lang, selectedForm, t);
    const isAllCondition = selectedCondition === t.allConditions;
    const isAllForm = selectedForm === t.allFormes;
    const matchCondition = isAllCondition || conditionMatchesCategory(frCondition, med.category, med.indication, med.condition);
    const matchSearch = med.name?.toLowerCase().includes(search.toLowerCase()) ||
      med.dci?.toLowerCase().includes(search.toLowerCase()) ||
      med.indication?.toLowerCase().includes(search.toLowerCase());
    const matchForm = isAllForm || formMatchesName(frForm, med.name, med.forme);
    const matchAge = !patientAge || (() => {
      const age = parseInt(patientAge);
      if (isNaN(age)) return true;
      const hasAgeData = med.age_min !== null && med.age_max !== null;
      if (!hasAgeData) return true;
      return age >= med.age_min && age <= med.age_max;
    })();
    return matchCondition && matchSearch && matchForm && matchAge;
  });

  const getDosageForAge = (med) => {
    if (!patientAge) return null;
    const age = parseInt(patientAge);
    if (isNaN(age)) return null;
    if (age <= 2 && med.dosage_nourrisson) return { label: t.presets[0].label, dose: med.dosage_nourrisson };
    if (age <= 11 && med.dosage_enfant) return { label: t.presets[1].label, dose: med.dosage_enfant };
    if (med.dosage_adulte) return { label: t.presets[3].label, dose: med.dosage_adulte };
    return null;
  };

  const presetColors = [
    'bg-pink-100 text-pink-700 border-pink-300',
    'bg-yellow-100 text-yellow-700 border-yellow-300',
    'bg-blue-100 text-blue-700 border-blue-300',
    'bg-green-100 text-green-700 border-green-300',
    'bg-purple-100 text-purple-700 border-purple-300',
  ];

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
          <button onClick={() => navigate('/encyclopedie')} className="bg-purple-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-purple-700 transition">
            {t.encyclopedia}
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 flex gap-6">
        {/* LEFT — Filters */}
        <div className="w-64 shrink-0 flex flex-col gap-4">
          <input
            type="text"
            placeholder={t.search}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white shadow"
          />

          {/* Age Filter */}
          <div className="bg-white rounded-2xl shadow p-4 border border-gray-200">
            <h3 className={`font-bold text-gray-700 mb-3 ${isRtl ? 'text-right' : ''}`}>{t.ageTitle}</h3>
            <div className="flex gap-2 mb-3">
              <input
                type="number"
                placeholder={t.agePlaceholder}
                value={patientAge}
                onChange={(e) => { setPatientAge(e.target.value); setSelectedPreset(null); }}
                className="w-full p-2 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                min="0" max="120"
              />
              {patientAge && (
                <button onClick={() => { setPatientAge(''); setSelectedPreset(null); }}
                  className="px-3 py-2 bg-gray-200 rounded-xl text-sm hover:bg-gray-300 transition">✕</button>
              )}
            </div>
            <div className="flex flex-col gap-2">
              {t.presets.map((preset, i) => (
                <button
                  key={preset.label}
                  onClick={() => handlePreset(preset)}
                  className={`${isRtl ? 'text-right' : 'text-left'} px-3 py-2 rounded-xl text-sm font-medium border transition ${
                    selectedPreset?.label === preset.label
                      ? presetColors[i] + ' border-2'
                      : 'bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  {preset.label}
                  <span className="text-xs ml-1 opacity-60">({preset.min}-{preset.max} {t.years})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Condition Filter */}
          <div className="bg-white rounded-2xl shadow p-4 border border-gray-200">
            <h3 className={`font-bold text-gray-700 mb-3 ${isRtl ? 'text-right' : ''}`}>{t.conditionTitle}</h3>
            <div className="flex flex-col gap-1 overflow-y-auto" style={{ maxHeight: '300px' }}>
              {t.conditions.map((c) => (
                <button key={c} onClick={() => setSelectedCondition(c)}
                  className={`${isRtl ? 'text-right' : 'text-left'} px-3 py-2 rounded-xl text-sm transition font-medium ${
                    selectedCondition === c ? 'bg-blue-600 text-white' : 'hover:bg-gray-100 text-gray-700'
                  }`}>
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Form Filter */}
          <div className="bg-white rounded-2xl shadow p-4 border border-gray-200">
            <h3 className={`font-bold text-gray-700 mb-3 ${isRtl ? 'text-right' : ''}`}>{t.formeTitle}</h3>
            <div className="flex flex-col gap-1">
              {t.formes.map((f) => (
                <button key={f} onClick={() => setSelectedForm(f)}
                  className={`${isRtl ? 'text-right' : 'text-left'} px-3 py-2 rounded-xl text-sm transition font-medium ${
                    selectedForm === f ? 'bg-orange-500 text-white' : 'hover:bg-gray-100 text-gray-700'
                  }`}>
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* MIDDLE — Medicine list */}
        <div className="flex-1 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500 font-medium">{filtered.length} {t.found}</p>
            {patientAge && (
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                {isRtl ? `${t.years} ${patientAge} :${t.patient}` : `${t.patient}: ${patientAge} ${t.years}`}
              </span>
            )}
          </div>

          {filtered.map((med) => {
            const dosage = getDosageForAge(med);
            return (
              <button
                key={med.id || med.name}
                onClick={() => setSelectedMed(selectedMed?.id === med.id ? null : med)}
                className={`w-full bg-white rounded-2xl shadow p-4 border-2 transition hover:border-blue-400 ${
                  isRtl ? 'text-right' : 'text-left'
                } ${
                  selectedMed?.id === med.id ? 'border-blue-500 bg-blue-50' : 'border-transparent'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="font-bold text-gray-800">{med.name}</p>
                    {med.dci && <p className="text-xs text-gray-500 mt-1">DCI: {med.dci}</p>}
                    {med.indication && (
                      <p className="text-xs text-gray-600 mt-1 italic">
                        <bdi>{med.indication.slice(0, 80)}{med.indication.length > 80 ? '...' : ''}</bdi>
                      </p>
                    )}
                    <div className={`flex gap-2 flex-wrap mt-2 ${isRtl ? 'flex-row-reverse justify-end' : ''}`}>
                      {med.category && <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">{med.category}</span>}
                      {med.forme && <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full">{med.forme}</span>}
                      {med.condition && <span className="px-2 py-1 bg-teal-100 text-teal-700 text-xs font-semibold rounded-full">{med.condition}</span>}
                    </div>
                    {dosage && (
                      <div className="mt-2 bg-green-50 border border-green-200 rounded-xl px-3 py-2">
                        <p className="text-xs font-bold text-green-700">💊 {t.dosage} {dosage.label}:</p>
                        <p className="text-xs text-green-800 mt-1">
                          <bdi>{dosage.dose}</bdi>
                        </p>
                      </div>
                    )}
                  </div>
                  <div className={`text-xs text-gray-400 shrink-0 ${isRtl ? 'text-left ml-0 mr-4' : 'text-right ml-4'}`}>
                    <p>{t.shelf}: <span className="font-bold text-gray-600">{med.shelf}</span></p>
                    {med.expiry && <p>Exp: {med.expiry}</p>}
                    {med.quantity && <p>Qté: {med.quantity} {med.quantityType || ''}</p>}
                  </div>
                </div>

                {selectedMed?.id === med.id && (
                  <div className="mt-4 pt-4 border-t flex flex-col gap-3">
                    {med.effets_secondaires && (
                      <div className="bg-orange-50 rounded-xl p-3">
                        <p className="text-xs font-bold text-orange-700 mb-1">{t.sideEffects}</p>
                        <p className="text-xs text-gray-700">
                          <bdi>{med.effets_secondaires}</bdi>
                        </p>
                      </div>
                    )}
                    {med.contre_indications && (
                      <div className="bg-red-50 rounded-xl p-3">
                        <p className="text-xs font-bold text-red-700 mb-1">{t.contraindications}</p>
                        <p className="text-xs text-gray-700">
                          <bdi>{med.contre_indications}</bdi>
                        </p>
                      </div>
                    )}
                    {med.conseil && (
                      <div className="bg-purple-50 rounded-xl p-3">
                        <p className="text-xs font-bold text-purple-700 mb-1">{t.advice}</p>
                        <p className="text-xs text-gray-700">
                          <bdi>{med.conseil}</bdi>
                        </p>
                      </div>
                    )}
                    {!med.dosage_adulte && !med.effets_secondaires && !med.contre_indications && (
                      <p className="text-xs text-gray-400 text-center italic">{t.noInfo}</p>
                    )}
                  </div>
                )}
              </button>
            );
          })}

          {filtered.length === 0 && (
            <div className="text-center text-gray-400 mt-20 text-lg">{t.noResults}</div>
          )}
        </div>
      </div>
    </div>
  );
}