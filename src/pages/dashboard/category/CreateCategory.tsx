import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/Dialog'
import { Plus, PlusCircle } from 'lucide-react'
import { Button } from '@components/Button'
import { useDisclosure } from '@hooks/useDislosure'
import React from 'react'
import alova from '@libs/alova'
import type { IBaseResponse } from '@/types/base'
import FormCategory from '@pages/dashboard/category/FormCategory'

const CreateCategory: React.FC = () => {
  const state = useDisclosure()

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    state.open()
  }

  return (
    <Dialog open={state.isOpen} onOpenChange={() => state.close()}>
      <DialogTrigger asChild>
        <Button
          variant='outline'
          leftIcon={<Plus className='mr-2 size-4' />}
          onClick={onClick}
        >
          Create
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <PlusCircle className='size-6' />
            Create Category
          </DialogTitle>
          <DialogDescription>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
            blanditiis debitis dicta repellendus tempora.
          </DialogDescription>
        </DialogHeader>
        <FormCategory
          type='create'
          state={state}
          api={(req: any) => {
            return alova.Post<IBaseResponse<any>, any>('/v1/category', req, {
              name: 'create-category',
            })
          }}
        />
      </DialogContent>
    </Dialog>
  )
}

export default CreateCategory
