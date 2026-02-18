
import { GoogleGenAI, Type } from "@google/genai";
import { StockData, AIAnalysis } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const analyzeStock = async (stock: StockData): Promise<AIAnalysis> => {
  const prompt = `
    As a mindful financial analyst, evaluate the following stock data. 
    Use a calm, elegant, and supportive tone (avoid aggressive finance tropes like "crush" or "explode").
    
    STOCK: ${stock.name} (${stock.symbol})
    PRICE: $${stock.price} (${stock.changePercent}%)
    RSI: ${stock.indicators.rsi}
    MACD Histogram: ${stock.indicators.macd.histogram}
    VOLATILITY: ${stock.indicators.volatility}
    MA50 vs MA200: ${stock.indicators.ma50 > stock.indicators.ma200 ? 'Bullish crossover' : 'Bearish crossover'}
    NEWS: ${stock.news.join(', ')}

    Return a JSON response following this structure:
    {
      "guidance": "A warm, human-centered summary of the current stance (Buy, Hold, or Sell logic but phrased gently).",
      "sentiment": "Constructive", "Mixed", or "Cautious",
      "auraTone": "Luminous" (for Buy-leaning/Constructive), "Airy" (for Hold/Neutral), or "Grounding" (for Sell-leaning/Cautious),
      "mindfulness": ["3 bullet points of what to be mindful of, phrased with care"],
      "explanation": "A gentle explanation of the technical indicators (RSI/MACD) in plain language."
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            guidance: { type: Type.STRING },
            sentiment: { type: Type.STRING },
            auraTone: { type: Type.STRING },
            mindfulness: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            explanation: { type: Type.STRING }
          },
          required: ["guidance", "sentiment", "auraTone", "mindfulness", "explanation"]
        }
      }
    });

    const parsed = JSON.parse(response.text || '{}');
    return parsed as AIAnalysis;
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return {
      guidance: "We're currently observing some quiet market movements. It may be wise to wait for more clarity.",
      sentiment: "Mixed",
      auraTone: "Airy",
      mindfulness: ["Market noise", "Indicator lag", "Economic sentiment"],
      explanation: "Analysis is temporarily unavailable, but we encourage observing the overall trend."
    };
  }
};
