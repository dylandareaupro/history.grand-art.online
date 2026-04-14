'use client'

import { useRef, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import type { FilterType, Artist, Collection, Theme } from '@/lib/types'
import { FilterDropdown } from './FilterDropdown'
import { FilterPanel } from '@/components/filters/FilterPanel'

interface HeaderProps {
  artworkCount: number
  openPanels: FilterType[]
  artists: Artist[]
  collections: Collection[]
  themes: Theme[]
  selectedArtistId: string | null
  selectedCollectionId: string | null
  selectedThemeId: string | null
  selectedArtistLabel: string | null
  selectedCollectionLabel: string | null
  selectedThemeLabel: string | null
  onTogglePanel: (type: FilterType) => void
  onCloseAllPanels: () => void
  onToggleArtist: (id: string) => void
  onToggleCollection: (id: string) => void
  onToggleTheme: (id: string) => void
  onResetFilter: (type: FilterType) => void
}

const FILTER_COLORS: Record<FilterType, { bg: string; border: string }> = {
  artistes: { bg: '#00329d', border: '#00329d' },
  collections: { bg: '#003b36', border: '#003b36' },
  themes: { bg: '#d36d00', border: '#d36d00' },
}

const FILTER_TYPES: FilterType[] = ['artistes', 'collections', 'themes']
const FILTER_LABELS: Record<FilterType, string> = {
  artistes: 'Artistes',
  collections: 'Collections',
  themes: 'Thèmes',
}

export function Header({
  artworkCount,
  openPanels,
  artists,
  collections,
  themes,
  selectedArtistId,
  selectedCollectionId,
  selectedThemeId,
  selectedArtistLabel,
  selectedCollectionLabel,
  selectedThemeLabel,
  onTogglePanel,
  onCloseAllPanels,
  onToggleArtist,
  onToggleCollection,
  onToggleTheme,
  onResetFilter,
}: HeaderProps) {
  const headerRef = useRef<HTMLDivElement>(null)

  // Ferme tous les panneaux au clic en dehors du header
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        onCloseAllPanels()
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [onCloseAllPanels])

  // Ferme tous les panneaux à la touche Escape
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && openPanels.length > 0) {
        onCloseAllPanels()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [openPanels.length, onCloseAllPanels])

  const selectedLabels: Record<FilterType, string | null> = {
    artistes: selectedArtistLabel,
    collections: selectedCollectionLabel,
    themes: selectedThemeLabel,
  }

  return (
    <div ref={headerRef} className="relative shrink-0 w-full">
      {/* Top bar */}
      <div className="flex items-center justify-between py-[24px] w-full">
        {/* Search icon placeholder */}
        <div className="shrink-0 size-[42px] bg-black rounded-[4px]" />

        {/* Filters + count */}
        <div className="flex flex-1 items-center justify-between ml-[clamp(40px,8.7vw,112px)]">
          {/* Three filter dropdowns — each wraps its own panel */}
          <div className="flex items-center justify-between w-[min(734px,57vw)]">
            {FILTER_TYPES.map((type) => (
              <div key={type} className="relative">
                <FilterDropdown
                  type={type}
                  label={FILTER_LABELS[type]}
                  selectedLabel={selectedLabels[type]}
                  isOpen={openPanels.includes(type)}
                  onToggle={() => onTogglePanel(type)}
                  onReset={() => onResetFilter(type)}
                  activeColor={FILTER_COLORS[type].bg}
                  activeBorder={FILTER_COLORS[type].border}
                />
                <AnimatePresence mode="wait">
                  {openPanels.includes(type) && (
                    <div key={type} className="absolute top-[calc(100%+8px)] left-0 z-50">
                      <FilterPanel
                        type={type}
                        artists={artists}
                        collections={collections}
                        themes={themes}
                        selectedArtistId={selectedArtistId}
                        selectedCollectionId={selectedCollectionId}
                        selectedThemeId={selectedThemeId}
                        onToggleArtist={onToggleArtist}
                        onToggleCollection={onToggleCollection}
                        onToggleTheme={onToggleTheme}
                        onClose={() => onTogglePanel(type)}
                      />
                    </div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Artwork count */}
          <div className="shrink-0 text-right">
            <span className="font-korolev-bold text-black text-[14px]">{artworkCount}</span>
            <span className="font-korolev-medium text-[#282828] text-[14px]"> œuvres</span>
          </div>
        </div>
      </div>
    </div>
  )
}
