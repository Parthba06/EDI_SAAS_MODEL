import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function generateAIHashtags(prompt: string): Promise<string[]> {
  try {
    console.log("Calling Gemini Flash 2.0 with:", prompt);

    // ⭐ Correct model for your API key
    const model = genAI.getGenerativeModel({
      model: "models/gemini-2.0-flash"
    });

    const result = await model.generateContent(`
      Generate 20 high-quality, SEO-optimized Instagram hashtags for:
      "${prompt}"

      Rules:
      - Only return hashtags
      - No sentences
      - No numbering
      - Comma separated
    `);

    const text = result.response.text();

    const hashtags = text
      .replace(/\n/g, " ")
      .split(/[ ,#]+/)
      .filter(Boolean)
      .map(tag => "#" + tag.toLowerCase());

    return hashtags.slice(0, 20);
  } catch (error) {
    console.error("Gemini hashtag error:", error);
    return [];
  }
}
