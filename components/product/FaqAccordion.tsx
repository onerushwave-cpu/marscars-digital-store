"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { FAQ } from "@/lib/types";

export default function FaqAccordion({ faqs }: { faqs: FAQ[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div key={faq.question} className="overflow-hidden rounded-2xl border border-line bg-card">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
            className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left font-semibold transition-colors hover:text-amber"
          >
            {faq.question}
            <motion.span
              animate={{ rotate: open === i ? 45 : 0 }}
              className="shrink-0 text-xl text-ember"
              aria-hidden
            >
              +
            </motion.span>
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="px-6 pb-5 text-sm leading-relaxed text-mist">{faq.answer}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
