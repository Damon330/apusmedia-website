import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase env vars missing — form submissions will not be saved.')
}

export const supabase = createClient(supabaseUrl ?? '', supabaseAnonKey ?? '')

export type ContactSubmission = {
  name: string
  email: string
  company: string
  service: string
  message: string
  selected_plan: string | null
  selected_plan_price: string | null
}

export type AssessmentLead = {
  name: string
  email: string
  score: number
  band: string
}
