import { zodResolver } from '@hookform/resolvers/zod'
import { Typography } from '@components/Typograpy'
import React from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { Bot, Handshake, MessageSquare, Newspaper, Send } from 'lucide-react'
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
import type { IContactInformation } from '@/types/data'
import CardContactInformation from '@components/Card/ContactInformation'
import { TitleDescription } from '@components/TitleDescription'
import type { IBaseResponse } from '@/types/base'
import { useNavigate } from 'react-router-dom'
import useHandleError from '@hooks/useHandleError'
import { useRequest } from 'alova'
import alova from '@libs/alova'
import { toast } from 'sonner'

const contacts: IContactInformation[] = [
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

const formSchema = z.object({
  firstName: z
    .string()
    .min(3, { message: 'First name must be at least 3 characters.' }),
  lastName: z.string().optional(),
  email: z.string().email(),
  phone: z
    .string()
    .refine(
      (value) =>
        /^(\+62|62)?[\s-]?(0)?8[1-9]{1}\d{1}[\s-]?\d{4}[\s-]?\d{2,5}$/.test(
          value ?? '',
        ),
      'Phone number must be a valid Indonesian phone number.',
    ),
  message: z
    .string()
    .min(10, { message: 'Message must be at least 10 characters.' }),
})

type FormRequest = z.infer<typeof formSchema>

const Component: React.FC = () => {
  const navigate = useNavigate()
  const { handleError } = useHandleError(navigate)

  const { loading, send } = useRequest(
    (req) =>
      alova.Post<IBaseResponse, FormRequest>('/v1/contact', req, {
        name: 'create-contact',
      }),
    {
      immediate: false,
    },
  )

  const form = useForm<FormRequest>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      message: '',
    },
  })

  const disabled = !form.formState.isDirty || !form.formState.isValid

  function onSubmit(values: FormRequest) {
    send(values)
      .then((res) => {
        toast.success(res.message)
        form.reset()
      })
      .catch((err) => handleError(err, form))
  }

  return (
    <div className='container mt-28 mb-20 space-y-20'>
      <div className='space-y-10'>
        <TitleDescription
          title='Get in Touch'
          description='We love hearing from you! Please select the appropriate option below
            and send us a message.'
        />
        <div className='mx-auto flex flex-wrap justify-center gap-4'>
          {contacts.map((contact, idx) => (
            <CardContactInformation key={idx} {...contact} />
          ))}
        </div>
      </div>
      <div className='space-y-10'>
        <div className='mx-auto max-w-md space-y-2 text-center'>
          <Typography as='h2'>Message Us</Typography>
          <Typography type='description'>
            We'll get back to you within 24 hours.
          </Typography>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='mx-auto max-w-md space-y-4'
          >
            <div className='flex flex-col gap-4 md:flex-row'>
              <FormField
                control={form.control}
                name='firstName'
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
                name='lastName'
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
                    <Input placeholder='0896223232392' type='text' {...field} />
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
                      className='max-h-80 min-h-24'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type='submit'
              rightIcon={<Send className='ml-2 size-4' />}
              isFluid
              isLoading={loading}
              disabled={disabled}
            >
              Send
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

export { Component as default }
