import type { AstroGlobal } from "astro";

export function formatDate(date: Maybe<string> | undefined) {
  if (!date) return "";

  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });
}

export const buildCanonicalUrl = (Astro: AstroGlobal) =>
  new URL(Astro.url.pathname, Astro.site).toString().replace(/\/+$/, "");
