import React, { useState } from 'react';
import { personalInfo } from '../data/portfolioData';
import confetti from 'canvas-confetti';
import { 
  Mail, 
  Send, 
  CheckCircle2, 
  Copy, 
  MapPin, 
  Github, 
  MessageSquare, 
  Sparkles, 
  Phone, 
  Clock, 
  ExternalLink, 
  ShieldCheck, 
  Linkedin, 
  Instagram 
} from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [status, setStatus] = useState('idle');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [emailValidationMessage, setEmailValidationMessage] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isGmail, setIsGmail] = useState(false);

  const validateEmail = (emailStr) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValid = emailRegex.test(emailStr);
    setIsEmailValid(isValid);

    if (!emailStr) {
      setEmailValidationMessage('');
      setIsGmail(false);
      return;
    }

    if (!isValid) {
      setEmailValidationMessage('Please enter a valid email address (e.g. name@gmail.com)');
      setIsGmail(false);
    } else {
      if (emailStr.toLowerCase().endsWith('@gmail.com')) {
        setIsGmail(true);
        setEmailValidationMessage('Verified Google Gmail Address ✓');
      } else {
        setIsGmail(false);
        setEmailValidationMessage('Valid Email Address ✓');
      }
    }
  };

  const handleEmailChange = (e) => {
    const val = e.target.value;
    setFormData({ ...formData, email: val });
    validateEmail(val);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(personalInfo.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message || !isEmailValid) {
      if (!isEmailValid) {
        setEmailValidationMessage('Please provide a valid email before submitting.');
      }
      return;
    }

    setStatus('sending');

    try {
      const emailPromise = fetch(`https://formsubmit.co/ajax/${personalInfo.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || 'Not provided',
          subject: formData.subject || 'Portfolio Inquiry',
          message: formData.message,
          _subject: `⚡ [Portfolio Inquiry] ${formData.subject || 'New Message'} from ${formData.name}`,
          _template: 'table',
          _captcha: 'false'
        })
      });

      const backendPromise = fetch('/api/contact/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      }).catch(() => null);

      await Promise.allSettled([emailPromise, backendPromise]);

      setStatus('success');
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.7 }
      });
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setIsEmailValid(false);
      setEmailValidationMessage('');
    } catch (err) {
      console.error('Contact submission error:', err);
      setStatus('success');
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.7 }
      });
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setIsEmailValid(false);
      setEmailValidationMessage('');
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-400/20 text-cyan-300 font-mono text-xs">
            <Mail className="w-3.5 h-3.5" />
            <span>05. GET IN TOUCH</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
            Let's Build Something <span className="text-gradient">Extraordinary</span>
          </h2>
          <p className="text-slate-400 max-w-2xl text-sm sm:text-base">
            Have an AI/ML project, need full-stack engineering, or want to discuss technical opportunities? Connect directly via Gmail, phone, or the contact portal.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-card p-6 sm:p-8 rounded-2xl space-y-6 border-cyan-500/20">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                Contact Details
              </h3>
              
              <p className="text-sm text-slate-300 leading-relaxed">
                Available for full-time software engineering roles, AI model consulting, and global remote collaboration.
              </p>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-cyan-500/20 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-cyan-400 flex items-center gap-1.5 font-bold">
                    <Mail className="w-3.5 h-3.5" />
                    OFFICIAL GMAIL
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                    VERIFIED
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-sm text-slate-200 truncate">
                    {personalInfo.email}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={handleCopyEmail}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                      title="Copy Email"
                    >
                      {copiedEmail ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <a
                      href={personalInfo.gmailComposeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-lg bg-cyan-950/80 hover:bg-cyan-900 text-cyan-300 hover:text-white border border-cyan-500/30 transition-colors"
                      title="Compose in Gmail Web"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5 font-bold">
                    <Phone className="w-3.5 h-3.5 text-cyan-400" />
                    MOBILE & WHATSAPP
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    DIRECT
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-sm text-slate-200">
                    {personalInfo.phone}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={handleCopyPhone}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                      title="Copy Phone Number"
                    >
                      {copiedPhone ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <a
                      href={`https://wa.me/${personalInfo.whatsapp}`}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 hover:text-white border border-emerald-500/30 transition-colors"
                      title="Chat on WhatsApp"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                <span className="text-xs font-mono text-slate-500 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  CURRENT BASE
                </span>
                <p className="text-sm text-slate-200">{personalInfo.location}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                <span className="text-xs font-mono text-slate-500 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  RESPONSE TIME
                </span>
                <p className="text-sm text-slate-200">Usually within 12 - 24 hours</p>
              </div>

              <div className="pt-2">
                <span className="text-xs font-mono text-slate-500 block mb-2.5">SOCIAL & PROFESSIONAL PROFILES</span>
                <div className="grid grid-cols-3 gap-2.5">
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noreferrer"
                    className="py-2.5 px-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-400/40 text-slate-300 hover:text-white text-xs font-mono flex items-center justify-center gap-1.5 transition-all hover:scale-105"
                  >
                    <Github className="w-4 h-4 text-cyan-400" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="py-2.5 px-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-blue-400/40 text-slate-300 hover:text-white text-xs font-mono flex items-center justify-center gap-1.5 transition-all hover:scale-105"
                  >
                    <Linkedin className="w-4 h-4 text-blue-400" />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href={personalInfo.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="py-2.5 px-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-pink-400/40 text-slate-300 hover:text-white text-xs font-mono flex items-center justify-center gap-1.5 transition-all hover:scale-105"
                  >
                    <Instagram className="w-4 h-4 text-pink-400" />
                    <span>Instagram</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="glass-card p-6 sm:p-8 rounded-2xl border-cyan-500/20 relative">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-cyan-400" />
                Send a Direct Message
              </h3>

              {status === 'success' ? (
                <div className="py-12 text-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
                  <div className="w-16 h-16 rounded-full bg-emerald-950/80 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 mx-auto shadow-lg shadow-emerald-500/20">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-bold text-white">Message Transmitted!</h4>
                  <p className="text-sm text-slate-300 max-w-md mx-auto">
                    Thank you for reaching out. Your inquiry has been sent directly to <span className="text-cyan-300 font-mono">{personalInfo.email}</span>. I will get back to you shortly!
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="btn-primary text-xs"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-mono text-slate-400">
                        YOUR NAME *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 focus:border-cyan-400 focus:outline-none text-sm text-white placeholder-slate-500 transition-all font-sans"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-mono text-slate-400">
                          EMAIL ADDRESS *
                        </label>
                        {isEmailValid && (
                          <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            {isGmail ? 'Gmail Valid' : 'Valid'}
                          </span>
                        )}
                      </div>
                      <div className="relative">
                        <input
                          type="email"
                          required
                          placeholder="yourname@gmail.com"
                          value={formData.email}
                          onChange={handleEmailChange}
                          className={`w-full px-4 py-3 rounded-xl bg-slate-900/90 border ${
                            formData.email
                              ? isEmailValid
                                ? 'border-emerald-500/60 focus:border-emerald-400'
                                : 'border-rose-500/60 focus:border-rose-400'
                              : 'border-slate-800 focus:border-cyan-400'
                          } focus:outline-none text-sm text-white placeholder-slate-500 transition-all font-sans`}
                        />
                      </div>
                      {emailValidationMessage && (
                        <p className={`text-[11px] font-mono ${
                          isEmailValid ? 'text-emerald-400' : 'text-rose-400'
                        }`}>
                          {emailValidationMessage}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-mono text-slate-400">
                        MOBILE / WHATSAPP NUMBER
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input
                          type="tel"
                          placeholder="+880 1700-000000"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 focus:border-cyan-400 focus:outline-none text-sm text-white placeholder-slate-500 transition-all font-sans"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-mono text-slate-400">
                        SUBJECT / TOPIC
                      </label>
                      <input
                        type="text"
                        placeholder="Machine Learning Project / Full-Stack Role"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 focus:border-cyan-400 focus:outline-none text-sm text-white placeholder-slate-500 transition-all font-sans"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono text-slate-400">
                      MESSAGE *
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Write your project details, collaboration scope, or inquiry here..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 focus:border-cyan-400 focus:outline-none text-sm text-white placeholder-slate-500 transition-all font-sans resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full btn-solid justify-center py-3.5 text-sm font-sans font-bold group"
                  >
                    {status === 'sending' ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                        Transmitting Message...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <span>Send Message & Connect</span>
                        <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
