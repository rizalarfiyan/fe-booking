import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import useAuth from '@hooks/useAuth'

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
    <div>
      <header>
        <h1>Header</h1>
      </header>
      <Outlet />
      <footer>Footer</footer>
    </div>
  )
}

export { Layout as default }
