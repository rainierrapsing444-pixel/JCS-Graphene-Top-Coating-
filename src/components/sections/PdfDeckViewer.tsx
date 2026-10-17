import React, { useState } from 'react';
import {
  FileText,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Sparkles,
  Download,
  CheckCircle2,
  Building,
  User,
  Package,
  Store,
  Tag,
  ArrowRight,
  Eye
} from 'lucide-react';
import { PDF_DATA } from '../../types/pdfData';
import { soundFX } from '../../utils/audio';
import { SceneMode, ProductFocus } from '../3d/ThreeViewport';

interface PdfDeckViewerProps {
  onSwitchTo3D: (mode: SceneMode, prodId?: ProductFocus) => void;
  onOpenInquiry: () => void;
  onOpenDownloadModal?: () => void;
}

export const PdfDeckViewer: React.FC<PdfDeckViewerProps> = ({
  onSwitchTo3D,
  onOpenInquiry,
  onOpenDownloadModal,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = 8;

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      soundFX.playClick(620);
      setCurrentPage(page);
    }
  };

  const handlePrint = () => {
    soundFX.playClick(750);
    window.print();
  };

  const activePageMeta = PDF_DATA.pdfPages.find((p) => p.page === currentPage) || PDF_DATA.pdfPages[0];

  return (
    <div className="py-12 bg-neutral-950 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Control Bar */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 shadow-xl no-print">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-red-600/20 text-red-500 border border-red-500/30">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-white font-extrabold text-base font-heading">
                  OFFICIAL PROPOSAL DOCUMENT READER
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-neutral-800 text-neutral-300">
                  8 PAGES COMPLETE
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                JCS-AVIOR CarCare Trading • Presented by John Christopher Soler
              </p>
            </div>
          </div>

          {/* Action & Pagination Controls */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Direct Print / Save as PDF button */}
            <button
              onClick={handlePrint}
              title="Save proposal as PDF via browser print"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs tracking-wider shadow-md transition-all active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>SAVE AS PDF</span>
            </button>

            {onOpenDownloadModal && (
              <button
                onClick={onOpenDownloadModal}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-semibold text-xs transition-all border border-neutral-700"
              >
                <span>All Downloads</span>
              </button>
            )}

            <div className="h-5 w-px bg-neutral-700 mx-1 hidden sm:block" />

            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-xl bg-neutral-800 text-neutral-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="px-3 py-1.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs font-mono font-bold text-white">
              PAGE {currentPage} OF {totalPages}
            </span>

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-xl bg-neutral-800 text-neutral-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Page Thumbnails Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {PDF_DATA.pdfPages.map((p) => (
            <button
              key={p.page}
              onClick={() => goToPage(p.page)}
              className={`shrink-0 px-3 py-2 rounded-xl border text-xs font-semibold transition-all flex items-center gap-2 ${
                currentPage === p.page
                  ? 'bg-red-600 text-white border-red-500 shadow-md'
                  : 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <span className="font-mono font-bold">P{p.page}</span>
              <span className="hidden sm:inline">{p.title.split('.')[1] || p.title}</span>
            </button>
          ))}
        </div>

        {/* Rendered Slide Stage (Faithful replica of each page) */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-12 shadow-2xl relative min-h-[580px] flex flex-col justify-between">
          {/* Watermark / Logo Shield on every page top */}
          <div className="flex items-center justify-between border-b border-neutral-800 pb-5 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-9 border-2 border-red-500 rounded flex flex-col items-center justify-center font-bold text-[9px] text-white bg-black">
                JCS
              </div>
              <span className="font-black text-sm tracking-widest text-neutral-200 uppercase font-heading">
                J C S &nbsp; C A R &nbsp; S O L U T I O N
              </span>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-mono text-neutral-500">
                PROPOSAL DOCUMENT • 2026
              </span>
              <div className="text-xs font-bold text-red-500">
                PAGE 0{currentPage}
              </div>
            </div>
          </div>

          {/* PAGE CONTENT SWITCHER */}
          <div className="flex-1">
            {currentPage === 1 && (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-8 py-8">
                <div className="relative w-28 h-32 mx-auto flex items-center justify-center">
                  <svg viewBox="0 0 40 44" className="w-full h-full drop-shadow-2xl">
                    <path
                      d="M20 2 L38 10 L38 26 C38 36 20 42 20 42 C20 42 2 36 2 26 L2 10 Z"
                      className="fill-neutral-950 stroke-red-600 stroke-[2.5]"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-xl font-black text-white font-heading">JCS</span>
                    <span className="text-[8px] font-extrabold text-red-500 uppercase tracking-widest">CAR CARE</span>
                  </div>
                </div>

                <div className="space-y-3 max-w-2xl">
                  <div className="bg-red-600 text-white font-black text-3xl sm:text-5xl py-3 px-6 rounded-xl font-heading shadow-xl tracking-tight">
                    JCS-AVIOR
                  </div>
                  <div className="text-2xl sm:text-4xl font-black text-white tracking-widest font-heading">
                    CARCARE TRADING
                  </div>
                  <div className="text-lg sm:text-xl font-black text-red-500 font-mono tracking-widest">
                    2026
                  </div>
                </div>

                {/* Diagonal Banner simulation */}
                <div className="w-full max-w-xl bg-neutral-950 border border-neutral-800 rounded-2xl p-6 carbon-pattern relative overflow-hidden shadow-2xl">
                  <div className="text-2xl sm:text-3xl font-black text-white tracking-widest italic font-heading">
                    GRAPHENE
                  </div>
                  <div className="text-xs font-bold text-red-400 tracking-widest uppercase">
                    TOP COATING
                  </div>
                </div>

                <div className="pt-4 space-y-1">
                  <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                    PRESENTED BY
                  </div>
                  <div className="text-xl font-extrabold text-white font-heading">
                    John Christopher Soler
                  </div>
                </div>
              </div>
            )}

            {currentPage === 2 && (
              <div className="space-y-6 max-w-3xl mx-auto">
                <div className="text-center space-y-1">
                  <h3 className="text-2xl sm:text-3xl font-black text-white font-heading uppercase tracking-wide">
                    I. EXECUTIVE SUMMARY
                  </h3>
                  <div className="w-16 h-1 bg-red-600 mx-auto rounded-full" />
                </div>

                <div className="space-y-4 text-sm sm:text-base text-neutral-300 leading-relaxed pt-4">
                  {PDF_DATA.executiveSummary.paragraphs.map((p, idx) => (
                    <p key={idx} className="text-justify leading-relaxed">
                      {p}
                    </p>
                  ))}
                </div>

                <div className="pt-6 grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800">
                    <span className="text-xs text-neutral-400">Proposed Space:</span>
                    <div className="text-xl font-black text-red-400 font-heading">1.5 × 1 sq. meters</div>
                  </div>
                  <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800">
                    <span className="text-xs text-neutral-400">Established:</span>
                    <div className="text-xl font-black text-white font-heading">2024 by J.C. Soler</div>
                  </div>
                </div>
              </div>
            )}

            {currentPage === 3 && (
              <div className="space-y-8 max-w-2xl mx-auto py-4">
                <div className="text-center space-y-1">
                  <h3 className="text-2xl sm:text-3xl font-black text-white font-heading uppercase tracking-wide">
                    II. BUSINESS PROFILE
                  </h3>
                  <div className="w-16 h-1 bg-red-600 mx-auto rounded-full" />
                </div>

                <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-5">
                  {PDF_DATA.businessProfile.details.map((item, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-800/80 pb-3 gap-1">
                      <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                        {item.label}
                      </span>
                      <span className="text-base font-bold text-white font-heading">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentPage === 4 && (
              <div className="space-y-6 max-w-3xl mx-auto">
                <div className="text-center space-y-1">
                  <h3 className="text-2xl sm:text-3xl font-black text-white font-heading uppercase tracking-wide">
                    III. OWNER BACKGROUND
                  </h3>
                  <div className="w-16 h-1 bg-red-600 mx-auto rounded-full" />
                </div>

                <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 space-y-4 text-sm sm:text-base text-neutral-300 leading-relaxed text-justify">
                  <p>
                    <strong>John Christopher Soler</strong>, 29 years old, is an I.T. graduate from A.I.E. College (Batch 2015). He started his career in the mall retail industry, where he worked from 2015 to 2019. After gaining experience in retail, he ventured into business by establishing his own lechonan business. However, the business was affected by the COVID-19 pandemic and eventually closed.
                  </p>
                  <p>
                    In 2021, he worked as a Medical Representative (Medrep) until 2023. While working as a Medrep in 2022, he became interested in the car care industry and became a strategic investor in <strong>Gorilla Wax</strong>, where he held a <strong>40% ownership stake as a stockholder</strong>.
                  </p>
                  <p>
                    In the same year, he also established his own barbershop business. Through continuous management and business development, the business expanded to three branches, established in 2022, 2023, and 2024.
                  </p>
                  <p>
                    With his experience in business and the car care industry, along with the support and knowledge gained from his involvement with Gorilla Wax, he decided to establish his own car care business in 2024. This led to the creation of <strong>JCS Car Solution</strong>.
                  </p>
                </div>
              </div>
            )}

            {currentPage === 5 && (
              <div className="space-y-8 max-w-2xl mx-auto py-8 text-center">
                <div className="space-y-1">
                  <h3 className="text-2xl sm:text-3xl font-black text-white font-heading uppercase tracking-wide">
                    IV. BUSINESS DESCRIPTION
                  </h3>
                  <div className="w-16 h-1 bg-red-600 mx-auto rounded-full" />
                </div>

                <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-8 space-y-6 text-sm sm:text-base text-neutral-300 leading-relaxed text-justify">
                  <p>
                    {PDF_DATA.businessDescription.statement}
                  </p>
                  <p>
                    The business focuses on providing easy-to-use, practical, and affordable car care solutions for everyday motorists.
                  </p>
                  <p>
                    JCS Car Solution aims to build a trusted brand by providing quality products while making car maintenance more convenient for customers.
                  </p>
                </div>
              </div>
            )}

            {currentPage === 6 && (
              <div className="space-y-6 max-w-3xl mx-auto">
                <div className="text-center space-y-1">
                  <h3 className="text-2xl sm:text-3xl font-black text-white font-heading uppercase tracking-wide">
                    V. PRODUCTS AND SERVICES
                  </h3>
                  <div className="w-16 h-1 bg-red-600 mx-auto rounded-full" />
                </div>

                <p className="text-xs text-neutral-400 text-center">
                  JCS Car Solution offers a range of car care products designed to address common vehicle maintenance concerns such as water marks, stains, acid rain, paint transfer, and surface contaminants.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Product 1 */}
                  <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-5 space-y-3">
                    <div className="text-sm font-black text-white font-heading flex items-center justify-between">
                      <span>1. JCS GRAPHENE COAT</span>
                      <span className="text-[10px] text-red-500 font-mono">FLAGSHIP</span>
                    </div>
                    <p className="text-xs text-neutral-300 leading-relaxed text-justify">
                      JCS Graphene Coat is a graphene-based, waterless maintenance product with hydrophobic properties that helps repel water and protect the vehicle's surface. It helps protect against acid rain, soil marks, and discoloration caused by UV exposure. It also helps restore approximately 60%–70% of the vehicle's high-gloss appearance and helps remove asphalt and other surface contaminants.
                    </p>
                  </div>

                  {/* Product 2 */}
                  <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-5 space-y-3">
                    <div className="text-sm font-black text-white font-heading flex items-center justify-between">
                      <span>2. GLASS AND KLIN ACID RAIN REMOVER</span>
                      <span className="text-[10px] text-amber-500 font-mono">FORMULA</span>
                    </div>
                    <p className="text-xs text-neutral-300 leading-relaxed text-justify">
                      Glass and Klin Acid Rain Remover is a specially formulated product designed to help remove heavy water marks, acid rain stains, and other residues from windshields and vehicle paint. It is intended to help improve the appearance of glass and painted surfaces affected by stubborn water marks and stains.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {currentPage === 7 && (
              <div className="space-y-6 max-w-3xl mx-auto">
                <div className="text-center space-y-1">
                  <h3 className="text-2xl sm:text-3xl font-black text-white font-heading uppercase tracking-wide">
                    3. ALL AROUND STAIN REMOVER & PRICING
                  </h3>
                  <div className="w-16 h-1 bg-red-600 mx-auto rounded-full" />
                </div>

                <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-4 text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  <strong className="text-white">3. ALL AROUND STAIN REMOVER:</strong> All around Stain Remover is designed to help remove different types of stains and dirt from vehicle surfaces. It also helps remove paint transfer and can help improve the appearance of headlights, making them look clearer and cleaner.
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    VI. PRICING AND PACKAGE OPTIONS
                  </h4>
                  <div className="border border-neutral-800 rounded-xl overflow-hidden">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-neutral-950 text-neutral-400 border-b border-neutral-800">
                        <tr>
                          <th className="p-3 font-bold">Package</th>
                          <th className="p-3 font-bold">Price</th>
                          <th className="p-3 font-bold">Description</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-800 bg-neutral-900/40">
                        {PDF_DATA.pricingPackages.map((pkg) => (
                          <tr key={pkg.id}>
                            <td className="p-3 font-bold text-white">{pkg.name}</td>
                            <td className="p-3 font-black text-red-400 font-mono">₱{pkg.price.toLocaleString()}</td>
                            <td className="p-3 text-neutral-300">{pkg.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-[11px] text-neutral-500 italic">
                    These package options allow customers to choose products based on their specific vehicle maintenance needs and budget.
                  </p>
                </div>
              </div>
            )}

            {currentPage === 8 && (
              <div className="space-y-6 max-w-3xl mx-auto">
                <div className="text-center space-y-1">
                  <h3 className="text-2xl sm:text-3xl font-black text-white font-heading uppercase tracking-wide">
                    VI. PROPOSED BOOTH AND AREA REQUIREMENT
                  </h3>
                  <div className="w-16 h-1 bg-red-600 mx-auto rounded-full" />
                </div>

                <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-5 space-y-3 text-xs sm:text-sm text-neutral-300 leading-relaxed text-justify">
                  <p>
                    JCS-AVIOR CarCare Trading does not require a large commercial space. The proposed setup only requires approximately <strong>1.5 x 1 square meters</strong> of booth space.
                  </p>
                  <p>
                    The preferred location is a high-traffic area, particularly near a mall entrance or another location where vehicle owners and potential customers can easily see the business. Access to a parking area is also important because it will allow the business to conduct actual product demonstrations on customers' vehicles.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-bold text-white uppercase tracking-wider">
                    The booth may be used for:
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                    {[
                      '• Product display',
                      '• Customer inquiries',
                      '• Product demonstrations',
                      '• Sales and order processing',
                      '• Brand promotion',
                      '• Customer education about proper car care',
                    ].map((item, i) => (
                      <div key={i} className="p-2.5 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-300">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Controls & 3D Link */}
          <div className="border-t border-neutral-800 pt-6 mt-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-xl bg-neutral-800 text-neutral-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed font-medium text-xs transition-all flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Slide</span>
              </button>

              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-xl bg-neutral-800 text-neutral-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed font-medium text-xs transition-all flex items-center gap-1"
              >
                <span>Next Slide</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              {currentPage === 8 ? (
                <button
                  onClick={() => onSwitchTo3D('booth')}
                  className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs tracking-wider flex items-center gap-1.5 transition-all shadow-md"
                >
                  <Eye className="w-4 h-4" />
                  <span>VIEW 1.5x1m BOOTH IN 3D</span>
                </button>
              ) : currentPage === 6 || currentPage === 7 ? (
                <button
                  onClick={() => onSwitchTo3D('product')}
                  className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs tracking-wider flex items-center gap-1.5 transition-all shadow-md"
                >
                  <Eye className="w-4 h-4" />
                  <span>INSPECT PRODUCTS IN 3D</span>
                </button>
              ) : (
                <button
                  onClick={() => onSwitchTo3D('car')}
                  className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-bold text-xs tracking-wider flex items-center gap-1.5 transition-all"
                >
                  <Sparkles className="w-4 h-4 text-red-500" />
                  <span>3D CAR LAB EXPERIENCE</span>
                </button>
              )}

              <button
                onClick={onOpenInquiry}
                className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-bold text-xs tracking-wider transition-all"
              >
                Inquire Proposal
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
