import { BookCheck, BookOpenText, CalendarDays, Trophy } from 'lucide-react'
import React, { useMemo } from 'react'
import { getCurrentTier } from '@utils/dashboard'
import { plural } from '@utils/string'
import CardDashboardInformation from '@components/Card/DashboardInformation'
import { parseDate } from '@utils/date'

interface DashboardInformationData {
  total: number
  point: number
  borrow: {
    count: number
    max: number
  }
  nearest: {
    title: string
    date: string
  }
}

interface DashboardInformationProps {
  data: DashboardInformationData
}

const DashboardInformation: React.FC<DashboardInformationProps> = ({
  data,
}) => {
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
        description: 'over 10 months',
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
        value: parseDate(nearest.date, 'MM/DD/YYYY'),
        description: nearest.title,
      },
    ]
  }, [data])

  return (
    <div className='flex flex-wrap justify-center gap-6'>
      {contents.map((val, idx) => (
        <CardDashboardInformation key={idx} {...val} />
      ))}
    </div>
  )
}

export { DashboardInformation }
