import { useState } from "react";

const TRANSLATIONS = {
  fr: {
    title: "Aide Décisionnelle",
    subtitle: "Guide thérapeutique interactif",
    restart: "🔄 Recommencer",
    start: "Début",
    step: "Étape",
    on: "sur",
    recommendation: "Recommandation thérapeutique",
    medicines: "💊 Médicaments recommandés",
    back: "← Retour",
    newConsult: "🔄 Nouvelle consultation",
    prevStep: "← Retour à l'étape précédente",
    categories: "Catégories",
    pathologies: "Pathologies couvertes",
    medicinesRef: "Médicaments référencés",
  },
  ar: {
    title: "المساعد التشخيصي",
    subtitle: "دليل علاجي تفاعلي",
    restart: "🔄 ابدأ من جديد",
    start: "البداية",
    step: "خطوة",
    on: "من",
    recommendation: "التوصية العلاجية",
    medicines: "💊 الأدوية الموصى بها",
    back: "→ رجوع",
    newConsult: "🔄 استشارة جديدة",
    prevStep: "→ العودة للخطوة السابقة",
    categories: "الفئات",
    pathologies: "الحالات المغطاة",
    medicinesRef: "الأدوية المرجعية",
  },
};

const TREE = {
  start: {
    question: "Quelle est la catégorie principale ?",
    icon: "🏥",
    options: [
      { label: "❤️ Cardio / Hypertension", next: "cardio" },
      { label: "🫁 Respiratoire / Asthme", next: "respi" },
      { label: "🧪 Gastro-intestinal", next: "gastro" },
      { label: "💊 Douleur / Inflammation", next: "douleur" },
      { label: "🧠 Neurologie / Psychiatrie", next: "neuro" },
      { label: "🔬 Anti-infectieux", next: "infectieux" },
      { label: "🩺 Endocrinologie / Diabète", next: "diabete" },
      { label: "👶 Pédiatrie", next: "pediatrie" },
      { label: "🌸 Gynécologie", next: "gyneco" },
      { label: "🔵 Dermatologie", next: "dermato" },
      { label: "👁️ Ophtalmologie / ORL", next: "ophtalmo" },
      { label: "🚽 Urologie", next: "urologie" },
      { label: "🍊 Vitamines / Compléments", next: "vitamines" },
    ],
  },

  // CARDIO
  cardio: {
    question: "Quel est le problème cardiaque ?",
    icon: "❤️",
    options: [
      { label: "Hypertension artérielle", next: "cardio_hta" },
      { label: "Angine de poitrine / Angor", next: "cardio_angor" },
      { label: "Insuffisance cardiaque", next: "cardio_ic" },
      { label: "Troubles du rythme", next: "cardio_rythme" },
      { label: "Prévention cardiovasculaire", next: "cardio_prevention" },
      { label: "Insuffisance veineuse / Jambes lourdes", next: "cardio_veineux" },
    ],
  },
  cardio_hta: {
    question: "Y a-t-il une contre-indication particulière ?",
    icon: "❤️",
    options: [
      { label: "Aucune contre-indication", next: "result_hta_general" },
      { label: "Patient diabétique ou insuffisance rénale", next: "result_hta_diabete" },
      { label: "Grossesse", next: "result_hta_grossesse" },
      { label: "Intolérance à la toux (IEC)", next: "result_hta_sartan" },
      { label: "Rétention d'eau / Œdèmes", next: "result_hta_diuretique" },
      { label: "Cholestérol élevé associé", next: "result_hta_cholesterol" },
    ],
  },
  cardio_angor: {
    question: "Type d'angor ?",
    icon: "❤️",
    options: [
      { label: "Prévention des crises (traitement de fond)", next: "result_angor_fond" },
      { label: "Crise aiguë", next: "result_angor_aigu" },
    ],
  },
  cardio_ic: {
    question: "Sévérité de l'insuffisance cardiaque ?",
    icon: "❤️",
    options: [
      { label: "Légère à modérée", next: "result_ic_legere" },
      { label: "Sévère avec rétention hydrique", next: "result_ic_severe" },
    ],
  },
  cardio_rythme: {
    question: "Type de trouble du rythme ?",
    icon: "❤️",
    options: [
      { label: "Tachycardie / Fibrillation auriculaire", next: "result_rythme_tachy" },
      { label: "Contrôle de la fréquence cardiaque", next: "result_rythme_freq" },
    ],
  },
  cardio_prevention: {
    question: "Type de prévention cardiovasculaire ?",
    icon: "❤️",
    options: [
      { label: "Antiagrégant plaquettaire (après infarctus, AVC)", next: "result_prevention_antiagr" },
      { label: "Anticoagulant (thrombose veineuse)", next: "result_prevention_anticoag" },
      { label: "Hypolipémiant (cholestérol)", next: "result_prevention_statine" },
    ],
  },
  cardio_veineux: {
    question: "Gravité de l'insuffisance veineuse ?",
    icon: "❤️",
    options: [
      { label: "Légère à modérée (jambes lourdes)", next: "result_veineux_leger" },
      { label: "Hémorroïdes", next: "result_veineux_hemorroides" },
    ],
  },

  // RESPIRATOIRE
  respi: {
    question: "Quel est le problème respiratoire ?",
    icon: "🫁",
    options: [
      { label: "Asthme (traitement de fond)", next: "respi_asthme_fond" },
      { label: "Crise d'asthme (bronchospasme aigu)", next: "result_asthme_crise" },
      { label: "Toux sèche irritative", next: "result_toux_seche" },
      { label: "Toux grasse / Mucus épais", next: "result_toux_grasse" },
      { label: "Rhinite allergique / Allergie nasale", next: "respi_allergie" },
      { label: "Allergie cutanée / Urticaire", next: "result_allergie_cutanee" },
      { label: "Congestion nasale (rhume)", next: "result_congestion" },
    ],
  },
  respi_asthme_fond: {
    question: "Sévérité de l'asthme ?",
    icon: "🫁",
    options: [
      { label: "Léger intermittent", next: "result_asthme_leger" },
      { label: "Persistant modéré à sévère", next: "result_asthme_severe" },
    ],
  },
  respi_allergie: {
    question: "Âge du patient ?",
    icon: "🫁",
    options: [
      { label: "Adulte (> 12 ans)", next: "result_allergie_adulte" },
      { label: "Enfant (2 à 12 ans)", next: "result_allergie_enfant" },
      { label: "Nourrisson (< 2 ans)", next: "result_allergie_nourr" },
    ],
  },

  // GASTRO
  gastro: {
    question: "Quel est le problème gastro-intestinal ?",
    icon: "🧪",
    options: [
      { label: "Brûlures d'estomac / Reflux (RGO)", next: "result_rgo" },
      { label: "Douleurs / Spasmes intestinaux", next: "result_spasmes" },
      { label: "Diarrhée aiguë", next: "gastro_diarrhee" },
      { label: "Constipation", next: "result_constipation" },
      { label: "Ballonnements / Gaz", next: "result_gaz" },
      { label: "Nausées / Vomissements", next: "result_nausees" },
    ],
  },
  gastro_diarrhee: {
    question: "Âge du patient ?",
    icon: "🧪",
    options: [
      { label: "Adulte", next: "result_diarrhee_adulte" },
      { label: "Enfant / Nourrisson", next: "result_diarrhee_enfant" },
    ],
  },

  // DOULEUR
  douleur: {
    question: "Type et intensité de la douleur ?",
    icon: "💊",
    options: [
      { label: "Douleur légère à modérée / Fièvre", next: "douleur_legere" },
      { label: "Douleur inflammatoire / Rhumatismale", next: "douleur_inflam" },
      { label: "Douleur musculaire / Contracture", next: "result_muscle" },
      { label: "Douleur locale topique (gel/crème)", next: "result_topique" },
    ],
  },
  douleur_legere: {
    question: "Âge du patient ?",
    icon: "💊",
    options: [
      { label: "Adulte (> 15 ans)", next: "result_douleur_adulte" },
      { label: "Enfant (6 à 15 ans)", next: "result_douleur_enfant" },
      { label: "Nourrisson (< 6 ans)", next: "result_douleur_nourr" },
    ],
  },
  douleur_inflam: {
    question: "Y a-t-il des contre-indications aux AINS ?",
    icon: "💊",
    options: [
      { label: "Aucune contre-indication", next: "result_ains_general" },
      { label: "Ulcère / Problème gastrique", next: "result_ains_gastro" },
      { label: "Grossesse (> 6 mois) ou enfant < 12 ans", next: "result_ains_contre" },
    ],
  },

  // NEURO
  neuro: {
    question: "Quel est le trouble neurologique ou psychiatrique ?",
    icon: "🧠",
    options: [
      { label: "Dépression / Anxiété", next: "result_depression" },
      { label: "Épilepsie", next: "result_epilepsie" },
      { label: "Schizophrénie / Troubles bipolaires", next: "result_psychose" },
      { label: "Vertiges / Acouphènes", next: "result_vertiges" },
      { label: "Douleurs neuropathiques", next: "result_neuropathie" },
      { label: "Maladie de Parkinson", next: "result_parkinson" },
      { label: "Contractures spastiques (SEP, AVC)", next: "result_spasticite" },
    ],
  },

  // INFECTIEUX
  infectieux: {
    question: "Type d'infection ?",
    icon: "🔬",
    options: [
      { label: "Infection respiratoire (angine, bronchite, pneumonie)", next: "infectieux_respi" },
      { label: "Infection ORL (otite, sinusite)", next: "result_orl_infection" },
      { label: "Infection urinaire", next: "result_urinaire" },
      { label: "Infection cutanée / Dentaire", next: "result_cutanee" },
      { label: "Infection parasitaire / Digestive", next: "result_parasitaire" },
      { label: "Mycose cutanée", next: "result_mycose_cutanee" },
      { label: "Mycose génitale", next: "result_mycose_genitale" },
    ],
  },
  infectieux_respi: {
    question: "Allergie aux pénicillines ?",
    icon: "🔬",
    options: [
      { label: "Non (pas d'allergie)", next: "result_respi_amox" },
      { label: "Oui (allergie pénicillines)", next: "result_respi_allergie" },
    ],
  },

  // DIABETE
  diabete: {
    question: "Type de prise en charge du diabète ?",
    icon: "🩺",
    options: [
      { label: "Diabète type 2 — 1ère intention", next: "result_diabete_1" },
      { label: "Diabète type 2 — insuffisamment contrôlé", next: "result_diabete_2" },
      { label: "Thyroïde — hypothyroïdie", next: "result_hypothyroidie" },
      { label: "Thyroïde — hyperthyroïdie", next: "result_hyperthyroidie" },
    ],
  },

  // PEDIATRIE
  pediatrie: {
    question: "Quel est le problème chez l'enfant ?",
    icon: "👶",
    options: [
      { label: "Fièvre / Douleur", next: "pediatrie_fievre" },
      { label: "Toux / Rhume", next: "result_pediatrie_toux" },
      { label: "Diarrhée / Troubles digestifs", next: "result_pediatrie_digestif" },
      { label: "Allergie", next: "result_allergie_enfant" },
      { label: "Vitamines / Compléments", next: "result_pediatrie_vitamines" },
    ],
  },
  pediatrie_fievre: {
    question: "Âge de l'enfant ?",
    icon: "👶",
    options: [
      { label: "Nourrisson < 3 mois", next: "result_fievre_nourr" },
      { label: "Nourrisson 3 mois à 2 ans", next: "result_fievre_bebe" },
      { label: "Enfant 2 à 12 ans", next: "result_fievre_enfant" },
    ],
  },

  // GYNECO
  gyneco: {
    question: "Quel est le besoin gynécologique ?",
    icon: "🌸",
    options: [
      { label: "Contraception", next: "gyneco_contra" },
      { label: "Supplément grossesse (acide folique, fer)", next: "result_grossesse_suppl" },
      { label: "Trouble du cycle / Progestérone", next: "result_cycle" },
      { label: "Ménopause / Atrophie vaginale", next: "result_menopause" },
      { label: "Infection vaginale", next: "result_vaginite" },
      { label: "Fertilité", next: "result_fertilite" },
    ],
  },
  gyneco_contra: {
    question: "Type de contraception souhaité ?",
    icon: "🌸",
    options: [
      { label: "Pilule combinée (œstro-progestative)", next: "result_pilule_combinee" },
      { label: "Pilule progestative seule (mini-pilule)", next: "result_pilule_progest" },
      { label: "Pilule pour acné + contraception", next: "result_pilule_acne" },
    ],
  },

  // DERMATO
  dermato: {
    question: "Quel est le problème dermatologique ?",
    icon: "🔵",
    options: [
      { label: "Acné", next: "dermato_acne" },
      { label: "Eczéma / Dermatite atopique", next: "dermato_eczema" },
      { label: "Psoriasis", next: "result_psoriasis" },
      { label: "Mycose cutanée", next: "result_mycose_cutanee" },
      { label: "Infection bactérienne cutanée", next: "result_cutanee" },
      { label: "Peau sèche / Hydratation", next: "result_hydratation" },
      { label: "Gale / Parasitose", next: "result_gale" },
    ],
  },
  dermato_acne: {
    question: "Sévérité de l'acné ?",
    icon: "🔵",
    options: [
      { label: "Légère (points noirs, quelques boutons)", next: "result_acne_legere" },
      { label: "Modérée à sévère", next: "result_acne_severe" },
    ],
  },
  dermato_eczema: {
    question: "Sévérité de l'eczéma ?",
    icon: "🔵",
    options: [
      { label: "Légère (légère rougeur, sécheresse)", next: "result_eczema_leger" },
      { label: "Modérée à sévère (plaques épaisses, suintement)", next: "result_eczema_severe" },
    ],
  },

  // OPHTALMO
  ophtalmo: {
    question: "Quel est le problème ophtalmologique / ORL ?",
    icon: "👁️",
    options: [
      { label: "Conjonctivite bactérienne", next: "result_conjonctivite" },
      { label: "Conjonctivite allergique", next: "result_conjonctivite_allergie" },
      { label: "Sécheresse oculaire", next: "result_secheresse_oculaire" },
      { label: "Glaucome / Hypertension oculaire", next: "result_glaucome" },
      { label: "Inflammation oculaire post-opératoire", next: "result_inflam_oculaire" },
      { label: "Otite externe", next: "result_otite" },
    ],
  },

  // UROLOGIE
  urologie: {
    question: "Quel est le problème urologique ?",
    icon: "🚽",
    options: [
      { label: "Hypertrophie bénigne de la prostate (HBP)", next: "result_hbp" },
      { label: "Cystite (infection urinaire simple femme)", next: "result_urinaire" },
      { label: "Vessie hyperactive / Incontinence", next: "result_incontinence" },
    ],
  },
  // VITAMINES
    vitamines: {
    question: "Quel type de carence ou besoin ?",
    icon: "🍊",
    options: [
      { label: "Vitamine D (carence, prévention)", next: "result_vit_d" },
      { label: "Vitamine B12 / Neuropathie", next: "result_vit_b12" },
      { label: "Acide folique (grossesse, anémie)", next: "result_vit_folique" },
      { label: "Fer (anémie ferriprive)", next: "result_vit_fer" },
      { label: "Calcium / Os (ostéoporose)", next: "result_vit_calcium" },
      { label: "Multivitamines générales", next: "result_vit_multi" },
    ],
  },

  // ==================== RESULTS ====================

  // CARDIO RESULTS
  result_hta_general: {
    result: true,
    title: "Hypertension — 1ère intention",
    icon: "❤️",
    color: "#fee2e2",
    border: "#ef4444",
    medicines: [
      { name: "IEC (Ramipril — TRIATEC, Périndopril — COVERSYL)", alternatives: [], note: "1ère intention, préféré si diabète ou insuffisance rénale" },
      { name: "Sartan (Irbesartan — APROVEL)", alternatives: ["EXIRB"], note: "Si intolérance à la toux avec IEC" },
      { name: "Inhibiteur calcique (Amlodipine — AMLOR)", alternatives: [], note: "Efficace, bien toléré, pas de toux" },
      { name: "Diurétique thiazidique (Indapamide — FLUDEX LP)", alternatives: ["ADEX LP"], note: "En association ou monothérapie" },
    ],
    warning: "Surveiller: tension artérielle, fonction rénale, kaliémie",
  },
  result_hta_diabete: {
    result: true,
    title: "HTA + Diabète / Insuffisance rénale",
    icon: "❤️",
    color: "#fee2e2",
    border: "#ef4444",
    medicines: [
      { name: "IEC (COVERSYL, TRIATEC)", note: "Protection rénale démontrée — 1ère intention" },
      { name: "Sartan (APROVEL, BIOPRESS, ATACAND)", note: "Si intolérance aux IEC (pas de toux)" },
    ],
    warning: "Surveiller: créatinine, kaliémie, protéinurie",
  },
  result_hta_grossesse: {
    result: true,
    title: "HTA pendant la grossesse",
    icon: "❤️",
    color: "#fee2e2",
    border: "#ef4444",
    medicines: [
      { name: "Méthyldopa (ALDOMET)", note: "Référence pendant la grossesse — sûr pour le fœtus" },
    ],
    warning: "IEC et Sartans sont CONTRE-INDIQUÉS pendant la grossesse (2e et 3e trimestre)",
  },
  result_hta_sartan: {
    result: true,
    title: "HTA — Intolérance à la toux (IEC)",
    icon: "❤️",
    color: "#fee2e2",
    border: "#ef4444",
    medicines: [
      { name: "Irbesartan (APROVEL)", alternatives: ["EXIRB"], note: "Sartan — pas de toux" },
      { name: "Candésartan (ATACAND)", alternatives: ["BIOPRESS", "SARSAND"], note: "Sartan — très bien toléré" },
      { name: "Telmisartan (EXTEL)", alternatives: [], note: "Sartan — longue durée d'action" },
      { name: "Valsartan (EXVAL)", alternatives: [], note: "Sartan efficace" },
    ],
    warning: "Les Sartans n'entraînent pas de toux contrairement aux IEC",
  },
  result_hta_diuretique: {
    result: true,
    title: "HTA avec rétention d'eau / Œdèmes",
    icon: "❤️",
    color: "#fee2e2",
    border: "#ef4444",
    medicines: [
      { name: "Indapamide (FLUDEX LP, ADEX LP)", note: "Diurétique thiazidique — hypertension" },
      { name: "Furosémide (FUROZAL)", note: "Diurétique de l'anse — œdèmes importants" },
      { name: "Spironolactone (SPIRONOLONE)", note: "Épargneur de potassium — insuffisance cardiaque" },
    ],
    warning: "Surveiller la kaliémie. Prendre le matin pour éviter les réveils nocturnes",
  },
  result_angor_fond: {
    result: true,
    title: "Angor — Traitement de fond",
    icon: "❤️",
    color: "#fee2e2",
    border: "#ef4444",
    medicines: [
      { name: "Bisoprolol (BIPROTENS)", alternatives: ["BIPROSTENE"], note: "Bêtabloquant — 1ère intention" },
      { name: "Amlodipine (AMLOR)", alternatives: [], note: "Inhibiteur calcique — alternative ou association" },
      { name: "Trimétazidine (VASTAREL)", alternatives: [], note: "Anti-ischémique métabolique — en appoint" },
    ],
    warning: "Ne jamais arrêter brutalement les bêtabloquants",
  },
  result_angor_aigu: {
    result: true,
    title: "Crise d'angor aiguë",
    icon: "❤️",
    color: "#fee2e2",
    border: "#ef4444",
    medicines: [
      { name: "Trinitrine sublinguale", note: "Médicament de la crise — effet en 2 à 3 minutes" },
      { name: "Molsidomine (MOLSIDOMINE BEKER)", note: "Alternative si intolérance aux nitrates" },
    ],
    warning: "Si douleur persiste > 15 minutes malgré trinitrine: URGENCE — appeler le 15",
  },
  result_ic_legere: {
    result: true,
    title: "Insuffisance cardiaque légère à modérée",
    icon: "❤️",
    color: "#fee2e2",
    border: "#ef4444",
    medicines: [
      { name: "Périndopril (COVERSYL) ou Ramipril (TRIATEC)", note: "IEC — améliore la survie" },
      { name: "Bisoprolol (BIPROTENS)", note: "Bêtabloquant — dose progressive" },
      { name: "Nébivolol (BYZOLEX)", note: "Bêtabloquant préféré chez la personne âgée > 70 ans" },
    ],
    warning: "Augmentation très progressive des doses. Surveillance médicale régulière",
  },
  result_ic_severe: {
    result: true,
    title: "Insuffisance cardiaque sévère avec rétention hydrique",
    icon: "❤️",
    color: "#fee2e2",
    border: "#ef4444",
    medicines: [
      { name: "Furosémide (FUROZAL)", note: "Diurétique de l'anse — réduit les œdèmes" },
      { name: "Spironolactone (SPIRONOLONE)", note: "Épargneur de potassium — améliore la survie" },
    ],
    warning: "Surveiller poids quotidien, kaliémie, créatinine",
  },
  result_rythme_tachy: {
    result: true,
    title: "Tachycardie / Fibrillation auriculaire",
    icon: "❤️",
    color: "#fee2e2",
    border: "#ef4444",
    medicines: [
      { name: "Vérapamil (ISOPTYL)", note: "Inhibiteur calcique bradycardisant" },
      { name: "Flécaïnide (FLECALUR)", note: "Antiarythmique classe IC — sur avis cardiologue" },
    ],
    warning: "Usage strictement sous surveillance cardiologique. ECG de contrôle obligatoire",
  },
  result_rythme_freq: {
    result: true,
    title: "Contrôle de la fréquence cardiaque",
    icon: "❤️",
    color: "#fee2e2",
    border: "#ef4444",
    medicines: [
      { name: "Bisoprolol (BIPROTENS, BIPROSTENE)", note: "Bêtabloquant — ralentit le cœur" },
      { name: "Diltiazem (MONOTILDIEM)", note: "Inhibiteur calcique bradycardisant" },
    ],
    warning: "Ne jamais associer bisoprolol et diltiazem sans avis médical (risque de bloc)",
  },
  result_prevention_antiagr: {
    result: true,
    title: "Antiagrégant plaquettaire",
    icon: "❤️",
    color: "#fee2e2",
    border: "#ef4444",
     medicines: [
      { name: "Clopidogrel (PLAFIX)", alternatives: [], note: "1ère intention après infarctus / angioplastie" },
      { name: "Acide acétylsalicylique (ASPEC 100mg)", alternatives: ["ASPIRINE CARDIO"], note: "Faible dose — prévention cardiovasculaire" },
    ],
    warning: "Ne jamais arrêter sans avis médical. Informer chirurgien / dentiste avant toute opération",
  },
  result_prevention_anticoag: {
    result: true,
    title: "Anticoagulant — Prévention thrombose",
    icon: "❤️",
    color: "#fee2e2",
    border: "#ef4444",
    medicines: [
      { name: "Énoxaparine (VARENOX)", note: "Héparine bas poids moléculaire — injection sous-cutanée" },
    ],
    warning: "Usage hospitalier ou sous prescription médicale. Surveiller les saignements",
  },
  result_prevention_statine: {
    result: true,
    title: "Hypolipémiant — Cholestérol",
    icon: "❤️",
    color: "#fee2e2",
    border: "#ef4444",
    medicines: [
      { name: "Rosuvastatine (NOVAROL)", alternatives: ["CRESTATINE", "CRESOVAST", "SUPERSTAT"], note: "Statine — réduit le LDL cholestérol" },
    ],
    warning: "Prendre le soir. Surveiller les enzymes musculaires (myalgies). Bilan hépatique",
  },
  result_veineux_leger: {
    result: true,
    title: "Insuffisance veineuse — Jambes lourdes",
    icon: "❤️",
    color: "#fee2e2",
    border: "#ef4444",
    medicines: [
      { name: "Diosmine (DIOVEINE 600mg)", note: "Veinotonique — 1 comprimé/jour au repas principal" },
      { name: "Naftidrofuryl (NAFRONYL)", note: "Vasodilatateur périphérique — artériopathie" },
      { name: "Venotrit", note: "Phlébotonique naturel" },
    ],
    warning: "Associer: marche régulière, jambes surélevées, bas de contention",
  },
  result_veineux_hemorroides: {
    result: true,
    title: "Hémorroïdes",
    icon: "❤️",
    color: "#fee2e2",
    border: "#ef4444",
    medicines: [
      { name: "Diosmine (DIOVEINE)", note: "2 cp/jour pendant la crise, puis 1 cp/jour" },
    ],
    warning: "Consulter si saignements abondants ou persistants",
  },

  // RESPIRATOIRE RESULTS
  result_asthme_leger: {
    result: true,
    title: "Asthme léger — Bronchodilatateur à la demande",
    icon: "🫁",
    color: "#dbeafe",
    border: "#3b82f6",
    medicines: [
      { name: "Salbutamol (VENTOLINE)", alternatives: [], note: "Bronchodilatateur de secours — à la demande lors des crises" },
      { name: "Montélukast (MONTELAIR 10mg)", alternatives: [], note: "Anti-leucotriène — prévention si asthme d'effort" },
    ],
    warning: "Si crises > 2/semaine → passer au traitement de fond avec corticoïde inhalé",
  },
  result_asthme_severe: {
    result: true,
    title: "Asthme persistant — Traitement de fond",
    icon: "🫁",
    color: "#dbeafe",
    border: "#3b82f6",
    medicines: [
      { name: "Budésonide (PULMICORT)", alternatives: ["RINONIDE", "BUDECORT 200"], note: "Corticoïde inhalé — 1ère intention" },
      { name: "Fluticasone (FLIXOTIDE)", alternatives: ["FLUCASONE MINI"], note: "Corticoïde inhalé — alternative efficace" },
      { name: "Budésonide + Formotérol (SYMBICORT)", alternatives: [], note: "CSI + LABA — asthme modéré à sévère" },
      { name: "Montélukast (MONTELAIR)", alternatives: [], note: "En appoint si contrôle insuffisant" },
    ],
    warning: "Rincer la bouche après chaque inhalation. Ne jamais arrêter brutalement",
  },
  result_asthme_crise: {
    result: true,
    title: "Crise d'asthme — Bronchodilatateur de secours",
    icon: "🫁",
    color: "#dbeafe",
    border: "#3b82f6",
    medicines: [
      { name: "Salbutamol (VENTOLINE)", note: "2 bouffées à répéter si nécessaire. Chambre d'inhalation pour l'enfant" },
      { name: "Salbulam sirop", note: "Pour enfant ne pouvant pas utiliser l'aérosol" },
    ],
    warning: "Crise sévère non améliorée après 3 prises: URGENCE — consulter immédiatement",
  },
  result_toux_seche: {
    result: true,
    title: "Toux sèche — Antitussifs",
    icon: "🫁",
    color: "#dbeafe",
    border: "#3b82f6",
    medicines: [
      { name: "Oxomémazine (TOPLEXIL sirop)", note: "Adulte et enfant > 2 ans — peut provoquer somnolence" },
      { name: "Butamirate (SINECOD sirop)", note: "Enfant > 6 ans — moins sédatif" },
      { name: "Dextrométhorphane (BRONCHOCALM)", note: "Adulte et enfant > 6 ans" },
    ],
    warning: "Ne jamais associer un antitussif à un expectorant. Durée maximale: 7 jours",
  },
  result_toux_grasse: {
    result: true,
    title: "Toux grasse — Mucolytiques / Expectorants",
    icon: "🫁",
    color: "#dbeafe",
    border: "#3b82f6",
    medicines: [
      { name: "Carbocistéine (CARBOMEX 5%, CARBODAL)", note: "Fluidifiant bronchique — adulte et enfant > 2 ans" },
    ],
    warning: "Bien s'hydrater. Ne jamais associer à un antitussif",
  },
  result_allergie_adulte: {
    result: true,
    title: "Allergie / Rhinite allergique — Adulte",
    icon: "🫁",
    color: "#dbeafe",
    border: "#3b82f6",
    medicines: [
      { name: "Fexofénadine (TELFAST 120mg / 180mg)", alternatives: ["FEXOFÉNADINE BEKER 120mg", "FEXOFÉNADINE BEKER 180mg"], note: "Non sédatif — 1ère intention rhinite saisonnière" },
      { name: "Bilastine (BILAXTEN 20mg)", alternatives: [], note: "Non sédatif — prendre à jeun" },
      { name: "Loratadine (LORADINE 10mg)", alternatives: [], note: "Non sédatif — allergie / urticaire" },
      { name: "Fluticasone nasale (NASALIX)", alternatives: [], note: "Corticoïde nasal — rhinite allergique persistante" },
    ],
    warning: "Arrêter 48h avant un test allergologique cutané",
  },
  result_allergie_enfant: {
    result: true,
    title: "Allergie — Enfant (2 à 12 ans)",
    icon: "🫁",
    color: "#dbeafe",
    border: "#3b82f6",
     medicines: [
      { name: "Desloratadine (DESLOR sirop 0.5mg/ml)", alternatives: ["LORADESS 0.5mg/ml"], note: "À partir de 6 mois — non sédatif" },
      { name: "Loratadine sirop (LORADINE 0.1%)", alternatives: [], note: "À partir de 2 ans" },
    ],
    warning: "Utiliser la seringue doseuse. Dose selon le poids de l'enfant",
  },
  result_allergie_nourr: {
    result: true,
    title: "Allergie — Nourrisson (< 2 ans)",
    icon: "🫁",
    color: "#dbeafe",
    border: "#3b82f6",
    medicines: [
      { name: "Desloratadine (DESLOR sirop)", note: "À partir de 6 mois sur prescription médicale" },
    ],
    warning: "Toujours consulter un médecin avant traitement chez le nourrisson",
  },
  result_allergie_cutanee: {
    result: true,
    title: "Allergie cutanée / Urticaire",
    icon: "🫁",
    color: "#dbeafe",
    border: "#3b82f6",
    medicines: [
      { name: "Fexofénadine (TELFAST 180mg)", note: "Non sédatif — urticaire chronique adulte" },
      { name: "Loratadine (LORADINE 10mg)", note: "Non sédatif — allergie cutanée" },
      { name: "Bilastine (BILAXTEN)", note: "Non sédatif — urticaire et rhinite" },
    ],
    warning: "Si urticaire avec gonflement du visage ou difficultés respiratoires: URGENCE",
  },
  result_congestion: {
    result: true,
    title: "Congestion nasale — Décongestionnant",
    icon: "🫁",
    color: "#dbeafe",
    border: "#3b82f6",
    medicines: [
      { name: "Oxymétazoline (RESPINHAL)", note: "Décongestionnant nasal — effet rapide" },
      { name: "Alpha-amylase (MAXILASE sirop)", note: "Fluidifie les sécrétions nasales" },
    ],
    warning: "Ne pas utiliser RESPINHAL plus de 5 jours (effet rebond). Enfant < 2 ans: consulter",
  },

  // GASTRO RESULTS
  result_rgo: {
    result: true,
    title: "Reflux gastro-œsophagien / Brûlures d'estomac",
    icon: "🧪",
    color: "#d1fae5",
    border: "#10b981",
    medicines: [
      { name: "Oméprazole (LOMAC 20mg, PROTON 20mg)", alternatives: ["ZIMOR 20", "ANTAG 20mg", "OMEPROTECT 20mg"], note: "IPP — 1ère intention. Prendre 30 min avant le repas" },
      { name: "Dexlansoprazole (DEXILANT 30mg)", alternatives: [], note: "IPP — peut être pris avec ou sans repas" },
      { name: "Hydroxyde d'aluminium + Magnésium (MAALOX)", alternatives: [], note: "Antiacide — soulagement rapide symptomatique" },
    ],
    warning: "Ne pas utiliser les IPP plus de 14 jours sans avis médical",
  },
  result_spasmes: {
    result: true,
    title: "Spasmes intestinaux / Côlon irritable",
    icon: "🧪",
    color: "#d1fae5",
    border: "#10b981",
    medicines: [
      { name: "Mébévérine (DUSPATALIN 200mg)", alternatives: ["MÉBÉVÉRINE BEKER LP", "DUSPAVERINE 100mg"], note: "Antispasmodique — 20 min avant les repas" },
      { name: "Trimébutine (DEBRIDAT)", alternatives: ["TRIMÉBUTINE BIOCARE"], note: "Antispasmodique — adulte et enfant > 2 ans" },
      { name: "Prifinium (RIABAL 30mg)", alternatives: [], note: "Antispasmodique anticholinergique — coliques" },
      { name: "Pinavérium (DICETEL 100mg)", alternatives: [], note: "Antispasmodique sélectif du côlon" },
    ],
    warning: "Associer à des mesures diététiques (éviter aliments fermentescibles)",
  },
  result_diarrhee_adulte: {
    result: true,
    title: "Diarrhée aiguë — Adulte",
    icon: "🧪",
    color: "#d1fae5",
    border: "#10b981",
     medicines: [
      { name: "Racécadotril (TIOPAM)", alternatives: ["NOBAC", "DIACARE", "CELOFON NOURRISSONS"], note: "Antisécrétoire — 100mg 3x/jour avant repas" },
      { name: "Diosmectite (SMECTA)", alternatives: [], note: "Adsorbant — protège la muqueuse intestinale" },
    ],
    warning: "Toujours associer une réhydratation orale. Consulter si diarrhée sanglante ou fièvre élevée",
  },
  result_diarrhee_enfant: {
    result: true,
    title: "Diarrhée aiguë — Enfant / Nourrisson",
    icon: "🧪",
    color: "#d1fae5",
    border: "#10b981",
    medicines: [
      { name: "Racécadotril (NOBAC pédiatrique)", note: "1.5 mg/kg x 3/jour — à partir de 3 mois" },
      { name: "Diosmectite (SMECTA)", note: "1 sachet/jour nourrisson — 1 à 3 sachets/jour enfant" },
    ],
    warning: "La réhydratation orale est PRIORITAIRE. Ne jamais utiliser sans réhydratation",
  },
  result_constipation: {
    result: true,
    title: "Constipation",
    icon: "🧪",
    color: "#d1fae5",
    border: "#10b981",
    medicines: [
      { name: "Lactulose (ISOLACT)", note: "Laxatif osmotique — doux, peut être utilisé chez le nourrisson" },
      { name: "Glycérine (GLYCERINE LS suppo)", note: "Suppositoire — action locale rapide" },
    ],
    warning: "Augmenter les fibres alimentaires et l'hydratation avant tout traitement médicamenteux",
  },
  result_gaz: {
    result: true,
    title: "Ballonnements / Gaz",
    icon: "🧪",
    color: "#d1fae5",
    border: "#10b981",
    medicines: [
      { name: "Siméticone (FREEGAS)", alternatives: ["LOWGAS"], note: "Antigazeux — après les repas" },
      { name: "Alvérine + Siméticone (METEOSPASMYL)", alternatives: [], note: "Antispasmodique + antigazeux — colon irritable avec ballonnements" },
    ],
    warning: "Identifier et éviter les aliments fermentescibles (choux, légumineuses, sodas)",
  },
  result_nausees: {
    result: true,
    title: "Nausées / Vomissements",
    icon: "🧪",
    color: "#d1fae5",
    border: "#10b981",
    medicines: [
      { name: "Dompéridone (DOMPERONE 10mg)", note: "Adulte et ado > 12 ans pesant > 35 kg — max 1 semaine" },
    ],
    warning: "Ne pas utiliser chez enfant < 12 ans. Durée maximale 1 semaine",
  },

  // DOULEUR RESULTS
  result_douleur_adulte: {
    result: true,
    title: "Douleur / Fièvre — Adulte",
    icon: "💊",
    color: "#fef9c3",
    border: "#eab308",
    medicines: [
      { name: "Paracétamol (PARAMOL 1000mg)", alternatives: ["EFFERALGAN 1000mg", "DOLIPRANE 1000mg"], note: "1ère intention — 1g toutes les 6h. Max 3g/jour" },
      { name: "Ibuprofène (XYDOL 600mg)", alternatives: ["ANTALFEN 600mg", "IBUPROFÈNE BEKER 400mg"], note: "AINS — si paracétamol insuffisant. Prendre avec repas" },
    ],
    warning: "Maximum 3g/jour de paracétamol. Ne jamais dépasser 5 jours d'AINS sans avis médical",
  },
  result_douleur_enfant: {
    result: true,
    title: "Douleur / Fièvre — Enfant (6 à 15 ans)",
    icon: "💊",
    color: "#fef9c3",
    border: "#eab308",
    medicines: [
      { name: "Paracétamol (DOLIPRANE sirop 2.4%, EFFERALGAN pédiatrique)", note: "15 mg/kg par prise — calculer selon le poids" },
      { name: "Ibuprofène (ANTALFEN sirop 20mg/ml)", note: "10 mg/kg — à partir de 6 mois, avec nourriture" },
    ],
    warning: "Toujours calculer la dose selon le POIDS de l'enfant, pas son âge",
  },
  result_douleur_nourr: {
    result: true,
    title: "Douleur / Fièvre — Nourrisson (< 6 ans)",
    icon: "💊",
    color: "#fef9c3",
    border: "#eab308",
    medicines: [
      { name: "Paracétamol suspension (DOLIPRANE 2.4%)", note: "15 mg/kg toutes les 6h — seringue doseuse obligatoire" },
    ],
    warning: "IBUPROFÈNE CONTRE-INDIQUÉ avant 6 mois. Toujours doser au poids avec seringue",
  },
  result_ains_general: {
    result: true,
    title: "Anti-inflammatoires (AINS)",
    icon: "💊",
    color: "#fef9c3",
    border: "#eab308",
    medicines: [
      { name: "Ibuprofène (XYDOL)", alternatives: ["ANTALFEN 600mg", "IBUPROFÈNE BEKER 400mg"], note: "AINS classique — prendre avec repas" },
      { name: "Diclofénac (BIOFENAC LP)", alternatives: ["CLOFENAL", "VOTREX", "DIVIDO", "FLOVENAC LP"], note: "Anti-inflammatoire puissant — avec repas" },
      { name: "Célécoxib (CELECOX)", alternatives: ["COXIBREX", "CEBREX"], note: "Inhibiteur COX-2 — meilleure tolérance gastrique" },
      { name: "Kétoprofène (KETOMEX)", alternatives: [], note: "AINS — arthrose et rhumatismes" },
    ],
    warning: "Toujours prendre avec un repas. Pas plus de 5 jours sans avis médical",
  },
  result_ains_gastro: {
    result: true,
    title: "Douleur inflammatoire + Problème gastrique",
    icon: "💊",
    color: "#fef9c3",
    border: "#eab308",
    medicines: [
      { name: "Célécoxib (CELECOX 200mg)", note: "Inhibiteur COX-2 — meilleure tolérance digestive" },
      { name: "Paracétamol (PARAMOL 1000mg)", note: "Associer pour douleur légère à modérée" },
    ],
    warning: "Associer un protecteur gastrique (oméprazole) si AINS classique indispensable",
  },
  result_ains_contre: {
    result: true,
    title: "AINS contre-indiqués — Alternative",
    icon: "💊",
    color: "#fef9c3",
    border: "#eab308",
    medicines: [
      { name: "Paracétamol (PARAMOL, DOLIPRANE, EFFERALGAN)", note: "Seul antalgique sûr — grossesse, enfant < 12 ans" },
    ],
    warning: "AINS formellement contre-indiqués: grossesse > 6 mois et enfant < 12 ans pour ibuprofène 400mg+",
  },
  result_muscle: {
    result: true,
    title: "Douleur musculaire / Contracture",
    icon: "💊",
    color: "#fef9c3",
    border: "#eab308",
    medicines: [
      { name: "Thiocolchicoside (TGC PLUS)", note: "Myorelaxant — max 7 jours, adulte uniquement" },
      { name: "Tolpérisone (MYORELAX)", note: "Myorelaxant central — spasticité neurologique" },
      { name: "Baclofène (BACLON 10mg)", note: "Myorelaxant — spasticité SEP, AVC" },
    ],
    warning: "Thiocolchicoside CONTRE-INDIQUÉ chez la femme enceinte et l'adolescent < 18 ans",
  },
  result_topique: {
    result: true,
    title: "Douleur locale — Traitement topique",
    icon: "💊",
    color: "#fef9c3",
    border: "#eab308",
    medicines: [
      { name: "Diclofénac gel (VOLTARENE 1%)", note: "Anti-inflammatoire topique — entorses, tendinites" },
      { name: "Kétoprofène gel (KETUM 2.5%)", note: "AINS topique — protection solaire OBLIGATOIRE" },
      { name: "Ibuprofène + Menthol (IBUTHOL 5%/3%)", note: "Crème — douleurs musculaires" },
    ],
    warning: "Kétoprofène gel: protection solaire stricte pendant et 2 semaines après utilisation",
  },

  // NEURO RESULTS
  result_depression: {
    result: true,
    title: "Dépression / Anxiété",
    icon: "🧠",
    color: "#ede9fe",
    border: "#7c3aed",
    medicines: [
      { name: "Sertraline (ZOLOFT)", alternatives: ["SOLOTIK", "ZEXIL"], note: "ISRS — 1ère intention dépression et anxiété" },
      { name: "Escitalopram (ESCITALOPRAM BEKER)", alternatives: [], note: "ISRS — bien toléré, dépression et anxiété généralisée" },
      { name: "Fluoxétine (FLUOXETINE MERINAL)", alternatives: [], note: "ISRS — longue demi-vie, TOC, boulimie" },
      { name: "Étifoxine (STRESAM)", alternatives: [], note: "Anxiolytique non benzodiazépinique — anxiété réactionnelle" },
    ],
    warning: "Effet thérapeutique après 4 à 6 semaines. Ne jamais arrêter brutalement",
  },
  result_epilepsie: {
    result: true,
    title: "Épilepsie",
    icon: "🧠",
    color: "#ede9fe",
    border: "#7c3aed",
    medicines: [
      { name: "Lévétiracétam (KEPAM)", alternatives: [], note: "Antiépileptique 2e génération — bien toléré" },
      { name: "Lamotrigine (LAMOTRIGINE BEKER)", alternatives: [], note: "Antiépileptique — augmentation très progressive OBLIGATOIRE" },
      { name: "Valproate (DEPAKINE CHRONO)", alternatives: [], note: "Large spectre — CONTRE-INDIQUÉ grossesse" },
      { name: "Carbamazépine (CARBIMOL)", alternatives: ["CARBIMOL L.P."], note: "Épilepsies partielles — nombreuses interactions" },
    ],
    warning: "Ne JAMAIS arrêter brutalement un antiépileptique. Toujours sous surveillance neurologique",
  },
  result_psychose: {
    result: true,
    title: "Schizophrénie / Troubles bipolaires",
    icon: "🧠",
    color: "#ede9fe",
    border: "#7c3aed",
    medicines: [
      { name: "Aripiprazole (ARIPIPRAZOLE BEKER oro)", alternatives: [], note: "Antipsychotique atypique — moins de prise de poids" },
      { name: "Quétiapine (QUETIAPINE BEKER LP)", alternatives: ["QUETIAPINE BEKER 50mg LP"], note: "Antipsychotique — schizophrénie et bipolaire" },
      { name: "Olanzapine (LANZAPREX)", alternatives: [], note: "Antipsychotique — efficace mais prise de poids importante" },
      { name: "Rispéridone (RISPERIDONE BEKER)", alternatives: [], note: "Antipsychotique — aussi dans l'autisme" },
      { name: "Amisulpride (AMISULPRIDE BEKER)", alternatives: ["SOLIAN"], note: "Antipsychotique — symptômes positifs et négatifs" },
    ],
    warning: "Strictement sous surveillance psychiatrique. Ne jamais arrêter brutalement",
  },
  result_vertiges: {
    result: true,
    title: "Vertiges / Acouphènes (Ménière)",
    icon: "🧠",
    color: "#ede9fe",
    border: "#7c3aed",
    medicines: [
      { name: "Bétahistine (BETASERC 24mg)", alternatives: ["VERSEC 24mg"], note: "Maladie de Ménière — 2 prises/jour au repas. Effets après plusieurs semaines" },
      { name: "Acétylleucine (GANTANIL 500mg)", alternatives: [], note: "Vertiges labyrinthiques — max 3 semaines" },
    ],
    warning: "Traitement de longue durée pour la bétahistine. Résultats visibles après plusieurs semaines",
  },
  result_neuropathie: {
    result: true,
    title: "Douleurs neuropathiques",
    icon: "🧠",
    color: "#ede9fe",
    border: "#7c3aed",
    medicines: [
      { name: "Gabapentine (GABATREX 300mg)", note: "Douleurs neuropathiques — augmentation progressive" },
    ],
    warning: "Augmentation très progressive de la dose. Peut provoquer somnolence et vertiges",
  },
  result_parkinson: {
    result: true,
    title: "Maladie de Parkinson",
    icon: "🧠",
    color: "#ede9fe",
    border: "#7c3aed",
    medicines: [
      { name: "Lévodopa + Carbidopa (LEVOCARB 250/25mg)", note: "Traitement de référence du Parkinson" },
      { name: "Ropinirole (KEPNIROL)", note: "Agoniste dopaminergique — en association ou monothérapie précoce" },
    ],
    warning: "Surveillance neurologique obligatoire. Ne jamais arrêter brutalement. Eviter les aliments très riches en protéines au moment de la prise",
  },
  result_spasticite: {
    result: true,
    title: "Spasticité (SEP, AVC, lésion médullaire)",
    icon: "🧠",
    color: "#ede9fe",
    border: "#7c3aed",
    medicines: [
      { name: "Baclofène (BACLON 10mg)", note: "Myorelaxant central — augmentation très progressive. Max 100mg/jour" },
      { name: "Tolpérisone (MYORELAX)", note: "Myorelaxant — spasticité d'origine neurologique" },
    ],
    warning: "Ne jamais arrêter le baclofène brutalement (risque de convulsions et hallucinations)",
  },

  // INFECTIEUX RESULTS
  result_respi_amox: {
    result: true,
    title: "Infection respiratoire — Sans allergie pénicilline",
    icon: "🔬",
    color: "#fce7f3",
    border: "#ec4899",
     medicines: [
      { name: "Amoxicilline (CLAMOXYL 1g)", alternatives: ["CLAMOXYL 500mg/5ml", "CLAMOXYL 250mg/5ml"], note: "Angine streptococcique, pneumonie — 1ère intention" },
      { name: "Amoxicilline + Acide clavulanique (AUGMENTIN)", alternatives: ["AUGMENTIN ENFANT", "BIOCLAV ADULTE", "AMOCLAN BID", "AUGMENTIN 500mg"], note: "Sinusite, bronchite résistante" },
      { name: "Azithromycine (ZOMAX 500mg)", alternatives: ["ZYNAX 500mg", "ZITHROMAX 250mg"], note: "Pneumonie atypique — 3 jours" },
    ],
    warning: "Angine: 10 jours pour prévenir le rhumatisme articulaire aigu. Terminer le traitement complet",
  },
  result_respi_allergie: {
    result: true,
    title: "Infection respiratoire — Allergie pénicilline",
    icon: "🔬",
    color: "#fce7f3",
    border: "#ec4899",
    medicines: [
      { name: "Azithromycine (ZOMAX 500mg)", alternatives: ["ZYNAX 500mg", "ZITHROMAX 250mg"], note: "Macrolide — 3 jours" },
      { name: "Pristinamycine (PYOSTACINE 500mg)", alternatives: [], note: "Streptogramine — angine streptococcique" },
    ],
    warning: "Signaler l'allergie aux pénicillines à tout professionnel de santé",
  },
  result_orl_infection: {
    result: true,
    title: "Infection ORL (Otite, Sinusite)",
    icon: "🔬",
    color: "#fce7f3",
    border: "#ec4899",
    medicines: [
      { name: "Amoxicilline + Acide clavulanique (AUGMENTIN)", note: "Otite, sinusite bactérienne — 1ère intention" },
      { name: "Céfixime (CEFIMAX sirop)", note: "Céphalosporine — otite enfant si résistance" },
    ],
    warning: "Otite virale: pas d'antibiotiques. Consulter le médecin pour diagnostic précis",
  },
  result_urinaire: {
    result: true,
    title: "Infection urinaire basse (Cystite femme)",
    icon: "🔬",
    color: "#fce7f3",
    border: "#ec4899",
    medicines: [
      { name: "Fosfomycine (URICARE 3g)", alternatives: [], note: "Dose unique — 1 sachet le soir après avoir uriné" },
      { name: "Nitroxoline (NITROXAL 100mg)", alternatives: ["NOLIB 100mg"], note: "10 à 21 jours — coloration orange des urines: normale" },
      { name: "Ciprofloxacine (CIPROLON)", alternatives: ["CIPROFLOXACINE 250mg/500mg", "PROFLOX 500mg"], note: "Infections urinaires compliquées — adulte uniquement" },
    ],
    warning: "Boire beaucoup d'eau. Fosfomycine: dose unique suffit pour cystite simple",
  },
  result_cutanee: {
    result: true,
    title: "Infection cutanée / Dentaire",
    icon: "🔬",
    color: "#fce7f3",
    border: "#ec4899",
    medicines: [
      { name: "Spiramycine + Métronidazole (OROGYL, BI-OROGYL)", note: "Infection dentaire — éviter l'alcool" },
      { name: "Céfalexine (LEXIN 1000mg)", note: "Infection cutanée à staphylocoques" },
      { name: "Doxycycline (DOTUR 100mg)", note: "Acné sévère, infections cutanées" },
      { name: "Acide fusidique crème (FUCIDINE 2%)", note: "Impétigo, infection cutanée localisée" },
    ],
    warning: "Spiramycine + Métronidazole: éviter absolument l'alcool pendant et 48h après le traitement",
  },
  result_parasitaire: {
    result: true,
    title: "Infection parasitaire / Digestive",
    icon: "🔬",
    color: "#fce7f3",
    border: "#ec4899",
    medicines: [
      { name: "Métronidazole (FLAZOL 500mg, METRONIDAZOLE BEKER)", note: "Amibiase, giardiase, vaginose — éviter l'alcool" },
    ],
    warning: "Eviter absolument l'alcool pendant et 48h après le traitement au métronidazole",
  },
  result_mycose_cutanee: {
    result: true,
    title: "Mycose cutanée",
    icon: "🔬",
    color: "#fce7f3",
    border: "#ec4899",
    medicines: [
      { name: "Éconazole (PHANAZOL 1%)", alternatives: [], note: "Pied d'athlète, mycose des plis — 2x/jour" },
      { name: "Miconazole (DAKTAZOL 2% crème)", alternatives: ["DAKTAZOL 2% POMMADE"], note: "Large spectre antifongique topique" },
      { name: "Clotrimazole (LAMIDAZ 1%)", alternatives: [], note: "Mycoses cutanées et vaginales" },
      { name: "Piroctone olamine (MYCOCIDE 1%)", alternatives: ["MYCOCIDE 15g"], note: "Dermatite séborrhéique, pityriasis" },
    ],
    warning: "Continuer 1 semaine après disparition des symptômes pour éviter les rechutes",
  },
  result_mycose_genitale: {
    result: true,
    title: "Mycose génitale (Candidose vaginale)",
    icon: "🔬",
    color: "#fce7f3",
    border: "#ec4899",
    medicines: [
      { name: "Fluconazole (VIRCET 150mg)", alternatives: ["MYCOZAN"], note: "Dose unique — 1 gélule suffit" },
      { name: "Éconazole local (PHANAZOL)", alternatives: [], note: "Traitement local alternatif" },
    ],
    warning: "Fluconazole: CONTRE-INDIQUÉ pendant la grossesse. Consulter le médecin",
  },

  // DIABETE RESULTS
  result_diabete_1: {
    result: true,
    title: "Diabète type 2 — 1ère intention",
    icon: "🩺",
    color: "#ecfdf5",
    border: "#059669",
    medicines: [
      { name: "Metformine (GLUCOPHAGE)", alternatives: ["NOVOFORMINE 500mg", "STAGID 700mg", "GLUCOPHAGE 1000mg"], note: "1ère intention absolue — prendre au cours des repas" },
    ],
    warning: "Arrêter avant injection de produit de contraste iodé. Surveiller la fonction rénale",
  },
  result_diabete_2: {
    result: true,
    title: "Diabète type 2 — Contrôle insuffisant",
    icon: "🩺",
    color: "#ecfdf5",
    border: "#059669",
    medicines: [
      { name: "Gliclazide (DIAMICRON 30mg)", alternatives: ["DIAMICRON 60mg", "DIAPHAG 80mg"], note: "Sulfamide — prendre le matin au petit-déjeuner" },
      { name: "Glimepiride (IRYS 3mg)", alternatives: ["IRYS 4mg", "IRYS 6mg"], note: "Sulfamide — longue durée d'action" },
      { name: "Repaglinide (GLINIX)", alternatives: ["DIAGLINIDE 2mg"], note: "Glinide — prendre 15 min avant chaque repas" },
      { name: "Vildagliptine (LARIMEL 500mg)", alternatives: [], note: "DPP-4 — en association avec metformine" },
      { name: "Sitagliptine (GLYBEK 100mg)", alternatives: [], note: "DPP-4 — 1 prise/jour, tolérance digestive bonne" },
    ],
    warning: "Avoir toujours du sucre sur soi (risque d'hypoglycémie avec sulfamides et glinides)",
  },
  result_hypothyroidie: {
    result: true,
    title: "Hypothyroïdie",
    icon: "🩺",
    color: "#ecfdf5",
    border: "#059669",
    medicines: [
      { name: "Lévothyroxine (LEVOTHYROX 100µg)", alternatives: ["LEVOTHYROX 25µg", "LEVOTHYROX 50µg", "LEVOTHYROX 75µg"], note: "Traitement à vie — prendre à jeun le matin 30 min avant repas" },
    ],
    warning: "Prise à jeun OBLIGATOIRE. Contrôle sanguin régulier (TSH). Ne jamais arrêter",
  },
  result_hyperthyroidie: {
    result: true,
    title: "Hyperthyroïdie",
    icon: "🩺",
    color: "#ecfdf5",
    border: "#059669",
    medicines: [
      { name: "Thiamazole (ATHYROZOL 5mg)", note: "Antithyroïdien de synthèse — dose selon sévérité" },
    ],
    warning: "Arrêter et consulter immédiatement si fièvre ou maux de gorge (risque d'agranulocytose)",
  },

  // PEDIATRIE RESULTS
  result_fievre_nourr: {
    result: true,
    title: "Fièvre / Douleur — Nourrisson < 3 mois",
    icon: "👶",
    color: "#fff7ed",
    border: "#f97316",
    medicines: [
      { name: "Paracétamol suspension (DOLIPRANE 2.4%)", note: "15 mg/kg par prise. Seringue doseuse OBLIGATOIRE" },
    ],
    warning: "URGENT: nourrisson < 3 mois avec fièvre = CONSULTER IMMÉDIATEMENT. Ibuprofène CONTRE-INDIQUÉ < 3 mois",
  },
  result_fievre_bebe: {
    result: true,
    title: "Fièvre / Douleur — Nourrisson 3 mois à 2 ans",
    icon: "👶",
    color: "#fff7ed",
    border: "#f97316",
    medicines: [
      { name: "Paracétamol (DOLIPRANE 2.4% sirop)", note: "15 mg/kg par prise — 1ère intention" },
      { name: "Ibuprofène (ANTALFEN 20mg/ml sirop)", note: "10 mg/kg — à partir de 6 mois en 2ème intention" },
    ],
    warning: "Ibuprofène CONTRE-INDIQUÉ avant 6 mois. Toujours calculer la dose au POIDS",
  },
  result_fievre_enfant: {
    result: true,
    title: "Fièvre / Douleur — Enfant 2 à 12 ans",
    icon: "👶",
    color: "#fff7ed",
    border: "#f97316",
    medicines: [
      { name: "Paracétamol (DOLIPRANE sirop, EFFERALGAN pédiatrique)", note: "15 mg/kg par prise — 1ère intention" },
      { name: "Ibuprofène (ANTALFEN sirop)", note: "10 mg/kg par prise — alternative ou association" },
    ],
    warning: "Alterner paracétamol et ibuprofène si fièvre résistante. Calculer toujours au POIDS",
  },
  result_pediatrie_toux: {
    result: true,
    title: "Toux / Rhume — Enfant",
    icon: "👶",
    color: "#fff7ed",
    border: "#f97316",
    medicines: [
      { name: "Oxomémazine (TOPLEXIL, VOMITEB sirop)", note: "Toux sèche — enfant > 2 ans. Peut provoquer somnolence" },
      { name: "Carbocistéine (CARBODAL 5% sirop)", note: "Toux grasse — enfant > 2 ans. Bien hydrater" },
      { name: "Oxymétazoline (RESPINHAL)", note: "Congestion nasale — max 5 jours" },
    ],
    warning: "Ne jamais associer antitussif + expectorant. Rhinorrhée seule: lavage nasal suffit souvent",
  },
  result_pediatrie_digestif: {
    result: true,
    title: "Troubles digestifs — Enfant / Nourrisson",
    icon: "👶",
    color: "#fff7ed",
    border: "#f97316",
    medicines: [
      { name: "Racécadotril (NOBAC pédiatrique)", note: "Diarrhée — à partir de 3 mois. Toujours avec réhydratation" },
      { name: "Diosmectite (SMECTA)", note: "Diarrhée — nourrisson et enfant. 1 sachet/biberon" },
      { name: "Lactulose (ISOLACT)", note: "Constipation — doux, peut être utilisé dès la naissance" },
    ],
    warning: "Réhydratation orale TOUJOURS prioritaire en cas de diarrhée",
  },
  result_pediatrie_vitamines: {
    result: true,
    title: "Vitamines / Compléments — Enfant",
    icon: "👶",
    color: "#fff7ed",
    border: "#f97316",
    medicines: [
      { name: "Vitamine D3 (D-THREE 200K)", note: "Prévention rachitisme — 1 ampoule/trimestre" },
      { name: "Multivitamines pédiatriques (MULTIVITAMINE KIDS, SOLYNE C TONUS)", note: "Complémentation globale" },
      { name: "Fer (OROFER PLUS)", note: "Anémie ferriprive pédiatrique" },
    ],
    warning: "Vitamine D: dosage sanguin avant supplémentation à forte dose",
  },

  // GYNECO RESULTS
  result_pilule_combinee: {
    result: true,
    title: "Contraception — Pilule combinée",
    icon: "🌸",
    color: "#fdf2f8",
    border: "#db2777",
    medicines: [
      { name: "Désogestrel + Éthinylestradiol (MARVELON)", alternatives: ["MARILON"], note: "Pilule combinée classique — 21 jours + 7 jours pause" },
    ],
    warning: "CONTRE-INDIQUÉ: tabagisme > 35 ans, antécédents thromboemboliques, migraine avec aura. Prendre à heure fixe",
  },
  result_pilule_progest: {
    result: true,
    title: "Contraception — Pilule progestative (mini-pilule)",
    icon: "🌸",
    color: "#fdf2f8",
    border: "#db2777",
    medicines: [
      { name: "Désogestrel (DESONETTE)", note: "Mini-pilule — en continu sans pause. Tolérance de 12h max" },
    ],
    warning: "Compatible avec l'allaitement. Prendre à heure fixe (tolérance 12h seulement)",
  },
  result_pilule_acne: {
    result: true,
    title: "Contraception + Traitement acné / Hirsutisme",
    icon: "🌸",
    color: "#fdf2f8",
    border: "#db2777",
    medicines: [
      { name: "Acétate de cyprotérone + Éthinylestradiol (DIANE 35)", note: "Acné sévère + contraception. Ne pas utiliser comme contraceptif seul" },
    ],
    warning: "Risque thromboembolique plus élevé que les pilules classiques. Risque accru chez la fumeuse",
  },
  result_grossesse_suppl: {
    result: true,
    title: "Suppléments grossesse",
    icon: "🌸",
    color: "#fdf2f8",
    border: "#db2777",
    medicines: [
      { name: "Acide folique (ZANITRA 5mg)", note: "1 mois avant conception et jusqu'à fin 1er trimestre — obligatoire" },
      { name: "Fer + Acide folique (FERRO SANOL GYN)", note: "Anémie ferriprive de la grossesse" },
      { name: "Multivitamines grossesse (PHI GROSSESSE)", note: "Complément global pour la grossesse" },
    ],
    warning: "Acide folique: démarrer AVANT la conception pour prévenir les malformations du tube neural",
  },
  result_cycle: {
    result: true,
    title: "Troubles du cycle / Progestérone",
    icon: "🌸",
    color: "#fdf2f8",
    border: "#db2777",
    medicines: [
      { name: "Progestérone (UTROGESTAN)", note: "Insuffisance en progestérone — prendre le soir" },
      { name: "Dydrogestérone (DUPHASTON 10mg)", note: "Troubles du cycle, endométriose, soutien de grossesse" },
      { name: "Progestérone gel (PROGESTOGEL 1%)", note: "Douleurs mammaires — application locale sur les seins" },
    ],
    warning: "Utrogestan peut provoquer somnolence — prendre le soir au coucher",
  },
  result_menopause: {
    result: true,
    title: "Ménopause / Atrophie vaginale",
    icon: "🌸",
    color: "#fdf2f8",
    border: "#db2777",
    medicines: [
      { name: "Promestriène (COLPOVITAL 10mg)", note: "Capsule vaginale — atrophie vaginale, sécheresse. 1/jour au coucher" },
    ],
    warning: "CONTRE-INDIQUÉ si antécédents de cancer du sein ou de l'utérus hormono-dépendant",
  },
  result_vaginite: {
    result: true,
    title: "Infection vaginale",
    icon: "🌸",
    color: "#fdf2f8",
    border: "#db2777",
    medicines: [
      { name: "Néomycine + Polymyxine + Nystatine (POLYGYNAX)", note: "Vaginite bactérienne et/ou fongique — 1 capsule/jour au coucher pendant 12 jours" },
      { name: "Sertaconazole (GYNODERMOFIX)", note: "Candidose vaginale" },
      { name: "Fluconazole (VIRCET 150mg)", note: "Candidose vaginale — dose unique orale" },
      { name: "Métronidazole (FLAZOL)", note: "Vaginose bactérienne — trichomoniase" },
    ],
    warning: "Eviter les rapports et les bains pendant le traitement local",
  },
  result_fertilite: {
    result: true,
    title: "Fertilité",
    icon: "🌸",
    color: "#fdf2f8",
    border: "#db2777",
    medicines: [
      { name: "Myo-Inositol (OVAPURE)", note: "SOPK — améliore la sensibilité à l'insuline et l'ovulation" },
      { name: "Cabergoline (CABERNEX)", note: "Hyperprolactinémie — normalise la prolactine pour restaurer l'ovulation" },
      { name: "Acide folique (ZANITRA 5mg)", note: "Supplémentation obligatoire avant conception" },
    ],
    warning: "Tout problème de fertilité nécessite un bilan médical complet avant traitement",
  },

  // DERMATO RESULTS
  result_acne_legere: {
    result: true,
    title: "Acné légère à modérée",
    icon: "🔵",
    color: "#eff6ff",
    border: "#2563eb",
    medicines: [
      { name: "Adapalène 0.1% (ADAPALENE 0.1% crème)", alternatives: [], note: "Rétinoïde topique — 1 application/soir. Résultats après 8 à 12 semaines" },
      { name: "Peroxyde de benzoyle 2.5% (CUTACNYL 2.5%)", alternatives: ["CUTACNYL 5%"], note: "Antibactérien topique — commencer 3x/semaine" },
    ],
    warning: "Adapalène: protection solaire obligatoire le jour. CONTRE-INDIQUÉ grossesse",
  },
  result_acne_severe: {
    result: true,
    title: "Acné sévère (nodulaire / résistante)",
    icon: "🔵",
    color: "#eff6ff",
    border: "#2563eb",
    medicines: [
      { name: "Isotrétinoïne (CURACNE 20mg)", note: "Réservé aux acnés sévères résistantes — prescription dermatologue obligatoire" },
      { name: "Peroxyde de benzoyle 5% (CUTACNYL 5%)", note: "Concentration plus forte pour acné modérée à sévère" },
      { name: "Diane 35 (chez la femme)", note: "Acné hormonale sévère + contraception" },
    ],
    warning: "Isotrétinoïne: contraception OBLIGATOIRE chez la femme. Bilan sanguin mensuel",
  },
  result_eczema_leger: {
    result: true,
    title: "Eczéma léger — Émollients",
    icon: "🔵",
    color: "#eff6ff",
    border: "#2563eb",
    medicines: [
      { name: "Dexpanthénol (POLYDERMYL crème)", note: "Émollient cicatrisant — érythème fessier, peau irritée, dès la naissance" },
      { name: "Glycérol + Paraffine (DEXERYL crème)", note: "Émollient intense — eczéma atopique, peau très sèche" },
    ],
    warning: "Appliquer après le bain sur peau humide pour maximiser l'hydratation",
  },
  result_eczema_severe: {
    result: true,
    title: "Eczéma modéré à sévère — Corticoïdes topiques",
    icon: "🔵",
    color: "#eff6ff",
    border: "#2563eb",
    medicines: [
      { name: "Hydrocortisone butyrate (LOCOID 1%)", alternatives: [], note: "Puissance modérée — peut être utilisé sur visage sous contrôle médical" },
      { name: "Bétaméthasone (BETASONE 0.1%)", alternatives: ["DERMASONE 0.05%"], note: "Haute puissance — éviter le visage. Max 4 semaines" },
      { name: "Clobetasol (CLOTASOL 0.05%)", alternatives: ["CLOTASOL 0.05% 45g"], note: "Très haute puissance — psoriasis épais. Max 50g/semaine" },
    ],
    warning: "Appliquer en couche fine. Ne jamais utiliser longtemps sur le visage. Diminuer progressivement",
  },
  result_psoriasis: {
    result: true,
    title: "Psoriasis",
    icon: "🔵",
    color: "#eff6ff",
    border: "#2563eb",
    medicines: [
      { name: "Clobetasol + Acide salicylique (BETACYL pommade)", note: "Psoriasis squameux épais — élimine les squames" },
      { name: "Clobetasol (CLOTASOL 0.05%)", note: "Corticoïde très puissant — poussées sévères" },
    ],
    warning: "Ne jamais utiliser sur le visage. Max 4 semaines. Arrêt progressif obligatoire",
  },
  result_hydratation: {
    result: true,
    title: "Peau sèche — Hydratation",
    icon: "🔵",
    color: "#eff6ff",
    border: "#2563eb",
    medicines: [
      { name: "Dexpanthénol (POLYDERMYL)", note: "Émollient cicatrisant — toutes peaux, dès la naissance" },
      { name: "Dexeryl crème", note: "Émollient intensif — peau très sèche et eczéma atopique" },
    ],
    warning: "Appliquer quotidiennement après le bain sur peau légèrement humide",
  },
  result_gale: {
    result: true,
    title: "Gale / Parasitose cutanée",
    icon: "🔵",
    color: "#eff6ff",
    border: "#2563eb",
    medicines: [
      { name: "Crotamiton 10% (E-RAX 10%)", note: "Antiparasitaire — appliquer sur tout le corps (sauf visage) 24h puis rincer. Répéter 24h après" },
    ],
    warning: "Traiter tous les membres du foyer simultanément. Laver vêtements et draps à 60°C",
  },

  // OPHTALMO RESULTS
  result_conjonctivite: {
    result: true,
    title: "Conjonctivite bactérienne",
    icon: "👁️",
    color: "#f0fdf4",
    border: "#16a34a",
    medicines: [
      { name: "Azithromycine (AZYTER 15mg/g)", note: "2 instillations/jour pendant 3 jours — traitement court" },
      { name: "Acide fusidique (FUCIDINE 1% collyre)", note: "2 instillations/jour pendant 7 jours" },
      { name: "Hexamidine (DESOMÉDINE 0.1%)", note: "Antiseptique ophtalmique — 4 à 6 instillations/jour" },
    ],
    warning: "Se laver les mains. Ne pas toucher l'œil avec le flacon. Enlever les lentilles pendant le traitement",
  },
  result_conjonctivite_allergie: {
    result: true,
    title: "Conjonctivite allergique",
    icon: "👁️",
    color: "#f0fdf4",
    border: "#16a34a",
    medicines: [
      { name: "Kétotifène (ZALERG 0.25mg/ml)", alternatives: ["AIRDITINE"], note: "Antihistaminique ophtalmique — 2x/jour" },
      { name: "Olopatadine (OPTICIS 1mg/ml)", alternatives: [], note: "Antihistaminique et stabilisateur mastocytes — 2x/jour" },
      { name: "NAAGA (NAABAK 4.9g/100ml)", alternatives: [], note: "Collyre antiallergique — peut être utilisé en préventif" },
    ],
    warning: "Attendre 15 à 30 minutes avant de remettre les lentilles de contact",
  },
  result_secheresse_oculaire: {
    result: true,
    title: "Sécheresse oculaire",
    icon: "👁️",
    color: "#f0fdf4",
    border: "#16a34a",
    medicines: [
      { name: "Acide hyaluronique (AQUALARM INTENSIVE UD)", note: "Larme artificielle — unidose à jeter après utilisation" },
      { name: "Hypromellose (ARTELAC 3.2mg/ml)", note: "Larme artificielle classique — plusieurs fois/jour selon besoins" },
      { name: "Povidone (FLUIDABAK 1.5%)", note: "Larme artificielle — sécheresse modérée" },
    ],
    warning: "Compatible avec les lentilles de contact si sans conservateurs",
  },
  result_glaucome: {
    result: true,
    title: "Glaucome / Hypertension oculaire",
    icon: "👁️",
    color: "#f0fdf4",
    border: "#16a34a",
    medicines: [
      { name: "Timolol gel (GELTIM LP 1mg/g)", alternatives: ["CARTÉOL L.P. 2%"], note: "Bêtabloquant ophtalmique — 1 instillation/jour le matin" },
      { name: "Dorzolamide (COZOLAMIDE)", alternatives: [], note: "Inhibiteur anhydrase carbonique — 3x/jour" },
      { name: "Dorzolamide + Timolol (TIMOLAMID)", alternatives: [], note: "Association fixe — 2x/jour" },
    ],
    warning: "Timolol: CONTRE-INDIQUÉ si asthme ou BPCO. Appuyer sur le coin interne de l'œil après instillation",
  },
  result_inflam_oculaire: {
    result: true,
    title: "Inflammation oculaire postopératoire",
    icon: "👁️",
    color: "#f0fdf4",
    border: "#16a34a",
    medicines: [
      { name: "Dexaméthasone (OPADEX collyre)", note: "Corticoïde ophtalmique — inflammation post-chirurgicale" },
      { name: "Indométacine (INDOCOLLYRE 0.1%)", note: "AINS ophtalmique — prévention inflammation post-cataracte" },
    ],
    warning: "CONTRE-INDIQUÉ si infection oculaire. Surveillance de la pression intraoculaire si traitement prolongé",
  },
  result_otite: {
    result: true,
    title: "Otite externe",
    icon: "👁️",
    color: "#f0fdf4",
    border: "#16a34a",
    medicines: [
      { name: "Néomycine + Polymyxine + Dexaméthasone (POLYDEXA gouttes)", note: "3 à 5 gouttes 3 à 4x/jour pendant 7 jours" },
      { name: "Fluocinolone + Néomycine (OTOCROVIS gouttes)", note: "Alternative — même utilisation" },
    ],
    warning: "CONTRE-INDIQUÉ si perforation du tympan. Réchauffer le flacon avant instillation",
  },

  // UROLOGIE RESULTS
  result_hbp: {
    result: true,
    title: "Hypertrophie bénigne de la prostate (HBP)",
    icon: "🚽",
    color: "#f5f3ff",
    border: "#7c3aed",
    medicines: [
      { name: "Tamsulosine (TAMSUMED 0.4mg)", alternatives: [], note: "Alpha-bloquant — améliore le jet urinaire rapidement" },
      { name: "Alfuzosine (PROSTAX 10mg LP)", alternatives: [], note: "Alpha-bloquant — 1 prise/jour après repas" },
      { name: "Finastéride (PROSTAMED 5mg)", alternatives: [], note: "Inhibiteur 5-alpha-réductase — réduit le volume prostatique. Résultats après 6 mois" },
    ],
    warning: "Informer l'ophtalmologue avant chirurgie oculaire (syndrome iris flasque). Finastéride: informe le médecin pour PSA",
  },
  result_incontinence: {
    result: true,
    title: "Vessie hyperactive / Incontinence urinaire",
    icon: "🚽",
    color: "#f5f3ff",
    border: "#7c3aed",
    medicines: [
      { name: "Oxybutynine (OXYPTANE BR 5mg)", alternatives: ["UROXYB 5mg"], note: "Anticholinergique — 5mg 2 à 3x/jour. Sécheresse buccale fréquente" },
    ],
    warning: "CONTRE-INDIQUÉ si glaucome à angle fermé ou rétention urinaire",
  },
      result_hta_cholesterol: {
    result: true,
    title: "HTA avec cholestérol élevé",
    icon: "❤️",
    color: "#fee2e2",
    border: "#ef4444",
    medicines: [
      { name: "Rosuvastatine (NOVAROL, CRESTATINE, CRESOVAST, SUPERSTAT, CRESOVAST)", note: "Statine — réduit le LDL. Prendre le soir" },
      { name: "Sartan ou IEC selon profil (APROVEL, EXVAL, EXTEL, COVERSYL)", note: "Traitement de l'hypertension associée" },
      { name: "Acide acétylsalicylique faible dose (ASPEC, ASPIRINE CARDIO)", note: "Prévention si risque cardiovasculaire élevé, sur avis médical" },
    ],
    warning: "Statine: signaler toute douleur musculaire. Bilan lipidique et hépatique réguliers",
  },
  result_vit_d: {
    result: true,
    title: "Carence en Vitamine D",
    icon: "🍊",
    color: "#fffbeb",
    border: "#d97706",
    medicines: [
      { name: "Cholécalciférol (D-THREE 200000 UI/ml)", alternatives: ["VITAMINE D3 RAZES 200K"], note: "Ampoule tous les 3 à 6 mois selon dosage sanguin" },
      { name: "Calcifédiol (DEDROGYL)", alternatives: [], note: "Forme active — utile si insuffisance hépatique" },
    ],
    warning: "Dosage sanguin recommandé avant supplémentation à forte dose",
  },
  result_vit_b12: {
    result: true,
    title: "Carence en Vitamine B12",
    icon: "🍊",
    color: "#fffbeb",
    border: "#d97706",
    medicines: [
      { name: "Cyanocobalamine (COBAVIT, Vitamine B12 Razes)", note: "Injection IM ou voie buvable selon la sévérité" },
      { name: "Complexe B1+B6+B12 (NEUROVIT)", note: "Neuropathies, polynévrites" },
    ],
    warning: "Urines rosées/orangées après injection: normal",
  },
  result_vit_folique: {
    result: true,
    title: "Acide folique (Vitamine B9)",
    icon: "🍊",
    color: "#fffbeb",
    border: "#d97706",
    medicines: [
      { name: "Acide folique (ZANITRA 5mg)", note: "Prévention malformations grossesse ou carence en folates" },
      { name: "Fer + Acide folique (FERRO SANOL GYN)", note: "Anémie ferriprive de la grossesse" },
    ],
    warning: "Démarrer avant la conception pour prévenir les malformations du tube neural",
  },
  result_vit_fer: {
    result: true,
    title: "Anémie ferriprive — Fer",
    icon: "🍊",
    color: "#fffbeb",
    border: "#d97706",
    medicines: [
      { name: "Fer + Acide folique (FERRO SANOL GYN)", note: "1 gélule/jour à jeun ou avec jus d'orange" },
    ],
    warning: "Selles noires: normal. Espacer de 2h des produits laitiers et antiacides",
  },
  result_vit_calcium: {
    result: true,
    title: "Calcium / Santé osseuse",
    icon: "🍊",
    color: "#fffbeb",
    border: "#d97706",
    medicines: [
      { name: "Calcium + Vitamine D3 (IDEOS)", alternatives: ["CALCIUM D3 LILIUM"], note: "1 à 2 comprimés/jour à sucer ou croquer" },
      { name: "Acide alendronique (ENDRONAX)", alternatives: [], note: "Ostéoporose — 70mg/semaine à jeun, rester debout 30min" },
    ],
    warning: "ENDRONAX: respecter strictement les consignes de prise pour éviter ulcère œsophagien",
  },
  result_vit_multi: {
    result: true,
    title: "Multivitamines générales",
    icon: "🍊",
    color: "#fffbeb",
    border: "#d97706",
    medicines: [
      { name: "Multivitamines (NEUROVIT, Idéos selon besoin)", note: "Complément global selon profil du patient" },
    ],
    warning: "Adapter selon âge, grossesse et carences spécifiques diagnostiquées",
  },
};
const TREE_AR = {
  start: {
    question: "ما هي الفئة الرئيسية؟",
    icon: "🏥",
    options: [
      { label: "❤️ قلب / ضغط الدم", next: "cardio_ar" },
      { label: "🫁 جهاز تنفسي / ربو", next: "respi_ar" },
      { label: "🧪 جهاز هضمي", next: "gastro_ar" },
      { label: "💊 ألم / التهاب", next: "douleur_ar" },
      { label: "🧠 أعصاب / نفسية", next: "neuro_ar" },
      { label: "🔬 مضادات العدوى", next: "infectieux_ar" },
      { label: "🩺 سكري / غدد", next: "diabete_ar" },
      { label: "👶 طب الأطفال", next: "pediatrie_ar" },
      { label: "🌸 نسائية وتوليد", next: "gyneco_ar" },
      { label: "🔵 أمراض جلدية", next: "dermato_ar" },
      { label: "👁️ عيون / أنف وأذن وحنجرة", next: "ophtalmo_ar" },
      { label: "🚽 مسالك بولية", next: "urologie_ar" },
      { label: "🍊 فيتامينات / مكملات", next: "vitamines_ar" },
    ],
  },

  // CARDIO AR
  cardio_ar: {
    question: "ما هي المشكلة القلبية؟",
    icon: "❤️",
    options: [
      { label: "ارتفاع ضغط الدم", next: "cardio_hta_ar" },
      { label: "الذبحة الصدرية", next: "cardio_angor_ar" },
      { label: "قصور القلب", next: "cardio_ic_ar" },
      { label: "اضطرابات نظم القلب", next: "cardio_rythme_ar" },
      { label: "الوقاية من أمراض القلب والأوعية", next: "cardio_prevention_ar" },
      { label: "قصور وريدي / ثقل الساقين", next: "cardio_veineux_ar" },
    ],
  },
  cardio_hta_ar: {
    question: "هل توجد موانع استعمال خاصة؟",
    icon: "❤️",
    options: [
      { label: "لا توجد موانع", next: "result_hta_general_ar" },
      { label: "مريض سكري أو قصور كلوي", next: "result_hta_diabete_ar" },
      { label: "الحمل", next: "result_hta_grossesse_ar" },
      { label: "عدم تحمل السعال (مثبطات ACE)", next: "result_hta_sartan_ar" },
      { label: "احتباس الماء / وذمات", next: "result_hta_diuretique_ar" },
      { label: "ارتفاع الكوليسترول المصاحب", next: "result_hta_cholesterol_ar" },
    ],
  },
  cardio_angor_ar: {
    question: "نوع الذبحة الصدرية؟",
    icon: "❤️",
    options: [
      { label: "علاج وقائي (علاج أساسي)", next: "result_angor_fond_ar" },
      { label: "نوبة حادة", next: "result_angor_aigu_ar" },
    ],
  },
  cardio_ic_ar: {
    question: "درجة قصور القلب؟",
    icon: "❤️",
    options: [
      { label: "خفيف إلى متوسط", next: "result_ic_legere_ar" },
      { label: "شديد مع احتباس الماء", next: "result_ic_severe_ar" },
    ],
  },
  cardio_rythme_ar: {
    question: "نوع اضطراب نظم القلب؟",
    icon: "❤️",
    options: [
      { label: "تسارع القلب / رجفان أذيني", next: "result_rythme_tachy_ar" },
      { label: "التحكم في معدل ضربات القلب", next: "result_rythme_freq_ar" },
    ],
  },
  cardio_prevention_ar: {
    question: "نوع الوقاية القلبية الوعائية؟",
    icon: "❤️",
    options: [
      { label: "مضاد للتخثر الصفيحي (بعد احتشاء، جلطة)", next: "result_prevention_antiagr_ar" },
      { label: "مضاد تخثر (جلطة وريدية)", next: "result_prevention_anticoag_ar" },
      { label: "خافض للكوليسترول", next: "result_prevention_statine_ar" },
    ],
  },
  cardio_veineux_ar: {
    question: "درجة القصور الوريدي؟",
    icon: "❤️",
    options: [
      { label: "خفيف إلى متوسط (ثقل الساقين)", next: "result_veineux_leger_ar" },
      { label: "البواسير", next: "result_veineux_hemorroides_ar" },
    ],
  },

  // RESPI AR
  respi_ar: {
    question: "ما هي المشكلة التنفسية؟",
    icon: "🫁",
    options: [
      { label: "الربو (علاج وقائي)", next: "respi_asthme_fond_ar" },
      { label: "نوبة ربو حادة", next: "result_asthme_crise_ar" },
      { label: "سعال جاف مزعج", next: "result_toux_seche_ar" },
      { label: "سعال بلغمي / مخاط كثيف", next: "result_toux_grasse_ar" },
      { label: "حساسية أنفية / التهاب الأنف التحسسي", next: "respi_allergie_ar" },
      { label: "حساسية جلدية / شرى", next: "result_allergie_cutanee_ar" },
      { label: "احتقان أنفي (زكام)", next: "result_congestion_ar" },
    ],
  },
  respi_asthme_fond_ar: {
    question: "درجة شدة الربو؟",
    icon: "🫁",
    options: [
      { label: "خفيف متقطع", next: "result_asthme_leger_ar" },
      { label: "متوسط إلى شديد ومستمر", next: "result_asthme_severe_ar" },
    ],
  },
  respi_allergie_ar: {
    question: "عمر المريض؟",
    icon: "🫁",
    options: [
      { label: "بالغ (أكثر من 12 سنة)", next: "result_allergie_adulte_ar" },
      { label: "طفل (من 2 إلى 12 سنة)", next: "result_allergie_enfant_ar" },
      { label: "رضيع (أقل من 2 سنة)", next: "result_allergie_nourr_ar" },
    ],
  },

  // GASTRO AR
  gastro_ar: {
    question: "ما هي المشكلة الهضمية؟",
    icon: "🧪",
    options: [
      { label: "حرقة المعدة / الارتجاع المعدي المريئي", next: "result_rgo_ar" },
      { label: "آلام وتقلصات معوية", next: "result_spasmes_ar" },
      { label: "إسهال حاد", next: "gastro_diarrhee_ar" },
      { label: "إمساك", next: "result_constipation_ar" },
      { label: "انتفاخ / غازات", next: "result_gaz_ar" },
      { label: "غثيان / قيء", next: "result_nausees_ar" },
    ],
  },
  gastro_diarrhee_ar: {
    question: "عمر المريض؟",
    icon: "🧪",
    options: [
      { label: "بالغ", next: "result_diarrhee_adulte_ar" },
      { label: "طفل / رضيع", next: "result_diarrhee_enfant_ar" },
    ],
  },

  // DOULEUR AR
  douleur_ar: {
    question: "نوع وشدة الألم؟",
    icon: "💊",
    options: [
      { label: "ألم خفيف إلى متوسط / حمى", next: "douleur_legere_ar" },
      { label: "ألم التهابي / روماتيزمي", next: "douleur_inflam_ar" },
      { label: "ألم عضلي / تقلصات", next: "result_muscle_ar" },
      { label: "ألم موضعي (جل / كريم)", next: "result_topique_ar" },
    ],
  },
  douleur_legere_ar: {
    question: "عمر المريض؟",
    icon: "💊",
    options: [
      { label: "بالغ (أكثر من 15 سنة)", next: "result_douleur_adulte_ar" },
      { label: "طفل (من 6 إلى 15 سنة)", next: "result_douleur_enfant_ar" },
      { label: "رضيع / طفل صغير (أقل من 6 سنوات)", next: "result_douleur_nourr_ar" },
    ],
  },
  douleur_inflam_ar: {
    question: "هل توجد موانع للمضادات الالتهابية (AINS)؟",
    icon: "💊",
    options: [
      { label: "لا توجد موانع", next: "result_ains_general_ar" },
      { label: "قرحة معدية / مشكلة هضمية", next: "result_ains_gastro_ar" },
      { label: "حمل (> 6 أشهر) أو طفل < 12 سنة", next: "result_ains_contre_ar" },
    ],
  },

  // NEURO AR
  neuro_ar: {
    question: "ما هو الاضطراب العصبي أو النفسي؟",
    icon: "🧠",
    options: [
      { label: "اكتئاب / قلق", next: "result_depression_ar" },
      { label: "الصرع", next: "result_epilepsie_ar" },
      { label: "فصام / اضطراب ثنائي القطب", next: "result_psychose_ar" },
      { label: "دوار / طنين الأذن", next: "result_vertiges_ar" },
      { label: "آلام عصبية", next: "result_neuropathie_ar" },
      { label: "مرض باركنسون", next: "result_parkinson_ar" },
      { label: "تشنج عضلي (تصلب لويحي، سكتة دماغية)", next: "result_spasticite_ar" },
    ],
  },

  // INFECTIEUX AR
  infectieux_ar: {
    question: "نوع العدوى؟",
    icon: "🔬",
    options: [
      { label: "عدوى تنفسية (التهاب حلق، قصبات، رئة)", next: "infectieux_respi_ar" },
      { label: "عدوى أنف وأذن وحنجرة (التهاب أذن، جيوب)", next: "result_orl_infection_ar" },
      { label: "عدوى بولية", next: "result_urinaire_ar" },
      { label: "عدوى جلدية / أسنان", next: "result_cutanee_ar" },
      { label: "عدوى طفيلية / هضمية", next: "result_parasitaire_ar" },
      { label: "فطريات جلدية", next: "result_mycose_cutanee_ar" },
      { label: "فطريات تناسلية", next: "result_mycose_genitale_ar" },
    ],
  },
  infectieux_respi_ar: {
    question: "هل يوجد حساسية للبنسلين؟",
    icon: "🔬",
    options: [
      { label: "لا (لا توجد حساسية)", next: "result_respi_amox_ar" },
      { label: "نعم (حساسية للبنسلين)", next: "result_respi_allergie_ar" },
    ],
  },

  // DIABETE AR
  diabete_ar: {
    question: "نوع التدبير العلاجي؟",
    icon: "🩺",
    options: [
      { label: "السكري النوع 2 — خط أول", next: "result_diabete_1_ar" },
      { label: "السكري النوع 2 — غير متحكم به", next: "result_diabete_2_ar" },
      { label: "الغدة الدرقية — قصور", next: "result_hypothyroidie_ar" },
      { label: "الغدة الدرقية — فرط النشاط", next: "result_hyperthyroidie_ar" },
    ],
  },

  // PEDIATRIE AR
  pediatrie_ar: {
    question: "ما هي المشكلة عند الطفل؟",
    icon: "👶",
    options: [
      { label: "حمى / ألم", next: "pediatrie_fievre_ar" },
      { label: "سعال / زكام", next: "result_pediatrie_toux_ar" },
      { label: "إسهال / اضطرابات هضمية", next: "result_pediatrie_digestif_ar" },
      { label: "حساسية", next: "result_allergie_enfant_ar" },
      { label: "فيتامينات / مكملات غذائية", next: "result_pediatrie_vitamines_ar" },
    ],
  },
  pediatrie_fievre_ar: {
    question: "عمر الطفل؟",
    icon: "👶",
    options: [
      { label: "رضيع أقل من 3 أشهر", next: "result_fievre_nourr_ar" },
      { label: "رضيع من 3 أشهر إلى 2 سنة", next: "result_fievre_bebe_ar" },
      { label: "طفل من 2 إلى 12 سنة", next: "result_fievre_enfant_ar" },
    ],
  },

  // GYNECO AR
  gyneco_ar: {
    question: "ما هي الحاجة النسائية؟",
    icon: "🌸",
    options: [
      { label: "منع الحمل", next: "gyneco_contra_ar" },
      { label: "مكملات الحمل (حمض فوليك، حديد)", next: "result_grossesse_suppl_ar" },
      { label: "اضطراب الدورة / البروجستيرون", next: "result_cycle_ar" },
      { label: "انقطاع الطمث / جفاف مهبلي", next: "result_menopause_ar" },
      { label: "عدوى مهبلية", next: "result_vaginite_ar" },
      { label: "الخصوبة", next: "result_fertilite_ar" },
    ],
  },
  gyneco_contra_ar: {
    question: "نوع منع الحمل المطلوب؟",
    icon: "🌸",
    options: [
      { label: "حبوب مركبة (استروجين + بروجستيرون)", next: "result_pilule_combinee_ar" },
      { label: "حبوب بروجستيرون فقط (ميني بيل)", next: "result_pilule_progest_ar" },
      { label: "حبوب لعلاج حب الشباب + منع الحمل", next: "result_pilule_acne_ar" },
    ],
  },

  // DERMATO AR
  dermato_ar: {
    question: "ما هي المشكلة الجلدية؟",
    icon: "🔵",
    options: [
      { label: "حب الشباب (أكني)", next: "dermato_acne_ar" },
      { label: "إكزيما / التهاب جلد تأتبي", next: "dermato_eczema_ar" },
      { label: "الصدفية", next: "result_psoriasis_ar" },
      { label: "فطريات جلدية", next: "result_mycose_cutanee_ar" },
      { label: "عدوى جلدية بكتيرية", next: "result_cutanee_ar" },
      { label: "جفاف الجلد / ترطيب", next: "result_hydratation_ar" },
      { label: "الجرب / طفيليات جلدية", next: "result_gale_ar" },
    ],
  },
  dermato_acne_ar: {
    question: "درجة شدة حب الشباب؟",
    icon: "🔵",
    options: [
      { label: "خفيف (رؤوس سوداء، بضعة حبوب)", next: "result_acne_legere_ar" },
      { label: "متوسط إلى شديد", next: "result_acne_severe_ar" },
    ],
  },
  dermato_eczema_ar: {
    question: "درجة شدة الإكزيما؟",
    icon: "🔵",
    options: [
      { label: "خفيفة (احمرار خفيف، جفاف)", next: "result_eczema_leger_ar" },
      { label: "متوسطة إلى شديدة (لويحات سميكة)", next: "result_eczema_severe_ar" },
    ],
  },

  // OPHTALMO AR
  ophtalmo_ar: {
    question: "ما هي المشكلة في العيون أو الأنف والأذن والحنجرة؟",
    icon: "👁️",
    options: [
      { label: "التهاب الملتحمة البكتيري", next: "result_conjonctivite_ar" },
      { label: "التهاب الملتحمة التحسسي", next: "result_conjonctivite_allergie_ar" },
      { label: "جفاف العين", next: "result_secheresse_oculaire_ar" },
      { label: "الزرق / ارتفاع ضغط العين", next: "result_glaucome_ar" },
      { label: "التهاب العين بعد العملية", next: "result_inflam_oculaire_ar" },
      { label: "التهاب الأذن الخارجي", next: "result_otite_ar" },
    ],
  },

  // UROLOGIE AR
  urologie_ar: {
    question: "ما هي المشكلة البولية؟",
    icon: "🚽",
    options: [
      { label: "تضخم البروستاتا الحميد", next: "result_hbp_ar" },
      { label: "التهاب المثانة (عدوى بولية بسيطة عند المرأة)", next: "result_urinaire_ar" },
      { label: "المثانة فرطة النشاط / سلس البول", next: "result_incontinence_ar" },
    ],
  },

  // VITAMINES AR
vitamines_ar: {
    question: "ما نوع النقص أو الحاجة؟",
    icon: "🍊",
    options: [
      { label: "فيتامين د (نقص، وقاية)", next: "result_vit_d_ar" },
      { label: "فيتامين ب12 / اعتلال الأعصاب", next: "result_vit_b12_ar" },
      { label: "حمض الفوليك (حمل، فقر دم)", next: "result_vit_folique_ar" },
      { label: "الحديد (فقر دم بنقص الحديد)", next: "result_vit_fer_ar" },
      { label: "الكالسيوم / العظام (هشاشة العظام)", next: "result_vit_calcium_ar" },
      { label: "فيتامينات متعددة عامة", next: "result_vit_multi_ar" },
    ],
  },
  // CARDIO RESULTS AR
  result_hta_general_ar: {
    result: true,
    title: "ارتفاع ضغط الدم — الخيار الأول",
    icon: "❤️",
    color: "#fee2e2",
    border: "#ef4444",
    medicines: [
      { name: "مثبط الإنزيم المحول للأنجيوتنسين (TRIATEC، COVERSYL)", note: "الخيار الأول — يُفضل في حالة السكري أو القصور الكلوي" },
      { name: "مضاد لمستقبلات الأنجيوتنسين (APROVEL، BIOPRESS)", note: "في حالة عدم تحمل السعال مع IEC" },
      { name: "حاصر لقنوات الكالسيوم (AMLOR)", note: "فعّال، جيد التحمل، بدون سعال" },
      { name: "مدر للبول (FLUDEX LP)", note: "بمفرده أو بالاشتراك مع علاج آخر" },
    ],
    warning: "المتابعة: ضغط الدم، وظائف الكلى، نسبة البوتاسيوم",
  },
  result_hta_diabete_ar: {
    result: true,
    title: "ارتفاع ضغط الدم + السكري / القصور الكلوي",
    icon: "❤️",
    color: "#fee2e2",
    border: "#ef4444",
    medicines: [
      { name: "COVERSYL، TRIATEC", note: "حماية الكلى مثبتة — الخيار الأول" },
      { name: "APROVEL، ATACAND", note: "في حالة عدم تحمل IEC (بدون سعال)" },
    ],
    warning: "المتابعة: الكرياتينين، البوتاسيوم، البروتين في البول",
  },
  result_hta_grossesse_ar: {
    result: true,
    title: "ارتفاع ضغط الدم أثناء الحمل",
    icon: "❤️",
    color: "#fee2e2",
    border: "#ef4444",
    medicines: [
      { name: "ميثيل دوبا (ALDOMET)", note: "المرجع أثناء الحمل — آمن على الجنين" },
    ],
    warning: "مثبطات الإنزيم المحول والسارتان ممنوعة تماماً أثناء الحمل (الثلث الثاني والثالث)",
  },
  result_hta_sartan_ar: {
    result: true,
    title: "ارتفاع ضغط الدم — عدم تحمل السعال (IEC)",
    icon: "❤️",
    color: "#fee2e2",
    border: "#ef4444",
    medicines: [
      { name: "APROVEL", note: "سارتان — بدون سعال" },
      { name: "ATACAND، BIOPRESS", note: "سارتان — تحمل جيد جداً" },
      { name: "EXTEL", note: "سارتان — مفعول طويل المدى" },
      { name: "EXVAL", note: "سارتان فعّال" },
    ],
    warning: "السارتان لا يسبب السعال على عكس مثبطات الإنزيم المحول",
  },
  result_hta_diuretique_ar: {
    result: true,
    title: "ارتفاع ضغط الدم مع احتباس الماء / وذمات",
    icon: "❤️",
    color: "#fee2e2",
    border: "#ef4444",
    medicines: [
      { name: "FLUDEX LP، ADEX LP", note: "مدر بول من فئة الثيازيد — ارتفاع ضغط الدم" },
      { name: "FUROZAL", note: "مدر بول قوي — وذمات شديدة" },
      { name: "SPIRONOLONE", note: "موفر للبوتاسيوم — قصور القلب" },
    ],
    warning: "متابعة نسبة البوتاسيوم. يؤخذ صباحاً لتجنب الاستيقاظ ليلاً للتبول",
  },
  result_angor_fond_ar: {
    result: true,
    title: "الذبحة الصدرية — العلاج الأساسي",
    icon: "❤️",
    color: "#fee2e2",
    border: "#ef4444",
    medicines: [
      { name: "بيسوبرولول (BIPROTENS، BIPROSTENE)", note: "حاصر بيتا — الخيار الأول" },
      { name: "أملوديبين (AMLOR)", note: "حاصر قنوات الكالسيوم — بديل أو مكمّل" },
      { name: "VASTAREL", note: "مضاد لنقص التروية الاستقلابي — مكمّل للعلاج" },
    ],
    warning: "لا يجب التوقف المفاجئ عن حاصرات بيتا أبداً",
  },
  result_angor_aigu_ar: {
    result: true,
    title: "نوبة الذبحة الصدرية الحادة",
    icon: "❤️",
    color: "#fee2e2",
    border: "#ef4444",
    medicines: [
      { name: "تري نيترين تحت اللسان", note: "علاج النوبة — مفعوله يبدأ في 2-3 دقائق" },
      { name: "MOLSIDOMINE BEKER", note: "بديل في حالة عدم تحمل النترات" },
    ],
    warning: "إذا استمر الألم أكثر من 15 دقيقة رغم العلاج: حالة طارئة — اتصل بالإسعاف",
  },
  result_ic_legere_ar: {
    result: true,
    title: "قصور القلب الخفيف إلى المتوسط",
    icon: "❤️",
    color: "#fee2e2",
    border: "#ef4444",
    medicines: [
      { name: "بيريندوبريل (COVERSYL) أو راميبريل (TRIATEC)", note: "مثبط الإنزيم المحول — يحسّن البقاء على الحياة" },
      { name: "بيسوبرولول (BIPROTENS)", note: "حاصر بيتا — جرعة تدريجية" },
      { name: "نيبيفولول (BYZOLEX)", note: "حاصر بيتا مفضل عند كبار السن > 70 سنة" },
    ],
    warning: "زيادة الجرعة بشكل تدريجي جداً. متابعة طبية منتظمة ضرورية",
  },
  result_ic_severe_ar: {
    result: true,
    title: "قصور القلب الشديد مع احتباس الماء",
    icon: "❤️",
    color: "#fee2e2",
    border: "#ef4444",
    medicines: [
      { name: "FUROZAL", note: "مدر بول قوي — يقلل الوذمات" },
      { name: "SPIRONOLONE", note: "موفر للبوتاسيوم — يحسن البقاء على الحياة" },
    ],
    warning: "متابعة الوزن يومياً، نسبة البوتاسيوم والكرياتينين",
  },
  result_rythme_tachy_ar: {
    result: true,
    title: "تسارع القلب / الرجفان الأذيني",
    icon: "❤️",
    color: "#fee2e2",
    border: "#ef4444",
    medicines: [
      { name: "فيراباميل (ISOPTYL)", note: "حاصر قنوات الكالسيوم المهدئ لمعدل القلب" },
      { name: "FLECALUR", note: "مضاد لاضطراب نظم القلب — تحت إشراف طبيب القلب" },
    ],
    warning: "الاستخدام تحت إشراف طبيب قلب فقط. يجب إجراء تخطيط القلب للمتابعة",
  },
  result_rythme_freq_ar: {
    result: true,
    title: "التحكم في معدل ضربات القلب",
    icon: "❤️",
    color: "#fee2e2",
    border: "#ef4444",
    medicines: [
      { name: "بيسوبرولول (BIPROTENS، BIPROSTENE)", note: "حاصر بيتا — يبطئ القلب" },
      { name: "ديلتيازيم (MONOTILDIEM)", note: "حاصر قنوات الكالسيوم المبطئ للقلب" },
    ],
    warning: "لا يجب الجمع بين بيسوبرولول وديلتيازيم بدون استشارة طبية (خطر الإحصار القلبي)",
  },
  result_prevention_antiagr_ar: {
    result: true,
    title: "مضاد لتكتل الصفائح الدموية",
    icon: "❤️",
    color: "#fee2e2",
    border: "#ef4444",
    medicines: [
      { name: "كلوبيدوغرل (PLAFIX)", note: "الخيار الأول بعد احتشاء القلب / القسطرة" },
      { name: "أسبرين (ASPEC 100mg)", note: "جرعة منخفضة — الوقاية القلبية الوعائية" },
    ],
    warning: "لا يجب التوقف بدون استشارة طبية. يجب إخبار الجراح / طبيب الأسنان قبل أي عملية",
  },
  result_prevention_anticoag_ar: {
    result: true,
    title: "مضاد التخثر — الوقاية من الجلطات",
    icon: "❤️",
    color: "#fee2e2",
    border: "#ef4444",
    medicines: [
      { name: "إينوكسابارين (VARENOX)", note: "هيبارين منخفض الوزن الجزيئي — حقن تحت الجلد" },
    ],
    warning: "الاستخدام في المستشفى أو بوصفة طبية. متابعة النزيف",
  },
  result_prevention_statine_ar: {
    result: true,
    title: "خافض للدهون — الكوليسترول",
    icon: "❤️",
    color: "#fee2e2",
    border: "#ef4444",
    medicines: [
      { name: "روزوفاستاتين (NOVAROL، CRESTATINE، CRESOVAST، SUPERSTAT)", note: "ستاتين — يخفض الكوليسترول الضار LDL" },
    ],
    warning: "يؤخذ مساءً. متابعة إنزيمات العضلات (آلام العضلات). فحص وظائف الكبد",
  },
  result_veineux_leger_ar: {
    result: true,
    title: "القصور الوريدي — ثقل الساقين",
    icon: "❤️",
    color: "#fee2e2",
    border: "#ef4444",
    medicines: [
      { name: "ديوسمين (DIOVEINE 600mg)", note: "مقوي وريدي — قرص واحد/يوم مع الوجبة الرئيسية" },
      { name: "NAFRONYL", note: "موسع للأوعية المحيطية — التهاب الشرايين" },
      { name: "VENOTRIT", note: "مقوي وريدي طبيعي" },
    ],
    warning: "ينصح بالمشي المنتظم، رفع الساقين، وارتداء جوارب ضاغطة",
  },
  result_veineux_hemorroides_ar: {
    result: true,
    title: "البواسير",
    icon: "❤️",
    color: "#fee2e2",
    border: "#ef4444",
    medicines: [
      { name: "ديوسمين (DIOVEINE)", note: "قرصان/يوم خلال النوبة، ثم قرص واحد/يوم" },
    ],
    warning: "استشر الطبيب في حالة نزيف غزير أو مستمر",
  },
  // RESPIRATOIRE RESULTS AR
  result_asthme_leger_ar: {
    result: true,
    title: "ربو خفيف — موسع قصبات عند الحاجة",
    icon: "🫁",
    color: "#dbeafe",
    border: "#3b82f6",
    medicines: [
      { name: "سالبوتامول (VENTOLINE)", note: "موسع قصبات للإسعاف — عند الحاجة خلال النوبات" },
      { name: "مونتيلوكاست (MONTELAIR 10mg)", note: "مضاد للوكوترين — للوقاية في حالة ربو الجهد" },
    ],
    warning: "إذا تكررت النوبات أكثر من مرتين في الأسبوع → الانتقال إلى علاج أساسي بكورتيكوستيرويد مستنشق",
  },
  result_asthme_severe_ar: {
    result: true,
    title: "ربو مستمر — العلاج الأساسي",
    icon: "🫁",
    color: "#dbeafe",
    border: "#3b82f6",
    medicines: [
      { name: "بوديزونيد (PULMICORT)", note: "كورتيكوستيرويد مستنشق — الخيار الأول" },
      { name: "فلوتيكازون (FLIXOTIDE)", note: "كورتيكوستيرويد مستنشق — بديل فعّال" },
      { name: "بوديزونيد + فورموتيرول (SYMBICORT)", note: "مركب — ربو متوسط إلى شديد" },
      { name: "مونتيلوكاست (MONTELAIR)", note: "علاج مكمّل في حالة عدم التحكم الكافي" },
    ],
    warning: "اشطف الفم بعد كل استنشاق. لا يجب التوقف بشكل مفاجئ",
  },
  result_asthme_crise_ar: {
    result: true,
    title: "نوبة ربو حادة — موسع قصبات للإسعاف",
    icon: "🫁",
    color: "#dbeafe",
    border: "#3b82f6",
    medicines: [
      { name: "سالبوتامول (VENTOLINE)", note: "بخّتان، يمكن التكرار عند الحاجة. استخدام حجرة استنشاق للأطفال" },
      { name: "شراب سالبولام (SALBULAM)", note: "للطفل غير القادر على استخدام البخاخ" },
    ],
    warning: "إذا لم تتحسن النوبة الشديدة بعد 3 جرعات: حالة طارئة — استشر الطبيب فوراً",
  },
  result_toux_seche_ar: {
    result: true,
    title: "سعال جاف — مضادات السعال",
    icon: "🫁",
    color: "#dbeafe",
    border: "#3b82f6",
    medicines: [
      { name: "أوكسوميمازين (TOPLEXIL شراب)", note: "للبالغين والأطفال > 2 سنة — يمكن أن يسبب النعاس" },
      { name: "بوتاميرات (SINECOD شراب)", note: "للأطفال > 6 سنوات — أقل تسبباً في النعاس" },
      { name: "ديكستروميتورفان (BRONCHOCALM)", note: "للبالغين والأطفال > 6 سنوات" },
    ],
    warning: "لا يجب الجمع بين مضاد السعال والمقشع. المدة القصوى: 7 أيام",
  },
  result_toux_grasse_ar: {
    result: true,
    title: "سعال بلغمي — مقشعات / حالة للمخاط",
    icon: "🫁",
    color: "#dbeafe",
    border: "#3b82f6",
    medicines: [
      { name: "كاربوسيستئين (CARBOMEX 5%، CARBODAL)", note: "حال للمخاط — للبالغين والأطفال > 2 سنة" },
    ],
    warning: "شرب كمية كافية من الماء. لا يجب الجمع مع مضاد السعال",
  },
  result_allergie_adulte_ar: {
    result: true,
    title: "حساسية / التهاب الأنف التحسسي — بالغ",
    icon: "🫁",
    color: "#dbeafe",
    border: "#3b82f6",
    medicines: [
      { name: "فيكسوفينادين (TELFAST 120mg / 180mg)", note: "غير مسبب للنعاس — الخيار الأول لحساسية الأنف الموسمية" },
      { name: "بيلاستين (BILAXTEN 20mg)", note: "غير مسبب للنعاس — يؤخذ على معدة فارغة" },
      { name: "لوراتادين (LORADINE 10mg)", note: "غير مسبب للنعاس — حساسية / شرى" },
      { name: "فلوتيكازون أنفي (NASALIX)", note: "كورتيكوستيرويد أنفي — التهاب الأنف التحسسي المستمر" },
    ],
    warning: "يجب التوقف 48 ساعة قبل فحص الحساسية الجلدي",
  },
  result_allergie_enfant_ar: {
    result: true,
    title: "حساسية — طفل (من 2 إلى 12 سنة)",
    icon: "🫁",
    color: "#dbeafe",
    border: "#3b82f6",
    medicines: [
      { name: "ديسلوراتادين (DESLOR شراب 0.5mg/ml)", note: "من عمر 6 أشهر — غير مسبب للنعاس" },
      { name: "لوراتادين شراب (LORADINE 0.1%)", note: "من عمر 2 سنة" },
    ],
    warning: "استخدم المحقنة المدرّجة المخصصة. الجرعة حسب وزن الطفل",
  },
  result_allergie_nourr_ar: {
    result: true,
    title: "حساسية — رضيع (أقل من 2 سنة)",
    icon: "🫁",
    color: "#dbeafe",
    border: "#3b82f6",
    medicines: [
      { name: "ديسلوراتادين (DESLOR شراب)", note: "من عمر 6 أشهر بوصفة طبية" },
    ],
    warning: "استشر الطبيب دائماً قبل علاج الرضيع",
  },
  result_allergie_cutanee_ar: {
    result: true,
    title: "حساسية جلدية / شرى",
    icon: "🫁",
    color: "#dbeafe",
    border: "#3b82f6",
    medicines: [
      { name: "فيكسوفينادين (TELFAST 180mg)", note: "غير مسبب للنعاس — شرى مزمن للبالغين" },
      { name: "لوراتادين (LORADINE 10mg)", note: "غير مسبب للنعاس — حساسية جلدية" },
      { name: "بيلاستين (BILAXTEN)", note: "غير مسبب للنعاس — شرى وحساسية الأنف" },
    ],
    warning: "في حالة شرى مع تورم الوجه أو صعوبة في التنفس: حالة طارئة",
  },
  result_congestion_ar: {
    result: true,
    title: "احتقان الأنف — مزيل للاحتقان",
    icon: "🫁",
    color: "#dbeafe",
    border: "#3b82f6",
    medicines: [
      { name: "أوكسيميتازولين (RESPINHAL)", note: "مزيل احتقان أنفي — مفعول سريع" },
      { name: "ألفا أميلاز (MAXILASE شراب)", note: "يسيل الإفرازات الأنفية" },
    ],
    warning: "لا يستخدم RESPINHAL أكثر من 5 أيام (تأثير ارتدادي). طفل < 2 سنة: استشر الطبيب",
  },
  // GASTRO RESULTS AR
  result_rgo_ar: {
    result: true,
    title: "الارتجاع المعدي المريئي / حرقة المعدة",
    icon: "🧪",
    color: "#d1fae5",
    border: "#10b981",
    medicines: [
      { name: "أوميبرازول (LOMAC 20mg، PROTON 20mg)", note: "مثبط مضخة البروتون — الخيار الأول. يؤخذ 30 دقيقة قبل الوجبة" },
      { name: "ديكسلانسوبرازول (DEXILANT 30mg)", note: "مثبط مضخة البروتون — يمكن أن يؤخذ مع أو بدون طعام" },
      { name: "هيدروكسيد الألومنيوم + المغنيسيوم (MAALOX)", note: "مضاد للحموضة — تخفيف سريع للأعراض" },
    ],
    warning: "لا يستخدم مثبط مضخة البروتون أكثر من 14 يوماً بدون استشارة طبية",
  },
  result_spasmes_ar: {
    result: true,
    title: "تقلصات معوية / القولون العصبي",
    icon: "🧪",
    color: "#d1fae5",
    border: "#10b981",
    medicines: [
      { name: "ميبيفيرين (DUSPATALIN 200mg)", note: "مضاد للتشنج — 20 دقيقة قبل الوجبات" },
      { name: "تريميبوتين (DEBRIDAT، TRIMEBUTINE BIOCARE)", note: "مضاد للتشنج — للبالغين والأطفال > 2 سنة" },
      { name: "بريفينيوم (RIABAL 30mg)", note: "مضاد للتشنج المضاد للكولين — المغص" },
      { name: "بينافيريوم (DICETEL 100mg)", note: "مضاد للتشنج الانتقائي للقولون" },
    ],
    warning: "يُنصح بتجنب الأطعمة المسببة للتخمر مع الالتزام بنظام غذائي مناسب",
  },
  result_diarrhee_adulte_ar: {
    result: true,
    title: "الإسهال الحاد — البالغ",
    icon: "🧪",
    color: "#d1fae5",
    border: "#10b981",
    medicines: [
      { name: "راسيكادوتريل (TIOPAM، NOBAC)", note: "مضاد للإفراز — 100mg 3 مرات/يوم قبل الوجبات" },
      { name: "ديوسمكتيت (SMECTA، BEDELIX)", note: "مادة ماصة — تحمي الغشاء المعوي" },
    ],
    warning: "يجب دائماً ترطيب الجسم عن طريق الفم. استشر الطبيب في حال وجود دم في البراز أو حمى شديدة",
  },
  result_diarrhee_enfant_ar: {
    result: true,
    title: "الإسهال الحاد — طفل / رضيع",
    icon: "🧪",
    color: "#d1fae5",
    border: "#10b981",
    medicines: [
      { name: "راسيكادوتريل (NOBAC للأطفال)", note: "1.5 ملغ/كلغ × 3 مرات/يوم — من عمر 3 أشهر" },
      { name: "ديوسمكتيت (SMECTA)", note: "كيس واحد/يوم للرضيع — 1 إلى 3 أكياس/يوم للطفل" },
    ],
    warning: "إعادة الترطيب عن طريق الفم لها الأولوية القصوى. لا تستخدم بدون إعادة الترطيب أبداً",
  },
  result_constipation_ar: {
    result: true,
    title: "الإمساك",
    icon: "🧪",
    color: "#d1fae5",
    border: "#10b981",
    medicines: [
      { name: "لاكتولوز (ISOLACT)", note: "ملين أسموزي — لطيف، يمكن استخدامه عند الرضيع" },
      { name: "غليسيرين (تحاميل GLYCERINE LS)", note: "تحميلة — مفعول موضعي سريع" },
    ],
    warning: "زيادة الألياف الغذائية والترطيب قبل أي علاج دوائي",
  },
  result_gaz_ar: {
    result: true,
    title: "الانتفاخ / الغازات",
    icon: "🧪",
    color: "#d1fae5",
    border: "#10b981",
    medicines: [
      { name: "سيميتيكون (FREEGAS، LOWGAS)", note: "مضاد للغازات — بعد الوجبات" },
      { name: "ألفيرين + سيميتيكون (METEOSPASMYL)", note: "مضاد للتشنج + مضاد للغازات — القولون العصبي مع الانتفاخ" },
    ],
    warning: "حدد وتجنب الأطعمة المسببة للتخمر (الملفوف، البقوليات، المشروبات الغازية)",
  },
  result_nausees_ar: {
    result: true,
    title: "الغثيان / القيء",
    icon: "🧪",
    color: "#d1fae5",
    border: "#10b981",
    medicines: [
      { name: "دومبيريدون (DOMPERONE 10mg)", note: "للبالغين والمراهقين > 12 سنة بوزن > 35 كلغ — الحد الأقصى أسبوع واحد" },
    ],
    warning: "لا يستخدم عند الأطفال أقل من 12 سنة. المدة القصوى أسبوع واحد",
  },
  // DOULEUR RESULTS AR
  result_douleur_adulte_ar: {
    result: true,
    title: "ألم / حمى — بالغ",
    icon: "💊",
    color: "#fef9c3",
    border: "#eab308",
    medicines: [
      { name: "باراسيتامول (PARAMOL 1000mg، EFFERALGAN 1000mg، DOLIPRANE 1000mg)", note: "الخيار الأول — 1 غرام كل 6 ساعات. الحد الأقصى 3 غرام/يوم" },
      { name: "إيبوبروفين (XYDOL 600mg، ANTALFEN 600mg)", note: "مضاد التهاب — إذا كان الباراسيتامول غير كافٍ. يؤخذ مع الطعام" },
    ],
    warning: "الحد الأقصى لباراسيتامول 3 غرام/يوم. لا يجب تجاوز 5 أيام من مضادات الالتهاب بدون استشارة طبية",
  },
  result_douleur_enfant_ar: {
    result: true,
    title: "ألم / حمى — طفل (من 6 إلى 15 سنة)",
    icon: "💊",
    color: "#fef9c3",
    border: "#eab308",
    medicines: [
      { name: "باراسيتامول (DOLIPRANE شراب 2.4%، EFFERALGAN للأطفال)", note: "15 ملغ/كلغ في الجرعة الواحدة — يحسب حسب الوزن" },
      { name: "إيبوبروفين (ANTALFEN شراب 20mg/ml)", note: "10 ملغ/كلغ — من عمر 6 أشهر، مع الطعام" },
    ],
    warning: "احسب الجرعة دائماً حسب وزن الطفل، لا حسب عمره",
  },
  result_douleur_nourr_ar: {
    result: true,
    title: "ألم / حمى — رضيع (أقل من 6 سنوات)",
    icon: "💊",
    color: "#fef9c3",
    border: "#eab308",
    medicines: [
      { name: "باراسيتامول معلق (DOLIPRANE 2.4%)", note: "15 ملغ/كلغ كل 6 ساعات — استخدام المحقنة المدرجة إلزامي" },
    ],
    warning: "الإيبوبروفين ممنوع قبل 6 أشهر. يجب تحديد الجرعة حسب الوزن مع استخدام المحقنة دائماً",
  },
  result_ains_general_ar: {
    result: true,
    title: "مضادات الالتهاب غير الستيرويدية (AINS)",
    icon: "💊",
    color: "#fef9c3",
    border: "#eab308",
    medicines: [
      { name: "إيبوبروفين (XYDOL، ANTALFEN، IBUPROFENE BEKER)", note: "مضاد التهاب كلاسيكي — يؤخذ مع الطعام" },
      { name: "ديكلوفيناك (BIOFENAC LP، CLOFENAL، VOTREX)", note: "مضاد التهاب قوي — مع الطعام" },
      { name: "سيليكوكسيب (CELECOX، COXIBREX)", note: "مثبط COX-2 — تحمّل أفضل للمعدة" },
      { name: "بيروكسيكام (FRADENE 20mg)", note: "مضاد التهاب — التهاب المفاصل والروماتيزم" },
    ],
    warning: "يؤخذ دائماً مع وجبة. لا يتجاوز 5 أيام بدون استشارة طبية",
  },
  result_ains_gastro_ar: {
    result: true,
    title: "ألم التهابي + مشكلة معوية",
    icon: "💊",
    color: "#fef9c3",
    border: "#eab308",
    medicines: [
      { name: "سيليكوكسيب (CELECOX 200mg، COXIBREX 200mg)", note: "مثبط COX-2 — تحمّل هضمي أفضل" },
      { name: "باراسيتامول (PARAMOL 1000mg)", note: "يُضاف للألم الخفيف إلى المتوسط" },
    ],
    warning: "أضف حماية للمعدة (أوميبرازول) إذا كان استخدام مضاد التهاب كلاسيكي ضرورياً",
  },
  result_ains_contre_ar: {
    result: true,
    title: "مضادات الالتهاب ممنوعة — البديل",
    icon: "💊",
    color: "#fef9c3",
    border: "#eab308",
    medicines: [
      { name: "باراسيتامول (PARAMOL، DOLIPRANE، EFFERALGAN)", note: "الخيار الآمن الوحيد — للحمل وللأطفال أقل من 12 سنة" },
    ],
    warning: "مضادات الالتهاب ممنوعة تماماً: الحمل بعد الشهر السادس والأطفال أقل من 12 سنة لجرعة إيبوبروفين 400mg+",
  },
  result_muscle_ar: {
    result: true,
    title: "ألم عضلي / تقلصات",
    icon: "💊",
    color: "#fef9c3",
    border: "#eab308",
    medicines: [
      { name: "ثيوكولشيكوزيد (TGC PLUS)", note: "مرخي للعضلات — الحد الأقصى 7 أيام، للبالغين فقط" },
      { name: "تولبيريزون (MYORELAX)", note: "مرخي عضلي مركزي — تشنج عصبي" },
      { name: "باكلوفين (BACLON 10mg)", note: "مرخي عضلي — تشنج التصلب اللويحي، السكتة الدماغية" },
    ],
    warning: "ثيوكولشيكوزيد ممنوع تماماً للحامل والمراهقين أقل من 18 سنة",
  },
  result_topique_ar: {
    result: true,
    title: "ألم موضعي — علاج خارجي",
    icon: "💊",
    color: "#fef9c3",
    border: "#eab308",
    medicines: [
      { name: "ديكلوفيناك جل (VOLTARENE 1%)", note: "مضاد التهاب موضعي — التواء، التهاب الأوتار" },
      { name: "كيتوبروفين جل (KETUM 2.5%)", note: "مضاد التهاب موضعي — الحماية من الشمس إلزامية" },
      { name: "إيبوبروفين + منثول (IBUTHOL 5%/3%)", note: "كريم — آلام العضلات" },
    ],
    warning: "جل كيتوبروفين: حماية صارمة من الشمس أثناء الاستخدام وأسبوعين بعده",
  },
  // NEURO RESULTS AR
  result_depression_ar: {
    result: true,
    title: "اكتئاب / قلق",
    icon: "🧠",
    color: "#ede9fe",
    border: "#7c3aed",
    medicines: [
      { name: "سيرترالين (ZOLOFT، SOLOTIK)", note: "مضاد اكتئاب ISRS — الخيار الأول للاكتئاب والقلق" },
      { name: "إسيتالوبرام (ESCITALOPRAM BEKER)", note: "مضاد اكتئاب ISRS — تحمّل جيد، للاكتئاب والقلق العام" },
      { name: "فلوكسيتين (FLUOXETINE MERINAL)", note: "مضاد اكتئاب ISRS — مفعول طويل المدى، الوسواس القهري والشره العصبي" },
      { name: "إيتيفوكسين (STRESAM)", note: "مضاد قلق غير بنزوديازيبيني — القلق التفاعلي" },
    ],
    warning: "المفعول العلاجي يظهر بعد 4 إلى 6 أسابيع. لا يجب التوقف بشكل مفاجئ",
  },
  result_epilepsie_ar: {
    result: true,
    title: "الصرع",
    icon: "🧠",
    color: "#ede9fe",
    border: "#7c3aed",
    medicines: [
      { name: "ليفيتيراسيتام (KEPAM)", note: "مضاد صرع من الجيل الثاني — تحمّل جيد" },
      { name: "لاموتريجين (LAMOTRIGINE BEKER)", note: "مضاد صرع — الزيادة التدريجية إلزامية" },
      { name: "فالبروات (DEPAKINE CHRONO)", note: "واسع المفعول — ممنوع تماماً أثناء الحمل" },
      { name: "كاربامازيبين (CARBIMOL)", note: "للصرع البؤري — تفاعلات دوائية كثيرة" },
    ],
    warning: "لا يجب التوقف عن مضاد الصرع بشكل مفاجئ أبداً. يجب أن يكون تحت متابعة طبيب أعصاب",
  },
  result_psychose_ar: {
    result: true,
    title: "الفصام / اضطراب ثنائي القطب",
    icon: "🧠",
    color: "#ede9fe",
    border: "#7c3aed",
    medicines: [
      { name: "أريبيبرازول (ARIPIPRAZOLE BEKER oro)", note: "مضاد نفسي غير نمطي — زيادة وزن أقل" },
      { name: "كيتيابين (QUETIAPINE BEKER LP)", note: "مضاد نفسي — الفصام واضطراب ثنائي القطب" },
      { name: "أولانزابين (LANZAPREX)", note: "مضاد نفسي — فعال لكن زيادة وزن كبيرة" },
      { name: "ريسبيريدون (RISPERIDONE BEKER)", note: "مضاد نفسي — أيضاً في حالات التوحد" },
      { name: "فالبروات (DEPAKINE CHRONO)", note: "منظم للمزاج — اضطراب ثنائي القطب" },
    ],
    warning: "تحت متابعة طبيب نفسي بشكل صارم. لا يجب التوقف بشكل مفاجئ",
  },
  result_vertiges_ar: {
    result: true,
    title: "دوار / طنين الأذن (مرض مينيير)",
    icon: "🧠",
    color: "#ede9fe",
    border: "#7c3aed",
    medicines: [
      { name: "بيتاهيستين (BETASERC 24mg، VERSEC 24mg)", note: "مرض مينيير — مرتين/يوم مع الوجبة. المفعول يظهر بعد عدة أسابيع" },
      { name: "أسيتيل لوسين (GANTANIL 500mg)", note: "دوار الدهليز — الحد الأقصى 3 أسابيع" },
    ],
    warning: "علاج طويل المدى لبيتاهيستين. النتائج تظهر بعد عدة أسابيع",
  },
  result_neuropathie_ar: {
    result: true,
    title: "آلام عصبية",
    icon: "🧠",
    color: "#ede9fe",
    border: "#7c3aed",
    medicines: [
      { name: "غابابنتين (GABATREX 300mg)", note: "آلام عصبية — زيادة تدريجية" },
    ],
    warning: "زيادة الجرعة تدريجياً جداً. قد يسبب النعاس والدوار",
  },
  result_parkinson_ar: {
    result: true,
    title: "مرض باركنسون",
    icon: "🧠",
    color: "#ede9fe",
    border: "#7c3aed",
    medicines: [
      { name: "ليفودوبا + كاربيدوبا (LEVOCARB 250/25mg)", note: "العلاج المرجعي لمرض باركنسون" },
      { name: "روبينيرول (KEPNIROL)", note: "ناهض دوبامين — بمفرده أو مع العلاج الأساسي في المراحل المبكرة" },
    ],
    warning: "متابعة طبية عصبية إلزامية. لا يجب التوقف بشكل مفاجئ. تجنب الأطعمة الغنية بالبروتين وقت تناول الدواء",
  },
  result_spasticite_ar: {
    result: true,
    title: "التشنج العضلي (تصلب لويحي، سكتة دماغية، إصابة نخاعية)",
    icon: "🧠",
    color: "#ede9fe",
    border: "#7c3aed",
    medicines: [
      { name: "باكلوفين (BACLON 10mg)", note: "مرخي عضلي مركزي — زيادة تدريجية جداً. الحد الأقصى 100mg/يوم" },
      { name: "تولبيريزون (MYORELAX)", note: "مرخي عضلي — تشنج من أصل عصبي" },
    ],
    warning: "لا يجب التوقف عن باكلوفين بشكل مفاجئ أبداً (خطر التشنجات والهلوسة)",
  },
  // INFECTIEUX RESULTS AR
  result_respi_amox_ar: {
    result: true,
    title: "عدوى تنفسية — بدون حساسية للبنسلين",
    icon: "🔬",
    color: "#fce7f3",
    border: "#ec4899",
    medicines: [
      { name: "أموكسيسيلين (CLAMOXYL 1g)", note: "التهاب الحلق العقدي، الالتهاب الرئوي — الخيار الأول" },
      { name: "أموكسيسيلين + حمض كلافولانيك (AUGMENTIN، AMOCLAN BID)", note: "التهاب الجيوب، التهاب القصبات المعند" },
      { name: "أزيثروميسين (ZOMAX 500mg، ZYNAX)", note: "الالتهاب الرئوي اللانمطي — 3 أيام" },
    ],
    warning: "التهاب الحلق: 10 أيام لتجنب الحمى الروماتيزمية. يجب إتمام العلاج كاملاً",
  },
  result_respi_allergie_ar: {
    result: true,
    title: "عدوى تنفسية — حساسية للبنسلين",
    icon: "🔬",
    color: "#fce7f3",
    border: "#ec4899",
    medicines: [
      { name: "أزيثروميسين (ZOMAX 500mg، ZYNAX 500mg)", note: "ماكروليد — 3 أيام" },
      { name: "بريستيناميسين (PYOSTACINE 500mg)", note: "ستربتوغرامين — التهاب الحلق العقدي" },
    ],
    warning: "أبلغ أي أخصائي صحي بحساسيتك للبنسلين",
  },
  result_orl_infection_ar: {
    result: true,
    title: "عدوى أنف وأذن وحنجرة (التهاب الأذن، الجيوب)",
    icon: "🔬",
    color: "#fce7f3",
    border: "#ec4899",
    medicines: [
      { name: "أموكسيسيلين + حمض كلافولانيك (AUGMENTIN)", note: "التهاب الأذن، التهاب الجيوب البكتيري — الخيار الأول" },
      { name: "سيفيكسيم (CEFIMAX شراب)", note: "سيفالوسبورين — التهاب الأذن عند الطفل في حالة المقاومة" },
    ],
    warning: "التهاب الأذن الفيروسي: لا حاجة لمضادات حيوية. استشر الطبيب للتشخيص الدقيق",
  },
  result_urinaire_ar: {
    result: true,
    title: "عدوى المسالك البولية السفلية (التهاب المثانة عند المرأة)",
    icon: "🔬",
    color: "#fce7f3",
    border: "#ec4899",
    medicines: [
      { name: "فوسفوميسين (URICARE 3g)", note: "جرعة واحدة — كيس واحد مساءً بعد التبول" },
      { name: "نيتروكسولين (NITROXAL 100mg، NOLIB)", note: "10 إلى 21 يوماً — تلون البول بالبرتقالي طبيعي" },
      { name: "سيبروفلوكساسين (CIPROLON)", note: "عدوى بولية معقدة — للبالغين فقط" },
    ],
    warning: "شرب الكثير من الماء. فوسفوميسين: جرعة واحدة تكفي لالتهاب المثانة البسيط",
  },
  result_cutanee_ar: {
    result: true,
    title: "عدوى جلدية / أسنان",
    icon: "🔬",
    color: "#fce7f3",
    border: "#ec4899",
    medicines: [
      { name: "سبيراميسين + ميترونيدازول (OROGYL، BI-OROGYL)", note: "عدوى الأسنان — تجنب الكحول" },
      { name: "سيفاليكسين (LEXIN 1000mg)", note: "عدوى جلدية بالمكورات العنقودية" },
      { name: "دوكسيسيكلين (DOTUR 100mg)", note: "حب الشباب الشديد، العدوى الجلدية" },
      { name: "حمض الفوسيديك كريم (FUCIDINE 2%)", note: "القوباء، العدوى الجلدية الموضعية" },
    ],
    warning: "سبيراميسين + ميترونيدازول: تجنب الكحول تماماً أثناء العلاج و48 ساعة بعده",
  },
  result_parasitaire_ar: {
    result: true,
    title: "عدوى طفيلية / هضمية",
    icon: "🔬",
    color: "#fce7f3",
    border: "#ec4899",
    medicines: [
      { name: "ميترونيدازول (FLAZOL 500mg، METRONIDAZOLE BEKER)", note: "الأميبا، الجيارديا، التهاب المهبل — تجنب الكحول" },
    ],
    warning: "تجنب الكحول تماماً أثناء العلاج بالميترونيدازول و48 ساعة بعده",
  },
  result_mycose_cutanee_ar: {
    result: true,
    title: "فطريات جلدية",
    icon: "🔬",
    color: "#fce7f3",
    border: "#ec4899",
    medicines: [
      { name: "إيكونازول (PHANAZOL 1%)", note: "قدم الرياضي، فطريات الثنايا — مرتين/يوم" },
      { name: "ميكونازول (DAKTAZOL 2% كريم/مرهم)", note: "مضاد فطري موضعي واسع المفعول" },
      { name: "كلوتريمازول (LAMIDAZ 1%)", note: "فطريات جلدية ومهبلية" },
      { name: "بيروكتون أولامين (MYCOCIDE 1%)", note: "التهاب الجلد الدهني، النخالية المبرقشة" },
    ],
    warning: "استمر أسبوعاً بعد اختفاء الأعراض لتجنب الانتكاس",
  },
  result_mycose_genitale_ar: {
    result: true,
    title: "فطريات تناسلية (داء المبيضات المهبلي)",
    icon: "🔬",
    color: "#fce7f3",
    border: "#ec4899",
    medicines: [
      { name: "فلوكونازول (VIRCET 150mg، MYCOZAN)", note: "جرعة واحدة — كبسولة واحدة تكفي" },
      { name: "إيكونازول موضعي (PHANAZOL)", note: "علاج موضعي بديل" },
    ],
    warning: "فلوكونازول ممنوع تماماً أثناء الحمل. استشر الطبيب",
  },
  // DIABETE RESULTS AR
  result_diabete_1_ar: {
    result: true,
    title: "السكري النوع 2 — الخط الأول",
    icon: "🩺",
    color: "#ecfdf5",
    border: "#059669",
    medicines: [
      { name: "ميتفورمين (GLUCOPHAGE، NOVOFORMINE، STAGID)", note: "الخيار الأول المطلق — يؤخذ مع الوجبات" },
    ],
    warning: "يتوقف قبل حقن صبغة التصوير باليود. متابعة وظائف الكلى",
  },
  result_diabete_2_ar: {
    result: true,
    title: "السكري النوع 2 — تحكم غير كافٍ",
    icon: "🩺",
    color: "#ecfdf5",
    border: "#059669",
    medicines: [
      { name: "غليكلازيد (DIAMICRON 30mg / 60mg، DIAPHAG)", note: "سلفونيل يوريا — يؤخذ صباحاً مع الفطور" },
      { name: "غليميبيريد (IRYS 3mg / 4mg / 6mg)", note: "سلفونيل يوريا — مفعول طويل المدى" },
      { name: "ريباغلينيد (GLINIX، DIAGLINIDE)", note: "غلينيد — يؤخذ 15 دقيقة قبل كل وجبة" },
      { name: "فيلداغليبتين (LARIMEL 500mg)", note: "DPP-4 — مع ميتفورمين" },
      { name: "سيتاغليبتين (GLYBEK 100mg)", note: "DPP-4 — جرعة واحدة/يوم، تحمّل هضمي جيد" },
    ],
    warning: "احمل دائماً السكر معك (خطر نقص السكر مع السلفونيل يوريا والغلينيدات)",
  },
  result_hypothyroidie_ar: {
    result: true,
    title: "قصور الغدة الدرقية",
    icon: "🩺",
    color: "#ecfdf5",
    border: "#059669",
    medicines: [
      { name: "ليفوثيروكسين (LEVOTHYROX 25µg / 50µg / 75µg / 100µg)", note: "علاج مدى الحياة — يؤخذ على معدة فارغة صباحاً 30 دقيقة قبل الفطور" },
    ],
    warning: "تناوله على معدة فارغة إلزامي. فحص دوري لهرمون TSH. لا يجب التوقف أبداً",
  },
  result_hyperthyroidie_ar: {
    result: true,
    title: "فرط نشاط الغدة الدرقية",
    icon: "🩺",
    color: "#ecfdf5",
    border: "#059669",
    medicines: [
      { name: "ثيامازول (ATHYROZOL 5mg)", note: "مضاد درقي تركيبي — الجرعة حسب الشدة" },
    ],
    warning: "توقف واستشر الطبيب فوراً عند الحمى أو التهاب الحلق (خطر نقص المحببات)",
  },
  // PEDIATRIE RESULTS AR
  result_fievre_nourr_ar: {
    result: true,
    title: "حمى / ألم — رضيع أقل من 3 أشهر",
    icon: "👶",
    color: "#fff7ed",
    border: "#f97316",
    medicines: [
      { name: "باراسيتامول معلق (DOLIPRANE 2.4%)", note: "15 ملغ/كلغ في الجرعة الواحدة. المحقنة المدرجة إلزامية" },
    ],
    warning: "عاجل: رضيع أقل من 3 أشهر مع حمى = استشر الطبيب فوراً. الإيبوبروفين ممنوع تماماً قبل 3 أشهر",
  },
  result_fievre_bebe_ar: {
    result: true,
    title: "حمى / ألم — رضيع من 3 أشهر إلى 2 سنة",
    icon: "👶",
    color: "#fff7ed",
    border: "#f97316",
    medicines: [
      { name: "باراسيتامول (DOLIPRANE 2.4% شراب)", note: "15 ملغ/كلغ في الجرعة الواحدة — الخيار الأول" },
      { name: "إيبوبروفين (ANTALFEN 20mg/ml شراب)", note: "10 ملغ/كلغ — من عمر 6 أشهر كخيار ثانٍ" },
    ],
    warning: "الإيبوبروفين ممنوع قبل 6 أشهر. احسب الجرعة دائماً حسب الوزن",
  },
  result_fievre_enfant_ar: {
    result: true,
    title: "حمى / ألم — طفل من 2 إلى 12 سنة",
    icon: "👶",
    color: "#fff7ed",
    border: "#f97316",
    medicines: [
      { name: "باراسيتامول (DOLIPRANE شراب، EFFERALGAN للأطفال)", note: "15 ملغ/كلغ في الجرعة الواحدة — الخيار الأول" },
      { name: "إيبوبروفين (ANTALFEN شراب)", note: "10 ملغ/كلغ — كبديل أو مكمّل" },
    ],
    warning: "يمكن التبديل بين الباراسيتامول والإيبوبروفين في حالة حمى مستمرة. احسب دائماً حسب الوزن",
  },
  result_pediatrie_toux_ar: {
    result: true,
    title: "سعال / زكام — طفل",
    icon: "👶",
    color: "#fff7ed",
    border: "#f97316",
    medicines: [
      { name: "أوكسوميمازين (TOPLEXIL، VOMITEB شراب)", note: "سعال جاف — طفل > 2 سنة. قد يسبب النعاس" },
      { name: "كاربوسيستئين (CARBODAL 5% شراب)", note: "سعال بلغمي — طفل > 2 سنة. الترطيب الجيد ضروري" },
      { name: "أوكسيميتازولين (RESPINHAL)", note: "احتقان الأنف — الحد الأقصى 5 أيام" },
    ],
    warning: "لا يجب الجمع بين مضاد السعال والمقشع. سيلان الأنف فقط: الغسل بالماء المالح غالباً يكفي",
  },
  result_pediatrie_digestif_ar: {
    result: true,
    title: "اضطرابات هضمية — طفل / رضيع",
    icon: "👶",
    color: "#fff7ed",
    border: "#f97316",
    medicines: [
      { name: "راسيكادوتريل (NOBAC للأطفال)", note: "إسهال — من عمر 3 أشهر. دائماً مع إعادة الترطيب" },
      { name: "ديوسمكتيت (SMECTA)", note: "إسهال — رضيع وطفل. كيس واحد/الرضاعة" },
      { name: "لاكتولوز (ISOLACT)", note: "إمساك — لطيف، يمكن استخدامه منذ الولادة" },
    ],
    warning: "إعادة الترطيب عن طريق الفم لها الأولوية القصوى دائماً في حالة الإسهال",
  },
  result_pediatrie_vitamines_ar: {
    result: true,
    title: "فيتامينات / مكملات — طفل",
    icon: "👶",
    color: "#fff7ed",
    border: "#f97316",
    medicines: [
      { name: "فيتامين د3 (D-THREE 200K)", note: "الوقاية من الكساح — أمبولة واحدة كل 3 أشهر" },
      { name: "فيتامينات متعددة للأطفال (MULTIVITAMINE KIDS، SOLYNE C TONUS)", note: "تكملة شاملة" },
      { name: "حديد (OROFER PLUS)", note: "فقر الدم بنقص الحديد عند الأطفال" },
    ],
    warning: "فيتامين د: يفضل فحص الدم قبل التكملة بجرعة عالية",
  },
  // GYNECO RESULTS AR
  result_pilule_combinee_ar: {
    result: true,
    title: "منع الحمل — حبوب مركبة",
    icon: "🌸",
    color: "#fdf2f8",
    border: "#db2777",
    medicines: [
      { name: "ديزوجيستريل + إيثينيل إستراديول (MARVELON)", note: "حبوب مركبة كلاسيكية — 21 يوم + 7 أيام توقف" },
    ],
    warning: "ممنوع: التدخين بعد 35 سنة، تاريخ جلطات، الصداع النصفي مع أورة. يؤخذ في وقت ثابت",
  },
  result_pilule_progest_ar: {
    result: true,
    title: "منع الحمل — حبوب بروجستيرون (ميني بيل)",
    icon: "🌸",
    color: "#fdf2f8",
    border: "#db2777",
    medicines: [
      { name: "ديزوجيستريل (DESONETTE)", note: "ميني بيل — بشكل مستمر بدون توقف. هامش التأخير 12 ساعة كحد أقصى" },
    ],
    warning: "متوافق مع الرضاعة. يؤخذ في وقت ثابت (هامش 12 ساعة فقط)",
  },
  result_pilule_acne_ar: {
    result: true,
    title: "منع الحمل + علاج حب الشباب / الشعرانية",
    icon: "🌸",
    color: "#fdf2f8",
    border: "#db2777",
    medicines: [
      { name: "أسيتات سيبروتيرون + إيثينيل إستراديول (DIANE 35)", note: "حب الشباب الشديد + منع الحمل. لا يستخدم كمانع حمل فقط" },
    ],
    warning: "خطر الجلطات أعلى من الحبوب الكلاسيكية. الخطر أكبر عند المدخنة",
  },
  result_grossesse_suppl_ar: {
    result: true,
    title: "مكملات الحمل",
    icon: "🌸",
    color: "#fdf2f8",
    border: "#db2777",
    medicines: [
      { name: "حمض الفوليك (ZANITRA 5mg)", note: "شهر قبل الحمل وحتى نهاية الثلث الأول — إلزامي" },
      { name: "حديد + حمض الفوليك (FERRO SANOL GYN)", note: "فقر الدم بنقص الحديد في الحمل" },
      { name: "فيتامينات متعددة للحمل (PHI GROSSESSE)", note: "تكملة شاملة للحمل" },
    ],
    warning: "حمض الفوليك: يبدأ قبل الحمل لمنع تشوهات الأنبوب العصبي",
  },
  result_cycle_ar: {
    result: true,
    title: "اضطرابات الدورة الشهرية / البروجستيرون",
    icon: "🌸",
    color: "#fdf2f8",
    border: "#db2777",
    medicines: [
      { name: "بروجستيرون (UTROGESTAN)", note: "نقص البروجستيرون — يؤخذ مساءً" },
      { name: "ديدروجيستيرون (DUPHASTON 10mg)", note: "اضطرابات الدورة، الانتباذ البطاني، دعم الحمل" },
      { name: "بروجستيرون جل (PROGESTOGEL 1%)", note: "آلام الثدي — يطبق موضعياً على الثديين" },
    ],
    warning: "UTROGESTAN قد يسبب النعاس — يؤخذ مساءً عند النوم",
  },
  result_menopause_ar: {
    result: true,
    title: "انقطاع الطمث / جفاف مهبلي",
    icon: "🌸",
    color: "#fdf2f8",
    border: "#db2777",
    medicines: [
      { name: "بروميستريين (COLPOVITAL 10mg)", note: "كبسولة مهبلية — جفاف مهبلي، تقرحات. واحدة/يوم عند النوم" },
    ],
    warning: "ممنوع تماماً في حالة تاريخ سرطان الثدي أو الرحم المعتمد على الهرمونات",
  },
  result_vaginite_ar: {
    result: true,
    title: "عدوى مهبلية",
    icon: "🌸",
    color: "#fdf2f8",
    border: "#db2777",
    medicines: [
      { name: "نيومايسين + بوليميكسين + نيستاتين (POLYGYNAX)", note: "التهاب مهبلي بكتيري و/أو فطري — كبسولة واحدة/يوم عند النوم لمدة 12 يوماً" },
      { name: "سيرتاكونازول (GYNODERMOFIX)", note: "داء المبيضات المهبلي" },
      { name: "فلوكونازول (VIRCET 150mg)", note: "داء المبيضات المهبلي — جرعة فموية واحدة" },
      { name: "ميترونيدازول (FLAZOL)", note: "التهاب المهبل البكتيري — داء المشعرات" },
    ],
    warning: "تجنب العلاقة الزوجية والاستحمام أثناء العلاج الموضعي",
  },
  result_fertilite_ar: {
    result: true,
    title: "الخصوبة",
    icon: "🌸",
    color: "#fdf2f8",
    border: "#db2777",
    medicines: [
      { name: "ميو-إينوزيتول (OVAPURE)", note: "متلازمة تكيس المبايض — يحسّن حساسية الإنسولين والتبويض" },
      { name: "كابيرغولين (CABERNEX)", note: "فرط البرولاكتين — يعيد التبويض" },
      { name: "حمض الفوليك (ZANITRA 5mg)", note: "تكملة إلزامية قبل الحمل" },
    ],
    warning: "أي مشكلة في الخصوبة تتطلب فحصاً طبياً كاملاً قبل العلاج",
  },
// DERMATO RESULTS AR
  result_acne_legere_ar: {
    result: true,
    title: "حب الشباب الخفيف إلى المتوسط",
    icon: "🔵",
    color: "#eff6ff",
    border: "#2563eb",
    medicines: [
      { name: "أدابالين 0.1% (ADAPALENE 0.1% كريم)", note: "ريتينويد موضعي — تطبيق واحد/مساءً. النتائج بعد 8 إلى 12 أسبوعاً" },
      { name: "بيروكسيد البنزويل 2.5% (CUTACNYL 2.5%)", note: "مضاد بكتيري موضعي — البدء 3 مرات/أسبوع" },
    ],
    warning: "أدابالين: الحماية من الشمس إلزامية نهاراً. ممنوع تماماً أثناء الحمل",
  },
  result_acne_severe_ar: {
    result: true,
    title: "حب الشباب الشديد (عقدي / معند)",
    icon: "🔵",
    color: "#eff6ff",
    border: "#2563eb",
    medicines: [
      { name: "إيزوتريتينوين (CURACNE 20mg)", note: "مخصص لحالات حب الشباب الشديدة المعندة — وصفة طبيب الجلدية إلزامية" },
      { name: "بيروكسيد البنزويل 5% (CUTACNYL 5%)", note: "تركيز أقوى لحب الشباب المتوسط إلى الشديد" },
      { name: "DIANE 35 (عند المرأة)", note: "حب الشباب الهرموني الشديد + منع الحمل" },
    ],
    warning: "إيزوتريتينوين: منع الحمل إلزامي عند المرأة. فحص دم شهري",
  },
  result_eczema_leger_ar: {
    result: true,
    title: "إكزيما خفيفة — مرطبات",
    icon: "🔵",
    color: "#eff6ff",
    border: "#2563eb",
    medicines: [
      { name: "ديكسبانثينول (POLYDERMYL كريم)", note: "مرطب مُعيد للشفاء — احمرار حفاضات، جلد متهيج، منذ الولادة" },
      { name: "غليسيرول + بارافين (DEXERYL كريم)", note: "مرطب مكثف — إكزيما تأتبية، جلد جاف جداً" },
    ],
    warning: "يُطبق بعد الاستحمام على جلد رطب لتعظيم الترطيب",
  },
  result_eczema_severe_ar: {
    result: true,
    title: "إكزيما متوسطة إلى شديدة — كورتيكوستيرويدات موضعية",
    icon: "🔵",
    color: "#eff6ff",
    border: "#2563eb",
    medicines: [
      { name: "هيدروكورتيزون بوتيرات (LOCOID 1%)", note: "قوة متوسطة — يمكن استخدامه على الوجه تحت إشراف طبي" },
      { name: "بيتاميثازون (BETASONE 0.1%)", note: "قوة عالية — تجنب الوجه. الحد الأقصى 4 أسابيع" },
      { name: "كلوبيتازول (CLOTASOL 0.05%)", note: "قوة عالية جداً — الصدفية السميكة. الحد الأقصى 50غ/أسبوع" },
    ],
    warning: "يُطبق بطبقة رقيقة. لا يستخدم على الوجه لفترات طويلة. التوقف يكون تدريجياً",
  },
  result_psoriasis_ar: {
    result: true,
    title: "الصدفية",
    icon: "🔵",
    color: "#eff6ff",
    border: "#2563eb",
    medicines: [
      { name: "كلوبيتازول + حمض الساليسيليك (BETACYL مرهم)", note: "صدفية متقشرة سميكة — يزيل القشور" },
      { name: "كلوبيتازول (CLOTASOL 0.05%)", note: "كورتيكوستيرويد قوي جداً — النوبات الشديدة" },
    ],
    warning: "لا يستخدم أبداً على الوجه. الحد الأقصى 4 أسابيع. التوقف التدريجي إلزامي",
  },
  result_hydratation_ar: {
    result: true,
    title: "جفاف الجلد — الترطيب",
    icon: "🔵",
    color: "#eff6ff",
    border: "#2563eb",
    medicines: [
      { name: "ديكسبانثينول (POLYDERMYL)", note: "مرطب مُعيد للشفاء — لجميع أنواع البشرة، منذ الولادة" },
      { name: "كريم ديكسيريل (DEXERYL)", note: "مرطب مكثف — جلد جاف جداً وإكزيما تأتبية" },
    ],
    warning: "يُطبق يومياً بعد الاستحمام على جلد رطب قليلاً",
  },
  result_gale_ar: {
    result: true,
    title: "الجرب / طفيليات جلدية",
    icon: "🔵",
    color: "#eff6ff",
    border: "#2563eb",
    medicines: [
      { name: "كروتاميتون 10% (E-RAX 10%)", note: "مضاد طفيليات — يُطبق على الجسم كله (إلا الوجه) 24 ساعة ثم يُغسل. يُكرر بعد 24 ساعة" },
    ],
    warning: "علاج جميع أفراد المنزل في نفس الوقت. غسل الملابس والأغطية بدرجة 60°",
  },
  // OPHTALMO RESULTS AR
  result_conjonctivite_ar: {
    result: true,
    title: "التهاب الملتحمة البكتيري",
    icon: "👁️",
    color: "#f0fdf4",
    border: "#16a34a",
    medicines: [
      { name: "أزيثروميسين (AZYTER 15mg/g)", note: "قطرتان/يوم لمدة 3 أيام — علاج قصير" },
      { name: "حمض الفوسيديك (FUCIDINE 1% قطرة)", note: "قطرتان/يوم لمدة 7 أيام" },
      { name: "هيكساميدين (DESOMÉDINE 0.1%)", note: "مطهر للعين — 4 إلى 6 قطرات/يوم" },
    ],
    warning: "اغسل يديك. لا تلمس العين بالقطارة. أزل العدسات اللاصقة أثناء العلاج",
  },
  result_conjonctivite_allergie_ar: {
    result: true,
    title: "التهاب الملتحمة التحسسي",
    icon: "👁️",
    color: "#f0fdf4",
    border: "#16a34a",
    medicines: [
      { name: "كيتوتيفين (ZALERG 0.25mg/ml)", note: "مضاد هيستامين للعين — مرتين/يوم" },
      { name: "أولوباتادين (OPTICIS 1mg/ml)", note: "مضاد هيستامين ومثبت لخلايا الماستوسيت — مرتين/يوم" },
      { name: "ناجا (NAABAK 4.9g/100ml)", note: "قطرة مضادة للحساسية — يمكن استخدامها وقائياً" },
    ],
    warning: "انتظر 15 إلى 30 دقيقة قبل إعادة وضع العدسات اللاصقة",
  },
  result_secheresse_oculaire_ar: {
    result: true,
    title: "جفاف العين",
    icon: "👁️",
    color: "#f0fdf4",
    border: "#16a34a",
    medicines: [
      { name: "حمض الهيالورونيك (AQUALARM INTENSIVE UD)", note: "دموع صناعية — جرعة فردية، تُرمى بعد الاستخدام" },
      { name: "هيبروميلوز (ARTELAC 3.2mg/ml)", note: "دموع صناعية كلاسيكية — عدة مرات/يوم حسب الحاجة" },
      { name: "بوفيدون (FLUIDABAK 1.5%)", note: "دموع صناعية — جفاف متوسط" },
      { name: "كاربومير (LIPOSIC 0.2% جل)", note: "جل دموع صناعية — جفاف شديد، يفضل عند النوم" },
    ],
    warning: "متوافقة مع العدسات اللاصقة إذا كانت بدون مواد حافظة",
  },
  result_glaucome_ar: {
    result: true,
    title: "الزرق / ارتفاع ضغط العين",
    icon: "👁️",
    color: "#f0fdf4",
    border: "#16a34a",
    medicines: [
      { name: "تيمولول جل (GELTIM LP 1mg/g)", note: "حاصر بيتا للعين — قطرة واحدة/يوم صباحاً" },
      { name: "دورزولاميد (COZOLAMIDE)", note: "مثبط الأنهيدراز الكربوني — 3 مرات/يوم" },
      { name: "دورزولاميد + تيمولول (TIMOLAMID)", note: "مزيج ثابت — مرتين/يوم" },
      { name: "كارتيولول (CARTÉOL L.P. 2%)", note: "حاصر بيتا — مرة أو مرتين/يوم حسب الشكل" },
    ],
    warning: "تيمولول: ممنوع تماماً في حالة الربو أو COPD. اضغط على الزاوية الداخلية للعين بعد القطرة",
  },
  result_inflam_oculaire_ar: {
    result: true,
    title: "التهاب العين بعد العملية",
    icon: "👁️",
    color: "#f0fdf4",
    border: "#16a34a",
    medicines: [
      { name: "ديكساميثازون (OPADEX قطرة)", note: "كورتيكوستيرويد للعين — التهاب بعد الجراحة" },
      { name: "بريدنيزولون أسيتات (OPTIPRED 10mg/ml)", note: "كورتيكوستيرويد للعين — التهاب العنبية، التهاب القرنية" },
      { name: "إندوميتاسين (INDOCOLLYRE 0.1%)", note: "مضاد التهاب للعين — الوقاية من الالتهاب بعد جراحة الساد" },
      { name: "توبراميسين + ديكساميثازون (TOBRADEX Cool Gel)", note: "مضاد حيوي + كورتيزون — التهاب مع خطر عدوى" },
    ],
    warning: "ممنوع تماماً في حالة عدوى العين. متابعة ضغط العين في حالة العلاج الطويل",
  },
  result_otite_ar: {
    result: true,
    title: "التهاب الأذن الخارجي",
    icon: "👁️",
    color: "#f0fdf4",
    border: "#16a34a",
    medicines: [
      { name: "نيومايسين + بوليميكسين + ديكساميثازون (POLYDEXA قطرات)", note: "3 إلى 5 قطرات 3 إلى 4 مرات/يوم لمدة 7 أيام" },
      { name: "فلوسينولون + نيومايسين (OTOCROVIS قطرات)", note: "بديل — نفس الاستخدام" },
      { name: "كلورتتراسيكلين (CLOMYCINE 1% مرهم)", note: "مضاد حيوي تتراسيكلين للعين — التهاب الملتحمة، التراخوما" },
    ],
    warning: "ممنوع تماماً في حالة ثقب طبلة الأذن. سخّن القطارة بين يديك قبل القطرة",
  },
  // UROLOGIE RESULTS AR
  result_hbp_ar: {
    result: true,
    title: "تضخم البروستاتا الحميد",
    icon: "🚽",
    color: "#f5f3ff",
    border: "#7c3aed",
    medicines: [
      { name: "تامسولوسين (TAMSUMED 0.4mg)", note: "حاصر ألفا — يحسّن تدفق البول بسرعة" },
      { name: "ألفوزوسين (PROSTAX 10mg LP)", note: "حاصر ألفا — جرعة واحدة/يوم بعد الأكل" },
      { name: "فيناستيريد (PROSTAMED 5mg)", note: "مثبط 5-ألفا ريدوكتاز — يقلل حجم البروستاتا. النتائج بعد 6 أشهر" },
    ],
    warning: "أخبر طبيب العيون قبل جراحة العين (متلازمة القزحية المرتخية). فيناستيريد: أخبر الطبيب عند فحص PSA",
  },
  result_incontinence_ar: {
    result: true,
    title: "المثانة فرطة النشاط / سلس البول",
    icon: "🚽",
    color: "#f5f3ff",
    border: "#7c3aed",
    medicines: [
      { name: "أوكسيبوتينين (OXYPTANE BR 5mg)", note: "مضاد كولين — 5mg مرتين إلى 3 مرات/يوم. جفاف الفم متكرر" },
    ],
    warning: "ممنوع تماماً في حالة الزرق بزاوية مغلقة أو احتباس البول",
  },
    result_hta_cholesterol_ar: {
    result: true,
    title: "ارتفاع ضغط الدم مع ارتفاع الكوليسترول",
    icon: "❤️",
    color: "#fee2e2",
    border: "#ef4444",
    medicines: [
      { name: "روزوفاستاتين (NOVAROL، CRESTATINE، CRESOVAST، SUPERSTAT)", note: "ستاتين — يخفض LDL. يؤخذ مساءً" },
      { name: "سارتان أو IEC حسب الحالة (APROVEL، EXVAL، EXTEL، COVERSYL)", note: "علاج ارتفاع ضغط الدم المصاحب" },
      { name: "أسبرين بجرعة منخفضة (ASPEC، ASPIRINE CARDIO)", note: "للوقاية إذا كان الخطر القلبي الوعائي مرتفعاً، بوصفة طبية" },
    ],
    warning: "ستاتين: أبلغ عن أي ألم عضلي. فحص الدهون والكبد بشكل دوري",
  },
  result_vit_d_ar: {
    result: true,
    title: "نقص فيتامين د",
    icon: "🍊",
    color: "#fffbeb",
    border: "#d97706",
    medicines: [
      { name: "كوليكالسيفيرول (D-THREE 200000 UI/ml، فيتامين د3 رازيس)", note: "أمبولة كل 3 إلى 6 أشهر حسب فحص الدم" },
      { name: "كالسيفيديول (DEDROGYL)", note: "الشكل النشط — مفيد في حالة قصور الكبد" },
    ],
    warning: "يُفضّل فحص الدم قبل التكملة بجرعة عالية",
  },
  result_vit_b12_ar: {
    result: true,
    title: "نقص فيتامين ب12",
    icon: "🍊",
    color: "#fffbeb",
    border: "#d97706",
    medicines: [
      { name: "سيانوكوبالامين (COBAVIT، فيتامين ب12 رازيس)", note: "حقن عضلي أو عن طريق الفم حسب الشدة" },
      { name: "مركب ب1+ب6+ب12 (NEUROVIT)", note: "اعتلال الأعصاب، التهاب الأعصاب المتعدد" },
    ],
    warning: "تلون البول بالوردي/البرتقالي بعد الحقن أمر طبيعي",
  },
  result_vit_folique_ar: {
    result: true,
    title: "حمض الفوليك (فيتامين ب9)",
    icon: "🍊",
    color: "#fffbeb",
    border: "#d97706",
    medicines: [
      { name: "حمض الفوليك (ZANITRA 5mg)", note: "الوقاية من التشوهات أثناء الحمل أو نقص الفولات" },
      { name: "حديد + حمض الفوليك (FERRO SANOL GYN)", note: "فقر الدم بنقص الحديد أثناء الحمل" },
    ],
    warning: "يبدأ قبل الحمل للوقاية من تشوهات الأنبوب العصبي",
  },
  result_vit_fer_ar: {
    result: true,
    title: "فقر الدم بنقص الحديد",
    icon: "🍊",
    color: "#fffbeb",
    border: "#d97706",
    medicines: [
      { name: "حديد + حمض الفوليك (FERRO SANOL GYN)", note: "كبسولة واحدة/يوم على معدة فارغة أو مع عصير البرتقال" },
    ],
    warning: "البراز الأسود أمر طبيعي. يُفصل بساعتين عن منتجات الألبان ومضادات الحموضة",
  },
  result_vit_calcium_ar: {
    result: true,
    title: "الكالسيوم / صحة العظام",
    icon: "🍊",
    color: "#fffbeb",
    border: "#d97706",
    medicines: [
      { name: "كالسيوم + فيتامين د3 (IDEOS)", note: "1 إلى 2 قرص/يوم يُمص أو يُمضغ" },
      { name: "حمض الأليندرونيك (ENDRONAX)", note: "هشاشة العظام — 70mg/أسبوع على معدة فارغة، الوقوف 30 دقيقة" },
    ],
    warning: "ENDRONAX: يجب اتباع تعليمات الاستخدام بدقة لتجنب تقرح المريء",
  },
  result_vit_multi_ar: {
    result: true,
    title: "فيتامينات متعددة عامة",
    icon: "🍊",
    color: "#fffbeb",
    border: "#d97706",
    medicines: [
      { name: "فيتامينات متعددة (NEUROVIT، IDEOS حسب الحاجة)", note: "تكملة شاملة حسب حالة المريض" },
    ],
    warning: "يُعدّل حسب العمر والحمل والنقص المحدد المُشخّص",
  },
};

