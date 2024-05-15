import { Slot } from '@radix-ui/react-slot'
import { cn } from '@utils/classes'
import { type VariantProps, cva } from 'class-variance-authority'
import React, { forwardRef } from 'react'

const typographyVariants = cva('', {
  variants: {
    variant: {
      h1: 'scroll-m-20 font-extrabold text-4xl tracking-tight lg:text-5xl',
      h2: 'scroll-m-20 font-semibold text-3xl tracking-tight',
      h3: 'scroll-m-20 font-semibold text-2xl tracking-tight',
      h4: 'scroll-m-20 font-semibold text-xl tracking-tight',
      p: 'leading-tight',
      lead: 'text-secondary-400 text-xl',
      large: 'font-semibold text-lg',
      small: 'font-medium text-sm leading-none',
      muted: 'text-secondary-400 text-sm',
      link: 'underline decoration-2 decoration-primary-500/50 underline-offset-2',
      custom: '',
    },
    type: {
      description: 'text-muted-foreground',
      title: 'text-primary-600 dark:text-primary-500',
      secondary: 'text-secondary-800 dark:text-secondary-100',
      default: 'text-slate-900 dark:text-slate-50',
      'small-description': 'text-muted-foreground text-sm leading-tight',
      underline:
        'cursor-pointer underline decoration-2 decoration-current underline-offset-2',
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
