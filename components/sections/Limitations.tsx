import { Limitations as LimitationsType } from '@/types/analysis';

interface LimitationsProps {
  limitations: LimitationsType;
}

export default function Limitations({ limitations }: LimitationsProps) {
  return (
    <section className="rounded-3xl bg-slate-50/80 p-8 shadow-xl backdrop-blur-xl ring-1 ring-slate-900/5">
      <h2 className="mb-6 text-2xl font-semibold text-slate-900">Limitations & Methodology</h2>

      <div className="space-y-4">
        {/* Data Sources */}
        <div className="rounded-xl bg-white p-5">
          <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
            <svg
              className="h-5 w-5 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Data Sources
          </h3>
          <p className="text-sm text-slate-600">{limitations.dataSources}</p>
        </div>

        {/* Not Included */}
        <div className="rounded-xl bg-white p-5">
          <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
            <svg
              className="h-5 w-5 text-amber-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Not Included
          </h3>
          <p className="text-sm text-slate-600">{limitations.notIncluded}</p>
        </div>

        {/* Recency */}
        <div className="rounded-xl bg-white p-5">
          <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
            <svg
              className="h-5 w-5 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Recency
          </h3>
          <p className="text-sm text-slate-600">{limitations.recency}</p>
        </div>
      </div>
    </section>
  );
}
