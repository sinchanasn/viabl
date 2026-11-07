import { 
  StartupIdeaInput, 
  EvaluationResult, 
  VerdictType, 
  MetricScores,
  ApiSettings 
} from '../types';

/**
 * Intelligent startup idea evaluation engine.
 * Supports both live LLM (Gemini / OpenAI) and advanced heuristic simulation.
 */
export async function evaluateStartupIdea(
  input: StartupIdeaInput,
  settings?: ApiSettings,
  onStepProgress?: (step: string) => void
): Promise<EvaluationResult> {
  const text = input.description.toLowerCase() + ' ' + (input.title || '').toLowerCase() + ' ' + (input.targetAudience || '').toLowerCase();

  onStepProgress?.('Convening Investment Committee (VC, Founder, CTO, Marketer)...');
  await delay(600);

  // Attempt Backend API call first if available
  try {
    onStepProgress?.('Transmitting docket to Viabl Due Diligence Backend API...');
    const backendRes = await fetch('/api/evaluate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...input, settings })
    });

    if (backendRes.ok) {
      onStepProgress?.('Investment Committee review ratified by Backend Diligence Engine.');
      await delay(400);
      const data = await backendRes.json();
      if (data && data.overallViabilityScore) {
        return data as EvaluationResult;
      }
    }
  } catch (err) {
    console.info('Backend API unavailable, using in-browser heuristic engine:', err);
  }

  // If Gemini API Key is provided and mode allows, attempt direct Gemini API call
  if (settings?.geminiApiKey && (settings.preferredEngine === 'gemini' || settings.preferredEngine === 'auto')) {
    try {
      onStepProgress?.('Querying Google Gemini with Multi-Persona Investment Committee Prompt...');
      const llmResult = await evaluateWithGemini(input, settings.geminiApiKey);
      if (llmResult) return llmResult;
    } catch (err) {
      console.warn('Gemini API call failed, falling back to local simulation engine:', err);
    }
  }

  // If OpenAI API Key is provided, attempt OpenAI
  if (settings?.openaiApiKey && (settings.preferredEngine === 'openai' || settings.preferredEngine === 'auto')) {
    try {
      onStepProgress?.('Querying OpenAI GPT with Committee Analysis Prompt...');
      const llmResult = await evaluateWithOpenAI(input, settings.openaiApiKey);
      if (llmResult) return llmResult;
    } catch (err) {
      console.warn('OpenAI API call failed, falling back to local simulation engine:', err);
    }
  }

  // High-fidelity local simulation engine
  onStepProgress?.('Elena Rostova (VC) analyzing Total Addressable Market & Unit Economics...');
  await delay(600);
  onStepProgress?.('Marcus Vance (Founder) stress-testing early customer validation & 0-to-1 PMF...');
  await delay(600);
  onStepProgress?.('Dr. Aris Thorne (CTO) evaluating architecture, latency & API dependency risks...');
  await delay(600);
  onStepProgress?.('Chloe Lin (Growth Marketer) modeling CAC/LTV & organic distribution loops...');
  await delay(600);
  onStepProgress?.('Synthesizing Committee Verdict & generating 30-Day Validation Roadmap...');
  await delay(500);

  return generateIntelligentHeuristicEvaluation(input, text);
}

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function generateVentureSpecificDebate(params: {
  ventureName: string;
  description: string;
  icp: string;
  monetization: string;
  verdict: VerdictType;
  score: number;
  isAI: boolean;
  isB2B: boolean;
  isMarketplace: boolean;
  isConsumer: boolean;
  isDevTools: boolean;
  isHealth: boolean;
  isLocal: boolean;
  isFinTech: boolean;
}): { speaker: string; role: string; message: string }[] {
  const { ventureName, icp, monetization, verdict, score, isAI, isB2B, isMarketplace, isConsumer, isDevTools, isHealth, isLocal, isFinTech } = params;
  const turns: { speaker: string; role: string; message: string }[] = [];

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
    role: 'Fractional CTO',
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
    role: 'Growth Marketer',
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

/**
 * Advanced Heuristic Analyzer that inspects semantic signals in the idea
 */
function generateIntelligentHeuristicEvaluation(input: StartupIdeaInput, text: string): EvaluationResult {
  const isB2B = /b2b|saas|enterprise|workflow|api|developer|devops|compliance|audit|security|infrastructure|\bhr\b|recruiting|sales|crm|finance|invoice|\bops\b|logistics|healthcare|hipaa/i.test(text);
  const isMarketplace = /marketplace|airbnb|uber|connect|buyers and sellers|peer|p2p|creators and|freelance|booking platform|surplus/i.test(text);
  const isConsumer = /consumer|social|dating|gaming|fitness|app for|daily|habit|creator|influencer|fan|tiktok|instagram|foodie|leftover/i.test(text);
  const isAIHeavy = /ai|gpt|llm|agent|machine learning|model|clone|autonomous|nlp|neural|copilot|synthetic/i.test(text);
  const isHardwareOrDeepTech = /hardware|drone|robot|biotech|chemistry|medical device|sensor|satellite/i.test(text);
  const isLocalService = /local|pickup|delivery|store|restaurant|bakery|cleaning|lawn|workshop|garage/i.test(text);

  // Compute 6 dimensional scores based on domain dynamics and indicators
  let marketNeed = 72;
  let competition = 65; // High score means favorable competition (less saturated or strong differentiation)
  let technicalFeasibility = 80;
  let monetization = 70;
  let defensibility = 55;
  let viralPotential = 60;

  // Specific domain adjustments
  if (isB2B) {
    marketNeed += 8;
    monetization += 14;
    viralPotential -= 18; // B2B usually relies on outbound/SEO, lower viral loop
    defensibility += 10;
  }

  if (isMarketplace) {
    marketNeed += 4;
    defensibility -= 12; // Chicken-and-egg cold start & disintermediation risk
    monetization -= 10;  // Take-rate pressure
    competition -= 10;   // Often crowded local alternatives
    viralPotential += 12;
  }

  if (isConsumer) {
    monetization -= 15; // Consumer willingness to pay is historically fickle
    viralPotential += 20; // Potential for organic social referral
    defensibility -= 15; // Low switching barrier
    marketNeed -= 8;     // Vitamin vs Painkiller risk
  }

  if (isAIHeavy) {
    technicalFeasibility -= 10; // Prompt reliability, hallucination, latency, OpenAI API margin squeeze
    competition -= 15;          // High flood of thin wrappers
    defensibility -= 14;        // Unless proprietary proprietary fine-tuning or deep workflow lock-in
    viralPotential += 10;       // "Wow factor" demo sharing
  }

  if (isHardwareOrDeepTech) {
    technicalFeasibility -= 30; // High R&D capex and supply chain failure points
    defensibility += 25;        // Patents and physical barriers
    monetization += 10;
  }

  if (isLocalService) {
    viralPotential -= 8;
    technicalFeasibility += 10;
    defensibility -= 10;
    monetization -= 6;
  }

  // Keywords that signal painkiller vs vitamin
  if (/compliance|audit|security|tax|legal|fraud|churn|revenue|pipeline|billing/i.test(text)) {
    marketNeed += 10;
    monetization += 8;
  }
  if (/fun|social|hangout|mood|vibe|hobby|party/i.test(text)) {
    marketNeed -= 12;
    monetization -= 14;
  }

  // Clamp scores within [25, 96]
  const clamp = (v: number) => Math.max(28, Math.min(95, Math.round(v)));
  marketNeed = clamp(marketNeed);
  competition = clamp(competition);
  technicalFeasibility = clamp(technicalFeasibility);
  monetization = clamp(monetization);
  defensibility = clamp(defensibility);
  viralPotential = clamp(viralPotential);

  // Calculate Overall Viability Score (Weighted composite)
  // Need: 25%, Monetization: 22%, Defensibility: 18%, Feasibility: 15%, Competition: 10%, Viral: 10%
  const overallViabilityScore = Math.round(
    marketNeed * 0.25 +
    monetization * 0.22 +
    defensibility * 0.18 +
    technicalFeasibility * 0.15 +
    competition * 0.10 +
    viralPotential * 0.10
  );

  // Determine Verdict
  let verdict: VerdictType = 'PIVOT';
  if (overallViabilityScore >= 74 && defensibility >= 52 && monetization >= 65) {
    verdict = 'BUILD';
  } else if (overallViabilityScore < 56 || defensibility < 42 || (monetization < 48 && viralPotential < 55)) {
    verdict = 'DROP';
  } else {
    verdict = 'PIVOT';
  }

  // Synthesize rationale
  const verdictSummary = verdict === 'BUILD'
    ? `Strong commercial fundamentals with clear buyer ROI and defensible integration hooks. The committee recommends immediate MVP scoping and pre-sale commitments.`
    : verdict === 'PIVOT'
    ? `Compelling initial concept, but currently faces structural friction (either weak willingness-to-pay, platform dependency, or cold-start liquidity). Re-anchor positioning around a single acute sub-niche.`
    : `High vulnerability to incumbent fast-followers, thin unit margins, or an excessive customer acquisition cost (CAC) relative to lifetime value. Capital and founder hours are better allocated to adjacent opportunities.`;

  // Dynamic persona stance
  const vcStance = overallViabilityScore > 75 ? 'Strongly Bullish' : overallViabilityScore > 60 ? 'Cautious / Pivot' : 'Bearish / Drop';
  const founderStance = marketNeed > 70 ? 'Bullish' : 'Cautious / Pivot';
  const ctoStance = technicalFeasibility > 70 ? 'Bullish' : 'Cautious / Pivot';
  const marketerStance = viralPotential > 65 || monetization > 75 ? 'Bullish' : 'Bearish / Drop';

  const titleOrTopic = input.title || (input.description.slice(0, 40) + '...');

  const cleanIndustry = isB2B 
    ? 'B2B SaaS & Developer Infrastructure' 
    : isMarketplace 
    ? 'Two-Sided Peer Marketplace' 
    : isConsumer 
    ? 'Consumer Social & Creator Economy' 
    : 'Vertical Digital Services';

  return {
    id: 'eval_' + Date.now().toString(36),
    timestamp: Date.now(),
    ideaText: input.description,
    industry: cleanIndustry,
    targetCustomer: input.targetAudience || (isB2B ? 'Engineering Leads & Operations Directors' : 'Tech-savvy End Users & Creators'),
    monetizationModel: input.monetizationModel || (isB2B ? 'Monthly Tiered Subscription (SaaS)' : 'Take-Rate Transaction Fee (10-15%)'),
    
    overallViabilityScore,
    verdict,
    verdictSummary,
    confidenceRating: Math.floor(86 + Math.random() * 9),

    executiveSummary: `Evaluation of "${titleOrTopic}" shows an aggregate viability score of ${overallViabilityScore}/100. ${
      verdict === 'BUILD'
        ? 'The startup addresses an acute, quantified workflow bottleneck with clear monetization readiness. Early user acquisition can leverage targeted niche communities before expanding outward.'
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
      viralPotential < 60
        ? 'Distribution bottleneck: Lacks natural word-of-mouth K-factor, necessitating methodical outbound sales or paid acquisition.'
        : 'Cold-start coordination: Value is lower for user #1 until network effects or density reach a critical threshold.'
    ],

    scores: {
      marketNeed: {
        score: marketNeed,
        label: 'Market Need',
        rationale: marketNeed > 75 
          ? 'Clear painkiller: Solves an operational headache with measurable time/dollar cost.'
          : 'Borderline vitamin: High user enthusiasm initially, but retention requires continuous engagement triggers.',
        benchmark: `Top ${Math.max(8, 100 - marketNeed)}% of evaluated concepts`,
        pros: ['Directly replaces manual repetitive labor', 'High search intent for equivalent solutions'],
        cons: ['Users often tolerate existing workarounds', 'Priority competes with top-tier budget allocations']
      },
      competition: {
        score: competition,
        label: 'Competition',
        rationale: competition > 70
          ? 'Fragmented market with no single dominant modern solution.'
          : 'Crowded landscape: Incumbents possess established distribution channels and brand trust.',
        benchmark: `Top ${Math.max(10, 100 - competition)}% in competitive headroom`,
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
        benchmark: `Top ${Math.max(12, 100 - monetization)}% in revenue capture potential`,
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
        score: viralPotential,
        label: 'Growth Potential',
        rationale: viralPotential > 70
          ? 'High organic distribution: Product workflow naturally exposes the tool to collaborators, clients, and industry peers.'
          : 'Low natural virality: Single-player utility requires disciplined outbound distribution or dedicated content wedges.',
        benchmark: `Top ${Math.max(10, 100 - viralPotential)}% in organic growth potential`,
        pros: ['Multiplayer or client-facing surface area encourages organic referral', 'Demonstrable workflow speed gains generate word-of-mouth'],
        cons: ['Does not spread organically without proactive distribution incentives', 'Dependency on direct sales or content marketing']
      },
      viralPotential: {
        score: viralPotential,
        label: 'Growth Potential',
        rationale: viralPotential > 70
          ? 'High organic loop: Product workflow naturally exposes the tool to collaborators and clients.'
          : 'Low natural virality: Requires disciplined outbound distribution or dedicated content wedges.',
        benchmark: `Top ${Math.max(10, 100 - viralPotential)}% in organic growth potential`,
        pros: ['Multiplayer or client-facing surface area encourages organic referral', 'Demonstrable workflow speed gains generate word-of-mouth'],
        cons: ['Does not spread organically without proactive distribution incentives', 'Dependency on direct sales or content marketing']
      }
    },

    expertEvaluations: {
      vc: {
        personaId: 'vc',
        personaName: 'Elena Rostova',
        personaTitle: 'General Partner at Apex Seed Capital',
        stance: vcStance,
        verdictVote: verdict,
        quote: verdict === 'BUILD' 
          ? `"The unit economics and customer urgency pass our fund threshold. If you can lock in 5 pilot LOIs in the next 30 days, I'd write a pre-seed term sheet."`
          : verdict === 'PIVOT'
          ? `"Right now this looks like a \$2M lifestyle feature rather than a \$100M fund-returner. Narrow the wedge down to where the pain is bleeding cash."`
          : `"Pass for our fund. The CAC/LTV equation will degrade fast, and incumbents can ship this in their next minor sprint."`,
        primaryThesis: isB2B 
          ? `B2B software that shaves engineering or compliance overhead carries strong gross margins (80%+). The key is demonstrating that this is an indispensable operational layer rather than a nice-to-have plugin.`
          : `Marketplaces and consumer tools live or die on organic liquidity and low-cost distribution. Without an asymmetric unfair acquisition channel, seed capital will burn on meta ads.`,
        deepDiveAnalysis: `From an institutional investor standpoint, I look at the terminal exit multiple and capital efficiency. If this company raises \$1.5M, can it reach \$1M ARR within 18 months? For this idea, the largest risk is not whether the code can be written, but whether buyers have dedicated budget line items for this specific problem right now.`,
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
        personaTitle: '3x Founder (1 Exit to Datadog, 1 Failure)',
        stance: founderStance,
        verdictVote: verdict,
        quote: verdict === 'BUILD'
          ? `"I've lived this exact operational nightmare. If you give me a basic MVP that does just the core job reliably, I would pay you with my own credit card today."`
          : verdict === 'PIVOT'
          ? `"You're trying to boil the ocean on day 1. Pick the top 10% most desperate users and discard the rest of the roadmap for now."`
          : `"Do not spend 6 months building this in a dark room. You will launch to crickets because customers don't actually wake up in a sweat over this."`,
        primaryThesis: `Founder execution is 90% about ruthlessly killing non-core features and talking to 10 customers a day. If customers aren't begging for an ugly prototype, adding more features won't save it.`,
        deepDiveAnalysis: `In my previous venture, we wasted \$80k on secondary features before realizing our ICP just wanted one button that worked every time. For this idea, the real hurdle will be the onboarding drop-off. You must get the customer to the "Aha!" moment within 90 seconds of signup, otherwise churn will eat you alive.`,
        greenFlags: [
          'Solves an immediate, recurring workflow friction',
          'Founders can build a manual "concierge MVP" before writing deep backend infrastructure'
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
        personaTitle: 'Fractional CTO & Ex-Staff Architect',
        stance: ctoStance,
        verdictVote: verdict === 'DROP' ? 'DROP' : 'BUILD',
        quote: technicalFeasibility > 75
          ? `"Architecturally this is clean. A lightweight React/TypeScript frontend, managed Postgres, and stateless workers will get you to 10k users without sweat."`
          : `"Be careful with edge-case hallucinations and rate-limit latency. If the system fails 2% of the time, enterprise users will abandon it."`,
        primaryThesis: `Keep the architecture boring and dependable. Avoid premature distributed microservices; build a clean modular monolith that can be deployed on standard serverless infra.`,
        deepDiveAnalysis: `The engineering scope is completely realistic for a 1-to-2 person founding team. The primary technical bottleneck will not be the UI or database, but managing edge-case state synchronization and data privacy boundaries. Ensure audit logging and RBAC permissions are designed into the schema from day one.`,
        greenFlags: [
          'Standard REST/GraphQL APIs and modern UI components handle the entire workflow',
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
        personaTitle: 'VP of Growth & Retention',
        stance: marketerStance,
        verdictVote: verdict,
        quote: viralPotential > 70
          ? `"The product has a built-in viral loop: every time a user shares an output, their peers see your brand watermark. That will drive sub-$10 CAC."`
          : `"Without an organic loop, you are going to burn cash on Google Ads. You need to build free interactive audit tools or calculators as SEO wedges."`,
        primaryThesis: `Product-led growth (PLG) only succeeds if the product naturally advertises itself during normal usage. Otherwise, founder-led LinkedIn content and cold email outbound must carry the initial 100 customers.`,
        deepDiveAnalysis: `To win distribution here, do not launch on Product Hunt and pray. Instead, identify the 3 digital watering holes where your buyers congregate (specific Subreddits, Discord servers, Slack communities, or niche conferences). Create free educational templates or teardowns to build trust before asking for the demo.`,
        greenFlags: [
          'High intent search traffic for this specific problem domain',
          'Visual, shareable artifacts that look great as screenshot demos on social media'
        ],
        redFlags: [
          'High competitive ad bidding in this category makes paid Google/Meta ads cost-prohibitive',
          'Single-player utility limits natural peer referral mechanics'
        ],
        hardQuestionsForFounders: [
          'What is the free "mini-tool" or teardown you can release to capture 1,000 email leads for $0?',
          'Why would an early adopter proudly share this on LinkedIn or Twitter?',
          'What is your expected payback period on CAC (aim for under 6 months)?'
        ]
      }
    },

    competitorLandscape: [
      {
        name: isB2B ? 'Legacy Enterprise Suites (e.g. Atlassian, ServiceNow, Salesforce)' : 'Established Incumbents & Manual Spreadsheets',
        category: 'Incumbent',
        threatLevel: 'Medium',
        advantageOverYou: 'Massive enterprise distribution contracts, deep trust, existing vendor relationships.',
        yourWinningAngle: '10x faster setup, zero bloated enterprise configuration, lightweight modern AI automation.'
      },
      {
        name: isAIHeavy ? 'Venture-backed AI Startups in YC / Seed batches' : 'Niche Point Solutions',
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
        whyItWorksBetter: 'Elevates ACV from \$49/mo to \$800+/mo, dramatically shortening the path to \$1M ARR while reducing churn to < 1% monthly.',
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
        hypothesis: 'Visitors landing on a clear value proposition will commit an email and click "Request Early Access / Pre-Order".',
        method: 'Deploy a high-converting landing page with animated product mockups, pricing tiers, and a pre-order credit card authorization or waitlist deposit.',
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

    simulatedDebateSnippet: generateVentureSpecificDebate({
      ventureName: input.title || (input.description.match(/^([^:\-–—\n]{3,40})[:\-–—]/)?.[1]?.trim()) || (input.description.split(/\s+/).slice(0, 5).join(' ')),
      description: input.description,
      icp: input.targetAudience || (isB2B ? 'Engineering Leads & Operations Directors' : 'Tech-savvy End Users & Creators'),
      monetization: input.monetizationModel || (isB2B ? 'Monthly Tiered Subscription (SaaS)' : 'Take-Rate Transaction Fee (10-15%)'),
      verdict,
      score: overallViabilityScore,
      isAI: isAIHeavy,
      isB2B,
      isMarketplace,
      isConsumer,
      isDevTools: /developer|git|code|api|sdk|pr|ci\/cd|devops|terminal|docker|kubernetes|infra/i.test(text),
      isHealth: /health|hipaa|medical|patient|clinic|doctor|pharma|biotech|medtech/i.test(text),
      isLocal: isLocalService,
      isFinTech: /finance|fintech|billing|invoice|payment|escrow|tax|accounting|stripe|banking/i.test(text)
    })
  };
}

/**
 * Optional Google Gemini API Integration
 */
async function evaluateWithGemini(input: StartupIdeaInput, apiKey: string): Promise<EvaluationResult | null> {
  const prompt = `You are an elite Startup Investment Committee evaluating a new startup idea.
Startup Title: ${input.title || 'Untitled'}
Description: ${input.description}
Target Audience: ${input.targetAudience || 'Not specified'}
Monetization Model: ${input.monetizationModel || 'Not specified'}
Stage: ${input.stage || 'Just an Idea'}

Simulate the 4 committee members:
1. Elena Rostova (Venture Capitalist - focuses on TAM, margins, fundability, defensibility)
2. Marcus Vance (Serial Founder - focuses on PMF, practical 0-to-1 grind, customer pain threshold)
3. Dr. Aris Thorne (Fractional CTO - focuses on architecture, technical feasibility, AI/API dependencies)
4. Chloe Lin (VP of Growth - focuses on CAC/LTV, distribution channels, virality)

Evaluate the idea and return ONLY a valid JSON object matching this exact structure:
{
  "overallViabilityScore": <number 0-100>,
  "verdict": <"BUILD" | "PIVOT" | "DROP">,
  "verdictSummary": <string>,
  "confidenceRating": <number 80-99>,
  "industry": <string>,
  "targetCustomer": <string>,
  "monetizationModel": <string>,
  "executiveSummary": <string>,
  "keyStrengths": [<string>, <string>, <string>, <string>],
  "fatalFlaws": [<string>, <string>, <string>],
  "scores": {
    "marketNeed": { "score": <0-100>, "label": "Market Need", "rationale": <string>, "benchmark": <string>, "pros": [<string>, <string>], "cons": [<string>, <string>] },
    "competition": { "score": <0-100>, "label": "Competition", "rationale": <string>, "benchmark": <string>, "pros": [<string>, <string>], "cons": [<string>, <string>] },
    "technicalFeasibility": { "score": <0-100>, "label": "Technical Feasibility", "rationale": <string>, "benchmark": <string>, "pros": [<string>, <string>], "cons": [<string>, <string>] },
    "monetization": { "score": <0-100>, "label": "Monetization", "rationale": <string>, "benchmark": <string>, "pros": [<string>, <string>], "cons": [<string>, <string>] },
    "defensibility": { "score": <0-100>, "label": "Defensibility", "rationale": <string>, "benchmark": <string>, "pros": [<string>, <string>], "cons": [<string>, <string>] },
    "viralPotential": { "score": <0-100>, "label": "Viral Potential", "rationale": <string>, "benchmark": <string>, "pros": [<string>, <string>], "cons": [<string>, <string>] }
  },
  "expertEvaluations": {
    "vc": { "personaId": "vc", "personaName": "Elena Rostova", "personaTitle": "General Partner at Apex Seed Capital", "stance": <"Strongly Bullish" | "Bullish" | "Cautious / Pivot" | "Bearish / Drop">, "verdictVote": <"BUILD" | "PIVOT" | "DROP">, "quote": <string>, "primaryThesis": <string>, "deepDiveAnalysis": <string>, "greenFlags": [<string>, <string>], "redFlags": [<string>, <string>], "hardQuestionsForFounders": [<string>, <string>, <string>] },
    "founder": { "personaId": "founder", "personaName": "Marcus Vance", "personaTitle": "3x Founder (1 Exit to Datadog, 1 Failure)", "stance": <"Strongly Bullish" | "Bullish" | "Cautious / Pivot" | "Bearish / Drop">, "verdictVote": <"BUILD" | "PIVOT" | "DROP">, "quote": <string>, "primaryThesis": <string>, "deepDiveAnalysis": <string>, "greenFlags": [<string>, <string>], "redFlags": [<string>, <string>], "hardQuestionsForFounders": [<string>, <string>, <string>] },
    "cto": { "personaId": "cto", "personaName": "Dr. Aris Thorne", "personaTitle": "Fractional CTO & Ex-Staff Architect", "stance": <"Strongly Bullish" | "Bullish" | "Cautious / Pivot" | "Bearish / Drop">, "verdictVote": <"BUILD" | "PIVOT" | "DROP">, "quote": <string>, "primaryThesis": <string>, "deepDiveAnalysis": <string>, "greenFlags": [<string>, <string>], "redFlags": [<string>, <string>], "hardQuestionsForFounders": [<string>, <string>, <string>] },
    "marketer": { "personaId": "marketer", "personaName": "Chloe Lin", "personaTitle": "VP of Growth & Retention", "stance": <"Strongly Bullish" | "Bullish" | "Cautious / Pivot" | "Bearish / Drop">, "verdictVote": <"BUILD" | "PIVOT" | "DROP">, "quote": <string>, "primaryThesis": <string>, "deepDiveAnalysis": <string>, "greenFlags": [<string>, <string>], "redFlags": [<string>, <string>], "hardQuestionsForFounders": [<string>, <string>, <string>] }
  },
  "competitorLandscape": [
    { "name": <string>, "category": <"Direct" | "Indirect" | "Incumbent">, "threatLevel": <"High" | "Medium" | "Low">, "advantageOverYou": <string>, "yourWinningAngle": <string> }
  ],
  "pivotAngles": [
    { "title": <string>, "targetAudience": <string>, "revisedAngle": <string>, "whyItWorksBetter": <string>, "viabilityMultiplier": <string> }
  ],
  "validationExperiments": [
    { "step": 1, "timeframe": "Days 1 - 5", "title": <string>, "hypothesis": <string>, "method": <string>, "successMetric": <string>, "estimatedCost": "$0" },
    { "step": 2, "timeframe": "Days 6 - 12", "title": <string>, "hypothesis": <string>, "method": <string>, "successMetric": <string>, "estimatedCost": "$50" },
    { "step": 3, "timeframe": "Days 13 - 22", "title": <string>, "hypothesis": <string>, "method": <string>, "successMetric": <string>, "estimatedCost": "$0" },
    { "step": 4, "timeframe": "Days 23 - 30", "title": <string>, "hypothesis": <string>, "method": <string>, "successMetric": <string>, "estimatedCost": "$0" }
  ],
  "simulatedDebateSnippet": [
    { "speaker": "Elena Rostova", "role": "Venture Capitalist", "message": <string> },
    { "speaker": "Marcus Vance", "role": "Startup Founder", "message": <string> },
    { "speaker": "Dr. Aris Thorne", "role": "Fractional CTO", "message": <string> },
    { "speaker": "Chloe Lin", "role": "Growth Marketer", "message": <string> }
  ]
}`;

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: 'application/json',
        temperature: 0.7
      }
    })
  });

  if (!response.ok) {
    throw new Error(`Gemini API error: ${response.statusText}`);
  }

  const data = await response.json();
  const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!rawText) return null;

  const parsed = JSON.parse(rawText);
  return {
    ...parsed,
    id: 'eval_gemini_' + Date.now().toString(36),
    timestamp: Date.now(),
    ideaText: input.description
  };
}

/**
 * Optional OpenAI API Integration
 */
async function evaluateWithOpenAI(input: StartupIdeaInput, apiKey: string): Promise<EvaluationResult | null> {
  const prompt = `You are an elite Startup Investment Committee evaluating a new startup idea:
Title: ${input.title || 'Untitled'}
Description: ${input.description}
Audience: ${input.targetAudience || 'Not specified'}
Monetization: ${input.monetizationModel || 'Not specified'}

Simulate the 4 committee members (VC Elena Rostova, Founder Marcus Vance, CTO Dr. Aris Thorne, Marketer Chloe Lin).
Evaluate the 6 scores: marketNeed, competition, technicalFeasibility, monetization, defensibility, viralPotential (0-100 each).
Determine overallViabilityScore (0-100) and verdict ("BUILD" | "PIVOT" | "DROP").
Provide executive summary, key strengths, fatal flaws, competitor landscape, pivot angles, 30-day experiments, and committee debate.
Output strictly JSON matching the required schema.`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
      temperature: 0.7
    })
  });

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.statusText}`);
  }

  const data = await response.json();
  const rawText = data.choices?.[0]?.message?.content;
  if (!rawText) return null;

  const parsed = JSON.parse(rawText);
  return {
    ...parsed,
    id: 'eval_openai_' + Date.now().toString(36),
    timestamp: Date.now(),
    ideaText: input.description
  };
}
