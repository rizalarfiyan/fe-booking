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

export interface IBookAll {
  bookId: number
  title: string
  slug: string
  image: string
  rating: number
  language: string
  publishedAt: string
  createdAt: string
  deletedAt: null
}

export interface IBookStock {
  stock: number
  borrowed: number
  hasBorrow: boolean
}

export interface IBookCard {
  bookId: number
  title: string
  slug: string
  image: string
  rating: number
  author: string[]
}

export interface IBookReview {
  firstName: string
  lastName: string
  rating: number
  review: string
}

export interface IBookDetail {
  bookId: number
  author: string[]
  description: string
  image: string
  isbn: string
  language: string
  publishedAt: string
  sku: string
  slug: string
  title: string
  pages: number
  height: number
  weight: number
  width: number
  rating: number
  category: IBookCategory[]
}
