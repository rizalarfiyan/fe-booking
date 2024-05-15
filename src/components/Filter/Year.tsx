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
import { Skeleton } from '@components/Skeleton'
import { ErrorMessage } from '@components/ErrorMessage'

export interface FilterYearProps {
  years: Promise<number[]>
}

const FilterYear: React.FC<FilterYearProps> = ({ years }) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const year = searchParams.get('year') ?? undefined
  const onChange = (val: string) => {
    setSearchParams((prev) => {
      prev.set('year', val)
      return prev
    })
    console.log('year change: ', val)
  }

  return (
    <Suspense fallback={<Skeleton className='my-4 h-10 w-full' />}>
      <Await
        resolve={years}
        errorElement={<ErrorMessage message="Couldn't load year" />}
      >
        {(years) => (
          <AccordionItem value='year'>
            <AccordionTrigger>Year</AccordionTrigger>
            <AccordionContent>
              <ScrollArea className='h-80 rounded-md' type='always'>
                <RadioGroup
                  className='flex flex-wrap items-center justify-center bg-slate-50 p-3 pr-5 dark:bg-slate-900'
                  defaultValue={year}
                  onValueChange={onChange}
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
  )
}

export default FilterYear
