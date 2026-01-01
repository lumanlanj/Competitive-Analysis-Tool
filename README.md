# UX Competitive Analysis Tool

A powerful web application that helps Product Managers, UX Designers, and Product Marketing Managers conduct comprehensive competitive UX analysis in minutes instead of hours.

## Features

- **Analysis Summary Card**: Get an at-a-glance overview of the analyzed competitor feature
- **Step-by-Step User Experience**: Detailed walkthrough of the competitor's UX flow
- **Key Features & Value-Add**: Comprehensive feature comparison table
- **User Sentiment Analysis**: Aggregated feedback from app stores, Reddit, Product Hunt, and more
- **Strategic Synthesis**: Strategic insights including competitive positioning and key user complaints
- **Limitations & Methodology**: Transparent reporting of data sources and analysis scope

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with Apple Liquid Glass aesthetic
- **AI Research**: Perplexity API for real-time web research and data gathering
- **AI Analysis**: Anthropic Claude API for intelligent analysis synthesis
- **Deployment**: Vercel-ready

## How It Works

The tool uses a two-stage AI pipeline:

1. **Research Phase (Perplexity)**: Conducts real-time web research to gather:
   - Step-by-step UX flow details
   - Key features and platform availability
   - User sentiment from app stores, Reddit, and social media
   - Strategic positioning and competitive insights

2. **Analysis Phase (Claude)**: Synthesizes research findings into:
   - Structured analysis report with 6 comprehensive sections
   - Strategic insights and competitive positioning
   - Actionable recommendations for Product Managers

## Getting Started

### Prerequisites

- Node.js 18+ installed
- An Anthropic API key ([Get one here](https://console.anthropic.com/))
- A Perplexity API key ([Get one here](https://www.perplexity.ai/settings/api))

### Installation

1. Clone the repository or navigate to the project directory:

```bash
cd ux-analysis-tool
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file in the root directory:

```bash
cp .env.local.example .env.local
```

4. Add your API keys to `.env.local`:

```env
ANTHROPIC_API_KEY=your_anthropic_api_key_here
PERPLEXITY_API_KEY=your_perplexity_api_key_here
```

### Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

1. **Enter Company Name**: Type the name of the competitor you want to analyze (e.g., Spotify, Amazon, Netflix)

2. **Describe the Feature/Flow**: Provide details about the specific feature or user flow you want to analyze (e.g., "Creating a personalized playlist", "Checkout flow")

3. **Generate Analysis**: Click the "Generate Analysis" button and wait 10-30 seconds for the comprehensive analysis

4. **Review Results**: Explore the six-section analysis report:
   - Analysis Summary
   - Step-by-Step User Experience
   - Key Features & Value-Add
   - User Sentiment Analysis
   - Strategic Synthesis
   - Limitations & Methodology

5. **New Analysis**: Click "New Analysis" to analyze another competitor

## Design Philosophy

The application follows Apple's Liquid Glass aesthetic with:

- Clean, minimal interface with high information density
- Frosted glass effects with backdrop blur
- Smooth transitions and interactions
- System fonts with optimized rendering
- High contrast for readability
- Responsive design for all screen sizes

## API Routes

### POST `/api/analyze`

Generates a comprehensive UX competitive analysis.

**Request Body:**
```json
{
  "companyName": "Spotify",
  "featureFlow": "Creating a personalized playlist"
}
```

**Response:**
Returns a complete `AnalysisReport` object with all six sections populated.

## Project Structure

```
ux-analysis-tool/
├── app/
│   ├── api/
│   │   └── analyze/
│   │       └── route.ts          # Analysis API endpoint
│   ├── globals.css               # Global styles with Liquid Glass aesthetic
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main page with state management
├── components/
│   ├── AnalysisDisplay.tsx       # Main analysis display component
│   ├── AnalysisForm.tsx          # Input form component
│   └── sections/
│       ├── SummaryCard.tsx       # Section 1: Summary
│       ├── StepByStep.tsx        # Section 2: Step-by-step flow
│       ├── KeyFeatures.tsx       # Section 3: Features table
│       ├── UserSentiment.tsx     # Section 4: User feedback
│       ├── StrategicSynthesis.tsx # Section 5: Strategic insights
│       └── Limitations.tsx       # Section 6: Methodology
├── types/
│   └── analysis.ts               # TypeScript type definitions
└── README.md
```

## Success Metrics

Based on the PRD, this tool aims to:

- **Reduce analysis time** from 4-8 hours to under 30 minutes per competitor
- **Provide actionable insights** rated as useful 80%+ of the time
- **Drive adoption** with users generating 3+ analyses in their first month

## Future Enhancements

- Multi-competitor comparison mode
- Competitor library for saved analyses
- Screenshot integration
- Feature update alerts
- Export to PDF/PowerPoint
- Team collaboration features

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

**Built with Next.js and Claude AI** | Saving Product Managers 4-8 hours per competitive analysis
