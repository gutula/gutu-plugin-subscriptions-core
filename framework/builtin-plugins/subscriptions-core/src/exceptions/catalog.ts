export const exceptionQueueDefinitions = [
  {
    "id": "renewal-failure-review",
    "label": "Renewal Failure Review",
    "severity": "medium",
    "owner": "revenue-ops",
    "reconciliationJobId": "subscriptions.reconciliation.run"
  },
  {
    "id": "payment-timeout-review",
    "label": "Payment Timeout Review",
    "severity": "medium",
    "owner": "revenue-ops",
    "reconciliationJobId": "subscriptions.reconciliation.run"
  },
  {
    "id": "plan-change-proration-review",
    "label": "Plan Change Proration Review",
    "severity": "medium",
    "owner": "revenue-ops",
    "reconciliationJobId": "subscriptions.reconciliation.run"
  }
] as const;
