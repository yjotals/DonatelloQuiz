'use server';
/**
 * @fileOverview A flow for generating quiz questions about a specific topic.
 *
 * - generateQuiz - A function that generates a set of quiz questions.
 * - GenerateQuizInput - The input type for the generateQuiz function.
 * - GenerateQuizOutput - The return type for the generateQuiz function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const QuestionSchema = z.object({
  question: z.string().describe('The quiz question.'),
  options: z.array(z.string()).length(4).describe('A list of 4 possible answers, including the correct one.'),
  correctAnswer: z.string().describe('The correct answer from the options list.'),
});

export const GenerateQuizInputSchema = z.object({
  topic: z.string().describe('The topic for the quiz questions, e.g., "Donatello".'),
  count: z.number().int().positive().describe('The number of questions to generate.'),
});
export type GenerateQuizInput = z.infer<typeof GenerateQuizInputSchema>;

export const GenerateQuizOutputSchema = z.object({
  questions: z.array(QuestionSchema),
});
export type GenerateQuizOutput = z.infer<typeof GenerateQuizOutputSchema>;

export async function generateQuiz(input: GenerateQuizInput): Promise<GenerateQuizOutput> {
  return generateQuizFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateQuizPrompt',
  input: { schema: GenerateQuizInputSchema },
  output: { schema: GenerateQuizOutputSchema },
  prompt: `You are an expert art historian specializing in the Italian Renaissance.
Your task is to create a quiz in Brazilian Portuguese about {{topic}}.
Generate exactly {{count}} multiple-choice questions.
Each question must have exactly 4 options.
One of the options must be the correct answer.
Ensure the questions cover a range of topics including biography, major works, techniques, and influence.
Return the questions in the specified JSON format.
`,
});

const generateQuizFlow = ai.defineFlow(
  {
    name: 'generateQuizFlow',
    inputSchema: GenerateQuizInputSchema,
    outputSchema: GenerateQuizOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error("AI failed to generate quiz questions.");
    }
    return output;
  }
);
