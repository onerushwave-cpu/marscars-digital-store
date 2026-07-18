import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";

const columns = [
  {
    title: "Shop",
    links: [
      { label: "All Products", href: "/products" },
      { label: "Ultimate Bundle", href: "/products/ultimate-automotive-creator-bundle" },
      { label: "AI Prompts", href: "/products?category=ai-prompt-bundles" },
      { label: "Lightroom Presets", href: "/products?category=lightroom-presets" },
      { label: "Membership Plans", href: "/pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Affiliate Program", href: "/pricing" },
      { label: "Customer Dashboard", href: "/dashboard" },
      { label: "Admin", href: "/admin" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Refund Policy", href: "/products" },
      { label: "License Info", href: "/products" },
      { label: "Contact", href: "mailto:support@marscars.store" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-line bg-carbon">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-ember to-amber text-lg font-black text-night">
                M
              </span>
              <span className="font-display text-lg font-bold tracking-tight">
                MARS<span className="text-ember-gradient">CARS</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-mist">
              Premium digital products for car enthusiasts, automotive creators, mechanics,
              detailers and dealerships. Fuel your automotive brand.
            </p>
            <NewsletterForm />
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="font-display text-sm font-bold uppercase tracking-widest text-white">
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="text-sm text-mist transition-colors hover:text-ember"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 sm:flex-row">
          <p className="text-xs text-mist">
            © {new Date().getFullYear()} Marscars Digital Marketplace. All rights reserved.
          </p>
          <div className="flex items-center gap-3 text-xs text-mist">
            <span className="rounded-full border border-line px-3 py-1">Stripe</span>
            <span className="rounded-full border border-line px-3 py-1">PayPal</span>
            <span className="rounded-full border border-line px-3 py-1">Apple&nbsp;Pay</span>
            <span className="rounded-full border border-line px-3 py-1">Google&nbsp;Pay</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
