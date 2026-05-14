import { useState, useEffect } from 'react'

function isDarkByTime(): boolean {
  const hour = new Date().getHours()
  return hour >= 19 || hour < 7  // dark: 7pm – 7am
}

function getInitialTheme(): boolean {
  if (typeof window === 'undefined') return isDarkByTime()
  const saved = localStorage.getItem('aplux-theme')
  return saved ? saved === 'dark' : isDarkByTime()
}

export function useTheme() {
  const [isDark, setIsDark] = useState(getInitialTheme)

  useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem('aplux-theme', isDark ? 'dark' : 'light')
  }, [isDark])

  return { isDark, toggle: () => setIsDark(v => !v) }
}
