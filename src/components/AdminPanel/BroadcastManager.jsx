import React, { useState } from 'react';
import { Send, Bell, AlertTriangle, Info, CheckCircle2, Trash2 } from 'lucide-react';
import { INITIAL_BROADCASTS } from '../../data/adminData';

export default function BroadcastManager() {
  const [broadcasts, setBroadcasts] = useState(INITIAL_BROADCASTS);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('warning');
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleSendBroadcast = (e) => {
    e.preventDefault();
    if (!title || !message) return;

    const newBc = {
      id: 'bc-' + Date.now(),
      title,
      message,
      severity,
      timestamp: 'अभी-अभी (Just now)',
      sentTo: 'समस्त किसान भाई (All Farmers)',
      active: true
    };

    setBroadcasts([newBc, ...broadcasts]);
    setTitle('');
    setMessage('');
    setSentSuccess(true);
    setTimeout(() => setSentSuccess(false), 3000);
  };

  const handleDelete = (id) => {
    setBroadcasts(broadcasts.filter(b => b.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="text-2xl">📢</span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            सामूहिक किसान प्रसारण (Emergency Broadcast & Alert Center)
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
          मौसम आपदा, अचानक ओलावृष्टि, टिड्डी प्रकोप या नई सरकारी योजना की सूचना तत्काल सभी किसानों के ऐप पर भेजें।
        </p>
      </div>

      {/* Broadcast Composer */}
      <form onSubmit={handleSendBroadcast} className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
          <Bell className="w-5 h-5 text-amber-600" />
          <span>नया सामूहिक अलर्ट भेजें</span>
        </h3>

        {sentSuccess && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-2xl text-xs font-bold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>अलर्ट सफलतापूर्वक सभी पंजीकृत किसानों के होम स्क्रीन पर प्रसारित कर दिया गया है!</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="sm:col-span-2">
            <label className="text-xs font-bold text-slate-700 block mb-1">अलर्ट शीर्षक (Title)</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="जैसे: ओलावृष्टि व भारी बारिश की चेतावनी..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">चेतावनी स्तर (Severity)</label>
            <select
              value={severity}
              onChange={(e) => setSeverity(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-hidden focus:border-emerald-500 cursor-pointer"
            >
              <option value="warning">⚠️ चेतावनी (Warning - High)</option>
              <option value="danger">🚨 आपातकालीन (Emergency - Critical)</option>
              <option value="info">ℹ️ सामान्य सूचना (Information)</option>
            </select>
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">विस्तृत संदेश (Broadcast Message)</label>
          <textarea
            rows={3}
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="किसान भाइयों को दी जाने वाली विस्तृत सलाह या चेतावनी लिखें..."
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-emerald-500 resize-none"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-xs transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>लाइव प्रसारित करें (Broadcast Alert)</span>
          </button>
        </div>
      </form>

      {/* Broadcast History */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <h3 className="font-extrabold text-slate-900 text-base">
          हालिया प्रसारित अलर्ट्स (Broadcast History)
        </h3>

        <div className="space-y-3">
          {broadcasts.map((bc) => (
            <div
              key={bc.id}
              className={`p-4 rounded-2xl border flex items-start justify-between gap-4 ${
                bc.severity === 'danger'
                  ? 'bg-rose-50 border-rose-200'
                  : bc.severity === 'warning'
                  ? 'bg-amber-50 border-amber-200'
                  : 'bg-blue-50 border-blue-200'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-slate-900 text-sm sm:text-base">
                    {bc.title}
                  </span>
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-white/80 border border-slate-200">
                    {bc.sentTo}
                  </span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {bc.message}
                </p>
                <span className="text-[10px] text-slate-400 font-mono block">
                  {bc.timestamp}
                </span>
              </div>

              <button
                onClick={() => handleDelete(bc.id)}
                className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-white transition-colors cursor-pointer shrink-0"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
