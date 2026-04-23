import {
  advancePrimaryRecord,
  createPrimaryRecord,
  reconcilePrimaryRecord,
  type AdvancePrimaryRecordInput,
  type CreatePrimaryRecordInput,
  type ReconcilePrimaryRecordInput
} from "../services/main.service";

export const businessFlowDefinitions = [
  {
    "id": "subscriptions.plans.publish",
    "label": "Publish Subscription Plan",
    "phase": "create",
    "methodName": "publishSubscriptionPlan"
  },
  {
    "id": "subscriptions.cycles.generate",
    "label": "Generate Billing Cycle",
    "phase": "advance",
    "methodName": "generateBillingCycle"
  },
  {
    "id": "subscriptions.renewals.process",
    "label": "Process Renewal",
    "phase": "reconcile",
    "methodName": "processRenewal"
  }
] as const;

export async function publishSubscriptionPlan(input: CreatePrimaryRecordInput) {
  return createPrimaryRecord(input);
}

export async function generateBillingCycle(input: AdvancePrimaryRecordInput) {
  return advancePrimaryRecord(input);
}

export async function processRenewal(input: ReconcilePrimaryRecordInput) {
  return reconcilePrimaryRecord(input);
}
