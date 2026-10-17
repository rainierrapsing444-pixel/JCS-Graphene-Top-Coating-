import React, { useState } from 'react';
import { Volume2, VolumeX, FileText, Sparkles, Send, Menu, X, Shield, ChevronRight, Download } from 'lucide-react';
import { soundFX } from '../../utils/audio';

interface NavbarProps {
  onOpenInquiry: () => void;
  onOpenDownload?: () => void;
  activeView: 'interactive' | 'pdfDeck';
  onToggleView: (view: 'interactive' | 'pdfDeck') => void;
  onNavigateToSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenInquiry,
  onOpenDownload,
  activeView,
  onToggleView,
  onNavigateToSection,
}) => {
  const [isMuted, setIsMuted] = useState(soundFX.getMuted());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleSound = () => {
    const muted = soundFX.toggleMute();
    setIsMuted(muted);
    if (!muted) soundFX.playClick(800);
  };

  const navLinks = [
    { id: '3d-viewport', label: '3D Studio' },
    { id: 'executive-summary', label: 'Executive Summary' },
    { id: 'business-profile', label: 'Business Profile' },
    { id: 'owner-story', label: 'Owner Story' },
    { id: 'products', label: 'Products' },
    { id: 'booth-spec', label: '1.5x1m Booth' },
    { id: 'pricing', label: 'Packages' },
  ];

  const handleNavClick = (id: string) => {
    soundFX.playClick(600);
    onNavigateToSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-neutral-950/90 border-b border-neutral-800/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          onClick={() => handleNavClick('3d-viewport')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          {/* Stylized JCS Shield Badge */}
          <div className="relative w-10 h-11 flex items-center justify-center transition-transform group-hover:scale-105">
            <svg viewBox="0 0 40 44" className="w-full h-full drop-shadow-md">
              <path
                d="M20 2 L38 10 L38 26 C38 36 20 42 20 42 C20 42 2 36 2 26 L2 10 Z"
                className="fill-neutral-900 stroke-red-600 stroke-[2.5]"
              />
              <path
                d="M20 6 L34 12 L34 24 C34 32 20 37 20 37 C20 37 6 32 6 24 L6 12 Z"
                className="fill-neutral-950/80"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-[11px] font-black tracking-tight text-white font-heading">JCS</span>
              <span className="text-[6px] font-extrabold text-red-500 uppercase tracking-widest -mt-1">SOLN</span>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-wider text-white font-heading">
                JCS CAR SOLUTION
              </span>
              <span className="hidden sm:inline-block text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-600/20 text-red-400 border border-red-500/30">
                2026 PROPOSAL
              </span>
            </div>
            <span className="text-[10px] text-neutral-400 tracking-wide font-medium">
              JCS-AVIOR CarCare Trading • John Christopher Soler
            </span>
          </div>
        </div>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-neutral-300 hover:text-white hover:bg-neutral-800/60 transition-colors"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Deck Toggle Mode */}
          <div className="flex items-center bg-neutral-900 border border-neutral-700/80 rounded-xl p-1 text-xs">
            <button
              onClick={() => {
                onToggleView('interactive');
                soundFX.playClick(600);
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-semibold transition-all ${
                activeView === 'interactive'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden md:inline">3D Interactive</span>
            </button>

            <button
              onClick={() => {
                onToggleView('pdfDeck');
                soundFX.playClick(600);
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-semibold transition-all ${
                activeView === 'pdfDeck'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>PDF Deck</span>
            </button>
          </div>

          {/* Download Proposal & 3D Assets Button */}
          {onOpenDownload && (
            <button
              onClick={() => {
                soundFX.playClick(700);
                onOpenDownload();
              }}
              title="Download Proposal PDF & 3D Assets"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-900 border border-neutral-700/80 hover:border-red-500/60 text-neutral-300 hover:text-white text-xs font-semibold transition-all"
            >
              <Download className="w-3.5 h-3.5 text-red-500" />
              <span className="hidden sm:inline">Download</span>
            </button>
          )}

          {/* Sound FX Toggle */}
          <button
            onClick={toggleSound}
            title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
            className="p-2 rounded-xl bg-neutral-900 border border-neutral-700/80 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-neutral-500" /> : <Volume2 className="w-4 h-4 text-red-400" />}
          </button>

          {/* Inquire CTA */}
          <button
            onClick={() => {
              soundFX.playClick(700);
              onOpenInquiry();
            }}
            className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs tracking-wider shadow-lg shadow-red-900/30 transition-all active:scale-95"
          >
            <Send className="w-3.5 h-3.5" />
            <span>INQUIRE / BOOTH DEMO</span>
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-neutral-900 border border-neutral-700 text-neutral-300"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-neutral-950 border-b border-neutral-800 px-4 py-4 space-y-2">
          {navLinks.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-neutral-300 hover:text-white hover:bg-neutral-800 flex items-center justify-between"
            >
              <span>{item.label}</span>
              <ChevronRight className="w-4 h-4 text-neutral-600" />
            </button>
          ))}
          <div className="pt-2">
            <button
              onClick={() => {
                soundFX.playClick(700);
                onOpenInquiry();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-600 text-white font-bold text-sm tracking-wider"
            >
              <Send className="w-4 h-4" />
              <span>INQUIRE / BOOTH DEMO</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
