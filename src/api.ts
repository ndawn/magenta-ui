import axios, {
  AxiosError,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios"

import config from "@/config"
import type {
  ApiError,
  ApiResult,
  ContextRequestOptions,
  SessionState,
} from "@/types"
import { readLocalStorageValue } from "@/utils"

export const httpClient = axios.create({
  baseURL: config.apiPrefix,
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: {
    indexes: null,
  },
})

export const makeRequest = async <T = any, D = void>(
  options: AxiosRequestConfig<D>,
  auth: boolean = true,
) => {
  if (auth) {
    options.headers ??= {}
    const accessToken = readLocalStorageValue<{ state: SessionState }>(
      "session",
    )?.state?.accessToken

    if (accessToken) {
      options.headers["Authorization"] = `Bearer ${accessToken}`
    }
  }

  try {
    return {
      data: (await httpClient.request<D, AxiosResponse<T>>(options)).data,
    }
  } catch (error) {
    const response = (error as AxiosError<ApiError>).response

    if (!response) {
      console.error("Unexpected error")
      throw error
    }

    return { error: response.data }
  }
}

export const request =
  <T = any, D = void>(config: ContextRequestOptions<D>, auth: boolean = true) =>
  async (env: any): Promise<ApiResult<T>> => {
    const options = {
      ...config,
      url: typeof config.url === "string" ? config.url : config.url?.(env),
    }

    return await makeRequest<T, D>(options, auth)
  }
