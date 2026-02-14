# API & Data Patterns Guide

This document covers API routes, data fetching patterns, revalidation strategies, and server/client data handling in Next.js projects with Sanity CMS.

---

## Architecture Overview

### Data Flow

```
Sanity CMS (Content) 
    ↓
GROQ Queries
    ↓
Next.js Server Components
    ↓
React Client Components (if interactive)
    ↓
User Browser
```

**Key Principles:**
- Fetch data on the server when possible
- Use React Server Components by default
- Client components only for interactivity
- Cache and revalidate strategically

---

## Data Fetching Patterns

### Server Component Data Fetching

**Default pattern for pages:**

```typescript
// app/(site)/[[...slug]]/page.tsx

import { sanityFetch } from "@/sanity/lib/live.server";
import { pageQuery } from "@/queries/pages";
import { PageTemplate } from "@/templates/page";

interface Props {
  params: { slug: string[] };
}

export default async function Page({ params }: Props): Promise<JSX.Element> {
  const slug = params.slug?.join("/") || "/";
  
  // Fetch data server-side
  const { data } = await sanityFetch({
    query: pageQuery,
    params: { slug },
  });

  if (!data) {
    notFound();
  }

  return <PageTemplate data={data} />;
}
```

**Key features:**
- Async function component
- Direct data fetching (no hooks)
- Automatic request deduplication
- Built-in caching

### Client Component Data Fetching

Rarely needed, but available for dynamic client-side data:

```typescript
"use client";

import { useEffect, useState } from "react";

export const DynamicComponent = (): JSX.Element => {
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    fetch("/api/data")
      .then((res) => res.json())
      .then(setData);
  }, []);

  if (!data) return <div>Loading...</div>;

  return <div>{data.title}</div>;
};
```

---

## Sanity Client Configuration

### Server Client

**File:** `src/sanity/lib/client.ts`

Used for server-side data fetching:

```typescript
import { createClient } from "next-sanity";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-01-01",
  useCdn: true, // Use CDN for production
  perspective: "published", // Only published content
});
```

### Draft Mode Client

For preview/draft content:

```typescript
import { client } from "./client";

export const previewClient = client.withConfig({
  useCdn: false, // Always fresh data
  perspective: "previewDrafts", // Include drafts
  token: process.env.SANITY_API_TOKEN, // Requires authentication
});
```

### Live Preview

**File:** `src/sanity/lib/live.server.ts`

Wrapper for fetching with live preview support:

```typescript
import { defineLive } from "next-sanity";
import { client } from "./client";

export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: process.env.SANITY_API_TOKEN,
  browserToken: process.env.NEXT_PUBLIC_SANITY_API_TOKEN,
});
```

**Usage:**

```typescript
const { data } = await sanityFetch({
  query: pageQuery,
  params: { slug: "/" },
  // Automatically handles draft mode, caching, revalidation
});
```

---

## GROQ Query Patterns

### Basic Query

```typescript
import { defineQuery } from "@flight-digital/sanity-plugin-flightdeck";

export const pageQuery = defineQuery(`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    _type,
    title,
    slug
  }
`);
```

### Query with Fragments

```typescript
// Reusable fragments
const imageFields = defineQuery(`
  asset,
  alt,
  hotspot,
  crop
`);

const linkFields = defineQuery(`
  text,
  url,
  reference -> {
    _id,
    _type,
    slug
  }
`);

// Compose query
export const articleQuery = defineQuery(`
  *[_type == "article" && slug.current == $slug][0] {
    _id,
    _type,
    title,
    publishDate,
    author -> {
      name,
      image { ${imageFields} }
    },
    featuredImage { ${imageFields} },
    cta { ${linkFields} },
    content[] {
      ...,
      _type == "image" => {
        ${imageFields}
      }
    }
  }
`);
```

### List Queries

```typescript
export const articlesListQuery = defineQuery(`
  *[_type == "article"] | order(publishDate desc) [0...$limit] {
    _id,
    _type,
    title,
    slug,
    publishDate,
    excerpt,
    featuredImage { ${imageFields} },
    category -> {
      _id,
      title,
      slug
    }
  }
`);

// Usage
const { data } = await sanityFetch({
  query: articlesListQuery,
  params: { limit: 10 },
});
```

### Filtered Queries

```typescript
export const filteredArticlesQuery = defineQuery(`
  *[
    _type == "article" && 
    category._ref == $categoryId &&
    publishDate <= $now
  ] | order(publishDate desc) {
    _id,
    title,
    slug,
    publishDate
  }
