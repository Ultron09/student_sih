'use server';
/**
 * @fileOverview A tool for fetching career paths for a given degree.
 */
import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { careerPathsData, CareerPath } from '@/data/career-paths';

export const getCareerPathsTool = ai.defineTool(
  {
    name: 'getCareerPaths',
    description: 'Returns a list of career paths based on a degree.',
    inputSchema: z.object({
      degree: z.string().describe('The degree to search for career paths (e.g., "B.Sc.", "B.Tech", "B.Com", "B.A.", "BCA", "BBA", "B.Voc").'),
    }),
    outputSchema: z.array(z.custom<CareerPath>()),
  },
  async (input) => {
    const degreeKey = input.degree.toLowerCase().replace(/\s/g, '').replace(/\./g, '');
    return careerPathsData[degreeKey as keyof typeof careerPathsData] || [];
  }
);
