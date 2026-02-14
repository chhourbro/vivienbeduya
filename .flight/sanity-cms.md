# Sanity CMS & Flightdeck Guide

This document explains how Sanity CMS integrates with Next.js projects using the Flightdeck plugin, and how to work with schemas, queries, and content.

---

## Overview

### What is Sanity?

Sanity is a headless CMS that provides:
- Content modeling via schemas
- Real-time content API
- Studio UI for content editors
- GROQ query language
- Live preview capabilities

### What is Flightdeck?

**@flight-digital/flightdeck** is a Sanity plugin that provides:
- Pre-built schema types (buttons, links, images, rich text, etc.)
- Block-based content architecture
- Schema customization framework
- Live preview integration
- Admin tools and utilities

**Key Insight:** Flightdeck provides the foundation, and `flightdeck.ts` customizes it for your project's specific needs.

---

## The `flightdeck.ts` Configuration

The `flightdeck.ts` file at the project root is the central configuration for how Flightdeck behaves in this project.

### Structure

```typescript
import { flightDeck } from "@flight-digital/sanity-plugin-flightdeck";

const flightDeckPlugin = flightDeck({
  preview: { /* ... */ },
  tools: { /* ... */ },
  settings: { /* ... */ },
  blocksSettings: { /* ... */ },
  schemaSettings: { /* ... */ },
});

export default flightDeckPlugin;
```

### Key Sections

#### 1. Preview Configuration

```typescript
preview: {
  pagePath: "preview",
  documentTypes: allPageTypes.map((type) => ({ type })),
  clientEditor: {
    enabled: true,
    allowedOrigins: [process.env.NEXT_PUBLIC_WEBSITE_URL ?? ""],
  },
}
```

- **Purpose:** Enables live preview in Sanity Studio
- **How it works:** Content editors can see changes in real-time on the actual website
- **pagePath:** Route where preview is rendered (`/preview`)
- **documentTypes:** Which content types support preview (pages, articles, case studies)

#### 2. Tools Configuration

```typescript
tools: {
  adminTools: true,
  wiki: true,
}
```

- **adminTools:** Provides admin utilities in Studio
- **wiki:** Enables documentation within Studio

#### 3. Settings

```typescript
settings: {
  websiteUrl: process.env.NEXT_PUBLIC_WEBSITE_URL ?? "",
  spaceOptions: sanitySpaceOptions,
}
```

- **websiteUrl:** Used for preview and link validation
- **spaceOptions:** Spacing options for blocks/components

#### 4. Blocks Settings

Customizes how Flightdeck's built-in block types behave:

```typescript
blocksSettings: {
  primitiveBlocks: {
    overwriteTypes(current) {
      return [...current, { type: "subColumns" }, { type: "iframe" }];
    },
  },
  grid: {
    overwriteFields(current) {
      return [theme, ...current];
    },
  },
  components: {
    overwriteBlocks(current) {
      return [...current, ...blocksTypes];
    },
  },
  // ... more block type customizations
}
```

**What this does:**
- Adds custom primitive blocks (subColumns, iframe)
- Injects `theme` field into all block types
- Registers custom blocks (hero, carousel, etc.)
- Removes unwanted default blocks

#### 5. Schema Settings

Customizes Flightdeck's built-in schema types:

```typescript
schemaSettings: {
  theme: {
    overwriteFields(current) {
      return current.filter(
        (el) => el.name !== "pageHorizontalPadding" && 
               el.name !== "palette" && 
               el.name !== "typography" &&
               el.name !== "classNames"
      );
    },
  },
  button: {
    designOptions: [
      { title: "Primary", value: "primary" },
      { title: "Secondary", value: "secondary" },
      { title: "Outline", value: "outline" },
    ],
    overwriteFields(current) {
      return [...current];
    },
  },
  ctaCard: {
    designOptions: [
      { title: "With Image", value: "withImage" },
      { title: "Text Only", value: "textOnly" },
      { title: "With Icon", value: "withIcon" },
    ],
    overwriteFields(current) {
      // Custom field logic, hiding/showing based on design
      return [
        ...current.map((el) => {
          if (el.name === "image") {
            return {
              ...el,
              hidden: (data: any) => data?.parent?.design !== "withImage",
            };
          }
          return el;
        }),
        // Add custom fields as needed
        defineField({ name: "customField", /* ... */ }),
      ];
    },
  },
  // ... more schema customizations
}
```

