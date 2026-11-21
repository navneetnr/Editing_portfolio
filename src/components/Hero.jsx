import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useEffect, useLayoutEffect, useRef } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import './Hero.css';

const enter = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0 } };
const heroName = 'NAVNEET RANJAN';

function renderNameLetters(word, reduceMotion, prefix) {
  return Array.from(word, (character, index) => (
    <MagneticLetter key={`${prefix}-${character}-${index}`} character={character} reduceMotion={reduceMotion} />
  ));
}

function MagneticLetter({ character, reduceMotion }) {
  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);
  const targetRotate = useMotionValue(0);
  const targetScale = useMotionValue(1);
  const x = useSpring(targetX, { stiffness: 360, damping: 28, mass: 0.35 });
  const y = useSpring(targetY, { stiffness: 360, damping: 28, mass: 0.35 });
  const rotate = useSpring(targetRotate, { stiffness: 360, damping: 28, mass: 0.35 });
  const scale = useSpring(targetScale, { stiffness: 360, damping: 28, mass: 0.35 });

  const handlePointerMove = (event) => {
    if (reduceMotion || event.pointerType === 'touch') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const horizontal = (event.clientX - (bounds.left + bounds.width / 2)) / (bounds.width / 2 || 1);
    const vertical = (event.clientY - (bounds.top + bounds.height / 2)) / (bounds.height / 2 || 1);
    targetX.set(horizontal * 3.5);
    targetY.set(vertical * 3.5);
    targetRotate.set(horizontal * 2);
    targetScale.set(1.035);
  };

  const resetLetter = () => {
    targetX.set(0);
    targetY.set(0);
    targetRotate.set(0);
    targetScale.set(1);
  };

  return (
    <motion.span
      className="hero-letter"
      style={reduceMotion ? undefined : { x, y, rotate, scale }}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetLetter}
      onPointerCancel={resetLetter}
      aria-hidden="true"
    >
      {character}
    </motion.span>
  );
}

