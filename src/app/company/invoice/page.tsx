// pages/dashboard/invoice.tsx
'use client';

import { useState } from 'react';
import { FiSearch, FiEye } from 'react-icons/fi';

interface Medicine {
  id: number;
  name: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  total: number;
}

interface Invoice {
  id: string;
  invoiceNumber: string;
  date: string;
  customer: {
    name: string;
    phone: string;
    address: string;
  };
  pharmacy: {
    name: string;
    type: string;
    address: string;
    discount: number;
  };
  medicines: Medicine[];
  paymentMethod: string;
  subtotal: number;
  totalDiscount: number;
  tax: number;
  total: number;
  notes?: string;
}

const sampleInvoices: Invoice[] = [
  {
    id: '1',
    invoiceNumber: 'INV-2023-001',
    date: '15/10/2023',
    customer: {
      name: 'أحمد محمد',
      phone: '0123456789',
      address: '123 شارع النخيل، الرياض',
    },
    pharmacy: {
      name: 'صيدلية النور',
      type: 'صيدلية',
      address: '456 شارع الملك فهد، الرياض',
      discount: 10,
    },
    medicines: [
      { id: 1, name: 'بانادول اكسترا', quantity: 5, unitPrice: 15, discount: 0, total: 75 },
      { id: 2, name: 'فيتامين سي', quantity: 3, unitPrice: 30, discount: 5, total: 85.5 },
      { id: 3, name: 'كريم هايدروكورتيزون', quantity: 2, unitPrice: 25, discount: 2, total: 49 },
    ],
    paymentMethod: 'نقدي',
    subtotal: 209.5,
    totalDiscount: 7.5,
    tax: 20.95,
    total: 222.95,
    notes: 'يجب استلام الدواء خلال أسبوع',
  },
];

export default function InvoicePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const filteredInvoices = sampleInvoices.filter(
    (invoice) =>
      invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.pharmacy.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 bg-white min-h-screen">
      {/* 🔹 العنوان وشريط البحث */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-emerald-700">🧾 الفواتير</h1>
        <div className="relative w-full md:w-1/3">
          <FiSearch className="absolute right-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="ابحث برقم الفاتورة أو اسم العميل..."
            className="w-full pr-10 pl-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* 🔹 جدول الفواتير */}
      <div className="bg-white shadow-lg rounded-2xl border border-gray-100 overflow-hidden transition">
        <table className="min-w-full text-right text-gray-700">
          <thead className="bg-emerald-50 text-emerald-700 text-sm uppercase">
            <tr>
              <th className="px-6 py-3">رقم الفاتورة</th>
              <th className="px-6 py-3">التاريخ</th>
              <th className="px-6 py-3">العميل</th>
              <th className="px-6 py-3">الصيدلية</th>
              <th className="px-6 py-3">الإجمالي</th>
              <th className="px-6 py-3">عرض التفاصيل</th>
            </tr>
          </thead>
          <tbody>
            {filteredInvoices.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-6 text-center text-gray-500">
                  لا توجد فواتير مطابقة
                </td>
              </tr>
            ) : (
              filteredInvoices.map((invoice) => (
                <tr
                  key={invoice.id}
                  onClick={() => setSelectedInvoice(invoice)}
                  className={`hover:bg-emerald-50 transition cursor-pointer ${
                    selectedInvoice?.id === invoice.id ? 'bg-emerald-50' : 'bg-white'
                  }`}
                >
                  <td className="px-6 py-4 font-semibold">{invoice.invoiceNumber}</td>
                  <td className="px-6 py-4">{invoice.date}</td>
                  <td className="px-6 py-4">{invoice.customer.name}</td>
                  <td className="px-6 py-4">{invoice.pharmacy.name}</td>
                  <td className="px-6 py-4 font-bold text-emerald-700">
                    {invoice.total.toFixed(2)} ر.س
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => setSelectedInvoice(invoice)}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-all shadow-sm"
                    >
                      <FiEye />
                      عرض
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 🔹 تفاصيل الفاتورة */}
      {selectedInvoice && (
        <div className="mt-10 p-6 bg-gray-50 border border-gray-200 rounded-2xl shadow-sm">
          <div className="flex justify-between items-start mb-6 border-b pb-4">
            <div>
              <h2 className="text-2xl font-bold text-emerald-700">تفاصيل الفاتورة</h2>
              <p className="text-gray-500 text-sm">رقم: {selectedInvoice.invoiceNumber}</p>
            </div>
            <span className="text-gray-600">{selectedInvoice.date}</span>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="font-semibold mb-2 text-emerald-700">معلومات العميل</h3>
              <p>{selectedInvoice.customer.name}</p>
              <p>{selectedInvoice.customer.phone}</p>
              <p>{selectedInvoice.customer.address}</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="font-semibold mb-2 text-emerald-700">معلومات الصيدلية</h3>
              <p>{selectedInvoice.pharmacy.name} ({selectedInvoice.pharmacy.type})</p>
              <p>خصم: {selectedInvoice.pharmacy.discount}%</p>
              <p>{selectedInvoice.pharmacy.address}</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
              <thead className="bg-emerald-50 text-gray-700">
                <tr>
                  <th className="px-4 py-2">#</th>
                  <th className="px-4 py-2">اسم الدواء</th>
                  <th className="px-4 py-2">الكمية</th>
                  <th className="px-4 py-2">سعر الوحدة</th>
                  <th className="px-4 py-2">الخصم</th>
                  <th className="px-4 py-2">الإجمالي</th>
                </tr>
              </thead>
              <tbody>
                {selectedInvoice.medicines.map((m, i) => (
                  <tr key={m.id} className="border-t hover:bg-gray-100 transition">
                    <td className="px-4 py-2">{i + 1}</td>
                    <td className="px-4 py-2">{m.name}</td>
                    <td className="px-4 py-2">{m.quantity}</td>
                    <td className="px-4 py-2">{m.unitPrice.toFixed(2)} ر.س</td>
                    <td className="px-4 py-2">{m.discount}%</td>
                    <td className="px-4 py-2 font-semibold">{m.total.toFixed(2)} ر.س</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex justify-end">
            <div className="w-full md:w-1/2 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex justify-between border-b py-1">
                <span>المجموع الفرعي:</span>
                <span>{selectedInvoice.subtotal.toFixed(2)} ر.س</span>
              </div>
              <div className="flex justify-between border-b py-1 text-red-600">
                <span>الخصومات:</span>
                <span>-{selectedInvoice.totalDiscount.toFixed(2)} ر.س</span>
              </div>
              <div className="flex justify-between border-b py-1">
                <span>الضريبة:</span>
                <span>{selectedInvoice.tax.toFixed(2)} ر.س</span>
              </div>
              <div className="flex justify-between pt-2 font-bold text-emerald-700 text-lg">
                <span>الإجمالي النهائي:</span>
                <span>{selectedInvoice.total.toFixed(2)} ر.س</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
