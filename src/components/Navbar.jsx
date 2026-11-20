import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';

const links = [['About', '#about'], ['Practice', '#skills'], ['Work', '#projects'], ['Showreel', '#showcase'], ['Contact', '#contact']];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 48);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${scrolled ? 'border-b border-white/10 bg-ink/95 text-paper backdrop-blur-md' : 'bg-transparent text-ink'}`}>
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-4 sm:px-10 lg:px-16">
        <a href="#hero" className="font-display text-xs font-bold uppercase tracking-[-0.035em] sm:text-sm">NAVNEET RANJAN</a>
        <nav className="hidden items-center gap-8 md:flex">{links.map(([label, href], index) => <a key={href} href={href} className="font-mono text-[9px] uppercase tracking-[0.16em] opacity-70 transition-opacity hover:opacity-100"><span className="mr-2 text-red-700">0{index + 1}</span>{label}</a>)}</nav>
        <a href="https://github.com/navneetnr" target="_blank" rel="noreferrer" className="hidden items-center gap-2 font-mono text-[9px] uppercase tracking-[0.14em] sm:flex">GitHub <ArrowUpRight size={13} /></a>
        <button type="button" className="grid h-9 w-9 place-items-center border border-current/30 md:hidden" onClick={() => setOpen(!open)} aria-label={open ? 'Close navigation' : 'Open navigation'}>{open ? <X size={17} /> : <Menu size={17} />}</button>
      </div>
      {open && <nav className="border-t border-white/10 bg-ink px-5 py-4 text-paper md:hidden">{links.map(([label, href], index) => <a key={href} href={href} onClick={() => setOpen(false)} className="flex justify-between border-b border-white/10 py-3 font-mono text-[10px] uppercase tracking-widest"><span>{label}</span><span className="text-red-400">0{index + 1} ↗</span></a>)}</nav>}
    </header>
  );
}
