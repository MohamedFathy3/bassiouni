'use client';

import { useState, useEffect } from "react";
import { MapPin, Package, ShoppingCart, DollarSign, ArrowRight, Plus } from "lucide-react";
import Link from "next/link";

interface ProductInput {
  name: string;
  quantity: number;
  price: number;
}

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
  const [warehouses, setWarehouses] = useState<Warehouse[]>([
    { id: 1, name: "مخزن القاهرة", location: "القاهرة - مدينة نصر", totalProducts: 120, totalQuantity: 4500, totalValue: 250000, pharmacy: "صيدلية النور", products: [] },
    { id: 2, name: "مخزن الإسكندرية", location: "الإسكندرية - سموحة", totalProducts: 80, totalQuantity: 2100, totalValue: 180000, pharmacy: "صيدلية الشفاء", products: [] },
    { id: 3, name: "مخزن أسيوط", location: "أسيوط - شارع الجمهورية", totalProducts: 60, totalQuantity: 1200, totalValue: 90000, pharmacy: "صيدلية الحياة", products: [] },
  ]);

  const [showModal, setShowModal] = useState(false);
  const pharmacies = ["صيدلية النور", "صيدلية الشفاء", "صيدلية الحياة"];

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [pharmacy, setPharmacy] = useState<string>("");
  const [products, setProducts] = useState<ProductInput[]>([]);
  const [productName, setProductName] = useState("");
  const [productQuantity, setProductQuantity] = useState<number>(0);
  const [productPrice, setProductPrice] = useState<number>(0);

  useEffect(() => {
    if (pharmacies.length > 0) setPharmacy(pharmacies[0]);
  }, [showModal]);

  const addProduct = () => {
    if (!productName) return;
    setProducts([...products, { name: productName, quantity: productQuantity, price: productPrice }]);
    setProductName("");
    setProductQuantity(0);
    setProductPrice(0);
  };

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
    <div className="p-6 min-h-screen bg-gray-50 text-gray-900 space-y-8">
      {/* رأس الصفحة */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-extrabold text-emerald-600 tracking-tight">
          المخازن
        </h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 rounded-2xl text-white font-semibold transition-all shadow-md hover:shadow-emerald-300/50"
        >
          <Plus className="w-5 h-5" />
          إضافة مخزن
        </button>
      </div>

      {/* بطاقات المخازن */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {warehouses.map((warehouse) => (
          <div
            key={warehouse.id}
            className="bg-white border border-gray-200 rounded-3xl shadow-sm hover:shadow-lg p-6 transition-all duration-300"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">{warehouse.name}</h2>

            <div className="space-y-3 text-gray-700 text-sm">
              <InfoItem icon={<Package className="text-emerald-500" />} label="عدد المنتجات" value={warehouse.totalProducts} />
              <InfoItem icon={<ShoppingCart className="text-emerald-500" />} label="إجمالي الكمية" value={warehouse.totalQuantity} />
              <InfoItem icon={<DollarSign className="text-emerald-500" />} label="القيمة الإجمالية" value={`${warehouse.totalValue.toLocaleString()} ر.س`} />
              <InfoItem icon={<MapPin className="text-emerald-500" />} label="الصيدلية" value={warehouse.pharmacy} />
            </div>

            <div className="mt-6 text-left">
              <Link
                href={`/Pharma/warehouse/${warehouse.id}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 rounded-2xl text-sm font-semibold text-white transition-all"
              >
                عرض التفاصيل
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* مودال الإضافة */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-3xl w-full max-w-2xl shadow-2xl space-y-6 border border-gray-200">
            <h2 className="text-2xl font-bold text-emerald-600 text-center border-b border-gray-200 pb-3">
              إضافة مخزن جديد
            </h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="اسم المخزن"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 rounded-xl bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-emerald-500"
              />
              <input
                type="text"
                placeholder="الموقع"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-2 rounded-xl bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-emerald-500"
              />
              <select
                value={pharmacy}
                onChange={(e) => setPharmacy(e.target.value)}
                className="w-full px-4 py-2 rounded-xl bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-emerald-500"
              >
                {pharmacies.map((ph, idx) => (
                  <option key={idx} value={ph}>{ph}</option>
                ))}
              </select>

              <div className="border-t border-gray-200 pt-4">
                <h3 className="font-semibold text-gray-900 mb-3 text-lg">إضافة منتجات</h3>

                <div className="flex flex-wrap gap-2 mb-3">
                  <input
                    type="text"
                    placeholder="اسم المنتج"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-md bg-gray-50 border border-gray-300"
                  />
                  <input
                    type="number"
                    placeholder="الكمية"
                    value={productQuantity}
                    onChange={(e) => setProductQuantity(Number(e.target.value))}
                    className="w-28 px-3 py-2 rounded-md bg-gray-50 border border-gray-300"
                  />
                  <input
                    type="number"
                    placeholder="السعر"
                    value={productPrice}
                    onChange={(e) => setProductPrice(Number(e.target.value))}
                    className="w-28 px-3 py-2 rounded-md bg-gray-50 border border-gray-300"
                  />
                  <button
                    onClick={addProduct}
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-xl font-semibold text-white"
                  >
                    إضافة
                  </button>
                </div>

                {products.length > 0 && (
                  <ul className="text-gray-700 text-sm space-y-1 max-h-32 overflow-y-auto bg-gray-50 p-3 rounded-xl border border-gray-200">
                    {products.map((p, idx) => (
                      <li key={idx}>
                        <span className="font-medium">{p.name}</span> — {p.quantity} قطعة — {p.price.toLocaleString()} ر.س
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2 bg-gray-200 hover:bg-gray-300 rounded-xl font-semibold text-gray-800"
                >
                  إلغاء
                </button>
                <button
                  onClick={saveWarehouse}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-xl font-semibold text-white"
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

function InfoItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: React.ReactNode }) {
  return (
    <p className="flex items-center gap-2">
      {icon}
      {label}: <span className="font-semibold text-gray-900">{value}</span>
    </p>
  );
}
