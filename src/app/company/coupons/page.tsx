'use client';
import { useState } from 'react';
import { 
  FiSearch, 
  FiPlus, 
  FiFilter, 
  FiClock, 
  FiPercent, 
  FiUser, 
  FiHash,
  FiCalendar 
} from 'react-icons/fi';

interface Coupon {
  id: number;
  code: string;
  discount: number;
  validFrom: string;
  validTo: string;
  maxUses: number;
  usedCount: number;
  status: 'active' | 'upcoming' | 'expired';
}

const sampleCoupons: Coupon[] = [
  { 
    id: 1, 
    code: 'SUMMER20', 
    discount: 20, 
    validFrom: '2023-06-01', 
    validTo: '2023-06-30', 
    maxUses: 100,
    usedCount: 42,
    status: 'expired'
  },
  { 
    id: 2, 
    code: 'HEALTH15', 
    discount: 15, 
    validFrom: '2023-07-01', 
    validTo: '2023-07-31', 
    maxUses: 200,
    usedCount: 87,
    status: 'active'
  },
  { 
    id: 3, 
    code: 'BACKTOSCHOOL', 
    discount: 10, 
    validFrom: '2023-08-15', 
    validTo: '2023-09-15', 
    maxUses: 150,
    usedCount: 0,
    status: 'upcoming'
  },
];

export default function CouponsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'upcoming' | 'expired'>('all');
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(10);
  const [validDays, setValidDays] = useState(30);
  const [maxUses, setMaxUses] = useState(100);

  const generateRandomCode = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCouponCode(result);
  };

  const filteredCoupons = sampleCoupons.filter(coupon => {
    const matchesSearch = coupon.code.includes(searchTerm);
    const matchesFilter = filter === 'all' || coupon.status === filter;
    return matchesSearch && matchesFilter;
  });

  const handleSubmitCoupon = () => {
    if (!couponCode) {
      alert('الرجاء إدخال كود الكوبون');
      return;
    }

    const validFrom = new Date();
    const validTo = new Date();
    validTo.setDate(validFrom.getDate() + validDays);
    const formatDate = (date: Date) => date.toISOString().split('T')[0];

    console.log('Submitting coupon:', {
      code: couponCode,
      discount: couponDiscount,
      validFrom: formatDate(validFrom),
      validTo: formatDate(validTo),
      maxUses,
    });

    setCouponCode('');
    setCouponDiscount(10);
    setValidDays(30);
    setMaxUses(100);
    setShowCouponModal(false);
    alert('تم إضافة الكوبون بنجاح');
  };

  const renderStatusBadge = (status: string) => {
    const base = "px-3 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case 'active':
        return <span className={`${base} bg-emerald-100 text-emerald-700`}>نشط</span>;
      case 'upcoming':
        return <span className={`${base} bg-blue-100 text-blue-700 flex items-center gap-1`}><FiClock size={12}/> قادم</span>;
      case 'expired':
        return <span className={`${base} bg-red-100 text-red-700`}>منتهي</span>;
      default:
        return null;
    }
  };

  const calculateRemainingUses = (coupon: Coupon) => {
    return coupon.maxUses - coupon.usedCount;
  };

  return (
    <div className="p-8 bg-gray-50 text-gray-800 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-900">🎟️ إدارة الكوبونات</h1>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative flex-1 min-w-[250px]">
            <FiSearch className="absolute right-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="ابحث بكود الكوبون..."
              className="w-full pr-10 pl-4 py-2 rounded-lg bg-gray-100 text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="relative">
            <select
              className="appearance-none pl-4 pr-10 py-2 border rounded-lg bg-gray-100 border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              value={filter}
              onChange={(e) => setFilter(e.target.value as Coupon['status'] | 'all')}
            >
              <option value="all">جميع الكوبونات</option>
              <option value="active">نشطة</option>
              <option value="upcoming">قادمة</option>
              <option value="expired">منتهية</option>
            </select>
            <FiFilter className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Add Coupon Button */}
      <div className="flex justify-end mt-4">
        <button
          onClick={() => setShowCouponModal(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-md"
        >
          <FiPlus /> إضافة كوبون جديد
        </button>
      </div>

      {/* Coupons Table */}
      <div className="mt-6 bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-right text-sm font-semibold text-gray-600">#</th>
              <th className="px-4 py-3 text-right text-sm font-semibold text-gray-600">الكود</th>
              <th className="px-4 py-3 text-right text-sm font-semibold text-gray-600">الخصم</th>
              <th className="px-4 py-3 text-right text-sm font-semibold text-gray-600">الصلاحية</th>
              <th className="px-4 py-3 text-right text-sm font-semibold text-gray-600">الاستخدام</th>
              <th className="px-4 py-3 text-right text-sm font-semibold text-gray-600">الحالة</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredCoupons.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-gray-500">
                  لا توجد كوبونات متطابقة مع بحثك
                </td>
              </tr>
            ) : (
              filteredCoupons.map((coupon, index) => {
                const validFromDate = new Date(coupon.validFrom);
                const validToDate = new Date(coupon.validTo);
                const remainingUses = calculateRemainingUses(coupon);

                return (
                  <tr key={coupon.id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3 text-sm">{index + 1}</td>
                    <td className="px-4 py-3 font-mono font-medium text-gray-900">{coupon.code}</td>
                    <td className="px-4 py-3 text-sm text-red-600 flex items-center gap-1">
                      <FiPercent size={12}/> {coupon.discount}%
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      <div className="flex items-center gap-1">
                        <FiCalendar size={12}/> {validFromDate.toLocaleDateString()} - {validToDate.toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      <div className="flex items-center gap-1">
                        <FiUser size={12}/> {coupon.usedCount} / {coupon.maxUses}
                      </div>
                      {remainingUses > 0 && (
                        <div className="text-xs text-emerald-600">
                          متبقي {remainingUses} استخدام
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm">{renderStatusBadge(coupon.status)}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Coupon Modal */}
      {showCouponModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 w-full max-w-md">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">إضافة كوبون جديد</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">كود الكوبون</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      className="flex-1 px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      placeholder="SUMMER20"
                    />
                    <button
                      onClick={generateRandomCode}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-2 rounded-lg flex items-center gap-1 text-sm"
                    >
                      <FiHash size={14}/> توليد
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">نسبة الخصم (%)</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    value={couponDiscount}
                    onChange={(e) => setCouponDiscount(parseInt(e.target.value) || 0)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">مدة الصلاحية (أيام)</label>
                  <input
                    type="number"
                    min="1"
                    className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    value={validDays}
                    onChange={(e) => setValidDays(parseInt(e.target.value) || 1)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">عدد العملاء المسموح</label>
                  <input
                    type="number"
                    min="1"
                    className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    value={maxUses}
                    onChange={(e) => setMaxUses(parseInt(e.target.value) || 1)}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowCouponModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  إلغاء
                </button>
                <button
                  onClick={handleSubmitCoupon}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg"
                  disabled={!couponCode}
                >
                  إضافة
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
