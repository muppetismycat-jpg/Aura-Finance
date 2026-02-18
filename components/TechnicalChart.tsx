
import React, { useEffect, useState } from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Brush
} from 'recharts';
import { StockData } from '../types';

interface TechnicalChartProps {
  data: StockData['history'];
  auraTone?: 'Luminous' | 'Airy' | 'Grounding';
}

const CustomTooltip = ({ active, payload, label, isDark }: any) => {
  if (active && payload && payload.length) {
    const price = payload[0].value;
    return (
      <div className={`
        p-5 rounded-[24px] shadow-2xl border-none backdrop-blur-2xl
        ${isDark ? 'bg-stone-900/90 text-stone-100 ring-1 ring-pink-900/30' : 'bg-white/90 text-stone-800 ring-1 ring-pink-100'}
        flex flex-col gap-1 transition-all duration-300
      `}>
        <p className="text-[10px] uppercase tracking-[0.2em] text-pink-400 font-bold mb-1">
          {new Date(label).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-serif font-semibold text-stone-800 dark:text-white">${price.toFixed(2)}</span>
          <span className="text-[10px] text-stone-400 font-medium tracking-widest">USD</span>
        </div>
        <div className="flex items-center gap-1.5 mt-2">
          <div className={`w-2 h-2 rounded-full ${isDark ? 'bg-pink-400 shadow-[0_0_8px_#f472b6]' : 'bg-[#d68d9a]'}`}></div>
          <span className="text-[10px] italic text-stone-500 font-light">Serene valuation</span>
        </div>
      </div>
    );
  }
  return null;
};

export const TechnicalChart: React.FC<TechnicalChartProps> = ({ data, auraTone = 'Airy' }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsDark(document.documentElement.classList.contains('dark'));
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });
    setIsDark(document.documentElement.classList.contains('dark'));
    
    return () => observer.disconnect();
  }, []);

  const getAuraColor = () => {
    switch (auraTone) {
      case 'Luminous': return isDark ? '#f472b6' : '#d68d9a';
      case 'Grounding': return isDark ? '#ec4899' : '#be185d';
      default: return isDark ? '#e9b7b7' : '#d68d9a';
    }
  };

  const primaryColor = getAuraColor();
  const gridColor = isDark ? 'rgba(214, 141, 154, 0.05)' : 'rgba(214, 141, 154, 0.1)';
  const textColor = isDark ? '#704c5e' : '#d68d9a';
  const brushColor = isDark ? 'rgba(26, 22, 23, 0.4)' : 'rgba(255, 250, 251, 0.6)';

  return (
    <div className="h-[400px] w-full mt-4 flex flex-col relative group">
      {/* Background Aura Glow */}
      <div className={`absolute inset-0 opacity-25 blur-[100px] rounded-full transition-all duration-1000 ${
        auraTone === 'Luminous' ? 'bg-rose-200/30' : auraTone === 'Grounding' ? 'bg-pink-300/20' : 'bg-pink-100/20'
      }`}></div>
      
      <div className="flex-1 relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={primaryColor} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={primaryColor} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke={gridColor} strokeDasharray="5 5" />
            <XAxis 
              dataKey="date" 
              hide
            />
            <YAxis 
              orientation="right" 
              domain={['auto', 'auto']}
              axisLine={false}
              tickLine={false}
              tick={{ fill: textColor, fontSize: 10, fontWeight: 600, letterSpacing: '0.05em' }}
              tickFormatter={(val) => `$${val}`}
            />
            <Tooltip 
              content={<CustomTooltip isDark={isDark} />}
              cursor={{ stroke: primaryColor, strokeWidth: 1.5, strokeDasharray: '6 6' }}
            />
            <Area 
              type="monotone" 
              dataKey="price" 
              stroke={primaryColor} 
              strokeWidth={4}
              fillOpacity={1} 
              fill="url(#colorPrice)" 
              animationDuration={2500}
              activeDot={{ r: 8, strokeWidth: 0, fill: primaryColor, className: 'drop-shadow-[0_0_12px_rgba(214,141,154,0.9)]' }}
            />
            <Brush 
              dataKey="date" 
              height={35} 
              stroke={primaryColor}
              fill={brushColor}
              travellerWidth={12}
              gap={5}
              className="opacity-40 hover:opacity-100 transition-opacity duration-500"
              style={{
                fontSize: '9px',
                fontFamily: 'Inter',
                fontWeight: 600
              }}
            >
              <AreaChart data={data}>
                <Area 
                  type="monotone" 
                  dataKey="price" 
                  stroke={primaryColor} 
                  fill={primaryColor} 
                  fillOpacity={0.1}
                  strokeWidth={1}
                />
              </AreaChart>
            </Brush>
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-between items-center px-2 mt-4 text-[10px] text-pink-400 font-bold tracking-[0.3em] uppercase relative z-10">
        <span className="opacity-80">{new Date(data[0].date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
        <span className="opacity-40 italic font-light lowercase tracking-normal">The Flow of Abundance</span>
        <span className="opacity-80">{new Date(data[data.length - 1].date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
      </div>
    </div>
  );
};
