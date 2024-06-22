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
      if (val === '0') {
        prev.delete('rating')
      } else {
        prev.set('rating', val)
      }
      return prev
    })
  }

  return (
    <AccordionItem value='rating'>
      <AccordionTrigger>Rating</AccordionTrigger>
      <AccordionContent>
        <RadioGroup
          defaultValue={rating || '0'}
          className='flex flex-col bg-slate-50 p-3 pr-5 dark:bg-slate-900'
          onValueChange={onChange}
        >
          {Array.from({ length: 6 }, (_, i) => {
            const key = `rating-${i}`
            return (
              <div key={key} className='relative'>
                <RadioGroupItem
                  value={i.toString()}
                  id={key}
                  className='peer sr-only'
                />
                <Label
                  htmlFor={key}
                  className='flex cursor-pointer flex-col justify-between rounded-md border-2 border-muted bg-popover p-3 text-center [&:has([data-state=checked])]:border-primary peer-data-[state=checked]:border-primary hover:bg-accent hover:text-accent-foreground'
                >
                  {i === 0 ? (
                    <span>All</span>
                  ) : (
                    <Stars
                      rating={i}
                      totalStars={5}
                      size={24}
                      variant='primary'
                      disabled
                    />
                  )}
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
