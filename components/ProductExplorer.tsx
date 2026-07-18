"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/data/products";
import { categories } from "@/lib/data/categories";

type SortKey = "popular" | "price-asc" | "price-desc" | "rating";

export default function ProductExplorer() {
  const params = useSearchParams();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(params.get("category") ?? "all");
  const [sort, setSort] = useState<SortKey>("popular");

  const filtered = useMemo(() => {
    let list = [...products];
    if (category !== "all") list = list.filter((p) => p.category === category);
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.included.some((i) => i.toLowerCase().includes(q)),
      );
    }
    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      default:
        list.sort((a, b) => b.downloads - a.downloads);
    }
    return list;
  }, [query, category, sort]);

  return (
    <div>
      <div className="glass sticky top-16 z-30 -mx-4 mb-10 px-4 py-4 sm:-mx-6 sm:px-6 lg:rounded-2xl lg:mx-0 lg:px-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <span aria-hidden className="absolute left-4 top-1/2 -translate-y-1/2 text-mist">
              🔍
            </span>
            <label htmlFor="product-search" className="sr-only">
              Search products
            </label>
            <input
              id="product-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search prompts, presets, templates…"
              className="w-full rounded-full border border-line bg-night py-2.5 pl-11 pr-4 text-sm text-white placeholder:text-mist/60 focus:border-ember focus:outline-none"
            />
          </div>
          <label htmlFor="product-sort" className="sr-only">
            Sort products
          </label>
          <select
            id="product-sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="rounded-full border border-line bg-night px-4 py-2.5 text-sm text-white focus:border-ember focus:outline-none"
          >
            <option value="popular">Most Popular</option>
            <option value="rating">Highest Rated</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
          </select>
        </div>

        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setCategory("all")}
            className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
              category === "all"
                ? "bg-ember text-night"
                : "border border-line text-mist hover:border-ember/50 hover:text-white"
            }`}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c.slug}
              onClick={() => setCategory(c.slug)}
              className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                category === c.slug
                  ? "bg-ember text-night"
                  : "border border-line text-mist hover:border-ember/50 hover:text-white"
              }`}
            >
              {c.emoji} {c.name}
            </button>
          ))}
        </div>
      </div>

      <p className="mb-6 text-sm text-mist" role="status">
        {filtered.length} product{filtered.length === 1 ? "" : "s"}
      </p>

      <motion.div layout className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((p) => (
            <motion.div
              key={p.slug}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="h-full"
            >
              <ProductCard product={p} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <div className="rounded-2xl border border-line bg-card py-20 text-center">
          <p className="text-4xl">🏜️</p>
          <p className="font-display mt-4 text-xl font-bold">No products found</p>
          <p className="mt-2 text-sm text-mist">Try a different search or category.</p>
        </div>
      )}
    </div>
  );
}
