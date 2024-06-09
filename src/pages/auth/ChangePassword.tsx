import { zodResolver } from '@hookform/resolvers/zod'
import Layout from '@layouts/Auth'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
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
import { BadgeX, Eye, EyeOff } from 'lucide-react'
import { useRequest } from 'alova'
import type { IBaseResponse } from '@/types/base'
import alova from '@libs/alova'
import { toast } from 'sonner'
import useHandleError from '@hooks/useHandleError'

const formSchema = z
  .object({
    password: z.string().min(5, 'Password is required'),
    passwordConfirmation: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Password don't match",
    path: ['passwordConfirmation'],
  })

type FormRequest = z.infer<typeof formSchema>

const Component: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const navigate = useNavigate()
  const { handleError } = useHandleError(navigate)
  const [searchParams] = useSearchParams()

  const { loading, send } = useRequest(
    (req) =>
      alova.Post<IBaseResponse, FormRequest>('/v1/auth/change-password', req),
    {
      immediate: false,
    },
  )

  const form = useForm<FormRequest>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      passwordConfirmation: '',
    },
  })

  const code = searchParams.get('code')
  const isValidCode = code?.length === 50
  const disabled = !form.formState.isDirty || !form.formState.isValid

  function onSubmit(values: FormRequest) {
    send({ ...values, code })
      .then((res) => {
        toast.success(res.message)
        navigate('/login', {
          replace: true,
        })
      })
      .catch((err) =>
        handleError(err, form, {
          callback: () => {
            navigate('/login', {
              replace: true,
            })
          },
        }),
      )
  }

  const onTogglePassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setShowPassword((prev) => !prev)
  }

  return (
    <Layout
      title='Change Password'
      description='Prioritize your accounts security and privacy by setting a new password to strengthen protection measures.'
      hasBack
      replaceBack
    >
      {isValidCode ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <div className='space-y-4'>
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='************'
                        type={showPassword ? 'text' : 'password'}
                        className='pr-10'
                        action={
                          <Button
                            type='button'
                            size='icon'
                            className='absolute top-1.5 right-1.5 size-7'
                            onClick={onTogglePassword}
                          >
                            {showPassword ? (
                              <EyeOff className='size-4' />
                            ) : (
                              <Eye className='size-4' />
                            )}
                          </Button>
                        }
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='passwordConfirmation'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password Confirmation</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='************'
                        type={showPassword ? 'text' : 'password'}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='space-y-2'>
              <Button
                type='submit'
                isFluid
                isLoading={loading}
                disabled={disabled}
              >
                Change Password
              </Button>
              <Typography as='p' type='description'>
                <span>Not sure? Back to </span>
                <Typography type='underline' asChild>
                  <Link to='/login' replace>
                    Login
                  </Link>
                </Typography>
                <span>.</span>
              </Typography>
            </div>
          </form>
        </Form>
      ) : (
        <div className='mx-auto max-w-sm py-8 text-center'>
          <div className='space-y-4'>
            <BadgeX className='mx-auto size-20 text-red-500 dark:text-red-400' />
            <Typography
              className='font-semibold dark:text-slate-200'
              type='description'
            >
              Invalid change password code
            </Typography>
          </div>
          <Button isFluid asChild className='mt-8'>
            <Link to='/login' replace>
              Back to Login
            </Link>
          </Button>
        </div>
      )}
    </Layout>
  )
}

export { Component as default }
