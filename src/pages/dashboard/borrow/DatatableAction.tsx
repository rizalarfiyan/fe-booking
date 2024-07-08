import type { IHistory } from '@/types/history'
import { BOOK_HISTORY_TYPE } from '@/constants/books'
import useAuth from '@hooks/useAuth'
import { AUTH_ROLE } from '@/constants/app'
import ButtonAction from '@components/ButtonAction'
import alova from '@libs/alova'
import type { IBaseResponse } from '@/types/base'
import { BookCheck, BookMinus, BookUp2 } from 'lucide-react'
import ReviewHistory from '@pages/dashboard/borrow/ReviewHistory'

interface DatatableActionProps {
  history: IHistory
}

const readService = ({ id }: { id: number }) => {
  return alova.Post<IBaseResponse>(
    '/v1/history/read',
    {
      historyId: id,
    },
    {
      name: 'read-history',
    },
  )
}

const cancelService = ({ id }: { id: number }) => {
  return alova.Post<IBaseResponse>(
    '/v1/history/cancel',
    {
      historyId: id,
    },
    {
      name: 'cancel-history',
    },
  )
}

const returnService = ({ id }: { id: number }) => {
  return alova.Post<IBaseResponse>(
    '/v1/history/return',
    {
      historyId: id,
    },
    {
      name: 'return-history',
    },
  )
}

const DatatableAction: React.FC<DatatableActionProps> = ({ history }) => {
  const { status, historyId } = history
  const { user } = useAuth()

  const isAdmin = user?.role === AUTH_ROLE.ADMIN

  return (
    <div className='space-x-2 whitespace-nowrap'>
      {isAdmin && status === BOOK_HISTORY_TYPE.PENDING && (
        <ButtonAction
          id={historyId}
          description='The action will mark the book as read'
          icon={<BookCheck className='size-4' />}
          api={readService}
        />
      )}
      {status === BOOK_HISTORY_TYPE.PENDING && (
        <ButtonAction
          id={historyId}
          description='The action will mark the book as cancel. The status cannot be undone.'
          icon={<BookMinus className='size-4' />}
          api={cancelService}
        />
      )}
      {isAdmin && status === BOOK_HISTORY_TYPE.READ && (
        <ButtonAction
          id={historyId}
          description='The action will mark the book as returned. The status cannot be undone.'
          icon={<BookUp2 className='size-4' />}
          api={returnService}
        />
      )}
      {status === BOOK_HISTORY_TYPE.SUCCESS && (
        <ReviewHistory historyId={historyId} />
      )}
    </div>
  )
}

export default DatatableAction
