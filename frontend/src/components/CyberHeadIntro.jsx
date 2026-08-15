import React, { useEffect, useRef, useState } from 'react';

function createReferenceProfileHead() {
  const gridNodes = [];
  const gridLines = [];
  const pixelTiles = [];

  const rows = 32; 
  const cols = 28; 

  for (let r = 0; r <= rows; r++) {
    const rowPts = [];
    const v = r / rows; 
    const y = -60 + v * 125; 

    let frontX = 35; 
    let skullRadiusZ = 45;
    let skullRadiusX = 38;

    if (y > 40) {
      
      const t = (y - 40) / 25;
      frontX = 35 - t * t * 24;
      skullRadiusZ = 45 * Math.sqrt(Math.max(0, 1 - t * t));
      skullRadiusX = 38 * Math.sqrt(Math.max(0, 1 - t * t));
    } else if (y > 20) {
      
      const t = (y - 20) / 20;
      frontX = 38 + Math.sin(t * Math.PI) * 4;
      skullRadiusX = 38;
    } else if (y > 0) {
      
      const noseT = y / 20;
      const noseProtrusion = Math.sin(noseT * Math.PI) * 16;
      frontX = 36 + noseProtrusion;
      skullRadiusX = 34 - Math.sin(noseT * Math.PI) * 4;
    } else if (y > -14) {
      
      const lipT = (y + 14) / 14;
      frontX = 34 + Math.sin(lipT * Math.PI) * 6;
      skullRadiusX = 30;
    } else if (y > -28) {
      
      const chinT = (y + 28) / 14;
      frontX = 32 + Math.sin(chinT * Math.PI) * 7;
      skullRadiusX = 28;
    } else if (y > -44) {
      
      const t = (y + 44) / 16;
      frontX = 26 + t * 6;
      skullRadiusX = 24 + t * 4;
    } else {
      
      frontX = 18;
      skullRadiusX = 20;
      skullRadiusZ = 28;
    }

    for (let c = 0; c <= cols; c++) {
      const u = c / cols; 
      const angle = -Math.PI + u * Math.PI; 

      let x = frontX * u + skullRadiusX * Math.cos(angle) * (1 - u * 0.7);
      let z = skullRadiusZ * Math.sin(angle);

      if (u > 0.82) {
        const profileT = (u - 0.82) / 0.18;
        x = x * (1 - profileT) + frontX * profileT;
        z = z * (1 - profileT * 0.9);
      }

      const startX = x - (320 + Math.random() * 450);
      const startY = y + (Math.random() - 0.5) * 160;
      const startZ = z + (Math.random() - 0.5) * 220;

      const isDisintegrated = u < 0.40 && Math.random() > (u / 0.40) * 1.3;

      rowPts.push({
        targetX: x,
        targetY: y,
        targetZ: z,
        startX,
        startY,
        startZ,
        x: startX,
        y: startY,
        z: startZ,
        u,
        v,
        isDisintegrated,
        r,
        c
      });
    }
    gridNodes.push(rowPts);
  }

  for (let r = 0; r <= rows; r++) {
    for (let c = 0; c <= cols; c++) {
      const pCurrent = gridNodes[r][c];
      if (c < cols) {
        const pRight = gridNodes[r][c + 1];
        if (pRight && !pCurrent.isDisintegrated && !pRight.isDisintegrated) {
          gridLines.push({ p1: pCurrent, p2: pRight });
        }
      }
      if (r < rows) {
        const pDown = gridNodes[r + 1][c];
        if (pDown && !pCurrent.isDisintegrated && !pDown.isDisintegrated) {
          gridLines.push({ p1: pCurrent, p2: pDown });
        }
      }
    }
  }

  for (let i = 0; i < 360; i++) {
    const rIdx = Math.floor(Math.random() * rows);
    const cIdx = Math.floor(Math.random() * (cols * 0.48)); 
    const baseNode = gridNodes[rIdx][cIdx];

    const disperseX = -(Math.random() * 160 + 8);
    const disperseY = (Math.random() - 0.5) * 80;
    const disperseZ = (Math.random() - 0.5) * 90;

    const startX = baseNode.targetX + disperseX - (300 + Math.random() * 400);
    const startY = baseNode.targetY + disperseY + (Math.random() - 0.5) * 150;
    const startZ = baseNode.targetZ + disperseZ;

    pixelTiles.push({
      targetX: baseNode.targetX + disperseX,
      targetY: baseNode.targetY + disperseY,
      targetZ: baseNode.targetZ + disperseZ,
      startX,
      startY,
      startZ,
      x: startX,
      y: startY,
      z: startZ,
      size: Math.random() * 3.6 + 1.6, 
      alpha: Math.min(1.0, Math.random() * 0.65 + 0.35),
      color: Math.random() > 0.4 ? '#00d2ff' : Math.random() > 0.5 ? '#0070f3' : '#38bdf8',
      rotSpeed: (Math.random() - 0.5) * 2.5,
      driftSpeedX: -(Math.random() * 0.4 + 0.15),
      driftSpeedY: (Math.random() - 0.5) * 0.2,
    });
  }

  return { gridNodes, gridLines, pixelTiles };
}

