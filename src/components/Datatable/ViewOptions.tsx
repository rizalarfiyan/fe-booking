import type { Table } from '@tanstack/react-table'
import { Button } from '@/components/Button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/DropdownMenu'
import { ListChecks } from 'lucide-react'

interface ViewOptionsProps<TData> {
  table: Table<TData>
  titleHeader: Record<string, string>
}

export function ViewOptions<TData>({
  table,
  titleHeader,
}: ViewOptionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          aria-label='Toggle columns'
          variant='outline'
          size='sm'
          className='ml-auto flex h-8'
        >
          <ListChecks className='mr-2 size-4' />
          View
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-40'>
        <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter(
            (column) =>
              typeof column.accessorFn !== 'undefined' && column.getCanHide(),
          )
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className='capitalize'
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(value)}
              >
                <span className='truncate'>
                  {titleHeader?.[column.id] ?? column.id}
                </span>
              </DropdownMenuCheckboxItem>
            )
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
