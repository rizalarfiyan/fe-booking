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
      <div className='py-8 max-w-sm mx-auto text-center space-y-4'>
        <BadgeCheck className='size-20 text-emerald-500 dark:text-emerald-400 mx-auto' />
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
