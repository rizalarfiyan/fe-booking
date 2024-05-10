import { BookOpenText } from 'lucide-react'
import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Layout: React.FC = () => {
  return (
    <div>
      <header className='w-full py-3 border-b border-slate-200 fixed'>
        <div className='container flex justify-between'>
          <div className='flex items-center gap-2 text-primary-700'>
            <BookOpenText className='size-7' />
            <h1 className='text-2xl font-semibold'>Booking</h1>
          </div>
          <div className='flex items-center gap-2'>
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
