import React, { useState } from 'react';
import { X, Send, CheckCircle2, Shield, Sparkles, Building, Car, Package } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFX } from '../../utils/audio';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedPackage?: string;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  preselectedPackage,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: preselectedPackage ? 'order' : 'mall-space',
    packageChoice: preselectedPackage || 'trio',
    preferredMall: '',
    vehicleModel: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundFX.playChime();
    setSubmitted(true);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ef4444', '#dc2626', '#38bdf8', '#ffffff'],
      });
    } catch {
      // Confetti fallback
    }
  };

  const resetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-xl bg-neutral-900 border border-neutral-700/80 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-red-600 via-rose-700 to-neutral-900 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-black/40 rounded-lg">
              <Shield className="w-5 h-5 text-red-300" />
            </div>
            <div>
              <h3 className="text-white font-extrabold text-base font-heading tracking-wide">
                JCS CAR SOLUTION INQUIRY & DEMO
              </h3>
              <p className="text-red-100 text-xs font-medium">
                JCS-AVIOR CarCare Trading • John Christopher Soler
              </p>
            </div>
          </div>
          <button
            onClick={resetAndClose}
            className="p-1.5 rounded-lg bg-black/30 hover:bg-black/60 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-black text-white font-heading">
                Inquiry Received Successfully!
              </h4>
              <p className="text-neutral-300 text-sm max-w-md mx-auto leading-relaxed">
                Thank you for connecting with <strong className="text-white">JCS-AVIOR CarCare Trading</strong>.
                John Christopher Soler and our commercial team will contact you directly within 24 hours regarding your request.
              </p>
              <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 text-xs text-neutral-400 max-w-md mx-auto text-left space-y-1">
                <div><strong className="text-neutral-200">Contact Person:</strong> {formData.name || 'Valued Partner'}</div>
                <div><strong className="text-neutral-200">Inquiry Nature:</strong> {formData.inquiryType.toUpperCase()}</div>
                <div><strong className="text-neutral-200">Official Brand:</strong> JCS Car Solution (Est. 2024)</div>
              </div>
              <button
                onClick={resetAndClose}
                className="mt-4 px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm tracking-wider transition-all"
              >
                Close & Return to Experience
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Inquiry Type Tabs */}
              <div>
                <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">
                  Type of Proposal / Request
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({ ...formData, inquiryType: 'mall-space' });
                      soundFX.playClick(600);
                    }}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold text-center border transition-all flex flex-col items-center gap-1 ${
                      formData.inquiryType === 'mall-space'
                        ? 'bg-red-600/20 border-red-500 text-white'
                        : 'bg-neutral-800 border-neutral-700 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <Building className="w-4 h-4 text-red-400" />
                    <span>Mall Booth (1.5x1m)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setFormData({ ...formData, inquiryType: 'demo' });
                      soundFX.playClick(600);
                    }}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold text-center border transition-all flex flex-col items-center gap-1 ${
                      formData.inquiryType === 'demo'
                        ? 'bg-red-600/20 border-red-500 text-white'
                        : 'bg-neutral-800 border-neutral-700 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <Car className="w-4 h-4 text-red-400" />
                    <span>Parking Lot Demo</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setFormData({ ...formData, inquiryType: 'order' });
                      soundFX.playClick(600);
                    }}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold text-center border transition-all flex flex-col items-center gap-1 ${
                      formData.inquiryType === 'order'
                        ? 'bg-red-600/20 border-red-500 text-white'
                        : 'bg-neutral-800 border-neutral-700 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <Package className="w-4 h-4 text-red-400" />
                    <span>Package Order</span>
                  </button>
                </div>
              </div>

              {/* Package selection if ordering */}
              {formData.inquiryType === 'order' && (
                <div>
                  <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5">
                    Select Preferred Package
                  </label>
                  <select
                    value={formData.packageChoice}
                    onChange={(e) => setFormData({ ...formData, packageChoice: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-red-500"
                  >
                    <option value="solo">Solo Package — ₱1,499 (1 Choice Product)</option>
                    <option value="duo">Duo Package — ₱2,499 (2 Choice Products - Save ₱499)</option>
                    <option value="trio">Trio Package — ₱3,499 (Complete 3-Product Set - Save ₱998)</option>
                  </select>
                </div>
              )}

              {/* Contact Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Santos"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3.5 py-2 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1">
                    Phone / Mobile *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +63 917 123 4567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3.5 py-2 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. contact@business.ph"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3.5 py-2 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-red-500"
                />
              </div>

              {formData.inquiryType === 'mall-space' ? (
                <div>
                  <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1">
                    Mall / Commercial Complex Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. SM City, Ayala Malls, Robinsons Galleria"
                    value={formData.preferredMall}
                    onChange={(e) => setFormData({ ...formData, preferredMall: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3.5 py-2 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-red-500"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1">
                    Vehicle Model / Year (For Demo)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 2024 Toyota Fortuner / Honda Civic"
                    value={formData.vehicleModel}
                    onChange={(e) => setFormData({ ...formData, vehicleModel: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3.5 py-2 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-red-500"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1">
                  Message / Special Requirements
                </label>
                <textarea
                  rows={2}
                  placeholder="Inquire about lease terms, live demonstration schedule, or bulk retail supply..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3.5 py-2 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-red-500 resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-extrabold text-sm tracking-wider shadow-lg shadow-red-900/40 flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
                >
                  <Send className="w-4 h-4" />
                  <span>TRANSMIT OFFICIAL INQUIRY</span>
                </button>
              </div>

              <p className="text-[11px] text-neutral-500 text-center">
                Confidential business proposal communication for JCS-AVIOR CarCare Trading.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
