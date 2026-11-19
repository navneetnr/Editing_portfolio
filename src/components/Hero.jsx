import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, ArrowDown, Sparkles, Film, ArrowRight } from 'lucide-react';
import { personalData } from '../data/personalData';

export default function Hero({ onOpenFeaturedShowreel }) {
  const [timecode, setTimecode] = useState('00:00:00:00');

  // Cinematic running timecode counter effect
  useEffect(() => {
    let frame = 0;
    const interval = setInterval(() => {
      frame++;
      const frames = String(frame % 24).padStart(2, '0');
      const seconds = String(Math.floor((frame / 24) % 60)).padStart(2, '0');
      const minutes = String(Math.floor((frame / 1440) % 60)).padStart(2, '0');
      setTimecode(`00:${minutes}:${seconds}:${frames}`);
    }, 41.6); // ~24 fps timing

    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const elem = document.querySelector(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex flex-col justify-center items-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#080808]"
    >
      {/* Cinematic subtle background grid & vignette */}
      <div className="absolute inset-0 cinematic-grid opacity-30 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/40 via-transparent to-[#080808] pointer-events-none" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#FF6B35]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Camera Slate & REC bar */}
      <div className="w-full max-w-5xl mb-6 flex items-center justify-between text-[11px] font-mono tracking-widest text-zinc-500 border-b border-[#1c1c1c] pb-3 px-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
          <span className="text-zinc-300 font-semibold tracking-wider">REC</span>
          <span className="hidden sm:inline text-zinc-600">|</span>
          <span className="hidden sm:inline text-zinc-400">RAW 4K DCI</span>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-[#FF6B35] font-semibold">{timecode}</span>
          <span className="hidden sm:inline text-zinc-600">|</span>
          <span className="hidden sm:inline text-zinc-400">23.976 FPS</span>
          <span className="text-zinc-600">|</span>
          <span className="text-zinc-300">ISO 800</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto text-center z-10">
        
        {/* Role Tag badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121212] border border-[#242424] text-xs uppercase tracking-widest text-zinc-300 mb-6"
        >
          <Film className="w-3.5 h-3.5 text-[#FF6B35]" />
          <span>{personalData.tagline}</span>
        </motion.div>

        {/* Large Bold Cinematic Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[0.98] text-white uppercase mb-6"
        >
          Crafting Stories <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400">
            Through Every
          </span>{' '}
          <span className="text-[#FF6B35] relative inline-block">
            Frame.
            <svg 
              className="absolute -bottom-2 left-0 w-full text-[#FF6B35]/40" 
              viewBox="0 0 100 8" 
              preserveAspectRatio="none"
              height="6"
            >
              <path d="M0,5 Q50,0 100,5" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
          </span>
        </motion.h1>

        {/* Short Introduction Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-2xl mx-auto text-base sm:text-lg text-zinc-400 font-normal leading-relaxed mb-10 px-2"
        >
          {personalData.shortIntro}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 mb-14"
        >
          {/* Prominent View My Work Button */}
          <a
            href="#work"
            onClick={(e) => scrollToSection(e, '#work')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#FF6B35] text-black font-bold text-sm tracking-wider uppercase hover:bg-[#ff814f] transition-all duration-200 shadow-lg shadow-[#FF6B35]/25 hover:shadow-[#FF6B35]/40 active:scale-95 group"
          >
            <span>View My Work</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>

          {/* Contact Me Button */}
          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, '#contact')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#141414] hover:bg-[#1f1f1f] border border-[#2b2b2b] hover:border-zinc-500 text-white font-medium text-sm tracking-wider uppercase transition-all duration-200 active:scale-95"
          >
            <span>Contact Me</span>
          </a>

          {/* Watch Showreel Quick Trigger */}
          <button
            type="button"
            onClick={onOpenFeaturedShowreel}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-transparent hover:bg-white/5 text-zinc-300 hover:text-white border border-dashed border-zinc-700 hover:border-[#FF6B35] font-medium text-xs tracking-wider uppercase transition-all"
          >
            <Play className="w-3.5 h-3.5 fill-[#FF6B35] text-[#FF6B35]" />
            <span>Play Showreel</span>
          </button>
        </motion.div>

        {/* Featured Video Preview Frame / Visual Hook */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative max-w-4xl mx-auto rounded-xl overflow-hidden border border-[#222222] bg-[#111111] shadow-2xl group cursor-pointer"
          onClick={onOpenFeaturedShowreel}
        >
          {/* Film Letterbox preview */}
          <div className="relative aspect-[21/9] sm:aspect-[2.39/1] overflow-hidden">
            <img 
              src={personalData.showreel.posterUrl}
              alt="Cinematic frame preview"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-90 contrast-110"
              loading="eager"
            />
            {/* Cinematic Gradient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-black/20 to-black/40" />
            
            {/* Center Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#FF6B35] group-hover:text-black group-hover:border-transparent transition-all duration-300 text-white shadow-2xl">
                <Play className="w-7 h-7 fill-current ml-1" />
              </div>
            </div>

            {/* Top Slate Label */}
            <div className="absolute top-3 left-4 flex items-center gap-2 text-[10px] sm:text-xs font-mono uppercase tracking-wider text-zinc-300 bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]" />
              <span>Cinematic Showreel Preview</span>
            </div>

            {/* Bottom Info Bar */}
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-zinc-300">
              <span className="bg-black/70 backdrop-blur-sm px-2 py-0.5 rounded border border-white/10">
                {personalData.showreel.resolution}
              </span>
              <span className="bg-black/70 backdrop-blur-sm px-2 py-0.5 rounded border border-white/10 text-[#FF6B35]">
                Click to Watch Full Reel
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Small Scroll Indicator */}
      <div className="mt-12 z-10 flex flex-col items-center gap-2 text-zinc-500">
        <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-500">
          Scroll to explore
        </span>
        <a 
          href="#work"
          onClick={(e) => scrollToSection(e, '#work')}
          className="w-6 h-10 rounded-full border border-zinc-700 flex items-start justify-center p-1.5 hover:border-[#FF6B35] transition-colors"
          aria-label="Scroll down to work section"
        >
          <div className="w-1 h-2 bg-[#FF6B35] rounded-full animate-bounce" />
        </a>
      </div>
    </section>
  );
}
