import React, { createContext, useEffect, useMemo, useState } from 'react'
import type { IUser } from '@/types/auth'
import { LoadingScreen } from '@components/LoadingScreen'
import { AUTH_ROLE } from '@/constants/app'

export interface IAuthContext {
  user?: IUser
  isLoggedIn: boolean
  login: () => void
  logout: () => void
}

const dummyUser: IUser = {
  id: 1,
  first_name: 'Paijo',
  last_name: 'Royo',
  email: 'paijo.royo@gmail.com',
  avatar: 'https://avatars.githubusercontent.com/u/19503666',
  role: AUTH_ROLE.GUEST,
}

export const AuthContext = createContext<IAuthContext | null>(null)

export const AuthProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [user, setUser] = useState<IUser>()
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const user = localStorage.getItem('access_token')
    if (!user) {
      setLoading(false)
      return
    }

    async function fakeFetchMe() {
      await new Promise((resolve) => {
        setTimeout(() => {
          setUser(dummyUser)
          resolve(true)
        }, 1000)
      }).finally(() => setLoading(false))
    }

    fakeFetchMe()
  }, [])

  const value = useMemo(() => {
    return {
      user,
      isLoggedIn: !!user,
      login: () => {
        setUser(dummyUser)
        localStorage.setItem('access_token', 'the-access-token')
      },
      logout: () => {
        setUser(undefined)
        localStorage.removeItem('access_token')
      },
    }
  }, [user])

  if (loading) {
    return <LoadingScreen reason='Fetching user info...' />
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
