'use client'

import NavigationBar from '@/components/Navigation'
import { Typography } from '@/components/Typography'
import { HeroUnicornScene } from '@/components/HeroUnicornScene'
import Link from 'next/link'
import { cn } from '@/lib/utils'

/* Popular community card — from Figma 1166:1668 */
function PopularCommunityCard({
  title,
  modsCount,
  collectionsCount,
  thumbnail,
  thumbnailAlt,
  cardBg,
  thumbnailBorder,
  thumbnailShadow,
  buttonBg,
  modsLabel,
  collectionsLabel,
  gameHref,
  modsHref,
  collectionsHref,
}: {
  title: string
  modsCount: string
  collectionsCount: string
  thumbnail: string
  thumbnailAlt: string
  cardBg: string
  thumbnailBorder: string
  thumbnailShadow: string
  buttonBg: string
  modsLabel: string
  collectionsLabel: string
  gameHref: string
  modsHref: string
  collectionsHref: string
}) {
  return (
    <div
      className={cn(
        'flex-1 flex flex-col gap-[var(--spacing-4)] p-[var(--spacing-4)] rounded-lg border border-stroke-neutral-translucent-weak',
        cardBg
      )}
    >
      <div className="flex flex-col gap-[var(--spacing-4)]">
        <div className="flex gap-[var(--spacing-5)] items-center">
          <div
            className={cn(
              'relative shrink-0 w-14 aspect-[400/600] rounded-lg overflow-hidden bg-surface-base border',
              thumbnailBorder,
              thumbnailShadow
            )}
          >
            <img
              src={thumbnail}
              alt={thumbnailAlt}
              className="absolute inset-0 w-full h-full object-cover rounded-base"
            />
          </div>
          <div className="flex flex-col gap-2 min-w-0 flex-1">
            <Link
              href={gameHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-strong hover:text-neutral-moderate hover:underline transition-colors focus:outline-none focus:ring-2 focus:ring-primary-moderate focus:ring-offset-2 rounded"
            >
              <Typography variant="heading-xs" as="span">
                {title}
              </Typography>
            </Link>
            <div className="flex gap-[var(--spacing-2)] items-center">
              <Typography variant="body-md" as="span" className="text-translucent-subdued">
                <span className="font-semibold">Mods </span>
                <span>{modsCount}</span>
              </Typography>
              <div className="w-1 h-1 rounded-full bg-white/40 shrink-0" aria-hidden />
              <Typography variant="body-md" as="span" className="text-translucent-subdued">
                <span className="font-semibold">Collections </span>
                <span>{collectionsCount}</span>
              </Typography>
            </div>
          </div>
        </div>
        <div className="flex gap-[var(--spacing-4)]">
          <Link
            href={modsHref}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'flex-1 flex gap-[var(--spacing-2)] items-center px-[var(--spacing-3)] py-[var(--spacing-2)] rounded-lg transition-all duration-200',
              buttonBg,
              'text-translucent-moderate hover:bg-white/30 hover:text-translucent-strong focus:outline-none focus:ring-2 focus:ring-primary-moderate focus:ring-offset-2'
            )}
          >
            <img src="/vortex/mod-pictogram.svg" alt="" className="w-9 h-9 shrink-0" aria-hidden />
            <Typography variant="body-lg-semibold" as="span">
              {modsLabel}
            </Typography>
          </Link>
          <Link
            href={collectionsHref}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'flex-1 flex gap-[var(--spacing-2)] items-center px-[var(--spacing-3)] py-[var(--spacing-2)] rounded-lg transition-all duration-200',
              buttonBg,
              'text-translucent-moderate hover:bg-white/30 hover:text-translucent-strong focus:outline-none focus:ring-2 focus:ring-primary-moderate focus:ring-offset-2'
            )}
          >
            <img src="/vortex/Pictogram-collections.svg" alt="" className="w-9 h-9 shrink-0" aria-hidden />
            <Typography variant="body-lg-semibold" as="span">
              {collectionsLabel}
            </Typography>
          </Link>
        </div>
      </div>
    </div>
  )
}

