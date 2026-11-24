import React, { useState } from 'react';
import { 
  Users, Search, Filter, ShieldCheck, UserCheck, 
  UserX, Download, Plus, MapPin, Phone, Eye, CheckCircle2, AlertCircle 
} from 'lucide-react';

export default function CustomerManager({ customers, setCustomers }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // New Customer Form
  const [newCust, setNewCust] = useState({
    name: '',
    phone: '',
    role: 'Farmer (किसान)',
    state: 'Uttar Pradesh',
    district: '',
    landArea: '5 Acres',
    primaryCrops: 'Wheat, Mustard',
    kycStatus: 'Verified'
  });

  const filteredCustomers = customers.filter(c => {
    const matchesSearch = 
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm) ||
      c.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.state.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = roleFilter === 'ALL' || c.role.includes(roleFilter);
    const matchesStatus = statusFilter === 'ALL' || c.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const toggleKyc = (id) => {
    setCustomers(customers.map(c => {
      if (c.id === id) {
        const newKyc = c.kycStatus === 'Verified' ? 'Pending' : 'Verified';
        return {
          ...c,
          kycStatus: newKyc,
          aadhaarVerified: newKyc === 'Verified'
        };
      }
      return c;
    }));
  };

  const toggleStatus = (id) => {
    setCustomers(customers.map(c => {
      if (c.id === id) {
        return {
          ...c,
          status: c.status === 'Active' ? 'Suspended' : 'Active'
        };
      }
      return c;
    }));
  };

  const handleExportCSV = () => {
    const headers = "ID,Name,Phone,Role,State,District,Land,KYC,Status\n";
    const rows = customers.map(c => 
      `"${c.id}","${c.name}","${c.phone}","${c.role}","${c.state}","${c.district}","${c.landArea}","${c.kycStatus}","${c.status}"`
    ).join("\n");
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `kisan_customers_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAddCustomer = (e) => {
    e.preventDefault();
    if (!newCust.name || !newCust.phone) return;

    const created = {
      id: 'CUST-' + (Math.floor(Math.random() * 9000) + 1000),
      name: newCust.name,
      phone: newCust.phone.startsWith('+91') ? newCust.phone : '+91 ' + newCust.phone,
      role: newCust.role,
      state: newCust.state,
      district: newCust.district || 'केंद्रीय जिला',
      landArea: newCust.landArea,
      primaryCrops: newCust.primaryCrops.split(',').map(s => s.trim()),
      kycStatus: newCust.kycStatus,
      aadhaarVerified: newCust.kycStatus === 'Verified',
      status: 'Active',
      registeredOn: new Date().toISOString().slice(0, 10),
      totalPurchasesOrSales: '₹0',
      activeAds: 0
    };

    setCustomers([created, ...customers]);
    setIsAddModalOpen(false);
    setNewCust({
      name: '',
      phone: '',
      role: 'Farmer (किसान)',
      state: 'Uttar Pradesh',
      district: '',
      landArea: '5 Acres',
      primaryCrops: 'Wheat, Mustard',
      kycStatus: 'Verified'
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Quick Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">कुल पंजीकृत किसान</span>
          <span className="text-2xl font-black text-slate-900 mt-1 block">{customers.length}</span>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">सत्यापित KYC</span>
          <span className="text-2xl font-black text-emerald-600 mt-1 block">
            {customers.filter(c => c.kycStatus === 'Verified').length}
          </span>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">लंबित सत्यापन</span>
          <span className="text-2xl font-black text-amber-600 mt-1 block">
            {customers.filter(c => c.kycStatus === 'Pending').length}
          </span>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">सक्रिय स्थिति</span>
          <span className="text-2xl font-black text-blue-600 mt-1 block">
            {customers.filter(c => c.status === 'Active').length}
          </span>
        </div>
      </div>

      {/* Search, Filter & Action Bar */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="flex flex-1 flex-col sm:flex-row gap-3 w-full">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="नाम, फोन, जिला या राज्य से खोजें..."
              className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm focus:bg-white focus:border-emerald-500 focus:outline-hidden"
            />
          </div>

          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-700 focus:outline-hidden cursor-pointer"
          >
            <option value="ALL">सभी भूमिकाएं (All Roles)</option>
            <option value="Farmer">Farmer (किसान)</option>
            <option value="Trader">Trader / Buyer (व्यापारी)</option>
            <option value="Expert">Agri Expert (वैज्ञानिक)</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-700 focus:outline-hidden cursor-pointer"
          >
            <option value="ALL">सभी स्थितियां (All Status)</option>
            <option value="Active">सक्रिय (Active)</option>
            <option value="Suspended">निलंबित (Suspended)</option>
          </select>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-2xl flex items-center gap-1.5 transition-all cursor-pointer"
            title="Download CSV"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">CSV निर्यात</span>
          </button>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold rounded-2xl flex items-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>नया किसान जोड़ें</span>
          </button>
        </div>
      </div>

      {/* Customers Table / Cards */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase text-[11px] tracking-wider">
                <th className="p-4">किसान / ग्राहक विवरण</th>
                <th className="p-4">भूमिका (Role)</th>
                <th className="p-4">स्थान व रकबा</th>
                <th className="p-4">KYC सत्यापन</th>
                <th className="p-4">खाता स्थिति</th>
                <th className="p-4 text-right">कार्रवाई (Actions)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCustomers.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/50 transition-colors">
                  {/* Name & Phone */}
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-base shrink-0">
                        👨‍🌾
                      </div>
                      <div>
                        <span className="font-extrabold text-slate-900 block">
                          {c.name}
                        </span>
                        <span className="text-xs text-slate-500 font-mono flex items-center gap-1 mt-0.5">
                          <Phone className="w-3 h-3 text-slate-400" />
                          {c.phone}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Role */}
                  <td className="p-4">
                    <span className="font-semibold text-slate-700">
                      {c.role}
                    </span>
                    <span className="text-[10px] text-slate-400 block font-mono">
                      आईडी: {c.id}
                    </span>
                  </td>

                  {/* Location & Land */}
                  <td className="p-4">
                    <span className="font-bold text-slate-800 block">
                      📍 {c.district}, {c.state}
                    </span>
                    <span className="text-xs text-emerald-700 font-medium block">
                      {c.landArea} • {Array.isArray(c.primaryCrops) ? c.primaryCrops.join(', ') : c.primaryCrops}
                    </span>
                  </td>

                  {/* KYC */}
                  <td className="p-4">
                    <button
                      onClick={() => toggleKyc(c.id)}
                      className={`px-3 py-1 rounded-full text-xs font-black inline-flex items-center gap-1 transition-all cursor-pointer ${
                        c.kycStatus === 'Verified'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : 'bg-amber-100 text-amber-800 border border-amber-200'
                      }`}
                    >
                      {c.kycStatus === 'Verified' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                      <span>{c.kycStatus === 'Verified' ? 'सत्यापित (Verified)' : 'लंबित (Pending)'}</span>
                    </button>
                  </td>

                  {/* Status */}
                  <td className="p-4">
                    <button
                      onClick={() => toggleStatus(c.id)}
                      className={`px-3 py-1 rounded-full text-xs font-black inline-flex items-center gap-1 transition-all cursor-pointer ${
                        c.status === 'Active'
                          ? 'bg-blue-100 text-blue-800 border border-blue-200'
                          : 'bg-rose-100 text-rose-800 border border-rose-200'
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full ${c.status === 'Active' ? 'bg-blue-600' : 'bg-rose-600'}`} />
                      <span>{c.status}</span>
                    </button>
                  </td>

                  {/* Action buttons */}
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setSelectedCustomer(c)}
                        className="p-2 hover:bg-slate-100 text-slate-600 rounded-xl transition-colors cursor-pointer"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Detail Drawer / Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-extrabold text-lg text-slate-800">
                किसान प्रोफाइल विवरण (Profile Details)
              </h3>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-400 font-bold">आईडी:</span>
                <span className="font-mono font-bold text-slate-800">{selectedCustomer.id}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-400 font-bold">नाम:</span>
                <span className="font-bold text-slate-800">{selectedCustomer.name}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-400 font-bold">मोबाइल:</span>
                <span className="font-bold text-slate-800">{selectedCustomer.phone}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-400 font-bold">भूमिका:</span>
                <span className="font-bold text-slate-800">{selectedCustomer.role}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-400 font-bold">स्थान:</span>
                <span className="font-bold text-slate-800">{selectedCustomer.district}, {selectedCustomer.state}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-400 font-bold">कुल कृषि भूमि:</span>
                <span className="font-bold text-emerald-700">{selectedCustomer.landArea}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-400 font-bold">मुख्य फसलें:</span>
                <span className="font-bold text-slate-800">
                  {Array.isArray(selectedCustomer.primaryCrops) ? selectedCustomer.primaryCrops.join(', ') : selectedCustomer.primaryCrops}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-400 font-bold">पंजीकरण तारीख:</span>
                <span className="font-bold text-slate-800">{selectedCustomer.registeredOn}</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedCustomer(null)}
                className="px-5 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl cursor-pointer"
              >
                बंद करें
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Customer Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <form
            onSubmit={handleAddCustomer}
            className="w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 space-y-4 animate-in fade-in duration-200"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-extrabold text-lg text-slate-800">
                नया किसान / ग्राहक जोड़ें (Add Customer)
              </h3>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">पूरा नाम</label>
                <input
                  type="text"
                  required
                  value={newCust.name}
                  onChange={(e) => setNewCust({ ...newCust, name: e.target.value })}
                  placeholder="सुरेश कुमार"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">मोबाइल नंबर</label>
                <input
                  type="tel"
                  required
                  value={newCust.phone}
                  onChange={(e) => setNewCust({ ...newCust, phone: e.target.value })}
                  placeholder="9876543210"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">भूमिका (Role)</label>
                <select
                  value={newCust.role}
                  onChange={(e) => setNewCust({ ...newCust, role: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-emerald-500"
                >
                  <option value="Farmer (किसान)">Farmer (किसान)</option>
                  <option value="Trader / Buyer (मंडी व्यापारी)">Trader / Buyer (मंडी व्यापारी)</option>
                  <option value="Agri Expert (कृषि वैज्ञानिक)">Agri Expert (कृषि वैज्ञानिक)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">राज्य</label>
                <select
                  value={newCust.state}
                  onChange={(e) => setNewCust({ ...newCust, state: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-emerald-500"
                >
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Haryana">Haryana</option>
                  <option value="Madhya Pradesh">Madhya Pradesh</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Bihar">Bihar</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">जिला (District)</label>
                <input
                  type="text"
                  value={newCust.district}
                  onChange={(e) => setNewCust({ ...newCust, district: e.target.value })}
                  placeholder="जैसे: मेरठ"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">कृषि भूमि (Land Area)</label>
                <input
                  type="text"
                  value={newCust.landArea}
                  onChange={(e) => setNewCust({ ...newCust, landArea: e.target.value })}
                  placeholder="जैसे: 10 Acres"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">मुख्य फसलें (कमा से अलग करें)</label>
              <input
                type="text"
                value={newCust.primaryCrops}
                onChange={(e) => setNewCust({ ...newCust, primaryCrops: e.target.value })}
                placeholder="Wheat, Mustard, Sugarcane"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-emerald-500"
              />
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 text-xs font-bold rounded-xl border border-slate-200 text-slate-600 cursor-pointer"
              >
                रद्द करें
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-extrabold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs cursor-pointer"
              >
                पंजीकृत करें
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
