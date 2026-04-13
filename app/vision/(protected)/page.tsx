import type { Metadata } from 'next'
import { Fraunces } from 'next/font/google'
import { VisionPageFooter } from '@/components/VisionPageFooter'
import { VisionPageNav } from '@/components/VisionPageNav'
import { VisionClosingUnicornScene } from '@/components/VisionClosingUnicornScene'
import { VisionDiagramUnicornScene } from '@/components/VisionDiagramUnicornScene'
import { VisionHeroUnicornScene } from '@/components/VisionHeroUnicornScene'
import { Typography } from '@/components/Typography'
import { cn } from '@/lib/utils'
export const metadata: Metadata = {
  title: 'Vision | Nexus Mods',
  description: 'The vision for Nexus Mods — building the operating system for user-generated content across all games.',
}

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['300', '600'],
  display: 'swap',
  variable: '--font-fraunces',
})

function SectionHeading({ title }: { title: string }) {
  return (
    <div className="flex flex-col gap-3 items-center w-full">
      <Typography variant="heading-lg" as="h2" className="text-neutral-strong text-center max-w-[474px]">
        {title}
      </Typography>
      <span className="inline-flex py-1" aria-hidden>
        <img src="/vision/mods.svg" alt="" className="w-[14px] h-[10px] shrink-0 opacity-90" />
      </span>
    </div>
  )
}

function VisionCard({
  title,
  children,
  className,
  titleClassName,
}: {
  title: string
  children: React.ReactNode
  className?: string
  titleClassName?: string
}) {
  return (
    <div
      className={cn(
        'bg-black border border-stroke-neutral-translucent-weak rounded-xl flex flex-col items-center gap-[42px] pt-10 pb-10 w-full max-w-none',
        className
      )}
    >
      <Typography
        variant="heading-lg"
        as="h2"
        className={cn('text-neutral-strong text-center max-w-[474px]', titleClassName)}
      >
        {title}
      </Typography>
      {children}
    </div>
  )
}

