import type { Plan } from "@/lib/types";

export const plans: Plan[] = [
  {
    slug: "free",
    name: "Free",
    price: 0,
    period: "forever",
    tagline: "Start your engine — explore the marketplace at no cost.",
    features: [
      "Limited downloads per month",
      "Weekly free assets",
      "Marscars newsletter",
      "Community access",
    ],
    cta: "Join Free",
  },
  {
    slug: "pro",
    name: "Pro",
    price: 15,
    period: "month",
    tagline: "For creators ready to post daily and grow fast.",
    highlighted: true,
    features: [
      "Unlimited downloads",
      "Weekly product drops",
      "Premium AI prompts",
      "Premium templates",
      "Member-only discounts",
      "Early access to new releases",
    ],
    cta: "Go Pro",
  },
  {
    slug: "elite",
    name: "Elite",
    price: 49,
    period: "month",
    tagline: "The full commercial arsenal for agencies and businesses.",
    features: [
      "Everything in Pro",
      "Commercial license on all assets",
      "Exclusive monthly bundles",
      "VIP Discord & community access",
      "Premium priority support",
      "Bonus creator resources",
    ],
    cta: "Go Elite",
  },
];
