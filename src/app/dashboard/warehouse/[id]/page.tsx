'use client';

import { useState } from "react";
import { MapPin, Package, ShoppingCart, DollarSign, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface Product {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

interface WarehouseDetails {
  id: number;
  name: string;
  location: string;
  products: Product[];
}

export default function WarehouseDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [warehouse] = useState<WarehouseDetails>({
    id: Number(params.id),
    name: `مخزن ${params.id}`,
    location: "القاهرة - مدينة نصر",
    products: [
      { id: 1, name: "بانادول", quantity: 200, price: 50 },
      { id: 2, name: "فيتامين C", quantity: 150, price: 30 },
      { id: 3, name: "أوجمنتين", quantity: 100, price: 80 },
    ],
  });

  const totalValue = warehouse.products.reduce((sum, p) => sum + p.quantity * p.price, 0);

  return (
    <div className="min-h-screen p-6 bg-gray-950 text-white">
      {/* زر الرجوع */}
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-gray-800 hover:bg-gray-700 rounded-xl transition duration-200"
      >
        <ArrowLeft className="w-5 h-5" /> العودة
      </button>

      {/* معلومات المخزن */}
      <div className="bg-gray-900 p-6 rounded-2xl shadow-lg mb-6">
        <h1 className="text-2xl font-bold text-emerald-400 mb-4">{warehouse.name}</h1>
        <p className="flex items-center gap-2 text-gray-300 mb-2">
          <MapPin className="w-5 h-5 text-emerald-400" />
          الموقع: <span className="font-semibold text-white">{warehouse.location}</span>
        </p>
        <p className="flex items-center gap-2 text-gray-300 mb-2">
          <Package className="w-5 h-5 text-emerald-400" />
          عدد المنتجات: <span className="font-semibold text-white">{warehouse.products.length}</span>
        </p>
        <p className="flex items-center gap-2 text-gray-300">
          <DollarSign className="w-5 h-5 text-emerald-400" />
          القيمة الإجمالية: <span className="font-semibold text-white">{totalValue.toLocaleString()} ج.م</span>
        </p>
      </div>

      {/* جدول المنتجات */}
      <div className="bg-gray-900 p-6 rounded-2xl shadow-lg overflow-x-auto">
        <h2 className="text-xl font-bold text-emerald-400 mb-4">🛒 المنتجات</h2>
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-800">
              <th className="p-3 text-left">المنتج</th>
              <th className="p-3 text-center">الكمية</th>
              <th className="p-3 text-right">السعر</th>
              <th className="p-3 text-right">القيمة</th>
            </tr>
          </thead>
          <tbody>
            {warehouse.products.map((p) => (
              <tr key={p.id} className="border-b border-gray-700 hover:bg-gray-800 transition duration-200">
                <td className="p-3">{p.name}</td>
                <td className="p-3 text-center">{p.quantity}</td>
                <td className="p-3 text-right">{p.price.toLocaleString()} ج.م</td>
                <td className="p-3 text-right">{(p.quantity * p.price).toLocaleString()} ج.م</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
