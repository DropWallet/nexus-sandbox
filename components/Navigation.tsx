'use client'

import { cn } from '@/lib/utils'
import { Button } from './Button'
import Icon from './Icon'
import { Typography } from './Typography'

interface NavBarItemProps {
  label: string
  className?: string
}

function NavBarItem({ label, className }: NavBarItemProps) {
  return (
    <button
      className={cn(
        'flex gap-1 items-center justify-center',
        'px-3.5 py-0 h-9',
        'relative shrink-0',
        'hover:bg-surface-translucent-low rounded-[45px]',
        'transition-colors',
        className
      )}
    >
      <Typography variant="body-md" className="text-neutral-strong">
        {label}
      </Typography>
      <Icon name="keyboardArrowDown" size="sm" />
    </button>
  )
}

interface NavigationBarProps {
  className?: string
}

export default function NavigationBar({ className }: NavigationBarProps) {
  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50',
        'bg-surface-base',
        'border-b border-stroke-neutral-translucent-weak',
        'w-full h-14',
        className
      )}
    >
      {/* Mobile layout: hamburger | centered logo + NEXUS MODS | search + notification + profile */}
      <div className="flex lg:hidden h-full items-center justify-between px-4 gap-2">
        <button
          type="button"
          className="shrink-0 p-2 -ml-2 rounded-base hover:bg-surface-translucent-low transition-colors"
          aria-label="Open menu"
        >
          <Icon name="menu" size="lg" className="text-neutral-strong" />
        </button>

        <a
          href="/"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center shrink-0"
          aria-label="Nexus Mods Home"
        >
          <img
            src="/nexus-mods-logo.svg"
            alt=""
            className="size-8 object-contain"
          />
        </a>

        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            className="p-2 hover:opacity-80 transition-opacity"
            aria-label="Search"
          >
            <Icon name="search" size="lg" className="text-neutral-strong" />
          </button>
          <button
            type="button"
            className="p-2 hover:opacity-80 transition-opacity relative"
            aria-label="Notifications"
          >
            <Icon name="notification" size="lg" className="text-neutral-strong" />
            <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-primary-moderate" aria-hidden />
          </button>
          <button
            type="button"
            className="p-2 hover:opacity-80 transition-opacity"
            aria-label="Profile"
          >
            <Icon name="account" size="lg" className="text-neutral-strong" />
          </button>
        </div>
      </div>

      {/* Desktop layout: logo, game tab, nav items, search, login/register */}
      <div className="hidden lg:flex gap-4 items-center h-full px-4">
        {/* Logo */}
        <a href="/" className="relative shrink-0 size-8 flex items-center justify-center" aria-label="Nexus Mods Home">
          <img
            src="/nexus-mods-logo.svg"
            alt="Nexus Mods"
            className="w-full h-full object-contain"
          />
        </a>

        {/* Game Tab */}
        <div className="flex h-9 items-center pr-2 py-0 rounded-base shrink-0">
          <div className="flex gap-0 h-9 items-center overflow-hidden relative shrink-0">
            <div
              className={cn(
                'bg-surface-translucent-mid',
                'border-l border-t border-b border-stroke-neutral-translucent-subdued',
                'flex gap-2 h-full items-center',
                'max-w-[144px] px-1 py-1',
                'rounded-bl-base rounded-tl-base shrink-0'
              )}
            >
              <div className="relative rounded-sm shrink-0 size-7">
                <img
                  alt="Skyrim"
                  className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-sm size-full"
                  src="/games/skyrim.png"
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><rect fill="%2322c55e" width="28" height="28"/></svg>'
                  }}
                />
              </div>
              <Typography
                variant="body-md"
                className="flex-1 min-h-px min-w-px overflow-ellipsis overflow-hidden text-neutral-strong pr-2 whitespace-nowrap"
              >
                Skyrim
              </Typography>
            </div>
            <button
              className={cn(
                'bg-surface-translucent-mid',
                'border border-stroke-neutral-translucent-subdued',
                'flex h-full items-center',
                'px-1.5 py-0',
                'rounded-br-base rounded-tr-base shrink-0',
                'hover:bg-surface-translucent-high transition-colors'
              )}
              aria-label="Close game tab"
            >
              <Icon name="close" size="sm" />
            </button>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex gap-0 h-full text-body-md items-center relative shrink-0">
          <NavBarItem label="Games" />
          <NavBarItem label="Mods" />
          <NavBarItem label="Collections" />
          <NavBarItem label="Media" />
          <NavBarItem label="Community" />
          <NavBarItem label="Support" />
        </div>

        {/* Right Side - Search and Buttons */}
        <div className="flex flex-1 gap-4 items-center justify-end min-h-px min-w-px relative shrink-0">
          <div
            className={cn(
              'bg-black/40',
              'border border-stroke-neutral-translucent-moderate',
              'flex flex-1 gap-2 h-9 items-center',
              'pl-3 pr-2 py-px',
              'rounded-base shrink-0 min-w-0'
            )}
          >
            <Icon name="search" size="lg" className="shrink-0" />
            <input
              type="text"
              placeholder="Search Skyrim"
              style={{
                fontSize: 'var(--text-body-md)',
                lineHeight: 'var(--text-body-md--line-height)',
              }}
              className={cn(
                'flex-1 min-w-0',
                'text-body-sm',
                'bg-transparent border-0 outline-0',
                'text-base text-neutral-subdued',
                'placeholder:text-neutral-subdued',
                'focus:text-neutral-strong',
                'focus:outline-none'
              )}
            />
            <div
              className={cn(
                'bg-surface-translucent-low',
                'border border-stroke-neutral-translucent-weak',
                'flex h-[22px] items-center overflow-hidden',
                'px-2 py-0.5',
                'rounded-sm shrink-0'
              )}
            >
              <Typography variant="body-sm" className="text-neutral-strong">
                /
              </Typography>
            </div>
          </div>

          <div className="flex gap-4 items-center relative shrink-0">
            <Button variant="tertiary" size="md">
              Login
            </Button>
            <Button variant="primary" size="md">
              Register
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
