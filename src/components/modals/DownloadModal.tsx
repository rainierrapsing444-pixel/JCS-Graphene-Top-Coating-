import React, { useState } from 'react';
import {
  X,
  Download,
  FileText,
  Camera,
  Code2,
  Printer,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  Copy,
  Check
} from 'lucide-react';
import { PDF_DATA } from '../../types/pdfData';
import { soundFX } from '../../utils/audio';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTriggerPrintPdf: () => void;
  onTrigger3DSnapshot?: () => void;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({
  isOpen,
  onClose,
  onTriggerPrintPdf,
  onTrigger3DSnapshot,
}) => {
  const [copiedCode, setCopiedCode] = useState(false);

  if (!isOpen) return null;

  // Function to download the complete proposal text as Markdown
  const handleDownloadMarkdown = () => {
    soundFX.playClick(750);
    const content = `# JCS-AVIOR CARCARE TRADING
## Brand: JCS Car Solution
**Presented by:** ${PDF_DATA.header.presentedBy}
**Year:** ${PDF_DATA.header.year}
**Type:** ${PDF_DATA.header.businessType} (Established ${PDF_DATA.header.establishedYear})
**Associated Venture:** Barbershop with 3 Branches | 40% Stake in Gorilla Wax

---

### I. EXECUTIVE SUMMARY
${PDF_DATA.executiveSummary.paragraphs.join('\n\n')}

---

### II. BUSINESS PROFILE
- **Registered Business Name:** ${PDF_DATA.businessProfile.details[0].value}
- **Brand / Trade Name:** ${PDF_DATA.businessProfile.details[1].value}
- **Type of Business:** ${PDF_DATA.businessProfile.details[2].value}
- **Main Business:** ${PDF_DATA.businessProfile.details[3].value}
- **Other Business:** ${PDF_DATA.businessProfile.details[4].value}
- **Business Established:** ${PDF_DATA.businessProfile.details[5].value}

---

### III. OWNER BACKGROUND
**Name:** ${PDF_DATA.ownerBackground.name} (${PDF_DATA.ownerBackground.age})
**Education:** ${PDF_DATA.ownerBackground.education}
**Summary:** ${PDF_DATA.ownerBackground.summary}

#### Career Milestones:
${PDF_DATA.ownerBackground.timeline.map((t) => `- **${t.year} - ${t.title} (${t.role}):** ${t.description}`).join('\n')}

---

### IV. BUSINESS DESCRIPTION
${PDF_DATA.businessDescription.statement}

Core Pillars:
${PDF_DATA.businessDescription.pillars.map((p) => `- **${p.title}:** ${p.desc}`).join('\n')}

---

### V. PRODUCTS AND SERVICES
${PDF_DATA.products.map((p, idx) => `
#### ${idx + 1}. ${p.name.toUpperCase()}
- **Category:** ${p.category}
- **Description:** ${p.description}
- **Key Advantages:**
${p.bulletPoints.map((b) => `  * ${b}`).join('\n')}
`).join('\n')}

---

### VI. PRICING AND PACKAGE OPTIONS
${PDF_DATA.pricingPackages.map((pkg) => `
#### ${pkg.name} — ₱${pkg.price.toLocaleString()}
${pkg.description}
- **Target:** ${pkg.recommendedFor}
- **Includes:**
${pkg.features.map((f) => `  * ${f}`).join('\n')}
`).join('\n')}

---

### VII. PROPOSED BOOTH AND AREA REQUIREMENT
- **Footprint:** ${PDF_DATA.boothRequirements.footprint}
- **Preferred Location:** ${PDF_DATA.boothRequirements.preferredLocation}
- **Parking Bay Requirement:** ${PDF_DATA.boothRequirements.parkingAccess}

Core Functions:
${PDF_DATA.boothRequirements.boothFunctions.map((fn) => `- **${fn.title}:** ${fn.description}`).join('\n')}

---
© 2026 JCS-AVIOR CarCare Trading. All Rights Reserved.
`;

    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `JCS-Car-Solution-Proposal-2026.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyCodeSnippet = () => {
    soundFX.playClick(600);
    navigator.clipboard.writeText('git clone <YOUR_REPO_URL>');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-700 rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 via-rose-700 to-neutral-950 px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-black/40 rounded-xl text-white">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-white font-extrabold text-lg font-heading tracking-wide">
                DOWNLOAD & EXPORT OPTIONS
              </h3>
              <p className="text-red-100 text-xs">
                JCS-AVIOR CarCare Trading • Proposal & 3D Interactive Assets
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-black/30 hover:bg-black/60 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Options List */}
        <div className="p-6 sm:p-8 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Option 1: Save Proposal as PDF via Print */}
          <div className="bg-neutral-950 border border-neutral-800 hover:border-red-500/60 p-5 rounded-2xl transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group">
            <div className="flex items-start gap-3.5">
              <div className="p-3 rounded-xl bg-red-600/10 text-red-500 border border-red-500/20 group-hover:scale-105 transition-transform">
                <Printer className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-white font-bold text-base font-heading">
                    1. Save Official Proposal as PDF
                  </h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-500/20 text-red-400">
                    Recommended
                  </span>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Opens browser print dialog pre-configured to save all 8 pages as a crisp, formatted PDF document with zero ink waste.
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                soundFX.playClick(750);
                onTriggerPrintPdf();
              }}
              className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs tracking-wider shrink-0 shadow-lg shadow-red-900/30 flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <Printer className="w-4 h-4" />
              <span>PRINT / SAVE PDF</span>
            </button>
          </div>

          {/* Option 2: Download Markdown Transcript */}
          <div className="bg-neutral-950 border border-neutral-800 hover:border-neutral-700 p-5 rounded-2xl transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group">
            <div className="flex items-start gap-3.5">
              <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 group-hover:scale-105 transition-transform">
                <FileText className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-white font-bold text-base font-heading">
                  2. Download Proposal Document (.md)
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Instant plain-text & Markdown file containing all executive summaries, product descriptions, pricing, and owner background.
                </p>
              </div>
            </div>

            <button
              onClick={handleDownloadMarkdown}
              className="px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs tracking-wider shrink-0 border border-neutral-700 flex items-center justify-center gap-2 transition-all"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <span>DOWNLOAD .MD</span>
            </button>
          </div>

          {/* Option 3: Capture 3D Snapshot */}
          {onTrigger3DSnapshot && (
            <div className="bg-neutral-950 border border-neutral-800 hover:border-neutral-700 p-5 rounded-2xl transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group">
              <div className="flex items-start gap-3.5">
                <div className="p-3 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20 group-hover:scale-105 transition-transform">
                  <Camera className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-white font-bold text-base font-heading">
                    3. Capture High-Res 3D Photo (PNG)
                  </h4>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Saves an instant ultra high-resolution screenshot of the currently active 3D camera angle (Booth, Car Lab, or Product Bottles).
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  soundFX.playClick(850);
                  onTrigger3DSnapshot();
                }}
                className="px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs tracking-wider shrink-0 border border-neutral-700 flex items-center justify-center gap-2 transition-all"
              >
                <Camera className="w-4 h-4 text-sky-400" />
                <span>SAVE 3D PNG</span>
              </button>
            </div>
          )}

          {/* Option 4: Website Source Code & AI Studio Export */}
          <div className="bg-neutral-950 border border-neutral-800 p-5 rounded-2xl space-y-3">
            <div className="flex items-start gap-3.5">
              <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <Code2 className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-white font-bold text-base font-heading">
                  4. How to Download the Website Codebase
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  You can export and run this entire React + Three.js application locally on your computer:
                </p>
              </div>
            </div>

            <div className="bg-neutral-900 p-3.5 rounded-xl border border-neutral-800 text-xs text-neutral-300 space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  <strong>In Google AI Studio Build UI:</strong> Click the top-right <strong>Export / GitHub</strong> button or download the project archive.
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  <strong>To run locally:</strong> Run <code className="bg-neutral-950 px-1.5 py-0.5 rounded text-red-400 font-mono">npm install</code> followed by <code className="bg-neutral-950 px-1.5 py-0.5 rounded text-red-400 font-mono">npm run dev</code>.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-neutral-950 border-t border-neutral-800 px-6 py-4 flex items-center justify-between text-xs text-neutral-500">
          <span>Official 2026 Commercial Presentation Assets</span>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
