import type { ComponentProps } from "react"

import { UserRoundIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

export const LoginButton = (
  props: Omit<ComponentProps<typeof Button>, "variant">,
) => (
  <Button variant="ghost" {...props}>
    <UserRoundIcon />
    Sign in
  </Button>
)

export default LoginButton
