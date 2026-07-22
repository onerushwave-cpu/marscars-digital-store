export interface Review {
  author: string;
  role: string;
  rating: number;
  text: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Product {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  price: number;
  originalPrice: number;
  emoji: string;
  gradient: string;
  rating: number;
  reviewCount: number;
  downloads: number;
  bestValue?: boolean;
  features: string[];
  included: string[];
  compatibleWith?: string[];
  reviews: Review[];
  faqs: FAQ[];
  related: string[];
  /** Optional cover image in /public (e.g. "/covers/my-pack.jpg"). Falls back to the emoji scene. */
  image?: string;
  /** When set, Buy Now / Buy on Gumroad opens this Gumroad product's real checkout overlay. */
  gumroadUrl?: string;
}

export interface Category {
  slug: string;
  name: string;
  emoji: string;
  description: string;
  gradient: string;
}

export interface Plan {
  slug: string;
  name: string;
  price: number;
  period: string;
  tagline: string;
  highlighted?: boolean;
  features: string[];
  cta: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  date: string;
  readTime: string;
  emoji: string;
  gradient: string;
  featured?: boolean;
  content: string[];
}
