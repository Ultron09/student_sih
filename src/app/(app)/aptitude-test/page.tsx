import { AptitudeTestForm } from "./AptitudeTestForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AptitudeTestPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold font-headline mb-2">Aptitude & Interest Assessment</h1>
      <p className="text-muted-foreground mb-6">
        This comprehensive test helps you understand your strengths, interests, and preferred learning style to guide you toward the right academic and career path.
      </p>
      <AptitudeTestForm />
    </div>
  );
}
