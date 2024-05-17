import type { ISlugTitle } from '@/types/base'

export const BOOK_ORDER_BY: ISlugTitle[] = [
  { slug: 'title', title: 'Title' },
  { slug: 'popular', title: 'Popular' },
  { slug: 'rating', title: 'Rating' },
  { slug: 'latest', title: 'Latest' },
]

export const DEFAULT_BOOK_ORDER_BY = BOOK_ORDER_BY[0].slug

export const BOOK_HISTORY_TYPE = {
  READ: 'read',
  SUCCESS: 'success',
  PENDING: 'pending',
  CANCEL: 'cancel',
} as const
