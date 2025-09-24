'use server';
/**
 * @fileOverview A tool for fetching recent academic news and dates using NewsAPI.org.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

// Define the schema for the tool's input
const AcademicNewsInputSchema = z.object({
  query: z.string().describe('The specific information to search for, e.g., "JEE Mains exam date", "last date for NSP scholarship", "UPSC application deadline".'),
});

// Define the schema for the tool's output
const AcademicNewsOutputSchema = z.object({
    title: z.string().describe("The title of the news or event."),
    date: z.string().describe("The relevant date (e.g., 'August 15, 2024')."),
    summary: z.string().describe("A brief summary of the information."),
    source: z.string().describe("The source of the information (e.g., 'Official Website', 'Press Information Bureau')."),
    url: z.string().url().describe("The URL to the news article."),
});

// Define the AI tool
export const getAcademicNews = ai.defineTool(
  {
    name: 'getAcademicNews',
    description: 'Fetches the latest academic news, important dates, and deadlines for exams, scholarships, and admissions from real-world sources.',
    inputSchema: AcademicNewsInputSchema,
    outputSchema: z.array(AcademicNewsOutputSchema),
  },
  async (input) => {
    if (!process.env.NEWS_API_KEY || process.env.NEWS_API_KEY === "your_news_api_key_here") {
      console.warn("NewsAPI key not found for getAcademicNews tool. Returning placeholder data.");
      return [
        {
          title: "NewsAPI Key Not Configured",
          date: new Date().toLocaleDateString(),
          summary: "The NewsAPI.org key is not configured in the .env file. Please add it to fetch live news. Returning placeholder data.",
          source: "System",
          url: "https://newsapi.org"
        }
      ];
    }
    
    try {
        const query = encodeURIComponent(input.query + ' AND (education OR admission OR exam OR scholarship)');
        const url = `https://newsapi.org/v2/everything?q=${query}&language=en&sortBy=relevancy&pageSize=3&apiKey=${process.env.NEWS_API_KEY}`;
        const res = await fetch(url);
        const data = await res.json();
        
        if (data.status === "ok" && data.articles.length > 0) {
            return data.articles.map((article: any) => ({
                title: article.title,
                date: new Date(article.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
                summary: article.description || 'No summary available.',
                source: article.source.name,
                url: article.url,
            }));
        } else {
             return [{
                title: "No Information Found",
                date: "N/A",
                summary: `Could not find specific information for "${input.query}". Please try a different query.`,
                source: "System",
                url: "#"
            }];
        }
    } catch (error) {
        console.error("Error fetching news from NewsAPI in tool:", error);
        throw new Error("Failed to fetch news from NewsAPI.");
    }
  }
);