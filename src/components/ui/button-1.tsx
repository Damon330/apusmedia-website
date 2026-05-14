import type { HTMLAttributes } from 'react'

interface GradientButtonProps extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  width?: string
  height?: string
  onClick?: () => void
  disabled?: boolean
}

const GradientButton = ({
  children,
  width = '160px',
  height = '44px',
  className = '',
  onClick,
  disabled = false,
  ...props
}: GradientButtonProps) => {
  const base = `
    relative rounded-[50px] cursor-pointer
    after:content-[''] after:block after:absolute after:bg-[var(--color-background)]
    after:inset-[2px] after:rounded-[48px] after:z-[1]
    after:transition-opacity after:duration-300
    flex items-center justify-center
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
  `

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onClick?.()
    }
  }

  return (
    <div
      role="button"
      tabIndex={disabled ? -1 : 0}
      className={`${base} rotatingGradient ${className}`}
      style={{ minWidth: width, height } as React.CSSProperties}
      onClick={disabled ? undefined : onClick}
      onKeyDown={handleKeyDown}
      aria-disabled={disabled}
      {...props}
    >
      <span className="relative z-10 text-white text-sm font-semibold flex items-center justify-center px-5 whitespace-nowrap">
        {children}
      </span>
    </div>
  )
}

export default GradientButton
