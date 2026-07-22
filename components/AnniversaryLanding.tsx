import { Bagel_Fat_One } from 'next/font/google'
import NavigationBar from '@/components/Navigation'
import {
  AnniversaryCubes,
  type AnniversaryCubesBehavior,
} from '@/components/AnniversaryCubes'
import { Button } from '@/components/Button'
import { Typography } from '@/components/Typography'
import { cn } from '@/lib/utils'

const bagelFatOne = Bagel_Fat_One({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

const PARTICIPATE_STEPS = [
  {
    number: 1,
    title: 'Create and Upload',
    text: 'Build a mod focusing on visuals, environments, UI, or storytelling.',
    icon: '/25-years/step-1.svg',
  },
  {
    number: 2,
    title: 'Tag Your Mod',
    text: 'Use the official tag Nexus Mods Turns 25 to automatically feature your work on this hub. Entries are open from August 1st to September 30th, 2026.',
    icon: '/25-years/step-2.svg',
  },
  {
    number: 3,
    title: 'Donate Your DP (Optional):',
    text: 'We highly encourage mod authors to opt-in and donate their Donation Points (DP) earned during the event directly to Doctors Without Borders.',
    icon: '/25-years/step-3.svg',
  },
] as const

const FOOTER_COLS = [
  {
    title: 'Nexus Mods',
    links: ['Home', 'Games', 'Mods', 'News', 'About us', 'Statistics'],
  },
  {
    title: 'Discover',
    links: ['All games', 'All mods', 'New mods', 'Popular mods', 'Trending mods', 'All collections', 'All images'],
  },
  {
    title: 'Support',
    links: ['Help', 'Wiki', 'API reference', 'Feedback', 'Report a Bug', 'Unban requests', 'DMCA', 'Manage cookie settings'],
  },
  {
    title: 'Community',
    links: ['Forums', 'Discord', 'Support authors', 'Contact us'],
  },
] as const

const SOCIAL_LINKS = [
  { name: 'Discord', href: 'https://discord.gg/nexusmods', icon: '/25-years/discord.svg' },
  { name: 'X', href: 'https://x.com/nexusmods', icon: '/25-years/twitter.svg' },
  { name: 'TikTok', href: 'https://www.tiktok.com/@nexusmods', icon: '/25-years/tiktok.svg' },
  { name: 'Twitch', href: 'https://www.twitch.tv/nexusmods', icon: '/25-years/twitch.svg' },
  { name: 'YouTube', href: 'https://www.youtube.com/@NexusMods', icon: '/25-years/youtube.svg' },
  { name: 'Instagram', href: 'https://www.instagram.com/nexusmods', icon: '/25-years/instagram.svg' },
] as const

type AnniversaryLandingProps = {
  cubesBehavior?: AnniversaryCubesBehavior
}

export function AnniversaryLanding({
  cubesBehavior = 'returnHome',
}: AnniversaryLandingProps) {
  return (
    <div className="anniversary-page min-h-screen text-neutral-strong">
      <NavigationBar />

      <main className="relative w-full pt-14">
        <section
          className="relative w-full overflow-x-clip overflow-y-visible"
          aria-labelledby="anniversary-heading"
        >
          <div className="relative z-10 mx-auto flex w-full max-w-[1920px] flex-col items-center px-4 pb-16 pt-10 sm:px-6 sm:pt-14 lg:pb-20 lg:pt-16">
            <div
              className={cn(
                'w-full py-6 sm:py-8',
                cubesBehavior === 'scatterInBounds' ? 'max-w-[820px]' : 'max-w-[650px]'
              )}
            >
              <AnniversaryCubes behavior={cubesBehavior} />
            </div>

            <div className="mt-6 flex w-full max-w-[834px] flex-col items-center gap-10 text-center sm:mt-8">
              <div className="flex w-full max-w-[634px] flex-col items-center gap-2 opacity-0 animate-[blur-fade-in_0.8s_ease-out_0.45s_forwards]">
                <h1
                  id="anniversary-heading"
                  className={cn(
                    bagelFatOne.className,
                    'w-full text-[28px] leading-[1.2] tracking-[-0.9px] text-[#cdfb27] sm:text-[36px]'
                  )}
                >
                  Celebrating 25 Years of Modding!
                </h1>
                <Typography variant="body-xxl" className="text-neutral-strong">
                  For the next two months, our community is coming together to celebrate a
                  quarter-century of modding by raising vital funds for Doctors Without Borders
                  (MSF).
                </Typography>
              </div>

              <div
                className={cn(
                  'w-full rounded-lg border border-stroke-neutral-translucent-subdued',
                  'bg-surface-translucent-low px-5 py-6 backdrop-blur-[16px] sm:px-8',
                  'opacity-0 animate-[blur-fade-in_0.8s_ease-out_0.6s_forwards]'
                )}
              >
                <h2
                  className={cn(
                    bagelFatOne.className,
                    'mb-4 text-center text-[22px] leading-[1.2] tracking-[-0.9px] text-[#66ccff] sm:text-[24px]'
                  )}
                >
                  How to Participate
                </h2>
                <ol className="flex flex-col gap-3.5 text-left">
                  {PARTICIPATE_STEPS.map((step) => (
                    <li key={step.number} className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="relative size-6 shrink-0 overflow-hidden" aria-hidden>
                          <img
                            src={step.icon}
                            alt=""
                            width={24}
                            height={24}
                            className="size-full"
                          />
                        </span>
                        <Typography
                          variant="body-md-semibold"
                          as="span"
                          className="text-[#66ccff]"
                        >
                          {step.title}
                        </Typography>
                      </div>
                      <Typography variant="body-md" className="text-translucent-strong">
                        {step.text}
                      </Typography>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>

        <footer className="border-t border-stroke-neutral-translucent-subdued bg-surface-base pb-10 pt-10">
          <div className="mx-auto flex w-full max-w-[1248px] flex-col gap-7 px-4 sm:px-6">
            <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
              <div className="grid flex-1 grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-0">
                {FOOTER_COLS.map((col) => (
                  <div key={col.title} className="flex w-full max-w-[208px] flex-col gap-1">
                    <Typography variant="title-sm" className="text-neutral-strong">
                      {col.title}
                    </Typography>
                    <ul className="flex flex-col">
                      {col.links.map((link) => (
                        <li key={link}>
                          <a
                            href="#"
                            className="text-[14px] leading-[1.5] text-white/60 transition-colors hover:text-neutral-strong"
                          >
                            {link}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="flex w-full max-w-[305px] flex-col gap-3">
                <Typography variant="title-sm" className="text-neutral-strong">
                  Support Nexus Mods
                </Typography>
                <Button variant="primary" size="md" className="w-fit">
                  Go Premium
                </Button>
                <div className="flex flex-col gap-1">
                  <Typography variant="title-sm" className="text-neutral-strong">
                    Network stats
                  </Typography>
                  <div className="flex justify-between gap-4">
                    {[
                      { label: 'Members', value: '53,159,807' },
                      { label: 'Mods', value: '603,701' },
                      { label: 'Kudos', value: '2,724,820' },
                    ].map((stat) => (
                      <div key={stat.label} className="flex flex-col">
                        <Typography variant="body-sm-semibold" className="text-neutral-moderate">
                          {stat.label}
                        </Typography>
                        <Typography variant="body-sm" className="text-neutral-subdued">
                          {stat.value}
                        </Typography>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between border-b border-stroke-neutral-translucent-subdued pb-6">
                <img
                  src="/25-years/nexus-mods-wordmark.svg"
                  alt="Nexus Mods"
                  width={136}
                  height={33}
                  className="h-[33px] w-[136px]"
                />
                <div className="flex items-end gap-4">
                  {SOCIAL_LINKS.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="size-6 opacity-80 transition-opacity hover:opacity-100"
                      aria-label={social.name}
                    >
                      <img
                        src={social.icon}
                        alt=""
                        width={24}
                        height={24}
                        className="size-full"
                      />
                    </a>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-2 text-[12px] tracking-[0.3px] text-neutral-strong sm:flex-row sm:items-start sm:justify-between">
                <p className="opacity-60">
                  Copyright © 2024 Black Tree Gaming Ltd. All rights reserved.
                </p>
                <p className="opacity-80">Terms of Service &nbsp;|&nbsp; Privacy Policy</p>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
