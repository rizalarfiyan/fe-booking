import type { IBaseResponse } from '@/types/base'
import { Accordion } from '@components/Accordion'
import FilterRating from '@components/Filter/Rating'
import FilterSorting from '@components/Filter/Sorting'
import React, { useMemo } from 'react'
import { defer, useLoaderData, useSearchParams } from 'react-router-dom'
import { TitleDescription } from '@components/TitleDescription'
import alova from '@libs/alova'
import type { BookFilter } from '@/types/book'
import FilterYearCategory from '@components/Filter/YearCategory'
import BookList from '@components/Book/List'
import Search from '@components/Datatable/Search'

interface IPromiseFilter {
  filter: Promise<BookFilter>
}

const Component: React.FC = () => {
  const { filter } = useLoaderData() as IPromiseFilter
  const [searchParams] = useSearchParams()
  const hasRating = searchParams.has('rating')
  const hasYear = searchParams.has('year')
  const hasCategoryId = searchParams.has('categoryId')

  const defaultOpened = useMemo(() => {
    const opened = []
    if (hasRating) opened.push('rating')
    if (hasYear) opened.push('year')
    if (hasCategoryId) opened.push('category')
    return opened
  }, [hasRating, hasYear, hasCategoryId])

  return (
    <div className='container mt-28 mb-20 w-full space-y-16'>
      <TitleDescription
        title='All Books'
        description='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur explicabo laudantium quisquam suscipit totam.'
      />
      <div className='flex flex-col items-center gap-6 1100w:flex-row 1100w:items-start'>
        <div className='w-full max-w-lg space-y-4 1100w:w-80'>
          <Accordion
            type='multiple'
            className='w-full'
            defaultValue={defaultOpened}
          >
            {/* TODO: update rating with backend */}
            <FilterRating />
            <FilterYearCategory filter={filter} />
          </Accordion>
        </div>
        <div className='w-full space-y-8'>
          <div className='mx-auto flex max-w-lg flex-col items-center justify-between gap-4 1100w:max-w-full sm:flex-row'>
            <Search />
            <FilterSorting />
          </div>
          <BookList />
        </div>
      </div>
    </div>
  )
}

const loader = async () => {
  return defer({
    filter: await alova
      .Get<IBaseResponse<BookFilter>>('/v1/book/filter')
      .then((res) => res.data),
  })
}

export { Component as default, loader }
