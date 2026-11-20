import { motion, useReducedMotion } from 'framer-motion';
import { creativeWorkCategories } from '../data/projectsData';

const tones = ['project-tone-red', 'project-tone-paper', 'project-tone-gray', 'project-tone-black', 'project-tone-sand', 'project-tone-paper'];

export default function PortfolioGallery() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="projects" className="bg-paper px-5 py-24 text-ink sm:px-10 sm:py-32 lg:px-16">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-12 flex flex-col justify-between gap-6 border-b border-ink/25 pb-7 sm:mb-16 sm:flex-row sm:items-end">
          <div>
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-red-700">04 / Creative work</p>
            <h2 className="font-display text-[clamp(3.5rem,10vw,9rem)] font-bold uppercase leading-[0.76] tracking-[-0.085em]">Selected<br />Frames<span className="text-red-700">.</span></h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-ink/65">A space for original edits, graphics, thumbnails and motion pieces. Each panel is an empty media slot until real work is added.</p>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {creativeWorkCategories.map((category, index) => (
            <motion.article
              key={category.id}
              initial={reduceMotion ? false : { opacity: 0, y: 35 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{ duration: 0.55, delay: (index % 2) * 0.1 }}
              whileHover={reduceMotion ? undefined : { y: -5, rotateX: 1.2, rotateY: index % 2 ? -1.2 : 1.2 }}
              className={`project-card ${tones[index]} group relative flex min-h-[340px] flex-col justify-between overflow-hidden p-6 sm:min-h-[410px] sm:p-9`}
            >
              <div className="flex items-start justify-between font-mono text-[9px] uppercase tracking-[0.16em]">
                <span>{category.label}</span><span>MEDIA SLOT</span>
              </div>
              <div className="project-art absolute inset-x-8 top-[22%] flex h-[43%] items-center justify-center overflow-hidden border border-current/20" aria-hidden="true">
                <span className="project-ghost font-display text-[clamp(4rem,9vw,9rem)] font-extrabold uppercase leading-none tracking-[-0.1em]">{category.mark}</span>
                <span className="project-cross absolute right-4 top-3 font-mono text-xl">+</span>
                <span className="project-cross absolute bottom-3 left-4 font-mono text-xl">✳</span>
                <span className="absolute bottom-3 right-4 font-mono text-[8px] uppercase tracking-[0.18em] opacity-60">Add original media</span>
              </div>
              <div className="relative z-[1] mt-auto pt-40">
                <div className="mb-3 inline-flex border border-current/25 px-2 py-1 font-mono text-[8px] uppercase tracking-widest">Placeholder · Replace with your work</div>
                <h3 className="font-display text-2xl font-bold uppercase leading-none tracking-[-0.05em] sm:text-3xl">{category.title}</h3>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
