# Frontend Conventions Guide

This document covers styling, component patterns, responsive design, and frontend best practices.

---

## Technology Stack

### Core Frontend Technologies

- **React 19+** - Latest React with concurrent features
- **Next.js 16+** - App Router, Server Components, API Routes
- **TypeScript 5+** - Type safety and developer experience
- **Linaria** - Zero-runtime CSS-in-JS

### Styling Philosophy

**Zero-Runtime CSS-in-JS with Linaria:**
- Styles are extracted at build time
- No runtime performance cost
- Full TypeScript support
- Automatic critical CSS extraction

---

## Component Patterns

### Server vs Client Components

**Default: Server Components**

Next.js 16 uses server components by default. Only opt into client components when needed.

```typescript
// Server component (default) - NO "use client"
import { pageQuery } from "@/queries/pages";

export const PageTemplate = ({ data }: Props): JSX.Element => {
  // Can directly access server-side data
  return <div>{data.title}</div>;
};
```

**When to use `"use client"`:**
- Using React hooks (useState, useEffect, etc.)
- Event handlers (onClick, onChange, etc.)
- Browser-only APIs (window, document, localStorage)
- Third-party libraries that require client-side execution

```typescript
"use client";

import { useState } from "react";
import { styled } from "@linaria/react";

export const InteractiveComponent = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <Button onClick={() => setIsOpen(!isOpen)}>
      Toggle
    </Button>
  );
};
```

### Component Structure Template

```typescript
"use client"; // Only if needed

import { mergeClassNames } from "@flight-digital/flightdeck/helpers";
import { styled } from "@linaria/react";

// ============================================
// INTERFACES
// ============================================

interface Props {
  data?: Sanity.SomeType;
  className?: string;
  theme?: "light" | "dark";
}

// ============================================
// COMPONENT
// ============================================

export const ComponentName = ({ data, className, theme = "dark" }: Props): JSX.Element | null => {
  // Early return for missing data
  if (!data) return null;
  
  // Destructure data
  const { title, items, image } = data;
  
  // Compute derived values
  const itemCount = items?.length || 0;
  
  // Event handlers (if client component)
  const handleClick = (): void => {
    // Handle click
  };

  // Render
  return (
    <Wrapper className={className}>
      <Title className="h3">
        {title}
      </Title>
      
      {items && (
        <List>
          {items.map((item) => (
            <ListItem key={item._key}>
              {item.label}
            </ListItem>
          ))}
        </List>
      )}
    </Wrapper>
  );
};

// ============================================
// STYLED COMPONENTS
// ============================================

const Wrapper = styled.div`
  position: relative;
  padding: 64rwd var(--theme-page-horizontal-padding);

  @media --base-down {
    padding: 48rwm var(--theme-page-horizontal-padding);
  }
`;

const Title = styled.h3`
  margin: 0 0 32rwd 0;

  @media --base-down {
    margin: 0 0 24rwm 0;
  }
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 16rwd;

  @media --base-down {
    gap: 12rwm;
  }
`;

const ListItem = styled.li`
  /* Apply styles via parent context */
`;
```

### TypeScript Conventions

**Always explicit return types:**

```typescript
// ✅ Good
export const calculateTotal = (items: Item[]): number => {
  return items.reduce((sum, item) => sum + item.price, 0);
};

// ❌ Bad
export const calculateTotal = (items: Item[]) => {
  return items.reduce((sum, item) => sum + item.price, 0);
};
```

**Never use `any`:**

```typescript
// ❌ Bad
const handleData = (data: any) => {
  console.log(data.title);
};

// ✅ Good
const handleData = (data: { title: string }) => {
  console.log(data.title);
};

// ✅ Better - Use generated types
const handleData = (data: Sanity.Page) => {
  console.log(data.title);
};
```

**Prefer early returns:**

