# Block Creation Guide

This document provides instructions for creating new blocks in the automate-x codebase. Use this as context when generating new blocks.

---

## Architecture Overview

Blocks are modular content sections that can be added to pages via Sanity CMS. Each block requires:

1. **Sanity Schema** - Defines the block's data structure in the CMS
2. **React Component** - Renders the block on the frontend
3. **GROQ Query** - Fetches the block's data from Sanity
4. **Registration** - Connects everything together

---

## File Structure

```
src/
├── sanity/
│   └── schemas/
│       ├── blocks/
│       │   └── {blockName}.ts          # Sanity schema definition
│       ├── objects/
│       │   └── {objectName}.ts         # Supporting object schemas (if needed)
│       └── index.ts                    # Schema registration
├── components/
│   └── blocks/
│       ├── {blockName}.tsx             # Simple blocks (single file)
│       └── {blockName}/                # Complex blocks (folder structure)
│           ├── {blockName}.tsx
│           ├── {subComponent}.tsx
│           └── index.ts
├── queries/
│   └── blocks.ts                       # Block query definitions
└── utils/
    └── constants.ts                    # Block type registration
```

---

## Step 1: Create the Sanity Schema

**File:** `src/sanity/schemas/blocks/{blockName}.ts`

### Template:

```typescript
import { theme } from "@/utils/constants";
import { defineBlock, formatBlockPreview } from "@flight-digital/sanity-plugin-flightdeck";
import { FaIcon } from "react-icons/fa"; // Choose appropriate icon
import { defineField } from "sanity";

export default defineBlock({
  name: "{blockName}",                    // camelCase, no "block." prefix (added automatically)
  title: "{Block Title}",                 // Human-readable title for CMS
  icon: FaIcon,                           // Icon shown in CMS
  // image: images.block{Name}.src,       // Optional: Preview image in block picker
  disableDefaultPadding: true,            // Usually true for custom padding control
  fields: [
    theme,                                // ALWAYS include theme as first field
    defineField({
      name: "fieldName",
      type: "string",                     // string, number, boolean, array, richText, adaptiveImage, link, etc.
      title: "Field Title",
      description: "Optional description",
      validation: (Rule) => Rule.required(),
      initialValue: "default",
      // For conditional fields:
      hidden: (data: any) => data?.parent?.someField !== "someValue",
    }),
    // Array fields:
    defineField({
      name: "items",
      type: "array",
      title: "Items",
      of: [{ type: "objectTypeName" }],   // Reference to object schema
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: formatBlockPreview({
    fields: "title",                      // Field to use for preview title
    formatter: (val) => val || "{Block Title}",
  }),
});
```

### Common Field Types:

| Type | Description |
|------|-------------|
| `string` | Simple text input |
| `number` | Numeric input |
| `boolean` | Toggle switch |
| `text` | Multi-line text |
| `richText` | Rich text editor (Flightdeck type) |
| `adaptiveImage` | Responsive image (Flightdeck type) |
| `link` | Button/link with internal/external options (Flightdeck type) |
| `array` | List of items |
| `mux.video` | Mux video upload |
| `blockTheme` | Theme selector (use `theme` from constants) |

---

## Step 2: Create Supporting Object Schemas (If Needed)

**File:** `src/sanity/schemas/objects/{objectName}.ts`

For blocks with repeatable nested structures (like tabs, cards, items):

⚠️ **IMPORTANT:** Always create separate object type files. Never define objects inline in your block schema, as this will cause GraphQL deployment to fail and prevent type generation.

```typescript
import { FaFolder } from "react-icons/fa";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "{objectName}",
  title: "{Object Title}",
  icon: FaFolder,
  type: "object",
  fields: [
    defineField({
      name: "label",
      type: "string",
      title: "Label",
      validation: (Rule) => Rule.required(),
    }),
    // Additional fields...
  ],
  preview: {
    select: {
      title: "label",
      items: "items",
    },
    prepare({ title, items }) {
      return {
        title: title || "Untitled",
        subtitle: `${items?.length || 0} item(s)`,
      };
    },
  },
});
```

---

## Step 3: Create the React Component

**File:** `src/components/blocks/{blockName}.tsx`

### Template:

