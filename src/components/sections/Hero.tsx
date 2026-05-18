import * as React from 'react';
import { FloatingIconsHero, type FloatingIconsHeroProps } from '@/components/ui/floating-icons-hero-section';
import {
  Palette, Globe, TrendingUp, Megaphone, BarChart2,
  Code2, Layers, Target, Zap, Camera, Share2,
  Search, Mail, Layout, Star, Video,
} from 'lucide-react';

const heroIcons: FloatingIconsHeroProps['icons'] = [
  { id: 1,  icon: Palette,    className: 'top-[10%] left-[8%]' },
  { id: 2,  icon: Globe,      className: 'top-[18%] right-[7%]' },
  { id: 3,  icon: TrendingUp, className: 'top-[78%] left-[9%]' },
  { id: 4,  icon: Megaphone,  className: 'bottom-[10%] right-[9%]' },
  { id: 5,  icon: BarChart2,  className: 'top-[5%] left-[28%]' },
  { id: 6,  icon: Code2,      className: 'top-[5%] right-[28%]' },
  { id: 7,  icon: Layers,     className: 'bottom-[8%] left-[24%]' },
  { id: 8,  icon: Target,     className: 'top-[40%] left-[4%]' },
  { id: 9,  icon: Zap,        className: 'top-[72%] right-[24%]' },
  { id: 10, icon: Camera,     className: 'top-[88%] left-[68%]' },
  { id: 11, icon: Share2,     className: 'top-[48%] right-[4%]' },
  { id: 12, icon: Search,     className: 'top-[52%] left-[4%]' },
  { id: 13, icon: Mail,       className: 'top-[4%] left-[52%]' },
  { id: 14, icon: Layout,     className: 'bottom-[5%] right-[44%]' },
  { id: 15, icon: Star,       className: 'top-[24%] right-[19%]' },
  { id: 16, icon: Video,      className: 'top-[58%] left-[28%]' },
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
