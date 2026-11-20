import FilmGrainOverlay from './components/FilmGrainOverlay';
import CursorParticleEffect from './components/CursorParticleEffect';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PortfolioGallery from './components/PortfolioGallery';
import Showreel from './components/Showreel';
import About from './components/About';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="relative min-h-screen bg-paper text-ink selection:bg-red-700 selection:text-white">
      <FilmGrainOverlay />
      <CursorParticleEffect />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <PortfolioGallery />
        <Showreel />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
