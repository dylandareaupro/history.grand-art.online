'use client'

import type { FilterType } from '@/lib/types'

interface FilterDropdownProps {
  type: FilterType
  label: string
  selectedLabel: string | null
  isOpen: boolean
  onToggle: () => void
  onReset: () => void
  activeColor: string
  activeBorder: string
}

function CrossIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 1L9 9M9 1L1 9" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function FilterDropdown({
  type,
  label,
  selectedLabel,
  isOpen,
  onToggle,
  onReset,
  activeColor,
  activeBorder,
}: FilterDropdownProps) {
  const isActive = !!selectedLabel
  const displayLabel = label.toUpperCase()

  // Inactive state
  if (!isActive) {
    return (
      <button
        onClick={onToggle}
        className="flex h-[42px] items-start gap-px"
        aria-expanded={isOpen}
      >
        {/* Left: label tab */}
        <div className="flex h-full items-center bg-[#6a6a6a] border border-[#6a6a6a] px-[16px] rounded-bl-[4px] rounded-tl-[4px]">
          <span className="font-korolev-medium text-white text-[16px] uppercase whitespace-nowrap">
            {displayLabel}
          </span>
        </div>
        {/* Right: "Tous" tab */}
        <div className="flex h-full items-center bg-[#fafafa] border border-[#6a6a6a] px-[16px] rounded-br-[4px] rounded-tr-[4px]">
          <span className="font-korolev-medium text-[#6a6a6a] text-[16px] uppercase whitespace-nowrap">
            TOUS
          </span>
        </div>
      </button>
    )
  }

  // Active state (filter selected) — pill-shaped right side, cross icon, no chevron
  return (
    <button
      onClick={onReset}
      className="flex h-[42px] items-start gap-px"
      title={`Retirer le filtre ${displayLabel}`}
    >
      {/* Left: label tab */}
      <div
        className="flex h-full items-center px-[15px] rounded-bl-[4px] rounded-tl-[4px]"
        style={{ backgroundColor: activeColor, border: `1px solid ${activeBorder}` }}
      >
        <span className="font-korolev-medium text-white text-[16px] uppercase whitespace-nowrap">
          {displayLabel}
        </span>
      </div>
      {/* Right: pill-shaped tab with cross + selected value */}
      <div
        className="flex h-full items-center gap-[5px] px-[12px] rounded-br-[40px] rounded-tr-[40px]"
        style={{ backgroundColor: activeColor, border: `1px solid ${activeBorder}` }}
      >
        <span className="font-korolev-medium text-white text-[14px] whitespace-nowrap">
          {selectedLabel}
        </span>
        <CrossIcon />
      </div>
    </button>
  )
}
