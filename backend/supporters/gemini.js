// gemini.js
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

//const genAI = new GoogleGenAI(process.env.GEMINI_API);
const ai = new GoogleGenAI({ apiKey: "AIzaSyAdzxVZueL5r7OysnpT8ih265AFp-hMSSQ"});

export async function analyzeSentiment(text) {
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
    return sentiment;
}












// import { GoogleGenAI } from "@google/genai";

// const ai = new GoogleGenAI({ apiKey:"AIzaSyAdzxVZueL5r7OysnpT8ih265AFp-hMSSQ" });

// async function main() {
//   const response = await ai.models.generateContent({
//     model: "gemini-1.5-flash",
//     contents: "Explain how AI works in a few words",
//   });
//   console.log(response.text);
// }

// main();
