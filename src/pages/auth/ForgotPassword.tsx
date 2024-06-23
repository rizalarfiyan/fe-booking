import { zodResolver } from '@hookform/resolvers/zod'
import Layout from '@layouts/Auth'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
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
import { Typography } from '@components/Typograpy'
import useHandleError from '@hooks/useHandleError'
import alova from '@libs/alova'
import type { IBaseResponse } from '@/types/base'
import { useRequest } from 'alova'
import { toast } from 'sonner'

const formSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required.',
    })
    .email({
      message: 'Invalid email address.',
    }),
})

type FormRequest = z.infer<typeof formSchema>

const Component: React.FC = () => {
  const navigate = useNavigate()
  const { handleError } = useHandleError(navigate)

  const { loading, send } = useRequest(
    (req) =>
      alova.Post<IBaseResponse, FormRequest>('/v1/auth/forgot-password', req),
    {
      immediate: false,
    },
  )

  const form = useForm<FormRequest>({
    resolver: zodResolver(formSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
    },
  })

  const disabled = !form.formState.isDirty || !form.formState.isValid

  function onSubmit(values: FormRequest) {
    send(values)
      .then((res) => {
        toast.success(res.message)
        navigate('/login', {
          replace: true,
        })
      })
      .catch((err) => handleError(err, form))
  }

  return (
    <Layout
      title='Forgot Password'
      description='Trouble accessing your account? No worries! Just enter your email to reset your password and regain access.'
      hasBack
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder='email@domain.com'
                    type='email'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='space-y-2'>
            <Button
              type='submit'
              isFluid
              isLoading={loading}
              disabled={disabled}
            >
              Forgot Password
            </Button>
            <Typography as='p' type='description'>
              <span>Not sure? Back to </span>
              <Typography type='underline' asChild>
                <Link to='/login'>Login</Link>
              </Typography>
              <span>.</span>
            </Typography>
          </div>
        </form>
      </Form>
    </Layout>
  )
}

export { Component as default }
