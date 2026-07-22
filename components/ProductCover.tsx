import type { Product } from "@/lib/types";

/**
 * Generated cover art — a cinematic gradient scene per product so the site
 * ships fast with zero external image requests. Swap for real cover photos
 * by dropping images into /public and replacing this component's output.
 */
export default function ProductCover({
  product,
  size = "md",
}: {
  product: Product;
  size?: "sm" | "md" | "lg";
}) {
  const emojiSize = size === "lg" ? "text-8xl" : size === "sm" ? "text-4xl" : "text-6xl";
  return (
    <div
      className={`relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden bg-gradient-to-br ${product.gradient}`}
      role="img"
      aria-label={`${product.name} cover art`}
    >
      {product.image ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div
            className="absolute inset-0"
            aria-hidden
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 50% 100%, rgba(0,0,0,0.45), transparent 70%)",
            }}
          />
        </>
      ) : (
        <>
          <div className="speed-lines absolute inset-0" aria-hidden />
          <div
            className="absolute inset-0"
            aria-hidden
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 50% 100%, rgba(0,0,0,0.55), transparent 70%)",
            }}
          />
          <span className={`relative drop-shadow-2xl ${emojiSize}`} aria-hidden>
            {product.emoji}
          </span>
        </>
      )}
      <span
        aria-hidden
        className="absolute bottom-3 left-3 rounded-full bg-black/50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white/80 backdrop-blur"
      >
        Marscars
      </span>
    </div>
  );
}
