import React from 'react'
import { Card, CardContent, CardHeader } from '@components/Card'
import { Button } from '@components/Button'
import { Typography } from '@components/Typograpy'
import type { IContactInformation } from '@/types/data'

const CardContactInformation: React.FC<IContactInformation> = ({
  icon: Icon,
  title,
  description,
}) => {
  return (
    <Card className='w-full max-w-72'>
      <CardHeader className='pb-3'>
        <Button variant='default' size='icon' className='size-10' asChild>
          <div>
            <Icon className='size-6' />
          </div>
        </Button>
      </CardHeader>
      <CardContent className='space-y-1'>
        <Typography as='h3' variant='h4' className='text-lg'>
          {title}
        </Typography>
        <Typography type='small-description'>{description}</Typography>
      </CardContent>
    </Card>
  )
}

export default CardContactInformation
