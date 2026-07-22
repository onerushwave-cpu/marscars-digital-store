"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Product } from "@/lib/types";
import { useStore } from "@/lib/store";

export default function ProductActions({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, wishlist, hydrated, trackView } = useStore();
  const router = useRouter();
  const wished = hydrated && wishlist.includes(product.slug);

  useEffect(() => {
    trackView(product.slug);
  }, [product.slug, trackView]);

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => addToCart(product.slug)}
          className="btn-secondary px-6 py-3.5 text-sm font-bold"
        >
          🛒 Add to Cart
        </button>
        {product.gumroadUrl ? (
          <a
            href={product.gumroadUrl}
            className="gumroad-button btn-primary px-6 py-3.5 text-sm"
            data-gumroad-single-product="true"
            target="_blank"
            rel="noopener noreferrer"
          >
            ⚡ Buy on Gumroad
          </a>
        ) : (
          <button
            onClick={() => {
              addToCart(product.slug);
              router.push("/cart");
            }}
            className="btn-primary px-6 py-3.5 text-sm"
          >
            ⚡ Buy Now
          </button>
        )}
      </div>
      <button
        onClick={() => toggleWishlist(product.slug)}
        aria-pressed={wished}
        className={`rounded-full border px-6 py-3 text-sm font-semibold transition-colors ${
          wished
            ? "border-ember bg-ember/10 text-amber"
            : "border-line text-mist hover:border-ember/50 hover:text-white"
        }`}
      >
        {wished ? "♥ Saved to Wishlist" : "♡ Save to Wishlist"}
      </button>
    </div>
  );
}
