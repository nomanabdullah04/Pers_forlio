import React, { useState, useMemo } from 'react';
import { skillCategories } from '../data/portfolioData';
import { 
  Code2, 
  BrainCircuit, 
  Sparkles, 
  Cpu, 
  ShieldCheck, 
  Network, 
  Activity, 
  GitBranch, 
  Boxes, 
  FileCode, 
  Database, 
  Atom, 
  Palette, 
  Server, 
  Box, 
  Workflow, 
  Lock, 
  GitFork, 
  Terminal, 
  Cloud,
  Search,
  Zap,
  Grid,
  Hexagon,
  CheckCircle2,
  Sliders,
  Layers,
  ChevronRight,
  TrendingUp
} from 'lucide-react';

const iconMap = {
  Code2,
  BrainCircuit,
  Sparkles,
  Cpu,
  ShieldCheck,
  Network,
  Activity,
  GitBranch,
  Boxes,
  FileCode,
  Database,
  Atom,
  Palette,
  Server,
  Box,
  Workflow,
  Lock,
  GitFork,
  Terminal,
  Cloud
};

const tierStyles = {
  Master: {
    bg: 'bg-emerald-950/80',
    border: 'border-emerald-400/40',
    text: 'text-emerald-300',
    glow: 'shadow-[0_0_12px_rgba(52,211,153,0.35)]',
    dot: 'bg-emerald-400'
  },
  Expert: {
    bg: 'bg-cyan-950/80',
    border: 'border-cyan-400/40',
    text: 'text-cyan-300',
    glow: 'shadow-[0_0_12px_rgba(100,255,218,0.35)]',
    dot: 'bg-cyan-400'
  },
  Advanced: {
    bg: 'bg-purple-950/80',
    border: 'border-purple-400/40',
    text: 'text-purple-300',
    glow: 'shadow-[0_0_12px_rgba(168,85,247,0.35)]',
    dot: 'bg-purple-400'
  }
};

