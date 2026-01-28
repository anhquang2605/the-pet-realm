import { NextApiRequest } from 'next';
import {openai} from '../../../libs/openai';
import { NextResponse } from 'next/server'; 
export default async function POST(request: NextApiRequest) {
    if (request.method !== 'POST') {
        return new Response('Method Not Allowed', { status: 405 });
    }
    const { messages } = await request.body;
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
    try {
    const completion = await openai.chat.completions.create({
      model: "google/gemma-3-27b-it",
      messages: [
        {
          role: "user",
          content: messages,
        },
      ],
      temperature: 0.7,
    });

    const response = completion.choices[0].message.content;
    return NextResponse.json(response);
}

/* function encodeText(text: string) {
    return new TextEncoder().encode(text);
} */