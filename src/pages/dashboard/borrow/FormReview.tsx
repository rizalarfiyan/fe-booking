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
import { Button } from '@components/Button'
import { useRequest } from 'alova'
import useHandleError from '@hooks/useHandleError'
import type { IBaseResponseList } from '@/types/base'
import { toast } from 'sonner'
import React from 'react'
import useDatatable from '@hooks/useDatatable'
import type { UseDisclosure } from '@hooks/useDislosure'
import alova from '@libs/alova'
import { Stars } from '@components/Star'
import RichText from '@components/RichText/RichText'

const formSchema = z.object({
  rating: z.number(),
  review: z.array(z.any()),
})

export type FormRequest = z.infer<typeof formSchema>

type FormHistoryProps = {
  historyId: number
  state: UseDisclosure
  value: FormRequest
}

const FormReview: React.FC<FormHistoryProps> = ({
  state,
  value,
  historyId,
}) => {
  const navigate = useNavigate()
  const { handleError } = useHandleError(navigate)
  const { refresh } = useDatatable()

  const { loading, send } = useRequest(
    (data: any) => {
      return alova.Post<IBaseResponseList>(
        `/v1/history/review/${historyId}`,
        data,
        {
          name: `review-history-${historyId}`,
        },
      )
    },
    {
      immediate: false,
    },
  )

  const form = useForm<FormRequest>({
    resolver: zodResolver(formSchema),
    defaultValues: value ?? {
      rating: 0,
      review: '',
    },
  })

  const disabled = !form.formState.isDirty || !form.formState.isValid

  function onSubmit({ review, rating }: FormRequest) {
    state.disable()
    send({
      rating,
      review: JSON.stringify(review),
    })
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
            name='rating'
            render={({ field: { value, onChange } }) => (
              <FormItem>
                <FormLabel>Rate the book</FormLabel>
                <FormControl>
                  <Stars
                    variant='primary'
                    rating={value}
                    size={42}
                    onRatingChange={(rating) => onChange(rating)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='review'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Review</FormLabel>
                <FormControl>
                  <RichText
                    id='review'
                    initialValue={field.value}
                    placeholder='Enter some review...'
                    toolbox='format'
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
            Update
          </Button>
        </DialogFooter>
      </form>
    </Form>
  )
}

export default FormReview
