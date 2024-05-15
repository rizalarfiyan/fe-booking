import { Button } from '@components/Button'
import { Menu } from 'lucide-react'
import React from 'react'
import { UserDropdown } from '@components/UserDropdown'
import DarkModeToggle from '@components/DarkModeToggle'
import SidebarMobile from '@components/Sidebar/Mobile'

const HeaderDashboard: React.FC = () => {
  return (
    <header className='fixed top-0 z-[49] w-full border bg-background'>
      <div className='ml-0 lg:ml-80'>
        <div className='container flex h-16 items-center justify-between p-3 lg:justify-end'>
          <SidebarMobile
            trigger={
              <Button variant='outline' size='icon' className='lg:hidden'>
                <Menu className='size-5' />
              </Button>
            }
          />
          <div className='flex items-center gap-4'>
            <DarkModeToggle />
            <UserDropdown />
          </div>
        </div>
      </div>
    </header>
  )
}

export default HeaderDashboard
