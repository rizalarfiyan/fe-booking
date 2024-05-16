import React, { Suspense } from 'react'
import { DashboardInformation } from '@components/Dashboard/Information'
import { Await, defer, useLoaderData } from 'react-router-dom'
import type { IDashboardInformation, IHistoryBook } from '@/types/data'
import { ErrorMessage } from '@components/ErrorMessage'
import { Skeleton } from '@components/Skeleton'
import dayjs from 'dayjs'
import type { ILabelValue } from '@/types/base'
import { DATETIME_FORMAT } from '@/constants/app'
import { CardDashboardStatistic } from '@components/Chart/DashboardStatistic'
import { DashboardTable } from '@components/Dashboard/History'

interface IPromiseDashboard {
  information: Promise<IDashboardInformation>
  statistics: Promise<ILabelValue<number>[]>
  histories: Promise<IHistoryBook[]>
}

const Component: React.FC = () => {
  const { information, statistics, histories } =
    useLoaderData() as IPromiseDashboard

  return (
    <div className='space-y-8'>
      <Suspense
        fallback={
          <div className='flex flex-wrap justify-center gap-6'>
            {Array.from({ length: 4 }, (_, idx) => {
              return <Skeleton key={idx} className='h-36 w-72' />
            })}
          </div>
        }
      >
        <Await
          resolve={information}
          errorElement={<ErrorMessage message="Couldn't load information" />}
        >
          {(information) => {
            return <DashboardInformation data={information} />
          }}
        </Await>
      </Suspense>
      <Suspense fallback={<Skeleton className='h-[420px] w-full' />}>
        <Await
          resolve={statistics}
          errorElement={<ErrorMessage message="Couldn't load statistic" />}
        >
          {(statistics) => {
            return <CardDashboardStatistic data={statistics} />
          }}
        </Await>
      </Suspense>
      <Suspense
        fallback={
          <div className='space-y-2'>
            {Array.from({ length: 5 }, (_, idx) => {
              return <Skeleton key={idx} className='h-16 w-full' />
            })}
          </div>
        }
      >
        <Await
          resolve={histories}
          errorElement={<ErrorMessage message="Couldn't load statistic" />}
        >
          {(histories) => <DashboardTable data={histories} />}
        </Await>
      </Suspense>
    </div>
  )
}

const fakeDashboard = async () => {
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        point: 6023,
        total: 52,
        borrow: {
          count: 3,
          max: 5,
        },
        nearest: {
          date: '2021-09-01',
          title: 'Overthinking Is My Hobby, And I Hate It',
        },
      })
    }, 1500)
  })
}

const fakeStatistics = async () => {
  const statistics: ILabelValue<number>[] = []
  const today = dayjs()
  const oneMonthAgo = today.subtract(1, 'month')

  for (
    let date = today;
    date.isAfter(oneMonthAgo) || date.isSame(oneMonthAgo, 'day');
    date = date.subtract(1, 'day')
  ) {
    statistics.push({
      label: date.format(DATETIME_FORMAT.date),
      value: Math.floor(Math.random() * 100),
    })
  }

  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve(statistics)
    }, 2000)
  })
}

const fakeHistories = async () => {
  const histories = await import('@dummy/history.json').then(
    (res) => res.default,
  )
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve(histories)
    }, 1750)
  })
}

const loader = async () => {
  return defer({
    information: fakeDashboard(),
    statistics: fakeStatistics(),
    histories: fakeHistories(),
  })
}

export { Component as default, loader }
