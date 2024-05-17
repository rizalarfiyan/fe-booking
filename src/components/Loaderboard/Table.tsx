import React from 'react'
import { Typography } from '@components/Typograpy'
import { getAvatarName, getFullName, plural } from '@utils/string'
import { Avatar, AvatarFallback, AvatarImage } from '@components/Avatar'
import { Table, TableBody, TableCell, TableRow } from '@components/Table'
import { Badge } from '@components/Badge'
import type { ILeaderboard } from '@/types/data'
import { Card } from '@components/Card'
import { Bolt, BookOpenText } from 'lucide-react'

interface LeaderboardTableProps {
  leaderboards: ILeaderboard[]
}

const LeaderboardTable: React.FC<LeaderboardTableProps> = ({
  leaderboards,
}) => {
  return (
    <Card>
      <Table>
        <TableBody>
          {leaderboards.map(
            (
              { first_name, last_name, avatar, isMe, email, point, book },
              idx,
            ) => {
              const fullName = getFullName(first_name, last_name)
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
                        {isMe && (
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
                      <span>{plural(book, 'book')}</span>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant='outline'>
                      <Bolt className='mr-1 size-4' />
                      <span>{plural(point, 'pt')}</span>
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
