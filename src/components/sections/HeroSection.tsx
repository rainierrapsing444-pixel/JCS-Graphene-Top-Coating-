import React from 'react';
import {
  Sparkles,
  ArrowRight,
  Shield,
  Droplet,
  Store,
  Layers,
  Award,
  ChevronDown
} from 'lucide-react';
import { ThreeViewport, SceneMode, ProductFocus } from '../3d/ThreeViewport';
import { PDF_DATA } from '../../types/pdfData';
import { soundFX } from '../../utils/audio';

interface HeroSectionProps {
  current3DMode: SceneMode;
  on3DModeChange: (mode: SceneMode) => void;
  selectedProductId: ProductFocus;
  onSelectProduct: (id: ProductFocus) => void;
  onOpenInquiry: () => void;
  onScrollToSection: (id: string) => void;
  onRegisterSnapshot?: (handler: () => void) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  current3DMode,
  on3DModeChange,
  selectedProductId,
  onSelectProduct,
  onOpenInquiry,
  onScrollToSection,
  onRegisterSnapshot,
}) => {
  return (
    <section className="relative pt-6 pb-12 overflow-hidden">
      {/* Background radial gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-red-600/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 -right-20 w-[400px] h-[400px] bg-sky-600/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Header Banner */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>COMMERCIAL BUSINESS PROPOSAL & 3D SHOWCASE • 2026</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white font-heading leading-tight">
            JCS-AVIOR <span className="text-red-500">CARCARE</span> TRADING
          </h1>

          <p className="text-lg sm:text-xl font-bold text-neutral-300 font-heading tracking-wider">
            OPERATING UNDER THE BRAND NAME <span className="text-white border-b-2 border-red-500">JCS CAR SOLUTION</span>
          </p>

          <p className="text-sm sm:text-base text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Presented by <strong className="text-neutral-200">John Christopher Soler</strong>. Practical and high-gloss
            waterless graphene car care technology powered by a lean <strong className="text-red-400">1.5m × 1m</strong> mall
            kiosk model with live parking lot customer demonstrations.
          </p>

          {/* Quick CTA buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => {
                soundFX.playClick(750);
                onOpenInquiry();
              }}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-black text-xs sm:text-sm tracking-wider shadow-lg shadow-red-900/30 transition-all active:scale-95 flex items-center gap-2"
            >
              <span>INQUIRE / BOOTH PLACEMENT</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                soundFX.playClick(600);
                onScrollToSection('booth-spec');
              }}
              className="px-5 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 hover:text-white border border-neutral-700 font-bold text-xs sm:text-sm tracking-wider transition-all flex items-center gap-2"
            >
              <Store className="w-4 h-4 text-red-500" />
              <span>INSPECT 1.5M × 1M BOOTH</span>
            </button>

            <button
              onClick={() => {
                soundFX.playClick(600);
                onScrollToSection('pricing');
              }}
              className="px-5 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 hover:text-white border border-neutral-700 font-bold text-xs sm:text-sm tracking-wider transition-all flex items-center gap-2"
            >
              <Award className="w-4 h-4 text-amber-400" />
              <span>PACKAGES (FROM ₱1,499)</span>
            </button>
          </div>
        </div>

        {/* Real-Time Interactive 3D Canvas Viewport */}
        <div id="3d-viewport" className="scroll-mt-24 space-y-2">
          <div className="flex items-center justify-between text-xs text-neutral-400 px-1">
            <span className="font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />
              INTERACTIVE 3D PROPOSAL STUDIO
            </span>
            <span className="text-[11px] text-neutral-500 hidden sm:inline">
              WebGL Real-Time Render • PBR Shading • Drag to Rotate • Scroll to Zoom
            </span>
          </div>

          <ThreeViewport
            currentMode={current3DMode}
            onModeChange={on3DModeChange}
            selectedProductId={selectedProductId}
            onSelectProduct={onSelectProduct}
            onRegisterSnapshot={onRegisterSnapshot}
          />
        </div>

        {/* 4 Key Pillar Highlights Directly from PDF */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-2">
          <div
            onClick={() => {
              on3DModeChange('booth');
              soundFX.playClick(650);
            }}
            className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 hover:border-red-500/50 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-2">
              <Store className="w-5 h-5 text-red-500 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-400">
                PAGE 8
              </span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-white font-heading">
              1.5m × 1m
            </div>
            <div className="text-xs font-semibold text-neutral-300">Mall Booth Setup</div>
            <div className="text-[11px] text-neutral-500 mt-1">High-traffic mall entrance with parking demo</div>
          </div>

          <div
            onClick={() => {
              on3DModeChange('car');
              soundFX.playClick(650);
            }}
            className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 hover:border-red-500/50 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-2">
              <Droplet className="w-5 h-5 text-sky-400 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-400">
                PAGE 6
              </span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-white font-heading">
              60%–70%
            </div>
            <div className="text-xs font-semibold text-neutral-300">High-Gloss Restoration</div>
            <div className="text-[11px] text-neutral-500 mt-1">Waterless hydrophobic nano-barrier</div>
          </div>

          <div
            onClick={() => {
              onScrollToSection('owner-story');
              soundFX.playClick(650);
            }}
            className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 hover:border-red-500/50 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-2">
              <Shield className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-400">
                PAGE 4
              </span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-white font-heading">
              40% Stake
            </div>
            <div className="text-xs font-semibold text-neutral-300">In Gorilla Wax</div>
            <div className="text-[11px] text-neutral-500 mt-1">Founder John Christopher Soler background</div>
          </div>

          <div
            onClick={() => {
              onScrollToSection('pricing');
              soundFX.playClick(650);
            }}
            className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 hover:border-red-500/50 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-2">
              <Layers className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-400">
                PAGE 7
              </span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-white font-heading">
              ₱1,499 – ₱3,499
            </div>
            <div className="text-xs font-semibold text-neutral-300">Solo, Duo, Trio Packages</div>
            <div className="text-[11px] text-neutral-500 mt-1">Accessible pricing for everyday motorists</div>
          </div>
        </div>
      </div>
    </section>
  );
};
