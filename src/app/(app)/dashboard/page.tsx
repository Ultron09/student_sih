import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Lightbulb,
  Sparkles,
  Building2,
  Briefcase,
  ArrowRight,
  Book,
} from "lucide-react";
import Image from "next/image";

const features = [
  {
    icon: Lightbulb,
    title: "Aptitude Test",
    description: "Discover your strengths and interests to find the perfect stream for you.",
    href: "/aptitude-test",
    cta: "Take the Test",
  },
  {
    icon: Sparkles,
    title: "AI Recommendations",
    description: "Get personalized course, college, and career suggestions based on your profile.",
    href: "/recommendations",
    cta: "Get Suggestions",
  },
  {
    icon: Building2,
    title: "College Directory",
    description: "Explore nearby government colleges, programs, and facilities.",
    href: "/colleges",
    cta: "Explore Colleges",
  },
  {
    icon: Briefcase,
    title: "Career Paths",
    description: "Visualize the career opportunities that different degree courses unlock.",
    href: "/career-paths",
    cta: "View Paths",
  },
  {
    icon: Book,
    title: "Resources",
    description: "Find valuable study materials and scholarship information.",
    href: "/resources",
    cta: "View Resources",
  },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <Card className="overflow-hidden">
        <div className="grid md:grid-cols-2">
          <div className="p-8 md:p-10 flex flex-col justify-center">
            <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary-foreground bg-primary -ml-10 md:-ml-12 pl-10 md:pl-12 pr-4 py-2 rounded-r-full self-start mb-4">
              Welcome, Student!
            </h1>
            <p className="mt-2 text-lg text-muted-foreground max-w-prose">
              Your journey to a successful career starts here. Disha Marg provides you with the tools and guidance to make informed decisions about your future. Let's explore your options together.
            </p>
            <div className="mt-6">
              <Link href="/aptitude-test">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                  Get Started <ArrowRight className="ml-2" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative h-64 md:h-full min-h-[250px]">
             <Image
                src="https://picsum.photos/seed/1/600/400"
                alt="A group of students collaborating and looking at a laptop."
                fill
                className="object-cover"
                data-ai-hint="students collaborating"
              />
          </div>
        </div>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.title} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center gap-4">
                <feature.icon className="h-8 w-8 text-accent" />
                <CardTitle className="text-xl font-headline">{feature.title}</CardTitle>
              </div>
              <CardDescription className="pt-2">{feature.description}</CardDescription>
            </CardHeader>
            <CardContent className="mt-auto">
              <Link href={feature.href}>
                <Button variant="outline" className="w-full">
                  {feature.cta} <ArrowRight className="ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
