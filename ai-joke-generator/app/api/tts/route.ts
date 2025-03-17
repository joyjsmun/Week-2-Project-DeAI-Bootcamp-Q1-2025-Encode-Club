import { NextResponse } from 'next/server';
import { Voice } from 'elevenlabs-node';

export async function POST(req: Request) {
    try {
        const { text } = await req.json();
        
        if (!process.env.ELEVENLABS_API_KEY) {
            throw new Error('ELEVENLABS_API_KEY is not set');
        }

        const voice = new Voice({
            apiKey: process.env.ELEVENLABS_API_KEY,
            voiceId: 'EXAVITQu4vr4xnSDxMaL', // Josh voice
        });

        const audioBuffer = await voice.textToSpeech(text);
        
        return new NextResponse(audioBuffer, {
            headers: {
                'Content-Type': 'audio/mpeg',
                'Content-Length': audioBuffer.length.toString(),
            },
        });
    } catch (error: any) {
        console.error('Text-to-speech error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to generate speech' },
            { status: 500 }
        );
    }
} 