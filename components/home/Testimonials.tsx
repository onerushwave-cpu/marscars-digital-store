"use client";

import { motion } from "framer-motion";
import { products } from "@/lib/data/products";
import Stars from "@/components/Stars";
import { Reveal } from "@/components/motion";

const testimonials = products
  .flatMap((p) => p.reviews.map((r) => ({ ...r, product: p.name })))
  .filter((_, i) => i % 3 === 0)
  .slice(0, 10);

export default function Testimonials() {
  return (
    <section className="overflow-hidden border-t border-line bg-carbon py-24">
      <Reveal className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-ember">Word on the street</p>
        <h2 className="font-display mt-3 text-3xl font-extrabold tracking-tight sm:text-5xl">
          Loved by <span className="text-ember-gradient">Automotive Creators</span>
        </h2>
      </Reveal>

      <div className="pause-on-hover relative mt-12">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-carbon to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-carbon to-transparent"
        />
        <div className="animate-marquee flex w-max gap-5" style={{ animationDuration: "55s" }}>
          {[...testimonials, ...testimonials].map((t, i) => (
            <motion.figure
              key={i}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="glass w-[300px] shrink-0 rounded-2xl p-6 sm:w-[340px]"
            >
              <Stars rating={t.rating} className="text-sm" />
              <blockquote className="mt-3 line-clamp-4 text-sm leading-relaxed text-white/90">
                “{t.text}”
              </blockquote>
              <figcaption className="mt-4 border-t border-line pt-3">
                <p className="text-sm font-bold">{t.author}</p>
                <p className="text-xs text-mist">
                  {t.role} · {t.product}
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
