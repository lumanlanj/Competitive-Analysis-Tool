export interface AnalysisRequest {
  companyName: string;
  featureFlow: string;
}

export interface AnalysisSummary {
  company: string;
  featureAnalyzed: string;
  analysisType: 'Client Onboarding' | 'Feature Flow' | 'User Journey';
  sourcesFound: number;
  confidenceLevel: 'High' | 'Medium' | 'Low';
  confidenceExplanation: string;
  generated: string;
}

export interface StepDetail {
  stepNumber: number;
  title: string;
  description: string;
  screenshot?: string;
  notes?: string;
}

export interface KeyFeature {
  feature: string;
  whatItDoes: string;
  supportedPlatforms: string;
  accessPoint: string;
}

export interface UserSentiment {
  source: string;
  commonPainPoints: string[];
  praisedFeatures: string[];
  searchMethodology?: string;
}

export interface StrategicBet {
  bet: string;
  rationale: string;
  tradeoff: string;
}

export interface CompetitivePositioning {
  targetSegment: string;
  differentiationStrategy: string;
  pricingValuePositioning: string;
}

export interface KeyComplaint {
  complaint: string;
  frequency: 'High' | 'Medium' | 'Low';
}

export interface StrategicSynthesis {
  strategicBets: StrategicBet[];
  competitivePositioning: CompetitivePositioning;
  keyComplaints: KeyComplaint[];
}

export interface Limitations {
  dataSources: string;
  notIncluded: string;
  recency: string;
}

export interface AnalysisReport {
  summary: AnalysisSummary;
  stepByStepExperience: StepDetail[];
  keyFeatures: KeyFeature[];
  userSentiment: UserSentiment[];
  strategicSynthesis: StrategicSynthesis;
  limitations: Limitations;
}
