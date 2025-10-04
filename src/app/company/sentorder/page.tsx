'use client';
import { useState } from 'react';
import { FiTrash2 } from 'react-icons/fi';

type OrderStatus = 'pending' | 'approved' | 'rejected' | 'in_progress' | 'delivered';
type DiscountTier = '10%' | '20%' | '30%' | '40%' | '50%' | '90%' | 'custom';

interface Product {
  id: number;
  name: string;
  price: number;
  unit: string;
  discount?: number;
  discountTier?: DiscountTier;
  companyId: number;
  categoryId: number;
}

interface Company {
  id: number;
  name: string;
  discountTier?: DiscountTier;
  customDiscount?: number;
}

interface Category {
  id: number;
  name: string;
}

interface OrderItem {
  productId: number;
  name: string;
  quantity: number;
  unit: string;
  price: number;
  discount?: number;
  total: number;
}

interface Order {
  id: number;
  company: string;
  companyId: number;
  items: OrderItem[];
  total: number;
  orderDate: string;
  status: OrderStatus;
  notes?: string;
}

const sampleCompanies: Company[] = [
  { id: 1, name: 'شركة الأدوية المتحدة', discountTier: '30%' },
  { id: 2, name: 'شركة فارما للصناعات الدوائية', discountTier: '50%', customDiscount: 45 },
  { id: 3, name: 'شركة الرعاية الصحية المتكاملة', discountTier: '20%' },
];

const sampleCategories: Category[] = [
  { id: 1, name: 'مسكنات' },
  { id: 2, name: 'فيتامينات' },
  { id: 3, name: 'مضادات حيوية' },
];

const sampleProducts: Product[] = [
  { id: 1, name: 'باراسيتامول 500 مجم', price: 25, unit: 'شريط', discount: 5, companyId: 1, categoryId: 1 },
  { id: 2, name: 'إيبوبروفين 400 مجم', price: 35, unit: 'شريط', discountTier: '20%', companyId: 1, categoryId: 1 },
  { id: 3, name: 'أموكسيسيلين 500 مجم', price: 50, unit: 'شريط', companyId: 1, categoryId: 3 },
  { id: 4, name: 'فيتامين C 1000 مجم', price: 40, unit: 'علبة', discount: 10, companyId: 2, categoryId: 2 },
  { id: 5, name: 'زنك كبسولات', price: 55, unit: 'علبة', discountTier: '40%', companyId: 2, categoryId: 2 },
  { id: 6, name: 'شراب كحة للأطفال', price: 30, unit: 'زجاجة', companyId: 3, categoryId: 3 },
  { id: 7, name: 'مطهر جروح بيتادين', price: 20, unit: 'زجاجة', discountTier: '10%', companyId: 3, categoryId: 3 },
];

