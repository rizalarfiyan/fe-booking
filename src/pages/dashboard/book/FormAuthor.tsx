import { type Control, useFieldArray } from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/Form'
import { Input } from '@/components/Input'
import { Button } from '@components/Button'
import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/Dialog'
import { Plus, PlusCircle, Trash2 } from 'lucide-react'
import type { FormRequest } from '@pages/dashboard/book/FormBook'

type FormCategoryProps = {
  control: Control<FormRequest>
}

const FormCategory: React.FC<FormCategoryProps> = ({ control }) => {
  const { fields, append, remove } = useFieldArray({
    name: 'authors',
    control: control,
  })

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button leftIcon={<Plus className='mr-2 size-4' />}>Create</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <PlusCircle className='size-6' />
            Edit Author
          </DialogTitle>
          <DialogDescription>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
            blanditiis debitis dicta repellendus tempora.
          </DialogDescription>
        </DialogHeader>
        <div className='-m-2 max-h-[calc(100vh_-_280px)] space-y-4 overflow-y-auto p-2'>
          {fields.map((field, index) => {
            return (
              <div key={field.id} className='flex gap-4'>
                <FormField
                  control={control}
                  name={`authors.${index}.value`}
                  render={({ field }) => (
                    <FormItem className='flex-1'>
                      <FormControl>
                        <Input
                          placeholder={`Author ${index + 1}`}
                          type='text'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type='button'
                  size='icon'
                  variant='destructive'
                  onClick={() => remove(index)}
                >
                  <Trash2 className='size-4' />
                </Button>
              </div>
            )
          })}
        </div>
        <DialogFooter className='pt-6'>
          <Button
            type='button'
            variant='outline'
            onClick={() => append({ value: '' })}
          >
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default FormCategory