```typescript
"use client";

import { mergeClassNames } from "@flight-digital/flightdeck/helpers";
import { styled } from "@linaria/react";
// Import other components as needed:
// import Button from "@/components/atoms/button";
// import Image from "@/components/atoms/image";
// import RichText from "../molecules/richText";

interface Props {
  data?: Sanity.Block{BlockName};  // Type is auto-generated from schema
}

const {BlockName} = ({ data }: Props) => {
  if (!data) return null;

  // Destructure data
  const { theme: blockTheme, title, items } = data;
  
  // Theme handling - ALWAYS default to "dark" unless explicitly "light"
  const theme = blockTheme?.name === "light" ? "light" : "dark";

  return (
    <Wrapper className={mergeClassNames(`theme-${theme}`)}>
      {title && (
        <Title className="h3" data-sanity-path="title">
          {title}
        </Title>
      )}
      {/* Block content */}
    </Wrapper>
  );
};

export default {BlockName};

// ============================================
// STYLED COMPONENTS
// ============================================

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  padding: 64rwd var(--theme-page-horizontal-padding);

  @media --base-down {
    padding: 48rwm var(--theme-page-horizontal-padding);
  }

  /* ALWAYS include theme styles */
  &.theme-dark {
    background-color: var(--color-black);
    color: var(--color-white);
  }

  &.theme-light {
    background-color: var(--color-white);
    color: var(--color-black);
  }
`;

const Title = styled.h3`
  margin: 0;

  .theme-dark & {
    color: var(--color-white);
  }

  .theme-light & {
    color: var(--color-black);
  }
`;
```

---

## Step 4: Add the Query Fields

**File:** `src/queries/blocks.ts`

Add the block's query fields:

```typescript
const block{BlockName}Fields = defineBlockQuery("block.{blockName}")(
  `
  theme {
    name
  },
  title,
  caption,
  // For arrays with nested objects:
  items[] {
    _key,
    label,
    // Include sub-fields...
  },
  // For images:
  image { ${imageFields} },
  // For links:
  link { ${linkFields} },
  // For rich text:
  content { ${richTextFields} },
  // For references:
  reference -> {
    _id,
    _type,
    // fields...
  }
`,
);
```

Then add to `blocksListFieldsCore`:

```typescript
const blocksListFieldsCore = defineQuery(`
  ${blockHeroFields},
  // ... existing blocks ...
  ${block{BlockName}Fields}  // Add here
`);
```

---

## Step 5: Register the Block

### 5.1 Update `src/utils/constants.ts`

Add to `blocksTypes` array:

```typescript
export const blocksTypes = [
  { type: "block.hero" },
  // ... existing blocks ...
  { type: "block.{blockName}" },  // Add here
];
```

### 5.2 Update `src/sanity/schemas/index.ts`

Import and register the schema:

```typescript
// -------------- Blocks --------------- //
import block{BlockName} from "./blocks/{blockName}";
// If you have object schemas:
import {objectName} from "./objects/{objectName}";

const schemas = [
  // ... existing schemas ...
  
  // Objects (if any)
  {objectName},
  
  // Blocks
  block{BlockName},
];
```

### 5.3 Update `src/components/blocks/blocks.tsx`

Import and add the CustomBlock:

```typescript
import {BlockName} from "./{blockName}";
// or for folder structure:
import {BlockName} from "./{blockName}";

// Inside BlocksList component:
<CustomBlock<Sanity.Block{BlockName}>
  blockType="block.{blockName}"
  className={(data) => {
    const theme = data?.theme?.name || "dark";
    return `theme-${theme}`;
  }}
  element={(elData) => <{BlockName} data={elData} />}
/>
```

---

## Styling Guidelines

### Responsive Units

Use Flightdeck's responsive units:
- `rwd` - Responsive width desktop (scales with viewport)
- `rwm` - Responsive width mobile (scales with viewport)

```css
padding: 64rwd;           /* Desktop */
@media --base-down {
  padding: 48rwm;         /* Mobile */
}
```

### Media Queries

```css
@media --base-down { }    /* Mobile: max-width: 767px */
@media --base-up { }      /* Desktop: min-width: 768px */
```

### CSS Variables

```css
/* Colors */
--color-black: #000;
--color-white: #fff;
--color-orange: #EE6326;
--color-grey: #1C1C1C;
--color-grey-50: #1C1C1C66;
--color-grey-light: #EFEFEF;
--color-white-50: #FFFFFF66;

