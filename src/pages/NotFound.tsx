import { Button } from '@components/Button.tsx'
import GraphicNotFound from '@components/graphic/NotFound.tsx'
import { ChevronLeft } from 'lucide-react'
import type React from 'react'
import { Link } from 'react-router-dom'

const NotFound: React.FC = () => {
  return (
    <div className='container flex h-full min-h-screen w-full flex-col items-center justify-center gap-2 py-10 text-center'>
      <GraphicNotFound className='h-auto w-full max-w-md' />
      <div className='mx-auto max-w-sm space-y-6'>
        <div className='space-y-2'>
          <h1 className='scroll-m-20 text-3xl font-semibold tracking-tight'>
            This Page Does Not Exist
          </h1>
          <p className='text-secondary-600'>
            We&#x27;re sorry, but it appears the website address you entered was
            incorrect.
          </p>
        </div>
        <Button asChild variant='secondary' className='border-secondary-300'>
          <Link to='/'>
            <ChevronLeft className='mr-2 h-5 w-5' />
            <span>Back to Home</span>
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default NotFound
