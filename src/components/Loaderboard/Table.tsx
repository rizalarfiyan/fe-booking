import React from 'react'
import { Typography } from '@components/Typograpy'
import {
  abbreviateNumber,
  getAvatarName,
  getFullName,
  plural,
} from '@utils/string'
import { Avatar, AvatarFallback, AvatarImage } from '@components/Avatar'
import { Table, TableBody, TableCell, TableRow } from '@components/Table'
import { Badge } from '@components/Badge'
import { Card } from '@components/Card'
import { Bolt, BookOpenText } from 'lucide-react'
import type { ILeaderboard } from '@/types/leaderboard'

interface LeaderboardTableProps {
  leaderboards: ILeaderboard[]
  userId: number
}

const LeaderboardTable: React.FC<LeaderboardTableProps> = ({
  leaderboards,
  userId,
}) => {
  return (
    <Card>
      <Table>
        <TableBody>
          {leaderboards.map(
            (
              {
                firstName,
                lastName,
                avatar,
                email,
                points,
                bookCount,
                ...data
              },
              idx,
            ) => {
              const fullName = getFullName(firstName, lastName)
              return (
                <TableRow key={idx}>
                  <TableCell>
                    <div className='flex items-center gap-2'>
                      <div className='relative'>
                        <Avatar className='size-10'>
                          <AvatarImage src={avatar} alt={fullName} />
                          <AvatarFallback>
                            {getAvatarName(fullName)}
                          </AvatarFallback>
                        </Avatar>
                        {userId === data.userId && (
                          <Badge className='-bottom-2 absolute w-full justify-center rounded-sm'>
                            ME
                          </Badge>
                        )}
                      </div>
                      <div>
                        <Typography
                          as='h4'
                          variant='h4'
                          className='max-w-80 truncate text-base'
                        >
                          {fullName}
                        </Typography>
                        <Typography
                          as='p'
                          type='small-description'
                          className='max-w-80 truncate'
                        >
                          {email}
                        </Typography>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant='outline'>
                      <BookOpenText className='mr-1 size-4' />
                      <span>
                        {abbreviateNumber(bookCount)}{' '}
                        {plural(bookCount, 'book', false)}
                      </span>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant='outline'>
                      <Bolt className='mr-1 size-4' />
                      <span>
                        {abbreviateNumber(points)} {plural(points, 'pt', false)}
                      </span>
                    </Badge>
                  </TableCell>
                </TableRow>
              )
            },
          )}
        </TableBody>
      </Table>
    </Card>
  )
}

export { LeaderboardTable }
