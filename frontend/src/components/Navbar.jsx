import React, { useState, useEffect } from 'react';
import { personalInfo } from '../data/portfolioData';
import { 
  Sparkles, 
  Github, 
  Linkedin, 
  Instagram,
  Menu, 
  X, 
  Mail, 
  ChevronRight
} from 'lucide-react';

export default function Navbar({ onOpenChat }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);

      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'contact'];
      const scrollPosition = window.scrollY + 220;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about', id: 'about', num: '01' },
    { name: 'Skills', href: '#skills', id: 'skills', num: '02' },
    { name: 'Projects', href: '#projects', id: 'projects', num: '03' },
    { name: 'Experience', href: '#experience', id: 'experience', num: '04' },
    { name: 'Contact', href: '#contact', id: 'contact', num: '05' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none transition-all duration-300">
      <div className="w-full h-[2.5px] bg-slate-900/60 pointer-events-none relative overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 transition-all duration-150 shadow-[0_0_10px_rgba(100,255,218,0.8)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className={`max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 transition-all duration-300 ${
        isScrolled ? 'pt-2 sm:pt-3' : 'pt-4 sm:pt-5'
      }`}>
        <nav
          className={`pointer-events-auto rounded-2xl sm:rounded-full transition-all duration-300 border ${
            isScrolled
              ? 'bg-[#060e1e]/90 backdrop-blur-xl border-cyan-500/30 shadow-[0_12px_40px_rgba(0,0,0,0.6),0_0_25px_rgba(100,255,218,0.12)] py-2.5 px-4 sm:px-6'
              : 'bg-[#0A192F]/60 backdrop-blur-md border-cyan-500/15 shadow-[0_8px_30px_rgba(0,0,0,0.4)] py-3 px-4 sm:px-6'
          }`}
        >
          <div className="flex items-center justify-between gap-4">
            <a
              href="#hero"
              className="flex items-center gap-3 group cursor-pointer text-decoration-none flex-shrink-0"
            >
              <div className="relative">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-950 border border-cyan-400/40 flex items-center justify-center text-cyan-400 font-mono font-extrabold text-xs sm:text-sm tracking-wider transition-all duration-300 group-hover:scale-105 group-hover:border-cyan-300 group-hover:shadow-[0_0_16px_rgba(100,255,218,0.5)]">
                  &lt;AN/&gt;
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 border-2 border-[#0A192F]" />
                </span>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-white font-bold tracking-tight text-xs sm:text-sm font-sans group-hover:text-cyan-300 transition-colors">
                    Abdullah Al Noman
                  </span>
                  <span className="hidden xl:inline-flex text-[9px] font-mono text-emerald-400 bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-500/30">
                    LIVE
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-400 tracking-wider">
                  AI / FULL-STACK
                </span>
              </div>
            </a>

            <div className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-slate-950/60 border border-slate-800/80 backdrop-blur-sm">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`relative px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-200 flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-cyan-500/15 text-cyan-300 font-semibold border border-cyan-400/30 shadow-[0_0_12px_rgba(100,255,218,0.2)]'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                    }`}
                  >
                    <span className={`text-[10px] ${isActive ? 'text-cyan-400' : 'text-slate-500'}`}>
                      {link.num}.
                    </span>
                    <span>{link.name}</span>
                  </a>
                );
              })}
            </div>

            <div className="hidden md:flex items-center gap-2 sm:gap-3 flex-shrink-0">
              <button
                onClick={onOpenChat}
                className="px-3 py-1.5 rounded-full bg-gradient-to-r from-cyan-950/90 to-purple-950/90 border border-cyan-400/30 text-cyan-300 hover:text-white hover:border-cyan-300 text-xs font-mono font-medium flex items-center gap-1.5 transition-all hover:scale-105 hover:shadow-[0_0_15px_rgba(100,255,218,0.3)] group"
                title="Chat with Nexus AI"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 group-hover:rotate-12 transition-transform animate-pulse" />
                <span className="font-semibold">Nexus AI</span>
              </button>

              <a
                href={personalInfo.github}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-full bg-slate-900/80 border border-slate-800 hover:border-cyan-400/40 text-slate-300 hover:text-cyan-400 transition-all hover:scale-105"
                title="GitHub Profile"
              >
                <Github className="w-3.5 h-3.5" />
              </a>

              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-full bg-slate-900/80 border border-slate-800 hover:border-blue-400/40 text-slate-300 hover:text-blue-400 transition-all hover:scale-105"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>

              <a
                href={personalInfo.instagram}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-full bg-slate-900/80 border border-slate-800 hover:border-pink-400/40 text-slate-300 hover:text-pink-400 transition-all hover:scale-105"
                title="Instagram Profile"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>

              <a
                href="#contact"
                className="px-3.5 py-1.5 rounded-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-sans font-bold flex items-center gap-1.5 transition-all hover:shadow-[0_0_20px_rgba(100,255,218,0.4)] hover:scale-105"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Hire Me</span>
              </a>
            </div>

            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={onOpenChat}
                className="p-2 rounded-xl bg-cyan-950/80 border border-cyan-400/30 text-cyan-300 text-xs flex items-center gap-1"
                title="Nexus AI"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white focus:outline-none"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </nav>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden pointer-events-auto max-w-7xl mx-auto px-3 sm:px-6 pt-2">
          <div className="glass-card rounded-2xl border-cyan-500/20 p-4 space-y-3 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200 bg-[#060e1e]/95 backdrop-blur-2xl">
            <div className="space-y-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-mono font-medium transition-all ${
                      isActive
                        ? 'bg-cyan-500/15 text-cyan-300 font-semibold border border-cyan-500/30'
                        : 'text-slate-300 hover:bg-slate-800/60'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-cyan-400 font-mono">{link.num}.</span>
                      <span>{link.name}</span>
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  </a>
                );
              })}
            </div>

            <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenChat();
                }}
                className="w-full py-2.5 rounded-xl bg-cyan-950/80 border border-cyan-400/40 text-cyan-300 text-xs font-mono font-medium flex items-center justify-center gap-2 hover:bg-cyan-900/80 transition-all"
              >
                <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
                Chat with Nexus AI
              </button>

              <div className="grid grid-cols-3 gap-2 pt-1">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noreferrer"
                  className="py-2 px-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-mono flex items-center justify-center gap-1"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="py-2 px-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-mono flex items-center justify-center gap-1"
                >
                  <Linkedin className="w-3.5 h-3.5 text-blue-400" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={personalInfo.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="py-2 px-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-mono flex items-center justify-center gap-1"
                >
                  <Instagram className="w-3.5 h-3.5 text-pink-400" />
                  <span>Insta</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
