import type { NavigateFunction } from 'react-router-dom'
import { ErrorAuthorization, ErrorValidation } from '@libs/exceptions'
import { toast } from 'sonner'
import type { FieldValues, UseFormReturn } from 'react-hook-form'

const useHandleError = (navigate: NavigateFunction, logout = () => {}) => {
  const handleError = <T extends FieldValues>(
    error: Error,
    form: UseFormReturn<T> | null = null,
  ) => {
    if (error instanceof ErrorAuthorization) {
      logout?.()
      toast.error(
        'You are not authorized to access this page, please login again',
      )
      navigate('/login', {
        replace: true,
      })
      return
    }

    if (error instanceof ErrorValidation) {
      if (!form) return
      for (const [key, value] of Object.entries(error.getData())) {
        form.setError(key as any, {
          type: 'manual',
          message: value,
        })
      }
      return
    }

    if (form) form.reset()
    toast.error(error?.message ?? 'An error occurred, please try again later')
  }

  return { handleError }
}

export default useHandleError
