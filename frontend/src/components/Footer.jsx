import React from 'react';
import { personalInfo } from '../data/portfolioData';
import { 
  Github, 
  Linkedin,
  Instagram,
  Mail, 
  ArrowUp, 
  MessageSquare
} from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-slate-800/80 bg-[#060e1e] py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-1 text-center md:text-left">
            <div className="flex items-center gap-2">
              <span className="font-mono text-cyan-400 font-bold text-base">&lt;AN/&gt;</span>
              <span className="text-white font-bold text-base">{personalInfo.name}</span>
            </div>
            <p className="text-xs text-slate-400 font-mono">
              Designed & Built with React, Django REST Framework, and MySQL.
            </p>
          </div>

          <div className="flex items-center gap-3 text-slate-400">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:text-cyan-400 hover:border-cyan-400/40 transition-colors"
              title="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:text-blue-400 hover:border-blue-400/40 transition-colors"
              title="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={personalInfo.instagram}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:text-pink-400 hover:border-pink-400/40 transition-colors"
              title="Instagram Profile"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href={`https://wa.me/${personalInfo.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:text-emerald-400 hover:border-emerald-400/40 transition-colors"
              title="WhatsApp Direct"
            >
              <MessageSquare className="w-4 h-4" />
            </a>
            <a
              href={personalInfo.gmailComposeUrl}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:text-cyan-400 hover:border-cyan-400/40 transition-colors"
              title="Compose in Gmail"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-400/40 text-slate-300 hover:text-cyan-300 transition-all flex items-center gap-2 text-xs font-mono"
            title="Scroll to Top"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-mono gap-2">
          <div>
            © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Systems Normal & Open for Inquiries</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
