export const CHAT_ACTIONS = {
    GENERATE: 'generate',
    EVALUATE: 'evaluate'
} as const;

export const TOPICS = ['work', 'animals', 'food'] as const;
export const TONES = ['witty', 'sarcastic', 'silly'] as const;
export const TYPES = ['pun', 'knock-knock', 'story'] as const;

export const TEMPERATURE = {
    MIN: 0,
    MAX: 2,
    DEFAULT: 1
} as const;

export type JokeParams = {
    topic: typeof TOPICS[number];
    tone: typeof TONES[number];
    type: typeof TYPES[number];
    temperature: number;
};
