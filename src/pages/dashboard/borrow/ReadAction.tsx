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
import { BookCheck } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import useHandleError from '@hooks/useHandleError'
import useDatatable from '@hooks/useDatatable'
import { useRequest } from 'alova'
import { toast } from 'sonner'
import { useDisclosure } from '@hooks/useDislosure'
import alova from '@libs/alova'
import type { IBaseResponse } from '@/types/base'

export interface ReadActionProps {
  historyId: number
}

const ReadAction: React.FC<ReadActionProps> = ({ historyId }) => {
  const state = useDisclosure()
  const navigate = useNavigate()
  const { handleError } = useHandleError(navigate)
  const { refresh } = useDatatable()

  const { loading, send } = useRequest(
    () =>
      alova.Post<IBaseResponse>(
        '/v1/history/read',
        {
          historyId,
        },
        {
          name: 'read-history',
        },
      ),
    {
      immediate: false,
    },
  )

  const onContinue = () => {
    state.disable()
    send()
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
          <BookCheck className='size-4' />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            The action will mark the book as read
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

export default ReadAction
