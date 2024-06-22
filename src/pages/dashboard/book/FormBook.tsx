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
import RichText from '@components/RichText/RichText'
import FormAuthor from '@pages/dashboard/book/FormAuthor'

const formSchema = z.object({
  isbn: z.string(),
  sku: z.string(),
  title: z.string().min(5).max(50),
  slug: z.string().min(5).max(50),
  pages: z.string().pipe(z.coerce.number().positive().int()),
  weight: z.string().pipe(z.coerce.number().positive()),
  height: z.string().pipe(z.coerce.number().positive()),
  width: z.string().pipe(z.coerce.number().positive()),
  language: z.string(),
  publishedAt: z.date(),
  description: z.array(z.any()),
  categoryId: z.array(z.number().int().positive()),
  authors: z
    .array(
      z.object({
        value: z.string().min(5).max(50),
      }),
    )
    .min(1, 'Minimum 1 author is required'),
})

export type FormRequest = z.infer<typeof formSchema>

type FormBookProps = {
  api: AlovaMethodHandler<
    any,
    unknown,
    IBaseResponseList,
    unknown,
    any,
    Response,
    Headers
  >
} & (CreateFormBook | EditFormBook)

interface CreateFormBook {
  type: 'create'
  value?: FormRequest
}

interface EditFormBook {
  type: 'edit'
  value: FormRequest
}

const FormBook: React.FC<FormBookProps> = ({ api, type, value }) => {
  const navigate = useNavigate()
  const { handleError } = useHandleError(navigate)

  const { loading, send } = useRequest(api, {
    immediate: false,
  })

  const form = useForm<FormRequest>({
    mode: 'onBlur',
    resolver: zodResolver(formSchema),
    defaultValues: value ?? {
      isbn: '',
      sku: '',
      title: '',
      slug: '',
      pages: 0,
      weight: 0,
      height: 0,
      width: 0,
      language: '',
      publishedAt: new Date(),
      description: [],
      categoryId: [],
      authors: [],
    },
  })

  const disabled = !form.formState.isDirty || !form.formState.isValid

  function onSubmit(values: FormRequest) {
    send(values)
      .then((res) => {
        form.reset()
        toast.success(res.message)
      })
      .catch((err) => handleError(err, form))
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <div className='space-y-4'>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder='Title' type='text' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='slug'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input placeholder='Slug' type='text' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
            <FormField
              control={form.control}
              name='isbn'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ISBN</FormLabel>
                  <FormControl>
                    <Input placeholder='ISBN' type='text' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='sku'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SKU</FormLabel>
                  <FormControl>
                    <Input placeholder='SKU' type='text' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='authors'
              render={({ field: { value, onChange, ...field } }) => (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <div className='flex items-center justify-center gap-4'>
                    <FormControl>
                      <Input
                        parentClassName='flex-1'
                        placeholder='Author'
                        type='text'
                        disabled
                        value={`${value.length} authors selected`}
                        {...field}
                      />
                    </FormControl>
                    <FormAuthor control={form.control} />
                  </div>
                  <FormMessage undefinedMessage='Invalid author' />
                </FormItem>
              )}
            />
          </div>
          <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
            <FormField
              control={form.control}
              name='pages'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pages</FormLabel>
                  <FormControl>
                    <Input placeholder='Pages' type='number' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='weight'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weight</FormLabel>
                  <FormControl>
                    <Input placeholder='Weight' type='number' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='width'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Width</FormLabel>
                  <FormControl>
                    <Input placeholder='Width' type='number' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='height'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Height</FormLabel>
                  <FormControl>
                    <Input placeholder='Height' type='number' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <RichText
                    id='description'
                    initialValue={field.value}
                    placeholder='Enter some description...'
                    toolbox='minimalist'
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

export default FormBook
