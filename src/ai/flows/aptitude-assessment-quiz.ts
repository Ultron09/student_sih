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
  answers: z.record(z.string()).describe('A JSON object of question IDs and the user\'s selected answers.'),
});
export type AptitudeAssessmentInput = z.infer<typeof AptitudeAssessmentInputSchema>;

const AptitudeAssessmentOutputSchema = z.object({
  analyticalStrength: z.string().describe('Assessment of analytical strength (e.g., High, Moderate, Low)'),
  creativeThinking: z.string().describe('Assessment of creative thinking (e.g., High, Moderate, Low)'),
  numericalAbility: z.string().describe('Assessment of numerical ability (e.g., High, Moderate, Low)'),
  verbalCommunication: z.string().describe('Assessment of verbal and communication skills (e.g., High, Moderate, Low)'),
  decisionMaking: z.string().describe('Assessment of decision-making and problem-solving skills (e.g., High, Moderate, Low)'),
  preferredLearningStyle: z.string().describe('The student\'s preferred learning style (e.g., Hands-on, Observational, Reading & Theory)'),
  interests: z.array(z.string()).describe('A list of key interests identified from the test.'),
  suggestedStreams: z.array(z.string()).describe('Suitable academic streams for the student.'),
  reasoning: z.string().describe('A summary of the reasoning behind the profile and suggestions.'),
});
export type AptitudeAssessmentOutput = z.infer<typeof AptitudeAssessmentOutputSchema>;

export async function assessAptitude(input: AptitudeAssessmentInput): Promise<AptitudeAssessmentOutput> {
  return assessAptitudeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aptitudeAssessmentPrompt',
  input: {schema: AptitudeAssessmentInputSchema},
  output: {schema: AptitudeAssessmentOutputSchema},
  prompt: `You are an expert academic advisor. Your task is to analyze a student's answers to a multi-section aptitude test and generate a comprehensive profile report.

The test is divided into the following sections:
- Logical & Analytical Reasoning (questions q1, q2)
- Numerical & Quantitative Aptitude (questions q3, q4)
- Verbal & Comprehension Skills (questions q5, q6)
- Creative & Conceptual Thinking (questions q7, q8)
- Situational Judgment & Decision Making (questions q9, q10)
- Interest Mapping & Learning Style (questions q11, q12)

Below are the correct answers for the objective questions:
- q1: 'Eagle'
- q2: '48'
- q3: '2.5 hours'
- q4: '50 liters'
- q5: 'What you do is more important than what you say'
- q6: 'Who observes carefully always learns and achieves success.'

Student's Answers (provided as a JSON object of questionId: answer):
{{{json answers}}}

Instructions:
1.  **Assess Strengths**: For each of the first five sections, analyze the answers and rate the student's ability as "High", "Moderate", or "Low".
    - For Logical & Analytical Reasoning (q1, q2), Numerical & Quantitative Aptitude (q3, q4), and Verbal & Comprehension Skills (q5, q6), compare the user's answers to the correct answers provided above. Base your "High", "Moderate", "Low" rating on their accuracy. 2 correct = High, 1 correct = Moderate, 0 correct = Low.
    - For Creative & Conceptual Thinking (q7, q8) and Situational Judgment & Decision Making (q9, q10), the answers are subjective. Assess the quality and thoughtfulness of the responses to assign your rating.
2.  **Identify Learning Style**: Based on the answer to question q12, determine the student's preferred learning style.
3.  **List Interests**: Extract and list the key interests shown by the student from their answer to question q11.
4.  **Suggest Streams**: Based on the overall profile (strengths and interests), suggest 2-3 suitable academic streams (e.g., Science, Commerce, Arts, Vocational).
5.  **Provide Reasoning**: Write a concise summary (2-3 sentences) explaining why the profile and stream suggestions fit the student based on their answers.

Generate the output in the specified JSON format.
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
