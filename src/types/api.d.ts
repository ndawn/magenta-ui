import type { AxiosRequestConfig } from "axios"
import { z } from "zod/v4-mini"

import {
  AuthSearchParams,
  DeleteData,
  DeleteResponse,
  Sorting,
  FilterData,
  EntityCount,
  ApiError,
  ApiExtra,
  LoginData,
  RegisterData,
} from "@/schemas/api"

export type AuthSearchParams = z.infer<typeof AuthSearchParams>
export type DeleteData = z.infer<typeof DeleteData>
export type DeleteResponse = z.infer<typeof DeleteResponse>
export type Sorting = z.infer<typeof Sorting>
export type FilterData = z.infer<typeof FilterData>
export type EntityCount = z.infer<typeof EntityCount>
export type ApiError = z.infer<typeof ApiError>
export type LoginData = z.infer<typeof LoginData>
export type RegisterData = z.infer<typeof RegisterData>

export type ApiResult<T extends any> =
  | {
      data: T
      error?: undefined
    }
  | {
      data?: undefined
      error: ApiError
    }

export type EntityList<T extends any> = {
  total: number
  items: T[]
}

export type ContextRequestOptions<D = any> = Omit<
  AxiosRequestConfig<D>,
  "url"
> & {
  url:
    | AxiosRequestConfig<D>["url"]
    | ((env: EnvHook) => AxiosRequestConfig<D>["url"])
}
