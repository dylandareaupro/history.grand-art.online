'use client'

import { useRef } from 'react'
import type { Artist } from '@/lib/types'
import { CheckboxItem } from './CheckboxItem'
import { PanelScrollBar } from './PanelScrollBar'

interface ArtistesPanelProps {
  artists: Artist[]
  selectedId: string | null
  onToggle: (id: string) => void
  searchQuery?: string
}

export function ArtistesPanel({ artists, selectedId, onToggle, searchQuery = '' }: ArtistesPanelProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const q = searchQuery.toLowerCase()
  const filtered = q ? artists.filter((a) => a.name.toLowerCase().includes(q)) : artists

  return (
    <div className="flex gap-[16px] items-start w-full">
      <div
        ref={containerRef}
        className="flex flex-col gap-[16px] items-start flex-1 min-w-0 overflow-y-auto"
        style={{ maxHeight: '267px', scrollbarWidth: 'none' }}
      >
        {filtered.map((artist) => (
          <CheckboxItem
            key={artist.id}
            label={artist.name.toUpperCase()}
            count={artist.count}
            checked={selectedId === artist.id}
            color="blue"
            onToggle={() => onToggle(artist.id)}
          />
        ))}
        {filtered.length === 0 && (
          <p className="font-scala-italic text-[#dedede]/60 text-[13px]">Aucun résultat</p>
        )}
      </div>
      <PanelScrollBar color="blue" containerRef={containerRef} />
    </div>
  )
}
