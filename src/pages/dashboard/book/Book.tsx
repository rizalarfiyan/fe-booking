import React from 'react'
import { Typography } from '@components/Typograpy'
import type { ColumnDef } from '@tanstack/react-table'
import type { IBaseResponse, IBaseResponseList } from '@/types/base'
import alova from '@libs/alova'
import Datatable, { ColumnHeader } from '@components/Datatable'
import { Badge } from '@components/Badge'
import { parseDate } from '@utils/date'
import type { IBookAll } from '@/types/book'
import { BookCopy, BookUser, Eye, Pencil, Plus, Star } from 'lucide-react'
import { Button } from '@components/Button'
import { Link } from 'react-router-dom'
import DeleteAction from '@components/Datatable/DeleteAction'
import UpdateBookStock from '@pages/dashboard/book/UpdateBookStock'

const deleteService = (id: number, isRestore = false) => {
  return alova.Delete<IBaseResponse>(
    `/v1/book/${id}`,
    {
      isRestore,
    },
    {
      name: 'delete-book',
    },
  )
}

const getAllService = (params: any) => {
  return alova.Get<IBaseResponseList>('/v1/book', {
    params,
    hitSource: /book/,
  })
}

export const columns: ColumnDef<IBookAll>[] = [
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
    header: ({ column }) => <ColumnHeader column={column} title='Name' />,
    cell: ({ row }) => {
      return (
        <div className='flex items-center justify-start gap-4'>
          <div className='aspect-[3/4] h-full w-full max-w-24 overflow-hidden rounded-md'>
            <img
              src={row.original.image}
              alt={row.getValue('title')}
              className='h-full w-full object-cover'
            />
          </div>
          <Typography
            as='h3'
            className='line-clamp-3 max-w-80 font-semibold text-lg'
          >
            {row.getValue('title')}
          </Typography>
        </div>
      )
    },
  },
  {
    id: 'rating',
    accessorKey: 'rating',
    header: ({ column }) => <ColumnHeader column={column} title='Rating' />,
    cell: ({ row }) => {
      return (
        <div className='flex items-center gap-1.5'>
          <Star className='size-5 text-orange-500' />
          <Typography as='span' className='font-semibold text-lg'>
            {row.getValue('rating')}
          </Typography>
        </div>
      )
    },
  },
  {
    id: 'stock',
    accessorKey: 'stock',
    header: ({ column }) => <ColumnHeader column={column} title='Stock' />,
    cell: ({ row }) => {
      return (
        <div className='flex items-center gap-1.5'>
          <BookCopy className='size-5 text-slate-500' />
          <Typography as='span' className='font-semibold text-lg'>
            {row.getValue('stock')}
          </Typography>
        </div>
      )
    },
  },
  {
    id: 'borrowed',
    accessorKey: 'borrowed',
    header: ({ column }) => <ColumnHeader column={column} title='Borrowed' />,
    cell: ({ row }) => {
      return (
        <div className='flex items-center gap-1.5'>
          <BookUser className='size-5 text-slate-500' />
          <Typography as='span' className='font-semibold text-lg'>
            {row.getValue('rating')}
          </Typography>
        </div>
      )
    },
  },
  {
    id: 'published_at',
    accessorKey: 'publishedAt',
    header: ({ column }) => (
      <ColumnHeader column={column} title='Published At' />
    ),
    cell: ({ row }) => {
      return (
        <Badge variant='secondary'>{parseDate(row.original.publishedAt)}</Badge>
      )
    },
  },
  {
    id: 'action',
    enableHiding: false,
    header: 'Action',
    cell: ({ row }) => {
      const { bookId, deletedAt } = row.original
      const isDeleted = !!deletedAt
      return (
        <div className='space-x-2 whitespace-nowrap'>
          {!isDeleted && (
            <>
              <Button size='icon' variant='outline' className='size-8' asChild>
                <Link to={`/book/${row.original.slug}`}>
                  <Eye className='size-4' />
                </Link>
              </Button>
              <UpdateBookStock bookId={bookId} />
              <Button size='icon' variant='outline' className='size-8' asChild>
                <Link to={`/dashboard/book/edit/${row.original.bookId}`}>
                  <Pencil className='size-4' />
                </Link>
              </Button>
            </>
          )}
          <DeleteAction
            id={bookId}
            isRestore={isDeleted}
            api={deleteService}
            name='book'
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
        Book
      </Typography>
      <Datatable
        api={getAllService}
        columns={columns}
        titleHeader={{
          title: 'Title',
          rating: 'Rating',
          stock: 'Stock',
          borrow: 'Borrow',
          published_at: 'Published At',
        }}
        create={
          <Button
            variant='outline'
            leftIcon={<Plus className='mr-2 size-4' />}
            asChild
          >
            <Link to='/dashboard/book/create'>Create</Link>
          </Button>
        }
      />
    </div>
  )
}

export { Component as default }
