import React, { useState } from 'react';
import { 
  LayoutDashboard, Users, Plug, TrendingUp, Bell, 
  ArrowLeft, Shield, Sparkles, Activity, Server, Database, Globe 
} from 'lucide-react';
import ApiManager from './ApiManager';
import CustomerManager from './CustomerManager';
import MandiManager from './MandiManager';
import BroadcastManager from './BroadcastManager';

export default function AdminDashboard({ 
  apis, 
  setApis, 
  customers, 
  setCustomers, 
  onExitAdmin 
}) {
  const [adminTab, setAdminTab] = useState('apis'); // 'apis' | 'customers' | 'mandi' | 'broadcast'

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans pb-16 text-slate-800">
      {/* Admin Top Navbar */}
      <header className="sticky top-0 z-40 bg-slate-900 text-white border-b border-slate-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-emerald-600 flex items-center justify-center text-xl shadow-md">
                👑
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-lg sm:text-xl tracking-tight">
                    कृषि साथी एडमिन कंसोल (Admin Console)
                  </span>
                  <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full">
                    सुपर एडमिन
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 -mt-0.5 hidden sm:block">
                  एपीआई गेटवे, किसान ग्राहक प्रबंधन एवं मंडी भाव नियंत्रण केंद्र
                </p>
              </div>
            </div>

            {/* Switch back to Farmer mode */}
            <button
              onClick={onExitAdmin}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold shadow-sm transition-all active:scale-95 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>किसान ऐप पर लौटें (Farmer View)</span>
            </button>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="bg-slate-950/80 border-t border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-2 overflow-x-auto py-2 scrollbar-none">
              <button
                onClick={() => setAdminTab('apis')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all cursor-pointer ${
                  adminTab === 'apis'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Plug className="w-4 h-4" />
                <span>एपीआई प्रबंधन (API Integrations - {apis.length})</span>
              </button>

              <button
                onClick={() => setAdminTab('customers')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all cursor-pointer ${
                  adminTab === 'customers'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>किसान व ग्राहक प्रबंधन ({customers.length})</span>
              </button>

              <button
                onClick={() => setAdminTab('mandi')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all cursor-pointer ${
                  adminTab === 'mandi'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <TrendingUp className="w-4 h-4" />
                <span>मंडी भाव संपादक (Mandi Rates)</span>
              </button>

              <button
                onClick={() => setAdminTab('broadcast')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all cursor-pointer ${
                  adminTab === 'broadcast'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Bell className="w-4 h-4" />
                <span>सामूहिक प्रसारण (Alerts)</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Admin Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {adminTab === 'apis' && <ApiManager apis={apis} setApis={setApis} />}
        {adminTab === 'customers' && <CustomerManager customers={customers} setCustomers={setCustomers} />}
        {adminTab === 'mandi' && <MandiManager />}
        {adminTab === 'broadcast' && <BroadcastManager />}
      </main>
    </div>
  );
}
