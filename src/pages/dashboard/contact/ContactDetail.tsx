import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/Dialog'
import React from 'react'
import { useDisclosure } from '@hooks/useDislosure'
import { Button } from '@components/Button'
import { Info, MessageSquareMore } from 'lucide-react'
import { useRequest } from 'alova'
import alova from '@libs/alova'
import type { IBaseResponse } from '@/types/base'
import type { IContactDetail } from '@/types/contact'

interface ContactDetailProps {
  contactId: number
}

const ContactDetail: React.FC<ContactDetailProps> = ({ contactId }) => {
  const {
    send: service,
    data,
    abort,
  } = useRequest(
    alova.Get<IBaseResponse<IContactDetail>>(`/v1/contact/${contactId}`),
    {
      immediate: false,
    },
  )

  const state = useDisclosure({
    onOpen: async () => {
      await service()
    },
    onClose: () => {
      abort()
    },
  })

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    state.open()
  }

  return (
    <Dialog open={state.isOpen} onOpenChange={() => state.close()}>
      <DialogTrigger asChild>
        <Button
          size='icon'
          variant='outline'
          className='size-8'
          onClick={onClick}
        >
          <MessageSquareMore className='size-4' />
        </Button>
      </DialogTrigger>
      <DialogContent className='w-[calc(100%_-_40px)] max-w-2xl'>
        <DialogHeader>
          <DialogTitle className='mb-4 flex items-center gap-2'>
            <Info className='size-6' />
            Detail Contact Information
          </DialogTitle>
          <DialogDescription>{data?.data?.message || ''}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default ContactDetail
