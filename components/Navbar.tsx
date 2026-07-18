"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useStore } from "@/lib/store";

const links = [
  { href: "/products", label: "Products" },
  { href: "/#categories", label: "Categories" },
  { href: "/pricing", label: "Membership" },
  { href: "/blog", label: "Blog" },
  { href: "/dashboard", label: "Dashboard" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { cart, wishlist, hydrated } = useStore();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "glass shadow-2xl shadow-black/40" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-2" aria-label="Marscars home">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-ember to-amber text-lg font-black text-night shadow-lg shadow-ember/40 transition-transform group-hover:scale-110">
            M
          </span>
          <span className="font-display text-lg font-bold tracking-tight">
            MARS<span className="text-ember-gradient">CARS</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-mist transition-colors hover:bg-white/5 hover:text-white"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/wishlist"
            aria-label="Wishlist"
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-mist transition-colors hover:bg-white/5 hover:text-white"
          >
            ♡
            {hydrated && wishlist.length > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-ember text-[10px] font-bold text-night">
                {wishlist.length}
              </span>
            )}
          </Link>
          <Link
            href="/cart"
            aria-label="Cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-mist transition-colors hover:bg-white/5 hover:text-white"
          >
            🛒
            {hydrated && cart.length > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-ember text-[10px] font-bold text-night">
                {cart.length}
              </span>
            )}
          </Link>
          <Link href="/products" className="btn-primary hidden px-5 py-2 text-sm md:inline-flex">
            Shop Now
          </Link>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full text-white md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span className="text-xl">{open ? "✕" : "☰"}</span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="glass overflow-hidden md:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="rounded-xl px-4 py-3 font-medium text-white transition-colors hover:bg-white/5"
                >
                  {l.label}
                </Link>
              ))}
              <Link href="/products" className="btn-primary mt-2 px-5 py-3 text-sm">
                Shop Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
