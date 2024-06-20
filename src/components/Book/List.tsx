import React, { useMemo } from 'react'
import { useWatcher } from 'alova'
import { useSearchParams } from 'react-router-dom'
import alova from '@libs/alova'
import CardBook from '@components/Card/Book'
import type { IBookCard } from '@/types/data'
import type { IBaseResponseList } from '@/types/base'
import { Skeleton } from '@components/Skeleton'
import Paginator from '@components/Paginator'

interface BookListProps {}

const BookList: React.FC<BookListProps> = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const queryPage = searchParams.get('page') ?? undefined
  const count = searchParams.get('count') ?? undefined
  const orderBy = searchParams.get('orderBy') ?? undefined
  const search = searchParams.get('search') ?? undefined
  const year = searchParams.get('year') ?? undefined
  const categoryId = searchParams.get('categoryId') ?? undefined

  const payload = useMemo(() => {
    return {
      page: queryPage,
      count,
      orderBy,
      search,
      year,
      categoryId,
    }
  }, [queryPage, count, orderBy, search, year, categoryId])

  const { data, loading } = useWatcher(
    () =>
      alova.Get<IBaseResponseList<IBookCard>>('/v1/book/list', {
        params: payload,
      }),
    [payload],
    {
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

  return (
    <div className='space-y-16'>
      <div className='flex flex-wrap justify-center gap-4'>
        {data.data.content.map((book: IBookCard, idx: number) => {
          return <CardBook key={idx} {...book} />
        })}
      </div>
      {totalPage > 8 && (
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
