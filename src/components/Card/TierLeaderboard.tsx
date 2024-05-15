import React from 'react'
import { Card, CardContent } from '@components/Card'
import { Typography } from '@components/Typograpy'

import Rookie from '@images/badges/rookie.png'
import Pro from '@images/badges/pro.png'
import Master from '@images/badges/master.png'
import Veteran from '@images/badges/veteran.png'
import Legend from '@images/badges/legend.png'
import Mythic from '@images/badges/mythic.png'
import { BadgeCheck, BadgeX } from 'lucide-react'

interface TierLeaderboardProps {
  point: number
}

const tiers = [
  {
    title: 'Rookie',
    description:
      'Just starting my book journey! Learning the ropes of this awesome book borrowing service. 📚✨',
    image: Rookie,
    point: 1000,
  },
  {
    title: 'Pro',
    description:
      'Navigating the bookshelves like a boss! Pro status unlocked – borrowing books like a champ. 📖💪',
    image: Pro,
    point: 2000,
  },
  {
    title: 'Master',
    description:
      'Mastering the art of book borrowing! Know the ins and outs, finding hidden gems, and sharing the book love. 📚🔍❤️',
    image: Master,
    point: 3000,
  },
  {
    title: 'Veteran',
    description:
      'Been around the book block! Veteran status achieved – lending wisdom, borrowing tales, and spreading bookish joy. 📚🌟',
    image: Veteran,
    point: 4000,
  },
  {
    title: 'Legend',
    description:
      'Living the book legend life! Reading tales, setting trends, and inspiring others. Legendary status unlocked! 📚🚀✨',
    image: Legend,
    point: 5000,
  },
  {
    title: 'Mythic',
    description:
      'Mythical book guru in the house! Rarest of the rare, setting records, and spreading book magic everywhere. 📚🔮👑',
    image: Mythic,
    point: 6000,
  },
]

const TierLeaderboard: React.FC<TierLeaderboardProps> = ({
  point: currentPoint,
}) => {
  return (
    <Card className='w-full space-y-3 p-6'>
      <CardContent className='flex flex-col divide-y p-0'>
        {tiers.map(({ title, description, image, point }, idx) => {
          return (
            <div
              key={idx}
              className='flex flex-col items-center gap-4 py-4 xs:flex-row'
            >
              <div className='flex flex-col items-center gap-2 xs:flex-row'>
                <div className='size-14 flex-shrink-0'>
                  <img
                    src={image}
                    alt={title}
                    className='h-auto w-full object-contain'
                  />
                </div>
                <div className='flex flex-1 flex-col gap-0.5'>
                  <Typography as='h3' className='text-lg'>
                    {title}
                  </Typography>
                  <Typography as='p' type='small-description'>
                    {description}
                  </Typography>
                </div>
              </div>
              <div>
                {currentPoint >= point ? (
                  <BadgeCheck className='size-8 text-emerald-500' />
                ) : (
                  <BadgeX className='size-8 text-red-500' />
                )}
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}

export default TierLeaderboard
