import * as React from 'react';
import { FloatingIconsHero, type FloatingIconsHeroProps } from '@/components/ui/floating-icons-hero-section';
import {
  Palette, Globe, TrendingUp, Megaphone, BarChart2,
  Code2, Layers, Target, Zap, Camera, Share2,
  Search, Mail, Layout, Star, Video,
} from 'lucide-react';

const heroIcons: FloatingIconsHeroProps['icons'] = [
  // Visible on all screen sizes — 6 icons at corners/edges only
  { id: 1,  icon: Palette,    className: 'top-[10%] left-[8%]' },
  { id: 2,  icon: Globe,      className: 'top-[18%] right-[7%]' },
  { id: 3,  icon: TrendingUp, className: 'top-[78%] left-[9%]' },
  { id: 4,  icon: Megaphone,  className: 'bottom-[10%] right-[9%]' },
  { id: 5,  icon: BarChart2,  className: 'top-[5%] left-[28%]' },
  { id: 7,  icon: Layers,     className: 'bottom-[8%] left-[24%]' },

  // Desktop only — hidden on mobile to prevent crowding
  { id: 6,  icon: Code2,      className: 'hidden md:block top-[5%] right-[28%]' },
  { id: 8,  icon: Target,     className: 'hidden md:block top-[40%] left-[4%]' },
  { id: 9,  icon: Zap,        className: 'hidden md:block top-[72%] right-[24%]' },
  { id: 10, icon: Camera,     className: 'hidden md:block top-[88%] left-[68%]' },
  { id: 11, icon: Share2,     className: 'hidden md:block top-[48%] right-[4%]' },
  { id: 12, icon: Search,     className: 'hidden md:block top-[52%] left-[4%]' },
  { id: 13, icon: Mail,       className: 'hidden md:block top-[4%] left-[52%]' },
  { id: 14, icon: Layout,     className: 'hidden md:block bottom-[5%] right-[44%]' },
  { id: 15, icon: Star,       className: 'hidden md:block top-[24%] right-[19%]' },
  { id: 16, icon: Video,      className: 'hidden md:block top-[58%] left-[28%]' },
];

export default function Hero() {
  return (
    <FloatingIconsHero
      title={"Stop Getting\nOutmarketed."}
      subtitle="We help businesses dominate online with conversion-driven branding, high-impact websites, and growth strategies that generate real sales."
      ctaText="Take the Free Assessment"
      ctaHref="/assessment"
      icons={heroIcons}
    />
  );
}
