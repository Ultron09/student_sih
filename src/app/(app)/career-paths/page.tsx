import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, GraduationCap, ArrowRight, Building, PenTool, Code, Palette, Film, Landmark, Atom, ScrollText, Drama, Music } from "lucide-react";

const careerData = {
  science: [
    {
      degree: "B.Sc. (Bachelor of Science)",
      description: "A foundational degree in various scientific disciplines, opening doors to research, academia, and specialized industries.",
      paths: [
        { 
          title: "Higher Education", 
          icon: GraduationCap, 
          options: ["M.Sc. in various specializations (Physics, Chemistry, etc.)", "MCA for a career in IT", "MBA for management roles", "Ph.D. for research and academia"] 
        },
        { 
          title: "Government Jobs", 
          icon: Landmark, 
          options: ["UPSC Civil Services", "SSC CGL", "Bank PO", "Scientific Assistant in ISRO/DRDO", "Forest Ranger/Officer", "Food Inspector"] 
        },
        { 
          title: "Private Sector Jobs", 
          icon: Building, 
          options: ["Research Analyst", "Data Scientist / Analyst", "Quality Control Chemist", "Lab Technician", "IT Support Professional", "Medical Writer"] 
        },
        { 
          title: "Entrepreneurship", 
          icon: PenTool, 
          options: ["Starting a tech blog or YouTube channel", "Scientific Equipment Supplier", "Private Tutoring or Coaching Institutes", "Agri-business"] 
        },
      ]
    },
    {
      degree: "B.Tech/B.E. (Engineering)",
      description: "A professional degree focused on applying scientific principles to design and build machines, structures, and systems.",
       paths: [
        { 
          title: "Higher Education", 
          icon: GraduationCap, 
          options: ["M.Tech in specialization", "M.S. from universities abroad", "MBA for techno-managerial roles", "Ph.D. in Engineering"] 
        },
        { 
          title: "Government Jobs", 
          icon: Landmark, 
          options: ["IES (Indian Engineering Services)", "PSU Jobs (NTPC, BHEL, IOCL)", "State Engineering Services", "Scientist in DRDO/ISRO"] 
        },
        { 
          title: "Private Sector Jobs", 
          icon: Building, 
          options: ["Software Developer / Engineer", "Core Engineering Roles (Civil, Mechanical, Electrical)", "Product Manager", "Management Consultant", "Data Analyst"] 
        },
      ]
    },
  ],
  commerce: [
    {
      degree: "B.Com (Bachelor of Commerce)",
      description: "A degree focusing on business, finance, accounting, and economic principles.",
       paths: [
        { 
          title: "Higher Education", 
          icon: GraduationCap, 
          options: ["M.Com", "MBA (Finance, Marketing, HR)", "CA (Chartered Accountancy)", "CS (Company Secretary)", "CMA (Cost and Management Accountant)"] 
        },
        { 
          title: "Government Jobs", 
          icon: Landmark, 
          options: ["RBI Grade B Officer", "SEBI Grade A Officer", "Bank PO / Clerk", "Accountant in Govt. Depts.", "UPSC/SSC"] 
        },
        { 
          title: "Private Sector Jobs", 
          icon: Building, 
          options: ["Accountant", "Financial Analyst", "Tax Consultant", "Auditor", "E-commerce Manager", "Stockbroker", "Insurance Advisor"] 
        },
         { 
          title: "Entrepreneurship", 
          icon: PenTool, 
          options: ["Retail Business", "Financial Advisory Firm", "E-commerce Store", "Startup in Fintech"] 
        },
      ]
    },
  ],
  arts: [
    {
      degree: "B.A. (Bachelor of Arts)",
      description: "A versatile degree covering humanities, social sciences, and liberal arts, leading to a wide range of careers.",
       paths: [
        { 
          title: "Higher Education", 
          icon: GraduationCap, 
          options: ["M.A. in a chosen subject", "MBA", "Journalism & Mass Communication", "Law (LLB)", "Bachelor of Education (B.Ed)"] 
        },
        { 
          title: "Government Jobs", 
          icon: Landmark, 
          options: ["UPSC Civil Services (IAS, IPS, IFS)", "State Public Service Commissions", "Archaeological Survey of India", "Translator in Government offices"] 
        },
        { 
          title: "Private Sector Jobs", 
          icon: Building, 
          options: ["Content Writer / Editor", "Journalist / Reporter", "HR Manager / Recruiter", "Social Media Manager", "Public Relations Officer", "Policy Analyst"] 
        },
      ]
    },
  ],
  vocational: [
    {
      degree: "B.Voc (Bachelor of Vocation)",
      description: "A skill-based degree focusing on practical training for specific trades and industries.",
      paths: [
        { 
          title: "Job Roles", 
          icon: Briefcase, 
          options: ["Web Developer", "Graphic Designer", "Digital Marketing Specialist", "Fashion Designer", "Animator", "Hotel Manager", "Automobile Technician"] 
        },
        { 
          title: "Higher Education", 
          icon: GraduationCap, 
          options: ["M.Voc", "Specialized Diploma courses", "MBA in relevant field"] 
        },
        { 
          title: "Entrepreneurship", 
          icon: PenTool, 
          options: ["Freelancing (Design, Development)", "Boutique/Design Studio", "Digital Marketing Agency", "Specialty food service"] 
        },
      ]
    },
     {
      degree: "Diploma Courses",
      description: "Short-term courses offering specialized skills for quick entry into the workforce.",
      paths: [
        { 
          title: "Technical Fields", 
          icon: Code,
          options: ["Diploma in Computer Applications (DCA)", "Diploma in Web Designing", "Diploma in IT"] 
        },
        { 
          title: "Creative Fields", 
          icon: Palette,
          options: ["Diploma in Graphic Designing", "Diploma in 3D Animation & VFX", "Diploma in Interior Design"] 
        },
         { 
          title: "Media & Entertainment", 
          icon: Film,
          options: ["Diploma in Film Making", "Diploma in Photography", "Diploma in Event Management"] 
        },
      ]
    },
  ]
};

