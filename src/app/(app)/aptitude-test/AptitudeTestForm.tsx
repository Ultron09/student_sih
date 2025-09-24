
"use client";

import { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { type AptitudeAssessmentOutput } from "@/ai/flows/aptitude-assessment-quiz";
import { handleAptitudeAssessment } from "./actions";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Loader2, Zap, BarChart3, BrainCircuit, DraftingCompass, Users, BookOpen, Lightbulb, TrendingUp, CheckCircle2 } from "lucide-react";
import { quizData, type Section } from "@/data/quiz-questions";
import { Progress } from "@/components/ui/progress";
import { AptitudeContext } from "@/context/AptitudeContext";

export function AptitudeTestForm() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AptitudeAssessmentOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const { setAptitudeResult } = useContext(AptitudeContext);
  const form = useForm();
  
  const sections = quizData.sections;
  const currentSection: Section = sections[currentSectionIndex];
  
  useEffect(() => {
    if (result) {
      setAptitudeResult(result);
    }
  }, [result, setAptitudeResult]);

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers(prev => ({...prev, [questionId]: value}));
  };

  const nextSection = () => {
    if (currentSectionIndex < sections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
    }
  };

  const prevSection = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1);
    }
  };

  async function onSubmit() {
    setLoading(true);
    setResult(null);
    setError(null);
    const response = await handleAptitudeAssessment({ answers });
    if (response.success && response.data) {
      setResult(response.data);
    } else {
      setError(response.error || "An unknown error occurred.");
    }
    setLoading(false);
  }
  
  const isCurrentSectionAnswered = () => {
    return currentSection.questions.every(q => answers[q.id]);
  }
  
  const progress = ((currentSectionIndex + 1) / sections.length) * 100;

  if (loading) {
    return (
        <div className="flex flex-col items-center justify-center text-center py-16">
            <Loader2 className="mr-2 h-12 w-12 animate-spin text-primary" />
            <p className="mt-4 text-lg text-muted-foreground">Analyzing your responses and building your profile...</p>
        </div>
    );
  }

  if (error) {
     return (
        <div className="mt-8 text-destructive text-center p-4 border border-destructive/50 rounded-md">
            {error}
        </div>
      );
  }

  if (result) {
    const profileItems = [
      { label: 'Analytical Strength', value: result.analyticalStrength, icon: BarChart3 },
      { label: 'Creative Thinking', value: result.creativeThinking, icon: DraftingCompass },
      { label: 'Numerical Ability', value: result.numericalAbility, icon: TrendingUp },
      { label: 'Verbal & Communication', value: result.verbalCommunication, icon: BookOpen },
      { label: 'Decision Making', value: result.decisionMaking, icon: Users },
      { label: 'Preferred Learning Style', value: result.preferredLearningStyle, icon: BrainCircuit },
    ];

    return (
        <Card className="mt-8 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-xl font-headline text-primary flex items-center gap-2">
                <Zap/>
                Your Personalized Aptitude Profile
            </CardTitle>
            <CardDescription>
              Here is a detailed breakdown of your strengths, learning style, and interests based on your test answers.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {profileItems.map(item => (
                <Card key={item.label} className="p-4">
                  <div className="flex items-center gap-3">
                    <item.icon className="h-6 w-6 text-accent"/>
                    <div>
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                      <p className="font-bold text-base">{item.value}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

             <div>
              <h3 className="font-semibold text-lg flex items-center gap-2"><Lightbulb className="h-5 w-5 text-accent"/>Interests</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {result.interests.map((interest) => (
                  <span key={interest} className="px-3 py-1 text-sm font-medium bg-secondary text-secondary-foreground rounded-full">
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-accent"/>Suggested Streams</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {result.suggestedStreams.map((stream) => (
                  <span key={stream} className="px-3 py-1 text-sm font-medium bg-accent text-accent-foreground rounded-full">
                    {stream}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg">Summary & Reasoning:</h3>
              <p className="text-muted-foreground mt-1">{result.reasoning}</p>
            </div>
            
            <Button onClick={() => { setResult(null); setCurrentSectionIndex(0); setAnswers({}); setAptitudeResult(null); }}>
                Retake the Test
            </Button>
          </CardContent>
        </Card>
    );
  }


  return (
    <div>
        <Progress value={progress} className="mb-4" />
        <p className="text-center text-sm text-muted-foreground mb-4">Section {currentSectionIndex + 1} of {sections.length}: {currentSection.title}</p>
        <Card>
            <CardHeader>
                <CardTitle className="text-xl">{currentSection.title}</CardTitle>
                <CardDescription>{currentSection.description}</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form className="space-y-8">
                    {currentSection.questions.map((question, qIndex) => (
                        <FormField
                        key={question.id}
                        name={question.id}
                        control={form.control}
                        render={() => (
                            <FormItem>
                                <FormLabel className="text-base">{qIndex + 1}. {question.text}</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                    onValueChange={(value) => handleAnswerChange(question.id, value)}
                                    value={answers[question.id]}
                                    className="pt-2 space-y-2"
                                    >
                                    {question.options.map((option) => (
                                        <FormItem key={option} className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value={option} />
                                            </FormControl>
                                            <FormLabel className="font-normal">{option}</FormLabel>
                                        </FormItem>
                                    ))}
                                    </RadioGroup>
                                </FormControl>
                            </FormItem>
                        )}
                        />
                    ))}

                    <div className="flex justify-between pt-4">
                        <Button type="button" variant="outline" onClick={prevSection} disabled={currentSectionIndex === 0}>
                            Previous
                        </Button>
                        {currentSectionIndex < sections.length - 1 ? (
                        <Button type="button" onClick={nextSection} disabled={!isCurrentSectionAnswered()}>
                            Next
                        </Button>
                        ) : (
                        <Button type="button" onClick={onSubmit} disabled={!isCurrentSectionAnswered()}>
                            Finish & See Profile
                        </Button>
                        )}
                    </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    </div>
  );
}
