import React, { useEffect, useRef, useState } from 'react';
import { personalInfo } from '../data/portfolioData';
import { 
  ArrowRight, 
  Github, 
  Linkedin, 
  Instagram,
  Mail, 
  Sparkles, 
  Terminal, 
  Brain, 
  Code2, 
  Layers, 
  Zap, 
  ChevronDown 
} from 'lucide-react';

const iconMap = {
  FolderGit2: Layers,
  Brain: Brain,
  Layers: Code2,
  Zap: Zap
};

export default function NeuralNetworkHero({ onOpenChat, onExploreProjects }) {
  const canvasRef = useRef(null);
  const [currentTaglineIndex, setCurrentTaglineIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(80);

  useEffect(() => {
    const fullText = personalInfo.taglines[currentTaglineIndex];

    const handleTyping = () => {
      if (!isDeleting) {
        setDisplayedText(fullText.substring(0, displayedText.length + 1));
        setTypingSpeed(70 + Math.random() * 30);

        if (displayedText === fullText) {
          setTimeout(() => setIsDeleting(true), 2200);
        }
      } else {
        setDisplayedText(fullText.substring(0, displayedText.length - 1));
        setTypingSpeed(40);

        if (displayedText === '') {
          setIsDeleting(false);
          setCurrentTaglineIndex((prev) => (prev + 1) % personalInfo.taglines.length);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentTaglineIndex, typingSpeed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resizeCanvas = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      width = rect.width || window.innerWidth;
      height = rect.height || window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      initNodes();
    };

    window.addEventListener('resize', resizeCanvas);

    const mouse = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      targetX: window.innerWidth / 2,
      targetY: window.innerHeight / 2,
      active: false,
      radius: 160
    };

    const updateMousePos = (clientX, clientY) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = clientX - rect.left;
      mouse.targetY = clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseMove = (e) => {
      updateMousePos(e.clientX, e.clientY);
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches.length > 0) {
        updateMousePos(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleTouchEnd = () => {
      mouse.active = false;
    };

    const ripples = [];
    const triggerRipple = (clientX, clientY) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = clientX - rect.left;
      const clickY = clientY - rect.top;

      ripples.push({
        x: clickX,
        y: clickY,
        radius: 5,
        maxRadius: Math.min(width * 0.4, 300),
        opacity: 0.9,
        speed: 6
      });

      for (let i = 0; i < 6; i++) {
        pulses.push({
          x: clickX,
          y: clickY,
          vx: (Math.random() - 0.5) * 8,
          vy: (Math.random() - 0.5) * 8,
          life: 1,
          decay: 0.025,
          color: Math.random() > 0.5 ? '#64FFDA' : '#00D2FF',
          size: Math.random() * 3 + 2
        });
      }
    };

    const handleCanvasClick = (e) => {
      triggerRipple(e.clientX, e.clientY);
    };

    const handleTouchStart = (e) => {
      if (e.touches && e.touches.length > 0) {
        updateMousePos(e.touches[0].clientX, e.touches[0].clientY);
        triggerRipple(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('click', handleCanvasClick);
    canvas.addEventListener('touchstart', handleTouchStart, { passive: true });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: true });
    canvas.addEventListener('touchend', handleTouchEnd, { passive: true });

    class NeuralNode {
      constructor(x, y) {
        this.x = x !== undefined ? x : Math.random() * width;
        this.y = y !== undefined ? y : Math.random() * height;
        this.size = Math.random() * 2.6 + 1.6;
        this.vx = (Math.random() - 0.5) * (width < 640 ? 0.5 : 0.75);
        this.vy = (Math.random() - 0.5) * (width < 640 ? 0.5 : 0.75);
        this.wavePhase = Math.random() * Math.PI * 2;
        this.waveSpeed = 0.015 + Math.random() * 0.02;
        this.pulsePhase = Math.random() * Math.PI * 2;
        this.pulseSpeed = 0.04 + Math.random() * 0.03;
        
        const rand = Math.random();
        if (rand > 0.65) {
          this.color = '#64FFDA';
          this.glow = 'rgba(100, 255, 218, 0.9)';
        } else if (rand > 0.35) {
          this.color = '#00D2FF';
          this.glow = 'rgba(0, 210, 255, 0.9)';
        } else if (rand > 0.15) {
          this.color = '#A855F7';
          this.glow = 'rgba(168, 85, 247, 0.9)';
        } else {
          this.color = '#ffffff';
          this.glow = 'rgba(255, 255, 255, 0.9)';
        }
      }

      update() {
        this.wavePhase += this.waveSpeed;
        this.pulsePhase += this.pulseSpeed;

        this.x += this.vx + Math.cos(this.wavePhase) * 0.35;
        this.y += this.vy + Math.sin(this.wavePhase) * 0.35;

        if (this.x < -40) this.x = width + 40;
        if (this.x > width + 40) this.x = -40;
        if (this.y < -40) this.y = height + 40;
        if (this.y > height + 40) this.y = -40;

        if (mouse.active) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const currentRadius = width < 640 ? 120 : mouse.radius;

          if (dist < currentRadius && dist > 1) {
            const force = (currentRadius - dist) / currentRadius;
            const dirX = dx / dist;
            const dirY = dy / dist;
            this.x += dirX * force * 1.6 - dirY * force * 1.0;
            this.y += dirY * force * 1.6 + dirX * force * 1.0;
          }
        }

        for (let i = 0; i < ripples.length; i++) {
          const rip = ripples[i];
          const dx = this.x - rip.x;
          const dy = this.y - rip.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const ripDiff = Math.abs(dist - rip.radius);

          if (ripDiff < 40 && dist > 1) {
            const push = (1 - ripDiff / 40) * 4 * rip.opacity;
            this.x += (dx / dist) * push;
            this.y += (dy / dist) * push;
          }
        }
      }

      draw() {
        const pulse = Math.sin(this.pulsePhase) * 0.3 + 1;
        const currentSize = this.size * pulse;

        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, currentSize, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.glow;
        ctx.shadowBlur = 8;
        ctx.fill();

        if (this.size > 2.6) {
          ctx.beginPath();
          ctx.arc(this.x, this.y, currentSize * 0.4, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.fill();
        }
        ctx.restore();
      }
    }

    class SynapticSignal {
      constructor(fromNode, toNode) {
        this.from = fromNode;
        this.to = toNode;
        this.progress = 0;
        this.speed = 0.012 + Math.random() * 0.02;
        this.color = Math.random() > 0.5 ? '#64FFDA' : '#00D2FF';
        this.size = Math.random() * 2 + 1.5;
        this.alive = true;
      }

      update() {
        this.progress += this.speed;
        if (this.progress >= 1) {
          this.alive = false;
        }
      }

      draw() {
        const currX = this.from.x + (this.to.x - this.from.x) * this.progress;
        const currY = this.from.y + (this.to.y - this.from.y) * this.progress;
        const trailX = this.from.x + (this.to.x - this.from.x) * Math.max(0, this.progress - 0.08);
        const trailY = this.from.y + (this.to.y - this.from.y) * Math.max(0, this.progress - 0.08);

        ctx.save();
        const grad = ctx.createLinearGradient(trailX, trailY, currX, currY);
        grad.addColorStop(0, 'rgba(0, 210, 255, 0)');
        grad.addColorStop(1, this.color);

        ctx.beginPath();
        ctx.moveTo(trailX, trailY);
        ctx.lineTo(currX, currY);
        ctx.strokeStyle = grad;
        ctx.lineWidth = this.size;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(currX, currY, this.size * 1.2, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.restore();
      }
    }

    let nodes = [];
    const signals = [];
    const pulses = [];

    const initNodes = () => {
      if (width === 0 || height === 0) return;
      let densityDivisor = 13000;
      let minNodes = 35;
      let maxNodes = 110;

      if (width < 640) {
        densityDivisor = 10000;
        minNodes = 30;
        maxNodes = 45;
      } else if (width > 1920) {
        densityDivisor = 16000;
        maxNodes = 130;
      }

      const nodeCount = Math.max(minNodes, Math.min(Math.floor((width * height) / densityDivisor), maxNodes));
      nodes = [];
      for (let i = 0; i < nodeCount; i++) {
        nodes.push(new NeuralNode());
      }
    };

    resizeCanvas();

    let time = 0;
    const animate = () => {
      time += 0.01;
      ctx.clearRect(0, 0, width, height);

      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      ctx.save();
      ctx.strokeStyle = 'rgba(100, 255, 218, 0.02)';
      ctx.lineWidth = 1;
      const gridSize = width < 640 ? 50 : 80;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      ctx.restore();

      for (let i = ripples.length - 1; i >= 0; i--) {
        const rip = ripples[i];
        rip.radius += rip.speed;
        rip.opacity -= 0.018;

        if (rip.opacity <= 0 || rip.radius > rip.maxRadius) {
          ripples.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(100, 255, 218, ${rip.opacity * 0.7})`;
        ctx.lineWidth = 2;
        ctx.shadowColor = '#64FFDA';
        ctx.shadowBlur = 12;
        ctx.stroke();
        ctx.restore();
      }

      for (let i = 0; i < nodes.length; i++) {
        nodes[i].update();
        nodes[i].draw();
      }

      const maxDist = width < 640 ? 110 : (width > 1920 ? 175 : 140);
      for (let a = 0; a < nodes.length; a++) {
        for (let b = a + 1; b < nodes.length; b++) {
          const dx = nodes[a].x - nodes[b].x;
          const dy = nodes[a].y - nodes[b].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.28;
            
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(nodes[a].x, nodes[a].y);
            ctx.lineTo(nodes[b].x, nodes[b].y);
            
            const lineGrad = ctx.createLinearGradient(nodes[a].x, nodes[a].y, nodes[b].x, nodes[b].y);
            lineGrad.addColorStop(0, `rgba(100, 255, 218, ${alpha})`);
            lineGrad.addColorStop(0.5, `rgba(0, 210, 255, ${alpha * 0.8})`);
            lineGrad.addColorStop(1, `rgba(168, 85, 247, ${alpha})`);
            
            ctx.strokeStyle = lineGrad;
            ctx.lineWidth = (1 - dist / maxDist) * 1.4;
            ctx.stroke();
            ctx.restore();

            if (signals.length < (width < 640 ? 10 : 20) && Math.random() < 0.003) {
              signals.push(new SynapticSignal(nodes[a], nodes[b]));
            }
          }
        }
      }

      if (mouse.active) {
        const currentRadius = width < 640 ? 120 : mouse.radius;
        for (let i = 0; i < nodes.length; i++) {
          const dx = mouse.x - nodes[i].x;
          const dy = mouse.y - nodes[i].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < currentRadius) {
            const alpha = (1 - dist / currentRadius) * 0.5;
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(nodes[i].x, nodes[i].y);
            ctx.strokeStyle = `rgba(0, 210, 255, ${alpha})`;
            ctx.lineWidth = 1.2;
            ctx.shadowColor = '#00D2FF';
            ctx.shadowBlur = 6;
            ctx.stroke();
            ctx.restore();
          }
        }

        ctx.save();
        const cursorPulse = Math.sin(time * 4) * 3;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 20 + cursorPulse, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(100, 255, 218, 0.4)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 6]);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#64FFDA';
        ctx.shadowColor = '#64FFDA';
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.restore();
      }

      for (let i = signals.length - 1; i >= 0; i--) {
        const sig = signals[i];
        sig.update();
        sig.draw();
        if (!sig.alive) {
          signals.splice(i, 1);
        }
      }

      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.95;
        p.vy *= 0.95;
        p.life -= p.decay;

        if (p.life <= 0) {
          pulses.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.globalAlpha = p.life;
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (canvas) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
        canvas.removeEventListener('click', handleCanvasClick);
        canvas.removeEventListener('touchstart', handleTouchStart);
        canvas.removeEventListener('touchmove', handleTouchMove);
        canvas.removeEventListener('touchend', handleTouchEnd);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-28 sm:pt-32 lg:pt-28 pb-16 overflow-hidden w-full">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-auto z-0 opacity-85"
        style={{ cursor: 'crosshair' }}
      />

      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] lg:w-[900px] h-[350px] sm:h-[400px] bg-cyan-500/10 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-5 sm:right-10 w-[300px] sm:w-[450px] lg:w-[600px] h-[300px] sm:h-[350px] bg-purple-600/10 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-16 items-center">
          
          <div className="lg:col-span-7 xl:col-span-8 space-y-5 sm:space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-400/30 text-cyan-300 text-xs sm:text-sm font-mono backdrop-blur-md glow-cyan">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>Available for ML & Full-Stack Engineering</span>
            </div>

            <div className="space-y-1 sm:space-y-2">
              <p className="text-cyan-400 font-mono text-sm sm:text-base lg:text-lg tracking-wide">
                Hi, my name is
              </p>
              <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-extrabold text-white tracking-tight leading-[1.1]">
                {personalInfo.name}
              </h1>
            </div>

            <div className="min-h-[3rem] sm:min-h-[3.5rem] lg:min-h-[4rem] flex items-center">
              <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold text-gradient leading-tight">
                {displayedText}
                <span className="animate-pulse text-cyan-400 font-mono">|</span>
              </h2>
            </div>

            <p className="text-slate-300 text-sm sm:text-base lg:text-lg max-w-2xl leading-relaxed font-normal">
              Specialized in developing intelligent deep learning neural architectures, scalable NLP pipelines, and production full-stack systems with an active passion for MLOps and cloud automation.
            </p>

            <div className="p-3 sm:p-3.5 rounded-xl bg-slate-900/60 border border-slate-700/50 backdrop-blur-md max-w-xl flex items-center gap-3 text-xs sm:text-sm text-slate-300 italic">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 flex-shrink-0" />
              <span>"{personalInfo.bioQuote}"</span>
            </div>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  onExploreProjects();
                }}
                className="btn-solid group text-xs sm:text-sm py-2.5 sm:py-3 px-4 sm:px-6"
              >
                <span>Explore Featured Work</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              <button
                onClick={onOpenChat}
                className="btn-primary group text-xs sm:text-sm py-2.5 sm:py-3 px-4 sm:px-6"
              >
                <Brain className="w-4 h-4 text-cyan-400" />
                <span>Chat with Nexus AI</span>
              </button>

              <a
                href="#contact"
                className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg border border-slate-700 hover:border-cyan-400/50 text-slate-300 hover:text-white font-mono text-xs sm:text-sm transition-all duration-200 bg-slate-900/40 backdrop-blur-sm"
              >
                Get In Touch
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-3 text-slate-400">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-500">Connect:</span>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noreferrer"
                className="p-2 sm:p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-400/40 hover:text-cyan-400 transition-all hover:scale-105"
                title="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2 sm:p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-blue-400/40 hover:text-blue-400 transition-all hover:scale-105"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={personalInfo.instagram}
                target="_blank"
                rel="noreferrer"
                className="p-2 sm:p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-pink-400/40 hover:text-pink-400 transition-all hover:scale-105"
                title="Instagram Profile"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="p-2 sm:p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-400/40 hover:text-cyan-400 transition-all hover:scale-105"
                title="Direct Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href={personalInfo.gmailComposeUrl}
                target="_blank"
                rel="noreferrer"
                className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 hover:text-white text-xs font-mono flex items-center gap-1.5 transition-all"
                title="Open in Gmail"
              >
                <span>Gmail Me</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 xl:col-span-4 flex justify-center w-full">
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-sm">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-3xl blur-xl opacity-40 group-hover:opacity-70 transition duration-1000 animate-pulse-glow" />
              
              <div className="relative glass-card p-5 sm:p-6 rounded-2xl space-y-4 sm:space-y-5 border-cyan-500/30">
                <div className="flex items-center gap-3.5 sm:gap-4 pb-3.5 sm:pb-4 border-b border-slate-700/50">
                  <div className="relative flex-shrink-0">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full p-0.5 bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-500 shadow-xl shadow-cyan-500/25">
                      <img
                        src={personalInfo.avatar}
                        alt={personalInfo.name}
                        className="w-full h-full rounded-full object-cover object-center border-2 border-[#0A192F]"
                      />
                    </div>
                    <div className="absolute bottom-0.5 right-0.5 sm:bottom-1 sm:right-1 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-emerald-400 rounded-full border-2 border-[#0A192F] shadow-sm" title="Online & Available" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white leading-tight">
                      {personalInfo.name}
                    </h3>
                    <p className="text-xs font-mono text-cyan-300 mt-0.5">
                      @nomanabdullah04
                    </p>
                    <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                      <span>{personalInfo.location}</span>
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                  {personalInfo.stats.map((stat, idx) => {
                    const IconComponent = iconMap[stat.icon] || Zap;
                    return (
                      <div
                        key={idx}
                        className="p-2.5 sm:p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/30 transition-all"
                      >
                        <div className="flex items-center gap-1.5 text-cyan-400 mb-1">
                          <IconComponent className="w-3.5 h-3.5" />
                          <span className="text-[11px] sm:text-xs font-mono text-slate-400">{stat.label.split(' ')[0]}</span>
                        </div>
                        <div className="text-lg sm:text-xl font-bold text-white font-mono">
                          {stat.value}
                        </div>
                        <div className="text-[10px] text-slate-500 leading-tight truncate">
                          {stat.label}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="p-3 sm:p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 font-mono text-xs space-y-1 text-slate-300">
                  <div className="flex items-center justify-between text-slate-500 pb-1 border-b border-slate-800">
                    <span className="flex items-center gap-1.5 text-[11px]">
                      <Terminal className="w-3 h-3 text-cyan-400" />
                      nexus_kernel.py
                    </span>
                    <span className="text-[10px] text-emerald-400">ACTIVE</span>
                  </div>
                  <div className="text-slate-400 text-[11px] sm:text-xs">
                    <span className="text-purple-400">from</span> nexus <span className="text-purple-400">import</span> NeuralEngine
                  </div>
                  <div className="text-slate-400 text-[11px] sm:text-xs">
                    model = NeuralEngine.<span className="text-cyan-300">deploy</span>()
                  </div>
                  <div className="text-emerald-300 text-[10px] sm:text-[11px]">
                    &gt;&gt; Ready to build extraordinary tech.
                  </div>
                </div>

                <button
                  onClick={onOpenChat}
                  className="w-full py-2 sm:py-2.5 px-4 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-medium flex items-center justify-center gap-2 transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  Ask AI About Noman's Stack
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-500 hover:text-cyan-400 transition-colors z-10 font-mono text-xs"
      >
        <span className="hidden sm:inline">Scroll Down</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </a>
    </section>
  );
}
