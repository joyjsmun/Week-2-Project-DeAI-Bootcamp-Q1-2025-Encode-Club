import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Joke {
    id: string;
    text: string;
    topic: string;
    tone: string;
    type: string;
    imageUrl?: string;
    evaluation?: string;
    createdAt: Date;
}

interface JokeStore {
    jokes: Joke[];
    addJoke: (joke: Omit<Joke, 'id' | 'createdAt'>) => void;
    clearHistory: () => void;
}

export const useJokeStore = create<JokeStore>()(
    persist(
        (set) => ({
            jokes: [],
            addJoke: (joke) =>
                set((state) => ({
                    jokes: [
                        {
                            ...joke,
                            id: Math.random().toString(36).substring(7),
                            createdAt: new Date(),
                        },
                        ...state.jokes,
                    ].slice(0, 10), // Keep only the last 10 jokes
                })),
            clearHistory: () => set({ jokes: [] }),
        }),
        {
            name: 'joke-storage',
        }
    )
); 