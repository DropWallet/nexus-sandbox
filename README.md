# Design System Boilerplate

A comprehensive Next.js boilerplate template that bridges Figma design tokens with your codebase using Tailwind CSS. This system maintains perfect design consistency between your Figma designs and implementation, with automatic token processing and a complete theming system.

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Getting Started (Beginner Guide)](#getting-started-beginner-guide)
- [Using Design Tokens](#using-design-tokens)
- [Updating Tokens from Figma](#updating-tokens-from-figma)
- [Theming System](#theming-system)
- [Components](#components)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)
- [Advanced Usage](#advanced-usage)

---

## Overview

This boilerplate provides a complete design system infrastructure that:

- ✅ **Syncs with Figma**: Automatically processes Figma variables and text styles
- ✅ **Type-Safe**: Full TypeScript support with token validation
- ✅ **Theme-Aware**: Built-in light/dark theme system
- ✅ **Tailwind Integration**: All tokens available as Tailwind classes
- ✅ **Semantic Layer**: Extracts semantic tokens from Figma's primitive values
- ✅ **Production Ready**: Includes validation, error handling, and best practices

### What Are Design Tokens?

Design tokens are the visual design atoms of your design system. They represent:
- **Colors**: Primary, neutral, surface, info, success, warning, danger
- **Spacing**: Consistent spacing scale (0-96px with fractional values)
- **Typography**: Font sizes, weights, line heights, letter spacing
- **Border Radius**: Consistent border radius values

Instead of hardcoding values like `#ff6b35` or `24px`, you use semantic tokens like `primary-moderate` or `spacing-6`, making your design system maintainable and consistent.

---

## Architecture

### Project Structure

```
NexusPrototypes/
├── design-tokens/              # Design tokens (source of truth)
│   ├── tokens.json             # Main token file (all tokens - source of truth)
│   ├── typography.json         # Typography tokens (detailed reference)
│   └── themes/                 # Theme-specific overrides
│       ├── dark.json           # Dark theme tokens
│       └── light.json         # Light theme tokens
│
├── lib/                        # Utilities and helpers
│   ├── tokens/                 # Token access utilities
│   │   ├── index.ts           # Token getters
│   │   └── transformers.ts    # Token transformers
│   ├── theme/                  # Theme system
│   │   ├── provider.tsx      # Theme context provider
│   │   └── hooks.ts          # useTheme hook
│   ├── typography.ts          # Typography utilities
│   └── utils.ts               # General utilities (cn, etc.)
│
├── components/                 # React components
│   ├── Button.tsx             # Example button component
│   └── Typography.tsx         # Typography component
│
├── scripts/                    # Build and sync scripts
│   ├── process-figma-tokens.js      # Process Figma color/spacing variables
│   ├── process-typography-tokens.js # Process Figma text styles
│   ├── sync-figma-tokens.js         # Sync from Figma API (extendable)
│   └── validate-tokens.js           # Validate token structure
│
├── app/                       # Next.js app directory
│   ├── globals.css            # Global styles and CSS variables
│   ├── layout.tsx             # Root layout with ThemeProvider
│   └── page.tsx               # Example page
│
├── tailwind.config.ts         # Tailwind configuration
├── postcss.config.js          # PostCSS configuration
└── package.json               # Dependencies and scripts
```

### How It Works

1. **Figma Export**: Export your design tokens from Figma (variables and text styles)
2. **Processing**: Run scripts to extract semantic tokens and resolve references
3. **Token Files**: Tokens are stored in JSON files in `design-tokens/`
4. **Tailwind Config**: Tokens are imported into Tailwind config
5. **Usage**: Use tokens as Tailwind classes in your components

---

## Getting Started (Beginner Guide)

### Prerequisites

- Node.js 18+ installed
- Basic knowledge of React and TypeScript
- A Figma account with design tokens/variables set up

### Step 1: Install Dependencies

```bash
npm install
```

This installs:
- Next.js (React framework)
- Tailwind CSS (utility-first CSS)
- TypeScript (type safety)
- Other utilities

### Step 2: Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the boilerplate in action.

### Step 3: Explore the Example

Visit the homepage to see:
- Example components using design tokens
- Typography examples
- Color token demonstrations
- Token structure overview

### Step 4: Understand Token Structure

Open `design-tokens/tokens.json` to see all available tokens:

```json
{
  "colors": {
    "base": { ... },        // Primitive colors (Zinc, Orange, etc.)
    "semantic": { ... }     // Semantic colors (Primary, Neutral, etc.)
  },
  "spacing": { ... },      // Spacing scale
  "typography": { ... },   // Typography tokens
  "borderRadius": { ... }  // Border radius values
}
```

---

## Using Design Tokens

### Colors

#### Base Colors (Primitives)

Base colors are the raw color values from Tailwind:

```tsx
// Using base colors
<div className="bg-zinc-900 text-zinc-100">
  Content
</div>
```

Available base colors: `zinc`, `orange`, `blue`, `green`, `yellow`, `red`, `violet`, `teal`

#### Semantic Colors

Semantic colors are design system colors with meaning:

```tsx
// Primary colors
<div className="bg-primary-moderate text-white">
  Primary button
</div>

// Neutral colors
<p className="text-neutral-strong">Strong text</p>
<p className="text-neutral-moderate">Moderate text</p>
<p className="text-neutral-subdued">Subdued text</p>

// Surface colors
<div className="bg-surface-base">Base surface</div>
<div className="bg-surface-low">Low surface</div>
<div className="bg-surface-mid">Mid surface</div>
<div className="bg-surface-high">High surface</div>

// Translucent surfaces
<div className="bg-surface-translucent-low">Low opacity</div>
<div className="bg-surface-translucent-mid">Mid opacity</div>
<div className="bg-surface-translucent-high">High opacity</div>

// Status colors
<div className="bg-info-moderate">Info message</div>
<div className="bg-success-moderate">Success message</div>
<div className="bg-warning-moderate">Warning message</div>
<div className="bg-danger-moderate">Error message</div>

// Stroke colors
<div className="border border-stroke-neutral-translucent-weak">Weak border</div>
<div className="border border-stroke-neutral-translucent-subdued">Subdued border</div>
```

**Color Variants:**
- `weak`: Darker/more subtle
- `subdued`: Medium intensity
- `moderate`: Standard intensity (most common)
- `strong`: Lighter/more prominent

### Spacing

Use spacing tokens for consistent spacing:

```tsx
// Padding
<div className="p-4">Padding 16px</div>
<div className="px-6 py-4">Padding X: 24px, Y: 16px</div>

// Margin
<div className="m-6">Margin 24px</div>
<div className="mt-8 mb-4">Margin top: 32px, bottom: 16px</div>

// Gap
<div className="flex gap-2">Gap 8px</div>
<div className="grid gap-4">Gap 16px</div>

// Fractional spacing
<div className="p-0.5">Padding 2px</div>
<div className="p-1.5">Padding 6px</div>
<div className="p-2.5">Padding 10px</div>
<div className="p-3.5">Padding 14px</div>
```

**Available Spacing Values:**
- `0`, `0.5` (2px), `1` (4px), `1.5` (6px), `2` (8px), `2.5` (10px)
- `3` (12px), `3.5` (14px), `4` (16px), `5` (20px), `6` (24px)
- `7` (28px), `8` (32px), `9` (36px), `10` (40px), `11` (44px)
- `12` (48px), `14` (56px), `16` (64px), `20` (80px), `24` (96px)
- And more up to `96` (384px)

### Typography

#### Using the Typography Component

The easiest way to use typography:

```tsx
import { Typography } from '@/components/Typography'

// Headings
<Typography variant="heading-2xl" as="h1">Heading 2XL</Typography>
<Typography variant="heading-xl" as="h2">Heading XL</Typography>
<Typography variant="heading-lg" as="h3">Heading LG</Typography>
<Typography variant="heading-md" as="h4">Heading MD</Typography>
<Typography variant="heading-sm" as="h5">Heading SM</Typography>
<Typography variant="heading-xs" as="h6">Heading XS</Typography>

// Titles (uppercase, semibold)
<Typography variant="title-md">TITLE TEXT</Typography>
<Typography variant="title-sm">SMALLER TITLE</Typography>
<Typography variant="title-xs">TINY TITLE</Typography>

// Body text
<Typography variant="body-xxl-semibold">Large body semibold</Typography>
<Typography variant="body-xxl">Large body normal</Typography>
<Typography variant="body-xl-semibold">XL body semibold</Typography>
<Typography variant="body-xl">XL body normal</Typography>
<Typography variant="body-lg-semibold">LG body semibold</Typography>
<Typography variant="body-lg">LG body normal</Typography>
<Typography variant="body-md-semibold">MD body semibold</Typography>
<Typography variant="body-md">MD body normal</Typography>
<Typography variant="body-sm-semibold">SM body semibold</Typography>
<Typography variant="body-sm">SM body normal</Typography>
```

#### Using Tailwind Classes Directly

```tsx
// Headings (automatically semibold)
<h1 className="text-heading-xl font-semibold">Heading</h1>

// Titles (automatically semibold and uppercase)
<p className="text-title-md font-semibold uppercase">Title</p>

// Body text
<p className="text-body-lg font-semibold">Body semibold</p>
<p className="text-body-lg font-normal">Body normal</p>
```

**Typography Variants:**
- **Headings**: `heading-2xl`, `heading-xl`, `heading-lg`, `heading-md`, `heading-sm`, `heading-xs`
- **Titles**: `title-md`, `title-sm`, `title-xs` (all uppercase)
- **Body**: `body-xxl`, `body-xl`, `body-lg`, `body-md`, `body-sm` (with `-semibold` variants)

### Border Radius

```tsx
<div className="rounded-none">No radius</div>
<div className="rounded-sm">Small radius (2px)</div>
<div className="rounded-base">Base radius (4px)</div>
<div className="rounded-md">Medium radius (6px)</div>
<div className="rounded-lg">Large radius (8px)</div>
<div className="rounded-xl">XL radius (12px)</div>
<div className="rounded-2xl">2XL radius (16px)</div>
<div className="rounded-3xl">3XL radius (24px)</div>
<div className="rounded-full">Full circle</div>
```

### Complete Example

```tsx
import { Typography } from '@/components/Typography'
import { Button } from '@/components/Button'

export function Card() {
  return (
    <div className="bg-surface-base p-6 rounded-lg border border-stroke-neutral-translucent-weak">
      <Typography variant="heading-md" as="h3" className="mb-4">
        Card Title
      </Typography>
      <Typography variant="body-md" className="text-neutral-moderate mb-6">
        Card description text goes here.
      </Typography>
      <div className="flex gap-4">
        <Button variant="primary" size="md">
          Primary Action
        </Button>
        <Button variant="secondary" size="md">
          Secondary Action
        </Button>
      </div>
    </div>
  )
}
```

---

## Updating Tokens from Figma

### Overview

The system includes scripts to process Figma exports and update your tokens automatically. There are two main processes:

1. **Color & Spacing Tokens**: Process Figma variables
2. **Typography Tokens**: Process Figma text styles

### Step 1: Export from Figma

#### Exporting Variables (Colors & Spacing)

1. In Figma, go to your design file
2. Open the Variables panel
3. Export your variables as JSON
4. You should have files like:
   - `Primitives - Colours.Value.tokens.json`
   - `Elements - Colours.Dark theme.tokens.json`
   - `Elements - Colours.Light theme.tokens.json`
   - `Primitives - Numbers.Mode 1.tokens.json`

#### Exporting Text Styles (Typography)

1. In Figma, select your text styles
2. Use a plugin like "Figma Tokens" or export manually
3. Export as JSON (e.g., `textStyles.json`)

### Step 2: Process Color & Spacing Tokens

1. **Update the script** (if needed):
   - Open `scripts/process-figma-tokens.js`
   - Update the primitives and theme data with your exported values
   - The script already includes the structure - just update the values

2. **Run the script**:
   ```bash
   npm run tokens:process
   ```

This will:
- Extract semantic tokens from Dark and Light themes
- Resolve all color references (e.g., `{Neutral.950}` → `#0f0f10`)
- Update `design-tokens/tokens.json`
- Update theme-specific token files

### Step 3: Process Typography Tokens

1. **Place your export file**:
   - Save your `textStyles.json` to `~/Downloads/textStyles.json`
   - Or update the path in `scripts/process-typography-tokens.js`

2. **Run the script**:
   ```bash
   npm run tokens:typography
   ```

This will:
- Parse all text styles from Figma
- Extract font sizes, weights, letter spacing, and text transforms
- Organize by category (Heading, Title, Body)
- Update `design-tokens/tokens.json` and `design-tokens/typography.json`

### Step 4: Validate Tokens

After processing, always validate:

```bash
npm run tokens:validate
```

This checks:
- Required token categories exist
- Token structure is correct
- No missing values

### Step 5: Restart Development Server

After updating tokens:

```bash
# Stop the dev server (Ctrl+C)
npm run dev
```

Tailwind will pick up the new token values automatically.

### Customizing the Processing Scripts

#### Updating Color Primitives

Edit `scripts/process-figma-tokens.js`:

```javascript
const primitives = {
  Zinc: {
    50: "#fafafa",
    100: "#f4f4f5",
    // ... update with your values
  },
  // ... other colors
}
```

#### Updating Theme Data

Update the `darkTheme` and `lightTheme` objects in the script with your Figma export values.

#### Changing Typography Export Path

Edit `scripts/process-typography-tokens.js`:

```javascript
const textStylesData = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../path/to/your/textStyles.json'), 'utf8')
)
```

### Automated Sync (Advanced)

For automated syncing from Figma API, extend `scripts/sync-figma-tokens.js`:

1. Get a Figma API token from your account settings
2. Update the script with your file key and token
3. Run: `npm run tokens:sync`

---

## Theming System

### Overview

The boilerplate includes a theme system that supports:
- **Dark theme** (default)
- **Light theme**
- **Auto theme** (follows system preference)

### Using Themes

#### In Components

```tsx
import { useTheme } from '@/lib/theme/hooks'

function MyComponent() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  
  return (
    <div>
      <p>Current theme: {theme}</p>
      <p>Resolved theme: {resolvedTheme}</p>
      
      <button onClick={() => setTheme('dark')}>
        Dark
      </button>
      <button onClick={() => setTheme('light')}>
        Light
      </button>
      <button onClick={() => setTheme('auto')}>
        Auto
      </button>
    </div>
  )
}
```

#### Theme-Aware Styling

The theme system uses CSS variables that automatically update:

```tsx
// These automatically adapt to the current theme
<div className="bg-surface-base text-neutral-strong">
  Content
</div>
```

#### Custom Theme Values

Edit `design-tokens/themes/dark.json` and `design-tokens/themes/light.json` to customize theme-specific values.

---

## Components

### Button Component

Example button component using design tokens:

```tsx
import { Button } from '@/components/Button'

<Button variant="primary" size="md">
  Click me
</Button>

// Variants: primary, secondary, tertiary
// Sizes: sm, md, lg
```

### Typography Component

See [Typography section](#typography) above for usage.

### Creating Your Own Components

```tsx
import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        'bg-surface-base',
        'p-6',
        'rounded-lg',
        'border border-stroke-neutral-translucent-weak',
        className
      )}
    >
      {children}
    </div>
  )
}
```

---

## Best Practices

### 1. Always Use Semantic Tokens

❌ **Don't:**
```tsx
<div className="bg-[#0f0f10] text-[#f4f4f5]">
```

✅ **Do:**
```tsx
<div className="bg-surface-base text-neutral-strong">
```

### 2. Use the Typography Component

❌ **Don't:**
```tsx
<h1 className="text-[30px] font-semibold leading-[1.25]">
```

✅ **Do:**
```tsx
<Typography variant="heading-md" as="h1">
```

### 3. Use Spacing Tokens

❌ **Don't:**
```tsx
<div className="p-[16px] m-[24px]">
```

✅ **Do:**
```tsx
<div className="p-4 m-6">
```

### 4. Combine with cn() Utility

```tsx
import { cn } from '@/lib/utils'

<div className={cn(
  'base-classes',
  condition && 'conditional-classes',
  className // Allow overrides
)}>
```

### 5. Validate After Updates

Always run validation after updating tokens:

```bash
npm run tokens:validate
```

### 6. Keep Tokens in Sync

- Update tokens regularly from Figma
- Document any manual token additions
- Use version control for token files

---

## Troubleshooting

### Tokens Not Updating

**Problem**: Changes to tokens.json aren't reflected in the app.

**Solution**:
1. Restart the dev server
2. Clear Next.js cache: `rm -rf .next`
3. Check `tailwind.config.ts` imports the correct file

### TypeScript Errors

**Problem**: Type errors when using tokens.

**Solution**:
1. Check `tokens.json` structure matches expected format
2. Run `npm run tokens:validate`
3. Restart TypeScript server in your IDE

### Tailwind Classes Not Working

**Problem**: Tailwind classes like `bg-primary-moderate` don't apply.

**Solution**:
1. Check `tailwind.config.ts` includes the token
2. Verify the token exists in `tokens.json`
3. Check file paths in `content` array in `tailwind.config.ts`
4. Restart dev server

### Theme Not Switching

**Problem**: Theme doesn't change when calling `setTheme()`.

**Solution**:
1. Ensure `ThemeProvider` wraps your app in `app/layout.tsx`
2. Check CSS variables are defined in `app/globals.css`
3. Verify `data-theme` attribute is set on the root element

### Script Errors

**Problem**: Token processing scripts fail.

**Solution**:
1. Check file paths in scripts are correct
2. Verify JSON export format matches expected structure
3. Check Node.js version (18+ required)
4. Review script console output for specific errors

---

## Advanced Usage

### Accessing Tokens Programmatically

```tsx
import tokens from '@/design-tokens/tokens.json'

const primaryColor = tokens.colors.semantic.primary.moderate
const spacing = tokens.spacing['6']
```

### Custom Token Transformers

Extend `lib/tokens/transformers.ts` to create custom token transformations.

### Extending the Theme System

1. Add new theme files in `design-tokens/themes/`
2. Update `lib/theme/provider.tsx` to handle new themes
3. Add CSS variables in `app/globals.css`

### Creating Token Utilities

```tsx
// lib/tokens/helpers.ts
import tokens from '@/design-tokens/tokens.json'

export function getColor(path: string) {
  const parts = path.split('.')
  let value = tokens.colors
  for (const part of parts) {
    value = value[part]
  }
  return value
}
```

---

## Scripts Reference

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run tokens:process` | Process Figma color/spacing variables |
| `npm run tokens:typography` | Process Figma text styles |
| `npm run tokens:sync` | Sync tokens from Figma API (extendable) |
| `npm run tokens:validate` | Validate token structure |

---

## Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Figma Variables API](https://www.figma.com/developers/api#variables)
- [Design Tokens Community Group](https://www.designtokens.org/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## Support

For issues or questions:
1. Check the [Troubleshooting](#troubleshooting) section
2. Review script console output
3. Validate tokens: `npm run tokens:validate`
4. Check token structure matches examples in this README

---

**Happy coding! 🎨**
