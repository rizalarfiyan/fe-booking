import { zodResolver } from '@hookform/resolvers/zod'
import Layout from '@layouts/Auth'
import React, { useState } from 'react'
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
import { Checkbox } from '@components/Checkbox'
import { Typography } from '@components/Typograpy'
import { Eye, EyeOff } from 'lucide-react'
import useAuth from '@hooks/useAuth'
import { useRequest } from 'alova'
import alova from '@libs/alova'
import useHandleError from '@hooks/useHandleError'
import type { ILoginDTO } from '@/types/auth'
import type { IBaseResponse } from '@/types/base'
import { toast } from 'sonner'

const formSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required.',
    })
    .email({
      message: 'Invalid email address.',
    }),
  password: z
    .string({
      required_error: 'Password is required.',
    })
    .min(8, { message: 'Password is required' }),
  isRemember: z.boolean().default(false).optional(),
})

type FormRequest = z.infer<typeof formSchema>

const Component: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const { login } = useAuth()
  const navigate = useNavigate()
  const { handleError } = useHandleError(navigate)

  const { loading, send } = useRequest(
    (req) =>
      alova.Post<IBaseResponse<ILoginDTO>, FormRequest>('/v1/auth/login', req),
    {
      immediate: false,
    },
  )

  const form = useForm<FormRequest>({
    resolver: zodResolver(formSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
      isRemember: false,
    },
  })

  const disabled = !form.formState.isDirty || !form.formState.isValid

  function onSubmit(values: FormRequest) {
    send(values)
      .then((res) => {
        toast.success(res.message)
        login(res.data.user, res.data.token)
        navigate('/dashboard', {
          replace: true,
        })
      })
      .catch((err) => handleError(err, form))
  }

  const onTogglePassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setShowPassword((prev) => !prev)
  }

  return (
    <Layout
      title='Login'
      description='Sign in to access your account. Once logged in, manage your profile and access exclusive features.'
      hasBack
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='space-y-4'>
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
              name='isRemember'
              render={({ field }) => (
                <FormItem className='flex flex-row items-center space-x-2 space-y-0'>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className='cursor-pointer space-y-1 leading-none'>
                    Stay Logged In?
                  </FormLabel>
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
              Login
            </Button>
            <Typography as='p' type='description'>
              <span>Haven’t an account? </span>
              <Typography type='underline' asChild>
                <Link to='/register'>Register</Link>
              </Typography>
              <span>. or </span>
              <Typography type='underline' asChild>
                <Link to='/forgot-password'>Forgot your Password</Link>
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
