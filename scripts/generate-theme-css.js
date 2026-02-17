#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const tokens = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../design-tokens/tokens.json'), 'utf8')
)

let themeCss = '@theme {\n'
themeCss += '  /* Semantic Colors - Mapped to Tailwind Default Primitives */\n'
themeCss += '  /* All base primitives come from Tailwind defaults via @import "tailwindcss" */\n\n'

// Semantic colors - mapped to Tailwind primitives
const semanticColors = tokens.colors.semantic

// Primary (Orange)
themeCss += '  /* Primary (Orange) */\n'
themeCss += `  --color-primary-weak: var(--color-orange-700);\n`
themeCss += `  --color-primary-subdued: var(--color-orange-500);\n`
themeCss += `  --color-primary-moderate: var(--color-orange-400);\n`
themeCss += `  --color-primary-strong: var(--color-orange-300);\n\n`

// Neutral (Zinc)
themeCss += '  /* Neutral (Zinc) */\n'
themeCss += `  --color-neutral-600: var(--color-zinc-600);\n`
for (const [variant, value] of Object.entries(semanticColors.neutral)) {
  if (variant === '600') continue
  if (variant === 'inverted') {
    themeCss += `  --color-neutral-inverted: var(--color-zinc-950);\n`
  } else {
    // Map to zinc shades: weak=500, subdued=400, moderate=300, strong=100
    const zincMap = {
      weak: '500',
      subdued: '400',
      moderate: '300',
      strong: '100',
    }
    if (zincMap[variant]) {
      themeCss += `  --color-neutral-${variant}: var(--color-zinc-${zincMap[variant]});\n`
    } else {
      themeCss += `  --color-neutral-${variant}: ${value};\n`
    }
  }
}
themeCss += '\n'

// Surface (Zinc)
themeCss += '  /* Surface (Zinc dark shades) */\n'
themeCss += `  --color-surface-base: var(--color-zinc-950);\n`
themeCss += `  --color-surface-low: var(--color-zinc-900);\n`
themeCss += `  --color-surface-mid: var(--color-zinc-800);\n`
themeCss += `  --color-surface-high: var(--color-zinc-700);\n`
themeCss += `  --color-surface-translucent-low: ${semanticColors.surface.translucent.low};\n`
themeCss += `  --color-surface-translucent-mid: ${semanticColors.surface.translucent.mid};\n`
themeCss += `  --color-surface-translucent-high: ${semanticColors.surface.translucent.high};\n\n`

// Info (Blue)
themeCss += '  /* Info (Blue) */\n'
themeCss += `  --color-info-weak: var(--color-blue-700);\n`
themeCss += `  --color-info-subdued: var(--color-blue-500);\n`
themeCss += `  --color-info-moderate: var(--color-blue-400);\n`
themeCss += `  --color-info-strong: var(--color-blue-300);\n\n`

// Success (Green)
themeCss += '  /* Success (Green) */\n'
themeCss += `  --color-success-weak: var(--color-green-800);\n`
themeCss += `  --color-success-subdued: var(--color-green-600);\n`
themeCss += `  --color-success-moderate: var(--color-green-500);\n`
themeCss += `  --color-success-strong: var(--color-green-300);\n\n`

// Warning (Yellow)
themeCss += '  /* Warning (Yellow) */\n'
themeCss += `  --color-warning-weak: var(--color-yellow-600);\n`
themeCss += `  --color-warning-subdued: var(--color-yellow-400);\n`
themeCss += `  --color-warning-moderate: var(--color-yellow-300);\n`
themeCss += `  --color-warning-strong: var(--color-yellow-200);\n\n`

// Danger (Red)
themeCss += '  /* Danger (Red) */\n'
themeCss += `  --color-danger-weak: var(--color-red-800);\n`
themeCss += `  --color-danger-subdued: var(--color-red-600);\n`
themeCss += `  --color-danger-moderate: var(--color-red-500);\n`
themeCss += `  --color-danger-strong: var(--color-red-400);\n\n`

// Stroke
themeCss += '  /* Stroke */\n'
for (const [variant, value] of Object.entries(semanticColors.stroke)) {
  themeCss += `  --color-stroke-${variant}: ${value};\n`
}
themeCss += '\n'

// Spacing
themeCss += '  /* Spacing */\n'
for (const [key, value] of Object.entries(tokens.spacing)) {
  const spacingKey = key.replace('.', '-')
  themeCss += `  --spacing-${spacingKey}: ${value};\n`
}
themeCss += '\n'

// Border Radius
themeCss += '  /* Border Radius */\n'
for (const [key, value] of Object.entries(tokens.borderRadius)) {
  themeCss += `  --radius-${key}: ${value};\n`
}
themeCss += '\n'

// Font Family
themeCss += '  /* Font Family */\n'
themeCss += `  --font-family-sans: ${tokens.typography.fonts.sans.join(', ')};\n\n`

// Font Sizes
themeCss += '  /* Font Sizes */\n'
for (const [key, value] of Object.entries(tokens.typography.sizes)) {
  if (Array.isArray(value)) {
    const [fontSize, options] = value
    themeCss += `  --font-size-${key}: ${fontSize}`
    if (options) {
      if (options.lineHeight) {
        themeCss += ` / ${options.lineHeight}`
      }
      if (options.letterSpacing) {
        themeCss += `;\n  --letter-spacing-${key}: ${options.letterSpacing}`
      }
    }
    themeCss += `;\n`
  }
}
themeCss += '\n'

// Size tokens
themeCss += '  /* Size tokens for icons and components */\n'
themeCss += '  --size-size-3: 12px;\n'
themeCss += '  --size-size-4: 16px;\n'
themeCss += '  --size-size-5: 20px;\n'
themeCss += '  --size-size-6: 24px;\n'
themeCss += '  --size-size-8: 32px;\n'
themeCss += '  --size-size-12: 48px;\n\n'

// Translucent colors
themeCss += '  /* Translucent colors for navigation */\n'
themeCss += '  --translucent-dark-400: rgba(0, 0, 0, 0.4);\n'
themeCss += '  --translucent-light-50: rgba(255, 255, 255, 0.05);\n'
themeCss += '  --translucent-light-100: rgba(255, 255, 255, 0.1);\n'
themeCss += '  --translucent-light-200: rgba(255, 255, 255, 0.2);\n'

themeCss += '}\n'

// Write to a file for reference (not used directly, but helpful for debugging)
fs.writeFileSync(
  path.join(__dirname, '../app/theme-generated.css'),
  themeCss
)

console.log('✅ Theme CSS generated successfully!')
console.log('📝 Semantic colors now reference Tailwind default primitives')
console.log('📄 Output written to app/theme-generated.css (for reference)')
console.log('\nNote: Update app/globals.css manually or use this as a reference.')
