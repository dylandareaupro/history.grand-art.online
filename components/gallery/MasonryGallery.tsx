import { useMemo } from 'react'
import type { Artwork } from '@/lib/types'
import { ArtworkCard } from './ArtworkCard'

interface MasonryGalleryProps {
  artworks: Artwork[]
}

// 5 columns — widths in px at 1440px reference, converted to %
// 340 / 290 / 235 / 194 / 169 = 1228px sum
// With 94px padding on each side: content = 1440 - 188 = 1252px
const COLUMNS = [
  { widthPercent: 27.16, widthPx: 340 },
  { widthPercent: 23.16, widthPx: 290 },
  { widthPercent: 18.77, widthPx: 235 },
  { widthPercent: 15.50, widthPx: 194 },
  { widthPercent: 13.50, widthPx: 169 },
]

function distributeToColumns(artworks: Artwork[]): Artwork[][] {
  const columns: Artwork[][] = [[], [], [], [], []]
  artworks.forEach((artwork, i) => {
    columns[i % 5].push(artwork)
  })
  return columns
}

export function MasonryGallery({ artworks }: MasonryGalleryProps) {
  const columns = useMemo(() => distributeToColumns(artworks), [artworks])

  return (
    <div className="flex w-full gap-[6px] items-start">
      {COLUMNS.map((col, colIndex) => (
        <div
          key={colIndex}
          className="flex flex-col gap-[6px] items-start"
          style={{ width: `${col.widthPercent}%` }}
        >
          {columns[colIndex].map((artwork, rowIndex) => (
            <ArtworkCard
              key={artwork.id}
              artwork={artwork}
              colWidth={col.widthPx}
              priority={rowIndex === 0}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
