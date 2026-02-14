# Project Structure Guide

This document explains the folder organization, file naming conventions, and where to place different types of code in the Automate-X project.

---

## Root Directory

```
automate-x/
├── src/                           # All application source code
├── public/                        # Static assets (images, fonts, etc.)
├── package.json                   # Dependencies and scripts
├── tsconfig.json                  # TypeScript configuration
├── next.config.ts                 # Next.js configuration
├── sanity.config.ts               # Sanity Studio configuration
├── flightdeck.ts                  # Flightdeck plugin configuration
├── codegen.ts                     # GraphQL codegen configuration
├── postcss.config.cjs             # PostCSS configuration
├── postcss-flightdeck-plugin.cjs  # Custom PostCSS plugin
├── netlify.toml                   # Netlify deployment config
├── agents.md                      # This guide system
└── .flight/                       # Detailed AI agent guides
```

---

## Source Directory (`src/`)

### Overview

```
src/
├── app/           # Next.js App Router (routes, layouts, API)
├── components/    # React components (atoms, molecules, organisms, blocks)
├── sanity/        # Sanity CMS schemas and configuration
├── queries/       # GROQ queries for data fetching
├── templates/     # Page templates for different content types
├── hooks/         # Custom React hooks
├── utils/         # Utility functions and constants
├── lib/           # Third-party library configurations
└── proxy.ts       # Proxy configuration
```

---

## App Directory (`src/app/`)

Next.js 16 App Router structure with route groups and layouts.

```
app/
├── (site)/                        # Public website route group
│   ├── [[...slug]]/              # Catch-all dynamic routes
│   │   ├── page.tsx              # Main page renderer
│   │   └── not-found.tsx         # 404 page
│   ├── layout.tsx                # Site layout (header, footer)
│   └── preview/                  # Preview mode for editors
│       └── page.tsx              # Preview page component
├── admin/                         # Sanity Studio route group
│   └── [[...index]]/             # Studio catch-all route
│       ├── page.tsx              # Studio page wrapper
│       └── studio.tsx            # Studio component
├── api/                           # API routes
│   └── revalidate-path/          # Path revalidation endpoint
│       └── route.ts              # Route handler
├── layout.tsx                     # Root layout (metadata, fonts)
├── sitemap.ts                     # Dynamic sitemap generation
├── styles.linaria.global.ts      # Global styles
├── icon.png                       # Favicon
└── apple-icon.png                # Apple touch icon
```

### Route Groups

- **`(site)/`** - Public-facing website routes
  - Uses catch-all routing for dynamic pages from Sanity
  - Includes shared layout with header/footer
  
- **`admin/`** - Sanity Studio (CMS)
  - Accessible at `/admin`
  - Separate from site layout

### Key Files

**`(site)/[[...slug]]/page.tsx`**
- Main entry point for all dynamic pages
- Fetches page data from Sanity based on slug
- Renders appropriate template (page, article, case study)

**`layout.tsx`** (root)
- Defines HTML structure
- Sets up metadata
- Loads fonts and global styles
- Wraps entire application

**`(site)/layout.tsx`**
- Public site layout
- Includes Header and Footer components
- Handles theme initialization
- Smooth scroll integration

---

## Components Directory (`src/components/`)

Organized using Atomic Design principles.

```
components/
├── atoms/             # Basic, indivisible components
├── molecules/         # Combinations of atoms
├── organisms/         # Complex, self-contained sections
├── blocks/            # CMS content blocks
└── dev/               # Development-only components
```

### Atoms (`atoms/`)

Small, reusable building blocks. Single responsibility.

```
atoms/
├── button.tsx                # CTA buttons with variants
├── link.tsx                  # Internal/external links
├── image.tsx                 # Adaptive responsive images
├── icon.tsx                  # SVG icon component
├── menu.tsx                  # Menu wrapper component
├── animatedHamburger.tsx     # Hamburger menu icon
├── regionSelector.tsx        # Language/region selector
├── brandBackground.tsx       # Branded background component
└── AnimatedMotives/          # Animated graphic components
    ├── index.ts              # Exports all motives
    ├── types.ts              # Shared types
    ├── MotiveOne.tsx         # Individual motive components
    ├── MotiveTwo.tsx
    └── ...                   # (14 motive components total)
```

