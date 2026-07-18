import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, products, formatPrice } from "@/lib/data/products";
import { getCategory } from "@/lib/data/categories";
import ProductGallery from "@/components/product/ProductGallery";
import ProductActions from "@/components/product/ProductActions";
import FaqAccordion from "@/components/product/FaqAccordion";
import ProductCard from "@/components/ProductCard";
import Stars from "@/components/Stars";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.tagline,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title: product.name,
      description: product.tagline,
      type: "website",
      url: `https://marscars.store/products/${product.slug}`,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const category = getCategory(product.category);
  const related = product.related.map((s) => getProduct(s)).filter((p) => p !== undefined);
  const frequentlyBought = related.slice(0, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.tagline,
    category: category?.name,
    brand: { "@type": "Brand", name: "Marscars" },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `https://marscars.store/products/${product.slug}`,
    },
  };

  return (
    <div className="mx-auto max-w-7xl px-4 pb-24 pt-28 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav aria-label="Breadcrumb" className="mb-8 text-sm text-mist">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="hover:text-white">
              Home
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li>
            <Link href="/products" className="hover:text-white">
              Products
            </Link>
          </li>
          {category && (
            <>
              <li aria-hidden>/</li>
              <li>
                <Link href={`/products?category=${category.slug}`} className="hover:text-white">
                  {category.name}
                </Link>
              </li>
            </>
          )}
          <li aria-hidden>/</li>
          <li className="text-white">{product.name}</li>
        </ol>
      </nav>

      <div className="grid gap-12 lg:grid-cols-2">
        <Reveal>
          <ProductGallery product={product} />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="flex items-center gap-3">
            {category && (
              <span className="rounded-full border border-line px-3 py-1 text-xs font-semibold text-mist">
                {category.emoji} {category.name}
              </span>
            )}
            {product.bestValue && (
              <span className="rounded-full bg-gradient-to-r from-ember to-amber px-3 py-1 text-xs font-bold uppercase text-night">
                🏆 Best Value
              </span>
            )}
          </div>

          <h1 className="font-display mt-4 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
            {product.name}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-mist">
            <Stars rating={product.rating} />
            <span>
              {product.rating} · {product.reviewCount} reviews
            </span>
            <span aria-hidden>·</span>
            <span>⬇ {product.downloads.toLocaleString()}+ downloads</span>
          </div>

          <p className="mt-5 leading-relaxed text-mist">{product.description}</p>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="font-display text-4xl font-extrabold text-white">
              {formatPrice(product.price)}
            </span>
            <span className="text-lg text-mist line-through">
              {formatPrice(product.originalPrice)}
            </span>
            <span className="rounded-full bg-ember/15 px-3 py-1 text-xs font-bold text-amber">
              Save {Math.round((1 - product.price / product.originalPrice) * 100)}%
            </span>
          </div>

          <div className="mt-7">
            <ProductActions product={product} />
          </div>

          <ul className="mt-6 grid grid-cols-2 gap-2 text-xs text-mist">
            <li className="flex items-center gap-2">
              <span aria-hidden>⚡</span> Instant digital delivery
            </li>
            <li className="flex items-center gap-2">
              <span aria-hidden>🔒</span> Secure checkout
            </li>
            <li className="flex items-center gap-2">
              <span aria-hidden>📄</span> Commercial license included
            </li>
            <li className="flex items-center gap-2">
              <span aria-hidden>↩️</span> 7-day fair refund policy
            </li>
          </ul>

          {product.compatibleWith && (
            <div className="mt-6">
              <p className="text-xs font-bold uppercase tracking-widest text-mist">
                Compatible with
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.compatibleWith.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full border border-line bg-carbon px-3.5 py-1.5 text-xs font-semibold"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          )}
        </Reveal>
      </div>

      {/* What's included + features */}
      <div className="mt-20 grid gap-8 lg:grid-cols-2">
        <Reveal>
          <div className="h-full rounded-3xl border border-line bg-card p-8">
            <h2 className="font-display text-2xl font-bold">
              What&apos;s <span className="text-ember-gradient">Included</span>
            </h2>
            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {product.included.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm">
                  <span className="mt-0.5 text-ember" aria-hidden>
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="h-full rounded-3xl border border-line bg-card p-8">
            <h2 className="font-display text-2xl font-bold">
              Why You&apos;ll <span className="text-ember-gradient">Love It</span>
            </h2>
            <ul className="mt-6 space-y-3">
              {product.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm">
                  <span className="mt-0.5 text-amber" aria-hidden>
                    ★
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      {/* Frequently bought together */}
      {frequentlyBought.length > 0 && (
        <Reveal className="mt-20">
          <h2 className="font-display text-2xl font-bold">
            Frequently <span className="text-ember-gradient">Bought Together</span>
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {frequentlyBought.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </Reveal>
      )}

      {/* Reviews */}
      <Reveal className="mt-20">
        <h2 className="font-display text-2xl font-bold">
          Customer <span className="text-ember-gradient">Reviews</span>
        </h2>
        <Stagger className="mt-6 grid gap-5 md:grid-cols-3">
          {product.reviews.map((r) => (
            <StaggerItem key={r.author} className="h-full">
              <figure className="card-hover flex h-full flex-col rounded-2xl border border-line bg-card p-6">
                <Stars rating={r.rating} />
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-white/90">
                  “{r.text}”
                </blockquote>
                <figcaption className="mt-5 border-t border-line pt-4">
                  <p className="text-sm font-bold">{r.author}</p>
                  <p className="text-xs text-mist">{r.role}</p>
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </Stagger>
      </Reveal>

      {/* FAQs + policies */}
      <div className="mt-20 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
        <Reveal>
          <h2 className="font-display text-2xl font-bold">
            Frequently Asked <span className="text-ember-gradient">Questions</span>
          </h2>
          <div className="mt-6">
            <FaqAccordion faqs={product.faqs} />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="space-y-5 rounded-3xl border border-line bg-card p-8">
            <div>
              <h3 className="font-display font-bold">🔒 Secure Checkout</h3>
              <p className="mt-1.5 text-sm text-mist">
                Payments processed by Stripe and PayPal. Apple Pay, Google Pay and all major cards
                accepted.
              </p>
            </div>
            <div>
              <h3 className="font-display font-bold">⚡ Instant Digital Delivery</h3>
              <p className="mt-1.5 text-sm text-mist">
                Download links appear immediately after purchase and live forever in your dashboard.
              </p>
            </div>
            <div>
              <h3 className="font-display font-bold">↩️ Refund Policy</h3>
              <p className="mt-1.5 text-sm text-mist">
                Broken or misdescribed files are fixed or refunded within 7 days — fair and simple.
              </p>
            </div>
            <div>
              <h3 className="font-display font-bold">📄 License</h3>
              <p className="mt-1.5 text-sm text-mist">
                Standard commercial license for your own brand or business. Redistribution of raw
                files is not permitted.
              </p>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <Reveal className="mt-20">
          <h2 className="font-display text-2xl font-bold">
            Related <span className="text-ember-gradient">Products</span>
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </Reveal>
      )}
    </div>
  );
}
