import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://iqesqrlozabinnaknsow.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlxZXNxcmxvemFiaW5uYWtuc293Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAzMTMxNzQsImV4cCI6MjA5NTg4OTE3NH0.IUov7mf87hexFAcfYbZ0CgAsVBBrg16Pk49jPI1JgJU'
);

export default function PharmacyStockLocator() {
  const meds = [
    { name: 'Exval', shelf: 'F1', dci: 'Valsartan', category: 'CARDIO' },
    { name: 'Extel', shelf: 'F1', dci: 'Telmisartan', category: 'CARDIO' },
    { name: 'Rumava', shelf: 'F1', dci: 'Leflunomide', category: 'Immunologie' },
    { name: 'ZANIDIP', shelf: 'F1', dci: 'Lercanidipine', category: 'CARDIO' },
    { name: 'Aprovasc', shelf: 'F1', dci: 'Irbesartan + Amlodipine', category: 'CARDIO' },
    { name: 'COTAREC', shelf: 'F1', dci: 'Valsartan + Hydrochlorothiazide', category: 'CARDIO' },
    { name: 'VASTAREL', shelf: 'F1', dci: 'Trimétazidine', category: 'CARDIO' },
    { name: 'Monotildiem', shelf: 'F1', dci: 'Diltiazem', category: 'CARDIO' },
    { name: 'TELMISARTE +', shelf: 'F1', dci: 'Telmisartan + Hydrochlorothiazide', category: 'CARDIO' },
    { name: 'NOVAROL', shelf: 'F1', dci: 'Rosuvastatine', category: 'CARDIO' },
    { name: 'ASPIRINE Cardio', shelf: 'F1', dci: 'Acide acétylsalicylique', category: 'CARDIO' },
    { name: 'Exirb', shelf: 'F1', dci: 'Irbesartan', category: 'CARDIO' },
    { name: 'CRESTATINE', shelf: 'F1', dci: 'Rosuvastatine', category: 'CARDIO' },
    { name: 'Superstat', shelf: 'F1', dci: 'Rosuvastatine', category: 'CARDIO' },
    { name: 'Cresovast', shelf: 'F1', dci: 'Rosuvastatine', category: 'CARDIO' },
    { name: 'Flecalur', shelf: 'F1', dci: 'Flécaïnide', category: 'CARDIO' },
    { name: 'COVERAM', shelf: 'F1', dci: 'Périndopril + Amlodipine', category: 'CARDIO' },
    { name: 'Bipreterax', shelf: 'F1', dci: 'Périndopril + Indapamide', category: 'CARDIO' },
    { name: 'BIPROTENS', shelf: 'F1', dci: 'Bisoprolol', category: 'CARDIO' },
    { name: 'COVERSYL', shelf: 'F1', dci: 'Périndopril arginine', category: 'CARDIO' },
    { name: 'TRIATEC', shelf: 'F1', dci: 'Ramipril', category: 'CARDIO' },
    { name: 'CO-APROVEL', shelf: 'F1', dci: 'Irbesartan + Hydrochlorothiazide', category: 'CARDIO' },
    { name: 'APROVEL', shelf: 'F1', dci: 'Irbesartan', category: 'CARDIO' },
    { name: 'CO-IRBEK', shelf: 'F1', dci: 'Irbesartan + Hydrochlorothiazide', category: 'CARDIO' },
    { name: 'BYZOLEX', shelf: 'F1', dci: 'Nebivolol', category: 'CARDIO' },
    { name: 'Biopress', shelf: 'F1', dci: 'Candésartan cilexetil', category: 'CARDIO' },
    { name: 'Atacand', shelf: 'F1', dci: 'Candésartan cilexetil', category: 'CARDIO' },
    { name: 'HYTACAND', shelf: 'F1', dci: 'Candésartan cilexetil + Hydrochlorothiazide', category: 'CARDIO' },
    { name: 'Biopress Plus', shelf: 'F1', dci: 'Candésartan cilexetil + Hydrochlorothiazide', category: 'CARDIO' },
    { name: 'CO-ATABEK', shelf: 'F1', dci: 'Candésartan cilexetil + Hydrochlorothiazide', category: 'CARDIO' },
    { name: 'SPIRONOLONE', shelf: 'F1', dci: 'Spironolactone', category: 'CARDIO' },
    { name: 'Biprostene', shelf: 'F1', dci: 'Bisoprolol', category: 'CARDIO' },
    { name: 'Sarsand', shelf: 'F1', dci: 'Candésartan cilexetil', category: 'CARDIO' },
    { name: 'PLAFIX', shelf: 'F1', dci: 'Clopidogrel', category: 'CARDIO' },
    { name: 'FLUDEX LP', shelf: 'F1', dci: 'Indapamide', category: 'CARDIO' },
    { name: 'ADEX LP', shelf: 'F1', dci: 'Indapamide', category: 'CARDIO' },
    { name: 'Nafronyl', shelf: 'F1', dci: 'Naftidrofuryl', category: 'CARDIO' },
    { name: 'AMLOR', shelf: 'F1', dci: 'Amlodipine', category: 'CARDIO' },
    { name: 'EXFORGE', shelf: 'F1', dci: 'Amlodipine + Valsartan', category: 'CARDIO' },  
    { name: 'Montelair 10 mg', shelf: 'F2', dci: 'Montélukast', category: 'Respiratoire' },
    { name: 'Symbicort Turbuhaler', shelf: 'F2', dci: 'Budésonide + Formotérol', category: 'Respiratoire' },
    { name: 'Flixotide', shelf: 'F2', dci: 'Fluticasone propionate', category: 'Respiratoire' },
    { name: 'Flucasone mini', shelf: 'F2', dci: 'Fluticasone propionate', category: 'Respiratoire' },
    { name: 'Rinonide', shelf: 'F2', dci: 'Budésonide', category: 'Respiratoire' },
    { name: 'Budecort 200', shelf: 'F2', dci: 'Budésonide', category: 'Respiratoire' },
    { name: 'Cozolamide', shelf: 'F2', dci: 'Dorzolamide', category: 'Ophtalmologie / ORL' },
    { name: 'Dexamethasone GL', shelf: 'F2', dci: 'Dexaméthasone', category: 'Ophtalmologie / ORL' },
    { name: 'Lomac 20 mg', shelf: 'F2', dci: 'Oméprazole', category: 'GASTRO' },
    { name: 'Zimor 20', shelf: 'F2', dci: 'Oméprazole', category: 'GASTRO' },
    { name: 'Antag 20 mg', shelf: 'F2', dci: 'Oméprazole', category: 'GASTRO' },
    { name: 'Proton 20 mg', shelf: 'F2', dci: 'Oméprazole', category: 'GASTRO' },
    { name: 'FAMOTIDINE MABO', shelf: 'F2', dci: 'Famotidine', category: 'GASTRO' },
    { name: 'Dompérone 10 mg', shelf: 'F2', dci: 'Dompéridone', category: 'GASTRO' },
    { name: 'LISINOX 20 mg', shelf: 'F2', dci: 'Lisinopril', category: 'GASTRO' },
    { name: 'Omeprotect 20 mg', shelf: 'F2', dci: 'Oméprazole', category: 'GASTRO' },
    { name: 'Debridat', shelf: 'F2', dci: 'Trimébutine', category: 'GASTRO' },
    { name: 'Trimébutine Biocare', shelf: 'F2', dci: 'Trimébutine', category: 'GASTRO' },
    { name: 'Ponctuel', shelf: 'F2', dci: 'picosulfate de sodium', category: 'GASTRO' },
    { name: 'Mébévérine BEKER LP', shelf: 'F2', dci: 'Mébévérine', category: 'GASTRO' },
    { name: 'DUSPATALIN 200 mg', shelf: 'F2', dci: 'Mébévérine', category: 'GASTRO' },
    { name: 'Duspaverine 100 mg', shelf: 'F2', dci: 'Mébévérine', category: 'GASTRO' },
    { name: 'Meteospasmyl', shelf: 'F2', dci: 'Alvérine + Siméticone', category: 'GASTRO' },
    { name: 'Glycerine LS', shelf: 'F2', dci: 'Glycérol', category: 'GASTRO' },
    { name: 'Riabal 30 mg', shelf: 'F2', dci: 'Prifinium bromure', category: 'GASTRO' },
    { name: 'Freegas', shelf: 'F2', dci: 'Siméticone', category: 'GASTRO' },
    { name: 'Bilaxten 20 mg', shelf: 'F2', dci: 'Bilastine', category: 'Respiratoire' },
    { name: 'Gatimox', shelf: 'F2', dci: 'Gatifloxacine', category: 'Anti-infectieux' },
    { name: 'Lowgas', shelf: 'F2', dci: 'Siméticone', category: 'GASTRO' },
    { name: 'Dimépra 2 mg', shelf: 'F2', dci: 'Diméticone', category: 'GASTRO' },
    { name: 'Dysentyl', shelf: 'F2', dci: 'Phthalylsulfathiazol + Néomycine + Pectine', category: 'GASTRO' },
    { name: 'Airditine', shelf: 'F2', dci: 'Kétotifène', category: 'Respiratoire' },
    { name: 'Isolact', shelf: 'F2', dci: 'Lactulose', category: 'GASTRO' },
    { name: 'Nobac', shelf: 'F2', dci: 'Racecadotril', category: 'GASTRO' },
    { name: 'Smecta', shelf: 'F2', dci: 'Diosmectite', category: 'GASTRO' },
    { name: 'Flazol 125 mg', shelf: 'F2', dci: 'Métronidazole', category: 'Anti-infectieux' },
    { name: 'Bedelix', shelf: 'F2', dci: 'Montmorillonite beidellitique', category: 'GASTRO' },
    { name: 'Diamicron 30 mg', shelf: 'F3', dci: 'Gliclazide', category: 'Endocrinologie et Diabète' },
    { name: 'Levothyrox 100 µg', shelf: 'F3', dci: 'Lévothyroxine sodique', category: 'Endocrinologie et Diabète' },
    { name: 'Levothyrox 25 µg', shelf: 'F3', dci: 'Lévothyroxine sodique', category: 'Endocrinologie et Diabète' },
    { name: 'Athyrozol 5 mg', shelf: 'F3', dci: 'Thiamazole', category: 'Endocrinologie et Diabète' },
    { name: 'Minirinmelt 60 µg', shelf: 'F3', dci: 'Desmopressine', category: 'Endocrinologie et Diabète' },
    { name: 'Levothyrox 50 µg', shelf: 'F3', dci: 'Lévothyroxine sodique', category: 'Endocrinologie et Diabète' },
    { name: 'Diamicron 60 mg', shelf: 'F3', dci: 'Gliclazide', category: 'Endocrinologie et Diabète' },
    { name: 'IRYS 3 mg', shelf: 'F3', dci: 'Glimepiride', category: 'Endocrinologie et Diabète' },
    { name: 'IRYS 4 mg', shelf: 'F3', dci: 'Glimepiride', category: 'Endocrinologie et Diabète' },
    { name: 'IRYS 6 mg', shelf: 'F3', dci: 'Glimepiride', category: 'Endocrinologie et Diabète' },
    { name: 'Glucophage 500 mg', shelf: 'F3', dci: 'Metformine hydrochloride', category: 'Endocrinologie et Diabète' },
    { name: 'NOVOFORMINE 500 mg', shelf: 'F3', dci: 'Metformine', category: 'Endocrinologie et Diabète' },
    { name: 'Glucophage 1000 mg', shelf: 'F3', dci: 'Metformine hydrochloride', category: 'Endocrinologie et Diabète' },
    { name: 'Larimel 50 mg', shelf: 'F3', dci: 'Vildagliptine', category: 'Endocrinologie et Diabète' },
    { name: 'Glinix', shelf: 'F3', dci: 'Repaglinide', category: 'Endocrinologie et Diabète' },
    { name: 'Furozal 40 mg', shelf: 'F3', dci: 'Furosémide', category: 'CARDIO' },
    { name: 'Diaglinide 2 mg', shelf: 'F3', dci: 'Repaglinide', category: 'Endocrinologie et Diabète' },
    { name: 'Glybek 100 mg', shelf: 'F3', dci: 'Sitagliptine', category: 'Endocrinologie et Diabète' },
    { name: 'Geltim LP 1 mg/g', shelf: 'F1', dci: 'Timolol', category: 'Ophtalmologie / ORL' },
    { name: 'Fluidabak 1.5%', shelf: 'F1', dci: 'Povidone', category: 'Ophtalmologie / ORL' },
    { name: 'Cartéol L.P. 2%', shelf: 'F1', dci: 'Carteolol hydrochloride', category: 'Ophtalmologie / ORL' },
    { name: 'Opticis 1 mg/ml', shelf: 'F1', dci: 'Olopatadine', category: 'Ophtalmologie / ORL' },
    { name: 'Optipred 10 mg/ml', shelf: 'F1', dci: 'Prednisolone acetate', category: 'Ophtalmologie / ORL' },
    { name: 'Clomycine 1%', shelf: 'F1', dci: 'Chlortétracycline hydrochloride', category: 'Ophtalmologie / ORL' },
    { name: 'Vibac 1.5%', shelf: 'F1', dci: 'Povidone iodée', category: 'Ophtalmologie / ORL' },
    { name: 'Dermasone 0.05%', shelf: 'F1', dci: 'Bétaméthasone', category: 'Dermatologie' },
    { name: 'Opadex', shelf: 'F1', dci: 'Dexaméthasone', category: 'Ophtalmologie / ORL' },
    { name: 'Optif Jam 1 mg/ml', shelf: 'F1', dci: 'Fluorométholone', category: 'Ophtalmologie / ORL' },
    { name: 'Azyter 15 mg/g', shelf: 'F1', dci: 'Azithromycine dihydrate', category: 'Ophtalmologie / ORL' },
    { name: 'Zalerg 0.25 mg/ml', shelf: 'F1', dci: 'Kétotifène', category: 'Ophtalmologie / ORL' },
    { name: 'Respinhal 0.05%', shelf: 'F2', dci: 'Oxymétazoline', category: 'Respiratoire' },
    { name: 'Otocrovis Gouttes', shelf: 'F2', dci: 'Fluocinolone acétonide + Néomycine + Polymyxine B', category: 'Ophtalmologie / ORL' },
    { name: 'Aqualarm Intensive UD', shelf: 'F2', dci: 'Acide hyaluronique', category: 'Ophtalmologie / ORL' },
    { name: 'Indocollyre 0.1%', shelf: 'F2', dci: 'Indométacine', category: 'Ophtalmologie / ORL' },
    { name: 'Fucidine 1%', shelf: 'F2', dci: 'Acide fusidique', category: 'Ophtalmologie / ORL' },
    { name: 'Désomédine 0.1%', shelf: 'F2', dci: 'Diisétionate d\'hexamidine', category: 'Ophtalmologie / ORL' },
    { name: 'Timolamid 20 mg/ml + 5 mg/ml', shelf: 'F2', dci: 'Dorzolamide + Timolol', category: 'Ophtalmologie / ORL' },
    { name: 'Artelac 3.20 mg/ml', shelf: 'F2', dci: 'Hypromellose', category: 'Ophtalmologie / ORL' },
    { name: 'Loradine 10 mg', shelf: 'F6', dci: 'Loratadine', category: 'Respiratoire' },
    { name: 'Co-Dolyc 500 mg/30 mg', shelf: 'F6', dci: 'Paracétamol + Codéine', category: 'Douleur et Inflammation' },
    { name: 'Xydol 600 mg', shelf: 'F6', dci: 'Ibuprofène', category: 'Douleur et Inflammation' },
    { name: 'Thymoseptine Sirop', shelf: 'F6', dci: 'Thymus vulgaris (Extrait de thym)', category: 'Respiratoire' },
    { name: 'Prospan Sirop', shelf: 'F6', dci: 'Hedera helix (Extrait de feuilles de lierre)', category: 'Respiratoire' },
    { name: 'Antalfen 20 mg/ml Sirop', shelf: 'F6', dci: 'Ibuprofène', category: 'Douleur et Inflammation' },
    { name: 'Loradess 0.5 mg/ml Sirop', shelf: 'F6', dci: 'Desloratadine', category: 'Respiratoire' },
    { name: 'Bronchocalm Adultes Sirop', shelf: 'F6', dci: 'Bromhydrate de dextrométhorphane', category: 'Respiratoire' },
    { name: 'Loradine 0.1% Sirop', shelf: 'F6', dci: 'Loratadine', category: 'Respiratoire' },
    { name: 'Proxan Kids Sirop', shelf: 'F6', dci: 'Proxibarbal', category: 'Pédiatrie' },
    { name: 'Carbodal 5% Sirop', shelf: 'F6', dci: 'Carbocistéine', category: 'Respiratoire' },
    { name: 'Liblab Sirop', shelf: 'F6', dci: 'Formulation à base de plantes', category: 'Respiratoire' },
    { name: 'Ivylix 0.7g Sirop', shelf: 'F6', dci: 'Extrait de feuilles de lierre', category: 'Respiratoire' },
    { name: 'Carbomex 5%', shelf: 'F6', dci: 'Carbocistéine', category: 'Respiratoire' },
    { name: 'Gripex 10 mg/4 mg', shelf: 'F6', dci: 'Phényléphrine + Chlorphéniramine', category: 'Respiratoire' },
    { name: 'Gripex +', shelf: 'F6', dci: 'Ibuprofène + Chlorhydrate de pseudoéphédrine', category: 'Respiratoire' },
    { name: 'Doliprane 200 mg', shelf: 'F6', dci: 'Paracétamol', category: 'Douleur et Inflammation' },
    { name: 'Doliprane 300 mg', shelf: 'F6', dci: 'Paracétamol', category: 'Douleur et Inflammation' },
    { name: 'Xydol 200 mg/400 mg', shelf: 'F6', dci: 'Ibuprofène', category: 'Douleur et Inflammation' },
    { name: 'Ibuprofène Beker 400 mg', shelf: 'F6', dci: 'Ibuprofène', category: 'Douleur et Inflammation' },
    { name: 'Antalfen 600 mg', shelf: 'F6', dci: 'Ibuprofène', category: 'Douleur et Inflammation' },
    { name: 'Xycare 5 mg', shelf: 'F6', dci: 'Lévocétirizine Dihydrochloride', category: 'Respiratoire' },
    { name: 'Dioveine 600 mg', shelf: 'F6', dci: 'Diosmine', category: 'CARDIO' },
    { name: 'Ebasta 10 mg', shelf: 'F6', dci: 'Ébastine', category: 'Respiratoire' },
    { name: 'Fradene 20 mg', shelf: 'F6', dci: 'Piroxicam', category: 'Douleur et Inflammation' },
    { name: 'Precortyl 5 mg', shelf: 'F6', dci: 'Prednisone', category: 'Dermatologie' },
    { name: 'Paramol 1000 mg', shelf: 'F6', dci: 'Paracétamol', category: 'Douleur et Inflammation' },
    { name: 'Clofenal Adultes 100 mg', shelf: 'F6', dci: 'Diclofénac de sodium', category: 'Douleur et Inflammation' },
    { name: 'Biofenac LP 100 mg', shelf: 'F6', dci: 'Diclofénac de sodium', category: 'Douleur et Inflammation' },
    { name: 'Biofenac 75 mg', shelf: 'F6', dci: 'Diclofénac de sodium', category: 'Douleur et Inflammation' },
    { name: 'Biofenac FAST 50 mg', shelf: 'F6', dci: 'Diclofénac potassium', category: 'Douleur et Inflammation' },
    { name: 'Votrex 50 mg', shelf: 'F6', dci: 'Diclofénac sodique', category: 'Douleur et Inflammation' },
    { name: 'Divido 75 mg', shelf: 'F6', dci: 'Diclofénac sodique', category: 'Douleur et Inflammation' },
    { name: 'Camphobiotic Enfants', shelf: 'F6', dci: 'Formulation respiratoire pédiatrique standard', category: 'Pédiatrie' },
    { name: 'Uroxyb 5 mg', shelf: 'F6', dci: 'Chlorhydrate d\'oxybutynine', category: 'GASTRO' },
    { name: 'Cebrex 100 mg', shelf: 'F6', dci: 'Célécoxib', category: 'Douleur et Inflammation' },
    { name: 'Flovenac L.P. 75 mg', shelf: 'F6', dci: 'Diclofénac sodique', category: 'Douleur et Inflammation' },
    { name: 'Ketomex 100 mg', shelf: 'F6', dci: 'Kétoprofène', category: 'Douleur et Inflammation' },
    { name: 'Gantanil 500 mg', shelf: 'F6', dci: 'Acétylleucine', category: 'Neuro / Muscles' },
    { name: 'Celecox 200 mg', shelf: 'F6', dci: 'Célécoxib', category: 'Douleur et Inflammation' },
    { name: 'Coxibrex 200 mg', shelf: 'F6', dci: 'Célécoxib', category: 'Douleur et Inflammation' },
    { name: 'Fexofénadine Beker 120 mg', shelf: 'F6', dci: 'Chlorhydrate de fexofénadine', category: 'Respiratoire' },
    { name: 'Fexofénadine Beker 180 mg', shelf: 'F6', dci: 'Chlorhydrate de fexofénadine', category: 'Respiratoire' },
    { name: 'Telfast 120 mg', shelf: 'F6', dci: 'Chlorhydrate de fexofénadine', category: 'Respiratoire' },
    { name: 'Telfast 180 mg', shelf: 'F6', dci: 'Chlorhydrate de fexofénadine', category: 'Respiratoire' },
    { name: 'Betaserc 24 mg', shelf: 'F6', dci: 'Dichlorhydrate de bétahistine', category: 'Neuro / Muscles' },
    { name: 'Versec 24 mg', shelf: 'F6', dci: 'Dichlorhydrate de bétahistine', category: 'Neuro / Muscles' },
    { name: 'Phanazol 1%', shelf: 'F6', dci: 'Éconazole nitrate', category: 'Anti-infectieux' },
    { name: 'Mycocide 15 g', shelf: 'F6', dci: 'Piroctone olamine', category: 'Anti-infectieux' },
    { name: 'Cutacnyl 2.5%', shelf: 'F6', dci: 'Peroxyde de benzoyle', category: 'Dermatologie' },
    { name: 'Cutacnyl 5%', shelf: 'F6', dci: 'Peroxyde de benzoyle', category: 'Dermatologie' },
    { name: 'Betacyl Pommade', shelf: 'F6', dci: 'Bétaméthasone + Acide salicylique', category: 'Dermatologie' },
    { name: 'Daktazol 2% Crème', shelf: 'F6', dci: 'Miconazole', category: 'Anti-infectieux' },
    { name: 'Daktazol 2% Pommade', shelf: 'F6', dci: 'Miconazole', category: 'Anti-infectieux' },
    { name: 'Betasone 0.1%', shelf: 'F6', dci: 'Bétaméthasone', category: 'Dermatologie' },
    { name: 'Clotasol 0.05% 45 g', shelf: 'F6', dci: 'Clobetasol propionate', category: 'Dermatologie' },
    { name: 'Deslor 0.5 mg/ml', shelf: 'F5', dci: 'Desloratadine', category: 'Respiratoire' },
    { name: 'Physiolone 1 mg/ml', shelf: 'F5', dci: 'Prednisolone', category: 'Pédiatrie' },
    { name: 'Predo 15 mg/5 ml', shelf: 'F5', dci: 'Prednisolone (Phosphate sodique)', category: 'Pédiatrie' },
    { name: 'Isomag 150 ml', shelf: 'F5', dci: 'Pidolate de magnésium', category: 'Vitamines et Compléments' },
    { name: 'Salbulam 2 mg/5 ml', shelf: 'F5', dci: 'Salbutamol', category: 'Respiratoire' },
    { name: 'Carbodal 5%', shelf: 'F5', dci: 'Carbocistéine', category: 'Respiratoire' },
    { name: 'Augmentin Enfant 100 mg/12.5 mg/ml', shelf: 'F5', dci: 'Amoxicilline + Acide clavulanique', category: 'Anti-infectieux' },
    { name: 'Omnipaque 350 mg I/ml', shelf: 'F5', dci: 'Iohexol', category: 'Ophtalmologie / ORL' },
    { name: 'Gadovist 1.0 mmol/ml', shelf: 'F5', dci: 'Gadobutrol', category: 'Ophtalmologie / ORL' },
    { name: 'Etamcynone 250 mg/2 ml', shelf: 'F5', dci: 'Étamsylate', category: 'CARDIO' },
    { name: 'Clamoclav Enfants 100 mg/12.5 mg', shelf: 'F5', dci: 'Amoxicilline + Acide clavulanique', category: 'Anti-infectieux' },
    { name: 'Meprenal 20 mg/2 ml', shelf: 'F5', dci: 'Méthylprednisolone', category: 'Dermatologie' },
    { name: 'Diclamid 75 mg/3 ml', shelf: 'F5', dci: 'Diclofénac de sodium', category: 'Douleur et Inflammation' },
    { name: 'Genta 80 mg', shelf: 'F5', dci: 'Gentamicine', category: 'Anti-infectieux' },
    { name: 'Cobavit 1000 µg/2 ml', shelf: 'F5', dci: 'Cyanocobalamine (Vitamine B12)', category: 'Vitamines et Compléments' },
    { name: 'Gentaxyn 80 mg/2 ml', shelf: 'F5', dci: 'Gentamicine', category: 'Anti-infectieux' },
    { name: 'Varenox 4000 UI/0.4 ml', shelf: 'F5', dci: 'Énoxaparine sodique', category: 'CARDIO' },
    { name: 'Lamidaz 1% 15 g', shelf: 'F5', dci: 'Clotrimazole', category: 'Anti-infectieux' },
    { name: 'Voltarène 1% 50 g', shelf: 'F5', dci: 'Diclofénac diéthylamine', category: 'Dermatologie' },
    { name: 'Dipronad 7 mg/ml', shelf: 'F5', dci: 'Dipropionate de bétamethasone', category: 'Dermatologie' },
    { name: 'E-RAX 10% 40 g', shelf: 'F5', dci: 'Crotamiton', category: 'Dermatologie' },
    { name: 'Clotasol 0.05% 15 g', shelf: 'F5', dci: 'Clobetasol propionate', category: 'Dermatologie' },
    { name: 'D-Three 200000 UI/ml', shelf: 'F5', dci: 'Cholécalciférol (Vitamine D3)', category: 'Vitamines et Compléments' },
    { name: 'Cephadar 250 mg/5 ml', shelf: 'F4', dci: 'Céfradine', category: 'Anti-infectieux' },
    { name: 'Clamoxyl 250 mg/5 ml', shelf: 'F4', dci: 'Amoxicilline', category: 'Anti-infectieux' },
    { name: 'Clamoxyl 500 mg/5 ml', shelf: 'F4', dci: 'Amoxicilline', category: 'Anti-infectieux' },
    { name: 'Zomax 100 mg/5 ml', shelf: 'F4', dci: 'Azithromycine', category: 'Anti-infectieux' },
    { name: 'Zomax 40 mg/ml', shelf: 'F4', dci: 'Azithromycine', category: 'Anti-infectieux' },
    { name: 'Céfimax 40 mg/5 ml', shelf: 'F4', dci: 'Céfixime', category: 'Anti-infectieux' },
    { name: 'Céfimax 100 mg/5 ml', shelf: 'F4', dci: 'Céfixime', category: 'Anti-infectieux' },
    { name: 'Bioclav Adulte', shelf: 'F4', dci: 'Amoxicilline + Acide clavulanique', category: 'Anti-infectieux' },
    { name: 'Augmentin 1g/125mg', shelf: 'F4', dci: 'Amoxicilline + Acide clavulanique', category: 'Anti-infectieux' },
    { name: 'Augmentin 500mg/62.5mg', shelf: 'F4', dci: 'Amoxicilline + Acide clavulanique', category: 'Anti-infectieux' },
    { name: 'Xyline', shelf: 'F4', dci: 'Spiramycine + Métronidazole', category: 'Anti-infectieux' },
    { name: 'Solupred oro 20 mg', shelf: 'F4', dci: 'Prednisolone', category: 'Dermatologie' },
    { name: 'Amoclan BID', shelf: 'F4', dci: 'Amoxicilline + Acide clavulanique', category: 'Anti-infectieux' },
    { name: 'Ancéfal 250 mg/5 ml', shelf: 'F4', dci: 'Céfalexine', category: 'Anti-infectieux' },
    { name: 'Lexin 1000 mg', shelf: 'F4', dci: 'Céfalexine', category: 'Anti-infectieux' },
    { name: 'Orapen', shelf: 'F4', dci: 'Phénoxyméthylpénicilline (Pénicilline V)', category: 'Anti-infectieux' },
    { name: 'Métronidazole Beker 250 mg', shelf: 'F4', dci: 'Métronidazole', category: 'Anti-infectieux' },
    { name: 'Mycozan', shelf: 'F4', dci: 'Fluconazole', category: 'Anti-infectieux' },
    { name: 'Spiracare', shelf: 'F4', dci: 'Spiramycine', category: 'Anti-infectieux' },
    { name: 'Fucidine enfant 250 mg/5 ml', shelf: 'F4', dci: 'Fusidate de sodium', category: 'Anti-infectieux' },
    { name: 'Ciprolon', shelf: 'F4', dci: 'Ciprofloxacine', category: 'Anti-infectieux' },
    { name: 'Ciprofloxacine 250 mg/500 mg', shelf: 'F4', dci: 'Ciprofloxacine', category: 'Anti-infectieux' },
    { name: 'Vircet 150 mg', shelf: 'F4', dci: 'Fluconazole', category: 'Anti-infectieux' },
    { name: 'Uricare 3 g', shelf: 'F4', dci: 'Fosfomycine trométamol', category: 'Anti-infectieux' },
    { name: 'Pyostacine 500 mg', shelf: 'F4', dci: 'Pristinamycine', category: 'Anti-infectieux' },
    { name: 'Dotur 100 mg', shelf: 'F4', dci: 'Doxycycline', category: 'Anti-infectieux' },
    { name: 'Zynax 500 mg', shelf: 'F4', dci: 'Azithromycine', category: 'Anti-infectieux' },
    { name: 'Proflox 500 mg/750 mg', shelf: 'F4', dci: 'Ciprofloxacine', category: 'Anti-infectieux' },
    { name: 'Zithromax 250 mg/500 mg', shelf: 'F4', dci: 'Azithromycine', category: 'Anti-infectieux' },
    { name: 'Zomax 500 mg', shelf: 'F4', dci: 'Azithromycine', category: 'Anti-infectieux' },
    { name: 'Orogyl', shelf: 'F4', dci: 'Spiramycine + Métronidazole', category: 'Anti-infectieux' },
    { name: 'Bi.Orogyl 1.5M.UI / 250mg', shelf: 'F4', dci: 'Spiramycine + Métronidazole', category: 'Anti-infectieux' },
    { name: 'Oxyptane BR 5 mg', shelf: 'F4', dci: 'Chlorhydrate d\'oxybutynine', category: 'Urologie' },
    { name: 'Nitroxal 100 mg', shelf: 'F4', dci: 'Nitroxoline', category: 'Anti-infectieux' },
    { name: 'Nolib 100 mg', shelf: 'F4', dci: 'Nitroxoline', category: 'Anti-infectieux' },
    { name: 'Cotrimoxal Forte 800 mg/160 mg', shelf: 'F4', dci: 'Sulfaméthoxazole + Triméthoprime', category: 'Anti-infectieux' },
    { name: 'Clamoxyl 1 g', shelf: 'F4', dci: 'Amoxicilline', category: 'Anti-infectieux' },
    { name: 'Xaria 200 mg', shelf: 'F4', dci: 'Célebocoxib', category: 'Neuro / Muscles' },
    { name: 'Zyloric 100 mg', shelf: 'F4', dci: 'Allopurinol', category: 'Endocrinologie et Diabète' },
    { name: 'Curacné 20 mg', shelf: 'F4', dci: 'Isotrétinoïne', category: 'Dermatologie' },
    { name: 'Progestogel 1%', shelf: 'F4', dci: 'Progestérone', category: 'Endocrinologie et Diabète' },
    { name: 'TGC Plus', shelf: 'F4', dci: 'Thiocolchicoside', category: 'Neuro / Muscles' },
    { name: 'Ibuthol 5%/3%', shelf: 'F4', dci: 'Ibuprofène + Menthol', category: 'Dermatologie' },
    {"name": "Solyne C Tonus", "shelf": "G2", "dci": "Vitamine C + D3 + Zinc", "category": "Pédiatrie"},
  {"name": "Multivitamine Kids", "shelf": "G2", "dci": "Multivitamines", "category": "Pédiatrie"},
  {"name": "Apitoux (Pédiactif)", "shelf": "G2", "dci": "Extraits de plantes (Propolis/Thym/Miel)", "category": "Pédiatrie"},
  {"name": "Orofer", "shelf": "G2", "dci": "Complexe d'hydroxyde ferrique-polymaltose", "category": "Pédiatrie"},
  {"name": "Apigrip (Pédiactif)", "shelf": "G2", "dci": "Acérola + Extraits de plantes", "category": "Pédiatrie"},
  {"name": "Omega 3 (Pédiactif)", "shelf": "G2", "dci": "Oméga 3 + Vitamines C, E, A, D", "category": "Pédiatrie"},
  {"name": "Hepalib (Lilium)", "shelf": "G2", "dci": "Silymarine + Vitamines B", "category": "GASTRO"},
  {"name": "Vomi Kid", "shelf": "G2", "dci": "Extrait de gingembre", "category": "Pédiatrie"},
  {"name": "Apéti Kid", "shelf": "G2", "dci": "Stimulant de l'appétit + Vitamines", "category": "Pédiatrie"},
  {"name": "Phybaby", "shelf": "G2", "dci": "Fortifiant naturel (Extraits de plantes)", "category": "Pédiatrie"},
  {"name": "Zeal Kid", "shelf": "G2", "dci": "Zinc + Multivitamines", "category": "Pédiatrie"},
  {"name": "Neocalcigenol", "shelf": "G2", "dci": "Calcium + Vitamine F/D", "category": "Pédiatrie"},
  {"name": "Fortivit (Pédiactif)", "shelf": "G2", "dci": "Gelée Royale + Propolis + Vitamines", "category": "Pédiatrie"},
  {"name": "Sommeil Vit (Pédiactif)", "shelf": "G2", "dci": "Passiflore", "category": "Pédiatrie"},
  {"name": "Grossivit", "shelf": "G2", "dci": "Complément alimentaire (Vitamines / Minéraux)", "category": "Vitamines et Compléments"},
  {"name": "Vitamine E 400 UI (Biomedical)", "shelf": "G2", "dci": "DL-alpha-tocophéryl acétate", "category": "Vitamines et Compléments"},
  {"name": "Soprodim Vit C + Zinc", "shelf": "G2", "dci": "Vitamine C + Zinc", "category": "Vitamines et Compléments"},
  {"name": "Supradyn Énergie", "shelf": "G2", "dci": "Multivitamines + Coenzyme Q10", "category": "Vitamines et Compléments"},
  {"name": "Supradyn Magnésia", "shelf": "G2", "dci": "Magnésium + Vitamines B / Vitamine C", "category": "Vitamines et Compléments"},
  {"name": "Free Move", "shelf": "G2", "dci": "Glucosamine + Chondroïtine + Acide Hyaluronique", "category": "Neuro / Muscles"},
  {"name": "Les-Neuf B", "shelf": "G2", "dci": "Complexe de Vitamines B (B1, B6, B12, etc.)", "category": "Vitamines et Compléments"},
  {"name": "Calcium D3 (Lilium)", "shelf": "G2", "dci": "Calcium + Vitamine D3", "category": "Vitamines et Compléments"},
  {"name": "Vitamin E (Ineldea / Medec)", "shelf": "G2", "dci": "Vitamine E d'origine naturelle", "category": "Vitamines et Compléments"},
  {"name": "Optifolates", "shelf": "G2", "dci": "L-Méthylfolate (Vitamine B9 active)", "category": "Gynécologie & Obstétrique"},
  {"name": "Vitamin E (Meda / Medis)", "shelf": "G2", "dci": "Tocophérol", "category": "Vitamines et Compléments"},
  {"name": "Biomax Oméga 3", "shelf": "G2", "dci": "Oméga 3 (Huile de poisson)", "category": "Vitamines et Compléments"},
  {"name": "Soprodim Omega-3", "shelf": "G2", "dci": "Oméga 3 + Extrait de gingembre", "category": "Vitamines et Compléments"},
  {"name": "Omevie Omega 3 - 1000", "shelf": "G2", "dci": "Oméga 3 + Vitamine E", "category": "Vitamines et Compléments"},
  {"name": "Ginkoloba (Ecovar)", "shelf": "G2", "dci": "Extrait de Ginkgo biloba", "category": "Vitamines et Compléments"},
  {"name": "Soprodim Magnésium 400 mg", "shelf": "G2", "dci": "Bisglycinate de Magnésium", "category": "Vitamines et Compléments"},
  {"name": "Omevie Magvit - 500", "shelf": "G2", "dci": "Magnésium + Vitamines", "category": "Vitamines et Compléments"},
  {"name": "Memoptic 30", "shelf": "G2", "dci": "Citicoline + Ginkgo biloba + Magnésium + Vitamines", "category": "Vitamines et Compléments"},
  {"name": "Nutraxin Magnésium Complexe", "shelf": "G2", "dci": "Magnésium (Citrate, Glycinate, Malate)", "category": "Vitamines et Compléments"},
  {"name": "Vitamine C Upsa Effervescente", "shelf": "G2", "dci": "Acide ascorbique", "category": "Vitamines et Compléments"},
  {"name": "Vitonic Allaitement", "shelf": "G2", "dci": "Vitamines + Minéraux (Spécial allaitement)", "category": "Gynécologie & Obstétrique"},
  {"name": "Calperos", "shelf": "G2", "dci": "Carbonate de calcium", "category": "Vitamines et Compléments"},
  {"name": "Antacid (Bionutrex)", "shelf": "G2", "dci": "Calcium carbonate + Magnésium carbonate", "category": "GASTRO"},
  {"name": "Nutraxin A-Oxi Formule", "shelf": "G2", "dci": "Glutathion + Astaxanthine + Coenzyme Q10 + Resvératrol", "category": "Vitamines et Compléments"},
  {"name": "Phylait", "shelf": "G2", "dci": "Extrait de Fenugrec + Extrait de Withania Somnifera", "category": "Gynécologie & Obstétrique"},
  {"name": "MemoryMax", "shelf": "G2", "dci": "Extrait de Ginkgo-Biloba + Extrait d'Ashwagandha + Oméga-3 + Vitamines", "category": "Vitamines et Compléments"},
  {"name": "Vitaboost (Bionutrex)", "shelf": "G2", "dci": "Vitamines + Minéraux + Extrait de gingembre", "category": "Vitamines et Compléments"},
  {"name": "Lactaboost (Bionutrex)", "shelf": "G2", "dci": "Fenugrec + Chardon-Marie + Vitamines B6, B9, B12", "category": "Gynécologie & Obstétrique"},
  {"name": "Calcitron (Soprodim)", "shelf": "G2", "dci": "Bisglycinate de Calcium + Bisglycinate de Magnésium + Vitamine D3", "category": "Vitamines et Compléments"},
  {"name": "Biotine 10000 µg (Bionutrex)", "shelf": "G2", "dci": "Biotine (Vitamine B8) + Bisglycinate de zinc + Sélénium", "category": "Dermatologie"},
  {"name": "Lilium Gold Mag", "shelf": "G2", "dci": "Complexe de magnésium + Vitamine B6 + Pipérine", "category": "Vitamines et Compléments"},
  {"name": "FertiFit M (Lilium)", "shelf": "G2", "dci": "Complément pour la fertilité masculine (Vitamines / Minéraux)", "category": "Gynécologie & Obstétrique"},
  {"name": "Nutrigest+ Grossesse", "shelf": "G2", "dci": "Acide folique (5-MTHF) + Vitamines + Minéraux", "category": "Gynécologie & Obstétrique"},
  {"name": "Bestfer (Lilium)", "shelf": "G2", "dci": "Fer buvable", "category": "Vitamines et Compléments"},
  {"name": "Ovapure (Thera Sante)", "shelf": "G2", "dci": "Myo-Inositol Pure", "category": "Gynécologie & Obstétrique"},
  {"name": "Bio-Fertyl Femmes (Biomax)", "shelf": "G2", "dci": "Tribulus + Maca + Fertillet + Oméga 3 + Co-Q10 + Vitamines", "category": "Gynécologie & Obstétrique"},
  {"name": "Testo Boost (Bio-Gym)", "shelf": "G2", "dci": "Tribulus + Maca + Guarana + Arginine + Zinc + Vitamines", "category": "Vitamines et Compléments"},
  {"name": "Venotrit", "shelf": "G1", "dci": "Extraits naturels (Phlébotonique)", "category": "CARDIO"},
  {"name": "Orofer Plus", "shelf": "G1", "dci": "Complexe d'hydroxyde ferrique-polymaltose + Acide folique", "category": "Vitamines et Compléments"},
  {"name": "Ferro Sanol Gyn", "shelf": "G1", "dci": "Complexe de glycine sulfate ferreux + Acide folique", "category": "Gynécologie & Obstétrique"},
  {"name": "Tiopam", "shelf": "G1", "dci": "Racécadotril", "category": "GASTRO"},
  {"name": "Diacare", "shelf": "G1", "dci": "Racécadotril", "category": "GASTRO"},
  {"name": "Calmotrin", "shelf": "G1", "dci": "Huiles essentielles / Extraits naturels (Douleurs musculaires)", "category": "Neuro / Muscles"},
  {"name": "Celofon nourrissons", "shelf": "G1", "dci": "Racécadotril", "category": "GASTRO"},
  {"name": "Ultrabiotique Instant", "shelf": "G1", "dci": "Souches microbiotiques (Probiotiques)", "category": "GASTRO"},
  {"name": "Calperos", "shelf": "G1", "dci": "Carbonate de calcium", "category": "Vitamines et Compléments"},
  {"name": "Idéos", "shelf": "G1", "dci": "Calcium + Vitamine D3", "category": "Vitamines et Compléments"},
  {"name": "Endronax", "shelf": "G1", "dci": "Acide alendronique", "category": "Neuro / Muscles"},
  {"name": "Yes Cal + (Lilium)", "shelf": "G1", "dci": "Calcium + Vitamine D3 + K2 + Ca + Mg", "category": "Vitamines et Compléments"},
  {"name": "Zanitra Plus", "shelf": "G1", "dci": "Complément alimentaire", "category": "Vitamines et Compléments"},
  {"name": "DHEA Plus", "shelf": "G1", "dci": "Déhydroépiandrostérone", "category": "Gynécologie & Obstétrique"},
  {"name": "Dédrogyl", "shelf": "G1", "dci": "Calcifédiol", "category": "Vitamines et Compléments"},
  {"name": "Calcibronat", "shelf": "G1", "dci": "Bromo-galactogluconate de calcium", "category": "Vitamines et Compléments"},
  {"name": "Adragyn Gel", "shelf": "G1", "dci": "Gel vaginal raffermissant & rajeunissant", "category": "Gynécologie & Obstétrique"},
  {"name": "Lifunor", "shelf": "G1", "dci": "Flunanderm / Complément", "category": "Vitamines et Compléments"},
  {"name": "Marvelon", "shelf": "G1", "dci": "Désogestrel + Éthinylestradiol", "category": "Gynécologie & Obstétrique"},
  {"name": "Phi Fer", "shelf": "G1", "dci": "Fer + Vitamines", "category": "Vitamines et Compléments"},
  {"name": "Adragyn Sticks", "shelf": "G1", "dci": "Acides aminés / Tonifiant", "category": "Vitamines et Compléments"},
  {"name": "Phi Stop-addic", "shelf": "G1", "dci": "Kudzu (Extrait de racine)", "category": "Vitamines et Compléments"},
  {"name": "Phi Grossesse", "shelf": "G1", "dci": "Multivitamines de grossesse", "category": "Gynécologie & Obstétrique"},
  {"name": "Phi Ginkgo", "shelf": "G1", "dci": "Extrait de Ginkgo biloba", "category": "Vitamines et Compléments"},
  {"name": "Neurovit", "shelf": "G1", "dci": "Vitamines B1 + B6 + B12", "category": "Vitamines et Compléments"},
  {"name": "Utrogestan", "shelf": "G1", "dci": "Progestérone", "category": "Gynécologie & Obstétrique"},
  {"name": "Ferrum (Hausmann)", "shelf": "G1", "dci": "Complexe d'hydroxyde ferrique-polymaltose", "category": "Vitamines et Compléments"},
  {"name": "Menocare Balance", "shelf": "G1", "dci": "Extraits de plantes (Sauge, Gattilier, Dong Quai) + Vitamines", "category": "Gynécologie & Obstétrique"},
  {"name": "Zanitra 5 mg", "shelf": "G1", "dci": "Acide folique (Vitamine B9)", "category": "Vitamines et Compléments"},
  {"name": "Diane 35", "shelf": "G1", "dci": "Acétate de cyprotérone + Éthinylestradiol", "category": "Gynécologie & Obstétrique"},
  {"name": "Porosimax Plus", "shelf": "G1", "dci": "Acide alendronique + Vitamine D3", "category": "Neuro / Muscles"},
  {"name": "Thyrolib (Lilium)", "shelf": "G1", "dci": "L-Tyrosine + Sélénium + Zinc + Vitamines", "category": "Vitamines et Compléments"},
  {"name": "Polygynax", "shelf": "G1", "dci": "Néomycine + Polymyxine B + Nystatine", "category": "Gynécologie & Obstétrique"},
  {"name": "Caspa (Vasu)", "shelf": "G1", "dci": "Extraits de plantes (Antispasmodique naturel)", "category": "GASTRO"},
  {"name": "Genesia (Merinal)", "shelf": "G1", "dci": "Gingembre + Vitamine B6 (Anti-nauséeux)", "category": "Vitamines et Compléments"},
  {"name": "Desonette", "shelf": "G1", "dci": "Désogestrel", "category": "Gynécologie & Obstétrique"},
  {"name": "GynePro+ Grossesse", "shelf": "G1", "dci": "Probiotiques + Metafolin + Oméga 3", "category": "Gynécologie & Obstétrique"},
  {"name": "Marilon", "shelf": "G1", "dci": "Désogestrel + Éthinylestradiol", "category": "Gynécologie & Obstétrique"},
  {"name": "Colpovital", "shelf": "G1", "dci": "Promestriène", "category": "Gynécologie & Obstétrique"},
  {"name": "Cabernex", "shelf": "G1", "dci": "Cabergoline", "category": "Gynécologie & Obstétrique"},
  {"name": "Fumacur", "shelf": "G1", "dci": "Fumarate ferreux", "category": "Vitamines et Compléments"},
  {"name": "GynoDermofix", "shelf": "G1", "dci": "Sertaconazole nitrate", "category": "Gynécologie & Obstétrique"},
  {"name": "ProxyMale Fertilité", "shelf": "G1", "dci": "L-Carnitine + L-Arginine + Coenzyme Q10 + Glutathion + Vitamines", "category": "Gynécologie & Obstétrique"},
  {"name": "Uricitril (Lilium)", "shelf": "G1", "dci": "Acide citrique + Citrate de potassium + Citrate de sodium", "category": "Urologie"},
  {"name": "Vigormax (Soprodim)", "shelf": "G1", "dci": "Extraits de 13 plantes (Désir, Performance, Puissance)", "category": "Vitamines et Compléments"},
  {"name": "Acouphenis (Nutriva)", "shelf": "G1", "dci": "Extraits de plantes (Audition, Stress réduit, Sommeil profond)", "category": "Vitamines et Compléments"},
  {"name": "Sopk Free (Lilium)", "shelf": "G1", "dci": "Myo-inositol + D-chiro-inositol + Acide folique + Vitamines", "category": "Gynécologie & Obstétrique"},
  {"name": "Fertigen Femme", "shelf": "G1", "dci": "Complément alimentaire (Fertilité / Endométriose)", "category": "Gynécologie & Obstétrique"},
  {"name": "Flexicare", "shelf": "G1", "dci": "Chondroïtine + Collagène Type II + Ginkgo Biloba + Calcium + Mg", "category": "Neuro / Muscles"},
  {"name": "Nozinan", "shelf": "F7", "dci": "Lévomépromazine", "category": "Neurologie & Psychiatrie"},
  {"name": "Kepam", "shelf": "F7", "dci": "Lévétiracétam", "category": "Neurologie & Psychiatrie"},
  {"name": "Kepnirol", "shelf": "F7", "dci": "Ropinirole", "category": "Neurologie & Psychiatrie"},
  {"name": "Lanzaprex", "shelf": "F7", "dci": "Olanzapine", "category": "Neurologie & Psychiatrie"},
  {"name": "Amisulpride Beker", "shelf": "F7", "dci": "Amisulpride", "category": "Neurologie & Psychiatrie"},
  {"name": "Carbimol", "shelf": "F7", "dci": "Carbamazépine", "category": "Neurologie & Psychiatrie"},
  {"name": "Gabatrex", "shelf": "F7", "dci": "Gabapentine", "category": "Neurologie & Psychiatrie"},
  {"name": "Stresam", "shelf": "F7", "dci": "Chlorhydrate d'étifoxine", "category": "Neurologie & Psychiatrie"},
  {"name": "Myorelax", "shelf": "F7", "dci": "Tolpérisone", "category": "Neurologie & Psychiatrie"},
  {"name": "Solotik", "shelf": "F7", "dci": "Sertraline HCl", "category": "Neurologie & Psychiatrie"},
  {"name": "Zexil", "shelf": "F7", "dci": "Sertraline", "category": "Neurologie & Psychiatrie"},
  {"name": "Solian", "shelf": "F7", "dci": "Amisulpride", "category": "Neurologie & Psychiatrie"},
  {"name": "Zoloft", "shelf": "F7", "dci": "Sertraline", "category": "Neurologie & Psychiatrie"},
  {"name": "Aripiprazole Beker Oro", "shelf": "F7", "dci": "Aripiprazole", "category": "Neurologie & Psychiatrie"},
  {"name": "Carbimol L.P.", "shelf": "F7", "dci": "Carbamazépine", "category": "Neurologie & Psychiatrie"},
  { name: 'Vomiteb 100 ml sirop', shelf: 'E1', expiry: '09/28', quantity: 2 },
  { name: 'Inphadiam 0.2 mg / ml Sol Buv', shelf: 'E1', expiry: '05/28', quantity: 1 },
  { name: 'Inphadiam 0.2 mg / ml Sol Buv', shelf: 'E1', expiry: '08/28', quantity: 1 },
  { name: 'Maalox F / 250 ml Susp Buv', shelf: 'E1', expiry: '09/28', quantity: 1 },
  { name: 'Isomag 15% Sol Buv', shelf: 'E1', expiry: '11/28', quantity: 2 },
  { name: 'Antag 20mg Gelule', shelf: 'E1', expiry: '09/28', quantity: 2 },
  { name: 'Lomac 20mg Gelule', shelf: 'E1', expiry: '04/28', quantity: 1 },
  { name: 'Proton 20mg Gelule', shelf: 'E1', expiry: '08/28', quantity: 1 },
  { name: 'Dexilant 30mg', shelf: 'E1', expiry: '11/27', quantity: 1 },
  { name: 'Meteo spasmyl 60mg Capsule', shelf: 'E1', expiry: '04/28', quantity: 3 },
  { name: 'Dicetel 100 mg', shelf: 'E1', expiry: '11/28', quantity: 1 },
  { name: 'Omeprotect 20 mg', shelf: 'E1', expiry: '03/27', quantity: 3 },
  { name: 'Proton 10 mg', shelf: 'E1', expiry: '04/28', quantity: 1 },
  { name: 'Proton 20 mg Gélule', shelf: 'E1', expiry: '08/28', quantity: 1 },
{ name: 'Maxilase sirop', shelf: 'E2', expiry: '08/28', quantity: 1 },
  { name: 'Flagyl 125 mg sirop', shelf: 'E2', expiry: '11/28', quantity: 2 },
  { name: 'Isospalgine 0.2% Sol Buv', shelf: 'E2', expiry: '12/28', quantity: 4 },
  { name: 'Rhumafed 2.5mg/60mg/300mg comp', shelf: 'E2', expiry: '11/28', quantity: 1 },
  { name: 'Isobutaline 0.3mg Sol Buv', shelf: 'E2', expiry: '', quantity: 1 },
  { name: 'Theranox 4000 UI (40mg) Sol INJ', shelf: 'E2', expiry: '11/28', quantity: 1 },
  { name: 'Varenox 40mg Sol INJ', shelf: 'E2', expiry: '12/28', quantity: 2 },
  { name: 'Varenox 40mg Sol INJ', shelf: 'E2', expiry: '01/29', quantity: 1 },
  { name: 'Piroxicam 20 mg Sol INJ', shelf: 'E2', expiry: '12/28', quantity: 2 },
  { name: 'Vitamine B12 Razes (cyanocobalamine 1000µg Sol INJ. Buv)', shelf: 'E2', expiry: '09/27', quantity: 2 },
  { name: 'Vitamine B12 Razes (cyanocobalamine 1000µg Sol INJ. Buv)', shelf: 'E2', expiry: '01/28', quantity: 1 },
  { name: 'Meprednal 20 mg Sol INJ', shelf: 'E2', expiry: '11/27', quantity: 1 },
  { name: 'Varenox Sol INJ', shelf: 'E2', expiry: '01/29', quantity: 4 },
  { name: 'Vitamine B12 Geo 1000 µg Amp', shelf: 'E2', expiry: '10/27', quantity: 1 },
  { name: 'Meprednal 40 mg Sol INJ', shelf: 'E2', expiry: '05/27', quantity: 3 },
  { name: 'Lemod 40mg Sol INJ', shelf: 'E2', expiry: '05/27', quantity: 5 },
{ name: 'Co-Dolyc 500mg comp', shelf: 'E3', expiry: '01/29', quantity: 3 },
  { name: 'Sapramol 500mg', shelf: 'E3', expiry: '11/28', quantity: 1 },
  { name: 'D-Three 200 000 UI/ml Amp Buv', shelf: 'E3', expiry: '01/30', quantity: 2 },
  { name: 'D-Three 200 000 UI/ml Amp Buv', shelf: 'E3', expiry: '02/30', quantity: 3 },
  { name: 'D-Three 200 000 UI/ml Amp Buv', shelf: 'E3', expiry: '03/30', quantity: 5 },
  { name: 'Vitamine D3 Razes 200K Amp Buv', shelf: 'E3', expiry: '02/29', quantity: 2 },
  { name: 'Vitamine D3 Razes 200K Amp Buv', shelf: 'E3', expiry: '03/29', quantity: 3 },
  { name: 'Genta 80 mg Amp 2ml', shelf: 'E3', expiry: '11/27', quantity: 1 },
  { name: 'Herba Bio Vit D3', shelf: 'E3', expiry: '11/28', quantity: 2 },
  { name: 'Cefazal 1g Sol INJ Poudre', shelf: 'E3', expiry: '08/27', quantity: 1 },
  { name: 'Gectopen 1.000.000 UI Sol INJ Poudre', shelf: 'E3', expiry: '12/28', quantity: 1 },
  { name: 'Diclamid Sol INJ', shelf: 'E3', expiry: '12/28', quantity: 1 },
  { name: 'Gentaxyn Sol INJ', shelf: 'E3', expiry: '09/29', quantity: 1 },
  { name: 'Bronchocalm 0.2% Adult F/150', shelf: 'A1', expiry: '12/28', quantity: 2 },
  { name: 'Bronchocalm 0.2% Adult F', shelf: 'A1', expiry: '01/29', quantity: 8 },
  { name: 'Obrax 0.3% Collyre', shelf: 'A1', expiry: '01/29', quantity: 1 },
  { name: 'Obrax 0.3% Collyre', shelf: 'A1', expiry: '03/29', quantity: 1 },
  { name: 'Chibrogen 3 mg / ml (0.3%)', shelf: 'A1', expiry: '03/28', quantity: 1 },
  { name: 'Ketoconazole Novageneric', shelf: 'A1', expiry: '01/28', quantity: 1 },
  { name: 'Zalerg 0.25 mg/ml coll', shelf: 'A1', expiry: '05/27', quantity: 1 },
  { name: 'Cronolone Neo 3g pde oph', shelf: 'A1', expiry: '02/28', quantity: 3 },
  { name: 'Artelac 3.2 mg / ml Collyre', shelf: 'A1', expiry: '09/28', quantity: 1 },
  { name: 'Rinonide 64 µg / Dose', shelf: 'A1', expiry: '04/27', quantity: 1 },
  { name: 'Optifjam 0.1% Collyre', shelf: 'A1', expiry: '05/27', quantity: 1 },
  { name: 'Optipred 10 mg / ml F/5ml Collyre', shelf: 'A1', expiry: '02/27', quantity: 1 },
  { name: 'Aqualarm 0.2% Hyaluronic Acid', shelf: 'A1', expiry: '08/27', quantity: 1 },
  { name: 'Cozolamide 20 mg/5ml/ml', shelf: 'A1', expiry: '02/28', quantity: 1 },
  { name: 'Clenil Forte 250 µg bouffe Aerosol F/200', shelf: 'A1', expiry: '06/28', quantity: 1 },
  { name: 'Vibac 1.5% 10 mlCollyre', shelf: 'A1', expiry: '01/27', quantity: 1 },
  { name: 'Vibac 1.5% 10 mlCollyre', shelf: 'A1', expiry: '11/27', quantity: 2 },
  { name: 'Dormazine 100 mg Comp DRG B/30', shelf: 'A1', expiry: '03/29', quantity: 2 },
  { name: 'Nasalix 55 µg', shelf: 'A1', expiry: '08/27', quantity: 1 },
  { name: 'Fluidabak 1.5% Collyre F/10ml', shelf: 'A1', expiry: '12/27', quantity: 1 },
  { name: 'Opadex 1 mg/3500 UI/ml Collyre F/5ml', shelf: 'A1', expiry: '10/27', quantity: 1 },
  { name: 'Maxilase 200 U. Sirop', shelf: 'A2', expiry: '09/27', quantity: 2 },
  { name: 'Maxilase 200 U. Sirop', shelf: 'A2', expiry: '03/27', quantity: 3 },
  { name: 'Maxilase 200 U. Sirop', shelf: 'A2', expiry: '06/27', quantity: 6 },
  { name: 'Geltime LP 1mg Gel', shelf: 'A2', expiry: '09/27', quantity: 2 },
  { name: 'Geltime LP 1mg Gel', shelf: 'A2', expiry: '11/27', quantity: 1 },
  { name: 'Toplexil sirop', shelf: 'A2', expiry: '02/29', quantity: 2 },
  { name: 'Naabak 4.9g/100ml Coll', shelf: 'A2', expiry: '10/27', quantity: 3 },
  { name: 'Fucidine 2%', shelf: 'A2', expiry: '08/28', quantity: 1 },
  { name: 'Fucidine 2%', shelf: 'A2', expiry: '11/28', quantity: 1 },
  { name: 'Pulmicort', shelf: 'A2', expiry: '05/27', quantity: 1 },
  { name: 'Zeta 2% crème et pommade', shelf: 'A2', expiry: '09/28', quantity: 1 },
  { name: 'Desomedine 0.1%', shelf: 'A2', expiry: '08/28', quantity: 1 },
  { name: 'gatifloxacine coll', shelf: 'A2', expiry: '12/27', quantity: 1 },
  { name: 'Liposic 0.2% Gel', shelf: 'A2', expiry: '09/28', quantity: 1 },
  { name: 'Clomycine 1% pde', shelf: 'A2', expiry: '12/28', quantity: 2 },
  { name: 'Sasabec 50 µg susp', shelf: 'A2', expiry: '01/28', quantity: 1 },
  { name: 'Sasabec 50 µg susp', shelf: 'A2', expiry: '04/28', quantity: 1 },
  { name: 'Respinhal 0.05%', shelf: 'A2', expiry: '03/29', quantity: 1 },
  { name: 'Flixotide 50 µg', shelf: 'A2', expiry: '02/27', quantity: 1 },
  { name: 'Cozolamide', shelf: 'A2', expiry: '11/27', quantity: 1 },
  { name: 'Nasalix', shelf: 'A2', expiry: '04/27', quantity: 1 },
  { name: 'Respyfor 12 µg', shelf: 'A2', expiry: '01/28', quantity: 2 },
  { name: 'Fluidabak', shelf: 'A2', expiry: '05/27', quantity: 1 },
  { name: 'Toplexil Sol Buv', shelf: 'A3', expiry: '03/28', quantity: 4 },
  { name: 'Toplexil Sol Buv', shelf: 'A3', expiry: '10/28', quantity: 5 },
  { name: 'Toplexil Sol Buv', shelf: 'A3', expiry: '01/29', quantity: 2 },
  { name: 'Toplexil Sol Buv', shelf: 'A3', expiry: '02/29', quantity: 1 },
  { name: 'Ventoline', shelf: 'A3', expiry: '07/27', quantity: 4 },
  { name: 'Ventoline', shelf: 'A3', expiry: '09/27', quantity: 1 },
  { name: 'Theolose 3%', shelf: 'A3', expiry: '08/27', quantity: 2 },
  { name: 'Oricalm 4mg / ml', shelf: 'A3', expiry: '03/28', quantity: 1 },
  { name: 'Mycocide 1%', shelf: 'A3', expiry: '01/27', quantity: 1 },
  { name: 'Mycocide 1%', shelf: 'A3', expiry: '11/28', quantity: 3 },
  { name: 'Mycocide 1%', shelf: 'A3', expiry: '01/29', quantity: 3 },
  { name: 'Detrocyll 3%', shelf: 'A3', expiry: '10/28', quantity: 2 },
  { name: 'Indocollyre 0.1% B20', shelf: 'A3', expiry: '11/26', quantity: 2 },
  { name: 'Indocollyre 0.1% F/5ml', shelf: 'A3', expiry: '03/27', quantity: 1 },
  { name: 'Indocollyre 0.1% F/5ml', shelf: 'A3', expiry: '03/27', quantity: 1 },
  { name: 'Toplexil G 100ml Sol Buv', shelf: 'A4', expiry: '11/28', quantity: 3 },
  { name: 'Toplexil G 100ml Sol Buv', shelf: 'A4', expiry: '02/29', quantity: 4 },
  { name: 'Predo 15mg/5ml Sirop', shelf: 'A4', expiry: '09/27', quantity: 2 },
  { name: 'Tobradex Cool Gel', shelf: 'A4', expiry: '01/28', quantity: 1 },
  { name: 'Tobradex Cool Gel', shelf: 'A4', expiry: '11/28', quantity: 1 },
  { name: 'Tobradex Cool Gel', shelf: 'A4', expiry: '12/28', quantity: 3 },
  { name: 'Fumaceur 200 mg comp', shelf: 'A4', expiry: '02/28', quantity: 1 },
  { name: 'Fumaceur 200 mg comp', shelf: 'A4', expiry: '01/29', quantity: 2 },
  { name: 'Fumaceur 200 mg comp', shelf: 'A4', expiry: '02/29', quantity: 1 },
  { name: 'Trifer For 100 mg comp', shelf: 'A4', expiry: '02/28', quantity: 3 },
  { name: 'Duphaston 10 mg comp', shelf: 'A4', expiry: '04/30', quantity: 4 },
  { name: 'Duphaston 10 mg comp', shelf: 'A4', expiry: '10/30', quantity: 2 },
  { name: 'Predo 15mg/5ml Sirop', shelf: 'A5', expiry: '09/27', quantity: 6 },
  { name: 'Algifen 20 mg / ml', shelf: 'A5', expiry: '10/27', quantity: 2 },
  { name: 'Algifen 20 mg / ml', shelf: 'A5', expiry: '12/27', quantity: 1 },
  { name: 'Tabiflex cool 1% Gel', shelf: 'A5', expiry: '12/28', quantity: 2 },
  { name: 'Xydol 600 mg comp', shelf: 'A5', expiry: '11/28', quantity: 1 },
  { name: 'Supremase 150 mg', shelf: 'A5', expiry: '03/28', quantity: 1 },
  { name: 'Celecox 200mg gélule', shelf: 'A5', expiry: '02/28', quantity: 1 },
  { name: 'Myo Xydol 500mg/200mg comp', shelf: 'A5', expiry: '09/28', quantity: 1 },
  { name: 'Ibufrofene beker 600mg comp', shelf: 'A5', expiry: '12/27', quantity: 1 },
  { name: 'Precortyl 5mg capsule', shelf: 'A5', expiry: '02/29', quantity: 2 },
  { name: 'Rapidus 50mg comp', shelf: 'A5', expiry: '10/28', quantity: 1 },
  { name: 'No pain DS 550mg comp', shelf: 'A5', expiry: '06/28', quantity: 1 },
  { name: 'Duphaston 10mg comp', shelf: 'A5', expiry: '04/30', quantity: 4 },
  { name: 'Predo 15mg/5ml sirop', shelf: 'A6', expiry: '09/27', quantity: 5 },
  { name: 'Tabeta 0.5mg/ml Gouttes Buv', shelf: 'A6', expiry: '06/28', quantity: 1 },
  { name: 'Domperone 1mg/ml susp Buv', shelf: 'A6', expiry: '08/28', quantity: 1 },
  { name: 'Loradine 0.1g/100ml sirop', shelf: 'A6', expiry: '07/28', quantity: 1 },
  { name: 'Deslor 0.5mg/ml sirop', shelf: 'A6', expiry: '10/28', quantity: 1 },
  { name: 'Loradess 0.5mg/ml sirop', shelf: 'A6', expiry: '11/27', quantity: 3 },
  { name: 'Lomazel 150 mg', shelf: 'A6', expiry: '08/28', quantity: 1 },
  { name: 'Flazol 500mg comp', shelf: 'A6', expiry: '10/28', quantity: 1 },
  { name: 'Supremase 150 mg', shelf: 'A6', expiry: '10/28', quantity: 1 },
  { name: 'Imuzole 500mg comp', shelf: 'A6', expiry: '02/29', quantity: 1 },
  { name: 'Imuzole 250mg comp', shelf: 'A6', expiry: '04/27', quantity: 1 },
  { name: 'Proctolon 10mg/10mg suppo', shelf: 'A6', expiry: '06/27', quantity: 4 },
  { name: 'Spasmol 150/150 mg', shelf: 'A6', expiry: '11/28', quantity: 1 },
  { name: 'Solupred oro 5mg comp', shelf: 'A6', expiry: '12/26', quantity: 1 },
  { name: 'Solupred oro 20mg comp', shelf: 'A6', expiry: '05/27', quantity: 1 },
  { name: 'Glycerine Ls Adulte suppo', shelf: 'A6', expiry: '09/28', quantity: 2 },
  { name: 'Glycerine Ls Bebe suppo', shelf: 'A6', expiry: '09/28', quantity: 1 },
  { name: 'Celecox 200mg Gelule', shelf: 'A6', expiry: '02/28', quantity: 2 },
  { name: 'Clofenal 100mg suppo', shelf: 'A6', expiry: '01/29', quantity: 1 },
  { name: 'Clofenal 100mg suppo', shelf: 'A6', expiry: '03/29', quantity: 1 },
  { name: 'Camphobiotic 0.02-0.08 suppo', shelf: 'A6', expiry: '10/29', quantity: 2 },
  { name: 'Predo 15mg/5ml sirop', shelf: 'A7', expiry: '09/27', quantity: 4 },
  { name: 'Meteolax 125/80mg Gélule', shelf: 'A7', expiry: '01/28', quantity: 1 },
  { name: 'Simexane 125/80mg Gélule', shelf: 'A7', expiry: '11/28', quantity: 1 },
  { name: 'Simexane 125/80mg Gélule', shelf: 'A7', expiry: '01/29', quantity: 1 },
  { name: 'Nobac gout Anis 50mg/26.7mg/ml', shelf: 'A7', expiry: '10/27', quantity: 1 },
  { name: 'Nobac 50mg susp Buv', shelf: 'A7', expiry: '11/27', quantity: 1 },
  { name: 'Peptidoc 250mg/5ml Susp Buv', shelf: 'A7', expiry: '07/27', quantity: 1 },
  { name: 'Isolact 66.7% solution', shelf: 'A7', expiry: '01/29', quantity: 4 },
  { name: 'Gatimox 500mg susp sachet', shelf: 'A7', expiry: '06/27', quantity: 1 },
  { name: 'Flumox 20mg/ml susp buv', shelf: 'A7', expiry: '11/27', quantity: 1 },
  { name: 'Peridactine 4mg comp', shelf: 'A7', expiry: '02/29', quantity: 2 },
  { name: 'Pinatel 100mg comp', shelf: 'A7', expiry: '09/28', quantity: 1 },
  { name: 'Telfadine 120 mg', shelf: 'A7', expiry: '11/27', quantity: 1 },
  { name: 'Telfast 120mg comp', shelf: 'A7', expiry: '04/28', quantity: 1 },
  { name: 'Telfast 120mg comp', shelf: 'A7', expiry: '05/28', quantity: 1 },
  { name: 'Telfast 180 mg comp', shelf: 'A7', expiry: '12/27', quantity: 1 },
  { name: 'Prednisolone oro beker 20mg comp', shelf: 'A7', expiry: '12/28', quantity: 9 },
  { name: 'Sulpiride merinal 50mg gelule', shelf: 'A7', expiry: '11/28', quantity: 1 },
  { name: 'Hycosone 10mg', shelf: 'A7', expiry: '04/27', quantity: 1 },
  { name: 'Hycosone 10mg', shelf: 'A7', expiry: '05/27', quantity: 1 },
  { name: 'Isoffine 88.7% 150ml Sol Buv', shelf: 'A8', expiry: '10/28', quantity: 1 },
  { name: 'Isoffine 88.7% 150ml Sol Buv', shelf: 'A8', expiry: '02/29', quantity: 2 },
  { name: 'Kaligon sans sucre 15%', shelf: 'A8', expiry: '07/27', quantity: 1 },
  { name: 'Trimebutine Susp buv', shelf: 'A8', expiry: '12/28', quantity: 3 },
  { name: 'Trimebutine Susp buv', shelf: 'A8', expiry: '01/29', quantity: 2 },
  { name: 'Trimebutine Susp buv', shelf: 'A8', expiry: '02/29', quantity: 1 },
  { name: 'Trimebutine Biocare 200mg comp', shelf: 'A8', expiry: '02/29', quantity: 3 },
  { name: 'Esoproton 30 mg', shelf: 'A8', expiry: '09/28', quantity: 4 },
  { name: 'Riabal 30 mg', shelf: 'A8', expiry: '10/29', quantity: 1 },
  { name: 'Riabal 30 mg', shelf: 'A8', expiry: '11/29', quantity: 1 },
  { name: 'Phloroglucinol MM 80mg comp', shelf: 'A8', expiry: '12/27', quantity: 1 },
  { name: 'Bedelix', shelf: 'A8', expiry: '?', quantity: 1 },
  { name: 'Smecta', shelf: 'A8', expiry: '?', quantity: 1 },
  { name: 'Dexeryl Crème', shelf: 'B1', expiry: '03/28', quantity: 4 },
  { name: 'Polydermyl', shelf: 'B1', expiry: '', quantity: 1 },
  { name: 'Ibuthol 5% Crème derm', shelf: 'B1', expiry: '04/28', quantity: 1 },
  { name: 'Polydexa', shelf: 'B1', expiry: '05/28', quantity: 1 },
  { name: 'Ketum 2.5% Gel derm', shelf: 'B1', expiry: '08/28', quantity: 1 },
  { name: 'Adapalene 0.1% crème', shelf: 'B1', expiry: '02/27', quantity: 1 },
  { name: 'Cabernex 0.5 mg comp', shelf: 'B1', expiry: '12/27', quantity: 1 },
  { name: 'Locoid 1% crème épaisse', shelf: 'B1', expiry: '06/27', quantity: 1 },
  { name: 'Luterol 5mg comp', shelf: 'B1', expiry: '07/28', quantity: 1 },
  { name: 'Belsol', shelf: 'B1', expiry: '12/27', quantity: 1 },
  { name: 'Gynodermofix', shelf: 'B1', expiry: '10/28', quantity: 1 },
  { name: 'Isomedine 0.1% Sol derm', shelf: 'B2', expiry: '11/28', quantity: 1 },
  { name: 'Prospan 0.134g sirop', shelf: 'B2', expiry: '06/28', quantity: 1 },
  { name: 'Prospan 0.134g sirop', shelf: 'B2', expiry: '11/28', quantity: 1 },
  { name: 'Polydermyl creme', shelf: 'B2', expiry: '01/29', quantity: 1 },
  { name: 'Ketoconazole 2 % shampooing', shelf: 'B2', expiry: '11/27', quantity: 1 },
  { name: 'Ketoconazole 2 % shampooing', shelf: 'B2', expiry: '01/28', quantity: 1 },
  { name: 'Vavo 2% shampooing', shelf: 'B2', expiry: '03/28', quantity: 2 },
  { name: 'Ketoconazole Gel', shelf: 'B2', expiry: '11/27', quantity: 1 },
  { name: 'Ketoconazole Gel', shelf: 'B2', expiry: '05/27', quantity: 1 },
  { name: 'Voltarene 1% Gel', shelf: 'B2', expiry: '12/28', quantity: 1 },
  { name: 'Clotasol 0.05% pommade', shelf: 'B2', expiry: '10/27', quantity: 3 },
  { name: 'Douce Plus pommade 40g', shelf: 'B2', expiry: '03/29', quantity: 1 },
  { name: 'Mytricine 10% Sol Buv', shelf: 'B2', expiry: '12/27', quantity: 1 },
  { name: 'Mytricine 10% Sol Buv', shelf: 'B2', expiry: '01/28', quantity: 1 },
  { name: 'Meliane 20 µg / 75 µg comp', shelf: 'B2', expiry: '01/28', quantity: 1 },
  { name: 'Harolyd Rheumaflex pommade Cremegel', shelf: 'B2', expiry: '07/27', quantity: 1 },
  { name: 'Polygynix', shelf: 'B2', expiry: '01/27', quantity: 1 },
  { name: 'Colmotrine', shelf: 'B2', expiry: '11/28', quantity: 1 },
  { name: 'Progynova 21 2mg comp', shelf: 'B2', expiry: '08/29', quantity: 3 },
  { name: 'Utrogestan 200mg capsules molles', shelf: 'B2', expiry: '02/27', quantity: 1 },
  { name: 'Luterol 5mg comp', shelf: 'B2', expiry: '07/28', quantity: 1 },
  { name: 'Progeva 200mg capsules molles', shelf: 'B2', expiry: '01/27', quantity: 1 },
  { name: 'Dicynone 250mg comp', shelf: 'B2', expiry: '05/30', quantity: 2 },
  { name: 'Calcial 10%', shelf: 'B3', expiry: '10/28', quantity: 1 },
  { name: 'Ibuthol Gel', shelf: 'B3', expiry: '04/28', quantity: 1 },
  { name: 'Histagan Sol Buv', shelf: 'B3', expiry: '11/28', quantity: 3 },
  { name: 'Soluxol 3mg Sol Buv', shelf: 'B3', expiry: '08/28', quantity: 1 },
  { name: 'IXol 0.3% Sol Buv', shelf: 'B3', expiry: '06/28', quantity: 1 },
  { name: 'Sinecod 1.5 mg sirop', shelf: 'B3', expiry: '06/28', quantity: 4 },
  { name: 'Doliprane 2.4% Susp Buv', shelf: 'B3', expiry: '01/27', quantity: 4 },
  { name: 'Doliprane 2.4% Susp Buv', shelf: 'B3', expiry: '01/28', quantity: 1 },
  { name: 'Dolpriv 150 mg / 5ml Sol Buv', shelf: 'B3', expiry: '04/27', quantity: 2 },
  { name: 'Newderma Crème', shelf: 'B3', expiry: '04/26', quantity: 3 },
  { name: 'E-Rax 10%', shelf: 'B3', expiry: '08/27', quantity: 1 },
  { name: 'Ibuthol 5% / 3% Crème derm', shelf: 'B3', expiry: '12/27', quantity: 3 },
  { name: 'Ibuthol 5% / 3% Crème derm', shelf: 'B3', expiry: '04/28', quantity: 1 },
  { name: 'Optifolates 5mg comp', shelf: 'B3', expiry: '12/26', quantity: 1 },
  { name: 'Diane 35 2 mg comp', shelf: 'B3', expiry: '10/27', quantity: 2 },
  { name: 'Cicatrine', shelf: 'B3', expiry: '07/28', quantity: 1 },
  { name: 'Ferro Sanol gyn 454.13 mg', shelf: 'B3', expiry: '04/28', quantity: 1 },
  { name: 'Microval 0.03 mg comp', shelf: 'B3', expiry: '09/26', quantity: 1 },
  { name: 'Colpovital 10mg', shelf: 'B3', expiry: '03/27', quantity: 1 },
  { name: 'Marilon 150 µg / 20 µg comp', shelf: 'B3', expiry: '10/27', quantity: 1 },
  { name: 'Marilon 150 µg / 20 µg comp', shelf: 'B3', expiry: '02/28', quantity: 1 },
  { name: 'Marvelon 0.15 mg comp', shelf: 'B3', expiry: '08/26', quantity: 1 },
  { name: 'Protoux Arab Ph Sirop', shelf: 'B4', expiry: '10/26', quantity: 3 },
  { name: 'Dolpriv 150 mg Sol Buv', shelf: 'B4', expiry: '01/29', quantity: 2 },
  { name: 'Bronchopan 0.7% sirop', shelf: 'B4', expiry: '08/28', quantity: 4 },
  { name: 'Efferalgan Pediatrique 3% Sol Buv', shelf: 'B4', expiry: '09/28', quantity: 2 },
  { name: 'Efferalgan Pediatrique 3% Sol Buv', shelf: 'B4', expiry: '03/29', quantity: 1 },
  { name: 'Efferalgan Pediatrique 3g / 100ml Sol Buv', shelf: 'B4', expiry: '10/28', quantity: 3 },
  { name: 'Efferalgan Vit C 500 mg / 200 mg comp', shelf: 'B4', expiry: '03/28', quantity: 1 },
  { name: 'Kefentech 30 mg Patch', shelf: 'B4', expiry: '03/28', quantity: 2 },
  { name: 'Carbomex 2% Sirop', shelf: 'B5', expiry: '06/27', quantity: 2 },
  { name: 'Zecuf Sirop Sol Buv', shelf: 'B5', expiry: '10/30', quantity: 14 },
  { name: 'Bronchonet Sans sucre 100ml sirop', shelf: 'B5', expiry: '09/26', quantity: 1 },
  { name: 'Bronchonet Sans sucre 100ml sirop', shelf: 'B5', expiry: '04/27', quantity: 2 },
  { name: 'Bionime', shelf: 'B5', expiry: '11/27', quantity: 1 },
  { name: 'Migrazen 0.5 mg comp', shelf: 'B5', expiry: '06/27', quantity: 1 },
  { name: 'Gantanil 500 mg comp', shelf: 'B5', expiry: '01/28', quantity: 1 },
  { name: 'Tanganil pro 500 mg', shelf: 'B5', expiry: '12/27', quantity: 1 },
  { name: 'Tanganil pro 500 mg', shelf: 'B5', expiry: '01/29', quantity: 2 },
  { name: 'Algifen 20mg / ml', shelf: 'B5', expiry: '10/27', quantity: 1 },
  { name: 'Assess AG', shelf: 'B5', expiry: '08/27', quantity: 7 },
  { name: 'Vital check', shelf: 'B5', expiry: '10/27', quantity: 1 },
  { name: 'Vital check', shelf: 'B5', expiry: '11/27', quantity: 2 },
  { name: 'Bionime Lecteur', shelf: 'B5', expiry: '99/99', quantity: 1 },
  { name: 'L Vital check', shelf: 'B5', expiry: '99/99', quantity: 1 },
  { name: 'Bandelette Diagnocheck smart', shelf: 'B5', expiry: '09/27', quantity: 1 },
  { name: 'Zecuf sirop Sol Buv', shelf: 'B6', expiry: '10/30', quantity: 3 },
  { name: 'Carbomex 5% sirop', shelf: 'B6', expiry: '12/27', quantity: 2 },
  { name: 'Toux Kid sirop', shelf: 'B6', expiry: '02/28', quantity: 4 },
  { name: 'Levothyrox 25 µg comp', shelf: 'B6', expiry: '06/28', quantity: 1 },
  { name: 'Levothyrox 25 µg comp', shelf: 'B6', expiry: '07/28', quantity: 1 },
  { name: 'Levothyrox 25 µg comp', shelf: 'B6', expiry: '09/28', quantity: 2 },
  { name: 'Levothyrox 100 µg', shelf: 'B6', expiry: '03/28', quantity: 4 },
  { name: 'Levothyrox 100 µg', shelf: 'B6', expiry: '04/28', quantity: 1 },
  { name: 'Assess Ag', shelf: 'B6', expiry: '08/27', quantity: 4 },
  { name: 'Vital check', shelf: 'B6', expiry: '01/28', quantity: 1 },
  { name: 'Levothyrox 100 µg comp', shelf: 'B6', expiry: '06/28', quantity: 2 },
  { name: 'Levothyrox 100 µg comp', shelf: 'B6', expiry: '10/28', quantity: 1 },
  { name: 'Levothyrox 50 µg comp', shelf: 'B7', expiry: '07/28', quantity: 2 },
  { name: 'Levothyrox 50 µg comp', shelf: 'B7', expiry: '09/28', quantity: 3 },
  { name: 'Levothyrox 50 µg comp', shelf: 'B7', expiry: '10/28', quantity: 2 },
  { name: 'Levothyrox 50 µg comp', shelf: 'B7', expiry: '03/28', quantity: 2 },
  { name: 'Levothyrox 75 µg', shelf: 'B7', expiry: '06/28', quantity: 5 },
  { name: 'Levothyrox 75 µg', shelf: 'B7', expiry: '10/28', quantity: 2 },
  { name: 'Levothyrox 100 µg', shelf: 'B7', expiry: '06/28', quantity: 5 },
  { name: 'Levothyrox 100 µg', shelf: 'B7', expiry: '07/28', quantity: 1 },
  { name: 'Levothyrox 100 µg', shelf: 'B7', expiry: '10/28', quantity: 4 },
  { name: 'Trimbutine-B 0.787g/100g susp Buv', shelf: 'B7', expiry: '01/29', quantity: 8 },
  { name: 'Biovex 500mg poudre sachet', shelf: 'B7', expiry: '02/28', quantity: 3 },
  { name: 'Efferalgan 1000 mg', shelf: 'D9', expiry: '01/28', quantity: 3 },
  { name: 'Doliprane 200 mg suppo', shelf: 'D9', expiry: '03/29', quantity: 1 },
  { name: 'Efferalgan codeine 500 mg', shelf: 'D9', expiry: '09/28', quantity: 2 },
  { name: 'Paramol 1000 mg comp', shelf: 'D9', expiry: '04/28', quantity: 1 },
  { name: 'Sapramol 300 mg sachet', shelf: 'D9', expiry: '01/29', quantity: 1 },
  { name: 'Doliprane 1000 mg', shelf: 'D9', expiry: '10/28', quantity: 2 },
  { name: 'Coparamol Fort 30 / 500 mg comp', shelf: 'D9', expiry: '04/28', quantity: 1 },
  { name: 'Coexpanadol 400 mg / 20 mg', shelf: 'D9', expiry: '03/29', quantity: 1 },
  { name: 'Doliprane 150 mg suppo', shelf: 'D9', expiry: '02/29', quantity: 1 },
  { name: 'Doliprane 300 mg suppo', shelf: 'D9', expiry: '02/29', quantity: 1 },
  { name: 'Glucophage 500 mg comp', shelf: 'D9', expiry: '03/31', quantity: 6 },
  { name: 'Glucophage 850 mg comp', shelf: 'D9', expiry: '03/31', quantity: 6 },
  { name: 'D-Three 200.000 UI Amp Buv', shelf: 'D9', expiry: '11/29', quantity: 2 },
  { name: 'Diamicron 60 mg', shelf: 'D8', expiry: '12/28', quantity: 1 },
  { name: 'Diamicron 60 mg', shelf: 'D8', expiry: '01/29', quantity: 1 },
  { name: 'Diamicron 60 mg', shelf: 'D8', expiry: '02/29', quantity: 1 },
  { name: 'Diamicron 30 mg', shelf: 'D8', expiry: '10/28', quantity: 6 },
  { name: 'Diamicron 30 mg', shelf: 'D8', expiry: '04/28', quantity: 1 },
  { name: 'Diamicron 30 mg', shelf: 'D8', expiry: '11/28', quantity: 1 },
  { name: 'Diaphag 80 mg comp', shelf: 'D8', expiry: '12/28', quantity: 1 },
  { name: 'Glucophage 500 mg comp', shelf: 'D8', expiry: '03/31', quantity: 2 },
  { name: 'Glucophage 850 mg comp', shelf: 'D8', expiry: '02/31', quantity: 3 },
  { name: 'Glucophage 850 mg comp', shelf: 'D8', expiry: '02/31', quantity: 5 },
  { name: 'D-Three 200.000 UI/ml Amp Buv', shelf: 'D8', expiry: '01/30', quantity: 4 },
  { name: 'D-Three 200.000 UI/ml Amp Buv', shelf: 'D8', expiry: '11/29', quantity: 1 },
  { name: 'D-Three 200.000 UI/ml Amp Buv', shelf: 'D8', expiry: '03/30', quantity: 1 },
  { name: 'Vit D3 Salem 200.000 Amp Buv', shelf: 'D8', expiry: '01/28', quantity: 1 },
  { name: 'Plavix 75 mg comp pelli', shelf: 'D7', expiry: '03/28', quantity: 1 },
  { name: 'Plavix 75 mg comp pelli', shelf: 'D7', expiry: '05/28', quantity: 1 },
  { name: 'Novoformine 1000 mg comp pelli', shelf: 'D7', expiry: '04/28', quantity: 2 },
  { name: 'Novoformine 1000 mg comp pelli', shelf: 'D7', expiry: '03/28', quantity: 2 },
  { name: 'Aspec 100 mg comp sec', shelf: 'D7', expiry: '01/28', quantity: 1 },
  { name: 'Aspec 100 mg comp sec', shelf: 'D7', expiry: '02/28', quantity: 2 },
  { name: 'Novoformine 500 mg comp', shelf: 'D7', expiry: '01/30', quantity: 2 },
  { name: 'Novoformine 500 mg comp', shelf: 'D7', expiry: '03/30', quantity: 1 },
  { name: 'Glucophage 1000 mg', shelf: 'D7', expiry: '02/29', quantity: 4 },
  { name: 'Glucophage 850 mg comp pelli', shelf: 'D7', expiry: '01/31', quantity: 1 },
  { name: 'Glucophage 850 mg comp pelli', shelf: 'D7', expiry: '02/31', quantity: 1 },
  { name: 'Bisoprolol Beker 5mg comp pelli', shelf: 'D7', expiry: '11/28', quantity: 1 },
  { name: 'Molsidomine Beker 2mg comp', shelf: 'D7', expiry: '05/29', quantity: 1 },
  { name: 'Amlodipine Beker 5mg Gelule', shelf: 'D7', expiry: '02/29', quantity: 1 },
  { name: 'Aldomet 250 mg comp enro', shelf: 'D7', expiry: '11/27', quantity: 1 },
  { name: 'Aldomet 250 mg comp enro', shelf: 'D7', expiry: '05/28', quantity: 1 },
  { name: 'Zanidip 10 mg comp', shelf: 'D7', expiry: '11/28', quantity: 1 },
  { name: 'Zanidip 10 mg comp', shelf: 'D7', expiry: '03/29', quantity: 2 },
  { name: 'Zanidip 10 mg comp', shelf: 'D7', expiry: '04/29', quantity: 2 },
  { name: 'Irys 1mg comp pelli', shelf: 'D6', expiry: '07/28', quantity: 1 },
  { name: 'Irys 2mg comp pelli', shelf: 'D6', expiry: '07/28', quantity: 2 },
  { name: 'Irys 3mg comp pelli', shelf: 'D6', expiry: '10/28', quantity: 1 },
  { name: 'Irys 4mg comp pelli', shelf: 'D6', expiry: '01/29', quantity: 1 },
  { name: 'Irys 6mg comp pelli', shelf: 'D6', expiry: '05/28', quantity: 2 },
  { name: 'Stagid 700 mg comp', shelf: 'D6', expiry: '01/28', quantity: 2 },
  { name: 'Stagid 700 mg comp', shelf: 'D6', expiry: '09/28', quantity: 2 },
  { name: 'Novoformine 500mg comp', shelf: 'D6', expiry: '01/30', quantity: 1 },
  { name: 'Novoformine 500mg comp', shelf: 'D6', expiry: '03/30', quantity: 1 },
  { name: 'Novoformine 850mg comp', shelf: 'D6', expiry: '04/30', quantity: 1 },
  { name: 'Novoformine 1000mg comp', shelf: 'D6', expiry: '04/28', quantity: 1 },
  { name: 'Coversyl 5mg comp', shelf: 'D6', expiry: '11/28', quantity: 1 },
  { name: 'coAprovel 300/25mg Comp', shelf: 'D6', expiry: '01/27', quantity: 1 },
  { name: 'Biprotens 5mg comp', shelf: 'D6', expiry: '07/29', quantity: 1 },
  { name: 'Cresovast 10mg comp pelli', shelf: 'D6', expiry: '05/28', quantity: 1 },
  { name: 'superstat 10mg comp pelli', shelf: 'D6', expiry: '10/28', quantity: 1 },
  { name: 'superstat 20mg comp pelli', shelf: 'D6', expiry: '08/28', quantity: 1 },
  { name: 'Atacand 8mg comp sec', shelf: 'D6', expiry: '07/28', quantity: 1 },
  { name: 'Atacand 8mg comp sec', shelf: 'D6', expiry: '05/28', quantity: 1 },
  { name: 'Atabek 8mg comp sec', shelf: 'D6', expiry: '12/27', quantity: 1 },
  { name: 'Hytacand 8mg comp sec', shelf: 'D6', expiry: '01/28', quantity: 1 },
  { name: 'Hytacand 8mg comp sec', shelf: 'D6', expiry: '04/28', quantity: 1 },
  { name: 'Hytacand 16mg comp sec', shelf: 'D6', expiry: '02/28', quantity: 1 },
  { name: 'Hytacand 16mg comp sec', shelf: 'D6', expiry: '05/28', quantity: 1 },
  { name: 'Tamsir 0.4 mg Gelule LP', shelf: 'D5', expiry: '12/28', quantity: 1 },
  { name: 'Tamsumed 0.4 mg comp', shelf: 'D5', expiry: '10/27', quantity: 1 },
  { name: 'Prostamed 5mg comp', shelf: 'D5', expiry: '10/27', quantity: 2 },
  { name: 'Prostamixon 160 mg', shelf: 'D5', expiry: '03/27', quantity: 1 },
  { name: 'Prostax 10 mg LP', shelf: 'D5', expiry: '02/29', quantity: 2 },
  { name: 'Unisia 5/8 mg comp', shelf: 'D5', expiry: '08/28', quantity: 3 },
  { name: 'Larimel 500 mg comp', shelf: 'D5', expiry: '07/28', quantity: 1 },
  { name: 'Valens 10 mg comp', shelf: 'D5', expiry: '11/28', quantity: 3 },
  { name: 'Exval 10 mg comp pelli', shelf: 'D5', expiry: '10/28', quantity: 1 },
  { name: 'AproVasc 300mg comp pelli', shelf: 'D5', expiry: '12/27', quantity: 1 },
  { name: 'AproVasc 300mg comp pelli', shelf: 'D5', expiry: '08/28', quantity: 1 },
  { name: 'AproVasc 300mg comp pelli', shelf: 'D5', expiry: '03/29', quantity: 1 },
  { name: 'Co-Aprovel 150/12.5 mg comp pelli', shelf: 'D5', expiry: '10/28', quantity: 1 },
  { name: 'Co-Aprovel 150/12.5 mg comp pelli', shelf: 'D5', expiry: '03/29', quantity: 1 },
  { name: 'Bipreterax Arginine 5mg capsule', shelf: 'D5', expiry: '11/28', quantity: 1 },
  { name: 'Elenax 25 mg', shelf: 'D5', expiry: '02/29', quantity: 1 },
  { name: 'Exforge 5mg comp pelli', shelf: 'D5', expiry: '03/28', quantity: 1 },
  { name: 'Exforge 5mg comp pelli', shelf: 'D5', expiry: '04/28', quantity: 1 },
  { name: 'Atenor 100 mg comp', shelf: 'D5', expiry: '05/28', quantity: 1 },
  { name: 'spironole 75 mg comp LP', shelf: 'D5', expiry: '04/29', quantity: 1 },
  { name: 'adex LP 1.5 mg comp pelli', shelf: 'D5', expiry: '12/28', quantity: 1 },
  { name: 'Fludex LP 1.5 mg comp', shelf: 'D5', expiry: '10/27', quantity: 2 },
  { name: 'Diaglinide 2mg comp', shelf: 'D5', expiry: '12/27', quantity: 1 },
  { name: 'Exirb 300 mg / 5 mg comp', shelf: 'D4', expiry: '03/28', quantity: 1 },
  { name: 'Minirinment 60 µg comp', shelf: 'D4', expiry: '04/29', quantity: 1 },
  { name: 'Quetiapine Beker 300mg LP', shelf: 'R1', expiry: '01/28', quantity: 1 },
  { name: 'Lamotrigine Beker 100mg comp', shelf: 'R1', expiry: '12/29', quantity: 2 },
  { name: 'Aripiprazole Beker 15mg comp oro', shelf: 'R1', expiry: '09/27', quantity: 1 },
  { name: 'Escitalopram Beker 10mg comp pelli', shelf: 'R1', expiry: '08/28', quantity: 1 },
  { name: 'Haloperidol genericlab 2mg/ml gouttes Buv', shelf: 'R1', expiry: '09/28', quantity: 1 },
  { name: 'Quetiapine Beker LP 50mg', shelf: 'R1', expiry: '12/28', quantity: 1 },
  { name: 'Baclon 10mg comp', shelf: 'R1', expiry: '11/27', quantity: 1 },
  { name: 'Moncitra 30mg comp pelli', shelf: 'R1', expiry: '12/29', quantity: 1 },
  { name: 'Largactil 4% gouttes Buv', shelf: 'R1', expiry: '12/27', quantity: 1 },
  { name: 'Nozinan 4% gouttes Buv', shelf: 'R1', expiry: '10/28', quantity: 1 },
  { name: 'Gabatrex 300mg Gelule', shelf: 'R1', expiry: '10/28', quantity: 1 },
  { name: 'Mydocalm Hikma 150mg comp pelli', shelf: 'R1', expiry: '10/27', quantity: 1 },
  { name: 'RepaNide 25mg comp pelli', shelf: 'R1', expiry: '01/29', quantity: 1 },
  { name: 'Ripsyzen 2mg', shelf: 'R1', expiry: '11/28', quantity: 1 },
  { name: 'Clonaprime 10mg comp pelli', shelf: 'R1', expiry: '10/28', quantity: 1 },
  { name: 'Lamotrigine Beker 25mg comp disp', shelf: 'R1', expiry: '10/30', quantity: 2 },
  { name: 'Escitalopram Beker 10mg comp pelli', shelf: 'R1', expiry: '10/28', quantity: 2 },
  { name: 'Amoxypen 1g B/1+1 Sol INJ B/1', shelf: 'C7', expiry: '07/27', quantity: 5 },
  { name: 'Zomax 4mg/ml PDRE.P Susp Buv F/30ml', shelf: 'C7', expiry: '11/27', quantity: 1 },
  { name: 'Zomax 4mg/ml PDRE.P Susp Buv F/30ml', shelf: 'C7', expiry: '04/28', quantity: 1 },
  { name: 'Omnipaque 300 mg/ml INJ F/50ml I=300 mg/ml Sol INJ', shelf: 'C7', expiry: '12/27', quantity: 2 },
  { name: 'Omnipaque 300 mg/ml INJ F/50ml I=300 mg/ml Sol INJ', shelf: 'C7', expiry: '09/27', quantity: 3 }, // Fixed date to 09/27
  { name: 'Omnipaque 300 mg/ml INJ F/50ml I=300 mg/ml Sol INJ', shelf: 'C7', expiry: '10/27', quantity: 1 },
  { name: 'Omnipaque 300 mg/ml INJ F/50ml I=300 mg/ml Sol INJ', shelf: 'C7', expiry: '01/28', quantity: 1 },
  { name: 'Dipronad G INJ B/01 7mg/ml (5mg/2mg 1ml) Susp.INJ.IM ou Local', shelf: 'C7', expiry: '11/27', quantity: 2 },
  { name: 'Dotur 100 mg B/10 comp', shelf: 'C7', expiry: '12/27', quantity: 1 },
  { name: 'Biopamox 1g pdre Sol INJ', shelf: 'C7', expiry: '02/28', quantity: 2 },
  { name: 'Amoclan BID 875 mg / 125 mg B/10 comp', shelf: 'C7', expiry: '07/27', quantity: 3 },
  { name: 'Amoclan 8:1 ENF 100mg/12.5mg/ml Pdr Susp Buv F/60ml', shelf: 'C7', expiry: '09/26', quantity: 1 },
  { name: 'Kenacortyl Retard 40 mg/ml Susp INJ BTE/1 Seringe', shelf: 'C7', expiry: '10/27', quantity: 1 },
  { name: 'Zomax 40 mg/ml Pdre Susp Buv Fl/22.5ml', shelf: 'C6', expiry: '11/27', quantity: 1 },
  { name: 'Zomax 40 mg/ml Pdre Susp Buv Fl/22.5ml', shelf: 'C6', expiry: '12/27', quantity: 2 },
  { name: 'Zomax 40 mg/ml Pdre Susp Buv Fl/22.5ml', shelf: 'C6', expiry: '07/28', quantity: 1 },
  { name: 'Lexin 1g B/12 Sachet', shelf: 'C6', expiry: '04/28', quantity: 1 },
  { name: 'Lexinal Sophal 1g B/12 comp', shelf: 'C6', expiry: '10/27', quantity: 1 },
  { name: 'Dotur 100 mg B/10 comp', shelf: 'C6', expiry: '11/27', quantity: 4 },
  { name: 'Dotur 100 mg B/10 comp', shelf: 'C6', expiry: '12/27', quantity: 3 },
  { name: 'Nitroxal 100 mg', shelf: 'C6', expiry: '03/28', quantity: 1 },
  { name: 'Augmentin Enfant 100 mg / 12.5 mg/ml Fl/60ml pdre Susp Buv', shelf: 'C6', expiry: '12/26', quantity: 6 },
  { name: 'Clamoxyl 500 mg / 5 ml F/60ml Pdre Susp Buv', shelf: 'C5', expiry: '04/28', quantity: 5 },
  { name: 'Clamoxyl 500 mg / 5 ml F/60ml Pdre Susp Buv', shelf: 'C5', expiry: '03/28', quantity: 3 },
  { name: 'Augmentin AD 1g / 125 mg B/12 Pdre Sachet', shelf: 'C5', expiry: '03/27', quantity: 2 },
  { name: 'Clamoxyl 1g B/14 comp', shelf: 'C5', expiry: '06/28', quantity: 11 },
  { name: 'Ancefal 1g comp B/12', shelf: 'C5', expiry: '12/27', quantity: 1 },
  { name: 'Clamoxyl 250 mg / 5 ml F/60ml Pdre Susp Buv', shelf: 'C4', expiry: '01/28', quantity: 8 },
  { name: 'Ancefal 1g Comp B/12 comp Pelli', shelf: 'C4', expiry: '11/27', quantity: 1 },
  { name: 'Ancefal 1g Comp B/12 comp Pelli', shelf: 'C4', expiry: '12/27', quantity: 1 },
  { name: 'Ancefal 250 mg / 5ml F/60 ml Susp Buv', shelf: 'C4', expiry: '10/27', quantity: 2 },
  { name: 'Uricare 3g Gles sachet', shelf: 'C4', expiry: '09/27', quantity: 1 },
  { name: 'Fucare 250 mg comp B/10', shelf: 'C4', expiry: '02/28', quantity: 1 }, // Corrected name
  { name: 'Bioclav 1g / 125 mg poudre en sachet', shelf: 'C4', expiry: '09/27', quantity: 2 },
  { name: 'Ultrabiotique Infantile Sachet B/7', shelf: 'C4', expiry: '11/28', quantity: 1 },
  { name: 'Bioclav Enfants 100mg/12.5mg/ml Pdre Susp Buv F/60ml', shelf: 'C3', expiry: '03/27', quantity: 2 },
  { name: 'Bioclav Enfants 100mg/12.5mg/ml Pdre Susp Buv F/60ml', shelf: 'C3', expiry: '11/27', quantity: 1 },
  { name: 'Biopamox 500mg Pdre susp Buv', shelf: 'C3', expiry: '04/27', quantity: 1 }, // Fixed date from 01/27 to 04/27
  { name: 'Biopamox 250 mg /5ml Pdre Susp Buv', shelf: 'C3', expiry: '03/27', quantity: 1 },
  { name: 'Biopamox 250 mg /5ml Pdre Susp Buv', shelf: 'C3', expiry: '11/27', quantity: 1 },
  { name: 'Ancefal 250 mg 15ml susp Buv F/60ml', shelf: 'C3', expiry: '10/27', quantity: 3 },
  { name: 'Cefimax 200mg comp pelli B/8', shelf: 'C3', expiry: '12/27', quantity: 1 },
  { name: 'ProFlox 500mg comp enro B/10', shelf: 'C3', expiry: '09/28', quantity: 1 },
  { name: 'BI-OROGYL 1.5 M. UI / 250 mg B/10 comp pelli', shelf: 'C3', expiry: '01/29', quantity: 1 },
  { name: 'Vitamine C 1g evexia', shelf: 'C3', expiry: '11/28', quantity: 1 },
  { name: 'Amoclan 8:1 AD 1G /125 mg B/14 PDre Sachet', shelf: 'C3', expiry: '11/27', quantity: 7 },
  { name: 'Nutraxin Beauty Collagene Complexe', shelf: 'C3', expiry: '06/28', quantity: 1 },
  { name: 'Best Fer 40mg', shelf: 'C2', expiry: '03/27', quantity: 1 },
  { name: 'Magnésium 300mg + Zinc 15mg Effervescent', shelf: 'C2', expiry: '09/28', quantity: 2 },
  { name: 'Magnésium 300mg + Zinc 15mg Effervescent', shelf: 'C2', expiry: '02/28', quantity: 1 },
  { name: 'Ferrum Gouttes Buv', shelf: 'C2', expiry: '04/30', quantity: 1 },
  { name: 'ZelKid', shelf: 'C2', expiry: '10/27', quantity: 1 },
  { name: 'Calcidose Vit D3', shelf: 'C2', expiry: '11/27', quantity: 2 },
  { name: 'Nutraxin Beauty Collagene', shelf: 'C2', expiry: '12/28', quantity: 3 },
  { name: 'Nutraxin Multi vitamine Mineral', shelf: 'C2', expiry: '04/28', quantity: 1 },
  { name: 'Nutraxin Big Energy', shelf: 'C2', expiry: '08/27', quantity: 1 },
  { name: 'Nutraxin Immun-S', shelf: 'C2', expiry: '06/28', quantity: 1 },
  { name: 'Nutraxin Omega 3 enfant sirop', shelf: 'C2', expiry: '07/28', quantity: 1 },
  { name: 'Nutraxin Multivitamine Mineral sirop', shelf: 'C2', expiry: '02/28', quantity: 1 },
  { name: 'Genesia Gelule B/20', shelf: 'C2', expiry: '11/27', quantity: 1 },
  { name: 'Ultra biotique Flore Intestinale Gel B/16 Vitavea Sante', shelf: 'C2', expiry: '06/28', quantity: 4 },
  { name: 'Vitazyme 250 mg Bte/20', shelf: 'C2', expiry: '08/27', quantity: 1 },
  { name: 'yes Vit', shelf: 'C2', expiry: '01/28', quantity: 1 },
  { name: 'Ferti Fit F', shelf: 'C2', expiry: '09/27', quantity: 1 },
  { name: 'STop Addict (+)', shelf: 'C2', expiry: '01/28', quantity: 1 },
  { name: 'Ferticare H', shelf: 'C2', expiry: '', quantity: 1 },
  { name: 'Vitatron', shelf: 'C2', expiry: '02/29', quantity: 1 },
  { name: 'Ovacare', shelf: 'C2', expiry: '03/29', quantity: 2 },
  { name: 'Soprodim Vit c+zinc', shelf: 'C2', expiry: '02/29', quantity: 2 },
  { name: 'Vitamine C 1000 mg', shelf: 'C2', expiry: '08/28', quantity: 1 },
  { name: 'Ferroton 11', shelf: 'C2', expiry: '11/28', quantity: 1 },
  { name: 'Vitamine B Complexe Ultra', shelf: 'C2', expiry: '12/28', quantity: 2 },
  { name: 'Phy Baby sirop', shelf: 'C1', expiry: '07/27', quantity: 1 },
  { name: 'Vomi Kid sirop', shelf: 'C1', expiry: '06/27', quantity: 1 },
  { name: 'Calcidose 500 mg', shelf: 'C1', expiry: '05/27', quantity: 1 },
  { name: 'Vitamine Sirop F/125 ml', shelf: 'C1', expiry: '', quantity: 1 },
  { name: 'Protoux Arab Ph sirop 100 ml', shelf: 'C1', expiry: '10/26', quantity: 1 },
  { name: 'Solvityl Baby sirop F/100ml', shelf: 'C1', expiry: '12/26', quantity: 2 },
  { name: 'Solvityl Baby sirop F/60ml', shelf: 'C1', expiry: '12/27', quantity: 1 },
  { name: 'Grossi Vit', shelf: 'C1', expiry: '01/29', quantity: 1 },
  { name: 'Bio mag 400 mg', shelf: 'C1', expiry: '12/27', quantity: 1 },
  { name: 'Calci bronat', shelf: 'C1', expiry: '09/27', quantity: 2 },
  { name: 'Calcium D3 WML 500 mg / 400 UI B/60 comp A Sucer', shelf: 'C1', expiry: '09/27', quantity: 2 },
  { name: 'URSA 200 mg', shelf: 'C1', expiry: '03/28', quantity: 1 },
  { name: 'Magnesium Moben 400 mg', shelf: 'C1', expiry: '10/27', quantity: 4 },
  { name: 'Magnesium Moben 300 mg', shelf: 'C1', expiry: '02/28', quantity: 3 },
  { name: 'Neurovit 250mg / 250 mg B/20 comp', shelf: 'C1', expiry: '10/27', quantity: 1 },
  { name: 'Neurovit 250mg / 250 mg B/20 comp', shelf: 'C1', expiry: '02/28', quantity: 1 },
  { name: 'Nutrigest + Fer', shelf: 'C1', expiry: '05/28', quantity: 1 },
  { name: 'Trois B B/30 comp Enro', shelf: 'C1', expiry: '03/28', quantity: 1 },
  { name: 'Tri B Vit Inpha 200 / 100 / 1mg B/30 comp pelli', shelf: 'C1', expiry: '12/27', quantity: 1 },
  { name: 'Tri B Vit Inpha 200 / 100 / 1mg B/30 comp pelli', shelf: 'C1', expiry: '11/27', quantity: 1 },
  { name: 'Grossesse', shelf: 'C1', expiry: '04/28', quantity: 1 },
  { name: 'Appetit Pro', shelf: 'C1', expiry: '04/28', quantity: 1 },
  { name: 'Bisglycinate de Zinc 15mg', shelf: 'C1', expiry: '10/28', quantity: 1 },
  { name: 'Magnesium 300 mg + Zinc 15 mg', shelf: 'C1', expiry: '02/28', quantity: 4 },
  { name: 'DepaKine 200mg Sol Buv', shelf: 'R3', expiry: '06/28', quantity: 3 },
  { name: 'DepaKine 200mg Sol Buv', shelf: 'R3', expiry: '12/28', quantity: 3 },
  { name: 'Olprexa 10mg comp', shelf: 'R3', expiry: '10/28', quantity: 1 },
  { name: 'Levocarb 250/25mg comp', shelf: 'R3', expiry: '08/28', quantity: 1 },
  { name: 'Isoptyl 40mg Gouttes Buv', shelf: 'R3', expiry: '12/28', quantity: 1 },
  { name: 'Olanza oro 10mg', shelf: 'R3', expiry: '02/28', quantity: 1 },
  { name: 'Aripiprazole Beker oro 10mg', shelf: 'R3', expiry: '01/29', quantity: 1 },
  { name: 'Carbimol LP 400mg comp pelli', shelf: 'R3', expiry: '02/29', quantity: 1 },
  { name: 'Levocarb 100mg comp', shelf: 'R3', expiry: '12/28', quantity: 1 },
  { name: 'Atryline 25mg comp enro', shelf: 'R3', expiry: '05/28', quantity: 1 },
  { name: 'Tegretol 200mg comp', shelf: 'R3', expiry: '09/27', quantity: 1 },
  { name: 'BioZinan BR 25mg comp pelli', shelf: 'R3', expiry: '12/28', quantity: 1 },
  { name: 'BioZinan BR 100mg comp pelli', shelf: 'R3', expiry: '12/28', quantity: 1 },
  { name: 'Clonaprime 10mg comp pelli', shelf: 'R2', expiry: '10/28', quantity: 1 },
  { name: 'Clonaprime 25mg comp pelli', shelf: 'R2', expiry: '10/28', quantity: 1 },
  { name: 'Clonaprime 75mg comp pelli', shelf: 'R2', expiry: '10/28', quantity: 1 },
  { name: 'Solotik 50mg comp', shelf: 'R2', expiry: '10/28', quantity: 1 },
  { name: 'Depakine chrono 500mg comp', shelf: 'R2', expiry: '02/28', quantity: 10 },
  { name: 'Depakine chrono 500mg comp', shelf: 'R2', expiry: '12/27', quantity: 1 },
  { name: 'Aripiprazole Beker oro 10mg', shelf: 'R2', expiry: '09/27', quantity: 1 },
  { name: 'Aripiprazole Beker oro 15mg comp', shelf: 'R2', expiry: '09/27', quantity: 1 },
  { name: 'Fluoxetine merinal 20mg gles', shelf: 'R2', expiry: '02/29', quantity: 1 },
  { name: 'Quetiapine Beker LP 50mg', shelf: 'R2', expiry: '10/28', quantity: 1 },
  { name: 'Depakine 200mg Sol Buv', shelf: 'R2', expiry: '06/28', quantity: 1 },
  { name: 'Risperidone Beker 2mg comp pelli', shelf: 'R2', expiry: '01/28', quantity: 1 },
  { name: 'Olprexa 10mg comp', shelf: 'R2', expiry: '10/28', quantity: 1 },
  { name: 'Ripsyzen 4mg comp', shelf: 'R2', expiry: '11/28', quantity: 1 },
  { name: 'Gabatrex 300mg Gelule', shelf: 'R2', expiry: '02/29', quantity: 1 },
  { name: 'Quetiapine Beker 300mg LP', shelf: 'R1', expiry: '01/28', quantity: 1 },
  { name: 'Lamotrigine Beker 100mg comp', shelf: 'R1', expiry: '12/29', quantity: 2 },
  { name: 'Haloperidol genericlab 2mg/ml gouttes Buv', shelf: 'R1', expiry: '09/28', quantity: 1 },
  { name: 'Quetiapine Beker LP 50mg', shelf: 'R1', expiry: '12/28', quantity: 1 },
  { name: 'Baclon 10mg comp', shelf: 'R1', expiry: '11/27', quantity: 1 },
  { name: 'Moncitra 30mg comp pelli', shelf: 'R1', expiry: '12/29', quantity: 1 },
  { name: 'Largactil 4% gouttes Buv', shelf: 'R1', expiry: '12/27', quantity: 1 },
  { name: 'Nozinan 4% gouttes Buv', shelf: 'R1', expiry: '10/28', quantity: 1 },
  { name: 'Gabatrex 300mg Gelule', shelf: 'R1', expiry: '10/28', quantity: 1 },
  { name: 'Mydocalm Hikma 150mg comp pelli', shelf: 'R1', expiry: '10/27', quantity: 1 },
  { name: 'RepaNide 25mg comp pelli', shelf: 'R1', expiry: '01/29', quantity: 1 },
  { name: 'Ripsyzen 2mg', shelf: 'R1', expiry: '11/28', quantity: 1 },
  { name: 'Clonaprime 10mg comp pelli', shelf: 'R1', expiry: '10/28', quantity: 1 },
  { name: 'Lamotrigine Beker 25mg comp disp', shelf: 'R1', expiry: '10/30', quantity: 2 },
  { name: 'Escitalopram Beker 10mg comp pelli', shelf: 'R1', expiry: '10/28', quantity: 2 },
  { name: '🚫خزانة عمي علي🚫', shelf: 'PSY' },
]

  const [search, setSearch] = useState('');
const [notes, setNotes] = useState([]);
const [activityLog, setActivityLog] = useState([]);

useEffect(() => {
  const loadLog = async () => {
    const { data, error } = await supabase.from('activity_log').select('*').order('created_at', { ascending: false }).limit(50);
    if (!error && data) setActivityLog(data);
  };
  loadLog();
}, []);

const logActivity = async (action, medicineName, details) => {
  const entry = {
    action,
    medicine_name: medicineName,
    details,
    created_at: new Date().toISOString(),
  };
  const { data } = await supabase.from('activity_log').insert([entry]).select();
  if (data) setActivityLog((prev) => [data[0], ...prev.slice(0, 49)]);
};
const [newNoteText, setNewNoteText] = useState('');
const [newNoteAuthor, setNewNoteAuthor] = useState('');

useEffect(() => {
  const loadNotes = async () => {
    const { data, error } = await supabase.from('notes').select('*').order('created_at', { ascending: false });
    if (!error && data) setNotes(data);
  };
  loadNotes();
}, []);

const handleAddNote = async () => {
  if (!newNoteText.trim()) return;
  const colors = ['#fef08a', '#86efac', '#93c5fd', '#f9a8d4', '#fdba74'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const note = {
    text: newNoteText.trim(),
    author: newNoteAuthor.trim() || 'Anonyme',
    color,
    created_at: new Date().toISOString(),
  };
  const { data } = await supabase.from('notes').insert([note]).select();
  if (data) setNotes([data[0], ...notes]);
  setNewNoteText('');
  setNewNoteAuthor('');
};

const handleDeleteNote = async (id) => {
  const { error } = await supabase.from('notes').delete().eq('id', id);
  if (!error) {
    setNotes((prevNotes) => prevNotes.filter((n) => n.id !== id));
  } else {
    console.error('Supprimer error:', error);
  }
};
const [isScrolled, setIsScrolled] = useState(false);
useEffect(() => {
  const handleScroll = () => setIsScrolled(window.scrollY > 200);
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
  const [openedShelf, setOpenedShelf] = useState(null);
  const [highlightedMed, setHighlightedMed] = useState('');
  const [medicineList, setMedicineList] = useState(meds);

  useEffect(() => {
    const loadMeds = async () => {
      const { data, error } = await supabase.from('medicines').select('*');
      if (!error && data && data.length > 0) {
        setMedicineList(data);
      }
    };
    loadMeds();
  }, []);
  const [editingMedicine, setEditingMedicine] = useState(null);
  const [showMedInfo, setShowMedInfo] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Tout');
  const [sortOrder, setSortOrder] = useState('A-Z');
  const [showModal, setShowModal] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(
  localStorage.getItem('pharmacyUnlocked') === 'true'
);
  const WEBSITE_PASSWORD = '5986';
  const [passwordInput, setPasswordInput] = useState('');
  const [newMedicine, setNewMedicine] = useState({
    name: '',
    shelf: 'A1',
    category: '',
    dci: '',
    expiry: '',
    quantity: '',
  });
  const categoryColors = {
  'CARDIO': 'bg-red-100 text-red-800 border-red-300',

  'Respiratoire': 'bg-cyan-100 text-cyan-800 border-cyan-300',

  'GASTRO': 'bg-yellow-100 text-yellow-800 border-yellow-300',

  'Endocrinologie et Diabète':
    'bg-orange-100 text-orange-800 border-orange-300',

  'Anti-infectieux':
    'bg-emerald-100 text-emerald-800 border-emerald-300',

  'Douleur et Inflammation':
    'bg-rose-100 text-rose-800 border-rose-300',

  'Dermatologie':
    'bg-pink-100 text-pink-800 border-pink-300',

  'Ophtalmologie / ORL':
    'bg-sky-100 text-sky-800 border-sky-300',

  'Pédiatrie':
    'bg-indigo-100 text-indigo-800 border-indigo-300',

  'Vitamines et Compléments':
    'bg-lime-100 text-lime-800 border-lime-300',

  'Immunologie':
    'bg-violet-100 text-violet-800 border-violet-300',

  'Urologie':
    'bg-teal-100 text-teal-800 border-teal-300',

  'Neuro / Muscles':
    'bg-amber-100 text-amber-800 border-amber-300',

  'Gynécologie & Obstétrique':
    'bg-fuchsia-100 text-fuchsia-800 border-fuchsia-300',
  'Neurologie & Psychiatrie':
  'bg-purple-100 text-purple-800 border-purple-300',
};

  const filtered = medicineList
    .filter((med) =>
  med.name.toLowerCase().includes(search.toLowerCase()) ||

  (med.dci &&
    med.dci.toLowerCase().includes(search.toLowerCase()))
)
    .filter((med) => selectedCategory === 'En couloir' ? med.inHallway : selectedCategory === 'Tout' || med.category === selectedCategory)
    .sort((a, b) => {
      if (sortOrder === 'A-Z') {
        return a.name.localeCompare(b.name);
      }

      if (sortOrder === 'Z-A') {
  return b.name.localeCompare(a.name);
}

if (sortOrder === 'Category') {
  return (a.category || '').localeCompare(b.category || '');
}

if (sortOrder === 'Expiry') {

  // No expiry = bottom
  if (!a.expiry && !b.expiry) return 0;
  if (!a.expiry) return 1;
  if (!b.expiry) return -1;

  const [aMonth, aYear] = a.expiry.split('/');
  const [bMonth, bYear] = b.expiry.split('/');

  const aValue = parseInt(`20${aYear}${aMonth.padStart(2, '0')}`);
  const bValue = parseInt(`20${bYear}${bMonth.padStart(2, '0')}`);

  return aValue - bValue;
}

return 0;
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
  'G1',
  'G2',
  'R1',
  'R2',
  'R3',
  'F7',
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

  const categories = ['Tout', ...new Set(medicineList.map((m) => m.category))];
  const availableCategories = [
  'CARDIO',
  'Respiratoire',
  'GASTRO',
  'Endocrinologie et Diabète',
  'Anti-infectieux',
  'Douleur et Inflammation',
  'Dermatologie',
  'Ophtalmologie / ORL',
  'Pédiatrie',
  'Vitamines et Compléments',
  'Immunologie',
  'Urologie',
  'Neuro / Muscles',
  'Neurologie & Psychiatrie',
  'Gynécologie & Obstétrique',
];


const getExpiryColor = (expiry) => {
  if (!expiry) return 'text-gray-500';

  const year = parseInt(expiry.split('/')[1]);

  if (year <= 26) {
    return 'text-red-600 animate-pulse';
  }

  if (year === 27) {
    return 'text-yellow-600 font-bold';
  }

  return 'text-green-600 font-bold';
};

  const handleDeleteMedicine = async (med) => {
    const confirmDelete = window.confirm(`Supprimer ${med.name} from stock?`);
    if (!confirmDelete) return;
    await supabase.from('medicines').delete().eq('id', med.id);
    setMedicineList(medicineList.filter((m) => m.id !== med.id));
    await logActivity('Suppression', med.name, `Supprimé de l'étagère ${med.shelf}`);
  };

  const handleEditMedicine = (med) => {
    setEditingMedicine(med);

    setNewMedicine({
  name: med.name,
  shelf: med.shelf,
  category: med.category,
  dci: med.dci || '',
  expiry: med.expiry || '',
  quantity: med.quantity || '',
  quantityType: med.quantityType || 'Boîte',
  inHallway: med.inHallway || false,
  indication: med.indication || '',
  dosage_adulte: med.dosage_adulte || '',
  dosage_enfant: med.dosage_enfant || '',
  dosage_nourrisson: med.dosage_nourrisson || '',
  effets_secondaires: med.effets_secondaires || '',
  contre_indications: med.contre_indications || '',
  conseil: med.conseil || '',
  forme: med.forme || '',
  age_min: med.age_min || '',
  age_max: med.age_max || '',
  condition: med.condition || '',
});
    setShowModal(true);
  };

  const handleAddMedicine = async () => {

    console.log('BUTTON CLICKED');
console.log(newMedicine);

    if (!newMedicine.name) return;

    if (editingMedicine) {
      const updated = {
        name: newMedicine.name,
        shelf: newMedicine.shelf,
        category: newMedicine.category,
        dci: newMedicine.dci,
        expiry: newMedicine.expiry,
        quantity: newMedicine.quantity,
        quantityType: newMedicine.quantityType,
        inHallway: newMedicine.inHallway || false,
        indication: newMedicine.indication || '',
        dosage_adulte: newMedicine.dosage_adulte || '',
        dosage_enfant: newMedicine.dosage_enfant || '',
        dosage_nourrisson: newMedicine.dosage_nourrisson || '',
        effets_secondaires: newMedicine.effets_secondaires || '',
        contre_indications: newMedicine.contre_indications || '',
        conseil: newMedicine.conseil || '',
        forme: newMedicine.forme || '',
        age_min: newMedicine.age_min || null,
        age_max: newMedicine.age_max || null,
        condition: newMedicine.condition || '',
      };
      await supabase.from('medicines').update(updated).eq('id', editingMedicine.id);
      setMedicineList(medicineList.map((med) => med.id === editingMedicine.id ? { ...med, ...updated } : med));

      const changes = [];
      if (editingMedicine.quantity !== newMedicine.quantity)
        changes.push(`Qté: ${editingMedicine.quantity || '—'} → ${newMedicine.quantity || '—'}`);
      if (editingMedicine.expiry !== newMedicine.expiry)
        changes.push(`Exp: ${editingMedicine.expiry || '—'} → ${newMedicine.expiry || '—'}`);
      if (editingMedicine.shelf !== newMedicine.shelf)
        changes.push(`Étagère: ${editingMedicine.shelf} → ${newMedicine.shelf}`);
      if (editingMedicine.category !== newMedicine.category)
        changes.push(`Catégorie: ${editingMedicine.category || '—'} → ${newMedicine.category || '—'}`);
      if (editingMedicine.quantityType !== newMedicine.quantityType)
        changes.push(`Type: ${editingMedicine.quantityType || '—'} → ${newMedicine.quantityType || '—'}`);
      if (editingMedicine.inHallway !== newMedicine.inHallway)
        changes.push(newMedicine.inHallway ? '📦 Déplacé en couloir' : '✅ Placé en étagère');
      await logActivity('Modification', newMedicine.name, changes.length > 0 ? changes.join(' · ') : 'Aucun changement détecté');
    } else {
      const newMed = {
        name: newMedicine.name,
        shelf: newMedicine.shelf,
        category: newMedicine.category,
        dci: newMedicine.dci,
        expiry: newMedicine.expiry,
        quantity: newMedicine.quantity,
        quantityType: newMedicine.quantityType,
        inHallway: newMedicine.inHallway || false,
        indication: newMedicine.indication || '',
        dosage_adulte: newMedicine.dosage_adulte || '',
        dosage_enfant: newMedicine.dosage_enfant || '',
        dosage_nourrisson: newMedicine.dosage_nourrisson || '',
        effets_secondaires: newMedicine.effets_secondaires || '',
        contre_indications: newMedicine.contre_indications || '',
        conseil: newMedicine.conseil || '',
        forme: newMedicine.forme || '',
        age_min: newMedicine.age_min || null,
        age_max: newMedicine.age_max || null,
        condition: newMedicine.condition || '',
      };
      const { data } = await supabase.from('medicines').insert([newMed]).select();
      if (data) {
        setMedicineList([...medicineList, data[0]]);
        await logActivity('Ajout', newMed.name, `Ajouté sur étagère ${newMed.shelf}${newMed.quantity ? ` · Qté: ${newMed.quantity} ${newMed.quantityType || ''}` : ''}${newMed.expiry ? ` · Exp: ${newMed.expiry}` : ''}${newMed.inHallway ? ' · 📦 En couloir' : ''}`);
      }
    }

    setEditingMedicine(null);
    setHighlightedMed('');

    setNewMedicine({
      name: '',
      shelf: 'A1',
      category: '',
      dci: '',
      expiry: '',
      quantity: '',
      quantityType: 'Boîte',
      inHallway: false,
      indication: '',
      dosage_adulte: '',
      dosage_enfant: '',
      dosage_nourrisson: '',
      effets_secondaires: '',
      contre_indications: '',
      conseil: '',
      forme: '',
      age_min: '',
      age_max: '',
      condition: '',
    });

    setShowModal(false);
  };

  if (!isUnlocked) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Stock Access
        </h1>

        <input
          type="password"
          placeholder="Enter password..."
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
          className="w-full p-4 rounded-xl border mb-4"
        />

        <button
          onClick={() => {
            if (passwordInput === WEBSITE_PASSWORD) {
              localStorage.setItem('pharmacyUnlocked', 'true');
setIsUnlocked(true);
            } else {
              alert('Wrong password');
            }
          }}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-xl font-bold transition"
        >
          Unlock
        </button>
      </div>
    </div>
  );
}
  const expiredMeds = medicineList.filter(
    (med) => med.expiry && typeof med.expiry === 'string' && med.expiry.trim().endsWith('/26')
  );

  const tickerText = expiredMeds.length > 0
    ? expiredMeds.map((med) => `⚠️ ${med.name} — Exp: ${med.expiry}`).join('          ')
    : null;

  return (
    <div className="min-h-screen bg-gray-100">

      {tickerText && (
        <div className="fixed top-0 left-0 right-0 z-[999999] bg-red-600 text-white flex items-center overflow-hidden shadow-lg" style={{ height: '40px' }}>
          <div className="shrink-0 bg-red-800 px-4 h-full flex items-center font-bold text-sm whitespace-nowrap">
            ⚠️ {expiredMeds.length} EXPIRE BIENTÔT
          </div>
          <div className="overflow-hidden flex-1 relative">
            <div
              className="whitespace-nowrap text-sm font-bold tracking-wide"
              style={{
                display: 'inline-block',
                animation: 'ticker-scroll 30s linear infinite',
              }}
            >
              {tickerText}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{tickerText}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes ticker-scroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      <div className="flex flex-col lg:flex-row gap-6" style={{ paddingTop: tickerText ? '52px' : '24px', paddingLeft: '24px', paddingRight: '24px', paddingBottom: '24px' }}>

        {/* LEFT NOTES PANEL */}
        <div className="flex flex-col gap-3 w-100 shrink-0">
          <h2 className="text-lg font-bold text-gray-700">📝 Notes partagées</h2>

          <div className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="Votre nom..."
              value={newNoteAuthor}
              onChange={(e) => setNewNoteAuthor(e.target.value)}
              className="w-full p-5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <textarea
              placeholder="Écrire une note..."
              value={newNoteText}
              onChange={(e) => setNewNoteText(e.target.value)}
              rows={8}
              className="w-full p-5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
            />
            <button
              onClick={handleAddNote}
              className="w-full py-5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition"
            >
              + Ajouter
            </button>
          </div>

          <div className="flex flex-col gap-3 overflow-y-auto" style={{ maxHeight: '70vh' }}>
            {notes.length === 0 && (
              <p className="text-sm text-gray-400 text-center mt-4">Aucune note pour l'instant</p>
            )}
            {notes.map((note) => (
              <div
                key={note.id}
                className="relative rounded-2xl p-4 shadow-md text-sm"
                style={{ backgroundColor: note.color }}
              >
                <button
                  onClick={() => handleDeleteNote(note.id)}
                  className="absolute top-2 right-2 text-gray-500 hover:text-red-500 font-bold text-xs"
                >
                  ✕
                </button>
                <p className="text-gray-800 font-medium mb-2 pr-4">{note.text}</p>
                <p className="text-gray-500 text-xs">— {note.author}</p>
                <p className="text-gray-400 text-xs">{new Date(note.created_at).toLocaleDateString('fr-FR')}</p>
              </div>
            ))}
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
          <h1 className="text-4xl font-bold text-gray-800">
           ⚕️Pharmacy Stock📦
          </h1>
          <div className="flex gap-2">
            <button onClick={() => window.location.href = '/aide-vente'} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl font-semibold transition text-sm">
              💊 Aide à la Vente
            </button>
            <button onClick={() => window.location.href = '/encyclopedie'} className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl font-semibold transition text-sm">
              📖 Encyclopédie
            </button>
          </div>

          <button
  onClick={() => {
    setEditingMedicine(null);

    setNewMedicine({
      name: '',
      shelf: 'A1',
      category: '',
      dci: '',
      expiry: '',
      quantity: '',
      quantityType: 'Boîte',
      inHallway: false,
      indication: '',
      dosage_adulte: '',
      dosage_enfant: '',
      dosage_nourrisson: '',
      effets_secondaires: '',
      contre_indications: '',
      conseil: '',
      forme: '',
      age_min: '',
      age_max: '',
      condition: '',
    });

    setShowModal(true);
  }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl shadow-lg font-semibold transition"
          >
            + Add Medicine
          </button>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[99999] p-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl p-8 relative z-[100000] max-h-[95vh] overflow-y-auto">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">
                {editingMedicine ? 'Editer Le Médicament' : 'Ajouter un Médicament'}
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

<select
  value={newMedicine.category}
  onChange={(e) =>
    setNewMedicine({
      ...newMedicine,
      category: e.target.value,
    })
  }
  className="w-full p-4 rounded-xl border"
>
  <option value="">Select Category</option>

  {availableCategories.map((category) => (
    <option key={category} value={category}>
      {category}
    </option>
  ))}
</select>

                <input
                  type="text"
                  placeholder="DCI"
                   value={newMedicine.dci}
                  onChange={(e) =>
                    setNewMedicine({ ...newMedicine, dci: e.target.value })
                  }
                  className="w-full p-4 rounded-xl border"
                />
                <div className="flex gap-3">
  <input
    type="text"
    placeholder="MM/YY"
    maxLength={5}
    value={newMedicine.expiry}
    onChange={(e) => {
      let value = e.target.value.replace(/\D/g, '');

      if (value.length >= 3) {
        value = value.slice(0, 2) + '/' + value.slice(2, 4);
      }

      setNewMedicine({
        ...newMedicine,
        expiry: value,
      });
    }}
    className="w-1/2 p-4 rounded-xl border"
  />

  <div className="w-1/2 flex flex-col gap-2">
    <input
      type="number"
      placeholder="Quantity"
      min="1"
      value={newMedicine.quantity}
      onChange={(e) =>
        setNewMedicine({ ...newMedicine, quantity: e.target.value })
      }
      className="w-full p-4 rounded-xl border"
    />
    <div className="flex rounded-xl overflow-hidden border">
      {['Boîte', 'Colis'].map((type) => (
        <button
          key={type}
          onClick={() => setNewMedicine({ ...newMedicine, quantityType: type })}
          className={`flex-1 py-2 text-sm font-semibold transition ${
            newMedicine.quantityType === type
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
          }`}
        >
          {type}
        </button>
      ))}
    </div>
  </div>
</div>


                <div className="flex justify-end gap-3 pt-4">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-5 py-3 rounded-xl bg-gray-200 hover:bg-gray-300 transition"
                  >
                    Annuler
                  </button>

              <div className="border-t pt-4 mt-2">
                <button
                  type="button"
                  onClick={() => setShowMedInfo(!showMedInfo)}
                  className="w-full flex items-center justify-between text-left font-semibold text-gray-600 text-sm mb-3 hover:text-blue-600 transition"
                >
                  <span>📋 Informations médicales (optionnel)</span>
                  <span>{showMedInfo ? '▲ Masquer' : '▼ Afficher'}</span>
                </button>
                {showMedInfo && <div className="flex flex-col gap-3">
                  <textarea
                    placeholder="Indication (pour quelle maladie...)"
                    rows={2}
                    value={newMedicine.indication || ''}
                    onChange={(e) => setNewMedicine({ ...newMedicine, indication: e.target.value })}
                    className="w-full p-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                  />
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Posologie adulte"
                      value={newMedicine.dosage_adulte || ''}
                      onChange={(e) => setNewMedicine({ ...newMedicine, dosage_adulte: e.target.value })}
                      className="w-full p-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                      type="text"
                      placeholder="Posologie enfant"
                      value={newMedicine.dosage_enfant || ''}
                      onChange={(e) => setNewMedicine({ ...newMedicine, dosage_enfant: e.target.value })}
                      className="w-full p-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Posologie nourrisson"
                    value={newMedicine.dosage_nourrisson || ''}
                    onChange={(e) => setNewMedicine({ ...newMedicine, dosage_nourrisson: e.target.value })}
                    className="w-full p-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <textarea
                    placeholder="Effets secondaires (séparés par des virgules)"
                    rows={2}
                    value={newMedicine.effets_secondaires || ''}
                    onChange={(e) => setNewMedicine({ ...newMedicine, effets_secondaires: e.target.value })}
                    className="w-full p-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                  />
                  <textarea
                    placeholder="Contre-indications"
                    rows={2}
                    value={newMedicine.contre_indications || ''}
                    onChange={(e) => setNewMedicine({ ...newMedicine, contre_indications: e.target.value })}
                    className="w-full p-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                  />
                  <input
                    type="text"
                    placeholder="Conseil au patient"
                    value={newMedicine.conseil || ''}
                    onChange={(e) => setNewMedicine({ ...newMedicine, conseil: e.target.value })}
                    className="w-full p-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <select
                    value={newMedicine.condition || ''}
                    onChange={(e) => setNewMedicine({ ...newMedicine, condition: e.target.value })}
                    className="w-full p-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                  >
                    <option value="">-- Sélectionner une condition --</option>
                    <option>Grippe / Rhume</option>
                    <option>Douleur / Fièvre</option>
                    <option>Infection bactérienne</option>
                    <option>Allergie</option>
                    <option>Troubles digestifs</option>
                    <option>Diabète</option>
                    <option>Hypertension</option>
                    <option>Toux</option>
                    <option>Infection fongique</option>
                    <option>Inflammation</option>
                    <option>Troubles neurologiques</option>
                    <option>Gynécologie</option>
                    <option>Vitamines / Compléments</option>
                    <option>Ophtalmologie / ORL</option>
                    <option>Dermatologie</option>
                    <option>Urologie</option>
                    <option>Psychiatrie</option>
                  </select>
                  <select
                    value={newMedicine.forme || ''}
                    onChange={(e) => setNewMedicine({ ...newMedicine, forme: e.target.value })}
                    className="w-full p-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                  >
                    <option value="">-- Sélectionner une forme --</option>
                    <option>Comprimé</option>
                    <option>Sirop</option>
                    <option>Gélule</option>
                    <option>Crème / Pommade</option>
                    <option>Injectable</option>
                    <option>Gouttes</option>
                    <option>Sachet</option>
                    <option>Suppositoire</option>
                  </select>
                  <div className="flex gap-2 items-center">
                    <input
                      type="number"
                      placeholder="Âge min"
                      value={newMedicine.age_min || ''}
                      onChange={(e) => setNewMedicine({ ...newMedicine, age_min: e.target.value })}
                      className="w-full p-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <span className="text-gray-400 shrink-0">→</span>
                    <input
                      type="number"
                      placeholder="Âge max"
                      value={newMedicine.age_max || ''}
                      onChange={(e) => setNewMedicine({ ...newMedicine, age_max: e.target.value })}
                      className="w-full p-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <span className="text-gray-400 shrink-0 text-xs">ans</span>
                  </div>
                </div>}
              </div>

              <div
                className="flex items-center justify-between bg-orange-50 border border-orange-200 rounded-2xl px-4 py-3 cursor-pointer"
                onClick={() => setNewMedicine({ ...newMedicine, inHallway: !newMedicine.inHallway })}
              >
                <div>
                  <p className="font-semibold text-gray-700 text-sm">📦 En couloir</p>
                  <p className="text-xs text-gray-400">Ce médicament n'est pas encore placé en étagère</p>
                </div>
                <div className={`w-12 h-6 rounded-full transition-colors duration-300 flex items-center px-1 ${newMedicine.inHallway ? 'bg-orange-400' : 'bg-gray-300'}`}>
                  <div className={`w-4 h-4 bg-white rounded-full shadow transition-transform duration-300 ${newMedicine.inHallway ? 'translate-x-6' : 'translate-x-0'}`} />
                </div>
              </div>

              <button
                onClick={handleAddMedicine}
                    className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition"
                  >
                    {editingMedicine ? 'Mettre à jour le médicament' : 'Enregistrer le médicament'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mb-6">
          <div className="flex flex-wrap gap-3 mb-4">
            <button
              onClick={() => setSelectedCategory('En couloir')}
              className={`px-4 py-2 rounded-xl transition font-medium ${
                selectedCategory === 'En couloir'
                  ? 'bg-orange-500 text-white'
                  : 'bg-orange-100 text-orange-600 hover:bg-orange-200'
              }`}
            >
              📦 En couloir
            </button>
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
              <option>Expiry</option>
            </select>
          </div>
                    <input
            type="text"
            placeholder=" Search medicine name..."
            className="w-full p-4 rounded-2xl border border-gray-300 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white shadow-xl mb-6"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
           {isScrolled && (
            <div className="fixed left-1/2 z-[9999] transition-Tout duration-300" style={{ top: '48px', transform: 'translateX(-50%)', width: '600px', maxWidth: '90vw' }}>
              <input
                type="text"
                placeholder=" Search medicine name..."
                className="w-full p-4 rounded-2xl border border-gray-300 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white shadow-xl"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 mt-4">
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
                {med.quantity && (
                  <p className="text-lg text-blue-600 font-semibold">
                    <strong className="text-gray-700">Qty:</strong> {med.quantity} {med.quantityType || ''}
                  </p>
                )}
                {med.inHallway && (
                  <span className="inline-block mt-1 px-3 py-1 bg-orange-100 text-orange-600 text-xs font-bold rounded-full border border-orange-300">
                    📦 En couloir
                  </span>
                )}
                {med.dci && (
  <p className="text-sm text-gray-600">
    <strong>DCI:</strong> {med.dci}
  </p>
)}
{med.expiry && (
  <p className="text-lg">
    <strong>Expiry:</strong>{' '}
    <span
  className={`font-bold ${
    med.expiry.endsWith('/26')
      ? 'text-red-600 animate-pulse'
      : med.expiry.endsWith('/27')
      ? 'text-yellow-500'
      : 'text-green-600'
  }`}
>
      {med.expiry}
    </span>
  </p>
)}

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
                    Editer
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteMedicine(med);
                    }}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold transition"
                  >
                    Supprimer
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

          <div className="overflow-x-auto overflow-y-auto rounded-3xl">
          <div className="relative z-0 bg-gray-200 rounded-3xl p-8 min-h-[1300px] min-w-[750px]">

            {/* A Shelf */}
            <div
  className={`absolute left-4 top-10 flex flex-col gap-3 transition-Tout ${
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
                              <div className="font-semibold">
  {med.name}
</div>

{med.quantity && (
  <div className="text-xs text-blue-600 font-medium">
    Qty: {med.quantity} {med.quantityType || ''}
  </div>
)}
                              {med.expiry && (
  <div className={`text-xs mt-1 ${getExpiryColor(med.expiry)}`}>
  Exp: {med.expiry}
</div>
)}
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
  className={`absolute top-4 left-1/3 -translate-x-1/2 flex gap-3 transition-Tout ${
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
                              <div className="font-semibold">
  {med.name}
</div>

{med.quantity && (
  <div className="text-xs text-blue-600 font-medium">
    Qty: {med.quantity}
  </div>
)}
                              {med.expiry && (
  <div className={`text-xs mt-1 ${getExpiryColor(med.expiry)}`}>
  Exp: {med.expiry}
</div>
)}
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
  className={`absolute left-[20%] top-43 flex flex-col gap-3 transition-Tout ${
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
                              <div className="font-semibold">
  {med.name}
</div>
                              {med.quantity && (
  <div className="text-xs text-blue-600 font-medium">
    Qty: {med.quantity}
  </div>
)}
                              {med.expiry && (
  <div className={`text-xs mt-1 ${getExpiryColor(med.expiry)}`}>
  Exp: {med.expiry}
</div>
)}
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
  className={`absolute left-[35%] top-43 flex flex-col gap-3 transition-Tout ${
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
                              <div className="font-semibold">
  {med.name}
</div>

{med.quantity && (
  <div className="text-xs text-blue-600 font-medium">
    Qty: {med.quantity}
  </div>
)}
                              {med.expiry && (
  <div className={`text-xs mt-1 ${getExpiryColor(med.expiry)}`}>
  Exp: {med.expiry}
</div>
)}
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
  className={`absolute right-80 top-10 flex flex-col gap-3 transition-Tout ${
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
                              <div className="font-semibold">
  {med.name}
</div>

{med.quantity && (
  <div className="text-xs text-blue-600 font-medium">
    Qty: {med.quantity}
  </div>
)}
                              {med.expiry && (
  <div className={`text-xs mt-1 ${getExpiryColor(med.expiry)}`}>
  Exp: {med.expiry}
</div>
)}
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
<div className="absolute left-4 bottom-105">
  <div key="PSY" id="shelf-PSY" className="relative">
    <button
      onClick={() =>
        setOpenedShelf(openedShelf === 'PSY' ? null : 'PSY')
      }
      className={`w-24 h-24 rounded-2xl border-2 font-bold text-2xl transition-Tout ${
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
<div className="absolute bottom-90 left-[10rem] flex gap-4 items-end">
  {['F1', 'F2'].map((shelf) => {
    const isOpen = openedShelf === shelf;

    return (
      <div key={shelf} id={`shelf-${shelf}`} className="relative">
        <button
          onClick={() => setOpenedShelf(isOpen ? null : shelf)}
          className={`w-24 h-20 rounded-2xl border-2 font-bold text-xl transition-Tout ${
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

<div className="absolute bottom-90 left-[23.5rem] flex gap-4 items-end">
              {['F3', 'F4', 'F5', 'F6'].map((shelf) => {
                const isOpen = openedShelf === shelf;

                return (
                  <div key={shelf} id={`shelf-${shelf}`} className="relative">
                    <button
                      onClick={() => setOpenedShelf(isOpen ? null : shelf)}
                      className={`w-24 h-20 rounded-2xl border-2 font-bold text-xl transition-Tout ${
                        isOpen
                          ? 'bg-blue-200 border-blue-600 scale-105 shadow-md'
                          : 'bg-white border-gray-300 hover:border-blue-400'
                      }`}
                    >
                      {shelf}
                    </button>

                    {/* This is the part that was missing - it shows the medicines! */}
                    {isOpen && (
                      <div className="absolute top-0 right-full mr-3 bg-white shadow-xl rounded-2xl p-3 w-64 max-h-[420px] overflow-y-auto z-50">

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
{/* G1 Shelf */}
<div className="absolute bottom-25 left-[13.5rem]">
  {(() => {
    const shelf = 'G1';
    const isOpen = openedShelf === shelf;

    return (
      <div id={`shelf-${shelf}`} className="relative">
        <button
          onClick={() => setOpenedShelf(isOpen ? null : shelf)}
          className={`w-24 h-20 rounded-2xl border-2 font-bold text-xl transition-Tout ${
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
                  className={`p-2 rounded-xl mb-2 ${
                    highlightedMed === med.name
                      ? 'bg-yellow-200 border border-yellow-500'
                      : 'bg-gray-100'
                  }`}
                >
                  <div className="font-semibold">{med.name}</div>
                  <div
  className={`inline-block mt-1 px-2 py-1 rounded-lg text-xs font-semibold border ${
    categoryColors[med.category] ||
    'bg-gray-100 text-gray-700 border-gray-300'
  }`}
>
  {med.category}
</div>
                </div>
              ))
            ) : (
              <div className="text-sm text-gray-400 italic text-center">
                Empty shelf
              </div>
            )}
          </div>
        )}
      </div>
    );
  })()}
</div>

{/* G2 Shelf */}
<div className="absolute bottom-5 left-[2.5rem]">
<div className="absolute bottom-20 left-[18rem]">
  {(() => {
    const shelf = 'G2';
    const isOpen = openedShelf === shelf;

    return (
      <div id={`shelf-${shelf}`} className="relative">
        <button
          onClick={() => setOpenedShelf(isOpen ? null : shelf)}
          className={`w-24 h-20 rounded-2xl border-2 font-bold text-xl transition-Tout ${
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
                  className={`p-2 rounded-xl mb-2 ${
                    highlightedMed === med.name
                      ? 'bg-yellow-200 border border-yellow-500'
                      : 'bg-gray-100'
                  }`}
                >
                  <div className="font-semibold">{med.name}</div>
                  <div
  className={`inline-block mt-1 px-2 py-1 rounded-lg text-xs font-semibold border ${
    categoryColors[med.category] ||
    'bg-gray-100 text-gray-700 border-gray-300'
  }`}
>
  {med.category}
</div>
                </div>
              ))
            ) : (
              <div className="text-sm text-gray-400 italic text-center">
                Empty shelf
              </div>
            )}
          </div>
        )}
      </div>
    );
  })()}
</div>
</div>

{/* R1 Shelf */}
<div className="absolute bottom-5 left-[20rem]">
<div className="absolute bottom-20 left-[18rem]">
  {(() => {
    const shelf = 'R1';
    const isOpen = openedShelf === shelf;

    return (
      <div id={`shelf-${shelf}`} className="relative">
        <button
          onClick={() => setOpenedShelf(isOpen ? null : shelf)}
          className={`w-24 h-20 rounded-2xl border-2 font-bold text-xl transition-Tout ${
            isOpen
              ? 'bg-blue-200 border-blue-600 scale-105 shadow-md'
              : 'bg-white border-gray-300 hover:border-blue-400'
          }`}
        >
          {shelf}
        </button>

        {isOpen && (
          <div className="absolute bottom-0 right-full mr-4 bg-white shadow-2xl rounded-2xl p-3 w-72 max-h-[500px] overflow-y-auto z-[9999]">
            <div className="sticky top-0 bg-white pb-2 mb-2 border-b font-bold text-lg text-gray-700">
              Shelf {shelf}
            </div>

            {(medsByShelf[shelf] || []).length > 0 ? (
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

<div
  className={`inline-block mt-1 px-2 py-1 rounded-lg text-xs font-semibold border ${
    categoryColors[med.category] ||
    'bg-gray-100 text-gray-700 border-gray-300'
  }`}
>
  {med.category}
</div>

{med.expiry && (
  <div
    className={`mt-2 text-sm font-bold ${
      med.expiry.endsWith('/26')
        ? 'text-red-600 animate-pulse'
        : med.expiry.endsWith('/27')
        ? 'text-yellow-500'
        : 'text-green-600'
    }`}
  >
    Exp: {med.expiry}
  </div>
)}

{med.quantity && (
  <div className="text-sm text-blue-600 font-semibold mt-1">
    Qty: {med.quantity}
  </div>
)}
                </div>
              ))
            ) : (
              <div className="text-sm text-gray-400 italic text-center">
                Empty shelf
              </div>
            )}
          </div>
        )}
      </div>
    );
  })()}
</div>
</div>
{/* F7 Shelf */}
<div className="absolute bottom-91 left-[29.5rem]">
<div className="absolute bottom-20 left-[18rem]">
  {(() => {
    const shelf = 'F7';
    const isOpen = openedShelf === shelf;

    return (
      <div id={`shelf-${shelf}`} className="relative">
        <button
          onClick={() => setOpenedShelf(isOpen ? null : shelf)}
          className={`w-24 h-20 rounded-2xl border-2 font-bold text-xl transition-Tout ${
            isOpen
              ? 'bg-blue-200 border-blue-600 scale-105 shadow-md'
              : 'bg-white border-gray-300 hover:border-blue-400'
          }`}
        >
          {shelf}
        </button>

        {isOpen && (
          <div className="absolute top-0 right-full mr-3 bg-white shadow-xl rounded-2xl p-3 w-64 max-h-[420px] overflow-y-auto z-50">
            <div className="sticky top-0 bg-white pb-2 mb-2 border-b font-bold text-lg text-gray-700">
              Shelf {shelf}
            </div>

            {(medsByShelf[shelf] || []).length > 0 ? (
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
                  <div
  className={`inline-block mt-1 px-2 py-1 rounded-lg text-xs font-semibold border ${
    categoryColors[med.category] ||
    'bg-gray-100 text-gray-700 border-gray-300'
  }`}
>
  {med.category}
</div>
                </div>
              ))
            ) : (
              <div className="text-sm text-gray-400 italic text-center">
                Empty shelf
              </div>
            )}
          </div>
        )}
      </div>
    );
  })()}
</div>
</div>

{/* R2 Shelf */}
<div className="absolute bottom-35 left-[29.5rem]">
<div className="absolute bottom-20 left-[18rem]">
  {(() => {
    const shelf = 'R2';
    const isOpen = openedShelf === shelf;

    return (
      <div id={`shelf-${shelf}`} className="relative">
        <button
          onClick={() => setOpenedShelf(isOpen ? null : shelf)}
          className={`w-24 h-20 rounded-2xl border-2 font-bold text-xl transition-Tout ${
            isOpen
              ? 'bg-blue-200 border-blue-600 scale-105 shadow-md'
              : 'bg-white border-gray-300 hover:border-blue-400'
          }`}
        >
          {shelf}
        </button>

        {isOpen && (
          <div className="absolute bottom-0 right-full mr-4 bg-white shadow-2xl rounded-2xl p-3 w-72 max-h-[500px] overflow-y-auto z-[9999]">
            <div className="sticky top-0 bg-white pb-2 mb-2 border-b font-bold text-lg text-gray-700">
              Shelf {shelf}
            </div>

            {(medsByShelf[shelf] || []).length > 0 ? (
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

<div
  className={`inline-block mt-1 px-2 py-1 rounded-lg text-xs font-semibold border ${
    categoryColors[med.category] ||
    'bg-gray-100 text-gray-700 border-gray-300'
  }`}
>
  {med.category}
</div>

{med.expiry && (
  <div
    className={`mt-2 text-sm font-bold ${
      med.expiry.endsWith('/26')
        ? 'text-red-600 animate-pulse'
        : med.expiry.endsWith('/27')
        ? 'text-yellow-500'
        : 'text-green-600'
    }`}
  >
    Exp: {med.expiry}
  </div>
)}

{med.quantity && (
  <div className="text-sm text-blue-600 font-semibold mt-1">
    Qty: {med.quantity}
  </div>
)}
                </div>
              ))
            ) : (
              <div className="text-sm text-gray-400 italic text-center">
                Empty shelf
              </div>
            )}
          </div>
        )}
      </div>
    );
  })()}
</div>
</div>

{/* R3 Shelf */}
<div className="absolute bottom-35 left-[20rem]">
<div className="absolute bottom-20 left-[18rem]">
  {(() => {
    const shelf = 'R3';
    const isOpen = openedShelf === shelf;

    return (
      <div id={`shelf-${shelf}`} className="relative">
        <button
          onClick={() => setOpenedShelf(isOpen ? null : shelf)}
          className={`w-24 h-20 rounded-2xl border-2 font-bold text-xl transition-Tout ${
            isOpen
              ? 'bg-blue-200 border-blue-600 scale-105 shadow-md'
              : 'bg-white border-gray-300 hover:border-blue-400'
          }`}
        >
          {shelf}
        </button>

        {isOpen && (
          <div className="absolute bottom-0 right-full mr-4 bg-white shadow-2xl rounded-2xl p-3 w-72 max-h-[500px] overflow-y-auto z-[9999]">
            <div className="sticky top-0 bg-white pb-2 mb-2 border-b font-bold text-lg text-gray-700">
              Shelf {shelf}
            </div>

            {(medsByShelf[shelf] || []).length > 0 ? (
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

<div
  className={`inline-block mt-1 px-2 py-1 rounded-lg text-xs font-semibold border ${
    categoryColors[med.category] ||
    'bg-gray-100 text-gray-700 border-gray-300'
  }`}
>
  {med.category}
</div>

{med.expiry && (
  <div
    className={`mt-2 text-sm font-bold ${
      med.expiry.endsWith('/26')
        ? 'text-red-600 animate-pulse'
        : med.expiry.endsWith('/27')
        ? 'text-yellow-500'
        : 'text-green-600'
    }`}
  >
    Exp: {med.expiry}
  </div>
)}

{med.quantity && (
  <div className="text-sm text-blue-600 font-semibold mt-1">
    Qty: {med.quantity}
  </div>
)}
                </div>
              ))
            ) : (
              <div className="text-sm text-gray-400 italic text-center">
                Empty shelf
              </div>
            )}
          </div>
        )}
      </div>
    );
  })()}
</div>
</div>
          </div>
        </div>
        </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="flex flex-col gap-4 w-72 shrink-0">

          {/* STATS */}
          <div className="bg-white rounded-2xl shadow p-4 border border-gray-200">
            <h2 className="text-lg font-bold text-gray-700 mb-3">📊 Statistiques</h2>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center bg-blue-50 rounded-xl px-3 py-2">
                <span className="text-sm text-gray-600">Total médicaments</span>
                <span className="font-bold text-blue-600">{medicineList.length}</span>
              </div>
              <div className="flex justify-between items-center bg-red-50 rounded-xl px-3 py-2">
                <span className="text-sm text-gray-600">Expirés (2026)</span>
                <span className="font-bold text-red-500">{medicineList.filter(m => m.expiry && m.expiry.endsWith('/26')).length}</span>
              </div>
              <div className="flex justify-between items-center bg-orange-50 rounded-xl px-3 py-2">
                <span className="text-sm text-gray-600">Expirent bientôt (2027)</span>
                <span className="font-bold text-orange-500">{medicineList.filter(m => m.expiry && m.expiry.endsWith('/27')).length}</span>
              </div>
            </div>
          </div>

          {/* ACTIVITY LOG */}
          <div className="bg-white rounded-2xl shadow p-4 border border-gray-200 flex flex-col gap-2">
            <h2 className="text-lg font-bold text-gray-700 mb-1">🕓 Activité récente</h2>
            <div className="flex flex-col gap-2 overflow-y-auto" style={{ maxHeight: '60vh' }}>
              {activityLog.length === 0 && (
                <p className="text-sm text-gray-400 text-center mt-4">Aucune activité pour l'instant</p>
              )}
              {activityLog.map((entry) => (
                <div key={entry.id} className={`rounded-xl p-3 text-xs border ${
                  entry.action === 'Ajout' ? 'bg-green-50 border-green-200' :
                  entry.action === 'Suppression' ? 'bg-red-50 border-red-200' :
                  'bg-blue-50 border-blue-200'
                }`}>
                  <div className="flex items-center gap-1 mb-1">
                    <span className="font-bold text-gray-700">
                      {entry.action === 'Ajout' ? '✅' : entry.action === 'Suppression' ? '🗑️' : '✏️'}
                      {' '}{entry.action}
                    </span>
                  </div>
                  <p className="font-semibold text-gray-800">{entry.medicine_name}</p>
                  <p className="text-gray-500 mt-1">{entry.details}</p>
                  <p className="text-gray-400 mt-1">{new Date(entry.created_at).toLocaleDateString('fr-FR')} · {new Date(entry.created_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
