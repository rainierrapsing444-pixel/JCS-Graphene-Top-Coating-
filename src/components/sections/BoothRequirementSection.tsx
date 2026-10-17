import React from 'react';
import {
  Store,
  Maximize2,
  MapPin,
  Car,
  Eye,
  CheckCircle2,
  Users,
  Presentation,
  CreditCard,
  Megaphone,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { PDF_DATA } from '../../types/pdfData';
import { soundFX } from '../../utils/audio';

interface BoothRequirementSectionProps {
  onInspectBooth3D: () => void;
  onOpenInquiry: () => void;
}

export const BoothRequirementSection: React.FC<BoothRequirementSectionProps> = ({
  onInspectBooth3D,
  onOpenInquiry,
}) => {
  const { boothRequirements } = PDF_DATA;

  const functionIcons = [
    <Eye key={0} className="w-5 h-5 text-red-500" />,
    <Users key={1} className="w-5 h-5 text-sky-400" />,
    <Presentation key={2} className="w-5 h-5 text-amber-400" />,
    <CreditCard key={3} className="w-5 h-5 text-emerald-400" />,
    <Megaphone key={4} className="w-5 h-5 text-rose-500" />,
    <BookOpen key={5} className="w-5 h-5 text-indigo-400" />,
  ];

  return (
    <section id="booth-spec" className="py-16 bg-neutral-950 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-red-500 uppercase tracking-widest mb-1.5">
              <Store className="w-4 h-4" />
              <span>SECTION {boothRequirements.sectionNum} • COMMERCIAL FOOTPRINT & LEASING SPECIFICATION</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white font-heading">
              Proposed Booth and Area Requirement
            </h2>
            <p className="text-sm text-neutral-400 mt-1 max-w-xl">
              Compact high-efficiency 1.5m × 1m promotional footprint optimized for mall entrances and live parking bay vehicle trials.
            </p>
          </div>
          <div className="text-xs font-medium text-neutral-400 bg-neutral-900 px-3.5 py-2 rounded-xl border border-neutral-800">
            Source: <span className="text-neutral-200">PDF Document Page 8</span>
          </div>
        </div>

        {/* Blueprint & Specification Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Blueprint Card (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-b from-neutral-900 via-neutral-900 to-neutral-950 border border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-red-600/20 text-red-500 rounded-xl">
                  <Maximize2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white font-heading">
                    Spatial Specifications
                  </h3>
                  <span className="text-xs text-neutral-400">Low-Overhead Mall Footprint</span>
                </div>
              </div>
              <span className="text-xs font-black text-red-400 font-mono px-2.5 py-1 rounded bg-red-500/10 border border-red-500/30">
                1.5m × 1.0m
              </span>
            </div>

            {/* Visual Floorplan Representation */}
            <div className="relative h-60 bg-neutral-950 rounded-2xl border-2 border-dashed border-red-500/40 p-4 flex flex-col justify-between overflow-hidden">
              {/* Floor grid styling */}
              <div className="absolute inset-0 carbon-pattern opacity-40" />

              <div className="relative z-10 flex justify-between text-[11px] text-neutral-400 font-mono font-bold">
                <span>◄ 1.50 METERS (WIDTH) ►</span>
                <span className="text-amber-400">AREA: 1.50 SQM</span>
              </div>

              {/* Inner counter diagram */}
              <div className="relative z-10 mx-auto w-3/4 h-24 bg-gradient-to-r from-red-950/80 via-neutral-900 to-red-950/80 border border-red-500 rounded-xl flex flex-col items-center justify-center p-2 text-center shadow-lg">
                <span className="text-xs font-black text-white font-heading">
                  JCS PROMOTIONAL COUNTER
                </span>
                <span className="text-[10px] text-neutral-300">
                  Tiered Display • POS Counter • Backlit Marquee (2.2m H)
                </span>
                <div className="flex gap-2 mt-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                </div>
              </div>

              <div className="relative z-10 flex justify-between text-[11px] text-neutral-400 font-mono font-bold">
                <span>▲ 1.00m DEPTH ▼</span>
                <span className="text-emerald-400">✔ ZERO WATER SPILL</span>
              </div>
            </div>

            {/* Strategic Location Highlights */}
            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-red-500" />
                  Preferred Mall Location
                </div>
                <p className="text-neutral-400 leading-relaxed">
                  Near high-traffic mall entrance doors, lobby escalators, or main atrium walkways where motorist foot traffic is dense.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <Car className="w-4 h-4 text-sky-400" />
                  Parking Area Demo Access
                </div>
                <p className="text-neutral-400 leading-relaxed">
                  Coordinated access to a designated parking slot enables on-the-spot vehicle testing so customers can witness hydrophobic water beading on their own hood!
                </p>
              </div>
            </div>

            {/* 3D Model button */}
            <button
              onClick={() => {
                soundFX.playClick(700);
                onInspectBooth3D();
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs tracking-wider shadow-lg shadow-red-900/30 flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
            >
              <Eye className="w-4 h-4" />
              <span>ORBIT 3D BOOTH IN STUDIO</span>
            </button>
          </div>

          {/* 6 Core Functions Detailed Breakdown (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">
                Operational Utility
              </span>
              <h3 className="text-2xl font-black text-white font-heading mt-0.5">
                The 6 Essential Functions of the Kiosk Setup
              </h3>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                As detailed in the proposal, this 1.5x1m kiosk is engineered to maintain manageable operating expenses while maximizing retail conversion:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {boothRequirements.boothFunctions.map((fn, idx) => (
                <div
                  key={idx}
                  className="bg-neutral-900/70 border border-neutral-800/80 hover:border-neutral-700 p-4 rounded-2xl transition-all space-y-2 group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-neutral-950 border border-neutral-800 group-hover:scale-105 transition-transform">
                      {functionIcons[idx]}
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-neutral-500 uppercase font-mono">
                        FUNCTION 0{idx + 1}
                      </span>
                      <h4 className="text-sm font-black text-white font-heading">
                        {fn.title}
                      </h4>
                    </div>
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {fn.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Hardware & Merchandising Features */}
            <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-5 space-y-3">
              <h4 className="text-xs font-bold text-neutral-300 uppercase tracking-wider flex items-center gap-2">
                <Store className="w-4 h-4 text-red-500" />
                Physical Kiosk Architecture (As Pictured in PDF Page 8)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {boothRequirements.features.map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-neutral-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">{item.name}:</strong>{' '}
                      <span className="text-neutral-400">{item.detail}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom proposal callout */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-red-950/40 via-neutral-900 to-neutral-900 border border-red-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-0.5 text-center sm:text-left">
                <div className="text-sm font-black text-white font-heading">
                  Ready to review commercial tenancy or book demonstration?
                </div>
                <div className="text-xs text-neutral-400">
                  Direct partnership discussions with John Christopher Soler
                </div>
              </div>
              <button
                onClick={() => {
                  soundFX.playClick(750);
                  onOpenInquiry();
                }}
                className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-xs tracking-wider shrink-0 shadow-lg shadow-red-900/30 flex items-center gap-1.5 transition-all"
              >
                <span>SUBMIT TENANCY PROPOSAL</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
