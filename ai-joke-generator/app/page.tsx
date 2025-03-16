"use client";

import { useState } from "react";

type JokeParams = {
    topic: "work" | "animals" | "food";
    tone: "witty" | "sarcastic" | "silly";
    type: "pun" | "knock-knock" | "story";
    temperature: number;
};

export default function Home() {
    const [params, setParams] = useState<JokeParams>({
        topic: "work",
        tone: "witty",
        type: "pun",
        temperature: 1,
    });
    const [loading, setLoading] = useState(false);
    const [joke, setJoke] = useState("");
    const [evaluation, setEvaluation] = useState<any>(null);

    const generateJoke = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'generate',
                    type: params.type,
                    temperature: params.temperature,
                    messages: [
                        {
                            role: 'user',
                            content: `Generate a ${params.tone} ${params.type} joke about ${params.topic}.`,
                        },
                    ],
                }),
            });
            if (!response.ok) throw new Error('Failed to generate joke');

            const data = await response.json();
            setJoke(data.result);
        } catch (error) {
            console.error('Error generating joke:', error);
        } finally {
            setLoading(false);
        }
    };

    const evaluateJoke = async () => {
        if (!joke) return;

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'evaluate',
                    messages: [{ role: 'user', content: joke }],
                }),
            });

            if (!response.ok) throw new Error('Failed to evaluate joke');

            const data = await response.json();
            setEvaluation(data.result);
        } catch (error) {
            console.error('Error evaluating joke:', error);
        }
    };

    return (
        <main className="min-h-screen p-8">
            <h1 className="text-4xl font-bold text-center mb-12">AI Joke Generator</h1>

            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {/* Parameters Column */}
                <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
                    <h2 className="text-2xl font-semibold mb-6">Parameters 🎯</h2>

                    <div className="space-y-6">
                        <div>
                            <h3 className="mb-3">Topic 🎭</h3>
                            <div className="space-x-4">
                                {["work", "animals", "food"].map((topic) => (
                                    <label key={topic} className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name="topic"
                                            value={topic}
                                            checked={params.topic === topic}
                                            onChange={(e) => setParams({...params, topic: e.target.value as JokeParams["topic"]})}
                                            className="mr-2"
                                        />
                                        {topic.charAt(0).toUpperCase() + topic.slice(1)}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="mb-3">Tone 🎭</h3>
                            <div className="space-x-4">
                                {["witty", "sarcastic", "silly"].map((tone) => (
                                    <label key={tone} className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name="tone"
                                            value={tone}
                                            checked={params.tone === tone}
                                            onChange={(e) => setParams({...params, tone: e.target.value as JokeParams["tone"]})}
                                            className="mr-2"
                                        />
                                        {tone.charAt(0).toUpperCase() + tone.slice(1)}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="mb-3">Type 📝</h3>
                            <div className="space-x-4">
                                {["pun", "knock-knock", "story"].map((type) => (
                                    <label key={type} className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name="type"
                                            value={type}
                                            checked={params.type === type}
                                            onChange={(e) => setParams({...params, type: e.target.value as JokeParams["type"]})}
                                            className="mr-2"
                                        />
                                        {type.charAt(0).toUpperCase() + type.slice(1)}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="mb-3">Creativity Level 🎨</h3>
                            <input
                                type="range"
                                min="0"
                                max="2"
                                step="0.1"
                                value={params.temperature}
                                onChange={(e) => setParams({...params, temperature: parseFloat(e.target.value)})}
                                className="w-full"
                            />
                            <div className="text-sm text-gray-400">Temperature: {params.temperature}</div>
                        </div>

                        <button
                            onClick={generateJoke}
                            disabled={loading}
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg disabled:opacity-50"
                        >
                            {loading ? "Generating..." : "Generate Joke 🎯"}
                        </button>
                    </div>
                </div>

                {/* Results Column */}
                <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
                    <h2 className="text-2xl font-semibold mb-6">Result 🎭</h2>

                    <div className="space-y-6">
                        <div className="min-h-32 bg-white/5 p-4 rounded-lg">
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                                </div>
                            ) : (
                                <p className="whitespace-pre-wrap">{joke || "Your joke will appear here..."}</p>
                            )}
                        </div>

                        <button
                            onClick={evaluateJoke}
                            disabled={!joke}
                            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg disabled:opacity-50"
                        >
                            Evaluate Joke 📊
                        </button>

                        {evaluation && (
                            <div className="space-y-2 bg-white/5 p-4 rounded-lg">
                                {evaluation}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
