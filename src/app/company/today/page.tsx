// pages/orders-today.tsx
'use client';
import DashboardLayout from '../layout';
import { useState } from 'react';
import { 
  FiSearch, 
  FiFilter, 
  FiCheckCircle, 
  FiClock, 
  FiRefreshCw, 
  FiUser, 
  FiPhone, 
  FiMapPin, 
  FiDollarSign,
} from 'react-icons/fi';
import { FaPizzaSlice, FaHamburger, FaIceCream, FaCoffee } from 'react-icons/fa';

type OrderStatus = 'pending' | 'in_progress' | 'completed';

interface Order {
  id: number;
  customerName: string;
  details: string;
  time: string;
  status: OrderStatus;
  phone: string;
  address: string;
  total: number;
  orderType: 'food' | 'drink' | 'dessert';
}

const sampleOrders: Order[] = [
  { id: 1, customerName: 'محمد علي', details: '2 بيتزا كبيرة + 1 عصير برتقال', time: '10:00 صباحًا', status: 'pending', phone: '0123456789', address: '123 شارع النخيل، الرياض', total: 85, orderType: 'food' },
  { id: 2, customerName: 'سارة محمد', details: '1 برجر لحم + 2 بطاطس كبيرة', time: '11:30 صباحًا', status: 'in_progress', phone: '0123456788', address: '456 شارع الملك فهد، جدة', total: 65, orderType: 'food' },
  { id: 3, customerName: 'أحمد سمير', details: '3 سندوتشات شاورما دجاج', time: '12:15 مساءً', status: 'completed', phone: '0123456787', address: '789 شارع الجامعة، الدمام', total: 45, orderType: 'food' },
  { id: 4, customerName: 'ليلى خالد', details: '1 بيتزا متوسطة + 2 كوكاكولا', time: '01:45 مساءً', status: 'pending', phone: '0123456786', address: '321 شارع التحلية، الرياض', total: 70, orderType: 'food' },
  { id: 5, customerName: 'نورا عبدالله', details: 'آيس كريم شوكولاتة + كابتشينو', time: '02:30 مساءً', status: 'pending', phone: '0123456785', address: '654 شارع العليا، الخبر', total: 55, orderType: 'dessert' },
];

const OrderTypeIcon = ({ type, size = 20 }: { type: string, size?: number }) => {
  switch (type) {
    case 'food':
      return <FaHamburger className="text-orange-500" size={size} />;
    case 'drink':
      return <FaCoffee className="text-blue-500" size={size} />;
    case 'dessert':
      return <FaIceCream className="text-pink-500" size={size} />;
    default:
      return <FaPizzaSlice className="text-red-500" size={size} />;
  }
};

// const StatCard = ({ title, value, icon, color }: { title: string, value: number, icon: React.ReactNode, color: string }) => (
//   <div className={`${color} p-3 rounded-lg border border-gray-100`}>
//     <div className="flex items-center justify-between">
//       <span className="text-sm text-gray-600">{title}</span>
//       <span className={`p-2 rounded-full ${color.replace('bg-', 'bg-').replace('-50', '-100')}`}>
//         {icon}
//       </span>
//     </div>
//     <p className="text-2xl font-bold mt-2 text-gray-800">{value}</p>
//   </div>
// );

