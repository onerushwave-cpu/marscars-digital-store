"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/data/products";
import { useStore } from "@/lib/store";
import ProductCover from "@/components/ProductCover";
import Stars from "@/components/Stars";
import TiltCard from "@/components/fx/TiltCard";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, wishlist, hydrated } = useStore();
  const router = useRouter();
  const wished = hydrated && wishlist.includes(product.slug);
  const discount = Math.round((1 - product.price / product.originalPrice) * 100);

  return (
    <TiltCard className="card-hover group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-card">
      <Link
        href={`/products/${product.slug}`}
        className="cover-sheen relative block overflow-hidden"
        aria-label={product.name}
      >
        <div className="transition-transform duration-700 ease-out group-hover:scale-110">
          <ProductCover product={product} />
        </div>
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          <span className="rounded-full bg-ember px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-night">
            ⚡ Instant Download
          </span>
          {product.bestValue && (
            <span className="rounded-full bg-gradient-to-r from-amber to-ember px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-night">
              🏆 Best Value
            </span>
          )}
          {discount > 0 && (
            <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold text-white backdrop-blur">
              -{discount}%
            </span>
          )}
        </div>
      </Link>

      <button
        onClick={() => toggleWishlist(product.slug)}
        aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
        aria-pressed={wished}
        className={`absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full backdrop-blur transition-all hover:scale-110 ${
          wished ? "bg-ember text-white" : "bg-black/40 text-white/80 hover:text-white"
        }`}
      >
        {wished ? "♥" : "♡"}
      </button>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2 text-xs text-mist">
          <Stars rating={product.rating} className="text-xs" />
          <span>
            {product.rating} ({product.reviewCount})
          </span>
        </div>
        <Link href={`/products/${product.slug}`} className="mt-2">
          <h3 className="font-display text-lg font-bold leading-snug transition-colors group-hover:text-amber">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1.5 line-clamp-2 flex-1 text-sm text-mist">{product.tagline}</p>

        <div className="mt-4 flex items-end justify-between gap-3">
          <div>
            <span className="font-display text-xl font-bold text-white">
              {formatPrice(product.price)}
            </span>
            <span className="ml-2 text-sm text-mist line-through">
              {formatPrice(product.originalPrice)}
            </span>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <button
            onClick={() => addToCart(product.slug)}
            className="btn-secondary px-3 py-2.5 text-xs font-semibold"
          >
            Add to Cart
          </button>
          {product.gumroadUrl ? (
            <a
              href={product.gumroadUrl}
              className="gumroad-button btn-primary px-3 py-2.5 text-xs"
              target="_blank"
              rel="noopener noreferrer"
            >
              Buy Now
            </a>
          ) : (
            <button
              onClick={() => {
                addToCart(product.slug);
                router.push("/cart");
              }}
              className="btn-primary px-3 py-2.5 text-xs"
            >
              Buy Now
            </button>
          )}
        </div>
      </div>
    </TiltCard>
  );
}
