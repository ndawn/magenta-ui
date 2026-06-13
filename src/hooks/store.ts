import { useAppState, useSessionState } from "@/store"

import { useIsMobile } from "./use-mobile"

export const useUser = () => {
  return [
    useSessionState((state) => state.user),
    useSessionState((state) => state.setUser),
  ] as const
}
export const useAccessToken = () =>
  useSessionState((state) => state.accessToken)
export const useSetAccessToken = () =>
  useSessionState((state) => state.setAccessToken)

export const useLayoutState = () => {
  const isMobile = useIsMobile()

  return useAppState((state) => ({
    isMobile,
    headerOpened: state.headerOpened,
    navbarOpened: state.navbarOpened,
    headerHeight: state.headerHeight,
    navbarWidth: state.navbarWidth,
    layoutSpacing: state.layoutSpacing,
    setHeaderOpened: state.setHeaderOpened,
    setNavbarOpened: state.setNavbarOpened,
  }))
}
