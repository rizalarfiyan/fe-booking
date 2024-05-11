import { Typography } from '@components/Typograpy'
import React, { Suspense } from 'react'
import { Await, Link, defer, useLoaderData } from 'react-router-dom'

const Component: React.FC = () => {
  const { data } = useLoaderData() as { data: boolean }

  return (
    <div className='flex items-center justify-center flex-col'>
      <h1 className='font-semibold text-4xl space-x-3'>
        <span>Hello</span>
        <span className='py-2 px-4 rounded-md bg-primary-600 text-white'>
          Booking
        </span>
        <span>!</span>
      </h1>
      <div className='mt-5'>
        <Suspense fallback='loading....'>
          <Await resolve={data} errorElement={<div>Error</div>}>
            <Typography as='p'>
              Welcome the FE Booking! Please{' '}
              <Link to='/login' className='underline'>
                Login
              </Link>{' '}
              to continue.
            </Typography>
          </Await>
        </Suspense>
      </div>
    </div>
  )
}

const loader = async () => {
  const data = new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, 1000)
  })

  return defer({
    data,
  })
}

export { Component as default, loader }
