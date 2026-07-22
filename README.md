# 🏁 Marscars Digital Marketplace

A premium, mobile-first eCommerce marketplace for automotive digital products — AI prompt
bundles, Canva templates, Lightroom presets, reel scripts, dealership marketing kits and more.
Design language: Need for Speed × Porsche × Apple × Gumroad — dark, cinematic, glowing.

## Tech Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS 4** — custom dark theme (`#050505` / `#111111` / `#171717`, accent `#FF6A00` / `#FFAA33`)
- **Framer Motion** — scroll reveals, parallax hero, animated counters, page transitions, mouse-follow glow

## Getting Started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (fully static-prerendered)
```

## What's Inside

| Area | Route | Highlights |
| --- | --- | --- |
| Home | `/` | Parallax cinematic hero, animated stats, category grid, bundle spotlight |
| Catalog | `/products` | Live search, category filters, sorting, animated grid |
| Product pages | `/products/[slug]` | Gallery, feature checklist, what's included, FAQs, reviews, related & frequently-bought-together, JSON-LD |
| Membership | `/pricing` | Free / Pro ($15) / Elite ($49) plans + FAQ schema |
| Blog | `/blog`, `/blog/[slug]` | Search, categories, tags, featured articles, article schema |
| Cart | `/cart` | Coupon codes (`TURBO10`, `LAUNCH20`), order summary, demo checkout |
| Wishlist | `/wishlist` | Persistent wishlist + recently viewed |
| Customer dashboard | `/dashboard` | Downloads, subscription, favorites, invoices, profile (demo data) |
| Admin dashboard | `/admin` | Sales analytics, catalog, discount codes, users, email & blog (demo data) |

Cart, wishlist and recently-viewed persist in `localStorage`. SEO ships with per-page metadata,
Open Graph tags, `sitemap.xml`, `robots.txt` and schema.org structured data (Store, Product,
FAQPage, BlogPosting).

### Hero video

The hero renders an animated cinematic gradient scene by default. Drop a `hero.mp4` into
`/public` to enable the background video layer automatically.

### Product cover art

Covers are generated gradient scenes (zero external requests, instant loads). To use real
photography, drop an image into `/public` and set `image: "/my-cover.jpg"` on the product.

## 🛒 Selling your own Gumroad products

You can list your real Gumroad products on the marketplace and take live payments — Gumroad
handles checkout, instant file delivery and licensing for you. **No API keys required.**

1. Open `lib/data/gumroad.ts`.
2. Add an entry to the `myGumroadProducts` array — only `name`, `price`, `gumroadUrl` and
   `category` are required:

   ```ts
   export const myGumroadProducts: GumroadEntry[] = [
     {
       name: "JDM Legends Lightroom Pack",
       price: 12.99,
       originalPrice: 24.99,
       gumroadUrl: "https://yourname.gumroad.com/l/jdm-legends",
       category: "lightroom-presets",
       emoji: "📸",
       tagline: "20 street-tuned presets for JDM night shoots.",
       included: ["20 desktop presets", "20 mobile presets", "Install guide"],
     },
   ];
   ```

3. Redeploy. Each product now appears across the site (home, catalog, search, category
   pages) and its **Buy** button opens your real Gumroad checkout in an on-site overlay.

The `gumroadUrl` field also works on any built-in product in `lib/data/products.ts` — set it
and that product's Buy button routes to Gumroad instead of the demo checkout.

## Production wiring (next steps)

Gumroad (above) is the fastest way to take real payments today. For a fully custom checkout:

The UI is complete and checkout/auth flows are demoed client-side. To go live:

1. **Supabase** — auth (customer + admin roles), `products`/`orders`/`subscriptions` tables, storage buckets for deliverable files and signed download URLs.
2. **Stripe** — Checkout Sessions for one-time products, Billing for Pro/Elite subscriptions, webhook → order fulfillment → signed download link email. Apple Pay / Google Pay come free with Stripe; add PayPal via its JS SDK.
3. Swap the demo data in `lib/data/*` for Supabase queries — every component already consumes typed `Product`/`Plan`/`BlogPost` objects, so the data layer is the only thing that changes.