**When to create an atom:**
- Component is used in multiple places
- Component has a single, clear purpose
- Component is self-contained with minimal dependencies

### Molecules (`molecules/`)

Combinations of atoms forming functional units.

```
molecules/
├── accordion.tsx          # Expandable accordion component
├── articleCard.tsx        # Article preview card
├── breadcrumb.tsx         # Breadcrumb navigation
├── buttonsList.tsx        # List of CTA buttons
├── ctaCard.tsx            # Call-to-action card (with motives)
├── iframe.tsx             # Embedded iframe wrapper
├── richText.tsx           # Rich text renderer
├── shareButtons.tsx       # Social share buttons
├── sideMenu.tsx           # Side navigation menu
├── smoothScroll.tsx       # Smooth scroll wrapper
├── subColumns.tsx         # Sub-column layout component
├── tabs.tsx               # Tab navigation component
├── teamMemberCard.tsx     # Team member preview card
├── teamMemberPopup.tsx    # Team member detail popup
└── videoPlayer.tsx        # Video player wrapper
```

**When to create a molecule:**
- Combines multiple atoms
- Has a specific functional purpose
- Reusable across different blocks/pages

### Organisms (`organisms/`)

Large, complex sections that form major parts of the interface.

```
organisms/
├── header/                # Site header
│   ├── header.tsx         # Main header component
│   ├── nav.tsx            # Navigation menu
│   └── floatingMenu.tsx   # Mobile floating menu
├── footer.tsx             # Site footer
└── templateRenderer.tsx   # Dynamic template selector
```

**When to create an organism:**
- Component is a major section of the page
- Contains complex business logic
- Combines multiple molecules and atoms

### Blocks (`blocks/`)

CMS-driven content blocks. See [Block Creation](./block-creation-guide.md).

```
blocks/
├── blocks.tsx                 # Block registry and renderer
├── articleList.tsx            # Article listing block
├── cardCarousel.tsx           # Carousel of CTA cards
├── caseStudyHero.tsx          # Case study header block
├── caseStudyList.tsx          # Case study listing block
├── ctaCardTabs.tsx            # Tabbed CTA cards block
├── primitiveBlocks.tsx        # Primitive block renderers
├── tabbedContent.tsx          # Tabbed content block
├── teamMemberGrid.tsx         # Team member grid block
├── videoBlock.tsx             # Video content block
├── hero/                      # Hero block (complex)
│   ├── hero.tsx               # Main hero component
│   ├── heroBackgroundVideo.tsx
│   ├── heroCTA.tsx
│   ├── heroVideoLink.tsx
│   └── heroVideoPlayer.tsx
└── imageCarousel/             # Image carousel block
    ├── imageCarousel.tsx      # Main carousel component
    ├── CarouselSlideItem.tsx  # Individual slide
    ├── constants.ts           # Carousel constants
    └── utils.ts               # Carousel utilities
```

**Block Organization:**
- **Simple blocks:** Single file (e.g., `articleList.tsx`)
- **Complex blocks:** Folder with main component + subcomponents

**When to create a block:**
- Content editors need to add this to pages via Sanity
- Content structure is dynamic and data-driven
- Block appears on multiple pages with different content

---

## Sanity Directory (`src/sanity/`)

Sanity CMS configuration, schemas, and custom components.

```
sanity/
├── schemas/           # Content type definitions
│   ├── index.ts       # Schema registry
│   ├── blocks/        # Block schemas
│   ├── objects/       # Reusable object schemas
│   ├── datasources/   # Data source schemas (categories, clients, etc.)
│   ├── navigation/    # Header/footer navigation schemas
│   └── pages/         # Page type schemas
├── components/        # Custom Sanity Studio components
│   ├── annotations.tsx
│   └── motiveInput.tsx
├── desk/              # Studio desk structure customization
│   ├── base.ts
│   ├── datasources.ts
│   └── settings.ts
├── lib/               # Sanity client and live preview
│   ├── client.ts
│   ├── token.ts
│   ├── live.config.ts
│   └── live.server.ts
└── assets/            # Studio preview images
    ├── images.ts
    └── block-*.png    # Block preview images
```

