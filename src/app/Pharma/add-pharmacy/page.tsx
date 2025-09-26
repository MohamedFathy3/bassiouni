'use client';

import { useState } from "react";
import { MapPin, Plus, Edit } from "lucide-react";

interface Branch {
  id: number;
  name: string;
  location: string;
  pharmacy: string;
}

export default function PharmaciesPage() {
  // الصيدليات الأساسية
  const pharmacies = ["صيدلية النور", "صيدلية الشفاء", "صيدلية الحياة"];

  // الفروع الحالية
  const [branches, setBranches] = useState<Branch[]>([
    { id: 1, name: "فرع مدينة نصر", location: "القاهرة - مدينة نصر", pharmacy: "صيدلية النور" },
    { id: 2, name: "فرع سموحة", location: "الإسكندرية - سموحة", pharmacy: "صيدلية الشفاء" },
  ]);

  // مودال الإضافة / التعديل
  const [showModal, setShowModal] = useState(false);
  const [editBranchId, setEditBranchId] = useState<number | null>(null);

  // بيانات النموذج
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [pharmacy, setPharmacy] = useState<string>(pharmacies[0]);

  // فتح مودال الإضافة
  const openAddModal = () => {
    setEditBranchId(null);
    setName("");
    setLocation("");
    setPharmacy(pharmacies[0]);
    setShowModal(true);
  };

  // فتح مودال التعديل
  const openEditModal = (branch: Branch) => {
    setEditBranchId(branch.id);
    setName(branch.name);
    setLocation(branch.location);
    setPharmacy(branch.pharmacy);
    setShowModal(true);
  };

  // حفظ الفرع
  const saveBranch = () => {
    if (editBranchId !== null) {
      // تعديل
      setBranches(branches.map(b =>
        b.id === editBranchId ? { ...b, name, location, pharmacy } : b
      ));
    } else {
      // إضافة
      const newBranch: Branch = {
        id: branches.length + 1,
        name,
        location,
        pharmacy,
      };
      setBranches([...branches, newBranch]);
    }
    setShowModal(false);
  };

  return (
    <div className="p-6 min-h-screen bg-gray-950">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-emerald-400">الصيدليات والفروع</h1>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-5 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-2xl text-white font-semibold transition"
        >
          <Plus className="w-5 h-5" />
          إضافة فرع جديد
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {branches.map((branch) => (
          <div
            key={branch.id}
            className="bg-gray-900 border border-gray-700 rounded-2xl shadow-lg p-6 hover:shadow-emerald-500/30 transition duration-300"
          >
            <h2 className="text-xl font-semibold text-white mb-3">{branch.name}</h2>
            <p className="flex items-center gap-2 text-gray-300">
              <MapPin className="w-5 h-5 text-emerald-400" />
              الموقع: <span className="font-bold text-white">{branch.location}</span>
            </p>
            <p className="flex items-center gap-2 text-gray-300 mt-2">
              الصيدلية الأساسية: <span className="font-bold text-white">{branch.pharmacy}</span>
            </p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => openEditModal(branch)}
                className="flex items-center gap-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-xl text-white text-sm"
              >
                <Edit className="w-4 h-4" /> تعديل
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* مودال الإضافة / التعديل */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-gray-900 p-6 rounded-2xl w-full max-w-md shadow-lg text-white">
            <h2 className="text-2xl font-bold text-emerald-400 mb-4">
              {editBranchId !== null ? "تعديل الفرع" : "إضافة فرع جديد"}
            </h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="اسم الفرع"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-emerald-400"
              />
              <input
                type="text"
                placeholder="الموقع"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-emerald-400"
              />
              <select
                value={pharmacy}
                onChange={(e) => setPharmacy(e.target.value)}
                className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-emerald-400"
              >
                {pharmacies.map((ph, idx) => (
                  <option key={idx} value={ph}>{ph}</option>
                ))}
              </select>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-xl"
                >
                  إلغاء
                </button>
                <button
                  onClick={saveBranch}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-xl"
                >
                  حفظ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
