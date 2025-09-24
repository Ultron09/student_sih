'use server';
/**
 * @fileOverview A tool for searching for colleges based on various criteria.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { collegesData, College } from '@/data/colleges';

// Define the schema for the tool's input
const CollegeSearchInputSchema = z.object({
  location: z.string().optional().describe('The city or state to search for colleges in (e.g., "Raipur", "Karnataka").'),
  program: z.string().optional().describe('A specific program or course to filter by (e.g., "B.Sc. (Computer Science)", "BBA").'),
  name: z.string().optional().describe('The name of a specific college to search for.'),
});

// Define the schema for the tool's output
const CollegeSearchOutputSchema = z.array(z.custom<College>());

// Define the AI tool
export const searchColleges = ai.defineTool(
  {
    name: 'searchColleges',
    description: 'Search for colleges based on location, program, or name. Use this to find information about colleges.',
    inputSchema: CollegeSearchInputSchema,
    outputSchema: CollegeSearchOutputSchema,
  },
  async (input) => {
    let results = collegesData;

    if (input.name) {
      results = results.filter(college =>
        college.name.toLowerCase().includes(input.name!.toLowerCase())
      );
    }
    if (input.location) {
      results = results.filter(college =>
        college.location.toLowerCase().includes(input.location!.toLowerCase())
      );
    }
    if (input.program) {
      results = results.filter(college =>
        college.programs.some(p => p.toLowerCase().includes(input.program!.toLowerCase()))
      );
    }

    // Return the first 5 results to keep the output concise
    return results.slice(0, 5);
  }
);
