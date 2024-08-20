import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

// Разширение на dayjs с плъгини
dayjs.extend(utc)
dayjs.extend(timezone)

// Функция за форматиране на дата
type TDate = string | Date

export default function formatDate(date: TDate, format = 'DD.MM.YYYY HH:mm') {
  // Настройване на часовата зона на потребителя
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone

  // Преобразуване на дата от UTC към местната часова зона на потребителя
  return dayjs(date).utc().tz(userTimezone).format(format)
}

// import dayjs from 'dayjs'

// type TDate = string | Date

// export default function formatDate(date: TDate, format = 'DD.MM.YYYY HH:mm') {
//   return dayjs(date).format(format)
// }
