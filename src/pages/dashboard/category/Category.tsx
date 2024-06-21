import React from 'react'
import { Typography } from '@components/Typograpy'
import type { ColumnDef } from '@tanstack/react-table'
import type { IBaseResponse, IBaseResponseList } from '@/types/base'
import alova from '@libs/alova'
import type { ICategory } from '@/types/category'
import Datatable, { ColumnHeader } from '@components/Datatable'
import { Badge } from '@components/Badge'
import { parseDate } from '@utils/date'
import CreateCategory from '@pages/dashboard/category/CreateCategory'
import EditCategory from '@pages/dashboard/category/EditCategory'
import DeleteAction from '@components/Datatable/DeleteAction'

const deleteService = (id: number, isRestore = false) => {
  return alova.Delete<IBaseResponse>(
    `/v1/category/${id}`,
    {
      isRestore,
    },
    {
      name: 'delete-category',
    },
  )
}

const getAllService = (params: any) => {
  return alova.Get<IBaseResponseList>('/v1/category', {
    params,
    hitSource: /category/,
  })
}

export const columns: ColumnDef<ICategory>[] = [
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
        <Badge variant='secondary'>{parseDate(row.original.createdAt)}</Badge>
      )
    },
  },
  {
    id: 'action',
    enableHiding: false,
    header: 'Action',
    cell: ({ row }) => {
      const { categoryId, deletedAt } = row.original
      const isDeleted = !!deletedAt
      return (
        <div className='space-x-2'>
          {!isDeleted && <EditCategory categoryId={categoryId} />}
          <DeleteAction
            id={categoryId}
            isRestore={isDeleted}
            api={deleteService}
            name='category'
          />
        </div>
      )
    },
  },
]

const Component: React.FC = () => {
  return (
    <div className='space-y-8'>
      <Typography as='h1' variant='h2'>
        Category
      </Typography>
      <Datatable
        api={getAllService}
        columns={columns}
        titleHeader={{
          name: 'Name',
          slug: 'Slug',
          created_at: 'Created At',
        }}
        create={<CreateCategory />}
      />
    </div>
  )
}

export { Component as default }