export default function CyberHeadIntro({ onComplete }) {
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const [visitorName, setVisitorName] = useState('Visionary');
  const [isReturningUser, setIsReturningUser] = useState(false);
  const [typedTitle, setTypedTitle] = useState('');
  const [isFadingOut, setIsFadingOut] = useState(false);

  const [progressPercent, setProgressPercent] = useState(0);

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const queryName = params.get('name') || params.get('user') || params.get('visitor');

      let resolvedName = '';
      let returning = false;

      if (queryName && queryName.trim().length > 0) {
        resolvedName = queryName.trim();
        resolvedName = resolvedName.charAt(0).toUpperCase() + resolvedName.slice(1);
        localStorage.setItem('nexus_portfolio_user_name', resolvedName);
      } else {
        const storedName = localStorage.getItem('nexus_portfolio_user_name') || 
                           localStorage.getItem('visitor_name') || 
                           localStorage.getItem('user_name');
        if (storedName && storedName.trim().length > 0) {
          resolvedName = storedName.trim();
          returning = true;
        }
      }

      const visitCount = parseInt(localStorage.getItem('nexus_portfolio_visit_count') || '0', 10) + 1;
      localStorage.setItem('nexus_portfolio_visit_count', visitCount.toString());
      if (visitCount > 1) {
        returning = true;
      }

      if (!resolvedName) {
        const hour = new Date().getHours();
        const fallbacks = [
          'Visionary Explorer',
          'Tech Innovator',
          'Future Architect',
          'Digital Pioneer'
        ];
        resolvedName = fallbacks[(hour + new Date().getDay()) % fallbacks.length];
      }

      setVisitorName(resolvedName);
      setIsReturningUser(returning);
    } catch (e) {
      setVisitorName('Visionary Explorer');
    }
  }, []);

  useEffect(() => {
    if (!visitorName) return;

    const fullMessage = isReturningUser 
      ? `WELCOME BACK, ${visitorName.toUpperCase()}`
      : `WELCOME, ${visitorName.toUpperCase()}`;

    let charIdx = 0;
    const typeInterval = setInterval(() => {
      if (charIdx <= fullMessage.length) {
        setTypedTitle(fullMessage.slice(0, charIdx));
        charIdx++;
      } else {
        clearInterval(typeInterval);
      }
    }, 45);

    const startProgressTime = Date.now();
    const progressDuration = 4400;
    const progressTimer = setInterval(() => {
      const elapsed = Date.now() - startProgressTime;
      const pct = Math.min(100, Math.floor((elapsed / progressDuration) * 100));
      setProgressPercent(pct);
      if (pct >= 100) clearInterval(progressTimer);
    }, 30);

    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 4400);

    const completeTimer = setTimeout(() => {
      handleComplete();
    }, 5000);

    return () => {
      clearInterval(typeInterval);
      clearInterval(progressTimer);
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [visitorName, isReturningUser]);

  const handleComplete = () => {
    try {
      sessionStorage.setItem('nexus_intro_seen', 'true');
      localStorage.setItem('nexus_intro_last_seen', Date.now().toString());
    } catch (e) {}
    if (onComplete) onComplete();
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.code === 'Space') {
        handleComplete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const baseRotY = 0.25;
    const baseRotX = 0.04;
    let targetRotY = 0;
    let targetRotX = 0;
    let rotY = baseRotY;
    let rotX = baseRotX;

    const handleMouseMove = (e) => {
      const mouseX = (e.clientX - width / 2) / (width / 2);
      const mouseY = (e.clientY - height / 2) / (height / 2);
      targetRotY = mouseX * 0.18;
      targetRotX = -mouseY * 0.10;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const { gridNodes, gridLines, pixelTiles } = createReferenceProfileHead();
    const allNodes = gridNodes.flat();
    const startTime = Date.now();

    const render = () => {
      const now = Date.now();
      const elapsed = (now - startTime) / 1000;

      ctx.fillStyle = '#010613';
      ctx.fillRect(0, 0, width, height);

      const headCenterScreenY = height * 0.38;
      const headCenterScreenX = width * 0.52;

      const bgGlow = ctx.createRadialGradient(
        headCenterScreenX + 110, headCenterScreenY - 15, 10,
        headCenterScreenX + 110, headCenterScreenY - 15, Math.max(width, height) * 0.65
      );
      bgGlow.addColorStop(0, 'rgba(0, 102, 255, 0.35)');
      bgGlow.addColorStop(0.35, 'rgba(0, 210, 255, 0.12)');
      bgGlow.addColorStop(0.75, 'rgba(1, 6, 19, 0.4)');
      bgGlow.addColorStop(1, 'rgba(1, 6, 19, 0)');
      ctx.fillStyle = bgGlow;
      ctx.fillRect(0, 0, width, height);

      const assembleT = Math.min(1, elapsed / 0.85);
      const easeAssemble = 1 - Math.pow(1 - assembleT, 3); 

      const isDissolving = elapsed > 4.4;
      const dissolveFactor = isDissolving ? (elapsed - 4.4) * 3.5 : 0;

      rotY += (baseRotY + targetRotY + Math.sin(elapsed * 1.1) * 0.05 - rotY) * 0.08;
      rotX += (baseRotX + targetRotX + Math.cos(elapsed * 0.8) * 0.03 - rotX) * 0.08;

      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      const fov = 640;
      const cameraZ = 310;
      const headScale = Math.min(width, height) < 640 ? 1.5 : 1.95;

      allNodes.forEach((p) => {
        if (!isDissolving) {
          p.x = p.startX + (p.targetX - p.startX) * easeAssemble;
          p.y = p.startY + (p.targetY - p.startY) * easeAssemble;
          p.z = p.startZ + (p.targetZ - p.startZ) * easeAssemble;
        } else {
          p.z += 25 * dissolveFactor;
          p.x -= 25 * dissolveFactor;
        }

        const scaledX = p.x * headScale;
        const scaledY = p.y * headScale;
        const scaledZ = p.z * headScale;

        const x1 = scaledX * cosY - scaledZ * sinY;
        const z1 = scaledZ * cosY + scaledX * sinY;

        const y2 = scaledY * cosX - z1 * sinX;
        const z2 = z1 * cosX + scaledY * sinX;

        const totalZ = z2 + cameraZ;
        if (totalZ > 20) {
          const scale = fov / totalZ;
          p.projX = headCenterScreenX + x1 * scale;
          p.projY = headCenterScreenY - y2 * scale;
          p.scale = scale;
        } else {
          p.projX = -9999;
          p.projY = -9999;
        }
      });

      if (assembleT > 0.15) {
        const lineAlpha = Math.min(1.0, Math.max(0.2, (assembleT - 0.15) * 1.3));
        ctx.lineWidth = 1.3;

        gridLines.forEach(({ p1, p2 }) => {
          if (p1.projX > -500 && p2.projX > -500) {
            const avgU = (p1.u + p2.u) * 0.5;
            ctx.strokeStyle = avgU > 0.75 ? '#00f7ff' : avgU > 0.4 ? '#00a6ff' : '#0055ff';
            ctx.globalAlpha = lineAlpha * (0.45 + avgU * 0.55);
            ctx.beginPath();
            ctx.moveTo(p1.projX, p1.projY);
            ctx.lineTo(p2.projX, p2.projY);
            ctx.stroke();
          }
        });
      }

      if (assembleT > 0.25) {
        allNodes.forEach((p) => {
          if (p.isDisintegrated || p.projX < -500) return;
          ctx.fillStyle = p.u > 0.78 ? '#ffffff' : p.u > 0.45 ? '#00f7ff' : '#0077ff';
          ctx.globalAlpha = p.u > 0.75 ? 0.95 : 0.65;
          ctx.beginPath();
          ctx.arc(p.projX, p.projY, Math.max(1.2, 1.6 * p.scale), 0, Math.PI * 2);
          ctx.fill();
        });
      }

      pixelTiles.forEach((tile) => {
        if (!isDissolving) {
          tile.x = tile.startX + (tile.targetX - tile.startX) * easeAssemble;
          tile.y = tile.startY + (tile.targetY - tile.startY) * easeAssemble;
          tile.z = tile.startZ + (tile.targetZ - tile.startZ) * easeAssemble;
        } else {
          tile.x -= 35 * dissolveFactor;
          tile.z += 20 * dissolveFactor;
        }

        tile.x += tile.driftSpeedX * 0.4;
        tile.y += tile.driftSpeedY * 0.4;

        const curX = tile.x * headScale;
        const curY = tile.y * headScale;
        const curZ = tile.z * headScale;

        const x1 = curX * cosY - curZ * sinY;
        const z1 = curZ * cosY + curX * sinY;
        const y2 = curY * cosX - z1 * sinX;
        const z2 = z1 * cosX + curY * sinX;

        const totalZ = z2 + cameraZ;
        if (totalZ > 20) {
          const scale = fov / totalZ;
          const px = headCenterScreenX + x1 * scale;
          const py = headCenterScreenY - y2 * scale;
          const pSize = Math.max(1.6, tile.size * scale);

          ctx.save();
          ctx.translate(px, py);
          ctx.rotate(elapsed * tile.rotSpeed);

          ctx.fillStyle = tile.color;
          ctx.globalAlpha = Math.min(1.0, Math.max(0.1, tile.alpha * (isDissolving ? Math.max(0, 1 - dissolveFactor * 0.5) : 1)));

          ctx.fillRect(-pSize / 2, -pSize / 2, pSize, pSize);

          if (tile.size > 2.8) {
            ctx.strokeStyle = '#00f7ff';
            ctx.lineWidth = 0.8;
            ctx.strokeRect(-pSize / 2, -pSize / 2, pSize, pSize);
          }

          ctx.restore();
        }
      });
      ctx.globalAlpha = 1.0;

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div 
      className={`fixed inset-0 z-[99999] bg-[#010613] text-slate-100 flex flex-col items-center justify-between p-6 select-none transition-all duration-700 ${
        isFadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full block cursor-crosshair z-0"
      />

      <div className="relative z-10 w-full max-w-6xl flex items-center justify-between pt-2">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
          <span>INITIALIZING INTERACTIVE PORTFOLIO</span>
        </div>

        <button
          onClick={handleComplete}
          className="px-3.5 py-1 rounded-full bg-slate-900/60 hover:bg-cyan-950/80 border border-slate-800 hover:border-cyan-500/50 text-xs font-mono text-slate-400 hover:text-cyan-300 transition-all cursor-pointer backdrop-blur-md"
        >
          Skip [ESC]
        </button>
      </div>

      <div className="relative z-10 w-full max-w-xl flex flex-col items-center text-center pb-8">
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-500/30 text-[11px] font-mono tracking-wider text-cyan-300 mb-2.5 backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.15)]">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
          <span>{isReturningUser ? 'AUTHENTICATED ACCESS' : 'NEURAL INTERFACE CONNECTED'}</span>
        </div>

        <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-2 min-h-[3rem] sm:min-h-[3.5rem] flex items-center justify-center font-['Space_Grotesk']">
          <span className="bg-gradient-to-r from-white via-cyan-100 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_2px_12px_rgba(6,182,212,0.3)]">
            {typedTitle}
          </span>
          <span className="inline-block w-[2.5px] h-6 sm:h-9 ml-2 bg-cyan-400 animate-pulse rounded-full align-middle shadow-[0_0_8px_#22d3ee]"></span>
        </h1>

        <p className="text-xs sm:text-sm text-slate-300 font-sans tracking-normal mb-4 font-normal">
          {isReturningUser 
            ? 'Session restored. Launching personalized workspace...' 
            : 'Synchronizing interactive portfolio & experience matrix...'}
        </p>

        <div className="w-56 sm:w-64 h-1.5 bg-slate-900/90 rounded-full overflow-hidden p-[1px] border border-slate-800/90 relative">
          <div 
            className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-teal-300 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.6)] transition-all duration-75"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
}
