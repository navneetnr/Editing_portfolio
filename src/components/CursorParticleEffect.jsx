import { useEffect, useRef } from 'react';

const MAX_PARTICLES = 110;
const COLORS = [
  [167, 139, 250], // purple
  [96, 165, 250],  // blue
  [103, 232, 249], // cyan
];

export default function CursorParticleEffect() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return undefined;

    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const touchPreference = window.matchMedia('(hover: none), (pointer: coarse)');
    if (motionPreference.matches || touchPreference.matches) return undefined;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    let animationFrame = 0;
    let lastTime = 0;
    let previousPointer = null;
    let particles = [];

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const addParticle = (x, y, speed = 0) => {
      if (particles.length >= MAX_PARTICLES) particles.shift();
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      const angle = Math.random() * Math.PI * 2;
      const velocity = 0.12 + Math.random() * 0.55 + Math.min(speed * 0.012, 0.8);
      const life = 420 + Math.random() * 380;

      particles.push({
        x: x + (Math.random() - 0.5) * 5,
        y: y + (Math.random() - 0.5) * 5,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity - 0.1,
        size: 1.1 + Math.random() * 2.4,
        color,
        life,
        maxLife: life,
      });
    };

    const handlePointerMove = (event) => {
      if (event.pointerType && event.pointerType !== 'mouse') return;
      const next = { x: event.clientX, y: event.clientY };
      if (previousPointer) {
        const dx = next.x - previousPointer.x;
        const dy = next.y - previousPointer.y;
        const distance = Math.hypot(dx, dy);
        const speed = Math.min(distance, 70);
        const count = Math.min(1 + Math.floor(distance / 18), 5);

        for (let index = 0; index < count; index += 1) {
          const progress = (index + 1) / count;
          addParticle(
            previousPointer.x + dx * progress,
            previousPointer.y + dy * progress,
            speed,
          );
        }
      } else {
        addParticle(next.x, next.y);
      }
      previousPointer = next;
    };

    const clearPointer = () => {
      previousPointer = null;
    };

    const animate = (time) => {
      const elapsed = lastTime ? Math.min(time - lastTime, 32) : 16.7;
      lastTime = time;
      const frameScale = elapsed / 16.7;

      context.clearRect(0, 0, width, height);
      context.globalCompositeOperation = 'lighter';

      particles = particles.filter((particle) => {
        particle.life -= elapsed;
        if (particle.life <= 0) return false;

        particle.x += particle.vx * frameScale;
        particle.y += particle.vy * frameScale;
        particle.vx *= 0.985;
        particle.vy *= 0.985;

        const progress = particle.life / particle.maxLife;
        const alpha = progress * progress * 0.42;
        const radius = particle.size * (0.65 + progress * 0.35);
        const [red, green, blue] = particle.color;
        const glow = context.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, radius * 5,
        );
        glow.addColorStop(0, `rgba(${red}, ${green}, ${blue}, ${alpha})`);
        glow.addColorStop(0.28, `rgba(${red}, ${green}, ${blue}, ${alpha * 0.38})`);
        glow.addColorStop(1, `rgba(${red}, ${green}, ${blue}, 0)`);

        context.fillStyle = glow;
        context.beginPath();
        context.arc(particle.x, particle.y, radius * 5, 0, Math.PI * 2);
        context.fill();
        return true;
      });

      context.globalCompositeOperation = 'source-over';
      animationFrame = window.requestAnimationFrame(animate);
    };

    resize();
    animationFrame = window.requestAnimationFrame(animate);
    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('blur', clearPointer);
    document.addEventListener('pointerleave', clearPointer);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('blur', clearPointer);
      document.removeEventListener('pointerleave', clearPointer);
      particles = [];
    };
  }, []);

  return <canvas ref={canvasRef} className="cursor-particle-canvas" aria-hidden="true" />;
}
