'use client'

import { useRef } from 'react'
import type { Artist } from '@/lib/types'
import { CheckboxItem } from './CheckboxItem'
import { PanelScrollBar } from './PanelScrollBar'

interface ArtistesPanelProps {
  artists: Artist[]
  selectedId: string | null
  onToggle: (id: string) => void
}

export function ArtistesPanel({ artists, selectedId, onToggle }: ArtistesPanelProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div className="flex gap-[16px] items-start w-full">
      <div
        ref={containerRef}
        className="flex flex-col gap-[16px] items-start flex-1 min-w-0 overflow-y-auto"
        style={{ maxHeight: '267px', scrollbarWidth: 'none' }}
      >
        {artists.map((artist) => (
          <CheckboxItem
            key={artist.id}
            label={artist.name.toUpperCase()}
            count={artist.count}
            checked={selectedId === artist.id}
            color="blue"
            onToggle={() => onToggle(artist.id)}
          />
        ))}
      </div>
      <PanelScrollBar color="blue" containerRef={containerRef} />
    </div>
  )
}
