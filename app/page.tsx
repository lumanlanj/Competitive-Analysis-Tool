'use client';

import { useState } from 'react';
import AnalysisForm from '@/components/AnalysisForm';
import AnalysisDisplay from '@/components/AnalysisDisplay';
import { AnalysisReport } from '@/types/analysis';

export default function Home() {
  const [report, setReport] = useState<AnalysisReport | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalysisSubmit = async (companyName: string, featureFlow: string) => {
    setIsLoading(true);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ companyName, featureFlow }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        console.error('API Error:', errorData);
        throw new Error(errorData.error || 'Analysis failed');
      }

      const data = await response.json();
      setReport(data);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      alert(`Failed to generate analysis: ${errorMessage}\n\nCheck the browser console for details.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewAnalysis = () => {
    setReport(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {!report ? (
          <AnalysisForm onSubmit={handleAnalysisSubmit} isLoading={isLoading} />
        ) : (
          <AnalysisDisplay report={report} onNewAnalysis={handleNewAnalysis} />
        )}
      </div>
    </div>
  );
}
