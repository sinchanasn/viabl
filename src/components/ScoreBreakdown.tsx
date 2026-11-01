import React, { useState } from 'react';
import { MetricScores } from '../types';
import { RadarChart } from './RadarChart';

interface ScoreBreakdownProps {
  scores: MetricScores;
}

export const ScoreBreakdown: React.FC<ScoreBreakdownProps> = ({ scores }) => {
  const [expandedKey, setExpandedKey] = useState<string | null>(null);

  const metricList = [
    {
      key: 'marketNeed',
      data: scores.marketNeed,
      code: 'DIM-01',
      description: 'Pain intensity, customer desperation, and frequency of workflow headache.'
    },
    {
      key: 'competition',
      data: scores.competition,
      code: 'DIM-02',
      description: 'Competitive density, incumbent inertia, and open whitespace vs legacy tools.'
    },
    {
      key: 'technicalFeasibility',
      data: scores.technicalFeasibility,
      code: 'DIM-03',
      description: 'Execution difficulty, API reliability, R&D risk, and 45-day MVP feasibility.'
    },
    {
      key: 'monetization',
      data: scores.monetization,
      code: 'DIM-04',
      description: 'Customer willingness-to-pay, pricing power, and path to $1M ARR.'
    },
    {
      key: 'defensibility',
      data: scores.defensibility,
      code: 'DIM-05',
      description: 'Switching costs, data flywheels, proprietary lock-in, and moat longevity.'
    },
    {
      key: 'growthPotential',
      data: (scores.growthPotential || scores.viralPotential)!,
      code: 'DIM-06',
      description: 'Organic referral loops, word-of-mouth velocity, and CAC sustainability.'
    }
  ];

  const toggleExpand = (key: string) => {
    setExpandedKey(expandedKey === key ? null : key);
  };

  return (
    <div id="scores" className="space-y-6">
      {/* Section Header */}
      <div className="pb-3 border-b border-zinc-200 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 block">
            Diligence Breakdown
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-zinc-950">
            The Six Diligence Dimensions
          </h2>
        </div>
        <div className="text-xs font-mono text-zinc-500">
          BENCHMARK RANGE: 0 - 100 PTS
        </div>
      </div>

      {/* Radar Chart Summary Section */}
      <div className="document-sheet p-6 sm:p-8 bg-zinc-50/50 border border-zinc-200 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        <div className="lg:col-span-5 flex justify-center">
          <RadarChart scores={scores} size={280} />
        </div>
        <div className="lg:col-span-7 space-y-3 text-xs text-zinc-600 font-sans">
          <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-700 font-bold">
            Geometric Diligence Synthesis
          </div>
          <p className="leading-relaxed">
            The radar polygon visualizes structural strengths and capital risks. Venture-scale companies require high Market Need (&gt;75) combined with defensible Monetization (&gt;70). Where Defensibility or Feasibility lag, founders must address underlying friction vectors prior to engineering allocation.
          </p>
          <div className="pt-2 border-t border-zinc-200 grid grid-cols-2 sm:grid-cols-3 gap-2 font-mono text-[11px]">
            <div>Primary Driver: <strong className="text-zinc-900">{scores.marketNeed.score >= scores.monetization.score ? 'Market Need' : 'Monetization'}</strong></div>
            <div>Primary Bottleneck: <strong className="text-zinc-900">{scores.defensibility.score <= scores.competition.score ? 'Defensibility' : 'Competition'}</strong></div>
            <div>Sample Variance: <strong className="text-zinc-900">Low (&lt;7.4)</strong></div>
          </div>
        </div>
      </div>

      {/* Grid of 6 Score Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metricList.map((item) => {
          const { score, label, rationale, benchmark, pros, cons } = item.data;
          const isExpanded = expandedKey === item.key;

          return (
            <div
              key={item.key}
              className="bg-white border border-zinc-200 p-5 flex flex-col justify-between space-y-3 hover:border-zinc-400 transition-colors"
            >
              <div>
                <div className="flex items-start justify-between gap-2 pb-2 border-b border-zinc-100">
                  <div>
                    <span className="text-[10px] font-mono text-zinc-400 uppercase">{item.code}</span>
                    <h3 className="font-serif text-lg font-semibold text-zinc-950">{label}</h3>
                  </div>

                  <div className="text-right">
                    <span className="font-serif text-2xl font-bold text-zinc-950 tabular-nums">{score}</span>
                    <span className="text-xs font-mono text-zinc-400">/100</span>
                  </div>
                </div>

                {/* Minimal bar indicator */}
                <div className="w-full h-1 bg-zinc-100 my-2.5">
                  <div
                    className="h-full bg-zinc-900 transition-all duration-700"
                    style={{ width: `${score}%` }}
                  />
                </div>

                <div className="text-[11px] font-mono text-zinc-500 mb-2">
                  {benchmark}
                </div>

                <p className="text-xs text-zinc-600 leading-relaxed font-sans">
                  {rationale}
                </p>
              </div>

              {/* Expandable Pros & Cons */}
              <div className="pt-2 border-t border-zinc-100">
                <button
                  type="button"
                  onClick={() => toggleExpand(item.key)}
                  className="w-full text-left text-[11px] font-mono text-zinc-500 hover:text-zinc-900 transition-colors flex items-center justify-between"
                >
                  <span>{isExpanded ? '[-] Hide Diligence Factors' : '[+] View Factor Analysis'}</span>
                </button>

                {isExpanded && (
                  <div className="mt-3 pt-3 border-t border-zinc-100 space-y-2 text-xs font-sans">
                    {pros && pros.length > 0 && (
                      <div>
                        <div className="font-mono text-[10px] uppercase font-bold text-zinc-700 mb-1">
                          Positive Evidence
                        </div>
                        <ul className="space-y-1 pl-3 text-zinc-600">
                          {pros.map((p, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <span className="text-zinc-400 font-mono">+</span>
                              <span>{p}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {cons && cons.length > 0 && (
                      <div className="mt-2">
                        <div className="font-mono text-[10px] uppercase font-bold text-zinc-700 mb-1">
                          Vulnerability Factors
                        </div>
                        <ul className="space-y-1 pl-3 text-zinc-600">
                          {cons.map((c, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <span className="text-zinc-400 font-mono">—</span>
                              <span>{c}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
