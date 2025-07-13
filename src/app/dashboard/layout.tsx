'use client';

import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import {
  Home,
  User,
  Settings,
  ClipboardList,
  Send,
  Archive,
  PlusCircle,
  Mail,
  Bell,
  LogIn,
} from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-6 text-white">
      <div className="flex flex-row-reverse w-full max-w-7xl h-[90vh] rounded-2xl overflow-hidden shadow-2xl bg-gray-900 border border-gray-700">
        
        {/* السلايدر الجانبي */}
        <aside className="w-64 bg-gradient-to-b from-gray-800 to-gray-900 text-white flex flex-col">
          <div className="p-6 text-center font-bold text-2xl border-b border-gray-700 tracking-wide">
            <span className="text-white">Pharma</span>
            <span className="text-emerald-400">Care</span>
          </div>

          <nav className="flex-1 p-4 space-y-2 text-sm">
            <NavLink href="/dashboard/" icon={<Home className="w-5 h-5" />}>الصفحة الرئيسية</NavLink>
            <NavLink href="/dashboard/today" icon={<ClipboardList className="w-5 h-5" />}>طلبات اليوم</NavLink>
            <NavLink href="/dashboard/sent" icon={<Send className="w-5 h-5" />}>طلبات مرسلة</NavLink>
            <NavLink href="/dashboard/archive" icon={<Archive className="w-5 h-5" />}>الأرشيف</NavLink>
            <NavLink href="/dashboard/request" icon={<PlusCircle className="w-5 h-5" />}>تقديم طلب</NavLink>
            <NavLink href="/dashboard/messages" icon={<Mail className="w-5 h-5" />}>الرسائل</NavLink>
            <NavLink href="/dashboard/notifications" icon={<Bell className="w-5 h-5" />}>الإشعارات</NavLink>
            <NavLink href="/dashboard/profile" icon={<User className="w-5 h-5" />}>الملف الشخصي</NavLink>
            <NavLink href="/dashboard/settings" icon={<Settings className="w-5 h-5" />}>الإعدادات</NavLink>
            <NavLink href="/login" icon={<LogIn className="w-5 h-5" />}>تسجيل الدخول</NavLink>
          </nav>

          <div className="p-4 text-xs text-center text-gray-400 border-t border-gray-700">
            © 2026 PharmaCare
          </div>
        </aside>

        {/* المحتوى الرئيسي + الشريط العلوي */}
        <main className="flex-1 overflow-y-auto flex flex-col bg-gray-950" dir="rtl">
          {/* الشريط العلوي */}
          <header className="flex items-center justify-between px-6 py-4 bg-gray-900 border-b border-gray-700 shadow-sm">
            {/* شعار الشركة */}
            <div className="flex items-center gap-3">
              <Image src="/images.png" alt="Company Logo" width={40} height={40} className="w-10 h-10 rounded-full border border-gray-600" />
              <span className="text-lg font-semibold text-white">بسيوني</span>
            </div>

            {/* البحث */}
            <div className="flex-1 mx-6 max-w-md">
              <input
                type="text"
                placeholder="ابحث هنا..."
                className="w-full px-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:ring-2 focus:ring-emerald-400 focus:outline-none text-sm"
              />
            </div>

            {/* الإشعارات */}
            <div className="relative">
              <Bell className="w-6 h-6 text-white hover:text-emerald-400 cursor-pointer" />
              <span className="absolute -top-1 -left-1 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
            </div>
          </header>

          {/* جسم الصفحة */}
          <div className="p-6 flex-1 bg-white text-white">{children}</div>
        </main>
      </div>
    </div>
  );
}

function NavLink({
  href,
  icon,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="flex items-center justify-end gap-3 px-4 py-2 rounded-md bg-white/5 hover:bg-emerald-600/20 transition-all text-white"
    >
      <span>{children}</span>
      <span>{icon}</span>
    </Link>
  );
}
