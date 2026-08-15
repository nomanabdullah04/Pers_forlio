import React, { useEffect } from 'react';
import { 
  X, 
  ExternalLink, 
  Github, 
  Code2, 
  Zap
} from 'lucide-react';

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
      />

      <div className="relative w-full max-w-3xl bg-[#0A192F] border border-cyan-500/30 rounded-2xl shadow-2xl shadow-cyan-950/60 overflow-hidden z-10 my-8 animate-in zoom-in-95 duration-200">
        <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-950">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover opacity-80 hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-[#0A192F]/40 to-transparent" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition-colors z-20"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 rounded-full bg-cyan-950/90 border border-cyan-400/40 text-cyan-300 font-mono text-xs font-semibold backdrop-blur-md">
              {project.category}
            </span>
          </div>

          <div className="absolute bottom-4 left-6 right-6">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight drop-shadow-md">
              {project.title}
            </h3>
            {project.badge && (
              <span className="inline-block mt-1 text-xs font-mono text-cyan-300">
                ★ {project.badge}
              </span>
            )}
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400">Overview</h4>
            <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
              {project.description}
            </p>
          </div>

          {project.metrics && (
            <div className="p-4 rounded-xl bg-slate-900/70 border border-cyan-500/20 flex items-center gap-3 text-cyan-300 text-sm">
              <Zap className="w-5 h-5 flex-shrink-0 text-cyan-400" />
              <span><strong>Key Metric / Impact:</strong> {project.metrics}</span>
            </div>
          )}

          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">Technologies & Frameworks</h4>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, i) => (
                <span key={i} className="tech-tag text-xs">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2 font-mono text-xs text-slate-300">
            <div className="flex items-center gap-2 text-cyan-400 font-bold">
              <Code2 className="w-4 h-4" />
              <span>Architectural Specifications</span>
            </div>
            <p className="text-slate-400">
              • Repository: <span className="text-white">github.com/nomanabdullah04/{project.id}</span>
            </p>
            <p className="text-slate-400">
              • Clean modular structure with high test coverage and reproducible pipeline design.
            </p>
          </div>
        </div>

        <div className="p-6 bg-slate-950/90 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {project.liveUrl && project.liveUrl.startsWith('http') && !project.liveUrl.includes('github.com') && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-solid py-2.5 px-5 text-xs font-sans font-bold"
              >
                <span>Launch Live Preview</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-primary py-2.5 px-4 text-xs font-mono"
            >
              <Github className="w-4 h-4" />
              <span>View GitHub Repo</span>
            </a>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white text-xs font-mono transition-colors"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
}
