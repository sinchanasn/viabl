import React from 'react';
import { EvaluationResult } from '../types';

interface StrategicAnalysisProps {
  evaluation: EvaluationResult;
}

export const StrategicAnalysis: React.FC<StrategicAnalysisProps> = ({ evaluation }) => {
  const { executiveSummary, keyStrengths, fatalFlaws, validationExperiments } = evaluation;

  return (
    <div className="space-y-8">
      {/* Executive Summary & Strategic Foundations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Executive Summary */}
        <div className="lg:col-span-6 document-sheet p-6 sm:p-8 border border-zinc-300 bg-white space-y-4 flex flex-col justify-between">
          <div>
            <div className="pb-3 border-b border-zinc-200">
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block">
                Synthesis Section 01
              </span>
              <h3 className="font-serif text-xl font-bold text-zinc-950">
                Executive Due Diligence Summary
              </h3>
            </div>

            <p className="font-serif text-sm sm:text-base text-zinc-800 leading-relaxed pt-3">
              {executiveSummary}
            </p>
          </div>

          <div className="pt-4 border-t border-zinc-200 grid grid-cols-2 gap-3 text-xs font-mono text-zinc-500">
            <div>Sector: <strong className="text-zinc-900">{evaluation.industry}</strong></div>
            <div>Target ICP: <strong className="text-zinc-900">{evaluation.targetCustomer}</strong></div>
          </div>
        </div>

        {/* Right: Key Strengths & Fatal Flaws */}
        <div className="lg:col-span-6 space-y-4">
          {/* Key Strengths */}
          <div className="document-sheet p-6 border border-zinc-200 bg-white space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-wider font-bold text-zinc-900 pb-2 border-b border-zinc-100">
              Key Strengths & Asymmetric Wedges
            </h4>

            <div className="space-y-2">
              {keyStrengths.map((strength, idx) => (
                <div 
                  key={idx}
                  className="flex items-start gap-2 text-xs text-zinc-700 font-sans"
                >
                  <span className="font-mono text-zinc-400 font-bold text-[11px] mt-0.5">[{idx + 1}]</span>
                  <span className="leading-relaxed">{strength}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Fatal Flaws & Moat Risks */}
          <div className="document-sheet p-6 border border-zinc-200 bg-white space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-wider font-bold text-zinc-900 pb-2 border-b border-zinc-100">
              Critical Flaws & Capital Vulnerabilities
            </h4>

            <div className="space-y-2">
              {fatalFlaws.map((flaw, idx) => (
                <div 
                  key={idx}
                  className="flex items-start gap-2 text-xs text-zinc-700 font-sans"
                >
                  <span className="font-mono text-zinc-400 font-bold text-[11px] mt-0.5">[!]</span>
                  <span className="leading-relaxed">{flaw}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 30-Day Lean Validation Experiments Roadmap */}
      <div id="experiments" className="document-sheet p-6 sm:p-8 border border-zinc-300 bg-white space-y-6">
        <div className="pb-3 border-b border-zinc-200 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block">
              Actionable De-risking
            </span>
            <h3 className="font-serif text-2xl font-normal text-zinc-950">
              30-Day Lean Validation Experiment Plan
            </h3>
          </div>
          <span className="text-xs font-mono text-zinc-500">
            SEQUENTIAL DE-RISKING ROADMAP
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {validationExperiments.map((exp) => (
            <div 
              key={exp.step}
              className="p-5 border border-zinc-200 bg-zinc-50/50 flex flex-col justify-between space-y-4 hover:border-zinc-400 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono pb-2 border-b border-zinc-200">
                  <span className="font-bold text-zinc-900">STEP 0{exp.step}</span>
                  <span className="text-zinc-500">{exp.timeframe}</span>
                </div>

                <h4 className="font-serif text-base font-bold text-zinc-950 mt-2 mb-3 leading-snug">
                  {exp.title}
                </h4>

                <div className="space-y-2.5 text-xs font-sans">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block mb-0.5">
                      Hypothesis Under Test
                    </span>
                    <p className="text-zinc-700 leading-relaxed">{exp.hypothesis}</p>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block mb-0.5">
                      Lean Execution Method
                    </span>
                    <p className="text-zinc-700 leading-relaxed">{exp.method}</p>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-200 font-mono text-[11px] space-y-1">
                <div className="text-zinc-900 font-semibold">
                  Metric: {exp.successMetric}
                </div>
                <div className="text-zinc-500">
                  Budget: {exp.estimatedCost}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
