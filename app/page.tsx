import { Button } from '@/components/Button'
import { Typography } from '@/components/Typography'
import Icon from '@/components/Icon'

export default function Home() {
  return (
    <div className="min-h-screen bg-surface-base text-neutral-strong p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <Typography variant="heading-xl" as="h1" className="mb-2">
            Design System Boilerplate
          </Typography>
          <Typography variant="body-lg" className="text-neutral-moderate">
            Your design system boilerplate is ready with Figma semantic tokens and typography extracted and integrated.
          </Typography>
        </div>

        <div className="space-y-4">
          <Typography variant="heading-md" as="h2">Icon Component</Typography>
          <Typography variant="body-md" className="text-neutral-moderate mb-4">
            Icon component matching Figma design system spec with all size variants.
          </Typography>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Typography variant="body-sm" className="w-24">Size xs (12px):</Typography>
              <Icon name="close" size="xs" />
              <Icon name="add" size="xs" />
              <Icon name="arrow_back" size="xs" />
            </div>
            <div className="flex items-center gap-4">
              <Typography variant="body-sm" className="w-24">Size sm (16px):</Typography>
              <Icon name="close" size="sm" />
              <Icon name="add" size="sm" />
              <Icon name="arrow_back" size="sm" />
            </div>
            <div className="flex items-center gap-4">
              <Typography variant="body-sm" className="w-24">Size md (20px):</Typography>
              <Icon name="close" size="md" />
              <Icon name="add" size="md" />
              <Icon name="arrow_back" size="md" />
            </div>
            <div className="flex items-center gap-4">
              <Typography variant="body-sm" className="w-24">Size lg (24px):</Typography>
              <Icon name="close" size="lg" />
              <Icon name="add" size="lg" />
              <Icon name="arrow_back" size="lg" />
            </div>
            <div className="flex items-center gap-4">
              <Typography variant="body-sm" className="w-24">Size xl (32px):</Typography>
              <Icon name="close" size="xl" />
              <Icon name="add" size="xl" />
              <Icon name="arrow_back" size="xl" />
            </div>
            <div className="flex items-center gap-4">
              <Typography variant="body-sm" className="w-24">Size 2xl (48px):</Typography>
              <Icon name="close" size="2xl" />
              <Icon name="add" size="2xl" />
              <Icon name="arrow_back" size="2xl" />
            </div>
          </div>

          <div className="mt-6 p-4 bg-surface-low rounded-lg border border-stroke-neutral-translucent-weak">
            <Typography variant="body-sm-semibold" className="mb-2">Usage Examples:</Typography>
            <pre className="text-body-sm text-neutral-subdued font-mono">
{`<Icon name="close" size="lg" />
<Icon name="add" size="md" />
<Icon iconType={<CustomIcon />} size="sm" />`}
            </pre>
          </div>
        </div>

        <div className="space-y-4">
          <Typography variant="heading-md" as="h2">Typography Examples</Typography>
          
          <div className="space-y-2">
            <Typography variant="heading-2xl" as="h3">Heading 2XL</Typography>
            <Typography variant="heading-xl" as="h3">Heading XL</Typography>
            <Typography variant="heading-lg" as="h3">Heading LG</Typography>
            <Typography variant="heading-md" as="h3">Heading MD</Typography>
            <Typography variant="heading-sm" as="h3">Heading SM</Typography>
            <Typography variant="heading-xs" as="h3">Heading XS</Typography>
          </div>

          <div className="space-y-2">
            <Typography variant="title-md">Title MD</Typography>
            <Typography variant="title-sm">Title SM</Typography>
            <Typography variant="title-xs">Title XS</Typography>
          </div>

          <div className="space-y-2">
            <Typography variant="body-xxl-semibold">Body XXL Semibold</Typography>
            <Typography variant="body-xxl">Body XXL Normal</Typography>
            <Typography variant="body-xl-semibold">Body XL Semibold</Typography>
            <Typography variant="body-xl">Body XL Normal</Typography>
            <Typography variant="body-lg-semibold">Body LG Semibold</Typography>
            <Typography variant="body-lg">Body LG Normal</Typography>
            <Typography variant="body-md-semibold">Body MD Semibold</Typography>
            <Typography variant="body-md">Body MD Normal</Typography>
            <Typography variant="body-sm-semibold">Body SM Semibold</Typography>
            <Typography variant="body-sm">Body SM Normal</Typography>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-medium">Example Component</h2>
          <div className="flex gap-4 flex-wrap">
            <Button variant="primary" size="md">Primary Button</Button>
            <Button variant="secondary" size="md">Secondary Button</Button>
            <Button variant="tertiary" size="md">Tertiary Button</Button>
          </div>
          <div className="flex gap-4 flex-wrap">
            <Button variant="primary" size="sm">Small</Button>
            <Button variant="primary" size="md">Medium</Button>
            <Button variant="primary" size="lg">Large</Button>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-medium">Semantic Color Tokens</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-surface-low rounded-md border border-stroke-neutral-translucent-weak">
              <div className="text-sm text-neutral-subdued mb-2">Primary</div>
              <div className="h-8 bg-primary-moderate rounded"></div>
            </div>
            <div className="p-4 bg-surface-low rounded-md border border-stroke-neutral-translucent-weak">
              <div className="text-sm text-neutral-subdued mb-2">Info</div>
              <div className="h-8 bg-info-moderate rounded"></div>
            </div>
            <div className="p-4 bg-surface-low rounded-md border border-stroke-neutral-translucent-weak">
              <div className="text-sm text-neutral-subdued mb-2">Success</div>
              <div className="h-8 bg-success-moderate rounded"></div>
            </div>
            <div className="p-4 bg-surface-low rounded-md border border-stroke-neutral-translucent-weak">
              <div className="text-sm text-neutral-subdued mb-2">Warning</div>
              <div className="h-8 bg-warning-moderate rounded"></div>
            </div>
            <div className="p-4 bg-surface-low rounded-md border border-stroke-neutral-translucent-weak">
              <div className="text-sm text-neutral-subdued mb-2">Danger</div>
              <div className="h-8 bg-danger-moderate rounded"></div>
            </div>
            <div className="p-4 bg-surface-low rounded-md border border-stroke-neutral-translucent-weak">
              <div className="text-sm text-neutral-subdued mb-2">Surface</div>
              <div className="h-8 bg-surface-mid rounded"></div>
            </div>
            <div className="p-4 bg-surface-low rounded-md border border-stroke-neutral-translucent-weak">
              <div className="text-sm text-neutral-subdued mb-2">Neutral</div>
              <div className="h-8 bg-neutral-600 rounded"></div>
            </div>
            <div className="p-4 bg-surface-low rounded-md border border-stroke-neutral-translucent-weak">
              <div className="text-sm text-neutral-subdued mb-2">Stroke</div>
              <div className="h-8 border-2 border-stroke-neutral-translucent-moderate rounded"></div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-medium">Token Structure</h2>
          <div className="p-4 bg-surface-low rounded-md border border-stroke-neutral-translucent-weak">
            <p className="text-sm text-neutral-subdued mb-2">
              ✅ Base colors (Zinc, Orange, Blue, Green, Yellow, Red, Violet, Teal)
            </p>
            <p className="text-sm text-neutral-subdued mb-2">
              ✅ Semantic colors (Primary, Neutral, Surface, Info, Success, Warning, Danger, Stroke)
            </p>
            <p className="text-sm text-neutral-subdued mb-2">
              ✅ Spacing scale (0-96 with fractional values)
            </p>
            <p className="text-sm text-neutral-subdued mb-2">
              ✅ Border radius (none, sm, base, md, lg, xl, 2xl, 3xl, full)
            </p>
            <p className="text-sm text-neutral-subdued">
              ✅ Typography (Inter font family with size scale)
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
