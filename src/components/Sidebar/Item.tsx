import React from 'react'
import { hasRole } from '@utils/check'
import SidebarItemButton from '@components/Sidebar/ItemButton'
import { Link, useLocation } from 'react-router-dom'
import type { ItemSidebarRole } from '@/types/dashboard'

const SidebarItem: React.FC<ItemSidebarRole> = (props) => {
  const { href, title, icon, role, roles } = props
  const currentPage = useLocation()

  if (!hasRole(role, roles)) return

  const isActive = currentPage.pathname === href
  return (
    <SidebarItemButton icon={icon} isActive={isActive}>
      <Link to={href}>{title}</Link>
    </SidebarItemButton>
  )
}

export default SidebarItem
