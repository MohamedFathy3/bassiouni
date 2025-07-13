import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-blue-500">404</h1>
        <p className="text-xl text-gray-300 mt-4">عذرًا، الصفحة التي تبحث عنها غير موجودة.</p>
        <Link href="/" className="mt-6 inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white font-medium rounded-lg shadow-lg hover:from-blue-700 hover:to-green-700 transition-all">
          العودة إلى الصفحة الرئيسية
        </Link>
      </div>
    </div>
  );
}