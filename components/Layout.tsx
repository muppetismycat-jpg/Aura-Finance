
import React, { useState, useEffect } from 'react';
import { Search, Bell, Menu, Sun, Moon } from 'lucide-react';

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
        case 'Luminous': return 'from-pink-900/30 via-rose-950/10 to-transparent';
        case 'Grounding': return 'from-berry-900/40 via-purple-950/10 to-transparent';
        default: return 'from-rose-900/20 via-stone-900/10 to-transparent';
      }
    } else {
      switch (auraTone) {
        case 'Luminous': return 'from-rose-100/60 via-pink-50/40 to-transparent';
        case 'Grounding': return 'from-peony-100/50 via-rose-50/30 to-transparent';
        default: return 'from-quartz-100/50 via-white to-transparent';
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans transition-all duration-1000 relative overflow-hidden">
      {/* Dynamic Global Aura */}
      <div className={`fixed inset-0 pointer-events-none transition-all duration-1000 bg-gradient-to-tr ${getAuraGradient()} animate-aura-breath`}></div>
      <div className={`fixed -top-1/4 -right-1/4 w-[80%] h-[80%] rounded-full blur-[140px] pointer-events-none transition-all duration-1000 ${
        auraTone === 'Luminous' ? 'bg-pink-200/30' : auraTone === 'Grounding' ? 'bg-berry-300/10' : 'bg-rose-100/20'
      }`}></div>

      <header className="sticky top-0 z-50 bg-[#fffafb]/30 dark:bg-[#1a1617]/30 backdrop-blur-2xl border-b border-rose-100/40 dark:border-rose-900/20 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#d68d9a] dark:bg-[#e9b7b7] rounded-full flex items-center justify-center relative overflow-hidden shadow-lg shadow-pink-200/50 dark:shadow-none">
             <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent"></div>
             <div className="w-4 h-4 bg-white dark:bg-stone-900 rounded-full opacity-70"></div>
          </div>
          <span className="font-serif text-xl tracking-tight font-semibold dark:text-stone-100 text-stone-800">Aura Finance</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-400 dark:text-stone-500">
          <a href="#" className="hover:text-pink-600 dark:hover:text-pink-300 transition-colors">Portfolio</a>
          <a href="#" className="text-pink-600 dark:text-pink-300 font-semibold underline underline-offset-8 decoration-pink-200">Analysis</a>
          <a href="#" className="hover:text-pink-600 dark:hover:text-pink-300 transition-colors">Insights</a>
          <a href="#" className="hover:text-pink-600 dark:hover:text-pink-300 transition-colors">Mindful Investing</a>
        </div>

        <div className="flex items-center gap-2 md:gap-4 text-stone-400 dark:text-stone-500">
          <button 
            onClick={toggleTheme}
            className="p-2 hover:bg-rose-100/50 dark:hover:bg-rose-900/30 rounded-full transition-all hover:scale-110 active:scale-95"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={20} className="text-rose-200" /> : <Moon size={20} className="text-pink-600" />}
          </button>
          <button className="p-2 hover:bg-rose-100/50 dark:hover:bg-rose-900/30 rounded-full transition-all">
            <Search size={20} />
          </button>
          <button className="p-2 hover:bg-rose-100/50 dark:hover:bg-rose-900/30 rounded-full transition-all relative">
            <Bell size={20} />
            <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse shadow-[0_0_10px_#f472b6]"></span>
          </button>
          <button className="md:hidden p-2 hover:bg-rose-100/50 dark:hover:bg-rose-900/30 rounded-full transition-all">
            <Menu size={20} />
          </button>
        </div>
      </header>

      <main className="flex-1 w-full max-w-6xl mx-auto px-6 py-8 relative z-10">
        {children}
      </main>

      <footer className="border-t border-rose-100/30 dark:border-rose-900/10 bg-white/10 dark:bg-stone-950/10 py-12 px-6 transition-colors duration-300 relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-stone-400 dark:text-stone-500 text-sm">
          <div className="flex items-center gap-2">
            <span className="font-serif font-semibold text-pink-600 dark:text-pink-300">Aura</span>
            <span>&copy; 2024. Elegance in Every Investment.</span>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-pink-600 dark:hover:text-pink-300">Privacy</a>
            <a href="#" className="hover:text-pink-600 dark:hover:text-pink-300">Compliance</a>
            <a href="#" className="hover:text-pink-600 dark:hover:text-pink-300">Education</a>
          </div>
          <p className="max-w-xs text-center md:text-right leading-relaxed text-[11px] font-light">
            Aura Finance is a serene visualization space. We provide insights, not advice.
          </p>
        </div>
      </footer>
    </div>
  );
};
