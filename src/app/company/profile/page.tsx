"use client";

import DashboardLayout from "../layout";
import React from "react";
import Image from "next/image";
import { Trash2, Eye } from "lucide-react";

export default function ProfilePage() {
  const orders = [
    { id: 1, name: "بانادول", date: "2025-08-01", status: "قيد التنفيذ" },
    { id: 2, name: "زيرتك", date: "2025-07-30", status: "تم التوصيل" },
  ];

  return (
    <div className="p-6 space-y-8 bg-gray-50 text-gray-800 min-h-screen">
      {/* كرت بيانات المستخدم */}
      <div className="bg-white rounded-2xl shadow-md p-6 md:flex items-center gap-6 border border-gray-100">
        <div className="relative w-24 h-24 mx-auto md:mx-0">
          <Image
            src="/images.png"
            alt="User Avatar"
            fill
            className="rounded-full border-4 border-emerald-500 object-cover"
          />
        </div>
        <div className="flex-1 text-center md:text-right mt-4 md:mt-0">
          <h2 className="text-2xl font-bold text-emerald-600">محمد بسيوني</h2>
          <p className="text-sm text-gray-500 mt-1">example@email.com</p>
          <p className="text-sm text-gray-500">01012345678 - القاهرة، مصر</p>
        </div>
        <div className="flex flex-col gap-2 mt-4 md:mt-0">
          <button className="bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-lg text-white text-sm transition">
            تعديل البيانات
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white text-sm transition">
            تغيير كلمة المرور
          </button>
        </div>
      </div>

      {/* الطلبات */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
        <h3 className="text-xl font-semibold mb-4 border-b border-gray-200 pb-2 text-gray-700">
          طلباتي
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-gray-700 text-right">
            <thead>
              <tr className="bg-gray-100 text-gray-600">
                <th className="p-3">رقم</th>
                <th className="p-3">اسم الطلب</th>
                <th className="p-3">التاريخ</th>
                <th className="p-3">الحالة</th>
                <th className="p-3 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition"
                >
                  <td className="p-3 font-semibold">{order.id}</td>
                  <td className="p-3">{order.name}</td>
                  <td className="p-3">{order.date}</td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        order.status === "تم التوصيل"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="p-3 flex justify-center gap-3">
                    <button className="text-emerald-600 hover:text-emerald-800 transition">
                      <Eye size={18} />
                    </button>
                    <button className="text-red-500 hover:text-red-700 transition">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center p-4 text-gray-400">
                    لا توجد طلبات حالياً.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

ProfilePage.getLayout = function getLayout(page: React.ReactNode) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
