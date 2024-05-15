import Sidebar from './Sidebar'
import React from 'react'
import { Sheet, SheetContent, SheetTrigger } from '@components/Sheet'

type SidebarMobileProps = {
  className?: string
  trigger: React.ReactNode
}

const SidebarMobile: React.FC<SidebarMobileProps> = ({
  className,
  trigger,
}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent
        side='left'
        className='w-full max-w-[20rem] p-0 sm:max-w-[20rem]'
      >
        <Sidebar className={className} />
      </SheetContent>
    </Sheet>
  )
}

export default SidebarMobile
