import { motion, useReducedMotion } from 'framer-motion';
import { Film, Plus } from 'lucide-react';

export default function Showreel() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="showcase" className="showcase-section overflow-hidden bg-ink px-5 py-24 text-paper sm:px-10 sm:py-32 lg:px-16">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-red-400">05 / Edit · Design · Motion</p>
            <h2 className="font-display text-[clamp(3.4rem,10vw,9rem)] font-bold uppercase leading-[0.77] tracking-[-0.085em]">Showreel<span className="text-red-500">.</span></h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-paper/60">A home for a real reel preview. Add your own showreel video when you’re ready to share it.</p>
        </div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 30 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.22 }}
          transition={{ duration: 0.7 }}
          className="relative mt-12 flex aspect-video min-h-[16rem] items-center justify-center overflow-hidden border border-paper/25 bg-[#202020] sm:min-h-[24rem]"
        >
          <div className="showcase-section absolute inset-0 opacity-80" aria-hidden="true" />
          <div className="absolute inset-5 border border-paper/15 sm:inset-8" aria-hidden="true" />
          <div className="absolute left-8 top-8 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.17em] text-paper/55 sm:left-12 sm:top-12">
            <Film size={13} className="text-red-400" /> SHOWREEL / MEDIA SLOT
          </div>
          <div className="relative z-[1] flex flex-col items-center px-4 text-center">
            <span className="mb-5 grid h-12 w-12 place-items-center rounded-full border border-red-500/70 text-red-400"><Plus size={20} /></span>
            <p className="font-display text-[clamp(1.3rem,4vw,3.2rem)] font-bold uppercase tracking-[-0.05em]">Your showreel goes here</p>
            <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.16em] text-paper/45">Placeholder — no video supplied</p>
          </div>
          <span className="absolute bottom-8 right-8 font-mono text-[9px] tracking-[0.15em] text-paper/45 sm:bottom-12 sm:right-12">NAVNEET RANJAN · 2026</span>
        </motion.div>
      </div>
    </section>
  );
}
