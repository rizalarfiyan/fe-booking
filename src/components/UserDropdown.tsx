import { Avatar, AvatarFallback, AvatarImage } from '@/components/Avatar'
import { Button } from '@/components/Button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/DropdownMenu'
import useAuth from '@hooks/useAuth'
import { getAvatarName, getFullName } from '@utils/string'
import { Link, useNavigate } from 'react-router-dom'
import React from 'react'

const UserDropdown = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  if (!user) return null

  const fullName = getFullName(user.firstName, user.lastName)
  const onLogout = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    logout()
    navigate('/login')
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='relative size-8' rounded='full'>
          <Avatar className='size-8'>
            <AvatarImage src={user.avatar} alt={fullName} />
            <AvatarFallback>{getAvatarName(fullName)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='end' forceMount>
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1'>
            <p className='font-medium text-sm leading-none'>{fullName}</p>
            <p className='text-muted-foreground text-xs leading-none'>
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link to='/dashboard'>
            <DropdownMenuItem className='cursor-pointer'>
              Dashboard
            </DropdownMenuItem>
          </Link>
          <Link to={`/profile/${user.userId}`}>
            <DropdownMenuItem className='cursor-pointer'>
              View Profile
            </DropdownMenuItem>
          </Link>
          <Link to='/dashboard/change-password'>
            <DropdownMenuItem className='cursor-pointer'>
              Change Password
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onLogout}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { UserDropdown }
