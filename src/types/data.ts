import type { LucideIcon } from 'lucide-react'

export interface IContactInformation {
  icon: LucideIcon
  title: string
  description: string
}

// FIXME: remove not used fields
export interface IBookCard {
  authors: string[]
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
}

export interface IBookDetail {
  authors: string[]
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
}

export interface ILeaderboard {
  id: number
  first_name: string
  last_name?: string
  email: string
  avatar: string
  point: number
  book: number
  isMe?: boolean
}
