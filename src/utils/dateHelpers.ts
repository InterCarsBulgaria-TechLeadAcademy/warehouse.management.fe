import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

type TDate = string | Date

export default function formatDate(date: TDate, format = 'DD.MM.YYYY HH:mm') {
  // Set the user's time zone
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone

  // Convert the date from UTC to the user's local time zone
  return dayjs(date).utc().tz(userTimezone).format(format)
}

// import dayjs from 'dayjs'

// type TDate = string | Date

// export default function formatDate(date: TDate, format = 'DD.MM.YYYY HH:mm') {
//   return dayjs(date).format(format)
// }
