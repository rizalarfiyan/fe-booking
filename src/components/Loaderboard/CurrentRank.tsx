import CardLeaderboard from '@components/Card/Leaderboard'
import { Typography } from '@components/Typograpy'
import TierLeaderboard from '@components/Card/TierLeaderboard'
import { useRequest } from 'alova'
import alova from '@libs/alova'
import type { IBaseResponse } from '@/types/base'
import type { ICurrentRank } from '@/types/leaderboard'
import { Skeleton } from '@components/Skeleton'

const CurrentRank = () => {
  const {
    data: {
      data: { points, bookCount, ranking },
    },
    loading,
  } = useRequest(alova.Get<IBaseResponse<ICurrentRank>>('/v1/leaderboard'), {
    force: true,
    initialData: {
      data: {
        points: 0,
        bookCount: 0,
        ranking: 500,
      },
    },
  })

  if (loading) {
    return (
      <div className='w-full max-w-sm space-y-6'>
        <Skeleton className='h-64 w-full' />
        <Skeleton className='mx-auto h-10 w-48' />
        <div className='space-y-4'>
          {Array.from({ length: 5 }, (_, idx) => {
            return <Skeleton key={idx} className='h-14 w-full' />
          })}
        </div>
      </div>
    )
  }

  return (
    <div className='w-full max-w-sm space-y-6'>
      <CardLeaderboard rank={ranking} point={points} total={bookCount} />
      <Typography as='h2' className='text-center'>
        My Tier List
      </Typography>
      <TierLeaderboard point={points} />
    </div>
  )
}

export default CurrentRank
