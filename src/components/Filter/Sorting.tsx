import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/Select'
import { BOOK_ORDER_BY, DEFAULT_BOOK_ORDER_BY } from '@/constants'
import { useSearchParams } from 'react-router-dom'

const FilterSorting: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const orderBy = searchParams.get('orderBy') ?? DEFAULT_BOOK_ORDER_BY
  const onChange = (val: string) => {
    setSearchParams((prev) => {
      prev.set('orderBy', val)
      return prev
    })
    console.log('order by: ', val)
  }

  return (
    <Select defaultValue={orderBy} onValueChange={onChange}>
      <SelectTrigger className='w-[180px]'>
        <SelectValue placeholder='Order By' />
      </SelectTrigger>
      <SelectContent>
        {BOOK_ORDER_BY.map(({ slug, title }) => (
          <SelectItem key={slug} value={slug}>
            {title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default FilterSorting
