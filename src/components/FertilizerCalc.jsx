import React, { useState } from 'react';
import { Calculator, Sparkles, Scale, Info, CheckCircle2, ChevronRight } from 'lucide-react';

const CROP_REQUIREMENTS = {
  wheat: {
    nameHi: "गेहूं (Wheat)",
    nameEn: "Wheat",
    ureaPerAcreKg: 110,
    dapPerAcreKg: 50,
    mopPerAcreKg: 20,
    zincPerAcreKg: 5,
    seedRateKg: 42,
    basalNoteHi: "बुवाई के समय: 100% डीएपी + 100% पोटाश + 1/3 यूरिया",
    basalNoteEn: "At Sowing: 100% DAP + 100% MOP + 1/3rd Urea",
    topDressingHi: "पहली सिंचाई पर 1/3 यूरिया, दूसरी सिंचाई पर शेष 1/3 यूरिया",
    topDressingEn: "1/3rd Urea at 1st irrigation (21 days), remaining 1/3rd at 2nd irrigation"
  },
  paddy: {
    nameHi: "धान / चावल (Paddy)",
    nameEn: "Paddy",
    ureaPerAcreKg: 95,
    dapPerAcreKg: 45,
    mopPerAcreKg: 25,
    zincPerAcreKg: 10,
    seedRateKg: 6,
    basalNoteHi: "रोपाई के समय: पूरी डीएपी, पोटाश व 1/3 यूरिया + जिंक",
    basalNoteEn: "At transplanting: Full DAP, Potash & 1/3rd Urea + Zinc",
    topDressingHi: "कल्ले फूटते समय 1/3 यूरिया और बाली निकलने से पहले 1/3 यूरिया",
    topDressingEn: "1/3rd Urea at active tillering & 1/3rd before panicle initiation"
  },
  mustard: {
    nameHi: "सरसों (Mustard)",
    nameEn: "Mustard",
    ureaPerAcreKg: 65,
    dapPerAcreKg: 35,
    mopPerAcreKg: 15,
    zincPerAcreKg: 4,
    seedRateKg: 1.8,
    basalNoteHi: "बुवाई के समय: पूरी डीएपी, पोटाश, सल्फर (10 किग्रा) व आधी यूरिया",
    basalNoteEn: "At sowing: Full DAP, Potash, Sulphur (10kg) and 1/2 Urea",
    topDressingHi: "पहली सिंचाई (फूल आने से पूर्व) पर शेष 50% यूरिया",
    topDressingEn: "Remaining 50% Urea at first irrigation (30-35 days)"
  },
  potato: {
    nameHi: "आलू (Potato)",
    nameEn: "Potato",
    ureaPerAcreKg: 130,
    dapPerAcreKg: 100,
    mopPerAcreKg: 60,
    zincPerAcreKg: 8,
    seedRateKg: 1100, // tubers
    basalNoteHi: "बुवाई के समय: पूरी डीएपी, पोटाश और आधी यूरिया मिट्टी में मिलाएं",
    basalNoteEn: "At planting: Full DAP, MOP and 50% Urea in soil",
    topDressingHi: "मिट्टी चढ़ाते समय (30-35 दिन पर) शेष यूरिया का छिड़काव",
    topDressingEn: "Remaining Urea during earthing-up (30-35 days)"
  },
  sugarcane: {
    nameHi: "गन्ना (Sugarcane)",
    nameEn: "Sugarcane",
    ureaPerAcreKg: 200,
    dapPerAcreKg: 75,
    mopPerAcreKg: 50,
    zincPerAcreKg: 10,
    seedRateKg: 3200, // setts
    basalNoteHi: "ट्रेंच बुवाई पर: 1/3 यूरिया + पूरा डीएपी + पूरा पोटाश",
    basalNoteEn: "At planting: 1/3rd Urea + Full DAP + Full MOP",
    topDressingHi: "मई और जून में पहली मानसूनी बारिश पर दो बार में यूरिया डालें",
    topDressingEn: "Apply remaining Urea in 2 splits before monsoon"
  }
};

