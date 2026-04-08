'use client'

import { useState } from 'react'
import Image from 'next/image'
import UnicornScene from 'unicornstudio-react/next'

const SDK_URL =
  'https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.1.6/dist/unicornStudio.umd.js'
const PROJECT_ID = '0LaNS8alAakz3hQx4vCr'

export function VisionClosingUnicornScene() {
  const [hasError, setHasError] = useState(false)

  if (hasError) {
    return (
      <div className="relative mx-auto aspect-[1199/614] w-full max-w-[1199px] overflow-hidden">
        <Image
          src="/vision/footer.png"
          alt=""
          fill
          className="object-cover object-[50%_35%]"
          sizes="(max-width: 1199px) 100vw, 1199px"
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 50% 55% at 50% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 55%, rgba(0,0,0,0.95) 100%)',
          }}
          aria-hidden
        />
      </div>
    )
  }

  return (
    <div className="relative mx-auto aspect-[1199/614] w-full max-w-[1199px] min-w-0 overflow-hidden bg-black">
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
        altText="For the 2am person — ambient scene"
        ariaLabel="Decorative WebGL animation for the Vision closing section"
        showPlaceholderOnError={false}
        showPlaceholderWhileLoading={false}
        onError={() => setHasError(true)}
        className="h-full w-full"
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 50% 55% at 50% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 55%, rgba(0,0,0,0.95) 100%)',
        }}
        aria-hidden
      />
    </div>
  )
}
