'use client'

import { useState, useEffect } from 'react'
import { Typography } from '@/components/Typography'

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

const CHEVRON = (
  <span className="shrink-0 text-neutral-moderate opacity-70 px-1.5 [&>svg]:w-[5px] [&>svg]:h-2" aria-hidden>
    <svg width="5" height="8" viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 7.06L3.05333 4L0 0.94L0.94 0L4.94 4L0.94 8L0 7.06Z" fill="currentColor" fillOpacity={0.7} />
    </svg>
  </span>
)

function BreadcrumbSegment({ item }: { item: BreadcrumbItem }) {
  return item.href ? (
    <a href={item.href} className="text-neutral-moderate hover:text-neutral-strong transition-colors">
      <Typography variant="body-md" as="span">
        {item.label}
      </Typography>
    </a>
  ) : (
    <Typography variant="body-md" className="text-neutral-moderate">
      {item.label}
    </Typography>
  )
}

/**
 * Renders a navigation breadcrumb trail with chevron separators.
 * On mobile (≤768px) collapses to "First > … > Last" to avoid wrapping.
 */
export function Breadcrumb({ items, className }: BreadcrumbProps) {
  const [collapse, setCollapse] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    const update = () => setCollapse(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  const showCollapsed = collapse && items.length > 2
  const displayItems = showCollapsed ? [items[0], items[items.length - 1]] : items

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <div className="flex gap-0.5 items-center flex-nowrap min-w-0">
        {showCollapsed ? (
          <>
            <span className="flex items-center gap-0.5 shrink-0 min-w-0 overflow-hidden">
              <span className="truncate">
                <BreadcrumbSegment item={items[0]} />
              </span>
            </span>
            {CHEVRON}
            <span className="shrink-0 text-neutral-moderate" aria-hidden>
              <Typography variant="body-md" as="span">…</Typography>
            </span>
            {CHEVRON}
            <span className="flex items-center gap-0.5 shrink-0 min-w-0 overflow-hidden">
              <span className="truncate">
                <BreadcrumbSegment item={items[items.length - 1]} />
              </span>
            </span>
          </>
        ) : (
          items.map((item, index) => (
            <span key={index} className="flex items-center gap-0.5 shrink-0">
              {index > 0 && CHEVRON}
              <BreadcrumbSegment item={item} />
            </span>
          ))
        )}
      </div>
    </nav>
  )
}