const GAMES = [
  { src: '/vortex/game-image10.webp', href: 'https://www.nexusmods.com/games/', alt: 'Game cover' },
  { src: '/vortex/game-image11.webp', href: 'https://www.nexusmods.com/games/', alt: 'Game cover' },
  { src: '/vortex/game-image12.webp', href: 'https://www.nexusmods.com/games/', alt: 'Game cover' },
  { src: '/vortex/game-image13.webp', href: 'https://www.nexusmods.com/games/', alt: 'Game cover' },
  { src: '/vortex/game-image14.webp', href: 'https://www.nexusmods.com/games/', alt: 'Game cover' },
  { src: '/vortex/game-image15.webp', href: 'https://www.nexusmods.com/games/', alt: 'Game cover' },
  { src: '/vortex/game-image16.webp', href: 'https://www.nexusmods.com/games/', alt: 'Game cover' },
  { src: '/vortex/game-image01.png', href: 'https://www.nexusmods.com/games/', alt: 'Game cover' },
  { src: '/vortex/game-image02.png', href: 'https://www.nexusmods.com/games/skyrimspecialedition', alt: 'Skyrim Special Edition' },
  { src: '/vortex/game-image03.png', href: 'https://www.nexusmods.com/games/fallout4', alt: 'Fallout 4' },
  { src: '/vortex/game-image04.png', href: 'https://www.nexusmods.com/games/baldursgate3', alt: "Baldur's Gate 3" },
  { src: '/vortex/game-image05.png', href: 'https://www.nexusmods.com/games/cyberpunk2077', alt: 'Cyberpunk 2077' },
]

