import React, { Suspense, useEffect } from 'react'
import { Typography } from '@components/Typograpy'
import { Input } from '@components/Input'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@components/Accordion'
import { LayoutGrid, LayoutList, Search } from 'lucide-react'
import { RadioGroup, RadioGroupItem } from '@components/RadioGroup'
import { Label } from '@components/Label'
import { ScrollArea } from '@components/ScrollArea'
import { Await, defer, useLoaderData, useSearchParams } from 'react-router-dom'
import type { ISlugTitle } from '@/types/base'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/Select'
import { BOOK_ORDER_BY, DEFAULT_BOOK_ORDER_BY } from '@/constants'
import { ToggleGroup, ToggleGroupItem } from '@components/ToggleGroup'

interface IPromiseFilter {
  years: Promise<number[]>
  categories: Promise<ISlugTitle[]>
}

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

const Component: React.FC = () => {
  const { years, categories } = useLoaderData() as IPromiseFilter
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    console.log('params: ', searchParams)
  }, [searchParams])

  return (
    <div className='w-full space-y-4'>
      <Typography as='h1' variant='h2'>
        All Books
      </Typography>
      <div className='flex gap-6'>
        <div className='w-80 space-y-4'>
          <Input type='text' placeholder='Title, Author, ISBN' icon={Search} />
          <Accordion type='multiple' className='w-full'>
            <AccordionItem value='rating'>
              <AccordionTrigger>Rating</AccordionTrigger>
              <AccordionContent>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Commodi, omnis?
              </AccordionContent>
            </AccordionItem>
            <Suspense fallback='loading....'>
              <Await resolve={years} errorElement={<div>Error</div>}>
                {(years) => (
                  <AccordionItem value='year'>
                    <AccordionTrigger>Tahun</AccordionTrigger>
                    <AccordionContent>
                      <ScrollArea className='h-80 rounded-md' type='always'>
                        <RadioGroup
                          className='flex flex-wrap items-center justify-center bg-slate-50 p-3 pr-5 dark:bg-slate-900'
                          defaultValue={searchParams.get('year') ?? undefined}
                          onValueChange={(val) => {
                            setSearchParams((prev) => {
                              prev.set('year', val)
                              return prev
                            })
                            console.log('year change: ', val)
                          }}
                        >
                          {(years ?? []).map((year: number) => {
                            const key = `year-${year}`
                            return (
                              <div key={year} className='relative'>
                                <RadioGroupItem
                                  value={year.toString()}
                                  id={key}
                                  className='peer sr-only'
                                />
                                <Label
                                  htmlFor={key}
                                  className='flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-3 [&:has([data-state=checked])]:border-primary peer-data-[state=checked]:border-primary hover:bg-accent hover:text-accent-foreground'
                                >
                                  {year}
                                </Label>
                              </div>
                            )
                          })}
                        </RadioGroup>
                      </ScrollArea>
                    </AccordionContent>
                  </AccordionItem>
                )}
              </Await>
            </Suspense>
            <Suspense fallback='loading....'>
              <Await resolve={categories} errorElement={<div>Error</div>}>
                {(categories) => (
                  <AccordionItem value='category' className='border-none'>
                    <AccordionTrigger>Category</AccordionTrigger>
                    <AccordionContent>
                      <ScrollArea className='h-96 rounded-md' type='always'>
                        <RadioGroup
                          defaultValue={
                            searchParams.get('category') ?? undefined
                          }
                          className='flex flex-col bg-slate-50 p-3 pr-5 dark:bg-slate-900'
                          onValueChange={(val) => {
                            setSearchParams((prev) => {
                              prev.set('category', val)
                              return prev
                            })
                            console.log('category change: ', val)
                          }}
                        >
                          {(categories ?? []).map(
                            ({ slug, title }: ISlugTitle) => {
                              const key = `category-${slug}`
                              return (
                                <div key={key} className='relative'>
                                  <RadioGroupItem
                                    value={slug}
                                    id={key}
                                    className='peer sr-only'
                                  />
                                  <Label
                                    htmlFor={key}
                                    className='flex cursor-pointer flex-col justify-between rounded-md border-2 border-muted bg-popover p-3 [&:has([data-state=checked])]:border-primary peer-data-[state=checked]:border-primary hover:bg-accent hover:text-accent-foreground'
                                  >
                                    {title}
                                  </Label>
                                </div>
                              )
                            },
                          )}
                        </RadioGroup>
                      </ScrollArea>
                    </AccordionContent>
                  </AccordionItem>
                )}
              </Await>
            </Suspense>
          </Accordion>
        </div>
        <div className='w-full space-y-4'>
          <div className='flex items-center justify-between'>
            <Select
              defaultValue={
                searchParams.get('orderBy') ?? DEFAULT_BOOK_ORDER_BY
              }
              onValueChange={(val) => {
                setSearchParams((prev) => {
                  prev.set('orderBy', val)
                  return prev
                })
                console.log('order by: ', val)
              }}
            >
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
