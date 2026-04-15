'use client'

import { useState } from 'react'
import Image from 'next/image'
import UnicornScene from 'unicornstudio-react/next'

const SDK_URL =
  'https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.1.6/dist/unicornStudio.umd.js'
const PROJECT_ID = '7f5WDpqxua7qQZn6uBUe'

/**
 * Native 795×488 art aspect at all breakpoints; inner shell clips WebGL to the box.
 */
export function VisionHeroUnicornScene() {
  const [hasError, setHasError] = useState(false)

  const frameClass =
    'relative mx-auto aspect-[795/488] w-full max-w-[795px] min-w-0 overflow-hidden bg-black'

  if (hasError) {
    return (
      <div className={frameClass}>
        <Image
          src="/vision/hero.png"
          alt=""
          fill
          className="object-cover object-[50%_15%]"
          sizes="(max-width: 795px) 100vw, 795px"
          priority
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 55% 60% at 50% 45%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.75) 65%, rgba(0,0,0,1) 100%)',
          }}
          aria-hidden
        />
      </div>
    )
  }

  return (
    <div className={frameClass}>
      <div className="absolute inset-0 min-h-0 min-w-0 overflow-hidden">
        <UnicornScene
          projectId={PROJECT_ID}
          sdkUrl={SDK_URL}
          width="100%"
          height="100%"
          scale={1}
          dpi={1.5}
          fps={60}
          lazyLoad
          production
          altText="The 2am person — ambient scene"
          ariaLabel="Decorative WebGL animation for the Vision hero"
          showPlaceholderOnError={false}
          showPlaceholderWhileLoading={false}
          onError={() => setHasError(true)}
          className="h-full w-full min-h-0 min-w-0"
        />
      </div>
    </div>
  )
}
