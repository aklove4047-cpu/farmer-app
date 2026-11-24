import React, { useState } from 'react';
import { 
  ShoppingBag, Plus, Phone, MessageSquare, MapPin, 
  Search, CheckCircle2, Tag, ShieldCheck, Filter 
} from 'lucide-react';
import { initialMarketItems } from '../data/marketItems';

export default function Marketplace({ lang, t }) {
  const [items, setItems] = useState(initialMarketItems);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCat, setSelectedCat] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Listing Form
  const [form, setForm] = useState({
    title: '',
    category: 'Crops (अनाज/उपज)',
    quantity: '',
    price: '',
    unit: 'प्रति क्विंटल',
    sellerName: '',
    location: '',
    phone: '',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=500&q=80'
  });

  const handlePostAd = (e) => {
    e.preventDefault();
    if (!form.title || !form.price || !form.phone) return;

    const newItem = {
      id: Date.now(),
      titleHi: form.title,
      titleEn: form.title,
      category: form.category,
      quantity: form.quantity || 'पर्याप्त मात्रा',
      price: form.price.startsWith('₹') ? form.price : `₹${form.price}`,
      unit: form.unit,
      sellerName: form.sellerName || 'किसान भाई',
      location: form.location || 'भारत',
      phone: form.phone,
      verified: true,
      image: form.image,
      postedDate: 'अभी-अभी'
    };

    setItems([newItem, ...items]);
    setIsModalOpen(false);
    setForm({
      title: '',
      category: 'Crops (अनाज/उपज)',
      quantity: '',
      price: '',
      unit: 'प्रति क्विंटल',
      sellerName: '',
      location: '',
      phone: '',
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=500&q=80'
    });
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = 
      item.titleHi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sellerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCat = selectedCat === 'ALL' || item.category.includes(selectedCat);

    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-700 via-green-700 to-teal-700 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-3xl">🛒</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-['Yantramanav',sans-serif]">
                {t.bazaarTitle}
              </h2>
            </div>
            <p className="text-emerald-100 text-sm mt-1 max-w-xl">
              {t.bazaarSubtitle}
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-5 py-2.5 bg-lime-400 hover:bg-lime-300 text-slate-950 font-extrabold text-sm rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95 cursor-pointer self-start md:self-auto"
          >
            <Plus className="w-5 h-5 text-slate-900" />
            <span>{t.postAd}</span>
          </button>
        </div>
      </div>

      {/* Search & Category Filter */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={lang === 'hi' ? 'उपज, ट्रैक्टर, बीज या स्थान खोजें...' : 'Search produce, tractor, seeds or location...'}
            className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-emerald-500 focus:outline-hidden"
          />
        </div>

        <select
          value={selectedCat}
          onChange={(e) => setSelectedCat(e.target.value)}
          className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 focus:bg-white focus:border-emerald-500 focus:outline-hidden cursor-pointer"
        >
          <option value="ALL">{lang === 'hi' ? 'सभी श्रेणियां' : 'All Categories'}</option>
          <option value="Crops">Crops (अनाज/उपज)</option>
          <option value="Machinery">Machinery (ट्रैक्टर/यंत्र)</option>
          <option value="Cattle">Cattle / Dairy (पशुधन)</option>
          <option value="Fertilizer">Fertilizer (जैविक खाद)</option>
        </select>
      </div>

      {/* Marketplace Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              {/* Product Image */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                <img
                  src={item.image}
                  alt={item.titleHi}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-slate-800 text-[11px] font-bold px-2.5 py-1 rounded-full shadow-xs">
                  {item.category}
                </span>
                <span className="absolute bottom-3 right-3 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-md backdrop-blur-xs">
                  {item.postedDate}
                </span>
              </div>

              {/* Product Info */}
              <div className="p-5">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-2xl font-black text-emerald-700">
                    {item.price}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {item.unit}
                  </span>
                </div>

                <h3 className="font-extrabold text-slate-900 text-base mt-2 line-clamp-1">
                  {lang === 'hi' ? item.titleHi : item.titleEn}
                </h3>

                <p className="text-xs text-slate-500 font-medium mt-1">
                  📦 उपलब्ध: <span className="font-bold text-slate-700">{item.quantity}</span>
                </p>

                {/* Seller & Location */}
                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                  <div className="flex items-center gap-1.5 font-bold">
                    <span>{item.sellerName}</span>
                    {item.verified && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" title="Verified Farmer" />
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-slate-400">
                    <MapPin className="w-3 h-3" />
                    <span>{item.location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Contact Buttons */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center gap-2">
              <a
                href={`tel:${item.phone}`}
                className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-xs active:scale-95"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{lang === 'hi' ? 'कॉल करें' : 'Call'}</span>
              </a>

              <a
                href={`https://wa.me/91${item.phone}?text=नमस्ते, मैंने कृषि साथी ऐप पर आपका विज्ञापन '${encodeURIComponent(item.titleHi)}' देखा है।`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 bg-green-500 hover:bg-green-600 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-xs active:scale-95"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Post Ad Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <form
            onSubmit={handlePostAd}
            className="w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-extrabold text-lg text-slate-800">
                {lang === 'hi' ? 'अपनी उपज या सामान का विज्ञापन दें' : 'Post Produce for Sale'}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                {lang === 'hi' ? 'उपज या वस्तु का नाम' : 'Title'}
              </label>
              <input
                type="text"
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="जैसे: शरबती गेहूं, महिंद्रा ट्रैक्टर 575..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {lang === 'hi' ? 'श्रेणी' : 'Category'}
                </label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-emerald-500"
                >
                  <option value="Crops (अनाज/उपज)">Crops (अनाज/उपज)</option>
                  <option value="Machinery (कृषि यंत्र)">Machinery (कृषि यंत्र)</option>
                  <option value="Cattle / Dairy (पशुधन)">Cattle / Dairy (पशुधन)</option>
                  <option value="Fertilizer (जैविक खाद)">Fertilizer (जैविक खाद)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {lang === 'hi' ? 'मात्रा' : 'Quantity'}
                </label>
                <input
                  type="text"
                  value={form.quantity}
                  onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                  placeholder="जैसे: 50 क्विंटल, 1 यूनिट"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {lang === 'hi' ? 'कीमत (₹)' : 'Price'}
                </label>
                <input
                  type="text"
                  required
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  placeholder="₹ 2500"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {lang === 'hi' ? 'प्रति' : 'Unit'}
                </label>
                <input
                  type="text"
                  value={form.unit}
                  onChange={(e) => setForm({ ...form, unit: e.target.value })}
                  placeholder="प्रति क्विंटल / कुल कीमत"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {lang === 'hi' ? 'आपका नाम' : 'Your Name'}
                </label>
                <input
                  type="text"
                  required
                  value={form.sellerName}
                  onChange={(e) => setForm({ ...form, sellerName: e.target.value })}
                  placeholder="सुरेश कुमार"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {lang === 'hi' ? 'मोबाइल नंबर' : 'Phone'}
                </label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="9876543210"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                {lang === 'hi' ? 'स्थान (जिला व राज्य)' : 'Location (District & State)'}
              </label>
              <input
                type="text"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                placeholder="मेरठ, उत्तर प्रदेश"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-emerald-500"
              />
            </div>

            <div className="pt-3 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-xs font-bold rounded-xl border border-slate-200 text-slate-600 cursor-pointer"
              >
                रद्द करें
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-extrabold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs cursor-pointer"
              >
                विज्ञापन पोस्ट करें
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
