import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/lib/store";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MouseGlow from "@/components/MouseGlow";
import Toast from "@/components/Toast";
import PageTransition from "@/components/PageTransition";
import CustomCursor from "@/components/fx/CustomCursor";
import AmbientBackground from "@/components/fx/AmbientBackground";
import IntroLoader from "@/components/fx/IntroLoader";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const sora = Sora({ subsets: ["latin"], variable: "--font-sora", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://marscars.store"),
  title: {
    default: "Marscars Digital Marketplace — Premium Digital Products for Automotive Creators",
    template: "%s | Marscars Digital Marketplace",
  },
  description:
    "Fuel your automotive brand with premium digital products: AI prompt bundles, Canva templates, Lightroom presets, reel scripts, dealership marketing kits and more. Instant download.",
  keywords: [
    "automotive digital products",
    "car AI prompts",
    "automotive lightroom presets",
    "dealership marketing templates",
    "car content creator",
    "mechanic business templates",
  ],
  openGraph: {
    type: "website",
    siteName: "Marscars Digital Marketplace",
    title: "Marscars Digital Marketplace",
    description:
      "Everything you need to grow your automotive content, dealership, mechanic business, or car photography — all in one place.",
    url: "https://marscars.store",
  },
  twitter: {
    card: "summary_large_image",
    title: "Marscars Digital Marketplace",
    description: "Premium digital products for automotive creators. Instant download.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "OnlineStore",
  name: "Marscars Digital Marketplace",
  url: "https://marscars.store",
  description:
    "Premium digital products for car enthusiasts, automotive content creators, mechanics, detailers and dealerships.",
  sameAs: [],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable} dark`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <StoreProvider>
          <IntroLoader />
          <AmbientBackground />
          <MouseGlow />
          <CustomCursor />
          <Navbar />
          <PageTransition>
            <main className="relative z-10 min-h-screen">{children}</main>
          </PageTransition>
          <Footer />
          <Toast />
        </StoreProvider>
      </body>
    </html>
  );
}
