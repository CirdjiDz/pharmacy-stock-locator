import React, { useState } from 'react';

export default function PharmacyStockLocator() {
  const meds = [
    { name: 'Paracetamol', shelf: 'A1', category: 'Pain Relief' },
    { name: 'Ibuprofen', shelf: 'A2', category: 'Pain Relief' },
    { name: 'Amoxicillin', shelf: 'B1', category: 'Antibiotic' },
    { name: 'Vitamin C', shelf: 'C3', category: 'Vitamins' },
    { name: 'Doliprane', shelf: 'A3', category: 'Pain Relief' },
    { name: 'Augmentin', shelf: 'B2', category: 'Antibiotic' },
    { name: 'Magnesium', shelf: 'C1', category: 'Supplements' },
    { name: 'Zinc', shelf: 'C3', category: 'Supplements' },
    { name: 'Efferalgan', shelf: 'A4', category: 'Pain Relief' },
    { name: 'Vitamine D', shelf: 'E2', category: 'Vitamins' },
    { name: 'Exval', shelf: 'F1', category: 'Blood Pressure' },
    { name: 'Extel', shelf: 'F1', category: 'Blood Pressure' },
    { name: 'Extel', shelf: 'C5', category: 'Blood Pressure' },
    { name: 'Rumava', shelf: 'F1', category: 'Immunosuppressant' },
    { name: 'ZANIDIP', shelf: 'F1', category: 'Blood Pressure' },
    { name: 'Aprovasc', shelf: 'F1', category: 'Blood Pressure' },
    { name: 'COTAREC', shelf: 'F1', category: 'Blood Pressure' },
    { name: 'VASTAREL', shelf: 'F1', category: 'Heart Health' },
    { name: 'Monotildiem', shelf: 'F1', category: 'Heart Health' },
    { name: 'TELMISARTE +', shelf: 'F1', category: 'Blood Pressure' },
    { name: 'NOVAROL', shelf: 'F1', category: 'Blood Thinner' },
    { name: 'ASPIRINE Cardio', shelf: 'F1', category: 'Blood Thinner' },
    { name: 'Exirb', shelf: 'F1', category: 'Blood Pressure' },
    { name: 'CRESTATINE', shelf: 'F1', category: 'Cholesterol' },
    { name: 'Superstat', shelf: 'F1', category: 'Cholesterol' },
    { name: 'Cresovast', shelf: 'F1', category: 'Cholesterol' },
    { name: 'Flecalur', shelf: 'F1', category: 'Heart Rhythm' },
    { name: 'COVERAM', shelf: 'F1', category: 'Blood Pressure' },
    { name: 'Bipreterax', shelf: 'F1', category: 'Blood Pressure' },
    { name: 'BIPROTENS', shelf: 'F1', category: 'Blood Pressure' },
    { name: 'COVERSYL', shelf: 'F1', category: 'Blood Pressure' },
    { name: 'TRIATEC', shelf: 'F1', category: 'Blood Pressure' },
    { name: 'CO-APROVEL', shelf: 'F1', category: 'Blood Pressure' },
    { name: 'APROVEL', shelf: 'F1', category: 'Blood Pressure' },
    { name: 'CO-IRBEK', shelf: 'F1', category: 'Blood Pressure' },
    { name: 'BYZOLEX', shelf: 'F1', category: 'Blood Pressure' },
    { name: 'Biopress', shelf: 'F1', category: 'Blood Pressure' },
    { name: 'Atacand', shelf: 'F1', category: 'Blood Pressure' },
    { name: 'HYTACAND', shelf: 'F1', category: 'Blood Pressure' },
    { name: 'Biopress Plus', shelf: 'F1', category: 'Blood Pressure' },
    { name: 'CO-ATABEK', shelf: 'F1', category: 'Blood Pressure' },
    { name: 'SPIRONOLONE', shelf: 'F1', category: 'Diuretic' },
    { name: 'Biprostene', shelf: 'F1', category: 'Blood Pressure' },
    { name: 'Sarsand', shelf: 'F1', category: 'Blood Pressure' },
    { name: 'PLAFIX', shelf: 'F1', category: 'Blood Thinner' },
    { name: 'FLUDEX LP', shelf: 'F1', category: 'Diuretic' },
    { name: 'ADEX LP', shelf: 'F1', category: 'Diuretic' },
    { name: 'Nafronyl', shelf: 'F1', category: 'Circulation' },
    { name: 'AMLOR', shelf: 'F1', category: 'Blood Pressure' },
    { name: 'EXFORGE', shelf: 'F1', category: 'Blood Pressure' },  
    { name: 'Montelair 10 mg', shelf: 'F2', category: 'Asthma/Allergy' },
    { name: 'Symbicort Turbuhaler', shelf: 'F2', category: 'Asthma/COPD' },
    { name: 'Flixotide', shelf: 'F2', category: 'Asthma/COPD' },
    { name: 'Flucasone mini', shelf: 'F2', category: 'Allergy/Nasal' },
    { name: 'Rinonide', shelf: 'F2', category: 'Allergy/Nasal' },
    { name: 'Budecort 200', shelf: 'F2', category: 'Asthma/COPD' },
    { name: 'Cozolamide', shelf: 'F2', category: 'Eye Care' },
    { name: 'Dexamethasone GL', shelf: 'F2', category: 'Eye Care' },
    { name: 'Lomac 20 mg', shelf: 'F2', category: 'Stomach/Acid' },
    { name: 'Zimor 20', shelf: 'F2', category: 'Stomach/Acid' },
    { name: 'Antag 20 mg', shelf: 'F2', category: 'Stomach/Acid' },
    { name: 'Proton 20 mg', shelf: 'F2', category: 'Stomach/Acid' },
    { name: 'FAMOTIDINE MABO', shelf: 'F2', category: 'Stomach/Acid' },
    { name: 'Dompérone 10 mg', shelf: 'F2', category: 'Nausea/Digestion' },
    { name: 'LISINOX 20 mg', shelf: 'F2', category: 'Stomach/Acid' },
    { name: 'Omeprotect 20 mg', shelf: 'F2', category: 'Stomach/Acid' },
    { name: 'Debridat', shelf: 'F2', category: 'Digestion/IBS' },
    { name: 'Trimébutine Biocare', shelf: 'F2', category: 'Digestion/IBS' },
    { name: 'Ponctuel', shelf: 'F2', category: 'Digestion/IBS' },
    { name: 'Mébévérine BEKER LP', shelf: 'F2', category: 'Digestion/IBS' },
    { name: 'DUSPATALIN 200 mg', shelf: 'F2', category: 'Digestion/IBS' },
    { name: 'Duspaverine 100 mg', shelf: 'F2', category: 'Digestion/IBS' },
    { name: 'Meteospasmyl', shelf: 'F2', category: 'Bloating/Gas' },
    { name: 'Glycerine LS', shelf: 'F2', category: 'Laxative' },
    { name: 'Riabal 30 mg', shelf: 'F2', category: 'Stomach Spasms' },
    { name: 'Freegas', shelf: 'F2', category: 'Bloating/Gas' },
    { name: 'Bilaxten 20 mg', shelf: 'F2', category: 'Allergy' },
    { name: 'Gatimox', shelf: 'F2', category: 'Antibiotic/Eye' },
    { name: 'Lowgas', shelf: 'F2', category: 'Bloating/Gas' },
    { name: 'Dimépra 2 mg', shelf: 'F2', category: 'Diarrhea' },
    { name: 'Dysentyl', shelf: 'F2', category: 'Diarrhea' },
    { name: 'Airditine', shelf: 'F2', category: 'Allergy' },
    { name: 'Isolact', shelf: 'F2', category: 'Laxative' },
    { name: 'Nobac', shelf: 'F2', category: 'Heartburn' },
    { name: 'Smecta', shelf: 'F2', category: 'Diarrhea' },
    { name: 'Flazol 125 mg', shelf: 'F2', category: 'Antibiotic' },
    { name: 'Bedelix', shelf: 'F2', category: 'Digestion' },
    { name: 'Diamicron 30 mg', shelf: 'F3', category: 'Diabetes' },
    { name: 'Levothyrox 100 µg', shelf: 'F3', category: 'Thyroid' },
    { name: 'Levothyrox 25 µg', shelf: 'F3', category: 'Thyroid' },
    { name: 'Athyrozol 5 mg', shelf: 'F3', category: 'Thyroid' },
    { name: 'Minirinmelt 60 µg', shelf: 'F3', category: 'Hormonal' },
    { name: 'Levothyrox 50 µg', shelf: 'F3', category: 'Thyroid' },
    { name: 'Diamicron 60 mg', shelf: 'F3', category: 'Diabetes' },
    { name: 'IRYS 3 mg', shelf: 'F3', category: 'Diabetes' },
    { name: 'IRYS 4 mg', shelf: 'F3', category: 'Diabetes' },
    { name: 'IRYS 6 mg', shelf: 'F3', category: 'Diabetes' },
    { name: 'Glucophage 500 mg', shelf: 'F3', category: 'Diabetes' },
    { name: 'NOVOFORMINE 500 mg', shelf: 'F3', category: 'Diabetes' },
    { name: 'Glucophage 1000 mg', shelf: 'F3', category: 'Diabetes' },
    { name: 'Larimel 50 mg', shelf: 'F3', category: 'Diabetes' },
    { name: 'Glinix', shelf: 'F3', category: 'Diabetes' },
    { name: 'Furozal 40 mg', shelf: 'F3', category: 'Diuretic' },
    { name: 'Diaglinide 2 mg', shelf: 'F3', category: 'Diabetes' },
    { name: 'Glybek 100 mg', shelf: 'F3', category: 'Diabetes' }
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

                <p className="text-lg text-gray-700">
                  <strong>Category:</strong> {med.category}
                </p>

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
                              <div className="text-sm text-gray-500">{med.category}</div>
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
                              <div className="text-sm text-gray-500">{med.category}</div>
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
                              <div className="text-sm text-gray-500">{med.category}</div>
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
                              <div className="text-sm text-gray-500">{med.category}</div>
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
                              <div className="text-sm text-gray-500">{med.category}</div>
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
<div className="absolute bottom-79 left-[13.6rem] flex gap-4 items-end">
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
                  <div className="text-sm text-gray-500">{med.category}</div>
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

<div className="absolute bottom-67 left-[28rem] flex gap-4 items-end">
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
                              <div className="text-sm text-gray-500">{med.category}</div>
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
