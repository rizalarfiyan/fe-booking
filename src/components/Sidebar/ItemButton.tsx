import React from 'react'
import { Button } from '@components/Button'
import type { ItemSidebarRole } from '@/types/dashboard'
import { cn } from '@utils/classes'

export interface SidebarItemButtonProps
  extends Pick<ItemSidebarRole, 'icon'>,
    React.PropsWithChildren {
  isActive?: boolean
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const SidebarItemButton: React.FC<SidebarItemButtonProps> = (props) => {
  const { icon: Icon, onClick, isActive, children } = props

  return (
    <Button
      asChild={!onClick}
      variant='outline'
      leftIcon={Icon && <Icon className='mr-2 size-4' />}
      className={cn(
        'w-full justify-start',
        isActive &&
          'border-primary-500 bg-primary-50 text-primary-800 dark:bg-primary-100/20 dark:hover:bg-primary-200/30 hover:bg-primary-200 dark:text-white hover:text-primary-800',
      )}
      onClick={onClick}
    >
      {children}
    </Button>
  )
}

export default SidebarItemButton