/* Layout */
--theme-page-horizontal-padding: 40rwd;  /* Desktop */
--theme-page-horizontal-padding: 16rwm;  /* Mobile (auto-switches) */

/* Typography */
--font-primary: "Inter", Arial, system-ui, sans-serif;
--font-weight-regular: 300;
--font-weight-semi-bold: 400;
--font-weight-bold: 600;
```

### Typography Classes

Available global classes:
- `.display-lg`, `.display` - Display text
- `.h1` - `.h6` - Headings
- `.p-big`, `.p`, `.p-small` - Paragraphs
- `.caption`, `.small` - Small text
- `.cta` - Call to action text

### Theme Classes

ALWAYS implement both themes:

```css
/* On wrapper */
&.theme-dark {
  background-color: var(--color-black);
  color: var(--color-white);
}

&.theme-light {
  background-color: var(--color-white);
  color: var(--color-black);
}

/* On child elements */
.theme-dark & {
  color: var(--color-white);
}

.theme-light & {
  color: var(--color-black);
}
```

---

## Common Patterns

### Using the Tabs Component

```typescript
import Tabs from "../molecules/tabs";
import { useState } from "react";

const [activeTabIndex, setActiveTabIndex] = useState(0);

<Tabs
  tabs={data.tabs?.map((tab) => ({ 
    _key: tab._key, 
    label: tab.label! 
  })) || []}
  activeTabIndex={activeTabIndex}
  onTabChange={setActiveTabIndex}
  theme={theme as "light" | "dark"}
/>
```

### Using Images

```typescript
import Image from "@/components/atoms/image";

<Image data={data.image} className="custom-class" />
```

### Using Rich Text

```typescript
import RichText from "../molecules/richText";

<RichText data={data.content} data-sanity-path="content.blocks" />
```

### Using Buttons/Links

```typescript
import Button from "@/components/atoms/button";

<Button data={data.link} variant="orangeBtn" />
// Variants: orangeBtn, whiteBtn, transparentBlackBtn, transparentWhiteBtn
```

### Sanity Path Attributes

Add `data-sanity-path` for live preview editing:

```tsx
<Title data-sanity-path="title">{data.title}</Title>
<div data-sanity-path="items[0].label">{item.label}</div>
```

---

## Checklist

When creating a new block, ensure you have:

- [ ] Created Sanity schema in `src/sanity/schemas/blocks/`
- [ ] Created any object schemas in `src/sanity/schemas/objects/` (never inline!)
- [ ] **Verified no inline object definitions** (causes GraphQL deploy failure)
- [ ] Created React component in `src/components/blocks/`
- [ ] Added query fields in `src/queries/blocks.ts`
- [ ] Added to `blocksListFieldsCore` in `src/queries/blocks.ts`
- [ ] Added to `blocksTypes` in `src/utils/constants.ts`
- [ ] Registered schemas in `src/sanity/schemas/index.ts`
- [ ] Added CustomBlock in `src/components/blocks/blocks.tsx`
- [ ] Implemented styling appropriately for the design system
- [ ] Used responsive units (if applicable: `rwd`/`rwm`) for spacing
- [ ] Added `data-sanity-path` attributes for editable fields
- [ ] Run TypeScript codegen to generate types: `npm run typegen`
- [ ] **Verified typegen succeeded without errors**

---

## Figma to Block Workflow

### Prerequisites

**Install Puppeteer** (only needed once per project):

```bash
npm install puppeteer --save-dev
```

This installs a headless Chrome browser used to render components to images.

---

### Using Component-to-Image Tool

When implementing designs from Figma, use the `component-to-image.js` script to create preview images for Sanity Studio and validate your implementation.

**Tool Location:** `.flight/component-to-image.js`

**Purpose:** Automatically generates PNG images from HTML/Tailwind components. No manual screenshots needed.

---

#### Step 1: Extract from Figma MCP

Use Figma MCP tools to extract the component:

```bash
# 1. get_design_context → Tailwind component code (HTML)
# 2. get_screenshot → Visual reference (for comparison)
# 3. get_variable_defs → Design tokens (colors, typography)
```

#### Step 2: Save Component HTML

Copy the Tailwind HTML output from `get_design_context` to a file:

```bash
# Save to temporary file
# Example: .flight/figma-newsletter.html
```

The HTML should be just the component markup (no full HTML document needed).

#### Step 3: Generate Preview Image

**Run the automated tool:**

```bash
node .flight/component-to-image.js .flight/figma-newsletter.html src/sanity/assets/block-newsletter.png
```

**That's it!** The tool will:
- ✅ Render the component in a headless browser
- ✅ Apply Tailwind styles via CDN
- ✅ Screenshot the component
- ✅ Save PNG to specified path
- ✅ Create directories if needed

**Custom viewport/background:**
```bash
node .flight/component-to-image.js figma-hero.html src/sanity/assets/block-hero.png --width 1920 --bg "#1c1c1c"
```

#### Step 4: Register Image in Assets

**File:** `src/sanity/assets/images.ts`

Import and export the generated image:

```typescript
import blockHero from "./block-hero.png";
import blockNewsletter from "./block-newsletter.png";  // Add your new image

