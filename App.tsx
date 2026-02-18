
import React, { useState, useEffect, useCallback } from 'react';
import { Layout } from './components/Layout.tsx';
import { TechnicalChart } from './components/TechnicalChart.tsx';
import { MOCK_STOCKS } from './constants.tsx';
import { StockData, AIAnalysis } from './types.ts';
import { analyzeStock } from './services/geminiService.ts';
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
  Heart,
  Globe
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
    const base = "px-7 py-3 rounded-full text-[10px] font-black uppercase border-none backdrop-blur-3xl transition-all duration-1000 shadow-[0_15px_40px_rgba(251,113,133,0.2)] flex items-center gap-3 tracking-[0.2em] ";
    
    if (auraTone === 'Luminous') {
      return base + "bg-pink-100/95 dark:bg-pink-900/60 text-pink-700 dark:text-pink-100 ring-2 ring-pink-300 dark:ring-pink-500 shadow-[0_0_30px_rgba(251,113,133,0.4)]";
    }
    if (auraTone === 'Grounding') {
      return base + "bg-berry-100/95 dark:bg-berry-900/60 text-berry-800 dark:text-pink-100 ring-2 ring-berry-300 dark:ring-berry-500 shadow-[0_0_30px_rgba(136,19,55,0.3)]";
    }
    return base + "bg-rose-50/95 dark:bg-rose-950/60 text-pink-600 dark:text-rose-100 ring-2 ring-rose-200 dark:ring-rose-800 shadow-[0_0_20px_rgba(251,113,133,0.2)]";
  };

  const auraTone = analysis?.auraTone || 'Airy';

  return (
    <Layout auraTone={auraTone}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
        
        {/* Left Column: Ticker Search & List */}
        <aside className="lg:col-span-3 space-y-10">
          <div className="relative group">
            <input 
              type="text" 
              placeholder="Seek assets..." 
              className="w-full bg-white/60 dark:bg-stone-900/60 backdrop-blur-3xl border border-pink-200/50 dark:border-pink-900/40 rounded-[32px] py-5 px-14 text-sm focus:outline-none focus:ring-8 focus:ring-pink-100/50 dark:focus:ring-pink-900/30 transition-all dark:text-stone-100 placeholder-pink-300 font-medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-5 top-5 text-pink-300 dark:text-pink-800 group-focus-within:text-pink-600 transition-colors" size={22} />
          </div>

          <div className="space-y-6">
            <h3 className="text-[11px] uppercase font-black tracking-[0.5em] text-pink-400 dark:text-pink-900 ml-3">Asset Mandala</h3>
            <div className="space-y-4">
              {Object.keys(MOCK_STOCKS).map((ticker) => (
                <button
                  key={ticker}
                  onClick={() => handleTickerChange(ticker)}
                  className={`w-full flex items-center justify-between p-6 rounded-[40px] transition-all duration-1000 ${
                    selectedTicker === ticker 
                      ? 'bg-white/95 dark:bg-stone-800/95 shadow-[0_20px_50px_rgba(251,113,133,0.2)] dark:shadow-none ring-3 ring-pink-100 dark:ring-rose-800 scale-[1.04]' 
                      : 'hover:bg-rose-100/40 dark:hover:bg-rose-950/20'
                  }`}
                >
                  <div className="text-left">
                    <div className="font-black text-stone-800 dark:text-stone-100 text-base tracking-tighter leading-none mb-1">{ticker}</div>
                    <div className="text-[11px] text-pink-500 dark:text-pink-700 italic font-bold tracking-tight">{MOCK_STOCKS[ticker].name}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-black dark:text-stone-100 text-stone-800 leading-none mb-1">${MOCK_STOCKS[ticker].price}</div>
                    <div className={`text-[11px] font-black tracking-tighter ${MOCK_STOCKS[ticker].change > 0 ? 'text-pink-500' : 'text-stone-500'}`}>
                      {MOCK_STOCKS[ticker].changePercent}%
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="p-10 bg-gradient-to-br from-pink-100/50 to-white/10 dark:from-pink-950/30 dark:to-transparent rounded-[50px] border border-pink-200/50 dark:border-pink-900/30 backdrop-blur-3xl relative overflow-hidden group">
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-rose-400/20 dark:bg-rose-900/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-5 text-pink-500 dark:text-pink-400">
                <Heart size={20} className="fill-pink-300 dark:fill-pink-900" />
                <span className="text-[11px] font-black tracking-[0.4em] uppercase">Core Frequency</span>
              </div>
              <p className="text-xs text-stone-800 dark:text-stone-400 leading-relaxed italic font-medium opacity-80">
                "Growth is not just numbers; it's the radiant unfolding of potential within the pink mist of the market."
              </p>
            </div>
          </div>
        </aside>

        {/* Middle Column: Stock Details & Chart */}
        <div className="lg:col-span-6 space-y-12">
          <section className="bg-white/70 dark:bg-stone-900/60 backdrop-blur-3xl rounded-[70px] p-14 shadow-[0_40px_100px_rgba(251,113,133,0.12)] border border-pink-100/70 dark:border-pink-900/50 relative overflow-hidden transition-all duration-1000">
             {/* Giant Dynamic Halo */}
             <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full h-64 blur-[150px] pointer-events-none transition-all duration-1000 ${
               auraTone === 'Luminous' ? 'bg-pink-300/50' : auraTone === 'Grounding' ? 'bg-berry-300/20' : 'bg-rose-100/40'
             }`}></div>

            <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-10 mb-14">
              <div>
                <h1 className="font-serif text-7xl mb-4 tracking-tighter dark:text-stone-100 text-stone-800 leading-none drop-shadow-sm">{stock.name}</h1>
                <div className="flex items-center gap-5">
                  <span className="text-pink-500 dark:text-pink-800 font-black tracking-[0.5em] text-[11px] uppercase">{stock.symbol}</span>
                  <div className="w-2 h-2 bg-pink-300 dark:bg-pink-900 rounded-full"></div>
                  <span className="text-pink-300 dark:text-pink-700 text-[11px] font-black tracking-tighter uppercase italic opacity-80">Celestial Real-Time Feed</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-7xl font-extralight tracking-tighter text-stone-800 dark:text-stone-200 mb-2 drop-shadow-sm">${stock.price.toFixed(2)}</div>
                <div className={`flex items-center justify-end gap-3 text-base font-black tracking-tight ${stock.change > 0 ? 'text-pink-500 animate-pulse' : 'text-stone-500'}`}>
                  {stock.change > 0 ? <TrendingUp size={22} strokeWidth={3} /> : <TrendingDown size={22} strokeWidth={3} />}
                  <span>{stock.changePercent}%</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-b from-rose-100/30 to-transparent rounded-[60px] p-6 relative z-10 shadow-inner">
              <TechnicalChart data={stock.history} auraTone={auraTone} />
            </div>

            <div className="grid grid-cols-3 gap-12 mt-20 border-t border-pink-200/50 dark:border-pink-900/40 pt-14 relative z-10">
              {[
                { label: 'Essence (MCAP)', value: stock.marketCap },
                { label: 'Flow (AVG)', value: stock.volume },
                { label: 'Aura Pulse', value: stock.indicators.volatility }
              ].map((stat, i) => (
                <div key={i} className="text-center group cursor-default">
                  <div className="text-pink-400 dark:text-pink-900 text-[11px] uppercase font-black tracking-[0.3em] mb-4 group-hover:text-pink-600 transition-all duration-700">{stat.label}</div>
                  <div className="text-stone-800 dark:text-stone-100 font-black tracking-tighter text-2xl group-hover:scale-110 transition-transform duration-500">{stat.value}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white/50 dark:bg-stone-900/50 backdrop-blur-2xl border border-pink-100/70 dark:border-pink-900/50 rounded-[70px] p-14 space-y-12 relative overflow-hidden transition-all duration-1000 shadow-2xl">
            <div className={`absolute -top-32 left-1/4 w-64 h-64 blur-[100px] pointer-events-none transition-all duration-1000 ${
               auraTone === 'Luminous' ? 'bg-pink-400/50' : auraTone === 'Grounding' ? 'bg-berry-400/30' : 'bg-rose-300/40'
             }`}></div>

            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-6">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-1000 scale-110 shadow-[0_0_50px_rgba(251,113,133,0.4)] ${
                  auraTone === 'Luminous' ? 'bg-pink-300/90 dark:bg-pink-900/80' : auraTone === 'Grounding' ? 'bg-berry-300/90' : 'bg-rose-200/90'
                }`}>
                  <Sparkles size={32} className={auraTone === 'Luminous' ? 'text-white drop-shadow-[0_0_10px_white]' : 'text-pink-500'} />
                </div>
                <div>
                  <h2 className="text-4xl font-serif dark:text-stone-100 text-stone-800 tracking-tighter leading-none mb-2">The Rose Signal</h2>
                  <p className="text-[11px] font-black text-pink-500 dark:text-pink-800 uppercase tracking-[0.3em] opacity-80 italic">Elevated AI Insight</p>
                </div>
              </div>
              {analysis && (
                <div className={getSentimentStyles(analysis.sentiment, analysis.auraTone)}>
                  <Globe size={18} className="animate-spin-slow opacity-80" />
                  {analysis.sentiment}
                </div>
              )}
            </div>

            {loading ? (
              <div className="py-32 flex flex-col items-center justify-center space-y-10">
                <div className="relative">
                  <div className="w-24 h-24 border-[4px] border-pink-100 dark:border-pink-950 border-t-pink-500 rounded-full animate-spin"></div>
                  <div className="absolute inset-0 w-24 h-24 border-2 border-pink-400/60 rounded-full blur-xl animate-pulse"></div>
                  <Heart size={32} className="absolute inset-0 m-auto text-pink-500 animate-bounce fill-pink-500/20" />
                </div>
                <p className="text-pink-600 dark:text-pink-800 text-sm font-black tracking-[0.4em] uppercase italic animate-pulse">Aligning with the pink frequency of wealth...</p>
              </div>
            ) : (
              <div className="space-y-12 relative z-10">
                <div className="bg-white/90 dark:bg-stone-800/80 p-12 rounded-[50px] border-2 border-pink-100 dark:border-pink-900 shadow-inner leading-relaxed text-stone-900 dark:text-stone-100 font-medium text-2xl tracking-tighter drop-shadow-sm">
                  {analysis?.guidance}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="p-12 bg-white/60 dark:bg-stone-800/60 rounded-[50px] border border-pink-200/50 dark:border-pink-900/40 group hover:shadow-3xl hover:shadow-pink-400/20 transition-all duration-1000">
                    <h4 className="flex items-center gap-4 text-[11px] uppercase font-black tracking-[0.4em] text-pink-600 dark:text-pink-800 mb-8">
                      <Info size={20} className="text-pink-400" /> Resonance Logic
                    </h4>
                    <p className="text-base text-stone-800 dark:text-stone-300 leading-relaxed font-medium opacity-90">
                      {analysis?.explanation}
                    </p>
                  </div>
                  <div className="p-12 bg-white/60 dark:bg-stone-800/60 rounded-[50px] border border-pink-200/50 dark:border-pink-900/40 group hover:shadow-3xl hover:shadow-pink-400/20 transition-all duration-1000">
                    <h4 className="flex items-center gap-4 text-[11px] uppercase font-black tracking-[0.4em] text-pink-600 dark:text-pink-800 mb-8">
                      <Activity size={20} className="text-pink-400" /> Vital Pulse (RSI)
                    </h4>
                    <div className="space-y-8">
                      <div className="flex justify-between items-end text-xs">
                        <span className="text-pink-400 dark:text-pink-900 font-black tracking-widest uppercase italic">MOMENTUM</span>
                        <span className="font-black text-pink-600 text-3xl leading-none drop-shadow-md">{stock.indicators.rsi}</span>
                      </div>
                      <div className="w-full bg-pink-100/60 dark:bg-pink-950/60 h-4 rounded-full overflow-hidden relative shadow-inner">
                         <div className="absolute inset-y-0 left-[30%] w-[40%] bg-white/60 dark:bg-black/40 border-x-2 border-pink-200/50"></div>
                         <div 
                          className="h-full bg-gradient-to-r from-pink-400 to-rose-600 shadow-[0_0_30px_#f43f5eaa] transition-all duration-[2000ms]" 
                          style={{ width: `${stock.indicators.rsi}%` }}
                        ></div>
                      </div>
                      <p className="text-[11px] text-pink-600 dark:text-pink-100 font-black italic tracking-[0.3em] text-center uppercase drop-shadow-sm">
                        {stock.indicators.rsi > 70 ? 'Radiant Exuberance' : stock.indicators.rsi < 30 ? 'Peaceful Stillness' : 'Balanced Harmony'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>

        {/* Right Column: News & Risk */}
        <aside className="lg:col-span-3 space-y-12">
          <section className="bg-white/70 dark:bg-stone-900/60 backdrop-blur-3xl rounded-[56px] p-12 shadow-xl border border-pink-200/60 dark:border-pink-900/50 relative overflow-hidden group">
            <div className={`absolute -bottom-14 -left-14 w-40 h-40 blur-[60px] rounded-full transition-all duration-1000 ${
               auraTone === 'Luminous' ? 'bg-pink-300/50' : auraTone === 'Grounding' ? 'bg-berry-300/30' : 'bg-rose-200/40'
             }`}></div>
            <h3 className="flex items-center gap-5 font-serif text-3xl mb-10 dark:text-stone-100 text-stone-800 relative z-10 leading-none">
              <ShieldCheck className="text-pink-500 dark:text-pink-800" size={28} /> 
              Mindful Watch
            </h3>
            <ul className="space-y-8 relative z-10">
              {analysis?.mindfulness.map((point, i) => (
                <li key={i} className="flex gap-6 group/item">
                  <div className={`mt-3 w-4 h-4 rounded-full shrink-0 transition-all duration-700 ${
                    auraTone === 'Luminous' ? 'bg-pink-500 group-hover/item:scale-[2] shadow-[0_0_20px_#f43f5e]' : 'bg-rose-300 dark:bg-rose-900 group-hover/item:bg-pink-500 shadow-md'
                  }`}></div>
                  <span className="text-[15px] text-stone-800 dark:text-stone-200 leading-relaxed font-medium tracking-tighter group-hover/item:text-pink-600 dark:group-hover/item:text-pink-400 transition-colors drop-shadow-sm">{point}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-10">
            <div className="flex justify-between items-center px-4">
              <h3 className="font-serif text-3xl dark:text-stone-100 text-stone-800 leading-none">News Echoes</h3>
              <button className="text-[11px] uppercase font-black tracking-[0.4em] text-pink-500 hover:text-rose-600 transition-all flex items-center gap-3 group">
                All Stories <ChevronRight size={20} className="group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
            
            <div className="space-y-5">
              {stock.news.map((item, i) => (
                <div key={i} className="bg-white/50 dark:bg-stone-900/50 backdrop-blur-3xl p-8 rounded-[48px] border border-pink-200/60 dark:border-pink-900/40 hover:bg-rose-100/60 dark:hover:bg-rose-950/60 transition-all duration-1000 cursor-pointer group hover:-translate-y-2 shadow-sm hover:shadow-2xl hover:shadow-pink-300/30">
                  <p className="text-base text-stone-900 dark:text-stone-200 leading-relaxed mb-6 group-hover:text-stone-950 dark:group-hover:text-white transition-colors font-semibold tracking-tighter italic">
                    {item}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-pink-500 dark:text-pink-800 font-black uppercase tracking-[0.5em] italic">Aura Flow Feed</span>
                    <div className="w-12 h-12 rounded-full bg-rose-100 dark:bg-stone-800 flex items-center justify-center group-hover:bg-pink-500 dark:group-hover:bg-pink-900 transition-all duration-700 shadow-sm">
                      <ArrowRight size={22} className="text-rose-400 dark:text-rose-700 group-hover:text-white dark:group-hover:text-pink-200 transition-all group-hover:translate-x-1.5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="p-14 rounded-[70px] bg-[#2a1b1d] text-stone-100 relative overflow-hidden ring-4 ring-pink-500/30 shadow-[0_60px_120px_rgba(251,113,133,0.4)] group cursor-pointer transition-all duration-1000 hover:scale-[1.02]">
            <div className="absolute inset-0 bg-gradient-to-tr from-pink-600/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-[2000ms]"></div>
            <div className="relative z-10 text-center">
              <h4 className="font-serif text-4xl mb-6 tracking-tighter leading-tight font-black italic drop-shadow-md">Amplify the Pink</h4>
              <p className="text-base text-pink-200/80 mb-12 leading-relaxed font-medium tracking-tight px-3 drop-shadow-sm lowercase">
                Illuminate your complete financial landscape. Harmony and abundance await within our premium circles.
              </p>
              <button className="w-full bg-[#fb7185] text-white font-black text-[11px] uppercase tracking-[0.5em] py-7 rounded-[36px] hover:bg-rose-400 transition-all duration-1000 shadow-[0_15px_35px_rgba(244,63,94,0.6)] flex items-center justify-center gap-4 group-hover:scale-[1.05] group-hover:shadow-pink-500/60 ring-4 ring-pink-400/30">
                Join the Pink Aura
              </button>
            </div>
            <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-pink-600/40 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute -top-20 -left-20 w-48 h-48 bg-rose-500/20 rounded-full blur-[100px] animate-pulse delay-1000"></div>
          </div>
        </aside>

      </div>
    </Layout>
  );
};

export default App;