```typescript
// ✅ Good - Early returns
export const Component = ({ data }: Props): JSX.Element | null => {
  if (!data) return null;
  if (!data.items?.length) return null;
  
  return <div>{data.items[0].label}</div>;
};

// ❌ Bad - Nested conditions
export const Component = ({ data }: Props): JSX.Element | null => {
  if (data) {
    if (data.items?.length) {
      return <div>{data.items[0].label}</div>;
    }
  }
  return null;
};
```

**Named exports only:**

```typescript
// ✅ Good
export const Button = ({ text }: Props): JSX.Element => {
  return <button>{text}</button>;
};

// ❌ Bad (except for Next.js route files)
export default Button;
```

---

## Styling with Linaria

### Basic Styled Component

```typescript
import { styled } from "@linaria/react";

const Button = styled.button`
  padding: 12px 24px;
  border-radius: 4px;
  background: var(--color-primary);
  color: var(--color-text);
  
  &:hover {
    opacity: 0.9;
  }
`;
```

### Dynamic Styles with Props

```typescript
interface ButtonProps {
  variant?: "primary" | "secondary";
  isDisabled?: boolean;
}

const Button = styled.button<ButtonProps>`
  padding: 12px 24px;
  
  /* Use CSS classes instead of dynamic style calculation */
  &.variant-primary {
    background: var(--color-primary);
  }
  
  &.variant-secondary {
    background: var(--color-secondary);
    color: var(--color-text);
  }
  
  &.is-disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;

// Usage
<Button 
  className={mergeClassNames(
    variant && `variant-${variant}`,
    isDisabled && "is-disabled"
  )}
>
  Click me
</Button>
```

### Avoid Mini Styled Components

**❌ Bad - Too many styled components with minimal styles:**

```typescript
const Wrapper = styled.div`
  display: flex;
`;

const Item = styled.div`
  margin-top: 16px;
`;

const Label = styled.span`
  font-weight: 600;
`;
```

**✅ Good - Apply via className from parent:**

```typescript
const Wrapper = styled.div`
  display: flex;
  
  .item {
    margin-top: 16px;
  }
  
  .label {
    font-weight: 600;
  }
`;

// Usage
<Wrapper>
  <div className="item">
    <span className="label">Label</span>
  </div>
</Wrapper>
```

---

## Responsive Design

### Responsive Units

Automate-X uses custom responsive units that scale with viewport:

- **`rwd`** - Responsive Width Desktop (scales on desktop viewports)
- **`rwm`** - Responsive Width Mobile (scales on mobile viewports)

```css
/* Desktop spacing */
padding: 64rwd;          /* Scales with viewport on desktop */
margin-bottom: 32rwd;

/* Mobile spacing */
@media --base-down {
  padding: 48rwm;        /* Scales with viewport on mobile */
  margin-bottom: 24rwm;
}
```

**How it works:**
- `1rwd` ≈ 0.0521vw on desktop (scales from 10px at 1920px viewport)
- `1rwm` ≈ 0.2604vw on mobile (scales from 1px at 384px viewport)
- Ensures consistent proportions across device sizes

### Media Queries

Use Flightdeck's predefined media queries:

```css
/* Mobile-first approach */
.component {
  /* Base styles (mobile) */
  font-size: 16rwm;
  
  /* Desktop styles */
  @media --base-up {
    font-size: 18rwd;
  }
}

/* Desktop-first approach */
.component {
  /* Base styles (desktop) */
  font-size: 18rwd;
  
  /* Mobile overrides */
  @media --base-down {
    font-size: 16rwm;
  }
}
```

**Available media queries:**
- `@media --base-up` - Desktop and above (min-width: 768px)
- `@media --base-down` - Mobile and below (max-width: 767px)

### Responsive Patterns

**Container Padding:**

```css
const Container = styled.div`
  padding: 80rwd var(--theme-page-horizontal-padding);

  @media --base-down {
    padding: 60rwm var(--theme-page-horizontal-padding);
  }
`;
```

**Flex Layout:**

```css
const Grid = styled.div`
  display: flex;
  gap: 32rwd;

  @media --base-down {
    flex-direction: column;
    gap: 24rwm;
  }
`;
```

**Grid Layout:**

```css
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32rwd;

  @media --base-down {
    grid-template-columns: 1fr;
    gap: 24rwm;
  }