**What this does:**
- Simplifies theme options (removes unused fields)
- Defines project-specific button variants
- Customizes CTA card behavior and fields
- Conditionally shows/hides fields based on user selections

---

## Impact on Development

### 1. Don't Recreate Existing Schemas

Flightdeck provides these out of the box:

**Primitive Types:**
- `button` - CTA button with link
- `link` - Internal/external link
- `linkWithoutText` - Link without text field
- `adaptiveImage` - Responsive image
- `richText` - Rich text editor
- `heading` - Heading with styles
- `blockTheme` - Theme selector

**Block Types:**
- `block.grid` - Grid layout
- `block.container` - Container block
- `block.carousel` - Carousel block
- `block.gap` - Spacing block
- `block.paragraph` - Text block
- `block.accordion` - Accordion block

**Usage:**
```typescript
// ❌ Don't create your own button schema
export default defineType({
  name: "button",
  type: "object",
  fields: [/* ... */]
});

// ✅ Use Flightdeck's button, customize via flightdeck.ts if needed
import { defineField } from "sanity";

defineField({
  name: "cta",
  type: "button", // Flightdeck provides this
  title: "Call to Action"
})
```

### 2. Include Common Fields

Custom blocks often include common fields like theme, spacing, or design options:

```typescript
import { defineBlock } from "@flight-digital/sanity-plugin-flightdeck";
import { defineField } from "sanity";

export default defineBlock({
  name: "myBlock",
  title: "My Block",
  fields: [
    // Add common fields first (if your project uses them)
    // defineField({ name: "theme", type: "blockTheme" }),
    // ... other fields
  ],
});
```

### 3. Use `defineBlock` for Blocks

```typescript
import { defineBlock, formatBlockPreview } from "@flight-digital/sanity-plugin-flightdeck";

export default defineBlock({
  name: "hero", // Automatically prefixed with "block."
  title: "Hero",
  icon: FaImage,
  disableDefaultPadding: true,
  fields: [
    theme,
    // ... fields
  ],
  preview: formatBlockPreview({
    fields: "title",
    formatter: (val) => val || "Hero",
  }),
});
```

### 4. Register Custom Blocks

**In `src/utils/constants.ts` (or similar):**

```typescript
export const blocksTypes = [
  { type: "block.contentBlock" },
  { type: "block.customBlock" },
  // ... add your blocks here
];
```

**In `flightdeck.ts`:**

The `blocksTypes` array is automatically injected into Flightdeck's block system via the `components.overwriteBlocks` function.

---

## Schema Creation Patterns

### ⚠️ Critical: No Inline Objects

**NEVER define objects inline in schemas.** Always create separate object type definitions.

**❌ Bad - Inline object (will break GraphQL deploy):**
```typescript
defineField({
  name: "items",
  type: "array",
  of: [
    {
      type: "object",
      fields: [
        { name: "title", type: "string" },
        { name: "description", type: "text" },
      ]
    }
  ]
})
```

**✅ Good - Separate object definition:**
```typescript
// 1. Create object schema in src/sanity/schemas/objects/item.ts
export default defineType({
  name: "item",
  type: "object",
  fields: [
    defineField({ name: "title", type: "string" }),
    defineField({ name: "description", type: "text" }),
  ]
});

// 2. Reference it in your block
defineField({
  name: "items",
  type: "array",
  of: [{ type: "item" }]
})
```

**Why?** Inline objects cause GraphQL schema deployment to fail, which prevents type generation (`npm run typegen`).

### Creating a Block Schema

See [BLOCK_CREATION_GUIDE.md](./block-creation-guide.md) for complete details.

**Template:**

