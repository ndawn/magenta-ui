import type { Dayjs } from "dayjs"

import type { QueryClient } from "@tanstack/react-query"

import type { AuthHook } from "./hooks.d"
import type { AppState } from "./store.d"

export interface RouterContext {
  auth: AuthHook
  queryClient: QueryClient
}

export type ButtonSelectOption = {
  label: string
  value: string
}

export type ButtonSelectBaseProps<T = string | undefined> = Omit<
  ButtonProps,
  "onClick"
> & {
  label: string
  options: ButtonSelectOption[]
  withIndicator?: boolean
  allowDeselect?: boolean
  value: T
  onChange?: (value: T) => any
}

export type SettingsItem = {
  onClick: () => void
  icon: React.ComponentType<SVGProps<SVGSVGElement>>
  title: string
  description: string
}
