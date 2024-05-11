import React, { createContext, useMemo, useState } from 'react'

export interface IThemeContext {
  isDarkMode: boolean
  toggleDarkMode: () => void
}

export const ThemeContext = createContext<IThemeContext | null>(null)

export const ThemeProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    window?.localStorage?.getItem('theme') === 'dark',
  )

  const value: IThemeContext = useMemo(() => {
    return {
      isDarkMode,
      toggleDarkMode: () => {
        // reverse the current theme
        setIsDarkMode((prev) => !prev)
        const domBody = document.documentElement.classList
        !isDarkMode ? domBody.add('dark') : domBody.remove('dark')
        window.localStorage.setItem('theme', !isDarkMode ? 'dark' : 'light')
      },
    }
  }, [isDarkMode])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export default ThemeProvider
