import React, { useMemo } from 'react'
import { Button } from '@components/Button'
import { Stars } from '@components/Star'
import { Typography } from '@components/Typograpy'
import type { IBookDetail, IBookStock } from '@/types/book'
import useAuth from '@hooks/useAuth'
import { Link } from 'react-router-dom'
import { formatDate } from '@utils/date'
import { DATETIME_FORMAT } from '@/constants/app'
import { useRequest } from 'alova'
import type { IBaseResponse } from '@/types/base'
import alova from '@libs/alova'
import { Skeleton } from '@components/Skeleton'
import { Badge } from '@components/Badge'
import BookDescription from '@components/Book/Description'

interface BookDetailProps {
  book: IBookDetail
}

const BookDetail: React.FC<BookDetailProps> = ({ book }) => {
  const { author, rating, title, image, description } = book
  const { isLoggedIn } = useAuth()

  const {
    data: {
      data: { stock, borrow },
    },
    loading,
  } = useRequest(
    alova.Get<IBaseResponse<IBookStock>>(`/v1/book/${book.bookId}/stock`),
    {
      force: true,
      initialData: {
        data: {
          stock: 0,
          borrow: 0,
        },
      },
    },
  )

  const details = useMemo(() => {
    const {
      pages,
      weight,
      height,
      width,
      isbn,
      publishedAt,
      language,
      category,
    } = book
    return [
      {
        title: 'ISBN',
        value: isbn,
      },
      {
        title: 'Publish Date',
        value: formatDate(publishedAt, DATETIME_FORMAT.date),
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
      {
        title: 'Category',
        value:
          category.length === 0 ? (
            '-'
          ) : (
            <div className='flex flex-wrap gap-1.5'>
              {(category ?? []).map(({ name, categoryId }) => (
                <Link key={categoryId} to={`/books?categoryId=${categoryId}`}>
                  <Badge>{name}</Badge>
                </Link>
              ))}
            </div>
          ),
      },
    ]
  }, [book])

  return (
    <div className='space-y-10'>
      <div className='mx-auto flex w-full max-w-4xl flex-col items-center justify-center gap-12 md:flex-row'>
        <div className='aspect-[3/4] h-full w-full max-w-72 cursor-pointer overflow-hidden rounded-md bg-muted'>
          <img className='h-full w-full object-cover' src={image} alt={title} />
        </div>
        <div className='w-full max-w-3xl'>
          <Typography as='h1' variant='h3'>
            {title}
          </Typography>
          <Typography type='description'>by {author.join(', ')}</Typography>
          <div className='mt-2 flex items-center gap-2'>
            <Stars rating={rating} variant='primary' disabled />
            <Typography type='description'>{rating}</Typography>
          </div>
          <div className='mt-8 space-y-4'>
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
                {loading ? (
                  <tr>
                    <td className='w-1/3 pr-2 pb-2'>
                      <Skeleton className='h-6 w-full' />
                    </td>
                    <td className='pb-2'>
                      <Skeleton className='h-6 w-full' />
                    </td>
                  </tr>
                ) : (
                  <tr>
                    <td className='w-1/3 align-top font-semibold'>
                      <span>Available stock</span>
                    </td>
                    <td className='pl-2 align-top'>{stock - borrow}</td>
                  </tr>
                )}
              </tbody>
            </table>
            {isLoggedIn ? (
              <Button disabled={stock - borrow === 0}>Borrow Now</Button>
            ) : (
              <Button asChild>
                <Link to='/login'>Login</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className='space-y-4'>
        <div className='space-y-2'>
          <Typography as='h3' variant='h4'>
            Description
          </Typography>
          <BookDescription description={description} />
        </div>
      </div>
    </div>
  )
}

export default BookDetail
