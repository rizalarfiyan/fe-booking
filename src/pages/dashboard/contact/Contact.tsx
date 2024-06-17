import React from 'react'
import { Typography } from '@components/Typograpy'
import type { ColumnDef } from '@tanstack/react-table'
import type { IBaseResponseList } from '@/types/base'
import alova from '@libs/alova'
import type { IContact } from '@/types/contact'
import { getFullName } from '@utils/string'
import { parseDate } from '@utils/date'
import { Badge } from '@components/Badge'
import Datatable, { ColumnHeader } from '@components/Datatable'
import ContactDetail from '@pages/dashboard/contact/ContactDetail'
import { DATETIME_FORMAT } from '@/constants/app'

export const columns: ColumnDef<IContact>[] = [
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
    id: 'phone',
    accessorKey: 'phone',
    header: ({ column }) => <ColumnHeader column={column} title='Phone' />,
  },
  {
    id: 'created_at',
    accessorKey: 'submittedAt',
    header: ({ column }) => (
      <ColumnHeader column={column} title='Submitted At' />
    ),
    cell: ({ row }) => {
      return (
        <Badge variant='secondary'>
          {parseDate(row.original.submittedAt, DATETIME_FORMAT.datetime)}
        </Badge>
      )
    },
  },
  {
    id: 'message',
    enableHiding: false,
    header: 'Message',
    cell: ({ row }) => {
      return <ContactDetail contactId={row.original.contactId} />
    },
  },
]

const getAll = (params: any) => {
  return alova.Get<IBaseResponseList>('/v1/contact', {
    params,
    hitSource: /contact/,
  })
}

const Component: React.FC = () => {
  return (
    <div className='space-y-8'>
      <Typography as='h1' variant='h2'>
        Contact
      </Typography>
      <Datatable
        api={getAll}
        columns={columns}
        titleHeader={{
          first_name: 'Name',
          email: 'Email',
          phone: 'Phone',
          created_at: 'Submitted At',
        }}
      />
    </div>
  )
}

export { Component as default }
