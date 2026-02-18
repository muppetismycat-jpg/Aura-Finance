
import React from 'react';
import { StockData } from './types';

export const COLORS = {
  primary: '#fb7185', // Peony Pink
  secondary: '#fff1f2', // Softest Blush
  accent: '#fff5f7', // Rose Quartz Background
  background: '#fffafb', 
  text: '#1a1617',
  muted: '#881337',
  success: '#fb7185',
  warning: '#fda4af',
  danger: '#881337',
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
      price: 180 + Math.random() * 15
    })),
    news: [
      "Apple's ecosystem sees record engagement in Rose-tinted accessories.",
      "Mindful hardware cycles drive long-term sustainability.",
      "Market sentiment turns increasingly rosy for the tech giant."
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
      price: 750 + Math.random() * 150
    })),
    news: [
      "AI energy levels continue to peak, creating a vibrant market aura.",
      "Strategic alignment with deep-learning flows suggests resilience.",
      "The frequency of high-performance computing remains luminous."
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
      price: 400 + Math.random() * 25
    })),
    news: [
      "Cloud horizons expand with a soft, steady momentum.",
      "Intuitive integration of AI features enhances the user soul.",
      "Abundance flows through diversified revenue streams."
    ]
  }
};
