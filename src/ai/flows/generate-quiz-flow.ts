
'use server';
/**
 * @fileOverview A flow for generating quiz questions about a specific topic.
 *
 * - generateQuiz - A function that generates a set of quiz questions.
 */

import { ai } from '@/ai/genkit';
import { GenerateQuizInput, GenerateQuizInputSchema, GenerateQuizOutput, GenerateQuizOutputSchema, Question } from '@/lib/types';


export async function generateQuiz(input: GenerateQuizInput): Promise<GenerateQuizOutput> {
  return generateQuizFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateQuizPrompt',
  input: { schema: GenerateQuizInputSchema },
  output: { schema: GenerateQuizOutputSchema },
  prompt: `You are an expert art historian specializing in the Italian Renaissance.
Your task is to create a quiz in Brazilian Portuguese about {{topic}}.
The quiz must have a difficulty level of '{{difficulty}}'. Adjust the complexity of the questions accordingly.
- 'Fácil' questions should be about general knowledge, famous works, and basic facts.
- 'Médio' questions should cover more specific details, lesser-known works, and technical terms.
- 'Difícil' questions should be for experts, covering obscure facts, influence on other artists, and specific historical context.

Generate exactly {{count}} multiple-choice questions.
Each question must have exactly 4 options.
One of the options must be the correct answer.
For each question, provide a short, interesting fact or explanation in the 'feedback' field. This will be shown to the user after they answer to provide more context.
Ensure the questions cover a range of topics including biography, major works, techniques, and influence, according to the chosen difficulty.
For about a third of the questions, especially those about a specific, famous artwork, provide a short subject for an image generation prompt in the 'imageSubject' field. For example: "Statue of David", "Gattamelata equestrian statue", "Penitent Magdalene". Do not provide an imageSubject for biographical or technical questions.
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
    
    const imageGenerationPromises = output.questions.map(async (question): Promise<Question> => {
      if (question.imageSubject) {
        try {
          const { media } = await ai.generate({
            model: 'googleai/gemini-2.0-flash-preview-image-generation',
            prompt: `A dramatic, Renaissance-style oil painting of: ${question.imageSubject}`,
            config: {
              responseModalities: ['TEXT', 'IMAGE'],
            },
          });
          if (media?.url) {
            return { ...question, imageUrl: media.url };
          }
        } catch (e) {
          console.error(`Failed to generate image for subject: ${question.imageSubject}`, e);
          // Fail gracefully, the question will just not have an image.
        }
      }
      return question;
    });

    const questionsWithImages = await Promise.all(imageGenerationPromises);

    return { questions: questionsWithImages };
  }
);
