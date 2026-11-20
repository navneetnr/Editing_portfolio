import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import './Hero.css';

const enter = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0 } };

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 130]);
  const portraitRotate = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -6]);
  const portraitTiltX = useTransform(scrollYProgress, [0, 1], [reduceMotion ? 0 : 2, reduceMotion ? 0 : -2]);

  return (
    <section id="hero" ref={sectionRef} className="hero-grid relative min-h-[100svh] overflow-hidden bg-paper text-ink">
      <div className="absolute inset-0 editorial-grid opacity-70" aria-hidden="true" />
      <div className="relative z-[1] mx-auto flex min-h-[100svh] max-w-[1600px] flex-col justify-between px-5 pb-7 pt-28 sm:px-10 lg:px-16">
        <div className="flex items-start justify-between font-mono text-[10px] uppercase tracking-[0.18em] sm:text-xs">
          <span>Portfolio / Creative Practice</span>
          <span className="max-w-36 text-right sm:max-w-none">Video · Graphic · Motion</span>
        </div>

        <div className="relative mt-16 grid flex-1 grid-cols-1 items-center lg:mt-0 lg:grid-cols-12">
          <motion.div
            initial={reduceMotion ? 'visible' : 'hidden'} animate="visible" transition={{ staggerChildren: 0.12, delayChildren: 0.15 }}
            className="relative z-[2] lg:col-span-9"
          >
            <motion.p variants={enter} transition={{ duration: 0.7 }} className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-red-700 sm:text-xs">
              VIDEO EDITOR | GRAPHIC DESIGNER | MOTION DESIGNER
            </motion.p>
            <motion.div variants={enter} transition={{ duration: 0.8 }} className="hero-name-stage">
              <h1 className="hero-name-layer hero-name-back max-w-[7ch] font-display text-[clamp(4.5rem,14vw,12rem)] font-extrabold uppercase leading-[0.72] tracking-[-0.095em]">
                NAVNEET RANJAN
              </h1>
              <motion.div
                style={reduceMotion ? undefined : { y: portraitY, rotate: portraitRotate, rotateX: portraitTiltX }}
                className="hero-portrait-depth pointer-events-none"
              >
                <div className="portrait-frame hero-portrait-frame relative w-full border-[8px] border-red-700 bg-[#e8e3d9] shadow-[18px_18px_0_#171717]">
                  <img
                    src="/assets/profile/navneet-hero.png"
                    alt="NAVNEET RANJAN illustrated portrait"
                    className="hero-portrait-image w-full object-cover object-center mix-blend-multiply"
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    onError={(event) => {
                      const image = event.currentTarget;
                      if (image.dataset.fallback !== 'true') {
                        image.dataset.fallback = 'true';
                        image.src = '/assets/profile/navneet-about-portrait.png';
                        return;
                      }
                      image.style.display = 'none';
                      image.parentElement.classList.add('portrait-missing');
                    }}
                  />
                  <div className="portrait-fallback absolute inset-0 -z-0 items-center justify-center bg-[#d9d2c5] font-display text-[6rem] font-bold tracking-[-0.12em] text-red-800/80">N<span className="text-ink">.</span></div>
                  <span className="absolute -bottom-8 -left-6 rotate-[-4deg] bg-paper px-2 py-1.5 font-mono text-[8px] uppercase tracking-[0.13em]">NAVNEET RANJAN / VISUAL STORYTELLER</span>
                </div>
              </motion.div>
              <h1 aria-hidden="true" className="hero-name-layer hero-name-front max-w-[7ch] font-display text-[clamp(4.5rem,14vw,12rem)] font-extrabold uppercase leading-[0.72] tracking-[-0.095em]">
                NAVNEET RANJAN
              </h1>
            </motion.div>
            <motion.div variants={enter} transition={{ duration: 0.8 }} className="relative mt-4 flex items-center gap-3 sm:mt-7">
              <span className="h-px w-9 bg-red-700 sm:w-16" />
              <p className="font-display text-[clamp(2.4rem,9.2vw,8rem)] font-bold uppercase leading-[0.78] tracking-[-0.075em]">Portfolio</p>
            </motion.div>
            <motion.div variants={enter} transition={{ duration: 0.7 }} className="mt-8 flex max-w-xl flex-col gap-5 sm:mt-10 sm:flex-row sm:items-end sm:justify-between">
              <p className="max-w-sm text-sm leading-relaxed text-ink/70 sm:text-base">Video edits, graphic compositions and motion pieces shaped around a story.</p>
              <a href="#projects" className="editorial-link inline-flex w-fit items-center gap-2 border-b border-ink/50 pb-2 font-mono text-[10px] uppercase tracking-[0.16em] hover:border-red-700 hover:text-red-700">
                Explore selected work <ArrowUpRight size={14} />
              </a>
            </motion.div>
          </motion.div>

        </div>

        <div className="mt-14 flex items-end justify-between border-t border-ink/20 pt-4 font-mono text-[9px] uppercase tracking-[0.16em] sm:text-[10px]">
          <span>Video Editing · Graphic Design · Motion Graphics</span>
          <a href="#about" className="group flex items-center gap-2" aria-label="Scroll to about section">Scroll to explore <span className="scroll-arrow inline-flex h-8 w-8 items-center justify-center rounded-full border border-ink/40 group-hover:border-red-700 group-hover:text-red-700"><ArrowDown size={14} /></span></a>
        </div>
      </div>
    </section>
  );
}
