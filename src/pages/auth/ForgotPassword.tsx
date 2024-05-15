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
import { Typography } from '@components/Typograpy'

const formSchema = z.object({
  email: z.string().email(),
})

const Component: React.FC = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <Layout
      title='Forgot Password'
      description='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto blanditiis ea fugit nam nisi, officia.'
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
            <Button type='submit' isFluid>
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
