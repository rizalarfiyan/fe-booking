import { createContext } from 'react'

export interface IDatatableContext {
  refresh: () => void
}

export const DatatableContext = createContext<IDatatableContext | null>(null)
