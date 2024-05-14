import React from 'react'
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@components/Accordion'
import { RadioGroup, RadioGroupItem } from '@components/RadioGroup'
import { useSearchParams } from 'react-router-dom'
import { Label } from '@components/Label'
import { Stars } from '@components/Star'

const FilterRating: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const rating = searchParams.get('rating') ?? undefined
  const onChange = (val: string) => {
    setSearchParams((prev) => {
      prev.set('rating', val)
      return prev
    })
    console.log('rating change: ', val)
  }

  return (
    <AccordionItem value='rating'>
      <AccordionTrigger>Rating</AccordionTrigger>
      <AccordionContent>
        <RadioGroup
          defaultValue={rating}
          className='flex flex-col bg-slate-50 p-3 pr-5 dark:bg-slate-900'
          onValueChange={onChange}
        >
          {Array.from({ length: 5 }, (_, i) => {
            const rate = i + 1
            const key = `rating-${rate}`
            return (
              <div key={key} className='relative'>
                <RadioGroupItem
                  value={rate.toString()}
                  id={key}
                  className='peer sr-only'
                />
                <Label
                  htmlFor={key}
                  className='flex cursor-pointer flex-col justify-between rounded-md border-2 border-muted bg-popover p-3 [&:has([data-state=checked])]:border-primary peer-data-[state=checked]:border-primary hover:bg-accent hover:text-accent-foreground'
                >
                  <Stars
                    rating={rate}
                    totalStars={5}
                    size={24}
                    variant='primary'
                    disabled
                  />
                </Label>
              </div>
            )
          })}
        </RadioGroup>
      </AccordionContent>
    </AccordionItem>
  )
}

export default FilterRating
