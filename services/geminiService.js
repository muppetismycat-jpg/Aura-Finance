
import { GoogleGenAI, Type } from "@google/genai";

export const analyzeStock = async (stock) => {
  // Safe access to process.env for browser environments where it might be shimmed on window
  const apiKey = (window.process && window.process.env && window.process.env.API_KEY) || '';
  const ai = new GoogleGenAI({ apiKey });
  
  const prompt = `Mindfully evaluate ${stock.name} (${stock.symbol}). Tone: Calm, Pink, Elegant.`;

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
            mindfulness: { type: Type.ARRAY, items: { type: Type.STRING } },
            explanation: { type: Type.STRING }
          },
          required: ["guidance", "sentiment", "auraTone", "mindfulness", "explanation"]
        }
      }
    });
    return JSON.parse(response.text || '{}');
  } catch (error) {
    return {
      guidance: "The market is breathing quietly today. Observe the flow.",
      sentiment: "Mixed",
      auraTone: "Airy",
      mindfulness: ["Quiet movements", "Balanced breath", "Patient waiting"],
      explanation: "A moment of stillness in the technical indicators."
    };
  }
};
