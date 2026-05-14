import { useNavigate } from 'react-router-dom'
import AssessmentQuiz from '@/components/assessment/AssessmentQuiz'
import LiquidBackground from '@/components/ui/LiquidBackground'

export default function AssessmentPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <LiquidBackground />

      <header className="relative z-10 px-4 md:px-8 py-5 flex items-center justify-between border-b border-white/5">
        <button onClick={() => navigate('/')} className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-black font-display font-bold text-xs">A</div>
          <span className="font-display font-bold text-white text-base">Aplux Media</span>
        </button>
        <span className="text-white/20 text-xs hidden sm:block">Free Online Visibility Assessment</span>
        <button onClick={() => navigate('/')} className="text-white/25 hover:text-white/60 text-xs transition-colors">← Back to site</button>
      </header>

      <div className="relative z-10 dot-pattern py-10 px-4 text-center border-b border-white/5">
        <h1 className="font-display font-extrabold text-white text-2xl md:text-3xl mb-2">
          Discover Your Online Visibility Score
        </h1>
        <p className="text-white/30 text-sm">10 questions · ~3 minutes · 100% free · Personalised diagnosis delivered instantly</p>
      </div>

      <main className="relative z-10 flex-1 px-4 py-10 md:py-14">
        <AssessmentQuiz />
      </main>

      <footer className="relative z-10 py-5 text-center text-white/15 text-xs border-t border-white/5">
        © {new Date().getFullYear()} Aplux Media · Your data is never sold or shared.
      </footer>
    </div>
  )
}
