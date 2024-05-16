import React from 'react'

import { Button } from '@components/Button'
import { Typography } from '@components/Typograpy'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import GraphicAuth from '@components/Graphic/Auth'

export interface IAuthLayoutProps {
  title: string
  description: string
  hasBack?: boolean
  replaceBack?: boolean
  children?: React.ReactNode
}

const Layout: React.FC<IAuthLayoutProps> = ({
  children,
  title,
  description,
  hasBack,
  replaceBack,
}) => {
  return (
    <div className='flex justify-center bg-background'>
      <div className='hidden h-full min-h-screen flex-1 bg-slate-100 md:flex md:items-center dark:bg-slate-800'>
        <GraphicAuth className='mx-auto hidden h-auto w-full max-w-2xl lg:block' />
      </div>
      <main className='relative h-full min-h-screen w-full max-w-xl lg:max-w-2xl md:max-w-3xl'>
        <div className='flex min-h-screen w-full items-center justify-center p-10 py-24'>
          <div className='w-full max-w-md space-y-10'>
            {hasBack && (
              <Button
                variant='outline'
                size='icon'
                className='absolute top-5 left-5'
                asChild
              >
                <Link to='/' replace={replaceBack}>
                  <ArrowLeft />
                </Link>
              </Button>
            )}
            <div className='space-y-2 text-center'>
              <Typography
                as='h1'
                variant='h2'
                type='secondary'
                className='text-4xl uppercase'
              >
                {title}
              </Typography>
              <Typography as='p' type='description'>
                {description}
              </Typography>
            </div>
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}

export { Layout as default }
