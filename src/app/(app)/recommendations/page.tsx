import { RecommendationsForm } from "./RecommendationsForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function RecommendationsPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-headline">Personalized Recommendations</CardTitle>
          <CardDescription>
            Fill in your details to receive AI-powered recommendations for courses, colleges, and career paths tailored just for you. The more information you provide, the better the suggestions will be.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RecommendationsForm />
        </CardContent>
      </Card>
    </div>
  );
}
