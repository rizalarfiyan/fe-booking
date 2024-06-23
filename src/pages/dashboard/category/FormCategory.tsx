import { DialogFooter } from '@/components/Dialog'
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
import { type AlovaMethodHandler, useRequest } from 'alova'
import useHandleError from '@hooks/useHandleError'
import type { IBaseResponseList } from '@/types/base'
import { toast } from 'sonner'
import React from 'react'
import useDatatable from '@hooks/useDatatable'
import type { UseDisclosure } from '@hooks/useDislosure'

const formSchema = z.object({
  name: z
    .string({
      required_error: 'Password is required.',
    })
    .min(5, 'Name is required')
    .max(50, 'Name is too long'),
  slug: z
    .string({
      required_error: 'Slug is required.',
    })
    .min(5, 'Slug is required')
    .max(50, 'Slug is too long'),
})

export type FormRequest = z.infer<typeof formSchema>

type FormCategoryProps = {
  state: UseDisclosure
  api: AlovaMethodHandler<
    any,
    unknown,
    IBaseResponseList,
    unknown,
    any,
    Response,
    Headers
  >
} & (CreateFormCategory | EditFormCategory)

interface CreateFormCategory {
  type: 'create'
  value?: FormRequest
}

interface EditFormCategory {
  type: 'edit'
  value: FormRequest
}

const FormCategory: React.FC<FormCategoryProps> = ({
  state,
  api,
  type,
  value,
}) => {
  const navigate = useNavigate()
  const { handleError } = useHandleError(navigate)
  const { refresh } = useDatatable()

  const { loading, send } = useRequest(api, {
    immediate: false,
  })

  const form = useForm<FormRequest>({
    resolver: zodResolver(formSchema),
    mode: 'onBlur',
    defaultValues: value ?? {
      name: '',
      slug: '',
    },
  })

  const disabled = !form.formState.isDirty || !form.formState.isValid

  function onSubmit(values: FormRequest) {
    state.disable()
    send(values)
      .then((res) => {
        refresh()
        form.reset()
        toast.success(res.message)
        state.close(true)
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
            {type === 'edit' ? 'Update' : 'Create'}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  )
}

export default FormCategory
