import type { SidebarData } from '@/types/dashboard'
import {
  BookText,
  BookUser,
  Contact,
  LayoutDashboard,
  List,
  Trophy,
  Users,
} from 'lucide-react'
import { AUTH_ROLE } from '@/constants/app'

export const SIDEBAR_MENU: SidebarData[] = [
  {
    type: 'item',
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    type: 'divide',
    title: 'Statistics',
    items: [
      {
        type: 'item',
        title: 'Leaderboard',
        href: '/dashboard/leaderboard',
        icon: Trophy,
      },
    ],
  },
  {
    type: 'divide',
    title: 'Management',
    items: [
      {
        type: 'item',
        title: 'Users',
        href: '/dashboard/users',
        icon: Users,
      },
      {
        type: 'item',
        title: 'Borrow',
        href: '/dashboard/borrow',
        icon: BookUser,
      },
      {
        type: 'item',
        title: 'Category',
        href: '/dashboard/category',
        icon: List,
        roles: [AUTH_ROLE.ADMIN],
      },
      {
        type: 'item',
        title: 'Book',
        href: '/dashboard/book',
        regex: /^\/dashboard\/book(\/(create|edit\/\d+)?)?(?:[#?].*)?$/g,
        icon: BookText,
        roles: [AUTH_ROLE.ADMIN],
      },
      {
        type: 'item',
        title: 'Contact',
        href: '/dashboard/contact',
        icon: Contact,
        roles: [AUTH_ROLE.ADMIN],
      },
    ],
  },
]
