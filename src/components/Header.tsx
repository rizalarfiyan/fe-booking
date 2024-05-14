import { Button } from '@components/Button'
import { Typography } from '@components/Typograpy'
import useTheme from '@hooks/useTheme'
import { BookOpenText, Moon, Sun } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import useAuth from '@hooks/useAuth'
import { UserDropdown } from '@components/UserDropdown'

const Header: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useTheme()
  const { isLoggedIn } = useAuth()

  const onToggleDarkMode = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    toggleDarkMode()
  }

  return (
    <header className='fixed top-0 right-0 z-[49] w-full border-b bg-background py-3'>
      <div className='container flex justify-between'>
        <Link to='/' className='flex items-center gap-2'>
          <Typography type='title' asChild>
            <BookOpenText className='size-7' />
          </Typography>
          <Typography as='h1' variant='h3' type='title'>
            Booking
          </Typography>
        </Link>
        <div className='flex items-center gap-4'>
          <Button
            size='icon'
            variant='outline'
            className='size-8'
            type='button'
            onClick={onToggleDarkMode}
          >
            {isDarkMode ? (
              <Sun className='size-5' />
            ) : (
              <Moon className='size-5' />
            )}
          </Button>
          {isLoggedIn ? (
            <UserDropdown />
          ) : (
            <div className='flex items-center gap-2'>
              <Button variant='secondary' asChild>
                <Link to='/login'>Login</Link>
              </Button>
              <Button asChild>
                <Link to='/register'>Register</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
