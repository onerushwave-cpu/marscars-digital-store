"use client";

import Link from "next/link";
import { useStore } from "@/lib/store";
import { getProduct } from "@/lib/data/products";
import ProductCard from "@/components/ProductCard";

export default function WishlistPage() {
  const { wishlist, recentlyViewed, hydrated } = useStore();
  const items = wishlist.map((s) => getProduct(s)).filter((p) => p !== undefined);
  const recent = recentlyViewed
    .map((s) => getProduct(s))
    .filter((p) => p !== undefined)
    .filter((p) => !wishlist.includes(p.slug))
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-4 pb-24 pt-28 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-5xl">
        Your <span className="text-ember-gradient">Wishlist</span>
      </h1>

      {!hydrated ? null : items.length === 0 ? (
        <div className="mt-12 rounded-3xl border border-line bg-card py-24 text-center">
          <p className="text-5xl" aria-hidden>
            ♡
          </p>
          <p className="font-display mt-5 text-xl font-bold">Nothing saved yet</p>
          <p className="mt-2 text-sm text-mist">
            Tap the heart on any product to park it here for later.
          </p>
          <Link href="/products" className="btn-primary mt-7 px-8 py-3 text-sm">
            Browse Products →
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      )}

      {hydrated && recent.length > 0 && (
        <div className="mt-20">
          <h2 className="font-display text-2xl font-bold">
            Recently <span className="text-ember-gradient">Viewed</span>
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recent.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
