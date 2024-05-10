import React from 'react'

import { Button } from '@components/Button'
import AuthGraphic from '@images/graphics/auth.svg?react'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export interface IAuthLayoutProps {
  title: string
  description: string
  hasBack?: boolean
  children?: React.ReactNode
}

const Layout: React.FC<IAuthLayoutProps> = ({
  children,
  title,
  description,
  hasBack,
}) => {
  return (
    <div className='flex justify-center bg-white'>
      <div className='hidden h-full min-h-screen flex-1 bg-slate-100 md:flex md:items-center'>
        <AuthGraphic className='mx-auto hidden w-full h-auto max-w-3xl lg:block' />
      </div>
      <main className='relative h-full min-h-screen w-full max-w-xl md:max-w-3xl lg:max-w-2xl'>
        <div className='flex min-h-screen w-full items-center justify-center p-10 py-24'>
          <div className='w-full max-w-md space-y-10'>
            {hasBack && (
              <Button
                variant='outline'
                size='icon'
                className='absolute left-5 top-5'
                asChild
              >
                <Link to='/'>
                  <ArrowLeft />
                </Link>
              </Button>
            )}
            <div className='space-y-2 text-center'>
              <h1 className='scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl uppercase'>
                {title}
              </h1>
              <p className='leading-snug text-slate-500'>{description}</p>
            </div>
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}

export { Layout as default }
