import { StrictMode } from "react"

import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat"
import { createRoot } from "react-dom/client"
import { scan } from "react-scan"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import App from "@/App"
import "@/styles.css"

dayjs.extend(customParseFormat)

scan({ enabled: true })

const queryClient = new QueryClient()

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
)