export default function VisionPage() {
  const prose = cn(
    fraunces.className,
    'text-[18px] leading-[1.25] text-neutral-subdued whitespace-pre-wrap',
    '[&_strong]:font-semibold [&_strong]:text-neutral-strong'
  )

  return (
    <div className={cn('min-h-screen bg-surface-base', fraunces.variable)}>
      <VisionPageNav />

      <main className="w-full flex flex-col items-stretch gap-20 isolate pt-24 pb-40 px-[var(--spacing-10)]">
        {/* THE 2AM PERSON — hero card (blur-fade-in matches Vortex hero) */}
        <VisionCard
          title="THE 2AM PERSON"
          titleClassName="opacity-0 animate-[blur-fade-in_0.8s_ease-out_forwards]"
        >
          <div className="w-full opacity-0 animate-[blur-fade-in_0.8s_ease-out_0.15s_forwards]">
            <VisionHeroUnicornScene />
          </div>
          <div
            className={cn(
              prose,
              'max-w-[576px] w-full mx-auto opacity-0 animate-[blur-fade-in_0.8s_ease-out_0.3s_forwards]'
            )}
          >
            <p className="text-neutral-subdued mb-0">Somewhere right now, someone is awake when they shouldn&apos;t be.</p>
            <p className="mb-0">&nbsp;</p>
            <p className="text-neutral-subdued mb-0">
              They&apos;re staring at a bug report, or a broken mod page, or a community thread that&apos;s about to go
              sideways, and they&apos;re fixing it. Quietly. Without asking for anything back.
            </p>
            <p className="mb-0">&nbsp;</p>
            <p className="text-neutral-subdued mb-0">
              You know who they are because you&apos;ve probably been one of them. Or you work with them every day. Or you
              are one, right now, at this company.
            </p>
            <p className="mb-0">&nbsp;</p>
            <p className="text-neutral-subdued mb-0">
              That person is why Nexus Mods exists. Not the numbers. Not the targets.{' '}
            </p>
            <p className="mb-0">&nbsp;</p>
            <p>
              <strong className="font-semibold text-neutral-strong">The 2am person. </strong>
            </p>
          </div>
        </VisionCard>

        {/* WHAT WE ACTUALLY ARE */}
        <section className="w-full z-[6]">
          <div className="mx-auto w-full max-w-[576px] flex flex-col gap-3 items-center">
          <SectionHeading title="WHAT WE ACTUALLY ARE" />
          <div className={cn(prose, 'w-full text-left')}>
            <p className="mb-0">
              We are the largest PC modding platform on earth. 70 million people chose us. Not because we outspent anyone.
              Not because a growth team A/B tested our way to the top. Because twenty years ago, someone built something the
              community needed, and the community showed up, and never left.
            </p>
            <p className="mb-0">&nbsp;</p>
            <p className="mb-0">&nbsp;</p>
            <p className="mb-0">{`That's not a feature. That's a foundation most companies never get to build on.`}</p>
            <p className="mb-0">&nbsp;</p>
            <p className="mb-0">
              <strong className="font-semibold text-neutral-strong">Think about what that means. </strong>
            </p>
            <p className="mb-0">&nbsp;</p>
            <p className="mb-0">
              The modder who rewrote Skyrim&apos;s lighting engine, their work lives here. The community manager who kept a
              400k person forum from imploding for six straight years, they showed up here, every day. The tool builder
              whose mod manager has been downloaded 30 million times got a forum post as a thank you, and came back anyway.{' '}
            </p>
            <p className="mb-0">&nbsp;</p>
            <p>
              They didn&apos;t come back for us. They came back for the community. But they trusted us to hold it. We have
              earned something rare. And we have spent almost none of it yet.
            </p>
          </div>
          </div>
        </section>

        {/* THE ENEMY */}
        <section className="w-full z-[5]">
          <div className="mx-auto w-full max-w-[576px] flex flex-col gap-3 items-start">
            <SectionHeading title="THE ENEMY" />
            <div className={cn(prose, 'w-full')}>
              <p className="mb-0">{`Let's be honest about what we're fighting, because a movement without an enemy is just a mood board.`}</p>
              <p className="mb-0">&nbsp;</p>
              <p className="mb-0">
                The enemy is friction. Specifically: the structural gap between how much people care about this world, and
                how little the infrastructure supports them.
              </p>
              <p className="mb-0">&nbsp;</p>
              <p className="mb-0">
                20 million people use this platform every month. 600,000 pay for it. The 19.4 million people in between are not
                disengaged. They are not unconvinced. They are hitting walls, walls we built, walls we inherited, walls we
                haven&apos;t gotten around to tearing down yet. Every one of those walls is our problem.
              </p>
              <p className="mb-0">&nbsp;</p>
              <p className="mb-0">
                The enemy is a creator who built something used by 80,000 people and can&apos;t pay rent from it. The enemy is
                a new player who wants to mod their first game and gives up after forty-five minutes of failed installs. The
                enemy is a game studio that knows mods extend the life of their title by years, but has no standardised
                infrastructure to support the ecosystem, so they build something bespoke, it breaks, and the community
                suffers.
              </p>
              <p className="mb-0">&nbsp;</p>
              <p className="mb-0">
                The enemy is the gap between what this community is capable of and what we&apos;ve made possible for them.{' '}
              </p>
              <p className="mb-0">&nbsp;</p>
              <p className="mb-0">
                <strong className="font-semibold text-neutral-strong">That gap is our fault. Closing it is our job.</strong>
              </p>
              <p className="mb-0">&nbsp;</p>
            </div>
          </div>
        </section>

        {/* THE VISION — diagram card */}
        <VisionCard title="THE VISION" className="z-[4]">
          <div className="relative mx-auto w-full max-w-[1012px] overflow-visible px-1 sm:px-2">
            <VisionDiagramUnicornScene />
          </div>
          <div className={cn(prose, 'max-w-[576px] w-full mx-auto')}>
            <p className="mb-0">We are building the operating system for user-generated content across all games.</p>
            <p className="mb-0">&nbsp;</p>
            <p className="mb-0">
              Not a better mod repository. Not a slightly improved Vortex. Not a niche platform for the technically
              inclined.{' '}
            </p>
            <p className="mb-0">&nbsp;</p>
            <p className="mb-0">
              <strong className="font-semibold text-neutral-strong">But the layer that makes everything else possible.</strong>
            </p>
            <p className="mb-0">&nbsp;</p>
            <p className="mb-0">
              Roblox built this inside one game. GitHub built it for code. Spotify built it for music. None of them
              invented what they organised. They just made it frictionless enough that millions of people who couldn&apos;t
              participate before suddenly could, and that changed the entire shape of the market.
            </p>
            <p className="mb-0">&nbsp;</p>
            <p className="mb-0">
              That&apos;s the move. Cross-title identity so a creator&apos;s reputation travels with them across every game they
              touch. Distribution rails so a mod built once reaches every platform that needs it.
            </p>
            <p className="mb-0">&nbsp;</p>
            <p className="mb-0">
              Creator economics so the people doing the most important work in this ecosystem can actually live off it. A
              shared data backbone 20 years in the making that no one else on earth can replicate.
            </p>
            <p className="mb-0">&nbsp;</p>
          </div>
        </VisionCard>

        {/* THE NUMBER THAT KEEPS ME UP AT NIGHT */}
        <section className="w-full z-[3]">
          <div className="mx-auto w-full max-w-[576px] flex flex-col gap-3 items-start">
            <SectionHeading title="THE NUMBER THAT KEEPS ME UP AT NIGHT" />
            <div className={cn(prose, 'w-full')}>
            <p className="mb-0">
              <span className="text-neutral-strong">1.9 billion</span>
              <span> people play games on PC. </span>
              <span className="text-neutral-strong">70 million</span>
              <span>
                {' '}
                of them found their way to us. Think about that for a second, without a consumer marketing budget, without
                a growth team running acquisition campaigns, without an app store placement or a platform deal.{' '}
              </span>
            </p>
            <p className="mb-0">&nbsp;</p>
            <p className="mb-0">Word of mouth. Community gravity. The product just existed, and people came.</p>
            <p className="mb-0">&nbsp;</p>
            <p className="mb-0">
              <span className="text-neutral-strong">20 million </span>
              <span>use us every month. </span>
              <span className="text-neutral-strong">600 thousand</span>
              <span>
                {' '}
                pay us. And here&apos;s the part that should hit different: they did all of that despite a product we all know
                can be 10x better.{' '}
              </span>
            </p>
            <p className="mb-0">&nbsp;</p>
            <p className="mb-0">
              Despite install flows that lose people. Despite an experience that assumes technical confidence most players
              don&apos;t have. Despite friction we haven&apos;t fixed yet because we haven&apos;t had the resources, the focus, or
              frankly the ambition to fix it.
            </p>
            <p className="mb-0">&nbsp;</p>
            <p className="mb-0">They showed up anyway.</p>
            <p className="mb-0">&nbsp;</p>
            <p className="mb-0">So ask yourself the only question that matters</p>
            <p className="mb-0">&nbsp;</p>
            <p className="mb-0">
              <strong className="font-semibold text-neutral-strong">&ldquo;what happens when we make this great?&rdquo;</strong>
            </p>
            <p className="mb-0">&nbsp;</p>
            <p className="mb-0">Not incrementally better. Not improved onboarding. </p>
            <p className="mb-0">&nbsp;</p>
            <p className="mb-0">
              What happens when installing a mod is a single click? When the right mod finds you instead of the other way
              around? When a new player from Roblox or Minecraft lands here for the first time and the experience speaks
              their language instead of assuming they already know ours?
            </p>
            <p className="mb-0">&nbsp;</p>
            <p className="mb-0">
              The 1.8 billion people who haven&apos;t found us yet are not a different species. They&apos;re not less interested in
              shaping the games they play. They&apos;re hitting a wall we built, and most of them bounced before we ever had a
              chance to show them what was on the other side.
            </p>
            <p className="mb-0">&nbsp;</p>
            <p className="mb-0">
              That wall is coming down. And when it does, when the experience finally matches the community behind it, the
              question isn&apos;t whether those people convert. The question is how fast.
            </p>
            <p className="mb-0">&nbsp;</p>
            <p className="mb-0">
              6million subscribers by 2030 is not an ambitious target. It&apos;s a conservative read of what happens when a
              product loved by its core finally becomes accessible to everyone.
            </p>
            <p className="mb-0">&nbsp;</p>
          </div>
          </div>
        </section>

        {/* WHY NOW, WHY US */}
        <section className="w-full z-[2]">
          <div className="mx-auto w-full max-w-[576px] flex flex-col gap-3 items-start">
          <SectionHeading title="WHY NOW, WHY US" />
          <div className={cn(prose, 'w-full')}>
            <p className="mb-0">
              A generation of gamers grew up on Roblox and Minecraft expecting to shape every game they play. That
              expectation is now table stakes, studios are redesigning their entire development philosophy around it. At
              the same time, AI is collapsing the barrier to creation. The distance between &quot;I have an idea&quot; and &quot;I shipped
              a mod&quot; is shrinking every month.
            </p>
            <p className="mb-0">&nbsp;</p>
            <p className="mb-0">
              <strong className="font-semibold text-neutral-strong">
                The window to own this infrastructure is open. It will not stay open forever.
              </strong>
            </p>
            <p className="mb-0">&nbsp;</p>
            <p className="mb-0">
              And here&apos;s the thing: we&apos;re not starting from zero. We have 70 million users, twenty years of mod metadata,
              600 thousands people already paying, and margins most software companies would trade their entire engineering
              team for. We have the community trust that takes decades to build and can&apos;t be bought.
            </p>
            <p className="mb-0">&nbsp;</p>
            <p className="mb-0">
              What we don&apos;t have yet is the full infrastructure. The cross-title layer. The creator economy primitives. The
              experience that makes modding feel inevitable rather than optional. That&apos;s what we&apos;re here to build.
            </p>
            <p className="mb-0">&nbsp;</p>
            <p className="mb-0">
              Every person in this company owns a piece of that. Not metaphorically. Literally. The thing you ship next
              month either closes the gap or doesn&apos;t. The decision you make about how to design this feature, sequence this
              acquisition, prioritise this quarter, that&apos;s the company deciding what it is.
            </p>
            <p className="mb-0">&nbsp;</p>
          </div>
          </div>
        </section>

        {/* FOR THE 2AM PERSON — closing card */}
        <VisionCard title="FOR THE 2AM PERSON" className="z-[1]">
          <VisionClosingUnicornScene />
          <div className={cn(prose, 'max-w-[576px] w-full mx-auto')}>
            <p className="mb-0">{`We started with them. We'll end with them.`}</p>
            <p className="mb-0">&nbsp;</p>
            <p className="mb-0">
              The person staying late without being asked. The moderator keeping the peace in a thread that has no business
              staying civil. The developer who built the tool everyone uses and got almost nothing back. The new player who
              wants in but can&apos;t find the door.
            </p>
            <p className="mb-0">&nbsp;</p>
            <p className="mb-0">
              We are building the infrastructure for all of them. The tools they&apos;ve never had. The recognition system that
              makes quality visible. The payment rails that make sustainable creative work possible. The experience so good
              that showing up here feels like the obvious choice, not just for the hardcore community, but for every gamer
              who&apos;s ever wanted to make something.
            </p>
            <p className="mb-0">&nbsp;</p>
            <p className="mb-0">{`That is the mission. It's not complicated. It's just hard.`}</p>
            <p className="mb-0">&nbsp;</p>
            <p>
              <strong className="font-semibold text-neutral-strong">Let&apos;s get to work.</strong>
            </p>
            <p className="mb-0">&nbsp;</p>
          </div>
        </VisionCard>
      </main>

      <VisionPageFooter />
    </div>
  )
}
