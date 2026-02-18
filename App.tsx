
import React, { useState, useEffect, useCallback } from 'react';
import { Layout } from './components/Layout';
import { TechnicalChart } from './components/TechnicalChart';
import { MOCK_STOCKS } from './constants';
import { StockData, AIAnalysis } from './types';
import { analyzeStock } from './services/geminiService';
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Search, 
  Info, 
  Leaf, 
  ShieldCheck, 
  Sparkles,
  ChevronRight,
  ArrowRight,
  Heart
} from 'lucide-react';

const App: React.FC = () => {
  const [selectedTicker, setSelectedTicker] = useState<string>('AAPL');
  const [stock, setStock] = useState<StockData>(MOCK_STOCKS['AAPL']);
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchAnalysis = useCallback(async (data: StockData) => {
    setLoading(true);
    const result = await analyzeStock(data);
    setAnalysis(result);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchAnalysis(stock);
  }, [stock, fetchAnalysis]);

  const handleTickerChange = (ticker: string) => {
    if (MOCK_STOCKS[ticker]) {
      setStock(MOCK_STOCKS[ticker]);
      setSelectedTicker(ticker);
    }
  };

  const getSentimentStyles = (sentiment: string, auraTone?: string) => {
    const base = "px-6 py-2.5 rounded-full text-xs font-bold border-none backdrop-blur-2xl transition-all duration-700 shadow-[0_10px_30px_rgba(214,141,154,0.1)] flex items-center gap-2 tracking-[0.1em] ";
    
    if (auraTone === 'Luminous') {
      return base + "bg-pink-100/90 dark:bg-pink-900/40 text-pink-700 dark:text-pink-200 ring-1 ring-pink-200/50 dark:ring-pink-500/20";
    }
    if (auraTone === 'Grounding') {
      return base + "bg-berry-100/90 dark:bg-berry-900/40 text-berry-700 dark:text-berry-200 ring-1 ring-berry-200/50 dark:ring-berry-500/20";
    }
    return base + "bg-rose-50/90 dark:bg-rose-950/40 text-pink-600 dark:text-rose-200 ring-1 ring-rose-100/50 dark:ring-rose-800/20";
  };

  const auraTone = analysis?.auraTone || 'Airy';

  return (
    <Layout auraTone={auraTone}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 relative z-10">
        
        {/* Left Column: Ticker Search & List */}
        <aside className="lg:col-span-3 space-y-8">
          <div className="relative group">
            <input 
              type="text" 
              placeholder="Seek assets..." 
              className="w-full bg-white/40 dark:bg-stone-900/40 backdrop-blur-2xl border border-rose-100/40 dark:border-rose-900/20 rounded-[28px] py-4 px-12 text-sm focus:outline-none focus:ring-4 focus:ring-pink-100/40 dark:focus:ring-pink-900/20 transition-all dark:text-stone-200 placeholder-rose-300 font-light"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-4 top-4.5 text-rose-300 dark:text-rose-700 group-focus-within:text-pink-500 transition-colors" size={20} />
          </div>

          <div className="space-y-5">
            <h3 className="text-[10px] uppercase font-bold tracking-[0.4em] text-pink-300 dark:text-pink-800 ml-2">Inner Portfolio</h3>
            <div className="space-y-3">
              {Object.keys(MOCK_STOCKS).map((ticker) => (
                <button
                  key={ticker}
                  onClick={() => handleTickerChange(ticker)}
                  className={`w-full flex items-center justify-between p-5 rounded-[32px] transition-all duration-700 ${
                    selectedTicker === ticker 
                      ? 'bg-white/80 dark:bg-stone-800/80 shadow-[0_15px_40px_rgba(214,141,154,0.12)] dark:shadow-none ring-1 ring-pink-100/50 dark:ring-rose-800/50 scale-[1.03]' 
                      : 'hover:bg-rose-50/40 dark:hover:bg-rose-950/20'
                  }`}
                >
                  <div className="text-left">
                    <div className="font-bold text-stone-800 dark:text-stone-100 text-sm tracking-tighter">{ticker}</div>
                    <div className="text-[10px] text-pink-400 dark:text-pink-600 italic font-light">{MOCK_STOCKS[ticker].name}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-semibold dark:text-stone-200 text-stone-800">${MOCK_STOCKS[ticker].price}</div>
                    <div className={`text-[10px] font-bold tracking-tighter ${MOCK_STOCKS[ticker].change > 0 ? 'text-pink-500' : 'text-stone-400'}`}>
                      {MOCK_STOCKS[ticker].changePercent}%
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="p-8 bg-gradient-to-br from-pink-50/50 to-white/10 dark:from-pink-950/10 dark:to-transparent rounded-[44px] border border-rose-100/40 dark:border-rose-900/10 backdrop-blur-xl relative overflow-hidden group">
            <div className="absolute -bottom-4 -right-4 w-28 h-28 bg-rose-200/30 dark:bg-rose-900/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4 text-pink-500 dark:text-pink-400">
                <Heart size={18} className="fill-pink-100 dark:fill-pink-900" />
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase">Mindful Core</span>
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed italic font-light">
                "Trust the flow of your intuition. The market is but a reflection of collective thought."
              </p>
            </div>
          </div>
        </aside>

        {/* Middle Column: Stock Details & Chart */}
        <div className="lg:col-span-6 space-y-10">
          <section className="bg-white/50 dark:bg-stone-900/40 backdrop-blur-3xl rounded-[60px] p-12 shadow-[0_30px_70px_rgba(214,141,154,0.06)] border border-rose-50/60 dark:border-rose-900/30 relative overflow-hidden transition-all duration-1000">
             {/* Large Central Halo */}
             <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full h-56 blur-[130px] pointer-events-none transition-all duration-1000 ${
               auraTone === 'Luminous' ? 'bg-pink-200/40' : auraTone === 'Grounding' ? 'bg-berry-100/30' : 'bg-rose-50/30'
             }`}></div>

            <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
              <div>
                <h1 className="font-serif text-6xl mb-3 tracking-tighter dark:text-stone-100 text-stone-800 leading-none">{stock.name}</h1>
                <div className="flex items-center gap-4">
                  <span className="text-pink-400 dark:text-pink-700 font-bold tracking-[0.4em] text-[10px] uppercase">{stock.symbol}</span>
                  <div className="w-1.5 h-1.5 bg-rose-200 dark:bg-rose-900 rounded-full"></div>
                  <span className="text-stone-400 dark:text-stone-600 text-[10px] font-bold tracking-tighter uppercase italic">Harmonized Real-Time</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-6xl font-extralight tracking-tighter text-stone-800 dark:text-stone-200 mb-1">${stock.price.toFixed(2)}</div>
                <div className={`flex items-center justify-end gap-2 text-sm font-bold tracking-tight ${stock.change > 0 ? 'text-pink-500' : 'text-stone-400'}`}>
                  {stock.change > 0 ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
                  <span>{stock.changePercent}%</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-b from-rose-50/20 to-transparent rounded-[48px] p-4 relative z-10">
              <TechnicalChart data={stock.history} auraTone={auraTone} />
            </div>

            <div className="grid grid-cols-3 gap-10 mt-16 border-t border-rose-100/30 dark:border-rose-900/20 pt-12 relative z-10">
              {[
                { label: 'Essence (MCAP)', value: stock.marketCap },
                { label: 'Flow (AVG)', value: stock.volume },
                { label: 'Pulsation', value: stock.indicators.volatility }
              ].map((stat, i) => (
                <div key={i} className="text-center group cursor-default">
                  <div className="text-pink-300 dark:text-pink-800 text-[10px] uppercase font-bold tracking-[0.25em] mb-3 group-hover:text-pink-500 transition-all duration-500">{stat.label}</div>
                  <div className="text-stone-800 dark:text-stone-100 font-semibold tracking-tighter text-lg">{stat.value}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white/30 dark:bg-stone-900/30 backdrop-blur-2xl border border-rose-100/40 dark:border-rose-900/20 rounded-[60px] p-12 space-y-10 relative overflow-hidden transition-all duration-1000">
            <div className={`absolute -top-20 left-1/3 w-48 h-48 blur-[80px] pointer-events-none transition-all duration-1000 ${
               auraTone === 'Luminous' ? 'bg-pink-300/40' : auraTone === 'Grounding' ? 'bg-berry-200/30' : 'bg-rose-200/30'
             }`}></div>

            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-5">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-1000 scale-110 ${
                  auraTone === 'Luminous' ? 'bg-pink-100/80 dark:bg-pink-900/50 shadow-[0_0_30px_#fbcfe8]' : auraTone === 'Grounding' ? 'bg-berry-100/80 shadow-[0_0_30px_#704c5e44]' : 'bg-rose-50/80'
                }`}>
                  <Sparkles size={24} className={auraTone === 'Luminous' ? 'text-pink-500' : 'text-stone-400'} />
                </div>
                <div>
                  <h2 className="text-3xl font-serif dark:text-stone-100 text-stone-800 tracking-tight leading-none mb-1">Celestial Signal</h2>
                  <p className="text-[10px] font-bold text-pink-300 dark:text-pink-800 uppercase tracking-widest">Powered by Aura-Gen-AI</p>
                </div>
              </div>
              {analysis && (
                <div className={getSentimentStyles(analysis.sentiment, analysis.auraTone)}>
                  <Activity size={14} className="animate-pulse" />
                  {analysis.sentiment}
                </div>
              )}
            </div>

            {loading ? (
              <div className="py-24 flex flex-col items-center justify-center space-y-8">
                <div className="relative">
                  <div className="w-16 h-16 border-[3px] border-rose-100 dark:border-rose-950 border-t-pink-500 rounded-full animate-spin"></div>
                  <div className="absolute inset-0 w-16 h-16 border border-pink-200/50 rounded-full blur-md animate-pulse"></div>
                </div>
                <p className="text-pink-400 dark:text-pink-700 text-sm font-light tracking-[0.2em] uppercase italic">Aligning with the market frequency...</p>
              </div>
            ) : (
              <div className="space-y-10 relative z-10">
                <div className="bg-white/60 dark:bg-stone-800/40 p-10 rounded-[44px] border border-rose-100/50 dark:border-rose-900/30 leading-relaxed text-stone-700 dark:text-stone-200 font-light text-xl tracking-tight">
                  {analysis?.guidance}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-10 bg-white/40 dark:bg-stone-800/40 rounded-[44px] border border-rose-100/40 dark:border-rose-900/30 group hover:shadow-2xl hover:shadow-pink-100/20 transition-all duration-700">
                    <h4 className="flex items-center gap-3 text-[10px] uppercase font-bold tracking-[0.3em] text-pink-400 dark:text-pink-700 mb-6">
                      <Info size={16} /> Indicator Resonance
                    </h4>
                    <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed font-light">
                      {analysis?.explanation}
                    </p>
                  </div>
                  <div className="p-10 bg-white/40 dark:bg-stone-800/40 rounded-[44px] border border-rose-100/40 dark:border-rose-900/30 group hover:shadow-2xl hover:shadow-pink-100/20 transition-all duration-700">
                    <h4 className="flex items-center gap-3 text-[10px] uppercase font-bold tracking-[0.3em] text-pink-400 dark:text-pink-700 mb-6">
                      <Activity size={16} /> Heartbeat (RSI)
                    </h4>
                    <div className="space-y-6">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-stone-500 dark:text-stone-500 font-semibold tracking-wider">MOMENTUM</span>
                        <span className="font-black text-pink-500 text-lg">{stock.indicators.rsi}</span>
                      </div>
                      <div className="w-full bg-rose-100/40 dark:bg-rose-950/40 h-3 rounded-full overflow-hidden relative shadow-inner">
                         <div className="absolute inset-y-0 left-[30%] w-[40%] bg-white/40 dark:bg-black/20 border-x border-rose-200/50"></div>
                         <div 
                          className="h-full bg-gradient-to-r from-pink-300 to-pink-600 shadow-[0_0_15px_#f472b688] transition-all duration-1500" 
                          style={{ width: `${stock.indicators.rsi}%` }}
                        ></div>
                      </div>
                      <p className="text-[10px] text-pink-300 dark:text-pink-800 font-bold italic tracking-widest text-center uppercase">
                        {stock.indicators.rsi > 70 ? 'Energy Peaks' : stock.indicators.rsi < 30 ? 'Deep Stillness' : 'Balanced Rhythm'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>

        {/* Right Column: News & Risk */}
        <aside className="lg:col-span-3 space-y-10">
          <section className="bg-white/50 dark:bg-stone-900/40 backdrop-blur-2xl rounded-[48px] p-10 shadow-sm border border-rose-100/60 dark:border-rose-900/40 relative overflow-hidden group">
            <div className={`absolute -bottom-12 -left-12 w-32 h-32 blur-[50px] rounded-full transition-all duration-1000 ${
               auraTone === 'Luminous' ? 'bg-pink-200/40' : auraTone === 'Grounding' ? 'bg-berry-100/30' : 'bg-rose-100/30'
             }`}></div>
            <h3 className="flex items-center gap-4 font-serif text-2xl mb-8 dark:text-stone-100 text-stone-800 relative z-10">
              <ShieldCheck className="text-pink-400 dark:text-pink-700" size={24} /> 
              Mindful Watch
            </h3>
            <ul className="space-y-6 relative z-10">
              {analysis?.mindfulness.map((point, i) => (
                <li key={i} className="flex gap-5 group/item">
                  <div className={`mt-2.5 w-2.5 h-2.5 rounded-full shrink-0 transition-all duration-700 ${
                    auraTone === 'Luminous' ? 'bg-pink-400 group-hover/item:scale-[1.7] shadow-[0_0_12px_#f472b6]' : 'bg-rose-200 dark:bg-rose-900 group-hover/item:bg-pink-400'
                  }`}></div>
                  <span className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-light tracking-tight group-hover/item:text-stone-900 dark:group-hover/item:text-white transition-colors">{point}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-8">
            <div className="flex justify-between items-center px-3">
              <h3 className="font-serif text-2xl dark:text-stone-100 text-stone-800">Echoes</h3>
              <button className="text-[10px] uppercase font-bold tracking-[0.3em] text-pink-400 hover:text-pink-600 transition-all flex items-center gap-2 group">
                Full Feed <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            
            <div className="space-y-4">
              {stock.news.map((item, i) => (
                <div key={i} className="bg-white/30 dark:bg-stone-900/30 backdrop-blur-xl p-7 rounded-[40px] border border-rose-100/40 dark:border-rose-900/20 hover:bg-rose-50/50 dark:hover:bg-stone-800/50 transition-all duration-700 cursor-pointer group hover:-translate-y-1.5 shadow-sm hover:shadow-xl hover:shadow-pink-100/20">
                  <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed mb-5 group-hover:text-stone-900 dark:group-hover:text-stone-100 transition-colors font-light tracking-tight">
                    {item}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] text-pink-300 dark:text-pink-800 font-black uppercase tracking-[0.4em]">Collective Pulse</span>
                    <div className="w-10 h-10 rounded-full bg-rose-50 dark:bg-stone-800 flex items-center justify-center group-hover:bg-pink-100 dark:group-hover:bg-pink-900 transition-all duration-500">
                      <ArrowRight size={18} className="text-rose-300 dark:text-rose-700 group-hover:text-pink-600 dark:group-hover:text-pink-300 transition-all group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="p-12 rounded-[64px] bg-[#1a1617] text-stone-200 relative overflow-hidden ring-1 ring-white/10 shadow-3xl group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1500"></div>
            <div className="relative z-10 text-center">
              <h4 className="font-serif text-3xl mb-4 tracking-tighter leading-tight">Elevate Your Aura</h4>
              <p className="text-sm text-stone-400 mb-10 leading-relaxed font-light tracking-wide px-2">
                Sync your complete financial journey. Let the beauty of growth illuminate every decision.
              </p>
              <button className="w-full bg-[#fce4ec] text-pink-900 font-bold text-[10px] uppercase tracking-[0.4em] py-6 rounded-[32px] hover:bg-white transition-all duration-700 shadow-2xl flex items-center justify-center gap-3 group-hover:scale-[1.04] group-hover:shadow-pink-500/20">
                Ascend to Premium
              </button>
            </div>
            {/* Pulsing Rose Orb */}
            <div className="absolute -bottom-16 -right-16 w-56 h-56 bg-pink-500/20 rounded-full blur-[100px] animate-pulse"></div>
          </div>
        </aside>

      </div>
    </Layout>
  );
};

export default App;
