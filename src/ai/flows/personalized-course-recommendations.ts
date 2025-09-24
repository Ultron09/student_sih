'use server';
/**
 * @fileOverview This file defines a Genkit flow for providing personalized course recommendations to students based on their profile and assessment results.
 *
 * - personalizedCourseRecommendations - A function that orchestrates the process of generating personalized course recommendations.
 * - PersonalizedCourseRecommendationsInput - The input type for the personalizedCourseRecommendations function.
 * - PersonalizedCourseRecommendationsOutput - The return type for the personalizedCourseRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { searchColleges } from '@/ai/tools/search-colleges';
import { getCareerPathsTool } from '@/ai/tools/get-career-paths';

const PersonalizedCourseRecommendationsInputSchema = z.object({
  age: z.number().describe('The age of the student.'),
  gender: z.string().describe('The gender of the student.'),
  classLevel: z.string().describe('The current class level of the student (e.g., 10, 12).'),
  location: z.string().describe('The current location of the student (e.g., city, state).'),
  academicInterests: z.string().describe('The academic interests of the student (e.g., Science, Arts, Commerce).'),
  assessmentResults: z
    .string()
    .describe(
      'The results of the aptitude assessment, including interests, strengths, and personality traits.'
    ),
});
export type PersonalizedCourseRecommendationsInput = z.infer<
  typeof PersonalizedCourseRecommendationsInputSchema
>;

const PersonalizedCourseRecommendationsOutputSchema = z.object({
  recommendedCourses: z
    .array(z.string())
    .describe('A list of 3-5 recommended course names (e.g., "B.Sc. in Computer Science", "B.A. in History").'),
  recommendedColleges: z
    .array(z.string())
    .describe('A list of 3-5 recommended college names and their locations.'),
  recommendedCareerPaths: z
    .array(z.string())
    .describe(
      'A list of 3-5 recommended career path names.'
    ),
  studyMaterials: z.array(z.string()).describe('A list of 3-5 recommended study materials tailored to the subject choice.'),
  scholarshipInfo: z.array(z.string()).describe('A list of 2-3 relevant scholarship opportunities.'),
});
export type PersonalizedCourseRecommendationsOutput = z.infer<
  typeof PersonalizedCourseRecommendationsOutputSchema
>;

export async function personalizedCourseRecommendations(
  input: PersonalizedCourseRecommendationsInput
): Promise<PersonalizedCourseRecommendationsOutput> {
  return personalizedCourseRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedCourseRecommendationsPrompt',
  input: {schema: PersonalizedCourseRecommendationsInputSchema},
  output: {schema: PersonalizedCourseRecommendationsOutputSchema},
  tools: [searchColleges, getCareerPathsTool],
  prompt: `You are an AI-powered education advisor. Your goal is to provide personalized and actionable recommendations to a student based on their profile and assessment results.

  Student Profile:
  - Age: {{{age}}}
  - Gender: {{{gender}}}
  - Class Level: {{{classLevel}}}
  - Location: {{{location}}}
  - Academic Interests: {{{academicInterests}}}
  - Assessment Results: {{{assessmentResults}}}

  Instructions:
  1.  **Recommend Courses**: Based on the student's profile, especially their interests and assessment results, recommend an array of 3-5 suitable academic courses (e.g., "B.Sc. in Physics", "B.Tech in Computer Science").
  2.  **Recommend Colleges**: Use the \`searchColleges\` tool to find 3-5 government colleges in the student's specified \`location\` that offer one or more of the courses you recommended. For each college, provide its name and location in the response.
  3.  **Recommend Career Paths**: For the recommended courses, use the \`getCareerPaths\` tool to identify and suggest 3-5 potential career paths.
  4.  **Suggest Study Materials**: Provide an array of 3-5 general study materials or platforms (like 'NCERT Textbooks', 'NPTEL Courses') relevant to the recommended subjects.
  5.  **Provide Scholarship Info**: Suggest an array of 2-3 national or relevant state-level scholarship programs.

  Ensure that all recommendations are aligned with the student's profile. Structure the entire output in the specified JSON format.
  `,
});

const personalizedCourseRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedCourseRecommendationsFlow',
    inputSchema: PersonalizedCourseRecommendationsInputSchema,
    outputSchema: PersonalizedCourseRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
