import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/Dialog'
import { Pencil } from 'lucide-react'
import { Button } from '@components/Button'
import { useRequest } from 'alova'
import alova from '@libs/alova'
import type { IBaseResponse } from '@/types/base'
import { useDisclosure } from '@hooks/useDislosure'
import React from 'react'
import type { ICategoryDetail } from '@/types/category'
import FormCategory from '@pages/dashboard/category/FormCategory'
import { Spinner } from '@components/Spinner'

interface EditCategoryProps {
  categoryId: number
}

const EditCategory: React.FC<EditCategoryProps> = ({ categoryId }) => {
  const {
    send: service,
    loading,
    data,
    abort,
  } = useRequest(
    alova.Get<IBaseResponse<ICategoryDetail>>(`/v1/category/${categoryId}`, {
      hitSource: [`edit-category-${categoryId}`],
    }),
    {
      immediate: false,
      initialData: {
        data: {
          name: '',
          slug: '',
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
          <Pencil className='size-4' />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <Pencil className='size-6' />
            Edit Category
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
          <FormCategory
            state={state}
            type='edit'
            value={data.data}
            api={(req: any) => {
              return alova.Put<IBaseResponse, any>(
                `/v1/category/${categoryId}`,
                req,
                {
                  name: `edit-category-${categoryId}`,
                },
              )
            }}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}

export default EditCategory
