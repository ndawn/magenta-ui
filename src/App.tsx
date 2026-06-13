import { useQueryClient } from "@tanstack/react-query"
import { RouterProvider } from "@tanstack/react-router"

import { AuthContext } from "@/hooks"
import { useLocalAuth } from "@/hooks/auth"
import router from "@/router"

const App = () => {
  const auth = useLocalAuth()
  const queryClient = useQueryClient()

  return (
    <AuthContext value={auth}>
      <RouterProvider router={router} context={{ auth, queryClient }} />
    </AuthContext>
  )
}

export default App
