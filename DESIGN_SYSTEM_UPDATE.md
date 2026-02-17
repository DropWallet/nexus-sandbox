# Design System Update: Using Tailwind Default Primitives

## Summary

The design system has been updated to use **only Tailwind CSS default primitives** for base colors, with semantic colors mapped to reference these defaults.

## What Changed

### 1. **Removed Custom Base Colors**
   - All custom base color definitions (zinc, orange, blue, green, yellow, red, etc.) have been removed from the `@theme` block
   - Tailwind's default color palettes are now available via `@import "tailwindcss"`

### 2. **Semantic Colors Now Reference Tailwind Defaults**
   - Semantic colors use `var(--color-*-*)` to reference Tailwind's built-in colors
   - Example: `--color-primary-moderate: var(--color-orange-400);`

### 3. **Color Mapping Structure**
   - Added a `colors.mapping` section in `tokens.json` that documents which Tailwind primitives map to which semantic tokens
   - This provides a clear reference for maintainability

## Color Mappings

| Semantic Token | Tailwind Default |
|----------------|-----------------|
| `primary-weak` | `orange-700` |
| `primary-subdued` | `orange-500` |
| `primary-moderate` | `orange-400` |
| `primary-strong` | `orange-300` |
| `neutral-weak` | `zinc-500` |
| `neutral-subdued` | `zinc-400` |
| `neutral-moderate` | `zinc-300` |
| `neutral-strong` | `zinc-100` |
| `neutral-inverted` | `zinc-950` |
| `surface-base` | `zinc-950` |
| `surface-low` | `zinc-900` |
| `surface-mid` | `zinc-800` |
| `surface-high` | `zinc-700` |
| `info-*` | `blue-*` |
| `success-*` | `green-*` |
| `warning-*` | `yellow-*` |
| `danger-*` | `red-*` |

## Benefits

1. **No Duplication**: Base colors come directly from Tailwind, reducing maintenance
2. **Full Tailwind Access**: All Tailwind default colors (slate, gray, stone, etc.) are available
3. **Clear Separation**: Semantic layer clearly references primitives
4. **Future-Proof**: Updates to Tailwind automatically benefit the design system
5. **Consistency**: Ensures alignment with Tailwind's design philosophy

## Files Modified

- `app/globals.css`: Updated `@theme` block to remove base colors and map semantic colors
- `design-tokens/tokens.json`: Added `colors.mapping` section for documentation
- `scripts/generate-theme-css.js`: Updated to generate mappings instead of hardcoded values

## Usage

No changes needed in components! All existing semantic color classes continue to work:
- `bg-primary-moderate` → Uses `var(--color-orange-400)`
- `text-neutral-strong` → Uses `var(--color-zinc-100)`
- `bg-surface-base` → Uses `var(--color-zinc-950)`

## Accessing Tailwind Defaults Directly

You can now also use Tailwind's default colors directly in your components:
- `bg-orange-500`, `text-zinc-300`, `border-blue-400`, etc.
- All Tailwind color palettes are available: `slate`, `gray`, `stone`, `red`, `orange`, `amber`, `yellow`, `lime`, `green`, `emerald`, `teal`, `cyan`, `sky`, `blue`, `indigo`, `violet`, `purple`, `fuchsia`, `pink`, `rose`

## Next Steps

If you need to change semantic colors in the future:
1. Update the mapping in `tokens.json` → `colors.mapping`
2. Update the semantic values in `tokens.json` → `colors.semantic`
3. Run `npm run tokens:generate-theme-css` to regenerate the CSS (or update `globals.css` manually)