```typescript
import { defineBlock, formatBlockPreview } from "@flight-digital/sanity-plugin-flightdeck";
import { FaImage } from "react-icons/fa";
import { defineField } from "sanity";

export default defineBlock({
  name: "contentBlock",
  title: "Content Block",
  icon: FaImage,
  disableDefaultPadding: true,
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "content",
      type: "richText", // Flightdeck type
      title: "Content",
    }),
    defineField({
      name: "cta",
      type: "button", // Flightdeck type
      title: "Call to Action",
    }),
    defineField({
      name: "image",
      type: "adaptiveImage", // Flightdeck type
      title: "Image",
    }),
  ],
  preview: formatBlockPreview({
    fields: "title",
    formatter: (val) => val || "Content Block",
  }),
});
```

### Creating an Object Schema

For reusable nested structures:

```typescript
import { FaFolder } from "react-icons/fa";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "contentTab",
  title: "Content Tab",
  type: "object",
  icon: FaFolder,
  fields: [
    defineField({
      name: "label",
      type: "string",
      title: "Label",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "content",
      type: "richText",
      title: "Content",
    }),
  ],
  preview: {
    select: {
      title: "label",
    },
    prepare({ title }) {
      return {
        title: title || "Untitled Tab",
      };
    },
  },
});
```

### Creating a Data Source Schema

For reference data (categories, team members, etc.):

```typescript
import { FaTag } from "react-icons/fa";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "category",
  title: "Category",
  type: "document",
  icon: FaTag,
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      options: {
        source: "title",
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
});
```

---

## GROQ Queries

### Query Structure

Queries follow a fragment-based pattern for reusability:

```typescript
import { defineQuery, defineBlockQuery } from "@flight-digital/sanity-plugin-flightdeck";

// Define reusable fragments
export const imageFields = defineQuery(`
  asset,
  alt,
  hotspot,
  crop
`);

export const linkFields = defineQuery(`
  text,
  url,
  reference -> {
    _id,
    _type,
    slug
  }
`);

// Use fragments in block queries
const blockHeroFields = defineBlockQuery("block.hero")(
  `
  theme {
    name
  },
  title,
  subtitle,
  image { ${imageFields} },
  cta { ${linkFields} }
  `
);

// Compose full page query
export const pageQuery = defineQuery(`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    _type,
    title,
    seo { ${seoFields} },
    blocks[] {
      ${blocksListFieldsCore}
    }
  }
`);
```

### Adding Block Queries

**1. Define block fields in `src/queries/blocks.ts`:**

```typescript
const blockContentBlockFields = defineBlockQuery("block.contentBlock")(
  `
  title,
  content { ${richTextFields} },
  cta { ${linkFields} },
  image { ${imageFields} }
  `
);
```

**2. Add to `blocksListFieldsCore`:**

```typescript
const blocksListFieldsCore = defineQuery(`
  ${blockContentBlockFields},
  ${blockCustomBlockFields},
  // ... add your block queries here
`);
```

### Query Patterns

**Array fields:**

```groq
items[] {
  _key,
  label,
  description
}
```

**References:**

```groq
category -> {
  _id,
  _type,
  title,
  slug
}
```

**Conditional fields:**

```groq
design == "withImage" => {
  image { ${imageFields} },
  link { ${linkFields} }
},
design == "textOnly" => {
  description,
  content
}
```

**Filtering:**

```groq
*[_type == "article" && category._ref == $categoryId] | order(publishDate desc)
```

---

## Type Generation

### How It Works

1. Sanity schemas are deployed to Sanity's GraphQL API
2. GraphQL Codegen fetches the schema
3. TypeScript types are generated as `Sanity.*` namespace

### Running Codegen

```bash
npm run typegen
```

This command:
1. Deploys GraphQL schema to Sanity (`sanity graphql deploy`)
2. Generates types (`graphql-codegen`)
3. Creates `sanity-types.d.ts`

### Using Generated Types

```typescript
interface Props {
  data?: Sanity.BlockContentBlock; // Auto-generated from schema
}

export const ContentBlock = ({ data }: Props): JSX.Element | null => {
  if (!data) return null;
  
  // TypeScript knows the shape of data
  const { title, content, image, cta } = data;
  
  return <div>{title}</div>;
};
```

