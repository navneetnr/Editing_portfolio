import React from 'react';
import { Film, Sparkles, Sliders, Volume2, Clock, CheckCircle } from 'lucide-react';
import { personalData } from '../data/personalData';

export default function About() {
  const { about, name, role } = personalData;

  const getPillarIcon = (index) => {
    switch (index) {
      case 0: return <Clock className="w-5 h-5 text-[#FF6B35]" />;
      case 1: return <Sliders className="w-5 h-5 text-[#FF6B35]" />;
      case 2: return <Volume2 className="w-5 h-5 text-[#FF6B35]" />;
      default: return <Film className="w-5 h-5 text-[#FF6B35]" />;
    }
  };

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left: Portrait / Image Presentation */}
        <div className="lg:col-span-5 relative">
          <div className="relative mx-auto max-w-md lg:max-w-none">
            
            {/* Cinematic frame container */}
            <div className="relative rounded-2xl overflow-hidden bg-[#111111] border border-[#242424] shadow-2xl">
              <img
                src={about.portraitImage}
                alt={`${name} - ${role}`}
                className="w-full aspect-[4/5] object-cover object-center filter contrast-110 brightness-95"
                loading="lazy"
              />
              
              {/* Filmic gradient & vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-black/30" />

              {/* Slate stamp at the bottom of the portrait */}
              <div className="absolute bottom-4 inset-x-4 p-4 rounded-xl bg-black/75 backdrop-blur-md border border-white/10 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">{name}</h4>
                  <p className="text-[11px] font-mono text-[#FF6B35]">{role}</p>
                </div>
                <div className="text-right">
                  <span className="inline-block px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/40 text-[10px] font-mono text-emerald-400">
                    {about.statusBadge}
                  </span>
                </div>
              </div>
            </div>

            {/* Accent decorative film edge dots */}
            <div className="hidden sm:flex absolute -left-4 top-10 flex-col gap-3 pointer-events-none">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]" />
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]" />
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
            </div>
          </div>
        </div>

        {/* Right: Narrative & Philosophy */}
        <div className="lg:col-span-7 space-y-8">
          
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#FF6B35] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Personal Narrative</span>
            </div>

            <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight leading-tight">
              {about.heading}
            </h2>
          </div>

          <p className="text-base sm:text-lg text-zinc-300 font-normal leading-relaxed">
            {about.description}
          </p>

          {/* Craft Pillars (Focusing on creative execution rather than invented claims) */}
          <div className="pt-2">
            <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-5 flex items-center gap-2">
              <Film className="w-4 h-4 text-[#FF6B35]" />
              <span>Core Craft Foundations</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {about.craftPillars.map((pillar, idx) => (
                <div 
                  key={idx}
                  className="p-4 rounded-xl bg-[#0f0f0f] border border-[#1e1e1e] hover:border-[#2b2b2b] transition-colors"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-[#161616] border border-[#242424]">
                      {getPillarIcon(idx)}
                    </div>
                    <h4 className="text-sm font-bold text-white tracking-wide">
                      {pillar.title}
                    </h4>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Location & Direct CTA */}
          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-[#1a1a1a]">
            <div className="text-xs font-mono text-zinc-400">
              <span className="text-zinc-600 mr-2">LOCATION:</span>
              <span className="text-zinc-200">{about.location}</span>
            </div>

            <a
              href="#contact"
              className="text-xs font-semibold uppercase tracking-wider text-[#FF6B35] hover:text-[#ff814f] flex items-center gap-1.5 transition-colors"
            >
              <span>Discuss a collaboration</span>
              <span aria-hidden="true">&rarr;</span>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
