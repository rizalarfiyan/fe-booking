import React from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/AlertDialog'
import { Button } from '@components/Button'
import { RotateCcw, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import useHandleError from '@hooks/useHandleError'
import useDatatable from '@hooks/useDatatable'
import { type Method, useRequest } from 'alova'
import { toast } from 'sonner'
import type { IBaseResponse } from '@/types/base'
import { useDisclosure } from '@hooks/useDislosure'

export interface DeleteActionProps {
  id: number
  name: string
  api: (
    id: number,
    isRestore: boolean,
  ) => Method<any, unknown, IBaseResponse, unknown, any, Response, Headers>
  isRestore?: boolean
}

const DeleteAction: React.FC<DeleteActionProps> = ({
  id,
  name,
  api,
  isRestore = false,
}) => {
  const state = useDisclosure()
  const navigate = useNavigate()
  const { handleError } = useHandleError(navigate)
  const { refresh } = useDatatable()

  const { loading, send } = useRequest(api, {
    immediate: false,
  })

  const onContinue = () => {
    state.disable()
    send(id, isRestore)
      .then((res) => {
        refresh()
        toast.success(res.message)
        state.close(true)
      })
      .catch((err) => handleError(err))
      .finally(() => state.enable())
  }

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    state.open()
  }

  return (
    <AlertDialog open={state.isOpen} onOpenChange={() => state.close()}>
      <AlertDialogTrigger asChild>
        <Button
          size='icon'
          variant='outline'
          className='size-8'
          onClick={onClick}
        >
          {isRestore ? (
            <RotateCcw className='size-4' />
          ) : (
            <Trash2 className='size-4' />
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This {name} will be {isRestore ? 'restore' : 'deleted'}. You can{' '}
            {!isRestore ? 'restore' : 'deleted'} it later.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button onClick={onContinue} isLoading={loading}>
              Continue
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteAction
