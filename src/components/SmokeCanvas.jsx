import { useSmokeEffect } from '../hooks/useSmokeEffect';

/**
 * Full-viewport canvas that renders subtle smoke/fog following the cursor.
 * Positioned fixed so it sits above background but below content (pointer-events: none).
 */
export default function SmokeCanvas() {
  const { canvasRef, disabled } = useSmokeEffect();

  if (disabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
      style={{ background: 'transparent' }}
    />
  );
}