export default function VortexPage() {
  return (
    <div className="relative min-h-screen bg-surface-base w-full">
      {/* Unicorn Studio WebGL — absolutely positioned at top of page, centered and scales with viewport */}
      <div className="absolute top-0 left-0 right-0 z-0 w-full px-4 xs:px-5 sm:px-6 flex justify-center">
        <div className="max-w-[1920px] w-full aspect-[1920/799] bg-surface-base opacity-0 animate-[blur-fade-in_0.8s_ease-out_0.2s_forwards]">
          <HeroUnicornScene />
        </div>
      </div>

      <NavigationBar />

      <main className="relative z-10 w-full pt-14">
        {/* Hero Section - from Figma node 1166:1532 */}
        <section className="flex flex-col items-center isolate w-full pb-0 pt-[var(--spacing-20)]">
          <div className="flex flex-col items-center sm:items-start gap-[var(--spacing-16)] max-w-[1268px] w-full px-4 xs:px-5 sm:px-6">
            {/* Title area */}
            <div className="flex flex-col gap-[var(--spacing-6)] items-center sm:items-start max-w-[800px]">
              <Typography
                variant="heading-md"
                as="h1"
                className="hero-heading-responsive text-neutral-strong tracking-[-0.9px] opacity-0 animate-[blur-fade-in_0.8s_ease-out_forwards] text-center sm:text-left"
              >
                Vortex is the easiest way to manage your mods, so you can spend more time playing.
              </Typography>
              <Link
                href="https://www.nexusmods.com/site/mods/1"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'inline-flex justify-center items-center gap-2 px-4 py-2 text-base font-medium rounded-base transition-colors',
                  'bg-primary-moderate text-neutral-inverted hover:bg-primary-strong',
                  'focus:outline-none focus:ring-2 focus:ring-primary-moderate focus:ring-offset-2',
                  'opacity-0 animate-[blur-fade-in_0.8s_ease-out_0.1s_forwards]'
                )}
              >
                <img src="/vortex/windows.svg" alt="" className="shrink-0 w-5 h-5" aria-hidden />
                Download for Windows
              </Link>
            </div>

            {/* Screenshot / app mockup - Raycast-style frame */}
            <div className="hero-outer-frame relative w-full p-2 rounded-2xl opacity-0 animate-[blur-fade-in_0.8s_ease-out_0.2s_forwards]">
              {/* Colored ambient glow — spills out top, sides, and bottom, z-0 so frame (z-10) sits on top */}
              <div
                className="hero-glow-blue absolute z-0 rounded-2xl blur-3xl pointer-events-none animate-[hero-glow-blue_8s_ease-in-out_infinite]"
                style={{ top: '-80px', left: '-20px', right: '-20px', bottom: '-10px' }}
                aria-hidden
              />
              <div
                className="hero-glow-green absolute z-0 rounded-2xl blur-3xl pointer-events-none animate-[hero-glow-green_8s_ease-in-out_infinite]"
                style={{ top: '-80px', left: '-20px', right: '-20px', bottom: '-10px' }}
                aria-hidden
              />
              {/* Frame — p-px exposes gradient bg as border. z-10 above glow so image sits on top */}
              <div className="hero-image-frame relative z-10 rounded-xl p-px">
                {/* bg-surface-base fills content area so only the 1px gradient ring shows as border */}
                <div className="rounded-[11px] overflow-hidden bg-surface-base relative">
                  <div className="aspect-[1207/542] w-full relative">
                    <img
                      src="/vortex/hero-app.png"
                      alt="Vortex mod manager interface"
                      className="absolute inset-0 w-full h-full object-cover object-top"
                    />
                  </div>
                </div>
              </div>
              {/* Gradient overlay — extends beyond hero on all sides to cover glow spill, fades to surface-base. Below xl: full width to avoid overflow. */}
              <div
                className="absolute top-0 left-0 right-0 bottom-[-60px] xl:bottom-[-120px] xl:left-[-80px] xl:right-[-80px] z-20 pointer-events-none rounded-2xl"
                style={{
                  background: `linear-gradient(to bottom, transparent 0%, transparent 35%, var(--color-surface-base) 80%, var(--color-surface-base) 100%)`,
                }}
                aria-hidden
              />
            </div>
          </div>
        </section>

        {/* Games section - from Figma node 1166:1546 */}
        <section className="flex flex-col items-center w-full pt-[var(--spacing-16)] pb-0 px-4 xs:px-5 sm:px-6">
          <Typography
            variant="body-xl-semibold"
            as="p"
            className="text-neutral-subdued text-center max-w-[1024px] w-full opacity-0 animate-[blur-fade-in_0.8s_ease-out_1s_forwards]"
          >
            Over 500 games supported
          </Typography>
          {/* Games carousel */}
          <div className="games-carousel-wrapper games-carousel-mask relative w-full max-w-[1100px] mt-[var(--spacing-6)] overflow-hidden pb-2 opacity-0 animate-[blur-fade-in_0.8s_ease-out_1.15s_forwards]">
            <div className="games-carousel-track flex gap-[var(--spacing-4)] items-center w-max">
              {[...GAMES, ...GAMES].map((game, i) => (
                <Link
                  key={`${game.src}-${i}`}
                  href={game.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group shrink-0 w-[80px] p-[2px] rounded-lg border border-stroke-neutral-translucent-weak overflow-hidden block transition-colors hover:border-stroke-neutral-translucent-subdued"
                >
                  <div className="aspect-[400/600] w-full relative rounded-md overflow-hidden">
                    <img
                      src={game.src}
                      alt={game.alt}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-md" aria-hidden />
                  </div>
                </Link>
              ))}
            </div>
          </div>
          {/* Gradient border below game artwork — per Figma 1169:3592 */}
          <div className="games-gradient-border mt-[var(--spacing-14)] w-full max-w-[1024px] h-px shrink-0" aria-hidden />
        </section>

        {/* Transform section - from Figma node 1166:1555 */}
        <section className="flex flex-col items-center w-full py-[var(--spacing-24)]">
          <div className="flex flex-col gap-[var(--spacing-14)] max-w-[1268px] w-full px-4 xs:px-5 sm:px-6">
            <Typography
              variant="heading-md"
              as="h2"
              className="text-neutral-strong max-w-[1024px]"
            >
              <span className="leading-[1.25]">Your games, reimagined.</span>
              <span className="text-neutral-weak font-semi">{` Vortex lets you safely install and manage mods to make your games feel brand new.`}</span>
            </Typography>

            {/* Block 1: Manage mods - text left, image right */}
            <div className="flex flex-col md:flex-row gap-[var(--spacing-10)] md:gap-[var(--spacing-6)] lg:gap-[var(--spacing-10)] p-[var(--spacing-4)] pt-[var(--spacing-5)] md:p-[var(--spacing-6)] rounded-lg bg-surface-low overflow-hidden">
              <div className="flex flex-col gap-[var(--spacing-4)] md:pl-[var(--spacing-2)] justify-center sm:max-w-[448px] md:max-w-none md:flex-1 md:min-w-0 lg:flex-1 lg:min-w-0">
                <div className="flex flex-col gap-[var(--spacing-4)] ">
                  <img src="/vortex/mod-pictogram.svg" alt="" className="w-14 h-14 shrink-0" aria-hidden />
                  <div className="flex flex-col gap-[var(--spacing-2)]">
                    <Typography variant="heading-xs" as="p" className="text-neutral-strong">
                      Manage your mods effortlessly
                    </Typography>
                    <Typography variant="heading-xs" as="p" className="text-neutral-subdued">
                    Install and organise your mods with ease, so you can play more. 
                    </Typography>
                  </div>
                </div>
                <Link
                  href="https://wiki.nexusmods.com/index.php/Category:Vortex"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'group inline-flex items-center gap-2 self-start text-sm font-medium transition-colors',
                    'text-primary-moderate hover:text-[color-mix(in_srgb,white_20%,var(--color-primary-moderate))]',
                    'focus:outline-none focus:ring-2 focus:ring-primary-moderate focus:ring-offset-2'
                  )}
                >
                  <span className="group-hover:underline">Learn how to get started</span>
                  <img src="/vortex/arrow_forward.svg" alt="" className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" aria-hidden />
                </Link>
              </div>
              <div className="flex-1 min-w-0 min-h-[320px] lg:flex-none lg:w-[684px] lg:shrink-0 h-[320px] sm:h-[532px] md:h-[320px] lg:h-[532px] rounded-base overflow-hidden bg-surface-mid border border-stroke-neutral-translucent-weak relative">
                <div className="absolute left-[var(--spacing-8)] top-[var(--spacing-8)] md:left-[var(--spacing-10)] md:top-[var(--spacing-10)] lg:left-[var(--spacing-14)] lg:top-[var(--spacing-14)] right-0 bottom-0 rounded-tl-lg overflow-hidden transform-image-shadow">
                  <img
                    src="/vortex/image-manage.png"
                    alt="Vortex mod manager interface"
                    className="absolute inset-0 w-full h-full object-cover object-top"
                  />
                </div>
              </div>
            </div>

            {/* Block 2: Collections - image left, text right */}
            <div className="flex flex-col md:flex-row gap-[var(--spacing-10)] md:gap-[var(--spacing-6)] lg:gap-[var(--spacing-10)] p-[var(--spacing-4)] pt-[var(--spacing-5)] md:p-[var(--spacing-6)] rounded-lg bg-surface-low overflow-hidden">
              <div className="flex-1 min-w-0 min-h-[320px] lg:flex-none lg:w-[684px] lg:shrink-0 h-[320px] sm:h-[532px] md:h-[320px] lg:h-[532px] rounded-base overflow-hidden bg-surface-mid border border-stroke-neutral-translucent-weak relative order-2 md:order-1">
                <div className="absolute left-[var(--spacing-8)] top-[var(--spacing-8)] md:left-[var(--spacing-10)] md:top-[var(--spacing-10)] lg:left-[var(--spacing-14)] lg:top-[var(--spacing-14)] right-0 bottom-0 rounded-tl-lg overflow-hidden transform-image-shadow">
                  <img
                    src="/vortex/image-collections.png"
                    alt="Vortex Collections interface"
                    className="absolute inset-0 w-full h-full object-cover object-top"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-[var(--spacing-6)] justify-center sm:max-w-[448px] md:max-w-none md:flex-1 md:min-w-0 lg:flex-1 lg:min-w-0 order-1 md:order-2">
                <div className="flex flex-col gap-[var(--spacing-4)] md:pl-[var(--spacing-2)]">
                  <img src="/vortex/Pictogram-collections.svg" alt="" className="w-14 h-14 shrink-0" aria-hidden />
                  <div className="flex flex-col gap-[var(--spacing-2)]">
                    <Typography variant="heading-xs" as="p" className="text-neutral-strong">
                    Install mods and collections with 1-click
                    </Typography>
                    <Typography variant="heading-xs" as="p" className="text-neutral-subdued">
                      Easily install curated mod lists or create your own to share with friends or the world.
                    </Typography>
                  </div>
                </div>
                <Link
                  href="https://www.nexusmods.com/collections?sort=downloads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'group inline-flex md:pl-[var(--spacing-2)] items-center gap-2 self-start text-sm font-medium transition-colors',
                    'text-primary-moderate hover:text-[color-mix(in_srgb,white_20%,var(--color-primary-moderate))]',
                    'focus:outline-none focus:ring-2 focus:ring-primary-moderate focus:ring-offset-2'
                  )}
                >
                  <span className="group-hover:underline">Browse Collections</span>
                  <img src="/vortex/arrow_forward.svg" alt="" className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" aria-hidden />
                </Link>
              </div>
            </div>

            {/* Block 3: Perfect mod list - text left, image right */}
            <div className="flex flex-col md:flex-row gap-[var(--spacing-10)] md:gap-[var(--spacing-6)] lg:gap-[var(--spacing-10)] p-[var(--spacing-4)] pt-[var(--spacing-5)] md:p-[var(--spacing-6)] rounded-lg bg-surface-low overflow-hidden">
              <div className="flex flex-col gap-[var(--spacing-6)] justify-center sm:max-w-[448px] md:max-w-none md:flex-1 md:min-w-0 lg:flex-1 lg:min-w-0">
                <div className="flex flex-col gap-[var(--spacing-4)] md:pl-[var(--spacing-2)]">
                  <img src="/vortex/pictogram-games.svg" alt="" className="w-14 h-14 shrink-0" aria-hidden />
                  <div className="flex flex-col gap-[var(--spacing-2)]">
                    <Typography variant="heading-xs" as="p" className="text-neutral-strong">
                    All your games in one place
                    </Typography>
                    <Typography variant="heading-xs" as="p" className="text-neutral-subdued">
                    Vortex supports over 500 games, more than any other mod manager. 
                    </Typography>
                  </div>
                </div>
                <Link
                  href="https://www.nexusmods.com/games"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'group inline-flex items-center md:pl-[var(--spacing-2)] gap-2 self-start text-sm font-medium transition-colors',
                    'text-primary-moderate hover:text-[color-mix(in_srgb,white_20%,var(--color-primary-moderate))]',
                    'focus:outline-none focus:ring-2 focus:ring-primary-moderate focus:ring-offset-2'
                  )}
                >
                  <span className="group-hover:underline">Browse Games</span>
                  <img src="/vortex/arrow_forward.svg" alt="" className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" aria-hidden />
                </Link>
              </div>
              <div className="flex-1 min-w-0 min-h-[320px] lg:flex-none lg:w-[684px] lg:shrink-0 h-[320px] sm:h-[532px] md:h-[320px] lg:h-[532px] rounded-base overflow-hidden bg-surface-mid border border-stroke-neutral-translucent-weak relative">
                <div className="absolute left-[var(--spacing-8)] top-[var(--spacing-8)] md:left-[var(--spacing-10)] md:top-[var(--spacing-10)] lg:left-[var(--spacing-14)] lg:top-[var(--spacing-14)] right-0 bottom-0 rounded-tl-lg overflow-hidden transform-image-shadow">
                  <img
                    src="/vortex/image-games.png"
                    alt="Vortex games and mod manager interface"
                    className="absolute inset-0 w-full h-full object-cover object-top"
                  />
                </div>
              </div>
            </div>

            {/* Block 4: Never run outdated mods - image left, text right (equal padding on image) */}
            <div className="flex flex-col md:flex-row gap-[var(--spacing-10)] md:gap-[var(--spacing-6)] lg:gap-[var(--spacing-10)] p-[var(--spacing-4)] pt-[var(--spacing-5)] md:p-[var(--spacing-6)] rounded-lg bg-surface-low overflow-hidden">
              <div className="flex-1 min-w-0 min-h-[320px] lg:flex-none lg:w-[684px] lg:shrink-0 h-[320px] sm:h-[532px] md:h-[320px] lg:h-[532px] rounded-base overflow-hidden bg-surface-mid border border-stroke-neutral-translucent-weak relative order-2 md:order-1">
                <div className="absolute left-[var(--spacing-8)] right-[var(--spacing-8)] top-[var(--spacing-8)] md:left-[var(--spacing-10)] md:right-[var(--spacing-10)] md:top-[var(--spacing-10)] lg:left-[var(--spacing-14)] lg:right-[var(--spacing-14)] lg:top-[var(--spacing-14)] bottom-0 rounded-lg overflow-hidden">
                  <img
                    src="/vortex/image-safety.png"
                    alt="Vortex update and safety features"
                    className="absolute inset-0 w-full h-full object-cover object-top"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-[var(--spacing-6)] justify-center sm:max-w-[448px] md:max-w-none md:flex-1 md:min-w-0 lg:flex-1 lg:min-w-0 order-1 md:order-2">
                <div className="flex flex-col gap-[var(--spacing-4)] md:pl-[var(--spacing-2)]">
                  <img src="/vortex/pictogram-downloads.svg" alt="" className="w-14 h-14 shrink-0" aria-hidden />
                  <div className="flex flex-col gap-[var(--spacing-2)]">
                    <Typography variant="heading-xs" as="p" className="text-neutral-strong">
                      Never run outdated mods again
                    </Typography>
                    <Typography variant="heading-xs" as="p" className="text-neutral-subdued">
                      See available updates instantly. Update multiple mods at once.
                    </Typography>
                  </div>
                </div>
                <Link
                  href="#"
                  className={cn(
                    'group inline-flex md:pl-[var(--spacing-2)] items-center gap-2 self-start text-sm font-medium transition-colors',
                    'text-primary-moderate hover:text-[color-mix(in_srgb,white_20%,var(--color-primary-moderate))]',
                    'focus:outline-none focus:ring-2 focus:ring-primary-moderate focus:ring-offset-2'
                  )}
                >
                  <span className="group-hover:underline">Download Vortex</span>
                  <img src="/vortex/arrow_forward.svg" alt="" className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" aria-hidden />
                </Link>
              </div>
            </div>

            {/* Download Vortex CTA — from Figma 1177:3583, animated gradient border */}
            <div className="rounded-lg p-[2px] vortex-download-cta-border">
              <div className="rounded-[6px] vortex-download-cta-bg flex flex-col sm:flex-row gap-[var(--spacing-6)] items-start sm:items-center justify-between p-[var(--spacing-6)]">
              <div className="flex flex-col gap-[var(--spacing-2)] min-w-0 max-w-[576px]">
                <Typography variant="heading-sm" as="p" className="text-neutral-strong">
                  Download Vortex now
                </Typography>
                <Typography variant="body-xl" as="p" className="text-translucent-subdued">
                  Get started with the world&apos;s best mod manager, today.
                </Typography>
              </div>
              <Link
                href="https://www.nexusmods.com/site/mods/1"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'inline-flex justify-center items-center gap-2 px-4 py-2 text-base font-medium rounded-base transition-colors shrink-0',
                  'bg-primary-moderate text-neutral-inverted hover:bg-primary-strong',
                  'focus:outline-none focus:ring-2 focus:ring-primary-moderate focus:ring-offset-2'
                )}
              >
                <img src="/vortex/windows.svg" alt="" className="shrink-0 w-5 h-5" aria-hidden />
                Download for Windows
              </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Get started resources — from Figma node 1166:1628 */}
        <section className="flex flex-col items-center w-full pt-[var(--spacing-2)] pb-[var(--spacing-24)]">
          <div className="flex flex-col gap-[var(--spacing-8)] max-w-[1268px] w-full px-4 xs:px-5 sm:px-6">
            <Typography
              variant="heading-md"
              as="h2"
              className="text-neutral-strong max-w-[1024px]"
            >
              Get started with these resources
            </Typography>

            <div className="flex flex-col gap-[var(--spacing-8)]">
              {/* Top row: 3 resource cards */}
              <div className="flex flex-col sm:flex-row gap-[var(--spacing-6)]">
                <Link
                  href="https://www.youtube.com/@NexusMods"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex-1 flex flex-col gap-[var(--spacing-4)] p-[var(--spacing-5)] rounded-lg bg-surface-low border border-stroke-neutral-translucent-weak hover:bg-surface-mid hover:border-stroke-neutral-translucent-subdued transition-colors"
                >
                  <span className="w-6 h-6 shrink-0 [&>svg]:w-full [&>svg]:h-full text-neutral-subdued group-hover:text-neutral-moderate" aria-hidden>
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  </span>
                  <div className="flex flex-col gap-[var(--spacing-2)]">
                    <Typography variant="heading-xs" as="p" className="text-primary-moderate">
                      YouTube
                    </Typography>
                    <Typography variant="body-xl-semibold" as="p" className="text-neutral-subdued group-hover:text-neutral-strong">
                      Watch our YouTube Guides to quickly get started
                    </Typography>
                  </div>
                </Link>
                <Link
                  href="https://wiki.nexusmods.com/index.php/Vortex"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex-1 flex flex-col gap-[var(--spacing-4)] p-[var(--spacing-5)] rounded-lg bg-surface-low border border-stroke-neutral-translucent-weak hover:bg-surface-mid hover:border-stroke-neutral-translucent-subdued transition-colors"
                >
                  <span className="w-6 h-6 shrink-0 [&>svg]:w-full [&>svg]:h-full text-neutral-subdued group-hover:text-neutral-moderate" aria-hidden>
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/></svg>
                  </span>
                  <div className="flex flex-col gap-[var(--spacing-2)]">
                    <Typography variant="heading-xs" as="p" className="text-primary-moderate">
                      Vortex Wiki
                    </Typography>
                    <Typography variant="body-xl-semibold" as="p" className="text-neutral-subdued group-hover:text-neutral-strong">
                      Get guides and resources for using the app and modding specific games
                    </Typography>
                  </div>
                </Link>
                <Link
                  href="https://discord.gg/nexusmods"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex-1 flex flex-col gap-[var(--spacing-4)] p-[var(--spacing-5)] rounded-lg bg-surface-low border border-stroke-neutral-translucent-weak hover:bg-surface-mid hover:border-stroke-neutral-translucent-subdued transition-colors"
                >
                  <span className="w-6 h-6 shrink-0 [&>svg]:w-full [&>svg]:h-full text-neutral-subdued group-hover:text-neutral-moderate" aria-hidden>
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
                  </span>
                  <div className="flex flex-col gap-[var(--spacing-2)]">
                    <Typography variant="heading-xs" as="p" className="text-primary-moderate">
                      Discord
                    </Typography>
                    <Typography variant="body-xl-semibold" as="p" className="text-neutral-subdued group-hover:text-neutral-strong">
                      Join the Nexus Mods Discord server to chat with other modders
                    </Typography>
                  </div>
                </Link>
              </div>

              {/* Skyrim guide card */}
              <Link
                href="https://nexus-sandbox.vercel.app/skyrim-guide#introduction"
                className="group flex flex-col sm:flex-row gap-[var(--spacing-6)] items-start sm:items-center p-[var(--spacing-6)] rounded-lg bg-surface-low border border-stroke-neutral-translucent-subdued overflow-hidden resources-skyrim-pattern hover:border-stroke-neutral-translucent-moderate transition-colors"
              >
                <div className="w-20 h-[120px] shrink-0 rounded-base overflow-hidden bg-surface-mid flex-shrink-0 resources-skyrim-image">
                  <img
                    src="/vortex/game-image02.png"
                    alt=""
                    className="w-full h-full object-cover"
                    aria-hidden
                  />
                </div>
                <div className="flex-1 flex flex-col gap-[var(--spacing-2)] min-w-0 max-w-[576px]">
                  <Typography variant="heading-sm" as="p" className="text-neutral-strong">
                    Start modding Skyrim with Vortex
                  </Typography>
                  <Typography variant="body-xl" as="p" className="text-neutral-subdued">
                    View our simple guide to get all the essential mods and tools to start modding Skyrim using Vortex.
                  </Typography>
                </div>
                <span
                  className={cn(
                    'inline-flex items-center gap-2 shrink-0 sm:ml-auto px-4 py-2 text-base font-medium rounded-base transition-colors',
                    'bg-[var(--color-button-secondary-filled)] border border-[var(--color-button-secondary-filled-border)] text-[var(--color-button-secondary-filled-text)]',
                    'group-hover:bg-[var(--color-button-secondary-filled-hover)]'
                  )}
                >
                  View guide
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* Popular communities — from Figma node 1166:1668 */}
        <section className="flex flex-col items-center w-full pb-[var(--spacing-24)]">
          <div className="flex flex-col gap-[var(--spacing-8)] max-w-[1268px] w-full px-4 xs:px-5 sm:px-6">
            <Typography variant="heading-md" as="h2" className="text-neutral-strong max-w-[1024px]">
              Popular communities
            </Typography>

            <div className="flex flex-col gap-[var(--spacing-8)]">
              {/* Row 1: Skyrim, Cyberpunk */}
              <div className="flex flex-col sm:flex-row gap-[var(--spacing-6)]">
                <PopularCommunityCard
                  title="Skyrim Special Edition"
                  modsCount="127.4k"
                  collectionsCount="5.1k"
                  thumbnail="/vortex/game-image02.png"
                  thumbnailAlt="Skyrim Special Edition"
                  cardBg="bg-surface-low"
                  thumbnailBorder="border-stroke-neutral-translucent-moderate"
                  thumbnailShadow="shadow-[0px_0px_0px_2px_rgba(0,0,0,0.75)]"
                  buttonBg="bg-surface-mid"
                  modsLabel="Mods"
                  collectionsLabel="Collections"
                  gameHref="https://www.nexusmods.com/games/skyrimspecialedition"
                  modsHref="https://www.nexusmods.com/skyrimspecialedition/mods/"
                  collectionsHref="https://www.nexusmods.com/skyrimspecialedition/collections/"
                />
                <PopularCommunityCard
                  title="Cyberpunk 2077"
                  modsCount="127.4k"
                  collectionsCount="5.1k"
                  thumbnail="/vortex/game-image05.png"
                  thumbnailAlt="Cyberpunk 2077"
                  cardBg="bg-[#52530b]"
                  thumbnailBorder="border-[#575621]"
                  thumbnailShadow="shadow-[0px_0px_0px_2px_#323203]"
                  buttonBg="bg-surface-translucent-low"
                  modsLabel="Mods"
                  collectionsLabel="Collections"
                  gameHref="https://www.nexusmods.com/games/cyberpunk2077"
                  modsHref="https://www.nexusmods.com/cyberpunk2077/mods/"
                  collectionsHref="https://www.nexusmods.com/cyberpunk2077/collections/"
                />
              </div>

              {/* Row 2: Fallout 4, Baldur's Gate 3 */}
              <div className="flex flex-col sm:flex-row gap-[var(--spacing-6)]">
                <PopularCommunityCard
                  title="Fallout 4"
                  modsCount="127.4k"
                  collectionsCount="5.1k"
                  thumbnail="/vortex/game-image03.png"
                  thumbnailAlt="Fallout 4"
                  cardBg="bg-[#3e2e1d]"
                  thumbnailBorder="border-[#6d613c]"
                  thumbnailShadow="shadow-[0px_0px_0px_2px_#0d0d0b]"
                  buttonBg="bg-surface-translucent-low"
                  modsLabel="Mods"
                  collectionsLabel="Collections"
                  gameHref="https://www.nexusmods.com/games/fallout4"
                  modsHref="https://www.nexusmods.com/fallout4/mods/"
                  collectionsHref="https://www.nexusmods.com/fallout4/collections/"
                />
                <PopularCommunityCard
                  title="Baldur's Gate 3"
                  modsCount="127.4k"
                  collectionsCount="5.1k"
                  thumbnail="/vortex/game-image04.png"
                  thumbnailAlt="Baldur's Gate 3"
                  cardBg="bg-[#143c5d]"
                  thumbnailBorder="border-[#4b6f78]"
                  thumbnailShadow="shadow-[0px_0px_0px_2px_#0d273c]"
                  buttonBg="bg-surface-translucent-low"
                  modsLabel="Mods"
                  collectionsLabel="Collections"
                  gameHref="https://www.nexusmods.com/games/baldursgate3"
                  modsHref="https://www.nexusmods.com/baldursgate3/mods/"
                  collectionsHref="https://www.nexusmods.com/baldursgate3/collections/"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
