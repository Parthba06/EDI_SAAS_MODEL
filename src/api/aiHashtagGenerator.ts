import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function generateAIHashtags(prompt: string): Promise<string[]> {
  try {
    console.log("Calling Gemini Flash 2.5 with:", prompt);

    // ⭐ Use the default model supported by 2026 API keys
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash"
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
