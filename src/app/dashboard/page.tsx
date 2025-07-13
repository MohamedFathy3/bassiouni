'use client';
import React from 'react';
import { FiCalendar, FiFilter, FiPieChart, FiPlusCircle, FiSearch, FiShoppingCart, FiUsers, FiAlertCircle } from 'react-icons/fi';
import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="flex flex-col text-black gap-6 p-4 bg-gray-50" dir="rtl">
      {/* العنوان والبحث مع صورة المستخدم */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-3">
            <Image 
              src="/images.png"
              alt="PharmaCare Logo"
              width={40}
              height={40}
              className="rounded-lg"
            />
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              <span className="text-blue-600">Pharma</span>
              <span className="text-green-600">Care</span>
            </h1>
          </div>
          <p className="text-gray-500 mt-1">مرحبًا بعودتك، دكتور محمد</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="ابحث عن أدوية، عملاء، طلبات..."
              className="w-full pr-10 pl-4 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
            />
            <FiSearch className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          
          <div className="relative">
            <Image
              src="/images.png"
              alt="User Profile"
              width={40}
              height={40}
              className="rounded-full border-2 border-green-500"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
          </div>
        </div>
      </div>

      {/* بطاقات الإحصائيات مع ألوان مميزة */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="الطلبات اليوم" 
          count={18} 
          icon={<FiShoppingCart className="w-6 h-6" />}
          trend="up"
          change={12}
          color="from-blue-500 to-blue-400"
        />
        <StatCard 
          title="أدوية منتهية" 
          count={3} 
          icon={<FiAlertCircle className="w-6 h-6" />}
          trend="up"
          change={2}
          color="from-amber-500 to-amber-400"
        />
        <StatCard 
          title="عملاء جدد" 
          count={5} 
          icon={<FiUsers className="w-6 h-6" />}
          trend="up"
          change={2}
          color="from-green-500 to-green-400"
        />
        <StatCard 
          title="إجمالي المبيعات" 
          count="8,750 ر.س" 
          icon={<FiPieChart className="w-6 h-6" />}
          trend="up"
          change={15}
          color="from-purple-500 to-purple-400"
        />
      </section>

      {/* المحتوى الرئيسي */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* جدول الطلبات */}
        <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">أحدث الطلبات</h2>
            <button className="flex items-center gap-2 text-sm bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white px-4 py-2 rounded-lg transition-all shadow-md">
              <FiPlusCircle className="w-4 h-4" />
              <span>إنشاء طلب جديد</span>
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-right">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="p-3 font-medium">رقم الطلب</th>
                  <th className="p-3 font-medium">العميل</th>
                  <th className="p-3 font-medium">الأدوية</th>
                  <th className="p-3 font-medium">المبلغ</th>
                  <th className="p-3 font-medium">الحالة</th>
                  <th className="p-3 font-medium">التاريخ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <OrderRow 
                  id={10258} 
                  customer="أحمد محمد" 
                  items={["باراسيتامول", "فيتامين سي"]} 
                  amount={85} 
                  status="مكتمل" 
                  date="اليوم - 10:45 ص" 
                />
                <OrderRow 
                  id={10257} 
                  customer="سارة عبدالله" 
                  items={["أوميبرازول", "كلورفينيرامين"]} 
                  amount={120} 
                  status="قيد التحضير" 
                  date="اليوم - 09:30 ص" 
                />
                <OrderRow 
                  id={10256} 
                  customer="خالد علي" 
                  items={["أموكسيسيلين", "إيبوبروفين"]} 
                  amount={65} 
                  status="ملغي" 
                  date="أمس - 03:15 م" 
                />
              </tbody>
            </table>
          </div>
          
          <div className="p-3 border-t border-gray-200 text-center">
            <button className="text-green-600 hover:text-green-800 text-sm font-medium transition-colors">
              عرض جميع الطلبات →
            </button>
          </div>
        </div>

        {/* الجانب الأيمن */}
        <div className="w-full lg:w-80 space-y-6">
          {/* فلتر الطلبات */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-4">
              <FiFilter className="w-5 h-5 text-green-600" />
              تصفية الطلبات
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">حسب الحالة</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-green-500 focus:border-green-500">
                  <option>الكل</option>
                  <option>قيد التحضير</option>
                  <option>جاهز للتسليم</option>
                  <option>مكتمل</option>
                  <option>ملغي</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الفترة الزمنية</label>
                <div className="flex gap-2">
                  <select className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-green-500 focus:border-green-500">
                    <option>اليوم</option>
                    <option>أمس</option>
                    <option>الأسبوع</option>
                    <option>الشهر</option>
                    <option>مخصص</option>
                  </select>
                  <button className="flex items-center justify-center w-10 h-10 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    <FiCalendar className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <button className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white py-2.5 rounded-lg text-sm font-medium hover:from-green-700 hover:to-green-600 transition-all shadow-md">
                تطبيق الفلتر
              </button>
            </div>
          </div>

          {/* الأدوية الأكثر طلباً */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">الأدوية الأكثر طلباً</h3>
            
            <div className="space-y-4">
              {[
                { name: "باراسيتامول", orders: 42, image: "/images.png" },
                { name: "أوميبرازول", orders: 35, image: "/images.png" },
                { name: "أموكسيسيلين", orders: 28, image: "/images.png" },
                { name: "إيبوبروفين", orders: 25, image: "/images.png" },
                { name: "فيتامين د", orders: 20, image: "/images-d.png" },
              ].map((medicine, index) => (
                <div key={index} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="relative w-10 h-10">
                    <Image
                      src={medicine.image}
                      alt={medicine.name}
                      fill
                      className="object-contain rounded-lg border border-gray-200"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-800">{medicine.name}</h4>
                    <p className="text-xs text-gray-500">{medicine.orders} طلب</p>
                  </div>
                  <span className="text-green-600 text-sm font-medium">{Math.round((medicine.orders / 150) * 100)}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* تنبيهات الأدوية */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">تنبيهات الأدوية</h3>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
                <FiAlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-medium text-amber-800">أدوية منتهية الصلاحية</h4>
                  <p className="text-xs text-amber-600 mt-1">3 أدوية تحتاج إلى مراجعة فورية</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <FiAlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-medium text-blue-800">أدوية قاربت على النفاد</h4>
                  <p className="text-xs text-blue-600 mt-1">7 أدوية تحتاج إلى إعادة طلب</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, count, icon, trend, change, color }: { 
  title: string; 
  count: React.ReactNode;
  icon: React.ReactNode;
  trend?: 'up' | 'down';
  change?: number;
  color: string;
}) {
  return (
    <div className={`bg-gradient-to-r ${color} p-4 rounded-xl shadow-sm text-white overflow-hidden relative`}>
      <div className="relative z-10">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-white/90">{title}</p>
            <p className="text-2xl font-bold mt-1">{count}</p>
          </div>
          <div className="p-2 rounded-lg bg-white/20 backdrop-blur-sm">
            {icon}
          </div>
        </div>
        
        {trend && change && (
          <div className="flex items-center mt-3 text-xs">
            <span className="inline-flex items-center bg-white/20 px-2 py-0.5 rounded-full">
              {trend === 'up' ? (
                <svg className="w-3 h-3 ml-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12 7a1 1 0 01-1 1H9v1h2a1 1 0 110 2H9v1h2a1 1 0 110 2H9v1a1 1 0 11-2 0v-1H5a1 1 0 110-2h2v-1H5a1 1 0 110-2h2V8H5a1 1 0 010-2h2V5a1 1 0 112 0v1h2a1 1 0 011 1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-3 h-3 ml-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              )}
              {change}%
            </span>
            <span className="text-white/80 mr-1">مقارنة بالأسبوع الماضي</span>
          </div>
        )}
      </div>
      <div className="absolute -bottom-10 -right-10 w-24 h-24 rounded-full bg-white/10"></div>
    </div>
  );
}

function OrderRow({ id, customer, items, amount, status, date }: { 
  id: number;
  customer: string;
  items: string[];
  amount: number;
  status: string;
  date: string;
}) {
  const statusStyles = {
    "مكتمل": "bg-green-100 text-green-800",
    "قيد التحضير": "bg-blue-100 text-blue-800",
    "ملغي": "bg-red-100 text-red-800",
    "جاهز للتسليم": "bg-amber-100 text-amber-800",
  }[status] || "bg-gray-100 text-gray-800";

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="p-3 font-medium text-gray-900">#{id}</td>
      <td className="p-3 text-gray-700">{customer}</td>
      <td className="p-3 text-gray-600">
        <div className="line-clamp-1" title={items.join("، ")}>
          {items.join("، ")}
        </div>
      </td>
      <td className="p-3 font-medium text-gray-900">{amount} ر.س</td>
      <td className="p-3">
        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles}`}>
          {status}
        </span>
      </td>
      <td className="p-3 text-gray-500 text-sm">{date}</td>
    </tr>
  );
}