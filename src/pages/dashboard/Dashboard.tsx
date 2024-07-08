import React, { Suspense } from 'react'
import { DashboardInformation } from '@components/Dashboard/Information'
import { Await, defer, useLoaderData } from 'react-router-dom'
import { ErrorMessage } from '@components/ErrorMessage'
import { Skeleton } from '@components/Skeleton'
import dayjs from 'dayjs'
import type { ILabelValue } from '@/types/base'
import { DATETIME_FORMAT } from '@/constants/app'
import { CardDashboardStatistic } from '@components/Chart/DashboardStatistic'
import DashboardTable from '@components/Dashboard/History'

interface IPromiseDashboard {
  statistics: Promise<ILabelValue<number>[]>
}

const Component: React.FC = () => {
  const { statistics } = useLoaderData() as IPromiseDashboard

  return (
    <div className='space-y-8'>
      <DashboardInformation />
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
      <DashboardTable />
    </div>
  )
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
      value: 0,
    })
  }

  statistics.reverse()
  statistics[statistics.length - 1].value = 2

  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve(statistics)
    }, 150)
  })
}

const loader = async () => {
  return defer({
    statistics: fakeStatistics(),
  })
}

export { Component as default, loader }
