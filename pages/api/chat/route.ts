import { NextApiRequest, NextApiResponse  } from 'next';
import {openai} from '../../../libs/openai';
export default async function POST(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return new Response('Method Not Allowed', { status: 405 });
    }
    const { message } = req.body as { message: string };
   /*  const response = await openai.chat.completions.create({
        model: 'gpt-5',
        messages: messages,
        stream: true,
    });
    const stream = new ReadableStream({
        async start(controller) {
            for await (const chunk of response) {
                controller.enqueue(encodeText(
                    chunk.choices[0].delta?.content || ''
                ))
            }
            controller.close();
        }
    });
            const encoder = new TextEncoder();
     */
    if(!message || message.trim().length === 0) {
        return res.json({ error: "Message is required" });
    }
    const systemPrompt = "You are a helpful assistant.";
    try {
        console.log("Generating completion for message:", message);
    const completion = await openai.chat.completions.create({
      model: "google/gemma-3-4b-it",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: message,
        },
      ],
      temperature: 0.7,
    });
        const response = completion.choices[0].message.content;
        return res.json(response);
    } catch (error) {
      console.error("Error generating completion:", error);
      return res.json({ error: "Error generating completion" });
    }
}

/* function encodeText(text: string) {
    return new TextEncoder().encode(text);
} */