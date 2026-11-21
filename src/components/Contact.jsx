import { useRef, useState } from 'react';
import { ArrowUpRight, Github, Instagram, Linkedin, LoaderCircle, Mail } from 'lucide-react';
import './Contact.css';

const links = [
  { label: 'Email', value: 'nrnavneetranjan@gmail.com', href: 'mailto:nrnavneetranjan@gmail.com', icon: Mail },
  { label: 'LinkedIn', value: 'Connect professionally', href: 'https://www.linkedin.com/in/ranjan-navneet/', icon: Linkedin },
  { label: 'GitHub', value: 'View my profile', href: 'https://github.com/navneetnr', icon: Github },
  { label: 'Instagram', value: 'Follow along', href: 'https://www.instagram.com/navnneeeeet?hvrq=MWk4cTJtNmk2czlvbg==', icon: Instagram },
];

const emptyForm = { name: '', phone: '', email: '', description: '', website: '' };

export default function Contact() {
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState({ type: 'idle', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const submittingRef = useRef(false);

  const updateField = (event) => {
    const { name, value } = event.currentTarget;
    setForm((current) => ({ ...current, [name]: value }));
    if (status.type === 'error') setStatus({ type: 'idle', message: '' });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (submittingRef.current) return;

    const digits = form.phone.replace(/\D/g, '');
    if (!/^\+?[0-9().\s-]{7,32}$/.test(form.phone.trim()) || digits.length < 7 || digits.length > 15) {
      setStatus({ type: 'error', message: 'Enter a valid phone number with 7 to 15 digits.' });
      return;
    }

    submittingRef.current = true;
    setSubmitting(true);
    setStatus({ type: 'idle', message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || 'Your message could not be sent. Please try again.');

      setForm(emptyForm);
      setStatus({ type: 'success', message: "Your message has been sent successfully! I'll get back to you soon." });
    } catch (error) {
      setStatus({ type: 'error', message: error.message || 'Your message could not be sent. Please try again.' });
    } finally {
      submittingRef.current = false;
      setSubmitting(false);
    }
  };

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
        <div className="contact-form-shell mt-16 border-t border-ink/25 pt-8">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-red-700">Project inquiry / 01</p>
              <p className="max-w-sm font-display text-2xl font-semibold leading-tight tracking-[-0.04em] sm:text-3xl">Tell me what you are imagining.</p>
            </div>

            <form className="contact-inquiry-form lg:col-span-8" onSubmit={handleSubmit}>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="contact-field" htmlFor="contact-name">
                  <span>Full Name <span aria-hidden="true">*</span></span>
                  <input id="contact-name" name="name" type="text" autoComplete="name" required minLength={2} maxLength={120} value={form.name} onChange={updateField} placeholder="Your name" />
                </label>
                <label className="contact-field" htmlFor="contact-phone">
                  <span>Phone Number <span aria-hidden="true">*</span></span>
                  <input id="contact-phone" name="phone" type="tel" autoComplete="tel" required maxLength={32} value={form.phone} onChange={updateField} placeholder="+1 555 123 4567" />
                </label>
                <label className="contact-field sm:col-span-2" htmlFor="contact-email">
                  <span>Email Address <span aria-hidden="true">*</span></span>
                  <input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={254} value={form.email} onChange={updateField} placeholder="you@example.com" />
                </label>
                <label className="contact-field sm:col-span-2" htmlFor="contact-description">
                  <span>Project Description <span aria-hidden="true">*</span></span>
                  <textarea id="contact-description" name="description" required maxLength={5000} rows={6} value={form.description} onChange={updateField} placeholder="Tell me about your project, what you need, and your creative vision..." />
                </label>
              </div>

              <div className="contact-honeypot" aria-hidden="true">
                <label htmlFor="contact-website">Leave this field empty</label>
                <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={updateField} />
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <button type="submit" className="contact-submit" disabled={submitting}>
                  {submitting ? <>SENDING <LoaderCircle size={15} className="contact-submit-spinner" aria-hidden="true" /></> : <>SEND MESSAGE <ArrowUpRight size={15} aria-hidden="true" /></>}
                </button>
                <p className="contact-form-status" role={status.type === 'error' ? 'alert' : 'status'} aria-live="polite" data-state={status.type}>{status.message}</p>
              </div>
            </form>
          </div>
        </div>
        <div className="mt-20 flex flex-wrap items-center justify-between gap-4 border-t border-ink/20 pt-5 font-mono text-[9px] uppercase tracking-[0.15em] text-ink/55"><span>NAVNEET RANJAN · VIDEO EDITOR | GRAPHIC DESIGNER | MOTION DESIGNER</span><a href="#hero" className="hover:text-red-700">Back to top ↑</a></div>
      </div>
    </section>
  );
}
