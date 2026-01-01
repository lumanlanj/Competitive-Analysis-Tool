import { StepDetail } from '@/types/analysis';

interface StepByStepProps {
  steps: StepDetail[];
}

export default function StepByStep({ steps }: StepByStepProps) {
  return (
    <section className="rounded-3xl bg-white/80 p-8 shadow-xl backdrop-blur-xl ring-1 ring-slate-900/5">
      <h2 className="mb-6 text-2xl font-semibold text-slate-900">Step-by-Step User Experience</h2>

      <div className="space-y-6">
        {steps.map((step, index) => (
          <div key={index} className="relative flex gap-4">
            {/* Step Number */}
            <div className="flex-shrink-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white shadow-lg shadow-blue-600/30">
                {step.stepNumber}
              </div>
              {index < steps.length - 1 && (
                <div className="mx-auto mt-2 h-full w-0.5 bg-gradient-to-b from-blue-600 to-slate-200" />
              )}
            </div>

            {/* Step Content */}
            <div className="flex-1 pb-8">
              <h3 className="mb-2 text-lg font-semibold text-slate-900">{step.title}</h3>
              <p className="mb-3 text-slate-600">{step.description}</p>

              {step.screenshot && (
                <div className="mb-3">
                  <a
                    href={step.screenshot}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                    View Documentation
                  </a>
                </div>
              )}

              {step.notes && (
                <div className="rounded-lg bg-amber-50 p-3 text-sm text-amber-900 ring-1 ring-amber-600/20">
                  <span className="font-medium">Note:</span> {step.notes}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
