
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
    return 'from-pink-100 via-rose-50 to-transparent';
  };

  return html`
    <div className="min-h-screen flex flex-col font-sans transition-all duration-1000 relative overflow-hidden selection:bg-pink-200 selection:text-pink-900">
      {/* Global Background Breath */}
      <div className=${`fixed inset-0 pointer-events-none bg-gradient-to-tr ${getAuraGradient()} animate-aura-breath`}></div>
      
      {/* Extra Pink Orbs */}
      <div className="fixed -top-1/4 -right-1/4 w-[80%] h-[80%] rounded-full blur-[140px] bg-pink-400/20 pointer-events-none animate-float opacity-50"></div>
      <div className="fixed -bottom-1/4 -left-1/4 w-[60%] h-[60%] rounded-full blur-[160px] bg-rose-300/10 pointer-events-none"></div>

      <header className="sticky top-0 z-50 prismatic-glass bg-white/40 dark:bg-black/40 px-8 py-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center shadow-2xl ring-4 ring-white/50">
             <${Lucide.Heart} size=${22} className="text-white fill-white/30" />
          </div>
          <span className="font-serif text-3xl tracking-tighter font-black text-stone-800 dark:text-stone-100">Aura</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-12 text-[11px] font-black uppercase tracking-[0.3em] text-pink-400">
          <a href="#" className="hover:text-pink-600 transition-colors">Portfolio</a>
          <a href="#" className="text-pink-600 border-b-4 border-pink-400 pb-2 drop-shadow-sm">Market Pulse</a>
          <a href="#" className="hover:text-pink-600 transition-colors">Insights</a>
          <a href="#" className="hover:text-pink-600 transition-colors">Vision</a>
        </nav>

        <div className="flex items-center gap-5 text-pink-500">
          <button onClick=${toggleTheme} className="p-3 hover:bg-pink-100/50 rounded-full transition-all hover:scale-110 active:scale-90">
            <${isDark ? Lucide.Sun : Lucide.Moon} size=${22} />
          </button>
          <button className="p-3 hover:bg-pink-100/50 rounded-full transition-all relative">
            <${Lucide.Bell} size=${22} />
            <span className="absolute top-2 right-2 w-3 h-3 bg-rose-500 rounded-full border-2 border-white animate-ping"></span>
          </button>
        </div>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-14 relative z-10">
        ${children}
      </main>

      <footer className="border-t border-pink-100/40 py-20 px-8 text-center bg-white/10">
        <div className="font-serif text-4xl font-black text-pink-200 mb-6 italic opacity-50">Aura Finance</div>
        <p className="text-pink-400 text-[10px] font-black uppercase tracking-[0.5em] mb-4">Harmony in Growth & Abundance</p>
        <p className="text-[9px] text-stone-400 max-w-lg mx-auto leading-relaxed">
          The contents of this platform are for aesthetic and informational purposes only. Aura does not provide financial advice. Invest with mindfulness and grace.
        </p>
      </footer>
    </div>
  `;
};
