"use client"

import { motion, useSpring } from "framer-motion"
import React, { useState, useRef, useEffect } from "react"
import { Check, Star as LucideStar } from "lucide-react"
import { cn } from "@/lib/utils"

function Star({ mousePosition, containerRef }: { mousePosition: { x: number | null; y: number | null }; containerRef: React.RefObject<HTMLDivElement> }) {
  const [initialPos] = useState({ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` })
  const springConfig = { stiffness: 100, damping: 15, mass: 0.1 }
  const springX = useSpring(0, springConfig)
  const springY = useSpring(0, springConfig)

  useEffect(() => {
    if (!containerRef.current || mousePosition.x === null || mousePosition.y === null) {
      springX.set(0); springY.set(0); return
    }
    const rect = containerRef.current.getBoundingClientRect()
    const starX = rect.left + (parseFloat(initialPos.left) / 100) * rect.width
    const starY = rect.top + (parseFloat(initialPos.top) / 100) * rect.height
    const dx = mousePosition.x - starX, dy = mousePosition.y - starY
    const dist = Math.sqrt(dx * dx + dy * dy)
    if (dist < 600) { const f = 1 - dist / 600; springX.set(dx * f * 0.5); springY.set(dy * f * 0.5) }
    else { springX.set(0); springY.set(0) }
  }, [mousePosition, initialPos, containerRef, springX, springY])

  return (
    <motion.div className="absolute bg-white rounded-full"
      style={{ top: initialPos.top, left: initialPos.left, width: `${1 + Math.random() * 1.5}px`, height: `${1 + Math.random() * 1.5}px`, x: springX, y: springY }}
      initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }}
      transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 5 }}
    />
  )
}

function InteractiveStarfield({ mousePosition, containerRef }: { mousePosition: { x: number | null; y: number | null }; containerRef: React.RefObject<HTMLDivElement> }) {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      {Array.from({ length: 80 }).map((_, i) => <Star key={i} mousePosition={mousePosition} containerRef={containerRef} />)}
    </div>
  )
}

export interface PricingPlan {
  name: string
  price: string
  features: string[]
  description: string
  buttonText: string
  onClick?: () => void
  isPopular?: boolean
}

export function PricingSection({ plans, title = "Simple, Transparent Pricing", description }: { plans: PricingPlan[]; title?: string; description?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState<{ x: number | null; y: number | null }>({ x: null, y: null })

  return (
    <div ref={containerRef} onMouseMove={e => setMousePosition({ x: e.clientX, y: e.clientY })} onMouseLeave={() => setMousePosition({ x: null, y: null })} className="relative w-full bg-[#2C2C2C] py-20 sm:py-24">
      <InteractiveStarfield mousePosition={mousePosition} containerRef={containerRef} />
      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-14">
          <span className="text-white/25 text-xs font-semibold uppercase tracking-widest">Pricing</span>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl text-white font-display">{title}</h2>
          {description && <p className="text-white/35 text-lg">{description}</p>}
        </div>
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 items-start gap-6">
          {plans.map((plan, index) => <PricingCard key={index} plan={plan} index={index} />)}
        </div>
      </div>
    </div>
  )
}

function PricingCard({ plan, index }: { plan: PricingPlan; index: number }) {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, type: "spring", stiffness: 100, damping: 20, delay: index * 0.12 }}
      className={cn(
        "rounded-2xl p-8 flex flex-col relative",
        plan.isPopular ? "bg-white border border-white/20" : "bg-white/[0.03] border border-white/8"
      )}
    >
      {plan.isPopular && (
        <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
          <div className="bg-black py-1 px-4 rounded-full flex items-center gap-1.5 border border-white/10">
            <LucideStar className="text-white h-3 w-3 fill-current" />
            <span className="text-white text-xs font-semibold">Most Popular</span>
          </div>
        </div>
      )}
      <div className="flex-1 flex flex-col text-center">
        <h3 className={cn("text-xl font-semibold font-display", plan.isPopular ? "text-black" : "text-white")}>{plan.name}</h3>
        <p className={cn("mt-2 text-sm", plan.isPopular ? "text-black/50" : "text-white/35")}>{plan.description}</p>
        <div className="mt-6 flex items-baseline justify-center">
          <span className={cn("text-4xl font-bold tracking-tight font-display", plan.isPopular ? "text-black" : "text-white")}>{plan.price}</span>
        </div>
        <p className={cn("text-xs mt-1.5", plan.isPopular ? "text-black/40" : "text-white/25")}>One-time project fee</p>

        <ul role="list" className="mt-8 space-y-3 text-sm text-left">
          {plan.features.map(feature => (
            <li key={feature} className="flex gap-3">
              <Check className={cn("h-5 w-4 flex-none mt-0.5", plan.isPopular ? "text-black" : "text-white/50")} />
              <span className={plan.isPopular ? "text-black/70" : "text-white/45"}>{feature}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-8">
          <button
            onClick={plan.onClick}
            className={cn(
              "w-full py-3 rounded-xl font-semibold text-sm transition-all",
              plan.isPopular
                ? "bg-black text-white hover:bg-black/80"
                : "border border-white/12 text-white hover:bg-white/5"
            )}
          >
            {plan.buttonText}
          </button>
        </div>
      </div>
    </motion.div>
  )
}
