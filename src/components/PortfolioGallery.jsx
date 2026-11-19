import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Sparkles, Filter, ExternalLink, Film, Clock, Monitor } from 'lucide-react';
import { projectsData, projectCategories } from '../data/projectsData';

export default function PortfolioGallery({ onSelectProject }) {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = activeCategory === 'All'
    ? projectsData
    : projectsData.filter((item) => item.category === activeCategory);

  return (
    <section id="work" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-[#1f1f1f] pb-8">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#FF6B35] mb-2">
            <Film className="w-3.5 h-3.5" />
            <span>Curated Timeline Works</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
            Featured Projects.
          </h2>
        </div>
        <p className="mt-4 md:mt-0 text-zinc-400 text-sm max-w-md font-normal leading-relaxed">
          Explore demo edits, concept cuts, and timeline experiments demonstrating rhythm, color grading, sound design, and narrative pacing.
        </p>
      </div>

      {/* Filter Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
        {projectCategories.map((category) => {
          const count = category === 'All' 
            ? projectsData.length 
            : projectsData.filter(p => p.category === category).length;
          const isActive = activeCategory === category;

          return (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-xs font-medium tracking-wider whitespace-nowrap transition-all duration-200 flex items-center gap-2 ${
                isActive
                  ? 'bg-[#FF6B35] text-black font-semibold shadow-md shadow-[#FF6B35]/20'
                  : 'bg-[#121212] hover:bg-[#1a1a1a] text-zinc-400 hover:text-white border border-[#222222]'
              }`}
            >
              <span>{category}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${isActive ? 'bg-black/20 text-black' : 'bg-[#1f1f1f] text-zinc-500'}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Projects Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
      >
        <AnimatePresence>
          {filteredProjects.map((project) => {
            const isVertical = project.aspectRatio === '9:16';

            return (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group relative bg-[#0f0f0f] border border-[#202020] hover:border-zinc-700 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-black/80 flex flex-col cursor-pointer"
                onClick={() => onSelectProject(project)}
              >
                {/* Thumbnail Container */}
                <div className={`relative overflow-hidden bg-black ${isVertical ? 'aspect-[4/5]' : 'aspect-video'}`}>
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 filter brightness-90 contrast-105"
                    loading="lazy"
                  />
                  
                  {/* Subtle film grain & dark vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-black/20 to-black/30 opacity-90" />

                  {/* Top Badges */}
                  <div className="absolute top-3 inset-x-3 flex items-center justify-between text-[10px] font-mono">
                    <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur-sm border border-white/10 text-white font-medium">
                      {project.category}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur-sm border border-white/10 text-[#FF6B35]">
                      {project.aspectRatio}
                    </span>
                  </div>

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white flex items-center justify-center group-hover:bg-[#FF6B35] group-hover:text-black group-hover:border-transparent group-hover:scale-110 transition-all duration-300 shadow-xl">
                      <Play className="w-6 h-6 fill-current ml-0.5" />
                    </div>
                  </div>

                  {/* Bottom Duration Badge */}
                  <div className="absolute bottom-3 right-3 text-[11px] font-mono text-zinc-300 bg-black/80 backdrop-blur-sm px-2 py-0.5 rounded border border-white/10 flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-[#FF6B35]" />
                    <span>{project.duration}</span>
                  </div>
                </div>

                {/* Card Content Details */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]" />
                      <span>{project.badge || 'Demo Edit'}</span>
                    </div>

                    <h3 className="font-display font-bold text-lg sm:text-xl text-white group-hover:text-[#FF6B35] transition-colors leading-snug mb-2">
                      {project.title}
                    </h3>

                    <p className="text-zinc-400 text-xs sm:text-sm line-clamp-2 leading-relaxed mb-4">
                      {project.shortDescription}
                    </p>
                  </div>

                  {/* Card Footer tags */}
                  <div className="pt-3 border-t border-[#1c1c1c] flex items-center justify-between text-xs">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags && project.tags.slice(0, 2).map((tag, i) => (
                        <span key={i} className="text-[10px] font-mono text-zinc-400 bg-[#161616] px-2 py-0.5 rounded border border-[#242424]">
                          {tag}
                        </span>
                      ))}
                      {project.tags && project.tags.length > 2 && (
                        <span className="text-[10px] font-mono text-zinc-500 px-1 py-0.5">
                          +{project.tags.length - 2}
                        </span>
                      )}
                    </div>

                    <span className="text-xs font-semibold text-[#FF6B35] group-hover:underline flex items-center gap-1">
                      Watch <ExternalLink className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Bottom Data Note */}
      <div className="mt-12 text-center text-xs text-zinc-500 font-mono flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-[#FF6B35]" />
        <span>All projects are demo concepts easily updated in <code className="text-zinc-400">src/data/projectsData.js</code></span>
      </div>
    </section>
  );
}
