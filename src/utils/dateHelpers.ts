import dayjs from 'dayjs'

export default function dateHelpers(date: string | Date, format?: string) {
  function formatDate(date: string | Date, format: string = 'DD.MM.YYYY') {
    return dayjs(date).format(format)
  }

  return formatDate(date, format)
}
