import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import './Navbar.css';

const links = [['About', '#about'], ['Practice', '#skills'], ['Work', '#projects'], ['Showreel', '#showcase'], ['Contact', '#contact']];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [heroVisible, setHeroVisible] = useState(true);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 48);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  useEffect(() => {
    const hero = document.getElementById('hero');
    if (!hero || !('IntersectionObserver' in window)) return undefined;

    const observer = new IntersectionObserver(([entry]) => {
      const visible = entry.isIntersecting && entry.intersectionRatio > 0;
      setHeroVisible(visible);
      if (!visible) setOpen(false);
    }, { threshold: 0 });

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <header
      aria-hidden={!heroVisible}
      className={`site-navbar fixed inset-x-0 top-0 z-40 text-white ${heroVisible ? '' : 'is-hidden'} ${scrolled ? 'is-scrolled border-b border-white/10' : ''}`}
    >
      <svg className="navbar-brush" viewBox="0 0 1600 100" preserveAspectRatio="none" aria-hidden="true">
        <path fill="#171717" d="M0 16 38 12 73 17 111 10 153 14 194 8 235 12 279 7 320 13 366 9 410 15 451 8 495 13 536 9 581 14 622 7 666 13 709 9 751 15 794 8 838 12 880 7 924 14 966 9 1008 15 1052 8 1097 13 1140 7 1185 14 1228 9 1272 15 1316 8 1359 13 1402 7 1448 14 1490 9 1534 15 1570 10 1600 17 1595 77 1560 72 1521 80 1480 74 1437 82 1397 76 1354 83 1312 77 1270 84 1227 76 1185 82 1141 75 1098 83 1054 77 1010 84 967 76 923 82 879 75 836 83 792 77 748 84 704 76 661 82 617 74 574 82 530 76 486 84 442 77 399 82 356 74 313 81 269 75 225 83 181 76 138 82 95 74 51 81 7 75Z" />
        <path fill="#a91f22" d="M0 78 63 73 104 77 168 70 229 77 292 72 352 79 414 71 480 77 543 70 605 76 670 69 731 76 794 70 858 77 921 69 984 75 1047 68 1110 75 1173 70 1237 77 1300 68 1364 75 1427 69 1491 76 1550 70 1600 75 1600 83 1548 79 1490 87 1426 80 1364 88 1300 79 1237 86 1172 79 1110 87 1046 78 984 86 921 79 858 87 793 79 731 86 670 78 605 86 543 79 480 87 414 79 352 86 292 78 229 85 168 77 104 84 63 78 0 85Z" />
        <path fill="#171717" opacity=".72" d="M16 8 184 11 236 6 332 10 416 7 502 11 611 5 693 10 782 6 896 10 1005 5 1083 11 1198 7 1280 12 1381 6 1488 11 1584 8 1593 20 1496 18 1407 22 1297 17 1190 21 1090 17 1004 23 892 18 785 22 686 17 599 23 495 18 410 21 326 17 232 20 178 16 20 20Z" />
      </svg>
      <div className="relative z-10 mx-auto flex max-w-[1600px] items-center justify-between px-5 py-4 sm:px-10 lg:px-16">
        <a href="#hero" className="font-display text-xs font-bold uppercase tracking-[-0.035em] sm:text-sm">NAVNEET RANJAN</a>
        <nav className="hidden items-center gap-8 md:flex">{links.map(([label, href], index) => <a key={href} href={href} className="font-mono text-[9px] uppercase tracking-[0.16em] opacity-70 transition-opacity hover:opacity-100"><span className="mr-2 text-red-400">0{index + 1}</span>{label}</a>)}</nav>
        <a href="https://github.com/navneetnr" target="_blank" rel="noreferrer" className="hidden items-center gap-2 font-mono text-[9px] uppercase tracking-[0.14em] sm:flex">GitHub <ArrowUpRight size={13} /></a>
        <button type="button" className="grid h-9 w-9 place-items-center border border-current/30 md:hidden" onClick={() => setOpen(!open)} aria-label={open ? 'Close navigation' : 'Open navigation'}>{open ? <X size={17} /> : <Menu size={17} />}</button>
      </div>
      {open && <nav className="border-t border-white/10 bg-ink px-5 py-4 text-paper md:hidden">{links.map(([label, href], index) => <a key={href} href={href} onClick={() => setOpen(false)} className="flex justify-between border-b border-white/10 py-3 font-mono text-[10px] uppercase tracking-widest"><span>{label}</span><span className="text-red-400">0{index + 1} ↗</span></a>)}</nav>}
    </header>
  );
}
