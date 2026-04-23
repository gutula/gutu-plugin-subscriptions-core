# Subscriptions Core Developer Guide

Subscription plans, billing cycles, renewals, pauses, and service-period truth for recurring commercial models.

**Maturity Tier:** `Hardened`

## Purpose And Architecture Role

Owns recurring plan, cycle, and renewal truth for subscription businesses instead of burying recurrence inside orders or invoices.

### This plugin is the right fit when

- You need **subscription plans**, **billing cycles**, **renewals** as a governed domain boundary.
- You want to integrate through declared actions, resources, jobs, workflows, and UI surfaces instead of implicit side effects.
- You need the host application to keep plugin boundaries honest through manifest capabilities, permissions, and verification lanes.

### This plugin is intentionally not

- Not a full vertical application suite; this plugin only owns the domain slice exported in this repo.
- Not a replacement for explicit orchestration in jobs/workflows when multi-step automation is required.

## Repo Map

| Path | Purpose |
| --- | --- |
| `package.json` | Root extracted-repo manifest, workspace wiring, and repo-level script entrypoints. |
| `framework/builtin-plugins/subscriptions-core` | Nested publishable plugin package. |
| `framework/builtin-plugins/subscriptions-core/src` | Runtime source, actions, resources, services, and UI exports. |
| `framework/builtin-plugins/subscriptions-core/tests` | Unit, contract, integration, and migration coverage where present. |
| `framework/builtin-plugins/subscriptions-core/docs` | Internal domain-doc source set kept in sync with this guide. |
| `framework/builtin-plugins/subscriptions-core/db/schema.ts` | Database schema contract when durable state is owned. |
| `framework/builtin-plugins/subscriptions-core/src/postgres.ts` | SQL migration and rollback helpers when exported. |

## Manifest Contract

| Field | Value |
| --- | --- |
| Package Name | `@plugins/subscriptions-core` |
| Manifest ID | `subscriptions-core` |
| Display Name | Subscriptions Core |
| Domain Group | Operational Data |
| Default Category | Business / Sales & Commerce |
| Version | `0.1.0` |
| Kind | `plugin` |
| Trust Tier | `first-party` |
| Review Tier | `R1` |
| Isolation Profile | `same-process-trusted` |
| Framework Compatibility | ^0.1.0 |
| Runtime Compatibility | bun>=1.3.12 |
| Database Compatibility | postgres, sqlite |

## Dependency Graph And Capability Requests

| Field | Value |
| --- | --- |
| Depends On | `auth-core`, `org-tenant-core`, `role-policy-core`, `audit-core`, `workflow-core`, `party-relationships-core`, `pricing-tax-core`, `contracts-core`, `accounting-core`, `traceability-core` |
| Requested Capabilities | `ui.register.admin`, `api.rest.mount`, `data.write.subscriptions`, `events.publish.subscriptions` |
| Provides Capabilities | `subscriptions.plans`, `subscriptions.cycles`, `subscriptions.renewals` |
| Owns Data | `subscriptions.plans`, `subscriptions.cycles`, `subscriptions.renewals`, `subscriptions.exceptions` |

### Dependency interpretation

- Direct plugin dependencies describe package-level coupling that must already be present in the host graph.
- Requested capabilities tell the host what platform services or sibling plugins this package expects to find.
- Provided capabilities and owned data tell integrators what this package is authoritative for.

## Public Integration Surfaces

| Type | ID / Symbol | Access / Mode | Notes |
| --- | --- | --- | --- |
| Action | `subscriptions.plans.publish` | Permission: `subscriptions.plans.write` | Publish Subscription Plan<br>Idempotent<br>Audited |
| Action | `subscriptions.cycles.generate` | Permission: `subscriptions.cycles.write` | Generate Billing Cycle<br>Non-idempotent<br>Audited |
| Action | `subscriptions.renewals.process` | Permission: `subscriptions.renewals.write` | Process Renewal<br>Non-idempotent<br>Audited |
| Action | `subscriptions.plans.hold` | Permission: `subscriptions.plans.write` | Place Record On Hold<br>Non-idempotent<br>Audited |
| Action | `subscriptions.plans.release` | Permission: `subscriptions.plans.write` | Release Record Hold<br>Non-idempotent<br>Audited |
| Action | `subscriptions.plans.amend` | Permission: `subscriptions.plans.write` | Amend Record<br>Non-idempotent<br>Audited |
| Action | `subscriptions.plans.reverse` | Permission: `subscriptions.plans.write` | Reverse Record<br>Non-idempotent<br>Audited |
| Resource | `subscriptions.plans` | Portal disabled | Subscription plan definitions and effective-date policy records.<br>Purpose: Own recurring commercial plan truth outside of order-only flows.<br>Admin auto-CRUD enabled<br>Fields: `title`, `recordState`, `approvalState`, `postingState`, `fulfillmentState`, `updatedAt` |
| Resource | `subscriptions.cycles` | Portal disabled | Generated billing or service cycles for active subscriptions.<br>Purpose: Expose recurring commercial obligations explicitly before downstream billing.<br>Admin auto-CRUD enabled<br>Fields: `label`, `status`, `requestedAction`, `updatedAt` |
| Resource | `subscriptions.renewals` | Portal disabled | Renewal, pause, resume, and expiry handling records.<br>Purpose: Keep renewal state visible and repairable instead of implicit.<br>Admin auto-CRUD enabled<br>Fields: `severity`, `status`, `reasonCode`, `updatedAt` |

### Job Catalog

