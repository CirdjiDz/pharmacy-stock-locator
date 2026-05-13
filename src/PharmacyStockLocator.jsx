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
  ];

  const [search, setSearch] = useState('');
  const [openedShelf, setOpenedShelf] = useState(null);
  const [highlightedMed, setHighlightedMed] = useState('');
  const [medicineList, setMedicineList] = useState(meds);
  const [showModal, setShowModal] = useState(false);
  const [newMedicine, setNewMedicine] = useState({
    name: '',
    shelf: 'A1',
    category: '',
    ingredient: '',
    notes: '',
  });

  const filtered = medicineList.filter((med) =>
    med.name.toLowerCase().includes(search.toLowerCase())
  );

  const shelfStructure = {
    A: 8,
    B: 7,
    C: 7,
    D: 9,
    E: 3,
  };

  const shelves = Object.entries(shelfStructure).flatMap(([letter, count]) =>
    Array.from({ length: count }, (_, i) => `${letter}${i + 1}`)
  );

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

  const handleAddMedicine = () => {
    if (!newMedicine.name || !newMedicine.category) return;

    setMedicineList([
      ...medicineList,
      {
        name: newMedicine.name,
        shelf: newMedicine.shelf,
        category: newMedicine.category,
        ingredient: newMedicine.ingredient,
        notes: newMedicine.notes,
      },
    ]);

    setNewMedicine({
      name: '',
      shelf: 'A1',
      category: '',
      ingredient: '',
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
                Add New Medicine
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
                  placeholder="Main Ingredient"
                  value={newMedicine.ingredient}
                  onChange={(e) =>
                    setNewMedicine({ ...newMedicine, ingredient: e.target.value })
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
                    Save Medicine
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
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
            <div className="absolute left-4 top-40 flex flex-col gap-3">
              {Array.from({ length: 8 }, (_, i) => {
                const shelf = `A${8 - i}`;
                const isOpen = openedShelf === shelf;

                return (
                  <div key={shelf} id={`shelf-${shelf}`}>
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
                      <div className="bg-white shadow-xl rounded-2xl p-3 mt-2 w-56 z-50 relative">
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
            <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-3">
              {['E1', 'E2', 'E3'].map((shelf) => {
                const isOpen = openedShelf === shelf;

                return (
                  <div key={shelf} id={`shelf-${shelf}`}>
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
                      <div className="bg-white shadow-xl rounded-2xl p-3 mt-2 w-56 z-50 relative">
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
            <div className="absolute left-[38%] top-60 flex flex-col gap-3">
              {Array.from({ length: 7 }, (_, i) => {
                const shelf = `B${7 - i}`;
                const isOpen = openedShelf === shelf;

                return (
                  <div key={shelf} id={`shelf-${shelf}`}>
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
                      <div className="bg-white shadow-xl rounded-2xl p-3 mt-2 w-56 z-50 relative">
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
            <div className="absolute left-[52%] top-60 flex flex-col gap-3">
              {Array.from({ length: 7 }, (_, i) => {
                const shelf = `C${7 - i}`;
                const isOpen = openedShelf === shelf;

                return (
                  <div key={shelf} id={`shelf-${shelf}`}>
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
                      <div className="bg-white shadow-xl rounded-2xl p-3 mt-2 w-56 z-50 relative">
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
            <div className="absolute right-4 top-40 flex flex-col gap-3">
              {Array.from({ length: 9 }, (_, i) => {
                const shelf = `D${9 - i}`;
                const isOpen = openedShelf === shelf;

                return (
                  <div key={shelf} id={`shelf-${shelf}`}>
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
                      <div className="bg-white shadow-xl rounded-2xl p-3 mt-2 w-56 z-50 relative right-56">
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
          </div>
        </div>
      </div>
    </div>
  );
}
