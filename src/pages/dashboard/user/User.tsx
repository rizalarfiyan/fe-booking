import React from 'react'
import { Typography } from '@components/Typograpy'
import type { ColumnDef } from '@tanstack/react-table'
import type { IBaseResponse, IBaseResponseList } from '@/types/base'
import alova from '@libs/alova'
import Datatable, { ColumnHeader } from '@components/Datatable'
import { Badge, type badgeVariants } from '@components/Badge'
import type { IUser, UserStatus } from '@/types/user'
import type { VariantProps } from 'class-variance-authority'
import type { AuthRole } from '@/types/auth'
import { getFullName } from '@utils/string'
import ButtonAction from '@components/ButtonAction'
import { LockKeyhole, Send } from 'lucide-react'
import CreateUser from '@pages/dashboard/user/CreateUser'
import EditUser from '@pages/dashboard/user/EditUser'

const variantStatus: Record<
  UserStatus,
  VariantProps<typeof badgeVariants>['variant']
> = {
  active: 'success',
  banned: 'danger',
  inactive: 'info',
}

const variantRole: Record<
  AuthRole,
  VariantProps<typeof badgeVariants>['variant']
> = {
  admin: 'success',
  reader: 'info',
}

const resendActivationService = ({ id }: { id: number }) => {
  return alova.Post<IBaseResponse>(
    `/v1/user/resend/activation/${id}`,
    {},
    {
      name: 'activation-user',
    },
  )
}

const resendForgotPasswordService = ({ id }: { id: number }) => {
  return alova.Post<IBaseResponse>(
    `/v1/user/resend/forgot-password/${id}`,
    {},
    {
      name: 'forgot-password-user',
    },
  )
}

const getAllService = (params: any) => {
  return alova.Get<IBaseResponseList>('/v1/user', {
    params,
    hitSource: /user/,
  })
}

export const columns: ColumnDef<IUser>[] = [
  {
    id: 'increment',
    header: '#',
    cell: ({ row, table }) => {
      const { pageSize, pageIndex } = table.getState().pagination
      return pageSize * (pageIndex - 1) + row.index + 1
    },
  },
  {
    id: 'first_name',
    enableSorting: false,
    accessorKey: 'firstName',
    header: ({ column }) => <ColumnHeader column={column} title='Name' />,
    cell: ({ row }) => {
      const { firstName, lastName } = row.original
      return (
        <div className='capitalize'>{getFullName(firstName, lastName)}</div>
      )
    },
  },
  {
    id: 'email',
    accessorKey: 'email',
    header: ({ column }) => <ColumnHeader column={column} title='Email' />,
  },
  {
    id: 'status',
    accessorKey: 'status',
    header: ({ column }) => <ColumnHeader column={column} title='Status' />,
    cell: ({ row }) => {
      const status = row.getValue<UserStatus>('status')
      return (
        <Badge variant={variantStatus?.[status]}>
          {row.getValue('status')}
        </Badge>
      )
    },
  },
  {
    id: 'role',
    accessorKey: 'role',
    header: ({ column }) => <ColumnHeader column={column} title='Role' />,
    cell: ({ row }) => {
      const role = row.getValue<AuthRole>('role')
      return <Badge variant={variantRole?.[role]}>{row.getValue('role')}</Badge>
    },
  },
  {
    id: 'points',
    accessorKey: 'points',
    header: ({ column }) => <ColumnHeader column={column} title='Points' />,
  },
  {
    id: 'bookCount',
    accessorKey: 'bookCount',
    header: ({ column }) => <ColumnHeader column={column} title='Total Book' />,
  },
  {
    id: 'action',
    enableHiding: false,
    header: 'Action',
    cell: ({ row }) => {
      const { userId, email, role, status } = row.original
      return (
        <div className='space-x-2 whitespace-nowrap'>
          <ButtonAction
            id={userId}
            description={`The user (${email}) will be receive email activation.`}
            icon={<Send className='size-4' />}
            api={resendActivationService}
          />
          <ButtonAction
            id={userId}
            description={`The user (${email}) will be receive email forgot password.`}
            icon={<LockKeyhole className='size-4' />}
            api={resendForgotPasswordService}
          />
          <EditUser id={userId} role={role} status={status} />
        </div>
      )
    },
  },
]

const Component: React.FC = () => {
  return (
    <div className='space-y-8'>
      <Typography as='h1' variant='h2'>
        User
      </Typography>
      <Datatable
        api={getAllService}
        columns={columns}
        titleHeader={{
          first_name: 'Name',
          email: 'Email',
          status: 'Status',
          role: 'Role',
          points: 'Points',
          bookCount: 'Total Book',
        }}
        create={<CreateUser />}
      />
    </div>
  )
}

export { Component as default }
