
import { GoogleGenAI, Type } from "https://esm.sh/@google/genai@^1.41.0";

export const analyzeStock = async (stock) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
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
