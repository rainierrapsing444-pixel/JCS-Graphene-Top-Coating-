import React, { useState } from 'react';
import {
  Package,
  Sparkles,
  Droplet,
  Check,
  Eye,
  ArrowRight,
  ShieldAlert,
  Zap,
  Sliders,
  Sun
} from 'lucide-react';
import { PDF_DATA, ProductItem } from '../../types/pdfData';
import { soundFX } from '../../utils/audio';
import { ProductFocus, SceneMode } from '../3d/ThreeViewport';

interface ProductsSectionProps {
  onInspectIn3D: (productId: ProductFocus) => void;
  onScrollToPricing: () => void;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({
  onInspectIn3D,
  onScrollToPricing,
}) => {
  const { products } = PDF_DATA;
  const [activeTab, setActiveTab] = useState<string>('graphene-coat');
  const [sliderPosition, setSliderPosition] = useState<number>(50);

  const activeProduct = products.find((p) => p.id === activeTab) || products[0];

  const handleTabChange = (id: string) => {
    setActiveTab(id);
    soundFX.playClick(680);
  };

  return (
    <section id="products" className="py-16 bg-neutral-900/60 border-t border-b border-neutral-800 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-red-500 uppercase tracking-widest mb-1.5">
              <Package className="w-4 h-4" />
              <span>SECTION V • FLAGSHIP AUTOMOTIVE LINEUP</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white font-heading">
              Products and Services
            </h2>
            <p className="text-sm text-neutral-400 mt-1 max-w-xl">
              Engineered to resolve water marks, stains, acid rain, paint transfer, and UV surface contamination with waterless simplicity.
            </p>
          </div>
          <div className="text-xs font-medium text-neutral-400 bg-neutral-950 px-3.5 py-2 rounded-xl border border-neutral-800">
            Source: <span className="text-neutral-200">PDF Document Pages 6 & 7</span>
          </div>
        </div>

        {/* Product Navigation Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {products.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => handleTabChange(item.id)}
              className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden group ${
                activeTab === item.id
                  ? 'bg-neutral-800/90 border-red-500/80 shadow-xl'
                  : 'bg-neutral-950/60 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900/40'
              }`}
            >
              {activeTab === item.id && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 to-rose-600" />
              )}
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black uppercase text-neutral-400 font-mono">
                  ITEM 0{idx + 1}
                </span>
                <span
                  className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase ${
                    idx === 0
                      ? 'bg-red-500/20 text-red-400'
                      : idx === 1
                      ? 'bg-amber-500/20 text-amber-400'
                      : 'bg-blue-500/20 text-blue-400'
                  }`}
                >
                  {item.badge}
                </span>
              </div>
              <h4 className="text-base font-extrabold text-white font-heading group-hover:text-red-400 transition-colors">
                {item.name}
              </h4>
              <p className="text-xs text-neutral-400 line-clamp-1 mt-0.5">
                {item.subtitle}
              </p>
            </button>
          ))}
        </div>

        {/* Active Product Detailed Showcase */}
        <div className="bg-neutral-950 border border-neutral-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Product Details & Bullets (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-red-600 text-white uppercase tracking-wider">
                    {activeProduct.category}
                  </span>
                  <span className="text-xs font-semibold text-neutral-400">
                    Official Formulation
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white font-heading">
                  {activeProduct.name}
                </h3>
                <p className="text-xs sm:text-sm font-medium text-red-400">
                  {activeProduct.subtitle}
                </p>
              </div>

              {/* Exact description from PDF */}
              <div className="bg-neutral-900/80 p-5 rounded-2xl border border-neutral-800/80 text-sm text-neutral-300 leading-relaxed">
                {activeProduct.description}
              </div>

              {/* Key Benefits Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {activeProduct.keyBenefits.map((b, i) => (
                  <div key={i} className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800 text-center">
                    <div className="text-[10px] text-neutral-500 uppercase font-bold">{b.label}</div>
                    <div className="text-sm font-extrabold text-white font-heading mt-0.5">
                      {b.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Bullet Points */}
              <div className="space-y-2.5 pt-2">
                <h5 className="text-xs font-bold text-neutral-300 uppercase tracking-wider">
                  Key Application Advantages:
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {activeProduct.bulletPoints.map((point, i) => (
                    <div key={i} className="flex items-start gap-2 text-neutral-300 bg-neutral-900/40 p-2.5 rounded-xl border border-neutral-800/60">
                      <Check className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-3">
                <button
                  onClick={() => {
                    soundFX.playClick(720);
                    onInspectIn3D(activeProduct.id as ProductFocus);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs tracking-wider shadow-lg shadow-red-900/30 flex items-center gap-2 transition-all"
                >
                  <Eye className="w-4 h-4" />
                  <span>INSPECT IN 3D STUDIO</span>
                </button>

                <button
                  onClick={() => {
                    soundFX.playClick(600);
                    onScrollToPricing();
                  }}
                  className="px-5 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-700 font-bold text-xs tracking-wider flex items-center gap-2 transition-all"
                >
                  <Package className="w-4 h-4 text-amber-400" />
                  <span>VIEW PACKAGE PRICING</span>
                </button>
              </div>
            </div>

            {/* Right Column: Interactive Before/After Visualizer (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white flex items-center gap-1.5 font-heading">
                    <Sliders className="w-4 h-4 text-red-500" />
                    SIMULATED BEFORE & AFTER DEMO
                  </span>
                  <span className="text-[11px] text-neutral-400">Slide to compare</span>
                </div>

                {/* Split comparison preview container */}
                <div className="relative h-64 w-full rounded-xl overflow-hidden border border-neutral-700 select-none bg-neutral-950">
                  {/* Left Side: Treated with JCS */}
                  <div
                    className="absolute inset-0 bg-gradient-to-tr from-neutral-950 via-red-950/40 to-neutral-900 flex flex-col justify-end p-4"
                    style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                  >
                    <div className="absolute top-4 left-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-600/90 text-white text-[10px] font-black uppercase tracking-wider backdrop-blur-md">
                      <Sparkles className="w-3 h-3" />
                      <span>AFTER: JCS {activeProduct.name.split(' ')[1] || 'CARE'}</span>
                    </div>

                    {/* Gloss / water beading graphic effect */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-60 pointer-events-none">
                      <div className="w-48 h-48 rounded-full bg-red-600/20 blur-3xl" />
                      <div className="text-center space-y-1">
                        <div className="text-3xl font-black text-white font-heading drop-shadow-md">
                          60%–70%
                        </div>
                        <div className="text-xs font-bold text-red-300 uppercase tracking-widest">
                          DEEP MIRROR GLOSS
                        </div>
                        <div className="text-[10px] text-sky-300">
                          💧 Ultra-Hydrophobic Water Beading
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Side: Untreated / Damaged */}
                  <div
                    className="absolute inset-0 bg-gradient-to-tr from-neutral-950 via-stone-900 to-neutral-900 flex flex-col justify-end p-4"
                    style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
                  >
                    <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-800/90 text-neutral-300 text-[10px] font-black uppercase tracking-wider backdrop-blur-md">
                      <ShieldAlert className="w-3 h-3 text-amber-500" />
                      <span>BEFORE: UNPROTECTED</span>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center opacity-60 pointer-events-none">
                      <div className="text-center space-y-1">
                        <div className="text-2xl font-bold text-neutral-400 font-heading">
                          DULL / CONTAMINATED
                        </div>
                        <div className="text-xs text-neutral-500">
                          Acid Rain Water Marks & Soil Spots
                        </div>
                        <div className="text-[10px] text-amber-400/80">
                          ⚠️ UV Discoloration & Etching
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Divider line and handle */}
                  <div
                    className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize flex items-center justify-center shadow-[0_0_10px_rgba(255,255,255,0.7)]"
                    style={{ left: `${sliderPosition}%` }}
                  >
                    <div className="w-7 h-7 rounded-full bg-red-600 border-2 border-white flex items-center justify-center text-white shadow-lg text-[9px] font-black">
                      ↔
                    </div>
                  </div>

                  {/* Invisible Range Slider Overlay for dragging */}
                  <input
                    type="range"
                    min="5"
                    max="95"
                    value={sliderPosition}
                    onChange={(e) => setSliderPosition(Number(e.target.value))}
                    className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full"
                    aria-label="Before after comparison slider"
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-neutral-400">
                  <span className="text-red-400 font-bold">◄ Treated (JCS Protection)</span>
                  <span className="text-neutral-500">Raw / Weather Damaged ►</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
