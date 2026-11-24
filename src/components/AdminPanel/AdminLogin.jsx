import React, { useState } from 'react';
import { Lock, KeyRound, ShieldAlert, CheckCircle, ArrowLeft, Eye, EyeOff } from 'lucide-react';

export default function AdminLogin({ onLoginSuccess, onCancel }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [showPin, setShowPin] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Default PIN: 1234 or admin
    if (pin === '1234' || pin === 'admin' || pin === 'kisan2026') {
      setError('');
      onLoginSuccess();
    } else {
      setError('अमान्य पिन (Invalid PIN)! कृपया सही एडमिन पिन दर्ज करें। (डिफ़ॉल्ट पिन: 1234)');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
        {/* Top Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 p-6 text-white text-center relative">
          <button
            onClick={onCancel}
            className="absolute left-4 top-4 p-2 text-slate-300 hover:text-white rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
            title="Back to Farmer App"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <div className="w-16 h-16 mx-auto rounded-3xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-3xl mb-3 border border-emerald-400/30 shadow-lg">
            🔐
          </div>
          <h2 className="text-xl font-black tracking-tight">
            कृषि साथी एडमिन पोर्टल
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            सुरक्षित एडमिनिस्ट्रेटर प्रमाणीकरण (Admin Authentication)
          </p>
        </div>

        {/* PIN Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              एडमिन सुरक्षा पिन / पासवर्ड दर्ज करें:
            </label>
            <div className="relative">
              <KeyRound className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPin ? "text" : "password"}
                autoFocus
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  setError('');
                }}
                placeholder="पिन दर्ज करें (डिफ़ॉल्ट: 1234)"
                className="w-full pl-11 pr-11 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-base font-bold tracking-widest focus:bg-white focus:border-emerald-500 focus:outline-hidden transition-all text-slate-900"
              />
              <button
                type="button"
                onClick={() => setShowPin(!showPin)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                {showPin ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {error && (
              <p className="text-xs text-rose-600 font-bold mt-2 flex items-center gap-1.5 animate-shake">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </p>
            )}
          </div>

          <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-2xl p-3 text-xs text-emerald-900 flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              <strong>त्वरित परीक्षण हेतु:</strong> डिफ़ॉल्ट पिन <code>1234</code> का उपयोग करें।
            </span>
          </div>

          <div className="pt-2 flex gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-bold rounded-2xl transition-all cursor-pointer"
            >
              रद्द करें
            </button>
            <button
              type="submit"
              className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-black rounded-2xl shadow-md shadow-emerald-600/30 transition-all cursor-pointer active:scale-95"
            >
              लॉगिन करें →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
