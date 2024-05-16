import { Button } from '@components/Button'
import { Typography } from '@components/Typograpy'
import React from 'react'
import { Link } from 'react-router-dom'
import useAuth from '@hooks/useAuth'
import { UserDropdown } from '@components/UserDropdown'
import DarkModeToggle from '@components/DarkModeToggle'
import Logo from '@components/Logo'

const HeaderPublic: React.FC = () => {
  const { isLoggedIn } = useAuth()

  return (
    <header className='fixed top-0 right-0 z-[49] flex min-h-16 w-full items-center border-b bg-background py-3'>
      <div className='container flex justify-between'>
        <Link to='/' className='flex items-center gap-2'>
          <Typography type='title' asChild>
            <Logo className='size-7' />
          </Typography>
          <Typography as='h1' variant='h3' type='title'>
            Booking
          </Typography>
        </Link>
        <div className='flex items-center gap-4'>
          <DarkModeToggle />
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

export default HeaderPublic
