import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/Dialog'
import { Minus, Package, Plus } from 'lucide-react'
import { Button } from '@components/Button'
import { useRequest } from 'alova'
import alova from '@libs/alova'
import type { IBaseResponse } from '@/types/base'
import { type UseDisclosure, useDisclosure } from '@hooks/useDislosure'
import React, { useState } from 'react'
import { Spinner } from '@components/Spinner'
import type { IBookStock } from '@/types/book'
import { Input } from '@components/Input'
import { useNavigate } from 'react-router-dom'
import useHandleError from '@hooks/useHandleError'
import useDatatable from '@hooks/useDatatable'
import { toast } from 'sonner'

interface UpdateBookStockContentProps extends UpdateBookStockProps {
  data: IBookStock
  state: UseDisclosure
}

const UpdateBookStockContent: React.FC<UpdateBookStockContentProps> = ({
  bookId,
  data: { stock, borrowed },
  state,
}) => {
  const navigate = useNavigate()
  const { handleError } = useHandleError(navigate)
  const { refresh } = useDatatable()
  const [value, setValue] = useState(stock)

  const { loading, send } = useRequest(
    (req: any) => {
      return alova.Put<IBaseResponse, any>(`/v1/book/${bookId}/stock`, req, {
        name: `book-stock-${bookId}`,
      })
    },
    {
      immediate: false,
    },
  )

  const onIncrement = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setValue((prev) => prev + 1)
  }

  const onDecrement = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setValue((prev) => prev - 1)
  }

  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    await send({
      stock: value,
    })
      .then((res) => {
        refresh()
        toast.success(res.message)
        state.close(true)
      })
      .catch((err) => handleError(err))
      .finally(() => state.enable())
  }

  return (
    <div>
      <div className='relative flex max-w-52 items-center'>
        <Button
          size='icon'
          variant='outline'
          className='h-10 w-16 flex-grow'
          onClick={onDecrement}
          disabled={value <= borrowed}
        >
          <Minus className='size-5' />
        </Button>
        <Input
          type='number'
          value={value}
          disabled
          className='flex-1 border-none text-center opacity-100'
        />
        <Button
          size='icon'
          variant='outline'
          className='h-10 w-16 flex-grow'
          onClick={onIncrement}
        >
          <Plus className='size-5' />
        </Button>
      </div>
      <DialogFooter>
        <Button
          isLoading={loading}
          disabled={value === stock}
          onClick={onSubmit}
        >
          Update
        </Button>
      </DialogFooter>
    </div>
  )
}

interface UpdateBookStockProps {
  bookId: number
}

const UpdateBookStock: React.FC<UpdateBookStockProps> = ({ bookId }) => {
  const {
    send: service,
    loading,
    data,
    abort,
  } = useRequest(
    alova.Get<IBaseResponse<IBookStock>>(`/v1/book/${bookId}/stock`, {
      hitSource: [`book-stock-${bookId}`],
    }),
    {
      immediate: false,
      initialData: {
        data: {
          stock: 0,
          borrowed: 0,
        },
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
          <Package className='size-4' />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <Package className='size-6' />
            Update Stock
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
          <UpdateBookStockContent
            bookId={bookId}
            data={data.data}
            state={state}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}

export default UpdateBookStock
