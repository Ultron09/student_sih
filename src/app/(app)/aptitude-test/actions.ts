'use server'

import { assessAptitude, type AptitudeAssessmentInput, type AptitudeAssessmentOutput } from '@/ai/flows/aptitude-assessment-quiz';
import { z } from 'zod';

const AptitudeAssessmentInputSchema = z.object({
  answers: z.record(z.string()),
});

export async function handleAptitudeAssessment(data: AptitudeAssessmentInput): Promise<{success: boolean; data?: AptitudeAssessmentOutput; error?: string}> {
  const parsedData = AptitudeAssessmentInputSchema.safeParse(data);
  if (!parsedData.success) {
    return { success: false, error: "Invalid input data." };
  }

  try {
    const result = await assessAptitude(parsedData.data);
    return { success: true, data: result };
  } catch (error) {
    console.error("Error in aptitude assessment:", error);
    return { success: false, error: 'An error occurred while assessing your aptitude. Please try again.' };
  }
}
