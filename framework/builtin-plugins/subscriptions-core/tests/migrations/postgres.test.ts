import { describe, expect, it } from "bun:test";

import {
  buildSubscriptionsCoreMigrationSql,
  buildSubscriptionsCoreRollbackSql,
  getSubscriptionsCoreLookupIndexName,
  getSubscriptionsCoreStatusIndexName
} from "../../src/postgres";

describe("subscriptions-core postgres helpers", () => {
  it("creates the business tables and indexes", () => {
    const sql = buildSubscriptionsCoreMigrationSql().join("\n");

    expect(sql).toContain("CREATE TABLE IF NOT EXISTS subscriptions_core.primary_records");
    expect(sql).toContain("CREATE TABLE IF NOT EXISTS subscriptions_core.secondary_records");
    expect(sql).toContain("CREATE TABLE IF NOT EXISTS subscriptions_core.exception_records");
    expect(sql).toContain(getSubscriptionsCoreLookupIndexName());
    expect(sql).toContain(getSubscriptionsCoreStatusIndexName());
  });

  it("rolls the schema back safely", () => {
    const sql = buildSubscriptionsCoreRollbackSql({ schemaName: "subscriptions_core_preview", dropSchema: true }).join("\n");
    expect(sql).toContain("DROP TABLE IF EXISTS subscriptions_core_preview.exception_records");
    expect(sql).toContain("DROP SCHEMA IF EXISTS subscriptions_core_preview CASCADE");
  });
});
