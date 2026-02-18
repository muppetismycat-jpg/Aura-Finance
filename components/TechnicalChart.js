
import React from 'https://esm.sh/react@^19.2.4';
import htm from 'https://esm.sh/htm';
import * as Recharts from 'https://esm.sh/recharts@^3.7.0';

const html = htm.bind(React.createElement);

export const TechnicalChart = ({ data, auraTone = 'Airy' }) => {
  const primaryColor = auraTone === 'Luminous' ? '#fb7185' : '#881337';

  return html`
    <div className="h-[400px] w-full relative">
      <${Recharts.ResponsiveContainer} width="100%" height="100%">
        <${Recharts.AreaChart} data=${data}>
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor=${primaryColor} stopOpacity=${0.4}/>
              <stop offset="95%" stopColor=${primaryColor} stopOpacity=${0}/>
            </linearGradient>
          </defs>
          <${Recharts.CartesianGrid} vertical=${false} stroke="#fb718522" strokeDasharray="6 6" />
          <${Recharts.XAxis} dataKey="date" hide />
          <${Recharts.YAxis} orientation="right" axisLine=${false} tickLine=${false} tick=${{ fill: primaryColor, fontSize: 10 }} />
          <${Recharts.Tooltip} />
          <${Recharts.Area} 
            type="monotone" 
            dataKey="price" 
            stroke=${primaryColor} 
            strokeWidth=${5} 
            fill="url(#colorPrice)" 
          />
        <//>
      <//>
    </div>
  `;
};
