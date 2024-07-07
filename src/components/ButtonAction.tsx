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
import { useNavigate } from 'react-router-dom'
import useHandleError from '@hooks/useHandleError'
import useDatatable from '@hooks/useDatatable'
import { type AlovaMethodHandler, useRequest } from 'alova'
import { toast } from 'sonner'
import { useDisclosure } from '@hooks/useDislosure'
import type { IBaseResponse } from '@/types/base'

export interface ButtonActionProps {
  id: number
  api: AlovaMethodHandler<
    any,
    unknown,
    IBaseResponse,
    unknown,
    any,
    Response,
    Headers
  >
  icon: React.ReactNode
  title?: string
  description?: string
  params?: {
    [key: string]: any
  }
}

const ButtonAction: React.FC<ButtonActionProps> = ({
  id,
  api,
  icon,
  title = 'Are you absolutely sure?',
  description = 'The status cannot be undone.',
  params = {},
}) => {
  const state = useDisclosure()
  const navigate = useNavigate()
  const { handleError } = useHandleError(navigate)
  const { refresh } = useDatatable()

  const { loading, send } = useRequest((props) => api(props), {
    immediate: false,
  })

  const onContinue = () => {
    state.disable()
    send({
      ...params,
      id,
    })
      .then((res) => {
        refresh()
        toast.success(res.message)
        state.close(true)
      })
      .catch((err) => {
        state.close(true)
        handleError(err)
      })
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
          {icon}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
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

export default ButtonAction
