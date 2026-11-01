import React from 'react';
import { PivotAngle } from '../types';

interface PivotSuggestionsProps {
  pivotAngles: PivotAngle[];
  verdict: 'BUILD' | 'PIVOT' | 'DROP';
}

export const PivotSuggestions: React.FC<PivotSuggestionsProps> = ({ pivotAngles }) => {
  if (!pivotAngles || pivotAngles.length === 0) return null;

  return (
    <div className="document-sheet p-6 sm:p-8 border border-zinc-300 bg-white space-y-6">
      <div className="pb-3 border-b border-zinc-200 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block">
            Strategic Realignment
          </span>
          <h3 className="font-serif text-2xl font-normal text-zinc-950">
            Adjacent Pivot Vectors & Wedge Angles
          </h3>
        </div>
        <span className="text-xs font-mono text-zinc-500">
          VALUE ACCELERATION ALTERNATIVES
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {pivotAngles.map((pivot, idx) => (
          <div 
            key={idx}
            className="p-5 border border-zinc-200 bg-zinc-50/50 flex flex-col justify-between space-y-4 hover:border-zinc-400 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between gap-2 pb-2 border-b border-zinc-200">
                <h4 className="font-serif text-base font-bold text-zinc-950">{pivot.title}</h4>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 border border-zinc-300 bg-white text-zinc-900">
                  {pivot.viabilityMultiplier}
                </span>
              </div>

              <div className="text-xs font-mono text-zinc-600 mt-2 mb-3">
                Target ICP: {pivot.targetAudience}
              </div>

              <div className="space-y-3 text-xs font-sans">
                <div className="p-3 bg-white border border-zinc-200 space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block font-bold">
                    Repositioned Value Proposition
                  </span>
                  <p className="text-zinc-700 leading-relaxed">{pivot.revisedAngle}</p>
                </div>

                <div className="p-3 bg-white border border-zinc-200 space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-900 block font-bold">
                    Why Unit Economics Outperform Current Model
                  </span>
                  <p className="text-zinc-800 leading-relaxed font-medium">{pivot.whyItWorksBetter}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
