import React, { useState, useRef } from 'react';
import { personalInfo } from '../data/portfolioData';
import { 
  FileText, 
  Download, 
  Printer, 
  Eye,
  ExternalLink,
  Terminal,
  Sparkles,
  CheckCircle,
  ArrowUpRight,
  X,
  Maximize2,
  Minimize2
} from 'lucide-react';

export default function ResumeSection() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [downloadStarted, setDownloadStarted] = useState(false);
  const iframeRef = useRef(null);

  const resumeUrl = '/cv/resume.pdf';

  const handleDownload = () => {
    setDownloadStarted(true);
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = `${personalInfo.name.replace(/\s+/g, '_')}_Resume.pdf`;
    link.click();
    setTimeout(() => setDownloadStarted(false), 3000);
  };

  const handlePrint = () => {
    // Open the PDF in a new window and trigger print
    const printWindow = window.open(resumeUrl, '_blank');
    if (printWindow) {
      printWindow.addEventListener('load', () => {
        printWindow.print();
      });
    }
  };

  const handleViewInNewTab = () => {
    window.open(resumeUrl, '_blank');
  };

  return (
    <section id="resume" className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-orange-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/50 border border-amber-400/20 text-amber-300 font-mono text-xs">
            <FileText className="w-3.5 h-3.5" />
            <span>06. CURRICULUM VITAE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
            Download My <span className="text-gradient">Resume</span>
          </h2>
          <p className="text-slate-400 max-w-2xl text-sm sm:text-base">
            Get the full picture — download, view, or print my detailed CV with technical expertise, project portfolio, and academic background.
          </p>
        </div>

        {/* Resume Card */}
        <div className="max-w-4xl mx-auto">
          <div className="glass-card rounded-3xl overflow-hidden border-amber-500/20 shadow-2xl">
            {/* Card Header */}
            <div className="bg-stone-950/90 px-6 py-4 border-b border-stone-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                </div>
                <span className="text-xs font-mono text-slate-400">resume_viewer.tsx</span>
              </div>
              <span className="text-[10px] font-mono text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
                PDF DOCUMENT
              </span>
            </div>

            {/* Card Body */}
            <div className="p-6 sm:p-8 lg:p-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Left side - Info */}
                <div className="space-y-6">
                  {/* Resume icon & title */}
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400 flex-shrink-0 shadow-[0_0_20px_rgba(245,158,11,0.15)]">
                      <FileText className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-white">
                        {personalInfo.name}
                      </h3>
                      <p className="text-sm text-amber-300 font-mono mt-0.5">
                        Professional Resume / CV
                      </p>
                    </div>
                  </div>

                  {/* Resume highlights */}
                  <div className="space-y-2.5">
                    {[
                      'AI & Deep Learning Architecture',
                      'Full-Stack Web Development (React, Next.js, Django)',
                      'MLOps Pipeline Engineering (MLflow, DVC, BentoML)',
                      'Academic Background — CSE, Comilla University',
                      '29 Public GitHub Repositories & Projects'
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-sm text-slate-300">
                        <CheckCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* File info */}
                  <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                    <div className="p-3 rounded-xl bg-stone-900/60 border border-stone-800">
                      <span className="text-stone-500 block text-[10px] uppercase">Format</span>
                      <span className="text-slate-200">PDF Document</span>
                    </div>
                    <div className="p-3 rounded-xl bg-stone-900/60 border border-stone-800">
                      <span className="text-stone-500 block text-[10px] uppercase">Updated</span>
                      <span className="text-slate-200">2026</span>
                    </div>
                  </div>
                </div>

                {/* Right side - Action buttons */}
                <div className="space-y-4">
                  {/* Primary download button */}
                  <button
                    onClick={handleDownload}
                    className="w-full group relative overflow-hidden rounded-2xl p-[1px] bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.3)] hover:shadow-[0_0_45px_rgba(245,158,11,0.5)] transition-all duration-300"
                  >
                    <div className="relative rounded-2xl bg-stone-950 px-6 py-4 flex items-center justify-center gap-3 group-hover:bg-stone-900/90 transition-colors">
                      {downloadStarted ? (
                        <>
                          <CheckCircle className="w-5 h-5 text-emerald-400" />
                          <span className="text-emerald-400 font-bold text-sm">Download Started!</span>
                        </>
                      ) : (
                        <>
                          <Download className="w-5 h-5 text-amber-400 group-hover:animate-bounce" />
                          <span className="text-white font-bold text-sm">Download Resume (PDF)</span>
                          <ArrowUpRight className="w-4 h-4 text-amber-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </>
                      )}
                    </div>
                  </button>

                  {/* Secondary buttons */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={handlePrint}
                      className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-stone-900/80 border border-stone-700 hover:border-amber-400/40 text-stone-300 hover:text-amber-300 font-mono text-xs font-medium transition-all hover:bg-stone-800/80"
                    >
                      <Printer className="w-4 h-4" />
                      <span>Print CV</span>
                    </button>
                    <button
                      onClick={() => setIsPreviewOpen(true)}
                      className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-stone-900/80 border border-stone-700 hover:border-amber-400/40 text-stone-300 hover:text-amber-300 font-mono text-xs font-medium transition-all hover:bg-stone-800/80"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Preview</span>
                    </button>
                  </div>

                  {/* View in new tab */}
                  <button
                    onClick={handleViewInNewTab}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-stone-800 text-stone-400 hover:text-white hover:border-stone-600 font-mono text-xs transition-all"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Open in New Tab</span>
                  </button>

                  {/* Hiring CTA */}
                  <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-400/20 text-center space-y-2">
                    <div className="flex items-center justify-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span className="text-sm font-semibold text-amber-300">Interested in hiring?</span>
                    </div>
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-amber-400 hover:text-amber-300 transition-colors"
                    >
                      Let's connect
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ==================== PREVIEW MODAL ==================== */}
      {isPreviewOpen && (
        <div className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4">
          {/* Header */}
          <div className="w-full max-w-5xl flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <FileText className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-mono text-slate-300">Resume Preview</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleDownload}
                className="p-2 rounded-lg bg-stone-900/80 border border-stone-700 text-amber-400 hover:text-amber-300 hover:border-amber-400/50 transition-all"
                title="Download"
              >
                <Download className="w-4 h-4" />
              </button>
              <button
                onClick={handlePrint}
                className="p-2 rounded-lg bg-stone-900/80 border border-stone-700 text-stone-300 hover:text-white hover:border-stone-500 transition-all"
                title="Print"
              >
                <Printer className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="p-2 rounded-lg bg-stone-900/80 border border-stone-700 text-stone-300 hover:text-white hover:border-stone-500 transition-all"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* PDF Viewer */}
          <div className="w-full max-w-5xl flex-1 rounded-xl overflow-hidden border border-stone-800 bg-white shadow-2xl">
            <iframe
              ref={iframeRef}
              src={`${resumeUrl}#toolbar=1&navpanes=0`}
              title="Resume Preview"
              className="w-full h-full min-h-[70vh]"
              style={{ border: 'none' }}
            />
          </div>
        </div>
      )}
    </section>
  );
}
