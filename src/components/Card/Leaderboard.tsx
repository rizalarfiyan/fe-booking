import { Bolt, BookOpenText, Medal, Trophy } from 'lucide-react'
import React, { useMemo } from 'react'
import { Card, CardContent } from '@components/Card'
import { Typography } from '@components/Typograpy'
import { getOrdinal } from '@utils/number'
import { formatNumber, plural } from '@utils/string'
import { LEADERBOARD_MAX_RANK } from '@/constants/dashboard'

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
        value: plural(
          rank,
          `${rank >= LEADERBOARD_MAX_RANK ? '+' : getOrdinal(rank)} place`,
        ),
        label: 'Rank',
      },
      {
        icon: BookOpenText,
        value: `${formatNumber(total)} ${plural(total, 'book', false)}`,
        label: 'Total Borrowed',
      },
      {
        icon: Bolt,
        value: `${formatNumber(point)} ${plural(point, 'point', false)}`,
        label: 'Total Points',
      },
    ]
  }, [rank, total, point])

  return (
    <Card className='relative z-[1] w-full space-y-3 overflow-hidden p-6'>
      <Medal className='-right-20 absolute z-[-1] size-52 text-slate-400 opacity-10 dark:text-slate-200' />
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
