import React from 'react'
import type { ColumnDef } from '@tanstack/react-table'
import type { IBaseResponseList } from '@/types/base'
import alova from '@libs/alova'
import Datatable from '@components/Datatable'
import { Badge, type badgeVariants } from '@components/Badge'
import { formatDate } from '@utils/date'
import type { IHistory } from '@/types/history'
import { DATETIME_FORMAT } from '@/constants/app'
import { BOOK_HISTORY_TYPE } from '@/constants/books'
import type { BookHistoryType } from '@/types/book'
import type { VariantProps } from 'class-variance-authority'
import DatatableAction from '@pages/dashboard/borrow/DatatableAction'

const getAllService = (params: any) => {
  return alova.Get<IBaseResponseList>('/v1/history', {
    params,
    hitSource: /history/,
  })
}

const variantStatus: Record<
  BookHistoryType,
  VariantProps<typeof badgeVariants>['variant']
> = {
  success: 'success',
  cancel: 'danger',
  pending: 'outline',
  read: 'info',
}

export const columns: ColumnDef<IHistory>[] = [
  {
    id: 'increment',
    header: '#',
    cell: ({ row, table }) => {
      const { pageSize, pageIndex } = table.getState().pagination
      return pageSize * (pageIndex - 1) + row.index + 1
    },
  },
  {
    id: 'title',
    accessorKey: 'title',
    header: 'Title',
  },
  {
    id: 'borrow_at',
    accessorKey: 'borrowAt',
    header: 'Borrow',
    cell: ({ row }) => {
      const { borrowAt } = row.original
      if (!borrowAt) return ''
      return (
        <Badge variant='outline' className='whitespace-nowrap'>
          {formatDate(borrowAt, DATETIME_FORMAT.date)}
        </Badge>
      )
    },
  },
  {
    id: 'returned_at',
    accessorKey: 'returnedAt',
    header: 'Return',
    cell: ({ row }) => {
      const { returnAt, returnedAt } = row.original
      return (
        <Badge variant={returnedAt ? 'success' : 'secondary'}>
          {formatDate(returnedAt || returnAt)}
        </Badge>
      )
    },
  },
  {
    id: 'point',
    accessorKey: 'point',
    header: 'Point',
    cell: ({ row }) => {
      if (row.original.status !== BOOK_HISTORY_TYPE.SUCCESS) return ''
      return <Badge variant='success'>+{row.original.point}</Badge>
    },
  },
  {
    id: 'status',
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.status as BookHistoryType
      return (
        <Badge variant={variantStatus?.[status] ?? 'outline'}>{status}</Badge>
      )
    },
  },
  {
    id: 'action',
    enableHiding: false,
    header: 'Action',
    cell: ({ row }) => {
      return <DatatableAction history={row.original} />
    },
  },
]

const DashboardTable: React.FC = () => {
  return (
    <Datatable api={getAllService} columns={columns} hideHeader hideFooter />
  )
}

export default DashboardTable
