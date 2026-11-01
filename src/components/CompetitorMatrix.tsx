import React from 'react';
import { CompetitorItem } from '../types';

interface CompetitorMatrixProps {
  competitors: CompetitorItem[];
}

export const CompetitorMatrix: React.FC<CompetitorMatrixProps> = ({ competitors }) => {
  return (
    <div className="document-sheet p-6 sm:p-8 border border-zinc-300 bg-white space-y-6">
      <div className="pb-3 border-b border-zinc-200 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block">
            Market Structure
          </span>
          <h3 className="font-serif text-2xl font-normal text-zinc-950">
            Competitive Landscape & Asymmetric Wedge
          </h3>
        </div>
        <span className="text-xs font-mono text-zinc-500">
          POSITIONING & SUBSTITUTE THREAT AUDIT
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {competitors.map((comp, idx) => (
          <div 
            key={idx}
            className="p-5 border border-zinc-200 bg-white flex flex-col justify-between space-y-4 hover:border-zinc-400 transition-colors"
          >
            <div>
              <div className="flex items-start justify-between gap-2 pb-2 border-b border-zinc-100">
                <div>
                  <h4 className="font-serif text-base font-bold text-zinc-950">{comp.name}</h4>
                  <span className="text-[11px] font-mono text-zinc-400">{comp.category} Competitor</span>
                </div>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 border border-zinc-300 bg-zinc-50 text-zinc-800">
                  {comp.threatLevel} Threat
                </span>
              </div>

              {/* Competitor Advantage */}
              <div className="pt-3 space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block">
                  Their Incumbent Advantage
                </span>
                <p className="text-xs text-zinc-600 leading-relaxed font-sans">{comp.advantageOverYou}</p>
              </div>

              {/* Your Asymmetric Wedge */}
              <div className="pt-3 border-t border-zinc-100 space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-900 font-bold block">
                  Your Asymmetric Winning Wedge
                </span>
                <p className="text-xs text-zinc-800 leading-relaxed font-sans font-medium">{comp.yourWinningAngle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
