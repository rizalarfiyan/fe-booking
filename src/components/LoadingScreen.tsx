import React, { forwardRef } from 'react'

import { cn } from '@/utils/classes'
import { Spinner } from '@components/Spinner'
import { Typography } from '@components/Typograpy'

export interface LoadingScreenProps
  extends React.HTMLAttributes<HTMLDivElement> {
  reason?: string
}

const LoadingScreen = forwardRef<HTMLDivElement, LoadingScreenProps>(
  ({ reason, className, ...rest }, ref) => {
    return (
      <div
        className={cn(
          'loading-screen mx-auto flex min-h-screen w-full items-center justify-center',
          className,
        )}
        ref={ref}
        {...rest}
      >
        <div className='flex flex-col items-center'>
          <Spinner size='xl' variant='primary' />
          {reason && (
            <Typography
              type='description'
              className='mt-4 max-w-[220px] text-center text-base text-gray-800'
            >
              {reason}
            </Typography>
          )}
        </div>
      </div>
    )
  },
)

LoadingScreen.displayName = 'LoadingScreen'

export { LoadingScreen }
