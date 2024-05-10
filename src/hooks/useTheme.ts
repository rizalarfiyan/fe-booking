import { type IThemeContext, ThemeContext } from '@providers/ThemeProvider'
import { useContext } from 'react'

export const useTheme = (): IThemeContext => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export default useTheme
