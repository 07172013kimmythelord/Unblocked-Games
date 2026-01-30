
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";
import { GAMES_DATA } from "../constants";

export const getGameRecommendation = async (userMessage: string, chatHistory: ChatMessage[]): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    const gameListString = GAMES_DATA.length > 0 
      ? GAMES_DATA.map(g => `${g.title} (${g.category}): ${g.description}`).join('\n')
      : "Our library is currently updating with new titles!";
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        { 
          role: 'user', 
          parts: [{ 
            text: `You are Nova, an AI gaming assistant for NovaArcade. 
            Here is our library of games:
            ${gameListString}
            
            The user says: "${userMessage}"
            
            Based on the library above, recommend 1-2 games that fit their request. 
            If the library is empty, tell them to check back soon as we are adding 100+ titles!
            Be concise, friendly, and enthusiastic. Use bold text for game titles.` 
          }] 
        }
      ],
      config: {
        temperature: 0.7,
        maxOutputTokens: 250,
      }
    });

    return response.text || "I'm having trouble thinking of a game right now. Try checking out our Action section!";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The gaming crystals are cloudy. Why not try one of our featured games while I reboot?";
  }
};
