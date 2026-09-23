import { NextApiRequest, NextApiResponse  } from 'next';
import { GoogleGenAI } from '@google/genai';
export default async function POST(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return new Response('Method Not Allowed', { status: 405 });
    }
    const { message } = req.body as { message: string };
    if(!message || message.trim().length === 0) {
        return res.json({ error: "Message is required" });
    }
    const systemPrompt = "You are a helpful assistant.";
    try {
        const ai = new GoogleGenAI({
            apiKey: process.env.GEMINI_API_KEY || '',
        });
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: message
        })

        return res.json(response);
    } catch (error) {
      console.error("Error generating completion:", error);
      return res.json({ error: "Error generating completion" });
    }
}
