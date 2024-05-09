import type React from 'react'
import { Link } from 'wouter'

const NotFound: React.FC = () => {
  return (
    <div className='min-h-dvh min-w-full w-full h-full flex items-center justify-center gap-6 flex-col text-center'>
      <h1 className='font-semibold text-6xl space-x-3'>
        <span className='py-2 px-4 rounded-md bg-amber-700 text-white'>
          404
        </span>
      </h1>
      <div>
        <p className='text-slate-600'>Page not found.</p>
        <Link
          href='/'
          className='underline text-slate-600 decoration-slate-600 underline-offset-2'
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}

export default NotFound
