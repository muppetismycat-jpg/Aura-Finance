
import React, { useState, useEffect, useCallback } from 'react';
import htm from 'htm';
import { Layout } from './components/Layout.js';
import { TechnicalChart } from './components/TechnicalChart.js';
import { MOCK_STOCKS } from './constants.js';
import { analyzeStock } from './services/geminiService.js';
import * as Lucide from 'lucide-react';

const html = htm.bind(React.createElement);

const App = () => {
  const [selectedTicker, setSelectedTicker] = useState('AAPL');
  const [stock, setStock] = useState(MOCK_STOCKS['AAPL']);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchAnalysis = useCallback(async (data) => {
    setLoading(true);
    const result = await analyzeStock(data);
    setAnalysis(result);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchAnalysis(stock);
  }, [stock, fetchAnalysis]);

  const handleTickerChange = (ticker) => {
    if (MOCK_STOCKS[ticker]) {
      setStock(MOCK_STOCKS[ticker]);
      setSelectedTicker(ticker);
    }
  };

  const getSentimentStyles = (sentiment, auraTone) => {
    const base = "px-6 py-2 rounded-full text-[10px] font-black uppercase border-none backdrop-blur-3xl transition-all duration-1000 flex items-center gap-3 tracking-[0.2em] shadow-lg ";
    if (auraTone === 'Luminous') return base + "bg-pink-100 text-pink-700 ring-2 ring-pink-400 animate-pulse-soft shadow-pink-200";
    if (auraTone === 'Grounding') return base + "bg-rose-900 text-rose-100 ring-2 ring-rose-600";
    return base + "bg-rose-50 text-pink-500 ring-2 ring-rose-200";
  };

  const auraTone = analysis?.auraTone || 'Airy';

  return html`
    <${Layout} auraTone=${auraTone}>
      <!-- 
        Grid Logic Fix:
        - Added min-w-0 to all direct grid children to prevent flex/grid blowout.
        - Removed xl:w-auto from right column to enforce grid track adherence.
        - overflow-x-clip ensures no horizontal scroll within grid area.
      -->
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 xl:gap-12 relative z-10 w-full items-start max-w-full overflow-x-clip">
        
        {/* Left Column: Ticker List */}
        <aside className="md:col-span-4 xl:col-span-3 space-y-8 min-w-0 w-full">
          <div className="relative group">
            <input 
              type="text" 
              placeholder="Seek assets..." 
              className="w-full bg-white/70 dark:bg-stone-900/70 prismatic-glass rounded-[32px] py-5 px-14 text-sm focus:outline-none focus:ring-8 focus:ring-pink-100 dark:focus:ring-pink-950 transition-all placeholder-pink-300 font-medium"
              value=${searchQuery}
              onChange=${(e) => setSearchQuery(e.target.value)}
            />
            <${Lucide.Search} className="absolute left-5 top-5 text-pink-300" size=${22} />
          </div>

          <div className="space-y-6">
            <h3 className="text-[11px] uppercase font-black tracking-[0.5em] text-pink-400 ml-3">Asset Mandala</h3>
            <div className="space-y-4">
              ${Object.keys(MOCK_STOCKS).map((ticker) => html`
                <button
                  key=${ticker}
                  onClick=${() => handleTickerChange(ticker)}
                  className=${`w-full flex items-center justify-between p-6 rounded-[40px] transition-all duration-1000 ${
                    selectedTicker === ticker 
                      ? 'bg-white shadow-2xl ring-4 ring-pink-100 scale-[1.05] z-20' 
                      : 'hover:bg-rose-100/40 opacity-70 hover:opacity-100'
                  }`}
                >
                  <div className="text-left">
                    <div className="font-black text-stone-800 text-base leading-none mb-1">${ticker}</div>
                    <div className="text-[11px] text-pink-500 italic font-bold tracking-tight">${MOCK_STOCKS[ticker].name}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-black text-stone-800 leading-none mb-1">$${MOCK_STOCKS[ticker].price}</div>
                    <div className=${`text-[11px] font-black ${MOCK_STOCKS[ticker].change > 0 ? 'text-pink-500' : 'text-stone-500'}`}>
                      ${MOCK_STOCKS[ticker].changePercent}%
                    </div>
                  </div>
                </button>
              `)}
            </div>
          </div>
        </aside>

        {/* Middle Column: Stock Details & Signal */}
        <div className="md:col-span-8 xl:col-span-6 space-y-8 min-w-0 w-full">
          <section className="bg-white/80 dark:bg-stone-900/80 prismatic-glass rounded-[60px] p-8 md:p-14 shadow-2xl relative overflow-hidden transition-all duration-1000">
             <div className=${`absolute top-0 left-1/2 -translate-x-1/2 w-full h-64 blur-[150px] pointer-events-none transition-all duration-1000 ${
               auraTone === 'Luminous' ? 'bg-pink-300/50' : auraTone === 'Grounding' ? 'bg-rose-900/20' : 'bg-rose-100/30'
             }`}></div>

            <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-10 mb-10">
              <div className="min-w-0 flex-1">
                <h1 className="font-serif text-5xl md:text-7xl mb-4 tracking-tighter text-stone-800 dark:text-stone-100 leading-none truncate pr-2">${stock.name}</h1>
                <div className="flex items-center gap-5">
                  <span className="text-pink-500 font-black tracking-[0.5em] text-[11px] uppercase">${stock.symbol}</span>
                  <div className="w-2 h-2 bg-pink-300 rounded-full"></div>
                  <span className="text-pink-300 text-[11px] font-black uppercase italic">Celestial Real-Time</span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-5xl md:text-7xl font-extralight tracking-tighter text-stone-800 dark:text-stone-100 mb-2 drop-shadow-sm">$${stock.price.toFixed(2)}</div>
                <div className=${`flex items-center justify-end gap-3 text-base font-black ${stock.change > 0 ? 'text-pink-500' : 'text-stone-400'}`}>
                  <${stock.change > 0 ? Lucide.TrendingUp : Lucide.TrendingDown} size=${22} strokeWidth=${3} />
                  <span>${stock.changePercent}%</span>
                </div>
              </div>
            </div>

            <div className="rounded-[40px] p-2 md:p-6 relative z-10">
              <${TechnicalChart} data=${stock.history} auraTone=${auraTone} />
            </div>
          </section>

          {/* The Rose Signal Section */}
          <section className="bg-white/60 prismatic-glass rounded-[60px] p-8 md:p-14 space-y-12 relative shadow-2xl transition-all duration-1000">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
              <div className="flex items-center gap-6">
                <div className=${`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center transition-all duration-1000 shadow-xl ring-4 ring-white/50 shrink-0 ${
                  auraTone === 'Luminous' ? 'bg-pink-300' : auraTone === 'Grounding' ? 'bg-rose-800' : 'bg-rose-100'
                }`}>
                  <${Lucide.Sparkles} size=${32} className=${auraTone === 'Grounding' ? 'text-white' : 'text-pink-600'} />
                </div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-serif text-stone-800 dark:text-stone-100 tracking-tighter leading-none mb-2">The Rose Signal</h2>
                  <p className="text-[11px] font-black text-pink-500 uppercase tracking-[0.3em] italic">AI Intuitive Flow</p>
                </div>
              </div>
              ${analysis && html`
                <div className=${getSentimentStyles(analysis.sentiment, analysis.auraTone)}>
                  <${Lucide.Globe} size=${18} className="animate-spin-slow opacity-80" />
                  <span className="whitespace-nowrap">${analysis.sentiment}</span>
                </div>
              `}
            </div>

            ${loading ? html`
              <div className="py-20 flex flex-col items-center justify-center space-y-10">
                <div className="relative">
                  <div className="w-24 h-24 border-[4px] border-rose-100 border-t-pink-500 rounded-full animate-spin"></div>
                  <${Lucide.Heart} size=${32} className="absolute inset-0 m-auto text-pink-500 animate-pulse fill-pink-500/20" />
                </div>
                <p className="text-pink-500 font-black tracking-[0.4em] uppercase italic text-center px-4">Aligning frequencies of growth...</p>
              </div>
            ` : html`
              <div className="space-y-12 relative z-10 animate-fade-in">
                <div className="bg-white/95 p-8 md:p-12 rounded-[50px] shadow-inner leading-relaxed text-stone-900 font-medium text-xl md:text-2xl tracking-tighter border-2 border-pink-50">
                  ${analysis?.guidance}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-8 md:p-10 bg-white/50 rounded-[50px] border border-pink-100 group transition-all duration-700 hover:shadow-2xl">
                    <h4 className="flex items-center gap-4 text-[11px] font-black tracking-[0.4em] text-pink-600 mb-6">
                      <${Lucide.Info} size=${20} className="text-pink-400 shrink-0" /> Resonance Logic
                    </h4>
                    <p className="text-sm md:text-base text-stone-800 leading-relaxed font-medium">
                      ${analysis?.explanation}
                    </p>
                  </div>
                  <div className="p-8 md:p-10 bg-white/50 rounded-[50px] border border-pink-100 group transition-all duration-700 hover:shadow-2xl">
                    <h4 className="flex items-center gap-4 text-[11px] font-black tracking-[0.4em] text-pink-600 mb-8">
                      <${Lucide.Activity} size=${20} className="text-pink-400 shrink-0" /> Vital Pulse (RSI)
                    </h4>
                    <div className="space-y-8">
                      <div className="flex justify-between items-end">
                        <span className="text-pink-400 font-black tracking-widest text-[10px] uppercase italic">Momentum</span>
                        <span className="font-black text-pink-600 text-4xl leading-none drop-shadow-sm">${stock.indicators.rsi}</span>
                      </div>
                      <div className="w-full bg-pink-100/50 h-4 rounded-full overflow-hidden shadow-inner ring-1 ring-pink-200">
                         <div 
                          className="h-full bg-gradient-to-r from-pink-400 to-rose-600 transition-all duration-[2000ms] shadow-lg shadow-pink-200" 
                          style=${{ width: `${stock.indicators.rsi}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            `}
          </section>
        </div>

        {/* Right Column: Mindful Watch */}
        <aside className="md:col-span-12 xl:col-span-3 space-y-12 min-w-0 w-full">
          <section className="bg-white/80 prismatic-glass rounded-[56px] p-12 shadow-xl relative overflow-hidden group">
             <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-pink-100 rounded-full blur-3xl opacity-50"></div>
            <h3 className="flex items-center gap-5 font-serif text-3xl mb-10 text-stone-800 relative z-10">
              <${Lucide.ShieldCheck} className="text-pink-500" size=${28} /> 
              Mindful Watch
            </h3>
            <ul className="space-y-8 relative z-10">
              ${(analysis?.mindfulness || []).map((point, i) => html`
                <li key=${i} className="flex gap-6 group/item">
                  <div className="mt-3 w-4 h-4 rounded-full bg-pink-200 shrink-0 group-hover/item:bg-pink-500 group-hover/item:scale-125 transition-all shadow-sm"></div>
                  <span className="text-[15px] text-stone-800 leading-relaxed font-medium tracking-tighter opacity-80 group-hover/item:opacity-100 transition-opacity">
                    ${point}
                  </span>
                </li>
              `)}
              ${!analysis && html`
                <li className="italic text-stone-400 text-sm py-4">Observing market silence...</li>
              `}
            </ul>
          </section>

          <section className="space-y-6">
            <h3 className="font-serif text-3xl text-stone-800 px-4">Market Echoes</h3>
            <div className="space-y-4">
               ${stock.news.map((n, i) => html`
                  <div key=${i} className="bg-white/40 prismatic-glass p-8 rounded-[44px] border border-pink-50 hover:bg-white/70 transition-all cursor-pointer group shadow-sm">
                    <p className="text-sm font-semibold italic text-stone-800 leading-relaxed mb-4 group-hover:text-pink-600 transition-colors">"${n}"</p>
                    <div className="flex justify-between items-center opacity-60">
                      <span className="text-[9px] font-black uppercase tracking-widest">Aura Feed</span>
                      <${Lucide.ArrowRight} size=${16} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
               `)}
            </div>
          </section>

          <div className="p-14 rounded-[70px] bg-[#1a1617] text-stone-100 relative overflow-hidden shadow-2xl group transition-all hover:scale-[1.02] border-4 border-pink-500/20">
            <div className="absolute inset-0 bg-gradient-to-tr from-pink-600/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            <h4 className="font-serif text-4xl mb-6 font-black italic relative z-10 text-glow">Ascend to Pink</h4>
            <p className="text-base text-pink-200/80 mb-12 font-medium tracking-tight relative z-10">
              Unlock the full spectrum of abundance. Let beauty and intelligence guide your growth.
            </p>
            <button className="w-full bg-pink-500 text-white font-black text-[11px] uppercase tracking-[0.5em] py-7 rounded-[36px] hover:bg-rose-400 transition-all shadow-xl shadow-pink-500/30 relative z-10 border-b-4 border-rose-700 active:border-b-0 active:translate-y-1">
              Join the Pink Aura
            </button>
          </div>
        </aside>
      </div>
    <//>
  `;
};

export default App;
