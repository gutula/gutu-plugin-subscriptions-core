export const reportDefinitions = [
  {
    "id": "subscriptions-core.report.01",
    "label": "Subscription Renewal Summary",
    "owningPlugin": "subscriptions-core",
    "source": "erpnext-parity",
    "exceptionQueues": [
      "renewal-failure-review",
      "payment-timeout-review",
      "plan-change-proration-review"
    ]
  },
  {
    "id": "subscriptions-core.report.02",
    "label": "MRR Snapshot",
    "owningPlugin": "subscriptions-core",
    "source": "erpnext-parity",
    "exceptionQueues": [
      "renewal-failure-review",
      "payment-timeout-review",
      "plan-change-proration-review"
    ]
  },
  {
    "id": "subscriptions-core.report.03",
    "label": "Failed Renewal Queue",
    "owningPlugin": "subscriptions-core",
    "source": "erpnext-parity",
    "exceptionQueues": [
      "renewal-failure-review",
      "payment-timeout-review",
      "plan-change-proration-review"
    ]
  }
] as const;
