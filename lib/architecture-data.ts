export interface ArchSystem {
  id: string;
  number: string;
  title: string;
  category: "Database & Core" | "Client-Facing App" | "CRM & Provisioning" | "Automation & AI" | "Control Plane";
  status: "LIVE" | "CONTROL PLANE" | "ON-DEMAND";
  oneLiner: string;
  shape: string;
  nodes: string[];
  invariants: string[];
  observations: string[];
  metrics: string;
}

export const ESTATE_SYSTEMS: ArchSystem[] = [
  {
    id: "sys-01",
    number: "01",
    title: "Enrollment-Gated Booking & Watchdog",
    category: "CRM & Provisioning",
    status: "LIVE",
    oneLiner: "Public booking funnel → Relational DB of record → Sheet mirror + automated chat reminders.",
    shape: "Commit-first intake pipeline with mirror reconciliation and scheduled watchdog verification.",
    nodes: ["Public Intake UI", "Enrollment Gate", "Relational DB (SoT)", "Watchdog Sync", "Chat Reminder Dispatch"],
    invariants: [
      "Commit, then verify, then notify: records write to the relational DB before any external mirror or notification fires.",
      "Category alignment mirrors System 02's active taxonomy."
    ],
    observations: [
      "Engineered cadence controls to eliminate workflow engine quota exhaustion.",
      "Fail-open notification design ensures booking transactions never roll back on chat webhook timeouts."
    ],
    metrics: "100% Write Durability · Watchdog Verified"
  },
  {
    id: "sys-02",
    number: "02",
    title: "Portal-Embedded Content Assistant",
    category: "Client-Facing App",
    status: "LIVE",
    oneLiner: "Multi-tenant client portal: onboarding, 5 specialized AI generators, profile audit, expert Q&A, brand kit & rich editor.",
    shape: "Full-stack client-facing SaaS application embedded seamlessly inside the membership portal via token handshake.",
    nodes: ["CRM Token Handshake", "Onboarding Profile Engine", "v4/v5 Vector Retrieval", "5 Specialized Generators", "Brand Kit & Live Editor"],
    invariants: [
      "Namespaced user profile JSON prevents cross-system state corruption.",
      "Multi-generation semantic vector retrieval ranks curated domain knowledge before generation."
    ],
    observations: [
      "Serves as the primary daily-use client application across the estate.",
      "Includes automated unknowns-loop telemetry that flags unanswered domain questions for KB expansion."
    ],
    metrics: "5 AI Engines · v4/v5 Hybrid Vector RAG"
  },
  {
    id: "sys-03",
    number: "03",
    title: "CRM Tag Provisioning & Identity Spine",
    category: "CRM & Provisioning",
    status: "LIVE",
    oneLiner: "92-node orchestration spine handling instant CRM tag-to-database user provisioning and access control.",
    shape: "Event-driven identity bridge translating CRM lifecycle tags into authenticated relational user rows.",
    nodes: ["CRM Tag Webhook", "Identity Validator", "Relational Users Table", "Portal Access Grant", "Audit Relay"],
    invariants: [
      "Zero manual account creation required when CRM enrollment tags fire.",
      "Direct provisioning pipeline feeds downstream authentication for Systems 02 and 05."
    ],
    observations: [
      "Isolated active provisioning paths from legacy conversational nodes through forensic live-state mapping."
    ],
    metrics: "92-Node Orchestration · Instant CRM Sync"
  },
  {
    id: "sys-04",
    number: "04",
    title: "7-Way Parallel Content Factory",
    category: "Automation & AI",
    status: "LIVE",
    oneLiner: "Staff-triggered intake → direct SQL profile hydration → 7-way parallel LLM generation → assembled package delivery.",
    shape: "High-throughput asynchronous generation pipeline combining relational user state with parallelized LLM execution.",
    nodes: ["Staff Trigger Form", "Direct SQL Profile Lookup", "Shared Knowledge Vectors", "7x Parallel LLM Workers", "Compiled Package Dispatcher"],
    invariants: [
      "Commit, then verify, then notify pattern enforced across all 7 parallel generation branches.",
      "Direct SQL hydration guarantees zero copy-paste drift between user onboarding and generated assets."
    ],
    observations: [
      "Cuts multi-asset campaign turnaround from hours of manual prompting to a single deterministic trigger."
    ],
    metrics: "7x Parallel Execution · Zero Copy-Paste Drift"
  },
  {
    id: "sys-05",
    number: "05",
    title: "Internal Team Copywriter & Skill Vault",
    category: "Client-Facing App",
    status: "LIVE",
    oneLiner: "Internal operator fork of System 02 featuring an isolated knowledge base, shared team sessions, and reusable saved skills.",
    shape: "Role-gated internal AI workbench with dedicated vector tables and collaborative session state.",
    nodes: ["Team Auth Gate", "Isolated Internal KB", "Saved Skill Library", "Partner Profile Lookup", "Shared Session Store"],
    invariants: [
      "Table-level knowledge base isolation separates internal copywriting frameworks from student-facing vectors.",
      "Cross-system partner lookup reads live client profiles on demand."
    ],
    observations: [
      "Enables internal strategists to codify repeatable prompt architectures as one-click team skills."
    ],
    metrics: "Isolated Vector KB · Shared Team Sessions"
  },
  {
    id: "sys-06",
    number: "06",
    title: "Deterministic Call-to-Guide Render Service",
    category: "Automation & AI",
    status: "LIVE",
    oneLiner: "Call transcript ingestion → deterministic gated guide composer → automated PDF render engine (human-reviewed).",
    shape: "Microservice rendering pipeline where models extract insights, deterministic code composes structure, and PDF artifacts are staged for review.",
    nodes: ["Transcript Ingest", "Profile & Booking Hydration", "Deterministic Gate Composer", "PDF Render Microservice", "Human Review Staging"],
    invariants: [
      "Models explain; code decides: structural layout and gating rules are enforced in deterministic code, never left to LLM hallucination.",
      "Human-in-the-loop is structural: generates staged PDFs and never auto-sends to clients unreviewed."
    ],
    observations: [
      "Gold-standard credential hygiene: per-capability secrets, constant-time token comparison, and scoped audit logs."
    ],
    metrics: "Constant-Time Auth · Deterministic PDF Engine"
  },
  {
    id: "sys-07",
    number: "07",
    title: "Grounded Support Inbox Drafter",
    category: "Automation & AI",
    status: "LIVE",
    oneLiner: "Polls support inbox → classifies intent → retrieves strictly from curated support KB → stages grounded draft reply.",
    shape: "Zero-hallucination customer support pipeline with error watcher and human-in-the-loop send enforcement.",
    nodes: ["Inbox Poller", "Intent & Rule Classifier", "Isolated Support KB + Tickets DB", "Grounded Draft Generator", "Human Agent Send Gate"],
    invariants: [
      "Answers exclusively from the curated support corpus—never invents policy or billing promises.",
      "Structural human-in-the-loop: stages drafts directly inside the inbox; a human operator always clicks send."
    ],
    observations: [
      "Backed by dedicated error-watcher and auth-assignment workflows for continuous inbox reliability."
    ],
    metrics: "0 Unverified Outbound Sends · Curated Corpus RAG"
  },
  {
    id: "sys-08",
    number: "08",
    title: "Synchronous Social DM FAQ Responder",
    category: "Automation & AI",
    status: "LIVE",
    oneLiner: "Low-latency webhook responder grounding social DM inquiries against a live-synced FAQ matrix.",
    shape: "Consolidated single-pipeline webhook replacing 4 fragmented legacy workflows.",
    nodes: ["Social Webhook Ingress", "Live FAQ Matrix Loader", "Grounded Response Synthesizer", "Synchronous Reply Dispatch"],
    invariants: [
      "Strict corpus boundary: responds only within verified FAQ parameters."
    ],
    observations: [
      "Consolidated 4 legacy split workflows (W1–W4) into a single maintainable architectural unit."
    ],
    metrics: "4→1 Workflow Consolidation · Sub-Second Webhook"
  },
  {
    id: "sys-09",
    number: "09",
    title: "Executive Analytics Dashboard & AI Tool API",
    category: "Database & Core",
    status: "LIVE",
    oneLiner: "6 automated sheet/API sync pipelines → relational mirror tables → DB-defined dynamic dashboard pages + natural-language AI query endpoint.",
    shape: "Unified BI & telemetry platform combining scheduled ETL mirrors with a secure AI data-analyst endpoint.",
    nodes: ["6x Scheduled Sync Pipelines", "Relational Mirror Tables", "DB-Defined Dynamic UI", "Scoped AI Query Endpoint", "Audit Log Ledger"],
    invariants: [
      "Hashed capability tokens and constant-time comparisons protect the AI query tool endpoint.",
      "Dashboard views are dynamically driven by database definitions for rapid KPI iteration."
    ],
    observations: [
      "Bridges scattered spreadsheet operations into a single queryable relational database spine."
    ],
    metrics: "6 ETL Sync Pipelines · AI SQL/Tool Endpoint"
  },
  {
    id: "sys-10",
    number: "10",
    title: "Async Category Diagnostic & AI Plan Engine",
    category: "Client-Facing App",
    status: "LIVE",
    oneLiner: "Public interactive quiz → deterministic algorithmic scoring → async job queue → personalized LLM action plan.",
    shape: "High-concurrency lead diagnostic separating deterministic math scoring from asynchronous LLM narrative generation.",
    nodes: ["Interactive Quiz UI", "Deterministic Scoring Engine", "Async Job Queue API", "Knowledge Vector Lookup", "Personalized Plan Renderer"],
    invariants: [
      "Models explain; code decides: category placement is 100% deterministic math; the LLM only writes the tailored roadmap.",
      "Commit-first state persistence prevents lost quiz submissions under traffic spikes."
    ],
    observations: [
      "Async job architecture eliminates browser timeout failures during deep plan generation."
    ],
    metrics: "100% Deterministic Scoring · Async Job Queue"
  },
  {
    id: "sys-12",
    number: "12",
    title: "Cohort Purchase Cross-Reference Watch",
    category: "CRM & Provisioning",
    status: "ON-DEMAND",
    oneLiner: "Read-only multi-source reconciliation agent cross-referencing cohort purchases against CRM records.",
    shape: "Zero-mutation audit workflow that identifies enrollment discrepancies and outputs human-reviewable reconciliation drafts.",
    nodes: ["Payment Ledger Reader", "CRM Contact Cross-Ref", "Discrepancy Diff Engine", "Reconciliation Draft Output"],
    invariants: [
      "Strictly read-only against production databases; outputs verified diffs for operator confirmation."
    ],
    observations: [
      "Eliminates revenue leakage and missed student onboarding across high-volume cohort launches."
    ],
    metrics: "Read-Only Audit Safety · Zero Revenue Leakage"
  },
  {
    id: "sys-13",
    number: "13",
    title: "Operator Agent Workspace (The Control Plane)",
    category: "Control Plane",
    status: "CONTROL PLANE",
    oneLiner: "Two-layer AI engineering control plane governing all downstream repositories, task queues, session claims, and multi-agent dispatches.",
    shape: "State-on-disk engineering operating system where conversation is never the record—every decision, claim, blocker, and receipt is cryptographically or structurally logged.",
    nodes: ["Routing Map & Policies", "5-Stage Build Methodology", "Multi-Agent Fan-Out (8 Roles)", "Locked Task Queue & Claims", "Command Board Mirror"],
    invariants: [
      "Conversation is never the source of truth: state lives in locked JSON queues, decision logs, and hashed day receipts.",
      "5-Stage Structure-First Build: Macro → Contracts → Modules → Mock Integration (≤2 Gate Attempts) → Real Services."
    ],
    observations: [
      "Coordinates 18 specialized skills, 11 multi-agent workflows, 8 subagent roles, and 79 operator scripts."
    ],
    metrics: "79 Operator Scripts · 8 Subagent Roles · 5-Stage Build"
  },
  {
    id: "sys-14",
    number: "14",
    title: "3-Scope Governed Agent Harness",
    category: "Control Plane",
    status: "CONTROL PLANE",
    oneLiner: "15 mechanical pre/post-tool gates across User, Workspace, and Project scopes with mutation-first self-testing.",
    shape: "Defense-in-depth enforcement wrapper turning raw LLMs into deterministic, policy-governed software operators.",
    nodes: ["[U] Destructive Action Gate", "[W] 14 Pre-Tool Gate Scripts", "[W] Send Gate & SQL Journal", "[W] Step-Aside & Hook Ledgers", "Mutation-First Self-Test Runner"],
    invariants: [
      "Mechanical where incidents proved prose insufficient: every gate header records the production incident that created it.",
      "Mutation-first verification: every gate test suite must turn RED against a broken mutant copy before trusting a GREEN pass."
    ],
    observations: [
      "23/23 gate test suites passing; tracks every fail-open step-aside and outbound send request in real time."
    ],
    metrics: "15 Mechanical Gates · 23/23 Mutation Tests Passing"
  }
];

