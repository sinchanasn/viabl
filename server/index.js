import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Committee Dossiers
const COMMITTEE_MEMBERS = [
  {
    id: 'vc',
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
    id: 'founder',
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
    id: 'cto',
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
    id: 'marketer',
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

// Presets
const PRESET_IDEAS = [
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

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    service: 'Viabl Venture Capital Intelligence Server',
    version: '2.4.0',
    port: PORT,
    environment: process.env.NODE_ENV || 'development'
  });
});

app.get('/api/committee', (req, res) => {
  res.json({ committee: COMMITTEE_MEMBERS });
});

app.get('/api/presets', (req, res) => {
  res.json({ presets: PRESET_IDEAS });
});

/**
 * Helper to extract clean venture name
 */
function extractVentureTitle(title, description) {
  if (title && title.trim()) return title.trim();
  const colonMatch = description.match(/^([^:\-–—\n]{3,40})[:\-–—]/);
  if (colonMatch) return colonMatch[1].trim();
  
  const words = description.split(/\s+/).slice(0, 5).join(' ');
  return words.length > 30 ? words.slice(0, 27) + '...' : words;
}

/**
 * Generates an authentic, idea-specific dynamic committee debate
 */
function generateVentureSpecificDebate({
  ventureName,
  description,
  icp,
  monetization,
  verdict,
  score,
  isAI,
  isB2B,
  isMarketplace,
  isConsumer,
  isDevTools,
  isHealth,
  isLocal,
  isFinTech
}) {
  const turns = [];

  // 1. Marcus Vance (Founder perspective: Ground reality, customer pain & onboarding hurdle)
  let marcusMessage = '';
  if (isDevTools) {
    marcusMessage = `When evaluating ${ventureName}, you have to look at the daily friction for ${icp}. Engineers despise administrative overhead, but their default reaction to new tooling is deep skepticism. If onboarding ${ventureName} requires a complex YAML config or intrusive repository permissions, adoption will stall in week one. Marcus's rule: you must deliver a clean 'Aha!' moment in under three minutes from auth.`;
  } else if (isHealth || isFinTech) {
    marcusMessage = `In regulated sectors like this, ${icp} aren't shopping for another dashboard; they are terrified of audit fines, vendor questionnaire failure, and compliance liability. For ${ventureName}, the hurdle isn't convincing them the problem exists—it's establishing enough trust so an executive will risk their regulatory standing on an early-stage product.`;
  } else if (isMarketplace) {
    marcusMessage = `Marketplaces look deceptive on paper. Everyone gets excited about connecting ${icp}, but the cold-start reality of ${ventureName} will be brutal. If a user opens the platform and sees sparse supply in their area or takes 48 hours to get a response, they churn forever. You cannot launch broadly; you must manufacture artificial liquidity in one single micro-niche first.`;
  } else if (isConsumer) {
    marcusMessage = `My primary concern for ${ventureName} is Day-30 retention. Consumer applications get easy top-of-funnel curiosity, but if ${icp} only uses this when they are bored or as a novelty, cohort retention will fall off a cliff. If they aren't returning three times a week organically, no amount of marketing will fix unit economics.`;
  } else if (isLocal) {
    marcusMessage = `Physical and local service operations live and die on labor reliability, scheduling density, and dispute handling. For ${ventureName}, software is only 20% of the challenge; the other 80% is operational fulfillment and making sure ${icp} get consistent service every single time.`;
  } else {
    marcusMessage = `Look at the day-to-day workflow of ${icp}. Right now, how are they dealing with this? They are hacking together spreadsheets, manual emails, or clunky legacy software. For ${ventureName} to succeed, the pain has to be top-of-mind—not something they think about once a quarter, but an operational bottleneck they actively complain about on Slack today.`;
  }
  turns.push({
    speaker: 'Marcus Vance',
    role: 'Startup Founder',
    message: marcusMessage
  });

  // 2. Dr. Aris Thorne (CTO perspective: Architectural feasibility, API cost, security, edge cases)
  let arisMessage = '';
  if (isAI) {
    arisMessage = `From an architectural standpoint for ${ventureName}, do not build a thin prompt wrapper around upstream LLMs. If OpenAI or Anthropic drops latency by 50% or releases a native feature next quarter, your product disappears. The engineering moat must come from proprietary state caching, domain-specific AST parsers, and deterministic validation rather than pure generative token guessing. Also, watch the token compute margin squeeze under high concurrency.`;
  } else if (isDevTools) {
    arisMessage = `Architecturally, ${ventureName} should be designed as a stateless, asynchronous event-driven worker engine. When webhooks fire, workers must parse diffs, isolate code execution in ephemeral memory to respect client security boundaries, and post results without timing out. Keep the core runtime decoupled so on-prem enterprise deployments are trivial down the road.`;
  } else if (isHealth || isFinTech) {
    arisMessage = `The technical risk for ${ventureName} isn't writing the application code—it's data isolation, encryption-at-rest with customer-managed keys, and maintaining immutable audit trails. If we sign Business Associate Agreements (BAAs) or process sensitive client records, SOC2 Type II compliance and zero data persistence policies must be baked into the schema on Day 1.`;
  } else if (isMarketplace) {
    arisMessage = `The core tech stack for ${ventureName} is straightforward—Stripe Connect for split escrows, Postgres, and geolocation indexing. But the engineering friction will be edge cases: fraud prevention, chargeback handling, automated calendar sync, and real-time messaging without letting users leak personal phone numbers to bypass fees.`;
  } else {
    arisMessage = `From an engineering perspective, the initial scope for ${ventureName} is realistic for a two-person team to ship in 30 to 45 days. Keep the infrastructure boring: a modular monolith, managed relational database, and queue-backed background workers. Avoid premature microservices until you have paying customers straining database read-replicas.`;
  }
  turns.push({
    speaker: 'Dr. Aris Thorne',
    role: 'CTO',
    message: arisMessage
  });

  // 3. Elena Rostova (VC perspective: TAM, ACV, Pricing power, Margins & Defensibility)
  let elenaMessage = '';
  if (isMarketplace) {
    elenaMessage = `Let's look at Gross Merchandise Value (GMV) and take-rates for ${ventureName}. With ${monetization}, what is the average transaction size? If an order is under $50, taking a small commission or platform fee yields razor-thin net revenue per transaction. You need astronomical booking frequency to return a seed fund. Even more critical: how do you prevent disintermediation when ${icp} take transaction #2 offline?`;
  } else if (isB2B) {
    elenaMessage = `Let's analyze the economic fundamentals of ${ventureName}. With ${monetization}, what is the realistic Annual Contract Value (ACV)? If you price at $299 to $999 per month, you only need 1,000 to 3,000 mid-market accounts to build a $10M ARR venture that commands a strong valuation. Because this targets ${icp}, you have corporate discretionary budget lines. But you must demonstrate net revenue retention (NRR) expansion over 12 months.`;
  } else if (isConsumer) {
    elenaMessage = `From an institutional fund perspective, ${ventureName} faces consumer willingness-to-pay elasticity. If consumers are asked to pay monthly for this, churn could easily exceed 8% per month. Unless you build an undeniable daily habit or unlock high-ticket transaction commerce, consumer subscription unit economics will be crushed by ad acquisition costs.`;
  } else {
    elenaMessage = `Let's examine the pricing leverage of ${ventureName}. If you charge under ${monetization}, is the ROI immediately quantifiable for the buyer? If a tool saves 10 hours a week or $5,000 in operational waste, pricing shouldn't be timid. I'd rather see this venture price confidently into high-conviction pilot customers than compete in a race to the bottom on price.`;
  }
  turns.push({
    speaker: 'Elena Rostova',
    role: 'Venture Capitalist',
    message: elenaMessage
  });

  // 4. Chloe Lin (Growth Strategist perspective: CAC/LTV, Distribution wedges, PLG)
  let chloeMessage = '';
  if (isDevTools || (isB2B && isAI)) {
    chloeMessage = `You cannot rely on Google Ads or outbound SDR spam to acquire ${icp} for ${ventureName}. The winning distribution playbook here is Product-Led Growth (PLG): build a free developer utility, interactive sandbox, or open-source CLI that solves one acute micro-problem instantly. Let engineers experience the speed gains for free, and make every public output carry a discreet watermark that brings in their peers at zero CAC.`;
  } else if (isMarketplace) {
    chloeMessage = `For ${ventureName}, forget nationwide marketing. Focus 100% of your energy on supply-side acquisition in a single zip code or niche vertical. Once you have dense, high-quality supply, you can activate demand through hyper-targeted local partnerships and community channels. You need a 3:1 LTV to CAC ratio within 6 months of cohort maturity.`;
  } else if (isHealth || isFinTech) {
    chloeMessage = `Distribution to ${icp} requires high-trust institutional credibility. For ${ventureName}, growth won't come from social media; it comes from publishing forensic teardowns of compliance failures, hosting private executive dinners, and partnering with industry accelerators where early-stage founders are desperate for audit clearance.`;
  } else if (isConsumer) {
    chloeMessage = `If ${ventureName} doesn't have an organic viral K-factor or a built-in reason for ${icp} to share outputs with their friends, the venture is at the mercy of paid Meta and TikTok ads. You need to engineer shareable artifacts or status mechanics directly into the core user loop.`;
  } else {
    chloeMessage = `To de-risk customer acquisition for ${ventureName}, identify the exact online and offline watering holes where ${icp} congregate. Deliver free value upfront through benchmarks, templates, or calculators before asking for a credit card. Aim for a payback period on CAC under six months.`;
  }
  turns.push({
    speaker: 'Chloe Lin',
    role: 'Growth Strategist',
    message: chloeMessage
  });

  // 5. Elena Rostova or Marcus Vance (Consensus conclusion based on Verdict)
  let closingMessage = '';
  if (verdict === 'BUILD') {
    closingMessage = `The committee consensus on ${ventureName} is clear: RECOMMENDATION BUILD (Score: ${score}/100). The market pull from ${icp} is genuine, the technical boundaries are manageable, and the unit economics support venture-scale growth. Next actionable milestone: secure five signed pilot Letters of Intent (LOIs) with target buyers before writing code.`;
  } else if (verdict === 'PIVOT') {
    closingMessage = `The committee consensus on ${ventureName} is RECOMMENDATION PIVOT (Score: ${score}/100). While the underlying problem has merit, the current target angle or monetization model introduces avoidable execution friction. Re-anchor the positioning into an acute high-ACV sub-niche with non-elastic budgets before investing in a full product build.`;
  } else {
    closingMessage = `The committee consensus on ${ventureName} is RECOMMENDATION DROP (Score: ${score}/100). The combination of high customer acquisition friction, low defensive switching moats, and platform dependency presents unfavorable risk-adjusted return dynamics. Founder hours and capital are better preserved for adjacent, higher-probability opportunities.`;
  }
  turns.push({
    speaker: 'Elena Rostova',
    role: 'Venture Capitalist',
    message: closingMessage
  });

  return turns;
}

