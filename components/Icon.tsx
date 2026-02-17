'use client'

import { cn } from '@/lib/utils'
import { getIconName, type IconSize, iconSizes } from '@/lib/icons'

interface IconProps {
  /**
   * Icon name (e.g., "close", "add") or filename (e.g., "close_24px")
   * If not provided, defaults to close icon
   */
  name?: string
  /**
   * Custom icon element (ReactNode) - takes precedence over name
   */
  iconType?: React.ReactNode | null
  /**
   * Size variant - matches Figma spec
   * @default "xs"
   */
  size?: IconSize
  /**
   * Additional className
   */
  className?: string
  /**
   * Alt text for accessibility
   */
  alt?: string
}

/**
 * Icon component matching Figma design system spec
 * 
 * Supports:
 * - Size variants: xs (12px), sm (16px), md (20px), lg (24px), xl (32px), 2xl (48px)
 * - Custom icons via iconType prop
 * - Icon names that map to SVG files in public/icons/
 * 
 * @example
 * <Icon name="close" size="lg" />
 * <Icon iconType={<CustomIcon />} size="md" />
 */
export default function Icon({
  name,
  iconType = null,
  size = 'xs',
  className,
  alt,
}: IconProps) {
  // Size mapping to design tokens
  const sizeToken = iconSizes[size]
  const containerSize = size === 'xs' ? 12 :
                       size === 'sm' ? 16 :
                       size === 'md' ? 20 :
                       size === 'lg' ? 24 :
                       size === 'xl' ? 32 : 48

  // Inner icon size based on container (matches Figma spec)
  const innerSize = size === 'xs' ? 6 :
                   size === 'sm' ? 10.667 :
                   size === 'md' ? 16.667 :
                   size === 'lg' ? 24 :
                   size === 'xl' ? 42.667 : 96

  // If custom iconType is provided, use it
  if (iconType !== null) {
    return (
      <div
        className={cn(
          'content-stretch flex items-center',
          'p-0', // spacing-none
          'relative',
          className
        )}
        style={{
          width: `var(--size-size-${sizeToken}, ${containerSize}px)`,
          height: `var(--size-size-${sizeToken}, ${containerSize}px)`,
        }}
      >
        <div 
          className="relative shrink-0" 
          style={{ 
            width: `${innerSize}px`, 
            height: `${innerSize}px` 
          }}
        >
          {iconType}
        </div>
      </div>
    )
  }

  // Determine icon filename
  const iconName = name ? getIconName(name) : 'close_24px'
  const filename = iconName.endsWith('_24px') ? iconName : `${iconName}_24px`
  const iconPath = `/icons/${filename}.svg`

  return (
    <div
      className={cn(
        'content-stretch flex items-center',
        'p-0', // spacing-none
        'relative',
        className
      )}
      style={{
        width: `var(--size-size-${sizeToken}, ${containerSize}px)`,
        height: `var(--size-size-${sizeToken}, ${containerSize}px)`,
      }}
      role="img"
      aria-label={alt || name || 'icon'}
    >
      <div
        className="relative shrink-0"
        style={{
          width: `${innerSize}px`,
          height: `${innerSize}px`,
        }}
      >
        <img
          src={iconPath}
          alt={alt || name || 'icon'}
          width={innerSize}
          height={innerSize}
          className="object-contain"
          onError={(e) => {
            // Fallback to close icon if icon not found
            if (filename !== 'close_24px') {
              e.currentTarget.src = '/icons/close_24px.svg'
            }
          }}
        />
      </div>
    </div>
  )
}
