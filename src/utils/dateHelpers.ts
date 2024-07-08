import dayjs from 'dayjs'

type TDate = string | Date

export function formatDate(date: TDate, format = 'DD.MM.YYYY') {
  return dayjs(date).format(format)
}
