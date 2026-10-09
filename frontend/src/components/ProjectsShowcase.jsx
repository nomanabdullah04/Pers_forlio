import React, { useState } from 'react';
import { featuredProjects, allGithubRepositories } from '../data/portfolioData';
import ProjectModal from './ProjectModal';
import { 
  FolderGit2, 
  ExternalLink, 
  Github, 
  Search, 
  ArrowRight,
  Sparkles,
  GitFork,
  Star,
  Code2,
  Calendar,
  Layers
} from 'lucide-react';

const languageColors = {
  TypeScript: 'bg-blue-400',
  JavaScript: 'bg-yellow-400',
  Python: 'bg-emerald-400',
  'Jupyter Notebook': 'bg-orange-400',
  'C++': 'bg-pink-400',
  SQL: 'bg-cyan-400',
  HTML: 'bg-red-400',
  'HTML / CSS': 'bg-purple-400',
  'HTML / Python': 'bg-amber-400',
  Dockerfile: 'bg-sky-400',
  Markdown: 'bg-slate-400'
};

export default function ProjectsShowcase() {
  const [viewMode, setViewMode] = useState('featured'); // 'featured' | 'all-repos'
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalProject, setActiveModalProject] = useState(null);

  const featuredCategories = [
    'All',
    'Full-Stack Web',
    'AI & Deep Learning',
    'MLOps & Data',
    'Database & Systems',
    'Competitive Programming',
    'Cyber Security'
  ];

  const repoLanguages = [
    'All',
    'TypeScript',
    'JavaScript',
    'Python',
    'Jupyter Notebook',
    'SQL',
    'C++',
    'HTML / CSS'
  ];

  const filteredFeatured = featuredProjects.filter((project) => {
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    const matchesSearch = 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const filteredRepos = allGithubRepositories.filter((repo) => {
    const matchesLang = 
      selectedLanguage === 'All' || 
      repo.language.toLowerCase().includes(selectedLanguage.toLowerCase()) ||
      repo.tags.some(t => t.toLowerCase().includes(selectedLanguage.toLowerCase()));

    const matchesSearch = 
      repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      repo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      repo.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      repo.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesLang && matchesSearch;
  });

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/50 border border-amber-400/20 text-amber-300 font-mono text-xs">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>03. GITHUB REPOSITORIES & ARCHITECTURES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
            Engineered Works & <span className="text-gradient">GitHub Ecosystem</span>
          </h2>
          <p className="text-slate-400 max-w-2xl text-sm sm:text-base">
            Exploring 29 public repositories across deep learning transformers, Next.js 16 campus platforms, reproducible MLOps, and algorithmic C++ problem solving.
          </p>

          {/* View Mode Toggle */}
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl mt-4">
            <button
              onClick={() => {
                setViewMode('featured');
                setSelectedCategory('All');
              }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-mono font-medium transition-all ${
                viewMode === 'featured'
                  ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border border-amber-400/40 shadow-[0_0_15px_rgba(245,158,11,0.25)] font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Flagship Spotlight ({featuredProjects.length})</span>
            </button>
            <button
              onClick={() => {
                setViewMode('all-repos');
                setSelectedLanguage('All');
              }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-mono font-medium transition-all ${
                viewMode === 'all-repos'
                  ? 'bg-gradient-to-r from-orange-500/20 to-yellow-500/20 text-orange-300 border border-orange-400/40 shadow-[0_0_15px_rgba(251,146,60,0.25)] font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              <Github className="w-4 h-4 text-orange-400" />
              <span>All 29 GitHub Repositories</span>
              <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-orange-950 text-orange-300 border border-orange-500/40">
                LIVE
              </span>
            </button>
          </div>

          {/* Search & Filters */}
          <div className="w-full max-w-3xl space-y-4 pt-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder={
                  viewMode === 'featured'
                    ? "Search projects by technology (e.g. Next.js, PyTorch, Transformers, MLOps)..."
                    : "Search all 29 repositories (e.g. CoU-DineX, LSTM, SQL, Docker, Codeforces)..."
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-stone-900/80 border border-stone-800 focus:border-amber-400 focus:outline-none text-sm text-white placeholder-stone-500 transition-all font-sans"
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

            {viewMode === 'featured' ? (
              <div className="flex flex-wrap justify-center gap-2">
                {featuredCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap justify-center gap-2">
                {repoLanguages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setSelectedLanguage(lang)}
                    className={`filter-btn ${selectedLanguage === lang ? 'active' : ''}`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* View Mode 1: FEATURED SPOTLIGHT CARDS */}
        {viewMode === 'featured' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFeatured.map((project) => (
              <div
                key={project.id}
                className="glass-card rounded-2xl overflow-hidden border-stone-800 hover:border-amber-400/40 flex flex-col justify-between group transition-all duration-300"
              >
                <div>
                  <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-950">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-95"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0E] via-[#0C0C0E]/30 to-transparent" />

                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full bg-stone-950/80 border border-amber-500/30 text-amber-300 font-mono text-[11px] backdrop-blur-md">
                        {project.category}
                      </span>
                    </div>

                    {project.badge && (
                      <div className="absolute top-3 right-3">
                        <span className="px-2.5 py-1 rounded-full bg-orange-950/80 border border-orange-500/40 text-orange-300 font-mono text-[11px] backdrop-blur-md">
                          {project.badge}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-amber-300 transition-colors leading-snug">
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
                    className="text-xs font-mono text-amber-400 hover:text-amber-300 flex items-center gap-1 font-semibold group/btn"
                  >
                    <span>Architecture</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                  </button>

                  <div className="flex items-center gap-2">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-lg bg-stone-900 border border-stone-800 hover:border-amber-400/40 text-stone-400 hover:text-white transition-colors"
                      title="GitHub Repository"
                    >
                      <Github className="w-4 h-4" />
                    </a>

                    {project.liveUrl && project.liveUrl.startsWith('http') && !project.liveUrl.includes('github.com') && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-lg bg-amber-950/80 border border-amber-400/30 text-amber-300 hover:text-white transition-colors"
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
        )}

        {/* View Mode 2: ALL 29 GITHUB REPOSITORIES BROWSER */}
        {viewMode === 'all-repos' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between px-2 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-2">
                <Github className="w-4 h-4 text-purple-400" />
                <span>Showing {filteredRepos.length} of {allGithubRepositories.length} repositories from <a href="https://github.com/nomanabdullah04" target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">github.com/nomanabdullah04</a></span>
              </span>
              <span className="hidden sm:inline-block text-slate-500">Live API Sync</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredRepos.map((repo) => {
                const dotColor = languageColors[repo.language] || 'bg-cyan-400';
                return (
                  <div
                    key={repo.id}
                    className="glass-card p-5 rounded-2xl border-stone-800 hover:border-amber-400/40 transition-all duration-300 flex flex-col justify-between group hover:shadow-[0_0_20px_rgba(245,158,11,0.15)]"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <FolderGit2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                          <a
                            href={repo.htmlUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="font-mono text-sm font-bold text-white group-hover:text-amber-300 hover:underline break-all"
                          >
                            {repo.name}
                          </a>
                        </div>
                        <a
                          href={repo.htmlUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-lg bg-stone-900 border border-stone-800 text-stone-400 group-hover:text-white transition-colors"
                          title="Open on GitHub"
                        >
                          <Github className="w-3.5 h-3.5" />
                        </a>
                      </div>

                      <h4 className="text-xs font-semibold text-slate-200">
                        {repo.title}
                      </h4>

                      <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                        {repo.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {repo.tags.slice(0, 3).map((tag, i) => (
                          <span key={i} className="tech-tag text-[10px] py-0.5 px-2">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 mt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${dotColor}`} />
                        <span>{repo.language}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        {repo.homepage && (
                          <a
                            href={repo.homepage}
                            target="_blank"
                            rel="noreferrer"
                            className="text-amber-400 hover:text-amber-300 inline-flex items-center gap-0.5"
                            title="Live Demo"
                          >
                            <ExternalLink className="w-3 h-3" />
                            <span>Demo</span>
                          </a>
                        )}
                        <span className="text-slate-500">{repo.updatedAt}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Empty State */}
        {((viewMode === 'featured' && filteredFeatured.length === 0) ||
          (viewMode === 'all-repos' && filteredRepos.length === 0)) && (
          <div className="text-center py-16 glass-card rounded-2xl border-slate-800">
            <p className="text-slate-400 font-mono text-sm">No repositories matching your filter criteria.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedLanguage('All');
                setSearchQuery('');
              }}
              className="mt-4 btn-primary text-xs"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* GitHub External Banner */}
        <div className="mt-14 text-center">
          <a
            href="https://github.com/nomanabdullah04?tab=repositories"
            target="_blank"
            rel="noreferrer"
            className="btn-primary inline-flex items-center gap-2 text-sm font-mono"
          >
            <Github className="w-4 h-4" />
            <span>Explore All 29 Repositories on GitHub Profile</span>
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
