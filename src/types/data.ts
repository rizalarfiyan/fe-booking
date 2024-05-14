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
