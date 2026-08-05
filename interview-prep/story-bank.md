# Story Bank — Master STAR+R Stories

Maintain 5–10 deep stories. Bend them to fit almost any behavioral question.

**Big Three:**
- "Tell me about yourself" → combine Intro + 2 stories
- "Most impactful project" → Story 7 (Fulfillment Flow) or Story 1 (Race Condition)
- "Conflict you resolved" → Story 6 (Disagree & Commit)
- "Biggest weakness / drawback" → Story 8 (Detail Misses Under Pressure)

---

## Quick Reference Table

| # | Question | LP / Theme | One-line Summary | Jump To |
|---|----------|-----------|-----------------|---------|
| — | "Tell me about yourself" | Intro | 5yr Walmart · OMS + payments · Java/Kafka/K8s | [→](#intro) |
| — | "Why are you leaving?" | Transition | Hit a ceiling · want faster pace and more ownership | [→](#why-leave) |
| 1 | "Tell me about a creative / simple solution to a hard problem" | Invent & Simplify | DriverTip race condition · fixed with event republishing · no refactor | [→](#story-1) |
| 1 | "Tell me about an on-call / production incident" | Bias for Action | Same story | [→](#story-1) |
| 2 | "Tell me about a mistake you made" | Ownership | Restarted pod during Kafka decommission · blocked test env · wrote RCA | [→](#story-2) |
| 2 | "Tell me about a time you apologized" | Ownership | Same story | [→](#story-2) |
| 3 | "Tell me about a time you had to fix your own error" | Are Right, A Lot | Missed Sam's canary release · 2 regions on wrong version · no prod impact | [→](#story-3) |
| 4 | "Tell me about a time you helped someone grow" | Hire & Develop | Onboarded teammate on tipping system from zero · launched on time | [→](#story-4) |
| 5 | "Tell me about a time you needed info from someone unresponsive" | Bias for Action | Arkansas partner · 2hr time diff · recurring meetings + prep | [→](#story-5) |
| 6 | "Tell me about a time you disagreed with your manager" | Have Backbone | Pushed back on Splunk migration scope · phased approach · delivered on time | [→](#story-6) |
| 6 | "Tell me about an unpopular decision / stance you took" | Have Backbone | Same story | [→](#story-6) |
| 7 | "Tell me about your most impactful technical project" | Deliver Results | Fulfillment flow migration · fixed event sequencing · reduced reprocessing | [→](#story-7) |
| 7 | "Tell me about a system improvement you drove" | Invent & Simplify | Same story | [→](#story-7) |
| 8 | "What is your biggest weakness?" | Self-Awareness | Detail misses under pressure · task list + AI review · no repeat since | [→](#story-8) |
| 8 | "How do you handle pressure / multitasking?" | Self-Awareness | Same story | [→](#story-8) |
| 9 | "Tell me about a performance optimization you drove" | Invent & Simplify / Deliver Results | ThreadPool redesign · 50% thread cut · CPU/memory improvement under peak load | [→](#story-9) |
| 9 | "Tell me about a JVM / Java systems challenge" | Invent & Simplify | Same story | [→](#story-9) |
| 10 | "Tell me about a platform migration you led" | Deliver Results | DeferredAuth + Telecheck UPP · payment workflow modernization · no regressions | [→](#story-10) |
| 10 | "Tell me about your payment systems experience" | Deliver Results | Same story | [→](#story-10) |
| 11 | "Tell me about your production operations experience" | Builder/Operator — Production Ownership | On-call 500s · bad payload · feature flag rollout · staged store-by-store validation | [→](#story-11) |
| 11 | "How do you deploy a risky change safely?" | Bias for Action / Deliver Results | Same story | [→](#story-11) |
| 11 | "Tell me about a time you fixed a prod issue without downtime" | Deliver Results | Same story | [→](#story-11) |
| 12 | "Tell me about a time you simplified a design or reduced API complexity" | Invent & Simplify / Think Big | No Sale Open Drawer · recognized API consolidation opportunity · merged 3 APIs into 1 · staged rollout to full chain | [→](#story-12) |
| 12 | "Tell me about a time you saw a bigger opportunity beyond your assigned task" | Think Big / Ownership | Same story | [→](#story-12) |

---

## Quick Answers (Non-STAR)

<a name="intro"></a>
### Intro — "Tell me about yourself"

Hi, my name is Ling Xiang, a Software Engineer with 5 years at Walmart global tech. Payment authorization, order management both in-stores and online

I’m experienced in designing, developing, and scaling cloud-based backend and distributed systems.

My strengths include building scalable micro-services, optimizing system performance, and cross-team communications. I’m proficient in Java, Kafka, and Kubernetes, Cloud services. actively uses AI-assisted dev tools in my daily workflow.

I’m a careful problem-solver—I like figuring things out on my own first, but I know when to reach out and get input from the team. I try to be mindful of everyone’s time while still making the most of what we can learn from each other.


---

<a name="why-leave"></a>
### Why Leave Walmart?

I've grown a lot there.
But I've hit a ceiling.
The work has become maintenance-oriented.
I want to move faster, own more, and build things closer to the product.

---

## Stories

---

<a name="story-1"></a>
### [Invent and Simplify] Race Condition Fix — DriverTip Status

**Source:** Walmart — OMS Sales Order — On-call incident

**S (Situation):**
I was on-call. A critical production bug surfaced.
Driver tip status showed wrong info to users.
I found the root cause: a race condition between two events from different services.
Both events arrived within 1 second of each other.
Event 1: ingestion-order service, used DB modified timestamp.
Event 2: cancel module, used processing timestamp.
The downstream system ignored Event 1 because it looked stale.

**T (Task):**
Fix it fast.
No system disruption.
No major refactor.

**A (Action):**
I analyzed event logs to confirm the timing gap.
I consulted a senior engineer and proposed a simple fix.
Cancel module publishes a driver tip event.
Ingestion service consumes it and republishes it.
If Event 1 is ignored, Event 2 carries the correct data.
Simple redundancy — no architectural overhaul.

**R (Result):**
Race condition resolved.
Production issue fixed quickly.
No other systems disrupted.
No complex code changes required.

**Reflection:**
Simple solutions win in distributed systems.
Redundancy patterns beat complex fixes.
When on-call, look for the smallest change that breaks the cycle.

**Best for questions about:**
- Invent and Simplify
- Bias for Action
- Problem-solving under pressure
- On-call / production incidents
- "Most elegant solution to a hard problem"

---

<a name="story-2"></a>
### [Ownership] Kafka Restart Incident — Non-Sox Decommission

**Source:** Walmart — CPC Authorize — E2E testing incident

**S (Situation):**
I was testing an initiative under a tight deadline.
Hit a P1 bug in E2E testing.
Found a missing CCM config, added it.
Saw consumer lag. Restarted the pod.
I didn't read the IDC team's channel announcement:
"No deployments or restarts — non-Sox Kafka is being decommissioned."
Restarting caused the pod to crash.
Testing environment was fully blocked.

**T (Task):**
Fix the P1 incident I caused.
Restore the testing environment.

**A (Action):**
Called senior engineers immediately.
Got on a call with the team.
They were already cleaning up non-Sox CCM references.
Their fix was ready and merged within 1 hour.

**R (Result):**
Environment restored.
I wrote the full RCA.
Presented it to leadership.
New habit: read the IDC channel every morning before starting work.

**Reflection:**
Speed can cost more time than it saves.
Always check shared infrastructure announcements before touching anything.
Ownership means writing the RCA, not just apologizing.

**Best for questions about:**
- Ownership
- Accountability / mistake you made
- "Tell me about a time you apologized"
- Learning from failure

---

<a name="story-3"></a>
### [Are Right, A Lot] Sams Cloud Release — Version Mismatch

**Source:** Walmart — Production release (first solo cloud release)

**S (Situation):**
My first solo production cloud release. Late at night.
Deploying to WM and Sam's Cloud environments.
WM and Sam's have different configurations.

**T (Task):**
Deploy canary release correctly to all regions.

**A (Action):**
I triggered WM canary release. ✓
I triggered WM Cloud release. ✓
I missed Sam's canary release. ✗
Result: 2 regions on new version, 2 regions on old version.
Next day: synced with my manager and Sam's team.
Checked if the new version had Sam's-specific changes — it didn't.
No emergency rollback needed.
Created a new Change Request to deploy to the remaining Sam's regions.

**R (Result):**
Correct version deployed to all regions.
No production impact.
New practice: have production support verify versions post-release.
Always double-check region configs before submitting.

**Reflection:**
Production releases need a written checklist.
Never assume two cloud environments share the same config.
Late-night solo releases need extra review steps.

**Best for questions about:**
- Ownership / accountability
- Mistake you made
- "Tell me about a time you had to fix your own error"
- Deliver Results despite setbacks

---

<a name="story-4"></a>
### [Hire and Develop the Best] Amend Tip Onboarding

**Source:** Walmart — OMS Sales Order — Amend Tip initiative

**S (Situation):**
A teammate was assigned to the Amend Tip initiative.
They had zero prior knowledge of the tipping system.
They owned both design and development of this feature.

**T (Task):**
Onboard them on the existing system.
Make sure their changes wouldn't break the current flow.

**A (Action):**
Shared existing documentation.
Set up regular structured meetings: walkthrough → Q&A → design discussion.
Discussed how to design Amend Tip on top of Edit Tip.
Documented ideas and decisions during sessions.

**R (Result):**
Teammate successfully onboarded.
Amend Tip launched without breaking existing flows.

**Reflection:**
Structured onboarding beats ad-hoc help every time.
Documenting decisions during sessions saves the whole team time later.

**Best for questions about:**
- Hire and Develop the Best
- Mentoring / coaching
- Cross-team collaboration
- "Tell me about helping someone grow"

---

<a name="story-5"></a>
### [Bias for Action] Cross-timezone Onboarding — Arkansas

**Source:** Walmart — Loaned to sister payments team

**S (Situation):**
I was loaned to a sister team to help with payments work.
My onboarding partner was based in Arkansas — 2-hour time difference.
Limited overlap window. Tight ramp-up expected.

**T (Task):**
Get up to speed quickly.
Work effectively with limited sync time.

**A (Action):**
Set up recurring meetings during our overlap window.
Prepared questions and materials before each session.
If a meeting was disrupted (production incidents, etc.), rescheduled immediately.
When my partner was unavailable, escalated to manager.
Asked if another teammate could step in.

**R (Result):**
Successfully onboarded.
Delivered the assigned work for the sister team.

**Reflection:**
Preparation before async meetings multiplies value.
Time-zone gaps require proactive structure — don't wait to sync.
Escalating early is not a sign of weakness.

**Best for questions about:**
- Bias for Action
- Dealing with blockers
- Cross-team collaboration
- "Time you needed info from someone unresponsive"

---

<a name="story-6"></a>
### [Have Backbone; Disagree and Commit] Splunk → OpenObserve Migration

**Source:** Walmart — CPC Authorize — Monitoring migration

**S (Situation):**
I was assigned to migrate all monitoring alerts and dashboards from Splunk to OpenObserve.
Splunk was being soft-deleted on a tight deadline.
My manager wanted to optimize every alert during migration — review and rewrite all queries.

**T (Task):**
Respectfully push back on the approach.
Protect the deadline.
Still commit to the quality improvement my manager wanted.

**A (Action):**
Requested a private 1:1 with my manager.
First acknowledged her goal: improve monitoring quality.
Then explained the risk: optimizing + migrating simultaneously could blow the deadline.
Proposed a phased approach:
  Phase 1 — Migrate all alerts. Validate they trigger with the same results as Splunk.
  Phase 2 — Separate optimization project after migration is stable.
Offered to document optimization opportunities found during Phase 1.

**R (Result):**
Manager agreed to the phased approach.
Migration completed on time. All alerts working correctly in OpenObserve.
Separate optimization project launched post-migration.
Manager later said she appreciated that I had pushed back while still committing to quality.

**Reflection:**
Disagreeing on priorities means showing you understand their goal first.
Propose a path forward, not just a problem.
Phasing reduces risk without sacrificing the outcome.

**Best for questions about:**
- Have Backbone / Disagree and Commit
- Conflict with manager
- Influencing without authority
- "Unpopular decision" or "took an outlier stance"

---

<a name="story-7"></a>
### [Deliver Results] Fulfillment Flow Migration — Event Sequencing Fix

**Source:** Walmart — OMS Sales Order — FRCreate/FRConfirm pipeline

**S (Situation):**
The fulfillment creation and confirmation flow had timing issues.
System consumed Order Created events from an external ODS topic.
FRConfirm events were processed before FRCreate events.
FRConfirm was being ignored.
Required constant manual reprocessing.

**T (Task):**
Fix event sequencing.
Modernize the pipeline.
Align with current design patterns to prepare for a future DB migration.

**A (Action):**
Stopped consuming from the ODS topic.
Switched to the SalesOrder topic directly.
Updated object mapping to create FRCreate objects for FMS.
Refactored FRConfirm event handling.
Modernized codebase to follow current design patterns.

**R (Result):**
Event sequencing fixed.
FRConfirm reprocessing significantly reduced.
System reliability improved.
Codebase ready for the future DB migration.

**Reflection:**
Consuming from the right upstream source is simpler than patching timing bugs downstream.
Paying down tech debt during a targeted refactor pays off immediately.

**Best for questions about:**
- Deliver Results
- System design / architecture improvement
- Invent and Simplify
- "Most impactful system improvement"

---

<a name="story-8"></a>
### [Learn and Be Curious / Self-Awareness] Missing Details Under Pressure — Biggest Weakness

**Source:** Walmart — recurring pattern across multiple initiatives

**S (Situation):**
When I'm under heavy pressure or juggling multiple tasks, I tend to miss small details.
Not the big picture — the small ones.
I've missed details in initiative designs.
Had to create fixes after the fact.
No customer impact.
No timeline delays.
But it didn't look good to leadership.
And I knew it wasn't good enough.

**T (Task):**
Fix the root cause.
Not just apologize — build a system that prevents it.

**A (Action):**
First, I identified the pattern: multitasking was breaking my attention.
Second, I started writing down every task before I start work.
I work through them one by one. Nothing in parallel unless it has to be.
Third, I added a validation step for anything I design or implement.
I used to ask a co-worker to review my work.
Now I also use AI — I describe my design or checklist, and ask it to find gaps.
It catches things I didn't think to verify.
The combination of a task list and a second eye has made a visible difference.

**R (Result):**
I haven't had a detail miss in my recent initiatives.
The habit is now part of my workflow, not an afterthought.

**Reflection:**
Speed without attention is expensive.
I used to try to hold everything in my head.
Now I put it on paper first, then move.
Using AI as a validator isn't a crutch — it's a force multiplier.

**Best for questions about:**
- "Biggest weakness / area for improvement"
- "Tell me about a mistake you made"
- "How do you handle pressure?"
- "What have you done to improve yourself?"

---

> **Spoken version (memorize this):**
>
> "My biggest drawback is attention to detail under pressure.
> When I'm multitasking and moving fast, I sometimes miss small details in design or implementation.
> I've had to create fixes after the fact.
> No customer impact, no delays — but it's not the standard I hold myself to.
> To fix it, I made two changes.
> First, I write down every task before I start and work through them one by one.
> Second, I always have a second eye on my work — I used to ask a co-worker, now I also use AI to validate my designs and catch gaps.
> It's become a habit, not a checklist.
> The mistakes have stopped."

---

---

<a name="story-9"></a>
### [Invent & Simplify / Deliver Results] ThreadPool Executor Redesign — CPC Authorize Orchestrator

**Source:** Walmart — CPC Authorize Orchestrator — Performance optimization

**S (Situation):**
The CPC Authorize Orchestrator was experiencing threading bottlenecks under peak load.
CPU and memory efficiency were degraded.
The existing ThreadPool executor configuration had grown organically — too many threads, contention under heavy traffic.

**T (Task):**
Analyze root cause and redesign the ThreadPool configuration to improve efficiency.
No disruption to the payment authorization flow.

**A (Action):**
Profiled JVM thread allocation and CPU/memory usage patterns under peak load.
Identified excess thread count as the primary contributor to context-switching overhead.
Redesigned the ThreadPool executor configuration — reduced thread count by 50%.
Validated the change with load testing before deploying to production.

**R (Result):**
50% reduction in total thread count.
Significant improvement in CPU and memory efficiency under peak load.
No degradation in throughput — system handled the same load with fewer resources.

**Reflection:**
The JVM gives you fine-grained control over concurrency primitives — use it.
Thread count is not free: more threads = more context switching = more overhead.
Profiling before optimizing prevents premature or wrong fixes.

**Best for questions about:**
- Invent & Simplify
- Performance engineering / systems optimization
- JVM/Java expertise demonstration
- "Delivered a technical win with measurable impact"
- Distributed systems performance

---

<a name="story-10"></a>
### [Deliver Results] DeferredAuth & Telecheck UPP Migration — Payment Workflow Modernization

**Source:** Walmart — CPC Authorize Orchestrator

**S (Situation):**
The payment authorization system needed two parallel improvements:
1. A new Walmart Cash DeferredAuth capability to support deferred payment authorization workflows.
2. A migration of the Telecheck payment verification from a legacy platform to a modern one (UPP).

**T (Task):**
Implement DeferredAuth as a net-new capability in the authorization flow.
Migrate Telecheck to the UPP platform without disrupting existing authorization paths.

**A (Action):**
For DeferredAuth: designed and implemented the business logic for deferred authorization in Java; coordinated with the payments team on the API contract.
For Telecheck UPP: mapped the legacy platform's verification flow to the new platform's model; refactored service logic; ran parallel testing to validate equivalence before cutover.

**R (Result):**
DeferredAuth shipped and enabled new Walmart Cash payment workflows.
Telecheck UPP migration completed — legacy platform decommissioned.
No payment authorization regressions on either initiative.

**Reflection:**
Payment workflows require conservative, contract-first engineering — every edge case is a financial risk.
Parallel testing (old vs. new) before cutover is non-negotiable for payment migrations.

**Best for questions about:**
- Deliver Results
- Payment / financial transaction platform engineering
- Legacy-to-modern platform migration
- "Most impactful backend project"
- Domain expertise demonstration for fintech/billing/payments roles

---

<a name="story-11"></a>
### [Builder/Operator — Production Ownership] Payload Validation + Feature Flag Rollout — On-call 500s

**Source:** Walmart — On-call production incident

**S (Situation):**
I was on-call. An alert fired: our system was throwing 500 errors.
I dug into the logs and found the root cause wasn't an internal failure — the incoming payload was malformed.
The system had no validation layer; it was accepting and processing bad data, then crashing downstream.

**T (Task):**
Fix the issue without any interruption to production.
The system was live and actively processing orders across all stores.

**A (Action):**
I implemented payload validation to reject malformed requests at the entry point.
To deploy safely, I wrapped the validation behind a feature flag so I could control rollout independently of the code deployment.
Tested the change end-to-end in a lower environment.
Deployed to production with the flag off — zero risk at deploy time.
Turned the flag on for a small set of stores first.
Monitored errors and validated behavior with the upstream team.
Confirmed clean, then progressively enabled it across all stores.

**R (Result):**
500 errors resolved.
No production disruption at any point during the fix or rollout.
Payload validation now in place as a permanent guardrail.

**Reflection:**
Feature flags decouple deployment risk from feature risk — merge early, roll out when ready.
Staged rollouts (few stores → validate → all stores) are safer than a big-bang cutover on live traffic.
On-call sharpens your instinct for what's internal vs. external failure — read the payload before assuming code is broken.

**Best for questions about:**
- Builder/Operator — Production Ownership
- "Tell me about your production operations experience"
- "How do you deploy a risky or uncertain change to production?"
- "Tell me about a time you fixed a prod issue without causing downtime"
- Bias for Action (moved fast but with a safety net)
- Deliver Results (zero downtime fix)

---

<a name="story-12"></a>
### [Invent & Simplify / Think Big] Audit Event API Consolidation — No Sale Open Drawer

**Source:** Walmart — Store Operations / POS Systems

**S (Situation):**
I was assigned a task: implement a new API for the "No Sale Open Drawer" feature.
This is a POS operation where a cashier opens the cash drawer without processing a transaction.
The requirement was to support both the old and new flow within the same API.
Standard scope — design, build, ship.

**T (Task):**
Deliver a working API for No Sale Open Drawer without breaking existing flows.

**A (Action):**
While designing the new API, I noticed a parallel initiative on my team: the Audit Event consolidation.
That initiative was merging two existing APIs — Code Brown (in-store safety alerts) and Associate Sign On/Off — into a single endpoint, using an `eventType` field to differentiate them.
I recognized that No Sale Open Drawer was also a store audit event.
Instead of shipping a third independent API, I proposed merging all three into the unified Audit Event API, adding No Sale Open Drawer as a new `eventType` value.
I aligned with the team, confirmed the scope change made sense architecturally, and implemented the consolidated solution.
Wrote end-to-end tests covering all three event types.
Deployed to production, but didn't flip it on everywhere at once.
Started with A/B testing on a small set of lab stores.
Let it run for a full sprint, monitored behavior, and generated a validation report.
With the report confirming stability, rolled out to the entire store chain.

**R (Result):**
One unified Audit Event API instead of three separate endpoints.
Reduced API surface area — fewer contracts to maintain, version, and monitor.
Adding future store audit event types now requires only a new `eventType` value, not a new API.
Successful full-chain rollout with no incidents.

**Reflection:**
The best time to consolidate is when a new task and an in-flight initiative overlap — adding a fourth endpoint would have been the path of least resistance but the wrong call.
A/B testing with a sprint-long observation window before full rollout builds confidence without delaying delivery.

**Best for questions about:**
- Invent & Simplify
- Think Big ("saw beyond the immediate task")
- Ownership ("identified a problem outside your scope")
- API design at scale
- "Tell me about a time you proactively improved beyond what was asked"
- Safe, staged production rollout

---

## Stubs — Stories Needed

These LPs have no complete story yet. Add one from your experience.

### [Customer Obsession] — NEEDED
**Prompt:** "When working with large numbers of customers, how do you prioritize their needs?"
**Hint:** Think about how you prioritized order types or edge cases in OMS at scale.

---

### [Ownership] — NEEDED (beyond the Kafka incident)
**Prompt:** "Identified a problem outside your scope — took ownership anyway."
**Hint:** Splunk migration? Tax Modernization cross-team coordination?

---

### [Learn and Be Curious] — NEEDED
**Prompt:** "Taught yourself a new skill or technology to complete a project."
**Hint:** OpenObserve (new tool), or AI tooling (Copilot/Claude) adoption.

---

### [Insist on the Highest Standards] — NEEDED
**Prompt:** "Refused to compromise on quality despite pressure to deliver quickly."
**Hint:** 300+ PR reviews — a time you blocked a merge and defended that call.

---

### [Think Big] — NEEDED
**Prompt:** "Made a bold, challenging decision" or "came up with a vision for your team."
**Hint:** Proposing the Splunk → OpenObserve migration architecture? DriverTip service design?

---

### [Builder/Operator — Production Ownership] — ✅ Story 11
See [→](#story-11). Can also combine with Story 1 (Race Condition) and Story 2 (Kafka RCA) for a composite answer covering the breadth of on-call experience.

---

### [API Design at Enterprise Scale] — NEEDED
**Prompt:** "Tell me about an API you designed that other teams depended on" (Rubrik, Axon)
**Hint:** OMS order creation API — consumed by fulfillment, payments, frontend. Led 300+ PRs enforcing API contracts. Talk about versioning, backward compatibility, SLA contracts.

---

### [Why a specific company / domain?] — Adaptable Prep
**Fintech (Wealthfront):** "I've spent 5 years in high-stakes financial transaction systems — payment auth, order management, fraud prevention. Wealthfront's mission to democratize financial advice aligns with mission-critical backend work I want to own."
**Health Data (Truveta):** "Healthcare data at scale has real human impact — every API you build can surface a clinical insight that changes a patient outcome. That's the kind of work I want my distributed systems experience applied to."
**AI Platform (Evertune):** "AI tools have already changed how I work. I want to build the infrastructure that powers AI products, not just use them."
**Public Safety (Axon):** "Reliable systems in high-stakes environments are where I thrive — my OMS work powered 2M+ daily orders with zero tolerance for data loss."
