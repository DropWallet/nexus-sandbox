'use client'

import { useState, useEffect, useRef } from 'react'
import NavigationBar from '@/components/Navigation'
import { Breadcrumb } from '@/components/Breadcrumb'
import { Typography } from '@/components/Typography'
import { GuideImage } from '@/components/GuideImage'
import Link from 'next/link'
import Icon from '@/components/Icon'
import { cn } from '@/lib/utils'

const guideBreadcrumbItems = [
  { label: 'All games', href: '#' },
  { label: 'Skyrim Special Edition', href: '#' },
  { label: 'Guides', href: '#' },
  { label: 'Getting started' },
]

const guideSections = [
  { id: 'introduction', step: 1, label: 'Introduction' },
  { id: 'setup', step: 2, label: 'Setup and requirements' },
  { id: 'install-vortex', step: 3, label: 'Install Vortex' },
  { id: 'install-address-library', step: 4, label: 'Install address library' },
  { id: 'install-engine-fixes', step: 5, label: 'Install engine fixes' },
  { id: 'install-skyui', step: 6, label: 'Install SkyUI' },
  { id: 'install-ussep', step: 7, label: 'Install USSEP' },
  { id: 'wrapping-up', step: 8, label: 'Wrapping up' },
]

const sectionPlaceholders: Record<string, string> = {
  introduction:
    "Welcome to Skyrim Modding. This guide is designed to take you from a fresh 'vanilla' installation to a modern, stable modding base. We've focused on the essential tools that every Skyrim Special Edition player needs to get started.",
  'install-vortex':
    'Vortex is Nexus Mods’ official mod manager. It handles downloading, installing, and enabling mods so you can focus on playing. Download Vortex from the Nexus Mods site and run the installer.',
  'install-address-library':
    'The Address Library allows many mods to work across game updates without needing new versions. Install it once and keep your mod list stable when the game updates.',
  'install-engine-fixes':
    'Engine Fixes resolves several engine-level bugs and limits in Skyrim Special Edition. It is required by many modern mods and improves stability.',
  'install-skyui':
    'SkyUI replaces the default game menus with a cleaner, more usable interface. It is one of the most widely required mods and will radically improve the game’s UI.',
  'install-ussep':
    'The Unofficial Skyrim Special Edition Patch (USSEP) fixes thousands of bugs left in the base game. Almost every mod list recommends or requires it.',
  'wrapping-up':
    'You now have a solid base: Vortex, Address Library, Engine Fixes, SkyUI, and USSEP. From here you can add graphics mods, gameplay overhauls, and more. Happy modding!',
}

/** Info/callout block for guide content - theme tokens (info-weak bg, info border) */
function GuideInfoBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col justify-start items-start self-stretch gap-1 p-3 rounded-base bg-blue-950 border border-info-subdued">
      <div className="flex justify-start items-center self-stretch gap-2 pb-2">
        <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center text-white/70" aria-hidden>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M1.6665 9.99999C1.6665 5.39999 5.39984 1.66666 9.99984 1.66666C14.5998 1.66666 18.3332 5.39999 18.3332 9.99999C18.3332 14.6 14.5998 18.3333 9.99984 18.3333C5.39984 18.3333 1.6665 14.6 1.6665 9.99999ZM10.8332 9.16666V14.1667H9.1665V9.16666H10.8332ZM9.99984 16.6667C6.32484 16.6667 3.33317 13.675 3.33317 9.99999C3.33317 6.32499 6.32484 3.33332 9.99984 3.33332C13.6748 3.33332 16.6665 6.32499 16.6665 9.99999C16.6665 13.675 13.6748 16.6667 9.99984 16.6667ZM10.8332 5.83332V7.49999H9.1665V5.83332H10.8332Z"
              fill="currentColor"
            />
          </svg>
        </span>
        <Typography variant="body-md-semibold" className="text-white/95">
          {title}
        </Typography>
      </div>
      <div className="text-neutral-subdued [&_strong]:font-semibold [&_strong]:text-neutral-moderate">
        {children}
      </div>
    </div>
  )
}

function ArrowCircle({
  direction,
  className,
  ...props
}: { direction: 'left' | 'right' } & React.HTMLAttributes<HTMLSpanElement>) {
  const isLeft = direction === 'left'
  return (
    <span
      className={cn(
        'flex justify-center items-center flex-grow-0 flex-shrink-0 overflow-hidden gap-2 p-2 rounded-full transition-colors',
        'border border-stroke-neutral-translucent-moderate',
        'text-neutral-strong group-hover:bg-neutral-strong group-hover:text-neutral-inverted',
        className
      )}
      {...props}
    >
      <span className="flex justify-start items-center flex-grow-0 flex-shrink-0 w-5 h-5 relative">
        {isLeft ? (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0" aria-hidden>
            <path
              d="M16.6668 9.16671L6.52516 9.16671L11.1835 4.50837L10.0002 3.33337L3.3335 10L10.0002 16.6667L11.1752 15.4917L6.52516 10.8334L16.6668 10.8334V9.16671Z"
              fill="currentColor"
            />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0" aria-hidden>
            <path
              d="M10.0002 3.33337L8.82516 4.50837L13.4752 9.16671H3.3335V10.8334H13.4752L8.82516 15.4917L10.0002 16.6667L16.6668 10L10.0002 3.33337Z"
              fill="currentColor"
            />
          </svg>
        )}
      </span>
    </span>
  )
}

interface StepNavControlsProps {
  activeSectionId: string
  onSectionChange: (sectionId: string) => void
  className?: string
}

