# Quick Setup Guide

## Step 1: Navigate to the Project

```bash
cd /path/to/ux-analysis-tool
```

## Step 2: Verify Environment Variables

Your `.env.local` file should already have your Perplexity API key. Add your Anthropic API key:

```env
ANTHROPIC_API_KEY=your_anthropic_api_key_here
PERPLEXITY_API_KEY=your_perplexity_api_key_here
```

## Step 3: Start the Development Server

```bash
npm run dev
```

## Step 4: Open the App

Navigate to [http://localhost:3000](http://localhost:3000)

## Step 5: Try the Demo

**Recommended first test:**
- Company: `Spotify`
- Feature/Flow: `Creating a personalized playlist`

This matches the demo example from your PRD!

## What Happens Behind the Scenes

1. **Research Phase** (10-15 seconds)
   - Perplexity conducts 4 targeted web searches
   - Gathers real-time data about UX flows, features, sentiment, and strategy
   - Collects citations from official docs, app stores, Reddit, etc.

2. **Analysis Phase** (5-10 seconds)
   - Claude synthesizes research into structured insights
   - Generates comprehensive 6-section report
   - Provides actionable strategic recommendations

## Expected Performance

- **Total time**: 15-30 seconds (within PRD requirements)
- **Data freshness**: Real-time web data from past 12 months
- **Accuracy**: High confidence based on multiple sources

## Troubleshooting

### API Key Issues
- Make sure `.env.local` exists in the project root
- Verify both API keys are correctly set
- Restart the dev server after adding keys

### Slow Performance
- First request may take longer (cold start)
- Subsequent requests should be faster
- Check internet connection for Perplexity research phase

### Analysis Errors
- Check browser console for detailed error messages
- Verify API keys have sufficient credits
- Ensure company/feature names are realistic and searchable

## Next Steps

After testing the demo:
1. Try analyzing your actual competitors
2. Compare multiple features from the same company
3. Build a library of analyses for team reference

---

**Pro Tip**: Start with well-known companies (Spotify, Amazon, Netflix) to see the best results, as they have abundant public information.
