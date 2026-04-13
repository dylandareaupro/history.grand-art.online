'use client'

import { useRef } from 'react'
import type { Theme } from '@/lib/types'
import { CheckboxItem } from './CheckboxItem'
import { PanelScrollBar } from './PanelScrollBar'

interface ThemesPanelProps {
  themes: Theme[]
  selectedId: string | null
  onToggle: (id: string) => void
}

export function ThemesPanel({ themes, selectedId, onToggle }: ThemesPanelProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div className="flex gap-[16px] items-start w-full">
      <div
        ref={containerRef}
        className="flex flex-col gap-[16px] items-start flex-1 min-w-0 overflow-y-auto"
        style={{ maxHeight: '267px', scrollbarWidth: 'none' }}
      >
        {themes.map((theme) => (
          <CheckboxItem
            key={theme.id}
            label={theme.name.toUpperCase()}
            count={theme.count}
            checked={selectedId === theme.id}
            color="orange"
            onToggle={() => onToggle(theme.id)}
          />
        ))}
      </div>
      <PanelScrollBar color="orange" containerRef={containerRef} />
    </div>
  )
}