function StepNavControls({ activeSectionId, onSectionChange, className }: StepNavControlsProps) {
  const index = guideSections.findIndex((s) => s.id === activeSectionId)
  const prevSection = index > 0 ? guideSections[index - 1] : null
  const nextSection = index >= 0 && index < guideSections.length - 1 ? guideSections[index + 1] : null

  const onlyOne = !prevSection !== !nextSection

  return (
    <div
      className={cn(
        'flex justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-4 pt-4',
        !prevSection && nextSection && 'justify-end',
        className
      )}
    >
      {prevSection && (
        <button
          type="button"
          onClick={() => onSectionChange(prevSection.id)}
          className={cn(
            'group flex justify-start items-center gap-2 xs:gap-4 p-[var(--spacing-3)] xs:p-4 rounded-lg text-left transition-colors cursor-pointer',
            'bg-surface-low border border-stroke-neutral-translucent-weak hover:bg-surface-mid hover:border-stroke-neutral-translucent-subdued',
            onlyOne ? 'w-full flex-grow' : 'min-w-0 flex-1'
          )}
        >
          <ArrowCircle direction="left" aria-hidden />
          <div className="flex flex-col justify-start items-start flex-grow min-w-0 gap-0 xs:gap-1">
            <Typography variant="title-sm" className="text-neutral-subdued uppercase self-stretch">
              Previous
            </Typography>
            <Typography variant="body-lg" className="text-neutral-moderate self-stretch hidden xs:block">
              {prevSection.label}
            </Typography>
          </div>
        </button>
      )}
      {nextSection && (
        <button
          type="button"
          onClick={() => onSectionChange(nextSection.id)}
          className={cn(
            'group flex justify-start items-center gap-2 xs:gap-4 p-[var(--spacing-3)] xs:p-4 rounded-lg text-left transition-colors cursor-pointer',
            'bg-surface-low border border-stroke-neutral-translucent-weak hover:bg-surface-mid hover:border-stroke-neutral-translucent-subdued',
            onlyOne ? 'w-full flex-grow' : 'min-w-0 flex-1'
          )}
        >
          <div className="flex flex-col justify-start items-start flex-grow min-w-0 gap-0 xs:gap-1">
            <Typography variant="title-sm" className="text-neutral-subdued uppercase self-stretch">
              Next
            </Typography>
            <Typography variant="body-lg" className="text-neutral-moderate self-stretch hidden xs:block">
              {nextSection.label}
            </Typography>
          </div>
          <ArrowCircle direction="right" aria-hidden />
        </button>
      )}
    </div>
  )
}

interface QuickLinksListProps {
  activeSectionId?: string
  onSectionChange?: (sectionId: string) => void
  className?: string
}

function QuickLinksList({ activeSectionId, onSectionChange, className }: QuickLinksListProps) {
  return (
    <div
      className={cn(
        'flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 gap-3 pl-4 pr-7 py-4 rounded-lg bg-surface-low border-0 md:border md:border-stroke-neutral-translucent-weak',
        className
      )}
      role="navigation"
      aria-label="Steps"
    >
      <div className="flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0">
        <Typography variant="title-sm" className="text-neutral-moderate uppercase">
          Steps
        </Typography>
      </div>
      <div className="flex flex-col justify-start items-stretch self-stretch gap-1">
        {guideSections.map((section) => {
          const isActive = activeSectionId === section.id
          const textClass = cn(
            'transition-colors',
            isActive ? 'text-primary-moderate' : 'text-neutral-subdued hover:text-neutral-moderate'
          )
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              onClick={() => onSectionChange?.(section.id)}
              className="flex justify-start items-baseline self-stretch pb-1 flex-grow-0 flex-shrink-0 gap-1"
              aria-current={isActive ? 'location' : undefined}
            >
              <Typography variant="body-md" as="span" className={cn('flex-shrink-0 w-4 tabular-nums', textClass)}>
                {section.step}
              </Typography>
              <Typography variant="body-md" as="span" className={cn('flex-1 min-w-0 text-left', textClass)}>
                {section.label}
              </Typography>
            </a>
          )
        })}
      </div>
    </div>
  )
}


const SECTION_STORAGE_KEY = 'skyrim-guide-section'

