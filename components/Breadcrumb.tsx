'use client'

import { Typography } from '@/components/Typography'

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

/**
 * Renders a navigation breadcrumb trail with chevron separators.
 * Used on mod and other pages for hierarchy (e.g. Games > Stardew Valley > Mods > Mod name).
 */
export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <div className="flex gap-0.5 items-center flex-wrap">
        {items.map((item, index) => (
          <span key={index} className="flex items-center gap-0.5">
            {index > 0 && (
              <span className="shrink-0 text-neutral-moderate opacity-70 px-1.5 [&>svg]:w-[5px] [&>svg]:h-2" aria-hidden>
                <svg width="5" height="8" viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 7.06L3.05333 4L0 0.94L0.94 0L4.94 4L0.94 8L0 7.06Z" fill="currentColor" fillOpacity={0.7} />
                </svg>
              </span>
            )}
            {item.href ? (
              <a
                href={item.href}
                className="text-neutral-moderate hover:text-neutral-strong transition-colors"
              >
                <Typography variant="body-md" as="span">
                  {item.label}
                </Typography>
              </a>
            ) : (
              <Typography variant="body-md" className="text-neutral-moderate">
                {item.label}
              </Typography>
            )}
          </span>
        ))}
      </div>
    </nav>
  )
}
