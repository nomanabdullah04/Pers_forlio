import React, { useState, useEffect, useRef } from 'react';
import { personalInfo } from '../data/portfolioData';
import { 
  Sparkles, 
  Github, 
  Linkedin, 
  Instagram,
  Menu, 
  X, 
  Mail, 
  ChevronRight,
  Navigation,
  ChevronDown
} from 'lucide-react';

export default function Navbar({ onOpenChat }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [navExpanded, setNavExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);
  const navPanelRef = useRef(null);

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

      const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'gallery', 'resume', 'contact'];
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

  // Close nav panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navPanelRef.current && !navPanelRef.current.contains(e.target)) {
        setNavExpanded(false);
      }
    };
    if (navExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [navExpanded]);

  const navLinks = [
    { name: 'About', href: '#about', id: 'about', num: '01' },
    { name: 'Skills', href: '#skills', id: 'skills', num: '02' },
    { name: 'Projects', href: '#projects', id: 'projects', num: '03' },
    { name: 'Experience', href: '#experience', id: 'experience', num: '04' },
    { name: 'Gallery', href: '#gallery', id: 'gallery', num: '05' },
    { name: 'Resume', href: '#resume', id: 'resume', num: '06' },
    { name: 'Contact', href: '#contact', id: 'contact', num: '07' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none transition-all duration-300">
      <div className="w-full h-[2.5px] bg-slate-900/60 pointer-events-none relative overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 transition-all duration-150 shadow-[0_0_10px_rgba(245,158,11,0.8)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className={`max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 transition-all duration-300 ${
        isScrolled ? 'pt-2 sm:pt-3' : 'pt-4 sm:pt-5'
      }`}>
        <div ref={navPanelRef}>
          <nav
            className={`pointer-events-auto rounded-2xl sm:rounded-full transition-all duration-300 border ${
              isScrolled
                ? 'bg-[#141208]/90 backdrop-blur-xl border-amber-500/30 shadow-[0_12px_40px_rgba(0,0,0,0.6),0_0_25px_rgba(245,158,11,0.12)] py-2.5 px-4 sm:px-6'
                : 'bg-[#0C0C0E]/60 backdrop-blur-md border-amber-500/15 shadow-[0_8px_30px_rgba(0,0,0,0.4)] py-3 px-4 sm:px-6'
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              {/* Logo */}
              <a
                href="#hero"
                className="flex items-center gap-3 group cursor-pointer text-decoration-none flex-shrink-0"
              >
                <div className="relative">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-stone-950 border border-amber-400/40 flex items-center justify-center text-amber-400 font-mono font-extrabold text-xs sm:text-sm tracking-wider transition-all duration-300 group-hover:scale-105 group-hover:border-amber-300 group-hover:shadow-[0_0_16px_rgba(245,158,11,0.5)]">
                    &lt;AN/&gt;
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500 border-2 border-[#0C0C0E]" />
                  </span>
                </div>

                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="text-white font-bold tracking-tight text-xs sm:text-sm font-sans group-hover:text-amber-300 transition-colors">
                      Abdullah Al Noman
                    </span>
                    <span className="hidden xl:inline-flex text-[9px] font-mono text-amber-400 bg-amber-950/80 px-1.5 py-0.5 rounded border border-amber-500/30">
                      LIVE
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 tracking-wider">
                    AI / FULL-STACK
                  </span>
                </div>
              </a>

              {/* Right side: Toggle + Actions */}
              <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                {/* Navigation Toggle Button */}
                <button
                  onClick={() => setNavExpanded(!navExpanded)}
                  className={`px-3 py-1.5 rounded-full border text-xs font-mono font-medium flex items-center gap-1.5 transition-all duration-200 ${
                    navExpanded
                      ? 'bg-amber-500/15 text-amber-300 border-amber-400/40 shadow-[0_0_12px_rgba(245,158,11,0.25)]'
                      : 'bg-stone-900/80 text-stone-300 border-stone-700 hover:border-amber-400/40 hover:text-amber-300'
                  }`}
                  title="Toggle Navigation"
                >
                  {navExpanded ? (
                    <X className="w-3.5 h-3.5" />
                  ) : (
                    <Navigation className="w-3.5 h-3.5" />
                  )}
                  <span className="hidden sm:inline">{navExpanded ? 'Close' : 'Navigate'}</span>
                  <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${navExpanded ? 'rotate-180' : ''}`} />
                </button>

                {/* Nexus AI */}
                <button
                  onClick={onOpenChat}
                  className="px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-950/90 to-orange-950/90 border border-amber-400/30 text-amber-300 hover:text-white hover:border-amber-300 text-xs font-mono font-medium flex items-center gap-1.5 transition-all hover:scale-105 hover:shadow-[0_0_15px_rgba(245,158,11,0.3)] group"
                  title="Chat with Nexus AI"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-12 transition-transform animate-pulse" />
                  <span className="hidden sm:inline font-semibold">Nexus AI</span>
                </button>

                {/* Social icons - hidden on small screens */}
                <div className="hidden md:flex items-center gap-2">
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-full bg-stone-900/80 border border-stone-800 hover:border-amber-400/40 text-stone-300 hover:text-amber-400 transition-all hover:scale-105"
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
                </div>

                {/* Hire Me */}
                <a
                  href="#contact"
                  className="px-3.5 py-1.5 rounded-full bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-sans font-bold flex items-center gap-1.5 transition-all hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:scale-105"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Hire Me</span>
                </a>
              </div>
            </div>
          </nav>

          {/* ==================== EXPANDABLE NAV PANEL ==================== */}
          <div
            className={`pointer-events-auto overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              navExpanded ? 'max-h-[500px] opacity-100 mt-2' : 'max-h-0 opacity-0 mt-0'
            }`}
          >
            <div className="rounded-2xl bg-[#141208]/95 backdrop-blur-2xl border border-amber-500/25 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_30px_rgba(245,158,11,0.1)]">
              {/* Nav links grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.id;
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={() => setNavExpanded(false)}
                      className={`relative px-3 py-2.5 rounded-xl text-xs font-mono transition-all duration-200 flex items-center justify-center gap-1.5 text-center ${
                        isActive
                          ? 'bg-amber-500/15 text-amber-300 font-semibold border border-amber-400/30 shadow-[0_0_12px_rgba(245,158,11,0.2)]'
                          : 'text-stone-300 hover:text-white hover:bg-stone-800/50 border border-transparent hover:border-stone-700'
                      }`}
                    >
                      <span className={`text-[10px] ${isActive ? 'text-amber-400' : 'text-stone-500'}`}>
                        {link.num}.
                      </span>
                      <span>{link.name}</span>
                    </a>
                  );
                })}
              </div>

              {/* Mobile social row */}
              <div className="flex md:hidden items-center justify-center gap-2 pt-3 mt-3 border-t border-stone-800/80">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 hover:text-white text-xs font-mono flex items-center gap-1.5"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 hover:text-blue-400 text-xs font-mono flex items-center gap-1.5"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={personalInfo.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 hover:text-pink-400 text-xs font-mono flex items-center gap-1.5"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>Insta</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

