import { motion, useReducedMotion } from 'framer-motion';
import { createPortal } from 'react-dom';
import { Film, Instagram, Play, Plus, X } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { instagramReelUrls } from '../data/instagramReels';
import { instagramReelCovers } from '../data/instagramReelCovers';
import './Showreel.css';

let instagramEmbedScriptPromise;
const INSTAGRAM_EMBED_SCRIPT = 'https://www.instagram.com/embed.js';

function isPublicReelUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:'
      && ['instagram.com', 'www.instagram.com'].includes(url.hostname)
      && /^\/reel\/[A-Za-z0-9_-]+\/?$/.test(url.pathname);
  } catch {
    return false;
  }
}

function loadInstagramEmbedScript() {
  if (window.instgrm?.Embeds?.process) return Promise.resolve();
  if (instagramEmbedScriptPromise) return instagramEmbedScriptPromise;

  instagramEmbedScriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = INSTAGRAM_EMBED_SCRIPT;
    script.async = true;
    script.onload = resolve;
    script.onerror = () => reject(new Error('Instagram embed script failed to load.'));
    document.head.appendChild(script);
  });
  return instagramEmbedScriptPromise;
}

function InstagramReelModal({ url, onClose }) {
  const [embedError, setEmbedError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    loadInstagramEmbedScript()
      .then(() => { if (!cancelled) window.instgrm?.Embeds?.process(); })
      .catch(() => { if (!cancelled) setEmbedError(true); });
    return () => { cancelled = true; };
  }, [url]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (event) => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return createPortal(
    <div className="instagram-modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="instagram-modal" role="dialog" aria-modal="true" aria-label="Instagram Reel player">
        <button type="button" className="instagram-modal-close" onClick={onClose} aria-label="Close Reel player"><X size={20} /></button>
        <div className="instagram-modal-content">
          {embedError ? (
            <div className="instagram-reel-loading"><Film size={18} aria-hidden="true" /><span>PLAYER UNAVAILABLE</span></div>
          ) : (
            <blockquote className="instagram-media" data-instgrm-permalink={url} data-instgrm-version="14" data-instgrm-captioned>
              <a href={url} target="_blank" rel="noreferrer">View this reel on Instagram</a>
            </blockquote>
          )}
        </div>
        <a className="instagram-modal-link" href={url} target="_blank" rel="noreferrer">VIEW ON INSTAGRAM <span aria-hidden="true">?</span></a>
      </section>
    </div>,
    document.body,
  );
}

