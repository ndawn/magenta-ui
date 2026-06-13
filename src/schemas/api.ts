import { z } from "zod/v4-mini"

export const AuthSearchParams = z.object({
  next: z.optional(z.string()),
})

export const DeleteData = z.object({
  ids: z.optional(z.array(z.uuidv4())),
  force: z.optional(z.boolean()),
})

export const DeleteResponse = z.object({
  success: z.boolean(),
})

export const Sorting = z.object({
  sortField: z.string(),
  sortOrder: z.enum(["asc", "desc"]),
})

export const FilterData = z.partial(Sorting)

export const EntityCount = z.object({
  count: z.int().check(z.nonnegative()),
})

export const ApiError = z.object({
  statusCode: z.number(),
  message: z.string(),
  extra: z.optional(z.record(z.string(), z.any())),
})

export const ApiExtra = z.object({
  onError: z.function({ input: [ApiError], output: z.void() }),
})

export const LoginData = z.object({
  username: z.string(),
  password: z.string(),
})

export const RegisterData = z.extend(LoginData, {
  firstName: z.string(),
  lastName: z.string(),
})
