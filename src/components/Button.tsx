import { Slot, Slottable } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/utils/classes'
import { Loader2 } from 'lucide-react'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap font-medium text-sm ring-offset-background transition-colors disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
      rounded: {
        md: 'rounded-md',
        lg: 'rounded-lg',
        full: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      rounded: 'md',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  rightIcon?: React.ReactElement
  leftIcon?: React.ReactElement
  isLoading?: boolean
  isFluid?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      rounded,
      isLoading,
      isFluid,
      rightIcon,
      leftIcon,
      disabled,
      asChild = false,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button'
    const classNames = cn(
      buttonVariants({ variant, size, rounded, className }),
      isLoading && 'cursor-progress',
      isFluid && 'w-full',
    )

    if (isLoading && Comp === 'button') {
      return (
        <Comp
          className={classNames}
          disabled={disabled || isLoading}
          ref={ref}
          {...props}
        >
          <Loader2 className='mr-2 animate-spin' />
          <span>Loading</span>
        </Comp>
      )
    }

    return (
      <Comp
        className={classNames}
        disabled={disabled || isLoading}
        ref={ref}
        {...props}
      >
        {leftIcon ?? leftIcon}
        <Slottable>{children}</Slottable>
        {rightIcon ?? rightIcon}
      </Comp>
    )
  },
)

Button.displayName = 'Button'

export { Button, buttonVariants }
