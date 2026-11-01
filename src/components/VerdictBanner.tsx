import React from 'react';
import { EvaluationResult, VerdictType } from '../types';

interface VerdictBannerProps {
  evaluation: EvaluationResult;
  onScrollToSection: (sectionId: string) => void;
}

export const VerdictBanner: React.FC<VerdictBannerProps> = ({
  evaluation,
  onScrollToSection
}) => {
  const { verdict, overallViabilityScore, confidenceRating, verdictSummary } = evaluation;

  const getVerdictLabel = (v: VerdictType) => {
    switch (v) {
      case 'BUILD':
        return 'RECOMMENDATION: PROCEED (BUILD)';
      case 'PIVOT':
        return 'RECOMMENDATION: REALIGN WEDGE (PIVOT)';
      case 'DROP':
        return 'RECOMMENDATION: SHELVE / REJECT (DROP)';
    }
  };

  return (
    <div className="document-sheet border border-zinc-300 bg-white p-6 sm:p-8 space-y-6">
      {/* Top Memo Meta */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-zinc-200 text-xs font-mono text-zinc-500 uppercase">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-zinc-950" />
          <span className="font-bold text-zinc-900">COMMITTEE RATIFIED MEMORANDUM</span>
          <span>// REF: {evaluation.id}</span>
        </div>
        <div>
          <span>CONSENSUS ALIGNMENT: </span>
          <strong className="text-zinc-950 font-bold">{confidenceRating}%</strong>
        </div>
      </div>

      {/* Main Grid: Score & Verdict */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Overall Viability Score */}
        <div className="md:col-span-4 p-5 border border-zinc-200 bg-zinc-50/60 text-center space-y-1">
          <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
            Overall Viability Score
          </div>
          <div className="flex items-baseline justify-center gap-1.5">
            <span className="font-serif text-5xl font-bold text-zinc-950 tabular-nums">
              {overallViabilityScore}
            </span>
            <span className="text-sm font-mono text-zinc-400">/ 100</span>
          </div>
          <div className="text-[11px] font-mono text-zinc-600 pt-1">
            {overallViabilityScore >= 75
              ? 'Hurdle Cleared: Series Seed Standard Met'
              : overallViabilityScore >= 55
              ? 'Moderate Viability: Requires Tactical Realignment'
              : 'Sub-Threshold: High Capital Risk'}
          </div>
        </div>

        {/* Verdict & Executive Decision */}
        <div className="md:col-span-8 space-y-3">
          <div className="inline-block px-3 py-1 bg-zinc-950 text-white font-mono text-xs font-bold uppercase tracking-wider">
            {getVerdictLabel(verdict)}
          </div>

          <p className="font-serif text-base sm:text-lg text-zinc-900 leading-relaxed font-normal">
            {verdictSummary}
          </p>

          <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono">
            <button
              onClick={() => onScrollToSection('scores')}
              className="px-2.5 py-1 border border-zinc-200 bg-white hover:border-zinc-400 text-zinc-700 transition-colors"
            >
              [↓] Six-Axis Scorecard
            </button>
            <button
              onClick={() => onScrollToSection('committee')}
              className="px-2.5 py-1 border border-zinc-200 bg-white hover:border-zinc-400 text-zinc-700 transition-colors"
            >
              [↓] Partner Marginalia
            </button>
            <button
              onClick={() => onScrollToSection('experiments')}
              className="px-2.5 py-1 border border-zinc-200 bg-white hover:border-zinc-400 text-zinc-700 transition-colors"
            >
              [↓] 30-Day Lean Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
