import { useSanityClient } from "@sanity/astro";
import groq from "groq";

import { getSingleDoc } from "./groqQueries";

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

export async function getHeader(): Promise<Header> {
  const { query, params } = getSingleDoc("header", "header");

  return await useSanityClient().fetch(query, params);
}
