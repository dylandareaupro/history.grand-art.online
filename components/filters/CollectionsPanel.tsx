'use client'

import { useRef, useState, useEffect } from 'react'
import type { Collection } from '@/lib/types'
import { CounterBadge } from './CounterBadge'
import { CheckboxItem } from './CheckboxItem'
import { PanelScrollBar } from './PanelScrollBar'

interface CollectionsPanelProps {
  collections: Collection[]
  selectedId: string | null
  onToggle: (id: string) => void
  allGroupsExpanded: boolean
  searchQuery?: string
}

function CollectionGroup({
  collection,
  expanded,
  selectedId,
  onToggle,
  onToggleExpanded,
  searchQuery,
}: {
  collection: Collection
  expanded: boolean
  selectedId: string | null
  onToggle: (id: string) => void
  onToggleExpanded: () => void
  searchQuery: string
}) {
  const q = searchQuery.toLowerCase()
  const visibleMuseums = q
    ? collection.museums.filter((m) => m.name.toLowerCase().includes(q))
    : collection.museums

  // When searching, always show sub-items even if group is collapsed
  const showMuseums = expanded || q.length > 0

  return (
    <div className="flex flex-col gap-[12px] w-full">
      {/* Country row */}
      <div className="flex gap-[8px] items-center">
        <button
          onClick={onToggleExpanded}
          className="flex items-center justify-center shrink-0"
          style={{ width: 13, height: 13 }}
          aria-label={expanded ? 'Réduire' : 'Développer'}
        >
          <svg
            width="13"
            height="8"
            viewBox="0 0 13 8"
            fill="none"
            className={`transition-transform duration-150 ${expanded ? '' : '-rotate-90'}`}
          >
            <path
              d="M1.5 1.5L6.5 6.5L11.5 1.5"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <CheckboxItem
          label={collection.country}
          count={collection.count}
          checked={selectedId === collection.id}
          color="teal"
          onToggle={() => onToggle(collection.id)}
        />
      </div>

      {/* Museum sub-items */}
      {showMuseums && visibleMuseums.length > 0 && (
        <div className="flex flex-col gap-[8px] pl-[30px]">
          {visibleMuseums.map((museum) => (
            <CheckboxItem
              key={museum.id}
              label={museum.name}
              count={museum.count}
              checked={selectedId === museum.id}
              color="teal"
              size="sm"
              onToggle={() => onToggle(museum.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export function CollectionsPanel({ collections, selectedId, onToggle, allGroupsExpanded, searchQuery = '' }: CollectionsPanelProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const [expandedMap, setExpandedMap] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(collections.map((c) => [c.id, true]))
  )

  const prevAllGroupsExpanded = useRef(allGroupsExpanded)
  useEffect(() => {
    if (allGroupsExpanded !== prevAllGroupsExpanded.current) {
      prevAllGroupsExpanded.current = allGroupsExpanded
      setExpandedMap(Object.fromEntries(collections.map((c) => [c.id, allGroupsExpanded])))
    }
  }, [allGroupsExpanded, collections])

  function toggleGroup(id: string) {
    setExpandedMap((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  // When searching, show all collections that have at least one matching museum
  const q = searchQuery.toLowerCase()
  const visibleCollections = q
    ? collections.filter(
        (col) =>
          col.country.toLowerCase().includes(q) ||
          col.museums.some((m) => m.name.toLowerCase().includes(q))
      )
    : collections

  return (
    <div className="flex gap-[16px] items-start w-full">
      <div
        ref={containerRef}
        className="flex flex-col gap-[12px] items-start flex-1 min-w-0 overflow-y-auto"
        style={{ maxHeight: '267px', scrollbarWidth: 'none' }}
      >
        {visibleCollections.map((col) => (
          <CollectionGroup
            key={col.id}
            collection={col}
            expanded={expandedMap[col.id] ?? true}
            selectedId={selectedId}
            onToggle={onToggle}
            onToggleExpanded={() => toggleGroup(col.id)}
            searchQuery={searchQuery}
          />
        ))}
        {visibleCollections.length === 0 && (
          <p className="font-scala-italic text-[#dedede]/60 text-[13px]">Aucun résultat</p>
        )}
      </div>
      <PanelScrollBar color="teal" containerRef={containerRef} />
    </div>
  )
}
