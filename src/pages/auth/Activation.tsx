import Layout from '@layouts/Auth'
import React from 'react'
import { Button } from '@components/Button'
import { Link } from 'react-router-dom'
import { Typography } from '@components/Typograpy'
import { BadgeCheck } from 'lucide-react'

const Component: React.FC = () => {
  return (
    <Layout
      title='Activation'
      description='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto blanditiis ea fugit nam nisi, officia.'
      hasBack
      replaceBack
    >
      <div className='mx-auto max-w-sm space-y-4 py-8 text-center'>
        <BadgeCheck className='mx-auto size-20 text-emerald-500 dark:text-emerald-400' />
        {/*<BadgeX className='size-20 text-red-500 dark:text-red-400 mx-auto' />*/}
        <Typography
          className='font-semibold dark:text-slate-200'
          type='description'
        >
          Congratulations! Your account is now active. You can log in and start
          making a positive impact on waste management right away.
        </Typography>
      </div>
      <Button className='w-full' asChild>
        <Link to='/login' replace>
          Back to Login
        </Link>
      </Button>
    </Layout>
  )
}

export { Component as default }
