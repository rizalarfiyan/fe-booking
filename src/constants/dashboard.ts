import type { ITier } from '@/types/dashboard'

import Rookie from '@images/badges/rookie.png'
import Pro from '@images/badges/pro.png'
import Master from '@images/badges/master.png'
import Veteran from '@images/badges/veteran.png'
import Legend from '@images/badges/legend.png'
import Mythic from '@images/badges/mythic.png'

export const TIERS: ITier[] = [
  {
    title: 'Rookie',
    description:
      'Just starting my book journey! Learning the ropes of this awesome book borrowing service. 📚✨',
    image: Rookie,
    point: 0,
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

export const LEADERBOARD_MAX_RANK = 500
