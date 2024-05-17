import React, { useMemo, useState } from 'react'
import { Button } from '@components/Button'
import { Stars } from '@components/Star'
import { Typography } from '@components/Typograpy'
import type { IBookCard } from '@/types/data'
import useAuth from '@hooks/useAuth'
import { Link } from 'react-router-dom'
import { truncate } from '@utils/string'
import { parseDate } from '@utils/date'
import { DATETIME_FORMAT } from '@/constants/app'

interface BookDetailProps {
  data: IBookCard
}

const BookDetail: React.FC<BookDetailProps> = ({ data }) => {
  const { authors, rating, title, image, description } = data
  const { isLoggedIn } = useAuth()

  // TODO: FIXME publish date format time
  const details = useMemo(() => {
    const { pages, weight, height, width, isbn, publishedAt, language } = data
    return [
      {
        title: 'ISBN',
        value: isbn,
      },
      {
        title: 'Publish Date',
        value: parseDate(publishedAt, DATETIME_FORMAT.date),
      },
      {
        title: 'Language',
        value: language,
      },
      {
        title: 'Pages',
        value: pages,
      },
      {
        title: 'Weight',
        value: `${weight} kg`,
      },
      {
        title: 'Dimensions',
        value: height || width ? `${height} cm x ${width} cm` : null,
      },
    ]
  }, [data])

  const [isExpanded, setIsExpanded] = useState(false)
  const toggleDescription = () => {
    setIsExpanded((prev) => !prev)
  }

  return (
    <div className='space-y-10'>
      <div className='mx-auto flex w-full max-w-4xl flex-col items-center justify-center gap-12 md:flex-row'>
        <div className='aspect-[3/4] h-full w-full max-w-72 cursor-pointer overflow-hidden rounded-md bg-muted'>
          <img className='h-full w-full object-fill' src={image} alt={title} />
        </div>
        <div className='w-full max-w-3xl'>
          <Typography as='h1' variant='h3'>
            {title}
          </Typography>
          <Typography type='description'>by {authors.join(', ')}</Typography>
          <div className='mt-2 flex items-center gap-2'>
            <Stars rating={rating} variant='primary' disabled />
            <Typography type='description'>{rating}</Typography>
          </div>
          <div className='mt-8 space-y-4'>
            <Typography as='h3' variant='h4'>
              Details
            </Typography>
            <table className='w-full border-collapse'>
              <tbody>
                {details.map(({ title, value }, idx) => {
                  return (
                    <tr key={idx}>
                      <td className='w-1/3 align-top font-semibold'>
                        <span>{title}:</span>
                      </td>
                      <td className='pl-2 align-top'>{value ?? '-'}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            {isLoggedIn ? (
              <Button asChild>
                <Link to='/dashboard'>Borrow Now</Link>
              </Button>
            ) : (
              <Button asChild>
                <Link to='/login'>Login</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className='space-y-2'>
        <Typography as='h3' variant='h4'>
          Description
        </Typography>
        <Typography className='text-justify leading-relaxed'>
          {isExpanded ? description : truncate(description, 500)}
          <button
            type='button'
            onClick={toggleDescription}
            className='ml-2 font-semibold text-primary-600 dark:text-primary-500'
          >
            {isExpanded ? 'Show less' : 'Read more'}
          </button>
        </Typography>
      </div>
    </div>
  )
}

export default BookDetail
