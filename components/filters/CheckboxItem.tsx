import { CounterBadge } from './CounterBadge'

interface CheckboxItemProps {
  label: string
  count: number
  checked: boolean
  color: 'blue' | 'teal' | 'orange'
  size?: 'sm' | 'md'
  onToggle: () => void
}

export function CheckboxItem({ label, count, checked, color, size = 'md', onToggle }: CheckboxItemProps) {
  const boxSize = size === 'sm' ? 'size-[14px]' : 'size-[18px]'
  const borderRadius = 'rounded-[2px]'
  const textSize = size === 'sm' ? 'text-[13px]' : 'text-[16px]'

  return (
    <button
      onClick={onToggle}
      className="flex gap-[8px] items-center w-full text-left"
    >
      <span className={`relative shrink-0 ${boxSize} ${borderRadius} border border-[#e5e5e5] bg-white`}>
        {checked && (
          <span className="absolute inset-[28%] rounded-[1px] bg-[#282828]" />
        )}
      </span>
      <span className={`flex gap-[4px] items-center font-korolev-medium text-white ${textSize} whitespace-nowrap`}>
        {label}
        <CounterBadge count={count} color={color} size={size} />
      </span>
    </button>
  )
}
