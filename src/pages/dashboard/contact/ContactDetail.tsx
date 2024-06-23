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
import {
  CalendarDays,
  Contact,
  Info,
  Mail,
  MessageSquareMore,
  Phone,
} from 'lucide-react'
import { useRequest } from 'alova'
import alova from '@libs/alova'
import type { IBaseResponse } from '@/types/base'
import type { IContactDetail } from '@/types/contact'
import { getFullName } from '@utils/string'
import { formatDate } from '@utils/date'
import { DATETIME_FORMAT } from '@/constants/app'

interface ContactDetailProps {
  contactId: number
}

const ContactDetail: React.FC<ContactDetailProps> = ({ contactId }) => {
  const {
    send: service,
    data: rawData,
    abort,
  } = useRequest(
    alova.Get<IBaseResponse<IContactDetail>>(`/v1/contact/${contactId}`),
    {
      immediate: false,
      initialData: {
        data: {
          firstName: '',
          lastName: '',
          message: '',
          email: '',
          phone: '',
          submittedAt: '',
        },
      },
    },
  )

  const {
    data: { firstName, lastName, message, email, phone, submittedAt },
  } = rawData
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
      <DialogContent className='max-w-2xl'>
        <DialogHeader>
          <DialogTitle className='mb-2 flex items-center gap-2'>
            <Info className='size-6' />
            Detail Contact Information
          </DialogTitle>
          <DialogDescription className='flex flex-wrap gap-4'>
            <div className='items-enter flex gap-2'>
              <Contact className='size-5' />
              <span>{getFullName(firstName, lastName)}</span>
            </div>
            <div className='items-enter flex gap-2'>
              <Mail className='size-5' />
              <span>{email}</span>
            </div>
            <div className='items-enter flex gap-2'>
              <Phone className='size-5' />
              <span>{phone}</span>
            </div>
            <div className='items-enter flex gap-2'>
              <CalendarDays className='size-5' />
              <span>{formatDate(submittedAt, DATETIME_FORMAT.datetime)}</span>
            </div>
          </DialogDescription>
        </DialogHeader>
        <p className='mt-2'>{message}</p>
      </DialogContent>
    </Dialog>
  )
}

export default ContactDetail