export default function CompanyOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [companies] = useState<Company[]>(sampleCompanies);
  const [categories] = useState<Category[]>(sampleCategories);
  const [products] = useState<Product[]>(sampleProducts);

  const [selectedCompany, setSelectedCompany] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [productSearch, setProductSearch] = useState<string>('');
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [notes, setNotes] = useState<string>('');

  const availableProducts = products.filter(
    (p) =>
      (!selectedCompany || p.companyId === selectedCompany) &&
      (!selectedCategory || p.categoryId === selectedCategory) &&
      p.name.toLowerCase().includes(productSearch.toLowerCase())
  );

  const bestOffers = products
    .filter((p) => p.discount || p.discountTier)
    .filter((p) => (selectedCompany ? p.companyId === selectedCompany : true))
    .sort((a, b) => {
      const getDisc = (x: Product) =>
        x.discount ? x.discount : x.discountTier ? parseInt(x.discountTier) : 0;
      return getDisc(b) - getDisc(a);
    });

  const calculatePriceWithDiscount = (product: Product) => {
    const discountPercent = product.discount ?? parseInt(product.discountTier ?? '0');
    return product.price - (product.price * discountPercent) / 100;
  };

  const addProductToOrder = (product: Product, quantity: number) => {
    if (quantity < 1) return;
    const price = calculatePriceWithDiscount(product);
    const total = price * quantity;
    const newItem: OrderItem = {
      productId: product.id,
      name: product.name,
      quantity,
      unit: product.unit,
      price,
      discount: product.discount ?? parseInt(product.discountTier ?? '0'),
      total,
    };
    setOrderItems((prev) => [...prev, newItem]);
  };

  const removeOrderItem = (index: number) => {
    setOrderItems((prev) => prev.filter((_, i) => i !== index));
  };

  const calculateOrderTotal = () => orderItems.reduce((s, it) => s + it.total, 0);

  const submitOrder = () => {
    if (!selectedCompany || orderItems.length === 0) return;
    const comp = companies.find((c) => c.id === selectedCompany)!;
    const newOrder: Order = {
      id: orders.length + 1,
      company: comp.name,
      companyId: comp.id,
      items: orderItems,
      total: calculateOrderTotal(),
      orderDate: new Date().toLocaleString('ar-EG'),
      status: 'pending',
      notes,
    };
    setOrders((prev) => [newOrder, ...prev]);
    setOrderItems([]);
    setNotes('');
    setSelectedCompany(null);
    setSelectedCategory(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* الشركات والتصنيفات */}
        <aside className="lg:col-span-1 bg-white p-5 rounded-2xl shadow-md border border-gray-100 space-y-4">
          <h2 className="text-lg font-semibold text-right text-emerald-700">🏢 الشركات</h2>
          <select
            className="w-full p-2 rounded-xl bg-gray-100 border border-gray-200 text-right focus:ring-2 focus:ring-emerald-400"
            value={selectedCompany || ''}
            onChange={(e) => setSelectedCompany(Number(e.target.value) || null)}
          >
            <option value="">اختر الشركة...</option>
            {companies.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          <h2 className="text-lg font-semibold text-right text-emerald-700">📦 التصنيفات</h2>
          <select
            className="w-full p-2 rounded-xl bg-gray-100 border border-gray-200 text-right focus:ring-2 focus:ring-emerald-400"
            value={selectedCategory || ''}
            onChange={(e) => setSelectedCategory(Number(e.target.value) || null)}
          >
            <option value="">اختر التصنيف...</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          <h2 className="text-lg font-semibold text-right text-emerald-700">🔍 بحث</h2>
          <input
            type="text"
            placeholder="ابحث عن منتج..."
            value={productSearch}
            onChange={(e) => setProductSearch(e.target.value)}
            className="w-full p-2 rounded-xl bg-gray-100 border border-gray-200 text-right focus:ring-2 focus:ring-emerald-400"
          />
        </aside>

        {/* العروض والمنتجات */}
        <main className="lg:col-span-2 space-y-8">
          <section className="bg-white p-5 rounded-2xl shadow-md border border-gray-100">
            <h2 className="text-lg font-semibold text-emerald-700 mb-4">🌟 أهم العروض</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {bestOffers.slice(0, 8).map((p) => (
                <div key={p.id} className="p-4 bg-gray-50 rounded-2xl shadow hover:shadow-lg transition flex flex-col justify-between border border-gray-100">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-semibold">{p.name}</div>
                      <div className="text-sm text-gray-500">{companies.find((c) => c.id === p.companyId)?.name}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-emerald-700">{calculatePriceWithDiscount(p)} ر.س</div>
                      <div className="text-xs text-gray-400 line-through">{p.price} ر.س</div>
                    </div>
                  </div>
                  <button onClick={() => addProductToOrder(p, 1)} className="mt-3 px-3 py-2 rounded-xl bg-emerald-600 text-white text-sm hover:bg-emerald-700 transition">
                    أضف للطلب
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white p-5 rounded-2xl shadow-md border border-gray-100">
            <h2 className="text-lg font-semibold text-emerald-700 mb-4">🛒 المنتجات</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {availableProducts.map((p) => (
                <div key={p.id} className="p-4 bg-gray-50 rounded-2xl shadow hover:shadow-lg transition flex flex-col justify-between border border-gray-100">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-semibold">{p.name}</div>
                      <div className="text-sm text-gray-500">{companies.find((c) => c.id === p.companyId)?.name}</div>
                    </div>
                    <div className="text-right">
                      {(p.discount ?? 0) > 0 ? (
                        <>
                          <div className="text-sm font-bold text-emerald-700">
                            {p.price - (p.price * (p.discount ?? 0)) / 100} ر.س
                          </div>
                          <div className="text-xs text-gray-400 line-through">{p.price} ر.س</div>
                        </>
                      ) : (
                        <div className="text-sm font-bold text-emerald-700">{p.price} ر.س</div>
                      )}
                    </div>
                  </div>
                  <button onClick={() => addProductToOrder(p, 1)} className="mt-3 px-3 py-2 rounded-xl bg-emerald-600 text-white text-sm hover:bg-emerald-700 transition">
                    أضف للطلب
                  </button>
                </div>
              ))}
            </div>
          </section>
        </main>

        {/* ملخص الطلب */}
        <aside className="lg:col-span-1 bg-white p-5 rounded-2xl shadow-md border border-gray-100">
          <h2 className="text-lg font-semibold mb-3 text-right text-emerald-700">🧾 ملخص الطلب</h2>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {orderItems.map((it, idx) => (
              <div key={idx} className="p-3 bg-gray-50 rounded-lg flex justify-between shadow-sm hover:shadow transition">
                <div className="text-right">
                  <div className="font-medium">{it.name}</div>
                  <div className="text-sm text-gray-500">{it.quantity} × {it.price} ر.س</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="font-bold text-gray-800">{it.total} ر.س</div>
                  <button onClick={() => removeOrderItem(idx)} className="text-red-500 hover:text-red-700 transition">
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 bg-gray-50 p-4 rounded-lg border border-gray-100">
            <div className="flex justify-between mb-2">
              <div className="text-sm text-gray-600">الإجمالي</div>
              <div className="font-bold text-lg text-gray-800">{calculateOrderTotal()} ر.س</div>
            </div>
            <button
              onClick={submitOrder}
              disabled={orderItems.length === 0 || !selectedCompany}
              className="w-full py-2 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              إرسال الطلب
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
