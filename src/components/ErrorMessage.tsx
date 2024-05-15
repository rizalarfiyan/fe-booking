import React from 'react'
import { Alert, AlertTitle } from '@components/Alert'
import { TriangleAlert } from 'lucide-react'

export interface ErrorMessageProps {
  message?: string
  children?: React.ReactNode
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ children, message }) => {
  return (
    <Alert variant='destructive' isCenter>
      <TriangleAlert className='size-6' />
      <AlertTitle className='my-1 ml-2'>{message || children}</AlertTitle>
    </Alert>
  )
}

export { ErrorMessage }
