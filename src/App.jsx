import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import WeatherWidget from './components/WeatherWidget';
import MandiBhav from './components/MandiBhav';
import CropDoctor from './components/CropDoctor';
import KisanKhata from './components/KisanKhata';
import FertilizerCalc from './components/FertilizerCalc';
import SchemesPortal from './components/SchemesPortal';
import Marketplace from './components/Marketplace';
import CommunityForum from './components/CommunityForum';
import CropCalendar from './components/CropCalendar';
import HelplineModal from './components/HelplineModal';
import AdminDashboard from './components/AdminPanel/AdminDashboard';
import AdminLogin from './components/AdminPanel/AdminLogin';
import { translations } from './data/translations';
import { DEFAULT_APIS, INITIAL_CUSTOMERS } from './data/adminData';
import { speakText, stopSpeech } from './utils/speech';
import { 
  TrendingUp, Stethoscope, Wallet, Calculator, 
  Building2, ShoppingBag, Users, BookOpen, Sparkles,
  PhoneCall, ArrowRight, ShieldCheck, SunMedium, UserCog
} from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState('hi'); // 'hi' | 'en'
  const [activeTab, setActiveTab] = useState('home');
  const [isHelplineOpen, setIsHelplineOpen] = useState(false);
  const [isAdminActive, setIsAdminActive] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);

  // APIs state persisted
  const [apis, setApis] = useState(() => {
    const saved = localStorage.getItem('krishi_admin_apis');
    return saved ? JSON.parse(saved) : DEFAULT_APIS;
  });

  // Customers state persisted
  const [customers, setCustomers] = useState(() => {
    const saved = localStorage.getItem('krishi_admin_customers');
    return saved ? JSON.parse(saved) : INITIAL_CUSTOMERS;
  });

  useEffect(() => {
    localStorage.setItem('krishi_admin_apis', JSON.stringify(apis));
  }, [apis]);

  useEffect(() => {
    localStorage.setItem('krishi_admin_customers', JSON.stringify(customers));
  }, [customers]);

  const t = translations[lang];

  // Quick Action cards for Home view
  const quickActions = [
    {
      id: 'mandi',
      icon: TrendingUp,
      titleHi: 'ताज़ा मंडी भाव',
      titleEn: 'Mandi Rates',
      descHi: 'गेहूं, सरसों, धान, आलू के लाइव दाम',
      descEn: 'Daily APMC market prices',
      gradient: 'from-amber-500 to-orange-600',
      badge: 'लाइव'
    },
    {
      id: 'doctor',
      icon: Stethoscope,
      titleHi: 'एआई फसल डॉक्टर',
      titleEn: 'AI Crop Doctor',
      descHi: 'पत्ती की फोटो लें, तुरंत रोग व उपचार पाएं',
      descEn: 'Scan leaf for instant cure',
      gradient: 'from-emerald-600 to-teal-700',
      badge: 'एआई'
    },
    {
      id: 'khata',
      icon: Wallet,
      titleHi: 'किसान खाता-बही',
      titleEn: 'Farm Khata',
      descHi: 'लागत, लेबर और फसल बिक्री का हिसाब',
      descEn: 'Track expenses & income',
      gradient: 'from-blue-600 to-indigo-700',
      badge: 'नया'
    },
    {
      id: 'calc',
      icon: Calculator,
      titleHi: 'खाद-बीज कैलकुलेटर',
      titleEn: 'Fertilizer Calc',
      descHi: 'खेत के अनुसार यूरिया, डीएपी की सही मात्रा',
      descEn: 'NPK & seed dosage by area',
      gradient: 'from-teal-600 to-emerald-700',
      badge: 'सटीक'
    },
    {
      id: 'schemes',
      icon: Building2,
      titleHi: 'सरकारी योजनाएं',
      titleEn: 'Govt Schemes',
      descHi: 'PM-किसान, फसल बीमा, कुसुम सोलर सब्सिडी',
      descEn: 'Subsidies, loans & insurance',
      gradient: 'from-indigo-600 to-purple-700',
      badge: 'सब्सिडी'
    },
    {
      id: 'bazaar',
      icon: ShoppingBag,
      titleHi: 'किसान बाज़ार',
      titleEn: 'Marketplace',
      descHi: 'फसल, ट्रैक्टर, पशुधन सीधे खरीदें-बेचें',
      descEn: 'Direct buy & sell without middlemen',
      gradient: 'from-emerald-700 to-green-800',
      badge: '0% दलाली'
    },
    {
      id: 'chaupal',
      icon: Users,
      titleHi: 'कृषि चौपाल',
      titleEn: 'Kisan Chaupal',
      descHi: 'वैज्ञानिकों व किसानों से सवाल-जवाब',
      descEn: 'Community Q&A with KVK scientists',
      gradient: 'from-cyan-600 to-blue-700',
      badge: 'समुदाय'
    },
    {
      id: 'guides',
      icon: BookOpen,
      titleHi: 'फसल ज्ञान कैलेंडर',
      titleEn: 'Crop Calendar',
      descHi: 'उन्नत किस्में, बुवाई समय व पैदावार',
      descEn: 'Sowing guides & best varieties',
      gradient: 'from-emerald-800 to-lime-800',
      badge: 'गाइड'
    }
  ];

  // Speak welcome or current screen text
  const handleVoiceAssistant = () => {
    const welcomeSpeech = lang === 'hi'
      ? 'राम-राम किसान भाई! कृषि साथी ऐप में आपका स्वागत है। आप यहां से ताज़ा मंडी भाव, फसल डॉक्टर, सरकारी योजनाएं और मौसम की जानकारी प्राप्त कर सकते हैं।'
      : 'Welcome Kisan Brother! You can check mandi rates, AI crop doctor, government schemes and live weather here.';
    speakText(welcomeSpeech, lang);
  };

  // If in Admin Dashboard Mode
  if (isAdminActive) {
    return (
      <AdminDashboard
        apis={apis}
        setApis={setApis}
        customers={customers}
        setCustomers={setCustomers}
        onExitAdmin={() => setIsAdminActive(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans pb-24 md:pb-12 text-slate-800">
      {/* Top Header */}
      <Header
        lang={lang}
        setLang={setLang}
        t={t}
        onOpenHelplines={() => setIsHelplineOpen(true)}
        onVoiceClick={handleVoiceAssistant}
        onOpenAdmin={() => setIsAdminLoginOpen(true)}
      />

      {/* Navigation Bar */}
      <Navigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        t={t}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-5">
        {/* HOME VIEW */}
        {activeTab === 'home' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Welcome Greeting Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gradient-to-r from-emerald-900 via-emerald-800 to-green-900 rounded-3xl p-5 sm:p-6 text-white shadow-md relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center gap-2">
                  <span className="text-2xl sm:text-3xl">🌾</span>
                  <h1 className="text-xl sm:text-2xl font-black font-['Yantramanav',sans-serif]">
                    {t.welcome}
                  </h1>
                </div>
                <p className="text-xs sm:text-sm text-emerald-200 mt-1">
                  {lang === 'hi' 
                    ? 'आज की प्रमुख कृषि सलाह, मंडी भाव और सरकारी अपडेट्स आपके लिए तैयार हैं।' 
                    : 'Your daily farm advisories, mandi rates and government updates are ready.'}
                </p>
              </div>

              <div className="relative z-10 flex items-center gap-2">
                <button
                  onClick={() => setIsAdminLoginOpen(true)}
                  className="px-3 py-2 bg-white/10 hover:bg-white/20 text-amber-300 font-bold text-xs rounded-xl border border-white/20 flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <UserCog className="w-3.5 h-3.5" />
                  <span>एडमिन पैनल</span>
                </button>

                <button
                  onClick={() => setIsHelplineOpen(true)}
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs rounded-xl shadow-xs flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
                >
                  <PhoneCall className="w-3.5 h-3.5 animate-bounce" />
                  <span>1800-180-1551</span>
                </button>
              </div>
            </div>

            {/* Live Weather Widget */}
            <WeatherWidget lang={lang} t={t} />

            {/* Quick Actions Grid */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-emerald-600" />
                  <span>{lang === 'hi' ? 'सभी मुख्य सुविधाएं एवं सेवाएं' : 'Key Farm Features'}</span>
                </h2>
                <span className="text-xs text-slate-400 font-semibold">
                  {quickActions.length} {lang === 'hi' ? 'सुविधाएं' : 'features'}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-4">
                {quickActions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={action.id}
                      onClick={() => setActiveTab(action.id)}
                      className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-xs hover:shadow-lg hover:border-emerald-300 transition-all text-left flex flex-col justify-between group cursor-pointer active:scale-95"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <div className={`w-11 h-11 rounded-2xl bg-gradient-to-tr ${action.gradient} text-white flex items-center justify-center shadow-md shadow-emerald-900/10 group-hover:scale-110 transition-transform`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                            {action.badge}
                          </span>
                        </div>

                        <h3 className="font-extrabold text-slate-900 text-sm sm:text-base leading-snug">
                          {lang === 'hi' ? action.titleHi : action.titleEn}
                        </h3>

                        <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                          {lang === 'hi' ? action.descHi : action.descEn}
                        </p>
                      </div>

                      <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700">
                        <span>{lang === 'hi' ? 'खोलें' : 'Open'}</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Teaser: AI Crop Doctor Spotlight */}
            <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-green-50 rounded-3xl p-6 border border-emerald-200/80 flex flex-col sm:flex-row items-center justify-between gap-5">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-3xl bg-emerald-600 text-white flex items-center justify-center text-3xl shadow-lg shadow-emerald-600/20 shrink-0">
                  📸
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black uppercase text-emerald-800 tracking-wider">
                      एआई तकनीक
                    </span>
                    <span className="bg-emerald-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                      100% मुफ़्त
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-0.5">
                    {lang === 'hi' ? 'फसल में कोई बीमारी या पीलापन दिख रहा है?' : 'Spotting disease or yellowing in your crop?'}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-lg">
                    {lang === 'hi' 
                      ? 'बस मोबाइल कैमरे से पत्ती की फोटो अपलोड करें। हमारा एआई डॉक्टर तुरंत सही दवा व देसी उपचार बताएगा।' 
                      : 'Take a photo of the affected plant. Get instant diagnosis and verified cure.'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setActiveTab('doctor')}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-2xl shadow-sm transition-all active:scale-95 shrink-0 cursor-pointer"
              >
                {lang === 'hi' ? 'अभी फोटो जांचें →' : 'Scan Plant Now →'}
              </button>
            </div>
          </div>
        )}

        {/* MANDI RATES VIEW */}
        {activeTab === 'mandi' && <MandiBhav lang={lang} t={t} />}

        {/* CROP DOCTOR VIEW */}
        {activeTab === 'doctor' && <CropDoctor lang={lang} t={t} />}

        {/* KISAN KHATA VIEW */}
        {activeTab === 'khata' && <KisanKhata lang={lang} t={t} />}

        {/* FERTILIZER CALCULATOR VIEW */}
        {activeTab === 'calc' && <FertilizerCalc lang={lang} t={t} />}

        {/* GOVERNMENT SCHEMES VIEW */}
        {activeTab === 'schemes' && <SchemesPortal lang={lang} t={t} />}

        {/* MARKETPLACE VIEW */}
        {activeTab === 'bazaar' && <Marketplace lang={lang} t={t} />}

        {/* COMMUNITY FORUM VIEW */}
        {activeTab === 'chaupal' && <CommunityForum lang={lang} t={t} />}

        {/* CROP GUIDES VIEW */}
        {activeTab === 'guides' && <CropCalendar lang={lang} t={t} />}
      </main>

      {/* Emergency Helpline Modal */}
      <HelplineModal
        isOpen={isHelplineOpen}
        onClose={() => setIsHelplineOpen(false)}
        lang={lang}
      />

      {/* Admin PIN Login Modal */}
      {isAdminLoginOpen && (
        <AdminLogin
          onLoginSuccess={() => {
            setIsAdminLoginOpen(false);
            setIsAdminActive(true);
          }}
          onCancel={() => setIsAdminLoginOpen(false)}
        />
      )}
    </div>
  );
}
