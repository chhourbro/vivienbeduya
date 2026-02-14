import type { MetadataRoute } from "next";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const isProduction = process.env.NEXT_PUBLIC_NODE_ENV === "production";
  return {
    rules: {
      userAgent: "*",
      allow: isProduction ? "/" : undefined,
      disallow: isProduction ? undefined : "/",
    },
    sitemap: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/sitemap.xml`,
  };
}
