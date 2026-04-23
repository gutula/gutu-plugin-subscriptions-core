import { describe, expect, it } from "bun:test";

import {
  buildSubscriptionsCoreSqliteMigrationSql,
  buildSubscriptionsCoreSqliteRollbackSql,
  getSubscriptionsCoreSqliteLookupIndexName,
  getSubscriptionsCoreSqliteStatusIndexName
} from "../../src/sqlite";

describe("subscriptions-core sqlite helpers", () => {
  it("creates the business tables and indexes", () => {
    const sql = buildSubscriptionsCoreSqliteMigrationSql().join("\n");

    expect(sql).toContain("CREATE TABLE IF NOT EXISTS subscriptions_core_primary_records");
    expect(sql).toContain("CREATE TABLE IF NOT EXISTS subscriptions_core_secondary_records");
    expect(sql).toContain("CREATE TABLE IF NOT EXISTS subscriptions_core_exception_records");
    expect(sql).toContain(getSubscriptionsCoreSqliteLookupIndexName("subscriptions_core_"));
    expect(sql).toContain(getSubscriptionsCoreSqliteStatusIndexName("subscriptions_core_"));
  });

  it("rolls the sqlite tables back safely", () => {
    const sql = buildSubscriptionsCoreSqliteRollbackSql({ tablePrefix: "subscriptions_core_preview_" }).join("\n");
    expect(sql).toContain("DROP TABLE IF EXISTS subscriptions_core_preview_exception_records");
  });
});
