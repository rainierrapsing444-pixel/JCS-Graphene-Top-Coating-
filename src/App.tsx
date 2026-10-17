import React, { useState } from 'react';
import { Navbar } from './components/navigation/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { ExecutiveSummarySection } from './components/sections/ExecutiveSummarySection';
import { OwnerTimelineSection } from './components/sections/OwnerTimelineSection';
import { ProductsSection } from './components/sections/ProductsSection';
import { BoothRequirementSection } from './components/sections/BoothRequirementSection';
import { PricingPackageSection } from './components/sections/PricingPackageSection';
import { PdfDeckViewer } from './components/sections/PdfDeckViewer';
import { Footer } from './components/navigation/Footer';
import { InquiryModal } from './components/modals/InquiryModal';
import { DownloadModal } from './components/modals/DownloadModal';
import { SceneMode, ProductFocus } from './components/3d/ThreeViewport';
import { soundFX } from './utils/audio';

export default function App() {
  const [activeView, setActiveView] = useState<'interactive' | 'pdfDeck'>('interactive');
  const [current3DMode, setCurrent3DMode] = useState<SceneMode>('booth');
  const [selectedProductId, setSelectedProductId] = useState<ProductFocus>('graphene-coat');
  const [isInquiryOpen, setIsInquiryOpen] = useState<boolean>(false);
  const [isDownloadOpen, setIsDownloadOpen] = useState<boolean>(false);
  const [preselectedPackage, setPreselectedPackage] = useState<string | undefined>(undefined);
  const snapshotHandlerRef = React.useRef<(() => void) | null>(null);

  const scrollToSection = (sectionId: string) => {
    if (activeView === 'pdfDeck') {
      setActiveView('interactive');
    }
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  const handleInspectIn3D = (productId: ProductFocus) => {
    setSelectedProductId(productId);
    setCurrent3DMode('product');
    scrollToSection('3d-viewport');
  };

  const handleInspectBooth3D = () => {
    setCurrent3DMode('booth');
    scrollToSection('3d-viewport');
  };

  const handleSelectPackageForInquiry = (pkgId: string) => {
    setPreselectedPackage(pkgId);
    setIsInquiryOpen(true);
  };

  const handleSwitchTo3DFromDeck = (mode: SceneMode, prodId?: ProductFocus) => {
    setActiveView('interactive');
    setCurrent3DMode(mode);
    if (prodId) {
      setSelectedProductId(prodId);
    }
    soundFX.playSwoosh();
    scrollToSection('3d-viewport');
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-red-600 selection:text-white">
      {/* Main Navigation Header */}
      <Navbar
        onOpenInquiry={() => {
          setPreselectedPackage(undefined);
          setIsInquiryOpen(true);
        }}
        onOpenDownload={() => setIsDownloadOpen(true)}
        activeView={activeView}
        onToggleView={(view) => setActiveView(view)}
        onNavigateToSection={scrollToSection}
      />

      {/* Main Body */}
      <main className="flex-1">
        {activeView === 'interactive' ? (
          <>
            {/* Hero & 3D Interactive Viewport */}
            <HeroSection
              current3DMode={current3DMode}
              on3DModeChange={setCurrent3DMode}
              selectedProductId={selectedProductId}
              onSelectProduct={setSelectedProductId}
              onOpenInquiry={() => {
                setPreselectedPackage(undefined);
                setIsInquiryOpen(true);
              }}
              onScrollToSection={scrollToSection}
              onRegisterSnapshot={(handler) => {
                snapshotHandlerRef.current = handler;
              }}
            />

            {/* Section I: Executive Summary & Section IV: Business Description */}
            <ExecutiveSummarySection />

            {/* Section III: Owner Background (John Christopher Soler) */}
            <OwnerTimelineSection />

            {/* Section V: Products and Services */}
            <ProductsSection
              onInspectIn3D={handleInspectIn3D}
              onScrollToPricing={() => scrollToSection('pricing')}
            />

            {/* Section VI: Proposed Booth & Area Requirement (1.5m x 1m) */}
            <BoothRequirementSection
              onInspectBooth3D={handleInspectBooth3D}
              onOpenInquiry={() => {
                setPreselectedPackage(undefined);
                setIsInquiryOpen(true);
              }}
            />

            {/* Section VI: Pricing and Package Options (Solo, Duo, Trio) */}
            <PricingPackageSection
              onSelectPackageForInquiry={handleSelectPackageForInquiry}
            />
          </>
        ) : (
          /* PDF Deck Mode: Faithful 8-Page Presentation Slideshow */
          <PdfDeckViewer
            onSwitchTo3D={handleSwitchTo3DFromDeck}
            onOpenInquiry={() => {
              setPreselectedPackage(undefined);
              setIsInquiryOpen(true);
            }}
            onOpenDownloadModal={() => setIsDownloadOpen(true)}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenInquiry={() => {
          setPreselectedPackage(undefined);
          setIsInquiryOpen(true);
        }}
        onScrollToTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      />

      {/* Interactive Inquiry & Demo Booking Modal */}
      <InquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
        preselectedPackage={preselectedPackage}
      />

      {/* Download & Export Modal */}
      <DownloadModal
        isOpen={isDownloadOpen}
        onClose={() => setIsDownloadOpen(false)}
        onTriggerPrintPdf={() => {
          setIsDownloadOpen(false);
          setActiveView('pdfDeck');
          setTimeout(() => {
            window.print();
          }, 300);
        }}
        onTrigger3DSnapshot={() => {
          if (snapshotHandlerRef.current) {
            snapshotHandlerRef.current();
          }
        }}
      />
    </div>
  );
}
