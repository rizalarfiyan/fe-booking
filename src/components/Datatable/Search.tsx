import React, { useEffect, useState } from 'react'
import useDebounce from '@hooks/useDebounce'
import { useSearchParams } from 'react-router-dom'
import { Input } from '@components/Input'
import { Search as SearchIcon } from 'lucide-react'

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState<string>('')
  const searchDebounce = useDebounce(search, 1000)
  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: setSearchParams is not depends
  useEffect(() => {
    if (searchDebounce === '') {
      if (searchParams.get('search')) {
        setSearchParams((prev) => {
          prev.delete('search')
          return prev
        })
      }
      return
    }

    setSearchParams((prev) => {
      prev.set('search', searchDebounce)
      return prev
    })
  }, [searchDebounce])

  return (
    <Input
      type='text'
      placeholder='Search...'
      parentClassName='w-full sm:w-auto max-w-[20rem]'
      icon={SearchIcon}
      onChange={onSearchChange}
    />
  )
}
