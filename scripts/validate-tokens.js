#!/usr/bin/env node

/**
 * Script to validate design tokens structure
 * 
 * Usage:
 *   npm run tokens:validate
 */

const fs = require('fs')
const path = require('path')

const TOKENS_FILE = path.join(__dirname, '../design-tokens/tokens.json')

function validateTokens() {
  try {
    if (!fs.existsSync(TOKENS_FILE)) {
      throw new Error('tokens.json not found')
    }

    const tokens = JSON.parse(fs.readFileSync(TOKENS_FILE, 'utf8'))

    // Required categories
    const required = ['colors', 'spacing', 'typography', 'borderRadius']
    for (const category of required) {
      if (!tokens[category]) {
        throw new Error(`Missing required category: ${category}`)
      }
    }

    // Validate colors structure
    if (!tokens.colors.semantic) {
      throw new Error('Missing colors.semantic')
    }

    // Validate typography structure
    if (!tokens.typography.fonts || !tokens.typography.sizes) {
      throw new Error('Missing typography.fonts or typography.sizes')
    }

    console.log('✅ Token validation passed!')
    return true
  } catch (error) {
    console.error('❌ Token validation failed:', error.message)
    process.exit(1)
  }
}

if (require.main === module) {
  validateTokens()
}

module.exports = { validateTokens }