### Schemas Organization

**`schemas/blocks/`** - Block schemas (one per block)
```
blocks/
├── articleList.ts
├── cardCarousel.ts
├── caseStudyList.ts
├── ctaCardTabs.ts
├── hero.ts
├── imageCarousel.ts
├── industriesAnimatedList.ts
├── tabbedContent.ts
├── teamMemberGrid.ts
└── videoBlock.ts
```

**`schemas/objects/`** - Reusable object types
```
objects/
├── carouselCard.ts       # Card for carousel
├── contentTab.ts         # Tab content structure
├── ctaCardTab.ts         # CTA card tab structure
├── iframe.ts             # Iframe configuration
├── IndustryListItem.ts   # Industry list item
├── subColumns.ts         # Sub-column structure
└── theme.ts              # Theme configuration
```

**`schemas/datasources/`** - Reference data types
```
datasources/
├── category.ts       # Article categories
├── client.ts         # Client references
├── industry.ts       # Industry types
├── systemType.ts     # System types
└── teamMember.ts     # Team member profiles
```

**`schemas/navigation/`** - Navigation structures
```
navigation/
├── header/
│   ├── headerNavigation.ts
│   └── headerNavLink.ts
└── footer/
    ├── footerNavigation.ts
    ├── footerNavColumn.ts
    └── footerNavLink.ts
```

**`schemas/pages/`** - Page type definitions
```
pages/
├── page.ts          # Standard page
├── article.ts       # Blog article
└── caseStudy.ts     # Case study
```

---

## Queries Directory (`src/queries/`)

GROQ query definitions for fetching data from Sanity.

```
queries/
├── _general.ts      # Reusable field fragments
├── blocks.ts        # Block field queries
├── lists.ts         # List queries (articles, case studies)
├── navigation.ts    # Header/footer navigation queries
├── pages.ts         # Page data queries
└── teamMembers.ts   # Team member queries
```

### Query Structure

Queries use a fragment pattern for reusability:

```typescript
// _general.ts - Define reusable fragments
export const imageFields = defineQuery(`
  asset,
  alt,
  hotspot,
  crop
`);

// blocks.ts - Use fragments in block queries
const blockHeroFields = defineBlockQuery("block.hero")(
  `
  theme { name },
  title,
  image { ${imageFields} }
  `
);

// pages.ts - Compose full queries
export const pageQuery = defineQuery(`
  *[_type == "page" && slug.current == $slug][0] {
    title,
    blocks[] {
      ${blocksListFieldsCore}
    }
  }
`);
```

---

## Templates Directory (`src/templates/`)

Page templates that render different content types.

```
templates/
├── page.tsx        # Standard page template
├── article.tsx     # Article/blog post template
└── caseStudy.tsx   # Case study template
```

Each template:
- Receives data from `app/(site)/[[...slug]]/page.tsx`
- Renders page-specific layout and metadata
- Includes BlocksList component for content blocks

---

## Other Directories

### Hooks (`src/hooks/`)
```
hooks/
├── useBlockThemeObserver.ts  # Observes block theme changes
├── useLanguage.ts             # Current language context
└── useScrollLock.ts           # Body scroll lock utility
```

### Utils (`src/utils/`)
```
utils/
├── constants.ts            # App-wide constants (blocks, themes, etc.)
├── getServerLanguage.ts    # Server-side language detection
├── helpers.ts              # Utility functions
├── locale.ts               # Locale configuration
├── sharedFields.ts         # Shared Sanity field definitions
├── types.d.ts              # Global type definitions
└── validateType.ts         # Runtime type validation
```

### Lib (`src/lib/`)
```
lib/
└── sanityClient.ts         # Sanity client configuration
```

---

## File Naming Conventions

