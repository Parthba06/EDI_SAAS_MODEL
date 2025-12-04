import axios from "axios";

const API_KEY = "2df1f461-daea-4081-b63d-d832dbe6a2c8";

export async function generateHashtags(prompt: string): Promise<string[]> {
  try {
    console.log("Sending API Request to APIVerve...");

    const response = await axios.post(
      "https://api.apiverve.com/v1/hashtaggenerator",
      { text: prompt }, // correct body
      {
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": API_KEY,
        },
      }
    );

    console.log("FULL RAW RESPONSE:", response.data);

    // 🔥 Correct extraction path
    const hashtags = response.data?.data?.hashtags;

    console.log("EXTRACTED HASHTAGS:", hashtags);

    if (!hashtags) return [];

    // If API already sends an array → return it
    if (Array.isArray(hashtags)) return hashtags.map((tag) =>
      tag.startsWith("#") ? tag : `#${tag}`
    );

    // If API sends a string → split it
    if (typeof hashtags === "string") {
      return hashtags
        .split(/[,#\n]/)
        .map((s: string) => s.trim())
        .filter(Boolean)
        .map((tag) => (tag.startsWith("#") ? tag : "#" + tag));
    }

    return [];
  } catch (error: any) {
    console.error("AXIOS ERROR FULL:", error?.response?.data || error.message);
    return [];
  }
}
