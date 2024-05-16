import React from 'react'
import { Typography } from '@components/Typograpy'
import { cn } from '@utils/classes'

interface TitleDescriptionProps {
  title: string
  description: string
  className?: string
}

const TitleDescription: React.FC<TitleDescriptionProps> = ({
  title,
  description,
  className,
}) => (
  <div className={cn('mx-auto max-w-md space-y-2 text-center', className)}>
    <Typography as='h2'>{title}</Typography>
    <Typography type='description'>{description}</Typography>
  </div>
)

export { TitleDescription }
