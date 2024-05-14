import React, { forwardRef } from 'react'

import { cn } from '@/utils/classes'
import { cva, type VariantProps } from 'class-variance-authority'

const spinnerVariants = cva('animate-spin', {
  variants: {
    variant: {
      default: 'text-secondary-500',
      primary: 'text-primary-500',
    },
    size: {
      xs: 'size-3',
      sm: 'size-4',
      md: 'h-6 w-6',
      lg: 'h-8 w-8',
      xl: 'h-12 w-12',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
})

export interface SpinnerProps
  extends React.HTMLAttributes<SVGSVGElement>,
    VariantProps<typeof spinnerVariants> {
  asChild?: boolean
}

const Spinner = forwardRef<SVGSVGElement, SpinnerProps>(
  ({ size, variant, className, ...rest }, ref) => {
    const classes = spinnerVariants({ size, variant, className })

    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        stroke='currentColor'
        className={cn(classes, className)}
        fill='none'
        viewBox='0 0 66 66'
        ref={ref}
        {...rest}
      >
        <circle
          cx='33'
          cy='33'
          fill='none'
          r='28'
          stroke='currentColor'
          strokeWidth='10'
          className='opacity-30'
        />
        <circle
          cx='33'
          cy='33'
          fill='none'
          r='28'
          stroke='currentColor'
          strokeDasharray='40, 134'
          strokeDashoffset='325'
          strokeLinecap='round'
          strokeWidth='10'
        />
      </svg>
    )
  },
)

Spinner.displayName = 'Spinner'

export { Spinner }
