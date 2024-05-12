import React from 'react'
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@components/Accordion'

const FilterRating: React.FC = () => {
  return (
    <AccordionItem value='rating'>
      <AccordionTrigger>Rating</AccordionTrigger>
      <AccordionContent>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi,
        omnis?
      </AccordionContent>
    </AccordionItem>
  )
}

export default FilterRating
