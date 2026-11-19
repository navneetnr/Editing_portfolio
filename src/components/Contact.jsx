import React, { useState } from 'react';
import { Mail, Linkedin, Instagram, ArrowUpRight, Send, FileText, CheckCircle2, MessageSquare, Sparkles } from 'lucide-react';
import { personalData } from '../data/personalData';

export default function Contact({ onOpenResume }) {
  const { contact } = personalData;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Cinematic Reel',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate sending message
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 700);
  };

  const projectOptions = [
    'Cinematic Reel',
    'YouTube Video Editing',
    'Podcast Multi-Cam',
    'Promotional / Spec Ad',
    'Motion Graphics / Titles',
    'Social Media 9:16 Shorts',
    'Other Creative Inquiry'
  ];

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* Left: Contact Info & Direct Links */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#FF6B35] mb-3">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Direct Inquiries</span>
            </div>

            <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight leading-tight mb-4">
              {contact.heading}
            </h2>

            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
              {contact.subheading}
            </p>
          </div>

          {/* Contact Details Card */}
          <div className="space-y-4">
            
            {/* Email link */}
            <a
              href={`mailto:${contact.email}`}
              className="p-4 rounded-xl bg-[#0f0f0f] border border-[#202020] hover:border-[#FF6B35] transition-colors flex items-center justify-between group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-[#181818] border border-[#282828] flex items-center justify-center text-[#FF6B35] group-hover:scale-105 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-mono uppercase text-zinc-500">Email Contact</div>
                  <div className="text-sm font-semibold text-white group-hover:text-[#FF6B35] transition-colors">
                    {contact.email}
                  </div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
            </a>

            {/* LinkedIn link */}
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl bg-[#0f0f0f] border border-[#202020] hover:border-[#FF6B35] transition-colors flex items-center justify-between group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-[#181818] border border-[#282828] flex items-center justify-center text-[#FF6B35] group-hover:scale-105 transition-transform">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-mono uppercase text-zinc-500">LinkedIn Profile</div>
                  <div className="text-sm font-semibold text-white group-hover:text-[#FF6B35] transition-colors">
                    Connect on LinkedIn
                  </div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
            </a>

            {/* Instagram link */}
            <a
              href={contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl bg-[#0f0f0f] border border-[#202020] hover:border-[#FF6B35] transition-colors flex items-center justify-between group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-[#181818] border border-[#282828] flex items-center justify-center text-[#FF6B35] group-hover:scale-105 transition-transform">
                  <Instagram className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-mono uppercase text-zinc-500">Instagram</div>
                  <div className="text-sm font-semibold text-white group-hover:text-[#FF6B35] transition-colors">
                    Follow @navneet.cuts
                  </div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
            </a>

          </div>

          {/* Action Buttons: Download Resume & Direct Mail */}
          <div className="pt-2 flex flex-col sm:flex-row gap-4">
            <button
              type="button"
              onClick={onOpenResume}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-[#161616] hover:bg-[#202020] border border-[#2e2e2e] hover:border-zinc-500 text-white text-xs font-semibold tracking-wider uppercase transition-all"
            >
              <FileText className="w-4 h-4 text-[#FF6B35]" />
              <span>Download Resume</span>
            </button>

            <a
              href={`mailto:${contact.email}?subject=Project%20Inquiry%20for%20Navneet%20Ranjan`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#FF6B35] hover:bg-[#ff814f] text-black text-xs font-bold tracking-wider uppercase transition-all shadow-md shadow-[#FF6B35]/20 active:scale-95"
            >
              <span>Send An Email</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="text-[11px] font-mono text-zinc-500 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{contact.responseTimes}</span>
          </div>

        </div>

        {/* Right: Interactive Message Form */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-8 rounded-2xl bg-[#0f0f0f] border border-[#222222]">
            
            <div className="mb-6 pb-6 border-b border-[#1c1c1c] flex items-center justify-between">
              <div>
                <h3 className="font-display font-bold text-lg sm:text-xl text-white">
                  Send a Direct Message
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Brief me on your footage, target delivery date, and style goals.
                </p>
              </div>
              <Sparkles className="w-5 h-5 text-[#FF6B35]" />
            </div>

            {submitted ? (
              <div className="p-8 text-center space-y-4 bg-[#141414] rounded-xl border border-[#2a2a2a] animate-in fade-in">
                <div className="w-12 h-12 rounded-full bg-[#FF6B35]/15 border border-[#FF6B35]/30 text-[#FF6B35] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-lg text-white">Thank You, {formData.name || 'Friend'}!</h4>
                <p className="text-xs text-zinc-400 max-w-sm mx-auto leading-relaxed">
                  Your inquiry has been registered. You can also reach out directly via{' '}
                  <a href={`mailto:${contact.email}`} className="text-[#FF6B35] underline">{contact.email}</a>.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', projectType: 'Cinematic Reel', message: '' });
                  }}
                  className="px-4 py-2 rounded-full bg-[#1f1f1f] hover:bg-[#282828] text-xs text-zinc-300 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name field */}
                  <div>
                    <label htmlFor="name" className="block text-xs font-mono uppercase text-zinc-400 mb-2">
                      Your Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      placeholder="e.g. Alex Morgan"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#141414] border border-[#242424] focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] text-sm text-white placeholder-zinc-600 focus:outline-none transition-all"
                    />
                  </div>

                  {/* Email field */}
                  <div>
                    <label htmlFor="email" className="block text-xs font-mono uppercase text-zinc-400 mb-2">
                      Your Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="alex@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#141414] border border-[#242424] focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] text-sm text-white placeholder-zinc-600 focus:outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Project Category Selection */}
                <div>
                  <label htmlFor="projectType" className="block text-xs font-mono uppercase text-zinc-400 mb-2">
                    Project Type
                  </label>
                  <select
                    id="projectType"
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#141414] border border-[#242424] focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] text-sm text-white focus:outline-none transition-all cursor-pointer"
                  >
                    {projectOptions.map((opt) => (
                      <option key={opt} value={opt} className="bg-[#141414] text-white">
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-xs font-mono uppercase text-zinc-400 mb-2">
                    Project Overview / Message *
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    placeholder="Tell me about your footage, deadlines, pacing style, and any reference links..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#141414] border border-[#242424] focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] text-sm text-white placeholder-zinc-600 focus:outline-none transition-all resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#FF6B35] hover:bg-[#ff814f] text-black font-bold text-xs tracking-wider uppercase transition-all shadow-lg shadow-[#FF6B35]/25 disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Sending Request...' : 'Send Inquiry'}</span>
                </button>

                <p className="text-[11px] font-mono text-zinc-500 text-center">
                  Protected by standard client confidentiality.
                </p>

              </form>
            )}

          </div>
        </div>

      </div>
    </section>
  );
}
