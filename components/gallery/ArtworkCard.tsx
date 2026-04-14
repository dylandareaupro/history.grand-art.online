'use client'

import { memo, useState } from 'react'
import Image from 'next/image'
import type { Artwork } from '@/lib/types'
import { ArtworkBadge } from './ArtworkBadge'

interface ArtworkCardProps {
  artwork: Artwork
  colWidth: number
  priority?: boolean
  dimmed?: boolean
}

export const ArtworkCard = memo(function ArtworkCard({ artwork, colWidth, priority = false, dimmed = false }: ArtworkCardProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="flex flex-col items-start w-full cursor-pointer group">
      {/* Image */}
      <div
        className="relative w-full overflow-hidden bg-[#1a1a1a]"
        style={{ paddingBottom: `${(1 / artwork.aspectRatio) * 100}%` }}
      >
        <Image
          src={artwork.imageUrl}
          alt={`${artwork.title} par ${artwork.artist}, ${artwork.date}`}
          fill
          className={`object-cover transition-all duration-[1100ms] ease-out group-hover:opacity-90 ${
            loaded ? 'blur-0 scale-100 opacity-100' : 'blur-xl scale-[1.08] opacity-100'
          }`}
          sizes="(max-width: 1280px) 25vw, 340px"
          priority={priority}
          loading={priority ? 'eager' : 'lazy'}
          onLoad={() => setLoaded(true)}
          unoptimized
        />
      </div>
      {/* Info badge */}
      <ArtworkBadge artwork={artwork} colWidth={colWidth} dimmed={dimmed} />
    </div>
  )
})
