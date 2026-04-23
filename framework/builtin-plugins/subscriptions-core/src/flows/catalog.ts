import {
  advancePrimaryRecord,
  amendPrimaryRecord,
  createPrimaryRecord,
  placePrimaryRecordOnHold,
  reconcilePrimaryRecord,
  releasePrimaryRecordHold,
  reversePrimaryRecord,
  type AdvancePrimaryRecordInput,
  type AmendPrimaryRecordInput,
  type CreatePrimaryRecordInput,
  type PlacePrimaryRecordOnHoldInput,
  type ReconcilePrimaryRecordInput,
  type ReleasePrimaryRecordHoldInput,
  type ReversePrimaryRecordInput
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
  },
  {
    "id": "subscriptions.plans.hold",
    "label": "Place Record On Hold",
    "phase": "hold",
    "methodName": "placeRecordOnHold"
  },
  {
    "id": "subscriptions.plans.release",
    "label": "Release Record Hold",
    "phase": "release",
    "methodName": "releaseRecordHold"
  },
  {
    "id": "subscriptions.plans.amend",
    "label": "Amend Record",
    "phase": "amend",
    "methodName": "amendRecord"
  },
  {
    "id": "subscriptions.plans.reverse",
    "label": "Reverse Record",
    "phase": "reverse",
    "methodName": "reverseRecord"
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

export async function placeRecordOnHold(input: PlacePrimaryRecordOnHoldInput) {
  return placePrimaryRecordOnHold(input);
}

export async function releaseRecordHold(input: ReleasePrimaryRecordHoldInput) {
  return releasePrimaryRecordHold(input);
}

export async function amendRecord(input: AmendPrimaryRecordInput) {
  return amendPrimaryRecord(input);
}

export async function reverseRecord(input: ReversePrimaryRecordInput) {
  return reversePrimaryRecord(input);
}
