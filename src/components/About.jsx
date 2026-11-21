import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import './About.css';

const tools = [
  { number: '01', name: 'Adobe Premiere Pro', mark: 'Pr' },
  { number: '02', name: 'Adobe After Effects', mark: 'Ae' },
  { number: '03', name: 'Adobe Photoshop', mark: 'Ps' },
  { number: '04', name: 'CapCut', mark: 'Cc' },
];

const words = [
  { text: 'I’m NAVNEET RANJAN, a creative enthusiast', accent: false },
  { text: 'passionate about video editing, graphic design', accent: true },
  { text: 'and visual storytelling. I enjoy turning ideas', accent: false },
  { text: 'into engaging visuals through cinematic edits,', accent: true },
  { text: 'creative compositions and motion graphics.', accent: false },
];

export default function About() {
  const sectionRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const portraitY = useTransform(scrollYProgress, [0, 1], [reduceMotion ? 0 : 42, reduceMotion ? 0 : -38]);
  const portraitRotate = useTransform(scrollYProgress, [0, 1], [reduceMotion ? 0 : 2, reduceMotion ? 0 : -2]);

  const revealLines = reduceMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };
  const collageReveal = (delay, distance = 12) => reduceMotion
    ? { initial: false }
    : {
      initial: { opacity: 0, y: distance, scale: 0.94 },
      whileInView: { opacity: 1, y: 0, scale: 1 },
      viewport: { once: true, amount: 0.45 },
      transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
    };

  return (
    <section id="about" ref={sectionRef} className="about-editorial" aria-labelledby="about-heading">
      <div className="about-transition" aria-hidden="true" />

      <div className="about-marquee" aria-label="Behind the frames — beyond the pixels —">
        <div className={`about-marquee-track ${reduceMotion ? 'about-marquee-static' : ''}`} aria-hidden="true">
          {[0, 1].map((copy) => (
            <span className="about-marquee-copy" key={copy}>
              <span>BEHIND THE <em>FRAMES</em></span>
              <i>—</i>
              <span>BEYOND THE <em>PIXELS</em></span>
              <i>—</i>
            </span>
          ))}
        </div>
      </div>

      <div className="about-layout">
        <motion.div
          className="about-copy"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.28 }}
          transition={{ staggerChildren: reduceMotion ? 0 : 0.11 }}
        >
          <motion.div variants={revealLines} transition={{ duration: reduceMotion ? 0 : 0.55 }} className="about-eyebrow">
            <span className="about-index">02 / ABOUT ME</span>
            <span className="about-rule" />
            <span>INDEPENDENT CREATIVE</span>
          </motion.div>

          <motion.h2 id="about-heading" variants={revealLines} transition={{ duration: reduceMotion ? 0 : 0.65 }} className="about-title">
            WHO<br /><span>AM I</span><b>?</b>
          </motion.h2>

          <div className="about-intro" aria-label="Introduction">
            {words.map((line, index) => (
              <motion.p
                key={line.text}
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.65 }}
                transition={{ duration: 0.5, delay: reduceMotion ? 0 : index * 0.09 }}
                className={line.accent ? 'about-intro-accent' : ''}
              >
                {line.text}
              </motion.p>
            ))}
          </div>

          <motion.div variants={revealLines} transition={{ duration: reduceMotion ? 0 : 0.55 }} className="about-tools">
            <div className="about-tools-heading">
              <span>TOOLS I CREATE WITH</span>
              <span className="about-tools-mark">A—Z / 04</span>
            </div>
            <div className="about-tool-list">
              {tools.map((tool) => (
                <div className="about-tool" key={tool.number}>
                  <span className="about-tool-number">{tool.number}</span>
                  <span className="about-tool-mark" aria-hidden="true">{tool.mark}</span>
                  <span className="about-tool-name">{tool.name}</span>
                  <ArrowUpRight className="about-tool-arrow" size={15} aria-hidden="true" />
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <div className="about-portrait-column">
          <motion.div
            className="about-portrait-parallax"
            style={reduceMotion ? undefined : { y: portraitY, rotate: portraitRotate }}
          >
            <motion.div
              className="about-portrait-mask"
              initial={reduceMotion ? false : { clipPath: 'inset(100% 0 0 0)' }}
              whileInView={reduceMotion ? undefined : { clipPath: 'inset(0% 0 0 0)' }}
              viewport={{ once: true, amount: 0.28 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="about-portrait-frame">
                <div className="about-portrait-image-wrap">
                  <img
                    src="/assets/profile/Monochrome%20Grid%20Paper%20Portrait.png"
                    alt="NAVNEET RANJAN"
                    className="about-portrait-image"
                    loading="lazy"
                    decoding="async"
                    onError={(event) => {
                      event.currentTarget.style.display = 'none';
                      event.currentTarget.parentElement.classList.add('about-portrait-missing');
                    }}
                  />
                  <div className="about-portrait-placeholder" aria-hidden="true"><span>NR</span><small>ORIGINAL PORTRAIT<br />GOES HERE</small></div>
                </div>
                <div className="about-photo-caption"><span>NAVNEET RANJAN · VISUAL STORYTELLER</span><span>FIG. 01</span></div>
              </div>
            </motion.div>
            <motion.span {...collageReveal(0.16, 22)} className="about-red-paper" aria-hidden="true" />
            <motion.span {...collageReveal(0.32)} className="about-side-note" aria-hidden="true">FRAME BY FRAME<br />IDEA BY IDEA</motion.span>
            <motion.img
              {...collageReveal(0.42, 16)}
              className="about-note-portrait"
              src="/assets/profile/navneet-about-portrait-outline.png"
              alt="NAVNEET RANJAN portrait on the red paper collage"
              loading="lazy"
              decoding="async"
            />
            <motion.span {...collageReveal(0.48)} className="about-hand-note" aria-hidden="true">made of moments ↗</motion.span>
            <motion.span {...collageReveal(0.62, 8)} className="about-crosshair about-crosshair-one" aria-hidden="true">✳</motion.span>
            <motion.span {...collageReveal(0.74, 8)} className="about-crosshair about-crosshair-two" aria-hidden="true">＋</motion.span>
          </motion.div>
          <a className="about-scroll-cue" href="#skills"><span>KEEP EXPLORING</span><ArrowDown size={14} /></a>
        </div>
      </div>

      <div className="about-bottom-line"><span>INDEPENDENT CREATIVE</span><span>VIDEO / DESIGN / MOTION</span><span>02 — 06</span></div>
      <div className="about-exit-transition" aria-hidden="true" />
    </section>
  );
}
