'use server';
/**
 * @fileOverview A general-purpose student advisor AI flow that can answer questions about colleges, careers, and deadlines.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { searchColleges } from '@/ai/tools/search-colleges';
import { getAcademicNews } from '@/ai/tools/get-academic-news';
import { getCareerPathsTool } from '@/ai/tools/get-career-paths';
import { Part } from 'genkit/cohere';

// Define the schema for the flow's input
const StudentAdvisorInputSchema = z.object({
  query: z.string().describe("The student's question."),
});
type StudentAdvisorInput = z.infer<typeof StudentAdvisorInputSchema>;

// Define the schema for the flow's output
const StudentAdvisorOutputSchema = z.string().describe("The AI's response to the student's question.");
type StudentAdvisorOutput = z.infer<typeof StudentAdvisorOutputSchema>;

// The main async function that the UI will call
export async function adviseStudent(input: StudentAdvisorInput): Promise<StudentAdvisorOutput> {
  return studentAdvisorFlow(input);
}

// Define the AI prompt
const studentAdvisorPrompt = ai.definePrompt({
  name: 'studentAdvisorPrompt',
  input: { schema: StudentAdvisorInputSchema },
  // Provide the tools that the AI can use to answer questions
  tools: [searchColleges, getAcademicNews, getCareerPathsTool],
  prompt: `You are a friendly and knowledgeable student advisor bot named Disha. Your goal is to help students in India make informed decisions about their education and career.

  Use the tools provided to answer the student's question accurately. Be conversational and provide clear, concise, and helpful information.

  - When you use the \`searchColleges\` tool, format the results as a bulleted list. For each college, clearly state its name and location.
  - When you use the \`getAcademicNews\` tool, present the date, a summary of the news, and the source clearly.
  - When you use the \`getCareerPathsTool\` tool, list the different categories of paths (e.g., Higher Education, Government Jobs) and then list the options under each as bullet points.

  Always address the student in a friendly, encouraging tone.

  Student's question:
  "{{{query}}}"
  `,
});

// Define the AI flow
const studentAdvisorFlow = ai.defineFlow(
  {
    name: 'studentAdvisorFlow',
    inputSchema: StudentAdvisorInputSchema,
    outputSchema: StudentAdvisorOutputSchema,
  },
  async (input) => {
    const { output } = await studentAdvisorPrompt(input);
    
    if (!output) {
      return "I'm sorry, I couldn't generate a response. Please try rephrasing your question.";
    }

    if (typeof output === 'string') {
        return output;
    }

    // When a tool is used, the output is an array of Parts. We need to find the text part.
    const textPart = (output as Part[]).find(part => part.text);
    if (textPart && textPart.text) {
        return textPart.text;
    }

    // If a tool was called but no text part was returned, we need to look deeper.
    const toolResponse = (output as Part[]).find(part => part.toolResponse);
    if (toolResponse && toolResponse.toolResponse?.outputs) {
      // Just stringify the output of the first tool call for now.
      // A more robust solution might format this nicely.
      return JSON.stringify(toolResponse.toolResponse.outputs[0], null, 2);
    }
    

    return "I seem to have run into a problem. Could you try asking your question in a different way?";
  }
);
