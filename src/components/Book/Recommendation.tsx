import HorizontalLine from '@components/HorizontalLine'
import { Typography } from '@components/Typograpy'
import type { IBookCard, IBookDetail } from '@/types/book'
import React from 'react'
import { Skeleton } from '@components/Skeleton'
import { useWatcher } from 'alova'
import alova from '@libs/alova'
import type { IBaseResponse } from '@/types/base'
import CardBook from '@components/Card/Book'
import { Alert, AlertTitle } from '@components/Alert'
import { Info } from 'lucide-react'

interface BookRecommendationProps {
  book: IBookDetail
}

const BookRecommendation: React.FC<BookRecommendationProps> = ({
  book: { bookId },
}) => {
  const {
    data: { data },
    loading,
  } = useWatcher(
    () =>
      alova.Get<IBaseResponse<IBookCard[]>>(
        `/v1/book/${bookId}/recommendation`,
      ),
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
          Recommendations
        </Typography>
      </HorizontalLine>
      {loading ? (
        <div className='flex w-full flex-wrap justify-center gap-4'>
          {Array.from({ length: 5 }, (_, idx) => {
            return <Skeleton key={idx} className='h-72 w-full max-w-60' />
          })}
        </div>
      ) : data.length ? (
        <div className='flex flex-wrap justify-center gap-4'>
          {data.map((book: IBookCard, idx: number) => {
            return <CardBook key={idx} {...book} />
          })}
        </div>
      ) : (
        <Alert isCenter>
          <Info className='size-6' />
          <AlertTitle className='my-1 ml-2'>
            No recommendations available
          </AlertTitle>
        </Alert>
      )}
    </div>
  )
}

export default BookRecommendation
