import { useEffect, useState } from "react";

interface Burst {
  id: number;
  x: number;
  y: number;
}

const SPARKS = 14;

/** Particle burst radiating from the last touch point. */
export function SparkBurst({ burst, enabled }: { burst: Burst | null; enabled: boolean }) {
  const [visible, setVisible] = useState<Burst | null>(null);

  useEffect(() => {
    if (!burst || !enabled) return;
    setVisible(burst);
    const t = setTimeout(() => setVisible(null), 700);
    return () => clearTimeout(t);
  }, [burst, enabled]);

  if (!visible) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {Array.from({ length: SPARKS }).map((_, i) => {
        const angle = (i / SPARKS) * Math.PI * 2 + visible.id * 0.3;
        const distance = 46 + ((i * 13) % 40);
        return (
          <span
            key={`${visible.id}-${i}`}
            className="animate-spark absolute h-1.5 w-1.5 rounded-full bg-primary"
            style={
              {
                left: visible.x,
                top: visible.y,
                "--dx": `${Math.cos(angle) * distance}px`,
                "--dy": `${Math.sin(angle) * distance}px`,
              } as React.CSSProperties
            }
          />
        );
      })}
    </div>
  );
}

export type { Burst };
