import dayjs from 'dayjs'
import 'dayjs/locale/id'
import { DATETIME_FORMAT } from '@/constants/app'

export const parseDate = (date: string, format?: string): string => {
  const dateFormat = format ?? DATETIME_FORMAT.date
  const datetime = dayjs(date)
  if (!datetime.isValid()) return '-'
  return datetime.locale('id').format(dateFormat)
}
