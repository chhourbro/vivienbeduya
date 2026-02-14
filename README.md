## FlightDeck Starter (Next.js + Sanity + Linaria)

A production-ready starter for building content-driven websites with Next.js 16, Sanity v4 and Linaria — powered by FlightDeck.

## Table of contents

- [📦 Installation](#installation)
- [📋 Usage](#usage)
- [⚙️ Environment variables](#environment-variables)
- [🏢 Sanity Studio](#sanity-studio)
- [🔌 Data fetching & rendering](#data-fetching-and-rendering)
- [👀 Preview workflow](#preview-workflow)
- [🔁 Revalidation webhook](#revalidation-webhook)
- [🔀 Redirects](#redirects)
- [🎨 Styling with Linaria](#styling-with-linaria)
- [🧩 Adding content types and blocks](#adding-content-types-and-blocks)
  - [➕ Add a new page type](#add-a-new-page-type)
  - [🧱 Add a new block](#add-a-new-block)
  - [🔧 Add primitive blocks](#add-primitive-blocks)
- [🗂 Project structure](#project-structure)
- [🚀 Deployment notes](#deployment-notes)
- [📄 License](#license)

<h2 id="installation">📦 Installation</h2>

1. Install dependencies:

   ```bash
   yarn
   ```

2. Create environment files and set values (see Environment variables section below).

3. Start the development server:

   ```bash
   yarn dev
   ```

   - Website: `http://localhost:3000`
   - Studio: `http://localhost:3000/admin`

<h2 id="usage">📋 Usage</h2>

- Run locally with hot reload:

  ```bash
  yarn dev
  ```

- Build for production:

  ```bash
  yarn build
  ```

- Start production server:

  ```bash
  yarn start
  ```

- Generate/refresh Sanity GraphQL types after changing schemas:

  ```bash
  yarn typegen
  ```

<h2 id="environment-variables">⚙️ Environment variables</h2>

Create `.env.development`. Example:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=yourProjectId
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-02-19

# Do NOT include the trailing slash in this URL
NEXT_PUBLIC_WEBSITE_URL=http://localhost:3000

# Token used only for preview fetching (scope: read)
NEXT_PUBLIC_SANITY_TOKEN=yourSanityReadToken

# Used to enable/disable robots.txt, MAKE SURE TO UPDATE TO production BEFORE GOING LIVE
NEXT_PUBLIC_NODE_ENV=development

# Used to validate Sanity webhook signatures, generate one and add it to the secret field in the webhook in sanity
SANITY_REVALIDATE_SECRET=yourWebhookSecret
```

Notes:

- `sanity.config.ts` and the Studio CLI read `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET`.
- `src/lib/sanityClient.ts` uses `NEXT_PUBLIC_SANITY_API_VERSION`.
- `/preview` requires `NEXT_PUBLIC_SANITY_TOKEN` (read-only).
- `NEXT_PUBLIC_WEBSITE_URL` is used for metadata, preview actions and plugin settings.
- Revalidation endpoint requires `SANITY_REVALIDATE_SECRET`.

<h2 id="sanity-studio">🏢 Sanity Studio</h2>

- Mounted at `/admin` (see `sanity.config.ts`).
- Please update the loading logo in the admin app route.
- Plugins:
  - FlightDeck Studio plugin (`./flightdeck.ts`)
  - Structure tool with custom desk (see `src/sanity/desk`)
  - Vision tool in development
- Schemas live in `src/sanity/schemas`. The FlightDeck plugin provides a comprehensive set of reusable schemas: links, buttons, images, SEO, component builder, redirects, settings, theme, wiki, etc. Local examples include `page`, `article`, navigation (`header`, `footer`) and a custom example block `block.articlesList`.

<h2 id="data-fetching-and-rendering">🔌 Data fetching & rendering</h2>

- Dynamic catch-all page at `src/app/(site)/[[...slug]]/page.tsx`
  - Generates `metadata` from Sanity SEO fields
  - Builds static params from all page slugs
  - Renders via `TemplateRenderer`, selecting a template based on `_type`
- Templates: Create more templates as needed (e.g. product template)
  - `src/templates/page.tsx` renders FlightDeck blocks
  - `src/templates/article.tsx` **EXAMPLE** article template
- Queries: all queries should be created under `src/queries`:
  - Page queries in `src/queries/pages.ts`
  - Shared fragments in `src/queries/_general.ts`
  - Blocks queries in `src/queries/blocks.ts`
  - Layout (header/footer) in `src/queries/navigation.ts`

<h2 id="preview-workflow">👀 Preview workflow</h2>

- Preview page: `src/app/(site)/preview/page.tsx`
  - Uses a non-cached client configured with `NEXT_PUBLIC_SANITY_TOKEN`
  - Renders draft-first (falls back to published)
- Client editor integration is enabled in `flightdeck.ts` with `allowedOrigins` set to `NEXT_PUBLIC_WEBSITE_URL`.

<h2 id="revalidation-webhook">🔁 Revalidation webhook</h2>

- Endpoint: `src/app/api/revalidate-path/route.ts`
  - Validates signature using `SANITY_REVALIDATE_SECRET`
  - Revalidates cache tags by document `_type` and `slug`
- In Sanity, configure a webhook pointing to:
  - Local (with tunneling) or production: `/api/revalidate-path`
  - Secret must match `SANITY_REVALIDATE_SECRET`
  - Send body payload including `_type` and `slug.current`

<h2 id="redirects">🔀 Redirects via Sanity</h2>

`next.config.ts` fetches `redirect` documents to generate Next.js redirects at build/init.

**NOTE**: Create a webhook in sanity ONLY for \_type == "redirect" that triggers a netlify build hook, otherwise the redirects won't be updated

<h2 id="styling-with-linaria">🎨 Styling with Linaria</h2>

- Configured via `next-with-linaria` in `next.config.ts`
- Global styles live in `src/app/(site)/style.linaria.global.tsx` (Do NOT change the file name)
- Example font setup uses DM Sans in `src/app/(site)/layout.tsx`
- Utilities already wired in globals
- Basic media queries (@media --base-down/--base-up) and responsive values (rwd, rwm, rw) already created in FlightDeck, ready to be used. If you need extra media queries, change the breakpoints or enable the responsive clamp, check `postcss.config.js` in the root.

<h2 id="adding-content-types-and-blocks">🧩 Adding content types and blocks</h2>

<h3 id="add-a-new-page-type">➕ Add a new page type</h3>

1. Create schema in `src/sanity/schemas/pages/yourType.ts`
2. Register it in `src/sanity/schemas/index.ts`
3. Add the type to `allPageTypes` in `src/utils/constants.ts`
4. Extend `pageFields` in `src/queries/pages.ts` for your type
5. If needed, add a new template under `src/templates/yourType.tsx` and map it in `TemplateRenderer` (it will fallback to page template)

<h3 id="add-a-new-block">🧱 Add a new block</h3>

1. Create schema in `src/sanity/schemas/blocks/yourBlock.ts`
2. Add a screenshot of the block to `src/sanity/assets` and use in the block schema
3. Register it in `src/sanity/schemas/index.ts`
4. Add the block to `blocksTypes` in `src/utils/constants.ts`
5. Add a GROQ fragment in `src/queries/blocks.ts`
6. Create a component in `src/components/blocks/yourBlock.tsx` and register it in `src/components/blocks/blocks.tsx`

<h3 id="add-primitive-blocks">🔧 Add primitive blocks</h3>

Primitive blocks are used inside the grid column and the container block. Some primitives are added by default by FlightDeck (ctaCard, gap, adaptiveImage, buttonsList, richText and accordion). To add new ones:

1. Create schema in `src/sanity/schemas/objects/yourObject.ts`
2. Register it in `src/sanity/schemas/index.ts`
3. Add the object to `primitiveBlocksTypes` in `src/utils/constants.ts`
4. Add a GROQ fragment to `primitiveBlocksFields` in `src/queries/blocks.ts`
5. Create a component in `src/components/molecules/yourComponent.tsx` and register it in `src/components/blocks/primitiveBlocks.tsx`

<h2 id="project-structure">🗂 Project structure (highlights)</h2>

- `src/app/(site)/[[...slug]]/` – dynamic site pages
- `src/app/(site)/preview/` – preview page
- `src/app/admin/[[...index]]/` – embedded Studio
- `src/components/` – atoms, molecules, organisms, blocks
- `src/lib/sanityClient.ts` – configured Sanity client and `sanityFetch`
- `src/queries/` – GROQ queries and fragments
- `src/sanity/` – Studio schemas, desk, assets and utils
- `src/templates/` – page-level templates

<h2 id="deployment-notes">🚀 Deployment notes</h2>

- Ensure all env vars are set in Netlify
- Set `NEXT_PUBLIC_WEBSITE_URL` to the public site URL WITHOUT the trailing slash
- Deploy Sanity GraphQL API at least once and run `yarn typegen` for types
- Configure a production webhook in Sanity to `/api/revalidate-path` and one for the redirects

<h2 id="license">📄 License</h2>

Maintained by Flight Digital. Internal packages are proprietary and distributed via our private registry.
