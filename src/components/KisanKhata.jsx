import React, { useState, useEffect } from 'react';
import { 
  PlusCircle, Trash2, ArrowUpCircle, ArrowDownCircle, 
  Wallet, DollarSign, Calendar, Tag, FileText, Check, Download
} from 'lucide-react';

const INITIAL_TRANSACTIONS = [
  {
    id: 'tx-1',
    type: 'income',
    title: 'गेहूं बिक्री (मंडी)',
    crop: 'Wheat (गेहूं)',
    amount: 125000,
    date: '2026-11-20',
    category: 'Crop Harvest Sale',
    notes: '50 क्विंटल गेहूं @ ₹2500 प्रति क्विंटल'
  },
  {
    id: 'tx-2',
    type: 'expense',
    title: 'डीएपी व यूरिया खाद',
    crop: 'Wheat (गेहूं)',
    amount: 6800,
    date: '2026-11-15',
    category: 'Fertilizer',
    notes: '4 बोरी डीएपी + 2 बोरी यूरिया'
  },
  {
    id: 'tx-3',
    type: 'expense',
    title: 'ट्रैक्टर जुताई व डीजल',
    crop: 'Wheat (गेहूं)',
    amount: 4500,
    date: '2026-11-12',
    category: 'Machinery / Diesel',
    notes: 'खेत की गहरी जुताई 5 एकड़'
  },
  {
    id: 'tx-4',
    type: 'expense',
    title: 'प्रमाणित बीज (HD-3086)',
    crop: 'Wheat (गेहूं)',
    amount: 5200,
    date: '2026-11-10',
    category: 'Seeds',
    notes: '2 क्विंटल बीज खरीद'
  },
  {
    id: 'tx-5',
    type: 'expense',
    title: 'बुवाई मजदूरी (लेबर)',
    crop: 'Wheat (गेहूं)',
    amount: 3200,
    date: '2026-11-14',
    category: 'Labor',
    notes: '4 मजदूरों की 2 दिन की मजदूरी'
  }
];

