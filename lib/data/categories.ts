import type { Category } from "@/lib/types";

export const categories: Category[] = [
  {
    slug: "ai-prompt-bundles",
    name: "AI Prompt Bundles",
    emoji: "🚗",
    description: "Cinematic AI prompts for Midjourney, Flux, Sora & more.",
    gradient: "from-orange-600/40 via-red-900/30 to-transparent",
  },
  {
    slug: "canva-templates",
    name: "Canva Templates",
    emoji: "🎨",
    description: "Drag-and-drop premium templates built for automotive brands.",
    gradient: "from-amber-500/40 via-orange-900/30 to-transparent",
  },
  {
    slug: "social-media-packs",
    name: "Social Media Packs",
    emoji: "📱",
    description: "Captions, hooks and scripts engineered to go viral.",
    gradient: "from-rose-600/40 via-purple-900/30 to-transparent",
  },
  {
    slug: "lightroom-presets",
    name: "Lightroom Presets",
    emoji: "📸",
    description: "One-click cinematic color grades for car photography.",
    gradient: "from-sky-600/40 via-slate-900/40 to-transparent",
  },
  {
    slug: "reel-scripts",
    name: "Reel Scripts",
    emoji: "🎥",
    description: "Ready-to-shoot scripts for Reels, TikTok and Shorts.",
    gradient: "from-violet-600/40 via-indigo-900/30 to-transparent",
  },
  {
    slug: "mechanic-business-toolkit",
    name: "Mechanic Business Toolkit",
    emoji: "🛠️",
    description: "Run your shop like a pro — invoices, checklists and forms.",
    gradient: "from-zinc-500/40 via-neutral-900/40 to-transparent",
  },
  {
    slug: "dealership-marketing-kits",
    name: "Dealership Marketing Kits",
    emoji: "🏪",
    description: "Ads, templates and scripts that move metal off the lot.",
    gradient: "from-emerald-600/40 via-teal-900/30 to-transparent",
  },
  {
    slug: "wallpaper-packs",
    name: "Wallpaper Packs",
    emoji: "🖼️",
    description: "4K automotive wallpapers for every screen you own.",
    gradient: "from-blue-600/40 via-cyan-900/30 to-transparent",
  },
  {
    slug: "automotive-logo-packs",
    name: "Automotive Logo Packs",
    emoji: "🎯",
    description: "Editable logos for garages, detailers and creators.",
    gradient: "from-red-600/40 via-orange-900/30 to-transparent",
  },
  {
    slug: "content-calendars",
    name: "Content Calendars",
    emoji: "📚",
    description: "365 days of automotive content ideas, planned for you.",
    gradient: "from-yellow-500/40 via-amber-900/30 to-transparent",
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
