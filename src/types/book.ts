import type { BOOK_HISTORY_TYPE } from '@/constants/books'

export type BookHistoryType =
  (typeof BOOK_HISTORY_TYPE)[keyof typeof BOOK_HISTORY_TYPE]

export interface BookFilter {
  year: number[]
  category: IBookCategory[]
}

export interface IBookCategory {
  categoryId: number
  name: string
  slug: string
}

export interface IBookStock {
  stock: number
  borrow: number
}

export interface IBookCard {
  bookId: number
  title: string
  slug: string
  image: string
  rating: number
  author: string[]
}

export interface IBookDetail {
  bookId: number
  author: string[]
  description: string
  height: string
  image: string
  isbn: string
  language: string
  pages: string
  publishedAt: string
  sku: string
  slug: string
  title: string
  weight: string
  width: string
  rating: number
  category: IBookCategory[]
}
