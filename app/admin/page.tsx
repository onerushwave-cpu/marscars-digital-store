"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { products, formatPrice } from "@/lib/data/products";

const tabs = ["Overview", "Products", "Discounts", "Users", "Email & Blog"] as const;
type Tab = (typeof tabs)[number];

const salesBars = [42, 58, 51, 75, 68, 90, 84, 96, 88, 110, 102, 124];
const months = ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];

const demoUsers = [
  { name: "Marcus T.", email: "marcus@example.com", plan: "Pro", spend: "$94.96", joined: "2026-01-12" },
  { name: "Sofia M.", email: "sofia@example.com", plan: "Elite", spend: "$312.40", joined: "2025-11-03" },
  { name: "Jake P.", email: "jake@example.com", plan: "Free", spend: "$19.99", joined: "2026-05-22" },
  { name: "Priya N.", email: "priya@example.com", plan: "Pro", spend: "$156.90", joined: "2026-03-08" },
];

const demoCoupons = [
  { code: "TURBO10", discount: "10%", uses: 412, status: "Active" },
  { code: "LAUNCH20", discount: "20%", uses: 1288, status: "Active" },
  { code: "SUMMER15", discount: "15%", uses: 730, status: "Expired" },
];

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>("Overview");
  const max = Math.max(...salesBars);

  return (
    <div className="mx-auto max-w-7xl px-4 pb-24 pt-28 sm:px-6 lg:px-8">
      <p className="text-xs font-bold uppercase tracking-[0.3em] text-ember">
        Seller / admin dashboard · Demo preview
      </p>
      <h1 className="font-display mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
        Mission <span className="text-ember-gradient">Control</span>
      </h1>
      <p className="mt-2 text-sm text-mist">
        Gated behind Supabase Auth admin roles in production — shown here with sample data.
      </p>

      <div className="mt-10 flex gap-2 overflow-x-auto border-b border-line pb-px" role="tablist">
        {tabs.map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={tab === t}
            onClick={() => setTab(t)}
            className={`shrink-0 border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${
              tab === t ? "border-ember text-white" : "border-transparent text-mist hover:text-white"
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
        {tab === "Overview" && (
          <>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: "Revenue (30d)", value: "$12,480", delta: "+18%" },
                { label: "Orders (30d)", value: "743", delta: "+11%" },
                { label: "Active members", value: "1,092", delta: "+6%" },
                { label: "Refund rate", value: "0.8%", delta: "-0.2%" },
              ].map((s) => (
                <div key={s.label} className="rounded-2xl border border-line bg-card p-6">
                  <p className="text-xs uppercase tracking-widest text-mist">{s.label}</p>
                  <p className="font-display mt-2 text-2xl font-extrabold">{s.value}</p>
                  <p className="mt-1 text-xs font-bold text-amber">{s.delta} vs. prev period</p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-3xl border border-line bg-card p-8">
              <h2 className="font-display text-xl font-bold">Monthly Sales</h2>
              <div className="mt-6 flex h-48 items-end gap-2 sm:gap-3" role="img" aria-label="Bar chart of monthly sales, trending upward">
                {salesBars.map((v, i) => (
                  <div key={i} className="flex flex-1 flex-col items-center gap-2">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(v / max) * 100}%` }}
                      transition={{ duration: 0.7, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                      className="w-full rounded-t-md bg-gradient-to-t from-ember/60 to-amber"
                    />
                    <span className="text-[9px] uppercase text-mist sm:text-[10px]">{months[i]}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {tab === "Products" && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2 className="font-display text-xl font-bold">Catalog ({products.length})</h2>
              <button className="btn-primary px-6 py-2.5 text-xs">+ Upload Product</button>
            </div>
            <div className="overflow-x-auto rounded-2xl border border-line bg-card">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead>
                  <tr className="border-b border-line text-xs uppercase tracking-wider text-mist">
                    <th className="px-6 py-4 font-semibold">Product</th>
                    <th className="px-6 py-4 font-semibold">Price</th>
                    <th className="px-6 py-4 font-semibold">Downloads</th>
                    <th className="px-6 py-4 font-semibold">Rating</th>
                    <th className="px-6 py-4 font-semibold" />
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.slug} className="border-b border-line/50 last:border-0">
                      <td className="px-6 py-4">
                        <span className="mr-2" aria-hidden>
                          {p.emoji}
                        </span>
                        {p.name}
                      </td>
                      <td className="px-6 py-4 font-bold">{formatPrice(p.price)}</td>
                      <td className="px-6 py-4 text-mist">{p.downloads.toLocaleString()}</td>
                      <td className="px-6 py-4 text-amber">★ {p.rating}</td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-xs font-semibold text-amber hover:text-ember">
                          Edit Pricing
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === "Discounts" && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2 className="font-display text-xl font-bold">Discount Codes</h2>
              <button className="btn-primary px-6 py-2.5 text-xs">+ Create Code</button>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {demoCoupons.map((c) => (
                <div key={c.code} className="rounded-2xl border border-line bg-card p-6">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-lg font-bold text-amber">{c.code}</span>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                        c.status === "Active" ? "bg-ember/15 text-amber" : "bg-white/5 text-mist"
                      }`}
                    >
                      {c.status}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-mist">
                    {c.discount} off · {c.uses.toLocaleString()} uses
                  </p>
                </div>
              ))}
            </div>
            <div className="rounded-2xl border border-line bg-card p-6 text-sm text-mist">
              💡 Refund processing, subscription management and sales exports live here in
              production, wired to Stripe.
            </div>
          </div>
        )}

        {tab === "Users" && (
          <div className="overflow-x-auto rounded-2xl border border-line bg-card">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-line text-xs uppercase tracking-wider text-mist">
                  <th className="px-6 py-4 font-semibold">User</th>
                  <th className="px-6 py-4 font-semibold">Plan</th>
                  <th className="px-6 py-4 font-semibold">Lifetime spend</th>
                  <th className="px-6 py-4 font-semibold">Joined</th>
                  <th className="px-6 py-4 font-semibold" />
                </tr>
              </thead>
              <tbody>
                {demoUsers.map((u) => (
                  <tr key={u.email} className="border-b border-line/50 last:border-0">
                    <td className="px-6 py-4">
                      <p className="font-bold">{u.name}</p>
                      <p className="text-xs text-mist">{u.email}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="rounded-full bg-ember/15 px-2.5 py-0.5 text-xs font-bold text-amber">
                        {u.plan}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold">{u.spend}</td>
                    <td className="px-6 py-4 text-mist">{u.joined}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-xs font-semibold text-amber hover:text-ember">
                        Manage
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === "Email & Blog" && (
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-line bg-card p-8">
              <h2 className="font-display text-xl font-bold">📧 Email Campaigns</h2>
              <ul className="mt-5 space-y-3 text-sm">
                {[
                  { name: "July Drop: New JDM Prompts", status: "Sent · 42% open rate" },
                  { name: "Pro Member Mid-Year Sale", status: "Scheduled · Jul 21" },
                  { name: "Abandoned Cart Recovery", status: "Automation · Active" },
                ].map((c) => (
                  <li key={c.name} className="flex items-center justify-between border-b border-line pb-3 last:border-0">
                    <span>{c.name}</span>
                    <span className="text-xs text-mist">{c.status}</span>
                  </li>
                ))}
              </ul>
              <button className="btn-primary mt-6 px-6 py-2.5 text-xs">+ New Campaign</button>
            </div>
            <div className="rounded-3xl border border-line bg-card p-8">
              <h2 className="font-display text-xl font-bold">✍️ Blog Posts</h2>
              <ul className="mt-5 space-y-3 text-sm">
                {[
                  { name: "Cinematic AI Prompts Guide", status: "Published" },
                  { name: "Phone Photography Tricks", status: "Published" },
                  { name: "August Trends Report", status: "Draft" },
                ].map((c) => (
                  <li key={c.name} className="flex items-center justify-between border-b border-line pb-3 last:border-0">
                    <span>{c.name}</span>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                        c.status === "Published" ? "bg-ember/15 text-amber" : "bg-white/5 text-mist"
                      }`}
                    >
                      {c.status}
                    </span>
                  </li>
                ))}
              </ul>
              <button className="btn-primary mt-6 px-6 py-2.5 text-xs">+ Publish Post</button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
