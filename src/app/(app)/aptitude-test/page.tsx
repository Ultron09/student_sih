import { AptitudeTestForm } from "./AptitudeTestForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AptitudeTestPage() {
  return (
    <div className="max-w-3xl mx-auto">
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl font-headline">Aptitude & Interest Assessment</CardTitle>
                <CardDescription>
                Answer a few questions about your interests and strengths to discover which academic streams and career paths are the best fit for you. This quick quiz will help you make a more informed decision.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <AptitudeTestForm />
            </CardContent>
        </Card>
    </div>
  );
}