`);

// Usage
const { data } = await sanityFetch({
  query: filteredArticlesQuery,
  params: { 
    categoryId: "category-id-123",
    now: new Date().toISOString(),
  },
});
```

### Reference Resolution

```typescript
// Single reference
author -> {
  _id,
  name,
  bio
}

// Array of references
categories[]-> {
  _id,
  title,
  slug
}

// Conditional reference
author._ref != null => {
  "author": author -> {
    _id,
    name
  }
}
```

---

## API Routes

### Structure

API routes are in `src/app/api/`:

```
api/
└── revalidate-path/
    └── route.ts
```

### Creating an API Route

**File:** `app/api/example/route.ts`

```typescript
import { NextRequest, NextResponse } from "next/server";

// GET request
export async function GET(request: NextRequest): Promise<NextResponse> {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");

  try {
    // Fetch data
    const data = await fetchData(id);

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}

// POST request
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();

    // Process data
    const result = await processData(body);

    return NextResponse.json({ result }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process data" },
      { status: 500 }
    );
  }
}
```

### Revalidation API Route

**File:** `app/api/revalidate-path/route.ts`

Used by Sanity webhooks to revalidate pages when content changes:

```typescript
import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const { path, tag } = body;

    // Validate secret
    const secret = request.nextUrl.searchParams.get("secret");
    if (secret !== process.env.REVALIDATION_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Revalidate by path
    if (path) {
      revalidatePath(path);
      return NextResponse.json({ revalidated: true, path });
    }

    // Revalidate by tag
    if (tag) {
      revalidateTag(tag);
      return NextResponse.json({ revalidated: true, tag });
    }

    return NextResponse.json(
      { error: "No path or tag provided" },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to revalidate" },
      { status: 500 }
    );
  }
}
```

---

## Caching Strategy

### Next.js Automatic Caching

Next.js 16 automatically caches:
- Server Component renders
- Data fetches
- Static assets

### Cache Tags

Tag data fetches for targeted revalidation:

```typescript
const { data } = await sanityFetch({
  query: pageQuery,
  params: { slug },
  tags: ["page", `page:${slug}`],
});
```

**Revalidate by tag:**

```typescript
import { revalidateTag } from "next/cache";

revalidateTag("page"); // Revalidate all pages
revalidateTag("page:/about"); // Revalidate specific page
```

### Cache Control

**Static Generation (default):**

```typescript
// Cached indefinitely, revalidated on demand
export default async function Page() {
  const data = await fetchData();
  return <div>{data.title}</div>;
}
```

**Incremental Static Regeneration:**

```typescript
// Revalidate every 60 seconds
export const revalidate = 60;

export default async function Page() {
  const data = await fetchData();
  return <div>{data.title}</div>;
}
```

**Dynamic Rendering:**

```typescript
// Opt out of caching
export const dynamic = "force-dynamic";

export default async function Page() {
  const data = await fetchData();
  return <div>{data.title}</div>;
}
```

---

## Metadata Generation

### Static Metadata

```typescript
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Site Title",
  description: "Your site description",
};
```

### Dynamic Metadata

```typescript
import type { Metadata } from "next";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { data } = await sanityFetch({
    query: pageQuery,
    params: { slug: params.slug },
  });

  return {
    title: data?.seo?.title || data?.title || "Your Default Title",
    description: data?.seo?.description || "",
    openGraph: {
      title: data?.seo?.ogTitle || data?.title || "",
      description: data?.seo?.ogDescription || "",
      images: data?.seo?.ogImage ? [data.seo.ogImage] : [],
    },
  };
}
```

---

## Sitemap Generation

**File:** `app/sitemap.ts`

```typescript
import { MetadataRoute } from "next";
import { sanityFetch } from "@/sanity/lib/live.server";
import { defineQuery } from "@flight-digital/sanity-plugin-flightdeck";

const allPagesQuery = defineQuery(`
  *[_type in ["page", "article", "caseStudy"] && defined(slug.current)] {
    "url": slug.current,
    _updatedAt,
    _type
  }
`);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data } = await sanityFetch({ query: allPagesQuery });

  const baseUrl = process.env.NEXT_PUBLIC_WEBSITE_URL || "https://your-domain.com";

  return (data || []).map((page) => ({
    url: `${baseUrl}/${page.url}`,
    lastModified: new Date(page._updatedAt),
    changeFrequency: "weekly" as const,
    priority: page._type === "page" ? 1.0 : 0.8,
  }));
}
```

---

## Error Handling

### Not Found

