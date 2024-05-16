import React, { Suspense } from 'react'
import { Await, defer, useLoaderData } from 'react-router-dom'
import type { IBookDetail } from '@/types/data'
import BookDetail from '@components/Book/Detail'
import { Skeleton } from '@components/Skeleton'
import { ErrorMessage } from '@components/ErrorMessage'

interface IPromiseBook {
  book: Promise<IBookDetail>
}

const Component: React.FC = () => {
  const { book } = useLoaderData() as IPromiseBook

  return (
    <div className='mt-28 mb-20'>
      <Suspense
        fallback={
          <div className='space-y-10'>
            <div className='mx-auto flex w-full max-w-3xl flex-col items-center justify-center gap-12 md:flex-row'>
              <Skeleton className='aspect-[3/4] h-full w-72' />
              <div className='w-full max-w-sm space-y-2'>
                <Skeleton className='h-10 w-full' />
                <Skeleton className='h-6 w-1/2' />
                <div className='flex items-center gap-2'>
                  <Skeleton className='h-8 w-28' />
                  <Skeleton className='h-8 w-8' />
                </div>
                <div className='mt-8 space-y-2'>
                  <Skeleton className='h-8 w-1/2' />
                  <table className='w-full'>
                    <tbody>
                      {Array.from({ length: 5 }, (_, idx) => {
                        return (
                          <tr key={idx}>
                            <td className='w-1/3 pr-2 pb-2'>
                              <Skeleton className='h-6 w-full' />
                            </td>
                            <td className='pb-2'>
                              <Skeleton className='h-6 w-full' />
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                  <Skeleton className='h-12 w-28' />
                </div>
              </div>
            </div>
            <div className='space-y-4'>
              <Skeleton className='h-8 w-1/2' />
              <div className='space-y-4'>
                {Array.from({ length: 3 }, (_, idx) => {
                  return (
                    <div className='space-y-2' key={idx}>
                      <Skeleton className='h-4 w-full' />
                      <Skeleton className='h-4 w-full' />
                      <Skeleton className='h-4 w-1/2' />
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        }
      >
        <Await
          resolve={book}
          errorElement={<ErrorMessage message="Couldn't load book detail" />}
        >
          {(book) => {
            return <BookDetail data={book} />
          }}
        </Await>
      </Suspense>
    </div>
  )
}

const fakeBook = async (slug: string) => {
  const books = await import('@dummy/books.json').then((res) => res.default)
  const book = books.find((book) => book.slug === slug)

  if (!book) {
    throw new Response('Book Not Found', { status: 404 })
  }

  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve(book ?? null)
    }, 1000)
  })
}

interface LoaderProps {
  params: {
    slug: string
  }
}

const loader = async ({ params }: LoaderProps) => {
  return defer({
    book: fakeBook(params.slug),
  })
}

export { Component as default, loader }
