import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateResponse(prompt, systemInstruction = "") {
  // Probamos con gemini-2.0-flash que es la versión recomendada del nuevo SDK
  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash', 
    contents: prompt,
    config: {
      systemInstruction: systemInstruction,
      temperature: 0.7,
    }
  });

  return response.text;
}