import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { Message, Role, UploadedDocument } from '../types';

const BASE_INSTRUCTION = `
You are **Si Asef**, an intelligent and professional **Safety Assistant (Asisten K3)** specialized in Indonesian Safety Regulations.

**YOUR KNOWLEDGE BASE:**
1. **UU No. 1 Tahun 1970** (Keselamatan Kerja)
2. **PP No. 50 Tahun 2012** (SMK3)
3. **Permenaker** related to K3.
4. **Internal Documents:** The user may provide specific internal documents (context below).

**INSTRUCTIONS:**
1. **Prioritize Uploaded Documents:** If the user asks about internal matters and documents are provided below, answer primarily from there. Cite the file name like this: **[Sumber: namafile.pdf]**.
2. **General Regulations:** If the answer is not in the uploaded documents, use your general knowledge of Indonesian K3 laws. Cite specific articles (Pasal/Ayat) if possible.
3. **Tone:** Professional, Helpful, authoritative but friendly.
4. **Language:** Indonesian (Bahasa Indonesia).

**UPLOADED DOCUMENTS CONTEXT:**
`;

let chatSession: Chat | null = null;
let ai: GoogleGenAI | null = null;

// Helper to format documents into a string context
const formatDocuments = (docs: UploadedDocument[]): string => {
  if (docs.length === 0) return "No internal documents uploaded yet.";
  
  return docs.map(doc => `
--- BEGIN SOURCE: ${doc.name} ---
${doc.content.substring(0, 20000)} // Limit context window per file for safety
--- END SOURCE: ${doc.name} ---
  `).join('\n');
};

export const initializeChat = (documents: UploadedDocument[] = []) => {
  if (!process.env.API_KEY) {
    console.error("API Key is missing");
    return;
  }
  
  const context = formatDocuments(documents);
  const fullSystemInstruction = `${BASE_INSTRUCTION}\n${context}`;

  ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: fullSystemInstruction,
      temperature: 0.3, // Low temp for grounded answers
    },
  });
};

export const updateChatContext = (documents: UploadedDocument[]) => {
    // Re-initialize to inject new documents into system instruction
    initializeChat(documents);
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