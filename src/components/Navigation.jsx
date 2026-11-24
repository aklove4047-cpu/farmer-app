import React from 'react';
import { 
  Home, TrendingUp, Stethoscope, Wallet, Calculator, 
  Building2, ShoppingBag, Users, BookOpen 
} from 'lucide-react';

export const NAV_ITEMS = [
  { id: 'home', labelKey: 'navHome', icon: Home },
  { id: 'mandi', labelKey: 'navMandi', icon: TrendingUp },
  { id: 'doctor', labelKey: 'navDoctor', icon: Stethoscope },
  { id: 'khata', labelKey: 'navKhata', icon: Wallet },
  { id: 'calc', labelKey: 'navCalc', icon: Calculator },
  { id: 'schemes', labelKey: 'navSchemes', icon: Building2 },
  { id: 'bazaar', labelKey: 'navBazaar', icon: ShoppingBag },
  { id: 'chaupal', labelKey: 'navChaupal', icon: Users },
  { id: 'guides', labelKey: 'navGuides', icon: BookOpen },
];

export default function Navigation({ activeTab, setActiveTab, t }) {
  return (
    <>
      {/* Desktop & Tablet Top Category Tabs */}
      <div className="hidden md:block bg-white border-b border-slate-200/80 sticky top-16 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-1 overflow-x-auto py-2.5 scrollbar-none">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30'
                      : 'text-slate-600 hover:text-emerald-700 hover:bg-emerald-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{t[item.labelKey]}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile Sticky Bottom App Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-2xl px-2 py-1.5 flex items-center justify-around">
        {NAV_ITEMS.slice(0, 5).map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center p-1.5 rounded-xl transition-all cursor-pointer ${
                isActive
                  ? 'text-emerald-700 font-extrabold scale-105'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <div className={`p-1 rounded-lg ${isActive ? 'bg-emerald-100' : ''}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight truncate max-w-[60px]">
                {t[item.labelKey]}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
