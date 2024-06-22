import React from 'react'
import { Typography } from '@components/Typograpy'

const Component: React.FC = () => {
  return (
    <div className='space-y-8'>
      <Typography as='h1' variant='h2'>
        Create Book
      </Typography>
      <div></div>
    </div>
  )
}

export { Component as default }
