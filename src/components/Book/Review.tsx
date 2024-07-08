import HorizontalLine from '@components/HorizontalLine'
import { Typography } from '@components/Typograpy'
import type { IBookDetail, IBookReview } from '@/types/book'
import React from 'react'
import { Skeleton } from '@components/Skeleton'
import { useWatcher } from 'alova'
import alova from '@libs/alova'
import type { IBaseResponse } from '@/types/base'
import { Alert, AlertTitle } from '@components/Alert'
import { Info } from 'lucide-react'
import CardReview from '@components/Card/Review'

interface BookReviewProps {
  book: IBookDetail
}

const BookReview: React.FC<BookReviewProps> = ({ book: { bookId } }) => {
  const {
    data: { data },
    loading,
  } = useWatcher(
    () => alova.Get<IBaseResponse<IBookReview[]>>(`/v1/book/${bookId}/review`),
    [bookId],
    {
      force: true,
      immediate: true,
      initialData: {
        data: [],
      },
    },
  )

  return (
    <div className='space-y-4'>
      <HorizontalLine>
        <Typography as='h3' variant='h4'>
          Reviews
        </Typography>
      </HorizontalLine>
      {loading ? (
        <div className='flex w-full flex-wrap justify-center gap-4'>
          {Array.from({ length: 4 }, (_, idx) => {
            return <Skeleton key={idx} className='h-32 w-full max-w-80' />
          })}
        </div>
      ) : data.length ? (
        <div className='flex flex-wrap justify-center gap-4'>
          {data.map((book: IBookReview, idx: number) => {
            return <CardReview key={idx} {...book} />
          })}
        </div>
      ) : (
        <Alert isCenter>
          <Info className='size-6' />
          <AlertTitle className='my-1 ml-2'>No review available</AlertTitle>
        </Alert>
      )}
    </div>
  )
}

export default BookReview
