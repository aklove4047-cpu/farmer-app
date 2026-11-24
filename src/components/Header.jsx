import React from 'react';
import { PhoneCall, Languages, Volume2, ShieldAlert, Sparkles, Shield, UserCog } from 'lucide-react';

export default function Header({ 
  lang, 
  setLang, 
  t, 
  onOpenHelplines, 
  onVoiceClick, 
  onOpenAdmin 
}) {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 via-green-600 to-lime-500 flex items-center justify-center text-white shadow-md shadow-emerald-600/20 text-2xl">
              🌾
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-emerald-950 font-['Yantramanav',sans-serif]">
                  {t.appName}
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                  <Sparkles className="w-3 h-3 text-emerald-600" /> प्रो (Pro)
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block -mt-0.5">
                {t.appTagline}
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Read page audio */}
            <button
              onClick={onVoiceClick}
              title={lang === 'hi' ? 'बोलकर सुनें' : 'Listen with Audio'}
              className="p-2 sm:px-3 sm:py-1.5 text-xs font-semibold rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
            >
              <Volume2 className="w-4 h-4 text-amber-600" />
              <span className="hidden md:inline">{lang === 'hi' ? 'बोलकर सुनें' : 'Audio'}</span>
            </button>

            {/* Helpline Modal Trigger */}
            <button
              onClick={onOpenHelplines}
              className="p-2 sm:px-3 sm:py-1.5 text-xs font-semibold rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
              title="Kisan Helpline"
            >
              <PhoneCall className="w-4 h-4 text-rose-600 animate-pulse" />
              <span className="hidden sm:inline">{lang === 'hi' ? 'हेल्पलाइन' : 'Helpline'}</span>
            </button>

            {/* Admin Panel Button */}
            <button
              onClick={onOpenAdmin}
              className="p-2 sm:px-3 sm:py-1.5 text-xs font-bold rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 border border-slate-700 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
              title="Admin Portal"
            >
              <UserCog className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">एडमिन (Admin)</span>
            </button>

            {/* Language Switch */}
            <button
              onClick={() => setLang(lang === 'hi' ? 'en' : 'hi')}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm transition-all cursor-pointer active:scale-95"
            >
              <Languages className="w-4 h-4" />
              <span>{t.langSwitch}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
