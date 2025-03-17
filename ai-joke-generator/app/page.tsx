"use client";

<<<<<<< HEAD
import { useState, useRef } from "react";
import { FaPlay, FaPause, FaStop, FaShare, FaRobot, FaMicrophone, FaImage, FaStar, FaTwitter, FaFacebook } from "react-icons/fa";
import { TwitterShareButton, FacebookShareButton } from "react-share";
import { useJokeStore } from "./store/jokeStore";

type JokeParams = {
    topic: "work" | "animals" | "food" | "television" | "sports";
    tone: "witty" | "sarcastic" | "silly" | "dark" | "goofy";
    type: "pun" | "knock-knock" | "story" | "one-liner";
    temperature: number;
};
=======
import {useState} from "react";
import {CHAT_ACTIONS, JokeParams, TEMPERATURE, TONES, TOPICS, TYPES} from "@/app/constants/chat";
>>>>>>> 22c9aa4b466c36e7f059103f92b93b60c0d4280e

export default function Home() {
    const [params, setParams] = useState<JokeParams>({
        topic: TOPICS[0],
        tone: TONES[0],
        type: TYPES[0],
        temperature: TEMPERATURE.DEFAULT,
    });
    const [loading, setLoading] = useState(false);
    const [joke, setJoke] = useState("");
    const [evaluation, setEvaluation] = useState<string>("");
<<<<<<< HEAD
    const [imageUrl, setImageUrl] = useState<string>("");
    const [audioUrl, setAudioUrl] = useState<string>("");
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const { jokes, addJoke } = useJokeStore();
=======
    const [evaluating, setEvaluating] = useState(false);
>>>>>>> 22c9aa4b466c36e7f059103f92b93b60c0d4280e

    const generateJoke = async () => {
        
        setLoading(true);
        setEvaluation("");
        setEvaluating(true);

        try {
            // Generate joke
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: CHAT_ACTIONS.GENERATE,
                    type: params.type,
                    temperature: params.temperature,
                    messages: [{
                        role: 'user',
                        content: `Generate a ${params.tone} ${params.type} joke about ${params.topic}.`,
                    }],
                }),
            });
            if (!response.ok) throw new Error('Failed to generate joke');
            const jokeData = await response.json();
            setJoke(jokeData.result);

            // Generate image
            const imageResponse = await fetch('/api/image', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: jokeData.result }),
            });
            if (imageResponse.ok) {
                const imageData = await imageResponse.json();
                setImageUrl(imageData.imageUrl);
            }

            // Generate audio
            const audioResponse = await fetch('/api/tts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: jokeData.result }),
            });
            if (audioResponse.ok) {
                const audioBlob = await audioResponse.blob();
                const url = URL.createObjectURL(audioBlob);
                setAudioUrl(url);
            }

            // Save to history
            addJoke({
                text: jokeData.result,
                topic: params.topic,
                tone: params.tone,
                type: params.type,
                imageUrl: imageUrl,
                evaluation: evaluation,
            });

        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
            setEvaluating(false);
        }
    };

    const evaluateJoke = async () => {
        if (!joke) return;

        setEvaluating(true);
        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: CHAT_ACTIONS.EVALUATE,
                    messages: [{role: 'user', content: joke}],
                }),
            });

            if (!response.ok) throw new Error('Failed to evaluate joke');
            const data = await response.json();
            setEvaluation(data.result);
        } catch (error) {
            console.error('Error evaluating joke:', error);
        } finally {
            setEvaluating(false);
        }
    };

    const handlePlayPause = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleStop = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            setIsPlaying(false);
        }
    };

    return (
        <main className="min-h-screen p-8 relative overflow-hidden">
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
            </div>

            <div className="relative z-10">
                <h1 className="text-5xl font-bold text-center mb-12 text-glow">AI Joke Generator</h1>

<<<<<<< HEAD
                <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {/* Parameters Column */}
                    <div className="glass-effect rounded-2xl p-8 neon-border">
                        <h2 className="text-2xl font-semibold mb-8 flex items-center gap-3">
                            <FaRobot className="text-[var(--neon-blue)]" />
                            <span>Parameters</span>
                        </h2>

                        <div className="space-y-8">
                            <div>
                                <h3 className="mb-4 text-lg font-medium text-[var(--neon-blue)]">Topic</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {["work", "animals", "food", "television", "sports"].map((topic) => (
                                        <label key={topic} className="inline-flex items-center space-x-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="topic"
                                                value={topic}
                                                checked={params.topic === topic}
                                                onChange={(e) => setParams({...params, topic: e.target.value as JokeParams["topic"]})}
                                                className="hidden"
                                            />
                                            <div className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                                                params.topic === topic 
                                                ? 'bg-[var(--neon-blue)] text-black neon-border' 
                                                : 'bg-white/5 hover:bg-white/10'
                                            }`}>
                                                {topic.charAt(0).toUpperCase() + topic.slice(1)}
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="mb-4 text-lg font-medium text-[var(--neon-blue)]">Tone</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {["witty", "sarcastic", "silly", "dark", "goofy"].map((tone) => (
                                        <label key={tone} className="inline-flex items-center space-x-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="tone"
                                                value={tone}
                                                checked={params.tone === tone}
                                                onChange={(e) => setParams({...params, tone: e.target.value as JokeParams["tone"]})}
                                                className="hidden"
                                            />
                                            <div className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                                                params.tone === tone 
                                                ? 'bg-[var(--neon-blue)] text-black neon-border' 
                                                : 'bg-white/5 hover:bg-white/10'
                                            }`}>
                                                {tone.charAt(0).toUpperCase() + tone.slice(1)}
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="mb-4 text-lg font-medium text-[var(--neon-blue)]">Type</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {["pun", "knock-knock", "story", "one-liner"].map((type) => (
                                        <label key={type} className="inline-flex items-center space-x-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="type"
                                                value={type}
                                                checked={params.type === type}
                                                onChange={(e) => setParams({...params, type: e.target.value as JokeParams["type"]})}
                                                className="hidden"
                                            />
                                            <div className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                                                params.type === type 
                                                ? 'bg-[var(--neon-blue)] text-black neon-border' 
                                                : 'bg-white/5 hover:bg-white/10'
                                            }`}>
                                                {type.charAt(0).toUpperCase() + type.slice(1)}
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="mb-4 text-lg font-medium text-[var(--neon-blue)]">Creativity Level</h3>
                                <input
                                    type="range"
                                    min="0"
                                    max="2"
                                    step="0.1"
                                    value={params.temperature}
                                    onChange={(e) => setParams({...params, temperature: parseFloat(e.target.value)})}
                                    className="w-full accent-[var(--neon-blue)]"
                                />
                                <div className="text-sm text-[var(--neon-blue)]">Temperature: {params.temperature}</div>
                            </div>

                            <button
                                onClick={generateJoke}
                                disabled={loading}
                                className="w-full bg-[var(--neon-blue)] text-black py-3 px-6 rounded-xl font-medium 
                                         transition-all duration-300 transform hover:scale-105 disabled:opacity-50
                                         disabled:hover:scale-100 neon-border"
                            >
                                {loading ? "Generating..." : "Generate Joke 🎯"}
                            </button>
                        </div>
                    </div>

                    {/* Results Column */}
                    <div className="glass-effect rounded-2xl p-8 neon-border">
                        <h2 className="text-2xl font-semibold mb-8">Result</h2>

                        <div className="space-y-6">
                            <div className="min-h-32 glass-effect p-6 rounded-xl">
                                {loading ? (
                                    <div className="flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--neon-blue)]"></div>
                                    </div>
                                ) : (
                                    <p className="whitespace-pre-wrap">{joke || "Your joke will appear here..."}</p>
                                )}
                            </div>

                            {/* Audio Controls */}
                            {audioUrl && (
                                <div className="flex items-center space-x-4 glass-effect p-4 rounded-xl">
                                    <FaMicrophone className="text-[var(--neon-blue)]" />
                                    <audio ref={audioRef} src={audioUrl} onEnded={() => setIsPlaying(false)} />
                                    <button
                                        onClick={handlePlayPause}
                                        className="p-3 rounded-full hover:bg-white/10 transition-colors"
                                    >
                                        {isPlaying ? <FaPause /> : <FaPlay />}
                                    </button>
                                    <button
                                        onClick={handleStop}
                                        className="p-3 rounded-full hover:bg-white/10 transition-colors"
                                    >
                                        <FaStop />
                                    </button>
                                </div>
                            )}

                            {/* Generated Image */}
                            {imageUrl && (
                                <div className="mt-6 glass-effect p-4 rounded-xl">
                                    <div className="flex items-center gap-2 mb-2">
                                        <FaImage className="text-[var(--neon-blue)]" />
                                        <span>Generated Image</span>
                                    </div>
                                    <img src={imageUrl} alt="Joke illustration" className="w-full rounded-lg" />
                                </div>
                            )}

                            <div className="flex space-x-4">
                                <button
                                    onClick={evaluateJoke}
                                    disabled={!joke}
                                    className="flex-1 bg-[var(--neon-purple)] py-3 px-6 rounded-xl font-medium
                                             transition-all duration-300 transform hover:scale-105 disabled:opacity-50
                                             disabled:hover:scale-100 neon-border"
                                >
                                    <span className="flex items-center justify-center gap-2">
                                        <FaStar />
                                        Evaluate Joke
                                    </span>
                                </button>

                                {/* Share Buttons */}
                                {joke && (
                                    <div className="flex space-x-2">
                                        <TwitterShareButton url={window.location.href} title={joke}>
                                            <button className="p-3 glass-effect rounded-xl hover:bg-[#1DA1F2]/20 transition-colors group">
                                                <FaTwitter className="text-[#1DA1F2] group-hover:text-[#1DA1F2] transition-colors" />
                                            </button>
                                        </TwitterShareButton>
                                        <FacebookShareButton url={window.location.href}>
                                            <button className="p-3 glass-effect rounded-xl hover:bg-[#4267B2]/20 transition-colors group">
                                                <FaFacebook className="text-[#4267B2] group-hover:text-[#4267B2] transition-colors" />
                                            </button>
                                        </FacebookShareButton>
                                    </div>
                                )}
                            </div>

                            {evaluation && (
                                <div className="glass-effect p-6 rounded-xl">
                                    {evaluation}
=======
                    <div className="space-y-6">
                        <div>
                            <h3 className="mb-3">Topic 🎭</h3>
                            <div className="space-x-4">
                                {TOPICS.map((topic) => (
                                    <label key={topic} className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name="topic"
                                            value={topic}
                                            checked={params.topic === topic}
                                            onChange={(e) => setParams({
                                                ...params,
                                                topic: e.target.value as typeof TOPICS[number]
                                            })}
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
                                {TONES.map((tone) => (
                                    <label key={tone} className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name="tone"
                                            value={tone}
                                            checked={params.tone === tone}
                                            onChange={(e) => setParams({
                                                ...params,
                                                tone: e.target.value as JokeParams["tone"]
                                            })}
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
                                {TYPES.map((type) => (
                                    <label key={type} className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name="type"
                                            value={type}
                                            checked={params.type === type}
                                            onChange={(e) => setParams({
                                                ...params,
                                                type: e.target.value as JokeParams["type"]
                                            })}
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
                                min={TEMPERATURE.MIN}
                                max={TEMPERATURE.MAX}
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
>>>>>>> 22c9aa4b466c36e7f059103f92b93b60c0d4280e
                                </div>
                            )}
                        </div>
<<<<<<< HEAD
=======

                        <button
                            onClick={evaluateJoke}
                            disabled={!joke || evaluating}
                            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg disabled:opacity-50"
                        >
                            {evaluating ? "Evaluating..." : "Evaluate Joke 📊"}
                        </button>

                        {evaluation && (
                            <div className="space-y-2 bg-white/5 p-4 rounded-lg">
                                {evaluating ? (
                                    <div className="flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        {evaluation.split('\n').map((line, index) => (
                                            <p key={index} className="text-sm">
                                                {line}
                                            </p>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
>>>>>>> 22c9aa4b466c36e7f059103f92b93b60c0d4280e
                    </div>
                </div>

                {/* Joke History */}
                {jokes.length > 0 && (
                    <div className="mt-16 max-w-6xl mx-auto">
                        <h2 className="text-2xl font-semibold mb-8 text-glow">Recent Jokes</h2>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {jokes.map((joke) => (
                                <div key={joke.id} className="glass-effect p-6 rounded-xl transform transition-all duration-300 hover:scale-105">
                                    <p className="mb-3">{joke.text}</p>
                                    <div className="text-sm text-[var(--neon-blue)]">
                                        {new Date(joke.createdAt).toLocaleDateString()}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
