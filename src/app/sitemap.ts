import { getAllPagesSlugs } from "@/queries/pages";
import { formatLinkPath } from "@flight-digital/flightdeck/helpers";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const pages = await getAllPagesSlugs();
    const sitemap =
      pages?.map((page) => {
        const isHome = page?.slug?.current === "/" && !page?.slug?.prefix;
        const path = isHome
          ? ""
          : "/" +
            formatLinkPath({
              slug: page?.slug?.current,
              prefix: page?.slug?.prefix,
              addStartAndEndSlash: false,
            });
        return {
          url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}${path}`,
          lastModified: new Date(page?._updatedAt),
          changeFrequency: "weekly",
          priority: 0.8,
        };
      }) ?? [];
    return sitemap as MetadataRoute.Sitemap;
  } catch (err) {
    console.error("Error generating sitemap", err);
    return [];
  }
}
