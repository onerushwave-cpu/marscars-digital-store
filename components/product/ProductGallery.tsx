"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Product } from "@/lib/types";

const scenes = [
  { label: "Cover", overlay: "" },
  {
    label: "Night",
    overlay: "linear-gradient(to top, rgba(3,7,18,0.85), rgba(3,7,18,0.3))",
  },
  {
    label: "Studio",
    overlay: "radial-gradient(ellipse at 50% 30%, rgba(255,255,255,0.18), transparent 60%)",
  },
  {
    label: "Rain",
    overlay: "linear-gradient(160deg, rgba(56,130,246,0.25), rgba(3,7,18,0.6))",
  },
];

export default function ProductGallery({ product }: { product: Product }) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div
        className={`glow-ring relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-3xl border border-line bg-gradient-to-br ${product.gradient}`}
      >
        <div className="speed-lines absolute inset-0" aria-hidden />
        <AnimatePresence>
          <motion.div
            key={active}
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
            style={{ background: scenes[active].overlay }}
          />
        </AnimatePresence>
        <motion.span
          key={`emoji-${active}`}
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative text-8xl drop-shadow-2xl sm:text-9xl"
          aria-hidden
        >
          {product.emoji}
        </motion.span>
        <span className="absolute left-4 top-4 rounded-full bg-ember px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-night">
          ⚡ Instant Download
        </span>
      </div>

      <div className="mt-4 grid grid-cols-4 gap-3" role="tablist" aria-label="Product previews">
        {scenes.map((scene, i) => (
          <button
            key={scene.label}
            role="tab"
            aria-selected={active === i}
            onClick={() => setActive(i)}
            className={`relative flex aspect-video items-center justify-center overflow-hidden rounded-xl border bg-gradient-to-br text-2xl transition-all ${product.gradient} ${
              active === i
                ? "border-ember opacity-100"
                : "border-line opacity-50 hover:opacity-80"
            }`}
          >
            <span aria-hidden style={scene.overlay ? { background: scene.overlay } : undefined} className="absolute inset-0" />
            <span className="relative" aria-hidden>
              {product.emoji}
            </span>
            <span className="sr-only">{scene.label} preview</span>
          </button>
        ))}
      </div>
    </div>
  );
}
