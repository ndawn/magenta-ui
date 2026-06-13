import { type StateCreator } from "zustand"

import config from "@/config"
import type { LayoutState } from "@/types"

export const createLayoutStateSlice: StateCreator<LayoutState> = (set) => ({
  headerOpened: config.defaultAppState.headerOpened,
  navbarOpened: config.defaultAppState.navbarOpened,
  headerHeight: config.defaultAppState.headerHeight,
  navbarWidth: config.defaultAppState.navbarWidth,
  layoutSpacing: config.defaultAppState.layoutSpacing,
  setHeaderOpened: (value) => set(() => ({ headerOpened: value })),
  setNavbarOpened: (value) => set(() => ({ navbarOpened: value })),
})
