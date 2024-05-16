import { BookCheck, BookOpenText, Trophy } from 'lucide-react'
import React, { useMemo } from 'react'
import { getCurrentTier } from '@utils/dashboard'
import DashboardInformation from '@components/Card/DashboardInformation'
import { plural } from '@utils/string'

interface DashboardLeaderboardProps {
  total: number
  point: number
  borrow: number
  maxBorrow: number
}

const DashboardLeaderboard: React.FC<DashboardLeaderboardProps> = ({
  total,
  point,
  borrow,
  maxBorrow,
}) => {
  const data = useMemo(() => {
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
        description: 'Lorem ipsum dolor sit amet',
      },
      {
        icon: BookOpenText,
        label: 'Borrowable books',
        value: plural(maxBorrow - borrow, 'left'),
        description: `of total ${plural(maxBorrow, 'book')}`,
      },
      {
        icon: BookOpenText,
        label: 'Lorem ipsum',
        value: 'Lorem ipsum',
        description: 'Lorem ipsum dolor sit amet',
      },
    ]
  }, [total, point, borrow, maxBorrow])

  return (
    <div className='grid gap-4 lg:grid-cols-4 md:grid-cols-2'>
      {data.map((props, idx) => (
        <DashboardInformation key={idx} {...props} />
      ))}
    </div>
  )
}

export default DashboardLeaderboard
