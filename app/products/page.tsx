import type { Metadata } from "next";
import { Suspense } from "react";
import ProductExplorer from "@/components/ProductExplorer";

export const metadata: Metadata = {
  title: "All Products",
  description:
    "Browse premium automotive digital products: AI prompt bundles, Canva templates, Lightroom presets, reel scripts, dealership kits and more. Instant download.",
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-24 pt-28 sm:px-6 lg:px-8">
      <p className="text-xs font-bold uppercase tracking-[0.3em] text-ember">The full garage</p>
      <h1 className="font-display mt-3 text-3xl font-extrabold tracking-tight sm:text-5xl">
        All <span className="text-ember-gradient">Products</span>
      </h1>
      <p className="mt-4 max-w-2xl text-mist">
        Every asset is an instant digital download with lifetime updates and a commercial-friendly
        license.
      </p>
      <div className="mt-10">
        <Suspense>
          <ProductExplorer />
        </Suspense>
      </div>
    </div>
  );
}
