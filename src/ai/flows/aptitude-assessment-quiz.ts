'use server';
/**
 * @fileOverview Assesses student interests and strengths to suggest suitable academic streams.
 *
 * - assessAptitude - A function that handles the aptitude assessment process.
 * - AptitudeAssessmentInput - The input type for the assessAptitude function.
 * - AptitudeAssessmentOutput - The return type for the assessAptitude function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AptitudeAssessmentInputSchema = z.object({
  interests: z
    .string()
    .describe('The interests of the student.'),
  strengths: z.string().describe('The strengths of the student.'),
});
export type AptitudeAssessmentInput = z.infer<typeof AptitudeAssessmentInputSchema>;

const AptitudeAssessmentOutputSchema = z.object({
  suggestedStreams: z.array(
    z.string().describe('Suitable academic streams for the student.')
  ).describe('The suggested academic streams based on the interests and strengths.'),
  reasoning: z.string().describe('The reasoning behind the suggested streams.'),
});
export type AptitudeAssessmentOutput = z.infer<typeof AptitudeAssessmentOutputSchema>;

export async function assessAptitude(input: AptitudeAssessmentInput): Promise<AptitudeAssessmentOutput> {
  return assessAptitudeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aptitudeAssessmentPrompt',
  input: {schema: AptitudeAssessmentInputSchema},
  output: {schema: AptitudeAssessmentOutputSchema},
  prompt: `You are an expert academic advisor specializing in suggesting academic streams for students.

You will use the student's interests and strengths to suggest suitable academic streams (Arts, Science, Commerce, Vocational).

Interests: {{{interests}}}
Strengths: {{{strengths}}}

Consider their interests and strengths when suggesting suitable academic streams.
Give a short reasoning behind the stream suggestions.
`,
});

const assessAptitudeFlow = ai.defineFlow(
  {
    name: 'assessAptitudeFlow',
    inputSchema: AptitudeAssessmentInputSchema,
    outputSchema: AptitudeAssessmentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
