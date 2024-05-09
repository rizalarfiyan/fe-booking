import type React from 'react'

const Home: React.FC = () => {
  return (
    <div className='min-h-dvh min-w-full w-full h-full flex items-center justify-center'>
      <h1 className='font-semibold text-4xl space-x-3'>
        <span>Hello</span>
        <span className='py-2 px-4 rounded-md bg-amber-700 text-white'>
          FE Booking
        </span>
        <span>!</span>
      </h1>
    </div>
  )
}

export default Home
