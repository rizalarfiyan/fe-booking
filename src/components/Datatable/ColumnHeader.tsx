import { ArrowDown, ArrowDownUp, ArrowUp, EyeOff } from 'lucide-react'
import type { Column } from '@tanstack/react-table'
import { Button } from '@/components/Button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/DropdownMenu'
import { cn } from '@utils/classes'
import React from 'react'
import { useSearchParams } from 'react-router-dom'

interface ColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
}

export default function ColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: ColumnHeaderProps<TData, TValue>) {
  const [, setSearchParams] = useSearchParams()

  if (!column.getCanSort() && !column.getCanHide()) {
    return <div className={cn(className)}>{title}</div>
  }

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            aria-label={
              column.getIsSorted() === 'desc'
                ? 'Sorted descending. Click to sort ascending.'
                : column.getIsSorted() === 'asc'
                  ? 'Sorted ascending. Click to sort descending.'
                  : 'Not sorted. Click to sort ascending.'
            }
            variant='ghost'
            size='sm'
            className='-ml-3 h-8 data-[state=open]:bg-accent'
          >
            <span>{title}</span>
            {column.getCanSort() && column.getIsSorted() === 'desc' ? (
              <ArrowDown className='ml-2 size-4' aria-hidden='true' />
            ) : column.getIsSorted() === 'asc' ? (
              <ArrowUp className='ml-2 size-4' aria-hidden='true' />
            ) : column.getCanSort() ? (
              <ArrowDownUp className='ml-2 size-4' aria-hidden='true' />
            ) : null}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='start'>
          {column.getCanSort() && (
            <>
              <DropdownMenuItem
                aria-label='Sort ascending'
                onClick={() => {
                  column.toggleSorting(false)
                  setSearchParams((prev) => {
                    prev.set('orderBy', column.id)
                    prev.set('orderType', 'asc')
                    return prev
                  })
                }}
              >
                <ArrowUp
                  className='mr-2 size-3.5 text-muted-foreground/70'
                  aria-hidden='true'
                />
                Asc
              </DropdownMenuItem>
              <DropdownMenuItem
                aria-label='Sort descending'
                onClick={() => {
                  column.toggleSorting(true)
                  setSearchParams((prev) => {
                    prev.set('orderBy', column.id)
                    prev.set('orderType', 'desc')
                    return prev
                  })
                }}
              >
                <ArrowDown
                  className='mr-2 size-3.5 text-muted-foreground/70'
                  aria-hidden='true'
                />
                Desc
              </DropdownMenuItem>
            </>
          )}
          {column.getCanSort() && column.getCanHide() && (
            <DropdownMenuSeparator />
          )}
          {column.getCanHide() && (
            <DropdownMenuItem
              aria-label='Hide column'
              onClick={() => column.toggleVisibility(false)}
            >
              <EyeOff
                className='mr-2 size-3.5 text-muted-foreground/70'
                aria-hidden='true'
              />
              Hide
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
