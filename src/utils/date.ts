import dayjs from 'dayjs'
import { DATETIME_FORMAT } from '@/constants/app'

export const formatDate = (date: string | Date, format?: string): string => {
  const dateFormat = format ?? DATETIME_FORMAT.date
  const datetime = dayjs(date)
  if (!datetime.isValid()) return '-'
  return datetime.format(dateFormat)
}

export const parseDate = (date: string): Date => {
  const datetime = dayjs(date)
  if (!datetime.isValid()) return dayjs(new Date()).toDate()
  return datetime.toDate()
}
