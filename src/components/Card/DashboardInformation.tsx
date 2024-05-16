import React from 'react'
import { Card, CardContent, CardHeader } from '@components/Card'
import { Typography } from '@components/Typograpy'
import type { LucideIcon } from 'lucide-react'

interface DashboardInformationProps {
  label: string
  value: string
  icon: LucideIcon
  description: string
  tier?: string
}

const DashboardInformation: React.FC<DashboardInformationProps> = ({
  label,
  value,
  icon: Icon,
  description,
  tier,
}) => {
  return (
    <Card className='relative z-[1] overflow-hidden'>
      <Icon className='-right-10 absolute top-1 z-[-1] size-32 text-slate-400 opacity-10 dark:text-slate-200' />
      <CardHeader className='pb-2'>
        <Typography as='h3' variant='p' type='description'>
          {label}
        </Typography>
      </CardHeader>
      <CardContent className='space-y-2'>
        <div className='flex items-center gap-2'>
          <Typography as='h4' variant='h3'>
            {value}
          </Typography>
          {tier && <img src={tier} alt={label} className='size-8' />}
        </div>
        <Typography as='p' type='small-description'>
          {description}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default DashboardInformation
