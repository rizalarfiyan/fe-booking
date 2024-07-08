import { BookCheck, BookOpenText, CalendarDays, Trophy } from 'lucide-react'
import React, { useMemo } from 'react'
import { getCurrentTier } from '@utils/dashboard'
import { plural } from '@utils/string'
import CardDashboardInformation from '@components/Card/DashboardInformation'
import { formatDate } from '@utils/date'
import { useRequest } from 'alova'
import alova from '@libs/alova'
import type { IBaseResponse } from '@/types/base'
import type { IHistoryCard } from '@/types/history'
import { Skeleton } from '@components/Skeleton'

const DashboardInformation: React.FC = () => {
  const {
    data: { data },
    loading,
  } = useRequest(alova.Get<IBaseResponse<IHistoryCard>>('/v1/history/card'), {
    force: true,
    initialData: {
      data: {
        point: 0,
        total: 0,
        month: 0,
        borrow: {
          count: 0,
          max: 0,
        },
        nearest: {
          title: '-',
          date: '-',
        },
      },
    },
  })

  const contents = useMemo(() => {
    const { total, point, borrow, nearest } = data
    const tier = getCurrentTier(point)
    return [
      {
        icon: Trophy,
        label: 'Tier',
        value: tier.title,
        tier: tier.image,
        description: `with ${plural(point, 'point')}`,
      },
      {
        icon: BookCheck,
        label: 'Total Borrowed',
        value: plural(total, 'book'),
        description: `over ${data.month} months`,
      },
      {
        icon: BookOpenText,
        label: 'Borrowable books',
        value: plural(borrow.max - borrow.count, 'left'),
        description: `of total ${plural(borrow.max, 'book')}`,
      },
      {
        icon: CalendarDays,
        label: 'Return book',
        value: formatDate(nearest.date, 'MM/DD/YYYY'),
        description: nearest.title,
      },
    ]
  }, [data])

  if (loading) {
    return (
      <div className='flex flex-wrap justify-center gap-6'>
        {Array.from({ length: 4 }, (_, idx) => {
          return <Skeleton key={idx} className='h-36 w-72' />
        })}
      </div>
    )
  }

  return (
    <div className='flex flex-wrap justify-center gap-6'>
      {contents.map((val, idx) => (
        <CardDashboardInformation key={idx} {...val} />
      ))}
    </div>
  )
}

export { DashboardInformation }
