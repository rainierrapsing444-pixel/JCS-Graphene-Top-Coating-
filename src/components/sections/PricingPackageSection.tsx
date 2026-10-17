import React, { useState } from 'react';
import {
  Layers,
  Check,
  Sparkles,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Tag,
  Star,
  CheckCircle2
} from 'lucide-react';
import { PDF_DATA } from '../../types/pdfData';
import { soundFX } from '../../utils/audio';

interface PricingPackageSectionProps {
  onSelectPackageForInquiry: (pkgId: string) => void;
}

export const PricingPackageSection: React.FC<PricingPackageSectionProps> = ({
  onSelectPackageForInquiry,
}) => {
  const { pricingPackages } = PDF_DATA;
  const [selectedSoloProduct, setSelectedSoloProduct] = useState('graphene-coat');
  const [selectedDuoProducts, setSelectedDuoProducts] = useState<string[]>(['graphene-coat', 'acid-rain-remover']);

  const handleToggleDuo = (prodId: string) => {
    soundFX.playClick(650);
    if (selectedDuoProducts.includes(prodId)) {
      if (selectedDuoProducts.length > 1) {
        setSelectedDuoProducts(selectedDuoProducts.filter((id) => id !== prodId));
      }
    } else {
      if (selectedDuoProducts.length >= 2) {
        // Swap oldest
        setSelectedDuoProducts([selectedDuoProducts[1], prodId]);
      } else {
        setSelectedDuoProducts([...selectedDuoProducts, prodId]);
      }
    }
  };

  return (
    <section id="pricing" className="py-16 bg-neutral-900/40 border-t border-b border-neutral-800 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-red-500 uppercase tracking-widest mb-1.5">
              <Tag className="w-4 h-4" />
              <span>SECTION VI • PRICING AND PACKAGE OPTIONS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white font-heading">
              Commercial Package Pricing
            </h2>
            <p className="text-sm text-neutral-400 mt-1 max-w-xl">
              Tiered pricing options providing flexible choices for customers based on their specific vehicle maintenance needs and budget.
            </p>
          </div>
          <div className="text-xs font-medium text-neutral-400 bg-neutral-950 px-3.5 py-2 rounded-xl border border-neutral-800">
            Source: <span className="text-neutral-200">PDF Document Page 7</span>
          </div>
        </div>

        {/* 3 Pricing Packages Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {pricingPackages.map((pkg) => (
            <div
              key={pkg.id}
              className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative ${
                pkg.isPopular
                  ? 'bg-gradient-to-b from-neutral-900 via-neutral-900 to-red-950/40 border-2 border-red-500 shadow-2xl scale-[1.02] z-10'
                  : 'bg-neutral-950/80 border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900/60'
              }`}
            >
              {/* Popular Badge */}
              {pkg.isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-red-600 to-rose-600 text-white font-black text-[10px] tracking-widest uppercase shadow-md flex items-center gap-1.5">
                  <Star className="w-3 h-3 fill-current" />
                  <span>MOST POPULAR CHOICE</span>
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                    {pkg.badge}
                  </span>
                  {pkg.originalPrice && (
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                      Save ₱{(pkg.originalPrice - pkg.price).toLocaleString()}
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-2xl font-black text-white font-heading">
                    {pkg.name}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1 min-h-[32px]">
                    {pkg.description}
                  </p>
                </div>

                {/* Price Display */}
                <div className="pt-2 pb-1 border-b border-neutral-800">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl sm:text-5xl font-black text-white font-heading">
                      ₱{pkg.price.toLocaleString()}
                    </span>
                    {pkg.originalPrice && (
                      <span className="text-sm font-semibold text-neutral-500 line-through">
                        ₱{pkg.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-neutral-500 mt-0.5">
                    Suggested Retail Price (SRP) • Direct Booth POS
                  </div>
                </div>

                {/* Recommended For */}
                <div className="bg-neutral-900/70 p-3 rounded-xl border border-neutral-800/80 text-xs text-neutral-300">
                  <strong className="text-white block mb-0.5">Recommended For:</strong>
                  <span className="text-neutral-400">{pkg.recommendedFor}</span>
                </div>

                {/* Interactive Product Chooser for Solo/Duo */}
                {pkg.id === 'solo' && (
                  <div className="space-y-1.5 pt-1">
                    <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                      Select Your Item:
                    </label>
                    <div className="space-y-1 text-xs">
                      {[
                        { id: 'graphene-coat', label: 'JCS Graphene Coat' },
                        { id: 'acid-rain-remover', label: 'Glass & Klin Acid Rain Remover' },
                        { id: 'all-around-remover', label: 'All Around Stain Remover Tub' }
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => {
                            setSelectedSoloProduct(item.id);
                            soundFX.playClick(600);
                          }}
                          className={`w-full text-left px-3 py-1.5 rounded-lg border text-xs flex items-center justify-between transition-all ${
                            selectedSoloProduct === item.id
                              ? 'bg-red-600/20 border-red-500 text-white font-semibold'
                              : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
                          }`}
                        >
                          <span>{item.label}</span>
                          {selectedSoloProduct === item.id && <Check className="w-3.5 h-3.5 text-red-500" />}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {pkg.id === 'duo' && (
                  <div className="space-y-1.5 pt-1">
                    <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                      Select Any 2 Items:
                    </label>
                    <div className="space-y-1 text-xs">
                      {[
                        { id: 'graphene-coat', label: 'JCS Graphene Coat' },
                        { id: 'acid-rain-remover', label: 'Glass & Klin Acid Rain Remover' },
                        { id: 'all-around-remover', label: 'All Around Stain Remover Tub' }
                      ].map((item) => {
                        const isSelected = selectedDuoProducts.includes(item.id);
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => handleToggleDuo(item.id)}
                            className={`w-full text-left px-3 py-1.5 rounded-lg border text-xs flex items-center justify-between transition-all ${
                              isSelected
                                ? 'bg-red-600/20 border-red-500 text-white font-semibold'
                                : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
                            }`}
                          >
                            <span>{item.label}</span>
                            {isSelected && <Check className="w-3.5 h-3.5 text-red-500" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {pkg.id === 'trio' && (
                  <div className="bg-red-950/30 border border-red-500/30 p-3 rounded-xl text-xs space-y-1">
                    <div className="font-bold text-white flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-red-400" />
                      All 3 Products Included:
                    </div>
                    <ul className="text-neutral-300 space-y-0.5 pl-4 list-disc text-[11px]">
                      <li>JCS Graphene Coat (500ml)</li>
                      <li>Glass & Klin Acid Rain Remover</li>
                      <li>All Around Stain Remover Compound</li>
                    </ul>
                  </div>
                )}

                {/* Features List */}
                <div className="space-y-2 pt-2">
                  <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">
                    What's Included:
                  </span>
                  <div className="space-y-1.5 text-xs">
                    {pkg.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2 text-neutral-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6">
                <button
                  onClick={() => {
                    soundFX.playClick(750);
                    onSelectPackageForInquiry(pkg.id);
                  }}
                  className={`w-full py-3 rounded-xl font-black text-xs tracking-wider flex items-center justify-center gap-2 transition-all active:scale-[0.99] ${
                    pkg.isPopular
                      ? 'bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-lg shadow-red-900/40'
                      : 'bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-700'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>INQUIRE / ORDER {pkg.name.toUpperCase()}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pricing Guarantee Banner directly from PDF */}
        <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 text-center space-y-2 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-300 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-red-500" />
            Official Pricing Guarantee
          </div>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed italic">
            "These package options allow customers to choose products based on their specific vehicle maintenance needs and budget."
          </p>
          <div className="text-[11px] text-neutral-500">
            JCS-AVIOR CarCare Trading • JCS Car Solution • Established 2024
          </div>
        </div>
      </div>
    </section>
  );
};
