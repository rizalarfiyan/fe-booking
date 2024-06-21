import React, { useMemo } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/Select'
import { useSearchParams } from 'react-router-dom'
import { BOOK_ORDER_BY, DEFAULT_BOOK_ORDER_BY } from '@/constants/books'
import { validateArr } from '@utils/check'

const FilterSorting: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const queryOrderBy = searchParams.get('orderBy')
  const orderBy = useMemo(() => {
    return validateArr(
      queryOrderBy,
      BOOK_ORDER_BY.map((val) => val.slug),
      DEFAULT_BOOK_ORDER_BY,
    )
  }, [queryOrderBy])

  const onChange = (val: string) => {
    setSearchParams((prev) => {
      prev.set('orderBy', val)
      return prev
    })
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
