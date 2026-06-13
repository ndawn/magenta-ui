import type { ComponentProps, ReactNode } from "react"

import { useNavigate } from "@tanstack/react-router"

import LoginButton from "@/components/auth/LoginButton"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { useAuth } from "@/hooks"
import { cn } from "@/lib/utils"
import { makeInitials } from "@/utils"

type UserSectionProps = ComponentProps<"div"> & {
  size?: "default" | "sm" | "xs" | null | undefined
  reverse?: boolean
  action?: ReactNode
}

const UserSection = ({ action, className, ...props }: UserSectionProps) => {
  const { user } = useAuth()
  const navigate = useNavigate()

  return !!user ? (
    <Item className={cn("p-0", className)} {...props}>
      <ItemMedia>
        <Avatar>
          <AvatarImage src={undefined} />
          <AvatarFallback>
            {makeInitials(`${user?.firstName} ${user?.lastName}`)}
          </AvatarFallback>
        </Avatar>
      </ItemMedia>
      <ItemContent>
        <ItemTitle>{`${user?.firstName} ${user?.lastName}`}</ItemTitle>
        <ItemDescription>{user?.username}</ItemDescription>
      </ItemContent>
      <ItemActions>{/* ... */}</ItemActions>
    </Item>
  ) : (
    <LoginButton onClick={() => navigate({ to: "/auth/login" })} />
  )
}

export default UserSection
