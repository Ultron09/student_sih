
"use client";

import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { type PersonalizedCourseRecommendationsOutput } from "@/ai/flows/personalized-course-recommendations";
import { handleRecommendations } from "./actions";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Building2, GraduationCap, Loader2, BookOpen, Star, MapPin, Sparkles } from "lucide-react";
import { AptitudeContext } from "@/context/AptitudeContext";
import { type AptitudeAssessmentOutput } from "@/ai/flows/aptitude-assessment-quiz";

const formSchema = z.object({
  age: z.coerce.number().min(14, "Age must be at least 14.").max(25, "Age must be at most 25."),
  gender: z.string().min(1, "Please select your gender."),
  classLevel: z.string().min(1, "Please select your class level."),
  location: z.string().min(3, "Please enter your location."),
  academicInterests: z.string().min(3, "Please enter your academic interests."),
  assessmentResults: z.string().min(10, "Please provide your assessment results."),
});

function formatAptitudeResults(result: AptitudeAssessmentOutput | null): string {
    if (!result) return "";
    let summary = `Strengths: Analytical(${result.analyticalStrength}), Creative(${result.creativeThinking}), Numerical(${result.numericalAbility}), Verbal(${result.verbalCommunication}), Decision Making(${result.decisionMaking}). `;
    summary += `Learning Style: ${result.preferredLearningStyle}. `;
    summary += `Interests: ${result.interests.join(", ")}. `;
    summary += `Summary: ${result.reasoning}`;
    return summary;
}


export function RecommendationsForm() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PersonalizedCourseRecommendationsOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { aptitudeResult } = useContext(AptitudeContext);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: 18,
      gender: "",
      classLevel: "",
      location: "",
      academicInterests: "",
      assessmentResults: formatAptitudeResults(aptitudeResult),
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setResult(null);
    setError(null);
    const response = await handleRecommendations(values);
    if (response.success && response.data) {
      setResult(response.data);
    } else {
      setError(response.error || "An unknown error occurred.");
    }
    setLoading(false);
  }

  const renderList = (items: string[] | undefined) => (
    <ul className="list-disc list-inside space-y-1.5 text-muted-foreground">
      {items?.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );

  type ResultSection = {
    title: string;
    icon: React.ElementType;
    content: string[] | undefined;
  };

  const resultSections: ResultSection[] = result ? [
    { title: "Recommended Courses", icon: GraduationCap, content: result.recommendedCourses },
    { title: "Recommended Colleges", icon: Building2, content: result.recommendedColleges },
    { title: "Recommended Career Paths", icon: Briefcase, content: result.recommendedCareerPaths },
    { title: "Study Materials", icon: BookOpen, content: result.studyMaterials },
    { title: "Scholarship Info", icon: Star, content: result.scholarshipInfo },
  ] : [];


  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 17" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
            <FormField
              control={form.control}
              name="classLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Class Level</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your current or last class" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="10">Class 10</SelectItem>
                      <SelectItem value="12">Class 12</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Location</FormLabel>
                <FormControl>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="e.g., Raipur, Chhattisgarh" {...field} className="pl-10" />
                  </div>
                </FormControl>
                 <FormDescription>
                  This helps us find colleges near you.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="academicInterests"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Academic Interests</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Science, Arts, Commerce" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="assessmentResults"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Aptitude Assessment Results</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Copy and paste the results from the Aptitude Test, or describe your interests, strengths, and personality traits."
                    rows={5}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This helps the AI give you the best recommendations.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={loading} size="lg">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              "Get My Recommendations"
            )}
          </Button>
        </form>
      </Form>

      {result && (
        <Card className="mt-8 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-xl font-headline text-primary flex items-center gap-2">
                <Sparkles/>
                Your Personalized Education & Career Plan
            </CardTitle>
            <CardDescription>
                Here are the recommendations generated by our AI based on your profile.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {resultSections.map((section, index) => section.content && section.content.length > 0 && (
              <div key={index}>
                <h3 className="font-semibold text-lg flex items-center gap-2 mb-2">
                    <section.icon className="h-5 w-5 text-accent"/>
                    {section.title}
                </h3>
                {renderList(section.content)}
              </div>
            ))}
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
