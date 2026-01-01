import { StrategicSynthesis as StrategicSynthesisType } from '@/types/analysis';

interface StrategicSynthesisProps {
  synthesis: StrategicSynthesisType;
}

export default function StrategicSynthesis({ synthesis }: StrategicSynthesisProps) {
  const getFrequencyColor = (frequency: string) => {
    switch (frequency) {
      case 'High':
        return 'bg-red-100 text-red-800 ring-red-600/20';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 ring-yellow-600/20';
      case 'Low':
        return 'bg-green-100 text-green-800 ring-green-600/20';
      default:
        return 'bg-slate-100 text-slate-800 ring-slate-600/20';
    }
  };

  return (
    <section className="rounded-3xl bg-white/80 p-8 shadow-xl backdrop-blur-xl ring-1 ring-slate-900/5">
      <h2 className="mb-6 text-2xl font-semibold text-slate-900">Strategic Synthesis</h2>

      <div className="space-y-8">
        {/* Strategic Bets */}
        <div>
          <h3 className="mb-4 text-lg font-semibold text-slate-900">Strategic Bets</h3>
          <div className="space-y-4">
            {synthesis.strategicBets.map((bet, index) => (
              <div key={index} className="rounded-xl border border-slate-200 bg-white p-5">
                <h4 className="mb-3 font-semibold text-slate-900">{bet.bet}</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex gap-2">
                    <span className="font-medium text-slate-700">Rationale:</span>
                    <span className="text-slate-600">{bet.rationale}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium text-slate-700">Tradeoff:</span>
                    <span className="text-slate-600">{bet.tradeoff}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Competitive Positioning */}
        <div>
          <h3 className="mb-4 text-lg font-semibold text-slate-900">Competitive Positioning</h3>
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <div className="mb-1 text-sm font-medium text-slate-500">Target Segment</div>
                <div className="text-slate-900">{synthesis.competitivePositioning.targetSegment}</div>
              </div>
              <div>
                <div className="mb-1 text-sm font-medium text-slate-500">Differentiation Strategy</div>
                <div className="text-slate-900">
                  {synthesis.competitivePositioning.differentiationStrategy}
                </div>
              </div>
              <div>
                <div className="mb-1 text-sm font-medium text-slate-500">Pricing/Value Positioning</div>
                <div className="text-slate-900">
                  {synthesis.competitivePositioning.pricingValuePositioning}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key User Complaints Summary */}
        <div>
          <h3 className="mb-4 text-lg font-semibold text-slate-900">
            Key User Complaints Summary
          </h3>
          <div className="space-y-3">
            {synthesis.keyComplaints.map((complaint, index) => (
              <div
                key={index}
                className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4"
              >
                <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-700">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-900">{complaint.complaint}</span>
                    <span
                      className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ring-1 ${getFrequencyColor(complaint.frequency)}`}
                    >
                      {complaint.frequency}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
