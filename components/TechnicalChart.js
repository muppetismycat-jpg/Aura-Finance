
import React from 'react';
import htm from 'htm';
import * as Recharts from 'recharts';

const html = htm.bind(React.createElement);

export const TechnicalChart = ({ data, auraTone = 'Airy' }) => {
  const isLuminous = auraTone === 'Luminous';
  const primaryColor = isLuminous ? '#fb7185' : auraTone === 'Grounding' ? '#e11d48' : '#fda4af';

  if (!data || data.length === 0) {
    return html`<div className="h-[400px] w-full flex items-center justify-center text-pink-300 text-xs tracking-widest uppercase">Preparing Visuals...</div>`;
  }

  return html`
    <div className="w-full relative overflow-hidden" style=${{ height: '400px' }}>
      <${Recharts.ResponsiveContainer} width="99%" height="100%">
        <${Recharts.AreaChart} data=${data} margin=${{ top: 20, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor=${primaryColor} stopOpacity=${0.5}/>
              <stop offset="95%" stopColor=${primaryColor} stopOpacity=${0}/>
            </linearGradient>
          </defs>
          <${Recharts.CartesianGrid} vertical=${false} stroke="#fb718515" strokeDasharray="8 8" />
          <${Recharts.XAxis} dataKey="date" hide />
          <${Recharts.YAxis} 
            orientation="right" 
            axisLine=${false} 
            tickLine=${false} 
            domain=${['auto', 'auto']}
            tick=${{ fill: primaryColor, fontSize: 11, fontWeight: 700 }} 
          />
          <${Recharts.Tooltip} 
             contentStyle=${{ 
               borderRadius: '24px', 
               border: 'none', 
               backgroundColor: 'rgba(255, 255, 255, 0.95)', 
               boxShadow: '0 20px 40px -10px rgba(251, 113, 133, 0.2)',
               backdropFilter: 'blur(20px)',
               fontSize: '12px',
               fontWeight: '700'
             }} 
          />
          <${Recharts.Area} 
            type="monotone" 
            dataKey="price" 
            stroke=${primaryColor} 
            strokeWidth=${6} 
            fill="url(#colorPrice)" 
            animationDuration=${2500}
            activeDot=${{ r: 10, fill: primaryColor, stroke: '#fff', strokeWidth: 4, className: 'drop-shadow-lg' }}
          />
        <//>
      <//>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-12 text-[9px] font-black uppercase tracking-[0.4em] text-pink-300 opacity-60 pointer-events-none">
        <span>Cycle Open</span>
        <div className="w-1.5 h-1.5 rounded-full bg-pink-100"></div>
        <span>Cycle Maturity</span>
      </div>
    </div>
  `;
};
