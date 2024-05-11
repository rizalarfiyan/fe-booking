import { Button } from '@components/Button'
import { Typography } from '@components/Typograpy'
import useTheme from '@hooks/useTheme'
import { BookOpenText, Moon, Sun } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const Header: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useTheme()

  const onToggleDarkMode = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    toggleDarkMode()
  }

  return (
    <header className='w-full py-3 border-b fixed bg-background top-0 right-0 z-[99]'>
      <div className='container flex justify-between'>
        <div className='flex items-center gap-2'>
          <Typography type='title' asChild>
            <BookOpenText className='size-7' />
          </Typography>
          <Typography as='h1' variant='h3' type='title'>
            Booking
          </Typography>
        </div>
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
          <nav>
            <ul className='flex items-center gap-2'>
              <li>
                <Button variant='secondary' asChild>
                  <Link to='/login'>Login</Link>
                </Button>
              </li>
              <li>
                <Button asChild>
                  <Link to='/register'>Register</Link>
                </Button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
