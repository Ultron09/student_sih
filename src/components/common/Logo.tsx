import { GraduationCap } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-3 p-2">
      <GraduationCap className="h-10 w-10 text-primary" />
      <h1 className="text-2xl font-bold font-headline tracking-tight text-foreground">
        Disha Marg
      </h1>
    </div>
  );
}
