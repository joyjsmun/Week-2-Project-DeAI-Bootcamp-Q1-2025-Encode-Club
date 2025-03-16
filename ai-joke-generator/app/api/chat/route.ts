import { openai } from '@ai-sdk/openai';
import {generateText} from 'ai';

export const maxDuration = 30;
const modelName: string = 'gpt-4o-mini';

export async function POST(req: Request) {
  const { messages, type, action, temperature } = await req.json();

  if (action === "generate") {
    const result = await generateText({
      model: openai(modelName),
      temperature: temperature || 1,
      messages: [
        {
          role: "system",
          content: `You are a comedy writer specializing in ${type} jokes. Write a joke that is both humorous and appropriate.`,
        },
        ...messages,
      ],
    });

    return new Response(JSON.stringify({ result: result.text }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (action === "evaluate") {
    const result = await generateText({
      model: openai(modelName),
      temperature: 0.7,
      messages: [
        {
          role: "system",
          content: "You are a comedy evaluator. Evaluate the following joke and provide ratings.",
        },
        {
          role: "user",
          content: `Please evaluate this joke and provide:
          1. Humor rating (1-10). Example Humor Rating: {humorRating}/10 😄
          2. Appropriateness assessment Example Appropriateness: {appropriateness} ✅
          3. Potential offensiveness check. Example Offensiveness: {offensiveness} ⚠️
          4. Originality score. Example Originality: {originality} 🌟
          Joke: ${messages[0].content}
          
          Make the response simple and concise and format with multiple line breaks for readability
          `,
        },
      ],
    });

    return new Response(JSON.stringify({ result: result.text }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
