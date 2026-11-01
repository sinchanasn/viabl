import React from 'react';
import { RadarChart } from './RadarChart';
import { SAMPLE_INVESTMENT_MEMO } from '../services/presets';

interface HeroDashboardPreviewProps {
  onOpenSampleMemo?: () => void;
}

export const HeroDashboardPreview: React.FC<HeroDashboardPreviewProps> = ({ onOpenSampleMemo }) => {
  const memo = SAMPLE_INVESTMENT_MEMO;

  return (
    <div className="w-full document-sheet rounded-none sm:rounded-lg overflow-hidden border border-zinc-200 bg-white text-zinc-900 shadow-sm">
      {/* Top Memorandum Control Bar */}
      <div className="px-4 sm:px-6 py-3 border-b border-zinc-200 bg-zinc-50/80 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-3">
          <span className="inline-block w-2 h-2 rounded-full bg-zinc-900" />
          <span className="font-semibold text-zinc-900 tracking-wider">
            VIABL DILIGENCE SYSTEM // REF: {memo.id}
          </span>
          <span className="text-zinc-400 hidden sm:inline">|</span>
          <span className="text-zinc-500 hidden sm:inline">SUBJECT: CODESYNC (B2B DEVTOOLS)</span>
        </div>

        <div className="flex items-center gap-3 text-zinc-500">
          <span className="px-2 py-0.5 border border-zinc-300 bg-white text-[11px] font-semibold text-zinc-800">
            COMMITTEE RATIFIED
          </span>
          {onOpenSampleMemo && (
            <button
              onClick={onOpenSampleMemo}
              className="text-zinc-900 underline hover:text-zinc-600 font-sans font-medium text-xs transition-colors"
            >
              Expand Full Memo →
            </button>
          )}
        </div>
      </div>

      {/* Primary Metrics Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 border-b border-zinc-200 divide-y md:divide-y-0 md:divide-x divide-zinc-200 bg-white">
        {/* Metric 1: Viability Score */}
        <div className="p-5 sm:p-6 space-y-1">
          <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">
            Overall Viability Score
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-serif font-bold text-zinc-950 tracking-tight tabular-nums">
              {memo.overallViabilityScore}
            </span>
            <span className="text-sm font-mono text-zinc-400">/ 100</span>
          </div>
          <div className="text-xs text-zinc-600 font-sans pt-1">
            Top 8th percentile of evaluated B2B software concepts. Pre-seed investment hurdle met.
          </div>
        </div>

        {/* Metric 2: Committee Verdict */}
        <div className="p-5 sm:p-6 space-y-1">
          <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">
            Investment Committee Verdict
          </div>
          <div className="pt-0.5">
            <span className="inline-block px-3 py-1 bg-zinc-950 text-white font-mono font-bold text-sm tracking-wider uppercase">
              RECOMMENDATION: {memo.verdict}
            </span>
          </div>
          <div className="text-xs text-zinc-600 font-sans pt-1">
            4 of 4 partners in favor of capital allocation for prototype validation.
          </div>
        </div>

        {/* Metric 3: Confidence & Stage */}
        <div className="p-5 sm:p-6 space-y-1">
          <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">
            Consensus & Confidence
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-serif font-bold text-zinc-950 tracking-tight tabular-nums">
              {memo.confidenceRating}%
            </span>
            <span className="text-xs font-mono text-zinc-500 uppercase">Alignment</span>
          </div>
          <div className="text-xs text-zinc-600 font-sans pt-1">
            Standard deviation across 6 dimensions is &lt; 6.2 pts (high cross-discipline agreement).
          </div>
        </div>
      </div>

      {/* Main Analysis Body: Radar Chart + Notes & Risks */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-zinc-200">
        {/* Left: Dimension Radar & Score Breakdown */}
        <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-zinc-50/40">
          <div>
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-zinc-200">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-700">
                Figure 1.0 — Six-Axis Diligence Profile
              </span>
              <span className="text-[11px] font-mono text-zinc-400">Scale 0 - 100</span>
            </div>
            <p className="text-xs text-zinc-500 mb-4">
              Geometric balance indicates acute market pull and manageable engineering scope, with defensibility forming via workflow lock-in.
            </p>
          </div>

          <div className="py-2 flex justify-center">
            <RadarChart scores={memo.scores} size={290} />
          </div>

          <div className="grid grid-cols-3 gap-2 pt-4 border-t border-zinc-200 text-center font-mono">
            <div className="p-2 border border-zinc-200 bg-white">
              <div className="text-[10px] text-zinc-400 uppercase">Need</div>
              <div className="text-sm font-bold text-zinc-900">{memo.scores.marketNeed.score}</div>
            </div>
            <div className="p-2 border border-zinc-200 bg-white">
              <div className="text-[10px] text-zinc-400 uppercase">Feasibility</div>
              <div className="text-sm font-bold text-zinc-900">{memo.scores.technicalFeasibility.score}</div>
            </div>
            <div className="p-2 border border-zinc-200 bg-white">
              <div className="text-[10px] text-zinc-400 uppercase">Monetization</div>
              <div className="text-sm font-bold text-zinc-900">{memo.scores.monetization.score}</div>
            </div>
          </div>
        </div>

        {/* Right: Investor Notes & Risk Analysis */}
        <div className="lg:col-span-6 p-6 sm:p-8 space-y-6 bg-white">
          {/* Investor Notes */}
          <div>
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-zinc-200">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-700">
                Investment Committee Marginalia
              </span>
              <span className="text-[11px] font-mono text-zinc-400">4 Reviewers</span>
            </div>

            <div className="space-y-3">
              <div className="p-3 border border-zinc-200 bg-zinc-50/60 text-xs space-y-1">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="font-bold text-zinc-900">Elena Rostova, VC</span>
                  <span className="text-zinc-500">Apex Capital</span>
                </div>
                <p className="font-serif italic text-zinc-800 leading-relaxed">
                  "Developer productivity tools that prevent operational debt consistently command 80%+ gross margins and negative net churn once embedded in CI/CD."
                </p>
              </div>

              <div className="p-3 border border-zinc-200 bg-zinc-50/60 text-xs space-y-1">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="font-bold text-zinc-900">Dr. Aris Thorne, CTO</span>
                  <span className="text-zinc-500">Ex-Staff Architect</span>
                </div>
                <p className="font-serif italic text-zinc-800 leading-relaxed">
                  "Clean architectural scope using deterministic AST parsers rather than non-deterministic LLM hallucinations for syntax contracts."
                </p>
              </div>
            </div>
          </div>

          {/* Risk Analysis Table */}
          <div>
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-zinc-200">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-700">
                Critical Risk Vectors
              </span>
              <span className="text-[11px] font-mono text-zinc-400">Severity Audit</span>
            </div>

            <div className="border border-zinc-200 divide-y divide-zinc-200 text-xs font-sans">
              <div className="p-2.5 bg-zinc-50/50 flex items-start gap-2">
                <span className="font-mono text-[10px] font-bold text-zinc-900 bg-zinc-200 px-1.5 py-0.2">
                  RISK 01
                </span>
                <div className="flex-1">
                  <div className="font-semibold text-zinc-900">Platform Dependency</div>
                  <div className="text-zinc-600 text-[11px] mt-0.5">
                    Reliance on GitHub/GitLab webhook policies and permission scopes.
                  </div>
                </div>
              </div>

              <div className="p-2.5 bg-zinc-50/50 flex items-start gap-2">
                <span className="font-mono text-[10px] font-bold text-zinc-900 bg-zinc-200 px-1.5 py-0.2">
                  RISK 02
                </span>
                <div className="flex-1">
                  <div className="font-semibold text-zinc-900">Incumbent Fast-Followers</div>
                  <div className="text-zinc-600 text-[11px] mt-0.5">
                    Established doc platforms (Mintlify, GitBook) adding Git-sync add-ons.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer bar of preview */}
      <div className="px-6 py-3 border-t border-zinc-200 bg-zinc-50/80 flex items-center justify-between text-[11px] font-mono text-zinc-500">
        <span>MEMORANDUM COMPLETE • 4/4 REVIEWS RECORDED</span>
        <span>SECURITY LEVEL: RESTRICTED DUE DILIGENCE</span>
      </div>
    </div>
  );
};