```typescript
import { notFound } from "next/navigation";

export default async function Page({ params }: Props): Promise<JSX.Element> {
  const { data } = await sanityFetch({
    query: pageQuery,
    params: { slug: params.slug },
  });

  if (!data) {
    notFound(); // Renders app/(site)/[[...slug]]/not-found.tsx
  }

  return <PageTemplate data={data} />;
}
```

### Error Boundary

Create `error.tsx` in route segments:

```typescript
"use client";

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: Props): JSX.Element {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
```

### Loading State

Create `loading.tsx` in route segments:

```typescript
export default function Loading(): JSX.Element {
  return (
    <div>
      <div className="spinner" />
      Loading...
    </div>
  );
}
```

---

## Environment Variables

### Required Variables

```bash
# .env.local

# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-token-with-read-permissions

# Next.js
NEXT_PUBLIC_WEBSITE_URL=https://your-domain.com

# Revalidation
REVALIDATION_SECRET=your-secret-key
```

### Using Environment Variables

```typescript
// Client-side (prefixed with NEXT_PUBLIC_)
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

// Server-side only (no prefix)
const apiToken = process.env.SANITY_API_TOKEN;
```

---

## Data Transformation

### Transform in Query

Prefer transforming data in GROQ when possible:

```groq
*[_type == "article"] {
  _id,
  title,
  "slug": slug.current,
  "authorName": author->name,
  "categoryTitle": category->title,
  "publishedYear": publishDate[0..3]
}
```

### Transform in Component

For complex transformations:

```typescript
export const Component = ({ data }: Props): JSX.Element => {
  // Transform data
  const sortedItems = [...(data.items || [])].sort((a, b) => 
    a.order - b.order
  );

  const groupedItems = sortedItems.reduce((acc, item) => {
    const category = item.category || "Uncategorized";
    if (!acc[category]) acc[category] = [];
    acc[category].push(item);
    return acc;
  }, {} as Record<string, typeof sortedItems>);

  return (
    <div>
      {Object.entries(groupedItems).map(([category, items]) => (
        <div key={category}>
          <h3>{category}</h3>
          <ul>
            {items.map((item) => (
              <li key={item._key}>{item.label}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
```

---

## Webhooks Integration

### Sanity Webhook Setup

Configure in Sanity project settings to trigger on content changes:

**Webhook URL:**
```
https://your-domain.com/api/revalidate-path?secret=your-secret
```

**Payload:**
```json
{
  "path": "/about",
  "tag": "page:about"
}
```

### Webhook Projection

**File:** `webhook-projection-updated.groq`

Defines what data to send in webhook payload:

```groq
{
  "path": select(
    _type == "page" => "/" + slug.current,
    _type == "post" => "/blog/" + slug.current,
    _type == "project" => "/projects/" + slug.current,
    "/"
  ),
  "tag": _type + ":" + slug.current
}
```

---

## Performance Best Practices

### 1. Fetch Data at the Highest Level

```typescript
// ✅ Good - Fetch once in page
export default async function Page(): Promise<JSX.Element> {
  const data = await fetchPageData();
  return <PageTemplate data={data} />;
}

// ❌ Bad - Each component fetches separately
export const Component = (): JSX.Element => {
  const data = await fetchData(); // Multiple fetches
  return <div>{data.title}</div>;
};
```

### 2. Use Request Deduplication

Next.js automatically deduplicates identical requests in the same render pass:

```typescript
// Both calls fetch only once
const data1 = await fetchPageData("/about");
const data2 = await fetchPageData("/about");
```

### 3. Minimize Query Fields

```typescript
// ✅ Good - Only fetch what you need
*[_type == "article"] {
  _id,
  title,
  slug
}

// ❌ Bad - Fetching entire document
*[_type == "article"]
```

### 4. Use CDN for Published Content

```typescript
export const client = createClient({
  // ...
  useCdn: true, // Use Sanity CDN for faster reads
  perspective: "published", // Only published content
});
```

### 5. Implement Caching Strategy

```typescript
// Static: Cache indefinitely
export const revalidate = false;

// ISR: Revalidate periodically
export const revalidate = 60;

// Dynamic: No caching
export const dynamic = "force-dynamic";
```

---

## Type Safety

### Query Result Types

Use generated types for query results:

```typescript
const { data } = await sanityFetch({
  query: pageQuery,
  params: { slug: "/" },
});

// data is typed as Sanity.Page | null
if (data) {
  console.log(data.title); // TypeScript knows this exists
}
```

### API Route Types

```typescript
interface RequestBody {
  id: string;
  action: "create" | "update" | "delete";
}

interface ResponseData {
  success: boolean;
  message: string;
}

export async function POST(
  request: NextRequest
): Promise<NextResponse<ResponseData>> {
  const body: RequestBody = await request.json();
  
  // Process body...
  
  return NextResponse.json({
    success: true,
    message: "Processed successfully",
  });
}
```

