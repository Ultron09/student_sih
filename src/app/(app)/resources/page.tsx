import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BookOpen, Star, ArrowRight } from "lucide-react";

const studyMaterials = [
  {
    title: "NCERT Textbooks",
    description: "Download free PDF versions of all NCERT textbooks from Class I to XII.",
    link: "https://ncert.nic.in/textbook.php",
  },
  {
    title: "NPTEL Courses",
    description: "Access free online courses from IITs and IISc on a wide range of engineering and science subjects.",
    link: "https://nptel.ac.in/",
  },
  {
    title: "e-PG Pathshala",
    description: "A gateway to all post-graduate e-books and courses, covering various subjects in arts, science, and commerce.",
    link: "https://epgp.inflibnet.ac.in/",
  },
  {
    title: "SWAYAM",
    description: "An integrated platform for online courses, offering a wide range of subjects from school to post-graduate level.",
    link: "https://swayam.gov.in/",
  },
];

const scholarships = [
  {
    title: "National Scholarship Portal (NSP)",
    description: "A one-stop solution for various scholarship schemes offered by Central and State Governments.",
    link: "https://scholarships.gov.in/",
  },
  {
    title: "PM YASASVI Scheme",
    description: "Scholarships for meritorious students from OBC, EBC, and DNT categories.",
    link: "https://yet.nta.ac.in/",
  },
  {
    title: "INSPIRE Scholarship (SHE)",
    description: "Scholarship for Higher Education (SHE) for students pursuing science streams in higher education.",
    link: "https://www.online-inspire.gov.in/",
  },
  {
    title: "State Scholarship Portals",
    description: "Most states have their own scholarship portals for state-specific schemes. Search for your state's portal online.",
    link: "https://www.google.com/search?q=state+scholarship+portal",
  },
];


export default function ResourcesPage() {
  return (
    <div className="space-y-12">
      <section>
        <div className="flex items-center gap-4 mb-6">
          <BookOpen className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold font-headline">Study Materials</h1>
            <p className="text-muted-foreground mt-1">Access open-source e-books, courses, and other learning resources.</p>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {studyMaterials.map((material) => (
            <Card key={material.title} className="flex flex-col">
              <CardHeader>
                <CardTitle>{material.title}</CardTitle>
                <CardDescription className="pt-2">{material.description}</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto">
                <Link href={material.link} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="w-full">
                    Visit Website <ArrowRight className="ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center gap-4 mb-6">
          <Star className="h-8 w-8 text-accent" />
          <div>
            <h1 className="text-3xl font-bold font-headline">Scholarships</h1>
            <p className="text-muted-foreground mt-1">Find and apply for scholarships to support your education.</p>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {scholarships.map((scholarship) => (
            <Card key={scholarship.title} className="flex flex-col">
              <CardHeader>
                <CardTitle>{scholarship.title}</CardTitle>
                <CardDescription className="pt-2">{scholarship.description}</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto">
                <Link href={scholarship.link} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="w-full">
                    Learn More <ArrowRight className="ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
