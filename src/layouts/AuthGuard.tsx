import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import useAuth from '@hooks/useAuth'

const Layout: React.FC = () => {
  const { isLoggedIn } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/dashboard', { replace: true })
    }
  }, [isLoggedIn, navigate])

  if (isLoggedIn) return null

  return <Outlet />
}

export { Layout as default }