function InstagramReelMarquee({ reels, reduceMotion }) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [touchPaused, setTouchPaused] = useState(false);
  const [missingCovers, setMissingCovers] = useState({});
  const closeModal = useCallback(() => {
    setSelectedIndex(null);
    setTouchPaused(false);
  }, []);
  const reelIndices = reels.map((_, index) => index);
  const duplicatedIndices = [...reelIndices, ...reelIndices];

  const renderReelCard = (index, duplicate) => {
    const shortcode = new URL(reels[index]).pathname.split('/')[2];
    const cover = instagramReelCovers[reels[index]];
    return (
      <button
        key={`${duplicate ? 'duplicate-' : 'reel-'}${index}`}
        type="button"
        className={`instagram-marquee-card${selectedIndex === index ? ' is-selected' : ''}`}
        onClick={() => setSelectedIndex(index)}
        onPointerDown={(event) => { if (event.pointerType === 'touch') setTouchPaused(true); }}
        onPointerUp={(event) => { if (event.pointerType === 'touch') window.setTimeout(() => setTouchPaused(false), 350); }}
        aria-label={`Play Instagram Reel ${shortcode}`}
        tabIndex={duplicate ? -1 : 0}
      >
        {cover && !missingCovers[index] ? (
          <img className="instagram-marquee-card-image" src={cover} alt="" loading="lazy" onError={() => setMissingCovers((current) => ({ ...current, [index]: true }))} />
        ) : (
          <span className="instagram-marquee-card-missing">COVER REQUIRED <small>{cover?.split('/').pop() ?? 'Add a cover mapping'}</small></span>
        )}
        <span className="instagram-marquee-card-top"><span>INSTAGRAM / REEL</span><Instagram size={15} aria-hidden="true" /></span>
        <span className="instagram-marquee-card-play" aria-hidden="true"><Play size={23} fill="currentColor" /></span>
        <span className="instagram-marquee-card-bottom"><span>{shortcode}</span><span>PLAY REEL</span></span>
      </button>
    );
  };

  return (
    <div className={`instagram-marquee mt-12${touchPaused ? ' is-touch-paused' : ''}${selectedIndex !== null ? ' is-modal-open' : ''}`}>
      <div className="instagram-marquee-viewport" role="region" aria-label="Instagram Reels" aria-roledescription="carousel">
        <div className="instagram-marquee-track" style={reduceMotion ? { animation: 'none', transform: 'none' } : undefined}>
          <div className="instagram-marquee-group" aria-label="Instagram Reels">
            {reelIndices.map((index) => renderReelCard(index, false))}
          </div>
          <div className="instagram-marquee-group" aria-hidden="true">
            {duplicatedIndices.slice(reels.length).map((index) => renderReelCard(index, true))}
          </div>
        </div>
      </div>
      {selectedIndex !== null && <InstagramReelModal key={selectedIndex} url={reels[selectedIndex]} onClose={closeModal} />}
    </div>
  );
}

export default function Showreel() {
  const reduceMotion = useReducedMotion();
  const reels = instagramReelUrls.filter(isPublicReelUrl);

  return (
    <section id="showcase" className="showcase-section overflow-hidden bg-ink px-5 py-24 text-paper sm:px-10 sm:py-32 lg:px-16">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="mb-4 inline-block bg-red-700 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-white">05 / Edit · Design · Motion</p>
            <h2 className="inline-block bg-red-700 px-3 py-2 font-display text-[clamp(3.4rem,10vw,9rem)] font-bold uppercase leading-[0.77] tracking-[-0.085em] text-white">Showreel<span className="text-white/70">.</span></h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-paper/60">Selected edits, cut for the scroll and built to stay with you.</p>
        </div>
        {reels.length > 0 ? (
          <InstagramReelMarquee reels={reels} reduceMotion={reduceMotion} />
        ) : (
          <motion.div initial={reduceMotion ? false : { opacity: 0, y: 30 }} whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.22 }} transition={{ duration: 0.7 }} className="relative mt-12 flex aspect-video min-h-[16rem] items-center justify-center overflow-hidden border border-paper/25 bg-[#202020] sm:min-h-[24rem]">
            <div className="showcase-section absolute inset-0 opacity-80" aria-hidden="true" />
            <div className="absolute inset-5 border border-paper/15 sm:inset-8" aria-hidden="true" />
            <div className="absolute left-8 top-8 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.17em] text-paper/55 sm:left-12 sm:top-12"><Film size={13} className="text-red-400" /> SHOWREEL / MEDIA SLOT</div>
            <div className="relative z-[1] flex flex-col items-center px-4 text-center"><span className="mb-5 grid h-12 w-12 place-items-center rounded-full border border-red-500/70 text-red-400"><Plus size={20} /></span><p className="font-display text-[clamp(1.3rem,4vw,3.2rem)] font-bold uppercase tracking-[-0.05em]">Your showreel goes here</p><p className="mt-3 font-mono text-[9px] uppercase tracking-[0.16em] text-paper/45">Placeholder — no video supplied</p></div>
            <span className="absolute bottom-8 right-8 font-mono text-[9px] tracking-[0.15em] text-paper/45 sm:bottom-12 sm:right-12">NAVNEET RANJAN · 2026</span>
          </motion.div>
        )}
      </div>
    </section>
  );
}
