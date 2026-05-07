import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import LiquidBackground from '@/components/ui/LiquidBackground'

// Route-level code splitting — AssessmentPage only loads when navigated to
const Home = lazy(() => import('@/pages/Home'))
const AssessmentPage = lazy(() => import('@/pages/AssessmentPage'))

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LiquidBackground />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/assessment" element={<AssessmentPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
