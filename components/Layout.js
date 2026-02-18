
import React, { useState, useEffect } from 'react';
import htm from 'htm';
import * as Lucide from 'lucide-react';

const html = htm.bind(React.createElement);

export const Layout = ({ children, auraTone = 'Airy' }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle('dark');
  };

  const getAuraGradient = () => {
    if (isDark) return 'from-pink-950 via-[#1a1617] to-transparent';
    return 'from-pink-100 via-rose-50 to-transparent';
  };

  return html`
    <div className="min-h-screen flex flex-col font-sans transition-all duration-1000 relative overflow-x-hidden text-stone-800 dark:text-stone-100">
      {/* Background Aura */}
      <div className=${`fixed inset-0 pointer-events-none bg-gradient-to-tr ${getAuraGradient()} animate-aura-breath`}></div>
      <div className="fixed -top-1/4 -right-1/4 w-[80%] h-[80%] rounded-full blur-[140px] bg-pink-400/20 pointer-events-none animate-float opacity-50"></div>
      
      {/* Simple Header */}
      <header className="sticky top-0 z-50 bg-white/10 dark:bg-black/10 backdrop-blur-md px-6 py-4 flex items-center justify-between border-b border-pink-100/20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center shadow-lg">
             <${Lucide.Heart} size=${16} className="text-white fill-white/30" />
          </div>
          <span className="font-serif text-xl font-black tracking-tight">Aura</span>
        </div>
        
        <button onClick=${toggleTheme} className="p-2 hover:bg-pink-100/20 rounded-full transition-colors">
          <${isDark ? Lucide.Sun : Lucide.Moon} size=${20} className="text-pink-500" />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-3xl mx-auto px-4 py-8 relative z-10">
        ${children}
      </main>

      {/* Minimal Footer */}
      <footer className="py-8 text-center opacity-40 text-[10px] font-black uppercase tracking-widest">
        Aura Finance • Mindful Investing
      </footer>
    </div>
  `;
};
