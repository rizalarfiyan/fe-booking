import React from 'react'
import { Typography } from '@components/Typograpy'
import { getAvatarName, getFullName } from '@utils/string'
import { Avatar, AvatarFallback, AvatarImage } from '@components/Avatar'
import { Table, TableBody, TableCell, TableRow } from '@components/Table'
import { Badge } from '@components/Badge'
import type { ILeaderboard } from '@/types/data'

interface LeaderboardTableProps {
  leaderboards: ILeaderboard[]
}

const LeaderboardTable: React.FC<LeaderboardTableProps> = ({
  leaderboards,
}) => {
  return (
    <Table>
      <TableBody>
        {leaderboards.map((val, idx) => {
          const fullName = getFullName(val.first_name, val.last_name)
          return (
            <TableRow key={idx}>
              <TableCell>
                <div className='flex items-center gap-2'>
                  <div className='relative'>
                    <Avatar className='size-10'>
                      <AvatarImage src={val.avatar} alt={fullName} />
                      <AvatarFallback>{getAvatarName(fullName)}</AvatarFallback>
                    </Avatar>
                    {val.isMe && (
                      <Badge className='-bottom-2 absolute w-full justify-center rounded-sm'>
                        ME
                      </Badge>
                    )}
                  </div>
                  <div>
                    <Typography
                      as='h4'
                      variant='h4'
                      className='max-w-60 truncate text-base'
                    >
                      {fullName}
                    </Typography>
                    <Typography
                      as='p'
                      type='small-description'
                      className='max-w-60 truncate'
                    >
                      {val.email}
                    </Typography>
                  </div>
                </div>
              </TableCell>
              <TableCell>{val.count}</TableCell>
              <TableCell>{val.point}pts</TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

export { LeaderboardTable }
