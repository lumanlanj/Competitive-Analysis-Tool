'use client';

import { UserSentiment as UserSentimentType } from '@/types/analysis';
import { useState } from 'react';

interface UserSentimentProps {
  sentiments: UserSentimentType[];
}

export default function UserSentiment({ sentiments }: UserSentimentProps) {
  const [expandedMethodology, setExpandedMethodology] = useState<number | null>(null);

  const toggleMethodology = (index: number) => {
    setExpandedMethodology(expandedMethodology === index ? null : index);
  };

  return (
    <section className="rounded-3xl bg-white/80 p-8 shadow-xl backdrop-blur-xl ring-1 ring-slate-900/5">
      <h2 className="mb-6 text-2xl font-semibold text-slate-900">User Sentiment Analysis</h2>

      <div className="space-y-6">
        {sentiments.map((sentiment, index) => (
          <div key={index} className="rounded-xl border border-slate-200 bg-white p-6">
            {/* Source Header */}
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">{sentiment.source}</h3>
              {sentiment.searchMethodology && (
                <button
                  onClick={() => toggleMethodology(index)}
                  className="text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  {expandedMethodology === index ? 'Hide' : 'How we found this'}
                </button>
              )}
            </div>

            {/* Methodology (Expandable) */}
            {expandedMethodology === index && sentiment.searchMethodology && (
              <div className="mb-4 rounded-lg bg-slate-50 p-4 text-sm text-slate-700">
                <span className="font-medium">Search Methodology:</span> {sentiment.searchMethodology}
              </div>
            )}

            <div className="grid gap-6 sm:grid-cols-2">
              {/* Pain Points */}
              <div>
                <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-900">
                  <svg
                    className="h-5 w-5 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  Common Pain Points
                </h4>
                <ul className="space-y-2">
                  {sentiment.commonPainPoints.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-500" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Praised Features */}
              <div>
                <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-900">
                  <svg
                    className="h-5 w-5 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Praised Features
                </h4>
                <ul className="space-y-2">
                  {sentiment.praisedFeatures.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
