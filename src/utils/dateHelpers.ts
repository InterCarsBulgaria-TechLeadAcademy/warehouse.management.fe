import dayjs from 'dayjs'

type TDate = string | Date

export default function formatDate(date: TDate, format = 'DD.MM.YYYY') {
  return dayjs(date).format(format)
}
