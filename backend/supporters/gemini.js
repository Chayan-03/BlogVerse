import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();
const api_key_gemini = process.env.GEMINI_API_KEY
const ai = new GoogleGenAI({apiKey: api_key_gemini});
export async function analyzeSentiment(text) {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-1.5-flash",
            contents: [
                {
                    role: "user",
                    parts: [
                        {
                            text: `Analyze the sentiment of the following blog post and reply with only one word: Positive, Neutral, or Negative.\n\n"${text}"`
                        }
                    ]
                }
            ]
        });

        const sentiment = response.candidates[0]?.content?.parts[0]?.text?.trim();
        console.log("Sentiment from Gemini:", sentiment);
        if (['Positive', 'Neutral', 'Negative'].includes(sentiment)) {
            return sentiment;
        }
        return 'Neutral';
    } catch (error) {
        console.error("Error analyzing sentiment with Gemini:", error);
        return 'Neutral';
    }
}

export async function analyzeCategory(content) {
    const prompt = `Analyze the following blog content and assign it to one of these categories: AI, Tech, Blockchain, Web Dev, Programming, Life, Nature, Exploration, General. Respond with only the category name. Content: "${content}"`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-1.5-flash",
            contents: [
                {
                    role: "user",
                    parts: [
                        {
                            text: prompt
                        }
                    ]
                }
            ]
        });

        const category = response.candidates[0]?.content?.parts[0]?.text?.trim();
        console.log("Category from Gemini:", category);
      const allowedCategories = ['AI', 'Tech', 'Blockchain', 'Web Dev', 'Programming', 'Life', 'Nature', 'Exploration','General','Finance','Politics','World','Trade','Religion'];
        if (allowedCategories.includes(category)) {
            return category;
        }
        return 'General';

    } catch (error) {
        console.error("Error analyzing category with Gemini:", error);
        return 'General';
    }
}




