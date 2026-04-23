export const scenarioDefinitions = [
  {
    "id": "plan-publication",
    "owningPlugin": "subscriptions-core",
    "workflowId": "subscriptions-lifecycle",
    "actionIds": [
      "subscriptions.plans.publish",
      "subscriptions.cycles.generate",
      "subscriptions.renewals.process"
    ],
    "downstreamTargets": {
      "create": [],
      "advance": [
        "traceability.links.record"
      ],
      "reconcile": [
        "accounting.billing.post",
        "traceability.reconciliation.queue"
      ]
    }
  },
  {
    "id": "renewal-cycle-generation",
    "owningPlugin": "subscriptions-core",
    "workflowId": "subscriptions-lifecycle",
    "actionIds": [
      "subscriptions.plans.publish",
      "subscriptions.cycles.generate",
      "subscriptions.renewals.process"
    ],
    "downstreamTargets": {
      "create": [],
      "advance": [
        "traceability.links.record"
      ],
      "reconcile": [
        "accounting.billing.post",
        "traceability.reconciliation.queue"
      ]
    }
  },
  {
    "id": "proration-and-retry",
    "owningPlugin": "subscriptions-core",
    "workflowId": "subscriptions-lifecycle",
    "actionIds": [
      "subscriptions.plans.publish",
      "subscriptions.cycles.generate",
      "subscriptions.renewals.process"
    ],
    "downstreamTargets": {
      "create": [],
      "advance": [
        "traceability.links.record"
      ],
      "reconcile": [
        "accounting.billing.post",
        "traceability.reconciliation.queue"
      ]
    }
  }
] as const;
