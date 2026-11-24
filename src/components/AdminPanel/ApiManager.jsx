import React, { useState } from 'react';
import { 
  Plus, Key, Globe, Zap, CheckCircle2, XCircle, 
  Trash2, RefreshCw, Eye, EyeOff, ShieldCheck, Activity, Copy, Check
} from 'lucide-react';

export default function ApiManager({ apis, setApis }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [testingId, setTestingId] = useState(null);
  const [showKeys, setShowKeys] = useState({});
  const [copiedId, setCopiedId] = useState(null);

  // New API Form State
  const [form, setForm] = useState({
    name: '',
    provider: '',
    endpoint: '',
    apiKey: '',
    type: 'Custom API',
    method: 'GET',
    rateLimit: '1,000 req/day',
    description: ''
  });

  const toggleApiStatus = (id) => {
    setApis(apis.map(api => {
      if (api.id === id) {
        return {
          ...api,
          status: api.status === 'active' ? 'inactive' : 'active'
        };
      }
      return api;
    }));
  };

  const handleTestPing = (id) => {
    setTestingId(id);
    setTimeout(() => {
      setApis(apis.map(api => {
        if (api.id === id) {
          return {
            ...api,
            lastPing: `Live Ping: 200 OK (${Math.floor(Math.random() * 40 + 20)}ms latency)`,
            status: 'active'
          };
        }
        return api;
      }));
      setTestingId(null);
    }, 800);
  };

  const handleDelete = (id) => {
    if (confirm('क्या आप इस एपीआई कॉन्फ़िगरेशन को हटाना चाहते हैं?')) {
      setApis(apis.filter(a => a.id !== id));
    }
  };

  const handleCopyEndpoint = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleAddApi = (e) => {
    e.preventDefault();
    if (!form.name || !form.endpoint) return;

    const newApi = {
      id: 'api-' + Date.now(),
      name: form.name,
      provider: form.provider || 'Custom Provider',
      endpoint: form.endpoint,
      apiKey: form.apiKey || 'N/A',
      type: form.type,
      status: 'active',
      method: form.method,
      rateLimit: form.rateLimit,
      lastPing: 'Connected (200 OK)',
      description: form.description || 'Admin connected external API integration.'
    };

    setApis([newApi, ...apis]);
    setIsModalOpen(false);
    setForm({
      name: '',
      provider: '',
      endpoint: '',
      apiKey: '',
      type: 'Custom API',
      method: 'GET',
      rateLimit: '1,000 req/day',
      description: ''
    });
  };

  return (
    <div className="space-y-6">
      {/* Title & Actions Bar */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🔌</span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              एपीआई एकीकरण एवं प्रबंधन (API Management Hub)
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            मौसम, मंडी डेटा, एआई मॉडल, एसएमएस गेटवे एवं कस्टम वेबहुक एपीआई को एक ही स्थान से जोड़ें और मॉनिटर करें।
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm rounded-2xl flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95 cursor-pointer shrink-0"
        >
          <Plus className="w-5 h-5" />
          <span>नई API जोड़ें (Add API)</span>
        </button>
      </div>

      {/* Connected APIs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {apis.map((api) => {
          const isKeyVisible = showKeys[api.id];
          const isActive = api.status === 'active';

          return (
            <div
              key={api.id}
              className={`bg-white rounded-3xl p-5 border transition-all shadow-xs hover:shadow-md flex flex-col justify-between ${
                isActive ? 'border-slate-200/80' : 'border-rose-200 bg-rose-50/20'
              }`}
            >
              <div className="space-y-3">
                {/* Header row */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-slate-900 text-base">
                        {api.name}
                      </span>
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                        {api.type}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      प्रदाता: <span className="font-bold text-slate-700">{api.provider}</span>
                    </p>
                  </div>

                  {/* Status Toggle Switch */}
                  <button
                    onClick={() => toggleApiStatus(api.id)}
                    className={`px-3 py-1 rounded-full text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ${
                      isActive 
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                        : 'bg-rose-100 text-rose-800 border border-rose-200'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-emerald-600 animate-pulse' : 'bg-rose-600'}`} />
                    <span>{isActive ? 'ACTIVE' : 'PAUSED'}</span>
                  </button>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  {api.description}
                </p>

                {/* Endpoint */}
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs font-mono">
                  <span className="truncate pr-2 text-slate-700 font-semibold select-all">
                    <span className="text-[10px] bg-slate-200 text-slate-800 font-bold px-1.5 py-0.5 rounded mr-1.5">
                      {api.method}
                    </span>
                    {api.endpoint}
                  </span>
                  <button
                    onClick={() => handleCopyEndpoint(api.id, api.endpoint)}
                    className="p-1 hover:bg-slate-200 text-slate-500 rounded transition-colors cursor-pointer shrink-0"
                    title="Copy URL"
                  >
                    {copiedId === api.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* API Key Box */}
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2 truncate pr-2">
                    <Key className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span className="text-slate-700 font-semibold truncate">
                      {isKeyVisible ? api.apiKey : '••••••••••••••••••••••••••••'}
                    </span>
                  </div>
                  <button
                    onClick={() => setShowKeys({ ...showKeys, [api.id]: !isKeyVisible })}
                    className="p-1 hover:bg-slate-200 text-slate-500 rounded transition-colors cursor-pointer shrink-0"
                  >
                    {isKeyVisible ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Metrics */}
                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                  <span>दर सीमा: <strong className="text-slate-700">{api.rateLimit}</strong></span>
                  <span className="flex items-center gap-1 text-emerald-700 font-bold">
                    <Activity className="w-3.5 h-3.5" />
                    <span>{api.lastPing}</span>
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => handleTestPing(api.id)}
                  disabled={testingId === api.id}
                  className="px-3.5 py-1.5 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${testingId === api.id ? 'animate-spin' : ''}`} />
                  <span>{testingId === api.id ? 'जांच हो रही है...' : 'कनेक्शन टेस्ट (Ping API)'}</span>
                </button>

                <button
                  onClick={() => handleDelete(api.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                  title="Delete API"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add API Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <form
            onSubmit={handleAddApi}
            className="w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto space-y-4 animate-in fade-in duration-200"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-extrabold text-lg text-slate-800">
                नई एपीआई जोड़ें (Integrate New API)
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
                एपीआई का नाम (API Name)
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="जैसे: OpenWeatherMap Pro, Agri Data Hub..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  प्रदाता / सेवा (Provider)
                </label>
                <input
                  type="text"
                  value={form.provider}
                  onChange={(e) => setForm({ ...form, provider: e.target.value })}
                  placeholder="जैसे: Google, Twilio, ICAR..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  प्रकार (Category)
                </label>
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-emerald-500"
                >
                  <option value="Weather">Weather (मौसम)</option>
                  <option value="Mandi Rates">Mandi Rates (मंडी भाव)</option>
                  <option value="AI Diagnosis">AI Diagnosis (फसल डॉक्टर)</option>
                  <option value="Messaging">Messaging / SMS / WhatsApp</option>
                  <option value="Payments">Payments (भुगतान)</option>
                  <option value="Custom API">Custom REST API</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                एंडपॉइंट यूआरएल (Endpoint URL)
              </label>
              <input
                type="url"
                required
                value={form.endpoint}
                onChange={(e) => setForm({ ...form, endpoint: e.target.value })}
                placeholder="https://api.example.com/v1/resource"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono focus:outline-hidden focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  एपीआई की (API Key / Auth Token)
                </label>
                <input
                  type="text"
                  value={form.apiKey}
                  onChange={(e) => setForm({ ...form, apiKey: e.target.value })}
                  placeholder="Bearer token या API_KEY..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono focus:outline-hidden focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  HTTP Method
                </label>
                <select
                  value={form.method}
                  onChange={(e) => setForm({ ...form, method: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-emerald-500"
                >
                  <option value="GET">GET</option>
                  <option value="POST">POST</option>
                  <option value="PUT">PUT</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                विवरण (Description)
              </label>
              <input
                type="text"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="इस API का उपयोग किस सुविधा में होगा..."
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
                सहेजें और कनेक्ट करें
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
