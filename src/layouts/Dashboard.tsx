import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import useAuth from '@hooks/useAuth'
import Sidebar from '@components/Sidebar/Sidebar'
import HeaderDashboard from '@components/Header/Dashboard'

const Layout: React.FC = () => {
  const { isLoggedIn } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login', { replace: true })
    }
  }, [isLoggedIn, navigate])

  if (!isLoggedIn) return null

  return (
    <>
      <Sidebar className='fixed top-0 left-0 z-[50] hidden h-full min-h-screen w-80 border-r bg-background lg:block' />
      <HeaderDashboard />
      <main className='mb-0 pt-24 pb-16 lg:ml-80 md:pt-32'>
        <div className='container space-y-1 md:space-y-3'>
          <Outlet />
        </div>
      </main>
    </>
  )
}

export { Layout as default }
