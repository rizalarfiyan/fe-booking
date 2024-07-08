export interface IHistory {
  historyId: number
  userId: number
  title: string
  status: string
  point: number
  createdAt: string
  returnAt: string | null
  borrowAt: string | null
  returnedAt: string | null
}

export interface IReviewHistory {
  historyId: number
  rating: number
  review: string
  createdAt: string
  updatedAt: string
}

export interface IHistoryCard {
  point: number
  total: number
  month: number
  borrow: {
    count: number
    max: number
  }
  nearest: {
    title: string
    date: string
  }
}
