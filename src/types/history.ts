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