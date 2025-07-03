
import { z } from 'zod';

export const QuestionSchema = z.object({
  question: z.string().describe('The quiz question.'),
  options: z.array(z.string()).length(4).describe('A list of 4 possible answers, including the correct one.'),
  correctAnswer: z.string().describe('The correct answer from the options list.'),
  feedback: z.string().describe('A short, interesting fact or explanation (in Brazilian Portuguese) related to the question and its correct answer. This will be shown to the user after they answer.'),
  imageSubject: z.string().optional().describe('For questions about a specific artwork, provide a 2-3 word subject for an image generation prompt. For example, "Statue of David" or "Gattamelata equestrian statue".'),
  imageUrl: z.string().url().optional().describe('An optional URL to an image related to the question.'),
});

export type Question = z.infer<typeof QuestionSchema>;

export const GenerateQuizInputSchema = z.object({
  topic: z.string().describe('The topic for the quiz questions, e.g., "Donatello".'),
  count: z.number().int().positive().describe('The number of questions to generate.'),
});
export type GenerateQuizInput = z.infer<typeof GenerateQuizInputSchema>;

export const GenerateQuizOutputSchema = z.object({
  questions: z.array(QuestionSchema),
});
export type GenerateQuizOutput = z.infer<typeof GenerateQuizOutputSchema>;
