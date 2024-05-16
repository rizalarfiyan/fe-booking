import { TIERS } from '@/constants/dashboard'
import type { BookHistoryType } from '@/types/book'
import { BOOK_HISTORY_TYPE } from '@/constants/books'

export const getCurrentTier = (point: number) => {
  for (let i = TIERS.length - 1; i >= 0; i--) {
    if (point >= TIERS[i].point) {
      return TIERS[i]
    }
  }
  return TIERS[0]
}

export const getHistoryType = (status: BookHistoryType) => {
  return {
    isRead: status === BOOK_HISTORY_TYPE.READ,
    isSuccess: status === BOOK_HISTORY_TYPE.SUCCESS,
    isPending: status === BOOK_HISTORY_TYPE.PENDING,
    isCancel: status === BOOK_HISTORY_TYPE.CANCEL,
  }
}
