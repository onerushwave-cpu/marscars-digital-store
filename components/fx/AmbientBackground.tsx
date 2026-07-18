"use client";

import { useEffect, useState } from "react";

interface Particle {
  left: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  opacity: number;
}

/**
 * Slow, elegant ambient layer behind the whole site: drifting aurora
 * gradients, rising ember particles, occasional light streaks and a film
 * grain overlay. Fixed, pointer-events-none, transform/opacity only.
 */
export default function AmbientBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Generated client-side so SSR markup stays deterministic.
    setParticles(
      Array.from({ length: 14 }, () => ({
        left: Math.random() * 100,
        size: 2 + Math.random() * 4,
        duration: 16 + Math.random() * 20,
        delay: -Math.random() * 30,
        drift: (Math.random() - 0.5) * 120,
        opacity: 0.2 + Math.random() * 0.4,
      })),
    );
  }, []);

  return (
    <>
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {/* Aurora gradients */}
        <div
          className="aurora-layer -left-[15%] -top-[20%] h-[70vh] w-[60vw] opacity-25"
          style={{
            background: "radial-gradient(ellipse, rgba(255,106,0,0.35), transparent 65%)",
          }}
        />
        <div
          className="aurora-layer -right-[20%] top-[30%] h-[80vh] w-[55vw] opacity-20"
          style={{
            background: "radial-gradient(ellipse, rgba(255,170,51,0.28), transparent 65%)",
            animationDelay: "-9s",
            animationDuration: "32s",
          }}
        />
        <div
          className="aurora-layer -bottom-[25%] left-[20%] h-[70vh] w-[65vw] opacity-15"
          style={{
            background: "radial-gradient(ellipse, rgba(217,4,41,0.22), transparent 65%)",
            animationDelay: "-18s",
            animationDuration: "38s",
          }}
        />

        {/* Light streaks */}
        <div className="light-streak top-[22%]" style={{ animationDelay: "-3s" }} />
        <div className="light-streak top-[64%]" style={{ animationDelay: "-10s", animationDuration: "19s" }} />

        {/* Rising ember particles */}
        {particles.map((p, i) => (
          <span
            key={i}
            className="bg-particle"
            style={{
              left: `${p.left}%`,
              width: p.size,
              height: p.size,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              ["--p-drift" as string]: `${p.drift}px`,
              ["--p-opacity" as string]: p.opacity,
            }}
          />
        ))}
      </div>
      <div aria-hidden className="noise-overlay" />
    </>
  );
}
