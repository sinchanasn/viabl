# Viabl — Venture Capital Intelligence & Pre-Capital Diligence Platform

Viabl is an institutional startup diligence platform that simulates an early-stage investment committee to evaluate business ideas across market demand, competitive whitespace, technical feasibility, unit economics, defensibility, and growth dynamics before founders commit engineering capital.

---

## Executive Overview

Most startups fail not from engineering execution, but from structural flaws identified during due diligence: weak willingness-to-pay, misjudged customer acquisition costs, or lack of defensibility against incumbent platforms. 

Rather than generating generic conversational feedback, Viabl subjects submitted concepts to rigorous, multi-perspective committee scrutiny modeled on institutional seed fund diligence practices.

---

## The Investment Committee

Every submission is reviewed across four distinct domain disciplines:

| Partner | Role | Focus Area | Core Diligence Criteria |
|---|---|---|---|
| **Elena Rostova** | Venture Capitalist | Unit Economics & Fundability | Addressable market size ($1B+ TAM), gross margin profile (>80%), enterprise defensibility, follow-on round fundability. |
| **Marcus Vance** | Serial Founder | PMF & Operational Grit | Customer pain severity (hair-on-fire problem), onboarding friction, founder-market fit, willingness to pre-pay. |
| **Dr. Aris Thorne** | Fractional CTO | Technical Feasibility & Scalability | Core architectural risk, 45-day MVP scope, third-party platform API dependencies, data isolation compliance. |
| **Chloe Lin** | Growth Strategist | Distribution & Growth Dynamics | Customer Acquisition Cost (CAC) vs. LTV, organic distribution loops, channel saturation thresholds, retention curves. |

---

## Six-Axis Diligence Framework

Each idea is evaluated and scored on a 0 to 100 scale:

1. **Market Need (DIM-01)**: Quantifies customer desperation, pain intensity, frequency of headache, and urgency to abandon existing manual workarounds.
2. **Competition (DIM-02)**: Evaluates competitive density, incumbent inertia, and open whitespace vs. legacy enterprise suites and DIY scripts.
3. **Technical Feasibility (DIM-03)**: Assesses architectural surface area, API dependency risks, compute cost margins, and 45-day MVP feasibility.
4. **Monetization (DIM-04)**: Measures willingness-to-pay elasticity, pricing power, gross software margins, and path to $1M ARR.
5. **Defensibility (DIM-05)**: Evaluates switching costs, workflow embedding, data flywheels, and protection against platform fast-followers.
6. **Growth Potential (DIM-06)**: Assesses organic word-of-mouth velocity, product-led distribution loops, and CAC sustainability.

---

## Committee Verdicts

Using weighted composite scoring, the committee issues one of three formal recommendations:

- **BUILD**: Score >= 75 with strong defensibility and monetization. The concept addresses an acute workflow headache with clear commercial pull and sustainable unit economics.
- **PIVOT**: Score between 56 and 74. The core pain is valid, but the business model, target ICP, or distribution angle suffers from structural friction. Re-anchoring around higher-margin niches is advised.
- **DROP**: Score < 56 or critical flaw present. Capital and founder hours are likely better preserved for higher-probability opportunities due to adverse CAC/LTV economics or severe platform dependency.

---

## Deliverables Generated

For every review docket, the platform produces:

- **Executive Summary**: Holistic investment thesis and strategic synthesis.
- **Six-Axis Scorecard**: Tabular breakdown, percentile benchmarks, and geometric radar chart analysis.
- **Key Strengths & Asymmetric Wedges**: Structural operational advantages.
- **Risk Analysis & Moat Deficits**: Documented vulnerability factors and recommended mitigants.
- **Deliberation Record**: Unfiltered transcript exchange between the four reviewing partners.
- **Partner Deep Dives**: Individual dossiers including theses, green flags, red flags, and three scrutiny questions for pitch meetings.
- **Competitor Battlefield**: Breakdown of direct, indirect, and incumbent competitors with winning wedge positioning.
- **Adjacent Pivot Vectors**: Alternative market positioning and value acceleration angles.
- **30-Day Lean Validation Plan**: Sequential hypothesis-testing roadmap (Days 1-5, 6-12, 13-22, 23-30) designed for de-risking prior to code development.
- **Export Formats**: Standard Letter/A4 formatted print-ready PDF, structured Markdown memorandum, and machine-readable JSON.

---

## System Architecture

The application is structured as a decoupled full-stack platform:

```
viabl/
├── server/
│   └── index.js              # Node.js/Express due diligence REST API
├── src/
│   ├── components/           # Editorial React components (Newsreader/Inter/JetBrains Mono)
│   ├── services/
│   │   ├── evaluator.ts      # Multi-persona evaluation orchestrator
│   │   ├── presets.ts        # Diligence benchmarks and sample dockets
│   │   └── storage.ts        # LocalStorage persistence & settings
│   ├── types/                # Strict TypeScript domain interfaces
│   ├── App.tsx               # Main application controller
│   └── index.css             # Monochrome design system & print styles
├── index.html                # Entry document with typography imports
├── package.json              # Full-stack scripts & dependencies
├── tailwind.config.js        # Editorial styling configuration
└── vite.config.ts            # Vite bundler with API proxy to port 3001
```

---

## Development Setup

### Prerequisites

- Node.js version 18.0.0 or higher
- npm version 9.0.0 or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/<YOUR-USERNAME>/viabl.git
cd viabl

# Install dependencies
npm install
```

### Running the Application

```bash
# Start both backend API (port 3001) and frontend dev server (port 3000)
npm run dev

# Start only the backend API server
npm run server

# Start only the frontend Vite development server
npm run client

# Compile production build
npm run build
```

The frontend runs at `http://localhost:3000` and the backend runs at `http://localhost:3001`.

---

## Backend API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Returns server operational status and active version. |
| `GET` | `/api/committee` | Returns the four committee partner profiles and criteria. |
| `GET` | `/api/presets` | Returns pre-configured venture test dockets. |
| `POST` | `/api/evaluate` | Evaluates a submitted startup idea and returns the formal memorandum. |

### Evaluation Request Payload

```json
{
  "title": "CodeSync",
  "description": "Automated developer platform that hooks into GitHub PRs to synchronize OpenAPI specs and documentation.",
  "targetAudience": "Engineering Leads and CTOs",
  "monetizationModel": "Tiered B2B SaaS ($99 to $499/mo)",
  "stage": "Just an Idea"
}
```

---

## Security and Privacy

- Pitch concepts evaluated via the local heuristic engine run entirely within your local execution environment.
- When optional external model providers (Google Gemini or OpenAI) are enabled, API keys are retained exclusively in the client's local browser storage (`localStorage`) and never transmitted to third-party telemetry services.
