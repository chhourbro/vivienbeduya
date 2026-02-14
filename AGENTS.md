# AI Agent Guidelines

This document provides essential context for AI assistants working on the codebase.

---

## Quick Reference

**Stack:** Next.js 16 + React 19 + Sanity CMS v4 + Linaria CSS-in-JS + TypeScript

**Key Concepts:**
- Block-based content architecture (see [Block Creation Guide](./.flight/block-creation-guide.md))
- Flightdeck component system for standardized CMS patterns
- Server components by default, opt-in to client components

---

## Core Conventions

### Code Style

- **Exports:** Named exports only (no default exports except Next.js routes)
- **Types:** Always use explicit return types, never use `any`
- **Control Flow:** Prefer early returns for clarity
- **Functions:** Keep focused and single-purpose
- **Components:** Function components only, no classes

### Component Structure

```typescript
"use client"; // Only if needed

import { mergeClassNames } from "@flight-digital/flightdeck/helpers";
import { styled } from "@linaria/react";

interface Props {
  data?: Sanity.SomeType;
  className?: string;
}

export const ComponentName = ({ data, className }: Props): JSX.Element | null => {
  if (!data) return null;

  return (
    <Wrapper className={mergeClassNames(`any-extra-class`, className)}>
      {/* Content */}
    </Wrapper>
  );
};

// ============================================
// STYLED COMPONENTS (always after main component)
// ============================================

const Wrapper = styled.div`
  position: relative;
