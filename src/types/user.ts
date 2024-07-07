import type { AuthRole } from '@/types/auth'
import type { USER_STATUS } from '@/constants/app'

export type UserStatus = (typeof USER_STATUS)[keyof typeof USER_STATUS]

export interface IUser {
  userId: number
  firstName: string
  lastName: string
  email: string
  status: UserStatus
  role: AuthRole
  points: number
  bookCount: number
}
