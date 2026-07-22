import type { Product } from "@/lib/types";

/**
 * ============================================================================
 *  ADD YOUR GUMROAD PRODUCTS HERE
 * ============================================================================
 *
 * Every product you list below appears across the whole marketplace (home,
 * catalog, search, category pages, related products) and its "Buy Now" button
 * opens your real Gumroad checkout overlay — Gumroad handles payment, instant
 * file delivery and licensing for you.
 *
 * HOW TO ADD ONE:
 *  1. Open your product on Gumroad and copy its share URL. It looks like:
 *        https://YOURNAME.gumroad.com/l/abcde
 *     (or a custom domain / gumroad.com/l/abcde link — any of them work).
 *  2. Add an entry to the array below. Only `name`, `price`, `gumroadUrl` and
 *     `category` are required — everything else has sensible defaults.
 *  3. `category` must be one of the slugs in lib/data/categories.ts, e.g.:
 *        ai-prompt-bundles · canva-templates · social-media-packs
 *        lightroom-presets · reel-scripts · mechanic-business-toolkit
 *        dealership-marketing-kits · wallpaper-packs · automotive-logo-packs
 *        content-calendars
 *  4. (Optional) Drop a cover image in /public and set `image: "/my-cover.jpg"`.
 *
 * That's it — save, redeploy, and the product is live and sellable.
 */

export interface GumroadEntry {
  /** Product title shown on the card and product page. */
  name: string;
  /** Sale price in USD, e.g. 14.99. */
  price: number;
  /** Your Gumroad product URL — the Buy button opens this checkout. */
  gumroadUrl: string;
  /** Category slug from lib/data/categories.ts. */
  category: string;
  /** Optional "was" price for the strike-through. Defaults to price. */
  originalPrice?: number;
  /** Short one-liner for cards. */
  tagline?: string;
  /** Full description for the product page. */
  description?: string;
  /** Emoji used for the generated cover if no image is provided. */
  emoji?: string;
  /** Optional real cover image path in /public, e.g. "/covers/pack.jpg". */
  image?: string;
  /** Bulleted "What's included" list. */
  included?: string[];
  /** Feature highlights. */
  features?: string[];
  /** Star rating 0–5 (defaults to 5). */
  rating?: number;
  /** Number of reviews to display (defaults to 0 → hidden count). */
  reviewCount?: number;
}

/**
 * 👇 PASTE YOUR GUMROAD PRODUCTS HERE.
 *
 * Example (delete or replace with your real products):
 *
 *   {
 *     name: "JDM Legends Lightroom Pack",
 *     price: 12.99,
 *     originalPrice: 24.99,
 *     gumroadUrl: "https://yourname.gumroad.com/l/jdm-legends",
 *     category: "lightroom-presets",
 *     emoji: "📸",
 *     tagline: "20 street-tuned presets for JDM night shoots.",
 *     included: ["20 desktop presets", "20 mobile presets", "Install guide"],
 *   },
 */
export const myGumroadProducts: GumroadEntry[] = [
  // ← Add your Gumroad products here.
];

const gumroadGradients = [
  "from-orange-600 via-red-800 to-neutral-950",
  "from-rose-600 via-purple-900 to-neutral-950",
  "from-sky-600 via-slate-800 to-neutral-950",
  "from-emerald-600 via-teal-900 to-neutral-950",
  "from-amber-500 via-orange-800 to-neutral-950",
  "from-violet-600 via-indigo-900 to-neutral-950",
];

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Turns a lightweight Gumroad entry into a full catalog Product. */
export function gumroadToProduct(entry: GumroadEntry, index: number): Product {
  const slug = `gumroad-${slugify(entry.name)}`;
  return {
    slug,
    name: entry.name,
    tagline: entry.tagline ?? `${entry.name} — instant download via Gumroad.`,
    description:
      entry.description ??
      `${entry.name} is available for instant purchase and download through Gumroad. Secure checkout, instant delivery and buyer support are all handled by Gumroad.`,
    category: entry.category,
    price: entry.price,
    originalPrice: entry.originalPrice ?? entry.price,
    emoji: entry.emoji ?? "🏁",
    gradient: gumroadGradients[index % gumroadGradients.length],
    rating: entry.rating ?? 5,
    reviewCount: entry.reviewCount ?? 0,
    downloads: 0,
    features: entry.features ?? [
      "Instant download after purchase",
      "Secure checkout powered by Gumroad",
      "Lifetime access to your files",
    ],
    included: entry.included ?? ["Instant digital download"],
    reviews: [],
    faqs: [
      {
        question: "How do I receive my files?",
        answer:
          "Instantly. Checkout is handled securely by Gumroad, and your download link is delivered on-screen and by email the moment payment clears.",
      },
      {
        question: "What payment methods are accepted?",
        answer:
          "Gumroad accepts all major credit and debit cards, PayPal, Apple Pay and Google Pay.",
      },
    ],
    related: [],
    image: entry.image,
    gumroadUrl: entry.gumroadUrl,
  };
}

/** All Gumroad-backed products, mapped to full catalog products. */
export const gumroadProducts: Product[] = myGumroadProducts.map(gumroadToProduct);