export default function KisanKhata({ lang, t }) {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('krishi_khata_txs');
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [filterCrop, setFilterCrop] = useState('ALL');

  // Form state
  const [formData, setFormData] = useState({
    type: 'expense',
    title: '',
    crop: 'Wheat (गेहूं)',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    category: 'Fertilizer',
    notes: ''
  });

  useEffect(() => {
    localStorage.setItem('krishi_khata_txs', JSON.stringify(transactions));
  }, [transactions]);

  const handleAddTransaction = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.amount) return;

    const newTx = {
      id: 'tx-' + Date.now(),
      type: formData.type,
      title: formData.title,
      crop: formData.crop,
      amount: parseFloat(formData.amount),
      date: formData.date,
      category: formData.category,
      notes: formData.notes
    };

    setTransactions([newTx, ...transactions]);
    setFormData({
      type: 'expense',
      title: '',
      crop: 'Wheat (गेहूं)',
      amount: '',
      date: new Date().toISOString().split('T')[0],
      category: 'Fertilizer',
      notes: ''
    });
    setIsFormOpen(false);
  };

  const handleDelete = (id) => {
    if (confirm(lang === 'hi' ? 'क्या आप इस प्रविष्टि को हटाना चाहते हैं?' : 'Delete this entry?')) {
      setTransactions(transactions.filter(t => t.id !== id));
    }
  };

  // Calculations
  const filtered = filterCrop === 'ALL' 
    ? transactions 
    : transactions.filter(t => t.crop.includes(filterCrop));

  const totalIncome = filtered
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = filtered
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const netProfit = totalIncome - totalExpense;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-cyan-800 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-3xl">📒</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-['Yantramanav',sans-serif]">
                {t.khataTitle}
              </h2>
            </div>
            <p className="text-emerald-100 text-sm mt-1 max-w-xl">
              {t.khataSubtitle}
            </p>
          </div>

          <button
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="px-4 py-2.5 bg-lime-400 hover:bg-lime-300 text-slate-950 font-extrabold text-sm rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95 cursor-pointer"
          >
            <PlusCircle className="w-5 h-5 text-slate-900" />
            <span>{t.addTransaction}</span>
          </button>
        </div>
      </div>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Income Card */}
        <div className="bg-white rounded-3xl p-5 border border-emerald-100 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {t.totalIncome}
            </span>
            <p className="text-2xl sm:text-3xl font-black text-emerald-700 mt-1">
              ₹{totalIncome.toLocaleString('en-IN')}
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <ArrowUpCircle className="w-7 h-7" />
          </div>
        </div>

        {/* Expense Card */}
        <div className="bg-white rounded-3xl p-5 border border-rose-100 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {t.totalExpense}
            </span>
            <p className="text-2xl sm:text-3xl font-black text-rose-700 mt-1">
              ₹{totalExpense.toLocaleString('en-IN')}
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <ArrowDownCircle className="w-7 h-7" />
          </div>
        </div>

        {/* Net Profit Card */}
        <div className={`rounded-3xl p-5 border shadow-xs flex items-center justify-between ${
          netProfit >= 0 ? 'bg-emerald-600 text-white border-emerald-700' : 'bg-rose-600 text-white border-rose-700'
        }`}>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-white/80">
              {t.netProfit}
            </span>
            <p className="text-2xl sm:text-3xl font-black mt-1">
              {netProfit >= 0 ? `+₹${netProfit.toLocaleString('en-IN')}` : `-₹${Math.abs(netProfit).toLocaleString('en-IN')}`}
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
            <Wallet className="w-7 h-7 text-white" />
          </div>
        </div>
      </div>

      {/* Add Entry Form Modal/Drawer */}
      {isFormOpen && (
        <form onSubmit={handleAddTransaction} className="bg-white rounded-3xl p-6 border-2 border-emerald-500 shadow-xl space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-extrabold text-lg text-slate-800">
              {lang === 'hi' ? 'खाते में नया लेन-देन दर्ज करें' : 'Record New Transaction'}
            </h3>
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              ✕ {lang === 'hi' ? 'रद्द करें' : 'Cancel'}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {/* Type */}
            <div>
              <label className="text-xs font-bold text-slate-600 block mb-1">
                {lang === 'hi' ? 'प्रकार (आमदनी या खर्च)' : 'Entry Type'}
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, type: 'expense' })}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl border cursor-pointer ${
                    formData.type === 'expense'
                      ? 'bg-rose-50 border-rose-500 text-rose-700'
                      : 'border-slate-200 text-slate-600'
                  }`}
                >
                  {t.totalExpense}
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, type: 'income' })}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl border cursor-pointer ${
                    formData.type === 'income'
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-700'
                      : 'border-slate-200 text-slate-600'
                  }`}
                >
                  {t.totalIncome}
                </button>
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="text-xs font-bold text-slate-600 block mb-1">
                {lang === 'hi' ? 'विवरण (जैसे: खाद खरीद, जुताई, बीज)' : 'Item Description'}
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder={lang === 'hi' ? 'शीर्षक लिखें...' : 'e.g. Fertilizer, Plowing...'}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-emerald-500"
              />
            </div>

            {/* Amount */}
            <div>
              <label className="text-xs font-bold text-slate-600 block mb-1">
                {t.amount}
              </label>
              <input
                type="number"
                required
                min="1"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                placeholder="₹ 5000"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-emerald-500"
              />
            </div>

            {/* Crop */}
            <div>
              <label className="text-xs font-bold text-slate-600 block mb-1">
                {t.cropTag}
              </label>
              <select
                value={formData.crop}
                onChange={(e) => setFormData({ ...formData, crop: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-emerald-500"
              >
                <option value="Wheat (गेहूं)">Wheat (गेहूं)</option>
                <option value="Paddy (धान/चावल)">Paddy (धान)</option>
                <option value="Mustard (सरसों)">Mustard (सरसों)</option>
                <option value="Potato (आलू)">Potato (आलू)</option>
                <option value="Sugarcane (गन्ना)">Sugarcane (गन्ना)</option>
                <option value="General Farm (सामान्य खेत)">General Farm (सामान्य खेत)</option>
              </select>
            </div>

            {/* Date */}
            <div>
              <label className="text-xs font-bold text-slate-600 block mb-1">
                {t.date}
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-emerald-500"
              />
            </div>

            {/* Category */}
            <div>
              <label className="text-xs font-bold text-slate-600 block mb-1">
                {lang === 'hi' ? 'श्रेणी' : 'Category'}
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-emerald-500"
              >
                <option value="Seeds">Seeds (बीज)</option>
                <option value="Fertilizer">Fertilizer (खाद/उर्वरक)</option>
                <option value="Pesticides">Pesticides (कीटनाशक)</option>
                <option value="Labor">Labor (मजदूरी)</option>
                <option value="Machinery / Diesel">Machinery / Diesel (ट्रैक्टर/डीजल)</option>
                <option value="Crop Harvest Sale">Crop Harvest Sale (फसल बिक्री)</option>
                <option value="Other">Other (अन्य)</option>
              </select>
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="px-4 py-2 text-xs font-bold rounded-xl border border-slate-200 text-slate-600 cursor-pointer"
            >
              {lang === 'hi' ? 'रद्द करें' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-extrabold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs cursor-pointer"
            >
              {t.saveEntry}
            </button>
          </div>
        </form>
      )}

      {/* Filter and Transaction List */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-600" />
            <h3 className="font-extrabold text-slate-800 text-base">
              {lang === 'hi' ? 'लेन-देन विवरण' : 'Recent Transactions'}
            </h3>
            <span className="text-xs bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded-full">
              {filtered.length} {lang === 'hi' ? 'प्रविष्टियां' : 'records'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs text-slate-500 font-semibold">{t.cropTag}:</label>
            <select
              value={filterCrop}
              onChange={(e) => setFilterCrop(e.target.value)}
              className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-hidden cursor-pointer"
            >
              <option value="ALL">{t.allCrops}</option>
              <option value="Wheat">Wheat (गेहूं)</option>
              <option value="Paddy">Paddy (धान)</option>
              <option value="Mustard">Mustard (सरसों)</option>
            </select>
          </div>
        </div>

        {/* Entries */}
        <div className="divide-y divide-slate-100">
          {filtered.map((tx) => (
            <div key={tx.id} className="py-3.5 first:pt-0 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                  tx.type === 'income' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                }`}>
                  {tx.type === 'income' ? <ArrowUpCircle className="w-6 h-6" /> : <ArrowDownCircle className="w-6 h-6" />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-800 text-sm sm:text-base">
                      {tx.title}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                      {tx.crop}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                    <span>{tx.date}</span>
                    <span>•</span>
                    <span>{tx.category}</span>
                    {tx.notes && (
                      <>
                        <span>•</span>
                        <span className="italic">{tx.notes}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className={`text-base sm:text-lg font-black ${
                  tx.type === 'income' ? 'text-emerald-600' : 'text-rose-600'
                }`}>
                  {tx.type === 'income' ? `+₹${tx.amount.toLocaleString('en-IN')}` : `-₹${tx.amount.toLocaleString('en-IN')}`}
                </span>
                <button
                  onClick={() => handleDelete(tx.id)}
                  className="p-1.5 text-slate-300 hover:text-rose-500 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
