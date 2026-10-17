import React from 'react';
import {
  GraduationCap,
  ShoppingBag,
  Flame,
  Briefcase,
  TrendingUp,
  Scissors,
  Rocket,
  User,
  Award,
  CheckCircle2
} from 'lucide-react';
import { PDF_DATA } from '../../types/pdfData';

export const OwnerTimelineSection: React.FC = () => {
  const { ownerBackground } = PDF_DATA;

  const getIcon = (type: string) => {
    switch (type) {
      case 'college':
        return <GraduationCap className="w-5 h-5 text-sky-400" />;
      case 'retail':
        return <ShoppingBag className="w-5 h-5 text-amber-400" />;
      case 'food':
        return <Flame className="w-5 h-5 text-orange-400" />;
      case 'medrep':
        return <Briefcase className="w-5 h-5 text-emerald-400" />;
      case 'car':
        return <TrendingUp className="w-5 h-5 text-red-500" />;
      case 'barbershop':
        return <Scissors className="w-5 h-5 text-indigo-400" />;
      case 'launch':
      default:
        return <Rocket className="w-5 h-5 text-red-500" />;
    }
  };

  return (
    <section id="owner-story" className="py-16 bg-neutral-950 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-red-500 uppercase tracking-widest mb-1.5">
              <User className="w-4 h-4" />
              <span>SECTION {ownerBackground.sectionNum} • FOUNDER PROFILE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white font-heading">
              Owner Background & Entrepreneurial Journey
            </h2>
          </div>
          <div className="text-xs font-medium text-neutral-400 bg-neutral-900 px-3.5 py-2 rounded-xl border border-neutral-800">
            Source: <span className="text-neutral-200">PDF Document Page 4</span>
          </div>
        </div>

        {/* Bio Card & Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Profile Card */}
          <div className="lg:col-span-5 bg-gradient-to-b from-neutral-900 to-neutral-950 border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-4">
              {/* Avatar placeholder with high-end automotive styling */}
              <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-red-600 to-neutral-800 p-0.5 shadow-xl">
                <div className="w-full h-full bg-neutral-900 rounded-[14px] flex items-center justify-center overflow-hidden">
                  <div className="text-center">
                    <User className="w-8 h-8 text-red-400 mx-auto" />
                    <span className="text-[9px] font-black text-white font-heading">JCS</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-black text-white font-heading">
                  {ownerBackground.name}
                </h3>
                <p className="text-xs font-bold text-red-400 uppercase tracking-wider">
                  {ownerBackground.age} • Founder & Sole Proprietor
                </p>
                <p className="text-xs text-neutral-400 mt-0.5">
                  {ownerBackground.education}
                </p>
              </div>
            </div>

            <p className="text-sm text-neutral-300 leading-relaxed italic border-l-2 border-red-500 pl-4 py-1">
              "{ownerBackground.summary}"
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
              <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                <div className="text-[10px] text-neutral-500 uppercase font-semibold">Gorilla Wax Stake</div>
                <div className="text-xl font-black text-red-400 font-heading">40% Ownership</div>
                <div className="text-[11px] text-neutral-400">Strategic Stockholder</div>
              </div>
              <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                <div className="text-[10px] text-neutral-500 uppercase font-semibold">Salon Enterprise</div>
                <div className="text-xl font-black text-indigo-400 font-heading">3 Branches</div>
                <div className="text-[11px] text-neutral-400">Est. 2022, 2023, 2024</div>
              </div>
            </div>
          </div>

          {/* Key Executive Experience Highlights */}
          <div className="lg:col-span-7 space-y-4">
            <h4 className="text-base font-bold text-white font-heading flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              Strategic Qualifications & Sector Leadership
            </h4>

            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800/80 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-red-600/10 border border-red-500/20 text-red-400 mt-0.5">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-sm font-bold text-white">Automotive Chemical Industry Experience</h5>
                  <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                    Direct strategic involvement as a 40% stockholder in Gorilla Wax gave John Christopher Soler first-hand mastery of formulation efficacy, car detailing consumer behavior, and distribution logistics.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800/80 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-sky-600/10 border border-sky-500/20 text-sky-400 mt-0.5">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-sm font-bold text-white">4 Years in Mall Retail Operations (2015–2019)</h5>
                  <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                    Extensive experience managing mall traffic, kiosk merchandising, and customer conversion. Invaluable knowledge for optimizing the proposed 1.5m x 1m mall entrance booth.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800/80 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-emerald-600/10 border border-emerald-500/20 text-emerald-400 mt-0.5">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-sm font-bold text-white">Proven Multi-Unit Scaler (Barbershop Expansion)</h5>
                  <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                    Successfully established and scaled a multi-location personal service enterprise across 2022, 2023, and 2024, demonstrating disciplined operational governance and cash-flow management.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Timeline Steps from Page 4 */}
        <div className="pt-8">
          <h4 className="text-lg font-bold text-white font-heading mb-8 text-center sm:text-left">
            Chronological Career Narrative (2015 – 2026)
          </h4>

          <div className="relative border-l-2 border-neutral-800 ml-4 sm:ml-8 space-y-8 pl-6 sm:pl-8">
            {ownerBackground.timeline.map((step, idx) => (
              <div key={idx} className="relative group">
                {/* Node icon */}
                <div className="absolute -left-[37px] sm:-left-[45px] top-1 w-9 h-9 rounded-full bg-neutral-900 border-2 border-neutral-700 group-hover:border-red-500 flex items-center justify-center transition-colors shadow-lg">
                  {getIcon(step.iconType)}
                </div>

                <div className="bg-neutral-900/70 border border-neutral-800 rounded-xl p-4 sm:p-5 hover:border-neutral-700 transition-all space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-red-500 font-mono tracking-wider">
                        {step.year}
                      </span>
                      <span className="text-white font-bold text-sm sm:text-base font-heading">
                        {step.title}
                      </span>
                    </div>
                    {step.highlight && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-600/20 text-red-400 border border-red-500/30">
                        {step.highlight}
                      </span>
                    )}
                  </div>

                  <div className="text-xs font-semibold text-neutral-300">
                    {step.role}
                  </div>

                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
