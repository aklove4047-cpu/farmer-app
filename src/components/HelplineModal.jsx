import React from 'react';
import { X, Phone, Clock, AlertTriangle, ShieldCheck } from 'lucide-react';
import { helplinesData } from '../data/helplines';

export default function HelplineModal({ isOpen, onClose, lang }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-rose-600 to-amber-600 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/20 rounded-2xl backdrop-blur-xs">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg sm:text-xl">
                {lang === 'hi' ? 'आपातकालीन किसान हेल्पलाइन' : 'Farmer Emergency Helplines'}
              </h3>
              <p className="text-xs text-rose-100">
                {lang === 'hi' ? 'सीधे कॉल करने के लिए नंबर पर टैप करें' : 'Tap any number to call directly'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 transition-colors text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Helplines list */}
        <div className="p-5 overflow-y-auto space-y-3.5 divide-y divide-slate-100">
          {helplinesData.map((item, idx) => (
            <div key={idx} className="pt-3.5 first:pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-800 text-sm sm:text-base">
                    {lang === 'hi' ? item.nameHi : item.nameEn}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    {item.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                <div className="flex items-center gap-1 text-[11px] text-amber-700 mt-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{item.timings}</span>
                </div>
              </div>

              <a
                href={`tel:${item.number.replace(/[^0-9]/g, '')}`}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-sm transition-all active:scale-95 shrink-0"
              >
                <Phone className="w-4 h-4" />
                <span>{item.number}</span>
              </a>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>{lang === 'hi' ? 'भारत सरकार द्वारा प्रमाणित टोल-फ्री सेवाएं' : 'Government verified toll-free services'}</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 cursor-pointer"
          >
            {lang === 'hi' ? 'बंद करें' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
}
