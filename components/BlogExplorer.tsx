"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { blogPosts, blogCategories } from "@/lib/data/blog";

export default function BlogExplorer() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const filtered = useMemo(() => {
    let list = blogPosts;
    if (category !== "all") list = list.filter((p) => p.category === category);
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }
    return list;
  }, [query, category]);

  return (
    <div>
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <span aria-hidden className="absolute left-4 top-1/2 -translate-y-1/2 text-mist">
            🔍
          </span>
          <label htmlFor="blog-search" className="sr-only">
            Search articles
          </label>
          <input
            id="blog-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles…"
            className="w-full rounded-full border border-line bg-night py-2.5 pl-11 pr-4 text-sm placeholder:text-mist/60 focus:border-ember focus:outline-none"
          />
        </div>
      </div>

      <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
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
        {blogCategories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
              category === c
                ? "bg-ember text-night"
                : "border border-line text-mist hover:border-ember/50 hover:text-white"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="card-hover cover-sheen group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-card"
          >
            <div
              className={`relative flex aspect-[16/9] items-center justify-center bg-gradient-to-br ${post.gradient}`}
            >
              <span className="text-5xl transition-transform duration-500 group-hover:scale-125" aria-hidden>
                {post.emoji}
              </span>
              {post.featured && (
                <span className="absolute left-3 top-3 rounded-full bg-ember px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-night">
                  ★ Featured
                </span>
              )}
            </div>
            <div className="flex flex-1 flex-col p-6">
              <div className="flex items-center gap-2 text-xs text-mist">
                <span className="font-semibold text-amber">{post.category}</span>
                <span aria-hidden>·</span>
                <span>{post.readTime}</span>
              </div>
              <h2 className="font-display mt-3 text-lg font-bold leading-snug group-hover:text-amber">
                {post.title}
              </h2>
              <p className="mt-2 line-clamp-3 flex-1 text-sm text-mist">{post.excerpt}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {post.tags.map((t) => (
                  <span key={t} className="rounded-full border border-line px-2.5 py-0.5 text-[10px] text-mist">
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-10 rounded-2xl border border-line bg-card py-20 text-center">
          <p className="text-4xl" aria-hidden>
            📭
          </p>
          <p className="font-display mt-4 text-xl font-bold">No articles found</p>
        </div>
      )}
    </div>
  );
}
