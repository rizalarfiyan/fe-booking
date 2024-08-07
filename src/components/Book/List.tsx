import React, { useMemo } from 'react'
import { useWatcher } from 'alova'
import { useSearchParams } from 'react-router-dom'
import alova from '@libs/alova'
import CardBook from '@components/Card/Book'
import type { IBookCard } from '@/types/book'
import type { IBaseResponseList } from '@/types/base'
import { Skeleton } from '@components/Skeleton'
import Paginator from '@components/Paginator'
import { BookX } from 'lucide-react'
import { Typography } from '@components/Typograpy'

interface BookListProps {}

const BookList: React.FC<BookListProps> = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const rating = searchParams.get('rating') ?? undefined
  const queryPage = searchParams.get('page') ?? undefined
  const orderBy = searchParams.get('orderBy') ?? undefined
  const search = searchParams.get('search') ?? undefined
  const year = searchParams.get('year') ?? undefined
  const categoryId = searchParams.get('categoryId') ?? undefined

  const payload = useMemo(() => {
    return {
      page: queryPage,
      count: 12,
      orderBy,
      search,
      year,
      categoryId,
      rating,
    }
  }, [queryPage, orderBy, search, year, categoryId, rating])

  const { data, loading } = useWatcher(
    () =>
      alova.Get<IBaseResponseList<IBookCard>>('/v1/book/list', {
        params: payload,
      }),
    [payload],
    {
      force: true,
      immediate: true,
      initialData: {
        data: {
          content: [],
          metadata: {
            total: 0,
            page: 0,
            perPage: 0,
            totalPage: 0,
          },
        },
      },
    },
  )

  const { page, totalPage } = data.data.metadata
  const books = data.data.content

  if (loading) {
    return (
      <div className='space-y-10'>
        <div className='flex flex-wrap justify-center gap-4'>
          {Array.from({ length: 8 }, (_, idx) => {
            return <Skeleton key={idx} className='h-72 w-full max-w-60' />
          })}
        </div>
        <div className='flex justify-center gap-2'>
          <Skeleton className='h-10 w-28' />
          {Array.from({ length: 4 }, (_, idx) => {
            return <Skeleton key={idx} className='h-10 w-16' />
          })}
          <Skeleton className='h-10 w-28' />
        </div>
      </div>
    )
  }

  if (books.length === 0) {
    return (
      <div className='flex min-h-96 items-center justify-center'>
        <div className='space-y-2 text-center'>
          <BookX className='mx-auto size-20 text-muted-foreground opacity-20' />
          <Typography as='h1' variant='h2'>
            Book Not Found
          </Typography>
          <Typography as='p' type='description'>
            We can't find any book that you're looking for
          </Typography>
        </div>
      </div>
    )
  }

  return (
    <div className='space-y-16'>
      <div className='flex flex-wrap justify-center gap-4'>
        {data.data.content.map((book: IBookCard, idx: number) => {
          return <CardBook key={idx} {...book} />
        })}
      </div>
      {totalPage > 0 && (
        <Paginator
          currentPage={page ?? 1}
          totalPages={totalPage}
          onPageChange={(pageNumber) =>
            setSearchParams((prev) => {
              prev.set('page', `${pageNumber}`)
              return prev
            })
          }
          showPreviousNext
        />
      )}
    </div>
  )
}

export default BookList
