"use client";

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Building2, LocateIcon, Phone, BookOpen, UserCheck, Wifi, Library, FlaskConical, Home, Utensils, Bus } from 'lucide-react';
import { collegesData } from '@/data/colleges';

const facilityIcons: { [key: string]: React.ElementType } = {
  'Hostel': Home,
  'Advanced Labs': FlaskConical,
  'Central Library': Library,
  'Wi-Fi Campus': Wifi,
  'Canteen': Utensils,
  'Bus Service': Bus,
  'Sports Complex': UserCheck,
  'Sports Facilities': UserCheck,
};

export default function CollegesPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredColleges = useMemo(() => {
    if (!searchTerm) return collegesData;
    return collegesData.filter(college =>
      college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      college.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      college.programs.some(p => p.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Nearby Government Colleges</h1>
        <p className="text-muted-foreground mt-2">Find the right college for you. Search by name, location, or course.</p>
      </div>

      <div className="sticky top-16 bg-background/80 backdrop-blur-sm py-4 z-10 -mt-2">
        <Input
          placeholder="Search colleges, locations, or courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-lg"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredColleges.map((college, index) => (
          <Card key={index} className="flex flex-col overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 shadow-sm hover:shadow-xl">
            <div className="relative h-48 w-full">
              <Image src={college.imageUrl} alt={college.name} fill className="object-cover" data-ai-hint={college.aiHint} />
            </div>
            <CardHeader>
              <CardTitle className="flex items-start gap-2">
                <Building2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <span>{college.name}</span>
              </CardTitle>
              <CardDescription className="flex items-center gap-2 pt-1"><LocateIcon className="h-4 w-4"/>{college.location}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm flex-grow">
              <div>
                <h4 className="font-semibold flex items-center gap-2"><BookOpen className="h-4 w-4 text-accent"/>Programs Offered</h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  {college.programs.map(p => <Badge key={p} variant="secondary">{p}</Badge>)}
                </div>
              </div>
              <div>
                <h4 className="font-semibold flex items-center gap-2"><UserCheck className="h-4 w-4 text-accent"/>Eligibility</h4>
                <p className="text-muted-foreground mt-1">Minimum {college.cutoff} cutoff. Medium: {college.medium}.</p>
              </div>
              <div>
                <h4 className="font-semibold flex items-center gap-2"><Wifi className="h-4 w-4 text-accent"/>Facilities</h4>
                 <div className="flex flex-wrap gap-4 mt-2">
                  {college.facilities.map(f => {
                    const Icon = facilityIcons[f] || Wifi;
                    return <div key={f} className="flex items-center gap-1 text-muted-foreground"><Icon className="h-4 w-4" /><span>{f}</span></div>
                  })}
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-muted/50 p-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4"/> Contact: {college.contact}
              </div>
            </CardFooter>
          </Card>
        ))}
         {filteredColleges.length === 0 && (
          <div className="md:col-span-2 xl:col-span-3 text-center py-16">
            <p className="text-muted-foreground">No colleges found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
