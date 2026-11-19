import React from 'react';
import { X, Download, Printer, Mail, MapPin, Film, Scissors, CheckCircle, ExternalLink } from 'lucide-react';
import { personalData } from '../data/personalData';

export default function ResumeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-3xl max-h-[92vh] bg-[#111111] border border-[#2b2b2b] rounded-2xl overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#222222] bg-[#161616]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B35]" />
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-semibold">
              Curriculum Vitae • {personalData.name}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#222222] hover:bg-[#2c2c2c] text-xs font-medium text-zinc-200 border border-[#333333] transition-colors"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5 text-[#FF6B35]" />
              <span>Print / Save PDF</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg bg-[#222222] hover:bg-[#2c2c2c] text-zinc-400 hover:text-white border border-[#333333] transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-8 bg-[#0c0c0c] text-zinc-200 print:bg-white print:text-black">
          
          {/* Header info */}
          <div className="border-b border-[#222222] pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight uppercase print:text-black">
                {personalData.name}
              </h1>
              <p className="text-[#FF6B35] font-mono text-sm tracking-wider uppercase mt-1">
                {personalData.role}
              </p>
              <p className="text-xs text-zinc-400 mt-2 max-w-lg leading-relaxed print:text-zinc-700">
                {personalData.shortIntro}
              </p>
            </div>

            <div className="text-xs font-mono space-y-1 text-zinc-400 shrink-0">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#FF6B35]" />
                <span>{personalData.contact.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#FF6B35]" />
                <span>{personalData.contact.locationDisplay}</span>
              </div>
            </div>
          </div>

          {/* Section: Core Editing Competencies */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-[#FF6B35] mb-3 flex items-center gap-2">
              <Film className="w-4 h-4" />
              <span>Core Editing Competencies</span>
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {personalData.skillCategories.map((skill, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-[#141414] border border-[#222222] text-xs font-medium text-zinc-300">
                  {skill.name}
                </div>
              ))}
            </div>
          </div>

          {/* Section: Software & Post Tools */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-[#FF6B35] mb-3 flex items-center gap-2">
              <Scissors className="w-4 h-4" />
              <span>Software & NLE Tools</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {personalData.softwareTools.map((tool, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-[#141414] border border-[#222222] flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white print:text-black">{tool.name}</h3>
                    <p className="text-[11px] font-mono text-[#FF6B35]">{tool.category}</p>
                    <p className="text-xs text-zinc-400 mt-1">{tool.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Editorial Workflow */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-[#FF6B35] mb-3 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>Workflow & Quality Standards</span>
            </h2>

            <div className="space-y-2">
              {personalData.processSteps.map((step, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-[#141414] border border-[#222222] flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-[#FF6B35]">{step.step}</span>
                  <div>
                    <span className="text-xs font-bold text-white mr-2 print:text-black">{step.title}:</span>
                    <span className="text-xs text-zinc-400">{step.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer note */}
          <div className="pt-4 border-t border-[#1f1f1f] text-center text-[11px] font-mono text-zinc-500">
            Portfolio & Showcase: Available online • Open for contract, freelance & long-term edits
          </div>

        </div>
      </div>
    </div>
  );
}
