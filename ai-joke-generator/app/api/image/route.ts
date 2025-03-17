import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
    try {
        const { prompt } = await req.json();

        if (!process.env.OPENAI_API_KEY) {
            throw new Error('OPENAI_API_KEY is not set');
        }

        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt: `Create a funny, cartoon-style illustration for this joke: ${prompt}. Make it family-friendly and humorous.`,
            n: 1,
            size: "1024x1024",
            quality: "standard",
            style: "vivid",
        });

        return NextResponse.json({ imageUrl: response.data[0].url });
    } catch (error: any) {
        console.error('Image generation error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to generate image' },
            { status: 500 }
        );
    }
} 