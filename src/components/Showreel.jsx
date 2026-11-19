import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Film, Disc } from 'lucide-react';
import { personalData } from '../data/personalData';

export default function Showreel() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState('00:00');
  const [duration, setDuration] = useState('01:45');
  const [progress, setProgress] = useState(0);

  const formatSeconds = (sec) => {
    const mins = Math.floor(sec / 60);
    const secs = Math.floor(sec % 60);
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const total = videoRef.current.duration || 105;
    setCurrentTime(formatSeconds(current));
    setProgress((current / total) * 100);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((e) => {
        console.warn("Autoplay/play policy:", e);
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

  const handleSeek = (e) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const total = videoRef.current.duration || 105;
    videoRef.current.currentTime = pos * total;
  };

  return (
    <section id="showreel" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0c0c0c] border-y border-[#181818] relative overflow-hidden">
      
      {/* Background cinematic aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-[#FF6B35]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#161616] border border-[#262626] text-xs font-mono uppercase tracking-widest text-[#FF6B35] mb-4">
            <Film className="w-3.5 h-3.5" />
            <span>Master Reel</span>
          </div>
          
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight mb-4">
            {personalData.showreel.heading}
          </h2>

          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            {personalData.showreel.subheading}
          </p>
        </div>

        {/* Theater Video Presentation Box */}
        <div className="relative rounded-2xl overflow-hidden bg-black border border-[#282828] shadow-2xl shadow-black group">
          
          {/* Cinema Letterbox Container */}
          <div className="relative aspect-[16/9] md:aspect-[2.39/1] overflow-hidden bg-black">
            <video
              ref={videoRef}
              src={personalData.showreel.videoUrl}
              poster={personalData.showreel.posterUrl}
              playsInline
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={() => {
                if (videoRef.current && videoRef.current.duration) {
                  setDuration(formatSeconds(videoRef.current.duration));
                }
              }}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              className="w-full h-full object-cover filter contrast-105 brightness-95 cursor-pointer"
              onClick={togglePlay}
            />

            {/* Subtle cinema letterbox shadows */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/80 via-transparent to-black/60" />

            {/* Play Button Overlay (when paused) */}
            {!isPlaying && (
              <div 
                className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] cursor-pointer"
                onClick={togglePlay}
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#FF6B35] text-black flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 shadow-2xl shadow-[#FF6B35]/40">
                  <Play className="w-9 h-9 sm:w-11 sm:h-11 fill-current ml-1" />
                </div>
              </div>
            )}

            {/* Live Audio Meter Simulation Indicator */}
            {isPlaying && (
              <div className="absolute top-4 right-4 flex items-end gap-1 h-5 px-2.5 py-1 rounded bg-black/60 backdrop-blur-sm border border-white/10 pointer-events-none">
                <span className="w-1 bg-[#FF6B35] h-3 animate-pulse" />
                <span className="w-1 bg-[#FF6B35] h-4 animate-pulse [animation-delay:150ms]" />
                <span className="w-1 bg-[#FF6B35] h-2 animate-pulse [animation-delay:300ms]" />
                <span className="w-1 bg-[#FF6B35] h-5 animate-pulse [animation-delay:75ms]" />
              </div>
            )}

            {/* Top Film Slate Info */}
            <div className="absolute top-4 left-4 flex items-center gap-2 text-xs font-mono text-zinc-300 bg-black/70 backdrop-blur-sm px-3 py-1 rounded border border-white/10">
              <span className="w-2 h-2 rounded-full bg-[#FF6B35]" />
              <span className="font-semibold">{personalData.name}</span>
              <span className="text-zinc-600">/</span>
              <span>SHOWREEL 2026</span>
            </div>

            {/* Custom Bottom Player Control Bar */}
            <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent">
              
              {/* Timeline Progress Bar (Clickable) */}
              <div 
                className="w-full h-1.5 bg-zinc-800 rounded-full mb-3 cursor-pointer relative overflow-hidden group/track"
                onClick={handleSeek}
              >
                <div 
                  className="h-full bg-[#FF6B35] relative rounded-full transition-all duration-100"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Controls Row */}
              <div className="flex items-center justify-between text-xs text-white">
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={togglePlay}
                    className="p-1 text-zinc-300 hover:text-[#FF6B35] transition-colors"
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
                  </button>

                  <button
                    type="button"
                    onClick={toggleMute}
                    className="p-1 text-zinc-300 hover:text-white transition-colors"
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? <VolumeX className="w-5 h-5 text-red-400" /> : <Volume2 className="w-5 h-5" />}
                  </button>

                  <div className="font-mono text-xs text-zinc-400">
                    <span className="text-white">{currentTime}</span> / <span>{duration}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="hidden sm:inline font-mono text-[11px] text-zinc-400 uppercase">
                    {personalData.showreel.resolution}
                  </span>

                  <button
                    type="button"
                    onClick={toggleFullscreen}
                    className="p-1 text-zinc-300 hover:text-[#FF6B35] transition-colors"
                    aria-label="Toggle Fullscreen"
                  >
                    <Maximize className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Bar Info Slate */}
          <div className="bg-[#121212] px-6 py-4 border-t border-[#1e1e1e] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#181818] border border-[#2b2b2b] flex items-center justify-center text-[#FF6B35]">
                <Disc className="w-4 h-4 animate-spin [animation-duration:8s]" />
              </div>
              <div>
                <p className="text-xs font-semibold text-white">Master Showreel Cut</p>
                <p className="text-[11px] text-zinc-400 font-mono">Pacing • Cinematic Color • Sound Design</p>
              </div>
            </div>

            <div className="text-[11px] font-mono text-zinc-500">
              Replaceable URL: <code className="text-zinc-300">src/data/personalData.js</code>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
