import { cn } from './utils'

/**
 * Typography utility functions for applying complete text styles
 * These include fontSize, fontWeight, letterSpacing, and textTransform
 */

type HeadingSize = '2xl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs'
type TitleSize = 'md' | 'sm' | 'xs'
type BodySize = 'xxl' | 'xl' | 'lg' | 'md' | 'sm'
type BodyVariant = 'normal' | 'semibold' | 'link-primary' | 'link-secondary'

/**
 * Get heading classes with all typography properties
 */
export function heading(size: HeadingSize, className?: string) {
  return cn(
    `text-heading-${size}`,
    'font-semibold', // All headings are semibold (600)
    className
  )
}

/**
 * Get title classes with all typography properties
 */
export function title(size: TitleSize, className?: string) {
  return cn(
    `text-title-${size}`,
    'font-semibold uppercase', // All titles are semibold and uppercase
    className
  )
}

/**
 * Get body classes with all typography properties
 */
export function body(size: BodySize, variant: BodyVariant = 'normal', className?: string) {
  const variantMap: Record<BodyVariant, string> = {
    normal: 'font-normal',
    semibold: 'font-semibold',
    'link-primary': 'font-normal',
    'link-secondary': 'font-normal',
  }

  const sizeKey = variant === 'normal' || variant === 'semibold' 
    ? `body-${size}${variant === 'semibold' ? '-semibold' : ''}`
    : `body-${size}`

  return cn(
    `text-${sizeKey}`,
    variantMap[variant],
    className
  )
}

/**
 * Typography component props
 */
export interface TypographyProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div'
  variant?: 
    | `heading-${HeadingSize}`
    | `title-${TitleSize}`
    | `body-${BodySize}${BodyVariant extends 'normal' ? '' : `-${BodyVariant}`}`
  className?: string
  children: React.ReactNode
}

