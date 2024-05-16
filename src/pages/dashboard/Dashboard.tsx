import React from 'react'
import { DashboardInformation } from '@components/Dashboard/Information'

const Component: React.FC = () => {
  const data = {
    point: 6023,
    total: 52,
    borrow: {
      count: 3,
      max: 5,
    },
    nearest: {
      date: '2021-09-01',
      title: 'Overthinking Is My Hobby, And I Hate It',
    },
  }

  return (
    <div className=''>
      <DashboardInformation data={data} />
    </div>
  )
}

export { Component as default }
