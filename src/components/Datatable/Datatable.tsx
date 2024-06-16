import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import * as React from 'react'
import { useMemo } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/Table'
import Paginator from '@/components/Paginator'
import { useSearchParams } from 'react-router-dom'
import { type AlovaMethodHandler, useWatcher } from 'alova'
import type { IBaseResponseList } from '@/types/base'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/Select'
import ViewOptions from './ViewOptions'
import Search from './Search'
import { DatatableContext } from './context'

interface DatatableProps {
  columns: ColumnDef<any, any>[]
  api: AlovaMethodHandler<
    any,
    unknown,
    IBaseResponseList,
    unknown,
    any,
    Response,
    Headers
  >
  defaultOrderBy?: string
  defaultOrderType?: 'asc' | 'desc'
  titleHeader?: Record<string, string>
  create?: React.ReactElement
}

const Datatable: React.FC<DatatableProps> = ({
  api,
  columns,
  defaultOrderBy = 'created_at',
  defaultOrderType = 'asc',
  titleHeader = {},
  create,
}) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const queryPage = searchParams.get('page') ?? undefined
  const count = searchParams.get('count') ?? undefined
  const orderBy = searchParams.get('orderBy') ?? undefined
  const orderType = searchParams.get('orderType') ?? undefined
  const querySearch = searchParams.get('search') ?? undefined

  const payload = useMemo(() => {
    return {
      page: queryPage,
      count: count,
      orderBy: orderBy,
      orderType: orderType,
      search: querySearch,
    }
  }, [queryPage, count, orderBy, orderType, querySearch])

  const { data: rawData, send: resend } = useWatcher(
    () => api(payload),
    [payload],
    {
      immediate: true,
      initialData: {
        data: {
          content: [],
          metadata: {
            total: 0,
            page: 0,
            perPage: 0,
            totalPage: 0,
          },
        },
        message: 'Processing',
        status: 200,
      },
    },
  )

  const data = (rawData as IBaseResponseList).data
  const { page, totalPage, perPage, total } = data.metadata
  const table = useReactTable({
    data: data.content,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    enableRowSelection: false,
    manualPagination: true,
    manualSorting: true,
    state: {
      sorting: [
        {
          id: orderBy || defaultOrderBy,
          desc: (orderType || defaultOrderType).toLowerCase() === 'desc',
        },
      ],
      pagination: {
        pageSize: perPage,
        pageIndex: page,
      },
    },
  })

  // biome-ignore lint/correctness/useExhaustiveDependencies: Resend is not depends
  const contextValue = useMemo(() => {
    return {
      refresh: () => {
        resend(payload)
      },
    }
  }, [payload])

  return (
    <DatatableContext.Provider value={contextValue}>
      <div className='w-full'>
        <div className='mb-4 flex items-center justify-center gap-2'>
          <div className='w-full'>
            <Search />
          </div>
          <div className='flex w-full items-center justify-end gap-2'>
            {create}
            <ViewOptions table={table} titleHeader={titleHeader} />
          </div>
        </div>
        <div className='rounded-md border'>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className='h-24 flex-auto'
                  >
                    <div className='flex justify-center'>No results</div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className='flex flex-wrap items-center justify-center gap-4 space-x-2 py-4 xl:justify-between'>
          <div className='flex items-center space-x-2'>
            <p className='whitespace-nowrap font-medium text-sm'>
              Rows per page
            </p>
            <Select
              value={`${perPage}`}
              onValueChange={(value) => {
                setSearchParams((prev) => {
                  prev.set('count', value)
                  return prev
                })
              }}
            >
              <SelectTrigger className='h-8 w-[4.5rem]'>
                <SelectValue placeholder={perPage} />
              </SelectTrigger>
              <SelectContent side='top'>
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className='flex text-muted-foreground text-sm'>
            Page {page} of {totalPage} ({total} items)
          </div>
          <div className='flex justify-end'>
            <Paginator
              currentPage={page ?? 1}
              totalPages={totalPage}
              onPageChange={(pageNumber) =>
                setSearchParams((prev) => {
                  prev.set('page', `${pageNumber}`)
                  return prev
                })
              }
              showPreviousNext
            />
          </div>
        </div>
      </div>
    </DatatableContext.Provider>
  )
}

export default Datatable
