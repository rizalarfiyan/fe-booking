import React from 'react'
import TopAll from '@components/Loaderboard/TopAll'
import Badge from '@components/Loaderboard/CurrentRank'

const Component: React.FC = () => {
  return (
    <div className='flex w-full flex-col items-center justify-center gap-12 1400w:flex-row 1400w:items-start 1400w:gap-6'>
      <TopAll />
      <Badge />
    </div>
  )
}

export { Component as default }
