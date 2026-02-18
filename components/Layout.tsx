
import React, { useState, useEffect } from 'react';
import { Search, Bell, Menu, Sun, Moon, Heart } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  auraTone?: 'Luminous' | 'Airy' | 'Grounding';
}

export const Layout: React.FC<LayoutProps> = ({ children, auraTone = 'Airy' }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const dark = document.documentElement.classList.contains('dark');
    setIsDark(dark);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    }
  };

  const getAuraGradient = () => {
    if (isDark) {
      switch (auraTone) {
        case 'Luminous': return 'from-pink-900/40 via-rose-950/20 to-transparent';
        case 'Grounding': return 'from-berry-900/50 via-pink-950/20 to-transparent';
        default: return 'from-rose-900/30 via-stone-900/20 to-transparent';
      }
    } else {
      switch (auraTone) {
        case 'Luminous': return 'from-rose-200/50 via-pink-100/30 to-transparent';
        case 'Grounding': return 'from-peony-200/50 via-rose-50/30 to-transparent';
        default: return 'from-pink-100/50 via-quartz-50/30 to-transparent';
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans transition-all duration-1000 relative overflow-hidden">
      {/* Dynamic Global Aura */}
      <div className={`fixed inset-0 pointer-events-none transition-all duration-1000 bg-gradient-to-tr ${getAuraGradient()} animate-aura-breath`}></div>
      
      {/* Extra Pink Orbs */}
      <div className={`fixed -top-1/4 -left-1/4 w-[70%] h-[70%] rounded-full blur-[160px] pointer-events-none transition-all duration-1000 bg-rose-200/20 dark:bg-rose-900/10`}></div>
      <div className={`fixed -bottom-1/4 -right-1/4 w-[80%] h-[80%] rounded-full blur-[140px] pointer-events-none transition-all duration-1000 ${
        auraTone === 'Luminous' ? 'bg-pink-300/30' : auraTone === 'Grounding' ? 'bg-berry-500/10' : 'bg-rose-200/20'
      }`}></div>

      <header className="sticky top-0 z-50 bg-[#fff5f7]/40 dark:bg-[#1a1617]/40 backdrop-blur-3xl border-b border-pink-100/60 dark:border-pink-900/30 px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-pink-400 dark:bg-pink-600 rounded-full flex items-center justify-center relative overflow-hidden shadow-[0_0_20px_rgba(251,113,133,0.4)]">
             <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-transparent"></div>
             <Heart size={18} className="text-white relative z-10 fill-white/20" />
          </div>
          <span className="font-serif text-2xl tracking-tighter font-black dark:text-stone-100 text-stone-800">Aura Finance</span>
        </div>
        
        <div className="hidden md:flex items-center gap-10 text-[10px] font-black uppercase tracking-[0.2em] text-pink-400 dark:text-pink-800">
          <a href="#" className="hover:text-pink-600 dark:hover:text-pink-300 transition-all hover:scale-105">Portfolio</a>
          <a href="#" className="text-pink-600 dark:text-pink-300 border-b-2 border-pink-400 pb-1">Analysis</a>
          <a href="#" className="hover:text-pink-600 dark:hover:text-pink-300 transition-all hover:scale-105">Insights</a>
          <a href="#" className="hover:text-pink-600 dark:hover:text-pink-300 transition-all hover:scale-105">Mindful Investing</a>
        </div>

        <div className="flex items-center gap-2 md:gap-4 text-pink-400 dark:text-pink-800">
          <button 
            onClick={toggleTheme}
            className="p-2.5 hover:bg-rose-100/50 dark:hover:bg-rose-900/30 rounded-full transition-all hover:scale-110 active:scale-95 shadow-sm"
          >
            {isDark ? <Sun size={20} className="text-rose-200" /> : <Moon size={20} className="text-pink-600" />}
          </button>
          <button className="p-2.5 hover:bg-rose-100/50 dark:hover:bg-rose-900/30 rounded-full transition-all">
            <Search size={20} />
          </button>
          <button className="p-2.5 hover:bg-rose-100/50 dark:hover:bg-rose-900/30 rounded-full transition-all relative">
            <Bell size={20} />
            <span className="absolute top-3 right-3 w-2 h-2 bg-pink-500 rounded-full animate-ping shadow-[0_0_15px_#f43f5e]"></span>
          </button>
          <button className="md:hidden p-2.5 hover:bg-rose-100/50 dark:hover:bg-rose-900/30 rounded-full transition-all">
            <Menu size={20} />
          </button>
        </div>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-10 relative z-10">
        {children}
      </main>

      <footer className="border-t border-pink-100/40 dark:border-pink-900/20 bg-white/10 dark:bg-stone-950/20 py-16 px-6 transition-colors duration-300 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10 text-pink-400 dark:text-pink-800 text-xs font-medium uppercase tracking-[0.1em]">
          <div className="flex items-center gap-3">
            <span className="font-serif font-black text-2xl text-pink-500 dark:text-pink-400">Aura</span>
            <span className="opacity-60 italic">&copy; 2024. Investing in Beauty & Growth.</span>
          </div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-pink-600 dark:hover:text-pink-300 transition-colors">Privacy</a>
            <a href="#" className="hover:text-pink-600 dark:hover:text-pink-300 transition-colors">Compliance</a>
            <a href="#" className="hover:text-pink-600 dark:hover:text-pink-300 transition-colors">Vision</a>
          </div>
          <p className="max-w-xs text-center md:text-right leading-relaxed opacity-50 text-[10px] font-light lowercase">
            Aura Finance is a serene visualization space. We provide insights, not advice. Harmony in every trade.
          </p>
        </div>
      </footer>
    </div>
  );
};
