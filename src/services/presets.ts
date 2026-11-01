import { StartupIdeaInput, EvaluationResult } from '../types';

export interface PresetIdea extends StartupIdeaInput {
  id: string;
  badge: string;
  expectedVerdictPreview: 'BUILD' | 'PIVOT' | 'DROP';
}

export const COMMITTEE_MEMBERS = [
  {
    id: 'vc' as const,
    roleTitle: 'Venture Capitalist',
    name: 'Elena Rostova',
    title: 'General Partner, Apex Capital',
    firm: 'Series Seed & Early Growth Fund',
    avatarInitials: 'ER',
    roleDescription: 'Evaluates Total Addressable Market (TAM), margin profile, fund-return multiple, and exit landscape.',
    focusArea: 'Unit Economics & Fundability',
    evaluationCriteria: [
      'Addressable market size ($1B+ TAM)',
      'Gross margin profile (>80%)',
      'Defensibility and enterprise moat',
      'Follow-on round fundability'
    ]
  },
  {
    id: 'founder' as const,
    roleTitle: 'Startup Founder',
    name: 'Marcus Vance',
    title: 'Serial Entrepreneur (1 Exit, YC Alum)',
    firm: 'Early-stage Venture Fellow',
    avatarInitials: 'MV',
    roleDescription: 'Evaluates practical 0-to-1 grind, customer problem intensity, and early distribution friction.',
    focusArea: 'PMF & Operational Grit',
    evaluationCriteria: [
      'Customer pain threshold (hair on fire problem)',
      'Onboarding friction & time-to-value',
      'Founder-market fit & speed of execution',
      'Willingness to pay upfront deposits'
    ]
  },
  {
    id: 'cto' as const,
    roleTitle: 'CTO',
    name: 'Dr. Aris Thorne',
    title: 'Fractional CTO & Ex-Staff Systems Architect',
    firm: 'Enterprise Infrastructure Advisory',
    avatarInitials: 'AT',
    roleDescription: 'Evaluates architectural complexity, API dependency risks, compute cost margins, and build timeline.',
    focusArea: 'Technical Feasibility & Scalability',
    evaluationCriteria: [
      'Core architectural risk & 45-day MVP scope',
      'Third-party platform API vulnerabilities',
      'Data isolation & compliance requirements',
      'Infrastructure unit cost economics'
    ]
  },
  {
    id: 'marketer' as const,
    roleTitle: 'Growth Strategist',
    name: 'Chloe Lin',
    title: 'Growth Partner & Former VP of Growth',
    firm: 'B2B Distribution & Retention',
    avatarInitials: 'CL',
    roleDescription: 'Evaluates Customer Acquisition Cost (CAC), organic distribution loops, and retention dynamics.',
    focusArea: 'Distribution & Growth Potential',
    evaluationCriteria: [
      'Customer Acquisition Cost vs Lifetime Value',
      'Organic product-led distribution loops',
      'Channel saturation & paid ad dependency',
      'Net revenue retention indicators'
    ]
  }
];

export const PRESET_IDEAS: PresetIdea[] = [
  {
    id: 'ai-doc-sync',
    badge: 'B2B Developer Infrastructure',
    title: 'CodeSync: Real-Time API Specification & Sandbox Sync from Git PRs',
    description: 'An automated developer platform that hooks into GitHub/GitLab pull requests to continuously synchronize API documentation, OpenAPI schemas, and generate interactive client sandboxes whenever engineers push changes.',
    targetAudience: 'Engineering teams, Developer Relations, and API-first SaaS companies',
    monetizationModel: 'Tiered B2B subscription ($99 - $499/mo per dev organization)',
    stage: 'Just an Idea',
    expectedVerdictPreview: 'BUILD'
  },
  {
    id: 'maker-marketplace',
    badge: 'Two-Sided Marketplace',
    title: 'WorkshopShare: Peer-to-Peer Machine & Woodshop Tool Rental',
    description: 'A peer marketplace connecting hobbyist woodworkers, welders, and 3D printing makers with local workshop owners who have idle heavy machinery and industrial tools during weekdays.',
    targetAudience: 'Independent makers, hobbyists, and light fabrication shops',
    monetizationModel: '15% transaction take-rate + damage liability waiver',
    stage: 'Just an Idea',
    expectedVerdictPreview: 'PIVOT'
  },
  {
    id: 'hipaa-agent',
    badge: 'Enterprise Compliance',
    title: 'HealthGuard: Continuous HIPAA & SOC2 Infrastructure Auditor',
    description: 'An automated security and compliance platform that monitors cloud infrastructure, code repositories, and vendor agreements to ensure healthcare SaaS startups maintain continuous audit-readiness without high-priced manual consultants.',
    targetAudience: 'Digital health startups and medtech engineering teams',
    monetizationModel: 'Annual recurring subscription ($12,000 - $36,000/yr)',
    stage: 'Prototype / MVP',
    expectedVerdictPreview: 'BUILD'
  }
];