### Components
- **Format:** camelCase (e.g., `buttonsList.tsx`, `articleCard.tsx`)
- **Exception:** Components representing blocks use camelCase matching schema name

### Sanity Schemas
- **Format:** camelCase (e.g., `contentTab.ts`, `footerNavLink.ts`)
- **Block schemas:** Match component name (e.g., `hero.ts` → `hero.tsx`)

### Queries
- **Format:** camelCase with descriptive suffixes
  - `pageQuery`, `articleQuery`
  - `blockHeroFields`, `imageFields`

### Types
- **Format:** PascalCase
  - `Sanity.BlockHero`, `Sanity.Page`
  - Auto-generated from schemas

---

## Where to Place New Code

### New Component
1. **Single reusable element** → `components/atoms/`
2. **Combination of atoms** → `components/molecules/`
3. **Complex section** → `components/organisms/`
4. **CMS content block** → `components/blocks/` + follow [BLOCK_CREATION_GUIDE.md](./block-creation-guide.md)

### New Sanity Schema
1. **Block** → `sanity/schemas/blocks/`
2. **Reusable object** → `sanity/schemas/objects/`
3. **Data source** → `sanity/schemas/datasources/`
4. **Page type** → `sanity/schemas/pages/`

### New Query
1. **Block fields** → `queries/blocks.ts`
2. **Page queries** → `queries/pages.ts`
3. **List queries** → `queries/lists.ts`
4. **Reusable fragments** → `queries/_general.ts`

### New Utility
1. **General helper** → `utils/helpers.ts`
2. **Sanity-specific** → `utils/sharedFields.ts` or `sanity/lib/`
3. **React hook** → `hooks/`

### New API Route
- `app/api/{endpoint}/route.ts`

---

## Import Path Aliases

TypeScript is configured with path aliases:

```typescript
import Button from "@/components/atoms/button";
import { pageQuery } from "@/queries/pages";
import { constants } from "@/utils/constants";
import MotiveOne from "@/components/atoms/AnimatedMotives/MotiveOne";
```

**Alias:** `@/` → `src/`

Always use the `@/` alias for imports within the `src/` directory.

---

## Best Practices

### File Organization
- **Keep files focused:** One primary export per file
- **Group related code:** Use folders for complex features (e.g., `hero/`, `imageCarousel/`)
- **Co-locate assets:** Keep component-specific assets near components when possible

### Component Organization
- **Atoms:** 50-150 lines typically
- **Molecules:** 100-300 lines typically
- **Organisms:** 200-500 lines typically
- **Blocks:** 200-600 lines (split into folders if larger)

### Schema Organization
- **Keep schemas focused:** One content type per file
- **Extract common objects:** If used by multiple blocks, create in `objects/`
- **Document fields:** Add descriptions to help content editors

### Query Organization
- **Define fragments first:** Reusable field selections in `_general.ts`
- **Compose queries:** Build complex queries from fragments
- **Name descriptively:** Clear names for query purpose

---

## Common Pitfalls

❌ **Don't:**
- Put business logic in atoms
- Create deeply nested component folders
- Duplicate schemas (use objects instead)
- Mix responsibilities (keep components focused)
- Create mini styled components with 1-2 styles

✅ **Do:**
- Extract reusable parts to appropriate level
- Keep component trees shallow
- Reuse Flightdeck schemas where possible
- Follow the established patterns
- Apply styles via className from parent styled component

---

## Summary Checklist

When adding new code, ask:

- [ ] Is this the right directory? (atoms/molecules/organisms/blocks)
- [ ] Does a similar component already exist?
- [ ] Should this be extracted to a reusable component?
- [ ] Does this need a Sanity schema? (If yes, see [BLOCK_CREATION_GUIDE.md](./block-creation-guide.md))
- [ ] Are imports using `@/` alias?
- [ ] Is the file name following conventions?
- [ ] Is the component properly typed?
- [ ] Are styled components declared after the main component?

---

**Related Guides:**
- [Frontend Conventions](./frontend-conventions.md)
- [Sanity CMS & Flightdeck](./sanity-cms.md)
- [Block Creation Guide](./block-creation-guide.md)
