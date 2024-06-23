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
import React from 'react'
import RichText from '@components/RichText/RichText'
import FormAuthor from '@pages/dashboard/book/FormAuthor'
import { CalendarIcon } from 'lucide-react'
import { cn } from '@utils/classes'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/Popover'
import { Calendar } from '@components/Calendar'
import { formatDate } from '@utils/date'
import MultiSelect, { type Option } from '@components/MultiSelect'
import alova from '@libs/alova'
import { toast } from 'sonner'
import { DATETIME_FORMAT } from '@/constants/app'

const formSchema = z
  .object({
    isbn: z
      .string({
        required_error: 'ISBN is required.',
      })
      .min(10, { message: 'ISBN must be at least 10 characters.' })
      .max(13, { message: 'ISBN must be at most 13 characters.' }),
    sku: z
      .string({
        required_error: 'SKU is required.',
      })
      .min(8, { message: 'SKU must be at least 8 characters.' })
      .max(12, { message: 'SKU must be at most 12 characters.' }),
    title: z
      .string({
        required_error: 'Title is required.',
      })
      .min(5, { message: 'Title must be at least 5 characters.' })
      .max(50, { message: 'Title must be at most 50 characters.' }),
    slug: z
      .string({
        required_error: 'Slug is required.',
      })
      .min(5, { message: 'Slug must be at least 5 characters.' })
      .max(50, { message: 'Slug must be at most 50 characters.' }),
    pages: z
      .string({
        required_error: 'Pages is required.',
      })
      .pipe(
        z.coerce
          .number({
            message: 'Pages must be a number.',
          })
          .positive({
            message: 'Pages must be a positive number.',
          })
          .int({
            message: 'Pages must be an integer.',
          })
          .or(
            z
              .number({
                message: 'Pages must be a number.',
              })
              .positive({
                message: 'Pages must be a positive number.',
              })
              .int({
                message: 'Pages must be an integer.',
              }),
          ),
      ),
    weight: z
      .string({
        required_error: 'Weight is required.',
      })
      .pipe(
        z.coerce
          .number({
            message: 'Weight must be a number.',
          })
          .positive({
            message: 'Weight must be a positive number.',
          })
          .or(
            z
              .number({
                message: 'Weight must be a number.',
              })
              .positive({
                message: 'Weight must be a positive number.',
              }),
          ),
      ),
    height: z
      .string({
        required_error: 'Height is required.',
      })
      .pipe(
        z.coerce
          .number({
            message: 'Height must be a number.',
          })
          .positive({
            message: 'Height must be a positive number.',
          })
          .or(
            z
              .number({
                message: 'Height must be a number.',
              })
              .positive({
                message: 'Height must be a positive number.',
              }),
          ),
      ),
    width: z
      .string({
        required_error: 'Width is required.',
      })
      .pipe(
        z.coerce
          .number({
            message: 'Width must be a number.',
          })
          .positive({
            message: 'Width must be a positive number.',
          })
          .or(
            z
              .number({
                message: 'Width must be a number.',
              })
              .positive({
                message: 'Width must be a positive number.',
              }),
          ),
      ),
    language: z
      .string({
        required_error: 'Language is required.',
      })
      .min(2, { message: 'Language must be at least 2 characters.' })
      .max(20, { message: 'Language must be at most 20 characters.' }),
    publishedAt: z.date({
      required_error: 'Published at is required.',
    }),
    description: z.array(z.any()),
    category: z
      .array(
        z.object({
          value: z
            .string({
              required_error: 'Category is required.',
            })
            .or(
              z.number({
                required_error: 'Category is required.',
              }),
            ),
          label: z.string({
            required_error: 'Category is required.',
          }),
        }),
      )
      .min(1, 'Category is required'),
    author: z
      .array(
        z.object({
          value: z
            .string({
              required_error: 'Author is required.',
            })
            .min(5)
            .max(50),
        }),
      )
      .min(1, 'Minimum 1 author is required'),
    type: z.enum(['create', 'edit']).optional(),
    image: z.instanceof(File).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.type === 'edit' && !data.image) return

    if (!data.image || data.image.size === 0) {
      ctx.addIssue({
        code: 'custom',
        path: ['image'],
        message: 'Please upload an image',
      })
      return
    }

    if (data.image.size >= 1024 * 1024 * 2) {
      ctx.addIssue({
        code: 'custom',
        path: ['image'],
        message: 'Your resume must be less than 2MB.',
      })
    }
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

const getAll = (params: any) => {
  return alova.Get<IBaseResponseList>('/v1/category/dropdown', {
    params,
  })
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
    defaultValues: {
      ...(value ?? {
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
        category: [],
        author: [],
      }),
      type,
    },
  })

  const disabled = !form.formState.isDirty || !form.formState.isValid

  function onSubmit(values: FormRequest) {
    const formData = new FormData()
    formData.append('isbn', values.isbn)
    formData.append('sku', values.sku)
    formData.append('title', values.title)
    formData.append('slug', values.slug)
    formData.append('pages', values.pages.toString())
    formData.append('weight', values.weight.toString())
    formData.append('height', values.height.toString())
    formData.append('width', values.width.toString())
    formData.append('language', values.language)
    if (values.image) formData.append('image', values.image)
    formData.append(
      'publishedAt',
      formatDate(values.publishedAt, DATETIME_FORMAT.server),
    )
    formData.append('description', JSON.stringify(values.description))
    for (const category of values.category) {
      formData.append('category[]', category.value.toString())
    }
    for (const author of values.author) {
      formData.append('author[]', author.value)
    }

    send(formData)
      .then((res) => {
        form.reset()
        toast.success(res.message)
        navigate('/dashboard/book', {
          replace: true,
        })
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
              name='author'
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
                        value={`${value.length} author selected`}
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
          <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
            <FormField
              control={form.control}
              name='category'
              render={({ field }) => (
                <FormItem className='col-span-2'>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <MultiSelect
                      api={getAll}
                      placeholder='Select categories...'
                      value={field.value as Option[]}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='language'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Language</FormLabel>
                  <FormControl>
                    <Input placeholder='Language' type='text' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='publishedAt'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Published At</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-full pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground',
                          )}
                        >
                          {field.value ? (
                            formatDate(field.value)
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0' align='start'>
                      <Calendar
                        mode='single'
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                        disabled={(date) =>
                          date > new Date() || date < new Date('1900-01-01')
                        }
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name='image'
            render={({ field: { value, onChange, ...fieldProps } }) => (
              <FormItem>
                <FormLabel>Picture</FormLabel>
                <FormControl>
                  <Input
                    {...fieldProps}
                    placeholder='Image'
                    type='file'
                    accept='image/*'
                    onChange={(event) => onChange(event.target.files?.[0])}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