export const SAMPLE_INVESTMENT_MEMO: EvaluationResult = {
  id: 'MEMO-2026-DEV-084',
  timestamp: Date.now() - 3600000 * 24 * 2, // 2 days ago
  ideaText: 'CodeSync: An automated developer platform that hooks directly into GitHub/GitLab pull requests to continuously synchronize API documentation, OpenAPI specifications, and generate interactive client code playgrounds whenever engineers commit changes.',
  industry: 'Developer Infrastructure & Enterprise Tooling',
  targetCustomer: 'Engineering Teams, CTOs, and API-First Software Companies',
  monetizationModel: 'Tiered Usage-Based SaaS ($99 to $499/mo per dev organization)',
  
  overallViabilityScore: 82,
  verdict: 'BUILD',
  verdictSummary: 'Exceptional workflow alignment with quantifiable developer productivity gains. High willingness-to-pay within target engineering organizations and manageable architectural surface area. Recommend proceeding with MVP scoping and securing pilot letters of intent.',
  confidenceRating: 94,

  executiveSummary: 'CodeSync addresses an acute, persistent friction in software organizations: stale, drifting API documentation. By embedding directly into existing Git workflows (PR checks and CI/CD pipelines), the product eliminates the human failure point in documentation maintenance. The market need is validated by pervasive developer dissatisfaction with manual documentation tools. While competition from incumbent docs platforms exists, none possess deep Git-native auto-generation hooks as a primary workflow wedge. Defensibility builds over time through team integration, schema version history, and client SDK generation.',

  keyStrengths: [
    'Deep workflow lock-in: Once embedded into GitHub actions and CI/CD, replacing the system introduces engineering disruption.',
    'Clear economic ROI: Saves an estimated 8-12 senior developer hours per sprint, easily justifying a $200-$500/mo team subscription.',
    'Fast time-to-market: Can be built using standard AST parsers, language servers, and Git webhooks within 45 days.',
    'Low initial CAC: Developer tools benefit from organic GitHub marketplace discovery and word-of-mouth engineering advocacy.'
  ],

  fatalFlaws: [
    'Platform dependency on GitHub/GitLab API access policies and webhook reliability.',
    'Incumbent documentation providers (e.g. Readme, Mintlify) could attempt to build Git-sync features.',
    'Requires initial security clearance to read proprietary code repositories during pull requests.'
  ],

  scores: {
    marketNeed: {
      score: 88,
      label: 'Market Need',
      rationale: 'Stale API docs rank among the top 3 developer grievances. Direct correlation to customer onboarding friction.',
      benchmark: 'Top 8% in B2B DevTools',
      pros: ['Solves acute developer pain', 'High organic search volume for doc automation'],
      cons: ['Teams sometimes accept poor docs as status quo']
    },
    competition: {
      score: 74,
      label: 'Competition',
      rationale: 'Incumbents are focused on hosted static sites rather than bidirectional code-to-spec synchronizers.',
      benchmark: 'Top 18% in competitive whitespace',
      pros: ['Incumbent tools are editor-centric, not Git-native', 'Clear wedge positioning'],
      cons: ['Funded startups exist in adjacent API documentation space']
    },
    technicalFeasibility: {
      score: 85,
      label: 'Technical Feasibility',
      rationale: 'Clean architectural scope using TypeScript AST parsers, OpenAPI generator libraries, and serverless workers.',
      benchmark: 'Top 10% in engineering feasibility',
      pros: ['Mature open-source parsers available', 'Predictable cloud worker costs'],
      cons: ['Handling non-standard monorepo setups requires edge-case engineering']
    },
    monetization: {
      score: 82,
      label: 'Monetization',
      rationale: 'B2B engineering budgets have discretionary spending for productivity tooling on corporate cards.',
      benchmark: 'Top 12% in willingness-to-pay',
      pros: ['Standard seat/repo tier pricing', 'Natural expansion as engineering headcounts grow'],
      cons: ['Requires security reviews for enterprise tier contracts']
    },
    defensibility: {
      score: 79,
      label: 'Defensibility',
      rationale: 'Accumulated documentation history, schema diffs, and integration into developer workflow create high switching friction.',
      benchmark: 'Top 15% in workflow lock-in',
      pros: ['Embedded in developer CI/CD habit', 'Repository metadata moat'],
      cons: ['Core parsing logic is not proprietary patentable deep tech']
    },
    growthPotential: {
      score: 76,
      label: 'Growth Potential',
      rationale: 'Public-facing developer API docs naturally expose the "Synced with CodeSync" badge to other developers.',
      benchmark: 'Top 20% in viral coefficient',
      pros: ['Every public API doc is an organic billboard', 'Strong developer community word-of-mouth'],
      cons: ['Private internal enterprise documentation has no viral exposure']
    }
  },

  expertEvaluations: {
    vc: {
      personaId: 'vc',
      personaName: 'Elena Rostova',
      personaTitle: 'General Partner, Apex Capital',
      stance: 'Strongly Bullish',
      verdictVote: 'BUILD',
      quote: 'Developer productivity tools that prevent operational debt consistently command 80%+ gross margins and negative net churn once embedded in CI/CD.',
      primaryThesis: 'The market for developer infrastructure is mature and willing to pay for tools that accelerate release velocity. At $299/month across 3,000 mid-market engineering teams, this reaches a clean $10M ARR benchmark.',
      deepDiveAnalysis: 'From an investment committee perspective, this deals with a fundamental software lifecycle reality: code changes faster than documentation. By tying the document update directly to the Git commit gate, you convert an administrative chore into an automated pipeline step. The exit landscape for developer tooling is broad (Atlassian, Datadog, GitLab).',
      greenFlags: [
        'High gross margin profile (85%+ software margins)',
        'Built-in expansion revenue as engineering team size scales',
        'Multiple corporate acquisition suitors in devops tooling'
      ],
      redFlags: [
        'Risk of commoditization if limited purely to markdown generation',
        'Need to demonstrate expansion beyond the initial $99/mo tier'
      ],
      hardQuestionsForFounders: [
        'What prevents GitHub from introducing an automated "Doc Actions" feature natively?',
        'How do you secure code-read access permissions from security-sensitive enterprise teams?',
        'What is your target payback period on sales engineering?'
      ]
    },
    founder: {
      personaId: 'founder',
      personaName: 'Marcus Vance',
      personaTitle: 'Serial Entrepreneur (1 Exit, YC Alum)',
      stance: 'Bullish',
      verdictVote: 'BUILD',
      quote: 'Engineers hate writing docs, but hate reading out-of-date docs even more. If the prototype runs seamlessly on a single repo in 5 minutes, founders will sign up immediately.',
      primaryThesis: 'The 0-to-1 hurdle here is installation friction. If it requires a 40-page configuration YAML, it will fail. If it is a one-click GitHub App install that creates a sample PR, adoption will spread through engineering teams like wildfire.',
      deepDiveAnalysis: 'I lived through this at my last company: we spent three days before every major release manually updating Swagger docs and communicating changes to clients. It is a genuine pain point that every VP of Engineering recognizes. The key execution priority is delivering instantaneous value on Day 1.',
      greenFlags: [
        'Solves an acute, recurring daily annoyance',
        'Can be demonstrated live with a 2-minute Loom recording',
        'High organic referral potential in engineering Slack groups'
      ],
      redFlags: [
        'Complex edge cases in large legacy monorepos could slow onboarding',
        'Risk of scope creep into full CMS or knowledge base territory'
      ],
      hardQuestionsForFounders: [
        'Can you get 5 engineering leads to install the GitHub App this week on test repos?',
        'What is the exact onboarding time from repo auth to first generated spec?',
        'What is the single core feature you will refuse to build in version 1?'
      ]
    },
    cto: {
      personaId: 'cto',
      personaName: 'Dr. Aris Thorne',
      personaTitle: 'Fractional CTO & Ex-Staff Systems Architect',
      stance: 'Bullish',
      verdictVote: 'BUILD',
      quote: 'The engineering scope is crisp and achievable for a two-person team. By relying on AST parsers rather than nondeterministic generation, you maintain 100% technical accuracy.',
      primaryThesis: 'Avoid relying on generative models for syntax correctness. Use deterministic AST parsers (Babel, TypeScript Compiler API) for code extraction and use LLMs strictly for generating human-readable context descriptions and usage examples.',
      deepDiveAnalysis: 'Architecturally, this should be structured as an asynchronous event-driven worker pipeline. When a pull request event arrives via webhook, a stateless worker checks out the diff, parses modified endpoint definitions, updates the OpenAPI JSON document, and posts a preview summary directly into the PR review thread.',
      greenFlags: [
        'Stateless compute architecture scales linearly with minimal server costs',
        'Open-source libraries exist for virtually every major web framework (Express, FastAPI, Spring)',
        'Clean boundaries for SOC2 Type II compliance'
      ],
      redFlags: [
        'Monorepos with 100k+ lines could introduce webhook timeout challenges',
        'Managing GitHub rate limits during high-frequency team commit bursts'
      ],
      hardQuestionsForFounders: [
        'How do you isolate parsed code in memory to guarantee zero repository data persistence?',
        'What is your fallback when parsing proprietary or highly metaprogrammed frameworks?',
        'What is your target p95 worker execution duration per commit diff?'
      ]
    },
    marketer: {
      personaId: 'marketer',
      personaName: 'Chloe Lin',
      personaTitle: 'Growth Partner & Former VP of Growth',
      stance: 'Bullish',
      verdictVote: 'BUILD',
      quote: 'Public developer documentation is one of the highest-traffic surfaces on the web. A subtle footer badge on every generated doc creates an organic, zero-CAC growth loop.',
      primaryThesis: 'Developer tools win through product-led growth (PLG). You do not need outbound enterprise SDRs to reach the first $1M ARR. Focus on GitHub Marketplace optimization, open-source maintainer sponsorships, and interactive demo docs.',
      deepDiveAnalysis: 'Your viral loop is structural: Company A builds their developer portal with CodeSync. Thousands of external developers consume Company A’s documentation. A percentage of those developers are engineering leads at Company B and C, who notice the seamless interactive playgrounds and adopt CodeSync for their own internal APIs.',
      greenFlags: [
        'Built-in distribution watermark on client-facing API portals',
        'Strong organic search volume for technical documentation keywords',
        'Active developer community channels (Hacker News, Reddit r/programming)'
      ],
      redFlags: [
        'Developers have high ad blindness; standard paid advertising will have low conversion',
        'Risk of low free-to-paid conversion if free tier is too generous'
      ],
      hardQuestionsForFounders: [
        'What is your exact gating mechanism between the free open-source tier and the paid team tier?',
        'How will you leverage the GitHub Marketplace as a zero-cost top-of-funnel channel?',
        'What is your plan to prevent churn during prolonged engineering development pauses?'
      ]
    }
  },

  competitorLandscape: [
    {
      name: 'Mintlify / GitBook / Readme',
      category: 'Direct',
      threatLevel: 'Medium',
      advantageOverYou: 'Established brand reputation, polished web documentation themes, venture funding.',
      yourWinningAngle: 'They require manual markdown editing; you provide automatic Git commit synchronization that never drifts.'
    },
    {
      name: 'Internal Wiki & Notion Docs',
      category: 'Incumbent',
      threatLevel: 'High',
      advantageOverYou: 'Already licensed and used across the entire non-technical company.',
      yourWinningAngle: 'Internal wikis become obsolete within weeks; CodeSync is enforced as a build-check in CI.'
    },
    {
      name: 'Native Swagger / OpenAPI SwaggerUI',
      category: 'Indirect',
      threatLevel: 'Low',
      advantageOverYou: 'Free, open source, familiar standard.',
      yourWinningAngle: 'Ugly legacy interface, lacks interactive sandboxes, manual annotation fatigue.'
    }
  ],

  pivotAngles: [
    {
      title: 'Automated SDK Generation Layer',
      targetAudience: 'High-Volume Enterprise API Providers (e.g. Stripe, Twilio competitors)',
      revisedAngle: 'Do not just synchronize docs; auto-generate and publish tested TypeScript, Python, and Go client SDK libraries on every release.',
      whyItWorksBetter: 'Triples contract ACV from $300/mo to $1,500/mo by solving external client developer integration.',
      viabilityMultiplier: '+22% Contract Value'
    }
  ],

  validationExperiments: [
    {
      step: 1,
      timeframe: 'Days 1 - 5',
      title: 'VP of Engineering Customer Discovery',
      hypothesis: 'At least 7 of 10 engineering managers report API doc drift causes production confusion or customer support tickets.',
      method: 'Conduct structured 20-minute interviews with engineering leaders without pitching the solution upfront.',
      successMetric: '7+ leaders confirm documentation drift is an active quarterly sprint problem',
      estimatedCost: '$0'
    },
    {
      step: 2,
      timeframe: 'Days 6 - 12',
      title: 'GitHub Marketplace Teaser & Spec Playground',
      hypothesis: 'Developers visiting an interactive playground comparing manual vs auto-synced docs will join the private beta.',
      method: 'Publish a clean, high-speed interactive demo repo showing automated PR comments with generated docs.',
      successMetric: '> 15% conversion to beta install waitlist with verified GitHub accounts',
      estimatedCost: '$50'
    },
    {
      step: 3,
      timeframe: 'Days 13 - 22',
      title: 'Concierge Alpha Deployment on 5 Target Repos',
      hypothesis: 'Teams will keep the bot enabled across daily pull requests without uninstalling.',
      method: 'Manually configure the prototype bot on 5 partner startup repositories and monitor webhook engagement.',
      successMetric: '4 out of 5 teams actively merge the auto-generated documentation PRs',
      estimatedCost: '$0'
    },
    {
      step: 4,
      timeframe: 'Days 23 - 30',
      title: 'Early Pilot Commercial Commitments',
      hypothesis: 'Alpha partners will sign a $99/mo pilot agreement rather than allow the bot to be decommissioned.',
      method: 'Present 6-month pilot subscription with a founding member discount and dedicated support channel.',
      successMetric: 'At least 3 signed commercial pilot agreements',
      estimatedCost: '$0'
    }
  ],

  simulatedDebateSnippet: [
    {
      speaker: 'Elena Rostova',
      role: 'Venture Capitalist',
      message: 'The thesis hinges on whether this is an indispensable workflow layer or just another documentation theme. If it is tied to CI/CD gates, the switching cost becomes immense.'
    },
    {
      speaker: 'Marcus Vance',
      role: 'Startup Founder',
      message: 'I agree with Elena. When docs drift, customer onboarding takes days instead of minutes. If you can make setup take 60 seconds via GitHub App auth, founders will adopt it without hesitation.'
    },
    {
      speaker: 'Dr. Aris Thorne',
      role: 'CTO',
      message: 'The key technical constraint is deterministic parsing. Do not hallucinate API parameters with an LLM. Use AST parsing for the contract, and only use AI for explanations.'
    },
    {
      speaker: 'Chloe Lin',
      role: 'Growth Strategist',
      message: 'And the viral distribution takes care of itself: every public API doc generated with CodeSync has a discrete badge that links back to the platform.'
    }
  ]
};
