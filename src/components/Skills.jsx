import { motion, useReducedMotion } from 'framer-motion';

const practices = [
  'Video Editing',
  'Graphic Designing',
  'Motion Graphics',
  'Thumbnail Designing',
  'Social Media Creatives',
  'Cinematic Reels',
];

export default function Skills() {
  const reduceMotion = useReducedMotion();
  return (
    <section id="skills" className="bg-red-700 px-5 py-24 text-white sm:px-10 sm:py-32 lg:px-16">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col justify-between gap-5 border-b border-white/30 pb-7 sm:flex-row sm:items-end">
          <div><p className="mb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-white/70">03 / Creative practice</p><h2 className="font-display text-[clamp(3.2rem,9vw,8rem)] font-bold uppercase leading-[0.8] tracking-[-0.08em]">Visual forms</h2></div>
          <p className="max-w-xs font-mono text-[10px] uppercase leading-relaxed tracking-[0.12em] text-white/75">Video, image and motion, brought together through visual storytelling.</p>
        </div>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {practices.map((practice, index) => (
            <motion.div key={practice} initial={reduceMotion ? false : { opacity: 0, y: 20 }} whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.45, delay: (index % 4) * 0.06 }} className="group relative flex min-h-32 items-end justify-between border-b border-r border-white/25 p-5 sm:min-h-40 sm:p-6">
              <span className="absolute left-5 top-5 font-mono text-[9px] text-white/55">0{index + 1}</span>
              <span className="font-display text-2xl font-bold uppercase tracking-[-0.045em] sm:text-3xl">{practice}</span>
              <span className="mb-1 text-xl transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">↗</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
