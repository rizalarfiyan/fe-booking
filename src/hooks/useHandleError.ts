import type { NavigateFunction } from 'react-router-dom'
import { ErrorAuthorization, ErrorValidation } from '@libs/exceptions'
import { toast } from 'sonner'
import type { FieldValues, UseFormReturn } from 'react-hook-form'

interface IUseHandleErrorAction {
  callback?: (error: Error) => void
  callbackBadRequest?: (error: Error) => void
  callbackUnauthorized?: (error: Error) => void
}

const useHandleError = (navigate: NavigateFunction, logout = () => {}) => {
  const handleError = <T extends FieldValues>(
    error: Error,
    form: UseFormReturn<T> | null = null,
    cb: IUseHandleErrorAction = {},
  ) => {
    if (error instanceof ErrorAuthorization) {
      cb.callbackUnauthorized?.(error)
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
      cb.callbackBadRequest?.(error)
      return
    }

    if (form) form.reset()
    toast.error(error?.message ?? 'An error occurred, please try again later')
    cb.callback?.(error)
  }

  return { handleError }
}

export default useHandleError
