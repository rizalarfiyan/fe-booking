import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/Dialog'
import { Pencil } from 'lucide-react'
import { Button } from '@components/Button'
import { useDisclosure } from '@hooks/useDislosure'
import React from 'react'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/Select'
import { DROPDOWN_USER_ROLE, DROPDOWN_USER_STATUS } from '@/constants/app'
import type { AuthRole } from '@/types/auth'
import type { UserStatus } from '@/types/user'

const formSchema = z.object({
  role: z.string(),
  status: z.string(),
})

export type FormRequest = z.infer<typeof formSchema>

export interface EditUserProps {
  id: number
  role?: AuthRole
  status?: UserStatus
}

const EditUser: React.FC<EditUserProps> = ({ id, role, status }) => {
  const state = useDisclosure()

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    state.open()
  }

  const navigate = useNavigate()
  const { handleError } = useHandleError(navigate)
  const { refresh } = useDatatable()

  const { loading, send } = useRequest(
    (req) =>
      alova.Post<IBaseResponse<any>, any>(`/v1/user/${id}`, req, {
        name: `edit-user-${id}`,
      }),
    {
      immediate: false,
    },
  )

  const form = useForm<FormRequest>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: role ?? '',
      status: status ?? '',
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

  return (
    <Dialog open={state.isOpen} onOpenChange={() => state.close()}>
      <DialogTrigger asChild>
        <Button
          size='icon'
          variant='outline'
          className='size-8'
          onClick={onClick}
        >
          <Pencil className='size-4' />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <Pencil className='size-6' />
            Edit User
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
                            defaultValue={role ?? DROPDOWN_USER_ROLE[0].value}
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
                            defaultValue={
                              status ?? DROPDOWN_USER_STATUS[0].value
                            }
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
                Update
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default EditUser
