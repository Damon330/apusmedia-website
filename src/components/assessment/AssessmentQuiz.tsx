import { useState } from 'react'
import { ChevronLeft } from 'lucide-react'
import { QUESTIONS, calcScore, getBand } from '@/lib/questions'
import { supabase } from '@/lib/supabase'
import QuizQuestion from './QuizQuestion'
import LeadForm from './LeadForm'
import Results from './Results'

type Phase = 'quiz' | 'lead' | 'results'

export default function AssessmentQuiz() {
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(QUESTIONS.length).fill(null))
  const [lead, setLead] = useState({ name: '', email: '' })
  const [phase, setPhase] = useState<Phase>('quiz')

  const TOTAL = QUESTIONS.length
  const questionCount = TOTAL - 1
  const isLeadStep = current === questionCount

  const pct = Math.max(Math.round((current / TOTAL) * 100), 6)

  const handleSelect = (i: number) => {
    const updated = [...answers]
    updated[current] = i
    setAnswers(updated)
    setTimeout(() => {
      if (current < TOTAL - 1) {
        setCurrent(current + 1)
      }
    }, 280)
  }

  const handleLeadSubmit = (name: string, email: string) => {
    const score = calcScore(answers, QUESTIONS)
    const band = getBand(score)
    setLead({ name, email })
    setPhase('results')
    // Fire-and-forget — don't block the results screen
    supabase.from('assessment_leads').insert({
      name: name.trim(),
      email: email.trim(),
      score,
      band: band.key,
    }).then(({ error }) => {
      if (error) console.error('Assessment lead save failed:', error.message)
    })
  }

  const handleBack = () => {
    if (current > 0) setCurrent(current - 1)
  }

  if (phase === 'results') {
    const score = calcScore(answers, QUESTIONS)
    const band = getBand(score)
    return (
      <div className="w-full max-w-2xl mx-auto">
        <Results score={score} band={band} firstName={lead.name.split(' ')[0]} />
      </div>
    )
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between text-xs text-white/40 mb-2.5 font-medium">
          <span>{isLeadStep ? 'Final step' : `Question ${current + 1} of ${questionCount}`}</span>
          <span>{pct}%</span>
        </div>
        <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-brand to-brand-light rounded-full transition-all duration-500 ease-out"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-5 md:p-10">
        {isLeadStep ? (
          <LeadForm onSubmit={handleLeadSubmit} />
        ) : (
          <QuizQuestion
            question={QUESTIONS[current]}
            questionIndex={current}
            selectedAnswer={answers[current]}
            onSelect={handleSelect}
          />
        )}

        {/* Back */}
        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={handleBack}
            className={`flex items-center gap-1.5 text-sm text-white/35 hover:text-white/70 transition-colors ${current === 0 ? 'invisible' : ''}`}
          >
            <ChevronLeft size={16} /> Back
          </button>
          <span className="text-xs text-white/20">Takes ~3 minutes</span>
        </div>
      </div>
    </div>
  )
}
