'use client';

import { useState } from 'react';
import AnalysisForm from '@/components/AnalysisForm';
import AnalysisDisplay from '@/components/AnalysisDisplay';
import { AnalysisReport } from '@/types/analysis';

export default function Home() {
  const [report, setReport] = useState<AnalysisReport | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Helper function to wait for a specified time
  const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  // Retry logic with exponential backoff
  const fetchWithRetry = async (
    url: string,
    options: RequestInit,
    maxRetries = 3
  ): Promise<Response> => {
    let lastError: Error | null = null;

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        console.log(`API call attempt ${attempt + 1}/${maxRetries}`);

        const response = await fetch(url, options);

        // If successful or client error (4xx), return immediately
        if (response.ok || (response.status >= 400 && response.status < 500)) {
          return response;
        }

        // If server error (5xx) or 529 (Overloaded), retry with backoff
        if (response.status >= 500 || response.status === 529) {
          const errorText = await response.text();
          console.warn(`Server error (${response.status}): ${errorText}`);

          // If this is the last attempt, return the error response
          if (attempt === maxRetries - 1) {
            return response;
          }

          // Exponential backoff: 2s, 4s, 8s
          const delayMs = Math.pow(2, attempt + 1) * 1000;
          console.log(`Retrying in ${delayMs / 1000} seconds...`);
          setErrorMessage(`API is overloaded. Retrying in ${delayMs / 1000} seconds... (Attempt ${attempt + 1}/${maxRetries})`);

          await wait(delayMs);
          continue;
        }

        return response;
      } catch (error) {
        lastError = error instanceof Error ? error : new Error('Network error');
        console.error(`Attempt ${attempt + 1} failed:`, lastError);

        // If this is the last attempt, throw the error
        if (attempt === maxRetries - 1) {
          throw lastError;
        }

        // Exponential backoff for network errors too
        const delayMs = Math.pow(2, attempt + 1) * 1000;
        console.log(`Network error. Retrying in ${delayMs / 1000} seconds...`);
        setErrorMessage(`Network error. Retrying in ${delayMs / 1000} seconds... (Attempt ${attempt + 1}/${maxRetries})`);

        await wait(delayMs);
      }
    }

    throw lastError || new Error('Max retries exceeded');
  };

  const handleAnalysisSubmit = async (companyName: string, featureFlow: string) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      console.log('=== Starting Analysis Request ===');
      console.log('Company:', companyName);
      console.log('Feature/Flow:', featureFlow);

      const response = await fetchWithRetry('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ companyName, featureFlow }),
      }, 3); // Max 3 retries

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        // Try to parse error response
        let errorData: { error?: string } = {};
        const contentType = response.headers.get('content-type');

        try {
          if (contentType && contentType.includes('application/json')) {
            errorData = await response.json();
          } else {
            const textError = await response.text();
            errorData = { error: textError || `HTTP ${response.status}: ${response.statusText}` };
          }
        } catch (parseError) {
          console.error('Failed to parse error response:', parseError);
          errorData = { error: `HTTP ${response.status}: ${response.statusText}` };
        }

        console.error('API Error Details:', {
          status: response.status,
          statusText: response.statusText,
          errorData,
          url: response.url
        });

        // Provide user-friendly error messages based on status code
        let userMessage = errorData.error || 'Analysis failed';

        if (response.status === 529) {
          userMessage = 'The AI service is currently overloaded. We tried multiple times but it\'s still busy. Please try again in a few minutes.';
        } else if (response.status === 500) {
          userMessage = `Server error: ${errorData.error || 'Internal server error'}`;
        } else if (response.status === 429) {
          userMessage = 'Rate limit exceeded. Please wait a moment and try again.';
        } else if (response.status === 401 || response.status === 403) {
          userMessage = 'Authentication error. Please check your API keys in the .env.local file.';
        }

        throw new Error(userMessage);
      }

      const data = await response.json();
      console.log('Analysis completed successfully');
      setReport(data);
      setErrorMessage(null);
    } catch (error) {
      console.error('=== Analysis Request Failed ===');
      console.error('Error object:', error);
      console.error('Error type:', typeof error);
      console.error('Error constructor:', error?.constructor?.name);

      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      console.error('Final error message:', errorMessage);

      setErrorMessage(errorMessage);

      // Show alert with detailed error
      alert(
        `Failed to generate analysis:\n\n${errorMessage}\n\n` +
        `Please check:\n` +
        `- Your internet connection\n` +
        `- API keys are configured in .env.local\n` +
        `- Browser console for more details`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewAnalysis = () => {
    setReport(null);
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Error Banner */}
        {errorMessage && !isLoading && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-4">
            <div className="flex items-start gap-3">
              <svg
                className="h-5 w-5 flex-shrink-0 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-red-900">Error</h3>
                <p className="mt-1 text-sm text-red-700">{errorMessage}</p>
              </div>
              <button
                onClick={() => setErrorMessage(null)}
                className="text-red-600 hover:text-red-800"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Retry Status Message */}
        {isLoading && errorMessage && (
          <div className="mb-4 rounded-xl border border-blue-200 bg-blue-50 p-4">
            <div className="flex items-start gap-3">
              <svg
                className="h-5 w-5 flex-shrink-0 animate-spin text-blue-600"
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
              <p className="text-sm text-blue-700">{errorMessage}</p>
            </div>
          </div>
        )}

        {!report ? (
          <AnalysisForm onSubmit={handleAnalysisSubmit} isLoading={isLoading} />
        ) : (
          <AnalysisDisplay report={report} onNewAnalysis={handleNewAnalysis} />
        )}
      </div>
    </div>
  );
}
