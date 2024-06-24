import type { LucideIcon } from 'lucide-react'
import type { BookHistoryType } from '@/types/book'

export interface IContactInformation {
  icon: LucideIcon
  title: string
  description: string
}

export interface IDashboardInformation {
  total: number
  point: number
  borrow: {
    count: number
    max: number
  }
  nearest: {
    title: string
    date: string
  }
}

export interface IHistoryBook {
  isbn: string
  title: string
  slug: string
  image: string
  point?: number
  status: BookHistoryType
  borrowAt: string
  returnAt?: string
}
