import React, { createContext, useEffect, useMemo, useState } from 'react'
import type { IUser } from '@/types/auth'
import { LoadingScreen } from '@components/LoadingScreen'
import type { IBaseResponse } from '@/types/base'
import alova from '@libs/alova'
import { useRequest } from 'alova'
import { toast } from 'sonner'

export interface IAuthContext {
  user?: IUser
  isLoggedIn: boolean
  login: (user: IUser, token: string) => void
  logout: () => void
}

export const AuthContext = createContext<IAuthContext | null>(null)

export const AuthProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [user, setUser] = useState<IUser>()
  const [loading, setLoading] = useState<boolean>(true)

  const { send: getMe } = useRequest(
    alova.Get<IBaseResponse<IUser>>('/v1/auth/me'),
    {
      immediate: false,
    },
  )

  const logout = () => {
    setUser(undefined)
    localStorage.removeItem('access_token')
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: This effect should only run once
  useEffect(() => {
    const user = localStorage.getItem('access_token')
    if (!user) {
      setLoading(false)
      return
    }

    async function fakeFetchMe() {
      setLoading(true)
      await getMe()
        .then((res) => {
          setUser(res.data)
        })
        .catch(() => {
          toast.error('Session expired, please login again.')
          logout()
        })
        .finally(() => setLoading(false))
    }

    fakeFetchMe()
  }, [])

  const value = useMemo(() => {
    return {
      user,
      isLoggedIn: !!user,
      login: (user: IUser, token: string) => {
        setUser(user)
        localStorage.setItem('access_token', token)
      },
      logout,
    }
  }, [user, logout])

  if (loading) {
    return <LoadingScreen reason='Fetching user info...' />
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
