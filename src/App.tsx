import routes from '@/routes'
import ThemeProvider from '@providers/ThemeProvider'
import { RouterProvider } from 'react-router-dom'
import UserProvider from '@providers/AuthProvider'
import { Toaster } from '@components/Sonner'

function App() {
  return (
    <>
      <Toaster />
      <UserProvider>
        <ThemeProvider>
          <RouterProvider router={routes} />
        </ThemeProvider>
      </UserProvider>
    </>
  )
}

export default App
