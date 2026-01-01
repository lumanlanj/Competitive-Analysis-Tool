'use client';

import { useState, useEffect } from 'react';

interface AnalysisFormProps {
  onSubmit: (companyName: string, featureFlow: string) => void;
  isLoading: boolean;
}

export default function AnalysisForm({ onSubmit, isLoading }: AnalysisFormProps) {
  const [companyName, setCompanyName] = useState('');
  const [featureFlow, setFeatureFlow] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (companyName.trim() && featureFlow.trim()) {
      onSubmit(companyName.trim(), featureFlow.trim());
    }
  };

  // Handle CMD + Enter keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault();
        if (companyName.trim() && featureFlow.trim() && !isLoading) {
          onSubmit(companyName.trim(), featureFlow.trim());
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [companyName, featureFlow, isLoading, onSubmit]);

  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-3 text-5xl font-semibold tracking-tight text-slate-900">
            UX Competitive Analysis
          </h1>
          <p className="text-lg text-slate-600">
            Analyze competitor UX flows and design choices in minutes
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-3xl bg-white/80 p-8 shadow-xl backdrop-blur-xl ring-1 ring-slate-900/5">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Company Name Input */}
            <div>
              <label htmlFor="company" className="mb-2 block text-sm font-medium text-slate-900">
                Company Name
              </label>
              <input
                id="company"
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g., Spotify, Amazon, Netflix"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                disabled={isLoading}
                required
              />
            </div>

            {/* Feature/Flow Input */}
            <div>
              <label htmlFor="feature" className="mb-2 block text-sm font-medium text-slate-900">
                Feature or Flow to Analyze
              </label>
              <textarea
                id="feature"
                value={featureFlow}
                onChange={(e) => setFeatureFlow(e.target.value)}
                placeholder="e.g., Creating a personalized playlist, Checkout flow, User onboarding"
                rows={4}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                disabled={isLoading}
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || companyName.trim() === '' || featureFlow.trim() === ''}
              className="w-full rounded-xl bg-blue-600 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-600/30 transition-all hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-400 disabled:shadow-none disabled:opacity-60"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="h-5 w-5 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Researching & Analyzing...
                </span>
              ) : (
                'Generate Analysis'
              )}
            </button>
          </form>

          {/* Example Hint */}
          <div className="mt-6 space-y-3 rounded-xl bg-slate-50 p-4">
            <p className="text-sm text-slate-600">
              <span className="font-medium text-slate-900">Demo example:</span> Try analyzing
              Spotify&apos;s step-by-step experience of creating a personalized playlist
            </p>
            <p className="text-xs text-slate-500">
              💡 Tip: Press <kbd className="rounded bg-white px-1.5 py-0.5 font-mono text-slate-700 shadow-sm ring-1 ring-slate-200">⌘</kbd> + <kbd className="rounded bg-white px-1.5 py-0.5 font-mono text-slate-700 shadow-sm ring-1 ring-slate-200">Enter</kbd> to submit
            </p>
          </div>
        </div>

        {/* Value Proposition */}
        <div className="mt-8 text-center text-sm text-slate-500">
          Save 4-8 hours on competitive research. Get comprehensive UX analysis in under 30 seconds.
        </div>
      </div>
    </div>
  );
}
