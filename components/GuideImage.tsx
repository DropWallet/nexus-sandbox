import { cn } from '@/lib/utils'
import { Typography } from '@/components/Typography'

interface GuideImageProps {
  src: string
  alt: string
  caption?: string
  className?: string
  imgClassName?: string
}

/**
 * Guide content image with consistent styling: rounded corners and border.
 * Optional caption below the image.
 */
export function GuideImage({ src, alt, caption, className, imgClassName }: GuideImageProps) {
  return (
    <div
      className={cn(
        'flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-2',
        'p-2 rounded-lg bg-surface-mid',
        className
      )}
    >
      <div
        className={cn(
          'flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0',
          'relative overflow-hidden rounded-lg border border-stroke-neutral-translucent-weak'
        )}
      >
        <img
          src={src}
          alt={alt}
          className={cn('self-stretch flex-grow-0 flex-shrink-0 w-full object-cover', imgClassName)}
        />
      </div>
      {caption != null && caption !== '' && (
        <Typography variant="body-sm" className="text-neutral-subdued self-stretch">
          {caption}
        </Typography>
      )}
    </div>
  )
}

interface GuideImageSetProps {
  images: { src: string; alt: string }[]
  caption?: string
  className?: string
}

/**
 * Two or more guide images side-by-side in one card (same styling as GuideImage).
 */
export function GuideImageSet({ images, caption, className }: GuideImageSetProps) {
  return (
    <div
      className={cn(
        'flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-2',
        'p-2 rounded-lg bg-surface-mid',
        className
      )}
    >
      <div className="flex justify-start items-stretch self-stretch gap-2 min-w-0">
        {images.map((img, i) => (
          <div
            key={i}
            className={cn(
              'flex-1 min-w-0 relative overflow-hidden rounded-lg border border-stroke-neutral-translucent-weak',
              'flex flex-col items-stretch'
            )}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover min-h-[200px]"
            />
          </div>
        ))}
      </div>
      {caption != null && caption !== '' && (
        <Typography variant="body-sm" className="text-neutral-subdued self-stretch">
          {caption}
        </Typography>
      )}
    </div>
  )
}
