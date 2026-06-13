import { create } from "zustand"
import { persist } from "zustand/middleware"

import type { AppState, SessionState } from "@/types"

import { createLayoutStateSlice } from "./layoutState"
import { createSessionSlice } from "./sessionState"

export const useAppState = create<AppState>()((...a) => ({
  ...createLayoutStateSlice(...a),
}))

export const useSessionState = create<SessionState>()(
  persist(
    (...a) => ({
      ...createSessionSlice(...a),
    }),
    { name: "session" },
  ),
)
