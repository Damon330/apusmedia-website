
# Apuswebsite — Claude Project Guide

## Project Stack
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS v3
- **Animations**: Framer Motion
- **Components**: shadcn/ui
- **Language**: TypeScript (TSX) — all components use .tsx
- **Package Manager**: npm

## Project Structure
```
src/
  assets/        # Images, fonts, icons
  components/    # Reusable UI components
    ui/          # Base/atomic components (buttons, cards, inputs)
    layout/      # Header, Footer, Sidebar, Nav
    sections/    # Page sections (Hero, About, Features, etc.)
  pages/         # Top-level page components
  hooks/         # Custom React hooks
  utils/         # Helper functions
  styles/        # Global CSS, Tailwind base overrides
  App.jsx
  main.jsx
```

## Code Conventions

### Components
- One component per file, named same as file (PascalCase)
- Use functional components with arrow functions
- Props destructured at the top of the function
- Keep components under 150 lines — split if larger

### Styling Rules
- **Tailwind first** — use utility classes, avoid custom CSS unless necessary
- Mobile-first: always start with base (mobile) styles, add `md:` and `lg:` breakpoints
- Use CSS variables for brand colors defined in `tailwind.config.js`
- No inline `style={{}}` unless for dynamic values Tailwind can't handle

### Naming
- Components: `PascalCase` (e.g., `HeroSection.jsx`)
- Hooks: `camelCase` prefixed with `use` (e.g., `useScrollPosition.js`)
- Utils: `camelCase` (e.g., `formatDate.js`)
- CSS classes: Tailwind utilities only — no BEM, no custom class names unless needed

### Animations
- Use Framer Motion for all animations
- Keep animations subtle and purposeful — no gratuitous motion
- Respect `prefers-reduced-motion` using Framer Motion's `useReducedMotion`

## Design Principles (Senior UI/UX)
- **Consistency**: Use a defined spacing scale (4, 8, 12, 16, 24, 32, 48, 64px)
- **Typography hierarchy**: Clear H1 > H2 > H3 > body > caption scale
- **Color**: Limit to 2–3 brand colors + neutrals + semantic (success/error/warning)
- **Whitespace**: Generous padding — crowded layouts look amateur
- **Accessibility**: All interactive elements keyboard-navigable, proper aria labels, color contrast AA minimum
- **Performance**: Lazy-load images, code-split routes, no layout shift (CLS)

## Component Patterns

### Section template
```jsx
const SectionName = () => {
  return (
    <section className="py-16 md:py-24 px-4 md:px-8 max-w-7xl mx-auto">
      {/* content */}
    </section>
  )
}
export default SectionName
```

### Animation template (Framer Motion)
```jsx
import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

<motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
  {/* content */}
</motion.div>
```

## What NOT to Do
- No `!important` in CSS
- No inline styles for static values
- No `console.log` left in production code
- No components larger than 150 lines without splitting
- No hardcoded colors — use Tailwind config tokens
- No accessibility shortcuts (no `outline: none` without a replacement focus style)

## Commands
```bash
npm run dev       # Start dev server
npm run build     # Production build
npm run preview   # Preview production build
npm run lint      # Run ESLint
```

## Claude Behavior in This Project
- Always write mobile-first responsive code
- Always use Framer Motion for animations, never CSS transitions for complex motion
- Always use Tailwind — never write raw CSS unless absolutely necessary
- When adding a new section, follow the section template above
- When unsure about design, default to more whitespace and simpler layout
- Ask before installing new packages