`;
``

### CSS Variables

```css
/* Colors - Define based on project design system */
--color-primary: #000000;
--color-secondary: #FFFFFF;
--color-text: #000000;
--color-background: #FFFFFF;

/* Typography - Customize based on project fonts */
--font-primary: "Inter", Arial, system-ui, sans-serif;
--font-weight-regular: 400;
--font-weight-semi-bold: 600;
--font-weight-bold: 700;

/* Layout - Adjust based on design requirements */
--theme-page-horizontal-padding: 40rwd;  /* Example: Desktop: 40rwd, Mobile: 16rwm */
```

---

## Typography

### Typography Classes

Global typography classes are available (defined in `app/styles.linaria.global.ts`):

```typescript
<h1 className="display-lg">Display Large</h1>
<h2 className="display">Display</h2>
<h1 className="h1">Heading 1</h1>
<h2 className="h2">Heading 2</h2>
<h3 className="h3">Heading 3</h3>
<h4 className="h4">Heading 4</h4>
<h5 className="h5">Heading 5</h5>
<h6 className="h6">Heading 6</h6>
<p className="p-big">Large Paragraph</p>
<p className="p">Paragraph</p>
<p className="p-small">Small Paragraph</p>
<span className="caption">Caption Text</span>
<span className="small">Small Text</span>
<span className="cta">Call to Action</span>
```

### Typography Usage

```typescript
// ✅ Good - Use semantic HTML + utility class
<h2 className="h3">{title}</h2>

// ✅ Good - For dynamic headings
<Title as={headingLevel} className="h2">{title}</Title>

// ❌ Bad - Don't create custom typography styles unless necessary
const CustomHeading = styled.h2`
  font-size: 32px;
  font-weight: 600;
`;
```

---

## Animation

### Framer Motion

Used for complex animations and transitions.

```typescript
import { motion } from "framer-motion";

export const AnimatedComponent = (): JSX.Element => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      Content
    </motion.div>
  );
};
```

### CSS Transitions

For simple transitions, prefer CSS:

```css
const Button = styled.button`
  transition: opacity 0.3s ease, transform 0.3s ease;
  
  &:hover {
    opacity: 0.8;
    transform: translateY(-2px);
  }
`;
```

---

## Images

### Using the Image Component

```typescript
import Image from "@/components/atoms/image";

<Image 
  data={data.image} 
  className="hero-image"
  data-sanity-path="image"
/>
```

The `Image` component:
- Handles responsive images from Sanity
- Applies proper aspect ratios
- Supports hotspot and crop
- Lazy loads by default

---

## Links and Buttons

### Button Component

```typescript
import Button from "@/components/atoms/button";

// Use project-specific variants
<Button data={data.link} variant="primary" />
```

### Link Component

```typescript
import Link from "@/components/atoms/link";

<Link data={data.link} className="custom-class" />
```

Both components should handle:
- Internal vs external links
- Optional link text
- Analytics tracking
- Accessibility attributes

---

## Performance Best Practices

### 1. Use Server Components When Possible

```typescript
// ✅ Server component - Faster, smaller bundle
export const StaticContent = ({ data }: Props): JSX.Element => {
  return <div>{data.title}</div>;
};

// ❌ Unnecessary client component
"use client";
export const StaticContent = ({ data }: Props): JSX.Element => {
  return <div>{data.title}</div>;
};
```

### 2. Lazy Load Heavy Components

```typescript
import dynamic from "next/dynamic";

