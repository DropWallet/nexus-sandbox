/**
 * Vision page footer — Figma node 13:408: top border, spacing-5 padding, centered Nexus Mods wordmark.
 */
export function VisionPageFooter() {
  return (
    <footer
      className="flex w-full items-center justify-center border-t border-stroke-neutral-translucent-weak bg-surface-low py-[var(--spacing-5)]"
      role="contentinfo"
    >
      <a
        href="/"
        className="inline-flex shrink-0 items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-strong focus-visible:ring-offset-2 focus-visible:ring-offset-surface-base"
        aria-label="Nexus Mods"
      >
        <img
          src="/vision/word-mark-inverted.svg"
          alt=""
          width={171}
          height={40}
          className="h-10 w-auto max-w-[171px] object-contain object-center"
        />
      </a>
    </footer>
  )
}
