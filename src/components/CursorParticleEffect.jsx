import { useEffect, useRef } from 'react';

const MAX_POINTS = 52;
const COLOR_STEP_MS = 5000;
const PALETTE = ['#10B981', '#06B6D4', '#8B5CF6', '#EC4899', '#F97316', '#3B82F6']
  .map((hex) => [1, 3, 5].map((index) => parseInt(hex.slice(index, index + 2), 16)));

function mixColor(from, to, amount) {
  return from.map((channel, index) => Math.round(channel + (to[index] - channel) * amount));
}

export default function CursorParticleEffect() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const touchInput = window.matchMedia('(hover: none), (pointer: coarse), (max-width: 768px)');
    if (reducedMotion.matches || touchInput.matches) return undefined;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    let frameId = 0;
    let lastFrame = 0;
    let lastInput = 0;
    const cycleStart = performance.now();
    let target = null;
    let head = null;
    let points = [];

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

    const handlePointerMove = (event) => {
      if (event.pointerType && event.pointerType !== 'mouse') return;
      target = { x: event.clientX, y: event.clientY };
      lastInput = performance.now();
      if (!head) {
        head = { ...target };
        points.push({ ...head, time: lastInput, speed: 0 });
      }
      startAnimation();
    };

    const stopFollowing = () => {
      target = null;
    };

    const currentColor = (time) => {
      const cyclePosition = (time - cycleStart) / COLOR_STEP_MS;
      const currentIndex = Math.floor(cyclePosition) % PALETTE.length;
      const nextIndex = (currentIndex + 1) % PALETTE.length;
      const progress = cyclePosition - Math.floor(cyclePosition);
      // Ease the blend so the hue shift feels gradual throughout each five-second beat.
      const eased = progress * progress * (3 - 2 * progress);
      return mixColor(PALETTE[currentIndex], PALETTE[nextIndex], eased);
    };

    const strokeRibbon = (time, color, offset, widthScale, alpha, glow) => {
      if (points.length < 2) return;

      const trail = points.map((point, index) => {
        const before = points[Math.max(0, index - 1)];
        const after = points[Math.min(points.length - 1, index + 1)];
        const dx = after.x - before.x;
        const dy = after.y - before.y;
        const length = Math.hypot(dx, dy) || 1;
        const normalizedAge = Math.max(0, 1 - (time - point.time) / 950);
        const fade = normalizedAge * normalizedAge;
        const speedWidth = Math.min(point.speed / 900, 1);
        return {
          x: point.x - (dy / length) * offset,
          y: point.y + (dx / length) * offset,
          fade,
          speedWidth,
        };
      }).filter((point) => point.fade > 0.01);

      if (trail.length < 2) return;
      const first = trail[0];
      const last = trail[trail.length - 1];
      const gradient = context.createLinearGradient(first.x, first.y, last.x, last.y);
      gradient.addColorStop(0, `rgba(${color.join(',')},${alpha * first.fade})`);
      gradient.addColorStop(0.18, `rgba(${color.join(',')},${alpha * 0.78})`);
      gradient.addColorStop(1, `rgba(${color.join(',')},0)`);

      context.beginPath();
      context.moveTo(first.x, first.y);
      for (let index = 1; index < trail.length - 1; index += 1) {
        const point = trail[index];
        const next = trail[index + 1];
        context.quadraticCurveTo(point.x, point.y, (point.x + next.x) / 2, (point.y + next.y) / 2);
      }
      context.lineTo(last.x, last.y);
      context.strokeStyle = gradient;
      context.lineWidth = widthScale * (1 + Math.min(first.speedWidth, 1) * 1.6);
      context.lineCap = 'round';
      context.lineJoin = 'round';
      context.shadowColor = `rgba(${color.join(',')},${glow})`;
      context.shadowBlur = glow * 14;
      context.stroke();
    };

    const animate = (time) => {
      const elapsed = lastFrame ? Math.min(time - lastFrame, 32) : 16.7;
      lastFrame = time;

      if (target && head) {
        const dx = target.x - head.x;
        const dy = target.y - head.y;
        const distance = Math.hypot(dx, dy);
        const speed = Math.min(distance / Math.max(elapsed, 1) * 16.7, 70);
        const easing = 1 - Math.exp(-elapsed / 22);
        head.x += dx * easing;
        head.y += dy * easing;

        if (distance > 0.35) {
          points.unshift({ x: head.x, y: head.y, time, speed });
          if (points.length > MAX_POINTS) points.length = MAX_POINTS;
        }
      }

      points = points.filter((point) => time - point.time < 950);
      context.clearRect(0, 0, width, height);
      context.globalCompositeOperation = 'lighter';
      const color = currentColor(time);

      // Offset filaments around a fine core create a layered liquid-ink ribbon.
      strokeRibbon(time, color, -3.5, 1.25, 0.24, 0.22);
      strokeRibbon(time, color, 2.8, 1.65, 0.3, 0.32);
      strokeRibbon(time, color, 0, 1.05, 0.62, 0.48);

      context.shadowBlur = 0;
      context.globalCompositeOperation = 'source-over';
      if (points.length || time - lastInput < 1000) {
        frameId = window.requestAnimationFrame(animate);
      } else {
        frameId = 0;
        head = null;
        lastFrame = 0;
      }
    };

    const startAnimation = () => {
      if (!frameId) frameId = window.requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('blur', stopFollowing);
    document.addEventListener('pointerleave', stopFollowing);

    // The color cycle is time based and begins with emerald green.
    startAnimation();

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('blur', stopFollowing);
      document.removeEventListener('pointerleave', stopFollowing);
      points = [];
    };
  }, []);

  return <canvas ref={canvasRef} className="cursor-ribbon-canvas" aria-hidden="true" />;
}
