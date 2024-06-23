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
import { Typography } from '@components/Typograpy'
import { Eye, EyeOff } from 'lucide-react'
import useHandleError from '@hooks/useHandleError'
import type { IBaseResponse } from '@/types/base'
import { useRequest } from 'alova'
import alova from '@libs/alova'
import { toast } from 'sonner'

const formSchema = z
  .object({
    firstName: z
      .string({
        required_error: 'First name is required.',
      })
      .min(3, { message: 'First name must be at least 3 characters.' })
      .max(50, { message: 'First name must be at most 50 characters.' }),
    lastName: z.optional(
      z
        .string({
          required_error: 'Last name is required.',
        })
        .min(3, { message: 'Last name must be at least 3 characters.' })
        .max(50, { message: 'Last name must be at most 50 characters.' }),
    ),
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
      .min(8, { message: 'Password must be at least 8 characters.' })
      .max(32, { message: 'Password must be at most 32 characters.' }),
    passwordConfirmation: z
      .string({
        required_error: 'Password confirmation is must same with password.',
      })
      .min(8, {
        message: 'Password confirmation is must same with the password.',
      })
      .max(32, {
        message: 'Password confirmation is must same with the password.',
      }),
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

  const { loading, send } = useRequest(
    (req) => alova.Post<IBaseResponse, FormRequest>('/v1/auth/register', req),
    {
      immediate: false,
    },
  )

  const form = useForm<FormRequest>({
    resolver: zodResolver(formSchema),
    mode: 'onBlur',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirmation: '',
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

  const onTogglePassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setShowPassword((prev) => !prev)
  }

  return (
    <Layout
      title='Register'
      description='To create an account, fill out the form. Upon completion, you receive a confirmation email to activate your account.'
      hasBack
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='space-y-4'>
            <div className='flex flex-col gap-4 md:flex-row'>
              <FormField
                control={form.control}
                name='firstName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Paijo' type='text' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='lastName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Joyo' type='text' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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
              Register
            </Button>
            <Typography as='p' type='description'>
              <span>Have an account? </span>
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
