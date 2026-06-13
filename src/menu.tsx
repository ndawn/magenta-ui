import type { FC } from "react"

import {
  LayoutDashboardIcon,
  SettingsIcon,
  type LucideProps,
} from "lucide-react"

export type MenuItem = {
  to: string
  icon: FC<LucideProps>
  title: string
}

export const desktop: MenuItem[] = [
  {
    to: "/",
    title: "Dashboard",
    icon: LayoutDashboardIcon,
  },
]

export const mobile: MenuItem[] = [
  {
    to: "/",
    title: "Dashboard",
    icon: LayoutDashboardIcon,
  },
  {
    to: "/settings",
    title: "Settings",
    icon: SettingsIcon,
  },
]
