
export interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  marketCap: string;
  volume: string;
  range52w: { low: number; high: number };
  indicators: {
    rsi: number;
    macd: { value: number; signal: number; histogram: number };
    ma50: number;
    ma200: number;
    volatility: string;
  };
  history: { date: string; price: number }[];
  news: string[];
}

export type AuraTone = 'Luminous' | 'Airy' | 'Grounding';

export interface AIAnalysis {
  guidance: string;
  sentiment: 'Constructive' | 'Mixed' | 'Cautious';
  auraTone: AuraTone;
  mindfulness: string[];
  explanation: string;
}

export enum SignalType {
  BUY = 'Accumulate',
  HOLD = 'Observe',
  SELL = 'Protect'
}
