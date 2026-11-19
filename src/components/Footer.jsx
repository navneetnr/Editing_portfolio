import React from 'react';
import { Clapperboard, ArrowUp, Heart, Film } from 'lucide-react';
import { personalData } from '../data/personalData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#1a1a1a] bg-[#070707] py-12 px-4 sm:px-6 lg:px-8 text-zinc-400">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand Monogram */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#141414] border border-[#242424] flex items-center justify-center text-[#FF6B35]">
            <Clapperboard className="w-4 h-4 text-[#FF6B35]" />
          </div>
          <div>
            <div className="font-display font-bold text-sm text-white tracking-wider uppercase">
              {personalData.name}
            </div>
            <div className="text-[10px] font-mono text-zinc-500">
              {personalData.role}
            </div>
          </div>
        </div>

        {/* Center Copyright & Craft note */}
        <div className="text-center text-xs font-mono text-zinc-500 space-y-1">
          <div>
            &copy; {new Date().getFullYear()} {personalData.name}. All Rights Reserved.
          </div>
          <div className="text-[11px] text-zinc-600">
            Designed for cinematic impact • Timeline precision
          </div>
        </div>

        {/* Back to Top Button */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121212] hover:bg-[#1c1c1c] border border-[#242424] hover:border-[#FF6B35] text-xs font-mono text-zinc-300 hover:text-white transition-all group"
            aria-label="Back to top"
          >
            <span>TOP OF TIMELINE</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#FF6B35] group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </footer>
  );
}
