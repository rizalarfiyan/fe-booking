import React from 'react'
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@components/Accordion'
import { RadioGroup, RadioGroupItem } from '@components/RadioGroup'
import { Label } from '@components/Label'
import { ScrollArea } from '@components/ScrollArea'
import { useSearchParams } from 'react-router-dom'
import { Skeleton } from '@components/Skeleton'
import type { BookFilter, IBookCategory } from '@/types/book'
import type { IBaseResponse } from '@/types/base'
import alova from '@libs/alova'
import { useRequest } from 'alova'

const FilterYearCategory: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const categoryId = searchParams.get('categoryId') ?? undefined
  const year = searchParams.get('year') ?? undefined

  const {
    data: {
      data: { year: years, category: categories },
    },
    loading,
  } = useRequest(alova.Get<IBaseResponse<BookFilter>>('/v1/book/filter'), {
    force: true,
    initialData: {
      data: {
        year: [],
        category: [],
      },
    },
  })

  const onChangeCategory = (val: string) => {
    setSearchParams((prev) => {
      if (val === '0') {
        prev.delete('categoryId')
      } else {
        prev.set('categoryId', val)
      }
      return prev
    })
  }

  const onChangeYear = (val: string) => {
    setSearchParams((prev) => {
      if (val === '0') {
        prev.delete('year')
      } else {
        prev.set('year', val)
      }
      return prev
    })
  }

  if (loading) {
    return (
      <>
        <Skeleton className='my-4 h-10 w-full' />
        <Skeleton className='my-4 h-10 w-full' />
      </>
    )
  }

  return (
    <>
      <AccordionItem value='year'>
        <AccordionTrigger>Year</AccordionTrigger>
        <AccordionContent>
          <ScrollArea className='h-80 rounded-md' type='always'>
            <RadioGroup
              className='flex flex-wrap items-center justify-center bg-slate-50 p-3 pr-5 dark:bg-slate-900'
              defaultValue={year || '0'}
              onValueChange={onChangeYear}
            >
              {[0, ...years].map((year: number) => {
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
                      {year === 0 ? 'All' : year}
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
              defaultValue={categoryId || '0'}
              className='flex flex-col bg-slate-50 p-3 pr-5 dark:bg-slate-900'
              onValueChange={onChangeCategory}
            >
              {[{ categoryId: 0, name: 'All', slug: 'all' }, ...categories].map(
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
  )
}

export default FilterYearCategory
