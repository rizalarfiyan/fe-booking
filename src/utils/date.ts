import dayjs from 'dayjs'
import { DATETIME_FORMAT } from '@/constants/app'

export const parseDate = (date: string, format?: string): string => {
  const dateFormat = format ?? DATETIME_FORMAT.date
  const datetime = dayjs(date)
  if (!datetime.isValid()) return '-'
  return datetime.format(dateFormat)
}

export const formatDate = (date: Date, format?: string): string => {
  const dateFormat = format ?? DATETIME_FORMAT.date
  return dayjs(date).format(dateFormat)
}
