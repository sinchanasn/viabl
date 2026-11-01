export type VerdictType = 'BUILD' | 'PIVOT' | 'DROP';

export interface ScoreDetail {
  score: number; // 0 - 100
  label: string;
  rationale: string;
  benchmark: string; // e.g. "Top 15% in B2B SaaS"
  pros: string[];
  cons: string[];
}

export interface MetricScores {
  marketNeed: ScoreDetail;
  competition: ScoreDetail;
  technicalFeasibility: ScoreDetail;
  monetization: ScoreDetail;
  defensibility: ScoreDetail;
  growthPotential: ScoreDetail;
  viralPotential?: ScoreDetail;
}

export interface ExpertPersona {
  id: 'vc' | 'founder' | 'cto' | 'marketer';
  name: string;
  title: string;
  firm: string;
  avatar: string;
  avatarBg: string;
  roleDescription: string;
  focusArea: string;
}

export interface ExpertEvaluation {
  personaId: 'vc' | 'founder' | 'cto' | 'marketer';
  personaName: string;
  personaTitle: string;
  stance: 'Strongly Bullish' | 'Bullish' | 'Cautious / Pivot' | 'Bearish / Drop';
  verdictVote: VerdictType;
  primaryThesis: string;
  deepDiveAnalysis: string;
  greenFlags: string[];
  redFlags: string[];
  hardQuestionsForFounders: string[];
  quote: string;
}

export interface ValidationExperiment {
  step: number;
  timeframe: string; // e.g. "Days 1-7"
  title: string;
  hypothesis: string;
  method: string;
  successMetric: string;
  estimatedCost: string;
}

export interface CompetitorItem {
  name: string;
  category: 'Direct' | 'Indirect' | 'Incumbent';
  threatLevel: 'High' | 'Medium' | 'Low';
  advantageOverYou: string;
  yourWinningAngle: string;
}

export interface PivotAngle {
  title: string;
  targetAudience: string;
  revisedAngle: string;
  whyItWorksBetter: string;
  viabilityMultiplier: string;
}

export interface EvaluationResult {
  id: string;
  timestamp: number;
  ideaText: string;
  industry: string;
  targetCustomer: string;
  monetizationModel: string;
  
  // High-level Verdict
  overallViabilityScore: number; // 0 - 100
  verdict: VerdictType;
  verdictSummary: string;
  confidenceRating: number; // e.g. 92%
  
  // Executive summary & Strengths
  executiveSummary: string;
  keyStrengths: string[];
  fatalFlaws: string[];
  
  // 6 Core Metric Scores
  scores: MetricScores;
  
  // The 4 Expert evaluations
  expertEvaluations: {
    vc: ExpertEvaluation;
    founder: ExpertEvaluation;
    cto: ExpertEvaluation;
    marketer: ExpertEvaluation;
  };
  
  // Additional actionable value
  competitorLandscape: CompetitorItem[];
  pivotAngles: PivotAngle[];
  validationExperiments: ValidationExperiment[];
  simulatedDebateSnippet: {
    speaker: string;
    role: string;
    message: string;
  }[];
}

export interface StartupIdeaInput {
  title?: string;
  description: string;
  targetAudience?: string;
  monetizationModel?: string;
  stage?: 'Just an Idea' | 'Prototype / MVP' | 'Early Traction';
}

export interface ApiSettings {
  geminiApiKey: string;
  openaiApiKey: string;
  preferredEngine: 'auto' | 'gemini' | 'openai' | 'local';
}