### When to Regenerate Types

- After creating/modifying schemas
- After changing field names
- After adding/removing fields
- Before committing schema changes

**Important:** Always run `npm run typegen` after schema changes to keep types in sync.

---

## Sanity Studio Customization

### Desk Structure

The Studio's navigation is customized in `src/sanity/desk/`:

**`base.ts`** - Main content (Pages, Articles, Case Studies)
**`datasources.ts`** - Reference data (Categories, Clients, Industries, Team Members)
**`settings.ts`** - Site settings

### Custom Studio Components

**Custom Studio Components Examples:**
- Custom inputs for specialized fields
- Visual previews for design options
- Custom rich text annotations
- Field validators

### Preview Images

Block preview images are stored in `src/sanity/assets/`:

```typescript
import { images } from "@/sanity/assets/images";

export default defineBlock({
  name: "contentBlock",
  title: "Content Block",
  image: images.blockPreview.src, // Shows preview in block picker
  // ...
});
```

---

## Live Preview

### How It Works

1. Content editor clicks "Preview" in Sanity Studio
2. Opens `/preview?type={documentType}&id={documentId}`
3. Preview page fetches draft content from Sanity
4. Renders page with live updates

### Adding Preview Support

**1. Ensure document type is in preview config:**

```typescript
// flightdeck.ts
preview: {
  documentTypes: allPageTypes.map((type) => ({ type })),
}
```

**2. Add `data-sanity-path` attributes:**

```typescript
<Title data-sanity-path="title">
  {data.title}
</Title>

<Image 
  data={data.image}
  data-sanity-path="image"
/>

{data.items?.map((item, index) => (
  <div key={item._key} data-sanity-path={`items[${index}]`}>
    <span data-sanity-path={`items[${index}].label`}>
      {item.label}
    </span>
  </div>
))}
```

**3. Ensure GROQ query fetches all necessary fields:**

If a field doesn't appear in preview, check that it's included in the query.

---

## Common Flightdeck Types

### Button/Link Fields

```typescript
defineField({
  name: "cta",
  type: "button",
  title: "Call to Action",
  // Options come from flightdeck.ts schemaSettings.button.designOptions
})

defineField({
  name: "link",
  type: "link",
  title: "Link",
})

defineField({
  name: "internalLink",
  type: "linkWithoutText",
  title: "Link",
})
```

### Rich Text

```typescript
defineField({
  name: "content",
  type: "richText",
  title: "Content",
  // Configured via flightdeck.ts schemaSettings.richText
})

defineField({
  name: "heading",
  type: "heading",
  title: "Heading",
  // Configured via flightdeck.ts schemaSettings.heading
})
```

### Image

```typescript
defineField({
  name: "image",
  type: "adaptiveImage",
  title: "Image",
  // Handles responsive images, hotspot, crop
})
```

### Theme (if applicable)

```typescript
defineField({
  name: "theme",
  type: "blockTheme",
  title: "Theme",
})

// Or use a pre-configured field from your constants
import { theme } from "@/utils/constants";
defineField(theme)
```

---

## Schema Validation

### Common Validation Rules

```typescript
// Required field
validation: (Rule) => Rule.required()

// Min/max length
validation: (Rule) => Rule.min(10).max(200)

// Array length
validation: (Rule) => Rule.min(1).max(5)

// Custom validation
validation: (Rule) => Rule.custom((value) => {
  if (value && value.length < 10) {
    return "Must be at least 10 characters";
  }
  return true;
})

// Conditional validation
validation: (Rule) => Rule.custom((value, context) => {
  const parent = context.parent as any;
  if (parent.design === "withImage" && !value) {
    return "Required when design includes image";
  }
  return true;
})
```

---

## Conditional Fields

### Hiding Fields Based on Other Fields

```typescript
defineField({
  name: "image",
  type: "adaptiveImage",
  title: "Image",
  hidden: (data: any) => data?.parent?.design !== "withImage",
})

defineField({
  name: "videoUrl",
  type: "url",
  title: "Video URL",
  hidden: (data: any) => data?.parent?.mediaType !== "video",
})
```

