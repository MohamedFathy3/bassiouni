'use client';

import { useState, useEffect } from "react";
import { MapPin, Package, ShoppingCart, DollarSign, ArrowRight, Plus } from "lucide-react";
import Link from "next/link";

// نوع البيانات للمنتج
interface ProductInput {
  name: string;
  quantity: number;
  price: number;
}

// نوع البيانات للمخزن
interface Warehouse {
  id: number;
  name: string;
  location: string;
  totalProducts: number;
  totalQuantity: number;
  totalValue: number;
  pharmacy: string;
  products: ProductInput[];
}

export default function WarehousesPage() {
  // المخازن الأساسية
  const [warehouses, setWarehouses] = useState<Warehouse[]>([
    { id: 1, name: "مخزن القاهرة", location: "القاهرة - مدينة نصر", totalProducts: 120, totalQuantity: 4500, totalValue: 250000, pharmacy: "صيدلية النور", products: [] },
    { id: 2, name: "مخزن الإسكندرية", location: "الإسكندرية - سموحة", totalProducts: 80, totalQuantity: 2100, totalValue: 180000, pharmacy: "صيدلية الشفاء", products: [] },
    { id: 3, name: "مخزن أسيوط", location: "أسيوط - شارع الجمهورية", totalProducts: 60, totalQuantity: 1200, totalValue: 90000, pharmacy: "صيدلية الحياة", products: [] },
  ]);

  // مودال الإضافة
  const [showModal, setShowModal] = useState(false);

  // الصيدليات المتاحة
  const pharmacies = ["صيدلية النور", "صيدلية الشفاء", "صيدلية الحياة"];

  // بيانات النموذج
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [pharmacy, setPharmacy] = useState<string>(""); // يبدأ فارغ
  const [products, setProducts] = useState<ProductInput[]>([]);

  const [productName, setProductName] = useState("");
  const [productQuantity, setProductQuantity] = useState<number>(0);
  const [productPrice, setProductPrice] = useState<number>(0);

  // عند فتح المودال، نحدد أول صيدلية تلقائيًا
  useEffect(() => {
    if (pharmacies.length > 0) setPharmacy(pharmacies[0]);
  }, [showModal]);

  // إضافة منتج للمودال
  const addProduct = () => {
    if (!productName) return;
    setProducts([...products, { name: productName, quantity: productQuantity, price: productPrice }]);
    setProductName("");
    setProductQuantity(0);
    setProductPrice(0);
  };

  // حفظ المخزن الجديد
  const saveWarehouse = () => {
    const newWarehouse: Warehouse = {
      id: warehouses.length + 1,
      name,
      location,
      pharmacy,
      totalProducts: products.length,
      totalQuantity: products.reduce((sum, p) => sum + p.quantity, 0),
      totalValue: products.reduce((sum, p) => sum + p.quantity * p.price, 0),
      products,
    };
    setWarehouses([...warehouses, newWarehouse]);
    setShowModal(false);
    setName("");
    setLocation("");
    setPharmacy(pharmacies[0]);
    setProducts([]);
  };

  return (
    <div className="p-6 min-h-screen bg-gray-950">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-emerald-400">المخازن</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-5 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-2xl text-white font-semibold transition"
        >
          <Plus className="w-5 h-5" />
          إضافة مخزن
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {warehouses.map((warehouse) => (
          <div
            key={warehouse.id}
            className="bg-gray-900 border border-gray-700 rounded-2xl shadow-lg p-6 hover:shadow-emerald-500/30 transition duration-300"
          >
            <h2 className="text-xl font-semibold text-white mb-4">{warehouse.name}</h2>

            <div className="space-y-3 text-gray-300 text-sm">
              <p className="flex items-center gap-2">
                <Package className="w-5 h-5 text-emerald-400" />
                عدد المنتجات: <span className="font-bold text-white">{warehouse.totalProducts}</span>
              </p>
              <p className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-emerald-400" />
                إجمالي الكمية: <span className="font-bold text-white">{warehouse.totalQuantity}</span>
              </p>
              <p className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-emerald-400" />
                القيمة الإجمالية: <span className="font-bold text-white">{warehouse.totalValue.toLocaleString()} ر.س</span>
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-emerald-400" />
                الصيدلية: <span className="font-bold text-white">{warehouse.pharmacy}</span>
              </p>
            </div>

            <div className="mt-6 text-left">
              <Link
                href={`/dashboard/warehouse/${warehouse.id}`}
                className="inline-flex items-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-700 rounded-2xl text-sm font-semibold text-white transition duration-300"
              >
                المزيد
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* مودال الإضافة */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-gray-900 p-6 rounded-2xl w-full max-w-xl shadow-lg text-white">
            <h2 className="text-2xl font-bold text-emerald-400 mb-4">إضافة مخزن جديد</h2>
            
            <div className="space-y-4">
              <input
                type="text"
                placeholder="اسم المخزن"
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

              <div className="border-t border-gray-700 pt-4">
                <h3 className="font-semibold text-white mb-2">إضافة منتجات</h3>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="اسم المنتج"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-md bg-gray-800 border border-gray-700"
                  />
                  <input
                    type="number"
                    placeholder="الكمية"
                    value={productQuantity}
                    onChange={(e) => setProductQuantity(Number(e.target.value))}
                    className="w-24 px-3 py-2 rounded-md bg-gray-800 border border-gray-700"
                  />
                  <input
                    type="number"
                    placeholder="السعر"
                    value={productPrice}
                    onChange={(e) => setProductPrice(Number(e.target.value))}
                    className="w-24 px-3 py-2 rounded-md bg-gray-800 border border-gray-700"
                  />
                  <button
                    onClick={addProduct}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-xl"
                  >
                    إضافة
                  </button>
                </div>

                {products.length > 0 && (
                  <ul className="text-gray-300 text-sm space-y-1 max-h-32 overflow-y-auto">
                    {products.map((p, idx) => (
                      <li key={idx}>
                        {p.name} - {p.quantity} قطعة - {p.price.toLocaleString()} ر.س
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-xl"
                >
                  إلغاء
                </button>
                <button
                  onClick={saveWarehouse}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-xl"
                >
                  حفظ المخزن
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
