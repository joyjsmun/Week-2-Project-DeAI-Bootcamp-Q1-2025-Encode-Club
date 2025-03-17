<<<<<<< HEAD
import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';
=======
import {openai} from '@ai-sdk/openai';
import {generateText} from 'ai';
import {CHAT_ACTIONS, TEMPERATURE} from "@/app/constants/chat";
>>>>>>> 22c9aa4b466c36e7f059103f92b93b60c0d4280e

export const maxDuration = 30;
const modelName: string = 'gpt-4o-mini';

export async function POST(req: Request) {
<<<<<<< HEAD
    const { messages, type, action, temperature } = await req.json();

    if (action === "generate") {
        const result = await generateText({
            model: openai(modelName),
            temperature: temperature || 1,
=======
    const {messages, type, action, temperature} = await req.json();

    if (action === CHAT_ACTIONS.GENERATE) {
        const result = await generateText({
            model: openai(modelName),
            temperature: temperature || TEMPERATURE.DEFAULT,
>>>>>>> 22c9aa4b466c36e7f059103f92b93b60c0d4280e
            messages: [
                {
                    role: "system",
                    content: `You are a comedy writer specializing in ${type} jokes. Write a joke that is both humorous and appropriate.`,
                },
                ...messages,
            ],
        });

<<<<<<< HEAD
        return new Response(JSON.stringify({ result: result.text }), {
            headers: { 'Content-Type': 'application/json' },
        });
    }

    if (action === "evaluate") {
        const result = await generateText({
            model: openai(modelName),
            temperature: 0.7,
=======
        return new Response(JSON.stringify({result: result.text}), {
            headers: {'Content-Type': 'application/json'},
        });
    }

    if (action === CHAT_ACTIONS.EVALUATE) {
        const result = await generateText({
            model: openai(modelName),
            temperature: TEMPERATURE.DEFAULT,
>>>>>>> 22c9aa4b466c36e7f059103f92b93b60c0d4280e
            messages: [
                {
                    role: "system",
                    content: "You are a comedy evaluator. Evaluate the following joke and provide ratings.",
                },
                {
                    role: "user",
                    content: `Please evaluate this joke and provide:
<<<<<<< HEAD
                    1. Humor rating (1-10). Example Humor Rating: {humorRating}/10 😄
                    2. Appropriateness assessment Example Appropriateness: {appropriateness} ✅
                    3. Potential offensiveness check. Example Offensiveness: {offensiveness} ⚠️
                    4. Originality score. Example Originality: {originality} 🌟
                    Joke: ${messages[0].content}
                    
                    Make the response simple and concise and format with multiple line breaks for readability
                    `,
=======
          1. Humor rating (1-10). Example Humor Rating: {humorRating}/10 😄
          2. Appropriateness assessment Example Appropriateness: {appropriateness} ✅
          3. Potential offensiveness check. Example Offensiveness: {offensiveness} ⚠️
          4. Originality score. Example Originality: {originality} 🌟
          Joke: ${messages[0].content}
          
          Make the response simple and concise and format with multiple line using enter for readability
          `,
>>>>>>> 22c9aa4b466c36e7f059103f92b93b60c0d4280e
                },
            ],
        });

<<<<<<< HEAD
        return new Response(JSON.stringify({ result: result.text }), {
            headers: { 'Content-Type': 'application/json' },
=======
        return new Response(JSON.stringify({result: result.text}), {
            headers: {'Content-Type': 'application/json'},
>>>>>>> 22c9aa4b466c36e7f059103f92b93b60c0d4280e
        });
    }
}
