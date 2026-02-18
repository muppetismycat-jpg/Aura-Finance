
import React, { useState, useEffect, useCallback } from 'https://esm.sh/react@^19.2.4';
import htm from 'https://esm.sh/htm';
import { Layout } from './components/Layout.js';
import { TechnicalChart } from './components/TechnicalChart.js';
import { MOCK_STOCKS } from './constants.js';
import { analyzeStock } from './services/geminiService.js';
import * as Lucide from 'https://esm.sh/lucide-react@^0.574.0';

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
    if (auraTone === 'Luminous') return base + "bg-pink-100 text-pink-700 ring-2 ring-pink-300";
    if (auraTone === 'Grounding') return base + "bg-rose-900 text-rose-100 ring-2 ring-rose-700";
    return base + "bg-rose-50 text-pink-500 ring-2 ring-rose-200";
  };

  const auraTone = analysis?.auraTone || 'Airy';

  return html`
    <${Layout} auraTone=${auraTone}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
        
        <aside className="lg:col-span-3 space-y-10">
          <div className="relative group">
            <input 
              type="text" 
              placeholder="Seek assets..." 
              className="w-full bg-white/70 dark:bg-stone-900/70 prismatic-glass rounded-[32px] py-5 px-14 text-sm focus:outline-none focus:ring-8 focus:ring-pink-100 dark:focus:ring-pink-950 transition-all placeholder-pink-300"
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
                      ? 'bg-white shadow-2xl ring-4 ring-pink-100 scale-[1.05]' 
                      : 'hover:bg-rose-100/40'
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

        <div className="lg:col-span-6 space-y-12">
          <section className="bg-white/80 dark:bg-stone-900/80 prismatic-glass rounded-[70px] p-14 shadow-2xl relative overflow-hidden transition-all duration-1000">
             <div className=${`absolute top-0 left-1/2 -translate-x-1/2 w-full h-64 blur-[150px] pointer-events-none transition-all duration-1000 ${
               auraTone === 'Luminous' ? 'bg-pink-300/40' : auraTone === 'Grounding' ? 'bg-rose-900/20' : 'bg-rose-100/30'
             }`}></div>

            <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-10 mb-14">
              <div>
                <h1 className="font-serif text-7xl mb-4 tracking-tighter text-stone-800 dark:text-stone-100 leading-none">${stock.name}</h1>
                <div className="flex items-center gap-5">
                  <span className="text-pink-500 font-black tracking-[0.5em] text-[11px] uppercase">${stock.symbol}</span>
                  <div className="w-2 h-2 bg-pink-300 rounded-full"></div>
                  <span className="text-pink-300 text-[11px] font-black uppercase italic">Celestial Real-Time</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-7xl font-extralight tracking-tighter text-stone-800 dark:text-stone-100 mb-2">$${stock.price.toFixed(2)}</div>
                <div className=${`flex items-center justify-end gap-3 text-base font-black ${stock.change > 0 ? 'text-pink-500' : 'text-stone-400'}`}>
                  <${stock.change > 0 ? Lucide.TrendingUp : Lucide.TrendingDown} size=${22} />
                  <span>${stock.changePercent}%</span>
                </div>
              </div>
            </div>

            <div className="rounded-[60px] p-6 relative z-10">
              <${TechnicalChart} data=${stock.history} auraTone=${auraTone} />
            </div>
          </section>

          <section className="bg-white/60 prismatic-glass rounded-[70px] p-14 space-y-12 relative shadow-2xl">
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-6">
                <div className=${`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-1000 shadow-xl ${
                  auraTone === 'Luminous' ? 'bg-pink-200' : 'bg-rose-100'
                }`}>
                  <${Lucide.Sparkles} size=${32} className="text-pink-600" />
                </div>
                <div>
                  <h2 className="text-4xl font-serif text-stone-800 dark:text-stone-100 tracking-tighter leading-none mb-2">The Rose Signal</h2>
                  <p className="text-[11px] font-black text-pink-500 uppercase tracking-[0.3em] italic">AI Intuition</p>
                </div>
              </div>
              ${analysis && html`
                <div className=${getSentimentStyles(analysis.sentiment, analysis.auraTone)}>
                  <${Lucide.Globe} size=${18} className="animate-spin-slow" />
                  ${analysis.sentiment}
                </div>
              `}
            </div>

            ${loading ? html`
              <div className="py-32 flex flex-col items-center justify-center space-y-10">
                <div className="relative">
                  <div className="w-24 h-24 border-[4px] border-rose-100 border-t-pink-500 rounded-full animate-spin"></div>
                  <${Lucide.Heart} size=${32} className="absolute inset-0 m-auto text-pink-500 animate-pulse" />
                </div>
                <p className="text-pink-500 font-black tracking-[0.4em] uppercase italic">Aligning frequencies...</p>
              </div>
            ` : html`
              <div className="space-y-12 relative z-10">
                <div className="bg-white/90 p-12 rounded-[50px] shadow-inner leading-relaxed text-stone-900 font-medium text-2xl tracking-tighter">
                  ${analysis?.guidance}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="p-10 bg-white/50 rounded-[50px] border border-pink-100 group transition-all duration-700 hover:shadow-2xl">
                    <h4 className="flex items-center gap-4 text-[11px] font-black tracking-[0.4em] text-pink-600 mb-6">
                      <${Lucide.Info} size=${20} /> Resonance Logic
                    </h4>
                    <p className="text-base text-stone-800 leading-relaxed font-medium">
                      ${analysis?.explanation}
                    </p>
                  </div>
                  <div className="p-10 bg-white/50 rounded-[50px] border border-pink-100 group transition-all duration-700 hover:shadow-2xl">
                    <h4 className="flex items-center gap-4 text-[11px] font-black tracking-[0.4em] text-pink-600 mb-8">
                      <${Lucide.Activity} size=${20} /> Heartbeat (RSI)
                    </h4>
                    <div className="space-y-8">
                      <div className="flex justify-between items-end">
                        <span className="font-black text-pink-600 text-3xl">${stock.indicators.rsi}</span>
                      </div>
                      <div className="w-full bg-pink-100 h-4 rounded-full overflow-hidden shadow-inner">
                         <div 
                          className="h-full bg-pink-500 transition-all duration-1000" 
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

        <aside className="lg:col-span-3 space-y-12">
          <section className="bg-white prismatic-glass rounded-[56px] p-12 shadow-xl relative overflow-hidden group">
            <h3 className="flex items-center gap-5 font-serif text-3xl mb-10 text-stone-800">
              <${Lucide.ShieldCheck} className="text-pink-500" size=${28} /> 
              Mindful Watch
            </h3>
            <ul className="space-y-8">
              ${analysis?.mindfulness.map((point, i) => html`
                <li key=${i} className="flex gap-6 group">
                  <div className="mt-3 w-4 h-4 rounded-full bg-pink-300 group-hover:bg-pink-500 transition-all"></div>
                  <span className="text-[15px] text-stone-800 leading-relaxed font-medium tracking-tighter">${point}</span>
                </li>
              `)}
            </ul>
          </section>

          <div className="p-14 rounded-[70px] bg-[#1a1617] text-stone-100 relative overflow-hidden shadow-2xl group transition-all hover:scale-[1.02]">
            <h4 className="font-serif text-4xl mb-6 font-black italic">Ascend to Pink</h4>
            <p className="text-base text-pink-200/80 mb-12 font-medium tracking-tight">
              Unlock the full spectrum of abundance. Let beauty guide your growth.
            </p>
            <button className="w-full bg-pink-500 text-white font-black text-[11px] uppercase tracking-[0.5em] py-7 rounded-[36px] hover:bg-rose-400 transition-all shadow-xl">
              Join the Pink Aura
            </button>
          </div>
        </aside>
      </div>
    <//>
  `;
};

export default App;
