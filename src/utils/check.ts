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