export const HARNESS_GATES = [
  {
    scope: "U: USER SCOPE",
    badge: "Global Defense",
    color: "from-cyan-400 to-teal-400",
    name: "Destructive-Action Gate & Persistent Memory",
    trigger: "Shell · DB Write · Workflow Delete",
    description:
      "Declarative policy engine with ordered deny / protect / allow rules, 50-file / 100MB thresholds, PII table guards, and 60-min TTL arming. Tiered 191-file persistent memory index capped under 25KB.",
    verdict: "DENY / PROTECT / STEP-ASIDE LOGGED",
  },
  {
    scope: "W: WORKSPACE SCOPE",
    badge: "14 Pre-Tool Gates",
    color: "from-purple-400 to-fuchsia-500",
    name: "Spec Gate · Mock-Stage · Merge↔Migration · Send Gate",
    trigger: "File Write · Git Ops · Subagent Fan-Out · Slack/Mail Send",
    description:
      "Enforces approved specs before builds, blocks live network calls during mock stage, couples git merges to DB migrations, limits verification retries to ≤2 attempts, and intercepts outbound emails/Slack messages.",
    verdict: "MECHANICAL ENFORCEMENT",
  },
  {
    scope: "W: POST-TOOL & AUDIT",
    badge: "Telemetry & Drift",
    color: "from-cyan-400 to-purple-500",
    name: "SQL Write Journal · Guardrail Drift · Mutation Runner",
    trigger: "Post-Write · Session Wrap · Weekly Housekeeping",
    description:
      "Automatically journals every SQL schema change into the architecture map, detects unmapped guardrails, reserves exclusive day-log receipts, and runs sed-mutant tests across all 15 gates.",
    verdict: "23/23 SUITES PASSING",
  },
  {
    scope: "P: PROJECT SCOPE",
    badge: "Per-Repo State",
    color: "from-fuchsia-400 to-cyan-400",
    name: "Live Current-State Block & Role Contracts",
    trigger: "Repository Entry & Parallel Session Merge",
    description:
      "Version-controlled project instruction layer holding identity, collaborator roles, trigger phrases, and a single 'Current State' block reconciled at the end of every session.",
    verdict: "ZERO CONTEXT DRIFT",
  },
];

