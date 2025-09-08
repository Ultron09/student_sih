import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarCheck, Edit, Award, FileText, Bell } from "lucide-react";
import { ReactNode } from "react";

const timelineData = [
  {
    date: "June 1 - June 30",
    title: "College Admissions Open",
    description: "Online application forms for most government degree colleges are available. Start applying now!",
    icon: <Edit className="h-5 w-5 text-white" />,
    color: "bg-primary"
  },
  {
    date: "July 5 - July 15",
    title: "First Merit/Cut-off Lists",
    description: "Colleges will release their first admission lists. Check websites for your status.",
    icon: <FileText className="h-5 w-5 text-white" />,
    color: "bg-accent"
  },
   {
    date: "July 15 - July 30",
    title: "Document Verification & Fee Payment",
    description: "Selected students to complete admission formalities by verifying documents and paying fees.",
    icon: <CalendarCheck className="h-5 w-5 text-white" />,
    color: "bg-blue-500"
  },
  {
    date: "July 1 - August 31",
    title: "Scholarship Application Period",
    description: "Last day to apply for central and state-level post-matric scholarships on the National Scholarship Portal.",
    icon: <Award className="h-5 w-5 text-white" />,
    color: "bg-green-500"
  },
  {
    date: "August 16",
    title: "Academic Session Commences",
    description: "Classes for the new academic year 2024-25 will officially begin.",
    icon: <Bell className="h-5 w-5 text-white" />,
    color: "bg-purple-500"
  },
];

type TimelineItemProps = {
  date: string;
  title: string;
  description: string;
  icon: ReactNode;
  color: string;
};

const TimelineItem = ({ date, title, description, icon, color }: TimelineItemProps) => (
  <div className="pl-12 relative">
    <div className={`absolute left-0 top-1 h-10 w-10 rounded-full ${color} flex items-center justify-center`}>
      {icon}
    </div>
    <Card className="ml-4">
      <CardHeader>
        <p className="text-sm font-semibold text-primary">{date}</p>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  </div>
);


export default function TimelinePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Important Dates & Timeline</h1>
        <p className="text-muted-foreground mt-2">
          Keep track of important deadlines for admissions, scholarships, and exams for the 2024-25 academic year.
        </p>
      </div>

      <div className="relative">
        <div className="absolute left-5 top-0 h-full w-0.5 bg-border -z-10"></div>
        <div className="space-y-12">
          {timelineData.map((item, index) => (
            <TimelineItem key={index} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}
