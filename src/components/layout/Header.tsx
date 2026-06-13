import type { ComponentProps } from "react"

import Container from "@/components/layout/Container"
import Logo from "@/components/layout/Logo"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import UserSection from "@/components/user/UserSection"
import { cn } from "@/lib/utils"

const Header = ({ className, ...props }: ComponentProps<typeof Container>) => (
  <Container className={cn("py-4 px-0 flex gap-6", className)} {...props}>
    <Logo className="flex-0" />

    <div className="flex-1">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Houses</NavigationMenuTrigger>
            <NavigationMenuContent></NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>

    <UserSection className="flex-0" />
  </Container>
)

export default Header
