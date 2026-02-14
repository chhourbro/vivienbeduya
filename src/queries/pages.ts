import { sanityFetch } from "@/lib/sanityClient";
import { buildPagePath } from "@/utils/helpers";
import { defineQuery } from "next-sanity";
import {
  draftsFilter,
  pagePreviewFields,
  richTextFields,
  seoFields,
  slugWithPrefixFields,
  typeIsInAllPagesTypes,
} from "./_general";
import { blocksFields } from "./blocks";

// Create different queries for different page types here
export const pageFields = defineQuery(`
  ${pagePreviewFields},
  seo { ${seoFields} },
  _type == "page" => {
    blocks { ${blocksFields} }
  },
  _type == "article" => {
    content { ${richTextFields} },
    publishDate
  },
`);

export const pageBySlugQuery = defineQuery(`
  *[${typeIsInAllPagesTypes} && ${draftsFilter} && slug.current == $slug] {
    ${pageFields}
  }
`);

export const allPagesSlugsQuery = defineQuery(`
  *[${typeIsInAllPagesTypes} && ${draftsFilter}] {
    _updatedAt,
    slug { ${slugWithPrefixFields}}
  }
`);

export const getPage = async (path: string[] | undefined) => {
  const isHome = !path || path.length === 0;

  // Ignore Chrome DevTools JSON file
  if (path && ["com.chrome.devtools.json"].includes(path[path.length - 1])) {
    return null;
  }

  const lastSlug = isHome ? "/" : path[path.length - 1];

  const pages = (await sanityFetch({
    query: pageBySlugQuery,
    params: { slug: lastSlug },
    tags: [`slug:${lastSlug}`],
  })) as Sanity.Maybe<Sanity.Page[]>;

  if (!pages?.length) return null;

  const pageData = (
    isHome ? pages[0] : pages.find((p) => JSON.stringify(buildPagePath(p)) === JSON.stringify(path))
  ) as AllPagesData;

  if (!pageData?._type) return null;

  return pageData;
};

export const getAllPagesSlugs = async () => {
  const res = (await sanityFetch({
    query: allPagesSlugsQuery,
  })) as Sanity.Maybe<Sanity.Page[]>;
  return res;
};
