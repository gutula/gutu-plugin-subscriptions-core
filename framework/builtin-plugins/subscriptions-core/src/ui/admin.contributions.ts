import {
  defineAdminNav,
  defineCommand,
  definePage,
  defineWorkspace,
  type AdminContributionRegistry
} from "@platform/admin-contracts";

import { BusinessAdminPage } from "./admin/main.page";

export const adminContributions: Pick<AdminContributionRegistry, "workspaces" | "nav" | "pages" | "commands"> = {
  workspaces: [
    defineWorkspace({
      id: "subscriptions",
      label: "Subscriptions",
      icon: "repeat",
      description: "Recurring commercial plans, cycles, and renewal operations.",
      permission: "subscriptions.plans.read",
      homePath: "/admin/business/subscriptions",
      quickActions: ["subscriptions-core.open.control-room"]
    })
  ],
  nav: [
    defineAdminNav({
      workspace: "subscriptions",
      group: "control-room",
      items: [
        {
          id: "subscriptions-core.overview",
          label: "Control Room",
          icon: "repeat",
          to: "/admin/business/subscriptions",
          permission: "subscriptions.plans.read"
        }
      ]
    })
  ],
  pages: [
    definePage({
      id: "subscriptions-core.page",
      kind: "dashboard",
      route: "/admin/business/subscriptions",
      label: "Subscriptions Control Room",
      workspace: "subscriptions",
      group: "control-room",
      permission: "subscriptions.plans.read",
      component: BusinessAdminPage
    })
  ],
  commands: [
    defineCommand({
      id: "subscriptions-core.open.control-room",
      label: "Open Subscriptions Core",
      permission: "subscriptions.plans.read",
      href: "/admin/business/subscriptions",
      keywords: ["subscriptions core","subscriptions","business"]
    })
  ]
};
