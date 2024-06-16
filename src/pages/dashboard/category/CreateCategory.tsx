import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/Dialog'
import { Plus, PlusCircle } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/Form'
import { Input } from '@/components/Input'
import { Button } from '@components/Button'
import { useRequest } from 'alova'
import alova from '@libs/alova'
import useHandleError from '@hooks/useHandleError'
import type { ILoginDTO } from '@/types/auth'
import type { IBaseResponse } from '@/types/base'
import { toast } from 'sonner'
import { type UseDisclosure, useDisclosure } from '@hooks/useDislosure'
import React from 'react'

const formSchema = z.object({
  name: z.string().min(5, 'Name is required').max(50, 'Name is too long'),
  slug: z.string().min(5, 'Slug is required').max(50, 'Slug is too long'),
})

type FormRequest = z.infer<typeof formSchema>

interface ContentProps {
  state: UseDisclosure
  refresh?: () => void
}

const Content: React.FC<ContentProps> = ({ state, refresh }) => {
  const navigate = useNavigate()
  const { handleError } = useHandleError(navigate)

  const { loading, send } = useRequest(
    (req) =>
      alova.Post<IBaseResponse<ILoginDTO>, FormRequest>('/v1/category', req, {
        name: 'create-category',
      }),
    {
      immediate: false,
    },
  )

  const uniq = new Date().getUTCMilliseconds()
  const form = useForm<FormRequest>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: `Category ${uniq}`,
      slug: `category-${uniq}`,
    },
  })

  const disabled = !form.formState.isDirty || !form.formState.isValid

  function onSubmit(values: FormRequest) {
    state.disable()
    send(values)
      .then((res) => {
        refresh?.()
        state.close(true)
        form.reset()
        toast.success(res.message)
      })
      .catch((err) => handleError(err, form))
      .finally(() => state.enable())
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='mb-2 grid gap-3 py-4'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem className='grid grid-cols-4 items-center gap-4'>
                <FormLabel className='text-right'>Name</FormLabel>
                <FormControl>
                  <Input
                    parentClassName='col-span-3'
                    placeholder='Category 1'
                    type='text'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='slug'
            render={({ field }) => (
              <FormItem className='grid grid-cols-4 items-center gap-4'>
                <FormLabel className='text-right'>Slug</FormLabel>
                <FormControl>
                  <Input
                    placeholder='category-1'
                    type='text'
                    parentClassName='col-span-3'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <DialogFooter>
          <Button type='submit' isLoading={loading} disabled={disabled}>
            Create
          </Button>
        </DialogFooter>
      </form>
    </Form>
  )
}

type CreateCategoryProps = {
  refresh?: () => void
}

const CreateCategory: React.FC<CreateCategoryProps> = ({ refresh }) => {
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
        <Content state={state} refresh={refresh} />
      </DialogContent>
    </Dialog>
  )
}

export default CreateCategory
