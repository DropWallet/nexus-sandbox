'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

const LOGO_MAX = 48

/** Degrees of rotation per pixel of vertical scroll (tune for feel). */
const SCROLL_TO_DEG = 0.22

/**
 * Vision page header — centered logo only.
 * Logo shrinks to 32×32 after scroll; rotation angle increases with scroll distance.
 */
export function VisionPageNav() {
  const [scrollY, setScrollY] = useState(0)
  const [compact, setCompact] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrollY(y)
      setCompact(y > 8)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const rotationDeg = scrollY * SCROLL_TO_DEG

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface-base" role="banner">
      <div className="flex w-full items-center justify-center px-[var(--spacing-10)] py-[var(--spacing-5)]">
        <a
          href="/"
          className="inline-flex shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-strong focus-visible:ring-offset-2 focus-visible:ring-offset-surface-base"
          aria-label="Nexus Mods home"
        >
          <span
            className="inline-flex will-change-transform"
            style={{ transform: `rotate(${rotationDeg}deg)` }}
            aria-hidden
          >
            <Image
              src="/vision/logo-diagram.svg"
              alt=""
              width={LOGO_MAX}
              height={LOGO_MAX}
              className={cn(
                'pointer-events-none object-contain select-none transition-[width,height] duration-200 ease-out',
                compact ? 'h-8 w-8' : 'h-12 w-12'
              )}
              priority
            />
          </span>
        </a>
      </div>
    </header>
  )
}
