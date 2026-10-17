import React from 'react';
import { FileText, CheckCircle2, Building2, Store, Sparkles, TrendingUp, ShieldCheck } from 'lucide-react';
import { PDF_DATA } from '../../types/pdfData';

export const ExecutiveSummarySection: React.FC = () => {
  const { executiveSummary, businessProfile, businessDescription } = PDF_DATA;

  return (
    <section id="executive-summary" className="py-16 bg-neutral-900/40 border-t border-b border-neutral-800 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-red-500 uppercase tracking-widest mb-1.5">
              <FileText className="w-4 h-4" />
              <span>SECTION {executiveSummary.sectionNum} & {businessDescription.sectionNum} • COMMERCIAL PROPOSAL</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white font-heading">
              Executive Summary & Business Profile
            </h2>
          </div>
          <div className="text-xs font-medium text-neutral-400 bg-neutral-950 px-3.5 py-2 rounded-xl border border-neutral-800">
            Source: <span className="text-neutral-200">PDF Document Pages 2, 3 & 5</span>
          </div>
        </div>

        {/* 2-Column Grid: Executive Narrative & Business Profile Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Executive Summary Narrative (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-5 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-red-600 to-rose-700" />
              <h3 className="text-xl font-bold text-white font-heading flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-red-500" />
                Strategic Mission & Deployment
              </h3>

              <div className="space-y-4 text-sm sm:text-base text-neutral-300 leading-relaxed">
                {executiveSummary.paragraphs.map((p, idx) => (
                  <p key={idx} className={idx === 0 ? 'text-white font-medium text-base' : 'text-neutral-300'}>
                    {p}
                  </p>
                ))}
              </div>

              {/* Key Objectives checklist */}
              <div className="pt-4 border-t border-neutral-800/80 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="flex items-start gap-2 text-neutral-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Increase automotive brand awareness</span>
                </div>
                <div className="flex items-start gap-2 text-neutral-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Direct vehicle owner live demonstrations</span>
                </div>
                <div className="flex items-start gap-2 text-neutral-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Demonstrate instant waterless effectiveness</span>
                </div>
                <div className="flex items-start gap-2 text-neutral-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Establish solid mall retail presence</span>
                </div>
              </div>
            </div>

            {/* Core Pillars from Page 5 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {businessDescription.pillars.map((pillar, idx) => (
                <div key={idx} className="bg-neutral-950 p-4 rounded-xl border border-neutral-800/80 space-y-1.5">
                  <div className="text-sm font-bold text-white font-heading flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                    {pillar.title}
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Business Profile Specification (5 cols) */}
          <div id="business-profile" className="lg:col-span-5 space-y-6 scroll-mt-24">
            <div className="bg-gradient-to-br from-neutral-900 via-neutral-900 to-neutral-950 border border-neutral-700/80 rounded-2xl p-6 sm:p-7 shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-red-600/20 text-red-500 rounded-xl border border-red-500/30">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-red-400">
                      SECTION II
                    </span>
                    <h3 className="text-lg font-black text-white font-heading">
                      Business Profile
                    </h3>
                  </div>
                </div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Verified Entity
                </span>
              </div>

              {/* Data Table from PDF Page 3 */}
              <div className="divide-y divide-neutral-800/80 text-xs">
                {businessProfile.details.map((item, idx) => (
                  <div key={idx} className="py-3 flex items-start justify-between gap-4">
                    <span className="text-neutral-400 font-medium">{item.label}</span>
                    <span className="text-white font-bold text-right font-mono sm:font-sans">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Key Highlights Card */}
              <div className="bg-neutral-950/80 rounded-xl p-4 border border-neutral-800 space-y-3">
                <div className="text-xs font-bold text-neutral-300 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-red-500" />
                  Operational Credibility
                </div>
                <div className="space-y-2 text-xs text-neutral-400">
                  <p>
                    • Backed by proven retail scaling, multi-branch barbershop governance, and formulation experience with <strong className="text-white">Gorilla Wax</strong>.
                  </p>
                  <p>
                    • Ultra-lean footprint requiring merely <strong className="text-red-400">1.5 × 1 square meters</strong> of commercial floor space.
                  </p>
                </div>
              </div>

              {/* Founder Tag */}
              <div className="pt-2 flex items-center justify-between text-xs text-neutral-500 border-t border-neutral-800">
                <span>Founder & Sole Proprietor:</span>
                <span className="font-bold text-neutral-200">John Christopher Soler</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
