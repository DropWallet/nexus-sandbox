'use client'

import NavigationBar from '@/components/Navigation'
import { Breadcrumb } from '@/components/Breadcrumb'
import { useTheme } from '@/lib/theme/hooks'
import { Button } from '@/components/Button'
import { Typography } from '@/components/Typography'
import Icon from '@/components/Icon'
import { cn } from '@/lib/utils'

const modPageBreadcrumbItems = [
  { label: 'Games' },
  { label: 'Stardew Valley' },
  { label: 'Mods' },
  { label: 'Jonghyuk and Spanner - Custom NPCs for Sunberry Village' },
]

export default function ModPage() {
  const { theme, setTheme, resolvedTheme } = useTheme()

  return (
    <div className="min-h-screen bg-surface-base">
      <NavigationBar />

      <main className="max-w-[1300px] mx-auto px-4 pt-14 pb-6 space-y-4">
        <Breadcrumb items={modPageBreadcrumbItems} />

        {/* Hero Section */}
        <div className="bg-surface-low border border-stroke-neutral-translucent-weak rounded-lg overflow-hidden">
          <div className="relative h-[371px] flex flex-col justify-end pb-6 pt-[216px] px-6">
            {/* Background Image with Gradient Overlay */}
            <div className="absolute inset-0 pointer-events-none">
              <img
                src="/mod-page/hero-image.png"
                alt="Hero background"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    'linear-gradient(180deg, rgba(29, 29, 33, 0) 0%, rgba(29, 29, 33, 0.3) 49.585%, rgba(29, 29, 33, 0.9) 68.972%, rgba(29, 29, 33, 0.95) 96.766%)',
                }}
              />
            </div>

            {/* Content */}
            <div className="relative z-10 space-y-3">
              <Typography variant="heading-md" className="text-white">
                Jonghyuk and Spanner - Custom NPCs for Sunberry Village
              </Typography>

              {/* Metadata */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <img
                    src="/mod-page/avatar.png"
                    alt="Arknir27"
                    className="w-6 h-6 rounded-full"
                  />
                  <Typography variant="body-md" className="text-white/70">
                    Arknir27
                  </Typography>
                </div>
                <div className="w-1 h-1 bg-white rounded-full" />
                <Typography variant="body-md" className="text-white/70">
                  Updated 5 hours ago
                </Typography>
                <div className="w-1 h-1 bg-white rounded-full" />
                <div className="flex items-center gap-1">
                  <Icon name="download" size="sm" className="text-white/70" />
                  <Typography variant="body-md" className="text-white/70">
                    10.1M
                  </Typography>
                  <Icon name="check" size="sm" className="text-success-moderate" />
                </div>
                <div className="w-1 h-1 bg-white rounded-full" />
                <div className="flex items-center gap-1">
                  <Icon name="check" size="sm" className="text-success-moderate" />
                  <Typography variant="body-md" className="text-white/70">
                    Scanned
                  </Typography>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons and Content */}
          <div className="flex items-start justify-between gap-6 p-6">
            <div className="flex-1 space-y-6">
              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button variant="secondary" size="sm">
                  264.1K
                </Button>
                <Button variant="secondary" size="sm">
                  Share
                </Button>
                <Button variant="secondary" size="sm">
                  Track
                </Button>
                <Button variant="secondary" size="sm">
                  Vote MOTM
                </Button>
              </div>

              {/* Description */}
              <Typography variant="body-lg" className="text-neutral-moderate max-w-[768px]">
                Ever wondered why you can't trigger a specific event? Unsure what conditions you're missing to see that heart event? MH Event List shows you every event in the game, tracks which conditions you've met, and tells you exactly what's needed to unlock each moment. No more guessing - see everything at a glance and never miss a story beat again. Quickly.
              </Typography>

              {/* Upload/Creation Info */}
              <div className="flex gap-6">
                <div className="flex items-center gap-1">
                  <Icon name="upload" size="md" className="text-neutral-subdued" />
                  <Typography variant="body-md" className="text-neutral-subdued">
                    Original upload: 04 September 2022
                  </Typography>
                </div>
                <div className="flex items-center gap-1.5">
                  <Icon name="account" size="md" className="text-neutral-subdued" />
                  <Typography variant="body-md" className="text-neutral-subdued">
                    Created by: AlanaSP ShinyHobo Djmr Zee and bibsan
                  </Typography>
                </div>
              </div>
            </div>

            {/* Download Section */}
            <div className="bg-surface-mid flex flex-col gap-3 p-6 rounded-lg w-[288px] shrink-0">
              <Button variant="primary" size="md" className="w-full">
                Install with app (Vortex)
              </Button>
              <Button variant="secondary" size="md" className="w-full">
                Download manually
              </Button>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="flex gap-3 items-center">
          <button className="bg-surface-low p-2 rounded-base hover:bg-surface-mid transition-colors">
            <Icon name="arrowLeft" size="md" className="text-neutral-strong" />
          </button>
          <div className="flex-1 flex gap-4 overflow-x-auto">
            <div className="aspect-[242/135] border border-stroke-neutral-translucent-moderate rounded-base shrink-0 flex-1 min-w-0 relative overflow-hidden">
              <img
                src="/mod-page/gallery-1.png"
                alt="Gallery image 1"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="aspect-[242/135] border border-stroke-neutral-translucent-moderate rounded-base shrink-0 flex-1 min-w-0 relative overflow-hidden">
              <img
                src="/mod-page/gallery-2.png"
                alt="Gallery image 2"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="aspect-[242/135] border border-stroke-neutral-translucent-moderate rounded-base shrink-0 flex-1 min-w-0 relative overflow-hidden">
              <img
                src="/mod-page/gallery-3.png"
                alt="Gallery image 3"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="aspect-[242/135] border border-stroke-neutral-translucent-moderate rounded-base shrink-0 flex-1 min-w-0 relative overflow-hidden">
              <img
                src="/mod-page/gallery-4.png"
                alt="Gallery image 4"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="aspect-[242/135] border border-stroke-neutral-translucent-moderate rounded-base shrink-0 flex-1 min-w-0 relative overflow-hidden">
              <img
                src="/mod-page/gallery-5.png"
                alt="Gallery image 5"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
          <button className="bg-surface-low p-2 rounded-base hover:bg-surface-mid transition-colors">
            <Icon name="arrowRight" size="md" className="text-neutral-strong" />
          </button>
        </div>

        {/* Tags Section */}
        <div className="bg-surface-low border border-stroke-neutral-translucent-weak rounded-lg p-6">
          <div className="flex gap-3 items-center">
            <Typography variant="heading-xs" className="text-neutral-strong">
              Tags
            </Typography>
            <div className="flex-1 flex gap-3 flex-wrap items-center">
              {[
                'English',
                'Animation - New',
                'Animation - New',
                'SMAPI',
                'SMAPI',
                'Content Patcher',
                'Content Patcher',
                'Chinese',
                'Chinese',
                'Version 1.6 Compatible',
              ].map((tag, index) => (
                <div
                  key={index}
                  className="bg-neutral-600 h-6 px-2 py-0 rounded-base flex items-center justify-center"
                >
                  <Typography variant="body-sm" className="text-neutral-strong">
                    {tag}
                  </Typography>
                </div>
              ))}
              <Typography variant="body-sm" className="text-neutral-moderate">
                +4 more...
              </Typography>
            </div>
          </div>
        </div>

        {/* Theme Switcher */}
        <div className="p-6 bg-surface-low rounded-lg border border-stroke-neutral-translucent-weak">
          <Typography variant="heading-md" as="h2" className="mb-4">
            Theme Switcher
          </Typography>
          <div className="flex gap-4 items-center">
            <Typography variant="body-md" className="text-neutral-moderate">
              Current theme: <span className="text-neutral-strong font-semibold">{resolvedTheme}</span>
            </Typography>
            <div className="flex gap-2">
              <Button
                variant={resolvedTheme === 'dark' ? 'primary' : 'secondary'}
                size="md"
                onClick={() => setTheme('dark')}
              >
                Dark
              </Button>
              <Button
                variant={resolvedTheme === 'light' ? 'primary' : 'secondary'}
                size="md"
                onClick={() => setTheme('light')}
              >
                Light
              </Button>
              <Button
                variant={theme === 'auto' ? 'primary' : 'secondary'}
                size="md"
                onClick={() => setTheme('auto')}
              >
                Auto
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

