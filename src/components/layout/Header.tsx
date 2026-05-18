import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon } from 'lucide-react'
import GradientButton from '@/components/ui/button-1'
import { useTheme } from '@/hooks/useTheme'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#portfolio' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { isDark, toggle } = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleNavClick = (href: string) => {
    setMenuOpen(false)
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }), 100)
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled || menuOpen
            ? 'bg-white/95 backdrop-blur-md border-b border-neutral-200 dark:bg-[#1a1a1a]/95 dark:border-white/5'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <button
              onClick={() => { setMenuOpen(false); navigate('/') }}
              className="z-50 relative flex-shrink-0"
              aria-label="Aplux Media — go to homepage"
            >
              <img
                src="/logo.svg"
                alt="Aplux Media"
                width={120}
                height={40}
                className={cn(
                  'h-8 w-auto transition-[filter] duration-300',
                  !(scrolled || menuOpen) || isDark ? 'invert' : ''
                )}
              />
            </button>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map(link => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className={cn(
                    'text-sm font-medium transition-colors',
                    scrolled
                      ? 'text-neutral-600 hover:text-neutral-900 dark:text-white/40 dark:hover:text-white'
                      : 'text-white/70 hover:text-white'
                  )}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Desktop: theme toggle + CTA */}
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={toggle}
                aria-label="Toggle colour mode"
                className={cn(
                  'w-9 h-9 flex items-center justify-center rounded-xl transition-colors',
                  scrolled
                    ? 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 dark:text-white/40 dark:hover:text-white dark:hover:bg-white/8'
                    : 'text-white/60 hover:text-white hover:bg-white/8'
                )}
              >
                {isDark ? <Sun size={16} /> : <Moon size={16} />}
              </button>
              <GradientButton width="140px" height="40px" onClick={() => handleNavClick('#contact')}>
                Contact Us
              </GradientButton>
            </div>

            {/* Mobile: theme toggle + hamburger */}
            <div className="md:hidden flex items-center gap-1 z-50 relative">
              <button
                onClick={toggle}
                aria-label="Toggle colour mode"
                className={cn(
                  'w-10 h-10 flex items-center justify-center transition-colors',
                  scrolled || menuOpen
                    ? 'text-neutral-600 dark:text-white/60'
                    : 'text-white/70'
                )}
              >
                {isDark ? <Sun size={16} /> : <Moon size={16} />}
              </button>
              <button
                className={cn(
                  'w-10 h-10 flex items-center justify-center transition-colors',
                  scrolled || menuOpen
                    ? 'text-neutral-700 dark:text-white/70'
                    : 'text-white/80'
                )}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {menuOpen ? (
                    <motion.span
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <X size={22} />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="open"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Menu size={22} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Full-screen mobile menu — sits below the header */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed inset-0 top-16 z-40 bg-white dark:bg-[#1a1a1a] flex flex-col md:hidden overflow-y-auto"
          >
            {/* Nav links */}
            <nav className="flex-1 px-6 pt-4 pb-6">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 + 0.06, duration: 0.22 }}
                  onClick={() => handleNavClick(link.href)}
                  className="w-full text-left py-5 border-b border-neutral-100 dark:border-white/5 last:border-0 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display font-bold text-2xl text-neutral-800 group-hover:text-neutral-900 dark:text-white/80 dark:group-hover:text-white transition-colors">
                      {link.label}
                    </span>
                    <span className="text-neutral-300 dark:text-white/15 text-sm font-medium tabular-nums">
                      0{i + 1}
                    </span>
                  </div>
                </motion.button>
              ))}
            </nav>

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32, duration: 0.22 }}
              className="px-6 py-6 border-t border-neutral-100 dark:border-white/5"
            >
              <GradientButton
                width="100%"
                height="52px"
                onClick={() => handleNavClick('#contact')}
                className="w-full"
              >
                Contact Us
              </GradientButton>
              <button
                onClick={toggle}
                className="mt-4 w-full flex items-center justify-center gap-2 py-3 text-sm text-neutral-500 dark:text-white/30 hover:text-neutral-700 dark:hover:text-white/60 transition-colors"
              >
                {isDark ? <Sun size={14} /> : <Moon size={14} />}
                Switch to {isDark ? 'light' : 'dark'} mode
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