const VideoPlayer = dynamic(
  () => import("@/components/molecules/videoPlayer"),
  { ssr: false }
);
```

### 3. Optimize Images

- Always use the `Image` component
- Provide appropriate sizes
- Use lazy loading (default behavior)

### 4. Minimize Client-Side JavaScript

- Keep client components small and focused
- Extract static parts to server components
- Use CSS for animations when possible (instead of JS)

---

## Accessibility

### Semantic HTML

```typescript
// ✅ Good
<nav>
  <ul>
    <li><a href="/">Home</a></li>
  </ul>
</nav>

// ❌ Bad
<div>
  <div>
    <div><a href="/">Home</a></div>
  </div>
</div>
```

### ARIA Attributes

```typescript
<button
  aria-label="Close menu"
  aria-expanded={isOpen}
  onClick={toggleMenu}
>
  <Icon name="close" />
</button>
```

### Keyboard Navigation

```typescript
const handleKeyDown = (e: React.KeyboardEvent): void => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    handleClick();
  }
};
```

---

## Common Patterns

### Conditional Rendering

```typescript
// ✅ Good - Early returns
if (!data) return null;
if (!data.items?.length) return null;

return <List items={data.items} />;

// ✅ Good - Inline conditions for optional elements
{title && <Title>{title}</Title>}

// ❌ Bad - Deeply nested
{data ? (
  data.items ? (
    data.items.length > 0 ? (
      <List items={data.items} />
    ) : null
  ) : null
) : null}
```

### Lists and Keys

```typescript
// ✅ Good - Use unique _key from Sanity
{items.map((item) => (
  <ListItem key={item._key}>
    {item.label}
  </ListItem>
))}

// ❌ Bad - Index as key
{items.map((item, index) => (
  <ListItem key={index}>
    {item.label}
  </ListItem>
))}
```

### Event Handlers

```typescript
// ✅ Good - Type the event
const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
  e.preventDefault();
  // Handle click
};

// ✅ Good - Define outside JSX for complex logic
<button onClick={handleClick}>Click</button>

// ✅ OK - Inline for simple cases
<button onClick={() => setIsOpen(false)}>Close</button>
```

---

## CMS Live Preview

### Adding Preview Support (for Sanity projects)

Add `data-sanity-path` attributes to editable fields for live preview:

```typescript
<Title data-sanity-path="title">
  {data.title}
</Title>

<Image 
  data={data.image} 
  data-sanity-path="image"
/>

{data.items?.map((item, index) => (
  <ListItem 
    key={item._key}
    data-sanity-path={`items[${index}].label`}
  >
    {item.label}
  </ListItem>
))}
```

---

## Testing Considerations

While this project doesn't have tests currently configured, follow these patterns to make future testing easier:

- Keep components pure (same props = same output)
- Separate logic from presentation
- Use dependency injection for external dependencies
- Avoid tight coupling to global state

---

## Common Pitfalls

❌ **Don't:**
- Use `any` types
- Create default exports (except Next.js routes)
- Use inline styles
- Create mini styled components
- Forget theme variants
- Use arbitrary pixels instead of responsive units
- Add `"use client"` unnecessarily

✅ **Do:**
- Use explicit return types
- Export named components
- Use Linaria styled components
- Apply styles via parent className
- Support both light and dark themes
- Use `rwd`/`rwm` units
- Keep server components when possible

---

## Checklist for New Components

- [ ] TypeScript with explicit return types
- [ ] Named export
- [ ] `"use client"` only if needed
- [ ] Props interface defined
- [ ] Early returns for edge cases
- [ ] Responsive units (rwd/rwm if using Flightdeck)
- [ ] Styled components after main component
- [ ] No mini styled components
- [ ] data-* attributes for CMS preview if applicable
- [ ] Semantic HTML
- [ ] Accessibility attributes

---

**Related Guides:**
- [Project Structure](./project-structure.md)
- [Sanity CMS & Flightdeck](./sanity-cms.md)
- [Block Creation Guide](./block-creation-guide.md)
