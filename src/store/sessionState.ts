import { type StateCreator } from "zustand"

import type { SessionState } from "@/types"

export const createSessionSlice: StateCreator<SessionState> = (set) => ({
  user: null,
  accessToken: null,
  setUser: (user) => set(() => ({ user })),
  setAccessToken: (accessToken) => set(() => ({ accessToken })),
})
