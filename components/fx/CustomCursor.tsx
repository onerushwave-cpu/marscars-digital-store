"use client";

import { useEffect, useRef } from "react";

const INTERACTIVE = "a, button, input, select, textarea, label, [role='button'], [role='tab']";
const MAGNETIC = ".btn-primary, .btn-secondary";
const MAX_PULL = 5;

/**
 * Premium cursor: glowing ring + dot that stretch with velocity, expand over
 * interactive elements, spawn a ripple on click and gently magnetize primary
 * buttons. Desktop (fine pointer) only; disabled for reduced-motion users.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.documentElement.classList.add("custom-cursor");

    let mx = -100;
    let my = -100;
    let rx = -100;
    let ry = -100;
    let raf = 0;
    let magnet: HTMLElement | null = null;

    const loop = () => {
      // Ring trails the pointer; stretch scales with velocity for motion blur feel.
      const dx = mx - rx;
      const dy = my - ry;
      rx += dx * 0.16;
      ry += dy * 0.16;

      const speed = Math.min(Math.hypot(dx, dy), 90);
      const stretch = 1 + speed / 220;
      const squash = 1 / stretch;
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);

      dot.style.transform = `translate3d(${mx - 3}px, ${my - 3}px, 0)`;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) rotate(${angle}deg) scale(${stretch}, ${squash})`;

      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;

      const target = (e.target as HTMLElement).closest?.(INTERACTIVE);
      document.documentElement.classList.toggle("cursor-hovering", !!target);

      const magnetTarget = (e.target as HTMLElement).closest?.(MAGNETIC) as HTMLElement | null;
      if (magnetTarget !== magnet) {
        if (magnet) magnet.style.transform = "";
        magnet = magnetTarget;
      }
      if (magnet) {
        const r = magnet.getBoundingClientRect();
        const px = Math.max(-MAX_PULL, Math.min(MAX_PULL, (mx - (r.left + r.width / 2)) * 0.08));
        const py = Math.max(-MAX_PULL, Math.min(MAX_PULL, (my - (r.top + r.height / 2)) * 0.12));
        magnet.style.transform = `translate(${px}px, ${py}px)`;
      }
    };

    const onLeaveWindow = () => {
      if (magnet) {
        magnet.style.transform = "";
        magnet = null;
      }
    };

    const onClick = (e: MouseEvent) => {
      const ripple = document.createElement("div");
      ripple.className = "cursor-ripple";
      ripple.style.left = `${e.clientX - 45}px`;
      ripple.style.top = `${e.clientY - 45}px`;
      document.body.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("click", onClick);
    document.documentElement.addEventListener("mouseleave", onLeaveWindow);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click", onClick);
      document.documentElement.removeEventListener("mouseleave", onLeaveWindow);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("custom-cursor", "cursor-hovering");
      if (magnet) magnet.style.transform = "";
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot hidden md:block" aria-hidden />
      <div ref={ringRef} className="cursor-ring hidden md:block" aria-hidden />
    </>
  );
}
