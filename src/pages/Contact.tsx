import { zodResolver } from '@hookform/resolvers/zod'
import { Typography } from '@components/Typograpy'
import React from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import {
  Bot,
  Handshake,
  type LucideIcon,
  MessageSquare,
  Newspaper,
} from 'lucide-react'
import { Button } from '@components/Button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/Form'
import { Input } from '@components/Input'
import { Textarea } from '@components/Textarea'

interface ICcontact {
  icon: LucideIcon
  title: string
  description: string
}

const formSchema = z.object({
  first_name: z.string().min(3),
  last_name: z.string().optional(),
  email: z.string().email(),
  phone: z.number().optional(),
  message: z.string().optional(),
})

const contacts: ICcontact[] = [
  {
    icon: Bot,
    title: 'General Questions',
    description: 'We are ready to help you with any questions you have.',
  },
  {
    icon: MessageSquare,
    title: 'Complaints or Feedback',
    description:
      'We value every feedback we receive from our customers and strive to continually improve our services.',
  },
  {
    icon: Handshake,
    title: 'Cooperation and Partnership',
    description: 'We look forward to the opportunity to collaborate with you!.',
  },
  {
    icon: Newspaper,
    title: 'Media dan Pers',
    description:
      'We are ready to provide the information you need for your article or coverage.',
  },
]

const Component: React.FC = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      message: '',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <div className='space-y-20 pb-20'>
      <div className='space-y-10'>
        <div className='text-center max-w-md mx-auto space-y-2'>
          <Typography as='h2'>Get in Touch</Typography>
          <Typography as='p'>
            We love hearing from you! Please select the appropriate option below
            and send us a message.
          </Typography>
        </div>
        <div className='flex gap-4 justify-center'>
          {contacts.map(({ title, description, icon: Icon }, idx) => (
            <div key={idx} className='border rounded-md p-6 max-w-64 space-y-3'>
              <Button variant='secondary' size='icon' className='size-10'>
                <Icon className='size-6' />
              </Button>
              <div className='space-y-1'>
                <Typography as='h3' variant='p' className='font-semibold'>
                  {title}
                </Typography>
                <Typography className='text-sm leading-tight'>
                  {description}
                </Typography>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='space-y-10'>
        <div className='text-center max-w-md mx-auto space-y-2'>
          <Typography as='h2'>Message Us</Typography>
          <Typography as='p'>We'll get back to you within 24 hours.</Typography>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-6 max-w-md mx-auto'
          >
            <div className='flex gap-6'>
              <FormField
                control={form.control}
                name='first_name'
                render={({ field }) => (
                  <FormItem className='w-full'>
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
                  <FormItem className='w-full'>
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
              name='phone'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder='+62812-3443-5686' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='message'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Your Message'
                      className='resize-none'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit' className='w-full'>
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

export { Component as default }
