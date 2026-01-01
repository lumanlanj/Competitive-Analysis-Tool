'use client';

import { AnalysisReport } from '@/types/analysis';
import SummaryCard from './sections/SummaryCard';
import StepByStep from './sections/StepByStep';
import KeyFeatures from './sections/KeyFeatures';
import UserSentiment from './sections/UserSentiment';
import StrategicSynthesis from './sections/StrategicSynthesis';
import Limitations from './sections/Limitations';

interface AnalysisDisplayProps {
  report: AnalysisReport;
  onNewAnalysis: () => void;
}

export default function AnalysisDisplay({ report, onNewAnalysis }: AnalysisDisplayProps) {
  return (
    <div className="pb-12">
      {/* Header with New Analysis Button */}
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-slate-900">Competitive Analysis</h1>
        <button
          onClick={onNewAnalysis}
          className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 transition-all hover:bg-blue-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          New Analysis
        </button>
      </div>

      {/* Analysis Sections */}
      <div className="space-y-6">
        <SummaryCard summary={report.summary} />
        <StepByStep steps={report.stepByStepExperience} />
        <KeyFeatures features={report.keyFeatures} />
        <UserSentiment sentiments={report.userSentiment} />
        <StrategicSynthesis synthesis={report.strategicSynthesis} />
        <Limitations limitations={report.limitations} />
      </div>
    </div>
  );
}
