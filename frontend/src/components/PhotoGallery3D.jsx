import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Camera, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  X, 
  Terminal,
  Sparkles,
  Image as ImageIcon
} from 'lucide-react';

// ============================================================
// 📸 GALLERY IMAGES CONFIGURATION
// Add your images here! Put your photos in /public/slider/
// ============================================================
const galleryImages = [
  {
    src: '/slider/1.jpg',
    caption: 'Moment 1',
    description: 'Add your description here'
  },
  {
    src: '/slider/2.jpg',
    caption: 'Moment 2',
    description: 'Add your description here'
  },
  {
    src: '/slider/3.jpg',
    caption: 'Moment 3',
    description: 'Add your description here'
  },
  {
    src: '/slider/4.jpg',
    caption: 'Moment 4',
    description: 'Add your description here'
  },
  {
    src: '/slider/5.jpg',
    caption: 'Moment 5',
    description: 'Add your description here'
  },
  {
    src: '/slider/6.jpg',
    caption: 'Moment 6',
    description: 'Add your description here'
  },
  {
    src: '/slider/7.jpg',
    caption: 'Moment 7',
    description: 'Add your description here'
  },
];

export default function PhotoGallery3D() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [loadedImages, setLoadedImages] = useState({});
  const autoPlayRef = useRef(null);
  const containerRef = useRef(null);

  const totalImages = galleryImages.length;

  // Preload images and track which ones exist
  useEffect(() => {
    galleryImages.forEach((img, index) => {
      const image = new window.Image();
      image.onload = () => {
        setLoadedImages(prev => ({ ...prev, [index]: true }));
      };
      image.onerror = () => {
        setLoadedImages(prev => ({ ...prev, [index]: false }));
      };
      image.src = img.src;
    });
  }, []);

  // Auto-play carousel
  useEffect(() => {
    if (isAutoPlaying && !isLightboxOpen && !isDragging) {
      autoPlayRef.current = setInterval(() => {
        setActiveIndex(prev => (prev + 1) % totalImages);
      }, 4000);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isAutoPlaying, isLightboxOpen, isDragging, totalImages]);

  const goTo = useCallback((index) => {
    setActiveIndex(((index % totalImages) + totalImages) % totalImages);
  }, [totalImages]);

  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
    setIsAutoPlaying(false);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setIsAutoPlaying(true);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isLightboxOpen) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') setLightboxIndex(prev => (prev - 1 + totalImages) % totalImages);
        if (e.key === 'ArrowRight') setLightboxIndex(prev => (prev + 1) % totalImages);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, totalImages]);

  // Touch/drag handling
  const handleDragStart = (e) => {
    setIsDragging(true);
    const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    setDragStartX(clientX);
  };

  const handleDragEnd = (e) => {
    if (!isDragging) return;
    setIsDragging(false);
    const clientX = e.type === 'touchend' ? e.changedTouches[0].clientX : e.clientX;
    const diff = dragStartX - clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goNext();
      else goPrev();
    }
  };

  // Get position offset for 3D carousel
  const getCardStyle = (index) => {
    let diff = index - activeIndex;
    
    // Wrap around for circular carousel
    if (diff > totalImages / 2) diff -= totalImages;
    if (diff < -totalImages / 2) diff += totalImages;

    const isActive = diff === 0;
    const absD = Math.abs(diff);

    if (absD > 3) {
      return {
        transform: `translateX(${diff * 100}px) translateZ(-600px) rotateY(${diff * 25}deg)`,
        opacity: 0,
        zIndex: 0,
        pointerEvents: 'none',
        filter: 'blur(8px) brightness(0.3)',
      };
    }

    const translateX = diff * 280;
    const translateZ = isActive ? 0 : -150 * absD;
    const rotateY = diff * -25;
    const scale = isActive ? 1 : Math.max(0.65, 1 - absD * 0.18);
    const opacity = isActive ? 1 : Math.max(0.3, 1 - absD * 0.35);
    const blur = isActive ? 0 : absD * 3;
    const brightness = isActive ? 1 : 0.6;

    return {
      transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
      opacity,
      zIndex: 10 - absD,
      pointerEvents: isActive ? 'auto' : 'auto',
      filter: `blur(${blur}px) brightness(${brightness})`,
      cursor: isActive ? 'zoom-in' : 'pointer',
    };
  };

  // Count available images
  const availableCount = Object.values(loadedImages).filter(Boolean).length;

  return (
    <section id="gallery" className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-orange-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/50 border border-amber-400/20 text-amber-300 font-mono text-xs">
            <Camera className="w-3.5 h-3.5" />
            <span>05. PHOTO GALLERY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
            Visual <span className="text-gradient">Highlights</span>
          </h2>
          <p className="text-slate-400 max-w-2xl text-sm sm:text-base">
            A curated collection of memorable moments, events, and behind-the-scenes snapshots.
          </p>
        </div>

        {/* 3D Carousel Container */}
        {availableCount > 0 ? (
          <div className="relative">
            {/* Carousel */}
            <div 
              ref={containerRef}
              className="gallery-3d-container relative h-[350px] sm:h-[420px] lg:h-[480px] flex items-center justify-center"
              style={{ perspective: '1200px' }}
              onMouseDown={handleDragStart}
              onMouseUp={handleDragEnd}
              onTouchStart={handleDragStart}
              onTouchEnd={handleDragEnd}
            >
              {galleryImages.map((img, index) => {
                if (loadedImages[index] === false) return null;
                const cardStyle = getCardStyle(index);
                const isActive = index === activeIndex;

                return (
                  <div
                    key={index}
                    className="gallery-3d-card absolute"
                    style={{
                      ...cardStyle,
                      transition: isDragging ? 'none' : 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
                      transformStyle: 'preserve-3d',
                      width: 'clamp(260px, 40vw, 420px)',
                    }}
                    onClick={() => {
                      if (isActive) openLightbox(index);
                      else goTo(index);
                    }}
                  >
                    <div className={`relative rounded-2xl overflow-hidden border-2 transition-all duration-500 shadow-2xl ${
                      isActive 
                        ? 'border-amber-400/60 shadow-[0_0_40px_rgba(245,158,11,0.25)]' 
                        : 'border-stone-800/50 shadow-stone-900/60'
                    }`}>
                      {/* Image */}
                      <div className="aspect-[4/3] overflow-hidden bg-stone-950">
                        <img
                          src={img.src}
                          alt={img.caption}
                          className="w-full h-full object-cover"
                          draggable={false}
                        />
                      </div>

                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                      {/* Caption */}
                      <div className={`absolute bottom-0 left-0 right-0 p-4 transition-opacity duration-500 ${
                        isActive ? 'opacity-100' : 'opacity-0'
                      }`}>
                        <h4 className="text-white font-bold text-sm sm:text-base">{img.caption}</h4>
                        <p className="text-slate-300 text-xs mt-0.5">{img.description}</p>
                      </div>

                      {/* Zoom icon on active */}
                      {isActive && (
                        <div className="absolute top-3 right-3 p-1.5 rounded-lg bg-black/50 backdrop-blur-md border border-white/10 text-white/70 hover:text-white transition-colors">
                          <Maximize2 className="w-4 h-4" />
                        </div>
                      )}

                      {/* 3D reflection effect on active card */}
                      {isActive && (
                        <div 
                          className="absolute inset-0 pointer-events-none"
                          style={{
                            background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.06) 45%, transparent 50%)',
                          }}
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={() => { goPrev(); setIsAutoPlaying(false); }}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3 rounded-full bg-stone-900/80 backdrop-blur-md border border-stone-700 hover:border-amber-400/50 text-stone-300 hover:text-amber-400 transition-all hover:scale-110 shadow-xl"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => { goNext(); setIsAutoPlaying(false); }}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3 rounded-full bg-stone-900/80 backdrop-blur-md border border-stone-700 hover:border-amber-400/50 text-stone-300 hover:text-amber-400 transition-all hover:scale-110 shadow-xl"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Dots Indicator */}
            <div className="flex items-center justify-center gap-2 mt-8">
              {galleryImages.map((_, index) => {
                if (loadedImages[index] === false) return null;
                return (
                  <button
                    key={index}
                    onClick={() => { goTo(index); setIsAutoPlaying(false); }}
                    className={`transition-all duration-300 rounded-full ${
                      index === activeIndex
                        ? 'w-8 h-2.5 bg-gradient-to-r from-amber-400 to-orange-500 shadow-[0_0_12px_rgba(245,158,11,0.5)]'
                        : 'w-2.5 h-2.5 bg-stone-700 hover:bg-stone-500'
                    }`}
                  />
                );
              })}
            </div>

            {/* Auto-play toggle */}
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className={`px-3 py-1.5 rounded-full text-[11px] font-mono border transition-all ${
                  isAutoPlaying
                    ? 'bg-amber-950/60 border-amber-400/30 text-amber-300'
                    : 'bg-stone-900/60 border-stone-700 text-stone-400 hover:text-white'
                }`}
              >
                {isAutoPlaying ? '⏸ Auto-play ON' : '▶ Auto-play OFF'}
              </button>
            </div>
          </div>
        ) : (
          /* Empty state — no images loaded yet */
          <div className="text-center py-20 glass-card rounded-2xl border-stone-800 max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-amber-950/60 border border-amber-400/30 flex items-center justify-center text-amber-400 mx-auto mb-4">
              <ImageIcon className="w-8 h-8" />
            </div>
            <h3 className="text-white font-bold text-lg mb-2">Gallery Coming Soon</h3>
            <p className="text-slate-400 text-sm mb-1">
              Add your photos to <code className="text-amber-300 bg-stone-900 px-1.5 py-0.5 rounded text-xs font-mono">/public/slider/</code>
            </p>
            <p className="text-slate-500 text-xs font-mono">
              Name them: 1.jpg, 2.jpg, 3.jpg, etc.
            </p>
          </div>
        )}
      </div>

      {/* ==================== LIGHTBOX ==================== */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2.5 rounded-full bg-stone-900/80 border border-stone-700 text-white hover:text-amber-400 hover:border-amber-400/50 transition-all z-50"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Navigation */}
          <button
            onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex - 1 + totalImages) % totalImages); }}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-stone-900/60 border border-stone-700 text-white hover:text-amber-400 hover:border-amber-400/50 transition-all z-50"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex + 1) % totalImages); }}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-stone-900/60 border border-stone-700 text-white hover:text-amber-400 hover:border-amber-400/50 transition-all z-50"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Lightbox Image */}
          <div 
            className="max-w-5xl max-h-[85vh] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={galleryImages[lightboxIndex].src}
              alt={galleryImages[lightboxIndex].caption}
              className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl border border-stone-800"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent rounded-b-xl">
              <h4 className="text-white font-bold text-base">
                {galleryImages[lightboxIndex].caption}
              </h4>
              <p className="text-slate-300 text-sm">
                {galleryImages[lightboxIndex].description}
              </p>
              <span className="text-amber-400 text-xs font-mono mt-1 block">
                {lightboxIndex + 1} / {totalImages}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
