import type { ISlugTitle } from '@/types/base'
import { Accordion } from '@components/Accordion'
import FilterCategory from '@components/Filter/Category'
import FilterRating from '@components/Filter/Rating'
import FilterSearch from '@components/Filter/Search'
import FilterSorting from '@components/Filter/Sorting'
import FilterYear from '@components/Filter/Year'
import React, { Suspense } from 'react'
import { Await, defer, useLoaderData } from 'react-router-dom'
import CardBook from '@components/Card/Book'
import type { IBookCard } from '@/types/data'
import { TitleDescription } from '@components/TitleDescription'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@components/Pagination'
import { Skeleton } from '@components/Skeleton'

interface IPromiseFilter {
  years: Promise<number[]>
  categories: Promise<ISlugTitle[]>
  books: Promise<IBookCard[]>
}

const Component: React.FC = () => {
  const { years, categories, books } = useLoaderData() as IPromiseFilter

  return (
    <div className='container mt-28 mb-20 w-full space-y-16'>
      <TitleDescription
        title='All Books'
        description='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur explicabo laudantium quisquam suscipit totam.'
      />
      <div className='flex flex-col items-center gap-6 1100w:flex-row 1100w:items-start'>
        <div className='w-full max-w-lg space-y-4 1100w:w-80'>
          <Accordion type='multiple' className='w-full'>
            <FilterRating />
            <FilterYear years={years} />
            <FilterCategory categories={categories} />
          </Accordion>
        </div>
        <div className='w-full space-y-8'>
          <div className='mx-auto flex max-w-lg flex-col items-center justify-between gap-4 1100w:max-w-full sm:flex-row'>
            <FilterSearch />
            <FilterSorting />
          </div>
          <div className=''>
            <Suspense
              fallback={
                <div className='space-y-10'>
                  <div className='flex flex-wrap justify-center gap-4'>
                    {Array.from({ length: 8 }, (_, idx) => {
                      return (
                        <Skeleton key={idx} className='h-72 w-full max-w-60' />
                      )
                    })}
                  </div>
                  <div className='flex justify-center gap-2'>
                    <Skeleton className='h-10 w-28' />
                    {Array.from({ length: 4 }, (_, idx) => {
                      return <Skeleton key={idx} className='h-10 w-16' />
                    })}
                    <Skeleton className='h-10 w-28' />
                  </div>
                </div>
              }
            >
              <Await resolve={books} errorElement='Error...'>
                {(books) => (
                  <div className='space-y-16'>
                    <div className='flex flex-wrap justify-center gap-4'>
                      {books.map((book: IBookCard, idx: number) => {
                        return <CardBook key={idx} {...book} />
                      })}
                    </div>
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious />
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink isActive>1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink>2</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink>3</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink>80</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink>81</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationNext />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}
              </Await>
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}

const fakeYears = async () => {
  const years: number[] = []
  for (let year = new Date().getFullYear(); year >= 1990; year--) {
    years.push(year)
  }

  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve(years)
    }, 750)
  })
}

const fakeCategories = async () => {
  const rawCategories = await import('@dummy/category.json').then(
    (res) => res.default,
  )
  const categories = rawCategories.sort((a, b) => {
    if (a.slug < b.slug) {
      return -1
    }
    if (a.slug > b.slug) {
      return 1
    }
    return 0
  })

  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve(categories)
    }, 1000)
  })
}

const fakeBooks = async () => {
  const books = await import('@dummy/books.json').then((res) => res.default)
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve(books)
    }, 1500)
  })
}

const loader = async () => {
  return defer({
    years: fakeYears(),
    categories: fakeCategories(),
    books: fakeBooks(),
  })
}

export { Component as default, loader }
