import { useEffect, useRef } from 'react';

const COLORS = ['#10B981', '#06B6D4', '#8B5CF6', '#EC4899', '#F97316', '#3B82F6']
  .map((hex) => [1, 3, 5].map((offset) => parseInt(hex.slice(offset, offset + 2), 16)));
const COLOR_DURATION = 5000;
const TRAIL_LIFETIME = 1050;
const MAX_POINTS = 112;
const SAMPLE_DISTANCE = 3;
const MAX_TRAIL_DISTANCE = 390;

const mix = (from, to, amount) => from.map((channel, index) => (
  Math.round(channel + (to[index] - channel) * amount)
));
const rgba = (color, alpha) => `rgba(${color.join(',')},${alpha})`;

export default function CursorParticleEffect() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d', { alpha: true });
    if (!canvas || !context) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const touchDevice = window.matchMedia('(hover: none), (pointer: coarse)');
    if (reducedMotion.matches || touchDevice.matches) return undefined;

    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let frameId = 0;
    let lastFrame = 0;
    let lastPointerTime = 0;
    let target = null;
    let head = null;
    let points = [];
    const colorCycleStart = performance.now();

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      context.clearRect(0, 0, width, height);
    };

    const requestFrame = () => {
      if (!frameId) frameId = window.requestAnimationFrame(animate);
    };

    const onMouseMove = (event) => {
      const now = performance.now();
      const elapsed = lastPointerTime ? Math.max(now - lastPointerTime, 1) : 16;
      const previous = target || head || { x: event.clientX, y: event.clientY };
      const speed = Math.min(Math.hypot(event.clientX - previous.x, event.clientY - previous.y) / elapsed, 2);
      lastPointerTime = now;

      if (!head) {
        head = { x: event.clientX, y: event.clientY };
        points = [{ x: head.x, y: head.y, time: now, speed }];
        target = null;
      } else {
        target = { x: event.clientX, y: event.clientY, speed };
      }
      requestFrame();
    };

    const currentColor = (time) => {
      const position = (time - colorCycleStart) / COLOR_DURATION;
      const index = Math.floor(position) % COLORS.length;
      const next = (index + 1) % COLORS.length;
      const progress = position - Math.floor(position);
      const eased = progress * progress * (3 - 2 * progress);
      return mix(COLORS[index], COLORS[next], eased);
    };

    const buildStrand = (time, strand, speedFactor) => {
      const result = [];
      const progressDenominator = Math.max(points.length - 1, 1);
      const phase = time * 0.00135 + strand * 0.72;
      const spread = (strand - 4) * (8 + speedFactor * 8);

      for (let index = 0; index < points.length; index += 1) {
        const point = points[index];
        const older = points[Math.min(index + 1, points.length - 1)];
        const newer = points[Math.max(index - 1, 0)];
        const dx = newer.x - older.x;
        const dy = newer.y - older.y;
        const length = Math.hypot(dx, dy) || 1;
        const along = index / progressDenominator;
        const ageFade = Math.max(0, 1 - (time - point.time) / TRAIL_LIFETIME);
        const waveEnvelope = (7 + along * 21) * (0.72 + speedFactor * 0.65);
        const wave = Math.sin(along * 11 + phase) * waveEnvelope
          + Math.sin(along * 6.5 - phase * 0.65 + strand * 0.28) * waveEnvelope * 0.28;
        const lateral = spread + wave;

        result.push({
          x: point.x - (dy / length) * lateral,
          y: point.y + (dx / length) * lateral,
          fade: ageFade * ageFade,
        });
      }
      return result;
    };

    const strokeStrand = (time, color, strand, speedFactor) => {
      const path = buildStrand(time, strand, speedFactor);
      if (path.length < 2) return;

      // Path is newest-to-oldest. Fade its far tail while keeping the head clear.
      const newest = path[0];
      const oldest = path[path.length - 1];
      const shade = strand % 2 === 0 ? mix(color, [255, 255, 255], 0.34) : mix(color, [8, 12, 20], 0.24);
      const gradient = context.createLinearGradient(oldest.x, oldest.y, newest.x, newest.y);
      gradient.addColorStop(0, rgba(shade, 0));
      gradient.addColorStop(0.2, rgba(shade, 0.16 * newest.fade));
      gradient.addColorStop(1, rgba(shade, (strand === 4 ? 0.53 : 0.34) * newest.fade));

      context.beginPath();
      context.moveTo(oldest.x, oldest.y);
      for (let index = path.length - 1; index > 0; index -= 1) {
        const start = path[index];
        const end = path[index - 1];
        const before = path[Math.min(index + 1, path.length - 1)];
        const after = path[Math.max(index - 2, 0)];
        const tension = 0.22;
        context.bezierCurveTo(
          start.x + (end.x - before.x) * tension,
          start.y + (end.y - before.y) * tension,
          end.x - (after.x - start.x) * tension,
          end.y - (after.y - start.y) * tension,
          end.x,
          end.y,
        );
      }

      context.strokeStyle = gradient;
      context.lineWidth = strand === 4 ? 1.8 : 1.15;
      context.lineCap = 'round';
      context.lineJoin = 'round';
      context.shadowColor = rgba(color, 0.42);
      context.shadowBlur = 10;
      context.stroke();
    };

    function animate(time) {
      frameId = 0;
      const elapsed = lastFrame ? Math.min(time - lastFrame, 40) : 16.7;
      lastFrame = time;

      if (target && head) {
        const dx = target.x - head.x;
        const dy = target.y - head.y;
        const distance = Math.hypot(dx, dy);
        const easing = 1 - Math.exp(-elapsed / 19);
        head.x += dx * easing;
        head.y += dy * easing;

        const lastPoint = points[0];
        if (!lastPoint || Math.hypot(head.x - lastPoint.x, head.y - lastPoint.y) >= SAMPLE_DISTANCE) {
          points.unshift({ x: head.x, y: head.y, time, speed: target.speed });
        }
        if (distance < 0.3) target = null;
      }

      points = points.filter((point) => time - point.time < TRAIL_LIFETIME);
      let traveled = 0;
      for (let index = 1; index < points.length; index += 1) {
        traveled += Math.hypot(points[index - 1].x - points[index].x, points[index - 1].y - points[index].y);
        if (traveled > MAX_TRAIL_DISTANCE) {
          points.length = index;
          break;
        }
      }
      if (points.length > MAX_POINTS) points.length = MAX_POINTS;

      context.clearRect(0, 0, width, height);
      if (points.length > 1) {
        const averageSpeed = points.slice(0, 10).reduce((sum, point) => sum + point.speed, 0) / Math.min(points.length, 10);
        const speedFactor = Math.min(averageSpeed / 1.25, 1.5);
        const color = currentColor(time);
        context.globalCompositeOperation = 'source-over';
        for (let strand = 0; strand < 9; strand += 1) {
          strokeStrand(time, color, strand, speedFactor);
        }
        context.shadowBlur = 0;
      }

      if (target || points.length > 1) {
        frameId = window.requestAnimationFrame(animate);
      } else {
        head = null;
        lastFrame = 0;
      }
    }

    resize();
    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      points = [];
      target = null;
      head = null;
    };
  }, []);

  return <canvas ref={canvasRef} className="cursor-ribbon-canvas" aria-hidden="true" />;
}
