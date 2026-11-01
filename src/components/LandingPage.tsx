import React from 'react';
import { HeroDashboardPreview } from './HeroDashboardPreview';
import { COMMITTEE_MEMBERS, SAMPLE_INVESTMENT_MEMO } from '../services/presets';

interface LandingPageProps {
  onEvaluateIdea: () => void;
  onViewSampleMemo: () => void;
  onScrollToSection: (sectionId: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onEvaluateIdea,
  onViewSampleMemo,
  onScrollToSection
}) => {
  const sample = SAMPLE_INVESTMENT_MEMO;

  const evaluationDimensions = [
    {
      name: 'Market Need',
      code: 'DIM-01',
      description: 'Pain intensity, frequency of customer headache, and urgency to displace existing manual workarounds.',
      weight: '25% Weight',
      criteria: [
        'Painkiller vs. discretionary vitamin differentiation',
        'Customer budget line-item availability',
        'Demonstrated active search intent'
      ]
    },
    {
      name: 'Competition',
      code: 'DIM-02',
      description: 'Competitive density, incumbent inertia, and open whitespace vs legacy enterprise suites and DIY scripts.',
      weight: '10% Weight',
      criteria: [
        'Incumbent vulnerability and product bloat',
        'Fragmentation of point solutions in the niche',
        'Asymmetric wedge differentiation'
      ]
    },
    {
      name: 'Technical Feasibility',
      code: 'DIM-03',
      description: 'Architectural complexity, third-party platform API dependencies, compute cost margins, and 45-day MVP timeline.',
      weight: '15% Weight',
      criteria: [
        'Scope achievable for 1-2 founding engineers',
        'API rate limit, stability, and pricing exposure',
        'Data privacy, SOC2, and isolation requirements'
      ]
    },
    {
      name: 'Monetization',
      code: 'DIM-04',
      description: 'Customer willingness-to-pay, pricing elasticity, unit economics, gross margins, and path to $1M ARR.',
      weight: '22% Weight',
      criteria: [
        'Annual Contract Value (ACV) viability',
        'Gross software margin profile (>80%)',
        'Discretionary corporate card swipe threshold'
      ]
    },
    {
      name: 'Defensibility',
      code: 'DIM-05',
      description: 'Switching costs, proprietary workflow lock-in, data compounding flywheels, and protection against fast-followers.',
      weight: '18% Weight',
      criteria: [
        'Depth of embedding into daily customer workflow',
        'Accumulated data and metadata lock-in',
        'Resistance to feature absorption by platforms'
      ]
    },
    {
      name: 'Growth Potential',
      code: 'DIM-06',
      description: 'Organic word-of-mouth referral velocity, product-led distribution loops, and CAC sustainability.',
      weight: '10% Weight',
      criteria: [
        'Built-in peer or client-facing viral watermarks',
        'Organic distribution vs paid ad dependency',
        'Distribution channel saturation threshold'
      ]
    }
  ];

  const founderQuestions = [
    {
      question: "Is the problem painful enough?",
      committeeAnswer: "The committee identifies whether your target user loses sleep, time, or cash over this issue—or whether they simply tolerate their current messy workaround."
    },
    {
      question: "Would anyone actually pay?",
      committeeAnswer: "We stress-test the pricing model against real corporate card discretionary limits, enterprise procurement gates, and historical ACV benchmarks."
    },
    {
      question: "Is the market already saturated?",
      committeeAnswer: "We distinguish between crowded categories that have bloated legacy tools and truly open whitespace where a fast, specialized wedge can dominate."
    },
    {
      question: "What am I overlooking?",
      committeeAnswer: "The CTO investigates third-party platform API vulnerabilities and infra unit economics that typically blindside technical founders 3 months in."
    },
    {
      question: "Am I building the wrong thing?",
      committeeAnswer: "If your core thesis is fragile, the committee provides concrete adjacent pivot vectors to redirect founder hours toward higher-probability opportunities."
    }
  ];

  return (
    <div className="bg-white text-zinc-900">
      {/* 1. HERO SECTION */}
      <section className="pt-16 sm:pt-24 pb-16 border-b border-zinc-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 border border-zinc-300 bg-zinc-50 text-[11px] font-mono uppercase tracking-widest text-zinc-700">
            Institutional Startup Diligence
          </div>

          <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-normal text-zinc-950 tracking-tight leading-[1.05]">
            Before you build, know.
          </h1>

          <p className="max-w-3xl mx-auto text-base sm:text-xl text-zinc-600 font-sans font-normal leading-relaxed">
            Viabl simulates a startup investment committee to evaluate your idea across market demand, competition, execution difficulty, monetization, defensibility, and growth potential.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onEvaluateIdea}
              className="w-full sm:w-auto px-7 py-3.5 bg-zinc-950 hover:bg-zinc-800 text-white font-medium text-sm tracking-wide transition-colors"
            >
              Evaluate an Idea
            </button>

            <button
              onClick={onViewSampleMemo}
              className="w-full sm:w-auto px-7 py-3.5 bg-white hover:bg-zinc-50 text-zinc-900 border border-zinc-300 font-medium text-sm tracking-wide transition-colors"
            >
              View Sample Memo
            </button>
          </div>
        </div>

        {/* Hero Visual: Realistic Investment Dashboard Preview */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16">
          <div className="text-center mb-3">
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400">
              Interactive Committee Output Preview
            </span>
          </div>
          <HeroDashboardPreview onOpenSampleMemo={onViewSampleMemo} />
        </div>
      </section>

      {/* 2. TRUST / DUE DILIGENCE SECTION */}
      <section id="dimensions" className="py-20 sm:py-28 border-b border-zinc-200 bg-zinc-50/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14 space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-zinc-500">
              Pre-Capital Diligence Platform
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-zinc-950 font-normal tracking-tight">
              Six analytical dimensions. Zero vanity metrics.
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
              Every submitted concept is evaluated across six foundational pillars used by top-tier seed funds to determine whether a company represents a venture-scale opportunity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {evaluationDimensions.map((dim) => (
              <div 
                key={dim.code}
                className="bg-white border border-zinc-200 p-6 flex flex-col justify-between space-y-4 hover:border-zinc-400 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-zinc-100 text-[11px] font-mono text-zinc-400">
                    <span>{dim.code}</span>
                    <span className="text-zinc-600">{dim.weight}</span>
                  </div>

                  <h3 className="font-serif text-xl font-semibold text-zinc-950 mt-3 mb-2">
                    {dim.name}
                  </h3>

                  <p className="text-xs text-zinc-600 leading-relaxed mb-4">
                    {dim.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-100">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-2">
                    Diligence Focus
                  </div>
                  <ul className="space-y-1.5 text-xs text-zinc-700">
                    {dim.criteria.map((c, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="font-mono text-zinc-400">—</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS (Timeline Layout) */}
      <section id="how-it-works" className="py-20 sm:py-28 border-b border-zinc-200 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-16 space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-zinc-500">
              Evaluation Methodology
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-zinc-950 font-normal tracking-tight">
              How the investment committee operates
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
              From an unformed concept in natural language to a formal due diligence memorandum in three sequential phases.
            </p>
          </div>

          {/* Timeline Layout */}
          <div className="relative border-l border-zinc-200 ml-4 sm:ml-6 pl-8 sm:pl-12 space-y-16">
            {/* Step 1 */}
            <div className="relative group">
              <div className="absolute -left-[41px] sm:-left-[57px] top-0 w-6 h-6 rounded-none bg-zinc-950 border-4 border-white flex items-center justify-center text-[10px] font-mono text-white">
                1
              </div>
              <div className="space-y-2">
                <span className="font-mono text-xs uppercase tracking-wider text-zinc-400">Step 01</span>
                <h3 className="font-serif text-2xl text-zinc-950 font-medium">
                  Describe your startup idea
                </h3>
                <p className="text-sm text-zinc-600 leading-relaxed max-w-2xl">
                  Pitch your concept in plain English. Include target audience, pricing hypotheses, or current stage if known—or enter a single paragraph. No pitch deck, spreadsheet, or business plan required.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative group">
              <div className="absolute -left-[41px] sm:-left-[57px] top-0 w-6 h-6 rounded-none bg-zinc-950 border-4 border-white flex items-center justify-center text-[10px] font-mono text-white">
                2
              </div>
              <div className="space-y-2">
                <span className="font-mono text-xs uppercase tracking-wider text-zinc-400">Step 02</span>
                <h3 className="font-serif text-2xl text-zinc-950 font-medium">
                  Investment committee reviews it
                </h3>
                <p className="text-sm text-zinc-600 leading-relaxed max-w-2xl">
                  Four independent partners—Venture Capitalist, Serial Founder, CTO, and Growth Strategist—independently stress-test your economics, technical architecture, and distribution hurdles.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative group">
              <div className="absolute -left-[41px] sm:-left-[57px] top-0 w-6 h-6 rounded-none bg-zinc-950 border-4 border-white flex items-center justify-center text-[10px] font-mono text-white">
                3
              </div>
              <div className="space-y-2">
                <span className="font-mono text-xs uppercase tracking-wider text-zinc-400">Step 03</span>
                <h3 className="font-serif text-2xl text-zinc-950 font-medium">
                  Receive a complete investment memo
                </h3>
                <p className="text-sm text-zinc-600 leading-relaxed max-w-2xl">
                  Access an institutional investment memorandum featuring six dimensional scores (0–100), an unequivocal BUILD, PIVOT, or DROP verdict, partner marginalia, risk audit, and a 30-day lean experiment roadmap.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. INVESTMENT COMMITTEE SECTION */}
      <section id="committee" className="py-20 sm:py-28 border-b border-zinc-200 bg-zinc-50/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14 space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-zinc-500">
              The Four Reviewers
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-zinc-950 font-normal tracking-tight">
              The Investment Committee
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
              Every venture faces different failure modes. Each committee member independently scrutinizes your idea from their domain expertise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {COMMITTEE_MEMBERS.map((member) => (
              <div 
                key={member.id}
                className="bg-white border border-zinc-200 p-6 sm:p-7 space-y-5 hover:border-zinc-400 transition-colors"
              >
                <div className="flex items-start justify-between gap-4 pb-4 border-b border-zinc-100">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 block">
                      {member.roleTitle}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-zinc-950 mt-0.5">
                      {member.name}
                    </h3>
                    <p className="text-xs text-zinc-500">{member.title}</p>
                  </div>

                  <div className="w-9 h-9 border border-zinc-300 bg-zinc-50 flex items-center justify-center font-mono text-xs font-bold text-zinc-800">
                    {member.avatarInitials}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                    Role in Diligence
                  </div>
                  <p className="text-xs text-zinc-700 leading-relaxed">
                    {member.roleDescription}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-zinc-100">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                    Analytical Scrutiny
                  </div>
                  <ul className="space-y-1.5 text-xs text-zinc-600 font-sans">
                    {member.evaluationCriteria.map((crit, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="font-mono text-zinc-400 text-[11px]">•</span>
                        <span>{crit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SAMPLE MEMO PREVIEW */}
      <section id="sample-memo" className="py-20 sm:py-28 border-b border-zinc-200 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <div className="text-xs font-mono uppercase tracking-widest text-zinc-500">
              Institutional Deliverable
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-zinc-950 font-normal tracking-tight">
              Sample Investment Memorandum
            </h2>
            <p className="text-sm text-zinc-600">
              Review an authentic memo generated by the committee for an API developer tooling venture.
            </p>
          </div>

          {/* Actual VC Document */}
          <div className="document-sheet border border-zinc-300 p-6 sm:p-12 bg-white text-zinc-900 space-y-8 max-w-4xl mx-auto">
            {/* Memo Document Header */}
            <div className="border-b-2 border-zinc-900 pb-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-zinc-500 uppercase">
                <span>APEX SEED COMMITTEE // MEMORANDUM</span>
                <span>RESTRICTED // PARTNER REVIEW</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono pt-2">
                <div>
                  <span className="text-zinc-400 block text-[10px]">DEAL REF:</span>
                  <span className="font-semibold text-zinc-900">{sample.id}</span>
                </div>
                <div>
                  <span className="text-zinc-400 block text-[10px]">EVALUATION DATE:</span>
                  <span className="font-semibold text-zinc-900">OCTOBER 2026</span>
                </div>
                <div>
                  <span className="text-zinc-400 block text-[10px]">SECTOR:</span>
                  <span className="font-semibold text-zinc-900">DEV INFRASTRUCTURE</span>
                </div>
                <div>
                  <span className="text-zinc-400 block text-[10px]">PARTNERS PRESENT:</span>
                  <span className="font-semibold text-zinc-900">4 / 4 ATTENDING</span>
                </div>
              </div>
            </div>

            {/* Verdict & Score Banner */}
            <div className="grid grid-cols-1 sm:grid-cols-3 border border-zinc-200 divide-y sm:divide-y-0 sm:divide-x divide-zinc-200 bg-zinc-50/60">
              <div className="p-4 sm:p-5">
                <span className="text-[10px] font-mono text-zinc-500 uppercase block">Overall Viability Score</span>
                <span className="font-serif text-3xl font-bold text-zinc-950 tabular-nums">
                  {sample.overallViabilityScore}
                  <span className="text-xs font-mono text-zinc-400 font-normal"> / 100</span>
                </span>
              </div>

              <div className="p-4 sm:p-5">
                <span className="text-[10px] font-mono text-zinc-500 uppercase block">Committee Recommendation</span>
                <span className="font-mono text-sm font-bold text-zinc-950 uppercase tracking-wider block mt-1">
                  VERDICT: {sample.verdict}
                </span>
              </div>

              <div className="p-4 sm:p-5">
                <span className="text-[10px] font-mono text-zinc-500 uppercase block">Consensus Confidence</span>
                <span className="font-serif text-2xl font-bold text-zinc-950 tabular-nums">
                  {sample.confidenceRating}%
                </span>
              </div>
            </div>

            {/* Executive Summary */}
            <div className="space-y-3">
              <h3 className="font-mono text-xs uppercase tracking-wider font-bold text-zinc-900 border-b border-zinc-200 pb-1">
                1. Executive Summary
              </h3>
              <p className="font-serif text-base text-zinc-800 leading-relaxed">
                {sample.executiveSummary}
              </p>
            </div>

            {/* Risk Analysis Table */}
            <div className="space-y-3">
              <h3 className="font-mono text-xs uppercase tracking-wider font-bold text-zinc-900 border-b border-zinc-200 pb-1">
                2. Risk Analysis & Fatal Flaws
              </h3>
              <table className="w-full text-left text-xs border border-zinc-200 divide-y divide-zinc-200">
                <thead className="bg-zinc-50 font-mono text-[10px] text-zinc-500 uppercase">
                  <tr>
                    <th className="p-2.5">Risk Vector</th>
                    <th className="p-2.5">Committee Assessment</th>
                    <th className="p-2.5">Recommended Mitigant</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 font-sans text-zinc-700">
                  <tr>
                    <td className="p-2.5 font-semibold text-zinc-900">Platform Dependency</td>
                    <td className="p-2.5">GitHub webhook policies and rate limit exposure.</td>
                    <td className="p-2.5">Support GitLab and self-hosted on-prem within 6 months.</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-semibold text-zinc-900">Incumbent Fast-Followers</td>
                    <td className="p-2.5">Mintlify/GitBook copying Git synchronization.</td>
                    <td className="p-2.5">Deepen CI/CD testing integration beyond static docs.</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-semibold text-zinc-900">Security Clearance</td>
                    <td className="p-2.5">Enterprise hesitation to grant repository write permissions.</td>
                    <td className="p-2.5">Operate AST parsing in isolated ephemeral memory.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Partner Notes */}
            <div className="space-y-3">
              <h3 className="font-mono text-xs uppercase tracking-wider font-bold text-zinc-900 border-b border-zinc-200 pb-1">
                3. Partner Notes & Dissenting Views
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 border border-zinc-200 bg-zinc-50/50 space-y-1.5">
                  <div className="text-[11px] font-mono font-semibold text-zinc-900">
                    Elena Rostova (General Partner)
                  </div>
                  <p className="text-xs font-serif italic text-zinc-800">
                    "{sample.expertEvaluations.vc.quote}"
                  </p>
                </div>

                <div className="p-4 border border-zinc-200 bg-zinc-50/50 space-y-1.5">
                  <div className="text-[11px] font-mono font-semibold text-zinc-900">
                    Marcus Vance (Serial Founder)
                  </div>
                  <p className="text-xs font-serif italic text-zinc-800">
                    "{sample.expertEvaluations.founder.quote}"
                  </p>
                </div>
              </div>
            </div>

            {/* Document Action */}
            <div className="pt-4 border-t border-zinc-200 flex justify-between items-center text-xs font-mono text-zinc-500">
              <span>END OF MEMORANDUM // CODE: MEMO-2026-DEV-084</span>
              <button
                onClick={onViewSampleMemo}
                className="text-zinc-950 font-bold underline hover:text-zinc-600 font-sans"
              >
                Inspect Complete Interactive Report →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. WHY FOUNDERS USE VIABL */}
      <section id="why-viabl" className="py-20 sm:py-28 border-b border-zinc-200 bg-zinc-50/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <div className="max-w-2xl space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-zinc-500">
              Founder Due Diligence
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-zinc-950 font-normal tracking-tight">
              Honest answers to the questions founders fear asking
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
              Before raising capital, recruiting engineers, or spending thousands on prototyping, validate the underlying fundamentals.
            </p>
          </div>

          <div className="border border-zinc-200 divide-y divide-zinc-200 bg-white">
            {founderQuestions.map((item, idx) => (
              <div key={idx} className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline">
                <div className="md:col-span-5 font-serif text-lg sm:text-xl text-zinc-950 italic">
                  "{item.question}"
                </div>
                <div className="md:col-span-7 text-xs sm:text-sm text-zinc-600 leading-relaxed font-sans">
                  {item.committeeAnswer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FOOTER CTA */}
      <section className="py-20 sm:py-28 bg-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="inline-block px-2.5 py-0.5 border border-zinc-300 bg-zinc-50 text-[10px] font-mono uppercase tracking-widest text-zinc-600">
            Pre-Seed & Seed Stage Diligence
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl font-normal text-zinc-950 tracking-tight">
            Validate ideas before you spend months building them.
          </h2>

          <p className="text-sm sm:text-base text-zinc-600 max-w-xl mx-auto leading-relaxed">
            Submit your startup idea to the simulated investment committee. Receive an exhaustive due diligence memo in seconds.
          </p>

          <div className="pt-2">
            <button
              onClick={onEvaluateIdea}
              className="px-8 py-4 bg-zinc-950 hover:bg-zinc-800 text-white font-medium text-sm tracking-wide transition-colors shadow-sm"
            >
              Run Evaluation
            </button>
          </div>
        </div>
      </section>

      {/* Institutional Editorial Footer */}
      <footer className="border-t border-zinc-200 py-10 bg-zinc-50 text-xs text-zinc-500 font-mono">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-zinc-900 text-sm">Viabl</span>
            <span>— Venture Intelligence & Startup Diligence</span>
          </div>
          <div>
            Modeled on institutional seed capital criteria. Evaluates Need, Competition, Feasibility, Monetization, Defensibility & Growth.
          </div>
        </div>
      </footer>
    </div>
  );
};
