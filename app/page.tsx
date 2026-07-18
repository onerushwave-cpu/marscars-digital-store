import Link from "next/link";
import Hero from "@/components/home/Hero";
import ProductCard from "@/components/ProductCard";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { categories } from "@/lib/data/categories";
import { products, formatPrice, getProduct } from "@/lib/data/products";
import { plans } from "@/lib/data/plans";

const featuredSlugs = [
  "ai-automotive-poster-prompt-bundle",
  "automotive-social-media-bundle",
  "lightroom-presets",
  "dealership-canva-pack",
  "ai-reel-script-bundle",
  "mechanic-business-toolkit",
];

const marqueeItems = [
  "⚡ Instant Downloads",
  "🔒 Secure Checkout",
  "🆕 New Products Weekly",
  "🌍 Trusted by Automotive Creators Worldwide",
  "💳 Stripe · PayPal · Apple Pay · Google Pay",
  "♾️ Lifetime Updates",
];

export default function HomePage() {
  const bundle = getProduct("ultimate-automotive-creator-bundle")!;
  const featured = featuredSlugs.map((s) => getProduct(s)!).filter(Boolean);

  return (
    <>
      <Hero />

      {/* Marquee */}
      <div className="relative overflow-hidden border-y border-line bg-carbon py-4">
        <div className="animate-marquee flex w-max gap-12 whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="text-sm font-semibold uppercase tracking-widest text-mist">
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Categories */}
      <section id="categories" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-24 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-ember">Browse the garage</p>
          <h2 className="font-display mt-3 text-3xl font-extrabold tracking-tight sm:text-5xl">
            Featured <span className="text-ember-gradient">Categories</span>
          </h2>
          <p className="mt-4 max-w-2xl text-mist">
            Ten premium collections built for every corner of automotive culture — from AI art to
            the front desk of your workshop.
          </p>
        </Reveal>

        <Stagger className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {categories.map((cat) => (
            <StaggerItem key={cat.slug}>
              <Link
                href={`/products?category=${cat.slug}`}
                className={`card-hover cover-sheen group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-line bg-gradient-to-br ${cat.gradient} bg-card p-6`}
              >
                <div>
                  <span className="text-4xl transition-transform duration-500 group-hover:scale-125 inline-block">
                    {cat.emoji}
                  </span>
                  <h3 className="font-display mt-4 text-lg font-bold leading-snug">{cat.name}</h3>
                  <p className="mt-2 text-sm text-mist">{cat.description}</p>
                </div>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-amber transition-transform duration-300 group-hover:translate-x-1">
                  View Products →
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Featured products */}
      <section className="border-y border-line bg-carbon">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-ember">Best sellers</p>
              <h2 className="font-display mt-3 text-3xl font-extrabold tracking-tight sm:text-5xl">
                Premium <span className="text-ember-gradient">Digital Products</span>
              </h2>
            </div>
            <Link href="/products" className="btn-secondary px-6 py-3 text-sm">
              View All {products.length} Products →
            </Link>
          </Reveal>

          <Stagger className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (
              <StaggerItem key={p.slug} className="h-full">
                <ProductCard product={p} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Ultimate bundle spotlight */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(255,106,0,0.14), transparent 70%)",
          }}
        />
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <Reveal>
            <div className="glow-ring relative overflow-hidden rounded-3xl border border-ember/30 bg-card">
              <div className="speed-lines absolute inset-0" aria-hidden />
              <div className="relative grid gap-10 p-8 sm:p-12 lg:grid-cols-2 lg:items-center">
                <div>
                  <span className="rounded-full bg-gradient-to-r from-ember to-amber px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-night">
                    🏆 Best Value
                  </span>
                  <h2 className="font-display mt-5 text-3xl font-extrabold leading-tight sm:text-4xl">
                    {bundle.name}
                  </h2>
                  <p className="mt-4 text-mist">{bundle.tagline}</p>
                  <div className="mt-6 flex items-baseline gap-3">
                    <span className="font-display text-5xl font-extrabold text-ember-gradient">
                      {formatPrice(bundle.price)}
                    </span>
                    <span className="text-lg text-mist line-through">
                      {formatPrice(bundle.originalPrice)}
                    </span>
                    <span className="rounded-full bg-ember/15 px-3 py-1 text-xs font-bold text-amber">
                      Save 80%+
                    </span>
                  </div>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Link
                      href={`/products/${bundle.slug}`}
                      className="btn-primary px-8 py-3.5 text-base"
                    >
                      Get the Bundle →
                    </Link>
                    <Link href="/pricing" className="btn-secondary px-8 py-3.5 text-base">
                      Or Join Membership
                    </Link>
                  </div>
                </div>
                <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {bundle.included.map((item) => (
                    <li
                      key={item}
                      className="glass flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium"
                    >
                      <span className="text-ember">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Membership teaser */}
      <section className="border-t border-line bg-carbon">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-ember">Memberships</p>
            <h2 className="font-display mt-3 text-3xl font-extrabold tracking-tight sm:text-5xl">
              Unlimited Fuel for <span className="text-ember-gradient">Your Content Engine</span>
            </h2>
          </Reveal>
          <Stagger className="mt-12 grid gap-6 md:grid-cols-3">
            {plans.map((plan) => (
              <StaggerItem key={plan.slug} className="h-full">
                <div
                  className={`card-hover flex h-full flex-col rounded-2xl border p-7 ${
                    plan.highlighted
                      ? "glow-ring border-ember/50 bg-card"
                      : "border-line bg-card"
                  }`}
                >
                  <h3 className="font-display text-xl font-bold">{plan.name}</h3>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="font-display text-4xl font-extrabold">
                      ${plan.price}
                    </span>
                    <span className="text-sm text-mist">/{plan.period}</span>
                  </div>
                  <p className="mt-3 text-sm text-mist">{plan.tagline}</p>
                  <ul className="mt-5 flex-1 space-y-2.5">
                    {plan.features.slice(0, 4).map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <span className="text-ember">✓</span> {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/pricing"
                    className={`${plan.highlighted ? "btn-primary" : "btn-secondary"} mt-6 px-6 py-3 text-sm`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Trust strip */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: "⚡",
              title: "Instant Delivery",
              text: "Files hit your inbox and dashboard the second payment clears.",
            },
            {
              icon: "🔒",
              title: "Secure Checkout",
              text: "Stripe & PayPal with Apple Pay and Google Pay support.",
            },
            {
              icon: "♾️",
              title: "Lifetime Updates",
              text: "Every pack grows over time. Updates are always free.",
            },
            {
              icon: "🏁",
              title: "Creator-Tested",
              text: "Built with pages doing millions of monthly views.",
            },
          ].map((f) => (
            <StaggerItem key={f.title}>
              <div className="card-hover h-full rounded-2xl border border-line bg-card p-6">
                <span className="text-3xl">{f.icon}</span>
                <h3 className="font-display mt-3 font-bold">{f.title}</h3>
                <p className="mt-2 text-sm text-mist">{f.text}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>
    </>
  );
}
