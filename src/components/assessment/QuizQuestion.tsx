import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { Question } from '@/lib/questions'

interface Props { question: Question; questionIndex: number; selectedAnswer: number | null; onSelect: (i: number) => void }

export default function QuizQuestion({ question, questionIndex, selectedAnswer, onSelect }: Props) {
  const letters = ['A', 'B', 'C', 'D']
  return (
    <AnimatePresence mode="wait">
      <motion.div key={questionIndex} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}>
        <h2 className="font-display font-bold text-white text-lg md:text-2xl mb-1.5 leading-snug">{question.title}</h2>
        {question.sub && <p className="text-white/30 text-sm mb-5">{question.sub}</p>}
        {!question.sub && <div className="mb-5" />}
        <div className="space-y-2.5">
          {question.options?.map((option, i) => (
            <button
              key={i}
              onClick={() => onSelect(i)}
              className={cn(
                'w-full flex items-center gap-3 text-left px-4 py-3.5 md:px-5 md:py-4 rounded-xl border transition-all duration-200 group min-h-[56px] active:scale-[0.99]',
                selectedAnswer === i
                  ? 'border-white/40 bg-white/8'
                  : 'border-white/6 bg-white/[0.02] active:border-white/20 active:bg-white/[0.04]'
              )}
            >
              <span className={cn(
                'flex-none w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm transition-colors shrink-0',
                selectedAnswer === i ? 'bg-white text-black' : 'bg-white/6 text-white/35'
              )}>
                {letters[i]}
              </span>
              <span className={cn('text-sm leading-relaxed', selectedAnswer === i ? 'text-white' : 'text-white/55')}>
                {option.label}
              </span>
            </button>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
