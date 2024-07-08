import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/Dialog'
import { Star } from 'lucide-react'
import { Button } from '@components/Button'
import { useRequest } from 'alova'
import alova from '@libs/alova'
import type { IBaseResponse } from '@/types/base'
import { useDisclosure } from '@hooks/useDislosure'
import React from 'react'
import { Spinner } from '@components/Spinner'
import type { IReviewHistory } from '@/types/history'
import FormReview from '@pages/dashboard/borrow/FormReview'

interface ReviewHistoryProps {
  historyId: number
}

const ReviewHistory: React.FC<ReviewHistoryProps> = ({ historyId }) => {
  const {
    send: service,
    loading,
    data,
    abort,
  } = useRequest(
    alova.Get<IBaseResponse<IReviewHistory>>(
      `/v1/history/review/${historyId}`,
      {
        hitSource: [`review-history-${historyId}`],
      },
    ),
    {
      immediate: false,
      initialData: {
        data: {},
      },
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
          <Star className='size-4' />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <Star className='size-6' />
            My Review
          </DialogTitle>
          <DialogDescription>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
            blanditiis debitis dicta repellendus tempora.
          </DialogDescription>
        </DialogHeader>
        {loading ? (
          <div className='flex h-44 w-full items-center justify-center rounded-md bg-muted'>
            <Spinner />
          </div>
        ) : (
          <FormReview
            historyId={historyId}
            state={state}
            value={{
              rating: data.data.rating ?? 0,
              review: JSON.parse(data.data.review ?? '[]'),
            }}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}

export default ReviewHistory
