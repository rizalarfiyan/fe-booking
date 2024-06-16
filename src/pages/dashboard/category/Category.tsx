import React, { useRef } from 'react'
import { Typography } from '@components/Typograpy'
import type { ColumnDef } from '@tanstack/react-table'
import type { IBaseResponseList } from '@/types/base'
import alova from '@libs/alova'
import type { IContact } from '@/types/contact'
import Datatable, {
  type DatatableHandle,
} from '@components/Datatable/Datatable'
import ColumnHeader from '@components/Datatable/ColumnHeader'
import { Badge } from '@components/Badge'
import { parseDate } from '@utils/date'
import CreateCategory from '@pages/dashboard/category/CreateCategory'

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
    id: 'name',
    accessorKey: 'name',
    header: ({ column }) => <ColumnHeader column={column} title='Name' />,
  },
  {
    id: 'slug',
    accessorKey: 'slug',
    header: ({ column }) => <ColumnHeader column={column} title='Slug' />,
  },
  {
    id: 'created_at',
    accessorKey: 'createdAt',
    header: ({ column }) => <ColumnHeader column={column} title='Created At' />,
    cell: ({ row }) => {
      return (
        <Badge variant='secondary'>{parseDate(row.original.submittedAt)}</Badge>
      )
    },
  },
  {
    id: 'action',
    enableHiding: false,
    header: 'Action',
    cell: () => {
      return <div className='space-y-2'>action</div>
    },
  },
]

const Component: React.FC = () => {
  const ref = useRef<DatatableHandle>(null)
  const refresh = () => {
    ref.current?.refresh()
  }

  return (
    <div className='space-y-8'>
      <Typography as='h1' variant='h2'>
        Category
      </Typography>
      <button
        type='button'
        onClick={(e) => {
          e.preventDefault()
          ref.current?.refresh()
        }}
      >
        woke
      </button>
      <Datatable
        ref={ref}
        api={(params) =>
          alova.Get<IBaseResponseList>('/v1/category', {
            params,
            hitSource: ['create-category'],
          })
        }
        columns={columns}
        titleHeader={{
          name: 'Name',
          slug: 'Slug',
          created_at: 'Created At',
        }}
        create={<CreateCategory refresh={refresh} />}
      />
    </div>
  )
}

export { Component as default }
