import tokens from '../../design-tokens/tokens.json'

/**
 * Transform design tokens for different output formats
 */

/**
 * Transform tokens to CSS custom properties format
 */
export function tokensToCSSVars() {
  const cssVars: Record<string, string> = {}
  
  // Colors
  Object.entries(tokens.colors.semantic).forEach(([category, values]) => {
    Object.entries(values as Record<string, string>).forEach(([key, value]) => {
      const varName = `--color-${category}-${key.replace(/-/g, '-')}`
      cssVars[varName] = value
    })
  })
  
  // Spacing
  Object.entries(tokens.spacing).forEach(([key, value]) => {
    cssVars[`--spacing-${key}`] = value
  })
  
  return cssVars
}

/**
 * Transform tokens to Tailwind config format
 */
export function tokensToTailwindConfig() {
  return {
    colors: {
      primary: tokens.colors.semantic.primary,
      neutral: tokens.colors.semantic.neutral,
      surface: tokens.colors.semantic.surface,
      stroke: tokens.colors.semantic.stroke,
    },
    spacing: tokens.spacing,
    fontSize: tokens.typography.sizes,
    fontFamily: tokens.typography.fonts,
    borderRadius: tokens.borderRadius,
  }
}

