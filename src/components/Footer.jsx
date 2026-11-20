export default function Footer() {
  return (
    <footer className="bg-ink px-5 py-6 text-paper/55 sm:px-10 lg:px-16">
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-3 font-mono text-[9px] uppercase tracking-[0.15em]">
        <span>© {new Date().getFullYear()} NAVNEET RANJAN</span>
        <span>VIDEO EDITOR | GRAPHIC DESIGNER | MOTION DESIGNER</span>
        <a href="#hero" className="text-paper transition-colors hover:text-red-400">Back to top ↑</a>
      </div>
    </footer>
  );
}
