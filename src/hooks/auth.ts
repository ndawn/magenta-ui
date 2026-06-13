import {
  createContext,
  createElement,
  use,
  useEffect,
  type PropsWithChildren,
} from "react"

import { useMutation, useQuery } from "@tanstack/react-query"

import { makeRequest } from "@/api"
import type { AccessToken, LoginData, RegisterData, User } from "@/types"

import { useSetAccessToken, useUser } from "./store"

export const useLocalAuth = () => {
  const setAccessToken = useSetAccessToken()
  const [user, setUser] = useUser()

  const getMeHook = useQuery({
    queryKey: ["me"],
    queryFn: () => makeRequest<User>({ url: "/auth/me" }),
    enabled: false,
  })
  const loginHook = useMutation({
    mutationKey: ["login"],
    mutationFn: (data: LoginData) =>
      makeRequest<AccessToken, LoginData>(
        { method: "POST", url: "/auth/login", data },
        false,
      ),
  })
  const registerHook = useMutation({
    mutationKey: ["register"],
    mutationFn: (data: RegisterData) =>
      makeRequest<AccessToken, RegisterData>(
        { method: "POST", url: "/auth/register", data },
        false,
      ),
  })

  const isAuthenticating =
    getMeHook.isFetching || loginHook.isPending || registerHook.isPending
  const isAuthenticated = !!user

  const login = async (username: string, password: string) => {
    const { data, error } = await loginHook.mutateAsync({ username, password })

    setAccessToken(data?.accessToken ?? null)
    setUser(data?.user ?? null)
    return error
  }

  const register = async (
    username: string,
    password: string,
    firstName: string,
    lastName: string,
  ) => {
    const { data, error } = await registerHook.mutateAsync({
      username,
      password,
      firstName,
      lastName,
    })

    setAccessToken(data?.accessToken ?? null)
    setUser(data?.user ?? null)
    return error
  }

  const logout = async () => {
    setUser(null)
    setAccessToken(null)
  }

  const refreshUser = async () => {
    const { data } = await getMeHook.refetch()
    setUser(data?.data ?? null)

    if (data?.error) {
      setAccessToken(null)
    }

    return data?.data ?? null
  }

  useEffect(() => {
    refreshUser()
  }, [])

  return {
    isAuthenticating,
    isAuthenticated,
    user,
    refreshUser,
    login,
    register,
    logout,
  }
}

export type AuthHook = ReturnType<typeof useLocalAuth>

export const AuthContext = createContext<AuthHook | null>(null)

export const useAuth = () => use(AuthContext)!

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const auth = useLocalAuth()

  return createElement(AuthContext.Provider, { value: auth, children })
}
