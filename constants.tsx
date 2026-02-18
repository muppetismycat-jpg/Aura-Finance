
import React from 'react';
import { StockData } from './types';

export const COLORS = {
  primary: '#d68d9a', // Dusty Rose
  secondary: '#f4dada', // Blush
  accent: '#fce4ec', // Rose Quartz
  background: '#fffafb', // Soft pink hint
  text: '#1c1917',
  muted: '#78716c',
  success: '#d68d9a',
  warning: '#e9b7b7',
  danger: '#704c5e',
};

export const MOCK_STOCKS: Record<string, StockData> = {
  'AAPL': {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 189.43,
    change: 1.25,
    changePercent: 0.66,
    marketCap: '2.92T',
    volume: '52.4M',
    range52w: { low: 164.08, high: 199.62 },
    indicators: {
      rsi: 58,
      macd: { value: 1.2, signal: 0.8, histogram: 0.4 },
      ma50: 182.10,
      ma200: 178.45,
      volatility: 'Low'
    },
    history: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      price: 175 + Math.random() * 20
    })),
    news: [
      "Apple expands service offerings in emerging markets.",
      "Regulatory scrutiny increases over App Store policies.",
      "Analysts remain optimistic about upcoming hardware cycle."
    ]
  },
  'NVDA': {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    price: 875.28,
    change: -12.45,
    changePercent: -1.40,
    marketCap: '2.16T',
    volume: '44.2M',
    range52w: { low: 234.12, high: 974.00 },
    indicators: {
      rsi: 72,
      macd: { value: 45.2, signal: 48.1, histogram: -2.9 },
      ma50: 780.20,
      ma200: 550.15,
      volatility: 'High'
    },
    history: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      price: 700 + Math.random() * 200
    })),
    news: [
      "New AI chip architecture expected to dominate data centers.",
      "Short-term pull back seen as healthy after massive rally.",
      "Supply chain efficiencies improving across the globe."
    ]
  },
  'MSFT': {
    symbol: 'MSFT',
    name: 'Microsoft Corp.',
    price: 415.52,
    change: 2.10,
    changePercent: 0.51,
    marketCap: '3.09T',
    volume: '22.1M',
    range52w: { low: 275.46, high: 430.82 },
    indicators: {
      rsi: 52,
      macd: { value: 2.1, signal: 1.9, histogram: 0.2 },
      ma50: 405.10,
      ma200: 385.45,
      volatility: 'Moderate'
    },
    history: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      price: 390 + Math.random() * 30
    })),
    news: [
      "Cloud growth stabilizes with consistent enterprise adoption.",
      "Integration of Copilot across Office 365 yields productivity gains.",
      "Dividend increase announced for long-term shareholders."
    ]
  }
};
