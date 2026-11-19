import React from 'react';
import { Target, FolderGit2, Wand2, CheckCircle2, Film } from 'lucide-react';
import { personalData } from '../data/personalData';

export default function WorkflowProcess() {
  const { processSteps } = personalData;

  const getStepIcon = (iconName) => {
    switch (iconName) {
      case 'Target': return <Target className="w-5 h-5 text-[#FF6B35]" />;
      case 'FolderGit2': return <FolderGit2 className="w-5 h-5 text-[#FF6B35]" />;
      case 'Wand2': return <Wand2 className="w-5 h-5 text-[#FF6B35]" />;
      case 'CheckCircle2': return <CheckCircle2 className="w-5 h-5 text-[#FF6B35]" />;
      default: return <Film className="w-5 h-5 text-[#FF6B35]" />;
    }
  };

  return (
    <section id="process" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-[#1f1f1f] pb-8">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#FF6B35] mb-2">
            <Film className="w-3.5 h-3.5" />
            <span>Workflow & Pipeline</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
            My Editing Process.
          </h2>
        </div>
        <p className="mt-4 md:mt-0 text-zinc-400 text-sm max-w-md font-normal leading-relaxed">
          A disciplined 4-stage post-production pipeline ensuring clear communication, efficient turnarounds, and cinematic polish.
        </p>
      </div>

      {/* 4-Step Editorial Pipeline Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        {processSteps.map((step, idx) => (
          <div
            key={idx}
            className="relative p-6 rounded-2xl bg-[#0f0f0f] border border-[#202020] hover:border-zinc-700 transition-all duration-300 group flex flex-col justify-between"
          >
            {/* Top Step Number & Icon */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono font-bold text-3xl text-zinc-700 group-hover:text-[#FF6B35] transition-colors">
                  {step.step}
                </span>

                <div className="w-10 h-10 rounded-xl bg-[#161616] border border-[#262626] flex items-center justify-center group-hover:border-[#FF6B35]/40 transition-colors">
                  {getStepIcon(step.icon)}
                </div>
              </div>

              <div className="text-[11px] font-mono uppercase tracking-wider text-[#FF6B35] mb-1">
                {step.shortDesc}
              </div>

              <h3 className="font-display font-bold text-lg text-white mb-3">
                {step.title}
              </h3>

              <p className="text-xs text-zinc-400 leading-relaxed">
                {step.description}
              </p>
            </div>

            {/* Bottom film perforation accent */}
            <div className="pt-6 mt-6 border-t border-[#1a1a1a] flex items-center justify-between text-[10px] font-mono text-zinc-600">
              <span>STAGE {step.step} / 04</span>
              <span className="w-2 h-2 rounded-full bg-zinc-800 group-hover:bg-[#FF6B35] transition-colors" />
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
