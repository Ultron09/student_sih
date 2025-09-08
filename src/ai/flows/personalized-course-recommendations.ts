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
import { collegesData, College } from '@/data/colleges';
import { careerPathsData, CareerPath } from '@/data/career-paths';

const getCollegesTool = ai.defineTool(
  {
    name: 'getColleges',
    description: 'Returns a list of colleges based on location and program.',
    inputSchema: z.object({
      location: z.string().describe('The location to search for colleges.'),
      programs: z.array(z.string()).describe('A list of programs to filter by.'),
    }),
    outputSchema: z.array(z.custom<College>()),
  },
  async (input) => {
    return collegesData.filter(college =>
      college.location.toLowerCase().includes(input.location.toLowerCase()) &&
      input.programs.some(p => college.programs.some(cp => cp.toLowerCase().includes(p.toLowerCase())))
    );
  }
);

const getCareerPathsTool = ai.defineTool(
  {
    name: 'getCareerPaths',
    description: 'Returns a list of career paths based on a degree.',
    inputSchema: z.object({
      degree: z.string().describe('The degree to search for career paths.'),
    }),
    outputSchema: z.array(z.custom<CareerPath>()),
  },
  async (input) => {
    const degreeKey = input.degree.toLowerCase().replace(/\s/g, '').replace(/\./g, '');
    return careerPathsData[degreeKey as keyof typeof careerPathsData] || [];
  }
);


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
    .describe('A list of recommended courses based on the student profile and assessment results.'),
  recommendedColleges: z
    .array(z.string())
    .describe('A list of recommended colleges based on the student profile and assessment results.'),
  recommendedCareerPaths: z
    .array(z.string())
    .describe(
      'A list of recommended career paths based on the student profile and assessment results.'
    ),
  studyMaterials: z.array(z.string()).describe('Recommended study materials tailored to the subject choice.'),
  scholarshipInfo: z.array(z.string()).describe('Relevant scholarship information for the student.'),
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
  tools: [getCollegesTool, getCareerPathsTool],
  prompt: `You are an AI-powered education advisor that provides personalized course, college, and career path recommendations to students based on their profile and assessment results.

  Student Profile:
  - Age: {{{age}}}
  - Gender: {{{gender}}}
  - Class Level: {{{classLevel}}}
  - Location: {{{location}}}
  - Academic Interests: {{{academicInterests}}}
  - Assessment Results: {{{assessmentResults}}}

  Based on this information, provide the following:
  - Recommended Courses: An array of 3-5 suitable academic courses.
  - Recommended Colleges: An array of 3-5 nearby government colleges based on the provided location. Use the getColleges tool to find suitable colleges. For each college, list its name and location.
  - Recommended Career Paths: An array of 3-5 potential career paths. Use the getCareerPaths tool to find suitable careers for the recommended courses.
  - Study Materials: An array of suggested study materials tailored to the subject choice.
  - Scholarship Info: An array of relevant scholarship information.

  Please ensure that the recommendations are aligned with the student's interests, strengths, and personality traits, as indicated in the assessment results. The response should be structured and easy to understand.
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
