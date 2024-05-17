import React from 'react'
import { Typography } from '@components/Typograpy'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/Table'
import { Badge, type badgeVariants } from '@components/Badge'
import type { IHistoryBook } from '@/types/data'
import { Card } from '@components/Card'
import { Link } from 'react-router-dom'
import { BOOK_HISTORY_TYPE } from '@/constants/books'
import { parseDate } from '@utils/date'
import { DATETIME_FORMAT } from '@/constants/app'
import type { VariantProps } from 'class-variance-authority'
import type { BookHistoryType } from '@/types/book'
import { getHistoryType } from '@utils/dashboard'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@components/DropdownMenu'
import { Button } from '@components/Button'
import { EllipsisVertical } from 'lucide-react'

interface DashboardTableProps {
  data: IHistoryBook[]
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

const DashboardTable: React.FC<DashboardTableProps> = ({ data }) => {
  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Borrow</TableHead>
            <TableHead>Return</TableHead>
            <TableHead>Point</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map(
            ({ slug, title, isbn, point, returnAt, borrowAt, status }) => {
              const state = getHistoryType(status)
              return (
                <TableRow key={isbn}>
                  <TableCell>
                    <Link to={`/book/${slug}`}>
                      <Typography
                        as='h2'
                        className='line-clamp-2 w-96 text-xl md:w-full'
                      >
                        {title}
                      </Typography>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Badge variant='outline' className='whitespace-nowrap'>
                      {parseDate(borrowAt, DATETIME_FORMAT.date)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={state.isSuccess ? 'success' : 'outline'}
                      className='whitespace-nowrap'
                    >
                      {parseDate(returnAt ?? '', DATETIME_FORMAT.date)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {status === BOOK_HISTORY_TYPE.SUCCESS && (
                      <Badge variant='success'>+{point}</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant={variantStatus?.[status] ?? 'outline'}>
                      {status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {(state.isSuccess || state.isPending) && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            size='icon'
                            variant='outline'
                            className='size-8'
                          >
                            <EllipsisVertical className='size-4' />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          {state.isPending && (
                            <DropdownMenuItem>Cancel</DropdownMenuItem>
                          )}
                          {state.isSuccess && (
                            <DropdownMenuItem>Rating</DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </TableCell>
                </TableRow>
              )
            },
          )}
        </TableBody>
      </Table>
    </Card>
  )
}

export { DashboardTable }