| Job | Queue | Retry | Timeout |
| --- | --- | --- | --- |
| `subscriptions.projections.refresh` | `subscriptions-projections` | Retry policy not declared | No timeout declared |
| `subscriptions.reconciliation.run` | `subscriptions-reconciliation` | Retry policy not declared | No timeout declared |


### Workflow Catalog

| Workflow | Actors | States | Purpose |
| --- | --- | --- | --- |
| `subscriptions-lifecycle` | `revenue-ops`, `approver`, `controller` | `draft`, `pending_approval`, `active`, `reconciled`, `closed`, `canceled` | Keep recurring commercial operations explicit through renewals, pauses, and billing handoff. |


### UI Surface Summary

| Surface | Present | Notes |
| --- | --- | --- |
| UI Surface | Yes | A bounded UI surface export is present. |
| Admin Contributions | Yes | Additional admin workspace contributions are exported. |
| Zone/Canvas Extension | No | No dedicated zone extension export. |

## Hooks, Events, And Orchestration

This plugin should be integrated through **explicit commands/actions, resources, jobs, workflows, and the surrounding Gutu event runtime**. It must **not** be documented as a generic WordPress-style hook system unless such a hook API is explicitly exported.

- No standalone plugin-owned lifecycle event feed is exported today.
- Job surface: `subscriptions.projections.refresh`, `subscriptions.reconciliation.run`.
- Workflow surface: `subscriptions-lifecycle`.
- Recommended composition pattern: invoke actions, read resources, then let the surrounding Gutu command/event/job runtime handle downstream automation.

## Storage, Schema, And Migration Notes

- Database compatibility: `postgres`, `sqlite`
- Schema file: `framework/builtin-plugins/subscriptions-core/db/schema.ts`
- SQL helper file: `framework/builtin-plugins/subscriptions-core/src/postgres.ts`
- Migration lane present: Yes

The plugin ships explicit SQL helper exports. Use those helpers as the truth source for database migration or rollback expectations.

## Failure Modes And Recovery

- Action inputs can fail schema validation or permission evaluation before any durable mutation happens.
- If downstream automation is needed, the host must add it explicitly instead of assuming this plugin emits jobs.
- There is no separate lifecycle-event feed to rely on today; do not build one implicitly from internal details.
- Schema regressions are expected to show up in the migration lane and should block shipment.

## Mermaid Flows

### Primary Lifecycle

```mermaid
flowchart LR
  caller["Host or operator"] --> action["subscriptions.plans.publish"]
  action --> validation["Schema + permission guard"]
  validation --> service["Subscriptions Core service layer"]
  service --> state["subscriptions.plans"]
  service --> jobs["Follow-up jobs / queue definitions"]
  service --> workflows["Workflow state transitions"]
  state --> ui["Admin contributions"]
```

### Workflow State Machine

```mermaid
stateDiagram-v2
  [*] --> draft
  draft --> pending_approval
  draft --> active
  draft --> reconciled
  draft --> closed
  draft --> canceled
```


## Integration Recipes

### 1. Host wiring

```ts
import { manifest, publishSubscriptionPlanAction, BusinessPrimaryResource, jobDefinitions, workflowDefinitions, adminContributions, uiSurface } from "@plugins/subscriptions-core";

export const pluginSurface = {
  manifest,
  publishSubscriptionPlanAction,
  BusinessPrimaryResource,
  jobDefinitions,
  workflowDefinitions,
  adminContributions,
  uiSurface
};
```

Use this pattern when your host needs to register the plugin’s declared exports without reaching into internal file paths.

### 2. Action-first orchestration

```ts
import { manifest, publishSubscriptionPlanAction } from "@plugins/subscriptions-core";

console.log("plugin", manifest.id);
console.log("action", publishSubscriptionPlanAction.id);
```

- Prefer action IDs as the stable integration boundary.
- Respect the declared permission, idempotency, and audit metadata instead of bypassing the service layer.
- Treat resource IDs as the read-model boundary for downstream consumers.

### 3. Cross-plugin composition

- Register the workflow definitions with the host runtime instead of re-encoding state transitions outside the plugin.
- Drive follow-up automation from explicit workflow transitions and resource reads.
- Pair workflow decisions with notifications or jobs in the outer orchestration layer when humans must be kept in the loop.

## Test Matrix

| Lane | Present | Evidence |
| --- | --- | --- |
| Build | Yes | `bun run build` |
| Typecheck | Yes | `bun run typecheck` |
| Lint | Yes | `bun run lint` |
| Test | Yes | `bun run test` |
| Unit | Yes | 1 file(s) |
| Contracts | Yes | 1 file(s) |
| Integration | Yes | 1 file(s) |
| Migrations | Yes | 2 file(s) |

### Verification commands

- `bun run build`
- `bun run typecheck`
- `bun run lint`
- `bun run test`
- `bun run test:contracts`
- `bun run test:unit`
- `bun run test:integration`
- `bun run test:migrations`
- `bun run docs:check`

## Current Truth And Recommended Next

### Current truth

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

### Current gaps

- No extra gaps were discovered beyond the plugin’s declared boundaries.

### Recommended next

- Deepen pause, resume, arrears, and dunning-oriented lifecycle coverage as recurring revenue use cases expand.
- Clarify renewal and proration handoff rules before financial automation depends on the subscription cycle contract.
- Broaden lifecycle coverage with deeper orchestration, reconciliation, and operator tooling where the business flow requires it.
- Add more explicit domain events or follow-up job surfaces when downstream systems need tighter coupling.
- Convert more ERP parity references into first-class runtime handlers where needed, starting from `Subscription Settings`, `Payment Request`, `Sales Invoice`.

### Later / optional

- Outbound connectors, richer analytics, or portal-facing experiences once the core domain contracts harden.