export const LIVE_OWNED_PROJECTS = [
  {
    title: "RPM Modern Tabletop Engine",
    tag: "Live Multiplayer · 3D Physics · WebSockets",
    stack: ["Three.js", "Cannon.js", "Node.js", "Real-Time State Sync", "Render"],
    summary:
      "Full-stack multiplayer tabletop platform featuring a custom 3D physics dice engine (DiceCanvas + gesture-driven DiceShaker), deterministic bot cast integrity, cryptographic room state synchronization, and responsive viewport orchestration.",
    highlights: [
      "3D rigid-body physics simulation running at 60fps in the browser",
      "Multi-agent feature certification workflow (Features 18–21 shipped & verified)",
      "Real-time multiplayer state authority & bot turn automation",
    ],
    metric: "Production Certified · 3D WebGL Physics",
  },
  {
    title: "Cloudflare D1 Food Costing & Margin Engine",
    tag: "Edge SaaS · OpenNext · Relational D1",
    stack: ["Next.js 15", "React 19", "Cloudflare Workers", "Cloudflare D1 (SQLite)", "Tailwind CSS"],
    summary:
      "Edge-deployed culinary costing and recipe margin platform engineered on the OpenNext Cloudflare stack with local/edge D1 relational migrations, automated seed pipelines, and sub-50ms global query execution.",
    highlights: [
      "Serverless SQLite (Cloudflare D1) relational schema with deterministic cost rollups",
      "Zero-cold-start OpenNext edge deployment architecture",
      "Automated TypeScript seed & migration tooling",
    ],
    metric: "Edge D1 SQL · <50ms Global Latency",
  },
  {
    title: "Pantry-to-Plate Custom MCP Server",
    tag: "Model Context Protocol · Supabase · Next.js",
    stack: ["MCP SDK", "TypeScript", "Supabase PostgreSQL", "Next.js App Router"],
    summary:
      "Custom Model Context Protocol (MCP) server exposing real-time Supabase ingredient matching and recipe synthesis tools directly to autonomous AI agents and a companion Next.js frontend.",
    highlights: [
      "Native tool registration (`get_ingredient_candidates`) bridging LLM reasoning to live PostgreSQL data",
      "Isolated monorepo architecture with zero middleware collision",
      "Bilingual natural-language query resolution verified end-to-end",
    ],
    metric: "Live MCP Tool Server · Supabase Backed",
  },
];
