import { ArrowUpRight, Github, Instagram, Linkedin, Mail } from 'lucide-react';

const links = [
  { label: 'Email', value: 'nrnavneetranjan@gmail.com', href: 'mailto:nrnavneetranjan@gmail.com', icon: Mail },
  { label: 'LinkedIn', value: 'Connect professionally', href: 'https://www.linkedin.com/in/ranjan-navneet/', icon: Linkedin },
  { label: 'GitHub', value: 'View my profile', href: 'https://github.com/navneetnr', icon: Github },
  { label: 'Instagram', value: 'Follow along', href: 'https://www.instagram.com/navnneeeeet?hvrq=MWk4cTJtNmk2czlvbg==', icon: Instagram },
];

export default function Contact() {
  return (
    <section id="contact" className="contact-section bg-paper px-5 py-24 text-ink sm:px-10 sm:py-32 lg:px-16">
      <div className="mx-auto max-w-[1400px]">
        <p className="mb-8 font-mono text-[10px] uppercase tracking-[0.22em] text-red-700">06 / Creative collaborations</p>
        <h2 className="font-display text-[clamp(4rem,14vw,13rem)] font-extrabold uppercase leading-[0.72] tracking-[-0.095em]">Let’s<br /><span className="text-red-700">create.</span></h2>
        <div className="mt-12 grid gap-12 border-t border-ink/25 pt-7 lg:grid-cols-12">
          <p className="max-w-md text-lg leading-relaxed text-ink/70 lg:col-span-5">Need a thoughtful video edit, graphic, thumbnail or motion piece? Let’s talk about the visual story you’re shaping.</p>
          <div className="lg:col-span-7">
            {links.map(({ label, value, href, icon: Icon }) => (
              <a key={label} href={href} target={label === 'Email' ? undefined : '_blank'} rel={label === 'Email' ? undefined : 'noreferrer'} className="contact-link group flex items-center justify-between border-b border-ink/25 py-5">
                <span className="flex items-center gap-4"><Icon size={18} strokeWidth={1.5} /><span><span className="block font-mono text-[9px] uppercase tracking-[0.16em] text-ink/50">{label}</span><span className="mt-1 block font-display text-lg font-semibold sm:text-xl">{value}</span></span></span>
                <ArrowUpRight size={18} className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-red-700" />
              </a>
            ))}
          </div>
        </div>
        <div className="mt-20 flex flex-wrap items-center justify-between gap-4 border-t border-ink/20 pt-5 font-mono text-[9px] uppercase tracking-[0.15em] text-ink/55"><span>NAVNEET RANJAN · VIDEO EDITOR | GRAPHIC DESIGNER | MOTION DESIGNER</span><a href="#hero" className="hover:text-red-700">Back to top ↑</a></div>
      </div>
    </section>
  );
}
