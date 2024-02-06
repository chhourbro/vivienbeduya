import "@flight-digital/flightdeck/dist/global.d.ts";
import type { PortableTextBlock } from "@portabletext/types";
import type { ImageAsset, Slug } from "@sanity/types";
import "../../cms/sanity-codegen.d.ts";

declare global {
  type Maybe<T> = T | null;
  interface GroqQuery {
    query: string;
    params?: any;
  }

  interface SanityDocument {
    _id?: Maybe<Scalars["String"]>;
    _type?: Maybe<Scalars["String"]>;
    _createdAt?: Maybe<Scalars["Date"]>;
    _updatedAt?: Maybe<Scalars["Date"]>;
    _rev?: Maybe<Scalars["String"]>;
    _ref?: Maybe<Scalars["String"]>;
  }

  type Page = Sanity.Production.Schema.Page & SanityDocument;
}
