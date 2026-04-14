'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import type { FilterType, Artist, Collection, Theme } from '@/lib/types'
import { ArtistesPanel } from './ArtistesPanel'
import { CollectionsPanel } from './CollectionsPanel'
import { ThemesPanel } from './ThemesPanel'

interface FilterPanelProps {
  type: FilterType
  artists: Artist[]
  collections: Collection[]
  themes: Theme[]
  selectedArtistId: string | null
  selectedCollectionId: string | null
  selectedThemeId: string | null
  onToggleArtist: (id: string) => void
  onToggleCollection: (id: string) => void
  onToggleTheme: (id: string) => void
  onClose: () => void
}

// Corner-bracket expand/collapse icon — cleaner at small sizes than diagonal arrows
function ExpandAllIcon({ expanded }: { expanded: boolean }) {
  const s = "#4a4a4a"
  const w = 1.5
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      {expanded ? (
        // Currently all expanded → show compress icon (inner brackets facing outward)
        <>
          <path d="M1.5 4 L4 4 L4 1.5"   stroke={s} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8.5 4 L6 4 L6 1.5"   stroke={s} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" />
          <path d="M1.5 6 L4 6 L4 8.5"   stroke={s} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8.5 6 L6 6 L6 8.5"   stroke={s} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" />
        </>
      ) : (
        // Currently all collapsed → show expand icon (outer corner brackets)
        <>
          <path d="M1 3.5 L1 1 L3.5 1"   stroke={s} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9 3.5 L9 1 L6.5 1"   stroke={s} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" />
          <path d="M1 6.5 L1 9 L3.5 9"   stroke={s} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9 6.5 L9 9 L6.5 9"   stroke={s} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" />
        </>
      )}
    </svg>
  )
}

export function FilterPanel({
  type,
  artists,
  collections,
  themes,
  selectedArtistId,
  selectedCollectionId,
  selectedThemeId,
  onToggleArtist,
  onToggleCollection,
  onToggleTheme,
}: FilterPanelProps) {
  const [allGroupsExpanded, setAllGroupsExpanded] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <motion.div
      initial={{ opacity: 0, y: -6, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -6, scale: 0.98 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      className="flex flex-col gap-[16px] items-start w-[232px] p-[16px] rounded-[4px] border border-[#dedede] bg-black/35 backdrop-blur-md overflow-hidden"
    >
      {/* Header */}
      <div className="flex gap-[10px] items-end w-full shrink-0">
        <div className="flex flex-1 flex-col gap-[6px]">
          <div className="flex gap-[6px] items-center">
            {/* Loupe icon */}
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0 pointer-events-none">
              <circle cx="5" cy="5" r="4" stroke="#dedede" strokeWidth="1.2" />
              <line x1="8.5" y1="8.5" x2="11" y2="11" stroke="#dedede" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Recherche"
              className="flex-1 min-w-0 bg-transparent border-none outline-none font-scala-italic text-[#dedede] text-[16px] placeholder-[#dedede] placeholder-opacity-100 caret-white"
              autoComplete="off"
              spellCheck={false}
            />
          </div>
          {/* Separator */}
          <div className="w-full h-px bg-[#dedede]/40" />
        </div>

        {/* Expand-all button — Collections only */}
        {type === 'collections' && (
          <button
            onClick={() => setAllGroupsExpanded((v) => !v)}
            className="shrink-0 size-[24px] rounded-full bg-white border border-[#dedede] flex items-center justify-center hover:bg-gray-50 transition-colors duration-150"
            aria-label={allGroupsExpanded ? 'Tout réduire' : 'Tout déployer'}
          >
            <ExpandAllIcon expanded={allGroupsExpanded} />
          </button>
        )}
      </div>

      {/* Content */}
      {type === 'artistes' && (
        <ArtistesPanel
          artists={artists}
          selectedId={selectedArtistId}
          onToggle={onToggleArtist}
          searchQuery={searchQuery}
        />
      )}
      {type === 'collections' && (
        <CollectionsPanel
          collections={collections}
          selectedId={selectedCollectionId}
          onToggle={onToggleCollection}
          allGroupsExpanded={allGroupsExpanded}
          searchQuery={searchQuery}
        />
      )}
      {type === 'themes' && (
        <ThemesPanel
          themes={themes}
          selectedId={selectedThemeId}
          onToggle={onToggleTheme}
          searchQuery={searchQuery}
        />
      )}
    </motion.div>
  )
}