export default function SkyrimGuidePage() {
  const [quickLinksOpen, setQuickLinksOpen] = useState(false)
  const [activeSectionId, setActiveSectionId] = useState(guideSections[0].id)
  const hasRestoredFromStorage = useRef(false)

  useEffect(() => {
    const stored = localStorage.getItem(SECTION_STORAGE_KEY)
    if (stored && guideSections.some((s) => s.id === stored)) {
      setActiveSectionId(stored)
    }
    hasRestoredFromStorage.current = true
  }, [])

  useEffect(() => {
    if (!hasRestoredFromStorage.current) return
    localStorage.setItem(SECTION_STORAGE_KEY, activeSectionId)
  }, [activeSectionId])

  return (
    <div className="min-h-screen bg-surface-base">
      <NavigationBar />

      <div className="max-w-[1024px] mx-auto w-full pt-14">
        <div className="px-4 xs:px-5 sm:px-6 pt-6 pb-[calc(var(--spacing-10)-24px)]">
          <Breadcrumb items={guideBreadcrumbItems} />
        </div>

        <div
          className={cn(
            'flex flex-col sm:flex-row gap-0 sm:gap-[var(--spacing-14)]',
            'px-4 xs:px-5 sm:px-6',
            'pb-12'
          )}
        >
          {/* Left column: main content + mobile quick links */}
          <div className="min-w-0 flex-1 flex flex-col gap-6">
            {/* Mobile: sticky Steps block below fixed nav */}
            <div className="sm:hidden sticky top-24 z-10 bg-surface-base">
              <div className="bg-surface-low rounded-lg overflow-hidden">
                <button
                  type="button"
                  onClick={() => setQuickLinksOpen((o) => !o)}
                  className="w-full flex items-center justify-between gap-2 px-4 py-3 text-left hover:bg-surface-translucent-low transition-colors"
                  aria-expanded={quickLinksOpen}
                  aria-controls="mobile-quicklinks-list"
                  id="mobile-quicklinks-toggle"
                >
                  <Typography variant="body-md-semibold" className="text-neutral-strong">
                    Steps
                  </Typography>
                  <Icon
                    name="keyboardArrowDown"
                    size="sm"
                    className={cn('text-neutral-moderate transition-transform', quickLinksOpen && 'rotate-180')}
                  />
                </button>
                <div
                  id="mobile-quicklinks-list"
                  role="region"
                  aria-labelledby="mobile-quicklinks-toggle"
                  className={cn('border-t border-stroke-neutral-translucent-weak', !quickLinksOpen && 'hidden')}
                >
                  <div className="px-1 py-1">
                    <QuickLinksList activeSectionId={activeSectionId} onSectionChange={setActiveSectionId} />
                  </div>
                </div>
              </div>
            </div>

            {/* Main content area: persistent title + current section content + next/prev */}
            <div className="min-h-[400px] flex flex-col">
              <h1 className="text-neutral-strong mb-[var(--spacing-10)]">
                <Typography variant="heading-lg" as="span" className="sm:hidden">
                  Getting started with Skyrim
                </Typography>
                <Typography variant="heading-xl" as="span" className="hidden sm:inline">
                  Getting started with Skyrim
                </Typography>
              </h1>

              {(() => {
                const section = guideSections.find((s) => s.id === activeSectionId)
                if (!section) return null

                if (section.id === 'introduction') {
                  return (
                    <>
                      <div className="pb-[var(--spacing-10)]">
                        <div className="flex flex-col gap-0.5 mb-4">
                          <Typography variant="title-sm" as="span" className="text-primary-moderate uppercase">
                            step {section.step}
                          </Typography>
                          <Typography variant="heading-sm" as="h2" className="text-neutral-strong">
                            {section.label}
                          </Typography>
                        </div>
                        <div className="flex flex-col gap-2 pt-0">
<Typography variant="body-xl" className="text-neutral-subdued">
                          {sectionPlaceholders.introduction}
                        </Typography>
                        </div>
                        <div className="flex flex-col gap-2 py-6">
                          <GuideImage
                            src="/guides/section1-original-vs-skyui.png"
                            alt="Original Skyrim UI compared with SkyUI mod"
                            caption="The SkyUI mod will radically improve the games UI"
                          />
                        </div>
                        <div className="flex flex-col gap-2 pt-0">
<Typography variant="body-xl-semibold" as="p" className="text-neutral-strong">
                          What you'll achieve:
                        </Typography>
                          <ul className="list-disc list-outside flex flex-col gap-1 mt-2 pl-6 text-neutral-subdued">
                            {[
                              'Set up Vortex as your primary Mod Manager',
                              'Install the Skyrim Script Extender (SKSE)',
                              'Configure essential engine and stability fixes',
                              'Modernise the user interface with SkyUI',
                            ].map((item, i) => (
                              <li key={i}>
                                <Typography variant="body-xl" as="span" className="text-neutral-subdued">
                                  {item}
                                </Typography>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <StepNavControls activeSectionId={activeSectionId} onSectionChange={setActiveSectionId} />
                    </>
                  )
                }

                if (section.id === 'setup') {
                  return (
                    <>
                      <div className="pb-[var(--spacing-10)]">
                        <div className="flex flex-col gap-0.5 mb-4">
                          <Typography variant="title-sm" as="span" className="text-primary-moderate uppercase">
                            step {section.step}
                          </Typography>
                          <Typography variant="heading-sm" as="h2" className="text-neutral-strong">
                            {section.label}
                          </Typography>
                        </div>
                        <ul className="list-disc list-outside flex flex-col gap-1 mt-2 pl-6 pb-[var(--spacing-8)] text-neutral-subdued">
                          {[
                            'Skyrim should be installed only from Steam or GOG. Versions from other stores have issues which means they cannot work properly with some mods.',
                            'These guides assume you are using the English version of the game.',
                            'Skyrim should be installed on a Solid State Hard Drive (SSD) if possible, otherwise the game can take a particularly long time to load if modded.',
                            'Windows 10/11 is required.',
                          ].map((item, i) => (
                            <li key={i}>
                              <Typography variant="body-xl" as="span" className="text-neutral-subdued">
                                {item}
                              </Typography>
                            </li>
                          ))}
                        </ul>

                        <Typography variant="body-xl-semibold" as="h3" className="text-neutral-strong pt-6 pb-[var(--spacing-2)]">
                          Installing VC++ Redistributables
                        </Typography>
                        <div className="flex flex-col gap-2 pt-0">
                          <Typography variant="body-xl" className="text-neutral-subdued">
                            Most engine mods and tools require the latest Visual C++ Redistributables to be installed. We will use an all-in-one package that will install all possible versions. Failure to have latest versions installed will result in an immediate crash when launching the game or modding tools.
                          </Typography>
                          <Typography variant="body-xl" className="text-neutral-subdued">
                            Please install the redistributables even if you have them installed already, as they are often outdated.
                          </Typography>
                        </div>
                        <div className="flex flex-col gap-2 py-6">
                          <GuideImage
                            src="/guides/section-setup-image1.png"
                            alt="VC++ Redistributable AIO download page on TechPowerUp"
                            caption="Download VC++ Redistributables from TechPowerUp"
                          />
                        </div>
                        <ol className="list-decimal list-outside flex flex-col gap-1 mt-2 pl-6 text-neutral-subdued">
                          <li>
                            <Typography variant="body-xl" as="span" className="text-neutral-subdued">
                              Download VC++ AIO from TechPowerUp.
                            </Typography>
                          </li>
                          <li>
                            <Typography variant="body-xl" as="span" className="text-neutral-subdued">
                              Extract the archive and run the included{' '}
                              <span className="text-neutral-moderate italic font-semibold">install_all.bat</span>
                              {' '}as an administrator.
                            </Typography>
                          </li>
                        </ol>
                        <Link
                          href="https://www.techpowerup.com/download/visual-c-redistributable-runtime-package-all-in-one/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(
                            'self-start inline-flex rounded-base font-medium px-4 py-2 text-base transition-colors mt-[var(--spacing-4)]',
                            'focus:outline-none focus:ring-2 focus:ring-primary-moderate focus:ring-offset-2',
                            'bg-primary-moderate text-neutral-inverted hover:bg-primary-strong'
                          )}
                        >
                          Get VC++ AIO
                        </Link>
                      </div>
                      <StepNavControls activeSectionId={activeSectionId} onSectionChange={setActiveSectionId} />
                    </>
                  )
                }

                if (section.id === 'install-vortex') {
                  // Images 1–10 live in public/guides/. Use root-relative path so they load reliably.
                  const g = (n: number) => `/guides/section2-image${n}.png`
                  return (
                    <>
                      <div className="pb-[var(--spacing-10)]">
                        <div className="flex flex-col gap-0.5 mb-4">
                          <Typography variant="title-sm" as="span" className="text-primary-moderate uppercase">
                            step {section.step}
                          </Typography>
                          <Typography variant="heading-sm" as="h2" className="text-neutral-strong">
                            {section.label}
                          </Typography>
                        </div>
                        <div className="flex flex-col gap-2 pt-0">
                          <Typography variant="body-xl" className="text-neutral-subdued">
                            The first thing you need to do is download Vortex. This is our official mod manager, which
                            will allow you to install and manage mods seamlessly without you ever needing to manually
                            touch your game folders.
                          </Typography>
                        </div>
                        <div className="flex flex-col gap-2 pt-6">
                          <Link
                            href="https://www.nexusmods.com/site/mods/1"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                              'self-start inline-flex justify-center items-center gap-2 h-9 px-2.5 rounded-base font-medium',
                              'bg-primary-moderate text-neutral-inverted hover:bg-primary-strong',
                              'focus:outline-none focus:ring-2 focus:ring-primary-moderate focus:ring-offset-2'
                            )}
                          >
                            Download Vortex
                          </Link>
                        </div>
                        <div className="flex flex-col gap-2 py-6">
                          <GuideImage
                            src={g(1)}
                            alt="Vortex installation screens"
                            caption="Vortex installation screens"
                          />
                        </div>
                        <div className="flex flex-col gap-2 pt-0">
                          <Typography variant="body-xl" className="text-neutral-subdued">
                            Vortex will automatically handle Nexus Download links. This means that clicking <span className="text-neutral-moderate italic font-semibold">Mod manager download</span> will download and install mods inside of Vortex.
                            <br /><br />
                            After first installing Vortex, the app will look something like this:
                          </Typography>
                        </div>
                        <div className="flex flex-col gap-2 py-6">
                          <GuideImage
                            src={g(2)}
                            alt="Vortex after installation"
                            caption="This is what Vortex looks like after installation"
                          />
                        </div>
                        <Typography variant="heading-sm" as="h3" className="text-neutral-strong pt-0 pb-[var(--spacing-2)]">
                          Linking your Nexus Mods account
                        </Typography>
                        <div className="flex flex-col gap-2 pt-0">
                          <Typography variant="body-xl" className="text-neutral-subdued">
                            To have as seamless of a modding experience as possible, you need to link your Nexus Mods
                            account to Vortex. To do this, first select the profile icon in the top-right corner.
                          </Typography>
                        </div>
                        <div className="flex flex-col gap-2 py-6">
                          <GuideImage
                            src={g(3)}
                            alt="Profile icon in Vortex top-right"
                            caption="Select the profile icon to link your account"
                          />
                        </div>
                        <div className="flex flex-col gap-2 pt-0">
                          <Typography variant="body-xl" className="text-neutral-subdued">
                            You should automatically be taken to a web page in your default browser; if not, you must copy
                            and paste the address into your browser manually.
                          </Typography>
                        </div>
                        <div className="flex flex-col gap-2 py-6">
                          <GuideImage
                            src={g(4)}
                            alt="Authorise and continue, then select a game to manage"
                            caption="Authorise and continue, then select a game to manage"
                          />
                        </div>
                        <div className="flex flex-col gap-2 pt-0">
                          <Typography variant="body-xl" className="text-neutral-subdued [&_em]:italic [&_em]:text-neutral-moderate [&_em]:font-semibold">
                            Select <em>authorise</em>, then select <em>continue</em>. You have now successfully linked your account, and can return to the Vortex app.
                            <br /><br />
                            Next, click on <em>Select a game to manage</em>.
                          </Typography>
                        </div>
                        <div className="flex flex-col gap-2 py-6">
                          <GuideImage
                            src={g(5)}
                            alt="Select a game to manage"
                            caption="Select a game to manage"
                          />
                        </div>
                        <div className="flex flex-col gap-2 pt-0">
                          <Typography variant="body-xl" className="text-neutral-subdued [&_em]:italic [&_em]:text-neutral-moderate [&_em]:font-semibold">
                            Search for Skyrim, select <em>Skyrim Special Edition</em>.
                          </Typography>
                        </div>
                        <div className="flex flex-col gap-2 py-6">
                          <GuideImage
                            src={g(6)}
                            alt="Search and select Skyrim Special Edition"
                            caption="Search and select Skyrim Special Edition"
                          />
                        </div>
                        <div className="flex flex-col gap-2 pt-0">
                          <Typography variant="body-xl" className="text-neutral-subdued [&_em]:italic [&_em]:text-neutral-moderate [&_em]:font-semibold">
                            Vortex is now managing Skyrim Special Edition mods. On the left sidebar is now a section
                            titled <span className="text-neutral-moderate italic font-semibold">SSE</span>. You will be using this section for modding Skyrim.
                            <br /><br />
                            First, view the notification on the top right corner which says <span className="text-neutral-moderate italic font-semibold">Skyrim Script Extender 64 (SKSE64) is not installed</span>. Selecting the <em>fix</em> option will automatically install Skyrim Script Extender, which is an important mod loader
                            for Skyrim.
                          </Typography>
                        </div>
                        <div className="flex flex-col gap-2 py-6">
                          <GuideImage
                            src={g(7)}
                            alt="SKSE64 fix notification in Vortex"
                            caption="Click fix to install SKSE64"
                          />
                        </div>
                        <div className="flex flex-col gap-2 pt-0">
                          <Typography variant="body-xl" className="text-neutral-subdued [&_em]:italic [&_em]:text-neutral-moderate [&_em]:font-semibold">
                            Select <em>download manually</em>.
                          </Typography>
                        </div>
                        <div className="flex flex-col gap-2 py-6">
                          <GuideImage
                            src={g(8)}
                            alt="Download manually option"
                            caption="Download manually"
                          />
                        </div>
                        <div className="flex flex-col gap-2 pt-0">
                          <Typography variant="body-xl" className="text-neutral-subdued [&_em]:italic [&_em]:text-neutral-moderate [&_em]:font-semibold">
                            Please note that the version of SKSE64 will depend on the game version. Vortex will
                            automatically recommend the correct SKSE64 version for your game.
                            <br /><br />
                            Select <em>Slow download</em>.
                          </Typography>
                        </div>
                        <div className="flex flex-col gap-2 py-6">
                          <GuideImage
                            src={g(9)}
                            alt="SKSE64 version and Slow download"
                            caption="Select Slow download"
                          />
                        </div>
                        <div className="flex flex-col gap-2 pt-0">
                          <Typography variant="body-xl" className="text-neutral-subdued">
                            The mod will now automatically download and install within Vortex.
                          </Typography>
                        </div>
                        <div className="flex flex-col gap-2 py-6">
                          <GuideImage
                            src={g(10)}
                            alt="SKSE64 installed in Vortex"
                            caption="SKSE64 installed"
                          />
                        </div>
                        <div className="flex flex-col gap-2 pt-0">
                          <Typography variant="body-xl" className="text-neutral-subdued">
                            You have successfully set up Vortex Mod Manager, as well as installed your first mod!
                          </Typography>
                        </div>
                      </div>
                      <StepNavControls activeSectionId={activeSectionId} onSectionChange={setActiveSectionId} />
                    </>
                  )
                }

                if (section.id === 'install-address-library') {
                  return (
                    <>
                      <div className="pb-[var(--spacing-10)]">
                        <div className="flex flex-col gap-0.5 mb-4">
                          <Typography variant="title-sm" as="span" className="text-primary-moderate uppercase">
                            step {section.step}
                          </Typography>
                          <Typography variant="heading-sm" as="h2" className="text-neutral-strong">
                            {section.label}
                          </Typography>
                        </div>
                        <div className="flex flex-col gap-5 pt-0">
                          <Typography variant="body-xl" className="text-neutral-subdued">
                            Next we're going to install “Address Library”. This is a common requirement for Skyrim
                            Script Extender (SKSE) plugins. Download it from the button below.
                          </Typography>
                          <Link
                            href="https://www.nexusmods.com/skyrimspecialedition/mods/32444"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                              'self-start inline-flex rounded-base font-medium px-4 py-2 text-base transition-colors',
                              'focus:outline-none focus:ring-2 focus:ring-primary-moderate focus:ring-offset-2',
                              'bg-primary-moderate text-neutral-inverted hover:bg-primary-strong'
                            )}
                          >
                            Get Address Library
                          </Link>
                          <GuideInfoBlock title="What is SKSE?">
                            <Typography variant="body-md" as="p" className="text-neutral-subdued [&_strong]:font-semibold [&_strong]:text-neutral-moderate">
                              <strong>The Skyrim Script Extender (SKSE)</strong> is a vital tool that allows more advanced mods to function by expanding the game's core capabilities.
                              <br /><br />
                              Many modern mods rely on <strong>SKSE plugins</strong> to interact directly with the game engine. Because these plugins are version-specific, always check that a mod supports your current game version before installing.
                              <br /><br />
                              Modern SKSE plugins often use the <strong>Address Library</strong> to stay compatible with game updates—which is why we install it next.
                            </Typography>
                          </GuideInfoBlock>
                        </div>
                        <div className="flex flex-col gap-2 py-6">
                          <GuideImage
                            src="/guides/section3-image1.png"
                            alt="Download or install Address Library in Vortex"
                            caption="Address Library in Vortex"
                          />
                        </div>
                        <div className="flex flex-col gap-2 pt-0">
                          <Typography variant="body-xl" className="text-neutral-subdued">
                            Similar to SKSE, it will automatically install itself after it has finished downloading in Vortex.
                          </Typography>
                        </div>
                        <div className="flex flex-col gap-2 py-6">
                          <GuideImage
                            src="/guides/section3-image2.png"
                            alt="Address Library installed"
                            caption="Address Library installed"
                          />
                        </div>
                      </div>
                      <StepNavControls activeSectionId={activeSectionId} onSectionChange={setActiveSectionId} />
                    </>
                  )
                }

                if (section.id === 'install-engine-fixes') {
                  return (
                    <>
                      <div className="pb-[var(--spacing-10)]">
                        <div className="flex flex-col gap-0.5 mb-4">
                          <Typography variant="title-sm" as="span" className="text-primary-moderate uppercase">
                            step {section.step}
                          </Typography>
                          <Typography variant="heading-sm" as="h2" className="text-neutral-strong">
                            {section.label}
                          </Typography>
                        </div>
                        <div className="flex flex-col gap-2 pt-0">
                          <Typography variant="body-xl" className="text-neutral-subdued">
                            Engine Fixes is an SKSE64 plugin to fix various issues with the Skyrim Special Edition engine which fixes
                            many critical game engine bugs. Additionally, it enables receiving Steam/GOG achievements
                            when using mods.
                          </Typography>
                          <Typography variant="body-xl" className="text-neutral-subdued">
                            Engine Fixes consists of an SKSE64 file, which can be installed directly with Vortex. It
                            also requires installing the SKSE64 Preloader available on the same page.
                          </Typography>
                          <Link
                            href="https://www.nexusmods.com/skyrimspecialedition/mods/17230"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                              'self-start inline-flex rounded-base font-medium px-4 py-2 text-base transition-colors mt-[var(--spacing-4)]',
                              'focus:outline-none focus:ring-2 focus:ring-primary-moderate focus:ring-offset-2',
                              'bg-primary-moderate text-neutral-inverted hover:bg-primary-strong'
                            )}
                          >
                            Get Engine Fixes
                          </Link>
                        </div>
                        <div className="flex flex-col gap-2 py-6">
                          <GuideImage
                            src="/guides/section4-image1.png"
                            alt="Engine Fixes on Nexus Mods"
                            caption="Engine Fixes mod page"
                          />
                        </div>
                        <div className="flex flex-col gap-2 pt-0">
                          <Typography variant="body-xl" className="text-neutral-subdued">
                            First, download and install <span className="text-neutral-moderate italic font-semibold">Engine Fixes - Main File</span> by selecting <span className="text-neutral-moderate italic font-semibold">Mod Manager download</span>.
                            Select the latest available option in the mod installer and press Finish. Mod installers are
                            often called FOMODs.
                          </Typography>
                        </div>
                        <div className="flex flex-col gap-2 py-6">
                          <GuideImage
                            src="/guides/section4-image2.png"
                            alt="Engine Fixes FOMOD installer"
                            caption="Select latest option and Finish"
                          />
                        </div>
                        <div className="flex flex-col gap-2 pt-0">
                          <Typography variant="body-xl" className="text-neutral-subdued">
                            Next, download and install <span className="text-neutral-moderate italic font-semibold">Engine Fixes - SKSE64 Preloader - Vortex Easy Install</span>.
                          </Typography>
                        </div>
                        <div className="flex flex-col gap-2 py-6">
                          <GuideImage
                            src="/guides/section4-image3.png"
                            alt="Engine Fixes installed"
                            caption="Engine Fixes installed"
                          />
                        </div>
                        <div className="flex flex-col gap-2 pt-0">
                          <Typography variant="body-xl" className="text-neutral-subdued">
                            You have now successfully installed Engine Fixes!
                          </Typography>
                        </div>
                      </div>
                      <StepNavControls activeSectionId={activeSectionId} onSectionChange={setActiveSectionId} />
                    </>
                  )
                }

                if (section.id === 'install-skyui') {
                  return (
                    <>
                      <div className="pb-[var(--spacing-10)]">
                        <div className="flex flex-col gap-0.5 mb-4">
                          <Typography variant="title-sm" as="span" className="text-primary-moderate uppercase">
                            step {section.step}
                          </Typography>
                          <Typography variant="heading-sm" as="h2" className="text-neutral-strong">
                            {section.label}
                          </Typography>
                        </div>
                        <div className="flex flex-col gap-2 pt-0">
                          <Typography variant="body-xl" className="text-neutral-subdued">
                            SkyUI adds a pc-friendly user interface with new advanced features such as the Mod Configuration Menu.
                          </Typography>
                          <Typography variant="body-xl" className="text-neutral-subdued">
                            Select the Vortex button to automatically download and install SkyUI.
                          </Typography>
                          <Link
                            href="https://www.nexusmods.com/skyrimspecialedition/mods/12604"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                              'self-start inline-flex rounded-base font-medium px-4 py-2 text-base transition-colors mt-[var(--spacing-4)]',
                              'focus:outline-none focus:ring-2 focus:ring-primary-moderate focus:ring-offset-2',
                              'bg-primary-moderate text-neutral-inverted hover:bg-primary-strong'
                            )}
                          >
                            Get SkyUI
                          </Link>
                        </div>
                        <div className="flex flex-col gap-2 py-6">
                          <GuideImage
                            src="/guides/section5-image1.png"
                            alt="SkyUI mod page - Vortex download"
                            caption="Select Vortex to download and install SkyUI"
                          />
                        </div>
                        <div className="flex flex-col gap-2 pt-0">
                          <Typography variant="body-xl" className="text-neutral-subdued">
                            That’s it! You have successfully installed SkyUI.
                          </Typography>
                        </div>
                        <div className="flex flex-col gap-2 py-6">
                          <GuideImage
                            src="/guides/section5-image2.png"
                            alt="SkyUI installed in Vortex"
                            caption="SkyUI installed"
                          />
                        </div>
                        <div className="flex flex-col gap-2 pt-0">
                          <Typography variant="body-xl" className="text-neutral-subdued">
                            Note that SkyUI is your first mod which uses a plugin file. These can be either .esm, .esp. or
                            .esl files. These types of files use the game’s mods system to add new content and changes to
                            the game, and can be managed by selecting the Plugins tab on the left sidebar.
                          </Typography>
                        </div>
                        <div className="flex flex-col gap-2 py-6">
                          <GuideImage
                            src="/guides/section5-image3.png"
                            alt="Plugins tab in Vortex"
                            caption="Plugins tab"
                          />
                        </div>
                      </div>
                      <StepNavControls activeSectionId={activeSectionId} onSectionChange={setActiveSectionId} />
                    </>
                  )
                }

                if (section.id === 'install-ussep') {
                  return (
                    <>
                      <div className="pb-[var(--spacing-10)]">
                        <div className="flex flex-col gap-0.5 mb-4">
                          <Typography variant="title-sm" as="span" className="text-primary-moderate uppercase">
                            step {section.step}
                          </Typography>
                          <Typography variant="heading-sm" as="h2" className="text-neutral-strong">
                            Install the Unofficial Skyrim Special Edition patch
                          </Typography>
                        </div>
                        <div className="flex flex-col gap-2 pt-0">
                          <Typography variant="body-xl" className="text-neutral-subdued">
                            The Unofficial Skyrim Special Edition Patch, also known as USSEP, is a comprehensive bug
                            fixing mod which is a common requirement for many other mods. This is important for fixing
                            scripting errors, which could otherwise cause problems with completing quests in the game.
                          </Typography>
                          <Link
                            href="https://www.nexusmods.com/skyrimspecialedition/mods/266"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                              'self-start inline-flex rounded-base font-medium px-4 py-2 text-base transition-colors my-[var(--spacing-4)]',
                              'focus:outline-none focus:ring-2 focus:ring-primary-moderate focus:ring-offset-2',
                              'bg-primary-moderate text-neutral-inverted hover:bg-primary-strong'
                            )}
                          >
                            Get USSE Patch
                          </Link>
                          <Typography variant="body-xl" className="text-neutral-subdued">
                            Similar to installing SkyUI, just select the Vortex button on the top right corner of the
                            page to automatically download and install. This file may take longer to download than the
                            previous mods as a free user.
                            <br /><br />
                            You can unlock faster download speeds by subscribing to Nexus Premium.
                          </Typography>
                        </div>
                        <div className="flex flex-col gap-2 py-6">
                          <GuideImage
                            src="/guides/section6-image1.png"
                            alt="USSEP mod page - Vortex download"
                            caption="Select Vortex to download and install USSEP"
                          />
                        </div>
                        <div className="flex flex-col gap-2 pt-0">
                          <Typography variant="body-xl" className="text-neutral-subdued">
                            <span className="text-neutral-moderate italic font-semibold">unofficial skyrim special edition patch.esp</span> has been added as a plugin file. Mods that
                            require USSEP will likely require this plugin as a <span className="text-neutral-moderate italic font-semibold">master file</span>, which means that the
                            changes to the game will be overwritten in this order:
                          </Typography>
                          <ul className="list-disc list-outside flex flex-col gap-1 mt-2 pl-6 text-neutral-subdued">
                            {['Skyrim Base Game', 'Skyrim DLCs', 'Creation Club', 'USSEP', 'Mods which require USSEP'].map((item, i) => (
                              <li key={i}>
                                <Typography variant="body-xl" as="span" className="text-neutral-subdued">
                                  {item}
                                </Typography>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="flex flex-col gap-2 py-6">
                          <GuideImage
                            src="/guides/section6-image2.png"
                            alt="Plugin load order in Vortex"
                            caption="Plugin load order"
                          />
                        </div>
                        <div className="flex flex-col gap-2 pt-0">
                          <Typography variant="body-xl" className="text-neutral-subdued">
                            If you have purchased the Anniversary Edition DLC or any Creation Club creations, you need to
                            install the Unofficial Skyrim Creation Club Content Patches mod. Again, select the Vortex
                            button on the right side.
                          </Typography>
                        </div>
                        <div className="flex flex-col gap-2 py-6">
                          <GuideImage
                            src="/guides/section6-image3.png"
                            alt="USCCP mod page - Vortex download"
                            caption="Select Vortex for USCCP"
                          />
                        </div>
                        <div className="flex flex-col gap-2 pt-0">
                          <Typography variant="body-xl" className="text-neutral-subdued">
                            Similar to Engine Fixes, this is using a FOMOD installer. Select Choose Creations.
                          </Typography>
                        </div>
                        <div className="flex flex-col gap-2 py-6">
                          <GuideImage
                            src="/guides/section6-image4.png"
                            alt="USCCP FOMOD - Choose Creations"
                            caption="Choose Creations"
                          />
                        </div>
                        <div className="flex flex-col gap-2 pt-0">
                          <Typography variant="body-xl" className="text-neutral-subdued">
                            Available patches for your game will be automatically selected. Select Finish.
                          </Typography>
                        </div>
                        <div className="flex flex-col gap-2 py-6">
                          <GuideImage
                            src="/guides/section6-image5.png"
                            alt="USCCP FOMOD - Finish"
                            caption="Select Finish"
                          />
                        </div>
                        <div className="flex flex-col gap-2 pt-0">
                          <Typography variant="body-xl" className="text-neutral-subdued">
                            You have now successfully installed USSEP and USCCP. Please note that if you purchase the
                            Anniversary DLC or any new Creation Club creations, you will need to reinstall USCCP.
                          </Typography>
                        </div>
                      </div>
                      <StepNavControls activeSectionId={activeSectionId} onSectionChange={setActiveSectionId} />
                    </>
                  )
                }

                if (section.id === 'wrapping-up') {
                  const discordCommunities = [
                    { name: 'Modding Linked', href: '#' },
                    { name: 'xEdit', href: '#' },
                    { name: 'Aetherius Modding', href: '#' },
                  ]
                  return (
                    <>
                      <div className="pb-[var(--spacing-10)]">
                        <div className="flex flex-col gap-0.5 mb-4">
                          <Typography variant="title-sm" as="span" className="text-primary-moderate uppercase">
                            step {section.step}
                          </Typography>
                          <Typography variant="heading-sm" as="h2" className="text-neutral-strong">
                            {section.label}
                          </Typography>
                        </div>
                        <div className="flex flex-col gap-2 py-4">
                          <Typography variant="body-xl" className="text-neutral-subdued">
                            Finishing this guide, you have successfully set up Vortex Mod Manager, Installed SKSE64,
                            SkyUI as well as critical bug fixes for the game.
                            <br /><br />
                            At this point, you have all the basic understandings of Skyrim modding to either start
                            playing the game, browsing the plethora of content on Nexus Mods, or play a curated
                            experience through a collection or modding guide. Below are some of the highest
                            recommendations from the Skyrim modding community.
                          </Typography>
                        </div>
                        <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 pt-6">
                          <Typography variant="body-xl-semibold" as="h3" className="text-neutral-strong pb-4">
                            Get started with these collections
                          </Typography>
                          <div className="flex flex-col justify-center items-center self-stretch flex-grow-0 flex-shrink-0 gap-2 pb-6">
                            {[
                              {
                                href: 'https://www.nexusmods.com/games/skyrimspecialedition/collections/qdurkx',
                                title: "Gate to Sovengarde",
                                description: "One of the most comprehensive Skyrim collections around, improving gameplay, graphics and quests.",
                                image: '/guides/section7-collection1.png',
                              },
                              {
                                href: 'https://dragonbornsfate.moddinglinked.com/',
                                title: "A Dragonborn's Fate",
                                description: "This Wabbajack list offers stability, performance enhancements, and better gameplay without straying from the original Skyrim experience.",
                                image: '/guides/section7-collection2.png',
                              },
                              {
                                href: 'https://colinswrath.github.io/WindsOfTheNorth/',
                                title: "Winds Of The North",
                                description: "Forge your destiny in the frigid north with this modlist, designed to overhaul gameplay and enhance graphics while preserving Skyrim's original charm.",
                                image: '/guides/section7-collection3.png',
                              },
                            ].map((collection) => (
                              <Link
                                key={collection.href}
                                href={collection.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 overflow-hidden gap-4 p-2 rounded-lg bg-surface-mid border border-stroke-neutral-translucent-subdued transition-colors hover:bg-surface-high hover:border-stroke-neutral-translucent-moderate"
                              >
                                <img
                                  src={collection.image}
                                  alt=""
                                  className="flex-shrink-0 w-16 h-20 object-cover rounded"
                                />
                                <div className="flex flex-col justify-center items-start flex-1 min-w-0 gap-0.5">
                                  <Typography variant="body-lg-semibold" className="text-neutral-strong">
                                    {collection.title}
                                  </Typography>
                                  <Typography variant="body-md" className="text-neutral-subdued">
                                    {collection.description}
                                  </Typography>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 pt-6">
                          <Typography variant="body-xl-semibold" as="h3" className="text-neutral-moderate">
                            Communities which are great for new modders
                          </Typography>
                          <div className="flex flex-col gap-2 pt-4">
                            {discordCommunities.map((community) => (
                              <a
                                key={community.name}
                                href={community.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex justify-start items-center self-stretch gap-4 p-4 rounded-lg border transition-colors hover:opacity-90"
                                style={{ backgroundColor: 'rgba(83, 102, 251, 0.16)', borderColor: 'rgba(83, 102, 251, 0.48)' }}
                              >
                                <div className="flex flex-col justify-start items-start flex-grow min-w-0 gap-1">
                                  <Typography variant="title-sm" as="span" className="uppercase text-[#5366fb]">
                                    Discord Community
                                  </Typography>
                                  <Typography variant="body-lg" className="text-neutral-moderate">
                                    {community.name}
                                  </Typography>
                                </div>
                                <span className="flex-shrink-0 flex justify-center items-center w-9 h-9 rounded-full border border-white/30 text-zinc-200">
                                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                                    <path
                                      d="M15.776 4.38644C14.7138 3.89902 13.5746 3.53991 12.3836 3.33424C12.3619 3.33027 12.3402 3.34019 12.3291 3.36003C12.1826 3.62059 12.0203 3.96052 11.9066 4.22771C10.6256 4.03592 9.35115 4.03592 8.09638 4.22771C7.98272 3.95458 7.81455 3.62059 7.66739 3.36003C7.65622 3.34085 7.63455 3.33093 7.61286 3.33424C6.42248 3.53926 5.28335 3.89836 4.22042 4.38644C4.21122 4.39041 4.20333 4.39703 4.1981 4.40562C2.0374 7.63364 1.4455 10.7823 1.73587 13.892C1.73718 13.9072 1.74572 13.9217 1.75755 13.931C3.18311 14.9779 4.56401 15.6135 5.91927 16.0347C5.94096 16.0413 5.96394 16.0334 5.97774 16.0155C6.29833 15.5778 6.5841 15.1161 6.82913 14.6307C6.84359 14.6023 6.82979 14.5685 6.80023 14.5573C6.34694 14.3853 5.91533 14.1757 5.50014 13.9376C5.4673 13.9184 5.46467 13.8715 5.49488 13.849C5.58225 13.7835 5.66964 13.7154 5.75307 13.6466C5.76817 13.634 5.7892 13.6314 5.80695 13.6393C8.53455 14.8847 11.4875 14.8847 14.1829 13.6393C14.2007 13.6307 14.2217 13.6334 14.2375 13.6459C14.3209 13.7147 14.4083 13.7835 14.4963 13.849C14.5265 13.8715 14.5246 13.9184 14.4917 13.9376C14.0765 14.1803 13.6449 14.3853 13.191 14.5566C13.1614 14.5679 13.1483 14.6023 13.1627 14.6307C13.413 15.1155 13.6988 15.5771 14.0134 16.0149C14.0266 16.0334 14.0502 16.0413 14.0719 16.0347C15.4338 15.6135 16.8146 14.9779 18.2402 13.931C18.2527 13.9217 18.2606 13.9078 18.2619 13.8926C18.6094 10.2975 17.6798 7.17468 15.7977 4.40627C15.7931 4.39703 15.7852 4.39041 15.776 4.38644ZM7.23645 11.9985C6.41526 11.9985 5.73861 11.2446 5.73861 10.3187C5.73861 9.39282 6.40213 8.6389 7.23645 8.6389C8.07732 8.6389 8.74741 9.39944 8.73427 10.3187C8.73427 11.2446 8.07075 11.9985 7.23645 11.9985ZM12.7745 11.9985C11.9533 11.9985 11.2766 11.2446 11.2766 10.3187C11.2766 9.39282 11.9401 8.6389 12.7745 8.6389C13.6153 8.6389 14.2854 9.39944 14.2723 10.3187C14.2723 11.2446 13.6153 11.9985 12.7745 11.9985Z"
                                      fill="currentColor"
                                    />
                                  </svg>
                                </span>
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                      <StepNavControls activeSectionId={activeSectionId} onSectionChange={setActiveSectionId} />
                    </>
                  )
                }

                const body = sectionPlaceholders[section.id] ?? 'Content for this step.'
                return (
                  <>
                    <div className="pb-[var(--spacing-10)]">
                      <div className="mb-4">
                        <Typography variant="body-md" as="span" className="text-primary-moderate font-semibold">
                          STEP {section.step}
                        </Typography>
                        <Typography variant="heading-sm" as="h2" className="text-neutral-strong mt-1">
                          {section.label}
                        </Typography>
                      </div>
<Typography variant="body-xl" className="text-neutral-moderate mb-6">
                      {body}
                    </Typography>
                    </div>
                    <StepNavControls activeSectionId={activeSectionId} onSectionChange={setActiveSectionId} />
                  </>
                )
              })()}
            </div>
          </div>

          {/* Right column: sticky Quick links (visible from sm) */}
          <aside className="hidden md:block shrink-0 self-stretch">
            <div className="sticky top-6 lg:top-24">
              <QuickLinksList activeSectionId={activeSectionId} onSectionChange={setActiveSectionId} />
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
