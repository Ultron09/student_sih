'use server'

import { personalizedCourseRecommendations, type PersonalizedCourseRecommendationsInput, type PersonalizedCourseRecommendationsOutput } from '@/ai/flows/personalized-course-recommendations';
import { z } from 'zod';

const RecommendationsInputSchema = z.object({
  age: z.number(),
  gender: z.string(),
  classLevel: z.string(),
  location: z.string(),
  academicInterests: z.string(),
  assessmentResults: z.string(),
});

export async function handleRecommendations(data: PersonalizedCourseRecommendationsInput): Promise<{success: boolean; data?: PersonalizedCourseRecommendationsOutput; error?: string}> {
  const parsedData = RecommendationsInputSchema.safeParse(data);
  if (!parsedData.success) {
    return { success: false, error: "Invalid input data." };
  }

  try {
    const result = await personalizedCourseRecommendations(parsedData.data);
    return { success: true, data: result };
  } catch (error) {
    console.error("Error in recommendations flow:", error);
    return { success: false, error: 'An error occurred while generating recommendations. Please try again.' };
  }
}
