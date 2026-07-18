"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useStore } from "@/lib/store";
import { getProduct, formatPrice } from "@/lib/data/products";
import ProductCover from "@/components/ProductCover";

const COUPONS: Record<string, number> = { TURBO10: 0.1, LAUNCH20: 0.2 };

export default function CartPage() {
  const { cart, removeFromCart, clearCart, cartTotal, hydrated } = useStore();
  const [coupon, setCoupon] = useState("");
  const [applied, setApplied] = useState<string | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [paid, setPaid] = useState(false);

  const items = useMemo(
    () => cart.map((slug) => getProduct(slug)).filter((p) => p !== undefined),
    [cart],
  );

  const discount = applied ? cartTotal * COUPONS[applied] : 0;
  const total = cartTotal - discount;

  const applyCoupon = () => {
    const code = coupon.trim().toUpperCase();
    if (COUPONS[code]) {
      setApplied(code);
      setCouponError(null);
    } else {
      setCouponError("That code didn't rev. Try TURBO10.");
    }
  };

  if (paid) {
    const confetti = Array.from({ length: 40 }, (_, i) => ({
      left: 5 + (i * 90) / 40 + (i % 3),
      delay: (i % 8) * 0.09,
      drift: ((i % 7) - 3) * 30,
      spin: 360 + (i % 5) * 120,
      color: ["#FF6A00", "#FFAA33", "#ffffff", "#d90429"][i % 4],
    }));
    return (
      <div className="relative mx-auto max-w-2xl px-4 pb-24 pt-40 text-center sm:px-6">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-24 h-[70vh] overflow-hidden">
          {confetti.map((c, i) => (
            <span
              key={i}
              className="confetti-piece"
              style={{
                left: `${c.left}%`,
                background: c.color,
                animationDelay: `${c.delay}s`,
                ["--c-drift" as string]: `${c.drift}px`,
                ["--c-spin" as string]: `${c.spin}deg`,
              }}
            />
          ))}
        </div>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: [0.8, 1.04, 1], opacity: 1 }}
          transition={{ duration: 0.6, times: [0, 0.7, 1], ease: [0.22, 1, 0.36, 1] }}
          className="glow-ring relative rounded-3xl border border-ember/40 bg-card p-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.15 }}
            className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-ember to-amber shadow-[0_0_50px_rgba(255,106,0,0.5)]"
          >
            <svg width="38" height="38" viewBox="0 0 38 38" fill="none" aria-hidden>
              <path
                d="M8 20 L16 28 L30 11"
                stroke="#050505"
                strokeWidth="4.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="check-path"
              />
            </svg>
          </motion.div>
          <h1 className="font-display mt-6 text-3xl font-extrabold">Order Complete! 🏁</h1>
          <p className="mt-4 text-mist">
            Your downloads are ready. In the production build, Stripe/PayPal checkout runs here and
            files are delivered instantly to your email and dashboard.
          </p>
          <Link href="/dashboard" className="btn-primary mt-8 px-8 py-3.5 text-sm">
            Go to Downloads →
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pb-24 pt-28 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-5xl">
        Your <span className="text-ember-gradient">Cart</span>
      </h1>

      {!hydrated ? null : items.length === 0 ? (
        <div className="mt-12 rounded-3xl border border-line bg-card py-24 text-center">
          <p className="text-5xl" aria-hidden>
            🛒
          </p>
          <p className="font-display mt-5 text-xl font-bold">Your cart is running on empty</p>
          <p className="mt-2 text-sm text-mist">Fill it with premium automotive assets.</p>
          <Link href="/products" className="btn-primary mt-7 px-8 py-3 text-sm">
            Browse Products →
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          <ul className="space-y-4">
            <AnimatePresence>
              {items.map((p) => (
                <motion.li
                  key={p.slug}
                  layout
                  exit={{ opacity: 0, x: -40 }}
                  className="flex gap-4 rounded-2xl border border-line bg-card p-4"
                >
                  <Link href={`/products/${p.slug}`} className="w-28 shrink-0 overflow-hidden rounded-xl sm:w-36">
                    <ProductCover product={p} size="sm" />
                  </Link>
                  <div className="flex flex-1 flex-col">
                    <Link href={`/products/${p.slug}`}>
                      <h2 className="font-display font-bold leading-snug hover:text-amber">
                        {p.name}
                      </h2>
                    </Link>
                    <p className="mt-1 text-xs text-mist">⚡ Instant download · Lifetime updates</p>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <span className="font-display font-bold">{formatPrice(p.price)}</span>
                      <button
                        onClick={() => removeFromCart(p.slug)}
                        className="text-xs font-semibold text-mist transition-colors hover:text-ember"
                      >
                        Remove ✕
                      </button>
                    </div>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>

          <div className="h-fit rounded-3xl border border-line bg-card p-7">
            <h2 className="font-display text-xl font-bold">Order Summary</h2>

            <div className="mt-5 flex gap-2">
              <label htmlFor="coupon" className="sr-only">
                Coupon code
              </label>
              <input
                id="coupon"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                placeholder="Coupon code (try TURBO10)"
                className="w-full rounded-full border border-line bg-night px-4 py-2.5 text-sm placeholder:text-mist/60 focus:border-ember focus:outline-none"
              />
              <button onClick={applyCoupon} className="btn-secondary shrink-0 px-4 py-2.5 text-xs">
                Apply
              </button>
            </div>
            {couponError && <p className="mt-2 text-xs text-ember">{couponError}</p>}
            {applied && (
              <p className="mt-2 text-xs text-amber">
                ✓ {applied} applied — {COUPONS[applied] * 100}% off
              </p>
            )}

            <dl className="mt-6 space-y-3 border-t border-line pt-5 text-sm">
              <div className="flex justify-between text-mist">
                <dt>Subtotal</dt>
                <dd>{formatPrice(cartTotal)}</dd>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-amber">
                  <dt>Discount</dt>
                  <dd>-{formatPrice(discount)}</dd>
                </div>
              )}
              <div className="flex justify-between font-display text-lg font-bold text-white">
                <dt>Total</dt>
                <dd>{formatPrice(total)}</dd>
              </div>
            </dl>

            <button
              onClick={() => {
                setPaid(true);
                clearCart();
              }}
              className="btn-primary mt-6 w-full px-6 py-3.5 text-sm"
            >
              🔒 Secure Checkout →
            </button>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-[10px] text-mist">
              <span className="rounded-full border border-line px-2.5 py-1">Stripe</span>
              <span className="rounded-full border border-line px-2.5 py-1">PayPal</span>
              <span className="rounded-full border border-line px-2.5 py-1">Apple Pay</span>
              <span className="rounded-full border border-line px-2.5 py-1">Google Pay</span>
              <span className="rounded-full border border-line px-2.5 py-1">Visa · MC · Amex</span>
            </div>
            <p className="mt-4 text-center text-[11px] text-mist">
              ⚡ Instant digital delivery after payment
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
