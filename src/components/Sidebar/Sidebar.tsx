import useAuth from '@hooks/useAuth'
import React from 'react'
import { Link } from 'react-router-dom'
import { Typography } from '@components/Typograpy'
import { SIDEBAR_MENU } from '@/constants/sidebar'
import SidebarItem from '@components/Sidebar/Item'
import SidebarDivide from '@components/Sidebar/Divide'

const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement>
>((props, ref) => {
  const { user, isLoggedIn } = useAuth()
  if (!isLoggedIn || !user) return null

  return (
    <div ref={ref} {...props}>
      <div className='mb-4 flex border-b p-1 text-center'>
        <div className='mx-auto justify-center gap-3 rounded-sm p-1 px-2 py-2.5'>
          <Link to='/'>
            <Typography as='h1' variant='h2' className='text-secondary-600'>
              Booking
            </Typography>
          </Link>
        </div>
      </div>
      <div className='w-full space-y-2 px-3 md:px-8 sm:px-4'>
        {SIDEBAR_MENU.map((item, idx) => {
          switch (item.type) {
            case 'item':
              return <SidebarItem key={idx} role={user.role} {...item} />
            case 'divide':
              return <SidebarDivide key={idx} role={user.role} {...item} />
            default:
              return
          }
        })}
      </div>
    </div>
  )
})

Sidebar.displayName = 'Sidebar'

export default Sidebar
