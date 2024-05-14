import routes from '@/routes'
import ThemeProvider from '@providers/ThemeProvider'
import { RouterProvider } from 'react-router-dom'
import UserProvider from '@providers/AuthProvider'

function App() {
  return (
    <UserProvider>
      <ThemeProvider>
        <RouterProvider router={routes} />
      </ThemeProvider>
    </UserProvider>
  )
}

export default App
