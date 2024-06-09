import type { AUTH_ROLE } from '@/constants/app'

export interface IUser {
  userId: number
  firstName: string
  avatar: string
  lastName: string
  email: string
  role: AuthRole
  points: number
  bookCount: number
}

export type AuthRole = (typeof AUTH_ROLE)[keyof typeof AUTH_ROLE]

export interface ILoginDTO {
  token: string
  user: IUser
}
