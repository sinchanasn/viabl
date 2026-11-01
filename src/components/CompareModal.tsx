import React from 'react';
import { EvaluationResult } from '../types';

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  ideaA: EvaluationResult | null;
  ideaB: EvaluationResult | null;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  isOpen,
  onClose,
  ideaA,
  ideaB
}) => {
  if (!isOpen || !ideaA || !ideaB) return null;

  const winner = ideaA.overallViabilityScore >= ideaB.overallViabilityScore ? ideaA : ideaB;
  const loser = ideaA.overallViabilityScore >= ideaB.overallViabilityScore ? ideaB : ideaA;

  const scoreKeys: Array<{ key: keyof EvaluationResult['scores']; label: string }> = [
    { key: 'marketNeed', label: 'Market Need' },
    { key: 'competition', label: 'Competition' },
    { key: 'technicalFeasibility', label: 'Technical Feasibility' },
    { key: 'monetization', label: 'Monetization' },
    { key: 'defensibility', label: 'Defensibility' },
    { key: 'growthPotential', label: 'Growth Potential' }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 font-sans">
      <div 
        className="fixed inset-0 bg-zinc-950/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-white border border-zinc-300 p-6 sm:p-8 max-w-4xl w-full shadow-2xl space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 block">
              HEAD-TO-HEAD AUDIT
            </span>
            <h3 className="font-serif text-2xl font-bold text-zinc-950">
              Comparative Deal Analysis
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-xs font-mono text-zinc-400 hover:text-zinc-900"
          >
            [CLOSE]
          </button>
        </div>

        {/* Lead Summary */}
        <div className="p-4 border border-zinc-200 bg-zinc-50 flex items-center justify-between text-xs font-mono">
          <span>
            SUPERIOR OPPORTUNITY: <strong className="text-zinc-950">{winner.ideaText.slice(0, 50)}...</strong>
          </span>
          <span className="px-2 py-0.5 border border-zinc-300 bg-white font-bold text-zinc-900">
            +{winner.overallViabilityScore - loser.overallViabilityScore} PTS DELTA
          </span>
        </div>

        {/* Side-by-side Top Header */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 border border-zinc-200 bg-white space-y-1">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-zinc-950 uppercase">{ideaA.verdict}</span>
              <span className="font-serif text-2xl font-bold text-zinc-950 tabular-nums">
                {ideaA.overallViabilityScore}/100
              </span>
            </div>
            <p className="font-serif text-xs text-zinc-700 line-clamp-2">{ideaA.ideaText}</p>
          </div>

          <div className="p-4 border border-zinc-200 bg-white space-y-1">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-zinc-950 uppercase">{ideaB.verdict}</span>
              <span className="font-serif text-2xl font-bold text-zinc-950 tabular-nums">
                {ideaB.overallViabilityScore}/100
              </span>
            </div>
            <p className="font-serif text-xs text-zinc-700 line-clamp-2">{ideaB.ideaText}</p>
          </div>
        </div>

        {/* Six Dimensions */}
        <div className="space-y-2 pt-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 block pb-1 border-b border-zinc-100">
            Dimensional Score Breakdown
          </span>

          <div className="divide-y divide-zinc-100">
            {scoreKeys.map(({ key, label }) => {
              const scoreA = (ideaA.scores[key] || ideaA.scores.viralPotential)?.score || 0;
              const scoreB = (ideaB.scores[key] || ideaB.scores.viralPotential)?.score || 0;

              return (
                <div key={key} className="py-2.5 grid grid-cols-12 items-center text-xs font-mono">
                  <div className="col-span-3 font-bold text-zinc-900 tabular-nums">
                    {scoreA} / 100 {scoreA > scoreB && '★'}
                  </div>
                  <div className="col-span-6 text-center text-zinc-600 font-sans">
                    {label}
                  </div>
                  <div className="col-span-3 text-right font-bold text-zinc-900 tabular-nums">
                    {scoreB > scoreA && '★'} {scoreB} / 100
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 border border-zinc-300 hover:border-zinc-900 text-xs font-mono uppercase text-zinc-900 transition-colors"
          >
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  );
};
