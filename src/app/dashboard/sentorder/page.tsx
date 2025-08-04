// pages/company-orders.tsx
'use client';
import { useState, useEffect } from 'react';
import { FiSearch, FiFilter, FiCheck, FiX, FiClock, FiTruck, FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi';

type OrderStatus = 'pending' | 'approved' | 'rejected' | 'in_progress' | 'delivered';

interface Company {
  id: number;
  name: string;
  products: Product[];
}

interface Product {
  id: number;
  name: string;
  price: number;
  unit: string;
}

interface Order {
  id: number;
  company: string;
  product: string;
  quantity: number;
  unit: string;
  price: number;
  total: number;
  orderDate: string;
  deliveryDate?: string;
  status: OrderStatus;
  notes?: string;
}

const sampleCompanies: Company[] = [
  {
    id: 1,
    name: 'شركة الأطعمة الممتازة',
    products: [
      { id: 1, name: 'زيت زيتون بكر', price: 50, unit: 'لتر' },
      { id: 2, name: 'أرز بسمتي', price: 20, unit: 'كيلو' },
    ]
  },
  {
    id: 2,
    name: 'شركة المشروبات الحديثة',
    products: [
      { id: 3, name: 'مياه معدنية', price: 5, unit: 'زجاجة' },
      { id: 4, name: 'عصير برتقال', price: 10, unit: 'لتر' },
    ]
  },
];

export default function CompanyOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [companies, setCompanies] = useState<Company[]>(sampleCompanies);
  const [selectedCompany, setSelectedCompany] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [notes, setNotes] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all');
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);

  // Get available products for selected company
  const availableProducts = selectedCompany 
    ? companies.find(c => c.id === selectedCompany)?.products || [] 
    : [];

  // Calculate order total
  const calculateTotal = () => {
    if (!selectedProduct || !selectedCompany) return 0;
    const product = availableProducts.find(p => p.id === selectedProduct);
    return product ? product.price * quantity : 0;
  };

  // Submit new order
  const submitOrder = () => {
    if (!selectedCompany || !selectedProduct) return;

    const company = companies.find(c => c.id === selectedCompany)?.name || '';
    const product = availableProducts.find(p => p.id === selectedProduct);
    
    if (!product) return;

    const newOrder: Order = {
      id: orders.length + 1,
      company,
      product: product.name,
      quantity,
      unit: product.unit,
      price: product.price,
      total: product.price * quantity,
      orderDate: new Date().toLocaleDateString('ar-EG'),
      status: 'pending',
      notes
    };

    setOrders([...orders, newOrder]);
    resetForm();
  };

  // Update existing order
  const updateOrder = () => {
    if (!editingOrder || !selectedCompany || !selectedProduct) return;

    const company = companies.find(c => c.id === selectedCompany)?.name || '';
    const product = availableProducts.find(p => p.id === selectedProduct);
    
    if (!product) return;

    const updatedOrders = orders.map(order => 
      order.id === editingOrder.id ? {
        ...order,
        company,
        product: product.name,
        quantity,
        unit: product.unit,
        price: product.price,
        total: product.price * quantity,
        notes
      } : order
    );

    setOrders(updatedOrders);
    setEditingOrder(null);
    resetForm();
  };

  // Delete order
  const deleteOrder = (id: number) => {
    setOrders(orders.filter(order => order.id !== id));
  };

  // Change order status
  const changeStatus = (id: number, status: OrderStatus) => {
    setOrders(orders.map(order => 
      order.id === id ? { ...order, status } : order
    ));
  };

  // Reset form
  const resetForm = () => {
    setSelectedCompany(null);
    setSelectedProduct(null);
    setQuantity(1);
    setNotes('');
  };

  // Filter orders
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.company.includes(searchTerm) || 
                         order.product.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Group orders by status for statistics
  const ordersByStatus = {
    pending: orders.filter(o => o.status === 'pending'),
    approved: orders.filter(o => o.status === 'approved'),
    rejected: orders.filter(o => o.status === 'rejected'),
    in_progress: orders.filter(o => o.status === 'in_progress'),
    delivered: orders.filter(o => o.status === 'delivered'),
  };

  // Load editing order into form
  useEffect(() => {
    if (editingOrder) {
      const company = companies.find(c => c.name === editingOrder.company);
      const product = company?.products.find(p => p.name === editingOrder.product);
      
      setSelectedCompany(company?.id || null);
      setSelectedProduct(product?.id || null);
      setQuantity(editingOrder.quantity);
      setNotes(editingOrder.notes || '');
    }
  }, [editingOrder]);

  // Render status badge
  const renderStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs flex items-center gap-1"><FiClock /> قيد الانتظار</span>;
      case 'approved':
        return <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs flex items-center gap-1"><FiCheck /> مقبول</span>;
      case 'rejected':
        return <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs flex items-center gap-1"><FiX /> مرفوض</span>;
      case 'in_progress':
        return <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs flex items-center gap-1"><FiRefreshCw /> جاري التجهيز</span>;
      case 'delivered':
        return <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs flex items-center gap-1"><FiTruck /> تم التسليم</span>;
    }
  };

  return (
    <div className="p-6 bg-gray-50 text-black min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">نظام طلبات الشركات</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Form */}
        <div className="lg:col-span-1 bg-white p-5 rounded-xl shadow-md border border-gray-200">
          <h2 className="text-lg font-bold text-gray-700 mb-4">
            {editingOrder ? 'تعديل الطلب' : 'إنشاء طلب جديد'}
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">الشركة</label>
              <select
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={selectedCompany || ''}
                onChange={(e) => {
                  setSelectedCompany(Number(e.target.value));
                  setSelectedProduct(null);
                }}
              >
                <option value="">اختر الشركة...</option>
                {companies.map(company => (
                  <option key={company.id} value={company.id}>{company.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">المنتج</label>
              <select
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={selectedProduct || ''}
                onChange={(e) => setSelectedProduct(Number(e.target.value))}
                disabled={!selectedCompany}
              >
                <option value="">اختر المنتج...</option>
                {availableProducts.map(product => (
                  <option key={product.id} value={product.id}>
                    {product.name} - {product.price} ر.س/{product.unit}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">الكمية</label>
              <input
                type="number"
                min="1"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ملاحظات</label>
              <textarea
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-medium">الإجمالي:</span>
                <span className="font-bold text-lg">{calculateTotal()} ر.س</span>
              </div>
            </div>
            
            <div className="flex gap-2 pt-2">
              {editingOrder ? (
                <>
                  <button
                    onClick={updateOrder}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg flex items-center justify-center gap-1"
                  >
                    <FiEdit /> تحديث الطلب
                  </button>
                  <button
                    onClick={() => {
                      setEditingOrder(null);
                      resetForm();
                    }}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-lg"
                  >
                    إلغاء
                  </button>
                </>
              ) : (
                <button
                  onClick={submitOrder}
                  disabled={!selectedCompany || !selectedProduct}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg flex items-center justify-center gap-1 disabled:opacity-50"
                >
                  <FiPlus /> إضافة طلب
                </button>
              )}
            </div>
          </div>
        </div>
        
        {/* Orders List */}
        <div className="lg:col-span-2 space-y-6">
          {/* Filters */}
          <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <FiSearch className="absolute right-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="ابحث عن طلب..."
                  className="w-full pr-10 pl-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="relative flex-1">
                <select
                  className="w-full pl-4 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as OrderStatus | 'all')}
                >
                  <option value="all">جميع الحالات</option>
                  <option value="pending">قيد الانتظار</option>
                  <option value="approved">مقبول</option>
                  <option value="rejected">مرفوض</option>
                  <option value="in_progress">جاري التجهيز</option>
                  <option value="delivered">تم التسليم</option>
                </select>
                <FiFilter className="absolute left-3 top-3 text-gray-400" />
              </div>
            </div>
          </div>
          
          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <StatCard 
              title="الطلبات" 
              value={orders.length} 
              color="bg-blue-50 text-blue-800" 
            />
            <StatCard 
              title="قيد الانتظار" 
              value={ordersByStatus.pending.length} 
              color="bg-yellow-50 text-yellow-800" 
            />
            <StatCard 
              title="مقبولة" 
              value={ordersByStatus.approved.length} 
              color="bg-green-50 text-green-800" 
            />
            <StatCard 
              title="مرفوضة" 
              value={ordersByStatus.rejected.length} 
              color="bg-red-50 text-red-800" 
            />
            <StatCard 
              title="تم التسليم" 
              value={ordersByStatus.delivered.length} 
              color="bg-purple-50 text-purple-800" 
            />
          </div>
          
          {/* Orders Table */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500">#</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500">الشركة</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500">المنتج</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500">الكمية</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500">الإجمالي</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500">الحالة</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500">تاريخ الطلب</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500">إجراءات</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-4 py-6 text-center text-gray-500">
                        لا توجد طلبات متطابقة مع بحثك
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-900">{order.id}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{order.company}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {order.product} ({order.price} ر.س/{order.unit})
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">{order.quantity} {order.unit}</td>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">{order.total} ر.س</td>
                        <td className="px-4 py-3 text-sm">
                          {renderStatusBadge(order.status)}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-500">{order.orderDate}</td>
                        <td className="px-4 py-3 text-sm text-gray-500">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => setEditingOrder(order)}
                              className="text-blue-500 hover:text-blue-700"
                              title="تعديل"
                            >
                              <FiEdit />
                            </button>
                            <button
                              onClick={() => deleteOrder(order.id)}
                              className="text-red-500 hover:text-red-700"
                              title="حذف"
                            >
                              <FiTrash2 />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const StatCard = ({ title, value, color }: { title: string, value: number, color: string }) => (
  <div className={`${color} p-3 rounded-lg text-center shadow-sm`}>
    <p className="text-sm font-medium">{title}</p>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);