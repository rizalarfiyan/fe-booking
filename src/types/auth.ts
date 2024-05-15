import type { AUTH_ROLE } from '@/constants/app'

export interface IUser {
  id: number
  first_name: string
  last_name: string
  email: string
  avatar: string
  role: AuthRole
}

export type AuthRole = (typeof AUTH_ROLE)[keyof typeof AUTH_ROLE]
