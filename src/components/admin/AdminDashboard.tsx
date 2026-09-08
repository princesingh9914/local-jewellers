import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Store, 
  Plus, 
  Trash2, 
  Power, 
  Eye, 
  PhoneCall, 
  MessageCircle, 
  CheckCircle2, 
  XCircle, 
  ExternalLink, 
  Sparkles, 
  Users, 
  Package, 
  Layers,
  ArrowLeft,
  RotateCcw
} from 'lucide-react';
import { Vendor, AppView } from '../../types';
import { storageService } from '../../services/storage';

interface AdminDashboardProps {
  onNavigate: (view: AppView) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate }) => {
  const [vendors, setVendors] = useState<Vendor[]>(storageService.getVendors());
  const [showAddModal, setShowAddModal] = useState(false);

  // Ensure current session is authenticated as master admin
  React.useEffect(() => {
    storageService.setMasterAdmin(true);
  }, []);
  
  // New vendor form state
  const [name, setName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [plan, setPlan] = useState<Vendor['plan']>('Gold VIP');

  const refreshVendors = () => {
    setVendors(storageService.getVendors());
  };

  const handleToggleStatus = (vendorId: string) => {
    storageService.toggleVendorStatus(vendorId);
    refreshVendors();
  };

  const handleDelete = (vendorId: string, vendorName: string) => {
    if (confirm(`Are you sure you want to delete "${vendorName}" store from the platform?`)) {
      storageService.deleteVendor(vendorId);
      refreshVendors();
    }
  };

  const handlePlanChange = (vendor: Vendor, newPlan: Vendor['plan']) => {
    storageService.saveVendor({ ...vendor, plan: newPlan });
    refreshVendors();
  };

  const handleAddVendor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const newVendor: Vendor = {
      id: `vendor_${Date.now()}`,
      name: name.trim(),
      slug: slug || `jeweller-${Date.now()}`,
      ownerName: ownerName.trim() || 'Jeweller Owner',
      phone: phone.trim(),
      whatsapp: (whatsapp.trim() || phone.trim()).replace(/\D/g, ''),
      email: `${slug}@jwellersname.com`,
      city: city.trim() || 'Jaipur',
      state: state.trim() || 'Rajasthan',
      address: `${city.trim() || 'Jewellers Market'}, India`,
      logo: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=200&auto=format&fit=crop&q=80',
      banner: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1200&auto=format&fit=crop&q=80',
      tagline: 'Exclusive 22K/18K Hallmark Jewellery Showroom',
      themeColor: '#720917',
      isActive: true,
      isVerified: true,
      plan,
      createdAt: new Date().toISOString().split('T')[0],
      aboutText: 'Trusted family jewellers offering pure hallmark certified jewellery.',
      hallmarkCertified: true,
      upiId: `${slug}@upi`,
    };

    storageService.saveVendor(newVendor);
    setShowAddModal(false);
    setName('');
    setOwnerName('');
    setPhone('');
    setWhatsapp('');
    setCity('');
    setState('');
    refreshVendors();
  };

  const handleResetData = () => {
    if (confirm('Are you sure you want to reset all sample stores and products?')) {
      storageService.resetToDefault();
      refreshVendors();
    }
  };

  // Aggregated Stats
  const activeVendorsCount = vendors.filter((v) => v.isActive).length;
  const allOrders = storageService.getAllOrders();

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-24">
      
      {/* Admin Top Banner */}
      <div className="bg-[#2A0E13] text-white py-3 px-4 sm:px-6 lg:px-8 border-b-2 border-[#D4AF37]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate({ type: 'landing' })}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-[#E5C158] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#E5C158]" />
              <span className="font-bold text-sm sm:text-base font-royal">
                Master Admin Control Room (Owner: Rahul &bull; 7087033009)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleResetData}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-[#CBB99E] text-xs font-semibold transition-colors"
              title="Reset sample stores & products"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset Demo Data</span>
            </button>

            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#D4AF37] hover:bg-[#E5C158] text-[#2A0E13] text-xs font-bold transition-all shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Jeweller</span>
            </button>
          </div>
        </div>
      </div>

      {/* Admin Stats Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-[#E8DFC8] shadow-xs space-y-1">
            <div className="flex items-center justify-between text-[#7A6855] text-xs font-medium">
              <span>Registered Jewellers</span>
              <Store className="w-4 h-4 text-[#B8860B]" />
            </div>
            <div className="text-2xl font-bold font-cinzel text-[#2A1810]">
              {vendors.length}
            </div>
            <div className="text-[11px] text-[#1B6D3E] font-semibold">
              {activeVendorsCount} Active Showrooms
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E8DFC8] shadow-xs space-y-1">
            <div className="flex items-center justify-between text-[#7A6855] text-xs font-medium">
              <span>Total WhatsApp Inquiries</span>
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
            </div>
            <div className="text-2xl font-bold font-cinzel text-[#2A1810]">
              {allOrders.length}
            </div>
            <div className="text-[11px] text-[#7A6855]">
              Direct Inquiries Captured
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E8DFC8] shadow-xs space-y-1">
            <div className="flex items-center justify-between text-[#7A6855] text-xs font-medium">
              <span>Platform Owner</span>
              <ShieldCheck className="w-4 h-4 text-[#8C232C]" />
            </div>
            <div className="text-2xl font-bold font-royal text-[#2A1810]">
              Rahul
            </div>
            <div className="text-[11px] text-[#8C232C] font-semibold">
              📞 7087033009
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E8DFC8] shadow-xs space-y-1">
            <div className="flex items-center justify-between text-[#7A6855] text-xs font-medium">
              <span>Architecture Status</span>
              <Sparkles className="w-4 h-4 text-[#B8860B]" />
            </div>
            <div className="text-sm font-bold text-[#1B6D3E] pt-1">
              100% Free / Self-Hosted
            </div>
            <div className="text-[11px] text-[#7A6855]">
              0 Paid APIs &bull; 0 Gateway Fees
            </div>
          </div>
        </div>

        {/* Vendors Management Table */}
        <div className="bg-white rounded-2xl border border-[#E8DFC8] shadow-xs overflow-hidden">
          <div className="p-5 border-b border-[#F0EAE1] flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold font-royal text-[#2A1810]">
                Manage Jeweller Tenants
              </h2>
              <p className="text-xs text-[#7A6855]">
                Each jeweller data is 100% strictly isolated. Master admin can activate/deactivate stores or modify subscription plans.
              </p>
            </div>

            <button
              onClick={() => setShowAddModal(true)}
              className="py-2 px-3.5 rounded-xl bg-[#4A0E17] text-white text-xs font-bold hover:bg-[#681420] transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-3.5 h-3.5 text-[#E5C158]" />
              <span>Add New Jeweller</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF6EE] text-[#7A6855] border-b border-[#E8DFC8] font-cinzel">
                <tr>
                  <th className="p-3.5">Showroom &amp; Store</th>
                  <th className="p-3.5">Owner &amp; Phone</th>
                  <th className="p-3.5">WhatsApp Number</th>
                  <th className="p-3.5">Active Plan</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0EAE1]">
                {vendors.map((v) => {
                  const prodCount = storageService.getProducts(v.id).length;
                  return (
                    <tr key={v.id} className="hover:bg-[#FAF8F5] transition-colors">
                      <td className="p-3.5">
                        <div className="flex items-center gap-3">
                          <img
                            src={v.logo}
                            alt={v.name}
                            className="w-10 h-10 rounded-xl object-cover border border-[#E8DFC8] shrink-0"
                          />
                          <div>
                            <div className="font-bold text-[#2A1810] text-sm">{v.name}</div>
                            <div className="text-[11px] text-[#7A6855]">
                              {v.city}, {v.state} &bull; <strong className="text-[#8C6D23]">{prodCount} Ornaments</strong>
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="p-3.5">
                        <div className="font-bold text-[#2A1810]">{v.ownerName}</div>
                        <div className="text-[11px] text-[#7A6855]">📞 {v.phone}</div>
                      </td>

                      <td className="p-3.5">
                        <span className="font-mono font-bold text-[#1B6D3E]">
                          +{v.whatsapp}
                        </span>
                      </td>

                      <td className="p-3.5">
                        <select
                          value={v.plan}
                          onChange={(e) => handlePlanChange(v, e.target.value as Vendor['plan'])}
                          className="py-1 px-2 text-xs rounded border border-[#D8CEBE] bg-white font-semibold text-[#8C6D23]"
                        >
                          <option value="Free">Free Plan</option>
                          <option value="Silver">Silver</option>
                          <option value="Gold VIP">Gold VIP</option>
                        </select>
                      </td>

                      <td className="p-3.5">
                        <button
                          onClick={() => handleToggleStatus(v.id)}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold transition-all ${
                            v.isActive
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                              : 'bg-red-50 text-red-600 border border-red-300'
                          }`}
                        >
                          <Power className="w-3 h-3" />
                          <span>{v.isActive ? 'Active' : 'Disabled'}</span>
                        </button>
                      </td>

                      <td className="p-3.5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => onNavigate({ type: 'vendor', vendorId: v.id })}
                            className="p-1.5 rounded-lg border border-[#D8CEBE] hover:bg-[#FAF6EE] text-[#4A0E17] font-semibold text-[11px] flex items-center gap-1"
                            title="Vendor Panel Login"
                          >
                            <Store className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Vendor Panel</span>
                          </button>

                          <button
                            onClick={() => onNavigate({ type: 'store', vendorSlug: v.slug })}
                            className="p-1.5 rounded-lg border border-[#D8CEBE] hover:bg-[#FAF6EE] text-gray-700"
                            title="Open Customer Store"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => handleDelete(v.id, v.name)}
                            className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600"
                            title="Delete Vendor"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Add Vendor Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#D4AF37] space-y-4">
            <div className="flex items-center justify-between border-b border-[#F0EAE1] pb-3">
              <h3 className="text-base font-bold font-royal text-[#2A1810]">
                Register New Jeweller Vendor
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddVendor} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-[#2A1810] mb-1">
                  Jewellery Store / Shop Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal Gems & Jewellers"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-[#D8CEBE] rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#2A1810] mb-1">
                    Owner Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Rahul Soni"
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    className="w-full px-3 py-2 border border-[#D8CEBE] rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#2A1810] mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Jaipur / Mumbai"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 border border-[#D8CEBE] rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#2A1810] mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="7087033009"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 border border-[#D8CEBE] rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#2A1810] mb-1">
                    WhatsApp Number (For Direct Orders)
                  </label>
                  <input
                    type="tel"
                    placeholder="7087033009"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    className="w-full px-3 py-2 border border-[#D8CEBE] rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#2A1810] mb-1">
                  Subscription Plan
                </label>
                <select
                  value={plan}
                  onChange={(e) => setPlan(e.target.value as Vendor['plan'])}
                  className="w-full px-3 py-2 border border-[#D8CEBE] rounded-lg font-semibold"
                >
                  <option value="Gold VIP">Gold VIP</option>
                  <option value="Silver">Silver</option>
                  <option value="Free">Free</option>
                </select>
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#4A0E17] text-white font-bold text-xs hover:bg-[#681420]"
                >
                  Create Jeweller Store
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="py-2.5 px-4 rounded-xl border border-gray-300 text-gray-700 text-xs font-semibold hover:bg-gray-100"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
