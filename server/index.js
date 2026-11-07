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

// Committee Members Endpoint
app.get('/api/committee', (req, res) => {
  res.json({ committee: COMMITTEE_MEMBERS });
});

// Presets Endpoint
app.get('/api/presets', (req, res) => {
  res.json({ presets: PRESET_IDEAS });
});

// Evaluation Engine
app.post('/api/evaluate', async (req, res) => {
  try {
    const { title, description, targetAudience, monetizationModel, stage, settings } = req.body;

    if (!description || typeof description !== 'string' || !description.trim()) {
      return res.status(400).json({ error: 'Startup idea description is required.' });
    }

    const text = (description + ' ' + (title || '') + ' ' + (targetAudience || '') + ' ' + (monetizationModel || '')).toLowerCase();

    // Semantic Domain Analysis
    const isB2B = /b2b|saas|enterprise|workflow|api|developer|devops|compliance|audit|security|infrastructure|hr|recruiting|sales|crm|finance|invoice|ops|logistics|healthcare|hipaa/i.test(text);
    const isMarketplace = /marketplace|airbnb|uber|connect|buyers and sellers|peer|p2p|creators and|freelance|booking platform|surplus/i.test(text);
    const isConsumer = /consumer|social|dating|gaming|fitness|app for|daily|habit|creator|influencer|fan|tiktok|instagram|foodie|leftover/i.test(text);
    const isAIHeavy = /ai|gpt|llm|agent|machine learning|model|clone|autonomous|nlp|neural|copilot|synthetic/i.test(text);
    const isHardwareOrDeepTech = /hardware|drone|robot|biotech|chemistry|medical device|sensor|satellite/i.test(text);
    const isLocalService = /local|pickup|delivery|store|restaurant|bakery|cleaning|lawn|workshop|garage/i.test(text);

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

    if (isAIHeavy) {
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

    if (isLocalService) {
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
      ? 'Exceptional workflow alignment with quantifiable buyer ROI and defensible integration hooks. Recommend proceeding with MVP scoping and securing pilot letters of intent (LOIs).'
      : verdict === 'PIVOT'
      ? 'Compelling initial premise, but currently faces structural friction (either weak willingness-to-pay, platform dependency, or cold-start liquidity). Re-anchor positioning around a higher-margin sub-niche.'
      : 'High vulnerability to incumbent fast-followers, thin unit margins, or an excessive customer acquisition cost (CAC) relative to lifetime value. Capital and founder hours are better preserved for higher-probability opportunities.';

    const vcStance = overallViabilityScore > 75 ? 'Strongly Bullish' : overallViabilityScore > 60 ? 'Cautious / Pivot' : 'Bearish / Drop';
    const founderStance = marketNeed > 70 ? 'Bullish' : 'Cautious / Pivot';
    const ctoStance = technicalFeasibility > 70 ? 'Bullish' : 'Cautious / Pivot';
    const marketerStance = growthPotential > 65 || monetization > 75 ? 'Bullish' : 'Bearish / Drop';

    const cleanIndustry = isB2B 
      ? 'B2B SaaS & Developer Infrastructure' 
      : isMarketplace 
      ? 'Two-Sided Peer Marketplace' 
      : isConsumer 
      ? 'Consumer Social & Creator Economy' 
      : 'Vertical Digital Services';

    const result = {
      id: 'MEMO-' + Date.now().toString(36).toUpperCase(),
      timestamp: Date.now(),
      ideaText: description,
      industry: cleanIndustry,
      targetCustomer: targetAudience || (isB2B ? 'Engineering Leads & Operations Directors' : 'Tech-savvy End Users & Creators'),
      monetizationModel: monetizationModel || (isB2B ? 'Monthly Tiered Subscription (SaaS)' : 'Take-Rate Transaction Fee (10-15%)'),
      
      overallViabilityScore,
      verdict,
      verdictSummary,
      confidenceRating: Math.floor(88 + Math.random() * 8),

      executiveSummary: `Evaluation of "${title || description.slice(0, 45)}..." shows an aggregate viability score of ${overallViabilityScore}/100. ${
        verdict === 'BUILD'
          ? 'The startup addresses an acute, quantified workflow bottleneck with clear willingness-to-pay. Early user acquisition can leverage targeted niche communities before expanding outward.'
          : verdict === 'PIVOT'
          ? 'While the top-of-funnel premise is intriguing, the unit economics and user switching costs suggest high churn risk. Shifting to an enterprise pain-point or high-ticket wedge could dramatically elevate feasibility.'
          : 'The concept struggles from either severe take-rate compression, high user drop-off, or structural platform risk. In its current form, customer acquisition cost will outpace organic retention.'
      }`,

      keyStrengths: [
        marketNeed > 70 
          ? 'High urgency: Target buyers currently rely on broken spreadsheets, costly manual hours, or fragmented tools.'
          : 'Clear emotional resonance: The core value proposition is instantly relatable to early adopters.',
        monetization > 68
          ? 'Direct revenue path: High willingness-to-pay with quantifiable financial ROI for the customer.'
          : 'Low initial capital threshold: Prototyping can be accomplished without heavy upfront hardware or deep tech capex.',
        technicalFeasibility > 75
          ? 'Rapid time-to-market: Existing APIs, cloud primitives, and framework ecosystems allow a working MVP within 4-6 weeks.'
          : 'Differentiated workflow wedge: Tight integration into existing daily habits lowers adoption hesitation.',
        defensibility > 60
          ? 'Data flywheel potential: Product utility compounds as user activity, historical records, and team collaboration accumulate.'
          : 'Niche focus gives agile advantage over slow, bureaucratic incumbent software.'
      ],

      fatalFlaws: [
        defensibility < 60
          ? 'Low Moat Risk: Incumbents or open-source alternatives can mimic the core feature set within 1-2 quarters if traction becomes visible.'
          : 'Integration surface area: Requires ongoing maintenance to support changing third-party APIs and protocols.',
        monetization < 65
          ? 'Willingness-to-pay elasticity: Target users are accustomed to free tiers or low-cost alternatives, creating CAC pressure.'
          : 'Sales cycle velocity: Enterprise or organizational purchasing committees may lengthen closing cycles beyond runway limits.',
        growthPotential < 60
          ? 'Distribution bottleneck: Lacks natural word-of-mouth referral velocity, necessitating methodical outbound sales or paid acquisition.'
          : 'Cold-start coordination: Value is lower for user #1 until network effects or density reach a critical threshold.'
      ],

      scores: {
        marketNeed: {
          score: marketNeed,
          label: 'Market Need',
          rationale: marketNeed > 75 
            ? 'Clear painkiller: Solves an operational headache with measurable time/dollar cost.'
            : 'Borderline vitamin: High user enthusiasm initially, but retention requires continuous engagement triggers.',
          benchmark: `Top ${Math.max(8, 100 - marketNeed)}% in market urgency`,
          pros: ['Directly replaces manual repetitive labor', 'High search intent for equivalent solutions'],
          cons: ['Users often tolerate existing workarounds', 'Priority competes with top-tier budget allocations']
        },
        competition: {
          score: competition,
          label: 'Competition',
          rationale: competition > 70
            ? 'Fragmented market with no single dominant modern solution.'
            : 'Crowded landscape: Incumbents possess established distribution channels and brand trust.',
          benchmark: `Top ${Math.max(10, 100 - competition)}% in competitive whitespace`,
          pros: ['Incumbents are bloated and slow to ship AI-native workflows', 'Opportunity to dominate an unserved niche segment'],
          cons: ['Big tech platforms can introduce this as a native add-on', 'Low switching costs for casual users']
        },
        technicalFeasibility: {
          score: technicalFeasibility,
          label: 'Technical Feasibility',
          rationale: technicalFeasibility > 75
            ? 'Standard modern stack with clear architectural precedents; low R&D uncertainty.'
            : 'Involves complex edge cases, reliability guarantees, or latency/token cost management.',
          benchmark: `Top ${Math.max(5, 100 - technicalFeasibility)}% in engineering feasibility`,
          pros: ['Robust open-source libraries and APIs available today', 'Can build a production MVP in 30-45 days with 1-2 engineers'],
          cons: ['Continuous prompt tuning or API rate limits', 'Data security, permissions, and multi-tenant isolation overhead']
        },
        monetization: {
          score: monetization,
          label: 'Monetization',
          rationale: monetization > 70
            ? 'High-margin software subscription or transaction commission with clear customer budget line items.'
            : 'Low price ceiling or consumer price sensitivity makes scaling unit economics challenging.',
          benchmark: `Top ${Math.max(12, 100 - monetization)}% in willingness-to-pay`,
          pros: ['Predictable recurring revenue model', 'Opportunities for seat-based or consumption-based expansion tiers'],
          cons: ['Initial price discovery friction', 'High barrier to getting corporate credit cards swiped without security reviews']
        },
        defensibility: {
          score: defensibility,
          label: 'Defensibility',
          rationale: defensibility > 65
            ? 'Workflow lock-in and accumulating team data history create painful switching costs.'
            : 'Vulnerable to being commoditized or copied unless proprietary distribution is secured early.',
          benchmark: `Top ${Math.max(15, 100 - defensibility)}% in moat defensibility`,
          pros: ['Proprietary dataset generated from proprietary workflow interactions', 'Network effects increase retention over 6+ months'],
          cons: ['Feature vs platform risk: Could be swallowed as a sub-feature by existing SaaS behemoths', 'No deep patent barrier']
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
            ? '"The unit economics and customer urgency pass our fund threshold. If you can lock in 5 pilot LOIs in the next 30 days, I would support a pre-seed term sheet."'
            : verdict === 'PIVOT'
            ? '"Right now this looks like a $2M lifestyle feature rather than a $100M fund-returner. Narrow the wedge down to where the pain is bleeding cash."'
            : '"Pass for our fund. The CAC/LTV equation will degrade fast, and incumbents can ship this in their next minor sprint."',
          primaryThesis: isB2B 
            ? 'B2B software that shaves engineering or compliance overhead carries strong gross margins (80%+). The key is demonstrating that this is an indispensable operational layer rather than a nice-to-have plugin.'
            : 'Marketplaces and consumer tools live or die on organic liquidity and low-cost distribution. Without an asymmetric unfair acquisition channel, seed capital will burn on ads.',
          deepDiveAnalysis: 'From an institutional investor standpoint, I look at the terminal exit multiple and capital efficiency. The largest risk is not whether the code can be written, but whether buyers have dedicated budget line items for this specific problem right now.',
          greenFlags: [
            'High gross margins typical of modern software architectures',
            'Potential for land-and-expand revenue expansion as teams scale',
            'Clear customer profile simplifies outbound sales targeting'
          ],
          redFlags: [
            'Risk of getting squeezed if major foundational platforms release native capabilities',
            'Long enterprise sales cycles could burn early runway before cash flow neutrality'
          ],
          hardQuestionsForFounders: [
            'What is your unfair advantage in acquiring the first 100 paying customers without paid ads?',
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
            ? '"I have lived this exact operational nightmare. If you give me a basic MVP that does just the core job reliably, I would pay you with my own credit card today."'
            : verdict === 'PIVOT'
            ? '"You are trying to boil the ocean on day 1. Pick the top 10% most desperate users and discard the rest of the roadmap for now."'
            : '"Do not spend 6 months building this in a dark room. You will launch to crickets because customers do not actually wake up in a sweat over this."',
          primaryThesis: 'Founder execution is 90% about ruthlessly killing non-core features and talking to 10 customers a day. If customers are not begging for an ugly prototype, adding more features will not save it.',
          deepDiveAnalysis: 'The real hurdle will be onboarding drop-off. You must get the customer to the "Aha!" moment within 90 seconds of signup, otherwise churn will eat you alive.',
          greenFlags: [
            'Solves an immediate, recurring workflow friction',
            'Founders can build a manual concierge MVP before writing deep backend infrastructure'
          ],
          redFlags: [
            'High onboarding setup friction could cause 70%+ drop-off at initial setup',
            'Risk of building what users say they want instead of what they actually swipe cards for'
          ],
          hardQuestionsForFounders: [
            'Can you validate this manually with 5 customers using Google Sheets and Loom before writing code?',
            'How many target users have you spoken to who explicitly showed you their current messy workaround?',
            'What is the single feature that, if removed, makes this product completely useless?'
          ]
        },
        cto: {
          personaId: 'cto',
          personaName: 'Dr. Aris Thorne',
          personaTitle: 'Fractional CTO & Ex-Staff Systems Architect',
          stance: ctoStance,
          verdictVote: verdict === 'DROP' ? 'DROP' : 'BUILD',
          quote: technicalFeasibility > 75
            ? '"Architecturally this is clean. A lightweight frontend, managed Postgres, and stateless workers will get you to 10k users without sweat."'
            : '"Be careful with edge-case hallucinations and rate-limit latency. If the system fails 2% of the time, enterprise users will abandon it."',
          primaryThesis: 'Keep the architecture boring and dependable. Avoid premature distributed microservices; build a clean modular monolith that can be deployed on standard serverless infra.',
          deepDiveAnalysis: 'The engineering scope is completely realistic for a 1-to-2 person founding team. Ensure audit logging and RBAC permissions are designed into the schema from day one.',
          greenFlags: [
            'Standard REST APIs and modern UI components handle the entire workflow',
            'Cloud costs will scale linearly with paid users, preserving 80%+ margins',
            'Can leverage battle-tested open-source libraries for 80% of foundational boilerplate'
          ],
          redFlags: [
            'Third-party platform API dependencies could break or rate-limit without notice',
            'Handling security and permissions in multi-tenant environments requires meticulous testing'
          ],
          hardQuestionsForFounders: [
            'What is your fallback plan if a core upstream API increases prices by 4x or shuts down access?',
            'How do you isolate client data to ensure zero cross-tenant contamination?',
            'What is your target p95 response time for the primary user action?'
          ]
        },
        marketer: {
          personaId: 'marketer',
          personaName: 'Chloe Lin',
          personaTitle: 'Growth Partner & Former VP of Growth',
          stance: marketerStance,
          verdictVote: verdict,
          quote: growthPotential > 70
            ? '"The product has a built-in viral loop: every time a user shares an output, their peers see your brand watermark. That will drive sub-$10 CAC."'
            : '"Without an organic loop, you are going to burn cash on Google Ads. You need to build free interactive audit tools or calculators as SEO wedges."',
          primaryThesis: 'Product-led growth (PLG) only succeeds if the product naturally advertises itself during normal usage. Otherwise, founder-led outbound must carry the initial 100 customers.',
          deepDiveAnalysis: 'Identify the 3 digital watering holes where your buyers congregate (specific Subreddits, Discord servers, Slack communities, or niche conferences). Create free educational templates to build trust.',
          greenFlags: [
            'High intent search traffic for this specific problem domain',
            'Visual, shareable artifacts that look great as screenshot demos'
          ],
          redFlags: [
            'High competitive ad bidding makes paid ads cost-prohibitive',
            'Single-player utility limits natural peer referral mechanics'
          ],
          hardQuestionsForFounders: [
            'What is the free mini-tool you can release to capture 1,000 email leads for $0?',
            'Why would an early adopter proudly share this with colleagues?',
            'What is your expected payback period on CAC (aim for under 6 months)?'
          ]
        }
      },

      competitorLandscape: [
        {
          name: isB2B ? 'Legacy Enterprise Suites (Atlassian, ServiceNow, Salesforce)' : 'Established Incumbents & Manual Spreadsheets',
          category: 'Incumbent',
          threatLevel: 'Medium',
          advantageOverYou: 'Massive enterprise distribution contracts, deep trust, existing vendor relationships.',
          yourWinningAngle: '10x faster setup, zero bloated enterprise configuration, lightweight modern workflow.'
        },
        {
          name: isAIHeavy ? 'Venture-backed AI Startups in Seed batches' : 'Niche Point Solutions',
          category: 'Direct',
          threatLevel: 'High',
          advantageOverYou: 'Higher seed capital war chest for engineering and paid marketing experimentation.',
          yourWinningAngle: 'Deeper vertical specialization and superior UX for the specific sub-niche workflow.'
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
          revisedAngle: 'Instead of targeting generalists, position the product as a mission-critical compliance & revenue assurance tool where budget is non-elastic.',
          whyItWorksBetter: 'Elevates ACV from $49/mo to $800+/mo, dramatically shortening the path to $1M ARR while reducing churn to < 1% monthly.',
          viabilityMultiplier: '+35% Viability Score'
        },
        {
          title: 'API & Headless Infrastructure Layer',
          targetAudience: 'Software Engineers & Platform Integrators',
          revisedAngle: 'Strip away the consumer UI and sell a unified developer API or webhook engine that other software companies embed inside their products.',
          whyItWorksBetter: 'Transfers the customer acquisition burden to enterprise partners; creates sticky negative-churn recurring revenue.',
          viabilityMultiplier: '+28% Viability Score'
        }
      ],

      validationExperiments: [
        {
          step: 1,
          timeframe: 'Days 1 - 5',
          title: 'Customer Discovery Interviews (The Mom Test)',
          hypothesis: 'At least 7 out of 10 interviewed target users identify this specific problem among their top 3 weekly pain points.',
          method: 'Conduct ten 20-minute user interviews without pitching your solution; ask how they currently spend budget and hours solving this.',
          successMetric: '7+ users confirm they spent money or 4+ hours on workarounds in the last 30 days',
          estimatedCost: '$0'
        },
        {
          step: 2,
          timeframe: 'Days 6 - 12',
          title: 'Fake Door / Interactive Teaser Page with Pre-Order',
          hypothesis: 'Visitors landing on a clear value proposition will commit an email and click Request Early Access / Pre-Order.',
          method: 'Deploy a high-converting landing page with product mockups, pricing tiers, and a pre-order waitlist deposit.',
          successMetric: '> 12% conversion rate on warm traffic and 3+ refundable $20 deposit commitments',
          estimatedCost: '$50 - $100'
        },
        {
          step: 3,
          timeframe: 'Days 13 - 22',
          title: 'Concierge MVP (Manual Wizard of Oz)',
          hypothesis: 'Users will find immense value in the end deliverable even if the backend is operated manually by the founders.',
          method: 'Fulfill the core service manually behind the scenes for 5 pilot customers using existing tools, delivering results in under 24 hours.',
          successMetric: '4 out of 5 pilot users ask for repeat service and offer an enthusiastic testimonial quote',
          estimatedCost: '$0'
        },
        {
          step: 4,
          timeframe: 'Days 23 - 30',
          title: 'First Paid Invoicing & Letters of Intent (LOI)',
          hypothesis: 'Early pilot users will sign a formal 6-month beta agreement or swipe their card for a paid tier.',
          method: 'Present simple pilot pricing agreement with a 40% founding member lifetime discount in exchange for weekly feedback calls.',
          successMetric: 'At least 3 signed commercial contracts or paid customer subscriptions',
          estimatedCost: '$0'
        }
      ],

      simulatedDebateSnippet: [
        {
          speaker: 'Marcus Vance',
          role: 'Startup Founder',
          message: 'The idea has real spark. But my concern is the initial friction. If a user needs 45 minutes to set this up, they will abandon the tab. Can we deliver the first value in 60 seconds?'
        },
        {
          speaker: 'Dr. Aris Thorne',
          role: 'CTO',
          message: 'From an infra perspective, Marcus is right. If we use progressive onboarding and sensible defaults, the customer gets immediate output without configuring anything upfront.'
        },
        {
          speaker: 'Elena Rostova',
          role: 'Venture Capitalist',
          message: 'Good. But let us talk TAM and pricing power. If you charge $19/month, you need 4,000 customers just to hit $1M ARR. I would rather see you price at $299/month for mid-market teams where the ROI is clear.'
        },
        {
          speaker: 'Chloe Lin',
          role: 'Growth Strategist',
          message: 'Agreed with Elena. At $299/month, we can afford targeted account-based marketing and partner with existing industry influencers. Plus, the output itself can be branded so every report shared acts as an organic billboard.'
        }
      ]
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