const CATEGORY_COLORS = {
  cardio: { bg: "#fee2e2", border: "#ef4444", text: "#991b1b" },
  respi: { bg: "#dbeafe", border: "#3b82f6", text: "#1e40af" },
  gastro: { bg: "#d1fae5", border: "#10b981", text: "#065f46" },
  douleur: { bg: "#fef9c3", border: "#eab308", text: "#713f12" },
  neuro: { bg: "#ede9fe", border: "#7c3aed", text: "#4c1d95" },
  infectieux: { bg: "#fce7f3", border: "#ec4899", text: "#831843" },
  diabete: { bg: "#ecfdf5", border: "#059669", text: "#064e3b" },
  pediatrie: { bg: "#fff7ed", border: "#f97316", text: "#7c2d12" },
  gyneco: { bg: "#fdf2f8", border: "#db2777", text: "#831843" },
  dermato: { bg: "#eff6ff", border: "#2563eb", text: "#1e3a8a" },
  ophtalmo: { bg: "#f0fdf4", border: "#16a34a", text: "#14532d" },
  urologie: { bg: "#f5f3ff", border: "#7c3aed", text: "#4c1d95" },
};

export default function DecisionTree() {
  const [history, setHistory] = useState(["start"]);
  const [currentKey, setCurrentKey] = useState("start");
  const [lang, setLang] = useState("fr");
  const t = TRANSLATIONS[lang];
  const isRtl = lang === "ar";

  const handleLangSwitch = (newLang) => {
    setLang(newLang);
    setHistory(["start"]);
    setCurrentKey("start");
  };

  const activeTree = lang === "ar" ? { ...TREE, ...TREE_AR } : TREE;
  const current = activeTree[currentKey];
  const canGoBack = history.length > 1;

  const handleOption = (nextKey) => {
    setHistory([...history, nextKey]);
    setCurrentKey(nextKey);
  };

  const handleBack = () => {
    if (history.length <= 1) return;
    const newHistory = history.slice(0, -1);
    setHistory(newHistory);
    setCurrentKey(newHistory[newHistory.length - 1]);
  };

  const handleReset = () => {
    setHistory(["start"]);
    setCurrentKey("start");
  };

  const getCategoryColor = () => {
    const cat = history.find((k) => CATEGORY_COLORS[k]);
    return cat ? CATEGORY_COLORS[cat] : { bg: "#f8fafc", border: "#94a3b8", text: "#334155" };
  };

  const color = getCategoryColor();

  return (
    <div style={{ minHeight: "100vh", background: "#f1f5f9", fontFamily: "'Segoe UI', sans-serif" }} dir={isRtl ? "rtl" : "ltr"}>
      {/* Header */}
      <div style={{ background: "white", borderBottom: "2px solid #e2e8f0", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 28 }}>🏥</span>
          <div>
            <div style={{ fontSize: 20, fontWeight: 800, color: "#1e293b" }}>{t.title}</div>
            <div style={{ fontSize: 12, color: "#64748b" }}>{t.subtitle}</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <div style={{ display: "flex", borderRadius: 10, overflow: "hidden", border: "2px solid #e2e8f0" }}>
            {["fr", "ar"].map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                style={{
                  padding: "7px 14px", border: "none", cursor: "pointer", fontWeight: 700, fontSize: 13,
                  background: lang === l ? "#1e293b" : "white",
                  color: lang === l ? "white" : "#64748b",
                }}
              >
                {l === "fr" ? "FR" : "عربية"}
              </button>
            ))}
          </div>
          <button onClick={handleReset} style={{ background: "#1e293b", color: "white", border: "none", borderRadius: 10, padding: "8px 18px", cursor: "pointer", fontWeight: 600, fontSize: 13 }}>
            {t.restart}
          </button>
        </div>
      </div>

      {/* Breadcrumb */}
      <div style={{ padding: "12px 24px", display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
        {history.map((key, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {i > 0 && <span style={{ color: "#94a3b8", fontSize: 14 }}>›</span>}
            <span style={{
              fontSize: 12, padding: "3px 10px", borderRadius: 20,
              background: i === history.length - 1 ? color.border : "#e2e8f0",
              color: i === history.length - 1 ? "white" : "#64748b",
              fontWeight: i === history.length - 1 ? 700 : 400
            }}>
              {TREE[key]?.icon || "🏥"} {key === "start" ? t.start : key.replace(/_/g, " ")}
            </span>
          </div>
        ))}
      </div>

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px 48px" }}>

        {/* Result card */}
        {current?.result ? (
          <div style={{ background: "white", borderRadius: 20, overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.08)", border: `2px solid ${current.border}` }}>
            <div style={{ background: current.color, padding: "24px 28px", borderBottom: `2px solid ${current.border}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                <span style={{ fontSize: 32 }}>{current.icon}</span>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: current.border, marginBottom: 2 }}>{t.recommendation}</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: "#1e293b" }}>{current.title}</div>
                </div>
              </div>
            </div>

            <div style={{ padding: "24px 28px" }}>
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, color: "#64748b", marginBottom: 12 }}>{t.medicines}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {current.medicines.map((med, i) => (
                    <div key={i} style={{ background: "#f8fafc", borderRadius: 12, padding: "14px 16px", border: "1px solid #e2e8f0", borderLeft: `4px solid ${current.border}` }}>
                      <div style={{ fontWeight: 700, color: "#1e293b", fontSize: 15 }}>{med.name}</div>
                      <div style={{ color: "#64748b", fontSize: 13, marginTop: 4 }}>{med.note}</div>
                      {med.alternatives && med.alternatives.length > 0 && (
                        <div style={{ marginTop: 8, display: "flex", flexWrap: "wrap", gap: 6 }}>
                          <span style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600, alignSelf: "center" }}>
                            {isRtl ? "متوفر أيضاً:" : "Aussi disponible:"}
                          </span>
                          {med.alternatives.map((alt, j) => (
                            <span key={j} style={{
                              background: "white", border: `1px solid ${current.border}`,
                              color: current.border, borderRadius: 20, padding: "2px 10px",
                              fontSize: 11, fontWeight: 600
                            }}>{alt}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {current.warning && (
                <div style={{ background: "#fffbeb", border: "1px solid #fbbf24", borderRadius: 12, padding: "12px 16px", display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 18, flexShrink: 0 }}>⚠️</span>
                  <div style={{ fontSize: 13, color: "#92400e", fontWeight: 500 }}>{current.warning}</div>
                </div>
              )}

              <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
                {canGoBack && (
                  <button onClick={handleBack} style={{ flex: 1, background: "#f1f5f9", color: "#475569", border: "none", borderRadius: 12, padding: "12px", cursor: "pointer", fontWeight: 600, fontSize: 14 }}>
                    {t.back}
                  </button>
                )}
                <button onClick={handleReset} style={{ flex: 1, background: current.border, color: "white", border: "none", borderRadius: 12, padding: "12px", cursor: "pointer", fontWeight: 700, fontSize: 14 }}>
                  {t.newConsult}
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Question card */
          <div style={{ background: "white", borderRadius: 20, overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.08)", border: `2px solid ${color.border}` }}>
            <div style={{ background: color.bg, padding: "24px 28px", borderBottom: `1px solid ${color.border}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 36 }}>{current?.icon || "🏥"}</span>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: color.border, marginBottom: 4 }}>
                    {t.step} {history.length} {t.on} {history.length}
                  </div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: "#1e293b" }}>{current?.question}</div>
                </div>
              </div>
            </div>

            <div style={{ padding: "20px 28px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {current?.options?.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleOption(opt.next)}
                    style={{
                      background: "#f8fafc", border: `2px solid #e2e8f0`, borderRadius: 14,
                      padding: "14px 18px", cursor: "pointer", textAlign: "left",
                      fontSize: 15, fontWeight: 600, color: "#1e293b",
                      transition: "all 0.15s", display: "flex", alignItems: "center", justifyContent: "space-between"
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = color.border; e.currentTarget.style.background = color.bg; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.background = "#f8fafc"; }}
                  >
                    <span>{opt.label}</span>
                    <span style={{ color: color.border, fontSize: 18 }}>›</span>
                  </button>
                ))}
              </div>

              {canGoBack && (
                <button onClick={handleBack} style={{ marginTop: 16, width: "100%", background: "#f1f5f9", color: "#475569", border: "none", borderRadius: 12, padding: "12px", cursor: "pointer", fontWeight: 600, fontSize: 14 }}>
                {t.prevStep}
              </button>
              )}
            </div>
          </div>
        )}

        {/* Stats bar at start */}
        {currentKey === "start" && (
          <div style={{ marginTop: 24, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
            {[
            { label: t.categories, value: "12", icon: "📂" },
            { label: t.pathologies, value: "50+", icon: "🏥" },
            { label: t.medicinesRef, value: "100+", icon: "💊" },
            ].map((stat, i) => (
              <div key={i} style={{ background: "white", borderRadius: 14, padding: "16px", textAlign: "center", border: "1px solid #e2e8f0", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
                <div style={{ fontSize: 24 }}>{stat.icon}</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: "#1e293b", marginTop: 4 }}>{stat.value}</div>
                <div style={{ fontSize: 12, color: "#64748b" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}