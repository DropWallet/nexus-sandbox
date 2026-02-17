import type { Config } from 'tailwindcss'

/**
 * Tailwind CSS v4 Configuration
 * 
 * In Tailwind v4, theme configuration is done via CSS @theme directive in globals.css
 * This file only needs to specify content paths for class scanning
 */
const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
}

export default config
