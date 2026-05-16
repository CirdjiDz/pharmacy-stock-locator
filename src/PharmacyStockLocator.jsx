import React, { useState } from 'react';

export default function PharmacyStockLocator() {
  const meds = [
    { name: 'Exval', shelf: 'F1', category: 'CARDIO' },
    { name: 'Extel', shelf: 'F1', category: 'CARDIO' },
    { name: 'Rumava', shelf: 'F1', category: 'Immunologie' },
    { name: 'ZANIDIP', shelf: 'F1', category: 'CARDIO' },
    { name: 'Aprovasc', shelf: 'F1', category: 'CARDIO' },
    { name: 'COTAREC', shelf: 'F1', category: 'CARDIO' },
    { name: 'VASTAREL', shelf: 'F1', category: 'CARDIO' },
    { name: 'Monotildiem', shelf: 'F1', category: 'CARDIO' },
    { name: 'TELMISARTE +', shelf: 'F1', category: 'CARDIO' },
    { name: 'NOVAROL', shelf: 'F1', category: 'CARDIO' },
    { name: 'ASPIRINE Cardio', shelf: 'F1', category: 'CARDIO' },
    { name: 'Exirb', shelf: 'F1', category: 'CARDIO' },
    { name: 'CRESTATINE', shelf: 'F1', category: 'CARDIO' },
    { name: 'Superstat', shelf: 'F1', category: 'CARDIO' },
    { name: 'Cresovast', shelf: 'F1', category: 'CARDIO' },
    { name: 'Flecalur', shelf: 'F1', category: 'CARDIO' },
    { name: 'COVERAM', shelf: 'F1', category: 'CARDIO' },
    { name: 'Bipreterax', shelf: 'F1', category: 'CARDIO' },
    { name: 'BIPROTENS', shelf: 'F1', category: 'CARDIO' },
    { name: 'COVERSYL', shelf: 'F1', category: 'CARDIO' },
    { name: 'TRIATEC', shelf: 'F1', category: 'CARDIO' },
    { name: 'CO-APROVEL', shelf: 'F1', category: 'CARDIO' },
    { name: 'APROVEL', shelf: 'F1', category: 'CARDIO' },
    { name: 'CO-IRBEK', shelf: 'F1', category: 'CARDIO' },
    { name: 'BYZOLEX', shelf: 'F1', category: 'CARDIO' },
    { name: 'Biopress', shelf: 'F1', category: 'CARDIO' },
    { name: 'Atacand', shelf: 'F1', category: 'CARDIO' },
    { name: 'HYTACAND', shelf: 'F1', category: 'CARDIO' },
    { name: 'Biopress Plus', shelf: 'F1', category: 'CARDIO' },
    { name: 'CO-ATABEK', shelf: 'F1', category: 'CARDIO' },
    { name: 'SPIRONOLONE', shelf: 'F1', category: 'CARDIO' },
    { name: 'Biprostene', shelf: 'F1', category: 'CARDIO' },
    { name: 'Sarsand', shelf: 'F1', category: 'CARDIO' },
    { name: 'PLAFIX', shelf: 'F1', category: 'CARDIO' },
    { name: 'FLUDEX LP', shelf: 'F1', category: 'CARDIO' },
    { name: 'ADEX LP', shelf: 'F1', category: 'CARDIO' },
    { name: 'Nafronyl', shelf: 'F1', category: 'CARDIO' },
    { name: 'AMLOR', shelf: 'F1', category: 'CARDIO' },
    { name: 'EXFORGE', shelf: 'F1', category: 'CARDIO' },  
    { name: 'Montelair 10 mg', shelf: 'F2', category: 'Respiratoire' },
    { name: 'Symbicort Turbuhaler', shelf: 'F2', category: 'Respiratoire' },
    { name: 'Flixotide', shelf: 'F2', category: 'Respiratoire' },
    { name: 'Flucasone mini', shelf: 'F2', category: 'Respiratoire' },
    { name: 'Rinonide', shelf: 'F2', category: 'Respiratoire' },
    { name: 'Budecort 200', shelf: 'F2', category: 'Respiratoire' },
    { name: 'Cozolamide', shelf: 'F2', category: 'Ophtalmologie / ORL' },
    { name: 'Dexamethasone GL', shelf: 'F2', category: 'Ophtalmologie / ORL' },
    { name: 'Lomac 20 mg', shelf: 'F2', category: 'GASTRO' },
    { name: 'Zimor 20', shelf: 'F2', category: 'GASTRO' },
    { name: 'Antag 20 mg', shelf: 'F2', category: 'GASTRO' },
    { name: 'Proton 20 mg', shelf: 'F2', category: 'GASTRO' },
    { name: 'FAMOTIDINE MABO', shelf: 'F2', category: 'GASTRO' },
    { name: 'Dompérone 10 mg', shelf: 'F2', category: 'GASTRO' },
    { name: 'LISINOX 20 mg', shelf: 'F2', category: 'GASTRO' },
    { name: 'Omeprotect 20 mg', shelf: 'F2', category: 'GASTRO' },
    { name: 'Debridat', shelf: 'F2', category: 'GASTRO' },
    { name: 'Trimébutine Biocare', shelf: 'F2', category: 'GASTRO' },
    { name: 'Ponctuel', shelf: 'F2', category: 'GASTRO' },
    { name: 'Mébévérine BEKER LP', shelf: 'F2', category: 'GASTRO' },
    { name: 'DUSPATALIN 200 mg', shelf: 'F2', category: 'GASTRO' },
    { name: 'Duspaverine 100 mg', shelf: 'F2', category: 'GASTRO' },
    { name: 'Meteospasmyl', shelf: 'F2', category: 'GASTRO' },
    { name: 'Glycerine LS', shelf: 'F2', category: 'GASTRO' },
    { name: 'Riabal 30 mg', shelf: 'F2', category: 'GASTRO' },
    { name: 'Freegas', shelf: 'F2', category: 'GASTRO' },
    { name: 'Bilaxten 20 mg', shelf: 'F2', category: 'Respiratoire' },
    { name: 'Gatimox', shelf: 'F2', category: 'Anti-infectieux (Antibiotic)' },
    { name: 'Lowgas', shelf: 'F2', category: 'GASTRO' },
    { name: 'Dimépra 2 mg', shelf: 'F2', category: 'GASTRO' },
    { name: 'Dysentyl', shelf: 'F2', category: 'GASTRO' },
    { name: 'Airditine', shelf: 'F2', category: 'Respiratoire' },
    { name: 'Isolact', shelf: 'F2', category: 'GASTRO' },
    { name: 'Nobac', shelf: 'F2', category: 'GASTRO' },
    { name: 'Smecta', shelf: 'F2', category: 'GASTRO' },
    { name: 'Flazol 125 mg', shelf: 'F2', category: 'Anti-infectieux (Antibiotic)' },
    { name: 'Bedelix', shelf: 'F2', category: 'GASTRO' },
    { name: 'Diamicron 30 mg', shelf: 'F3', category: 'Endocrinologie et Diabète' },
    { name: 'Levothyrox 100 µg', shelf: 'F3', category: 'Endocrinologie et Diabète' },
    { name: 'Levothyrox 25 µg', shelf: 'F3', category: 'Endocrinologie et Diabète' },
    { name: 'Athyrozol 5 mg', shelf: 'F3', category: 'Endocrinologie et Diabète' },
    { name: 'Minirinmelt 60 µg', shelf: 'F3', category: 'Endocrinologie et Diabète' },
    { name: 'Levothyrox 50 µg', shelf: 'F3', category: 'Endocrinologie et Diabète' },
    { name: 'Diamicron 60 mg', shelf: 'F3', category: 'Endocrinologie et Diabète' },
    { name: 'IRYS 3 mg', shelf: 'F3', category: 'Endocrinologie et Diabète' },
    { name: 'IRYS 4 mg', shelf: 'F3', category: 'Endocrinologie et Diabète' },
    { name: 'IRYS 6 mg', shelf: 'F3', category: 'Endocrinologie et Diabète' },
    { name: 'Glucophage 500 mg', shelf: 'F3', category: 'Endocrinologie et Diabète' },
    { name: 'NOVOFORMINE 500 mg', shelf: 'F3', category: 'Endocrinologie et Diabète' },
    { name: 'Glucophage 1000 mg', shelf: 'F3', category: 'Endocrinologie et Diabète' },
    { name: 'Larimel 50 mg', shelf: 'F3', category: 'Endocrinologie et Diabète' },
    { name: 'Glinix', shelf: 'F3', category: 'Endocrinologie et Diabète' },
    { name: 'Furozal 40 mg', shelf: 'F3', category: 'CARDIO' },
    { name: 'Diaglinide 2 mg', shelf: 'F3', category: 'Endocrinologie et Diabète' },
    { name: 'Glybek 100 mg', shelf: 'F3', category: 'Endocrinologie et Diabète' },
    { name: 'Geltim LP 1 mg/g', shelf: 'F1', category: 'Ophtalmologie / ORL' },
    { name: 'Fluidabak 1.5%', shelf: 'F1', category: 'Ophtalmologie / ORL' },
    { name: 'Cartéol L.P. 2%', shelf: 'F1', category: 'Ophtalmologie / ORL' },
    { name: 'Opticis 1 mg/ml', shelf: 'F1', category: 'Ophtalmologie / ORL' },
    { name: 'Optipred 10 mg/ml', shelf: 'F1', category: 'Ophtalmologie / ORL' },
    { name: 'Clomycine 1%', shelf: 'F1', category: 'Ophtalmologie / ORL' },
    { name: 'Vibac 1.5%', shelf: 'F1', category: 'Ophtalmologie / ORL' },
    { name: 'Dermasone 0.05%', shelf: 'F1', category: 'Dermatologie' },
    { name: 'Opadex', shelf: 'F1', category: 'Ophtalmologie / ORL' },
    { name: 'Optif Jam 1 mg/ml', shelf: 'F1', category: 'Ophtalmologie / ORL' },
    { name: 'Azyter 15 mg/g', shelf: 'F1', category: 'Ophtalmologie / ORL' },
    { name: 'Zalerg 0.25 mg/ml', shelf: 'F1', category: 'Ophtalmologie / ORL' },
    { name: 'Respinhal 0.05%', shelf: 'F2', category: 'Respiratoire' },
    { name: 'Otocrovis Gouttes', shelf: 'F2', category: 'Ophtalmologie / ORL' },
    { name: 'Aqualarm Intensive UD', shelf: 'F2', category: 'Ophtalmologie / ORL' },
    { name: 'Indocollyre 0.1%', shelf: 'F2', category: 'Ophtalmologie / ORL' },
    { name: 'Fucidine 1%', shelf: 'F2', category: 'Ophtalmologie / ORL' },
    { name: 'Désomédine 0.1%', shelf: 'F2', category: 'Ophtalmologie / ORL' },
    { name: 'Timolamid 20 mg/ml + 5 mg/ml', shelf: 'F2', category: 'Ophtalmologie / ORL' },
    { name: 'Artelac 3.20 mg/ml', shelf: 'F2', category: 'Ophtalmologie / ORL' },
    { name: 'Loradine 10 mg', shelf: 'F6', category: 'Respiratoire' },
    { name: 'Co-Dolyc 500 mg/30 mg', shelf: 'F6', category: 'Douleur et Inflammation' },
    { name: 'Xydol 600 mg', shelf: 'F6', category: 'Douleur et Inflammation' },
    { name: 'Thymoseptine Sirop', shelf: 'F6', category: 'Respiratoire' },
    { name: 'Prospan Sirop', shelf: 'F6', category: 'Respiratoire' },
    { name: 'Antalfen 20 mg/ml Sirop', shelf: 'F6', category: 'Douleur et Inflammation' },
    { name: 'Loradess 0.5 mg/ml Sirop', shelf: 'F6', category: 'Respiratoire' },
    { name: 'Bronchocalm Adultes Sirop', shelf: 'F6', category: 'Respiratoire' },
    { name: 'Loradine 0.1% Sirop', shelf: 'F6', category: 'Respiratoire' },
    { name: 'Proxan Kids Sirop', shelf: 'F6', category: 'Pédiatrie' },
    { name: 'Carbodal 5% Sirop', shelf: 'F6', category: 'Respiratoire' },
    { name: 'Liblab Sirop', shelf: 'F6', category: 'Respiratoire' },
    { name: 'Ivylix 0.7g Sirop', shelf: 'F6', category: 'Respiratoire' },
    { name: 'Carbomex 5%', shelf: 'F6', category: 'Respiratoire' },
    { name: 'Gripex 10 mg/4 mg', shelf: 'F6', category: 'Respiratoire' },
    { name: 'Gripex +', shelf: 'F6', category: 'Respiratoire' },
    { name: 'Doliprane 200 mg', shelf: 'F6', category: 'Douleur et Inflammation' },
    { name: 'Doliprane 300 mg', shelf: 'F6', category: 'Douleur et Inflammation' },
    { name: 'Xydol 200 mg/400 mg', shelf: 'F6', category: 'Douleur et Inflammation' },
    { name: 'Ibuprofène Beker 400 mg', shelf: 'F6', category: 'Douleur et Inflammation' },
    { name: 'Antalfen 600 mg', shelf: 'F6', category: 'Douleur et Inflammation' },
    { name: 'Xycare 5 mg', shelf: 'F6', category: 'Respiratoire' },
    { name: 'Dioveine 600 mg', shelf: 'F6', category: 'CARDIO' },
    { name: 'Ebasta 10 mg', shelf: 'F6', category: 'Respiratoire' },
    { name: 'Fradene 20 mg', shelf: 'F6', category: 'Douleur et Inflammation' },
    { name: 'Precortyl 5 mg', shelf: 'F6', category: 'Dermatologie' },
    { name: 'Paramol 1000 mg', shelf: 'F6', category: 'Douleur et Inflammation' },
    { name: 'Clofenal Adultes 100 mg', shelf: 'F6', category: 'Douleur et Inflammation' },
    { name: 'Biofenac LP 100 mg', shelf: 'F6', category: 'Douleur et Inflammation' },
    { name: 'Biofenac 75 mg', shelf: 'F6', category: 'Douleur et Inflammation' },
    { name: 'Biofenac FAST 50 mg', shelf: 'F6', category: 'Douleur et Inflammation' },
    { name: 'Votrex 50 mg', shelf: 'F6', category: 'Douleur et Inflammation' },
    { name: 'Divido 75 mg', shelf: 'F6', category: 'Douleur et Inflammation' },
    { name: 'Camphobiotic Enfants', shelf: 'F6', category: 'Pédiatrie' },
    { name: 'Uroxyb 5 mg', shelf: 'F6', category: 'GASTRO' },
    { name: 'Cebrex 100 mg', shelf: 'F6', category: 'Douleur et Inflammation' },
    { name: 'Flovenac L.P. 75 mg', shelf: 'F6', category: 'Douleur et Inflammation' },
    { name: 'Ketomex 100 mg', shelf: 'F6', category: 'Douleur et Inflammation' },
    { name: 'Gantanil 500 mg', shelf: 'F6', category: 'Neuro / Muscles' },
    { name: 'Celecox 200 mg', shelf: 'F6', category: 'Douleur et Inflammation' },
    { name: 'Coxibrex 200 mg', shelf: 'F6', category: 'Douleur et Inflammation' },
    { name: 'Fexofénadine Beker 120 mg', shelf: 'F6', category: 'Respiratoire' },
    { name: 'Fexofénadine Beker 180 mg', shelf: 'F6', category: 'Respiratoire' },
    { name: 'Telfast 120 mg', shelf: 'F6', category: 'Respiratoire' },
    { name: 'Telfast 180 mg', shelf: 'F6', category: 'Respiratoire' },
    { name: 'Betaserc 24 mg', shelf: 'F6', category: 'Neuro / Muscles' },
    { name: 'Versec 24 mg', shelf: 'F6', category: 'Neuro / Muscles' },
    { name: 'Phanazol 1%', shelf: 'F6', category: 'Anti-infectieux (Antibiotic)' },
    { name: 'Mycocide 15 g', shelf: 'F6', category: 'Anti-infectieux (Antibiotic)' },
    { name: 'Cutacnyl 2.5%', shelf: 'F6', category: 'Dermatologie' },
    { name: 'Cutacnyl 5%', shelf: 'F6', category: 'Dermatologie' },
    { name: 'Betacyl Pommade', shelf: 'F6', category: 'Dermatologie' },
    { name: 'Daktazol 2% Crème', shelf: 'F6', category: 'Anti-infectieux (Antibiotic)' },
    { name: 'Daktazol 2% Pommade', shelf: 'F6', category: 'Anti-infectieux (Antibiotic)' },
    { name: 'Betasone 0.1%', shelf: 'F6', category: 'Dermatologie' },
    { name: 'Clotasol 0.05% 45 g', shelf: 'F6', category: 'Dermatologie' },
    { name: 'Deslor 0.5 mg/ml', shelf: 'F5', category: 'Respiratoire' },
    { name: 'Physiolone 1 mg/ml', shelf: 'F5', category: 'Pédiatrie' },
    { name: 'Predo 15 mg/5 ml', shelf: 'F5', category: 'Pédiatrie' },
    { name: 'Isomag 150 ml', shelf: 'F5', category: 'Vitamines et Compléments' },
    { name: 'Salbulam 2 mg/5 ml', shelf: 'F5', category: 'Respiratoire' },
    { name: 'Carbodal 5%', shelf: 'F5', category: 'Respiratoire' },
    { name: 'Augmentin Enfant 100 mg/12.5 mg/ml', shelf: 'F5', category: 'Anti-infectieux (Antibiotic)' },
    { name: 'Omnipaque 350 mg I/ml', shelf: 'F5', category: 'Ophtalmologie / ORL' },
    { name: 'Gadovist 1.0 mmol/ml', shelf: 'F5', category: 'Ophtalmologie / ORL' },
    { name: 'Etamcynone 250 mg/2 ml', shelf: 'F5', category: 'CARDIO' },
    { name: 'Clamoclav Enfants 100 mg/12.5 mg', shelf: 'F5', category: 'Anti-infectieux (Antibiotic)' },
    { name: 'Meprenal 20 mg/2 ml', shelf: 'F5', category: 'Dermatologie' },
    { name: 'Diclamid 75 mg/3 ml', shelf: 'F5', category: 'Douleur et Inflammation' },
    { name: 'Genta 80 mg', shelf: 'F5', category: 'Anti-infectieux (Antibiotic)' },
    { name: 'Cobavit 1000 µg/2 ml', shelf: 'F5', category: 'Vitamines et Compléments' },
    { name: 'Gentaxyn 80 mg/2 ml', shelf: 'F5', category: 'Anti-infectieux (Antibiotic)' },
    { name: 'Varenox 4000 UI/0.4 ml', shelf: 'F5', category: 'CARDIO' },
    { name: 'Lamidaz 1% 15 g', shelf: 'F5', category: 'Anti-infectieux (Antibiotic)' },
    { name: 'Voltarène 1% 50 g', shelf: 'F5', category: 'Dermatologie' },
    { name: 'Dipronad 7 mg/ml', shelf: 'F5', category: 'Dermatologie' },
    { name: 'E-RAX 10% 40 g', shelf: 'F5', category: 'Dermatologie' },
    { name: 'Clotasol 0.05% 15 g', shelf: 'F5', category: 'Dermatologie' },
    { name: 'D-Three 200000 UI/ml', shelf: 'F5', category: 'Vitamines et Compléments' },
    { name: 'Cephadar 250 mg/5 ml', shelf: 'F4', category: 'Anti-infectieux (Antibiotic)' },
    { name: 'Clamoxyl 250 mg/5 ml', shelf: 'F4', category: 'Anti-infectieux (Antibiotic)' },
    { name: 'Clamoxyl 500 mg/5 ml', shelf: 'F4', category: 'Anti-infectieux (Antibiotic)' },
    { name: 'Zomax 100 mg/5 ml', shelf: 'F4', category: 'Anti-infectieux (Antibiotic)' },
    { name: 'Zomax 40 mg/ml', shelf: 'F4', category: 'Anti-infectieux (Antibiotic)' },
    { name: 'Céfimax 40 mg/5 ml', shelf: 'F4', category: 'Anti-infectieux (Antibiotic)' },
    { name: 'Céfimax 100 mg/5 ml', shelf: 'F4', category: 'Anti-infectieux (Antibiotic)' },
    { name: 'Bioclav Adulte', shelf: 'F4', category: 'Anti-infectieux (Antibiotic)' },
    { name: 'Augmentin 1g/125mg', shelf: 'F4', category: 'Anti-infectieux (Antibiotic)' },
    { name: 'Augmentin 500mg/62.5mg', shelf: 'F4', category: 'Anti-infectieux (Antibiotic)' },
    { name: 'Xyline', shelf: 'F4', category: 'Anti-infectieux (Antibiotic)' },
    { name: 'Solupred oro 20 mg', shelf: 'F4', category: 'Dermatologie' },
    { name: 'Amoclan BID', shelf: 'F4', category: 'Anti-infectieux (Antibiotic)' },
    { name: 'Ancéfal 250 mg/5 ml', shelf: 'F4', category: 'Anti-infectieux (Antibiotic)' },
    { name: 'Lexin 1000 mg', shelf: 'F4', category: 'Anti-infectieux (Antibiotic)' },
    { name: 'Orapen', shelf: 'F4', category: 'Anti-infectieux (Antibiotic)' },
    { name: 'Métronidazole Beker 250 mg', shelf: 'F4', category: 'Anti-infectieux (Antibiotic)' },
    { name: 'Mycozan', shelf: 'F4', category: 'Anti-infectieux (Antibiotic)' },
    { name: 'Spiracare', shelf: 'F4', category: 'Anti-infectieux (Antibiotic)' },
    { name: 'Fucidine enfant 250 mg/5 ml', shelf: 'F4', category: 'Anti-infectieux (Antibiotic)' },
    { name: 'Ciprolon', shelf: 'F4', category: 'Anti-infectieux (Antibiotic)' },
    { name: 'Ciprofloxacine 250 mg/500 mg', shelf: 'F4', category: 'Anti-infectieux (Antibiotic)' },
    { name: 'Vircet 150 mg', shelf: 'F4', category: 'Anti-infectieux (Antibiotic)' },
    { name: 'Uricare 3 g', shelf: 'F4', category: 'Anti-infectieux (Antibiotic)' },
    { name: 'Pyostacine 500 mg', shelf: 'F4', category: 'Anti-infectieux (Antibiotic)' },
    { name: 'Dotur 100 mg', shelf: 'F4', category: 'Anti-infectieux (Antibiotic)' },
    { name: 'Zynax 500 mg', shelf: 'F4', category: 'Anti-infectieux (Antibiotic)' },
    { name: 'Proflox 500 mg/750 mg', shelf: 'F4', category: 'Anti-infectieux (Antibiotic)' },
    { name: 'Zithromax 250 mg/500 mg', shelf: 'F4', category: 'Anti-infectieux (Antibiotic)' },
    { name: 'Zomax 500 mg', shelf: 'F4', category: 'Anti-infectieux (Antibiotic)' },
    { name: 'Orogyl', shelf: 'F4', category: 'Anti-infectieux (Antibiotic)' },
    { name: 'Bi.Orogyl 1.5M.UI / 250mg', shelf: 'F4', category: 'Anti-infectieux (Antibiotic)' },
    { name: 'Oxyptane BR 5 mg', shelf: 'F4', category: 'Urologie' },
    { name: 'Nitroxal 100 mg', shelf: 'F4', category: 'Anti-infectieux (Antibiotic)' },
    { name: 'Nolib 100 mg', shelf: 'F4', category: 'Anti-infectieux (Antibiotic)' },
    { name: 'Cotrimoxal Forte 800 mg/160 mg', shelf: 'F4', category: 'Anti-infectieux (Antibiotic)' },
    { name: 'Clamoxyl 1 g', shelf: 'F4', category: 'Anti-infectieux (Antibiotic)' },
    { name: 'Xaria 200 mg', shelf: 'F4', category: 'Neuro / Muscles' },
    { name: 'Zyloric 100 mg', shelf: 'F4', category: 'Endocrinologie et Diabète' },
    { name: 'Curacné 20 mg', shelf: 'F4', category: 'Dermatologie' },
    { name: 'Progestogel 1%', shelf: 'F4', category: 'Endocrinologie et Diabète' },
    { name: 'TGC Plus', shelf: 'F4', category: 'Neuro / Muscles' },
    { name: 'Ibuthol 5%/3%', shelf: 'F4', category: 'Dermatologie' }
]

  const [search, setSearch] = useState('');
  const [openedShelf, setOpenedShelf] = useState(null);
  const [highlightedMed, setHighlightedMed] = useState('');
  const [medicineList, setMedicineList] = useState(meds);
  const [editingMedicine, setEditingMedicine] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('A-Z');
  const [showModal, setShowModal] = useState(false);
  const [newMedicine, setNewMedicine] = useState({
    name: '',
    shelf: 'A1',
    category: '',
    DCI: '',
    notes: '',
  });
  const categoryColors = {
  'CARDIO': 'bg-red-100 text-red-700 border-red-300',

  'Respiratoire': 'bg-green-100 text-green-700 border-green-300',

  'GASTRO': 'bg-yellow-100 text-yellow-700 border-yellow-300',

  'Endocrinologie et Diabète':
    'bg-blue-100 text-blue-700 border-blue-300',

  'Anti-infectieux (Antibiotic)':
    'bg-orange-100 text-orange-700 border-orange-300',

  'Douleur et Inflammation':
    'bg-rose-100 text-rose-700 border-rose-300',

  'Dermatologie':
    'bg-purple-100 text-purple-700 border-purple-300',

  'Ophtalmologie / ORL':
    'bg-cyan-100 text-cyan-700 border-cyan-300',

  'Pédiatrie':
    'bg-indigo-100 text-indigo-700 border-indigo-300',

  'Vitamines et Compléments':
    'bg-violet-100 text-violet-700 border-violet-300',

  'Immunologie':
    'bg-teal-100 text-teal-700 border-teal-300',

  'Urologie':
    'bg-lime-100 text-lime-700 border-lime-300',
  'Neuro / Muscles':
    'bg-lime-100 text-lime-700 border-lime-300',
};

  const filtered = medicineList
    .filter((med) =>
      med.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter((med) =>
      selectedCategory === 'All'
        ? true
        : med.category === selectedCategory
    )
    .sort((a, b) => {
      if (sortOrder === 'A-Z') {
        return a.name.localeCompare(b.name);
      }

      if (sortOrder === 'Z-A') {
        return b.name.localeCompare(a.name);
      }

      return a.category.localeCompare(b.category);
    });

  const shelfStructure = {
    A: 8,
    B: 7,
    C: 7,
    D: 9,
    E: 3,
    F: 6, // This tells the app to create F1, F2, F3, F4, F5, and F6
  };

  const shelves = [
  ...Object.entries(shelfStructure).flatMap(([letter, count]) =>
    Array.from({ length: count }, (_, i) => `${letter}${i + 1}`)
  ),

  'PSY',
];

  const medsByShelf = shelves.reduce((acc, shelf) => {
    acc[shelf] = medicineList.filter((med) => med.shelf === shelf);
    return acc;
  }, {});

  const handleMedicineClick = (med) => {
    setOpenedShelf(med.shelf);
    setHighlightedMed(med.name);

    const element = document.getElementById(`shelf-${med.shelf}`);

    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const categories = ['All', ...new Set(medicineList.map((m) => m.category))];

  const handleDeleteMedicine = (name) => {
    const confirmDelete = window.confirm(`Delete ${name} from stock?`);

    if (!confirmDelete) return;

    setMedicineList(medicineList.filter((med) => med.name !== name));
  };

  const handleEditMedicine = (med) => {
    setEditingMedicine(med);

    setNewMedicine({
      name: med.name,
      shelf: med.shelf,
      category: med.category,
      DCI: med.DCI || '',
      notes: med.notes || '',
    });

    setShowModal(true);
  };

  const handleAddMedicine = () => {
    if (!newMedicine.name || !newMedicine.category) return;

    if (editingMedicine) {
      setMedicineList(
        medicineList.map((med) =>
          med.name === editingMedicine.name && med.shelf === editingMedicine.shelf
            ? {
                ...med,
                name: newMedicine.name,
                shelf: newMedicine.shelf,
                category: newMedicine.category,
                DCI: newMedicine.DCI,
                notes: newMedicine.notes,
              }
            : med
        )
      );
    } else {
      setMedicineList([
        ...medicineList,
      {
        name: newMedicine.name,
        shelf: newMedicine.shelf,
        category: newMedicine.category,
        DCI: newMedicine.DCI,
        notes: newMedicine.notes,
      },
          ]);
    }

    setEditingMedicine(null);

    setNewMedicine({
      name: '',
      shelf: 'A1',
      category: '',
      DCI: '',
      notes: '',
    });

    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
          <h1 className="text-4xl font-bold text-gray-800">
            Pharmacy Stock Locator
          </h1>

          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl shadow-lg font-semibold transition"
          >
            + Add Medicine
          </button>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-6">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">
                {editingMedicine ? 'Edit Medicine' : 'Add New Medicine'}
              </h2>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Medicine Name"
                  value={newMedicine.name}
                  onChange={(e) =>
                    setNewMedicine({ ...newMedicine, name: e.target.value })
                  }
                  className="w-full p-4 rounded-xl border"
                />

                <select
                  value={newMedicine.shelf}
                  onChange={(e) =>
                    setNewMedicine({ ...newMedicine, shelf: e.target.value })
                  }
                  className="w-full p-4 rounded-xl border"
                >
                  {shelves.map((shelf) => (
                    <option key={shelf} value={shelf}>
                      {shelf}
                    </option>
                  ))}
                </select>

                <input
                  type="text"
                  placeholder="Category"
                  value={newMedicine.category}
                  onChange={(e) =>
                    setNewMedicine({ ...newMedicine, category: e.target.value })
                  }
                  className="w-full p-4 rounded-xl border"
                />

                <input
                  type="text"
                  placeholder="DCI"
                  value={newMedicine.DCI}
                  onChange={(e) =>
                    setNewMedicine({ ...newMedicine, DCI: e.target.value })
                  }
                  className="w-full p-4 rounded-xl border"
                />

                <textarea
                  placeholder="Notes (Optional)"
                  value={newMedicine.notes}
                  onChange={(e) =>
                    setNewMedicine({ ...newMedicine, notes: e.target.value })
                  }
                  className="w-full p-4 rounded-xl border min-h-[120px]"
                />

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-5 py-3 rounded-xl bg-gray-200 hover:bg-gray-300 transition"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleAddMedicine}
                    className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition"
                  >
                    {editingMedicine ? 'Update Medicine' : 'Save Medicine'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-wrap gap-3 mb-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl transition font-medium ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 mb-4">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="p-3 rounded-xl border"
            >
              <option>A-Z</option>
              <option>Z-A</option>
              <option>Category</option>
            </select>
          </div>
          <input
            type="text"
            placeholder="Search medicine name..."
            className="w-full p-4 rounded-xl border border-gray-300 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {filtered.length > 0 ? (
            filtered.map((med, index) => (
              <div
                key={index}
                onClick={() => handleMedicineClick(med)}
                className="bg-white rounded-2xl shadow-md p-5 hover:shadow-xl hover:scale-[1.02] transition cursor-pointer"
              >
                <h2 className="text-2xl font-semibold mb-2 text-gray-800">
                  {med.name}
                </h2>

                <p className="text-lg text-gray-700">
                  <strong>Shelf:</strong> {med.shelf}
                </p>

                <div className="mt-3">
  <span
    className={`inline-block px-3 py-1 rounded-full border text-sm font-semibold ${
      categoryColors[med.category] ||
      'bg-gray-100 text-gray-700 border-gray-300'
    }`}
  >
    {med.category}
  </span>
</div>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditMedicine(med);
                    }}
                    className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 rounded-xl font-semibold transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteMedicine(med.name);
                    }}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-red-100 text-red-700 rounded-xl p-4 text-lg">
              No medicine found.
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Pharmacy Blueprint Map
          </h2>

          <div className="relative bg-gray-200 rounded-3xl p-8 min-h-[1200px] overflow-hidden">

            {/* A Shelf */}
            <div
  className={`absolute left-4 top-10 flex flex-col gap-3 transition-all ${
    openedShelf?.startsWith('A') ? 'z-50' : 'z-10'
  }`}
>
              {Array.from({ length: 8 }, (_, i) => {
                const shelf = `A${8 - i}`;
                const isOpen = openedShelf === shelf;

                return (
                  <div key={shelf} id={`shelf-${shelf}`} className="relative">
                    <button
                      onClick={() => setOpenedShelf(isOpen ? null : shelf)}
                      className={`w-24 h-20 rounded-2xl border-2 font-bold text-xl transition ${
                        isOpen
                          ? 'bg-blue-200 border-blue-600'
                          : 'bg-white border-gray-300'
                      }`}
                    >
                      {shelf}
                    </button>

                    {isOpen && (
                      <div className="absolute top-full left-0 bg-white shadow-2xl rounded-2xl p-3 mt-2 w-64 max-h-[420px] overflow-y-auto z-[9999]">
                        {medsByShelf[shelf].length > 0 ? (
                          medsByShelf[shelf].map((med) => (
                            <div
                              key={med.name}
                              className={`p-2 rounded-xl mb-2 ${
                                highlightedMed === med.name
                                  ? 'bg-yellow-200 border border-yellow-500'
                                  : 'bg-gray-100'
                              }`}
                            >
                              <div className="font-semibold">{med.name}</div>
                              <div className="mt-1">
  <span
    className={`inline-block px-2 py-1 rounded-full border text-xs font-semibold ${
      categoryColors[med.category] ||
      'bg-gray-100 text-gray-700 border-gray-300'
    }`}
  >
    {med.category}
  </span>
</div>
                            </div>
                          ))
                        ) : (
                          <div className="text-sm text-gray-500">Empty shelf</div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* E Shelf */}
            <div 
  className={`absolute top-4 left-1/3 -translate-x-1/2 flex gap-3 transition-all ${
    openedShelf?.startsWith('E') ? 'z-50' : 'z-20'
  }`}
>
              {['E1', 'E2', 'E3'].map((shelf) => {
                const isOpen = openedShelf === shelf;

                return (
                  <div key={shelf} id={`shelf-${shelf}`} className="relative">
                    <button
                      onClick={() => setOpenedShelf(isOpen ? null : shelf)}
                      className={`w-28 h-20 rounded-2xl border-2 font-bold text-xl transition ${
                        isOpen
                          ? 'bg-blue-200 border-blue-600'
                          : 'bg-white border-gray-300'
                      }`}
                    >
                      {shelf}
                    </button>

                    {isOpen && (
                      <div className="absolute top-0 left-full ml-3 bg-white shadow-xl rounded-2xl p-3 w-64 max-h-[420px] overflow-y-auto z-[999]">
                        {medsByShelf[shelf].length > 0 ? (
                          medsByShelf[shelf].map((med) => (
                            <div
                              key={med.name}
                              className={`p-2 rounded-xl mb-2 ${
                                highlightedMed === med.name
                                  ? 'bg-yellow-200 border border-yellow-500'
                                  : 'bg-gray-100'
                              }`}
                            >
                              <div className="font-semibold">{med.name}</div>
                              <div className="mt-1">
  <span
    className={`inline-block px-2 py-1 rounded-full border text-xs font-semibold ${
      categoryColors[med.category] ||
      'bg-gray-100 text-gray-700 border-gray-300'
    }`}
  >
    {med.category}
  </span>
</div>
                            </div>
                          ))
                        ) : (
                          <div className="text-sm text-gray-500">Empty shelf</div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* B Shelf */}
            <div
  className={`absolute left-[22%] top-40 flex flex-col gap-3 transition-all ${
    openedShelf?.startsWith('B') ? 'z-50' : 'z-10'
  }`}
>
              {Array.from({ length: 7 }, (_, i) => {
                const shelf = `B${7 - i}`;
                const isOpen = openedShelf === shelf;

                return (
                  <div key={shelf} id={`shelf-${shelf}`} className="relative">
                    <button
                      onClick={() => setOpenedShelf(isOpen ? null : shelf)}
                      className={`w-24 h-20 rounded-2xl border-2 font-bold text-xl transition ${
                        isOpen
                          ? 'bg-blue-200 border-blue-600'
                          : 'bg-white border-gray-300'
                      }`}
                    >
                      {shelf}
                    </button>

                    {isOpen && (
                      <div className="absolute top-full left-0 bg-white shadow-2xl rounded-2xl p-3 mt-2 w-64 max-h-[420px] overflow-y-auto z-[9999]">
                        {medsByShelf[shelf].length > 0 ? (
                          medsByShelf[shelf].map((med) => (
                            <div
                              key={med.name}
                              className={`p-2 rounded-xl mb-2 ${
                                highlightedMed === med.name
                                  ? 'bg-yellow-200 border border-yellow-500'
                                  : 'bg-gray-100'
                              }`}
                            >
                              <div className="font-semibold">{med.name}</div>
                              <div className="mt-1">
  <span
    className={`inline-block px-2 py-1 rounded-full border text-xs font-semibold ${
      categoryColors[med.category] ||
      'bg-gray-100 text-gray-700 border-gray-300'
    }`}
  >
    {med.category}
  </span>
</div>
                            </div>
                          ))
                        ) : (
                          <div className="text-sm text-gray-500">Empty shelf</div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* C Shelf */}
            <div
  className={`absolute left-[34%] top-40 flex flex-col gap-3 transition-all ${
    openedShelf?.startsWith('C') ? 'z-50' : 'z-10'
  }`}
>
              {Array.from({ length: 7 }, (_, i) => {
                const shelf = `C${7 - i}`;
                const isOpen = openedShelf === shelf;

                return (
                  <div key={shelf} id={`shelf-${shelf}`} className="relative">
                    <button
                      onClick={() => setOpenedShelf(isOpen ? null : shelf)}
                      className={`w-24 h-20 rounded-2xl border-2 font-bold text-xl transition ${
                        isOpen
                          ? 'bg-blue-200 border-blue-600'
                          : 'bg-white border-gray-300'
                      }`}
                    >
                      {shelf}
                    </button>

                    {isOpen && (
                      <div className="absolute top-full left-0 bg-white shadow-2xl rounded-2xl p-3 mt-2 w-64 max-h-[420px] overflow-y-auto z-[9999]">
                        {medsByShelf[shelf].length > 0 ? (
                          medsByShelf[shelf].map((med) => (
                            <div
                              key={med.name}
                              className={`p-2 rounded-xl mb-2 ${
                                highlightedMed === med.name
                                  ? 'bg-yellow-200 border border-yellow-500'
                                  : 'bg-gray-100'
                              }`}
                            >
                              <div className="font-semibold">{med.name}</div>
                              <div className="mt-1">
  <span
    className={`inline-block px-2 py-1 rounded-full border text-xs font-semibold ${
      categoryColors[med.category] ||
      'bg-gray-100 text-gray-700 border-gray-300'
    }`}
  >
    {med.category}
  </span>
</div>
                            </div>
                          ))
                        ) : (
                          <div className="text-sm text-gray-500">Empty shelf</div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* D Shelf */}
            <div 
  className={`absolute right-85 top-5 flex flex-col gap-3 transition-all ${
    openedShelf?.startsWith('D') ? 'z-50' : 'z-10'
  }`}
>
              {Array.from({ length: 9 }, (_, i) => {
                const shelf = `D${9 - i}`;
                const isOpen = openedShelf === shelf;

                return (
                  <div key={shelf} id={`shelf-${shelf}`} className="relative">
                    <button
                      onClick={() => setOpenedShelf(isOpen ? null : shelf)}
                      className={`w-24 h-20 rounded-2xl border-2 font-bold text-xl transition ${
                        isOpen
                          ? 'bg-blue-200 border-blue-600'
                          : 'bg-white border-gray-300'
                      }`}
                    >
                      {shelf}
                    </button>

                    {isOpen && (
                      <div className="absolute top-0 right-full mr-3 bg-white shadow-xl rounded-2xl p-3 w-64 max-h-[420px] overflow-y-auto z-[999]">
                        {medsByShelf[shelf].length > 0 ? (
                          medsByShelf[shelf].map((med) => (
                            <div
                              key={med.name}
                              className={`p-2 rounded-xl mb-2 ${
                                highlightedMed === med.name
                                  ? 'bg-yellow-200 border border-yellow-500'
                                  : 'bg-gray-100'
                              }`}
                            >
                              <div className="font-semibold">{med.name}</div>
                              <div className="mt-1">
  <span
    className={`inline-block px-2 py-1 rounded-full border text-xs font-semibold ${
      categoryColors[med.category] ||
      'bg-gray-100 text-gray-700 border-gray-300'
    }`}
  >
    {med.category}
  </span>
</div>
                            </div>
                          ))
                        ) : (
                          <div className="text-sm text-gray-500">Empty shelf</div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

{/* PSY Shelf */}
<div className="absolute left-4 bottom-81">
  <div key="PSY" id="shelf-PSY" className="relative">
    <button
      onClick={() =>
        setOpenedShelf(openedShelf === 'PSY' ? null : 'PSY')
      }
      className={`w-24 h-24 rounded-2xl border-2 font-bold text-2xl transition-all ${
        openedShelf === 'PSY'
          ? 'bg-blue-200 border-blue-600 scale-105 shadow-md'
          : 'bg-white border-gray-300 hover:border-blue-400'
      }`}
    >
      PSY
    </button>

    {openedShelf === 'PSY' && (
      <div className="absolute bottom-full mb-2 bg-white shadow-xl rounded-2xl p-3 w-64 max-h-[420px] overflow-y-auto z-50">
        {(medsByShelf['PSY'] || []).length > 0 ? (
          medsByShelf['PSY'].map((med) => (
            <div
              key={med.name}
              className={`p-2 rounded-xl mb-2 transition-colors ${
                highlightedMed === med.name
                  ? 'bg-yellow-200 border border-yellow-500 shadow-sm'
                  : 'bg-gray-100 border border-transparent'
              }`}
            >
              <div className="font-semibold text-gray-800">
                {med.name}
              </div>

              <div className="text-sm text-gray-500">
                {med.category}
              </div>
            </div>
          ))
        ) : (
          <div className="text-sm text-gray-400 italic p-1 text-center">
            Empty shelf
          </div>
        )}
      </div>
    )}
  </div>
</div>

            {/* F Shelves */}
<div className="absolute bottom-79 left-[13rem] flex gap-4 items-end">
  {['F1', 'F2'].map((shelf) => {
    const isOpen = openedShelf === shelf;

    return (
      <div key={shelf} id={`shelf-${shelf}`} className="relative">
        <button
          onClick={() => setOpenedShelf(isOpen ? null : shelf)}
          className={`w-24 h-20 rounded-2xl border-2 font-bold text-xl transition-all ${
            isOpen
              ? 'bg-blue-200 border-blue-600 scale-105 shadow-md'
              : 'bg-white border-gray-300 hover:border-blue-400'
          }`}
        >
          {shelf}
        </button>

        {isOpen && (
          <div className="absolute bottom-full mb-2 bg-white shadow-xl rounded-2xl p-3 w-64 max-h-[420px] overflow-y-auto z-50">

  <div className="sticky top-0 bg-white pb-2 mb-2 border-b font-bold text-lg text-gray-700">
    Shelf {shelf}
  </div>
            {(medsByShelf[shelf] || []).length > 0 ? (
              medsByShelf[shelf].map((med) => (
                <div 
                  key={med.name}
                  className={`p-2 rounded-xl mb-2 transition-colors ${
                    highlightedMed === med.name
                      ? 'bg-yellow-200 border border-yellow-500 shadow-sm'
                      : 'bg-gray-100 border border-transparent'
                  }`}
                >
                  <div className="font-semibold text-gray-800">{med.name}</div>
                  <div className="mt-1">
  <span
    className={`inline-block px-2 py-1 rounded-full border text-xs font-semibold ${
      categoryColors[med.category] ||
      'bg-gray-100 text-gray-700 border-gray-300'
    }`}
  >
    {med.category}
  </span>
</div>
                </div>
              ))
            ) : (
              <div className="text-sm text-gray-400 italic p-1 text-center">Empty shelf</div>
            )}
          </div>
        )}
      </div>
    );
  })}
</div>

<div className="absolute bottom-67 left-[26.5rem] flex gap-4 items-end">
              {['F3', 'F4', 'F5', 'F6'].map((shelf) => {
                const isOpen = openedShelf === shelf;

                return (
                  <div key={shelf} id={`shelf-${shelf}`} className="relative">
                    <button
                      onClick={() => setOpenedShelf(isOpen ? null : shelf)}
                      className={`w-24 h-20 rounded-2xl border-2 font-bold text-xl transition-all ${
                        isOpen
                          ? 'bg-blue-200 border-blue-600 scale-105 shadow-md'
                          : 'bg-white border-gray-300 hover:border-blue-400'
                      }`}
                    >
                      {shelf}
                    </button>

                    {/* This is the part that was missing - it shows the medicines! */}
                    {isOpen && (
                      <div className="absolute bottom-full mb-2 bg-white shadow-xl rounded-2xl p-3 w-64 max-h-[420px] overflow-y-auto z-50">

  <div className="sticky top-0 bg-white pb-2 mb-2 border-b font-bold text-lg text-gray-700">
    Shelf {shelf}
  </div>
                        {(medsByShelf[shelf] || []).length > 0 ? (
                          medsByShelf[shelf].map((med) => (
                            <div
                              key={med.name}
                              className={`p-2 rounded-xl mb-2 transition-colors ${
                                highlightedMed === med.name
                                  ? 'bg-yellow-200 border border-yellow-500 shadow-sm'
                                  : 'bg-gray-100 border border-transparent'
                              }`}
                            >
                              <div className="font-semibold text-gray-800">{med.name}</div>
                              <div className="mt-1">
  <span
    className={`inline-block px-2 py-1 rounded-full border text-xs font-semibold ${
      categoryColors[med.category] ||
      'bg-gray-100 text-gray-700 border-gray-300'
    }`}
  >
    {med.category}
  </span>
</div>
                            </div>
                          ))
                        ) : (
                          <div className="text-sm text-gray-400 italic p-1 text-center">Empty shelf</div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
