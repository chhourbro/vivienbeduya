/**
 * Helper function to build a path like ["parent", "child", "my-page"] from a sanity page document with prefix
 *
 * Handles up to 4 prefixes
 */
export function buildPagePath(page: any): string[] {
  if (!page?.slug?.current || page?.slug?.current === "/") return [];

  const parts: string[] = [page.slug.current];
  //@ts-ignore
  let parent: any = page.slug.prefix;
  let depth = 0;

  while (parent && depth < 4) {
    parts.unshift(parent.slug?.current || "");
    parent = parent.slug?.prefix;
    depth++;
  }

  return parts.filter(Boolean);
}

export const getJsonLd = (data?: Sanity.Maybe<AllPagesData>) => {
  if (data?.seo?.jsonLD) return data.seo.jsonLD;
  // You can create conditional jsonLD based on the data type here (e.g. if (data?._type === "product") return some new object)
  return null;
};
