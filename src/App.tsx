import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import LiquidBackground from '@/components/ui/LiquidBackground'
import Home from '@/pages/Home'
import AssessmentPage from '@/pages/AssessmentPage'

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
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/assessment" element={<AssessmentPage />} />
      </Routes>
    </BrowserRouter>
  )
}
