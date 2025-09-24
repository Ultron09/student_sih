
"use client";

import { useContext } from "react";
import Link from "next/link";
import { RecommendationsForm } from "./RecommendationsForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AptitudeContext } from "@/context/AptitudeContext";
import { ArrowRight, Lightbulb } from "lucide-react";

export default function RecommendationsPage() {
  const { aptitudeResult } = useContext(AptitudeContext);

  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-headline">Personalized Recommendations</CardTitle>
          <CardDescription>
            Fill in your details to receive AI-powered recommendations for courses, colleges, and career paths tailored just for you. For the best results, take our aptitude test first.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {aptitudeResult ? (
            <RecommendationsForm />
          ) : (
            <Card className="text-center bg-secondary/50 p-8">
              <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2 font-headline">
                  <Lightbulb className="h-6 w-6 text-primary" />
                  Take the Aptitude Test First
                </CardTitle>
                <CardDescription className="mt-2">
                  To get the most accurate and personalized recommendations, we need to understand your strengths and interests.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/aptitude-test">
                  <Button size="lg">
                    Take the Test <ArrowRight className="ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
