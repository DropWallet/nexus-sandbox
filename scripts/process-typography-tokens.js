#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

// Load text styles
const textStylesData = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../../Downloads/textStyles.json'), 'utf8')
)

// Convert letter spacing from pixels/percent to CSS format
function convertLetterSpacing(letterSpacing) {
  if (!letterSpacing) return 0
  
  if (letterSpacing.unit === 'PIXELS') {
    return `${letterSpacing.value}px`
  } else if (letterSpacing.unit === 'PERCENT') {
    return '0' // Percent letter spacing is typically 0 in CSS
  }
  return 0
}

// Convert font weight
function convertFontWeight(fontWeight) {
  const weightMap = {
    'Regular': 400,
    'Semi Bold': 600,
    'Bold': 700,
  }
  return weightMap[fontWeight] || 400
}

// Organize text styles by category
const typography = {
  fonts: {
    sans: ['Inter', 'sans-serif'],
  },
  sizes: {},
  styles: {
    heading: {},
    title: {},
    body: {},
  },
}

// Process each text style
textStylesData.textStyles.forEach((style) => {
  const [category, size, variant] = style.name.split('/')
  const fontSize = `${style.fontSize}px`
  const letterSpacing = convertLetterSpacing(style.letterSpacing)
  const fontWeight = convertFontWeight(style.fontWeight)
  
  // Calculate line height (default to 1.5 for body, 1.25 for headings)
  const lineHeight = category === 'Heading' ? 1.25 : 1.5
  
  // Create the size definition (Tailwind fontSize only supports fontSize, lineHeight, letterSpacing)
  // fontWeight and textTransform are applied via separate classes
  const sizeDef = [
    fontSize,
    {
      lineHeight: lineHeight,
      letterSpacing: letterSpacing !== '0' && letterSpacing !== 0 ? letterSpacing : undefined,
    },
  ].filter((item) => item !== undefined && item !== null)
  
  // Store metadata separately for fontWeight and textTransform
  const metadata = {
    fontWeight: fontWeight,
    textTransform: style.textCase === 'UPPER' ? 'uppercase' : undefined,
  }
  
  // Store in styles by category
  const key = `${size}${variant ? `-${variant.toLowerCase().replace(/\s+/g, '-')}` : ''}`
  const categoryKey = category.toLowerCase()
  
  if (!typography.styles[categoryKey]) {
    typography.styles[categoryKey] = {}
  }
  
  typography.styles[categoryKey][key] = sizeDef
  
  // Also add to sizes for Tailwind (using size as key)
  if (!typography.sizes[key]) {
    typography.sizes[key] = sizeDef
  }
  
  // Store metadata for each style
  if (!typography.metadata) {
    typography.metadata = {}
  }
  typography.metadata[`${categoryKey}-${key}`] = metadata
})

// Also create simplified size mappings for common use
typography.sizes = {
  // Headings
  'heading-2xl': typography.styles.heading['2xl-semi'] || [`60px`, { lineHeight: 1.25, letterSpacing: '-1.4px' }],
  'heading-xl': typography.styles.heading['xl-semi'] || [`48px`, { lineHeight: 1.25, letterSpacing: '-1.2px' }],
  'heading-lg': typography.styles.heading['lg-semi'] || [`36px`, { lineHeight: 1.25, letterSpacing: '-0.9px' }],
  'heading-md': typography.styles.heading['md-semi'] || [`30px`, { lineHeight: 1.25 }],
  'heading-sm': typography.styles.heading['sm-semi'] || [`24px`, { lineHeight: 1.25 }],
  'heading-xs': typography.styles.heading['xs-semi'] || [`18px`, { lineHeight: 1.25 }],
  
  // Titles
  'title-md': typography.styles.title['md-semi'] || [`14px`, { lineHeight: 1.5, letterSpacing: '1.4px' }],
  'title-sm': typography.styles.title['sm-semi'] || [`12px`, { lineHeight: 1.5, letterSpacing: '1.2px' }],
  'title-xs': typography.styles.title['xs-semi'] || [`10px`, { lineHeight: 1.5, letterSpacing: '1px' }],
  
  // Body
  'body-xxl-semibold': typography.styles.body['xxl-semi-bold'] || [`22px`, { lineHeight: 1.5 }],
  'body-xxl': typography.styles.body['xxl-normal'] || [`22px`, { lineHeight: 1.5 }],
  'body-xl-semibold': typography.styles.body['xl-semi-bold'] || [`18px`, { lineHeight: 1.5 }],
  'body-xl': typography.styles.body['xl-normal'] || [`18px`, { lineHeight: 1.5 }],
  'body-lg-semibold': typography.styles.body['lg-semi-bold'] || [`16px`, { lineHeight: 1.5 }],
  'body-lg': typography.styles.body['lg-normal'] || [`16px`, { lineHeight: 1.5 }],
  'body-md-semibold': typography.styles.body['md-semi-bold'] || [`14px`, { lineHeight: 1.5 }],
  'body-md': typography.styles.body['md-normal'] || [`14px`, { lineHeight: 1.5 }],
  'body-sm-semibold': typography.styles.body['sm-semi-bold'] || [`12px`, { lineHeight: 1.375, letterSpacing: '0.3px' }],
  'body-sm': typography.styles.body['sm-normal'] || [`12px`, { lineHeight: 1.375, letterSpacing: '0.3px' }],
  
  // Legacy sizes for backward compatibility
  xs: [`12px`, { lineHeight: 1.375, letterSpacing: '0.3px' }],
  sm: [`14px`, { lineHeight: 1.5 }],
  base: [`16px`, { lineHeight: 1.5 }],
  lg: [`18px`, { lineHeight: 1.5 }],
  xl: [`30px`, { lineHeight: 1.25, letterSpacing: '-1px' }],
}

// Update tokens.json
const tokensPath = path.join(__dirname, '../design-tokens/tokens.json')
const tokens = JSON.parse(fs.readFileSync(tokensPath, 'utf8'))

tokens.typography = typography

fs.writeFileSync(tokensPath, JSON.stringify(tokens, null, 2))
console.log('✅ Typography tokens updated in tokens.json')

// Update typography.json
const typographyPath = path.join(__dirname, '../design-tokens/typography.json')
fs.writeFileSync(typographyPath, JSON.stringify(typography, null, 2))
console.log('✅ typography.json updated')

console.log('✅ Typography processing complete!')