### Field Dependencies

```typescript
defineField({
  name: "design",
  type: "string",
  title: "Design",
  options: {
    list: [
      { title: "Design A", value: "designA" },
      { title: "Design B", value: "designB" },
    ],
  },
}),

defineField({
  name: "designAContent",
  type: "richText",
  title: "Content",
  hidden: (data: any) => data?.parent?.design !== "designA",
}),

defineField({
  name: "designBImage",
  type: "adaptiveImage",
  title: "Image",
  hidden: (data: any) => data?.parent?.design !== "designB",
})
```

---

## Best Practices

### Schema Design

✅ **Do:**
- Use Flightdeck types when available
- Include common fields consistently (theme, spacing, etc.)
- Add helpful descriptions for content editors
- Validate required fields
- Use conditional fields to simplify UI
- Add preview configurations
- Name fields consistently (camelCase)
- **Create separate object types** - never inline objects

❌ **Don't:**
- Recreate existing Flightdeck schemas
- Forget to add blocks to `blocksTypes` array
- Use overly complex nested structures
- Skip validation rules
- Use unclear field names
- **Define objects inline** - this breaks GraphQL deploy and type generation

### Query Design

✅ **Do:**
- Use fragment pattern for reusability
- Fetch only necessary fields
- Include `_key` for array items
- Include `_type` for discriminated unions
- Use `defineQuery` and `defineBlockQuery` helpers

❌ **Don't:**
- Duplicate field selections
- Fetch entire documents when only a few fields needed
- Forget to update queries when schemas change
- Use raw strings (use template pattern)

### Type Generation

✅ **Do:**
- Run `npm run typegen` after schema changes
- Commit generated types with schema changes
- Use generated types in components
- Check types after major schema refactors

❌ **Don't:**
- Manually edit generated types
- Skip type generation
- Use `any` instead of generated types

---

## Troubleshooting

### Block Not Appearing in Studio

1. Check `blocksTypes` in `src/utils/constants.ts`
2. Check schema is imported in `src/sanity/schemas/index.ts`
3. Restart dev server

### Preview Not Working

1. Check `data-sanity-path` attributes are present
2. Verify field is in GROQ query
3. Check field name matches schema exactly
4. Verify preview URL is allowed in `flightdeck.ts`

### GraphQL Deploy Fails / Type Generation Fails

**Causes:**
- Inline object definitions in schemas (most common)
- Invalid schema structure
- Missing required fields in schemas

**Solution:**
1. Check for inline objects - convert them to separate type definitions
2. Validate all schemas are properly exported
3. Run `npm run typegen` after fixing

### Types Out of Sync

1. Run `npm run typegen`
2. Check for TypeScript errors
3. Restart IDE TypeScript server
4. Check `.env` has correct Sanity credentials

### Field Not Showing in Query Results

1. Check field is in GROQ query
2. Check field name spelling
3. Check field has a value in Studio
4. For references, check dereferencing syntax (`->`)

---

## Summary Checklist

When working with Sanity/Flightdeck:

- [ ] Understand how `flightdeck.ts` customizes schemas
- [ ] Use Flightdeck types instead of creating custom ones
- [ ] Include common fields consistently (theme, spacing, etc. if applicable)
- [ ] **Never define objects inline** - always create separate object types
- [ ] Register blocks in `blocksTypes` array
- [ ] Import schemas in `src/sanity/schemas/index.ts`
- [ ] Create GROQ query for block data
- [ ] Add block query to `blocksListFieldsCore`
- [ ] Run `npm run typegen` after schema changes (verify it succeeds)
- [ ] Add `data-sanity-path` for live preview
- [ ] Test in Sanity Studio before deploying

---

**Related Guides:**
- [Block Creation Guide](./block-creation-guide.md) - Complete block creation workflow
- [Project Structure](./project-structure.md) - Where to place schemas
- [Frontend Conventions](./frontend-conventions.md) - Using generated types in components
- [API Patterns](./api-patterns.md) - Fetching data with queries
