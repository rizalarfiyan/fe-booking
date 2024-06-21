import React, { Suspense } from 'react'
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@components/Accordion'
import { RadioGroup, RadioGroupItem } from '@components/RadioGroup'
import { Label } from '@components/Label'
import { ScrollArea } from '@components/ScrollArea'
import { Await, useSearchParams } from 'react-router-dom'
import { Skeleton } from '@components/Skeleton'
import { ErrorMessage } from '@components/ErrorMessage'
import type { IBookCategory, BookFilter } from '@/types/book'

export interface FilterYearCategoryProps {
  filter: Promise<BookFilter>
}

const FilterYearCategory: React.FC<FilterYearCategoryProps> = ({ filter }) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const categoryId = searchParams.get('categoryId') ?? undefined
  const year = searchParams.get('year') ?? undefined

  const onChangeCategory = (val: string) => {
    setSearchParams((prev) => {
      prev.set('categoryId', val)
      return prev
    })
  }

  const onChangeYear = (val: string) => {
    setSearchParams((prev) => {
      prev.set('year', val)
      return prev
    })
  }

  return (
    <Suspense
      fallback={
        <>
          <Skeleton className='my-3 h-10 w-full' />
          <Skeleton className='my-4 h-10 w-full' />
        </>
      }
    >
      <Await
        resolve={filter}
        errorElement={<ErrorMessage message="Couldn't load filter" />}
      >
        {(filter) => (
          <>
            <AccordionItem value='year'>
              <AccordionTrigger>Year</AccordionTrigger>
              <AccordionContent>
                <ScrollArea className='h-80 rounded-md' type='always'>
                  <RadioGroup
                    className='flex flex-wrap items-center justify-center bg-slate-50 p-3 pr-5 dark:bg-slate-900'
                    defaultValue={year}
                    onValueChange={onChangeYear}
                  >
                    {(filter.year ?? []).map((year: number) => {
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
            <AccordionItem value='category' className='border-none'>
              <AccordionTrigger>Category</AccordionTrigger>
              <AccordionContent>
                <ScrollArea className='h-96 rounded-md' type='always'>
                  <RadioGroup
                    defaultValue={categoryId}
                    className='flex flex-col bg-slate-50 p-3 pr-5 dark:bg-slate-900'
                    onValueChange={onChangeCategory}
                  >
                    {(filter.category ?? []).map(
                      ({ categoryId, name }: IBookCategory) => {
                        const key = `category-${categoryId}`
                        return (
                          <div key={key} className='relative'>
                            <RadioGroupItem
                              value={categoryId.toString()}
                              id={key}
                              className='peer sr-only'
                            />
                            <Label
                              htmlFor={key}
                              className='flex cursor-pointer flex-col justify-between rounded-md border-2 border-muted bg-popover p-3 [&:has([data-state=checked])]:border-primary peer-data-[state=checked]:border-primary hover:bg-accent hover:text-accent-foreground'
                            >
                              {name}
                            </Label>
                          </div>
                        )
                      },
                    )}
                  </RadioGroup>
                </ScrollArea>
              </AccordionContent>
            </AccordionItem>
          </>
        )}
      </Await>
    </Suspense>
  )
}

export default FilterYearCategory
