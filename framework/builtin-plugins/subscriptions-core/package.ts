import { definePackage } from "@platform/kernel";

export default definePackage({
  "id": "subscriptions-core",
  "kind": "plugin",
  "version": "0.1.0",
  "contractVersion": "1.0.0",
  "sourceRepo": "gutu-plugin-subscriptions-core",
  "displayName": "Subscriptions Core",
  "domainGroup": "Operational Data",
  "defaultCategory": {
    "id": "business",
    "label": "Business",
    "subcategoryId": "sales_commerce",
    "subcategoryLabel": "Sales & Commerce"
  },
  "description": "Subscription plans, billing cycles, renewals, pauses, and service-period truth for recurring commercial models.",
  "extends": [],
  "dependsOn": [
    "auth-core",
    "org-tenant-core",
    "role-policy-core",
    "audit-core",
    "workflow-core",
    "party-relationships-core",
    "pricing-tax-core",
    "contracts-core",
    "accounting-core",
    "traceability-core"
  ],
  "dependencyContracts": [
    {
      "packageId": "auth-core",
      "class": "required",
      "rationale": "Required for Subscriptions Core to keep its boundary governed and explicit."
    },
    {
      "packageId": "org-tenant-core",
      "class": "required",
      "rationale": "Required for Subscriptions Core to keep its boundary governed and explicit."
    },
    {
      "packageId": "role-policy-core",
      "class": "required",
      "rationale": "Required for Subscriptions Core to keep its boundary governed and explicit."
    },
    {
      "packageId": "audit-core",
      "class": "required",
      "rationale": "Required for Subscriptions Core to keep its boundary governed and explicit."
    },
    {
      "packageId": "workflow-core",
      "class": "required",
      "rationale": "Required for Subscriptions Core to keep its boundary governed and explicit."
    },
    {
      "packageId": "party-relationships-core",
      "class": "required",
      "rationale": "Required for Subscriptions Core to keep its boundary governed and explicit."
    },
    {
      "packageId": "pricing-tax-core",
      "class": "required",
      "rationale": "Required for Subscriptions Core to keep its boundary governed and explicit."
    },
    {
      "packageId": "contracts-core",
      "class": "required",
      "rationale": "Required for Subscriptions Core to keep its boundary governed and explicit."
    },
    {
      "packageId": "accounting-core",
      "class": "required",
      "rationale": "Required for Subscriptions Core to keep its boundary governed and explicit."
    },
    {
      "packageId": "traceability-core",
      "class": "required",
      "rationale": "Required for Subscriptions Core to keep its boundary governed and explicit."
    },
    {
      "packageId": "sales-core",
      "class": "optional",
      "rationale": "Recommended with Subscriptions Core for smoother production adoption and operator experience."
    },
    {
      "packageId": "business-portals-core",
      "class": "capability-enhancing",
      "rationale": "Improves Subscriptions Core with deeper downstream automation, visibility, or workflow coverage."
    },
    {
      "packageId": "support-service-core",
      "class": "capability-enhancing",
      "rationale": "Improves Subscriptions Core with deeper downstream automation, visibility, or workflow coverage."
    },
    {
      "packageId": "ai-assist-core",
      "class": "capability-enhancing",
      "rationale": "Improves Subscriptions Core with deeper downstream automation, visibility, or workflow coverage."
    },
    {
      "packageId": "analytics-bi-core",
      "class": "integration-only",
      "rationale": "Only needed when Subscriptions Core must exchange data or actions with adjacent or external surfaces."
    }
  ],
  "recommendedPlugins": [
    "sales-core"
  ],
  "capabilityEnhancingPlugins": [
    "business-portals-core",
    "support-service-core",
    "ai-assist-core"
  ],
  "integrationOnlyPlugins": [
    "analytics-bi-core"
  ],
  "suggestedPacks": [
    "sector-ecommerce"
  ],
  "standaloneSupported": false,
  "installNotes": [
    "Recurring commercial models should install Contracts and Accounting alongside this plugin for real-world use."
  ],
  "optionalWith": [
    "sales-core"
  ],
  "conflictsWith": [],
  "providesCapabilities": [
    "subscriptions.plans",
    "subscriptions.cycles",
    "subscriptions.renewals"
  ],
  "requestedCapabilities": [
    "ui.register.admin",
    "api.rest.mount",
    "data.write.subscriptions",
    "events.publish.subscriptions"
  ],
  "ownsData": [
    "subscriptions.plans",
    "subscriptions.cycles",
    "subscriptions.renewals",
    "subscriptions.exceptions"
  ],
  "extendsData": [],
  "publicCommands": [
    "subscriptions.plans.publish",
    "subscriptions.cycles.generate",
    "subscriptions.renewals.process",
    "subscriptions.plans.hold",
    "subscriptions.plans.release",
    "subscriptions.plans.amend",
    "subscriptions.plans.reverse"
  ],
  "publicQueries": [
    "subscriptions.plan-summary",
    "subscriptions.renewal-summary"
  ],
  "publicEvents": [
    "subscriptions.plan-published.v1",
    "subscriptions.cycle-generated.v1",
    "subscriptions.renewal-processed.v1"
  ],
  "domainCatalog": {
    "erpnextModules": [
      "Accounts"
    ],
    "erpnextDoctypes": [
      "Subscription Settings",
      "Payment Request",
      "Sales Invoice",
      "Purchase Invoice"
    ],
    "ownedEntities": [
      "Subscription Plan",
      "Billing Cycle",
      "Renewal Run",
      "Subscription Exception",
      "Usage Accrual"
    ],
    "reports": [
      "Subscription Renewal Summary",
      "MRR Snapshot",
      "Failed Renewal Queue"
    ],
    "exceptionQueues": [
      "renewal-failure-review",
      "payment-timeout-review",
      "plan-change-proration-review"
    ],
    "operationalScenarios": [
      "plan-publication",
      "renewal-cycle-generation",
      "proration-and-retry"
    ],
    "settingsSurfaces": [
      "Subscription Settings",
      "Payment Terms Template"
    ],
    "edgeCases": [
      "failed auto-renewal",
      "mid-cycle plan change",
      "duplicate renewal replay"
    ]
  },
  "slotClaims": [],
  "trustTier": "first-party",
  "reviewTier": "R1",
  "isolationProfile": "same-process-trusted",
  "compatibility": {
    "framework": "^0.1.0",
    "runtime": "bun>=1.3.12",
    "db": [
      "postgres",
      "sqlite"
    ]
  }
});
