import type { ILabelValue } from '@/types/base'

export const AUTH_ROLE = {
  ADMIN: 'admin',
  GUEST: 'reader',
} as const

export const USER_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  BANNED: 'banned',
} as const

export const DATETIME_FORMAT = {
  date: 'DD MMMM YYYY',
  time: 'HH:mm:ss',
  datetime: 'DD MMMM YYYY HH:mm:ss',
  statistic: 'DD MMM',
  server: 'YYYY-MM-DD',
}

export const DROPDOWN_USER_ROLE: ILabelValue[] = [
  {
    label: 'Reader',
    value: AUTH_ROLE.GUEST,
  },
  {
    label: 'Admin',
    value: AUTH_ROLE.ADMIN,
  },
]

export const DROPDOWN_USER_STATUS: ILabelValue[] = [
  {
    label: 'Inactive',
    value: USER_STATUS.INACTIVE,
  },
  {
    label: 'Active',
    value: USER_STATUS.ACTIVE,
  },
  {
    label: 'Banned',
    value: USER_STATUS.BANNED,
  },
]
