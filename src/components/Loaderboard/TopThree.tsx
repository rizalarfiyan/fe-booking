import React from 'react'
import { cn } from '@utils/classes'
import { getOrdinal } from '@utils/number'
import { Typography } from '@components/Typograpy'
import { getAvatarName, getFullName } from '@utils/string'
import { Avatar, AvatarFallback, AvatarImage } from '@components/Avatar'
import { Badge } from '@components/Badge'
import type { ILeaderboard } from '@/types/data'
import { Crown } from 'lucide-react'

interface LeaderboardTopThreeProps {
  leaderboards: ILeaderboard[]
}

const LeaderboardTopThree: React.FC<LeaderboardTopThreeProps> = ({
  leaderboards,
}) => {
  return (
    <div className='flex h-96 w-full items-end justify-evenly rounded-xl bg-muted'>
      {[2, 1, 3].map((idx) => {
        const data = leaderboards?.[idx - 1]
        const firstName = data?.first_name || 'No Name'
        const fullName = getFullName(firstName, data?.last_name)
        return (
          <div
            key={idx}
            className={cn(
              'relative flex w-20 flex-col items-center justify-center rounded-t-xl bg-primary-300 dark:bg-primary-400',
              ['h-52', 'h-40', 'h-24'][idx - 1],
            )}
          >
            <div>
              <Typography
                as='span'
                variant='h2'
                className='text-slate-900 dark:text-slate-900'
              >
                {idx}
              </Typography>
              <Typography
                as='span'
                className='text-slate-900 dark:text-slate-900'
              >
                {getOrdinal(idx)}
              </Typography>
            </div>
            <Typography
              as='span'
              type='small-description'
              className='text-slate-900'
            >
              {data?.point || 0}pts
            </Typography>
            <div className='gap absolute top-[-90px] flex flex-col items-center gap-1'>
              <div className='relative'>
                <Avatar className='size-14'>
                  <AvatarImage src={data?.avatar} alt={fullName} />
                  <AvatarFallback>{getAvatarName(fullName)}</AvatarFallback>
                </Avatar>
                {data.isMe && (
                  <Badge className='-bottom-1.5 absolute w-full justify-center rounded-sm'>
                    ME
                  </Badge>
                )}
                {idx === 1 && (
                  <Crown className='-top-7 -right-7 absolute size-10 rotate-45 text-primary' />
                )}
              </div>
              <Typography
                as='h4'
                className='max-w-20 truncate text-md md:max-w-52 sm:max-w-32'
              >
                {firstName}
              </Typography>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export { LeaderboardTopThree }