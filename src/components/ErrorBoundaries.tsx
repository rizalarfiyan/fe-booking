import React from 'react'
import { cn } from '@utils/classes'
import { ChevronLeft, CircleX, type LucideIcon } from 'lucide-react'
import { Typography } from '@components/Typograpy'
import { Button } from '@components/Button'
import { Link, useRouteError } from 'react-router-dom'

interface ErrorBoundariesProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  hideBackButton?: boolean
  backTo?: string
  backMessage?: string
  title: string
  description?: string
  icon?: LucideIcon
}

const ErrorBoundaries = React.forwardRef<HTMLDivElement, ErrorBoundariesProps>(
  (
    {
      className,
      hideBackButton = false,
      backTo = '/',
      backMessage = 'Back to Home',
      title,
      description = 'Something went wrong. Please try again later.',
      icon: Icon = CircleX,
      ...props
    },
    ref,
  ) => (
    <div
      ref={ref}
      role='alert'
      className={cn(
        'container flex min-h-[calc(100vh_-_300px)] w-full flex-col items-center justify-center gap-2 space-y-6',
        className,
      )}
      {...props}
    >
      <div className='space-y-2 text-center'>
        <Icon className='mx-auto size-20 text-muted-foreground opacity-20' />
        <Typography as='h1' variant='h2'>
          {title}
        </Typography>
        <Typography as='p' type='description'>
          {description}
        </Typography>
      </div>
      {!hideBackButton && (
        <Button asChild variant='secondary' className='border-secondary-300'>
          <Link to={backTo}>
            <ChevronLeft className='mr-2 h-5 w-5' />
            <span>{backMessage}</span>
          </Link>
        </Button>
      )}
    </div>
  ),
)

ErrorBoundaries.displayName = 'ErrorBoundaries'

const DefaultErrorBoundaries = () => {
  const err = useRouteError() as Error
  return <ErrorBoundaries title={err.message} />
}

export default ErrorBoundaries
export { DefaultErrorBoundaries }
