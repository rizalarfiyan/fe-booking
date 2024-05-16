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

interface IPromiseFilter {
  years: Promise<number[]>
  categories: Promise<ISlugTitle[]>
  books: Promise<IBookCard[]>
}

const Component: React.FC = () => {
  const { years, categories, books } = useLoaderData() as IPromiseFilter

  return (
    <div className='mt-28 mb-20 w-full space-y-16'>
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
            <Suspense fallback='Loading...'>
              <Await resolve={books} errorElement='Error...'>
                {(books) => (
                  <div className='space-y-8'>
                    <div className='flex flex-wrap justify-center gap-4'>
                      {books.map((book: IBookCard, idx: number) => {
                        return <CardBook key={idx} {...book} />
                      })}
                    </div>
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

// Fake data
const categories: ISlugTitle[] = [
  { slug: 'adventure', title: 'Adventure' },
  { slug: 'art', title: 'Art/Photography' },
  { slug: 'autobiography', title: 'Autobiography' },
  { slug: 'biography', title: 'Biography' },
  { slug: 'business', title: 'Business' },
  { slug: 'children', title: "Children's" },
  { slug: 'comedy', title: 'Comedy' },
  { slug: 'comics', title: 'Graphic Novels/Comics' },
  { slug: 'cookbooks', title: 'Cookbooks' },
  { slug: 'crime', title: 'Crime' },
  { slug: 'drama', title: 'Drama' },
  { slug: 'fantasy', title: 'Fantasy' },
  { slug: 'fiction', title: 'Fiction' },
  { slug: 'historical-fiction', title: 'Historical Fiction' },
  { slug: 'horror', title: 'Horror' },
  { slug: 'memoir', title: 'Memoir' },
  { slug: 'mystery', title: 'Mystery' },
  { slug: 'non-fiction', title: 'Non-fiction' },
  { slug: 'philosophy', title: 'Philosophy' },
  { slug: 'poetry', title: 'Poetry' },
  { slug: 'psychology', title: 'Psychology' },
  { slug: 'religion', title: 'Religion/Spirituality' },
  { slug: 'romance', title: 'Romance' },
  { slug: 'science', title: 'Science' },
  { slug: 'science-fiction', title: 'Science Fiction (Sci-Fi)' },
  { slug: 'self-help', title: 'Self-help' },
  { slug: 'suspense', title: 'Suspense' },
  { slug: 'thriller', title: 'Thriller' },
  { slug: 'travel', title: 'Travel' },
]

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
  const sortAscCategories = categories.sort((a, b) => {
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
      resolve(sortAscCategories)
    }, 1000)
  })
}

const fakeBooks = async () => {
  const books = await import('@dummy/books.json').then((res) => res.default)
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve(books)
    }, 1)
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
