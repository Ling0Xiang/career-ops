# Story Bank — Master STAR+R Stories

Maintain 5–10 deep stories. Bend them to fit almost any behavioral question.

**Big Three:**
- "Tell me about yourself" → combine Intro + 2 stories
- "Most impactful project" → Story 7 (Fulfillment Flow) or Story 1 (Race Condition)
- "Conflict you resolved" → Story 6 (Disagree & Commit)
- "Biggest weakness / drawback" → Story 8 (Detail Misses Under Pressure)

---

## Quick Answers (Non-STAR)

### Intro — "Tell me about yourself"

My name is Ling Xiang. I'm a Software Engineer with 5 years at Walmart Global Tech.
I've owned payment authorization and order management systems — both in-store and online.
My work spans scalable microservices, Java backend development, Kafka event pipelines, and Kubernetes.
I use AI tools daily to move faster.
I'm careful and methodical, but I know when to reach out.
I respect people's time while still learning from the team.

---

### Why Leave Walmart?

I've grown a lot there.
But I've hit a ceiling.
The work has become maintenance-oriented.
I want to move faster, own more, and build things closer to the product.

---

## Stories

---

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
