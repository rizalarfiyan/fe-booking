import routes from '@/routes'
import ThemeProvider from '@providers/ThemeProvider'
import { RouterProvider } from 'react-router-dom'

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={routes} />
    </ThemeProvider>
  )
}

export default App
