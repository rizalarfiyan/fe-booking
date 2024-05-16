import type { ILabelValue } from '@/types/base'
import React from 'react'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Card, CardContent, CardHeader } from '@components/Card'
import { DATETIME_FORMAT } from '@/constants/app'
import { parseDate } from '@utils/date'
import { Typography } from '@components/Typograpy'

interface CardDashboardStatisticProps {
  data: ILabelValue<number>[]
}

const CardDashboardStatistic: React.FC<CardDashboardStatisticProps> = ({
  data,
}) => {
  return (
    <Card>
      <CardHeader className='pb-2 text-center'>
        <Typography>Statistic last 1 month</Typography>
      </CardHeader>
      <CardContent className='h-[420px] w-full p-0 text-slate-900 dark:text-slate-50'>
        <ResponsiveContainer width='100%' height='100%'>
          <LineChart
            height={300}
            data={data}
            margin={{
              top: 20,
              right: 40,
              left: 0,
              bottom: 20,
            }}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis
              dataKey='label'
              tickFormatter={(date) =>
                parseDate(date, DATETIME_FORMAT.statistic)
              }
              fill='red'
              tick={{
                fill: 'currentColor',
              }}
            />
            <YAxis
              tick={{
                fill: 'currentColor',
              }}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <Card>
                      <CardContent className='space-y-1 p-2 px-3 text-center'>
                        <Typography className='font-semibold'>
                          {parseDate(label, DATETIME_FORMAT.date)}
                        </Typography>
                        <Typography>{payload[0].value}</Typography>
                      </CardContent>
                    </Card>
                  )
                }
                return null
              }}
            />
            <Line type='monotone' stroke='#ff9800' dataKey='value' />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export { CardDashboardStatistic }
