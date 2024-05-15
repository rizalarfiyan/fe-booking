import useAuth from '@hooks/useAuth'

const Component: React.FC = () => {
  const { user } = useAuth()

  return (
    <div className='flex flex-col items-center justify-center pt-28'>
      <h1 className='space-x-3 font-semibold text-4xl'>
        <span>Hello</span>
        <span className='rounded-md bg-primary-600 px-4 py-2 text-white'>
          {user?.first_name}
        </span>
        <span>!</span>
      </h1>
    </div>
  )
}

export { Component as default }
