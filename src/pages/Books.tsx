import React from 'react'
import { Typography } from '@components/Typograpy'
import { Accordion } from '@components/Accordion'
import { LayoutGrid, LayoutList } from 'lucide-react'
import { defer, useLoaderData } from 'react-router-dom'
import type { ISlugTitle } from '@/types/base'
import { ToggleGroup, ToggleGroupItem } from '@components/ToggleGroup'
import FilterCategory from '@components/Filter/Category'
import FilterYear from '@components/Filter/Year'
import FilterSearch from '@components/Filter/Search'
import FilterRating from '@components/Filter/Rating'
import FilterSorting from '@components/Filter/Sorting'

interface IPromiseFilter {
  years: Promise<number[]>
  categories: Promise<ISlugTitle[]>
}

const Component: React.FC = () => {
  const { years, categories } = useLoaderData() as IPromiseFilter

  return (
    <div className='w-full space-y-4'>
      <Typography as='h1' variant='h2'>
        All Books
      </Typography>
      <div className='flex gap-6'>
        <div className='w-80 space-y-4'>
          <FilterSearch />
          <Accordion type='multiple' className='w-full'>
            <FilterRating />
            <FilterYear years={years} />
            <FilterCategory categories={categories} />
          </Accordion>
        </div>
        <div className='w-full space-y-4'>
          <div className='flex items-center justify-between'>
            <FilterSorting />
            <ToggleGroup
              type='single'
              variant='outline'
              defaultValue='grid'
              className='space-x-1'
            >
              <ToggleGroupItem value='grid' aria-label='Toggle Grid'>
                <LayoutGrid className='size-5' />
              </ToggleGroupItem>
              <ToggleGroupItem value='list' aria-label='Toggle List'>
                <LayoutList className='size-5' />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
          <div className='border'>books</div>
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
    }, 10)
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
    }, 10)
  })
}

const loader = async () => {
  return defer({
    years: fakeYears(),
    categories: fakeCategories(),
  })
}

export { Component as default, loader }
