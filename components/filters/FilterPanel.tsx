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

function ExpandAllIcon({ expanded }: { expanded: boolean }) {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      {expanded ? (
        // Quatre flèches vers l'intérieur — cliquer pour tout réduire
        <>
          <path d="M1.5 1.5 L4.5 4.5 M4.5 4.5 L4.5 2.5 M4.5 4.5 L2.5 4.5" stroke="#282828" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8.5 1.5 L5.5 4.5 M5.5 4.5 L5.5 2.5 M5.5 4.5 L7.5 4.5" stroke="#282828" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M1.5 8.5 L4.5 5.5 M4.5 5.5 L4.5 7.5 M4.5 5.5 L2.5 5.5" stroke="#282828" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8.5 8.5 L5.5 5.5 M5.5 5.5 L5.5 7.5 M5.5 5.5 L7.5 5.5" stroke="#282828" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </>
      ) : (
        // Quatre flèches vers l'extérieur — cliquer pour tout déployer
        <>
          <path d="M4.5 4.5 L1.5 1.5 M1.5 1.5 L1.5 3.5 M1.5 1.5 L3.5 1.5" stroke="#282828" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5.5 4.5 L8.5 1.5 M8.5 1.5 L8.5 3.5 M8.5 1.5 L6.5 1.5" stroke="#282828" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4.5 5.5 L1.5 8.5 M1.5 8.5 L1.5 6.5 M1.5 8.5 L3.5 8.5" stroke="#282828" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5.5 5.5 L8.5 8.5 M8.5 8.5 L8.5 6.5 M8.5 8.5 L6.5 8.5" stroke="#282828" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
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
  // Expand-all state for Collections groups
  const [allGroupsExpanded, setAllGroupsExpanded] = useState(true)

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
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0">
              <circle cx="5" cy="5" r="4" stroke="#dedede" strokeWidth="1.2" />
              <line x1="8.5" y1="8.5" x2="11" y2="11" stroke="#dedede" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            <span className="font-scala-italic text-[#dedede] text-[16px] whitespace-nowrap">
              Recherche
            </span>
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
        />
      )}
      {type === 'collections' && (
        <CollectionsPanel
          collections={collections}
          selectedId={selectedCollectionId}
          onToggle={onToggleCollection}
          allGroupsExpanded={allGroupsExpanded}
        />
      )}
      {type === 'themes' && (
        <ThemesPanel
          themes={themes}
          selectedId={selectedThemeId}
          onToggle={onToggleTheme}
        />
      )}
    </motion.div>
  )
}
