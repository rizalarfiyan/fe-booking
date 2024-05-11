import { zodResolver } from '@hookform/resolvers/zod'
import Layout from '@layouts/Auth'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
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
import { Typography } from '@components/Typograpy.tsx'
import { Eye } from 'lucide-react'

const formSchema = z
  .object({
    first_name: z.string().min(3),
    last_name: z.string().optional(),
    email: z.string().email(),
    password: z.string().min(5, 'Password is required'),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Password don't match",
    path: ['password_confirmation'],
  })

const Component: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      password_confirmation: '',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  const onTogglePassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setShowPassword((prev) => !prev)
  }

  return (
    <Layout
      title='Register'
      description='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto blanditiis ea fugit nam nisi, officia.'
      hasBack
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='space-y-4'>
            <div className='flex flex-col md:flex-row gap-6'>
              <FormField
                control={form.control}
                name='first_name'
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
                name='last_name'
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
                    <div className='relative'>
                      <Input
                        placeholder='************'
                        type={showPassword ? 'text' : 'password'}
                        {...field}
                      />
                      <Button
                        type='button'
                        size='icon'
                        className='size-7 absolute right-1.5 top-1.5'
                        onClick={onTogglePassword}
                      >
                        <Eye className='size-4' />
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name='password_confirmation'
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
          <div className='space-y-2'>
            <Button type='submit' className='w-full'>
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
