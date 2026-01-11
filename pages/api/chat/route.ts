import { NextApiRequest } from 'next';
import {openai} from '../../../libs/openai';
import { NextResponse } from 'next/server'; 
export default async function POST(request: NextApiRequest) {
    if (request.method !== 'POST') {
        return new Response('Method Not Allowed', { status: 405 });
    }
    const { messages } = await request.body;
    const response = await openai.chat.completions.create({
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
    
    return NextResponse.json(response);
}

function encodeText(text: string) {
    return new TextEncoder().encode(text);
}