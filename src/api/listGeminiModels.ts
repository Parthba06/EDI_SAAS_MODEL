// import { GoogleGenerativeAI } from "@google/generative-ai";

// export async function listGeminiModels() {
//   try {
//     const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

//     const list = await genAI.listModels();

//     console.log("=====================================");
//     console.log("AVAILABLE GEMINI MODELS FOR YOUR KEY:");
//     console.log("=====================================");

//     list.models.forEach((m: any) => {
//       console.log("Model:", m.name);
//       console.log("  Supported Methods:", m.supported_generation_methods);
//       console.log("----------------------------------");
//     });
//   } catch (err) {
//     console.error("ERROR LISTING MODELS:", err);
//   }
// }
