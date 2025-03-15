import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai("gpt-4o"),
    messages: [
      {
        role: "system",
        content: `You are a comedy writer specializing in jokes. Write a joke about the user's selected topic that is both humorous and appropriate.`,
      },
      ...messages,
    ],
  });

  return result.toDataStreamResponse();
}
