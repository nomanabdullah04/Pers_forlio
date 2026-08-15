import React from 'react';
import { experienceTimeline } from '../data/portfolioData';
import { 
  Briefcase, 
  GraduationCap, 
  Calendar, 
  CheckCircle2
} from 'lucide-react';

export default function ExperienceTimeline() {
  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-slate-950/40">
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-400/20 text-cyan-300 font-mono text-xs">
            <Briefcase className="w-3.5 h-3.5" />
            <span>04. CAREER & EDUCATION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
            Experience & <span className="text-gradient">Milestones</span>
          </h2>
          <p className="text-slate-400 max-w-2xl text-sm sm:text-base">
            My engineering trajectory across applied artificial intelligence research, production web deployment, and academic foundation.
          </p>
        </div>

        <div className="relative border-l-2 border-slate-800 ml-4 sm:ml-32 space-y-12">
          {experienceTimeline.map((item, index) => {
            const isEducation = item.role.includes('Science') || item.period === 'Education';
            const IconComponent = isEducation ? GraduationCap : Briefcase;

            return (
              <div key={index} className="relative pl-6 sm:pl-10 group">
                <div className="absolute -left-[17px] top-1 w-8 h-8 rounded-full bg-slate-950 border-2 border-cyan-400 flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(100,255,218,0.5)] transition-all">
                  <IconComponent className="w-4 h-4" />
                </div>

                <div className="hidden sm:block absolute -left-36 top-1 text-right w-24">
                  <span className="font-mono text-xs text-cyan-400 font-bold block">
                    {item.period}
                  </span>
                  <span className="text-[11px] text-slate-500 block truncate">
                    {item.location}
                  </span>
                </div>

                <div className="glass-card p-6 sm:p-7 rounded-2xl border-slate-800 hover:border-cyan-400/30 transition-all space-y-3">
                  <div className="sm:hidden flex items-center justify-between text-xs font-mono text-cyan-400 pb-2 border-b border-slate-800">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {item.period}
                    </span>
                    <span className="text-slate-400">{item.location}</span>
                  </div>

                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {item.role}
                    </h3>
                    <div className="text-sm font-mono text-cyan-300/90 font-medium">
                      {item.company}
                    </div>
                  </div>

                  <p className="text-slate-300 text-sm leading-relaxed">
                    {item.description}
                  </p>

                  {item.highlights && item.highlights.length > 0 && (
                    <div className="space-y-2 pt-2">
                      {item.highlights.map((highlight, hIdx) => (
                        <div key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-400">
                          <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
