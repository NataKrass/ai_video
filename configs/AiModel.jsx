// To run this code you need to install the following dependencies:
// npm install @google/genai

import { GoogleGenAI } from "@google/genai";

/**
 * Sends a multi-turn conversation to the Gemini API with a new follow-up prompt.
 * This function is now exported to be used in other files.
 * @param {string} newPrompt - The new prompt to add to the conversation.
 * @returns {Promise<string>} The text response from the AI.
 */
export async function generateScripts(newPrompt) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY environment variable not set.");
    }

    const ai = new GoogleGenAI(process.env.GEMINI_API_KEY);

    // The full conversation history
    const contents = [
      {
        role: "user",
        parts: [{ text: "Write two short kids stories in JSON format." }],
      },
      {
        role: "model",
        parts: [
          {
            text: `{ "scripts": [ { "content": "Leo the lion couldn't roar..." }, { "content": "Tilly the turtle loved to paint..." } ] }`,
          },
        ],
      },
      {
        role: "user",
        parts: [{ text: newPrompt }], // The new prompt is passed in as an argument
      },
    ];

    const model = ai.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent({ contents });
    const response = await result.response;
    
    return response.text(); // Return the result instead of logging it

  } catch (error) {
    // Log the error and re-throw it so the calling function knows something went wrong
    console.error("An error occurred in generateScript:", error.message);
    throw error;
  }
}