interface CounterBadgeProps {
  count: number
  color: 'blue' | 'teal' | 'orange'
  size?: 'sm' | 'md'
}

export function CounterBadge({ count, color, size = 'md' }: CounterBadgeProps) {
  const bg = color === 'blue' ? 'bg-[#0088ff]' : color === 'teal' ? 'bg-[#008f83]' : 'bg-[#f57200]'

  if (size === 'sm') {
    return (
      <span
        className={`inline-flex items-center justify-center h-[14px] min-w-[14px] px-[3px] rounded-[9px] ${bg} font-korolev-bold text-white text-[8px] leading-none`}
      >
        {count}
      </span>
    )
  }

  return (
    <span
      className={`inline-flex items-center justify-center h-[16px] min-w-[22px] px-[3px] rounded-[8px] ${bg} font-korolev-bold text-white text-[10px] leading-none`}
    >
      {count}
    </span>
  )
}
