import { AnalysisSummary } from '@/types/analysis';

interface SummaryCardProps {
  summary: AnalysisSummary;
}

export default function SummaryCard({ summary }: SummaryCardProps) {
  const getConfidenceBadgeColor = (level: string) => {
    switch (level) {
      case 'High':
        return 'bg-green-100 text-green-800 ring-green-600/20';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 ring-yellow-600/20';
      case 'Low':
        return 'bg-red-100 text-red-800 ring-red-600/20';
      default:
        return 'bg-slate-100 text-slate-800 ring-slate-600/20';
    }
  };

  return (
    <section className="rounded-3xl bg-white/80 p-8 shadow-xl backdrop-blur-xl ring-1 ring-slate-900/5">
      <h2 className="mb-6 text-2xl font-semibold text-slate-900">Analysis Summary</h2>

      <div className="grid gap-6 sm:grid-cols-2">
        {/* Company */}
        <div>
          <div className="mb-1 text-sm font-medium text-slate-500">Company</div>
          <div className="text-lg font-semibold text-slate-900">{summary.company}</div>
        </div>

        {/* Feature Analyzed */}
        <div>
          <div className="mb-1 text-sm font-medium text-slate-500">Feature Analyzed</div>
          <div className="text-lg font-semibold text-slate-900">{summary.featureAnalyzed}</div>
        </div>

        {/* Analysis Type */}
        <div>
          <div className="mb-1 text-sm font-medium text-slate-500">Analysis Type</div>
          <div className="inline-flex items-center rounded-lg bg-blue-50 px-3 py-1 text-sm font-medium text-blue-800 ring-1 ring-blue-600/20">
            {summary.analysisType}
          </div>
        </div>

        {/* Sources Found */}
        <div>
          <div className="mb-1 text-sm font-medium text-slate-500">Sources Found</div>
          <div className="text-lg font-semibold text-slate-900">{summary.sourcesFound}</div>
        </div>

        {/* Confidence Level */}
        <div>
          <div className="mb-1 text-sm font-medium text-slate-500">Confidence Level</div>
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center rounded-lg px-3 py-1 text-sm font-medium ring-1 ${getConfidenceBadgeColor(summary.confidenceLevel)}`}>
              {summary.confidenceLevel}
            </span>
            <span className="text-sm text-slate-600">{summary.confidenceExplanation}</span>
          </div>
        </div>

        {/* Generated */}
        <div>
          <div className="mb-1 text-sm font-medium text-slate-500">Generated</div>
          <div className="text-lg font-semibold text-slate-900">
            {new Date(summary.generated).toLocaleString()}
          </div>
        </div>
      </div>
    </section>
  );
}
