import type { BOOK_HISTORY_TYPE } from '@/constants/books'

export type BookHistoryType =
  (typeof BOOK_HISTORY_TYPE)[keyof typeof BOOK_HISTORY_TYPE]

export interface BookFilter {
  year: number[]
  category: BookCategory[]
}

export interface BookCategory {
  categoryId: number
  name: string
  slug: string
}
