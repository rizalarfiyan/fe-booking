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
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            Icon && 'pl-10',
            className,
          )}
          ref={ref}
          {...props}
        />
        {Icon && (
          <Icon className='size-5 absolute left-2.5 top-2.5 text-slate-400 dark:text-slate-600' />
        )}
        {action}
      </div>
    )
  },
)

Input.displayName = 'Input'

export { Input }
