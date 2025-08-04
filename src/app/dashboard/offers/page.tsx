// pages/dashboard/offers.tsx
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
  { 
    id: 1, 
    product: sampleProducts[0], 
    discount: 20, 
    startDate: '2023-06-01', 
    endDate: '2023-06-04', 
    status: 'expired',
    title: 'عرض صيفي'
  },
  { 
    id: 2, 
    product: sampleProducts[1], 
    discount: 15, 
    startDate: '2023-07-15', 
    endDate: '2023-07-18', 
    status: 'active',
    title: 'خصومات الصيف'
  },
  { 
    id: 3, 
    product: sampleProducts[2], 
    discount: 10, 
    startDate: '2023-08-20', 
    endDate: '2023-08-23', 
    status: 'upcoming',
    title: 'عرض العودة للمدارس'
  },
];

export default function OffersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'upcoming' | 'expired'>('all');
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [discount, setDiscount] = useState(0);
  const [duration, setDuration] = useState(3); // in days
  const [offerTitle, setOfferTitle] = useState('');

  // Calculate filtered offers
  const filteredOffers = sampleOffers.filter(offer => {
    const matchesSearch = 
      offer.product.name.includes(searchTerm) || 
      offer.product.category.includes(searchTerm) ||
      offer.title.includes(searchTerm);
    
    const matchesFilter = filter === 'all' || offer.status === filter;
    
    return matchesSearch && matchesFilter;
  });

  // Handle offer submission
  const handleSubmitOffer = () => {
    if (!selectedProduct) {
      alert('الرجاء اختيار منتج');
      return;
    }

    // Calculate dates based on duration
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + duration);

    // Format dates as YYYY-MM-DD
    const formatDate = (date: Date) => date.toISOString().split('T')[0];

    // Determine status based on dates
    const status = 'upcoming'; // You can add logic to determine status based on dates

    // Here you would typically send the offer to the backend
    console.log('Submitting offer:', {
      product: selectedProduct,
      discount,
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
      status,
      title: offerTitle
    });

    // Reset and close modal
    setSelectedProduct(null);
    setDiscount(0);
    setDuration(3);
    setOfferTitle('');
    setShowOfferModal(false);
    alert('تم إضافة العرض بنجاح');
  };

  // Render status badge
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="bg-green-900 text-green-300 px-2 py-1 rounded-full text-xs">نشط</span>;
      case 'upcoming':
        return <span className="bg-blue-900 text-blue-300 px-2 py-1 rounded-full text-xs flex items-center gap-1">
          <FiClock size={12} /> قادم
        </span>;
      case 'expired':
        return <span className="bg-red-900 text-red-300 px-2 py-1 rounded-full text-xs">منتهي</span>;
      default:
        return null;
    }
  };

  return (
    <div className="p-4 space-y-6 bg-gray-900 text-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold text-white">العروض الترويجية</h1>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative flex-1 min-w-[250px]">
            <FiSearch className="absolute right-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="ابحث بالمنتج أو الفئة أو اسم العرض..."
              className="w-full pr-10 pl-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="relative">
            <select
              className="appearance-none pl-4 pr-10 py-2 border rounded-lg bg-gray-800 border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
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
      <div className="bg-gray-800 rounded-lg shadow border border-gray-700 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-4 py-3 text-right text-sm font-medium text-gray-300">#</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-gray-300">اسم العرض</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-gray-300">المنتج</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-gray-300">السعر الأصلي</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-gray-300">الخصم</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-gray-300">السعر بعد الخصم</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-gray-300">المدة</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-gray-300">الحالة</th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {filteredOffers.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-6 text-center text-gray-400">
                  لا توجد عروض متطابقة مع بحثك
                </td>
              </tr>
            ) : (
              filteredOffers.map((offer, index) => {
                const discountedPrice = offer.product.price * (1 - offer.discount / 100);
                const durationDays = Math.ceil(
                  (new Date(offer.endDate).getTime() - new Date(offer.startDate).getTime()
                ) / (1000 * 60 * 60 * 24));

                return (
                  <tr key={offer.id} className={`hover:bg-gray-750 ${
                    offer.status === 'active' ? 'bg-emerald-900 bg-opacity-20' : 
                    offer.status === 'upcoming' ? 'bg-blue-900 bg-opacity-20' : ''
                  }`}>
                    <td className="px-4 py-3 text-sm text-gray-300">{index + 1}</td>
                    <td className="px-4 py-3 text-sm font-medium text-white">{offer.title}</td>
                    <td className="px-4 py-3 text-sm text-gray-300">
                      <div className="font-medium">{offer.product.name}</div>
                      <div className="text-xs text-gray-400">{offer.product.category}</div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-300">{offer.product.price} ج.م</td>
                    <td className="px-4 py-3 text-sm text-red-400 flex items-center gap-1">
                      <FiPercent size={12} /> {offer.discount}%
                    </td>
                    <td className="px-4 py-3 text-sm text-green-400">
                      {discountedPrice.toFixed(2)} ج.م
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-300 flex items-center gap-1">
                      <FiCalendar size={12} /> {durationDays} أيام
                    </td>
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-lg shadow-xl border border-gray-700 w-full max-w-md">
            <div className="p-6">
              <h2 className="text-xl font-bold text-white mb-4">إضافة عرض ترويجي</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    اسم العرض
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    value={offerTitle}
                    onChange={(e) => setOfferTitle(e.target.value)}
                    placeholder="مثال: عرض صيفي"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    اختر المنتج
                  </label>
                  <select
                    className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    نسبة الخصم (%)
                  </label>
                  <div className="relative">
                    <FiPercent className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="number"
                      min="1"
                      max="100"
                      className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      value={discount}
                      onChange={(e) => setDiscount(parseInt(e.target.value) || 0)}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    مدة العرض (أيام)
                  </label>
                  <div className="relative">
                    <FiClock className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="number"
                      min="1"
                      className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      value={duration}
                      onChange={(e) => setDuration(parseInt(e.target.value) || 1)}
                    />
                  </div>
                </div>
                
                {selectedProduct && (
                  <div className="p-3 bg-gray-700 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-300 mb-1">ملخص العرض:</h3>
                    <p className="text-white">
                      {offerTitle || 'بدون عنوان'} - {selectedProduct.name}
                    </p>
                    <p className="text-emerald-400">
                      السعر بعد الخصم: {selectedProduct.price * (1 - discount / 100)} ج.م
                    </p>
                    <p className="text-blue-400 text-sm">
                      لمدة {duration} يوم/أيام
                    </p>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowOfferModal(false)}
                  className="px-4 py-2 text-gray-300 hover:text-white"
                >
                  إلغاء
                </button>
                <button
                  onClick={handleSubmitOffer}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg"
                  disabled={!selectedProduct}
                >
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