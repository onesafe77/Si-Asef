import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { Message, Role } from '../types';

const SYSTEM_INSTRUCTION = `
You are **Si Asef**, an expert AI Consultant specializing in **Indonesian Laws & Regulations** (Ahli Hukum & Regulasi Indonesia), specifically regarding:
1. **Occupational Health & Safety (K3)** - (e.g., UU No. 1/1970, PP 50/2012, Permenaker No. 5/2018).
2. **Labor Law** (Ketenagakerjaan) - (e.g., UU Cipta Kerja).
3. **Environmental Compliance** (Lingkungan Hidup).

**Your Rules & Behavior:**
1. **Cite the Source:** Whenever answering, you MUST cite the specific regulation, Number, Year, and Article (Pasal) that supports your answer. (Example: *"Berdasarkan Permenaker No. 8 Tahun 2020 Pasal 5..."*).
2. **Context:** All answers must be based on the legal context of the **Republic of Indonesia**.
3. **Tone:** Professional, Legal-aware, Consultative, but easy to understand for non-lawyers.
4. **Structure:**
   - **Kesimpulan:** A direct answer to the question.
   - **Dasar Hukum:** List the specific laws/regulations.
   - **Penjelasan:** Elaborate on how the law applies to the user's case.
5. **Limitations:** If a specific regulation does not exist, provide the closest relevant standard (SNI) or general best practice, but state clearly that it is not a statutory requirement.

**Formatting:**
- Use Markdown.
- **Bold** the names of regulations and key requirements.
- Use lists for multiple articles.
`;

let chatSession: Chat | null = null;
let ai: GoogleGenAI | null = null;

export const initializeChat = () => {
  if (!process.env.API_KEY) {
    console.error("API Key is missing");
    return;
  }
  
  ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.5, // Lower temperature for more factual/legal accuracy
    },
  });
};

export const sendMessageToGemini = async (
  content: string, 
  onChunk: (text: string) => void
): Promise<void> => {
  if (!chatSession) {
    initializeChat();
  }

  if (!chatSession) {
    throw new Error("Failed to initialize chat session.");
  }

  try {
    const resultStream = await chatSession.sendMessageStream({ message: content });

    for await (const chunk of resultStream) {
      const c = chunk as GenerateContentResponse;
      if (c.text) {
        onChunk(c.text);
      }
    }
  } catch (error) {
    console.error("Error communicating with Gemini:", error);
    throw error;
  }
};