import React from 'react'

const Component: React.FC = () => {
  return (
    <div className='container flex flex-col items-center justify-center pt-28'>
      <h1 className='space-x-3 font-semibold text-4xl'>
        <span>Go</span>
        <span className='rounded-md bg-primary-600 px-4 py-2 text-white'>
          Booking
        </span>
        <span>now!</span>
      </h1>
    </div>
  )
}

export { Component as default }
