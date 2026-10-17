import React from 'react';
import { Shield, Sparkles, Send, ArrowUp } from 'lucide-react';
import { soundFX } from '../../utils/audio';

interface FooterProps {
  onOpenInquiry: () => void;
  onScrollToTop: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenInquiry, onScrollToTop }) => {
  return (
    <footer className="bg-neutral-950 border-t border-neutral-800 text-neutral-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-neutral-800 pb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-9 h-10 rounded-lg bg-neutral-900 border border-red-500/80 flex items-center justify-center font-bold text-white text-xs">
                JCS
              </div>
              <span className="text-xl font-black text-white font-heading tracking-wide">
                JCS CAR SOLUTION
              </span>
            </div>
            <p className="text-xs text-neutral-400 max-w-md leading-relaxed">
              JCS-AVIOR CarCare Trading • Sole Proprietorship • Founded in 2024 by John Christopher Soler.
              Revolutionizing automotive maintenance through practical waterless graphene technology.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                soundFX.playClick(700);
                onOpenInquiry();
              }}
              className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs tracking-wider shadow-lg shadow-red-900/30 flex items-center gap-2 transition-all"
            >
              <Send className="w-4 h-4" />
              <span>REQUEST BOOTH SPACE / DEMO</span>
            </button>

            <button
              onClick={() => {
                soundFX.playClick(500);
                onScrollToTop();
              }}
              className="p-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700 transition-colors"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Credentials & Legal Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div>
            <div className="font-bold text-white uppercase tracking-wider mb-1">Entity</div>
            <div className="text-neutral-400">JCS-AVIOR CarCare Trading</div>
            <div className="text-neutral-500">Sole Proprietorship</div>
          </div>
          <div>
            <div className="font-bold text-white uppercase tracking-wider mb-1">Brand Name</div>
            <div className="text-neutral-400">JCS Car Solution</div>
            <div className="text-neutral-500">Est. 2024</div>
          </div>
          <div>
            <div className="font-bold text-white uppercase tracking-wider mb-1">Founder</div>
            <div className="text-neutral-400">John Christopher Soler</div>
            <div className="text-neutral-500">A.I.E. College Batch 2015</div>
          </div>
          <div>
            <div className="font-bold text-white uppercase tracking-wider mb-1">Associated Ventures</div>
            <div className="text-neutral-400">Gorilla Wax (40% Stake)</div>
            <div className="text-neutral-500">Barbershop (3 Branches)</div>
          </div>
        </div>

        <div className="pt-4 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-500 gap-2">
          <span>© 2026 JCS-AVIOR CarCare Trading. All Rights Reserved.</span>
          <span>Commercial Proposal & 3D Interactive Presentation Engine</span>
        </div>
      </div>
    </footer>
  );
};