const images = {
  blockHero,
  blockNewsletter,  // Add to exports
};

export default images;
```

#### Step 5: Use in Sanity Schema

**File:** `src/sanity/schemas/blocks/{blockName}.ts`

Reference the image in your block schema:

```typescript
import images from "@/sanity/assets/images";
import { theme } from "@/utils/constants";
import { defineBlock, formatBlockPreview } from "@flight-digital/sanity-plugin-flightdeck";
import { FaIcon } from "react-icons/fa";

export default defineBlock({
  name: "newsletter",
  title: "Newsletter Signup",
  image: images.blockNewsletter.src,  // ← Preview shows in CMS block picker
  icon: FaIcon,
  disableDefaultPadding: true,
  fields: [
    theme,
    // ... your fields
  ],
  preview: formatBlockPreview({
    fields: "title",
    formatter: (val) => val || "Newsletter Signup",
  }),
});
```

**Result:** Content editors see the preview image when selecting blocks in Sanity Studio.

#### Step 6: Implement with Linaria

Convert the Tailwind component to Linaria following the guide in `AGENTS.md`:
- Convert Tailwind classes to CSS properties (see Tailwind → Linaria section)
- Use `rwd`/`rwm` responsive units
- Apply typography classes via `className`
- Use CSS variables for colors

#### Step 7: Validate Implementation

Compare your Linaria implementation against the generated preview:

1. Open generated preview: `src/sanity/assets/block-newsletter.png`
2. Open your implementation in browser
3. Use dev tools to compare spacing, colors, typography
4. Adjust until they match exactly

You can also compare against the Figma screenshot from `get_screenshot`.

---

### Component-to-Image Reference

**Syntax:**
```bash
node .flight/component-to-image.js <input-file> <output-path> [options]
```

**Arguments:**
- `<input-file>` - Path to HTML file (or `-` for stdin)
- `<output-path>` - Where to save PNG (creates directories automatically)

**Options:**
- `--width <px>` - Viewport width (default: 1400)
- `--height <px>` - Viewport height (default: 900)
- `--bg <color>` - Background color (default: #000000)
- `--padding <px>` - Body padding (default: 40px)

**Examples:**

```bash
# Basic usage
node .flight/component-to-image.js component.html output.png

# Custom viewport and background
node .flight/component-to-image.js hero.html block-hero.png --width 1920 --bg "#1c1c1c"

# Batch create all block previews
node .flight/component-to-image.js hero.html src/sanity/assets/block-hero.png
node .flight/component-to-image.js newsletter.html src/sanity/assets/block-newsletter.png
node .flight/component-to-image.js carousel.html src/sanity/assets/block-carousel.png

# From stdin
echo '<div class="bg-black p-10 text-white">Test</div>' | \
  node .flight/component-to-image.js - output.png
```

---

### Benefits

1. **Automated previews** - No manual screenshots in Figma
2. **Block picker UI** - Show editors what each block looks like
3. **Visual validation** - Compare Figma design vs implementation
4. **Version control** - Track visual changes over time
5. **Portable tool** - Copy `.flight/component-to-image.js` to any project

---

## Example: Complete Block Implementation

See these files for reference implementations:
- Simple block: `src/sanity/schemas/blocks/cardCarousel.ts` + `src/components/blocks/cardCarousel.tsx`
- Block with tabs: `src/sanity/schemas/blocks/ctaCardTabs.ts` + `src/components/blocks/ctaCardTabs.tsx`
- Complex block: `src/sanity/schemas/blocks/hero.ts` + `src/components/blocks/hero/`

