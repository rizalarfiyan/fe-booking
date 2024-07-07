import type { IHistory } from '@/types/history'
import { BOOK_HISTORY_TYPE } from '@/constants/books'
import useAuth from '@hooks/useAuth'
import { AUTH_ROLE } from '@/constants/app'
import ReadAction from '@pages/dashboard/borrow/ReadAction'
import ReturnAction from '@pages/dashboard/borrow/ReturnAction'
import CancelAction from '@pages/dashboard/borrow/CancelAction'

interface DatatableActionProps {
  history: IHistory
}

const DatatableAction: React.FC<DatatableActionProps> = ({ history }) => {
  const { status, historyId } = history
  const { user } = useAuth()

  const isAdmin = user?.role === AUTH_ROLE.ADMIN

  return (
    <div className='space-x-2 whitespace-nowrap'>
      {isAdmin && status === BOOK_HISTORY_TYPE.PENDING && (
        <ReadAction historyId={historyId} />
      )}
      {status === BOOK_HISTORY_TYPE.PENDING && (
        <CancelAction historyId={historyId} />
      )}
      {isAdmin && status === BOOK_HISTORY_TYPE.READ && (
        <ReturnAction historyId={historyId} />
      )}
    </div>
  )
}

export default DatatableAction
