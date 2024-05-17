import type { BOOK_HISTORY_TYPE } from '@/constants/books'

export type BookHistoryType =
  (typeof BOOK_HISTORY_TYPE)[keyof typeof BOOK_HISTORY_TYPE]
