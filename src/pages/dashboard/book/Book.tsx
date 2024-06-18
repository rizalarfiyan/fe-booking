import React from 'react'
import alova from '@libs/alova'
import type { IBaseResponseList } from '@/types/base'
import MultiSelect from '@components/MultiSelect'

const getAll = (params: any) => {
  return alova.Get<IBaseResponseList>('/v1/category/dropdown', {
    params,
  })
}

const Component: React.FC = () => {
  return (
    <div className='space-y-8'>
      <MultiSelect api={getAll} placeholder='Select categories...' />
    </div>
  )
}

export { Component as default }
