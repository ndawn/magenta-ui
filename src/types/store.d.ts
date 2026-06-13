export type LayoutState = {
  headerOpened: boolean
  navbarOpened: boolean
  headerHeight: number
  navbarWidth: number
  layoutSpacing: number
  setHeaderOpened: (value: boolean) => void
  setNavbarOpened: (value: boolean) => void
}

export type SessionState = {
  user: User | null
  accessToken: string | null
  setUser: (user: User | null) => void
  setAccessToken: (accessToken: string | null) => void
}

export type AppState = LayoutState
