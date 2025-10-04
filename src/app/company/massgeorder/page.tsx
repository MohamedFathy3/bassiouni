"use client";

import { useRouter } from "next/navigation";
import { FiCheckCircle, FiXCircle, FiClock, FiEye } from "react-icons/fi";

export default function OrdersPage() {
  const router = useRouter();

  const orders = [
    { id: 1, customer: "محمد أحمد", total: 450, status: "pending" },
    { id: 2, customer: "شركة الدواء", total: 1200, status: "approved" },
    { id: 3, customer: "صيدلية الشفاء", total: 300, status: "rejected" },
  ];

  const getStatus = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
            <FiCheckCircle /> مقبول
          </span>
        );
      case "rejected":
        return (
          <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm font-medium">
            <FiXCircle /> مرفوض
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm font-medium">
            <FiClock /> قيد المعالجة
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-8">
      <h1 className="text-3xl font-bold mb-8 text-emerald-700">📦 قائمة الطلبات</h1>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
        <table className="min-w-full text-left border-collapse">
          <thead>
            <tr className="bg-emerald-50 text-emerald-700 text-sm uppercase tracking-wider">
              <th className="px-6 py-4">#</th>
              <th className="px-6 py-4">العميل</th>
              <th className="px-6 py-4">الإجمالي</th>
              <th className="px-6 py-4">الحالة</th>
              <th className="px-6 py-4">إجراء</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.map((order, idx) => (
              <tr
                key={order.id}
                className={`transition hover:bg-emerald-50/50 ${
                  idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <td className="px-6 py-4 font-semibold">{order.id}</td>
                <td className="px-6 py-4">{order.customer}</td>
                <td className="px-6 py-4">{order.total} جنيه</td>
                <td className="px-6 py-4">{getStatus(order.status)}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() =>
                      router.push(`/dashboard/massgeorder/${order.id}`)
                    }
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    <FiEye />
                    عرض التفاصيل
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
