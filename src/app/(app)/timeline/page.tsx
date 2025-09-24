import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarCheck, Edit, Award, FileText, Bell } from "lucide-react";
import { ReactNode } from "react";
import Link from "next/link";

interface NewsArticle {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

const getNews = async (): Promise<NewsArticle[]> => {
    if (!process.env.NEWS_API_KEY || process.env.NEWS_API_KEY === "your_news_api_key_here") {
        console.warn("NewsAPI key not found. Please add it to your .env file. Showing static data instead.");
        return [];
    }

    try {
        const query = encodeURIComponent('education OR admissions OR "entrance exam" OR scholarship OR UPSC OR JEE OR NEET OR CUET');
        const url = `https://newsapi.org/v2/everything?q=${query}&language=en&sortBy=publishedAt&pageSize=10&apiKey=${process.env.NEWS_API_KEY}`;
        const res = await fetch(url, { next: { revalidate: 3600 } }); // Revalidate every hour
        const data = await res.json();
        
        if (data.status === "ok") {
            return data.articles;
        } else {
            console.error("Error fetching news:", data.message);
            return [];
        }
    } catch (error) {
        console.error("Failed to fetch news from NewsAPI:", error);
        return [];
    }
};

const staticTimelineData = [
  {
    date: "June 1 - June 30",
    title: "College Admissions Open",
    description: "Online application forms for most government degree colleges are available. Start applying now!",
    icon: <Edit className="h-5 w-5 text-white" />,
    color: "bg-primary",
    url: "#"
  },
  {
    date: "July 5 - July 15",
    title: "First Merit/Cut-off Lists",
    description: "Colleges will release their first admission lists. Check websites for your status.",
    icon: <FileText className="h-5 w-5 text-white" />,
    color: "bg-accent",
    url: "#"
  },
   {
    date: "July 15 - July 30",
    title: "Document Verification & Fee Payment",
    description: "Selected students to complete admission formalities by verifying documents and paying fees.",
    icon: <CalendarCheck className="h-5 w-5 text-white" />,
    color: "bg-blue-500",
    url: "#"
  },
];


type TimelineItemProps = {
  date: string;
  title: string;
  description: string;
  icon: ReactNode;
  color: string;
  url: string;
};

const TimelineItem = ({ date, title, description, url, icon, color }: TimelineItemProps) => (
  <Link href={url} target="_blank" rel="noopener noreferrer" className="block pl-12 relative group">
    <div className={`absolute left-0 top-1 h-10 w-10 rounded-full ${color} flex items-center justify-center`}>
      {icon}
    </div>
    <Card className="ml-4 transition-all duration-300 group-hover:border-primary group-hover:shadow-md">
      <CardHeader>
        <p className="text-sm font-semibold text-primary">{date}</p>
        <CardTitle className="group-hover:text-primary">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  </Link>
);


export default async function TimelinePage() {
  const newsItems = await getNews();
  const timelineItems = newsItems.length > 0 
    ? newsItems.map((item, index) => {
        const colors = ["bg-primary", "bg-accent", "bg-blue-500", "bg-green-500", "bg-purple-500"];
        const icons = [FileText, Award, CalendarCheck, Edit, Bell];
        const Icon = icons[index % icons.length];

        return {
            date: new Date(item.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric' }),
            title: item.title,
            description: item.description || "Click to read more.",
            icon: <Icon className="h-5 w-5 text-white" />,
            color: colors[index % colors.length],
            url: item.url
        }
    })
    : staticTimelineData;


  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Important Dates & Timeline</h1>
        <p className="text-muted-foreground mt-2">
          Keep track of important deadlines for admissions, scholarships, and exams for the 2024-25 academic year.
        </p>
      </div>
      
      {newsItems.length === 0 && (
          <Card className="bg-amber-50 border border-amber-200">
              <CardHeader>
                  <CardTitle className="text-amber-800">Live News Not Available</CardTitle>
                  <CardDescription className="text-amber-700">
                      Could not fetch real-time news. This could be because the NewsAPI.org key is missing or invalid. Please check your `.env` file. Displaying static placeholder data instead.
                  </CardDescription>
              </CardHeader>
          </Card>
      )}

      <div className="relative">
        <div className="absolute left-5 top-0 h-full w-0.5 bg-border -z-10"></div>
        <div className="space-y-12">
          {timelineItems.map((item, index) => (
            <TimelineItem key={index} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}