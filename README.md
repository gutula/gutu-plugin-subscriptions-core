# Subscriptions Core

<p align="center">
  <img src="./docs/assets/gutu-mascot.png" alt="Gutu mascot" width="220" />
</p>

Subscription plans, billing cycles, renewals, pauses, and service-period truth for recurring commercial models.

![Maturity: Hardened](https://img.shields.io/badge/Maturity-Hardened-2563eb) ![Verification: Build+Typecheck+Lint+Test+Contracts+Migrations+Integration](https://img.shields.io/badge/Verification-Build%2BTypecheck%2BLint%2BTest%2BContracts%2BMigrations%2BIntegration-2563eb) ![DB: postgres+sqlite](https://img.shields.io/badge/DB-postgres%2Bsqlite-2563eb) ![Integration Model: Actions+Resources+Jobs+Workflows+UI](https://img.shields.io/badge/Integration%20Model-Actions%2BResources%2BJobs%2BWorkflows%2BUI-2563eb)

## Part Of The Gutu Stack

| Aspect | Value |
| --- | --- |
| Repo kind | First-party plugin |
| Domain group | Operational Data |
| Default category | Business / Sales & Commerce |
| Primary focus | subscription plans, billing cycles, renewals |
| Best when | You need a governed domain boundary with explicit contracts and independent release cadence. |
| Composes through | Actions+Resources+Jobs+Workflows+UI |

- Gutu keeps plugins as independent repos with manifest-governed boundaries, compatibility channels, and verification lanes instead of hiding everything behind one giant mutable codebase.
- This plugin is meant to compose through explicit actions, resources, jobs, workflows, and runtime envelopes, not through undocumented hook chains.

## What It Does Now

Owns recurring plan, cycle, and renewal truth for subscription businesses instead of burying recurrence inside orders or invoices.

- Exports 7 governed actions: `subscriptions.plans.publish`, `subscriptions.cycles.generate`, `subscriptions.renewals.process`, `subscriptions.plans.hold`, `subscriptions.plans.release`, `subscriptions.plans.amend`, `subscriptions.plans.reverse`.
- Owns 3 resource contracts: `subscriptions.plans`, `subscriptions.cycles`, `subscriptions.renewals`.
- Publishes 2 job definitions with explicit queue and retry policy metadata.
- Publishes 1 workflow definition with state-machine descriptions and mandatory steps.
- Adds richer admin workspace contributions on top of the base UI surface.
- Ships explicit SQL migration or rollback helpers alongside the domain model.
- Documents 5 owned entity surface(s): `Subscription Plan`, `Billing Cycle`, `Renewal Run`, `Subscription Exception`, `Usage Accrual`.
- Carries 3 report surface(s) and 3 exception queue(s) for operator parity and reconciliation visibility.
- Tracks ERPNext reference parity against module(s): `Accounts`.
- Operational scenario matrix includes `plan-publication`, `renewal-cycle-generation`, `proration-and-retry`.
- Governs 2 settings or policy surface(s) for operator control and rollout safety.

## Maturity

**Maturity Tier:** `Hardened`

This tier is justified because unit coverage exists, contract coverage exists, integration coverage exists, migration coverage exists, job definitions are exported, and workflow definitions are exported.

## Verified Capability Summary

- Domain group: **Operational Data**
- Default category: **Business / Sales & Commerce**
- Verification surface: **Build+Typecheck+Lint+Test+Contracts+Migrations+Integration**
- Tests discovered: **5** total files across unit, contract, integration, migration lanes
- Integration model: **Actions+Resources+Jobs+Workflows+UI**
- Database support: **postgres + sqlite**

## Dependency And Compatibility Summary

| Field | Value |
| --- | --- |
| Package | `@plugins/subscriptions-core` |
| Manifest ID | `subscriptions-core` |
| Repo | [gutu-plugin-subscriptions-core](https://github.com/gutula/gutu-plugin-subscriptions-core) |
| Depends On | `auth-core`, `org-tenant-core`, `role-policy-core`, `audit-core`, `workflow-core`, `party-relationships-core`, `pricing-tax-core`, `contracts-core`, `accounting-core`, `traceability-core` |
| Requested Capabilities | `ui.register.admin`, `api.rest.mount`, `data.write.subscriptions`, `events.publish.subscriptions` |
| Provided Capabilities | `subscriptions.plans`, `subscriptions.cycles`, `subscriptions.renewals` |
| Runtime | bun>=1.3.12 |
| Database | postgres, sqlite |
| Integration Model | Actions+Resources+Jobs+Workflows+UI |

## Capability Matrix

| Surface | Count | Details |
| --- | --- | --- |
| Actions | 7 | `subscriptions.plans.publish`, `subscriptions.cycles.generate`, `subscriptions.renewals.process`, `subscriptions.plans.hold`, `subscriptions.plans.release`, `subscriptions.plans.amend`, `subscriptions.plans.reverse` |
| Resources | 3 | `subscriptions.plans`, `subscriptions.cycles`, `subscriptions.renewals` |
| Jobs | 2 | `subscriptions.projections.refresh`, `subscriptions.reconciliation.run` |
| Workflows | 1 | `subscriptions-lifecycle` |
| UI | Present | base UI surface, admin contributions |
| Owned Entities | 5 | `Subscription Plan`, `Billing Cycle`, `Renewal Run`, `Subscription Exception`, `Usage Accrual` |
| Reports | 3 | `Subscription Renewal Summary`, `MRR Snapshot`, `Failed Renewal Queue` |
| Exception Queues | 3 | `renewal-failure-review`, `payment-timeout-review`, `plan-change-proration-review` |
| Operational Scenarios | 3 | `plan-publication`, `renewal-cycle-generation`, `proration-and-retry` |
| Settings Surfaces | 2 | `Subscription Settings`, `Payment Terms Template` |
| ERPNext Refs | 1 | `Accounts` |

## Quick Start For Integrators

Use this repo inside a **compatible Gutu workspace** or the **ecosystem certification workspace** so its `workspace:*` dependencies resolve honestly.

```bash
# from a compatible workspace that already includes this plugin's dependency graph
bun install
bun run build
bun run test
bun run docs:check
```

```ts
import { manifest, publishSubscriptionPlanAction, BusinessPrimaryResource, jobDefinitions, workflowDefinitions, adminContributions, uiSurface } from "@plugins/subscriptions-core";

console.log(manifest.id);
console.log(publishSubscriptionPlanAction.id);
console.log(BusinessPrimaryResource.id);
```

Use the root repo scripts for day-to-day work **after the workspace is bootstrapped**, or run the nested package directly from `framework/builtin-plugins/subscriptions-core` if you need lower-level control.

## Current Test Coverage

- Root verification scripts: `bun run build`, `bun run typecheck`, `bun run lint`, `bun run test`, `bun run test:contracts`, `bun run test:unit`, `bun run test:integration`, `bun run test:migrations`, `bun run docs:check`
- Unit files: 1
- Contracts files: 1
- Integration files: 1
- Migrations files: 2

## Known Boundaries And Non-Goals

- Not a full vertical application suite; this plugin only owns the domain slice exported in this repo.
- Not a replacement for explicit orchestration in jobs/workflows when multi-step automation is required.
- Cross-plugin composition should use Gutu command, event, job, and workflow primitives. This repo should not be documented as exposing a generic WordPress-style hook system unless one is explicitly exported.

## Recommended Next Milestones

- Deepen pause, resume, arrears, and dunning-oriented lifecycle coverage as recurring revenue use cases expand.
- Clarify renewal and proration handoff rules before financial automation depends on the subscription cycle contract.
- Broaden lifecycle coverage with deeper orchestration, reconciliation, and operator tooling where the business flow requires it.
- Add more explicit domain events or follow-up job surfaces when downstream systems need tighter coupling.
- Convert more ERP parity references into first-class runtime handlers where needed, starting from `Subscription Settings`, `Payment Request`, `Sales Invoice`.

## More Docs

See [DEVELOPER.md](./DEVELOPER.md), [TODO.md](./TODO.md), [SECURITY.md](./SECURITY.md), [CONTRIBUTING.md](./CONTRIBUTING.md). The internal domain sources used to build those docs live under:

- `plugins/gutu-plugin-subscriptions-core/framework/builtin-plugins/subscriptions-core/docs/AGENT_CONTEXT.md`
- `plugins/gutu-plugin-subscriptions-core/framework/builtin-plugins/subscriptions-core/docs/BUSINESS_RULES.md`
- `plugins/gutu-plugin-subscriptions-core/framework/builtin-plugins/subscriptions-core/docs/EDGE_CASES.md`
- `plugins/gutu-plugin-subscriptions-core/framework/builtin-plugins/subscriptions-core/docs/FLOWS.md`
- `plugins/gutu-plugin-subscriptions-core/framework/builtin-plugins/subscriptions-core/docs/GLOSSARY.md`
- `plugins/gutu-plugin-subscriptions-core/framework/builtin-plugins/subscriptions-core/docs/MANDATORY_STEPS.md`
