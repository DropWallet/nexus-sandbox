import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'secondary-filled' | 'tertiary'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

/**
 * Example Button component using design tokens
 * Demonstrates how to use Tailwind classes mapped from Figma tokens
 */
export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        // Base styles
        'rounded-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-moderate focus:ring-offset-2',
        // Variant styles using design tokens
        {
          'bg-primary-moderate text-neutral-inverted hover:bg-primary-strong': variant === 'primary',
          'bg-surface-translucent-mid border border-stroke-neutral-translucent-subdued text-neutral-strong hover:bg-surface-translucent-low': variant === 'secondary',
          'bg-[var(--color-button-secondary-filled)] border border-[var(--color-button-secondary-filled-border)] text-[var(--color-button-secondary-filled-text)] hover:bg-[var(--color-button-secondary-filled-hover)]': variant === 'secondary-filled',
          'bg-transparent text-neutral-strong hover:bg-surface-translucent-low': variant === 'tertiary',
        },
        // Size styles using design tokens
        {
          'px-3 py-1 text-sm': size === 'sm',
          'px-4 py-2 text-base': size === 'md',
          'px-6 py-3 text-lg': size === 'lg',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

