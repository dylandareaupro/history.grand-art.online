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
}

function CollectionGroup({
  collection,
  expanded,
  selectedId,
  onToggle,
  onToggleExpanded,
}: {
  collection: Collection
  expanded: boolean
  selectedId: string | null
  onToggle: (id: string) => void
  onToggleExpanded: () => void
}) {
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
          {/* Chevron 13×8 — points down when expanded, right when collapsed */}
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
      {expanded && (
        <div className="flex flex-col gap-[8px] pl-[30px]">
          {collection.museums.map((museum) => (
            <CheckboxItem
              key={museum.id}
              label={museum.name}
              count={museum.count}
              checked={false}
              color="teal"
              size="sm"
              onToggle={() => {}}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export function CollectionsPanel({ collections, selectedId, onToggle, allGroupsExpanded }: CollectionsPanelProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  // Map of collectionId → expanded state
  const [expandedMap, setExpandedMap] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(collections.map((c) => [c.id, true]))
  )

  // Sync when parent triggers expand/collapse all
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

  return (
    <div className="flex gap-[16px] items-start w-full">
      <div
        ref={containerRef}
        className="flex flex-col gap-[12px] items-start flex-1 min-w-0 overflow-y-auto"
        style={{ maxHeight: '267px', scrollbarWidth: 'none' }}
      >
        {collections.map((col) => (
          <CollectionGroup
            key={col.id}
            collection={col}
            expanded={expandedMap[col.id] ?? true}
            selectedId={selectedId}
            onToggle={onToggle}
            onToggleExpanded={() => toggleGroup(col.id)}
          />
        ))}
      </div>
      <PanelScrollBar color="teal" containerRef={containerRef} />
    </div>
  )
}
