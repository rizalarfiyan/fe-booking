import React from 'react'
import { Typography } from '@components/Typograpy'
import type { IBaseResponse } from '@/types/base'
import alova from '@libs/alova'
import type { IBookDetail } from '@/types/book'
import { useRequest } from 'alova'
import { useParams } from 'react-router-dom'
import FormBook from '@pages/dashboard/book/FormBook'
import { parseDate } from '@utils/date'

const Component: React.FC = () => {
  const { id } = useParams()

  const {
    loading,
    data: {
      data: {
        bookId,
        isbn,
        sku,
        title,
        slug,
        pages,
        weight,
        height,
        width,
        language,
        publishedAt,
        description,
        category,
        author,
      },
    },
  } = useRequest(
    alova.Get<IBaseResponse<IBookDetail>>(`/v1/book/${id}`, {
      hitSource: [`book-${id}`],
    }),
    {
      force: true,
      initialData: {
        data: {},
      },
    },
  )

  return (
    <div className='space-y-8'>
      <Typography as='h1' variant='h2'>
        Edit Book
      </Typography>
      {loading ? (
        // TODO: update later
        <div>Loading dulu</div>
      ) : (
        <FormBook
          type='edit'
          api={(req: any) => {
            return alova.Post<IBaseResponse, any>(`/v1/book/${bookId}`, req, {
              name: `book-${bookId}`,
            })
          }}
          value={{
            isbn,
            sku,
            title,
            slug,
            pages,
            weight,
            height,
            width,
            language,
            publishedAt: parseDate(publishedAt),
            description: JSON.parse(description ?? '[]'),
            category: category.map((val) => ({
              value: val.categoryId,
              label: val.name,
            })),
            author: author.map((val) => ({ value: val })),
          }}
        />
      )}
    </div>
  )
}

export { Component as default }
