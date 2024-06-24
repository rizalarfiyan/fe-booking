import { LeaderboardTopThree } from '@components/Loaderboard/TopThree'
import { useRequest } from 'alova'
import alova from '@libs/alova'
import type { IBaseResponse } from '@/types/base'
import { Skeleton } from '@components/Skeleton'
import useAuth from '@hooks/useAuth'
import type { ILeaderboard } from '@/types/leaderboard'
import { LeaderboardTable } from '@components/Loaderboard/Table'

const TopAll = () => {
  const { user } = useAuth()

  const {
    data: { data },
    loading,
  } = useRequest(
    alova.Get<IBaseResponse<ILeaderboard[]>>('/v1/leaderboard/top'),
    {
      force: true,
      initialData: {
        data: [],
      },
    },
  )

  if (loading) {
    return (
      <div className='w-full max-w-3xl space-y-6'>
        <Skeleton className='h-96 w-full' />
        <div className='space-y-3'>
          {Array.from({ length: 5 }, (_, idx) => {
            return <Skeleton key={idx} className='h-12 w-full' />
          })}
        </div>
      </div>
    )
  }

  return (
    <div className='w-full max-w-3xl space-y-6'>
      <LeaderboardTopThree
        leaderboards={data.slice(0, 3)}
        userId={user?.userId || 0}
      />
      <LeaderboardTable
        userId={user?.userId || 0}
        leaderboards={data.length > 3 ? data.slice(3) : []}
      />
    </div>
  )
}

export default TopAll
