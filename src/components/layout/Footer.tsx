import { useNavigate } from 'react-router-dom'
import { Instagram, Twitter, Linkedin } from 'lucide-react'

const links = {
  Services: ['Branding', 'Running Ads', 'Automation', 'Business Consulting', 'Social Media'],
  Company: ['About', 'Work', 'Pricing', 'Contact'],
}

export default function Footer() {
  const navigate = useNavigate()

  return (
    <footer className="bg-black border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-14">
          <div className="md:col-span-2">
            <button onClick={() => navigate('/')} className="flex items-center gap-2.5 mb-5">
              <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-black font-display font-bold text-xs">
                A
              </div>
              <span className="font-display font-bold text-white text-base">Aplux Media</span>
            </button>
            <p className="text-white/30 text-sm leading-relaxed max-w-xs">
              We bridge the gap between visibility and profitability, helping brands convert influence into real business growth.
            </p>
            <div className="flex gap-4 mt-6">
              {[Instagram, Twitter, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="text-white/20 hover:text-white transition-colors">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <h4 className="text-white text-xs font-semibold uppercase tracking-widest mb-4">{group}</h4>
              <ul className="space-y-2.5">
                {items.map(item => (
                  <li key={item}>
                    <span className="text-white/30 hover:text-white/60 text-sm transition-colors cursor-pointer">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Big brand name like Arkitek */}
        <div className="border-t border-white/5 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/20 text-xs">© {new Date().getFullYear()} Aplux Media · All rights reserved.</p>
            <button onClick={() => navigate('/assessment')} className="text-xs text-white/30 hover:text-white transition-colors">
              Take the Free Assessment →
            </button>
          </div>
          <div className="mt-6 overflow-hidden">
            <p className="font-display font-extrabold text-white/[0.04] text-[clamp(4rem,15vw,12rem)] leading-none tracking-tight select-none text-center">
              Aplux Media
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
