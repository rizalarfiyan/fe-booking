import type { SidebarData } from '@/types/dashboard'
import { LayoutDashboard, Trophy } from 'lucide-react'

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
]
