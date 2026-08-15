import React, { useState } from 'react';
import { featuredProjects } from '../data/portfolioData';
import ProjectModal from './ProjectModal';
import { 
  FolderGit2, 
  ExternalLink, 
  Github, 
  Search, 
  ArrowRight
} from 'lucide-react';

export default function ProjectsShowcase() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalProject, setActiveModalProject] = useState(null);

  const categories = [
    'All',
    'AI & Deep Learning',
    'Full-Stack Web',
    'MLOps & Data',
    'Cyber Security'
  ];

  const filteredProjects = featuredProjects.filter((project) => {
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    const matchesSearch = 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-400/20 text-cyan-300 font-mono text-xs">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>03. FEATURED PORTFOLIO</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
            Engineered Works & <span className="text-gradient">AI Research</span>
          </h2>
          <p className="text-slate-400 max-w-2xl text-sm sm:text-base">
            Selected projects demonstrating proficiency in deep learning neural networks, production full-stack systems, NLP transformers, and MLOps automation.
          </p>

          <div className="w-full max-w-3xl space-y-4 pt-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search projects by technology (e.g. PyTorch, React, NLP, MLflow)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-900/80 border border-slate-800 focus:border-cyan-400 focus:outline-none text-sm text-white placeholder-slate-500 transition-all font-sans"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-white font-mono"
                >
                  CLEAR
                </button>
              )}
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="glass-card rounded-2xl overflow-hidden border-slate-800 hover:border-cyan-400/40 flex flex-col justify-between group transition-all duration-300"
            >
              <div>
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-950">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-[#0A192F]/30 to-transparent" />

                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full bg-slate-950/80 border border-cyan-500/30 text-cyan-300 font-mono text-[11px] backdrop-blur-md">
                      {project.category}
                    </span>
                  </div>

                  {project.badge && (
                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-300 font-mono text-[11px] backdrop-blur-md">
                        {project.badge}
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                    {project.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 line-clamp-3 leading-relaxed">
                    {project.summary}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.tags.slice(0, 4).map((tag, idx) => (
                      <span key={idx} className="tech-tag text-[11px]">
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className="tech-tag text-[11px] text-slate-400">
                        +{project.tags.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center justify-between border-t border-slate-800/80 mt-4 pt-4">
                <button
                  onClick={() => setActiveModalProject(project)}
                  className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold group/btn"
                >
                  <span>Architecture</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                </button>

                <div className="flex items-center gap-2">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-400/40 text-slate-400 hover:text-white transition-colors"
                    title="GitHub Repository"
                  >
                    <Github className="w-4 h-4" />
                  </a>

                  {project.liveUrl && project.liveUrl.startsWith('http') && !project.liveUrl.includes('github.com') && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-lg bg-cyan-950/80 border border-cyan-400/30 text-cyan-300 hover:text-white transition-colors"
                      title="Live Demo Preview"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16 glass-card rounded-2xl border-slate-800">
            <p className="text-slate-400 font-mono text-sm">No projects matching your filter criteria.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-4 btn-primary text-xs"
            >
              Reset Filters
            </button>
          </div>
        )}

        <div className="mt-14 text-center">
          <a
            href="https://github.com/nomanabdullah04?tab=repositories"
            target="_blank"
            rel="noreferrer"
            className="btn-primary inline-flex items-center gap-2 text-sm font-mono"
          >
            <Github className="w-4 h-4" />
            <span>View All Repositories on GitHub (18+)</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {activeModalProject && (
        <ProjectModal
          project={activeModalProject}
          onClose={() => setActiveModalProject(null)}
        />
      )}
    </section>
  );
}
