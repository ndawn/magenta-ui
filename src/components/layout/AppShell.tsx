import type { ComponentProps } from "react"

import Container from "@/components/layout/Container"
import Header from "@/components/layout/Header"

const AppShell = ({ children }: ComponentProps<"div">) => {
  return (
    <Container size="lg" className="min-h-dvh">
      <Header />
      <main className="mt-4">{children}</main>
    </Container>
  )
}

export default AppShell
