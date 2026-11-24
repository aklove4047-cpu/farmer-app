import React, { useState } from 'react';
import { 
  Camera, Upload, Sparkles, AlertCircle, CheckCircle2, 
  Volume2, ShieldCheck, Sprout, Bug, FlaskConical, History
} from 'lucide-react';
import { diseasesData } from '../data/diseasesData';
import { speakText } from '../utils/speech';

export default function CropDoctor({ lang, t }) {
  const [selectedDisease, setSelectedDisease] = useState(diseasesData[0]);
  const [analyzing, setAnalyzing] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [activeTab, setActiveTab] = useState('organic'); // 'organic' | 'chemical' | 'prevention'

  const handleSelectSample = (disease) => {
    setAnalyzing(true);
    setUploadedImage(null);
    setTimeout(() => {
      setSelectedDisease(disease);
      setAnalyzing(false);
    }, 700);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUploadedImage(url);
      setAnalyzing(true);
      // Simulate AI recognition based on file
      setTimeout(() => {
        // Randomly pick one or tomato blight
        const detected = diseasesData[Math.floor(Math.random() * diseasesData.length)];
        setSelectedDisease(detected);
        setAnalyzing(false);
      }, 1000);
    }
  };

  const handleReadDiagnosis = () => {
    if (!selectedDisease) return;
    const name = lang === 'hi' ? selectedDisease.diseaseNameHi : selectedDisease.diseaseNameEn;
    const treatment = lang === 'hi'
      ? `रोग का नाम है: ${name}। जैविक उपचार: ${selectedDisease.organicHi}। रासायनिक उपचार: ${selectedDisease.chemicalHi}`
      : `Identified Disease: ${name}. Organic Solution: ${selectedDisease.organicEn}. Chemical Solution: ${selectedDisease.chemicalEn}`;
    
    speakText(treatment, lang);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-green-700 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-3xl">🩺</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-['Yantramanav',sans-serif]">
                {t.doctorTitle}
              </h2>
            </div>
            <p className="text-emerald-100 text-sm mt-1 max-w-xl">
              {t.doctorSubtitle}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReadDiagnosis}
              className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-900 font-extrabold text-xs sm:text-sm rounded-xl flex items-center gap-2 shadow-sm transition-all active:scale-95 cursor-pointer"
            >
              <Volume2 className="w-4 h-4" />
              <span>{t.listenAudio}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Upload & Sample Selector Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Upload box & sample badges */}
        <div className="lg:col-span-5 space-y-4">
          {/* Upload card */}
          <div className="bg-white rounded-3xl p-6 border-2 border-dashed border-emerald-300 hover:border-emerald-500 transition-all text-center flex flex-col items-center justify-center relative group cursor-pointer shadow-xs">
            <input
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleFileUpload}
              className="absolute inset-0 opacity-0 cursor-pointer z-20"
            />
            <div className="w-16 h-16 rounded-full bg-emerald-50 group-hover:bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3 transition-colors">
              <Camera className="w-8 h-8" />
            </div>
            <h4 className="font-bold text-slate-800 text-base">
              {t.uploadPrompt}
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              {lang === 'hi' ? 'कैमरे से फोटो खींचें या गैलरी से चुनें' : 'Take photo or choose from gallery'}
            </p>
            <div className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-xs">
              <Upload className="w-4 h-4" />
              <span>{lang === 'hi' ? 'फोटो अपलोड करें' : 'Upload Image'}</span>
            </div>
          </div>

          {/* Quick Sample Selector */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs">
            <h5 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-3">
              {t.selectSample}
            </h5>
            <div className="space-y-2">
              {diseasesData.map((d) => (
                <button
                  key={d.id}
                  onClick={() => handleSelectSample(d)}
                  className={`w-full text-left p-3 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                    selectedDisease?.id === d.id && !uploadedImage
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold shadow-xs'
                      : 'border-slate-100 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <img 
                      src={d.image} 
                      alt={d.crop} 
                      className="w-10 h-10 rounded-xl object-cover border border-slate-200" 
                    />
                    <div>
                      <span className="text-sm block font-bold">
                        {lang === 'hi' ? d.diseaseNameHi : d.diseaseNameEn}
                      </span>
                      <span className="text-[11px] text-slate-500 block">
                        {d.crop}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-600">
                    {d.confidence}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: AI Diagnosis Results Display */}
        <div className="lg:col-span-7">
          {analyzing ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-xs flex flex-col items-center justify-center min-h-[400px]">
              <div className="relative w-20 h-20 mb-4">
                <div className="absolute inset-0 rounded-full border-4 border-emerald-200 animate-ping" />
                <div className="w-20 h-20 rounded-full bg-emerald-600 text-white flex items-center justify-center text-3xl shadow-lg">
                  🔬
                </div>
              </div>
              <h4 className="text-lg font-bold text-slate-800">
                {t.analyzing}
              </h4>
              <p className="text-xs text-slate-500 mt-1 max-w-sm">
                {lang === 'hi' 
                  ? 'पत्ती के क्लोरोफिल, फंगल बीजाणु और कीट क्षति का विश्लेषण किया जा रहा है...' 
                  : 'Analyzing leaf tissue, spore patterns and fungal lesions...'}
              </p>
            </div>
          ) : selectedDisease ? (
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-5">
              {/* Report Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <img
                    src={uploadedImage || selectedDisease.image}
                    alt="Leaf"
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-500 shadow-xs"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        {selectedDisease.crop}
                      </span>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800">
                        {selectedDisease.severity}
                      </span>
                    </div>
                    <h3 className="text-xl font-extrabold text-slate-900 mt-1">
                      {lang === 'hi' ? selectedDisease.diseaseNameHi : selectedDisease.diseaseNameEn}
                    </h3>
                    <p className="text-xs text-slate-500 font-mono">
                      रोगाणु: {selectedDisease.pathogen}
                    </p>
                  </div>
                </div>

                <div className="bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-2xl text-center self-end sm:self-auto">
                  <span className="text-[10px] text-emerald-700 block font-semibold">{t.confidence}</span>
                  <span className="text-lg font-black text-emerald-800">{selectedDisease.confidence}</span>
                </div>
              </div>

              {/* Symptoms Box */}
              <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-sm mb-1">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  <span>{t.symptoms}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {lang === 'hi' ? selectedDisease.symptomsHi : selectedDisease.symptomsEn}
                </p>
              </div>

              {/* Treatment Tabs */}
              <div>
                <div className="flex rounded-2xl bg-slate-100 p-1 mb-4">
                  <button
                    onClick={() => setActiveTab('organic')}
                    className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      activeTab === 'organic'
                        ? 'bg-white text-emerald-800 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Sprout className="w-4 h-4 text-emerald-600" />
                    <span>{lang === 'hi' ? 'जैविक व देशी उपचार' : 'Organic Remedy'}</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('chemical')}
                    className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      activeTab === 'chemical'
                        ? 'bg-white text-blue-800 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <FlaskConical className="w-4 h-4 text-blue-600" />
                    <span>{lang === 'hi' ? 'रासायनिक दवा (दवा व खुराक)' : 'Chemical Remedy'}</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('prevention')}
                    className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      activeTab === 'prevention'
                        ? 'bg-white text-purple-800 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4 text-purple-600" />
                    <span>{lang === 'hi' ? 'रोकथाम सलाह' : 'Prevention'}</span>
                  </button>
                </div>

                {/* Tab content */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                  {activeTab === 'organic' && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>{t.organicSolution}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                        {lang === 'hi' ? selectedDisease.organicHi : selectedDisease.organicEn}
                      </p>
                      <p className="text-[11px] text-emerald-700 bg-emerald-100/60 p-2 rounded-xl mt-2">
                        🌱 जैविक उपचार मिट्टी की उर्वरता बनाए रखते हैं और मित्र कीटों को नुकसान नहीं पहुंचाते।
                      </p>
                    </div>
                  )}

                  {activeTab === 'chemical' && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-blue-800 font-bold text-sm">
                        <FlaskConical className="w-4 h-4 text-blue-600" />
                        <span>{t.chemicalSolution}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                        {lang === 'hi' ? selectedDisease.chemicalHi : selectedDisease.chemicalEn}
                      </p>
                      <p className="text-[11px] text-blue-700 bg-blue-100/60 p-2 rounded-xl mt-2">
                        ⚠️ हमेशा अनुशंसित मात्रा में ही दवा का उपयोग करें एवं मास्क और दस्ताने पहनें।
                      </p>
                    </div>
                  )}

                  {activeTab === 'prevention' && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-purple-800 font-bold text-sm">
                        <ShieldCheck className="w-4 h-4 text-purple-600" />
                        <span>{t.prevention}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                        {lang === 'hi' ? selectedDisease.preventionHi : selectedDisease.preventionEn}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
