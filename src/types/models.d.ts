import { z } from "zod/v4-mini"

import {
  AccessToken,
  BaseEntity,
  Entity,
  Property,
  User,
} from "@/schemas/models"

export type BaseEntity = z.infer<typeof BaseEntity>
export type Entity = z.infer<typeof Entity>
export type User = z.infer<typeof User>
export type AccessToken = z.infer<typeof AccessToken>
export type Property = z.infer<typeof Property>