type Stream = keyof typeof careerData;

const CareerPathCard = ({ degree, description, paths }: {degree: string, description: string, paths: any[]}) => (
  <Card>
    <CardHeader>
      <CardTitle>{degree}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent>
      <Accordion type="multiple" className="w-full">
        {paths.map(path => (
          <AccordionItem key={path.title} value={path.title}>
            <AccordionTrigger>
              <div className="flex items-center gap-3">
                <path.icon className="h-5 w-5 text-accent" />
                <span className="font-semibold">{path.title}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <ul className="pl-4 space-y-2">
                {path.options.map((option: string) => (
                  <li key={option} className="flex items-start">
                    <ArrowRight className="h-4 w-4 text-primary mr-2 mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">{option}</span>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </CardContent>
  </Card>
);


export default function CareerPathsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Course-to-Career Path Mapping</h1>
        <p className="text-muted-foreground mt-2">
          Understand what each degree offers, the industries it leads to, and the options available after graduation.
        </p>
      </div>
      <Tabs defaultValue="science" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="science"><Atom className="mr-2"/>Science</TabsTrigger>
          <TabsTrigger value="commerce"><Briefcase className="mr-2"/>Commerce</TabsTrigger>
          <TabsTrigger value="arts"><ScrollText className="mr-2"/>Arts</TabsTrigger>
          <TabsTrigger value="vocational"><PenTool className="mr-2"/>Vocational</TabsTrigger>
        </TabsList>
        {(Object.keys(careerData) as Stream[]).map(stream => (
          <TabsContent key={stream} value={stream}>
            <div className="grid gap-6 mt-6 md:grid-cols-1 lg:grid-cols-2">
              {careerData[stream].map(course => (
                <CareerPathCard key={course.degree} {...course} />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
