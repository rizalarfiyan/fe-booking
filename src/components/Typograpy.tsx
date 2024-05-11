import { Slot } from '@radix-ui/react-slot'
import { cn } from '@utils/classes.ts'
import { type VariantProps, cva } from 'class-variance-authority'
import React, { forwardRef } from 'react'

const typographyVariants = cva('', {
  variants: {
    variant: {
      h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
      h2: 'scroll-m-20 text-3xl font-semibold tracking-tight',
      h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
      h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
      p: 'leading-tight',
      lead: 'text-xl text-secondary-400',
      large: 'text-lg font-semibold',
      small: 'text-sm font-medium leading-none',
      muted: 'text-sm text-secondary-400',
      link: 'underline decoration-primary-500/50 decoration-2 underline-offset-2',
      custom: '',
    },
    type: {
      description: 'text-secondary-600 dark:text-slate-200/50',
      title: 'text-primary-600 dark:text-primary-500',
      secondary: 'text-secondary-800 dark:text-secondary-100',
      default: 'text-slate-900 dark:text-slate-50',
      underline:
        'underline decoration-current decoration-2 cursor-pointer underline-offset-2',
    },
  },
  defaultVariants: {
    variant: 'p',
    type: 'default',
  },
})

export type TypographyAlias =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'span'

export type DefaultTypography = Record<
  TypographyAlias,
  VariantProps<typeof typographyVariants>['variant']
>

export interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  as?: TypographyAlias
  asChild?: boolean
}

const defaultTypography: DefaultTypography = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h4',
  h6: 'h4',
  p: 'p',
  span: 'p',
}

const Typography = forwardRef<HTMLHeadingElement, TypographyProps>(
  (
    { variant, type, className, as = 'p', children, asChild, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : as

    return (
      <Comp
        className={cn(
          typographyVariants({
            variant: variant ?? defaultTypography[as],
            type,
            className,
          }),
        )}
        ref={ref}
        {...props}
      >
        {children}
      </Comp>
    )
  },
)

Typography.displayName = 'Typography'

export { Typography, typographyVariants }
