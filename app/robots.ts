import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/dashboard", "/cart"],
      },
    ],
    sitemap: "https://marscars.store/sitemap.xml",
  };
}
