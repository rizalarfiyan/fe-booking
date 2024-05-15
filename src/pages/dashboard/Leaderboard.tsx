import React, { Suspense } from 'react'
import { Await, defer, useLoaderData } from 'react-router-dom'
import { Skeleton } from '@components/Skeleton'
import { ErrorMessage } from '@components/ErrorMessage'
import type { ILeaderboard } from '@/types/data'
import { LeaderboardTopThree } from '@components/Loaderboard/TopThree'
import { LeaderboardTable } from '@components/Loaderboard/Table'

interface IPromiseLeaderboard {
  leaderboards: Promise<ILeaderboard[]>
}

const Component: React.FC = () => {
  const { leaderboards } = useLoaderData() as IPromiseLeaderboard

  return (
    <div className='mx-auto max-w-2xl space-y-6'>
      <Suspense
        fallback={
          <>
            <Skeleton className='h-96 w-full' />
            <div className='space-y-3'>
              {Array.from({ length: 5 }, (_, idx) => {
                return <Skeleton key={idx} className='h-12 w-full' />
              })}
            </div>
          </>
        }
      >
        <Await
          resolve={leaderboards}
          errorElement={<ErrorMessage message="Couldn't load leaderboard" />}
        >
          {(leaderboards) => (
            <div className='mx-auto max-w-2xl space-y-4'>
              <div className='flex h-96 w-full items-end justify-evenly rounded-lg bg-muted'>
                <LeaderboardTopThree leaderboards={leaderboards.slice(0, 3)} />
              </div>
              <LeaderboardTable
                leaderboards={
                  leaderboards.length > 3 ? leaderboards.slice(3) : []
                }
              />
            </div>
          )}
        </Await>
      </Suspense>
    </div>
  )
}

const fakeLeaderboards = async () => {
  const leaderboards = Array.from({ length: 10 }, (_, i) => ({
    first_name: 'Paijo',
    last_name: 'Royo Opo Wae Jenenge Nang Kene Ono',
    email: 'paijo.royo@gmail.com',
    avatar: 'https://avatars.githubusercontent.com/u/19503666',
    count: i + 1,
    point: (i + 1) * 100,
    isMe: i === 9 || i === 5,
  })).sort((a, b) => b.point - a.point)

  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve(leaderboards)
    }, 20)
  })
}

const loader = async () => {
  return defer({
    leaderboards: fakeLeaderboards(),
  })
}

export { Component as default, loader }
