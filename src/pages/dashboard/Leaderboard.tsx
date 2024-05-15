import React, { Suspense } from 'react'
import { Await, defer, useLoaderData } from 'react-router-dom'
import { Skeleton } from '@components/Skeleton'
import { ErrorMessage } from '@components/ErrorMessage'
import type { ILeaderboard } from '@/types/data'
import { LeaderboardTopThree } from '@components/Loaderboard/TopThree'
import { LeaderboardTable } from '@components/Loaderboard/Table'
import CardLeaderboard from '@components/Card/Leaderboard'
import TierLeaderboard from '@components/Card/TierLeaderboard'
import { Typography } from '@components/Typograpy'

interface IPromiseLeaderboard {
  leaderboards: Promise<ILeaderboard[]>
}

const Component: React.FC = () => {
  const { leaderboards } = useLoaderData() as IPromiseLeaderboard

  return (
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
          <div className='flex w-full flex-col justify-center gap-6 1400w:flex-row'>
            <div className='w-full max-w-3xl space-y-6'>
              <LeaderboardTopThree leaderboards={leaderboards.slice(0, 3)} />
              <LeaderboardTable
                leaderboards={
                  leaderboards.length > 3 ? leaderboards.slice(3) : []
                }
              />
            </div>
            <div className='w-full max-w-sm space-y-6'>
              <CardLeaderboard rank={1} point={2235} total={52} />
              <Typography as='h2' className='text-center'>
                My Tear List
              </Typography>
              <TierLeaderboard point={2235} />
            </div>
          </div>
        )}
      </Await>
    </Suspense>
  )
}

const fakeLeaderboards = async () => {
  const leaderboards = Array.from({ length: 13 }, (_, i) => ({
    first_name: 'Paijo',
    last_name: 'Royo Opo Wae Jenenge Nang Kene Ono',
    email: 'paijo.royo@gmail.com',
    avatar: 'https://avatars.githubusercontent.com/u/19503666',
    count: i + 1,
    point: (i + 1) * 100,
    isMe: i === 13 || i === 5,
  })).sort((a, b) => b.point - a.point)

  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve(leaderboards)
    }, 1000)
  })
}

const loader = async () => {
  return defer({
    leaderboards: fakeLeaderboards(),
  })
}

export { Component as default, loader }
