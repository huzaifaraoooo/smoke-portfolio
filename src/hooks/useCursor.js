import { useState, useEffect, useRef } from 'react';

/**
 * Magnetic cursor + trail positions.
 * Cursor is pulled toward hovered element center; trail array for trailing dots.
 */
const LERP = 0.12;
const TRAIL_LENGTH = 8;
const MAGNET_STRENGTH = 0.35;
const MAGNET_RADIUS = 120;
const HOVER_SELECTORS = 'a[href], button, [role="button"], .glass-card';

export function useCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState([]);
  const [isHover, setIsHover] = useState(false);
  const [visible, setVisible] = useState(false);
  const target = useRef({ x: -100, y: -100 });
  const current = useRef({ x: -100, y: -100 });
  const magnetTarget = useRef(null); // { x, y } or null
  const trailRef = useRef([]);
  const rafRef = useRef(null);

  useEffect(() => {
    const isTouch = () => 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch()) return;

    const handleMove = (e) => {
      target.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
    };

    const handleLeave = () => {
      setVisible(false);
      magnetTarget.current = null;
    };

    const handleOver = (e) => {
      const el = e.target.closest(HOVER_SELECTORS);
      if (el) {
        setIsHover(true);
        const rect = el.getBoundingClientRect();
        magnetTarget.current = {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        };
      } else {
        setIsHover(false);
        magnetTarget.current = null;
      }
    };

    const handleOut = () => {
      setIsHover(false);
      magnetTarget.current = null;
    };

    const animate = () => {
      const { x: tx, y: ty } = target.current;
      const c = current.current;
      let dx = tx - c.x;
      let dy = ty - c.y;

      const magnet = magnetTarget.current;
      if (magnet && isHover) {
        const toCenterX = magnet.x - c.x;
        const toCenterY = magnet.y - c.y;
        const dist = Math.hypot(toCenterX, toCenterY);
        if (dist < MAGNET_RADIUS && dist > 0) {
          const pull = (1 - dist / MAGNET_RADIUS) * MAGNET_STRENGTH;
          dx += toCenterX * pull;
          dy += toCenterY * pull;
        }
      }

      c.x += dx * LERP;
      c.y += dy * LERP;
      trailRef.current = [{ x: c.x, y: c.y }, ...trailRef.current].slice(0, TRAIL_LENGTH);
      setPos({ x: c.x, y: c.y });
      setTrail(trailRef.current.slice(1));
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    document.addEventListener('mousemove', handleMove, { passive: true });
    document.addEventListener('mouseleave', handleLeave);
    document.addEventListener('mouseover', handleOver);
    document.addEventListener('mouseout', handleOut);

    return () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseleave', handleLeave);
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseout', handleOut);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [visible, isHover]);

  return { pos, trail, isHover, visible };
}
