import { memo } from 'react'
import Image from 'next/image'
import type { Artwork } from '@/lib/types'
import { ArtworkBadge } from './ArtworkBadge'

interface ArtworkCardProps {
  artwork: Artwork
  colWidth: number
  priority?: boolean
}

export const ArtworkCard = memo(function ArtworkCard({ artwork, colWidth, priority = false }: ArtworkCardProps) {
  return (
    <div className="flex flex-col items-start w-full cursor-pointer group">
      {/* Image */}
      <div
        className="relative w-full overflow-hidden"
        style={{ paddingBottom: `${(1 / artwork.aspectRatio) * 100}%` }}
      >
        <Image
          src={artwork.imageUrl}
          alt={`${artwork.title} par ${artwork.artist}, ${artwork.date}`}
          fill
          className="object-cover transition-opacity duration-300 group-hover:opacity-90"
          sizes="(max-width: 1280px) 25vw, 340px"
          priority={priority}
          loading={priority ? 'eager' : 'lazy'}
          unoptimized
        />
      </div>
      {/* Info badge */}
      <ArtworkBadge artwork={artwork} colWidth={colWidth} />
    </div>
  )
})
