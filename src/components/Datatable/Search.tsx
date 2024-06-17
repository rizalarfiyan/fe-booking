import React, { useEffect, useRef, useState } from 'react'
import useDebounce from '@hooks/useDebounce'
import { useSearchParams } from 'react-router-dom'
import { Input } from '@components/Input'
import { Search as SearchIcon } from 'lucide-react'

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState<string>('')
  const searchDebounce = useDebounce(search, 1000)
  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    // normalize the search value
    setSearch(e.target.value)
  }

  const ref = useRef(true)
  const deleteSearch = () => {
    setSearchParams((prev) => {
      prev.delete('search')
      return prev
    })
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: setSearchParams is not depends
  useEffect(() => {
    const current = searchParams.get('search')
    if (ref.current) {
      if (current && current !== '') {
        setSearch(decodeURIComponent(current))
      } else {
        deleteSearch()
      }
      ref.current = false
      return
    }

    if (searchDebounce === '' && current) return deleteSearch()

    setSearchParams((prev) => {
      prev.set('search', encodeURIComponent(searchDebounce))
      return prev
    })
  }, [searchDebounce])

  return (
    <Input
      type='text'
      placeholder='Search...'
      parentClassName='w-full sm:w-auto max-w-[20rem]'
      icon={SearchIcon}
      value={search}
      onChange={onSearchChange}
    />
  )
}