function InteractiveGrid({ reduceMotion }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d', { alpha: true });
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!canvas || !context || reduceMotion || !finePointer.matches) return undefined;

    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let frameId = 0;
    let impulse = null;
    let previousPointer = null;

    const drawGrid = (now) => {
      context.clearRect(0, 0, width, height);
      context.strokeStyle = 'rgba(23, 23, 23, 0.08)';
      context.lineWidth = 1;

      let age = 0;
      let strength = 0;
      if (impulse) {
        age = now - impulse.time;
        if (age > 1150) impulse = null;
        else strength = impulse.strength * Math.exp(-age / 470);
      }

      const spacing = width <= 640 ? 32 : 44;
      const displace = (x, y) => {
        if (!impulse || strength < 0.06) return [x, y];
        const dx = x - impulse.x;
        const dy = y - impulse.y;
        const distance = Math.hypot(dx, dy);
        if (distance < 1 || distance > 520) return [x, y];
        const ring = Math.sin(distance * 0.045 - age * 0.016);
        const offset = ring * strength * Math.exp(-distance / 165);
        return [x + (dx / distance) * offset, y + (dy / distance) * offset];
      };

      const drawLine = (vertical, position) => {
        context.beginPath();
        let started = false;
        const limit = vertical ? height : width;
        for (let step = 0; step <= limit; step += 8) {
          const point = vertical ? displace(position, step) : displace(step, position);
          if (!started) {
            context.moveTo(point[0], point[1]);
            started = true;
          } else {
            context.lineTo(point[0], point[1]);
          }
        }
        context.stroke();
      };

      for (let x = 0.5; x <= width; x += spacing) drawLine(true, x);
      for (let y = 0.5; y <= height; y += spacing) drawLine(false, y);
    };

    const requestDraw = () => {
      if (!frameId) frameId = window.requestAnimationFrame(animate);
    };

    function animate(now) {
      frameId = 0;
      drawGrid(now);
      if (impulse) requestDraw();
    }

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      drawGrid(performance.now());
    };

    const onPointerMove = (event) => {
      if (event.pointerType !== 'mouse') return;
      const bounds = canvas.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) return;

      const now = performance.now();
      let strength = 4;
      if (previousPointer) {
        const elapsed = Math.max(now - previousPointer.time, 1);
        const speed = Math.hypot(event.clientX - previousPointer.x, event.clientY - previousPointer.y) / elapsed;
        strength = Math.min(8, 3.5 + speed * 2.5);
      }
      previousPointer = { x: event.clientX, y: event.clientY, time: now };
      impulse = { x: event.clientX - bounds.left, y: event.clientY - bounds.top, time: now, strength };
      requestDraw();
    };

    canvas.classList.add('editorial-grid-active');
    resize();
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(resize);
    observer?.observe(canvas);
    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      observer?.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
      canvas.classList.remove('editorial-grid-active');
    };
  }, [reduceMotion]);

  return <canvas ref={canvasRef} className="editorial-grid editorial-grid-canvas absolute inset-0 opacity-70" aria-hidden="true" />;
}

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const sectionHeightRef = useRef(0);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const measure = () => { sectionHeightRef.current = section.getBoundingClientRect().height; };
    measure();
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(measure);
    observer?.observe(section);
    window.addEventListener('resize', measure, { passive: true });
    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  // Counter the Hero's upward travel slightly so the portrait falls through the viewport
  // while remaining visible, then reaches zero opacity exactly as the section exits.
  const portraitY = useTransform(scrollYProgress, (progress) => progress * sectionHeightRef.current * 1.38);
  const portraitRotate = useTransform(scrollYProgress, [0, 1], [0, 2]);
  const portraitTiltX = useTransform(scrollYProgress, [0, 1], [0, 2]);
  const portraitScaleX = useTransform(scrollYProgress, [0, 0.36, 0.72, 1], [1, 0.88, 0.66, 0.5]);
  const portraitScaleY = useTransform(scrollYProgress, [0, 0.36, 0.72, 1], [1, 1.06, 1.03, 0.9]);
  const portraitOpacity = useTransform(scrollYProgress, [0, 0.55, 0.88, 0.99, 1], [1, 0.9, 0.55, 0.18, 0]);
  const rectangularFrame = 'polygon(50% 0%, 100% 0%, 100% 30%, 100% 60%, 100% 100%, 70% 100%, 30% 100%, 0% 100%, 0% 60%, 0% 30%, 0% 0%, 30% 0%)';
  const dropletFrame = 'polygon(50% 0%, 78% 20%, 95% 45%, 100% 68%, 95% 84%, 78% 96%, 50% 100%, 22% 96%, 5% 84%, 0% 68%, 5% 45%, 22% 20%)';
  const portraitClip = useTransform(scrollYProgress, [0, 0.3, 0.74, 1], [rectangularFrame, rectangularFrame, dropletFrame, dropletFrame]);
  const portraitFilter = useTransform(scrollYProgress, [0, 0.8, 1], ['blur(0px)', 'blur(0.4px)', 'blur(1.2px)']);

  return (
    <section id="hero" ref={sectionRef} className="hero-grid relative min-h-[100svh] overflow-visible bg-paper text-ink">
      <InteractiveGrid reduceMotion={reduceMotion} />
      <div className="relative z-[1] mx-auto flex min-h-[100svh] max-w-[1600px] flex-col justify-between px-5 pb-7 pt-28 sm:px-10 lg:px-16">
        <div className="flex items-start justify-between font-mono text-[10px] uppercase tracking-[0.18em] sm:text-xs">
          <span>Portfolio / Creative Practice</span>
          <span className="max-w-36 text-right sm:max-w-none">Video · Graphic · Motion</span>
        </div>

        <div className="relative mt-16 grid flex-1 grid-cols-1 items-center lg:mt-0 lg:grid-cols-12">
          <motion.div
            initial={reduceMotion ? 'visible' : 'hidden'} animate="visible" transition={{ staggerChildren: 0.12, delayChildren: 0.15 }}
            className="relative z-[2] col-span-full"
          >
            <motion.p variants={enter} transition={{ duration: 0.7 }} className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-red-700 sm:text-xs">
              VIDEO EDITOR | GRAPHIC DESIGNER | MOTION DESIGNER
            </motion.p>
            <motion.div variants={enter} transition={{ duration: 0.8 }} className="hero-name-stage">
              <h1 aria-label={heroName} className="hero-name-title font-display font-extrabold uppercase text-ink">
                <span className="hero-name-row" aria-hidden="true">{renderNameLetters('NAVNEET', reduceMotion, 'first')}</span>
                <span className="hero-name-row hero-name-last" aria-hidden="true">
                  {renderNameLetters('RANJAN', reduceMotion, 'last')}
                  <motion.span
                    style={reduceMotion ? undefined : {
                      y: portraitY,
                      rotate: portraitRotate,
                      rotateX: portraitTiltX,
                      scaleX: portraitScaleX,
                      scaleY: portraitScaleY,
                      opacity: portraitOpacity,
                    }}
                    className="hero-portrait-depth pointer-events-none"
                    aria-hidden="true"
                  >
                    <span
                      className="portrait-frame hero-portrait-frame relative block w-full border-[8px] border-red-700 bg-[#e8e3d9]"
                      style={reduceMotion ? undefined : { clipPath: portraitClip, filter: portraitFilter }}
                    >
                      <img
                        src="/assets/profile/navneet-about-portrait.png"
                        alt=""
                        className="hero-portrait-image w-full object-cover object-center mix-blend-multiply"
                        loading="eager"
                        fetchPriority="high"
                        decoding="async"
                        onError={(event) => {
                          const image = event.currentTarget;
                          image.style.display = 'none';
                          image.parentElement.classList.add('portrait-missing');
                        }}
                      />
                      <span className="portrait-fallback absolute inset-0 -z-0 items-center justify-center bg-[#d9d2c5] font-display text-[6rem] font-bold tracking-[-0.12em] text-red-800/80">N<span className="text-ink">.</span></span>
                    </span>
                  </motion.span>
                </span>
              </h1>
            </motion.div>
            <motion.div variants={enter} transition={{ duration: 0.8 }} className="relative mt-2 flex w-fit items-center gap-3 sm:mt-3">
              <p className="font-display text-[clamp(1.3rem,5vw,4.5rem)] font-bold uppercase leading-[0.82] tracking-[-0.075em]">Portfolio</p>
              <span className="h-px w-9 bg-red-700 sm:w-16" />
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
