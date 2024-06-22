import React from 'react'
import { Typography } from '@components/Typograpy'
import FormBook from '@pages/dashboard/book/FormBook'
import alova from '@libs/alova'
import type { IBaseResponse } from '@/types/base'

const Component: React.FC = () => {
  return (
    <div className='space-y-8'>
      <Typography as='h1' variant='h2'>
        Create Book
      </Typography>
      <FormBook
        type='create'
        api={(req: any) => {
          return alova.Post<IBaseResponse<any>, any>('/v1/book', req, {
            name: 'create-book',
          })
        }}
      />
    </div>
  )
}

export { Component as default }
