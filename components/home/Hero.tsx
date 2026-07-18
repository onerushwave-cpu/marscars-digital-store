"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Counter } from "@/components/motion";

const stats = [
  { value: 10000, suffix: "+", label: "Downloads" },
  { value: 500, suffix: "+", label: "Premium Assets" },
  { value: 52, suffix: "", label: "Product Drops / Year" },
];

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative flex min-h-svh items-center justify-center overflow-hidden">
      {/* Cinematic background — drop /public/hero.mp4 in place to enable the video layer */}
      <motion.div className="absolute inset-0" style={{ y: bgY }} aria-hidden>
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-40"
          autoPlay
          muted
          loop
          playsInline
          poster=""
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-night/60 via-night/40 to-night" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 90% 55% at 50% 110%, rgba(255,106,0,0.28), transparent 65%), radial-gradient(ellipse 60% 40% at 80% 0%, rgba(255,170,51,0.10), transparent 60%)",
          }}
        />
        <div className="hero-grid-overlay animate-grid-drift absolute inset-0" />
        <div className="speed-lines absolute inset-0 opacity-60" />
      </motion.div>

      {/* Floating accent cards */}
      <motion.div
        aria-hidden
        className="glass animate-float absolute left-[6%] top-[22%] hidden rounded-2xl px-5 py-4 lg:block"
        style={{ opacity: fade }}
      >
        <span className="text-2xl">📸</span>
        <p className="mt-1 text-xs font-semibold text-white/80">Lightroom Presets</p>
      </motion.div>
      <motion.div
        aria-hidden
        className="glass animate-float-slow absolute right-[7%] top-[30%] hidden rounded-2xl px-5 py-4 lg:block"
        style={{ opacity: fade }}
      >
        <span className="text-2xl">🚗</span>
        <p className="mt-1 text-xs font-semibold text-white/80">500+ AI Prompts</p>
      </motion.div>
      <motion.div
        aria-hidden
        className="glass animate-float absolute bottom-[26%] right-[14%] hidden rounded-2xl px-5 py-4 lg:block"
        style={{ opacity: fade, animationDelay: "1.2s" }}
      >
        <span className="text-2xl">🎥</span>
        <p className="mt-1 text-xs font-semibold text-white/80">Viral Reel Scripts</p>
      </motion.div>

      <motion.div
        className="relative z-10 mx-auto max-w-4xl px-4 pt-24 pb-16 text-center sm:px-6"
        style={{ opacity: fade }}
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="glass mx-auto inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-amber"
        >
          <span className="animate-pulse-glow inline-block h-2 w-2 rounded-full bg-ember" />
          Trusted by Automotive Creators Worldwide
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
        >
          Fuel Your Automotive Brand with <span className="text-gradient">Premium Digital Products</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-mist sm:text-lg"
        >
          Everything you need to grow your automotive content, dealership, mechanic business, or
          car photography — all in one place.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Link href="/products" className="btn-primary w-full px-8 py-3.5 text-base sm:w-auto">
            Shop Now →
          </Link>
          <Link
            href="/products/ultimate-automotive-creator-bundle"
            className="btn-secondary w-full px-8 py-3.5 text-base sm:w-auto"
          >
            Explore Bundles
          </Link>
        </motion.div>

        <motion.dl
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-14 grid max-w-2xl grid-cols-3 gap-4"
        >
          {stats.map((s) => (
            <div key={s.label} className="glass rounded-2xl px-3 py-4">
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-display text-2xl font-extrabold text-white sm:text-3xl">
                <Counter to={s.value} suffix={s.suffix} />
              </dd>
              <p className="mt-1 text-[11px] font-medium uppercase tracking-wider text-mist sm:text-xs">
                {s.label}
              </p>
            </div>
          ))}
        </motion.dl>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mt-6 text-xs font-medium uppercase tracking-[0.25em] text-mist/70"
        >
          ⚡ New Products Weekly
        </motion.p>
      </motion.div>

      <div
        aria-hidden
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-2xl text-white/30"
      >
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="block"
        >
          ↓
        </motion.span>
      </div>
    </section>
  );
}
