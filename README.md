# Week 2 Project - DeAI Bootcamp Q1 2025 - AI Joke Generator

## Project Description
This project showcases an AI-powered joke generator built with NextJS. Users can customize various parameters to generate personalized jokes tailored to their preferences. The application also features an AI evaluation system that assesses jokes based on criteria such as humor, appropriateness, and potential offensiveness.

Key features include:
- Parameter customization for joke generation
- Real-time joke generation using AI
- AI-powered joke evaluation system
- Clean, responsive user interface

## Live Demo
[Insert our deployed application link here]

## Prerequisites
Before you begin, ensure you have met the following requirements:

- You have installed Python 3.8 or later.
- You have installed pip (Python package installer).
- You have set up your OpenAI API key.
- Make sure that the OpenAI API key is stored in an environment variable named exactly OPENAI_API_KEY.


## Installation

1. **Clone the Repository**:
    ```sh
    git clone https://github.com/joyjsmun/Week-2-Project-DeAI-Bootcamp-Q1-2025-Encode-Club.git
    cd Week-2-Project-DeAI-Bootcamp-Q1-2025-Encode-Club
    ```

2. **Install Dependencies**:
    ```sh
    npm install
    ```

3. **Environment Setup**:
    Create a `.env.local` file in the root directory with the following variables:
    ```
    OPENAI_API_KEY=your_openai_api_key_here
    ```

4. **Run the Development Server**:
    ```sh
    npm run dev
    ```
    The application will be available at `http://localhost:3000`

## How to Use

### Joke Generation
1. Visit the main page of the application
2. Customize your joke parameters:
   - Select a topic (e.g., work, animals, food)
   - Choose a tone (e.g., witty, sarcastic, silly)
   - Pick a joke type (e.g., pun, knock-knock, story)
   - Adjust the creativity level (temperature)
3. Click the "Generate Joke" button
4. View your customized joke on the screen
5. See the AI evaluation of your joke's humor and appropriateness

### AI Joke Evaluation
The application uses AI to evaluate jokes based on multiple criteria:
- Humor rating (1-10)
- Appropriateness assessment
- Potential offensiveness check
- Originality score

## Technical Implementation

### Frontend
- Built with NextJS
- CCS using Tailwind CSS
- Interactive UI components for parameter selection

### Backend
- NextJS API routes for handling requests
- Integration with OpenAI API for joke generation
- Custom prompt engineering for joke customization
- Specialized evaluation system using AI classification

### Prompt Engineering
The application uses carefully crafted prompts to guide the AI in generating jokes that match the user's preferences. System instructions are optimized for subjective tasks like humor and appropriateness assessment.

Example prompt structure:
```
You are a comedy writer specializing in {jokeType} jokes with a {tone} tone.
Write a joke about {topic} that is both humorous and appropriate.
```


## Experimental Results

Our team experimented with various prompt configurations to optimize joke generation and evaluation:

1. **System Instruction Variations**:
   - We tested different persona instructions for the AI
   - Compared direct vs. creative instruction styles
   - Analyzed results based on user feedback

2. **Parameter Impact Analysis**:
   - Tested how temperature affects joke quality
   - Evaluated the impact of different topic selections
   - Analyzed how tone selection influences humor ratings

3. **Evaluation Prompt Engineering**:
   - Developed specialized prompts for subjective assessment
   - Tested different scoring systems
   - Implemented multi-criteria evaluation frameworks

[Include screenshots of your application here]

## Contributors
- [joyjsmun](https://github.com/joyjsmun) (Unique ID: OFVwFA)
- [nvinnikov](https://github.com/nvinnikov) (Unique ID: VvZfPu)
- ADD more later
