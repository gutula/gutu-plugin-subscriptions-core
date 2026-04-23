# Subscriptions Core Flows

## Happy paths

- `subscriptions.plans.publish`: Publish Subscription Plan
- `subscriptions.cycles.generate`: Generate Billing Cycle
- `subscriptions.renewals.process`: Process Renewal

## Operational scenario matrix

- `plan-publication`
- `renewal-cycle-generation`
- `proration-and-retry`

## Action-level flows

### `subscriptions.plans.publish`

Publish Subscription Plan

Permission: `subscriptions.plans.write`

Business purpose: Expose the plugin’s write boundary through a validated, auditable action contract.

Preconditions:

- Caller input must satisfy the action schema exported by the plugin.
- The caller must satisfy the declared permission and any host-level installation constraints.
- Integration should honor the action’s idempotent semantics.

Side effects:

- Mutates or validates state owned by `subscriptions.plans`, `subscriptions.cycles`, `subscriptions.renewals`.
- May schedule or describe follow-up background work.

Forbidden shortcuts:

- Do not bypass the action contract with undocumented service mutations in application code.
- Do not document extra hooks, retries, or lifecycle semantics unless they are explicitly exported here.


### `subscriptions.cycles.generate`

Generate Billing Cycle

Permission: `subscriptions.cycles.write`

Business purpose: Expose the plugin’s write boundary through a validated, auditable action contract.

Preconditions:

- Caller input must satisfy the action schema exported by the plugin.
- The caller must satisfy the declared permission and any host-level installation constraints.
- Integration should honor the action’s non-idempotent semantics.

Side effects:

- Mutates or validates state owned by `subscriptions.plans`, `subscriptions.cycles`, `subscriptions.renewals`.
- May schedule or describe follow-up background work.

Forbidden shortcuts:

- Do not bypass the action contract with undocumented service mutations in application code.
- Do not document extra hooks, retries, or lifecycle semantics unless they are explicitly exported here.


### `subscriptions.renewals.process`

Process Renewal

Permission: `subscriptions.renewals.write`

Business purpose: Expose the plugin’s write boundary through a validated, auditable action contract.

Preconditions:

- Caller input must satisfy the action schema exported by the plugin.
- The caller must satisfy the declared permission and any host-level installation constraints.
- Integration should honor the action’s non-idempotent semantics.

Side effects:

- Mutates or validates state owned by `subscriptions.plans`, `subscriptions.cycles`, `subscriptions.renewals`.
- May schedule or describe follow-up background work.

Forbidden shortcuts:

- Do not bypass the action contract with undocumented service mutations in application code.
- Do not document extra hooks, retries, or lifecycle semantics unless they are explicitly exported here.


## Cross-package interactions

- Direct dependencies: `auth-core`, `org-tenant-core`, `role-policy-core`, `audit-core`, `workflow-core`, `party-relationships-core`, `pricing-tax-core`, `contracts-core`, `accounting-core`, `traceability-core`
- Requested capabilities: `ui.register.admin`, `api.rest.mount`, `data.write.subscriptions`, `events.publish.subscriptions`
- Integration model: Actions+Resources+Jobs+Workflows+UI
- ERPNext doctypes used as parity references: `Subscription Settings`, `Payment Request`, `Sales Invoice`, `Purchase Invoice`
- Recovery ownership should stay with the host orchestration layer when the plugin does not explicitly export jobs, workflows, or lifecycle events.
