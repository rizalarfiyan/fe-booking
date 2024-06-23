import type { LucideIcon } from 'lucide-react'
import type { AuthRole } from '@/types/auth'

export type ItemSidebar = {
  type: 'item'
  title: string
  href: string
  regex?: RegExp
  icon?: LucideIcon
  roles?: AuthRole[]
}

export type DivideSidebar = {
  type: 'divide'
  title: string
  items: ItemSidebar[]
}

export type SidebarData = ItemSidebar | DivideSidebar
export type ItemSidebarRole = ItemSidebar & SidebarWithRole
export type DivideSidebarRole = DivideSidebar & SidebarWithRole

export type SidebarWithRole = {
  role: AuthRole
}

export interface ITier {
  title: string
  description: string
  image: string
  point: number
}
