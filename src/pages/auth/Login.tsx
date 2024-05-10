import { zodResolver } from '@hookform/resolvers/zod'
import Layout from '@layouts/Auth'
import React from 'react'
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
import { Checkbox } from '@components/Checkbox'

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5, 'Password is required'),
  isRemember: z.boolean().default(false).optional(),
})

const Component: React.FC = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      isRemember: false,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <Layout
      title='Login'
      description='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto blanditiis ea fugit nam nisi, officia.'
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
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='************'
                      type='password'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
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
                <div className='space-y-1 leading-none cursor-pointer'>
                  <FormLabel className='cursor-pointer'>
                    Stay Logged In?
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />
          <div className='space-y-2'>
            <Button type='submit' className='w-full rounded-md'>
              Submit
            </Button>
            <p className='text-slate-500'>
              <span>Haven’t an account? </span>
              <Link to='/register' className='underline'>
                Register
              </Link>
              <span>. or </span>
              <Link to='/forgot-password' className='underline'>
                Forgot your Password
              </Link>
              <span>.</span>
            </p>
          </div>
        </form>
      </Form>
    </Layout>
  )
}

export { Component as default }
