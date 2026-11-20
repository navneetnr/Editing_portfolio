import React, { useState } from 'react';
import FilmGrainOverlay from './components/FilmGrainOverlay';
import CursorParticleEffect from './components/CursorParticleEffect';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PortfolioGallery from './components/PortfolioGallery';
import VideoModal from './components/VideoModal';
import Showreel from './components/Showreel';
import About from './components/About';
import Skills from './components/Skills';
import WorkflowProcess from './components/WorkflowProcess';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ResumeModal from './components/ResumeModal';
import { personalData } from './data/personalData';

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  // Trigger to play master showreel inside modal
  const handleOpenFeaturedShowreel = () => {
    setSelectedProject({
      id: 'master-showreel-modal',
      title: `${personalData.name} — Master Showreel`,
      category: 'Master Reel',
      badge: 'Cinema Edit',
      aspectRatio: '16:9',
      duration: personalData.showreel.timecode,
      resolution: personalData.showreel.resolution,
      shortDescription: personalData.showreel.subheading,
      fullDescription: 'A dynamic showcase compilation highlighting rapid pacing, rhythmic beat matching, cinematic color curves, sound effects, and kinetic motion.',
      thumbnail: personalData.showreel.posterUrl,
      videoUrl: personalData.showreel.videoUrl,
      tags: ['Color Grading', 'Sound Design', 'Rhythm & Pacing', '4K DCI'],
      isDemo: true
    });
  };

  return (
    <div className="min-h-screen bg-[#080808] text-[#f5f5f5] selection:bg-[#FF6B35] selection:text-black relative">
      {/* Subtle cinematic grain texture overlay */}
      <FilmGrainOverlay />
      <CursorParticleEffect />

      {/* Navigation Header */}
      <Navbar />

      {/* Main Content Sections */}
      <main>
        {/* Hero Section */}
        <Hero onOpenFeaturedShowreel={handleOpenFeaturedShowreel} />

        {/* Featured Work / Portfolio Section (Primary) */}
        <PortfolioGallery onSelectProject={(project) => setSelectedProject(project)} />

        {/* Cinematic Showreel Theater Section */}
        <Showreel />

        {/* About Me Section */}
        <About />

        {/* Editing Skills & Software Section */}
        <Skills />

        {/* Editing Process / Pipeline */}
        <WorkflowProcess />

        {/* Contact Section */}
        <Contact onOpenResume={() => setIsResumeOpen(true)} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Video Modal / Lightbox */}
      <VideoModal
        project={selectedProject}
        isOpen={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
      />

      {/* Resume / Curriculum Vitae Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}
