
export const MOCK_STOCKS = {
  'AAPL': {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 189.43,
    change: 1.25,
    changePercent: 0.66,
    marketCap: '2.92T',
    volume: '52.4M',
    indicators: { rsi: 58, volatility: 'Low' },
    history: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      price: 180 + Math.random() * 15
    })),
    news: ["Ecosystem growth remains robust.", "Market sentiment turns increasingly rosy."]
  },
  'NVDA': {
    symbol: 'NVDA',
    name: 'NVIDIA Corp.',
    price: 875.28,
    change: -12.45,
    changePercent: -1.40,
    marketCap: '2.16T',
    volume: '44.2M',
    indicators: { rsi: 72, volatility: 'High' },
    history: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      price: 750 + Math.random() * 150
    })),
    news: ["AI demand peak continues.", "Market aura remains luminous."]
  }
};
