import React from 'react'
import { cn } from '@utils/classes'
import { getOrdinal } from '@utils/number'
import { Typography } from '@components/Typograpy'
import { getAvatarName, getFullName } from '@utils/string'
import { Avatar, AvatarFallback, AvatarImage } from '@components/Avatar'
import { Badge } from '@components/Badge'
import type { ILeaderboard } from '@/types/data'

interface LeaderboardTopThreeProps {
  leaderboards: ILeaderboard[]
}

const LeaderboardTopThree: React.FC<LeaderboardTopThreeProps> = ({
  leaderboards,
}) => {
  return [2, 1, 3].map((idx) => {
    const data = leaderboards?.[idx - 1]
    const firstName = data?.first_name || 'No Name'
    const fullName = getFullName(firstName, data?.last_name)
    return (
      <div
        key={idx}
        className={cn(
          'relative flex w-20 flex-col items-center justify-center rounded-t-xl bg-primary-300 dark:bg-primary-400',
          ['h-4/6', 'h-3/6', 'h-2/6'][idx - 1],
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
          <Typography as='span' className='text-slate-900 dark:text-slate-900'>
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
  })
}

export { LeaderboardTopThree }
