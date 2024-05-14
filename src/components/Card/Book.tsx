import { buttonVariants } from '@components/Button'
import { Card, CardContent, CardHeader } from '@components/Card'
import { Typography } from '@components/Typograpy'
import { getAuthor } from '@utils/string'
import { BookOpenText, Star, User } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import type { IBookCard } from '@/types/data'

const CardBook: React.FC<IBookCard> = ({
  slug,
  image,
  title,
  authors,
  rating,
}) => {
  return (
    <Link to={`/book/${slug}`}>
      <Card className='group w-full max-w-60 space-y-3 p-4'>
        <div className='relative aspect-[3/4] h-full w-full cursor-pointer overflow-hidden rounded-md bg-muted'>
          <img
            className='h-full w-full object-fill transition-transform duration-300 group-hover:scale-105'
            src={image}
            alt={title}
          />
          <div className='absolute inset-0 flex items-center justify-center bg-primary-500/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
            <div
              className={buttonVariants({
                size: 'icon',
                className: 'size-10 rounded-full',
              })}
            >
              <BookOpenText />
            </div>
          </div>
        </div>
        <CardHeader className='p-0'>
          <Typography
            as='h3'
            className='line-clamp-2 text-lg leading-tight decoration-2 decoration-primary-500 underline-offset-2 group-hover:underline'
          >
            {title}
          </Typography>
        </CardHeader>
        <CardContent className='flex gap-4 p-0'>
          <div className='flex gap-1.5'>
            <User className='size-4 text-slate-500 dark:text-slate-400' />
            <Typography as='span' type='small-description'>
              {getAuthor(authors)}
            </Typography>
          </div>
          <div className='flex gap-1.5'>
            <Star className='size-4 text-slate-500 dark:text-slate-400' />
            <Typography as='span' type='small-description'>
              {rating}
            </Typography>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export default CardBook
