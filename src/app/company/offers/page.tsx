'use client';
import { useState } from 'react';
import { FiSearch, FiPlus, FiFilter, FiClock, FiPercent, FiCalendar } from 'react-icons/fi';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
}

interface Offer {
  id: number;
  product: Product;
  discount: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'upcoming' | 'expired';
  title: string;
}

const sampleProducts: Product[] = [
  { id: 1, name: 'دروب دون', category: 'مسكنات', price: 50 },
  { id: 2, name: 'فيتامين سي', category: 'فيتامينات', price: 30 },
  { id: 3, name: 'أموكسيسيلين', category: 'مضادات حيوية', price: 80 },
  { id: 4, name: 'ميتفورمين', category: 'أدوية سكري', price: 45 },
];

const sampleOffers: Offer[] = [
  { id: 1, product: sampleProducts[0], discount: 20, startDate: '2023-06-01', endDate: '2023-06-04', status: 'expired', title: 'عرض صيفي' },
  { id: 2, product: sampleProducts[1], discount: 15, startDate: '2023-07-15', endDate: '2023-07-18', status: 'active', title: 'خصومات الصيف' },
  { id: 3, product: sampleProducts[2], discount: 10, startDate: '2023-08-20', endDate: '2023-08-23', status: 'upcoming', title: 'عرض العودة للمدارس' },
];

export default function OffersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'upcoming' | 'expired'>('all');
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [discount, setDiscount] = useState(0);
  const [duration, setDuration] = useState(3);
  const [offerTitle, setOfferTitle] = useState('');

  const filteredOffers = sampleOffers.filter(offer => {
    const matchesSearch =
      offer.product.name.includes(searchTerm) ||
      offer.product.category.includes(searchTerm) ||
      offer.title.includes(searchTerm);
    const matchesFilter = filter === 'all' || offer.status === filter;
    return matchesSearch && matchesFilter;
  });

  const handleSubmitOffer = () => {
    if (!selectedProduct) {
      alert('الرجاء اختيار منتج');
      return;
    }
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + duration);
    const formatDate = (date: Date) => date.toISOString().split('T')[0];
    const status = 'upcoming';
    console.log('Submitting offer:', {
      product: selectedProduct,
      discount,
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
      status,
      title: offerTitle
    });
    setSelectedProduct(null);
    setDiscount(0);
    setDuration(3);
    setOfferTitle('');
    setShowOfferModal(false);
    alert('تم إضافة العرض بنجاح');
  };

  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">نشط</span>;
      case 'upcoming':
        return <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs flex items-center gap-1"><FiClock size={12} /> قادم</span>;
      case 'expired':
        return <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs">منتهي</span>;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 text-gray-900 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-800">العروض الترويجية</h1>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative flex-1 min-w-[250px]">
            <FiSearch className="absolute right-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="ابحث بالمنتج أو الفئة أو اسم العرض..."
              className="w-full pr-10 pl-4 py-2 rounded-lg bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="relative">
            <select
              className="appearance-none pl-4 pr-10 py-2 border rounded-lg bg-white border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              value={filter}
              onChange={(e) => setFilter(e.target.value as 'all' | 'active' | 'upcoming' | 'expired')}
            >
              <option value="all">جميع العروض</option>
              <option value="active">نشطة</option>
              <option value="upcoming">قادمة</option>
              <option value="expired">منتهية</option>
            </select>
            <FiFilter className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Add Offer Button */}
      <div className="flex justify-end">
        <button
          onClick={() => setShowOfferModal(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <FiPlus /> إضافة عرض جديد
        </button>
      </div>

      {/* Offers Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              {['#', 'اسم العرض', 'المنتج', 'السعر الأصلي', 'الخصم', 'السعر بعد الخصم', 'المدة', 'الحالة'].map((title, idx) => (
                <th key={idx} className="px-4 py-3 text-right text-sm font-semibold text-gray-700">{title}</th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {filteredOffers.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-6 text-center text-gray-400">لا توجد عروض متطابقة مع بحثك</td>
              </tr>
            ) : (
              filteredOffers.map((offer, index) => {
                const discountedPrice = offer.product.price * (1 - offer.discount / 100);
                const durationDays = Math.ceil((new Date(offer.endDate).getTime() - new Date(offer.startDate).getTime()) / (1000 * 60 * 60 * 24));
                return (
                  <tr key={offer.id} className="hover:bg-gray-50 transition-all">
                    <td className="px-4 py-3 text-sm text-gray-600">{index + 1}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-gray-800">{offer.title}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      <div className="font-medium">{offer.product.name}</div>
                      <div className="text-xs text-gray-500">{offer.product.category}</div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">{offer.product.price} ج.م</td>
                    <td className="px-4 py-3 text-sm text-red-500 flex items-center gap-1"><FiPercent size={12} /> {offer.discount}%</td>
                    <td className="px-4 py-3 text-sm text-emerald-600 font-semibold">{discountedPrice.toFixed(2)} ج.م</td>
                    <td className="px-4 py-3 text-sm text-gray-700 flex items-center gap-1"><FiCalendar size={12} /> {durationDays} أيام</td>
                    <td className="px-4 py-3 text-sm">{renderStatusBadge(offer.status)}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Offer Modal */}
      {showOfferModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">إضافة عرض ترويجي</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">اسم العرض</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    value={offerTitle}
                    onChange={(e) => setOfferTitle(e.target.value)}
                    placeholder="مثال: عرض صيفي"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">اختر المنتج</label>
                  <select
                    className="w-full px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    value={selectedProduct?.id || ''}
                    onChange={(e) => {
                      const productId = parseInt(e.target.value);
                      const product = sampleProducts.find(p => p.id === productId) || null;
                      setSelectedProduct(product);
                    }}
                  >
                    <option value="">اختر منتج</option>
                    {sampleProducts.map(product => (
                      <option key={product.id} value={product.id}>
                        {product.name} - {product.category} ({product.price} ج.م)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">نسبة الخصم (%)</label>
                  <div className="relative">
                    <FiPercent className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="number"
                      min="1"
                      max="100"
                      className="w-full pl-10 pr-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      value={discount}
                      onChange={(e) => setDiscount(parseInt(e.target.value) || 0)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">مدة العرض (أيام)</label>
                  <div className="relative">
                    <FiClock className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="number"
                      min="1"
                      className="w-full pl-10 pr-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      value={duration}
                      onChange={(e) => setDuration(parseInt(e.target.value) || 1)}
                    />
                  </div>
                </div>

                {selectedProduct && (
                  <div className="p-3 bg-gray-100 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-700 mb-1">ملخص العرض:</h3>
                    <p className="text-gray-800">{offerTitle || 'بدون عنوان'} - {selectedProduct.name}</p>
                    <p className="text-emerald-600">السعر بعد الخصم: {(selectedProduct.price * (1 - discount / 100)).toFixed(2)} ج.م</p>
                    <p className="text-blue-600 text-sm">لمدة {duration} يوم/أيام</p>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button onClick={() => setShowOfferModal(false)} className="px-4 py-2 text-gray-500 hover:text-gray-700">إلغاء</button>
                <button onClick={handleSubmitOffer} className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg" disabled={!selectedProduct}>
                  إضافة العرض
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