`;

// Avoid mini styled components with only 1-2 styles
// Instead, apply via className from parent styled component:
// const ParentContainer = styled.div`
//   .child-class & { margin-top: 16px; }
// `;
```

---

## Forbidden Actions

❌ **Never do these without explicit user request:**
- Delete files
- Reformat unrelated code
- Change existing public APIs
- Modify git configuration
- Force push to main/master
- Skip git hooks
- Create documentation files proactively
- Add emojis unless requested
- Execute Sanity Migrations

---

## Required Behavior

✅ **Always:**
- Make minimal, surgical changes
- Create the smallest possible diffs
- Explain reasoning before large refactors
- Ask before restructuring folders
- Fix linter errors you introduce
- Use specialized tools over terminal commands
- Request necessary permissions (network, git_write)

✅ **When editing:**
- Read the file first if it exists
- Preserve exact indentation
- Match existing patterns
- Update related tests if applicable

---

## Detailed Guidelines

For comprehensive details on specific aspects of the codebase, refer to these guides:

### 📋 [Project Structure](./.flight/project-structure.md)
- Overall folder organization
- File naming conventions
- Component categorization (atoms/molecules/organisms/blocks)
- Where to place new code

### 🎨 [Frontend Conventions](./.flight/frontend-conventions.md)
- Styling with Linaria
- Responsive units (rwd/rwm)
- Typography and CSS variables
- Client vs Server components

### 📦 [Sanity CMS & Flightdeck](./.flight/sanity-cms.md)
- Understanding `flightdeck.ts` configuration
- How Flightdeck impacts schema structure
- GROQ query patterns
- Schema types and relationships
- Live preview integration

### 🔌 [API & Data Patterns](./.flight/api-patterns.md)
- Next.js API routes
- Server actions
- Data fetching patterns
- Revalidation strategies
- Type generation workflow

### 🏗️ [Block Creation](./.flight/block-creation-guide.md)
- Complete guide for creating new blocks
- Step-by-step checklist
- Common patterns and examples

### 🎨 [Figma Design Tokens](#figma-design-tokens)
- Extracting typography from Figma
- Color system and CSS variables
- Connecting tokens to Sanity rich text
- Always use design tokens, never arbitrary values

---

## Project-Specific Context

### Flightdeck Plugin

The `flightdeck.ts` file at the root configures the **@flight-digital/flightdeck** plugin, which provides:

1. **Standardized CMS Components:** Pre-built Sanity schemas for common patterns (buttons, links, rich text, images, grids, etc.)
2. **Schema Customization:** Ability to override and extend default field definitions
3. **Block System:** Framework for creating modular content blocks
4. **Preview Integration:** Live preview functionality for content editors
5. **Type Generation:** Automatic TypeScript types from schemas

**Impact on Development:**
- You don't need to create schemas for primitives (button, link, image, etc.) - they're provided by Flightdeck
- Custom blocks should extend Flightdeck's base blocks via overwrite functions
- The `theme` field is a Flightdeck type that must be included in all blocks
- Type `Sanity.*` types are auto-generated from schemas

See [Sanity CMS & Flightdeck Guide](./.flight/sanity-cms.md) for details.

---

## Technology Stack

### Core Dependencies
- **Next.js 16.0.10** - App Router, Server Components, API Routes
- **React 19.1.0** - Latest React with concurrent features
- **Sanity 4.21.1** - Headless CMS
- **next-sanity 11.6.10** - Sanity integration for Next.js
- **@flight-digital/flightdeck 6.1.0** - Component system
- **@linaria/react 6.3.0** - Zero-runtime CSS-in-JS

### Styling & Animation
- **Linaria** - Styled components with zero runtime overhead
- **framer-motion 12.23.24** - Animation library (add only if needed)
- **lenis 1.3.11** - Smooth scrolling

### Development Tools
- **TypeScript 5** - Type safety
- **@graphql-codegen** - Type generation from Sanity schemas
- **leva** - Dev controls for animations/motives (add only if needed)

---

## Common Tasks

### Adding a New Block
See [Block Creation](./.flight/block-creation-guide.md) for complete instructions.

**Quick steps:**
1. Create schema in `src/sanity/schemas/blocks/`
2. Create component in `src/components/blocks/`
3. Add query in `src/queries/blocks.ts`
4. Register in `src/utils/constants.ts`
5. Import in `src/sanity/schemas/index.ts`
6. Add to `src/components/blocks/blocks.tsx`

### Regenerating Types
```bash
npm run typegen
```
This generates TypeScript types from Sanity schemas using GraphQL codegen.

### Development Workflow
```bash
npm run dev           # Start Next.js dev server
npm run lint          # Run ESLint
npm run lint:fix      # Auto-fix lint issues
npm run lint-ts       # TypeScript type checking
npm run format        # Format with Prettier
```

---

## File Organization

```
src/
├── app/                    # Next.js App Router
│   ├── (site)/            # Public site routes
│   ├── admin/             # Sanity Studio
│   └── api/               # API routes
├── components/
│   ├── atoms/             # Basic building blocks
│   ├── molecules/         # Composite components
│   ├── organisms/         # Complex sections (header, footer)
│   └── blocks/            # CMS content blocks
├── sanity/
│   ├── schemas/           # Sanity schema definitions
│   ├── components/        # Custom Sanity Studio components
│   └── lib/               # Sanity client configuration
├── queries/               # GROQ queries for data fetching
├── templates/             # Page templates (article, case study, page)
├── hooks/                 # React hooks
├── utils/                 # Utilities and constants
└── lib/                   # Library configurations
```

See [Project Structure Guide](./.flight/project-structure.md) for details.

---

## Figma Design Tokens

**IMPORTANT:** Always use design tokens from Figma. Never use arbitrary values.

### Prerequisites: Figma MCP Setup

The Figma MCP server must be configured to extract design tokens. Check if it's available:

```bash
# List available MCP servers
cursor agent mcp list

# Check if Figma MCP is enabled
cursor agent mcp list-tools figma
```

If Figma MCP is not configured, the user needs to set it up in their Cursor settings. See the project's MCP configuration or [Cursor MCP Directory](https://cursor.com/docs/context/mcp/directory) for Figma MCP server setup.

**Common Figma MCP servers:**
- `@modelcontextprotocol/server-figma` - Official Figma MCP server
- Requires Figma API token for authentication

### When User Provides Figma URL

Use the Figma MCP tool to extract:
1. **Typography scales** - All text styles with sizes, weights, line heights
2. **Color palette** - All colors used in the design
3. **Spacing system** - Padding and margin values
4. **Component structure** - Layout and hierarchy

### Typography System

Extract typography from Figma and add to global styles file (`src/app/globals.css` or equivalent):

```css
/* Desktop Typography - Always use responsive units (rwd) */
body .display-lg {
  font-size: 160rwd;
  line-height: 0.8;
}

body .display {
  font-size: 128rwd;
  line-height: 0.9;
}

body .h1,
body h1 {
  font-size: 80rwd;
  line-height: 0.9;
}

