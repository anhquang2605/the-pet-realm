import {openai} from '../../../libs/openai';
import { NextResponse } from 'next/server'; 
export async function POST(request: Request) {
    const { messages } = await request.json();
    const response = await openai.chat.completions.create({
        model: 'gpt-4',
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