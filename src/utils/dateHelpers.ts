import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

type TDate = string | Date

export function formatDate(date: TDate, format = 'DD.MM.YYYY HH:mm') {
  if (!date) return '-'

  // Set the user's time zone
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone

  // Convert the date from UTC to the user's local time zone
  return dayjs(date).utc().tz(userTimezone).format(format)
}

export function dateToUtc(date: TDate) {
  return dayjs(date).utc().format()
}
