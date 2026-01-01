import { NextRequest, NextResponse } from 'next/server';
import { AnalysisReport } from '@/types/analysis';

// Helper function to conduct research using Perplexity
async function conductResearch(companyName: string, featureFlow: string) {
  const perplexityKey = process.env.PERPLEXITY_API_KEY;

  if (!perplexityKey) {
    console.warn('Perplexity API key not configured, skipping research step');
    return null;
  }

  const researchQueries = [
    `How does ${companyName} implement ${featureFlow}? Provide step-by-step details of the user experience.`,
    `What are the key features of ${companyName}'s ${featureFlow}? What platforms is it available on?`,
    `What do users say about ${companyName}'s ${featureFlow}? Include both complaints and praise from app stores, Reddit, and social media.`,
    `What is ${companyName}'s strategic approach to ${featureFlow}? How do they differentiate from competitors?`
  ];

  const researchResults = [];

  for (const query of researchQueries) {
    try {
      const response = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${perplexityKey}`,
        },
        body: JSON.stringify({
          model: 'llama-3.1-sonar-large-128k-online',
          messages: [
            {
              role: 'system',
              content: 'You are a UX research assistant. Provide detailed, factual information based on current publicly available sources. Include specific examples and cite your sources.'
            },
            {
              role: 'user',
              content: query
            }
          ],
          temperature: 0.2,
          max_tokens: 2000,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        researchResults.push({
          query,
          answer: data.choices[0].message.content,
          citations: data.citations || []
        });
      }
    } catch (error) {
      console.error('Perplexity API error:', error);
    }
  }

  return researchResults;
}

export async function POST(request: NextRequest) {
  console.log('=== Analysis API Called ===');

  try {
    const { companyName, featureFlow } = await request.json();
    console.log('Request data:', { companyName, featureFlow });

    if (!companyName || !featureFlow) {
      console.error('Missing required fields');
      return NextResponse.json(
        { error: 'Company name and feature/flow are required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    console.log('API Key present:', !!apiKey);
    console.log('API Key length:', apiKey?.length);

    if (!apiKey) {
      console.error('Anthropic API key not found in environment variables');
      return NextResponse.json(
        { error: 'Anthropic API key not configured. Please check your .env.local file.' },
        { status: 500 }
      );
    }

    // Step 1: Conduct research using Perplexity
    console.log('Starting research phase...');
    const researchData = await conductResearch(companyName, featureFlow);
    console.log('Research completed. Results:', researchData?.length || 0, 'queries');

    // Step 2: Create the analysis prompt with research data
    let researchContext = '';
    if (researchData && researchData.length > 0) {
      researchContext = '\n\nBased on the following research findings:\n\n';
      researchData.forEach((result, index) => {
        researchContext += `Research Question ${index + 1}: ${result.query}\n`;
        researchContext += `Answer: ${result.answer}\n\n`;
      });
    }

    const prompt = `You are a UX competitive analysis expert. Analyze ${companyName}'s implementation of "${featureFlow}".
${researchContext}
Please provide a comprehensive analysis following this EXACT structure. Return ONLY valid JSON that matches this format:

{
  "summary": {
    "company": "${companyName}",
    "featureAnalyzed": "${featureFlow}",
    "analysisType": "Feature Flow",
    "sourcesFound": 8,
    "confidenceLevel": "High",
    "confidenceExplanation": "Based on official documentation and user reviews",
    "generated": "${new Date().toISOString()}"
  },
  "stepByStepExperience": [
    {
      "stepNumber": 1,
      "title": "Step title",
      "description": "Detailed description of what happens in this step",
      "screenshot": "URL to documentation if available",
      "notes": "Any important notes about this step"
    }
  ],
  "keyFeatures": [
    {
      "feature": "Feature name",
      "whatItDoes": "Description of functionality",
      "supportedPlatforms": "Web, iOS, Android",
      "accessPoint": "How users access this feature"
    }
  ],
  "userSentiment": [
    {
      "source": "App Store Reviews",
      "commonPainPoints": ["Pain point 1", "Pain point 2"],
      "praisedFeatures": ["Praised feature 1", "Praised feature 2"],
      "searchMethodology": "Analyzed reviews from past 12 months"
    }
  ],
  "strategicSynthesis": {
    "strategicBets": [
      {
        "bet": "Strategic investment area",
        "rationale": "Why they're making this bet",
        "tradeoff": "What they're deprioritizing"
      }
    ],
    "competitivePositioning": {
      "targetSegment": "Target user segment",
      "differentiationStrategy": "How they differentiate",
      "pricingValuePositioning": "Pricing strategy"
    },
    "keyComplaints": [
      {
        "complaint": "Top complaint",
        "frequency": "High"
      }
    ]
  },
  "limitations": {
    "dataSources": "Based on publicly available information including marketing site, app store reviews, official documentation, and social mentions.",
    "notIncluded": "Does not include hands-on product testing, proprietary data, or internal roadmap information.",
    "recency": "Sources last updated: ${new Date().toLocaleDateString()}"
  }
}

Provide a thorough, realistic analysis based on publicly available information. Include at least 3-5 steps in the user experience, 3-5 key features, sentiment from 3-4 sources, 2-3 strategic bets, and top 5 complaints.`;

    // Call Anthropic API
    console.log('Calling Anthropic API...');
    const requestBody = {
      model: 'claude-3-haiku-20240307',
      max_tokens: 4096,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    };

    console.log('Request body:', JSON.stringify(requestBody, null, 2).substring(0, 500) + '...');

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(requestBody),
    });

    console.log('Anthropic API response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Anthropic API error response:', errorText);

      let errorMessage = 'Failed to generate analysis';
      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.error?.message || errorJson.message || errorMessage;
      } catch (e) {
        errorMessage = errorText.substring(0, 200);
      }

      return NextResponse.json(
        { error: `Anthropic API Error: ${errorMessage}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('Anthropic API response received. Content length:', data.content?.[0]?.text?.length);

    const analysisText = data.content[0].text;

    // Extract JSON from the response
    let analysisReport: AnalysisReport;
    try {
      console.log('Attempting to parse analysis...');

      // Try to find JSON in code blocks
      const jsonMatch = analysisText.match(/```json\n([\s\S]*?)\n```/) ||
                       analysisText.match(/```\n([\s\S]*?)\n```/);

      if (jsonMatch) {
        console.log('Found JSON in code block');
        analysisReport = JSON.parse(jsonMatch[1]);
      } else {
        console.log('Parsing entire response as JSON');
        analysisReport = JSON.parse(analysisText);
      }

      console.log('Successfully parsed analysis report');
    } catch (parseError) {
      console.error('Failed to parse analysis:', parseError);
      console.error('Response text (first 1000 chars):', analysisText.substring(0, 1000));
      return NextResponse.json(
        { error: `Failed to parse analysis response: ${parseError instanceof Error ? parseError.message : 'Unknown error'}` },
        { status: 500 }
      );
    }

    console.log('=== Analysis completed successfully ===');
    return NextResponse.json(analysisReport);
  } catch (error) {
    console.error('Error generating analysis:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: `Internal server error: ${errorMessage}` },
      { status: 500 }
    );
  }
}
