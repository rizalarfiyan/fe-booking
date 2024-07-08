import { Card } from '@components/Card'
import React from 'react'
import type { IBookReview } from '@/types/book'
import { Avatar, AvatarFallback, AvatarImage } from '@components/Avatar'
import { getAvatarName, getFullName, parseSlate } from '@utils/string'
import { Stars } from '@components/Star'
import { Typography } from '@components/Typograpy'
import Parser from 'html-react-parser'

const CardReview: React.FC<IBookReview> = ({
  firstName,
  lastName,
  review,
  rating,
}) => {
  const fullName = getFullName(firstName, lastName)

  return (
    <Card className='flex w-full max-w-md items-center gap-6 p-6'>
      <Avatar className='size-16 border'>
        <AvatarImage src={undefined} alt={fullName} />
        <AvatarFallback>{getAvatarName(fullName)}</AvatarFallback>
      </Avatar>
      <div className='grid flex-1 gap-2'>
        <div className='flex items-center justify-between'>
          <h3 className='font-semibold text-lg'>{fullName}</h3>
          <div className='flex items-center gap-1.5'>
            <Stars rating={rating} variant='primary' disabled />
            <Typography type='description'>{rating}</Typography>
          </div>
        </div>
        <div className='prose mx-auto'>
          {Parser(parseSlate(JSON.parse(review ?? '[]')))}
        </div>
      </div>
    </Card>
  )
}

export default CardReview