export default function FertilizerCalc({ lang, t }) {
  const [area, setArea] = useState(2);
  const [unit, setUnit] = useState('acre'); // 'acre' | 'bigha' | 'hectare'
  const [cropKey, setCropKey] = useState('wheat');

  // Convert everything to acres for normalized math
  // 1 Acre = 5 Bigha (standard UP/Central India convention)
  // 1 Hectare = 2.471 Acres
  let normalizedAcres = area;
  if (unit === 'bigha') normalizedAcres = area / 5;
  if (unit === 'hectare') normalizedAcres = area * 2.471;

  const crop = CROP_REQUIREMENTS[cropKey];

  // Requirements in Kg
  const ureaKg = Math.round(crop.ureaPerAcreKg * normalizedAcres);
  const dapKg = Math.round(crop.dapPerAcreKg * normalizedAcres);
  const mopKg = Math.round(crop.mopPerAcreKg * normalizedAcres);
  const zincKg = Math.round(crop.zincPerAcreKg * normalizedAcres);
  const seedKg = (crop.seedRateKg * normalizedAcres).toFixed(1);

  // Bag counts (Urea = 45kg bag, DAP = 50kg bag, MOP = 50kg bag)
  const ureaBags = (ureaKg / 45).toFixed(1);
  const dapBags = (dapKg / 50).toFixed(1);
  const mopBags = (mopKg / 50).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-teal-700 via-emerald-700 to-lime-700 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🧮</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-['Yantramanav',sans-serif]">
              {t.calcTitle}
            </h2>
          </div>
          <p className="text-teal-100 text-sm mt-1 max-w-xl">
            {t.calcSubtitle}
          </p>
        </div>
      </div>

      {/* Input Form & Parameters */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Land Area */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              {t.landArea}
            </label>
            <input
              type="number"
              min="0.1"
              step="0.5"
              value={area}
              onChange={(e) => setArea(parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-base font-bold focus:outline-hidden focus:border-emerald-500"
            />
          </div>

          {/* Unit selector */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              {lang === 'hi' ? 'माप इकाई (Unit)' : 'Land Unit'}
            </label>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:outline-hidden focus:border-emerald-500 cursor-pointer"
            >
              <option value="acre">{t.unitAcre} (Acre)</option>
              <option value="bigha">{t.unitBigha} (Bigha - 1 एकड़ = 5 बीघा)</option>
              <option value="hectare">{t.unitHectare} (Hectare - 2.47 एकड़)</option>
            </select>
          </div>

          {/* Crop selector */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              {t.selectCrop}
            </label>
            <select
              value={cropKey}
              onChange={(e) => setCropKey(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:outline-hidden focus:border-emerald-500 cursor-pointer"
            >
              {Object.keys(CROP_REQUIREMENTS).map((k) => (
                <option key={k} value={k}>
                  {lang === 'hi' ? CROP_REQUIREMENTS[k].nameHi : CROP_REQUIREMENTS[k].nameEn}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Display */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Urea */}
        <div className="bg-gradient-to-br from-emerald-50 to-white rounded-3xl p-5 border border-emerald-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
              {t.ureaReq}
            </span>
            <span className="text-xs font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
              46% N
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-1">
            <span className="text-3xl font-black text-slate-900">{ureaKg}</span>
            <span className="text-xs font-bold text-slate-500">किग्रा</span>
          </div>
          <p className="text-xs text-emerald-700 font-bold mt-1">
            लगभग {ureaBags} बोरी (45 kg बैग)
          </p>
        </div>

        {/* DAP */}
        <div className="bg-gradient-to-br from-blue-50 to-white rounded-3xl p-5 border border-blue-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-blue-800 uppercase tracking-wider">
              {t.dapReq}
            </span>
            <span className="text-xs font-mono bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-bold">
              18:46:0
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-1">
            <span className="text-3xl font-black text-slate-900">{dapKg}</span>
            <span className="text-xs font-bold text-slate-500">किग्रा</span>
          </div>
          <p className="text-xs text-blue-700 font-bold mt-1">
            लगभग {dapBags} बोरी (50 kg बैग)
          </p>
        </div>

        {/* MOP (Potash) */}
        <div className="bg-gradient-to-br from-amber-50 to-white rounded-3xl p-5 border border-amber-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
              {t.mopReq}
            </span>
            <span className="text-xs font-mono bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold">
              60% K₂O
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-1">
            <span className="text-3xl font-black text-slate-900">{mopKg}</span>
            <span className="text-xs font-bold text-slate-500">किग्रा</span>
          </div>
          <p className="text-xs text-amber-700 font-bold mt-1">
            लगभग {mopBags} बोरी (50 kg बैग)
          </p>
        </div>

        {/* Seed Recommendation */}
        <div className="bg-gradient-to-br from-lime-50 to-white rounded-3xl p-5 border border-lime-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-lime-800 uppercase tracking-wider">
              {t.seedReq}
            </span>
            <span className="text-lg">🌾</span>
          </div>
          <div className="mt-3 flex items-baseline gap-1">
            <span className="text-3xl font-black text-slate-900">{seedKg}</span>
            <span className="text-xs font-bold text-slate-500">
              {cropKey === 'potato' || cropKey === 'sugarcane' ? 'यूनिट/टुकड़े' : 'किग्रा'}
            </span>
          </div>
          <p className="text-xs text-lime-800 font-bold mt-1">
            {cropKey === 'potato' ? 'कंद (Tubers)' : 'प्रमाणित बीज (Certified Seed)'}
          </p>
        </div>
      </div>

      {/* Application Instructions / How to Apply */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <h4 className="font-extrabold text-slate-800 text-base flex items-center gap-2">
          <Info className="w-5 h-5 text-emerald-600" />
          <span>{lang === 'hi' ? 'खाद डालने का सही समय व तरीका' : 'Application Schedule & Split Dosage'}</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="font-bold text-slate-900 block mb-1">
              🌱 {lang === 'hi' ? 'बुवाई के समय (Basal Dose):' : 'At Sowing (Basal):'}
            </span>
            <p className="text-slate-600 leading-relaxed font-medium">
              {lang === 'hi' ? crop.basalNoteHi : crop.basalNoteEn}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="font-bold text-slate-900 block mb-1">
              💧 {lang === 'hi' ? 'सिंचाई के समय (Top Dressing):' : 'At Irrigation (Top Dressing):'}
            </span>
            <p className="text-slate-600 leading-relaxed font-medium">
              {lang === 'hi' ? crop.topDressingHi : crop.topDressingEn}
            </p>
          </div>
        </div>

        <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
          <span>
            {lang === 'hi'
              ? 'सुझाव: मिट्टी परीक्षण (Soil Health Card) के अनुसार ही सूक्ष्म पोषक तत्वों जैसे जिंक व सल्फर का प्रयोग करें।'
              : 'Tip: Always calibrate secondary micronutrients (Zinc, Sulphur) based on Soil Health Card report.'}
          </span>
        </div>
      </div>
    </div>
  );
}
