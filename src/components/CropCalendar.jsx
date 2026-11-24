import React, { useState } from 'react';
import { Calendar, Clock, Droplets, Sprout, Award, ChevronRight, BookOpen } from 'lucide-react';
import { cropsGuide } from '../data/cropsGuide';

export default function CropCalendar({ lang, t }) {
  const [selectedCrop, setSelectedCrop] = useState(cropsGuide[0]);

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-green-900 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🌱</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-['Yantramanav',sans-serif]">
              {lang === 'hi' ? 'फसल ज्ञान एवं आधुनिक कृषि कैलेंडर' : 'Crop Guide & Agri Calendar'}
            </h2>
          </div>
          <p className="text-emerald-100 text-sm mt-1 max-w-xl">
            {lang === 'hi'
              ? 'प्रमुख फसलों की उन्नत किस्में, बुवाई समय, बीज दर, सिंचाई चक्र और संभावित पैदावार की पूरी गाइड'
              : 'Complete package of practices, high yielding varieties, irrigation cycles, and fertilizer recommendations.'}
          </p>
        </div>
      </div>

      {/* Crop Pills selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {cropsGuide.map((crop) => (
          <button
            key={crop.id}
            onClick={() => setSelectedCrop(crop)}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
              selectedCrop.id === crop.id
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80'
            }`}
          >
            <span>🌾</span>
            <span>{lang === 'hi' ? crop.nameHi : crop.nameEn}</span>
          </button>
        ))}
      </div>

      {/* Selected Crop Guide Details Card */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-6">
        {/* Top Info */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-2xl font-black text-slate-900">
                {lang === 'hi' ? selectedCrop.nameHi : selectedCrop.nameEn}
              </h3>
              <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-800">
                {selectedCrop.season}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-1">
              फसल अवधि: <span className="font-bold text-slate-700">{selectedCrop.duration}</span>
            </p>
          </div>

          <div className="bg-lime-50 border border-lime-200 px-4 py-2 rounded-2xl self-start sm:self-auto">
            <span className="text-[10px] text-lime-800 font-bold block uppercase tracking-wider">
              संभावित पैदावार
            </span>
            <span className="text-base font-black text-lime-900">
              {selectedCrop.expectedYieldHi}
            </span>
          </div>
        </div>

        {/* 4 Key Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Sowing Time */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold uppercase mb-1">
              <Calendar className="w-4 h-4 text-emerald-600" />
              <span>बुवाई का समय</span>
            </div>
            <p className="font-extrabold text-slate-800 text-sm">
              {lang === 'hi' ? selectedCrop.sowingTimeHi : selectedCrop.sowingTimeEn}
            </p>
          </div>

          {/* Seed Rate */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold uppercase mb-1">
              <Sprout className="w-4 h-4 text-lime-600" />
              <span>बीज दर (प्रति एकड़)</span>
            </div>
            <p className="font-extrabold text-slate-800 text-sm">
              {lang === 'hi' ? selectedCrop.seedRateHi : selectedCrop.seedRateEn}
            </p>
          </div>

          {/* Spacing */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold uppercase mb-1">
              <Clock className="w-4 h-4 text-blue-600" />
              <span>कतार से कतार दूरी</span>
            </div>
            <p className="font-extrabold text-slate-800 text-sm">
              {selectedCrop.spacing}
            </p>
          </div>

          {/* Sowing Duration */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold uppercase mb-1">
              <Award className="w-4 h-4 text-amber-600" />
              <span>अनुशंसित किस्में</span>
            </div>
            <p className="font-extrabold text-slate-800 text-xs truncate">
              {selectedCrop.bestVarieties.slice(0, 2).join(', ')}...
            </p>
          </div>
        </div>

        {/* Detailed Sections: Irrigation, Fertilizer, Varieties */}
        <div className="space-y-4">
          {/* Best Varieties list */}
          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100">
            <h4 className="font-bold text-emerald-950 text-sm mb-2 flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-600" />
              <span>शीर्ष उन्नत व प्रमाणित किस्में (Top Varieties):</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {selectedCrop.bestVarieties.map((v, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-white border border-emerald-200 text-emerald-900 font-bold text-xs rounded-xl shadow-2xs"
                >
                  ⭐ {v}
                </span>
              ))}
            </div>
          </div>

          {/* Irrigation Rounds */}
          <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100">
            <h4 className="font-bold text-blue-950 text-sm mb-1 flex items-center gap-2">
              <Droplets className="w-4 h-4 text-blue-600" />
              <span>सिंचाई प्रबंधन व क्रांतिक अवस्थाएं (Critical Irrigation Stages):</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              {lang === 'hi' ? selectedCrop.waterRoundsHi : selectedCrop.waterRoundsEn}
            </p>
          </div>

          {/* Fertilizer Dosage */}
          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-100">
            <h4 className="font-bold text-amber-950 text-sm mb-1 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-600" />
              <span>संतुलित उर्वरक अनुशंसा (Balanced Fertilizer):</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              {selectedCrop.fertilizerDoseHi}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
