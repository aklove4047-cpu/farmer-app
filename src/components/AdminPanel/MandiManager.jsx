import React, { useState } from 'react';
import { Plus, Edit2, TrendingUp, TrendingDown, Minus, Save, Trash2, Search, Check } from 'lucide-react';
import { mandiData as initialMandi } from '../../data/mandiData';

export default function MandiManager() {
  const [mandiRates, setMandiRates] = useState(initialMandi);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editPrice, setEditPrice] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New commodity form
  const [newCommodity, setNewCommodity] = useState({
    state: 'Uttar Pradesh',
    district: '',
    market: '',
    commodity: '',
    variety: 'Standard Grade',
    minPrice: 2000,
    maxPrice: 2600,
    modalPrice: 2400,
    msp: 2425,
    trend: 'up',
    change: '+₹40',
    icon: '🌾'
  });

  const handleSavePrice = (id) => {
    setMandiRates(mandiRates.map(m => {
      if (m.id === id) {
        const p = parseInt(editPrice) || m.modalPrice;
        return {
          ...m,
          modalPrice: p,
          arrivalDate: new Date().toISOString().slice(0, 10)
        };
      }
      return m;
    }));
    setEditingId(null);
  };

  const handleDelete = (id) => {
    if (confirm('क्या आप इस मंडी भाव को हटाना चाहते हैं?')) {
      setMandiRates(mandiRates.filter(m => m.id !== id));
    }
  };

  const handleAddCommodity = (e) => {
    e.preventDefault();
    if (!newCommodity.commodity || !newCommodity.market) return;

    const created = {
      id: Date.now(),
      state: newCommodity.state,
      district: newCommodity.district || 'केंद्रीय',
      market: newCommodity.market,
      commodity: newCommodity.commodity,
      variety: newCommodity.variety,
      arrivalDate: new Date().toISOString().slice(0, 10),
      minPrice: parseInt(newCommodity.minPrice),
      maxPrice: parseInt(newCommodity.maxPrice),
      modalPrice: parseInt(newCommodity.modalPrice),
      msp: newCommodity.msp ? parseInt(newCommodity.msp) : null,
      trend: newCommodity.trend,
      change: newCommodity.change,
      icon: newCommodity.icon
    };

    setMandiRates([created, ...mandiRates]);
    setIsAddModalOpen(false);
  };

  const filtered = mandiRates.filter(m => 
    m.commodity.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.market.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Title & Actions */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏛️</span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              मंडी भाव संपादक एवं प्रबंधक (Mandi Rates Manager)
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            विभिन्न राज्य मंडियों के दैनिक मॉडल भाव, न्यूनतम/अधिकतम दरें सीधे अपडेट करें या नई फसल जोड़ें।
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs sm:text-sm rounded-2xl flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95 cursor-pointer shrink-0"
        >
          <Plus className="w-5 h-5" />
          <span>नया भाव जोड़ें (Add Rate)</span>
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-xs">
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="फसल, मंडी या राज्य खोजें..."
            className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm focus:outline-hidden focus:border-amber-500"
          />
        </div>
      </div>

      {/* Rates Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase text-[11px] tracking-wider">
                <th className="p-4">फसल / जिंस (Commodity)</th>
                <th className="p-4">मंडी एवं राज्य</th>
                <th className="p-4">मॉडल भाव (₹/क्विंटल)</th>
                <th className="p-4">MSP</th>
                <th className="p-4">रुझान</th>
                <th className="p-4 text-right">कार्रवाई</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((m) => (
                <tr key={m.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl">{m.icon}</span>
                      <div>
                        <span className="font-extrabold text-slate-900 block">{m.commodity}</span>
                        <span className="text-[11px] text-slate-400 block">{m.variety}</span>
                      </div>
                    </div>
                  </td>

                  <td className="p-4">
                    <span className="font-bold text-slate-800 block">{m.market}</span>
                    <span className="text-xs text-slate-500 block">{m.district}, {m.state}</span>
                  </td>

                  <td className="p-4">
                    {editingId === m.id ? (
                      <div className="flex items-center gap-1.5">
                        <input
                          type="number"
                          autoFocus
                          value={editPrice}
                          onChange={(e) => setEditPrice(e.target.value)}
                          className="w-24 px-2 py-1 border border-amber-500 rounded-lg text-sm font-bold text-slate-900"
                        />
                        <button
                          onClick={() => handleSavePrice(m.id)}
                          className="p-1 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 cursor-pointer"
                        >
                          <Save className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-baseline gap-1">
                        <span className="text-base font-black text-slate-900">₹{m.modalPrice}</span>
                        <span className="text-[10px] text-slate-400">/ क्विंटल</span>
                      </div>
                    )}
                  </td>

                  <td className="p-4">
                    <span className="font-semibold text-slate-700">
                      {m.msp ? `₹${m.msp}` : 'लागू नहीं'}
                    </span>
                  </td>

                  <td className="p-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black inline-flex items-center gap-1 ${
                      m.trend === 'up' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {m.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      <span>{m.change}</span>
                    </span>
                  </td>

                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => {
                          setEditingId(m.id);
                          setEditPrice(m.modalPrice.toString());
                        }}
                        className="p-1.5 hover:bg-amber-50 text-amber-700 rounded-lg transition-colors cursor-pointer"
                        title="Edit Price"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(m.id)}
                        className="p-1.5 hover:bg-rose-50 text-rose-600 rounded-lg transition-colors cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <form
            onSubmit={handleAddCommodity}
            className="w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 space-y-4 animate-in fade-in duration-200"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-extrabold text-lg text-slate-800">नया मंडी भाव जोड़ें</h3>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">फसल का नाम</label>
                <input
                  type="text"
                  required
                  value={newCommodity.commodity}
                  onChange={(e) => setNewCommodity({ ...newCommodity, commodity: e.target.value })}
                  placeholder="जैसे: गेहूं, चना, बाजरा..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">मंडी का नाम</label>
                <input
                  type="text"
                  required
                  value={newCommodity.market}
                  onChange={(e) => setNewCommodity({ ...newCommodity, market: e.target.value })}
                  placeholder="जैसे: मेरठ APMC"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-amber-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">मॉडल भाव (₹)</label>
                <input
                  type="number"
                  required
                  value={newCommodity.modalPrice}
                  onChange={(e) => setNewCommodity({ ...newCommodity, modalPrice: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-amber-500"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">न्यूनतम भाव (₹)</label>
                <input
                  type="number"
                  value={newCommodity.minPrice}
                  onChange={(e) => setNewCommodity({ ...newCommodity, minPrice: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-amber-500"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">अधिकतम भाव (₹)</label>
                <input
                  type="number"
                  value={newCommodity.maxPrice}
                  onChange={(e) => setNewCommodity({ ...newCommodity, maxPrice: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-amber-500"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 text-xs font-bold rounded-xl border border-slate-200 text-slate-600 cursor-pointer"
              >
                रद्द करें
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-extrabold rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-xs cursor-pointer"
              >
                भाव प्रकाशित करें
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
