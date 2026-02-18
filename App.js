
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

  const auraTone = analysis?.auraTone || 'Airy';

  return html`
    <${Layout} auraTone=${auraTone}>
      <div className="space-y-8">
        
        {/* Simplified Ticker Selector */}
        <div className="flex justify-center gap-3 overflow-x-auto py-2">
          ${Object.keys(MOCK_STOCKS).map((ticker) => html`
            <button
              key=${ticker}
              onClick=${() => handleTickerChange(ticker)}
              className=${`px-6 py-2 rounded-full text-xs font-black tracking-widest transition-all ${
                selectedTicker === ticker 
                  ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/30' 
                  : 'bg-white/50 dark:bg-stone-800/50 hover:bg-white'
              }`}
            >
              ${ticker}
            </button>
          `)}
        </div>

        {/* Main Card */}
        <div className="bg-white/80 dark:bg-stone-900/80 backdrop-blur-xl rounded-[40px] p-8 shadow-2xl border border-pink-100/50 dark:border-pink-900/30 overflow-hidden relative">
           
           {/* Ambient Glow */}
           <div className=${`absolute top-0 right-0 w-64 h-64 blur-[100px] pointer-events-none transition-all duration-1000 opacity-50 ${
             auraTone === 'Luminous' ? 'bg-pink-400' : 'bg-rose-200'
           }`}></div>

           {/* Header */}
           <div className="relative z-10 flex flex-col md:flex-row justify-between items-end gap-6 mb-8">
             <div>
               <div className="flex items-center gap-3 mb-1">
                 <h1 className="text-4xl md:text-5xl font-serif text-stone-900 dark:text-stone-100 tracking-tight">${stock.name}</h1>
                 <span className="bg-pink-100 dark:bg-pink-900 text-pink-600 dark:text-pink-200 text-[10px] font-black px-2 py-1 rounded-md tracking-wider">${stock.symbol}</span>
               </div>
               <div className="flex items-center gap-2 text-sm text-stone-500 font-medium">
                 <${Lucide.Activity} size=${14} />
                 <span>Vol: ${stock.volume}</span>
                 <span className="mx-1">•</span>
                 <span>RSI: ${stock.indicators.rsi}</span>
               </div>
             </div>
             
             <div className="text-right">
               <div className="text-5xl font-light tracking-tighter">$${stock.price.toFixed(2)}</div>
               <div className=${`flex items-center justify-end gap-2 text-sm font-bold mt-1 ${stock.change > 0 ? 'text-pink-500' : 'text-stone-500'}`}>
                 ${stock.change > 0 ? '+' : ''}${stock.change} (${stock.changePercent}%)
               </div>
             </div>
           </div>

           {/* Chart */}
           <div className="h-[350px] w-full bg-gradient-to-b from-pink-50/50 to-transparent rounded-[30px] p-4 mb-8">
             <${TechnicalChart} data=${stock.history} auraTone=${auraTone} />
           </div>

           {/* AI Insight Section */}
           <div className="bg-white/60 dark:bg-black/20 rounded-[30px] p-6 md:p-8 border border-pink-50 dark:border-pink-900/20">
             <div className="flex items-center gap-3 mb-4 text-pink-500">
               <${Lucide.Sparkles} size=${20} />
               <span className="text-xs font-black uppercase tracking-[0.3em]">Aura Insight</span>
             </div>

             ${loading ? html`
                <div className="h-24 flex items-center justify-center text-pink-400 text-sm animate-pulse italic">
                  Reading the stars...
                </div>
             ` : html`
                <div className="space-y-4 animate-fade-in">
                  <p className="text-xl md:text-2xl font-serif leading-relaxed text-stone-800 dark:text-stone-200">
                    ${analysis?.guidance}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-4 py-1.5 rounded-full bg-pink-100 dark:bg-pink-900/50 text-pink-700 dark:text-pink-200 text-xs font-bold uppercase tracking-wider border border-pink-200 dark:border-pink-800">
                      ${analysis?.sentiment}
                    </span>
                    <span className="px-4 py-1.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 text-xs font-bold uppercase tracking-wider">
                      ${analysis?.auraTone} Tone
                    </span>
                  </div>
                  <p className="text-sm text-stone-500 dark:text-stone-400 pt-2 border-t border-dashed border-stone-200 dark:border-stone-800">
                    <span className="font-bold">Why?</span> ${analysis?.explanation}
                  </p>
                </div>
             `}
           </div>
        </div>
      </div>
    <//>
  `;
};

export default App;
