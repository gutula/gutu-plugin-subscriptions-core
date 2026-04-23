export const domainCatalog = {
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
} as const;