body .h2,
body h2 {
  font-size: 64rwd;
  line-height: 1;
}

body .h3,
body h3 {
  font-size: 48rwd;
  line-height: 1.1;
}

body .h4,
body h4 {
  font-size: 32rwd;
  line-height: 1.2;
}

body .h5,
body h5 {
  font-size: 24rwd;
  line-height: 1.2;
}

body .h6,
body h6 {
  font-size: 20rwd;
  line-height: 1.2;
}

body .p-big {
  font-size: 20rwd;
  line-height: 1.4;
}

body .p,
body p {
  font-size: 16rwd;
  line-height: 1.5;
}

body .p-small {
  font-size: 14rwd;
  line-height: 1.5;
}

body .caption {
  font-size: 12rwd;
  line-height: 1.4;
}

body .small {
  font-size: 10rwd;
  line-height: 1.4;
}

body .cta {
  font-size: 16rwd;
  font-weight: var(--font-weight-bold);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Mobile Typography - Always use responsive mobile units (rwm) */
@media --base-down {
  body .display-lg,
  body .display {
    font-size: 40rwm;
  }

  body .h1,
  body h1 {
    font-size: 36rwm;
  }

  body .h2,
  body h2 {
    font-size: 32rwm;
  }

  body .h3,
  body h3 {
    font-size: 28rwm;
  }

  body .h4,
  body h4 {
    font-size: 24rwm;
  }

  body .h5,
  body h5 {
    font-size: 20rwm;
  }

  body .h6,
  body h6 {
    font-size: 18rwm;
  }

  body .p-big {
    font-size: 18rwm;
  }

  body .p,
  body p {
    font-size: 16rwm;
  }

  body .p-small {
    font-size: 14rwm;
  }

  body .caption {
    font-size: 12rwm;
  }

  body .small {
    font-size: 10rwm;
  }

  body .cta {
    font-size: 14rwm;
  }
}

/* Font Weights */
body .h0,
body h1,
body .h1,
body h2,
body .h2,
body h3,
body .h3,
body h4,
body .h4,
body h5,
body .h5,
body h6,
body .h6 {
  font-weight: var(--font-weight-semi-bold);
  line-height: 1.2;
}
```

### Color Variables

Extract colors from Figma and add to CSS variables in `:root`:

```css
:root {
  /* Primary Colors */
  --color-black: #000000;
  --color-white: #ffffff;
  --color-orange: #ee6326;
  
  /* Greys */
  --color-grey: #1c1c1c;
  --color-grey-light: #efefef;
  
  /* Opacity Variants - Use for overlays and effects */
  --color-white-50: #ffffff66;  /* 40% opacity */
  --color-grey-50: #1c1c1c66;   /* 40% opacity */
  
  /* Font Weights */
  --font-weight-regular: 300;
  --font-weight-semi-bold: 400;
  --font-weight-bold: 600;
  
  /* Layout */
  --theme-page-horizontal-padding: 40rwd;  /* Auto-switches to 16rwm on mobile */
}

/* Add more colors as extracted from Figma */
```

### Connecting to Sanity Rich Text

Typography classes must be available in Sanity's rich text editor. Configure in two places:

**1. flightdeck.ts** (root of project):

```typescript
import { defRichTextFields } from "./src/utils/constants";

export default defineFlightdeckPlugin({
  overwrites: {
    heading: { ...defRichTextFields },
    richText: { ...defRichTextFields },
  },
});
```

**2. src/utils/constants.ts**:

```typescript
export const defRichTextFields = {
  overwriteTextSizeOptions(current: any) {
    return [
      { title: "Display Large", value: "display-lg" },
      { title: "Display", value: "display" },
      ...current,  // Keep default options (h1-h6, p)
      { title: "Big Paragraph", value: "p-big" },
      { title: "Small Paragraph", value: "p-small" },
      { title: "Caption", value: "caption" },
      { title: "Small", value: "small" },
      { title: "CTA", value: "cta" },
    ];
  },
};
```

### Rules for Design Tokens

**✅ ALWAYS:**
- Use design tokens from Figma
- Use responsive units: `rwd` (desktop) and `rwm` (mobile)
- Define colors as CSS variables in `:root`
- Apply typography classes (`.h1`, `.p`, `.caption`, etc.)
- Use `var(--color-name)` for colors
- Use `var(--font-weight-name)` for font weights

**❌ NEVER:**
- Use arbitrary pixel values (`font-size: 24px`)
- Use arbitrary colors (`color: #ee6326` - use `var(--color-orange)`)
- Use fixed units for typography (`16px` - use `16rwd` or `16rwm`)
- Define inline styles with magic numbers

### Example Block Using Design Tokens

```typescript
const Wrapper = styled.div`
  padding: 64rwd var(--theme-page-horizontal-padding);
  background-color: var(--color-black);
  
  @media --base-down {
    padding: 48rwm var(--theme-page-horizontal-padding);
  }
`;

const Title = styled.h2`
  /* Use typography class instead of custom styles */
  /* Applied via className="h2" on JSX element */
  color: var(--color-white);
  margin-bottom: 24rwd;
  
  @media --base-down {
    margin-bottom: 16rwm;
  }
`;

const Description = styled.div`
  /* Use .p class for body text */
  color: var(--color-grey-light);
  
  /* Override if needed */
  opacity: 0.8;
`;
```

### Workflow: Figma to Code

1. **Extract from Figma** using MCP tools:
   - `get_design_context` → Component code (Tailwind)
   - `get_screenshot` → Visual reference PNG
   - `get_variable_defs` → Design tokens (colors, typography, spacing)

2. **Generate preview image** from Figma component:
   ```bash
   # Install puppeteer if not already installed
   npm install puppeteer --save-dev
   
   # Save Tailwind HTML from get_design_context to file
   # Then generate preview image
   node .flight/component-to-image.js figma-component.html src/sanity/assets/block-preview.png
   ```

3. **Add tokens to globals.css**:
   - Typography classes (desktop + mobile with `rwd`/`rwm`)
   - CSS variables for colors
   - Font weight variables

4. **Update Sanity config** (if new typography):
   - Add new text sizes to `defRichTextFields` in `src/utils/constants.ts`
   - Test in Sanity Studio rich text editor

5. **Convert to Linaria** (see Tailwind → Linaria section below):
   - Convert Tailwind classes to CSS properties
   - Use typography classes via `className`
   - Reference colors via `var(--color-name)`
   - Use responsive units (`rwd`/`rwm`) for spacing

6. **Verify implementation**:
   - Compare against generated preview image
   - Check mobile responsiveness
   - Test with actual CMS data in Sanity Studio
   - Validate against Figma screenshot from MCP

---

## Converting Figma MCP Output (Tailwind) to Linaria

**CRITICAL:** The Figma MCP tool outputs React components with Tailwind CSS classes. These MUST be converted to Linaria styled components to match our stack. Direct conversion often causes visual differences due to box model, specificity, and unit handling.

**TIP:** Use `.flight/component-to-image.js` to generate preview images from Figma components for visual validation:

```bash
# Ensure puppeteer is installed
npm install puppeteer --save-dev

# Save Figma MCP Tailwind output to file
# Generate preview image (fully automated - just creates PNG file)
node .flight/component-to-image.js figma-component.html src/sanity/assets/block-preview.png

# Then compare your Linaria implementation against the preview
```

### Why Designs Differ After Conversion

Common causes of visual discrepancies:

1. **Box Model:** Tailwind's `w-[672px]` sets exact width, but flex/grid contexts may override
2. **Units:** Tailwind uses `px` values from Figma; we need `rwd`/`rwm` responsive units
3. **Typography:** Tailwind applies font properties inline; we use global typography classes
4. **Flexbox defaults:** Tailwind's `flex` has different defaults than native CSS
5. **Spacing interpretation:** `gap-[32px]` vs `gap: 32rwd` behaves differently at viewport extremes
6. **Border box:** Ensure `box-sizing: border-box` is consistent
7. **Line height:** Tailwind normalizes differently; preserve exact Figma values

---

### Step-by-Step Conversion Process

#### Step 1: Analyze Figma MCP Output Structure

First, identify the component hierarchy and extract exact measurements:

```tsx
// FIGMA MCP OUTPUT (Tailwind):
<div className="bg-[#1c1c1c] flex h-[292px] items-center justify-between p-[40px] rounded-[8px] w-[1130px]">
  <div className="flex flex-col gap-[24px] items-start">
    <p className="text-[#ee6326] text-[14px] tracking-[0.7px] uppercase leading-[16px]">
      Stay updated
    </p>
    <p className="text-[48px] text-white leading-none">
      Automate-X in your inbox
    </p>
  </div>
</div>
```

**Extract these exact values:**
- Background: `#1c1c1c` → Use `var(--color-grey)` or equivalent in global design tokens
- Height: `292px` → Convert to `rwd`
- Padding: `40px` → Use `var(--theme-page-horizontal-padding)` or convert to `rwd`
- Border radius: `8px` → convert to `8rwd`
- Width: `1130px` → Convert to `rwd` or use `max-width`
- Gap: `24px` → Convert to `24rwd`
- Text color: `#ee6326` → `var(--color-orange)`
- Font size: `14px`, `48px` → Use typography classes (`.caption`, `.h3`)
- *IMPORTANT* Remember all rwd values require the equivalent `rwm` inside a mobile media query

#### Step 2: Map Tailwind Classes to CSS Properties

**Tailwind Class Reference:**

```typescript
// LAYOUT & DISPLAY
"flex"              → display: flex;
"flex-col"          → flex-direction: column;
"flex-row"          → flex-direction: row;
"grid"              → display: grid;
"hidden"            → display: none;
"block"             → display: block;
"inline-block"      → display: inline-block;
"relative"          → position: relative;
"absolute"          → position: absolute;
"fixed"             → position: fixed;

// FLEXBOX ALIGNMENT
"items-start"       → align-items: flex-start;
"items-center"      → align-items: center;
"items-end"         → align-items: flex-end;
"justify-start"     → justify-content: flex-start;
"justify-center"    → justify-content: center;
"justify-between"   → justify-content: space-between;
"justify-end"       → justify-content: flex-end;

// SIZING (convert px to rwd/rwm)
"w-[672px]"         → width: 672rwd; (desktop)
"h-[424px]"         → height: 424rwd;
"min-w-[320px]"     → min-width: 320rwd;
"max-w-[1200px]"    → max-width: 1200rwd;
"size-[48px]"       → width: 48rwd; height: 48rwd;
"w-full"            → width: 100%;
"h-full"            → height: 100%;
"flex-[1_0_0]"      → flex: 1 0 0;
"flex-1"            → flex: 1;
"shrink-0"          → flex-shrink: 0;

// SPACING (convert px to rwd/rwm)
"p-[40px]"          → padding: 40rwd;
"px-[40px]"         → padding-left: 40rwd; padding-right: 40rwd;
"py-[128px]"        → padding-top: 128rwd; padding-bottom: 128rwd;
"pt-[16px]"         → padding-top: 16rwd;
"pb-[16px]"         → padding-bottom: 16rwd;
"pl-[16px]"         → padding-left: 16rwd;
"pr-[16px]"         → padding-right: 16rwd;
"m-[24px]"          → margin: 24rwd;
"gap-[32px]"        → gap: 32rwd;

// BORDERS
"border"            → border: 1px solid;
"border-b"          → border-bottom: 1px solid;
"border-solid"      → border-style: solid;
"border-white"      → border-color: var(--color-white);
"rounded-[8px]"     → border-radius: 8px;
"rounded-full"      → border-radius: 9999px;

// COLORS (convert to CSS variables)
"bg-[#1c1c1c]"      → background-color: var(--color-grey);
"bg-white"          → background-color: var(--color-white);
"bg-black"          → background-color: var(--color-black);
"text-[#ee6326]"    → color: var(--color-orange);
"text-white"        → color: var(--color-white);
"text-black"        → color: var(--color-black);

// TYPOGRAPHY (use global classes via className)
"text-[14px]"       → Apply .caption class via className
"text-[16px]"       → Apply .p or .cta class via className
"text-[20px]"       → Apply .p-big class via className
"text-[48px]"       → Apply .h3 class via className
"font-['Aeonik:Regular',sans-serif]" → Remove (already in globals)
"leading-none"      → line-height: 1; (or use typography class)
"leading-[1.2]"     → line-height: 1.2; (or use typography class)
"tracking-[0.7px]"  → letter-spacing: 0.7px;
"uppercase"         → text-transform: uppercase;
"not-italic"        → font-style: normal; (usually unnecessary)

// EFFECTS
"opacity-30"        → opacity: 0.3;
"opacity-50"        → opacity: 0.5;
"overflow-clip"     → overflow: clip;
"pointer-events-none" → pointer-events: none;

// POSITION
"inset-0"           → top: 0; right: 0; bottom: 0; left: 0;
"inset-[-173px_-0.15px_172.69px_0]" → top: -173px; right: -0.15px; bottom: 172.69px; left: 0;
```

#### Step 3: Create Linaria Styled Components

**BEFORE (Tailwind from Figma MCP):**

```tsx
function Newsletter() {
  return (
    <div className="bg-[#1c1c1c] flex h-[292px] items-center justify-between p-[40px] rounded-[8px] w-[1130px]">
      <div className="flex flex-col gap-[24px] h-full items-start">
        <p className="leading-[16px] text-[#ee6326] text-[14px] tracking-[0.7px] uppercase">
          Stay updated
        </p>
        <p className="leading-none text-[48px] text-white w-[377px]">
          Automate-X in your inbox
        </p>
        <p className="h-[62px] leading-[1.2] text-[20px] text-white w-full">
          Stay updated on all our latest updates, events & community news.
        </p>
      </div>
      <div className="flex flex-col gap-[32px] items-end w-[400px]">
        <input className="border-b border-solid border-white pb-[8px] pt-[32px]" />
        <button className="bg-[#ee6326] flex gap-[16px] h-[48px] items-center pl-[16px] rounded-[8px]">
          Subscribe
        </button>
      </div>
    </div>
  );
}
```

**AFTER (Linaria for Automate-X):**

```tsx
import { styled } from "@linaria/react";

interface Props {
  data?: Sanity.NewsletterSignup;
  className?: string;
}

export const NewsletterSignup = ({ data, className }: Props): JSX.Element | null => {
  if (!data) return null;

  return (
    <Wrapper className={className}>
      <ContentColumn>
        <Label className="caption">Stay updated</Label>
        <Heading className="h3">Automate-X in your inbox</Heading>
        <Description className="p-big">
          Stay updated on all our latest updates, events & community news.
        </Description>
      </ContentColumn>
      
      <FormColumn>
        <Input type="text" placeholder="Your name" />
        <Input type="email" placeholder="name@email.com" />
        <SubmitButton>
          <span className="cta">Subscribe</span>
          {/* Arrow icon */}
        </SubmitButton>
      </FormColumn>
    </Wrapper>
  );
};

// ============================================
// STYLED COMPONENTS
// ============================================

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--color-grey);
  border-radius: 8px;
  padding: 40rwd;
  width: 100%;
  max-width: 1130rwd;
  min-height: 292rwd;
  
  @media --base-down {
    flex-direction: column;
    align-items: flex-start;
    gap: 32rwm;
    padding: 24rwm;
    min-height: auto;
  }
`;

const ContentColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24rwd;
  height: 100%;
  
  @media --base-down {
    gap: 16rwm;
    width: 100%;
  }
`;

const Label = styled.p`
  /* .caption class applied via className - handles font-size, line-height */
  color: var(--color-orange);
  text-transform: uppercase;
  letter-spacing: 0.7px;
`;

const Heading = styled.h2`
  /* .h3 class applied via className - handles font-size (48rwd), line-height */
  color: var(--color-white);
  max-width: 377rwd;
  
  @media --base-down {
    max-width: 100%;
  }
`;

const Description = styled.p`
  /* .p-big class applied via className - handles font-size (20rwd), line-height (1.2) */
  color: var(--color-white);
  max-width: 100%;
  
  /* Figma shows h-[62px] but this is auto-calculated from line-height */
  /* Don't set fixed height on text - let it flow naturally */
`;

const FormColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32rwd;
  align-items: flex-end;
  width: 400rwd;
  
  @media --base-down {
    width: 100%;
    gap: 24rwm;
  }
`;

const Input = styled.input`
  width: 100%;
  border: none;
  border-bottom: 1px solid var(--color-white);
  background: transparent;
  color: var(--color-white);
  padding-bottom: 8rwd;
  padding-top: 32rwd;
  font-size: 20rwd;
  line-height: 1.2;
  
  &::placeholder {
    color: var(--color-white);
    opacity: 0.5;
  }
  
  @media --base-down {
    padding-bottom: 8rwm;
    padding-top: 24rwm;
    font-size: 18rwm;
  }
`;

const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  gap: 16rwd;
  background-color: var(--color-orange);
  border: none;
  border-radius: 8px;
  padding-left: 16rwd;
  height: 48rwd;
  cursor: pointer;
  transition: opacity 0.2s ease;
  
  &:hover {
    opacity: 0.9;
  }
  
  @media --base-down {
    width: 100%;
    justify-content: center;
    gap: 12rwm;
    height: 48rwm;
  }
`;
```

---

### Common Pitfalls & Solutions

#### Pitfall 1: Fixed Widths Breaking Layout

**❌ WRONG:**
```tsx
const Wrapper = styled.div`
  width: 1130px; /* Breaks on smaller screens */
`;
```

**✅ CORRECT:**
```tsx
const Wrapper = styled.div`
  width: 100%;
  max-width: 1130rwd; /* Constrains width but allows shrinking */
  
  @media --base-down {
    max-width: 100%;
  }
`;
```

#### Pitfall 2: Not Converting Units

**❌ WRONG:**
```tsx
const Title = styled.h2`
  font-size: 48px; /* Fixed pixel value */
  margin-bottom: 32px;
`;
```

**✅ CORRECT:**
```tsx
const Title = styled.h2`
  /* Use typography class for font-size */
  margin-bottom: 32rwd;
  
  @media --base-down {
    margin-bottom: 24rwm;
  }
`;

// In JSX:
<Title className="h3">Text</Title>
```

#### Pitfall 3: Duplicating Typography Styles

**❌ WRONG:**
```tsx
const Caption = styled.p`
  font-size: 14rwd;
  line-height: 16px;
  letter-spacing: 0.7px;
  text-transform: uppercase;
  /* Duplicates what .caption class already does */
`;
```

**✅ CORRECT:**
```tsx
const Caption = styled.p`
  /* Only add what's NOT in the typography class */
  color: var(--color-orange);
  /* font-size, line-height handled by .caption class */
`;

// In JSX:
<Caption className="caption">Stay updated</Caption>
```

#### Pitfall 4: Ignoring Box Model

**❌ WRONG:**
```tsx
// Tailwind: w-[400px] p-[16px] border (= 400px total)
const Box = styled.div`
  width: 400rwd;
  padding: 16rwd;
  border: 1px solid white;
  /* Without box-sizing, actual width = 400 + 32 + 2 = 434px */
`;
```

**✅ CORRECT:**
```tsx
const Box = styled.div`
  box-sizing: border-box; /* Usually set globally, but make sure */
  width: 400rwd;
  padding: 16rwd;
  border: 1px solid var(--color-white);
  /* Now total width = 400px as intended */
`;
```

#### Pitfall 5: Absolute Positioning Without Context

**❌ WRONG:**
```tsx
// Tailwind: absolute inset-0
const Overlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  /* Parent must have position: relative */
`;

const Parent = styled.div`
  /* Missing position: relative */
`;
```

**✅ CORRECT:**
```tsx
const Parent = styled.div`
  position: relative; /* Creates positioning context */
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0; /* Shorthand for top/right/bottom/left: 0 */
`;
```

#### Pitfall 6: Wrong Flex Properties

**❌ WRONG:**
```tsx
// Tailwind: flex-[1_0_0] (flex-grow: 1, flex-shrink: 0, flex-basis: 0)
const Column = styled.div`
  flex: 1; /* This is flex: 1 1 0 - allows shrinking! */
`;
```

**✅ CORRECT:**
```tsx
const Column = styled.div`
  flex: 1 0 0; /* Exact match to Tailwind flex-[1_0_0] */
  /* OR */
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 0;
`;
```

#### Pitfall 7: Not Handling Image Assets

**❌ WRONG:**
```tsx
// Using localhost URLs from Figma MCP
<img src="http://localhost:3845/assets/abc123.png" />
```

**✅ CORRECT:**
```tsx
// Replace with actual image from CMS or public folder
import { Image } from "@/components/atoms/image";

// If from Sanity:
<Image data={data?.image} />

// If static asset:
<img src="/images/newsletter-bg.jpg" alt="" />
```

#### Pitfall 8: Maintaining Arbitrary Negative Values

**❌ WRONG:**
```tsx
// Tailwind: inset-[-173px_-0.15px_172.69px_0]
const ProgressTrack = styled.div`
  position: absolute;
  top: -173px;
  right: -0.15px;
  bottom: 172.69px;
  left: 0;
  /* These arbitrary values likely won't work responsively */
`;
```

**✅ CORRECT:**
```tsx
const ProgressTrack = styled.div`
  position: absolute;
  /* Rethink the design approach */
  /* Use transform or flex alignment instead of pixel-pushing */
  width: 100%;
  height: 4px;
  /* Simpler approach that scales */
`;
```

---

### Responsive Design Conversion

**Tailwind uses breakpoint classes; Linaria uses media queries.**

**FIGMA MCP OUTPUT:**
```tsx
<div className="w-[1360px] md:w-full p-[40px] md:p-[16px] flex-row md:flex-col">
```

**CONVERT TO:**
```tsx
const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 1360rwd;
  padding: 40rwd;
  
  @media --base-down {
    flex-direction: column;
    padding: 16rwm;
    max-width: 100%;
  }
`;
```

---

### Typography Conversion Reference

**Map Figma font sizes to typography classes:**

| Figma MCP Output | Typography Class | Usage |
|-----------------|-----------------|-------|
| `text-[14px] tracking-[0.7px] uppercase` | `.caption` | Labels, meta info |
| `text-[16px]` | `.p` or `.cta` | Body text or CTAs |
| `text-[20px] leading-[1.2]` | `.p-big` | Large paragraphs |
| `text-[48px] leading-none` | `.h3` | Section headings |
| `text-[64px]` | `.h2` | Major headings |

**Always apply typography via className:**

```tsx
// ❌ DON'T:
const Heading = styled.h3`
  font-size: 48rwd;
  line-height: 1;
`;

// ✅ DO:
const Heading = styled.h3`
  /* Only non-typography styles */
  color: var(--color-white);
  margin-bottom: 24rwd;
`;

// In JSX:
<Heading className="h3">Title</Heading>
```

---

### Checklist: Tailwind → Linaria Conversion

- [ ] Extract exact pixel measurements from Figma MCP output
- [ ] Convert colors to CSS variables (`var(--color-name)`)
- [ ] Convert `px` units to `rwd` for desktop, `rwm` for mobile
- [ ] Map font sizes to typography classes (`.h3`, `.p-big`, etc.)
- [ ] Remove font-family declarations (handled globally)
- [ ] Convert Tailwind classes to CSS properties (see reference above)
- [ ] Add `position: relative` to parents of absolutely positioned children
- [ ] Use `max-width` instead of fixed `width` for containers
- [ ] Add mobile styles with `@media --base-down { }`
- [ ] Replace localhost image URLs with real assets
- [ ] Test with actual CMS data, not hardcoded content
- [ ] Verify box model with dev tools (padding, border included in width)
- [ ] Check flex properties match exactly (`flex: 1 0 0` vs `flex: 1`)
- [ ] Validate against Figma screenshot from MCP

---

### Complete Example: Newsletter Block

See full implementation: `src/components/blocks/newsletterSignup.tsx`

This example shows:
- ✅ Typography classes applied via `className`
- ✅ Colors using CSS variables
- ✅ Responsive units (`rwd`/`rwm`)
- ✅ Mobile-first responsive design
- ✅ Proper Linaria styled component structure
- ✅ Integration with Sanity CMS data

---

## Need Help?

- **Creating blocks?** → [block-creation-guide.md](./.flight/block-creation-guide.md)
- **Project structure?** → [project-structure.md](./.flight/project-structure.md)
- **Styling patterns?** → [frontend-conventions.md](./.flight/frontend-conventions.md)
- **Sanity/CMS?** → [sanity-cms.md](./.flight/sanity-cms.md)
- **API/Data?** → [api-patterns.md](./.flight/api-patterns.md)

---

## Version Info

**Last Updated:** January 2026
**Node Version:** Use LTS (20+)
**Package Manager:** npm (lock file: package-lock.json)
