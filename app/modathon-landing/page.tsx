'use client'

import { Button } from '@/components/Button'
import { Typography } from '@/components/Typography'
import { cn } from '@/lib/utils'

// Simple inline icons matching the Modathon design (trophy, group, shield)
function TrophyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M12 8h24v6h-4v4c0 4.4-3.6 8-8 8h-8c-4.4 0-8-3.6-8-8v-4H12V8z" fill="currentColor" opacity={0.9} />
      <path d="M14 14v2c0 3.3 2.7 6 6 6h8c3.3 0 6-2.7 6-6v-2H14z" fill="currentColor" />
      <path d="M24 26v16M18 42h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 22H8c-2.2 0-4-1.8-4-4v-2h2v2c0 1.1.9 2 2 2h4M36 22h4c2.2 0 4-1.8 4-4v-2h-2v2c0 1.1-.9 2-2 2h-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M24 18c-2.2 0-4-1.8-4-4V8h8v6c0 2.2-1.8 4-4 4z" fill="currentColor" opacity={0.7} />
    </svg>
  )
}

function CategoryIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <circle cx="18" cy="16" r="5" fill="currentColor" opacity={0.9} />
      <circle cx="30" cy="16" r="5" fill="currentColor" opacity={0.9} />
      <circle cx="24" cy="30" r="6" fill="currentColor" opacity={0.7} />
      <path d="M18 21a6 6 0 0112 0" stroke="currentColor" strokeWidth="2" opacity={0.9} />
    </svg>
  )
}

function BadgeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M24 4L8 10v10c0 10 6.5 18.5 16 22 9.5-3.5 16-12 16-22V10L24 4z" fill="currentColor" opacity={0.9} />
      <path d="M24 8l10 4v8c0 7.5-4.5 14.2-10 17.3-5.5-3.1-10-9.8-10-17.3v-8l10-4z" fill="currentColor" opacity={0.6} />
      <circle cx="24" cy="20" r="5" fill="currentColor" />
    </svg>
  )
}

export default function ModathonLandingPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{
        background: 'linear-gradient(90deg, #0f1729 0%, #1e1b4b 50%, #312e81 100%)',
      }}
    >
      <div className={cn('w-full max-w-[720px] flex flex-col items-center gap-10')}>
        {/* Hero */}
        <section className="flex flex-col items-center text-center gap-4">
          <Typography
            as="h1"
            variant="heading-2xl"
            className="text-primary-strong font-bold tracking-tight"
          >
            Grow, create, and reimagine
          </Typography>
          <Typography variant="body-lg" className="text-neutral-subdued max-w-[560px]">
            Plant something new — Team up, go solo, or upload something fun and small for a chance to win one of the prizes below.{' '}
            <a href="#" className="text-info-moderate underline hover:text-info-strong">Join a team</a>
            ,{' '}
            <a href="#" className="text-info-moderate underline hover:text-info-strong">see events that are happening</a>
            , and{' '}
            <a href="#" className="text-info-moderate underline hover:text-info-strong">view tutorials</a>
            {' '}if you&apos;re getting started.
          </Typography>
          <Button variant="primary" size="lg" className="mt-2">
            Enter now
          </Button>
        </section>

        {/* Prize cards */}
        <div className="w-full flex flex-col gap-4">
          {/* Grand prize */}
          <article className="bg-surface-mid border border-stroke-neutral-translucent-weak rounded-lg p-5 flex gap-4">
            <div className="shrink-0 w-12 h-12 flex items-center justify-center text-neutral-moderate" aria-hidden>
              <TrophyIcon className="w-10 h-10" />
            </div>
            <div className="flex flex-col gap-1 min-w-0">
              <Typography variant="title-md" className="text-primary-strong">
                Grand prize
              </Typography>
              <Typography variant="body-sm" className="text-neutral-subdued">
                Most endorsements or downloads
              </Typography>
              <Typography variant="body-md" className="text-neutral-moderate mt-1">
                Win a legendary PC setup, consisting of a gaming PC, monitor, keyboard, and mouse; plus exclusive Stardew Valley and Nexus Mods merch.
              </Typography>
            </div>
          </article>

          {/* Category champions */}
          <article className="bg-surface-mid border border-stroke-neutral-translucent-weak rounded-lg p-5 flex gap-4">
            <div className="shrink-0 w-12 h-12 flex items-center justify-center text-neutral-moderate" aria-hidden>
              <CategoryIcon className="w-10 h-10" />
            </div>
            <div className="flex flex-col gap-1 min-w-0">
              <Typography variant="title-md" className="text-primary-strong">
                Category champions
              </Typography>
              <Typography variant="body-sm" className="text-neutral-subdued">
                Best mods per category
              </Typography>
              <Typography variant="body-md" className="text-neutral-moderate mt-1">
                Get a unique badge, a pixel art commission by{' '}
                <a href="#" className="text-info-moderate underline hover:text-info-strong">Pau</a>
                , and a merch bundle featuring a t-shirt, mouse mat, stickers, and more.
              </Typography>
            </div>
          </article>

          {/* Badges */}
          <article className="bg-surface-mid border border-stroke-neutral-translucent-weak rounded-lg p-5 flex gap-4">
            <div className="shrink-0 w-12 h-12 flex items-center justify-center text-neutral-moderate" aria-hidden>
              <BadgeIcon className="w-10 h-10" />
            </div>
            <div className="flex flex-col gap-1 min-w-0">
              <Typography variant="title-md" className="text-primary-strong">
                Badges
              </Typography>
              <Typography variant="body-sm" className="text-neutral-subdued">
                Everyone who enters gets one
              </Typography>
              <Typography variant="body-md" className="text-neutral-moderate mt-1">
                Earn an exclusive Stardew Valley Modfest badge for your Nexus Mods profile to commemorate the event.
              </Typography>
            </div>
          </article>
        </div>
      </div>
    </div>
  )
}
