import React, { useEffect, useRef, useState } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize, AlertCircle, Sparkles, Tag, Film } from 'lucide-react';

export default function VideoModal({ project, isOpen, onClose }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Reset state on project change
  useEffect(() => {
    setIsPlaying(false);
    setHasError(false);
    setIsLoading(true);
  }, [project]);

  if (!isOpen || !project) return null;

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setHasError(true);
      });
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const isVertical = project.aspectRatio === '9:16';

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className={`relative w-full ${isVertical ? 'max-w-3xl' : 'max-w-5xl'} max-h-[92vh] bg-[#0f0f0f] border border-[#262626] rounded-2xl overflow-hidden shadow-2xl flex flex-col`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#202020] bg-[#121212]">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B35]" />
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">
              {project.badge || 'Project Preview'}
            </span>
            <span className="text-zinc-600">|</span>
            <span className="text-xs font-mono text-zinc-300">
              {project.duration || '01:00'} • {project.resolution || '1080p'}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#1c1c1c] hover:bg-[#282828] text-zinc-400 hover:text-white border border-[#2e2e2e] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Video Player & Project Details */}
        <div className="flex-1 overflow-y-auto">
          <div className={`p-4 sm:p-6 ${isVertical ? 'grid grid-cols-1 md:grid-cols-2 gap-6 items-center' : 'space-y-6'}`}>
            
            {/* Video Container */}
            <div className={`relative bg-black rounded-xl overflow-hidden border border-[#222] ${isVertical ? 'aspect-[9/16] max-h-[65vh] mx-auto w-full max-w-[320px]' : 'aspect-video w-full'}`}>
              
              {!hasError ? (
                <video
                  ref={videoRef}
                  src={project.videoUrl}
                  poster={project.thumbnail}
                  playsInline
                  controls={false}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onLoadedData={() => setIsLoading(false)}
                  onError={() => {
                    setIsLoading(false);
                    setHasError(true);
                  }}
                  className="w-full h-full object-contain bg-black cursor-pointer"
                  onClick={togglePlay}
                />
              ) : (
                /* Fallback if external video cannot load */
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#111]">
                  <Film className="w-12 h-12 text-[#FF6B35] mb-3" />
                  <h4 className="text-sm font-semibold text-white mb-1">Demo Video Stream</h4>
                  <p className="text-xs text-zinc-400 max-w-sm mb-4">
                    Sample timeline preview loaded. You can replace this demo link with your direct MP4 or YouTube / Vimeo showcase in <code className="text-zinc-300 font-mono">projectsData.js</code>.
                  </p>
                  <button 
                    onClick={() => { setHasError(false); setIsLoading(false); }}
                    className="px-4 py-1.5 rounded-full bg-[#1c1c1c] text-xs text-zinc-300 hover:text-white border border-zinc-700 hover:border-[#FF6B35]"
                  >
                    Retry Player
                  </button>
                </div>
              )}

              {/* Center Play/Pause Overlay Button */}
              {!hasError && (
                <div 
                  className={`absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity ${isPlaying ? 'opacity-0 hover:opacity-100' : 'opacity-100'}`}
                  onClick={togglePlay}
                >
                  <button 
                    type="button"
                    className="w-16 h-16 rounded-full bg-[#FF6B35] text-black flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-xl shadow-[#FF6B35]/30"
                    aria-label={isPlaying ? 'Pause video' : 'Play video'}
                  >
                    {isPlaying ? <Pause className="w-7 h-7 fill-current" /> : <Play className="w-7 h-7 fill-current ml-1" />}
                  </button>
                </div>
              )}

              {/* Player Overlay Controls */}
              {!hasError && (
                <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-center justify-between text-xs text-white">
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={togglePlay} 
                      className="p-1 text-zinc-300 hover:text-white"
                      aria-label={isPlaying ? 'Pause' : 'Play'}
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>
                    <button 
                      onClick={toggleMute} 
                      className="p-1 text-zinc-300 hover:text-white"
                      aria-label={isMuted ? 'Unmute' : 'Mute'}
                    >
                      {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                    <span className="text-[11px] font-mono text-zinc-400">
                      {project.duration || '00:00'}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono uppercase bg-black/60 px-2 py-0.5 rounded border border-white/10 text-[#FF6B35]">
                      {project.aspectRatio}
                    </span>
                    <button 
                      onClick={toggleFullscreen} 
                      className="p-1 text-zinc-300 hover:text-white"
                      aria-label="Fullscreen"
                    >
                      <Maximize className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Project Details Panel */}
            <div className="space-y-4 text-left">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-[#FF6B35]/15 border border-[#FF6B35]/30 text-[#FF6B35] text-xs font-semibold tracking-wider uppercase">
                  {project.category}
                </span>
                <span className="px-2.5 py-1 rounded bg-[#1c1c1c] border border-[#2b2b2b] text-zinc-400 text-xs font-mono">
                  Demo Project Concept
                </span>
              </div>

              <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                {project.title}
              </h3>

              <p className="text-zinc-300 text-sm leading-relaxed">
                {project.fullDescription || project.shortDescription}
              </p>

              {/* Tools & Techniques tags */}
              {project.tags && project.tags.length > 0 && (
                <div className="pt-2">
                  <div className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 mb-2 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-[#FF6B35]" />
                    <span>Editing Techniques & Tools</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, idx) => (
                      <span 
                        key={idx}
                        className="px-2.5 py-1 rounded-md bg-[#181818] border border-[#2a2a2a] text-zinc-300 text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Clear notice regarding demo status */}
              <div className="p-3 rounded-lg bg-[#141414] border border-[#222222] text-[11px] text-zinc-400 leading-relaxed flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-[#FF6B35] shrink-0 mt-0.5" />
                <span>
                  This project demonstrates pacing, sound design, and color grading. All project data and video links can be customized in <code className="text-zinc-300 font-mono">src/data/projectsData.js</code>.
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
