import React from 'react'
import { Card, CardContent } from '@components/Card'
import { Typography } from '@components/Typograpy'
import { BadgeCheck, BadgeX } from 'lucide-react'
import { TIERS } from '@/constants/dashboard'

interface TierLeaderboardProps {
  point: number
}

const TierLeaderboard: React.FC<TierLeaderboardProps> = ({
  point: currentPoint,
}) => {
  return (
    <Card className='w-full space-y-3 p-6'>
      <CardContent className='flex flex-col divide-y p-0'>
        {TIERS.map(({ title, description, image, point }, idx) => {
          return (
            <div
              key={idx}
              className='flex flex-col items-center gap-4 py-4 xs:flex-row'
            >
              <div className='flex flex-col items-center gap-2 xs:flex-row'>
                <div className='size-14 flex-shrink-0'>
                  <img
                    src={image}
                    alt={title}
                    className='h-auto w-full object-contain'
                  />
                </div>
                <div className='flex flex-1 flex-col gap-0.5'>
                  <Typography as='h3' className='text-lg'>
                    {title}
                  </Typography>
                  <Typography as='p' type='small-description'>
                    {description}
                  </Typography>
                </div>
              </div>
              <div>
                {currentPoint >= point ? (
                  <BadgeCheck className='size-8 text-emerald-500' />
                ) : (
                  <BadgeX className='size-8 text-red-500' />
                )}
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}

export default TierLeaderboard
