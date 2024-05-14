import * as React from 'react'
import { cn } from '@/utils/classes'
import type { LucideIcon } from 'lucide-react'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: LucideIcon
  action?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon: Icon, action, ...props }, ref) => {
    return (
      <div className='relative'>
        <input
          type={type}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background disabled:cursor-not-allowed file:border-0 file:bg-transparent file:font-medium file:text-sm placeholder:text-muted-foreground disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            Icon && 'pl-10',
            className,
          )}
          ref={ref}
          {...props}
        />
        {Icon && (
          <Icon className='absolute top-2.5 left-2.5 size-5 text-slate-400 dark:text-slate-600' />
        )}
        {action}
      </div>
    )
  },
)

Input.displayName = 'Input'

export { Input }
