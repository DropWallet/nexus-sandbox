'use client'

import NavigationBar from '@/components/Navigation'
import { useTheme } from '@/lib/theme/hooks'
import { Button } from '@/components/Button'
import { Typography } from '@/components/Typography'

export default function SandboxPage() {
  const { theme, setTheme, resolvedTheme } = useTheme()

  return (
    <div className="min-h-screen bg-surface-base">
      {/* Navigation Bar */}
      <NavigationBar />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6">
        <div className="space-y-8">
          {/* Header */}
          <div>
            <Typography variant="heading-xl" as="h1" className="mb-2">
              Design System Sandbox
            </Typography>
            <Typography variant="body-lg" className="text-neutral-moderate">
              Test page for navigation and theme switching
            </Typography>
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
            <Typography variant="body-sm" className="text-neutral-subdued mt-4">
              The theme switcher updates the entire page including the navigation bar above.
            </Typography>
          </div>

          {/* Design Token Examples */}
          <div className="space-y-4">
            <Typography variant="heading-md" as="h2">
              Design Token Examples
            </Typography>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Colors */}
              <div className="p-4 bg-surface-low rounded-lg border border-stroke-neutral-translucent-weak">
                <Typography variant="body-md-semibold" className="mb-3">
                  Semantic Colors
                </Typography>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-primary-moderate rounded"></div>
                    <Typography variant="body-sm">Primary Moderate</Typography>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-info-moderate rounded"></div>
                    <Typography variant="body-sm">Info Moderate</Typography>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-success-moderate rounded"></div>
                    <Typography variant="body-sm">Success Moderate</Typography>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-warning-moderate rounded"></div>
                    <Typography variant="body-sm">Warning Moderate</Typography>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-danger-moderate rounded"></div>
                    <Typography variant="body-sm">Danger Moderate</Typography>
                  </div>
                </div>
              </div>

              {/* Surface Colors */}
              <div className="p-4 bg-surface-low rounded-lg border border-stroke-neutral-translucent-weak">
                <Typography variant="body-md-semibold" className="mb-3">
                  Surface Colors
                </Typography>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-surface-base border border-stroke-neutral-translucent-weak rounded"></div>
                    <Typography variant="body-sm">Surface Base</Typography>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-surface-low border border-stroke-neutral-translucent-weak rounded"></div>
                    <Typography variant="body-sm">Surface Low</Typography>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-surface-mid border border-stroke-neutral-translucent-weak rounded"></div>
                    <Typography variant="body-sm">Surface Mid</Typography>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-surface-high border border-stroke-neutral-translucent-weak rounded"></div>
                    <Typography variant="body-sm">Surface High</Typography>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Component Examples */}
          <div className="space-y-4">
            <Typography variant="heading-md" as="h2">
              Component Examples
            </Typography>
            
            <div className="p-4 bg-surface-low rounded-lg border border-stroke-neutral-translucent-weak">
              <Typography variant="body-md-semibold" className="mb-3">
                Buttons
              </Typography>
              <div className="flex gap-4 flex-wrap">
                <Button variant="primary" size="md">Primary</Button>
                <Button variant="secondary" size="md">Secondary</Button>
                <Button variant="tertiary" size="md">Tertiary</Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

