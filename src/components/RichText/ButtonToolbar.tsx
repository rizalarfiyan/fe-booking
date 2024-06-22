import React, { forwardRef } from 'react'
import { useSlate } from 'slate-react'
import {
  isBlockActive,
  isMarkActive,
  toggleBlock,
  toggleMark,
} from '@/utils/richText'
import { TEXT_ALIGN_TYPES } from '@/constants/richText'
import { cn } from '@utils/classes'
import type { LucideIcon } from 'lucide-react'

type ButtonToolbarProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'type'
> &
  IButtonToolbarProps

type IButtonToolbarProps = {
  icon: LucideIcon
  format?: string
  type?: 'block' | 'mark'
}

const ButtonToolbar = forwardRef<HTMLButtonElement, ButtonToolbarProps>(
  ({ format, icon: Icon, type, className, disabled, ...rest }, ref) => {
    const editor = useSlate()

    const baseClassName =
      'p-2.5 text-slate-500 rounded-md cursor-pointer hover:text-primary-800 hover:bg-secondary-100 dark:hover:bg-primary-100 transition-colors duration-300 outline-primary-500 focus:bg-primary-100 focus:text-primary-800 disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none'

    const attr = () => {
      switch (type) {
        case 'block':
          return {
            className: cn(
              baseClassName,
              isBlockActive(
                editor,
                format,
                TEXT_ALIGN_TYPES.includes(format as string) ? 'align' : 'type',
              ) && 'bg-primary-100 text-primary-800',
              className,
            ),
            onMouseDown: (event: React.MouseEvent<HTMLButtonElement>) => {
              event.preventDefault()
              toggleBlock(editor, format)
            },
            disabled,
            ...rest,
          }
        case 'mark':
          return {
            className: cn(
              baseClassName,
              isMarkActive(editor, format) && 'bg-primary-100 text-primary-800',
              className,
            ),
            onMouseDown: (event: React.MouseEvent<HTMLButtonElement>) => {
              event.preventDefault()
              toggleMark(editor, format)
            },
            disabled,
            ...rest,
          }
        default:
          return {
            className: cn(baseClassName, className),
            disabled,
            ...rest,
          }
      }
    }

    return (
      <button ref={ref} type='button' {...attr()}>
        <Icon className='size-4' />
      </button>
    )
  },
)

ButtonToolbar.displayName = 'ButtonToolbar'

export default ButtonToolbar
