import type { Metadata } from "next";
import BlogExplorer from "@/components/BlogExplorer";

export const metadata: Metadata = {
  title: "Blog — Automotive Creator Playbook",
  description:
    "AI prompt tutorials, car photography tips, social media growth strategies, mechanic business advice and automotive marketing insights.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-24 pt-28 sm:px-6 lg:px-8">
      <p className="text-xs font-bold uppercase tracking-[0.3em] text-ember">The pit wall</p>
      <h1 className="font-display mt-3 text-3xl font-extrabold tracking-tight sm:text-5xl">
        The Marscars <span className="text-ember-gradient">Blog</span>
      </h1>
      <p className="mt-4 max-w-2xl text-mist">
        Tutorials, growth strategies and industry insight for automotive creators, photographers,
        mechanics and dealerships.
      </p>
      <div className="mt-10">
        <BlogExplorer />
      </div>
    </div>
  );
}
