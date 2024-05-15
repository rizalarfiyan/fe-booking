import { type IAuthContext, AuthContext } from '@providers/AuthProvider'
import { useContext } from 'react'

export const useAuth = (): IAuthContext => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider')
  }
  return context
}

export default useAuth
