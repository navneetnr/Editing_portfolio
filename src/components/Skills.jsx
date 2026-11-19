import React from 'react';
import { 
  Scissors, 
  Video, 
  Sliders, 
  Layers, 
  Zap, 
  Volume2, 
  BookOpen, 
  Share2,
  Film,
  Sparkles,
  Palette,
  Smartphone,
  Cpu
} from 'lucide-react';
import { personalData } from '../data/personalData';

export default function Skills() {
  const { skillCategories, softwareTools } = personalData;

  // Icon resolver for skills
  const getSkillIcon = (iconName) => {
    switch (iconName) {
      case 'Scissors': return <Scissors className="w-5 h-5 text-[#FF6B35]" />;
      case 'Video': return <Video className="w-5 h-5 text-[#FF6B35]" />;
      case 'Sliders': return <Sliders className="w-5 h-5 text-[#FF6B35]" />;
      case 'Layers': return <Layers className="w-5 h-5 text-[#FF6B35]" />;
      case 'Zap': return <Zap className="w-5 h-5 text-[#FF6B35]" />;
      case 'Volume2': return <Volume2 className="w-5 h-5 text-[#FF6B35]" />;
      case 'BookOpen': return <BookOpen className="w-5 h-5 text-[#FF6B35]" />;
      case 'Share2': return <Share2 className="w-5 h-5 text-[#FF6B35]" />;
      default: return <Film className="w-5 h-5 text-[#FF6B35]" />;
    }
  };

  const getToolIcon = (iconName) => {
    switch (iconName) {
      case 'Film': return <Film className="w-5 h-5 text-[#FF6B35]" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-[#FF6B35]" />;
      case 'Palette': return <Palette className="w-5 h-5 text-[#FF6B35]" />;
      case 'Smartphone': return <Smartphone className="w-5 h-5 text-[#FF6B35]" />;
      default: return <Cpu className="w-5 h-5 text-[#FF6B35]" />;
    }
  };

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0c0c0c] border-t border-[#181818]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#FF6B35] mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>Capabilities & Tooling</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight mb-4">
            Technical & Creative Skills.
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            From narrative pacing to high-end color grading and acoustic soundscapes, combining technical precision with artistic intent.
          </p>
        </div>

        {/* 1. Skill Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {skillCategories.map((skill, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[#111111] border border-[#202020] hover:border-zinc-700 transition-all duration-300 group hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50"
            >
              <div className="w-10 h-10 rounded-xl bg-[#181818] border border-[#262626] flex items-center justify-center mb-4 group-hover:border-[#FF6B35]/40 transition-colors">
                {getSkillIcon(skill.icon)}
              </div>

              <h3 className="font-display font-bold text-base text-white group-hover:text-[#FF6B35] transition-colors mb-2">
                {skill.name}
              </h3>

              <p className="text-xs text-zinc-400 leading-relaxed">
                {skill.desc}
              </p>
            </div>
          ))}
        </div>

        {/* 2. Software Toolkit / NLE Suite */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0e0e0e] border border-[#222222]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-[#1c1c1c]">
            <div>
              <h3 className="font-display font-bold text-lg sm:text-xl text-white uppercase">
                Software & Tool Suite
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Editable software placeholders configured for post-production workflows.
              </p>
            </div>

            <div className="text-[11px] font-mono text-zinc-500 bg-[#161616] px-3 py-1 rounded border border-[#262626]">
              Configured in <code className="text-zinc-300">personalData.js</code>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {softwareTools.map((tool, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[#141414] border border-[#222222] hover:border-[#FF6B35]/50 transition-colors flex items-start gap-3.5"
              >
                <div className="p-2.5 rounded-lg bg-[#1c1c1c] border border-[#2b2b2b] shrink-0">
                  {getToolIcon(tool.icon)}
                </div>

                <div>
                  <h4 className="font-bold text-sm text-white">{tool.name}</h4>
                  <p className="text-[11px] font-mono text-[#FF6B35] mb-1">{tool.category}</p>
                  <p className="text-[11px] text-zinc-400 leading-relaxed">{tool.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
