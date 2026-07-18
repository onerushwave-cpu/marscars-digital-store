"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { useStore } from "@/lib/store";
import { getProduct, formatPrice } from "@/lib/data/products";
import ProductCard from "@/components/ProductCard";

const demoPurchases = [
  { slug: "ai-automotive-poster-prompt-bundle", date: "2026-07-02", invoice: "INV-2417" },
  { slug: "lightroom-presets", date: "2026-06-18", invoice: "INV-2380" },
  { slug: "automotive-content-calendar", date: "2026-05-30", invoice: "INV-2311" },
];

const tabs = ["Downloads", "Subscription", "Favorites", "Invoices", "Profile"] as const;
type Tab = (typeof tabs)[number];

export default function DashboardPage() {
  const [tab, setTab] = useState<Tab>("Downloads");
  const { wishlist, recentlyViewed, hydrated } = useStore();
  const favorites = wishlist.map((s) => getProduct(s)).filter((p) => p !== undefined);
  const purchases = demoPurchases
    .map((d) => ({ ...d, product: getProduct(d.slug) }))
    .filter((d) => d.product !== undefined);
  const recent = recentlyViewed.map((s) => getProduct(s)).filter((p) => p !== undefined).slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-4 pb-24 pt-28 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-ember">
            Customer dashboard · Demo preview
          </p>
          <h1 className="font-display mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Welcome back, <span className="text-ember-gradient">Driver</span> 🏎️
          </h1>
          <p className="mt-2 text-sm text-mist">
            Signed in with Supabase Auth in production — this is a demo preview with sample data.
          </p>
        </div>
        <span className="glass rounded-full px-4 py-2 text-xs font-bold text-amber">
          ⚡ Pro Member
        </span>
      </div>

      <div className="mt-10 flex gap-2 overflow-x-auto border-b border-line pb-px" role="tablist">
        {tabs.map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={tab === t}
            onClick={() => setTab(t)}
            className={`shrink-0 border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${
              tab === t
                ? "border-ember text-white"
                : "border-transparent text-mist hover:text-white"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <motion.div
        key={tab}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="mt-8"
      >
        {tab === "Downloads" && (
          <div className="space-y-4">
            {purchases.map(({ product, date, invoice }) => (
              <div
                key={invoice}
                className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-line bg-card p-5"
              >
                <div className="flex items-center gap-4">
                  <span
                    className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br text-2xl ${product!.gradient}`}
                    aria-hidden
                  >
                    {product!.emoji}
                  </span>
                  <div>
                    <h2 className="font-display font-bold">{product!.name}</h2>
                    <p className="text-xs text-mist">
                      Purchased {date} · Downloaded 3× · Latest version v2.4
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="btn-primary px-5 py-2.5 text-xs">⬇ Download</button>
                  <Link href={`/products/${product!.slug}`} className="btn-secondary px-5 py-2.5 text-xs">
                    View
                  </Link>
                </div>
              </div>
            ))}
            {recent.length > 0 && (
              <div className="mt-10">
                <h2 className="font-display text-xl font-bold">
                  Recently <span className="text-ember-gradient">Viewed</span>
                </h2>
                <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {recent.map((p) => (
                    <ProductCard key={p.slug} product={p} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {tab === "Subscription" && (
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="glow-ring rounded-3xl border border-ember/40 bg-card p-8">
              <p className="text-xs font-bold uppercase tracking-widest text-amber">Current plan</p>
              <h2 className="font-display mt-2 text-3xl font-extrabold">Pro — $15/month</h2>
              <p className="mt-3 text-sm text-mist">
                Unlimited downloads · Weekly drops · Member discounts · Early access
              </p>
              <p className="mt-4 text-xs text-mist">Next billing date: August 2, 2026 · Visa •••• 4242</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/pricing" className="btn-primary px-6 py-3 text-xs">
                  Upgrade to Elite →
                </Link>
                <button className="btn-secondary px-6 py-3 text-xs">Manage Payment Methods</button>
                <button className="rounded-full px-4 py-3 text-xs font-semibold text-mist hover:text-white">
                  Cancel plan
                </button>
              </div>
            </div>
            <div className="rounded-3xl border border-line bg-card p-8">
              <h2 className="font-display text-xl font-bold">This month&apos;s usage</h2>
              <dl className="mt-5 space-y-4 text-sm">
                {[
                  { label: "Downloads", value: "38 / Unlimited" },
                  { label: "New drops unlocked", value: "4" },
                  { label: "Member savings", value: "$46.20" },
                ].map((row) => (
                  <div key={row.label} className="flex justify-between border-b border-line pb-3">
                    <dt className="text-mist">{row.label}</dt>
                    <dd className="font-bold">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        )}

        {tab === "Favorites" &&
          (!hydrated || favorites.length === 0 ? (
            <div className="rounded-3xl border border-line bg-card py-20 text-center">
              <p className="text-4xl" aria-hidden>
                ♡
              </p>
              <p className="font-display mt-4 text-xl font-bold">No favorites yet</p>
              <p className="mt-2 text-sm text-mist">Heart any product and it lands here.</p>
              <Link href="/products" className="btn-primary mt-6 px-7 py-3 text-sm">
                Browse Products →
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {favorites.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          ))}

        {tab === "Invoices" && (
          <div className="overflow-x-auto rounded-2xl border border-line bg-card">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr className="border-b border-line text-xs uppercase tracking-wider text-mist">
                  <th className="px-6 py-4 font-semibold">Invoice</th>
                  <th className="px-6 py-4 font-semibold">Product</th>
                  <th className="px-6 py-4 font-semibold">Date</th>
                  <th className="px-6 py-4 font-semibold">Amount</th>
                  <th className="px-6 py-4 font-semibold" />
                </tr>
              </thead>
              <tbody>
                {purchases.map(({ product, date, invoice }) => (
                  <tr key={invoice} className="border-b border-line/50 last:border-0">
                    <td className="px-6 py-4 font-mono text-xs">{invoice}</td>
                    <td className="px-6 py-4">{product!.name}</td>
                    <td className="px-6 py-4 text-mist">{date}</td>
                    <td className="px-6 py-4 font-bold">{formatPrice(product!.price)}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-xs font-semibold text-amber hover:text-ember">
                        PDF ↓
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === "Profile" && (
          <form
            className="max-w-xl space-y-5 rounded-3xl border border-line bg-card p-8"
            onSubmit={(e) => e.preventDefault()}
          >
            <div>
              <label htmlFor="pf-name" className="text-xs font-bold uppercase tracking-widest text-mist">
                Display name
              </label>
              <input
                id="pf-name"
                defaultValue="Driver One"
                className="mt-2 w-full rounded-xl border border-line bg-night px-4 py-3 text-sm focus:border-ember focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="pf-email" className="text-xs font-bold uppercase tracking-widest text-mist">
                Email
              </label>
              <input
                id="pf-email"
                type="email"
                defaultValue="driver@marscars.store"
                className="mt-2 w-full rounded-xl border border-line bg-night px-4 py-3 text-sm focus:border-ember focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="pf-handle" className="text-xs font-bold uppercase tracking-widest text-mist">
                Instagram / TikTok handle
              </label>
              <input
                id="pf-handle"
                defaultValue="@driver.one"
                className="mt-2 w-full rounded-xl border border-line bg-night px-4 py-3 text-sm focus:border-ember focus:outline-none"
              />
            </div>
            <button type="submit" className="btn-primary px-7 py-3 text-sm">
              Save Changes
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}
