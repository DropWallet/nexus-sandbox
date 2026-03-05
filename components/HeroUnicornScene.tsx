'use client'

import { useState } from 'react'
import UnicornScene from 'unicornstudio-react/next'

const SDK_URL = 'https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.1.0-1/dist/unicornStudio.umd.js'

export function HeroUnicornScene() {
  const [hasError, setHasError] = useState(false)

  if (hasError) {
    return null
  }

  return (
    <div className="aspect-[1920/799] relative rounded-xl bg-surface-base w-full h-full min-w-0">
      <UnicornScene
        projectId="8oDTLdjdUKxeYB3swXZi"
        sdkUrl={SDK_URL}
        width="100%"
        height="100%"
        scale={1}
        lazyLoad
        production
        showPlaceholderOnError={false}
        showPlaceholderWhileLoading={false}
        onError={() => setHasError(true)}
        className="w-full h-full"
      />
    </div>
  )
}
