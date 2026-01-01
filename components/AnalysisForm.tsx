'use client';

import { useState, useEffect, useRef } from 'react';

interface AnalysisFormProps {
  onSubmit: (companyName: string, featureFlow: string) => void;
  isLoading: boolean;
}

export default function AnalysisForm({ onSubmit, isLoading }: AnalysisFormProps) {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      // Parse the message to extract company and feature
      // Expected format: "Analyze [Company]'s [feature/flow]"
      // But we'll accept any message and try to parse it intelligently
      parseAndSubmit(message.trim());
    }
  };

  const parseAndSubmit = (msg: string) => {
    // Simple parsing: look for patterns like "Spotify's playlist creation"
    // or "analyze Netflix's recommendation flow"

    // For now, we'll use a simple approach:
    // If the message contains "'s", split on that
    const possessiveMatch = msg.match(/([^']+)'s\s+(.+)/i);

    if (possessiveMatch) {
      const company = possessiveMatch[1].trim();
      const feature = possessiveMatch[2].trim();
      onSubmit(company, feature);
    } else {
      // Fallback: ask user to use specific format
      // For MVP, we'll just pass the whole message as feature and "Unknown" as company
      // In production, you'd want better NLP or a clarification step
      alert('Please use the format: "Analyze [Company]\'s [feature/flow]"\n\nExample: "Analyze Spotify\'s playlist creation flow"');
    }

    setMessage('');
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [message]);

  // Handle CMD/Ctrl + Enter keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault();
        if (message.trim() && !isLoading) {
          parseAndSubmit(message.trim());
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [message, isLoading, onSubmit]);

  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <div className="border-b border-slate-200 bg-white/80 px-6 py-4 backdrop-blur-xl">
        <h1 className="text-lg font-semibold text-slate-900">
          UX Competitive Analysis
        </h1>
      </div>

      {/* Main Content Area - Empty State */}
      <div className="flex flex-1 flex-col items-center justify-center px-4">
        <div className="max-w-2xl text-center">
          <div className="mb-8">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
              <svg
                className="h-8 w-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h2 className="mb-3 text-3xl font-semibold tracking-tight text-slate-900">
              Analyze competitor UX flows
            </h2>
            <p className="text-lg text-slate-600">
              Get comprehensive competitive analysis in under 30 seconds
            </p>
          </div>

          {/* Example Prompts */}
          <div className="space-y-3">
            <p className="text-sm font-medium text-slate-700">Try asking:</p>
            <div className="grid gap-2">
              <button
                onClick={() => setMessage("Analyze Spotify's playlist creation flow")}
                disabled={isLoading}
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-left text-sm text-slate-700 transition-all hover:border-blue-300 hover:bg-blue-50 disabled:opacity-50"
              >
                Analyze Spotify&apos;s playlist creation flow
              </button>
              <button
                onClick={() => setMessage("Analyze Amazon's one-click checkout experience")}
                disabled={isLoading}
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-left text-sm text-slate-700 transition-all hover:border-blue-300 hover:bg-blue-50 disabled:opacity-50"
              >
                Analyze Amazon&apos;s one-click checkout experience
              </button>
              <button
                onClick={() => setMessage("Analyze Netflix's content recommendation system")}
                disabled={isLoading}
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-left text-sm text-slate-700 transition-all hover:border-blue-300 hover:bg-blue-50 disabled:opacity-50"
              >
                Analyze Netflix&apos;s content recommendation system
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Input Area - Fixed at Bottom */}
      <div className="border-t border-slate-200 bg-white px-4 py-4">
        <div className="mx-auto max-w-3xl">
          <form onSubmit={handleSubmit} className="relative">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Analyze [Company]'s [feature/flow]..."
              disabled={isLoading}
              rows={1}
              className="max-h-[200px] min-h-[52px] w-full resize-none rounded-2xl border border-slate-300 bg-white px-4 py-3 pr-12 text-slate-900 placeholder-slate-400 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:bg-slate-50 disabled:text-slate-500"
              style={{ paddingRight: '3rem' }}
            />

            {/* Send Button */}
            <button
              type="submit"
              disabled={isLoading || !message.trim()}
              className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white transition-all hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <svg
                  className="h-4 w-4 animate-spin"
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
              ) : (
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
                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                  />
                </svg>
              )}
            </button>
          </form>

          {/* Hint Text */}
          <p className="mt-2 text-center text-xs text-slate-500">
            <kbd className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-slate-700">⌘</kbd> + <kbd className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-slate-700">Enter</kbd> to send
          </p>
        </div>
      </div>
    </div>
  );
}
