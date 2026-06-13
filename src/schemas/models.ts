import { z } from "zod/v4-mini"

export const BaseEntity = z.object({
  createdAt: z.iso.datetime(),
  updatedAt: z.nullable(z.iso.datetime()),
  deletedAt: z.nullable(z.iso.datetime()),
})

export const Entity = z.extend(BaseEntity, {
  id: z.number(),
})

export const User = z.extend(Entity, {
  username: z.string(),
  firstName: z.string(),
  lastName: z.string(),
})

export const AccessToken = z.object({
  accessToken: z.string(),
  tokenType: z.enum(["access", "refresh"]),
  user: User,
})

export const Property = z.extend(Entity, {
  title: z.string(),
})
