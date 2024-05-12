import React, { Suspense } from 'react'
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@components/Accordion'
import { RadioGroup, RadioGroupItem } from '@components/RadioGroup'
import { Label } from '@components/Label'
import { ScrollArea } from '@components/ScrollArea'
import { Await, useSearchParams } from 'react-router-dom'
import type { ISlugTitle } from '@/types/base'

export interface FilterCategoryProps {
  categories: Promise<ISlugTitle[]>
}

const FilterCategory: React.FC<FilterCategoryProps> = ({ categories }) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const category = searchParams.get('category') ?? undefined
  const onChange = (val: string) => {
    setSearchParams((prev) => {
      prev.set('category', val)
      return prev
    })
    console.log('category change: ', val)
  }

  return (
    <Suspense fallback='loading....'>
      <Await resolve={categories} errorElement={<div>Error</div>}>
        {(categories) => (
          <AccordionItem value='category' className='border-none'>
            <AccordionTrigger>Category</AccordionTrigger>
            <AccordionContent>
              <ScrollArea className='h-96 rounded-md' type='always'>
                <RadioGroup
                  defaultValue={category}
                  className='flex flex-col bg-slate-50 p-3 pr-5 dark:bg-slate-900'
                  onValueChange={onChange}
                >
                  {(categories ?? []).map(({ slug, title }: ISlugTitle) => {
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
                  })}
                </RadioGroup>
              </ScrollArea>
            </AccordionContent>
          </AccordionItem>
        )}
      </Await>
    </Suspense>
  )
}

export default FilterCategory
