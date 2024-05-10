import { Button } from '@components/Button'
import useTheme from '@hooks/useTheme.ts'
import { BookOpenText, Moon, Sun } from 'lucide-react'
import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Layout: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useTheme()

  const onToggleDarkMode = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    toggleDarkMode()
  }

  return (
    <div>
      <header className='w-full py-3 border-b border-slate-200 fixed'>
        <div className='container flex justify-between'>
          <div className='flex items-center gap-2 text-primary-700'>
            <BookOpenText className='size-7' />
            <h1 className='text-2xl font-semibold'>Booking</h1>
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
            <Link to='/login' className='underline'>
              Login
            </Link>
          </div>
        </div>
      </header>
      <main className='flex items-center min-h-[calc(100dvh_-_60px)] justify-center'>
        <Outlet />
      </main>
      <footer className='w-full py-4 px-2 text-center border-slate-200 border-t'>
        <p>
          CopyRight &copy; {new Date().getFullYear()} Booking - All Rights
          Reserved
        </p>
      </footer>
    </div>
  )
}

export { Layout as default }
