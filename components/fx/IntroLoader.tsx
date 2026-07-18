"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Cinematic 2.4s intro shown once per session: headlights flare on, the
 * emblem assembles with a scale/blur entrance, an orange light sweeps
 * across, then the overlay fades into the homepage.
 */
export default function IntroLoader() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.sessionStorage.getItem("marscars:intro-done")) return;
    setShow(true);
    window.sessionStorage.setItem("marscars:intro-done", "1");
    const t = setTimeout(() => setShow(false), 2400);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center overflow-hidden bg-night"
          exit={{ opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden
        >
          {/* Headlight beams */}
          <motion.div
            className="absolute left-1/2 top-1/2 h-[140vmax] w-[140vmax] -translate-x-1/2 -translate-y-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.9, 0.35] }}
            transition={{ duration: 1.1, times: [0, 0.55, 1], delay: 0.25 }}
            style={{
              background:
                "conic-gradient(from 205deg at 50% 50%, transparent 0deg, rgba(255,214,140,0.16) 8deg, transparent 20deg, transparent 130deg, rgba(255,214,140,0.16) 140deg, transparent 152deg)",
            }}
          />

          {/* Emblem assembles */}
          <motion.div
            initial={{ scale: 0.55, opacity: 0, filter: "blur(18px)" }}
            animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex flex-col items-center"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.svg" alt="" width={140} height={140} className="h-32 w-32 sm:h-36 sm:w-36" />
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.0 }}
              className="font-display mt-4 text-xl font-bold tracking-tight"
            >
              MARS<span className="text-ember-gradient">CARS</span>
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.25 }}
              className="mt-1 text-[10px] font-bold uppercase tracking-[0.35em] text-mist"
            >
              Cars · Content · Creative
            </motion.p>

            {/* Orange light sweep across the lockup */}
            <span className="pointer-events-none absolute inset-0 overflow-hidden">
              <span
                className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-ember/40 to-transparent"
                style={{ animation: "light-sweep 1.2s 1.15s cubic-bezier(0.22,1,0.36,1) both" }}
              />
            </span>
          </motion.div>

          {/* Rev bar */}
          <motion.div
            className="absolute bottom-[18%] h-0.5 w-44 overflow-hidden rounded-full bg-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-ember to-amber"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.7, delay: 0.5, ease: [0.65, 0, 0.35, 1] }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
