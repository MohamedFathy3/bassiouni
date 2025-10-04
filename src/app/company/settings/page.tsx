"use client";

import DashboardLayout from "../layout";
import React from "react";

export default function SettingsPage() {
  return (
    <div className="p-6 space-y-8 bg-gray-50 text-gray-800 min-h-screen">
      {/* إعدادات الخصوصية */}
      <section className="bg-white border border-gray-100 rounded-2xl shadow-md p-6 space-y-4">
        <h2 className="text-xl font-semibold text-emerald-600 border-b border-gray-200 pb-2">
          الخصوصية
        </h2>
        <div className="space-y-4">
          <ToggleItem label="إظهار الطلبات للمستخدمين الآخرين" />
          <ToggleItem label="السماح بتعليقات الآخرين على ملفي" defaultChecked />
        </div>
      </section>

      {/* إعدادات الإشعارات */}
      <section className="bg-white border border-gray-100 rounded-2xl shadow-md p-6 space-y-4">
        <h2 className="text-xl font-semibold text-blue-600 border-b border-gray-200 pb-2">
          الإشعارات
        </h2>
        <div className="space-y-4">
          <ToggleItem label="تفعيل إشعارات البريد الإلكتروني" defaultChecked />
          <ToggleItem label="تفعيل إشعارات الهاتف المحمول" />
        </div>
      </section>

      {/* إعدادات المظهر */}
      <section className="bg-white border border-gray-100 rounded-2xl shadow-md p-6 space-y-4">
        <h2 className="text-xl font-semibold text-purple-600 border-b border-gray-200 pb-2">
          المظهر
        </h2>
        <div className="space-y-2">
          <label className="text-sm text-gray-600">اختر الوضع:</label>
          <select className="w-full bg-gray-100 text-gray-800 rounded-lg px-4 py-2 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 transition">
            <option>فاتح (Light)</option>
            <option>داكن (Dark)</option>
            <option>النظام التلقائي</option>
          </select>
        </div>
      </section>

      {/* إعدادات اللغة */}
      <section className="bg-white border border-gray-100 rounded-2xl shadow-md p-6 space-y-4">
        <h2 className="text-xl font-semibold text-yellow-600 border-b border-gray-200 pb-2">
          اللغة
        </h2>
        <div className="space-y-2">
          <label className="text-sm text-gray-600">اختر اللغة:</label>
          <select className="w-full bg-gray-100 text-gray-800 rounded-lg px-4 py-2 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition">
            <option>العربية</option>
            <option>الإنجليزية</option>
            <option>فرنسية</option>
          </select>
        </div>
      </section>

      {/* الأمان */}
      <section className="bg-white border border-gray-100 rounded-2xl shadow-md p-6 space-y-4">
        <h2 className="text-xl font-semibold text-red-600 border-b border-gray-200 pb-2">
          الأمان
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-600">كلمة المرور الحالية</label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-200 focus:ring-2 focus:ring-red-400 transition"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600">كلمة المرور الجديدة</label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-200 focus:ring-2 focus:ring-red-400 transition"
            />
          </div>
        </div>
        <div className="text-right mt-4">
          <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition">
            تحديث كلمة المرور
          </button>
        </div>
      </section>

      {/* حذف الحساب */}
      <section className="bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-2xl shadow-md p-6 space-y-4">
        <h2 className="text-xl font-semibold text-red-700 border-b border-red-200 pb-2">
          حذف الحساب
        </h2>
        <p className="text-sm text-gray-600">
          عند حذف حسابك، سيتم إزالة جميع بياناتك نهائيًا ولا يمكن استعادتها.
          يرجى التأكد قبل المتابعة.
        </p>
        <div className="text-right">
          <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition">
            حذف الحساب نهائيًا
          </button>
        </div>
      </section>
    </div>
  );
}

// ✅ مكون التبديل Switch بنفس الهوية
function ToggleItem({
  label,
  defaultChecked = false,
}: {
  label: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex items-center justify-between cursor-pointer">
      <span className="text-sm text-gray-700">{label}</span>
      <input
        type="checkbox"
        defaultChecked={defaultChecked}
        className="h-5 w-5 text-emerald-600 rounded focus:ring-2 focus:ring-emerald-400 transition"
      />
    </label>
  );
}

SettingsPage.getLayout = function getLayout(page: React.ReactNode) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
