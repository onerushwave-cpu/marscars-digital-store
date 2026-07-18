"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getProduct } from "@/lib/data/products";

interface StoreState {
  cart: string[];
  wishlist: string[];
  recentlyViewed: string[];
  hydrated: boolean;
  addToCart: (slug: string) => void;
  removeFromCart: (slug: string) => void;
  clearCart: () => void;
  toggleWishlist: (slug: string) => void;
  trackView: (slug: string) => void;
  cartTotal: number;
  toast: string | null;
}

const StoreContext = createContext<StoreState | null>(null);

function load(key: string): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(key);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((s) => typeof s === "string") : [];
  } catch {
    return [];
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<string[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    setCart(load("marscars:cart"));
    setWishlist(load("marscars:wishlist"));
    setRecentlyViewed(load("marscars:recent"));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem("marscars:cart", JSON.stringify(cart));
  }, [cart, hydrated]);
  useEffect(() => {
    if (hydrated) window.localStorage.setItem("marscars:wishlist", JSON.stringify(wishlist));
  }, [wishlist, hydrated]);
  useEffect(() => {
    if (hydrated) window.localStorage.setItem("marscars:recent", JSON.stringify(recentlyViewed));
  }, [recentlyViewed, hydrated]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(t);
  }, [toast]);

  const addToCart = useCallback((slug: string) => {
    setCart((c) => (c.includes(slug) ? c : [...c, slug]));
    setToast("Added to cart 🛒");
  }, []);

  const removeFromCart = useCallback((slug: string) => {
    setCart((c) => c.filter((s) => s !== slug));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback((slug: string) => {
    setWishlist((w) => {
      const has = w.includes(slug);
      setToast(has ? "Removed from wishlist" : "Saved to wishlist ❤️");
      return has ? w.filter((s) => s !== slug) : [...w, slug];
    });
  }, []);

  const trackView = useCallback((slug: string) => {
    setRecentlyViewed((r) => [slug, ...r.filter((s) => s !== slug)].slice(0, 8));
  }, []);

  const cartTotal = useMemo(
    () => cart.reduce((sum, slug) => sum + (getProduct(slug)?.price ?? 0), 0),
    [cart],
  );

  const value = useMemo(
    () => ({
      cart,
      wishlist,
      recentlyViewed,
      hydrated,
      addToCart,
      removeFromCart,
      clearCart,
      toggleWishlist,
      trackView,
      cartTotal,
      toast,
    }),
    [cart, wishlist, recentlyViewed, hydrated, addToCart, removeFromCart, clearCart, toggleWishlist, trackView, cartTotal, toast],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreState {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
