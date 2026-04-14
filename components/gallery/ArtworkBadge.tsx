import type { Artwork } from '@/lib/types'

interface ArtworkBadgeProps {
  artwork: Artwork
  colWidth: number // px width of the column at 1440px reference
  dimmed?: boolean
}

// Title truncation thresholds by column width
function getTitleMaxChars(colWidth: number): number {
  if (colWidth >= 340) return 28
  if (colWidth >= 290) return 24
  if (colWidth >= 235) return 22
  if (colWidth >= 194) return 18
  return 14
}

function truncate(str: string, max: number): string {
  if (str.length <= max) return str
  return str.slice(0, max - 1) + '…'
}

// Triangle arrow icon (rotated 90°)
function DateArrow({ dimmed }: { dimmed: boolean }) {
  return (
    <svg width="8" height="8" viewBox="0 0 8 8" fill={dimmed ? '#6a6a6a' : '#e5e5e5'} className="rotate-90 shrink-0">
      <polygon points="4,0 8,8 0,8" />
    </svg>
  )
}

export function ArtworkBadge({ artwork, colWidth, dimmed = false }: ArtworkBadgeProps) {
  const maxChars = getTitleMaxChars(colWidth)
  const titleTruncated = truncate(artwork.title, maxChars)
  const textColor = dimmed ? 'text-[#6a6a6a]' : 'text-white'
  const subTextColor = dimmed ? 'text-[#6a6a6a]' : 'text-[#e5e5e5]'

  return (
    <div className="relative w-full bg-[#000510] p-[14px]" style={{ minHeight: '84px' }}>
      <div className="flex flex-col gap-[10px] items-start">
        <span className={`font-korolev-medium ${textColor} text-[16px] uppercase leading-tight transition-colors duration-200`}>
          {artwork.artist}
        </span>
        <span className={`font-scala-italic ${subTextColor} text-[16px] leading-[12px] transition-colors duration-200`}>
          {titleTruncated}
        </span>
        <span className={`font-scala-regular-con ${subTextColor} text-[16px] leading-[12px] transition-colors duration-200`}>
          {artwork.location}{' '}
          <span className="font-scala-caps">| {artwork.city}</span>
        </span>
      </div>

      {/* Date — top right */}
      <div className="absolute top-[14px] right-[14px] flex gap-[2px] items-end">
        <DateArrow dimmed={dimmed} />
        <span className={`font-scala-regular-con ${subTextColor} text-[17px] leading-[12px] whitespace-nowrap transition-colors duration-200`}>
          {artwork.date}
        </span>
      </div>
    </div>
  )
}
