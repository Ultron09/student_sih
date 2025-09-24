
"use client";

import { createContext, useState, ReactNode } from 'react';
import { type AptitudeAssessmentOutput } from '@/ai/flows/aptitude-assessment-quiz';

interface AptitudeContextType {
  aptitudeResult: AptitudeAssessmentOutput | null;
  setAptitudeResult: (result: AptitudeAssessmentOutput | null) => void;
}

export const AptitudeContext = createContext<AptitudeContextType>({
  aptitudeResult: null,
  setAptitudeResult: () => {},
});

export const AptitudeProvider = ({ children }: { children: ReactNode }) => {
  const [aptitudeResult, setAptitudeResult] = useState<AptitudeAssessmentOutput | null>(null);

  return (
    <AptitudeContext.Provider value={{ aptitudeResult, setAptitudeResult }}>
      {children}
    </AptitudeContext.Provider>
  );
};
