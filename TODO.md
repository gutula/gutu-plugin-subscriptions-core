# Subscriptions Core TODO

**Maturity Tier:** `Hardened`

## Shipped Now

- Exports 3 governed actions: `subscriptions.plans.publish`, `subscriptions.cycles.generate`, `subscriptions.renewals.process`.
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

## Current Gaps

- Repo-local documentation verification entrypoints were missing before this pass and need to stay green as the repo evolves.

## Recommended Next

- Deepen pause, resume, arrears, and dunning-oriented lifecycle coverage as recurring revenue use cases expand.
- Clarify renewal and proration handoff rules before financial automation depends on the subscription cycle contract.
- Broaden lifecycle coverage with deeper orchestration, reconciliation, and operator tooling where the business flow requires it.
- Add more explicit domain events or follow-up job surfaces when downstream systems need tighter coupling.
- Convert more ERP parity references into first-class runtime handlers where needed, starting from `Subscription Settings`, `Payment Request`, `Sales Invoice`.

## Later / Optional

- Outbound connectors, richer analytics, or portal-facing experiences once the core domain contracts harden.