export default function SkillsMatrix() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [viewMode, setViewMode] = useState('matrix');

  const categories = [
    { id: 'all', label: 'All Domains' },
    { id: 'ai-ml', label: 'AI & Deep Learning' },
    { id: 'mlops', label: 'MLOps & Pipelines' },
    { id: 'fullstack', label: 'Full-Stack Architecture' },
    { id: 'database-tools', label: 'Security & Cloud' }
  ];

  const filteredCategories = useMemo(() => {
    let result = skillCategories;

    if (activeCategory !== 'all') {
      result = result.filter(cat => cat.id === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.map(cat => {
        const matchingSkills = cat.skills.filter(s => 
          s.name.toLowerCase().includes(q) ||
          (s.tags && s.tags.some(t => t.toLowerCase().includes(q))) ||
          (s.tier && s.tier.toLowerCase().includes(q))
        );
        return { ...cat, skills: matchingSkills };
      }).filter(cat => cat.skills.length > 0);
    }

    return result;
  }, [activeCategory, searchQuery]);

  const allSkillsList = useMemo(() => {
    return skillCategories.flatMap(cat => cat.skills.map(s => ({ ...s, categoryTitle: cat.title, glowColor: cat.glowColor })));
  }, []);

  const totalSkillsCount = allSkillsList.length;

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-gradient-to-b from-[#0A192F] via-[#050C1A] to-[#0A192F]">
      <div className="absolute top-1/4 -right-20 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-blue-600/[0.02] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col items-center text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-400/30 text-cyan-300 font-mono text-xs shadow-[0_0_15px_rgba(100,255,218,0.15)]">
            <Cpu className="w-3.5 h-3.5 text-cyan-400 animate-spin [animation-duration:8s]" />
            <span>02. TECHNICAL ARSENAL & CAPABILITIES</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            High-Performance <span className="text-gradient">Skill Engine</span>
          </h2>

          <p className="text-slate-400 max-w-2xl text-xs sm:text-sm md:text-base leading-relaxed">
            Multi-disciplinary technical competencies organized across deep neural architectures, continuous MLOps pipelines, high-throughput full-stack platforms, and cyber infrastructure.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full max-w-4xl pt-4">
            <div className="p-3.5 rounded-2xl bg-[#060e1e]/90 border border-cyan-500/20 backdrop-blur-md text-left flex items-center justify-between group hover:border-cyan-400/50 transition-all shadow-lg">
              <div>
                <span className="text-[10px] sm:text-xs font-mono text-slate-400 block uppercase">Core Techs</span>
                <span className="text-lg sm:text-2xl font-bold font-mono text-white text-gradient-cyan">{totalSkillsCount}+</span>
              </div>
              <div className="w-8 h-8 rounded-xl bg-cyan-950/80 border border-cyan-400/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                <Code2 className="w-4 h-4" />
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#060e1e]/90 border border-purple-500/20 backdrop-blur-md text-left flex items-center justify-between group hover:border-purple-400/50 transition-all shadow-lg">
              <div>
                <span className="text-[10px] sm:text-xs font-mono text-slate-400 block uppercase">ML Architectures</span>
                <span className="text-lg sm:text-2xl font-bold font-mono text-white text-gradient">14+</span>
              </div>
              <div className="w-8 h-8 rounded-xl bg-purple-950/80 border border-purple-400/30 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                <BrainCircuit className="w-4 h-4" />
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#060e1e]/90 border border-blue-500/20 backdrop-blur-md text-left flex items-center justify-between group hover:border-blue-400/50 transition-all shadow-lg">
              <div>
                <span className="text-[10px] sm:text-xs font-mono text-slate-400 block uppercase">Avg Benchmark</span>
                <span className="text-lg sm:text-2xl font-bold font-mono text-white text-cyan-300">92.4%</span>
              </div>
              <div className="w-8 h-8 rounded-xl bg-blue-950/80 border border-blue-400/30 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#060e1e]/90 border border-emerald-500/20 backdrop-blur-md text-left flex items-center justify-between group hover:border-emerald-400/50 transition-all shadow-lg">
              <div>
                <span className="text-[10px] sm:text-xs font-mono text-slate-400 block uppercase">Code Reliability</span>
                <span className="text-lg sm:text-2xl font-bold font-mono text-emerald-400">100%</span>
              </div>
              <div className="w-8 h-8 rounded-xl bg-emerald-950/80 border border-emerald-400/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
          </div>

          <div className="w-full max-w-4xl space-y-4 pt-4">
            <div className="flex flex-col md:flex-row items-center gap-3 justify-between">
              <div className="relative w-full md:max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter skills (e.g. PyTorch, React, NLP, DVC, Master)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-8 py-2.5 rounded-full bg-[#060e1e]/90 border border-slate-800 focus:border-cyan-400 focus:outline-none text-xs sm:text-sm text-white placeholder-slate-500 transition-all font-sans"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] font-mono text-slate-400 hover:text-white"
                  >
                    ✕
                  </button>
                )}
              </div>

              <div className="flex items-center gap-1.5 p-1 rounded-full bg-slate-950/80 border border-slate-800">
                <button
                  onClick={() => setViewMode('matrix')}
                  className={`px-3 py-1.5 rounded-full text-xs font-mono flex items-center gap-1.5 transition-all ${
                    viewMode === 'matrix'
                      ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/40 shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Grid className="w-3.5 h-3.5" />
                  <span>Cyber Bento</span>
                </button>

                <button
                  onClick={() => setViewMode('honeycomb')}
                  className={`px-3 py-1.5 rounded-full text-xs font-mono flex items-center gap-1.5 transition-all ${
                    viewMode === 'honeycomb'
                      ? 'bg-purple-500/20 text-purple-300 font-semibold border border-purple-500/40 shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Hexagon className="w-3.5 h-3.5" />
                  <span>Quantum Grid</span>
                </button>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-2 pt-1">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`filter-btn text-xs py-1.5 px-3.5 ${activeCategory === cat.id ? 'active' : ''}`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {viewMode === 'matrix' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {filteredCategories.map((category) => (
              <div
                key={category.id}
                className="group relative rounded-3xl p-6 sm:p-7 bg-[#060e1e]/90 border border-slate-800 hover:border-cyan-500/40 backdrop-blur-2xl transition-all duration-300 shadow-2xl flex flex-col justify-between overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-cyan-500/10 via-transparent to-transparent rounded-tr-3xl pointer-events-none" />
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl pointer-events-none" />

                <div className="absolute top-3 left-3 w-2 h-2 border-t-2 border-l-2 border-cyan-400/40" />
                <div className="absolute bottom-3 right-3 w-2 h-2 border-b-2 border-r-2 border-cyan-400/40" />

                <div>
                  <div className="flex items-start justify-between gap-3 pb-5 border-b border-slate-800/80">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                          {category.title}
                        </h3>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                        {category.description}
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                      <span className="text-[10px] font-mono font-bold tracking-wider px-2.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-cyan-300 shadow-[0_0_10px_rgba(100,255,218,0.2)] flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                        {category.badge || 'ACTIVE'}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">
                        {category.skills.length} MODULES
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4 pt-5">
                    {category.skills.map((skill, idx) => {
                      const Icon = iconMap[skill.icon] || Code2;
                      const tier = tierStyles[skill.tier] || tierStyles.Advanced;
                      const isSelected = selectedSkill?.name === skill.name;

                      return (
                        <div
                          key={idx}
                          onClick={() => setSelectedSkill(isSelected ? null : skill)}
                          className={`p-3 sm:p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer ${
                            isSelected 
                              ? 'bg-slate-900/90 border-cyan-400/50 shadow-[0_0_20px_rgba(100,255,218,0.15)]' 
                              : 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-900/60 hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 flex-shrink-0 group-hover:scale-105 transition-transform">
                                <Icon className="w-4 h-4" />
                              </div>
                              <div className="truncate">
                                <span className="text-xs sm:text-sm font-semibold text-slate-200 hover:text-white block truncate">
                                  {skill.name}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 flex-shrink-0">
                              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border flex items-center gap-1 ${tier.bg} ${tier.border} ${tier.text} ${tier.glow}`}>
                                <span className={`w-1 h-1 rounded-full ${tier.dot}`} />
                                {skill.tier || 'Expert'}
                              </span>
                              <span className="font-mono text-cyan-400 text-xs sm:text-sm font-bold">
                                {skill.level}%
                              </span>
                            </div>
                          </div>

                          <div className="grid grid-cols-10 gap-1 my-2">
                            {Array.from({ length: 10 }).map((_, cellIdx) => {
                              const cellThreshold = (cellIdx + 1) * 10;
                              const isFilled = skill.level >= cellThreshold - 5;
                              return (
                                <div
                                  key={cellIdx}
                                  className={`h-1.5 rounded-sm transition-all duration-500 ${
                                    isFilled
                                      ? 'bg-gradient-to-r from-cyan-400 to-blue-500 shadow-[0_0_8px_rgba(100,255,218,0.4)]'
                                      : 'bg-slate-800/60'
                                  }`}
                                />
                              );
                            })}
                          </div>

                          {skill.tags && skill.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 pt-1.5">
                              {skill.tags.map((tag, tIdx) => (
                                <span
                                  key={tIdx}
                                  className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-slate-400 group-hover:text-slate-300 transition-colors"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4">
            {allSkillsList.map((skill, idx) => {
              const Icon = iconMap[skill.icon] || Code2;
              const tier = tierStyles[skill.tier] || tierStyles.Advanced;
              const isSelected = selectedSkill?.name === skill.name;

              return (
                <div
                  key={idx}
                  onClick={() => setSelectedSkill(isSelected ? null : skill)}
                  className={`p-4 rounded-2xl bg-[#060e1e]/90 border transition-all duration-300 cursor-pointer flex flex-col justify-between items-center text-center group hover:scale-[1.03] ${
                    isSelected
                      ? 'border-cyan-400 shadow-[0_0_25px_rgba(100,255,218,0.25)] bg-slate-900/90'
                      : 'border-slate-800 hover:border-cyan-500/40'
                  }`}
                >
                  <div className="relative mb-3">
                    <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:border-cyan-400/50 group-hover:text-white transition-all shadow-md">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="absolute -bottom-1 -right-1 text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-cyan-950 border border-cyan-400/40 text-cyan-300">
                      {skill.level}%
                    </span>
                  </div>

                  <div className="space-y-1 w-full">
                    <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
                      {skill.name}
                    </h4>
                    <span className={`inline-flex text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border ${tier.bg} ${tier.border} ${tier.text}`}>
                      {skill.tier || 'Expert'}
                    </span>
                  </div>

                  <div className="w-full bg-slate-900 rounded-full h-1 mt-3 overflow-hidden border border-slate-800">
                    <div
                      className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full rounded-full"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {filteredCategories.length === 0 && (
          <div className="text-center py-16 rounded-2xl bg-[#060e1e]/90 border border-slate-800 p-6 space-y-3">
            <p className="text-sm font-mono text-slate-400">No skill matching "{searchQuery}"</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="btn-primary text-xs"
            >
              Reset Filters
            </button>
          </div>
        )}

        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-[#060e1e]/90 border border-cyan-500/20 text-center space-y-4 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-blue-500/5 pointer-events-none" />
          
          <h4 className="text-sm sm:text-base font-bold text-white flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Full Technical Stack Ecosystem</span>
          </h4>
          
          <p className="text-xs text-slate-400 max-w-xl mx-auto">
            Architected for production deep learning research, low-latency microservices, and reliable high-scale software deployments.
          </p>

          <div className="flex flex-wrap justify-center gap-2 pt-2">
            {[
              "Python 3.13", "PyTorch 2.x", "TensorFlow", "Scikit-Learn", "Transformers / BERT", 
              "React.js", "Django REST Framework", "MySQL / XAMPP", "MLflow", "DVC", 
              "BentoML", "Node.js", "JavaScript ES6+", "HTML5 / Tailwind CSS", "Git & GitHub", 
              "Network Sockets & Security", "Jupyter Lab", "Vercel Cloud", "Docker"
            ].map((tech, i) => (
              <span key={i} className="tech-tag text-xs py-1 px-3">
                {tech}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
