import type { AuthRole } from '@/types/auth'
import type { ItemSidebar } from '@/types/dashboard'

export const hasRole = (role: AuthRole, roles?: AuthRole[]) => {
  if (typeof roles === 'undefined') return true
  return roles.includes(role)
}

export const hasRoleNested = (role: AuthRole, items: ItemSidebar[]) => {
  for (const child of items) {
    if (hasRole(role, child?.roles)) return true
  }
  return false
}

export const validateArr = <T>(
  value: T | null | undefined,
  arr: T[],
  defaultValue: T,
) => {
  if (!value) return defaultValue
  if (!arr.includes(value)) return defaultValue
  return value
}