---

## Common Patterns

### Parallel Data Fetching

```typescript
export default async function Page(): Promise<JSX.Element> {
  // Fetch in parallel
  const [pageData, navigationData, settingsData] = await Promise.all([
    sanityFetch({ query: pageQuery, params: { slug: "/" } }),
    sanityFetch({ query: navigationQuery }),
    sanityFetch({ query: settingsQuery }),
  ]);

  return (
    <div>
      <Header data={navigationData.data} />
      <PageTemplate data={pageData.data} />
      <Footer settings={settingsData.data} />
    </div>
  );
}
```

### Conditional Data Fetching

```typescript
export default async function Page({ params }: Props): Promise<JSX.Element> {
  const slug = params.slug?.join("/") || "/";

  // Determine document type
  const { data: pageData } = await sanityFetch({
    query: defineQuery(`*[slug.current == $slug][0] { _type }`),
    params: { slug },
  });

  // Fetch appropriate data based on type
  let fullData;
  if (pageData?._type === "article") {
    const result = await sanityFetch({ query: articleQuery, params: { slug } });
    fullData = result.data;
  } else if (pageData?._type === "caseStudy") {
    const result = await sanityFetch({ query: caseStudyQuery, params: { slug } });
    fullData = result.data;
  } else {
    const result = await sanityFetch({ query: pageQuery, params: { slug } });
    fullData = result.data;
  }

  return <TemplateRenderer data={fullData} />;
}
```

### Pagination

```typescript
interface Props {
  searchParams: { page?: string };
}

export default async function ArticlesPage({ searchParams }: Props): Promise<JSX.Element> {
  const page = parseInt(searchParams.page || "1");
  const perPage = 10;
  const start = (page - 1) * perPage;
  const end = start + perPage - 1;

  const { data } = await sanityFetch({
    query: defineQuery(`
      {
        "articles": *[_type == "article"] | order(publishDate desc) [$start...$end],
        "total": count(*[_type == "article"])
      }
    `),
    params: { start, end },
  });

  return (
    <div>
      <ArticlesList articles={data?.articles || []} />
      <Pagination 
        currentPage={page}
        totalPages={Math.ceil((data?.total || 0) / perPage)}
      />
    </div>
  );
}
```

---

## Testing Data Fetching

### Verify Queries in Sanity Vision

1. Open Sanity Studio
2. Go to Vision tool
3. Paste GROQ query
4. Test with different parameters
5. Verify returned data structure

### Test API Routes

```bash
# GET request
curl http://localhost:3000/api/example?id=123

# POST request
curl -X POST http://localhost:3000/api/example \
  -H "Content-Type: application/json" \
  -d '{"data": "value"}'
```

---

## Common Issues & Solutions

### Issue: Stale Data in Preview

**Solution:** Check cache tags and revalidation:

```typescript
const { data } = await sanityFetch({
  query: pageQuery,
  params: { slug },
  tags: [`page:${slug}`], // Ensure proper tagging
});
```

### Issue: Query Returns Null

**Causes:**
- Document doesn't exist
- Slug mismatch
- Missing fields in query
- Permission issues

**Debug:**
1. Test query in Vision tool
2. Check document exists in Sanity
3. Verify slug format matches
4. Check API token permissions

### Issue: Type Mismatch

**Solution:** Regenerate types:

```bash
npm run typegen
```

### Issue: Slow Data Fetching

**Solutions:**
- Enable CDN (`useCdn: true`)
- Reduce query complexity
- Fetch fewer fields
- Implement caching
- Use parallel fetching

---

## Summary Checklist

When working with data:

- [ ] Fetch data in server components when possible
- [ ] Use `sanityFetch` for Sanity queries
- [ ] Include only necessary fields in queries
- [ ] Use fragments for reusable field selections
- [ ] Add cache tags for targeted revalidation
- [ ] Handle null/undefined data gracefully
- [ ] Use generated types, never `any`
- [ ] Add proper error boundaries
- [ ] Test queries in Vision tool
- [ ] Configure webhooks for content updates
- [ ] Set appropriate cache strategies
- [ ] Add metadata for SEO

---

**Related Guides:**
- [Sanity CMS & Flightdeck](./sanity-cms.md) - Schema and query details
- [Frontend Conventions](./frontend-conventions.md) - Using data in components
- [Project Structure](./project-structure.md) - Where to place queries and API routes
- [Block Creation Guide](./block-creation-guide.md) - Adding queries for new blocks
