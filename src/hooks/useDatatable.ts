import { useContext } from 'react'
import { type IDatatableContext, DatatableContext } from '@components/Datatable'

export const useDatatable = (): IDatatableContext => {
  const context = useContext(DatatableContext)
  if (!context) {
    throw new Error('useDatatable must be used within a Datatable')
  }
  return context
}

export default useDatatable
