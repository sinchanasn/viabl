import React, { useState } from 'react';
import { EvaluationResult } from '../types';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  evaluation: EvaluationResult;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  evaluation
}) => {
  const [copiedType, setCopiedType] = useState<string | null>(null);

  if (!isOpen) return null;

  const handlePrintPdf = () => {
    window.print();
  };

  const handleCopySummary = () => {
    const text = `VIABL INVESTMENT MEMORANDUM
Reference ID: ${evaluation.id}
Date: ${new Date(evaluation.timestamp).toLocaleDateString()}
Recommendation: ${evaluation.verdict} (Viability Score: ${evaluation.overallViabilityScore}/100)
Industry: ${evaluation.industry}
Target ICP: ${evaluation.targetCustomer}

EXECUTIVE SUMMARY:
${evaluation.executiveSummary}

SIX-AXIS DILIGENCE SCORES:
- Market Need: ${evaluation.scores.marketNeed.score}/100
- Competition: ${evaluation.scores.competition.score}/100
- Technical Feasibility: ${evaluation.scores.technicalFeasibility.score}/100
- Monetization: ${evaluation.scores.monetization.score}/100
- Defensibility: ${evaluation.scores.defensibility.score}/100
- Growth Potential: ${(evaluation.scores.growthPotential || evaluation.scores.viralPotential)?.score}/100

KEY STRENGTHS:
${evaluation.keyStrengths.map(s => '• ' + s).join('\n')}

CRITICAL RISKS:
${evaluation.fatalFlaws.map(f => '• ' + f).join('\n')}
`;
    navigator.clipboard.writeText(text);
    setCopiedType('summary');
    setTimeout(() => setCopiedType(null), 2500);
  };

  const handleDownloadMarkdown = () => {
    const mdContent = `# Investment Memorandum: ${evaluation.ideaText.slice(0, 50)}...

**Date:** ${new Date(evaluation.timestamp).toLocaleDateString()}
**Deal Reference:** \`${evaluation.id}\`
**Verdict:** \`${evaluation.verdict}\` (**Viability Score: ${evaluation.overallViabilityScore} / 100**)
**Consensus Alignment:** ${evaluation.confidenceRating}%

---

## 1. Executive Summary
${evaluation.executiveSummary}

**Committee Recommendation:** ${evaluation.verdictSummary}

---

## 2. Six-Axis Diligence Scorecard (0 - 100)
| Dimension | Score | Benchmark |
|-----------|-------|-----------|
| **Market Need** | ${evaluation.scores.marketNeed.score}/100 | ${evaluation.scores.marketNeed.benchmark} |
| **Competition** | ${evaluation.scores.competition.score}/100 | ${evaluation.scores.competition.benchmark} |
| **Technical Feasibility** | ${evaluation.scores.technicalFeasibility.score}/100 | ${evaluation.scores.technicalFeasibility.benchmark} |
| **Monetization** | ${evaluation.scores.monetization.score}/100 | ${evaluation.scores.monetization.benchmark} |
| **Defensibility** | ${evaluation.scores.defensibility.score}/100 | ${evaluation.scores.defensibility.benchmark} |
| **Growth Potential** | ${(evaluation.scores.growthPotential || evaluation.scores.viralPotential)?.score}/100 | ${(evaluation.scores.growthPotential || evaluation.scores.viralPotential)?.benchmark} |

---

## 3. Partner Marginalia & Quotes
- **VC (Elena Rostova):** "${evaluation.expertEvaluations.vc.quote}"
- **Serial Founder (Marcus Vance):** "${evaluation.expertEvaluations.founder.quote}"
- **CTO (Dr. Aris Thorne):** "${evaluation.expertEvaluations.cto.quote}"
- **Growth Strategist (Chloe Lin):** "${evaluation.expertEvaluations.marketer.quote}"

---

## 4. Key Strengths
${evaluation.keyStrengths.map(s => `- ${s}`).join('\n')}

## 5. Critical Flaws & Risks
${evaluation.fatalFlaws.map(f => `- ${f}`).join('\n')}

---

## 6. 30-Day Lean Validation Plan
${evaluation.validationExperiments.map(e => `### Step ${e.step}: ${e.title} (${e.timeframe})
- **Hypothesis:** ${e.hypothesis}
- **Method:** ${e.method}
- **Success Target:** ${e.successMetric} (Est. Budget: ${e.estimatedCost})
`).join('\n')}

---
*Archived by Viabl Venture Intelligence System*
`;

    const blob = new Blob([mdContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `viabl-memorandum-${evaluation.verdict.toLowerCase()}-${Date.now()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(evaluation, null, 2));
    setCopiedType('json');
    setTimeout(() => setCopiedType(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      <div 
        className="fixed inset-0 bg-zinc-950/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-white border border-zinc-300 p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 block">
              DILIGENCE EXPORT
            </span>
            <h3 className="font-serif text-xl font-bold text-zinc-950">
              Export Investment Memo
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-xs font-mono text-zinc-400 hover:text-zinc-900"
          >
            [CLOSE]
          </button>
        </div>

        <div className="space-y-3 font-sans">
          {/* Print PDF */}
          <button
            onClick={handlePrintPdf}
            className="w-full p-4 border border-zinc-200 bg-white hover:border-zinc-950 transition-colors text-left space-y-1"
          >
            <div className="font-serif font-bold text-sm text-zinc-950">
              Print or Save as Formal PDF
            </div>
            <div className="text-xs text-zinc-500">
              Clean black-and-white executive layout formatted specifically for standard letter/A4 printing.
            </div>
          </button>

          {/* Download Markdown */}
          <button
            onClick={handleDownloadMarkdown}
            className="w-full p-4 border border-zinc-200 bg-white hover:border-zinc-950 transition-colors text-left space-y-1"
          >
            <div className="font-serif font-bold text-sm text-zinc-950">
              Download Markdown Memorandum (.md)
            </div>
            <div className="text-xs text-zinc-500">
              Formatted with clean markdown tables for Notion, Obsidian, GitHub docs, or investor update emails.
            </div>
          </button>

          {/* Copy Summary */}
          <button
            onClick={handleCopySummary}
            className="w-full p-4 border border-zinc-200 bg-white hover:border-zinc-950 transition-colors text-left space-y-1"
          >
            <div className="font-serif font-bold text-sm text-zinc-950">
              {copiedType === 'summary' ? '✓ Copied to Clipboard!' : 'Copy Executive Due Diligence Summary'}
            </div>
            <div className="text-xs text-zinc-500">
              Quick synopsis containing verdict, core scores, strengths, and primary risks.
            </div>
          </button>

          {/* Copy Raw JSON */}
          <button
            onClick={handleCopyJson}
            className="w-full p-4 border border-zinc-200 bg-white hover:border-zinc-950 transition-colors text-left space-y-1"
          >
            <div className="font-serif font-bold text-sm text-zinc-950">
              {copiedType === 'json' ? '✓ Raw JSON Copied!' : 'Copy Structured JSON Data'}
            </div>
            <div className="text-xs text-zinc-500">
              Complete machine-readable payload of all dimensional metrics and partner evaluations.
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