export default function OrdersTodayPage() {
  const [orders, setOrders] = useState(sampleOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all');
  const [expandedOrder, setExpandedOrder] = useState<number | null>(null);

  const updateStatus = (id: number, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
    setExpandedOrder(null);
  };

  const updateAllStatus = (currentStatus: OrderStatus, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.status === currentStatus ? { ...order, status: newStatus } : order
      )
    );
  };

  const renderStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return <span className="flex items-center gap-1 text-white bg-gradient-to-r from-yellow-500 to-yellow-600 px-3 py-1 rounded-full text-sm shadow"><FiClock size={14} /> قيد الانتظار</span>;
      case 'in_progress':
        return <span className="flex items-center gap-1 text-white bg-gradient-to-r from-blue-500 to-blue-600 px-3 py-1 rounded-full text-sm shadow"><FiRefreshCw size={14} /> جاري التنفيذ</span>;
      case 'completed':
        return <span className="flex items-center gap-1 text-white bg-gradient-to-r from-green-500 to-green-600 px-3 py-1 rounded-full text-sm shadow"><FiCheckCircle size={14} /> تم التنفيذ</span>;
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         order.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.phone.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const ordersByStatus = {
    pending: orders.filter((o) => o.status === 'pending'),
    in_progress: orders.filter((o) => o.status === 'in_progress'),
    completed: orders.filter((o) => o.status === 'completed'),
  };

  const toggleOrderExpand = (id: number) => {
    setExpandedOrder(expandedOrder === id ? null : id);
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">لوحة الطلبات اليومية</h1>
          <p className="text-gray-500">إدارة وتتبع جميع طلبات العملاء</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative flex-1 min-w-[250px]">
            <FiSearch className="absolute right-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="ابحث عن طلب بالاسم أو التفاصيل..."
              className="w-full pr-10 pl-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="relative">
            <select
              className="appearance-none pl-4 pr-10 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 bg- text-gray-600 shadow-sm"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as OrderStatus | 'all')}
            >
              <option value="all">جميع الطلبات</option>
              <option value="pending">قيد الانتظار</option>
              <option value="in_progress">جاري التنفيذ</option>
              <option value="completed">تم التنفيذ</option>
            </select>
            <FiFilter className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-4">
          {filteredOrders.length === 0 ? (
            <div className="bg-white p-8 rounded-xl shadow-md text-center border border-gray-200">
              <img src="/empty-orders.svg" alt="No orders" className="w-40 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">لا توجد طلبات متطابقة مع بحثك</p>
              <button 
                onClick={() => {setSearchTerm(''); setStatusFilter('all')}}
                className="mt-4 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full shadow"
              >
                عرض جميع الطلبات
              </button>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div key={order.id} className={`bg-white p-5 rounded-xl shadow-md transition-all duration-300 ${expandedOrder === order.id ? 'ring-2 ring-orange-400' : 'hover:shadow-lg'}`}>
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${order.status === 'completed' ? 'bg-green-100' : order.status === 'in_progress' ? 'bg-blue-100' : 'bg-yellow-100'}`}>
                      <OrderTypeIcon type={order.orderType} size={24} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        {order.customerName}
                        <span className="text-sm font-normal bg-gray-100 px-2 py-0.5 rounded-full">{order.time}</span>
                      </h2>
                      <p className="text-gray-600 mt-1">{order.details}</p>
                      <p className="text-lg font-bold text-orange-600 mt-1">{order.total} ر.س</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {renderStatusBadge(order.status)}
                    <button
                      onClick={() => toggleOrderExpand(order.id)}
                      className={`p-1 rounded-full ${expandedOrder === order.id ? 'bg-gray-200 text-orange-500' : 'text-gray-400 hover:bg-gray-100'}`}
                    >
                      {expandedOrder === order.id ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {expandedOrder === order.id && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-gray-700">
                          <FiUser className="text-orange-500" />
                          <span className="font-medium">العميل:</span>
                          <span>{order.customerName}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                          <FiPhone className="text-orange-500" />
                          <span className="font-medium">الهاتف:</span>
                          <span>{order.phone}</span>
                        </div>
                        <div className="flex items-start gap-2 text-gray-700">
                          <FiMapPin className="text-orange-500 mt-1" />
                          <div>
                            <span className="font-medium">العنوان:</span>
                            <p className="text-gray-600">{order.address}</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-gray-700">
                          <FiDollarSign className="text-orange-500" />
                          <span className="font-medium">المجموع:</span>
                          <span className="font-bold">{order.total} ر.س</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                          <FiClock className="text-orange-500" />
                          <span className="font-medium">الوقت:</span>
                          <span>{order.time}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex justify-end gap-3">
                      {order.status !== 'completed' && (
                        <>
                          {order.status !== 'in_progress' && (
                            <button
                              onClick={() => updateStatus(order.id, 'in_progress')}
                              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow flex items-center gap-1"
                            >
                              <FiRefreshCw /> بدء التحضير
                            </button>
                          )}
                          <button
                            onClick={() => updateStatus(order.id, 'completed')}
                              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full shadow flex items-center gap-1"
                            >
                            <FiCheckCircle /> تم التسليم
                          </button>
                        </>
                      )}
                      {order.status === 'completed' && (
                        <button
                          onClick={() => updateStatus(order.id, 'pending')}
                          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full shadow flex items-center gap-1"
                        >
                          <FiClock /> إعادة الطلب
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-white p-5 rounded-xl shadow-md border border-gray-200">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              ملخص الطلبات
            </h3>
            
            <div className="space-y-5">
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-bold text-yellow-800 flex items-center gap-2">
                    <FiClock className="text-yellow-600" /> قيد الانتظار
                  </h4>
                  <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full text-sm font-bold">
                    {ordersByStatus.pending.length}
                  </span>
                </div>
                {ordersByStatus.pending.length > 0 && (
                  <button 
                    onClick={() => updateAllStatus('pending', 'in_progress')}
                    className="w-full bg-yellow-100 hover:bg-yellow-200 text-yellow-800 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-1"
                  >
                    <FiRefreshCw /> بدء تحضير الكل
                  </button>
                )}
                {ordersByStatus.pending.length ? (
                  <div className="mt-3 space-y-3">
                    {ordersByStatus.pending.map((o) => (
                      <div key={o.id} onClick={() => setExpandedOrder(o.id === expandedOrder ? null : o.id)} className="flex justify-between items-center p-3 bg-white rounded-lg shadow-xs border border-gray-100 cursor-pointer hover:bg-yellow-50">
                        <div>
                          <p className="font-medium text-black">#{o.id} - {o.customerName}</p>
                          <p className="text-xs text-gray-500">{o.details}</p>
                        </div>
                        <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 text-center rounded-full">{o.time}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-sm text-gray-400">لا يوجد طلبات في الانتظار</p>
                  </div>
                )}
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-bold text-blue-800 flex items-center gap-2">
                    <FiRefreshCw className="text-blue-600" /> جاري التحضير
                  </h4>
                  <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-sm font-bold">
                    {ordersByStatus.in_progress.length}
                  </span>
                </div>
                {ordersByStatus.in_progress.length > 0 && (
                  <button 
                    onClick={() => updateAllStatus('in_progress', 'completed')}
                    className="w-full bg-blue-100 hover:bg-blue-200 text-blue-800 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-1"
                  >
                    <FiCheckCircle /> إتمام الكل
                  </button>
                )}
                {ordersByStatus.in_progress.length ? (
                  <div className="mt-3 space-y-3">
                    {ordersByStatus.in_progress.map((o) => (
                      <div key={o.id} onClick={() => setExpandedOrder(o.id === expandedOrder ? null : o.id)} className="flex justify-between items-center p-3 bg-white rounded-lg shadow-xs border border-gray-100 cursor-pointer hover:bg-blue-50">
                        <div>
                          <p className="font-medium text-black">#{o.id} - {o.customerName}</p>
                          <p className="text-xs text-gray-500">{o.details}</p>
                        </div>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 text-center rounded-full">{o.time}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-sm text-gray-400">لا يوجد طلبات جاري تحضيرها</p>
                  </div>
                )}
              </div>

              <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-bold text-green-800 flex items-center gap-2">
                    <FiCheckCircle className="text-green-600" /> الطلبات المكتملة
                  </h4>
                  <span className="bg-green-200 text-green-800 px-2 py-1 rounded-full text-sm font-bold">
                    {ordersByStatus.completed.length}
                  </span>
                </div>
                {ordersByStatus.completed.length ? (
                  <div className="mt-3 space-y-3">
                    {ordersByStatus.completed.map((o) => (
                      <div key={o.id} onClick={() => setExpandedOrder(o.id === expandedOrder ? null : o.id)} className="flex justify-between items-center p-3 bg-white rounded-lg shadow-xs border border-gray-100 cursor-pointer hover:bg-green-50">
                        <div>
                          <p className="font-medium text-black">#{o.id} - {o.customerName}</p>
                          <p className="text-xs text-gray-500">{o.details}</p>
                        </div>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 text-center rounded-full">{o.time}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-sm text-gray-400">لا يوجد طلبات مكتملة</p>
                  </div>
                )}
              </div>
            </div>
          </div>


          
<div className="bg-white p-5 rounded-xl shadow-md border border-gray-200 w-full">
  <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
    إحصائيات اليوم
  </h3>

  {/* شبكة الإحصائيات */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
 
  </div>

  {/* إجمالي المبيعات */}
  <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
      <div className="flex items-center gap-2">
        <FiDollarSign className="text-orange-500 text-xl" />
        <span className="font-medium text-gray-700">إجمالي المبيعات</span>
      </div>
      <span className="text-2xl font-bold text-orange-600">
        {orders.reduce((sum, order) => sum + order.total, 0)} ر.س
      </span>
    </div>

    <div className="mt-3 h-2 bg-orange-100 rounded-full overflow-hidden">
      <div 
        className="h-full bg-orange-500 rounded-full" 
        style={{ width: `${Math.min(100, (ordersByStatus.completed.length / orders.length) * 100)}%` }}
      ></div>
    </div>
    <p className="text-xs text-orange-700 mt-1 text-left">
      {Math.round((ordersByStatus.completed.length / orders.length) * 100)}% من الطلبات مكتملة
    </p>
  </div>
</div>



        </div>
      </div>
    </div>
  );
}

OrdersTodayPage.getLayout = function getLayout(page: React.ReactNode) {
  return <DashboardLayout>{page}</DashboardLayout>;
};