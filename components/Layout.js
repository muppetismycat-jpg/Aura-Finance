
import React, { useState, useEffect } from 'https://esm.sh/react@^19.2.4';
import htm from 'https://esm.sh/htm';
import * as Lucide from 'https://esm.sh/lucide-react@^0.574.0';

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
    return 'from-pink-100 via-white to-transparent';
  };

  return html`
    <div className="min-h-screen flex flex-col font-sans transition-all duration-1000 relative overflow-hidden">
      <div className=${`fixed inset-0 pointer-events-none bg-gradient-to-tr ${getAuraGradient()} animate-aura-breath`}></div>
      <div className="fixed -top-1/4 -right-1/4 w-[80%] h-[80%] rounded-full blur-[140px] bg-pink-400/10 pointer-events-none"></div>

      <header className="sticky top-0 z-50 prismatic-glass bg-white/40 dark:bg-black/40 px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center shadow-lg">
             <${Lucide.Heart} size=${18} className="text-white fill-white/20" />
          </div>
          <span className="font-serif text-2xl tracking-tighter font-black text-stone-800 dark:text-stone-100">Aura</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-[11px] font-black uppercase tracking-widest text-pink-400">
          <a href="#" className="hover:text-pink-600">Portfolio</a>
          <a href="#" className="text-pink-600 border-b-2 border-pink-400 pb-1">Insight</a>
          <a href="#" className="hover:text-pink-600">Vision</a>
        </div>

        <div className="flex items-center gap-4 text-pink-400">
          <button onClick=${toggleTheme} className="p-2 hover:bg-pink-100 rounded-full">
            <${isDark ? Lucide.Sun : Lucide.Moon} size=${20} />
          </button>
          <button className="p-2 hover:bg-pink-100 rounded-full">
            <${Lucide.Bell} size=${20} />
          </button>
        </div>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-10 relative z-10">
        ${children}
      </main>

      <footer className="border-t border-pink-100 py-16 px-6 text-center text-pink-400 text-[10px] font-bold uppercase tracking-widest">
        Aura Finance &copy; 2024. Harmony in Growth.
      </footer>
    </div>
  `;
};
