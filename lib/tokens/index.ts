import tokens from '../../design-tokens/tokens.json'

/**
 * Design tokens from Figma
 * These tokens are synced with your Figma design system
 */
export const designTokens = tokens

/**
 * Get a color token by path
 * Example: getColorToken('semantic.primary.moderate')
 */
export function getColorToken(path: string): string {
  const parts = path.split('.')
  let value: any = tokens.colors
  
  for (const part of parts) {
    value = value[part]
    if (value === undefined) {
      throw new Error(`Color token not found: ${path}`)
    }
  }
  
  return value
}

/**
 * Get a spacing token
 */
export function getSpacingToken(key: string): string {
  const spacing = tokens.spacing as Record<string, string>
  if (!spacing[key]) {
    throw new Error(`Spacing token not found: ${key}`)
  }
  return spacing[key]
}

/**
 * Get a typography token
 */
export function getTypographyToken(category: 'fonts' | 'sizes', key: string) {
  const typography = tokens.typography[category] as Record<string, any>
  if (!typography[key]) {
    throw new Error(`Typography token not found: ${category}.${key}`)
  }
  return typography[key]
}

