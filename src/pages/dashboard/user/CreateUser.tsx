import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/Dialog'
import { Eye, EyeOff, Plus, PlusCircle } from 'lucide-react'
import { Button } from '@components/Button'
import { useDisclosure } from '@hooks/useDislosure'
import React, { useState } from 'react'
import alova from '@libs/alova'
import type { IBaseResponse } from '@/types/base'
import { useNavigate } from 'react-router-dom'
import useHandleError from '@hooks/useHandleError'
import useDatatable from '@hooks/useDatatable'
import { useRequest } from 'alova'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/Form'
import { Input } from '@components/Input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/Select'
import { DROPDOWN_USER_ROLE, DROPDOWN_USER_STATUS } from '@/constants/app'

const formSchema = z
  .object({
    firstName: z.string().min(3),
    lastName: z.string().optional(),
    email: z.string().email(),
    password: z.string().min(5, 'Password is required'),
    passwordConfirmation: z.string(),
    role: z.string(),
    status: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Password don't match",
    path: ['passwordConfirmation'],
  })

export type FormRequest = z.infer<typeof formSchema>

const CreateUser: React.FC = () => {
  const state = useDisclosure()

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    state.open()
  }

  const [showPassword, setShowPassword] = useState<boolean>(false)
  const navigate = useNavigate()
  const { handleError } = useHandleError(navigate)
  const { refresh } = useDatatable()

  const { loading, send } = useRequest(
    (req) =>
      alova.Post<IBaseResponse<any>, any>('/v1/user', req, {
        name: 'create-user',
      }),
    {
      immediate: false,
    },
  )

  const form = useForm<FormRequest>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      passwordConfirmation: '',
      role: '',
      status: '',
    },
  })

  const disabled = !form.formState.isDirty || !form.formState.isValid

  const onSubmit = (values: FormRequest) => {
    state.disable()
    send(values)
      .then((res) => {
        refresh()
        form.reset()
        toast.success(res.message)
        state.close(true)
      })
      .catch((err) => handleError(err, form))
      .finally(() => state.enable())
  }

  const onTogglePassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setShowPassword((prev) => !prev)
  }

  return (
    <Dialog open={state.isOpen} onOpenChange={() => state.close()}>
      <DialogTrigger asChild>
        <Button
          variant='outline'
          leftIcon={<Plus className='mr-2 size-4' />}
          onClick={onClick}
        >
          Create
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <PlusCircle className='size-6' />
            Create User
          </DialogTitle>
          <DialogDescription>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
            blanditiis debitis dicta repellendus tempora.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <div className='space-y-4'>
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
              <div className='flex flex-col gap-4 md:flex-row'>
                <FormField
                  control={form.control}
                  name='role'
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormLabel>Role</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger
                            defaultValue={DROPDOWN_USER_ROLE[0].value}
                          >
                            <SelectValue placeholder='Select a user role' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {DROPDOWN_USER_ROLE.map(({ label, value }) => {
                            return (
                              <SelectItem value={value} key={value}>
                                {label}
                              </SelectItem>
                            )
                          })}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='status'
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormLabel>Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger
                            defaultValue={DROPDOWN_USER_STATUS[0].value}
                          >
                            <SelectValue placeholder='Select a user status' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {DROPDOWN_USER_STATUS.map(({ label, value }) => {
                            return (
                              <SelectItem value={value} key={value}>
                                {label}
                              </SelectItem>
                            )
                          })}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type='submit' isLoading={loading} disabled={disabled}>
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateUser
