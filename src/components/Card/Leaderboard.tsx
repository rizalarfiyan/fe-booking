import { Bolt, BookOpenText, Trophy } from 'lucide-react'
import React, { useMemo } from 'react'
import { getOrdinal } from '@utils/number'
import { Card, CardContent } from '@components/Card'
import { Typography } from '@components/Typograpy'

interface CardLeaderboardProps {
  rank: number
  total: number
  point: number
}

const CardLeaderboard: React.FC<CardLeaderboardProps> = ({
  rank,
  total,
  point,
}) => {
  const data = useMemo(() => {
    return [
      {
        icon: Trophy,
        value: `${rank}${getOrdinal(rank)} place`,
        label: 'Rank',
      },
      {
        icon: BookOpenText,
        value: `${total}x`,
        label: 'Total borrowed books',
      },
      {
        icon: Bolt,
        value: point,
        label: 'Total points',
      },
    ]
  }, [rank, total, point])

  return (
    <Card className='w-full space-y-3 p-6'>
      <CardContent className='flex flex-col gap-6 p-0'>
        {data.map((item, idx) => {
          return (
            <div key={idx} className='flex flex-col gap-1'>
              <Typography as='p' type='description'>
                {item.label}
              </Typography>
              <div className='flex items-center gap-2'>
                <item.icon className='size-6' />
                <Typography as='p' variant='h4'>
                  {item.value}
                </Typography>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}

export default CardLeaderboard