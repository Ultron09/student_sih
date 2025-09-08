"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { type AptitudeAssessmentOutput } from "@/ai/flows/aptitude-assessment-quiz";
import { handleAptitudeAssessment } from "./actions";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Zap } from "lucide-react";

const formSchema = z.object({
  interests: z.string().min(10, {
    message: "Please describe your interests in at least 10 characters.",
  }),
  strengths: z.string().min(10, {
    message: "Please describe your strengths in at least 10 characters.",
  }),
});

export function AptitudeTestForm() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AptitudeAssessmentOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      interests: "",
      strengths: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setResult(null);
    setError(null);
    const response = await handleAptitudeAssessment(values);
    if (response.success && response.data) {
      setResult(response.data);
    } else {
      setError(response.error || "An unknown error occurred.");
    }
    setLoading(false);
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="interests"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Your Interests</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g., Playing cricket, reading history books, watching science fiction movies, coding, sketching..."
                    rows={4}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  What do you enjoy doing in your free time?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="strengths"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Your Strengths</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g., Good at mathematics, public speaking, leading a team, solving complex problems, writing stories..."
                    rows={4}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  What are you good at? Think about school subjects or other skills.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={loading} size="lg">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              "Assess My Aptitude"
            )}
          </Button>
        </form>
      </Form>

      {result && (
        <Card className="mt-8 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-xl font-headline text-primary flex items-center gap-2">
                <Zap/>
                AI-Powered Stream Suggestion
            </CardTitle>
            <CardDescription>
              Based on your interests and strengths, here are the academic streams we recommend for you.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg">Suggested Streams:</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {result.suggestedStreams.map((stream) => (
                  <span key={stream} className="px-3 py-1 text-sm font-medium bg-accent text-accent-foreground rounded-full">
                    {stream}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Reasoning:</h3>
              <p className="text-muted-foreground mt-1">{result.reasoning}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {error && (
        <div className="mt-8 text-destructive text-center p-4 border border-destructive/50 rounded-md">
            {error}
        </div>
      )}
    </div>
  );
}
