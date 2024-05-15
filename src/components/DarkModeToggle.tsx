import useTheme from '@hooks/useTheme'
import React from 'react'
import { Button } from '@components/Button'
import { Moon, Sun } from 'lucide-react'

const DarkModeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useTheme()

  const onToggleDarkMode = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    toggleDarkMode()
  }

  return (
    <Button
      size='icon'
      variant='outline'
      className='size-8'
      type='button'
      onClick={onToggleDarkMode}
    >
      {isDarkMode ? <Sun className='size-5' /> : <Moon className='size-5' />}
    </Button>
  )
}

export default DarkModeToggle
