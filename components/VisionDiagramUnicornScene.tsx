/**
 * THE VISION diagram — static globe art (replaces Unicorn embed).
 */
export function VisionDiagramUnicornScene() {
  return (
    <div className="relative mx-auto w-full min-w-0 max-w-[557px] bg-black">
      <img
        src="/vision/vision-globe.svg"
        alt="Nexus vision — connected ecosystem"
        className="block h-auto w-full max-w-full"
        width={557}
        height={259}
        draggable={false}
      />
    </div>
  )
}