// Evaluation Engine
app.post('/api/evaluate', async (req, res) => {
  try {
    const { title, description, targetAudience, monetizationModel, stage } = req.body;

    if (!description || typeof description !== 'string' || !description.trim()) {
      return res.status(400).json({ error: 'Startup idea description is required.' });
    }

    const text = (description + ' ' + (title || '') + ' ' + (targetAudience || '') + ' ' + (monetizationModel || '')).toLowerCase();
    const ventureName = extractVentureTitle(title, description);

    // Semantic Domain Classification
    const isB2B = /b2b|saas|enterprise|workflow|api|developer|devops|compliance|audit|security|infrastructure|\bhr\b|recruiting|sales|crm|finance|invoice|\bops\b|logistics|healthcare|hipaa/i.test(text);
    const isMarketplace = /marketplace|airbnb|uber|connect|buyers and sellers|peer|p2p|creators and|freelance|booking platform|surplus/i.test(text);
    const isConsumer = /consumer|social|dating|gaming|fitness|app for|daily|habit|creator|influencer|fan|tiktok|instagram|foodie|leftover/i.test(text);
    const isAI = /ai|gpt|llm|agent|machine learning|model|clone|autonomous|nlp|neural|copilot|synthetic/i.test(text);
    const isDevTools = /developer|git|code|api|sdk|pr|ci\/cd|devops|terminal|docker|kubernetes|infra/i.test(text);
    const isHealth = /health|hipaa|medical|patient|clinic|doctor|pharma|biotech|medtech/i.test(text);
    const isFinTech = /finance|fintech|billing|invoice|payment|escrow|tax|accounting|stripe|banking/i.test(text);
    const isHardwareOrDeepTech = /hardware|drone|robot|biotech|chemistry|medical device|sensor|satellite/i.test(text);
    const isLocal = /local|pickup|delivery|store|restaurant|bakery|cleaning|lawn|workshop|garage/i.test(text);

    let marketNeed = 72;
    let competition = 65;
    let technicalFeasibility = 80;
    let monetization = 70;
    let defensibility = 55;
    let growthPotential = 60;

    if (isB2B) {
      marketNeed += 8;
      monetization += 14;
      growthPotential -= 12;
      defensibility += 10;
    }

    if (isMarketplace) {
      marketNeed += 4;
      defensibility -= 12;
      monetization -= 10;
      competition -= 10;
      growthPotential += 12;
    }

    if (isConsumer) {
      monetization -= 15;
      growthPotential += 20;
      defensibility -= 15;
      marketNeed -= 8;
    }

    if (isAI) {
      technicalFeasibility -= 10;
      competition -= 15;
      defensibility -= 14;
      growthPotential += 10;
    }

    if (isHardwareOrDeepTech) {
      technicalFeasibility -= 30;
      defensibility += 25;
      monetization += 10;
    }

    if (isLocal) {
      growthPotential -= 8;
      technicalFeasibility += 10;
      defensibility -= 10;
      monetization -= 6;
    }

    if (/compliance|audit|security|tax|legal|fraud|churn|revenue|pipeline|billing/i.test(text)) {
      marketNeed += 10;
      monetization += 8;
    }
    if (/fun|social|hangout|mood|vibe|hobby|party/i.test(text)) {
      marketNeed -= 12;
      monetization -= 14;
    }

    const clamp = (v) => Math.max(28, Math.min(95, Math.round(v)));
    marketNeed = clamp(marketNeed);
    competition = clamp(competition);
    technicalFeasibility = clamp(technicalFeasibility);
    monetization = clamp(monetization);
    defensibility = clamp(defensibility);
    growthPotential = clamp(growthPotential);

    const overallViabilityScore = Math.round(
      marketNeed * 0.25 +
      monetization * 0.22 +
      defensibility * 0.18 +
      technicalFeasibility * 0.15 +
      competition * 0.10 +
      growthPotential * 0.10
    );

    let verdict = 'PIVOT';
    if (overallViabilityScore >= 74 && defensibility >= 52 && monetization >= 65) {
      verdict = 'BUILD';
    } else if (overallViabilityScore < 56 || defensibility < 42 || (monetization < 48 && growthPotential < 55)) {
      verdict = 'DROP';
    } else {
      verdict = 'PIVOT';
    }

    const verdictSummary = verdict === 'BUILD'
      ? `Exceptional workflow alignment with quantifiable buyer ROI and defensible integration hooks for ${ventureName}. Recommend proceeding with MVP scoping and securing pilot letters of intent (LOIs).`
      : verdict === 'PIVOT'
      ? `Compelling initial premise for ${ventureName}, but currently faces structural friction in monetization or distribution. Re-anchor positioning around a higher-margin sub-niche before engineering allocation.`
      : `High vulnerability to incumbent fast-followers, thin unit margins, or excessive acquisition costs for ${ventureName}. Capital and founder hours are better preserved for higher-probability opportunities.`;

    const vcStance = overallViabilityScore > 75 ? 'Strongly Bullish' : overallViabilityScore > 60 ? 'Cautious / Pivot' : 'Bearish / Drop';
    const founderStance = marketNeed > 70 ? 'Bullish' : 'Cautious / Pivot';
    const ctoStance = technicalFeasibility > 70 ? 'Bullish' : 'Cautious / Pivot';
    const marketerStance = growthPotential > 65 || monetization > 75 ? 'Bullish' : 'Bearish / Drop';

    const cleanIndustry = isDevTools
      ? 'Developer Infrastructure & Tooling'
      : isHealth
      ? 'Healthcare & Compliance Technology'
      : isFinTech
      ? 'Financial Technology & Billing'
      : isB2B 
      ? 'B2B SaaS & Enterprise Workflow' 
      : isMarketplace 
      ? 'Two-Sided Peer Marketplace' 
      : isConsumer 
      ? 'Consumer Technology & Creator Platforms' 
      : 'Vertical Digital Services';

    const cleanICP = targetAudience || (isDevTools ? 'Engineering Leads & CTOs' : isHealth ? 'Digital Health Founders & Clinical Directors' : isB2B ? 'Operations Directors & Tech Leads' : isMarketplace ? 'Independent Service Providers & Consumers' : 'Target End Users');
    const cleanMonetization = monetizationModel || (isB2B ? 'Tiered SaaS Subscription ($99-$499/mo)' : isMarketplace ? '15% Transaction Take-Rate' : 'Subscription & Usage Tiers');

    // Generate dynamic debate transcript specifically tailored to this venture!
    const simulatedDebateSnippet = generateVentureSpecificDebate({
      ventureName,
      description,
      icp: cleanICP,
      monetization: cleanMonetization,
      verdict,
      score: overallViabilityScore,
      isAI,
      isB2B,
      isMarketplace,
      isConsumer,
      isDevTools,
      isHealth,
      isLocal,
      isFinTech
    });

    const result = {
      id: 'MEMO-' + Date.now().toString(36).toUpperCase(),
      timestamp: Date.now(),
      ideaText: description,
      industry: cleanIndustry,
      targetCustomer: cleanICP,
      monetizationModel: cleanMonetization,
      
      overallViabilityScore,
      verdict,
      verdictSummary,
      confidenceRating: Math.floor(88 + Math.random() * 8),

      executiveSummary: `Diligence review of ${ventureName} indicates an aggregate viability score of ${overallViabilityScore}/100. ${
        verdict === 'BUILD'
          ? `The venture addresses an acute operational pain point for ${cleanICP} with demonstrable willingness-to-pay under ${cleanMonetization}. Technical execution risks are bounded, and early acquisition can leverage targeted niche communities.`
          : verdict === 'PIVOT'
          ? `While the core premise of ${ventureName} targets a real friction point, the current packaging under ${cleanMonetization} faces adoption resistance or take-rate compression. Shifting to an enterprise compliance or high-ACV wedge will dramatically elevate unit economics.`
          : `The concept struggles from structural unit economic headwinds, low switching moats, or extreme customer acquisition costs for ${cleanICP}. In its current form, retention decay will outpace organic expansion.`
      }`,

      keyStrengths: [
        marketNeed > 70 
          ? `Acute customer urgency: Target ${cleanICP} currently waste significant hours or budget on manual workarounds.`
          : `Clear value thesis: The core value proposition of ${ventureName} is immediately comprehensible to early adopters.`,
        monetization > 68
          ? `Direct revenue capture: High willingness-to-pay with quantifiable financial ROI under ${cleanMonetization}.`
          : `Low capital expenditure threshold: MVP prototyping can be delivered without deep hardware or heavy R&D burn.`,
        technicalFeasibility > 75
          ? `Rapid time-to-market: Modern cloud primitives and APIs allow a working MVP for ${ventureName} within 4-6 weeks.`
          : `Workflow integration wedge: Tight embedding into existing daily habits of ${cleanICP} creates switching friction.`,
        defensibility > 60
          ? `Compounding data moat: Product utility compounds as historical records, metadata, and team usage accumulate.`
          : `Niche specialization gives ${ventureName} an agile speed advantage over bureaucratic legacy competitors.`
      ],

      fatalFlaws: [
        defensibility < 60
          ? `Moat Vulnerability: Incumbent software suites or open-source tooling can mimic ${ventureName}'s core feature set if traction becomes visible.`
          : `Integration surface area: Requires ongoing maintenance to support changing third-party APIs and client security protocols.`,
        monetization < 65
          ? `Price Sensitivity: ${cleanICP} may push back against paid tiers if perceived as a discretionary productivity vitamin.`
          : `Sales Cycle Friction: Purchasing committees or compliance reviews may lengthen sales velocity beyond seed runway.`,
        growthPotential < 60
          ? `Distribution Bottleneck: Lacks natural word-of-mouth referral velocity, requiring disciplined outbound sales or dedicated content wedges.`
          : `Cold-Start Density: Value is limited until initial network density or integration adoption reaches a critical threshold.`
      ],

      scores: {
        marketNeed: {
          score: marketNeed,
          label: 'Market Need',
          rationale: marketNeed > 75 
            ? `Clear painkiller: Directly addresses an operational headache that ${cleanICP} actively seek to eliminate.`
            : `Borderline discretionary: High initial interest, but ongoing retention requires continuous habit triggers.`,
          benchmark: `Top ${Math.max(8, 100 - marketNeed)}% in market urgency`,
          pros: [`Directly replaces manual repetitive labor for ${cleanICP}`, 'Measurable return on investment'],
          cons: ['Buyers sometimes tolerate existing workarounds', 'Competes with existing software budget line items']
        },
        competition: {
          score: competition,
          label: 'Competition',
          rationale: competition > 70
            ? 'Fragmented competitive landscape with no dominant modern solution.'
            : 'Entrenched incumbents possess existing vendor relationships and brand awareness.',
          benchmark: `Top ${Math.max(10, 100 - competition)}% in competitive whitespace`,
          pros: ['Incumbents are bloated and slow to ship specialized workflows', `Opportunity for ${ventureName} to own an unserved niche`],
          cons: ['Large platform players could introduce this as a native add-on', 'Low switching costs for non-integrated users']
        },
        technicalFeasibility: {
          score: technicalFeasibility,
          label: 'Technical Feasibility',
          rationale: technicalFeasibility > 75
            ? 'Well-defined architectural scope using mature APIs and battle-tested frameworks.'
            : 'Involves complex edge cases, reliability guarantees, or third-party rate limit management.',
          benchmark: `Top ${Math.max(5, 100 - technicalFeasibility)}% in engineering feasibility`,
          pros: ['Can build a functional MVP within 30-45 days with 1-2 engineers', 'Predictable cloud worker and database infrastructure costs'],
          cons: ['Third-party platform API vulnerabilities', 'Data security, permissions, and multi-tenant isolation overhead']
        },
        monetization: {
          score: monetization,
          label: 'Monetization',
          rationale: monetization > 70
            ? `Strong unit economics under ${cleanMonetization} with clear buyer purchasing authority.`
            : 'Price ceiling constraints or customer price sensitivity makes scaling unit economics challenging.',
          benchmark: `Top ${Math.max(12, 100 - monetization)}% in willingness-to-pay`,
          pros: ['Predictable recurring revenue model', 'Opportunities for seat-based or volume-based expansion tiers'],
          cons: ['Initial price discovery friction', 'Requires demonstrating quantifiable cost savings before card swipe']
        },
        defensibility: {
          score: defensibility,
          label: 'Defensibility',
          rationale: defensibility > 65
            ? 'Workflow lock-in and accumulating team data history create painful switching costs.'
            : 'Vulnerable to being commoditized unless proprietary distribution or integrations are secured early.',
          benchmark: `Top ${Math.max(15, 100 - defensibility)}% in moat defensibility`,
          pros: ['Accumulated historical data and team collaboration history create switching friction', 'Integration into daily workflow'],
          cons: ['Feature vs platform risk: Could be absorbed as a native feature by platform vendors', 'No patent barrier']
        },
        growthPotential: {
          score: growthPotential,
          label: 'Growth Potential',
          rationale: growthPotential > 70
            ? 'High organic distribution: Product workflow naturally exposes the tool to collaborators, clients, and industry peers.'
            : 'Low natural virality: Single-player utility requires disciplined outbound distribution or dedicated content wedges.',
          benchmark: `Top ${Math.max(10, 100 - growthPotential)}% in organic growth potential`,
          pros: ['Multiplayer or client-facing surface area encourages organic referral', 'Demonstrable workflow speed gains generate word-of-mouth'],
          cons: ['Does not spread organically without proactive distribution incentives', 'Dependency on direct sales or content marketing']
        },
        viralPotential: {
          score: growthPotential,
          label: 'Growth Potential',
          rationale: growthPotential > 70
            ? 'High organic distribution loop.'
            : 'Requires disciplined outbound distribution.',
          benchmark: `Top ${Math.max(10, 100 - growthPotential)}% in organic virality`,
          pros: ['Multiplayer or client-facing surface area encourages organic referral'],
          cons: ['Does not spread organically without proactive distribution incentives']
        }
      },

      expertEvaluations: {
        vc: {
          personaId: 'vc',
          personaName: 'Elena Rostova',
          personaTitle: 'General Partner at Apex Capital',
          stance: vcStance,
          verdictVote: verdict,
          quote: verdict === 'BUILD' 
            ? `"The unit economics for ${ventureName} and the budget urgency from ${cleanICP} pass our fund threshold. If you lock in 5 pilot LOIs in the next 30 days, I would support a term sheet."`
            : verdict === 'PIVOT'
            ? `"Right now ${ventureName} looks like a targeted feature rather than a $100M venture-scale company. Narrow the wedge to where ${cleanICP} have non-elastic budgets."`
            : `"Pass for our fund. The customer acquisition costs for ${ventureName} will outpace lifetime value, and incumbents can fast-follow."`,
          primaryThesis: isB2B 
            ? `B2B software targeting ${cleanICP} carries 80%+ software gross margins. The key for ${ventureName} is proving that this is an indispensable daily layer rather than an optional add-on.`
            : `Ventures in this sector live or die on organic liquidity and low-cost distribution. Without an asymmetric acquisition channel, seed capital will burn on ads.`,
          deepDiveAnalysis: `From an institutional standpoint, I look at terminal exit multiples and capital efficiency for ${ventureName}. The largest risk is whether ${cleanICP} have dedicated budget line items for this specific problem right now.`,
          greenFlags: [
            'High gross margins typical of modern software architectures',
            'Potential for land-and-expand revenue expansion as accounts grow',
            `Clear buyer persona (${cleanICP}) simplifies outbound targeting`
          ],
          redFlags: [
            'Risk of platform fast-followers introducing native capabilities',
            'Sales cycles could lengthen before achieving cash-flow neutrality'
          ],
          hardQuestionsForFounders: [
            `What is your unfair advantage in acquiring the first 100 paying ${cleanICP} without paid ads?`,
            'If the dominant market leader launches this feature for free next quarter, why do users stay with you?',
            'What does your contract expansion metric look like at Month 12?'
          ]
        },
        founder: {
          personaId: 'founder',
          personaName: 'Marcus Vance',
          personaTitle: 'Serial Entrepreneur (1 Exit, YC Alum)',
          stance: founderStance,
          verdictVote: verdict,
          quote: verdict === 'BUILD'
            ? `"I have lived through this exact problem. If ${ventureName} solves the core bottleneck for ${cleanICP} without setup friction, founders will pay immediately."`
            : verdict === 'PIVOT'
            ? `"You are trying to boil the ocean on Day 1 with ${ventureName}. Pick the top 10% most desperate ${cleanICP} and strip out secondary features."`
            : `"Do not spend 6 months building ${ventureName} in a silo. You risk launching to silence because ${cleanICP} don't actually wake up in a sweat over this."`,
          primaryThesis: `Founder execution is 90% about ruthlessly killing non-core features and talking to 10 customers a day. If ${cleanICP} aren't begging for an ugly prototype of ${ventureName}, adding more code will not save it.`,
          deepDiveAnalysis: `The primary hurdle for ${ventureName} will be onboarding drop-off. You must get ${cleanICP} to the 'Aha!' moment within three minutes of signup, otherwise monthly churn will erode growth.`,
          greenFlags: [
            `Solves an immediate, recurring workflow friction for ${cleanICP}`,
            'Founders can build a manual concierge MVP before writing heavy backend code'
          ],
          redFlags: [
            'Setup friction could cause significant drop-off during initial onboarding',
            'Risk of building what users say they like rather than what they swipe credit cards for'
          ],
          hardQuestionsForFounders: [
            `Can you validate ${ventureName} manually with 5 ${cleanICP} before writing code?`,
            'How many target users have shown you their current painful workaround on a shared screen?',
            'What is the single core feature that, if removed, makes this product completely useless?'
          ]
        },
        cto: {
          personaId: 'cto',
          personaName: 'Dr. Aris Thorne',
          personaTitle: 'Fractional CTO & Ex-Staff Systems Architect',
          stance: ctoStance,
          verdictVote: verdict === 'DROP' ? 'DROP' : 'BUILD',
          quote: technicalFeasibility > 75
            ? `"Architecturally ${ventureName} is clean. A modern frontend, relational database, and queue-backed workers will scale to 10k active users reliably."`
            : `"Be cautious with rate limits and edge-case reliability in ${ventureName}. If the service fails 2% of the time, enterprise users will abandon it."`,
          primaryThesis: 'Keep the architecture boring and dependable. Avoid premature microservices; build a clean modular monolith that can be deployed on standard serverless or container infrastructure.',
          deepDiveAnalysis: `The engineering scope for ${ventureName} is realistic for a 1-to-2 person founding team. Ensure audit logging, RBAC permissions, and API failure fallbacks are designed into the schema from day one.`,
          greenFlags: [
            'Standard REST APIs and modern UI components handle the entire workflow',
            'Cloud infrastructure costs scale linearly with paid usage, preserving 80%+ margins',
            'Can leverage battle-tested open-source libraries for 80% of foundational boilerplate'
          ],
          redFlags: [
            'Third-party platform API dependencies could break or rate-limit without notice',
            'Handling security and permissions in multi-tenant environments requires meticulous testing'
          ],
          hardQuestionsForFounders: [
            'What is your fallback plan if a core upstream platform API increases prices by 4x or shuts down access?',
            'How do you isolate client data to ensure zero cross-tenant contamination?',
            'What is your target p95 worker execution duration per transaction?'
          ]
        },
        marketer: {
          personaId: 'marketer',
          personaName: 'Chloe Lin',
          personaTitle: 'Growth Partner & Former VP of Growth',
          stance: marketerStance,
          verdictVote: verdict,
          quote: growthPotential > 70
            ? `"The workflow of ${ventureName} has a built-in viral loop: every output shared with clients or peers acts as an organic billboard."`
            : `"Without an organic loop for ${ventureName}, you will burn cash on Google Ads. You need free interactive audit tools or calculators to capture leads."`,
          primaryThesis: `Product-led growth only succeeds if ${ventureName} naturally advertises itself during normal usage. Otherwise, founder-led outbound must carry the initial 100 paying customers.`,
          deepDiveAnalysis: `To acquire ${cleanICP} efficiently, identify the three digital watering holes where your buyers congregate (specific Subreddits, Discord communities, Slack channels, or niche conferences). Create free templates to build trust first.`,
          greenFlags: [
            'High intent search traffic for this specific problem domain',
            'Visual, shareable artifacts that look great as screenshot demos on social channels'
          ],
          redFlags: [
            'High competitive ad bidding makes paid advertising cost-prohibitive',
            'Single-player utility limits natural peer referral mechanics'
          ],
          hardQuestionsForFounders: [
            `What is the free mini-tool you can release to capture 1,000 email leads among ${cleanICP}?`,
            `Why would an early adopter proudly share ${ventureName} with their peers?`,
            'What is your expected payback period on customer acquisition costs?'
          ]
        }
      },

      competitorLandscape: [
        {
          name: isB2B ? 'Legacy Enterprise Suites (Atlassian, ServiceNow, Salesforce)' : 'Established Incumbents & Manual Spreadsheets',
          category: 'Incumbent',
          threatLevel: 'Medium',
          advantageOverYou: 'Massive enterprise distribution contracts, deep trust, existing vendor relationships.',
          yourWinningAngle: `10x faster onboarding, zero bloated configuration, lightweight modern automation tailored for ${cleanICP}.`
        },
        {
          name: isAI ? 'Venture-backed AI Startups in Seed batches' : 'Niche Point Solutions',
          category: 'Direct',
          threatLevel: 'High',
          advantageOverYou: 'Higher seed capital war chest for engineering and paid marketing experimentation.',
          yourWinningAngle: `Deeper vertical specialization and superior UX for ${cleanICP}'s exact workflow.`
        },
        {
          name: 'Internal DIY Scripts, Zapier Zaps, and Notion Templates',
          category: 'Indirect',
          threatLevel: 'Medium',
          advantageOverYou: 'Zero incremental cash cost; teams already own licenses.',
          yourWinningAngle: 'DIY scripts break continuously and require dedicated maintenance; your tool provides bulletproof reliability.'
        }
      ],

      pivotAngles: [
        {
          title: isB2B ? 'Wedge into High-Stakes Compliance & Audit Teams' : 'Pivot to High-LTV B2B Prosumers',
          targetAudience: isB2B ? 'Regulated FinTech & HealthTech Startups' : 'Agency Owners & Boutique Consultants',
          revisedAngle: `Instead of targeting generalists with ${ventureName}, position the product as a mission-critical compliance & revenue assurance tool where budget is non-elastic.`,
          whyItWorksBetter: 'Elevates ACV from $49/mo to $800+/mo, dramatically shortening the path to $1M ARR while reducing churn to < 1% monthly.',
          viabilityMultiplier: '+35% Viability Score'
        },
        {
          title: 'API & Headless Infrastructure Layer',
          targetAudience: 'Software Engineers & Platform Integrators',
          revisedAngle: `Strip away the consumer UI and sell a unified developer API or webhook engine that other software companies embed inside their products.`,
          whyItWorksBetter: 'Transfers the customer acquisition burden to enterprise partners; creates sticky negative-churn recurring revenue.',
          viabilityMultiplier: '+28% Viability Score'
        }
      ],

      validationExperiments: [
        {
          step: 1,
          timeframe: 'Days 1 - 5',
          title: `Discovery Interviews with Target ${cleanICP}`,
          hypothesis: `At least 7 out of 10 interviewed ${cleanICP} confirm this problem is among their top weekly headaches.`,
          method: 'Conduct ten 20-minute user interviews without pitching your solution; ask how they currently spend budget and hours solving this.',
          successMetric: '7+ users confirm they spent money or 4+ hours on workarounds in the last 30 days',
          estimatedCost: '$0'
        },
        {
          step: 2,
          timeframe: 'Days 6 - 12',
          title: `Interactive Teaser Page for ${ventureName}`,
          hypothesis: 'Target users landing on a clear value proposition will commit an email and request early access.',
          method: 'Deploy a high-converting landing page with product mockups, pricing tiers, and an early-access waitlist deposit.',
          successMetric: '> 12% conversion rate on warm traffic and 3+ refundable deposit commitments',
          estimatedCost: '$50 - $100'
        },
        {
          step: 3,
          timeframe: 'Days 13 - 22',
          title: 'Concierge MVP (Manual Wizard of Oz)',
          hypothesis: 'Users will find immense value in the end deliverable even if the backend is operated manually by the founders.',
          method: `Fulfill the core service manually behind the scenes for 5 pilot ${cleanICP} using existing tools, delivering results in under 24 hours.`,
          successMetric: '4 out of 5 pilot users ask for repeat service and offer an enthusiastic testimonial quote',
          estimatedCost: '$0'
        },
        {
          step: 4,
          timeframe: 'Days 23 - 30',
          title: 'First Paid Invoicing & Letters of Intent (LOI)',
          hypothesis: `Early pilot ${cleanICP} will sign a formal 6-month beta agreement or swipe their card under ${cleanMonetization}.`,
          method: 'Present simple pilot pricing agreement with a 40% founding member lifetime discount in exchange for weekly feedback calls.',
          successMetric: 'At least 3 signed commercial contracts or paid customer subscriptions',
          estimatedCost: '$0'
        }
      ],
      simulatedDebateSnippet
    };

    res.json(result);
  } catch (err) {
    console.error('Error during evaluation:', err);
    res.status(500).json({ error: 'Internal server error evaluating idea.' });
  }
});

app.listen(PORT, () => {
  console.log(`[VIABL BACKEND] Server active and listening on http://localhost:${PORT}`);
});
