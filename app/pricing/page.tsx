import type { Metadata } from "next";
import Link from "next/link";
import { plans } from "@/lib/data/plans";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import FaqAccordion from "@/components/product/FaqAccordion";

export const metadata: Metadata = {
  title: "Membership Plans",
  description:
    "Join Marscars membership: unlimited downloads, weekly product drops, premium AI prompts and commercial licensing. Free, Pro and Elite plans.",
  alternates: { canonical: "/pricing" },
};

const membershipFaqs = [
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes. Memberships are month-to-month with no lock-in. Cancel in one click from your dashboard and keep access until the end of your billing period.",
  },
  {
    question: "What does the Elite commercial license cover?",
    answer:
      "Elite lets you use every asset in client work, paid advertising and products you sell — the extended license that agencies and businesses need.",
  },
  {
    question: "Do members get discounts on one-time products?",
    answer:
      "Pro and Elite members get permanent member pricing on every one-time purchase, plus early access to new drops before they go public.",
  },
  {
    question: "Is there an affiliate program?",
    answer:
      "Yes — earn 30% recurring commission on every membership you refer and 20% on product sales. Sign up free from your dashboard.",
  },
];

export default function PricingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: membershipFaqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <div className="mx-auto max-w-7xl px-4 pb-24 pt-28 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Reveal className="text-center">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-ember">Memberships</p>
        <h1 className="font-display mt-3 text-3xl font-extrabold tracking-tight sm:text-5xl">
          Pick Your <span className="text-ember-gradient">Fuel Grade</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-mist">
          One-time products are great. Unlimited access is better. Join thousands of automotive
          creators on a Marscars membership.
        </p>
      </Reveal>

      <Stagger className="mt-14 grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <StaggerItem key={plan.slug} className="h-full">
            <div
              className={`card-hover relative flex h-full flex-col rounded-3xl border p-8 ${
                plan.highlighted ? "glow-ring border-ember/50 bg-card" : "border-line bg-card"
              }`}
            >
              {plan.highlighted && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-ember to-amber px-4 py-1 text-xs font-bold uppercase tracking-widest text-night">
                  Most Popular
                </span>
              )}
              <h2 className="font-display text-2xl font-bold">{plan.name}</h2>
              <p className="mt-2 text-sm text-mist">{plan.tagline}</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="font-display text-5xl font-extrabold">${plan.price}</span>
                <span className="text-mist">/{plan.period}</span>
              </div>
              <ul className="mt-7 flex-1 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <span className="mt-0.5 text-ember" aria-hidden>
                      ✓
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/dashboard"
                className={`${plan.highlighted ? "btn-primary" : "btn-secondary"} mt-8 px-6 py-3.5 text-sm`}
              >
                {plan.cta} →
              </Link>
              <p className="mt-3 text-center text-[11px] text-mist">
                {plan.price === 0 ? "No card required" : "Cancel anytime · Secure checkout"}
              </p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal className="mx-auto mt-24 max-w-3xl">
        <h2 className="font-display text-center text-2xl font-bold">
          Membership <span className="text-ember-gradient">FAQs</span>
        </h2>
        <div className="mt-8">
          <FaqAccordion faqs={membershipFaqs} />
        </div>
      </Reveal>
    </div>
  );
}
