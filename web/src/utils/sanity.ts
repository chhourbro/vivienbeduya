import { useSanityClient } from "@sanity/astro";

import groq from "groq";

export async function getPages(): Promise<Page[]> {
  return await useSanityClient().fetch(
    groq`*[_type == "page" && defined(slug.current)] | order(_createdAt desc)`
  );
}

export async function getPost(slug: string): Promise<Page> {
  return await useSanityClient().fetch(groq`*[_type == "page" && slug.current == $slug][0]`, {
    slug
  });
}
