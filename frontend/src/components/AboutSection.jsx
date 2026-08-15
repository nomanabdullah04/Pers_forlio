import React, { useState } from 'react';
import { personalInfo } from '../data/portfolioData';
import { 
  Code2, 
  Brain, 
  Cpu, 
  ShieldCheck, 
  Workflow, 
  Terminal, 
  Sparkles, 
  ArrowUpRight
} from 'lucide-react';

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState('philosophy');

  const principles = [
    {
      icon: Brain,
      title: "Intelligent AI & Deep Learning",
      description: "Designing neural architectures and NLP transformers that transform unstructured data into actionable intelligence."
    },
    {
      icon: Workflow,
      title: "End-to-End MLOps",
      description: "Automating model experiment tracking with MLflow, dataset version control via DVC, and microservice serving with BentoML."
    },
    {
      icon: Code2,
      title: "Production Full-Stack Architecture",
      description: "Building responsive React frontends paired with resilient Django REST and Node.js backend systems."
    },
    {
      icon: ShieldCheck,
      title: "Performance & Security First",
      description: "Auditing network protocols, ensuring optimal inference throughput, and writing modular, reproducible code."
    }
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-400/20 text-cyan-300 font-mono text-xs">
            <Terminal className="w-3.5 h-3.5" />
            <span>01. ABOUT ME</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
            Engineering at the Intersection of <span className="text-gradient">AI & Full-Stack</span>
          </h2>
          <p className="text-slate-400 max-w-2xl text-sm sm:text-base">
            Bridging algorithmic research with human-centered software systems.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7 space-y-6">
            <div className="glass-card p-6 sm:p-8 rounded-2xl space-y-5 border-cyan-500/20">
              <h3 className="text-xl font-bold text-white flex items-center gap-2.5">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                Who I Am
              </h3>
              
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                Hello! I am <strong className="text-white font-semibold">{personalInfo.name}</strong>, a software developer and AI/ML practitioner based in <span className="text-cyan-300">{personalInfo.location}</span>. My technical journey centers on engineering robust machine learning pipelines, deep learning neural models, and scalable modern web platforms.
              </p>

              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                From developing full-stack web platforms to training natural language transformers, building disease diagnostic models, and implementing MLOps frameworks with <strong className="text-purple-300">MLflow</strong> and <strong className="text-purple-300">BentoML</strong>, I enjoy taking complex technical challenges and turning them into clean, dependable software.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-slate-700/50 text-xs sm:text-sm font-mono">
                <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                  <span className="text-slate-500 block text-[11px]">LOCATION</span>
                  <span className="text-slate-200">{personalInfo.location}</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                  <span className="text-slate-500 block text-[11px]">PRIMARY DOMAINS</span>
                  <span className="text-cyan-300">AI/ML, NLP, Full-Stack</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                  <span className="text-slate-500 block text-[11px]">GITHUB USERNAME</span>
                  <a 
                    href={personalInfo.github} 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-cyan-400 hover:underline inline-flex items-center gap-1"
                  >
                    nomanabdullah04 <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
                <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                  <span className="text-slate-500 block text-[11px]">DIRECT EMAIL</span>
                  <a href={`mailto:${personalInfo.email}`} className="text-slate-200 hover:text-cyan-300 truncate block">
                    {personalInfo.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {principles.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div 
                    key={idx}
                    className="glass-card p-5 rounded-xl border-slate-800 hover:border-cyan-400/40 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-cyan-950/80 border border-cyan-400/30 flex items-center justify-center text-cyan-400 mb-3 group-hover:scale-110 group-hover:border-cyan-300 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="text-sm sm:text-base font-bold text-white mb-1.5 group-hover:text-cyan-300 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="glass-card rounded-2xl overflow-hidden border-cyan-500/30 shadow-2xl">
              <div className="bg-slate-950/90 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                  <span className="text-xs font-mono text-slate-400 ml-2">noman_profile.py</span>
                </div>
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                  PYTHON 3.13
                </span>
              </div>

              <div className="p-5 font-mono text-xs leading-relaxed bg-[#060e1e]/90 text-slate-300 space-y-2 overflow-x-auto">
                <p>
                  <span className="text-purple-400">class</span> <span className="text-cyan-300 font-bold">EngineerProfile</span>:
                </p>
                <div className="pl-4 space-y-1.5">
                  <p>
                    <span className="text-purple-400">def</span> <span className="text-blue-400">__init__</span>(self):
                  </p>
                  <div className="pl-4 space-y-1 text-slate-300">
                    <p>self.name = <span className="text-emerald-300">"Abdullah Al Noman"</span></p>
                    <p>self.handle = <span className="text-emerald-300">"nomanabdullah04"</span></p>
                    <p>self.focus = [<span className="text-emerald-300">"Deep Learning"</span>, <span className="text-emerald-300">"NLP"</span>, <span className="text-emerald-300">"Full-Stack"</span>]</p>
                    <p>self.architecture = [<span className="text-emerald-300">"PyTorch"</span>, <span className="text-emerald-300">"React"</span>, <span className="text-emerald-300">"Django"</span>, <span className="text-emerald-300">"MySQL"</span>]</p>
                    <p>self.mlops_stack = [<span className="text-emerald-300">"MLflow"</span>, <span className="text-emerald-300">"DVC"</span>, <span className="text-emerald-300">"BentoML"</span>]</p>
                    <p>self.motto = <span className="text-emerald-300">"{personalInfo.bioQuote}"</span></p>
                  </div>
                  <p className="pt-1">
                    <span className="text-purple-400">def</span> <span className="text-blue-400">get_status</span>(self):
                  </p>
                  <div className="pl-4 text-slate-300">
                    <p><span className="text-purple-400">return</span> <span className="text-emerald-300">"Building high-impact software systems"</span></p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 text-slate-400">
                  <p>&gt;&gt;&gt; noman = EngineerProfile()</p>
                  <p className="text-cyan-300">&gt;&gt;&gt; print(noman.get_status())</p>
                  <p className="text-emerald-400 font-semibold">&gt;&gt; "Building high-impact software systems"</p>
                </div>
              </div>

              <div className="p-4 bg-slate-950/70 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-mono">Status: Ready to collaborate</span>
                <a
                  href="#projects"
                  className="text-xs font-mono text-cyan-300 hover:text-cyan-200 flex items-center gap-1 font-medium"
                >
                  Inspect Projects <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div className="glass-card p-5 rounded-xl border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-950/60 border border-purple-500/30 flex items-center justify-center text-purple-400">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Continuous Innovation</div>
                  <div className="text-xs text-slate-400">Daily commits & research in AI & Web</div>
                </div>
              </div>
              <span className="text-xs font-mono text-purple-400 bg-purple-950/80 px-2.5 py-1 rounded-md border border-purple-500/30">
                ACTIVE
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
