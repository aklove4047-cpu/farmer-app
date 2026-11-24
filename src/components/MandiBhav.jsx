import React, { useState } from 'react';
import { 
  TrendingUp, TrendingDown, Minus, Search, Filter, 
  Share2, ArrowUpRight, ArrowDownRight, Check, Award
} from 'lucide-react';
import { mandiData } from '../data/mandiData';

export default function MandiBhav({ lang, t }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('ALL');
  const [trendFilter, setTrendFilter] = useState('ALL');
  const [copiedId, setCopiedId] = useState(null);

  const states = ['ALL', ...new Set(mandiData.map(m => m.state))];

  const filteredMandi = mandiData.filter(item => {
    const matchesSearch = 
      item.commodity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.market.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.district.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesState = selectedState === 'ALL' || item.state === selectedState;
    const matchesTrend = trendFilter === 'ALL' || item.trend === trendFilter;

    return matchesSearch && matchesState && matchesTrend;
  });

  const handleShare = (item) => {
    const text = lang === 'hi'
      ? `🌾 *कृषि साथी मंडी भाव अपडेट* 🌾\nफसल: ${item.commodity}\nमंडी: ${item.market} (${item.state})\nमॉडल भाव: ₹${item.modalPrice} प्रति क्विंटल\nMSP: ${item.msp ? '₹' + item.msp : 'लागू नहीं'}\nतारीख: ${item.arrivalDate}`
      : `🌾 *Krishi Saathi Mandi Update* 🌾\nCommodity: ${item.commodity}\nMarket: ${item.market} (${item.state})\nModal Rate: ₹${item.modalPrice}/Quintal\nMSP: ${item.msp ? '₹' + item.msp : 'N/A'}\nDate: ${item.arrivalDate}`;

    if (navigator.share) {
      navigator.share({ title: 'Mandi Bhav', text: text });
    } else {
      navigator.clipboard.writeText(text);
      setCopiedId(item.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Title & Stats Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-orange-600 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-3xl">🏛️</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-['Yantramanav',sans-serif]">
                {t.mandiTitle}
              </h2>
            </div>
            <p className="text-amber-100 text-sm mt-1 max-w-xl">
              {t.mandiSubtitle}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-white/20 backdrop-blur-xs px-4 py-2.5 rounded-2xl border border-white/20 text-center">
              <span className="text-xs text-amber-100 block">{lang === 'hi' ? 'सक्रिय मंडियां' : 'Active Mandis'}</span>
              <span className="text-xl font-black">150+</span>
            </div>
            <div className="bg-white/20 backdrop-blur-xs px-4 py-2.5 rounded-2xl border border-white/20 text-center">
              <span className="text-xs text-amber-100 block">{lang === 'hi' ? 'ताज़ा अपडेट' : 'Last Updated'}</span>
              <span className="text-base font-extrabold">{lang === 'hi' ? 'आज सुबह 11 AM' : 'Today 11 AM'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={lang === 'hi' ? 'फसल, मंडी या जिला खोजें (जैसे: गेहूं, Meerut, प्याज)...' : 'Search commodity, market or district...'}
              className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-emerald-500 focus:outline-hidden transition-all"
            />
          </div>

          {/* State Filter */}
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 focus:bg-white focus:border-emerald-500 focus:outline-hidden cursor-pointer"
          >
            <option value="ALL">{t.allStates}</option>
            {states.filter(s => s !== 'ALL').map((st, i) => (
              <option key={i} value={st}>{st}</option>
            ))}
          </select>

          {/* Trend Filter */}
          <select
            value={trendFilter}
            onChange={(e) => setTrendFilter(e.target.value)}
            className="px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 focus:bg-white focus:border-emerald-500 focus:outline-hidden cursor-pointer"
          >
            <option value="ALL">{lang === 'hi' ? 'सभी रुझान' : 'All Trends'}</option>
            <option value="up">{lang === 'hi' ? 'तेज़ी (भाव बढ़े)' : 'Price Gaining'}</option>
            <option value="down">{lang === 'hi' ? 'मंदी (भाव गिरे)' : 'Price Falling'}</option>
            <option value="stable">{lang === 'hi' ? 'स्थिर' : 'Stable'}</option>
          </select>
        </div>
      </div>

      {/* Mandi Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMandi.map((item) => {
          const isAboveMsp = item.msp && item.modalPrice >= item.msp;
          const isBelowMsp = item.msp && item.modalPrice < item.msp;

          return (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-5 shadow-xs hover:shadow-md border border-slate-200/80 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl p-2 bg-amber-50 rounded-2xl border border-amber-100">
                      {item.icon}
                    </span>
                    <div>
                      <h3 className="font-extrabold text-slate-800 text-lg leading-tight">
                        {item.commodity}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium">
                        {item.variety}
                      </p>
                    </div>
                  </div>

                  {/* Trend Indicator */}
                  <div className={`px-2.5 py-1 rounded-xl text-xs font-bold flex items-center gap-1 ${
                    item.trend === 'up' 
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                      : item.trend === 'down'
                      ? 'bg-rose-50 text-rose-700 border border-rose-200'
                      : 'bg-slate-100 text-slate-600 border border-slate-200'
                  }`}>
                    {item.trend === 'up' && <ArrowUpRight className="w-3.5 h-3.5" />}
                    {item.trend === 'down' && <ArrowDownRight className="w-3.5 h-3.5" />}
                    {item.trend === 'stable' && <Minus className="w-3.5 h-3.5" />}
                    <span>{item.change}</span>
                  </div>
                </div>

                {/* Market & Location */}
                <div className="mt-4 pb-3 border-b border-slate-100 flex items-center justify-between text-xs text-slate-600">
                  <span className="font-semibold text-slate-800">
                    📍 {item.market} ({item.district})
                  </span>
                  <span className="text-slate-400 font-mono text-[11px]">
                    {item.arrivalDate}
                  </span>
                </div>

                {/* Price Display */}
                <div className="mt-3 flex items-baseline justify-between">
                  <div>
                    <span className="text-[11px] font-semibold uppercase text-slate-400 tracking-wider">
                      {t.modalPrice}
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-slate-900 tracking-tight">
                        ₹{item.modalPrice.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">/ क्विंटल</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[11px] text-slate-400 block font-semibold">
                      {t.minMaxPrice}
                    </span>
                    <span className="text-xs font-bold text-slate-700">
                      ₹{item.minPrice} - ₹{item.maxPrice}
                    </span>
                  </div>
                </div>

                {/* MSP Tag */}
                {item.msp && (
                  <div className={`mt-3 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center justify-between ${
                    isAboveMsp 
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                      : 'bg-amber-50 text-amber-800 border border-amber-200'
                  }`}>
                    <span className="flex items-center gap-1">
                      <Award className="w-3.5 h-3.5" />
                      <span>MSP: ₹{item.msp}</span>
                    </span>
                    <span>
                      {isAboveMsp ? `+₹${item.modalPrice - item.msp} ${t.aboveMsp}` : `-₹${item.msp - item.modalPrice} ${t.belowMsp}`}
                    </span>
                  </div>
                )}
              </div>

              {/* Action Button: Share */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  {lang === 'hi' ? 'APMC सत्यापित' : 'APMC Verified'}
                </span>
                <button
                  onClick={() => handleShare(item)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-600 text-xs font-bold transition-all cursor-pointer active:scale-95"
                >
                  {copiedId === item.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{lang === 'hi' ? 'कॉपी हुआ!' : 'Copied!'}</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5" />
                      <span>{lang === 'hi' ? 'व्हाट्सएप साझा' : 'Share'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredMandi.length === 0 && (
        <div className="text-center py-12 bg-white rounded-3xl border border-slate-200">
          <p className="text-4xl mb-2">🔍</p>
          <p className="font-bold text-slate-700">
            {lang === 'hi' ? 'कोई मंडी भाव नहीं मिला।' : 'No Mandi rate found for current filter.'}
          </p>
        </div>
      )}
    </div>
  );
}
